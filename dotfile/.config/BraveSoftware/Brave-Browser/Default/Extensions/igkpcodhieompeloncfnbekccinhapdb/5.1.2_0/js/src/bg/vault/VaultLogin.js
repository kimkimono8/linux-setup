import { VaultApi } from "../../../background/server_api/VaultApi.js";
import { LocalStorageKeys } from "../../service/storage/constants/LocalStorageKeys.js";
import { SessionStorageKeys } from "../../service/storage/constants/SessionStorageKeys.js";
import { VtErrorCode } from "../../service/vt/constants/ErrorCode.js";
import { VtLoginState } from "../../service/vt/constants/constants.js";
import { bgEventServer, extCrypto, inactivityHandler, postUnlockTaskHandler, vapi } from "../Context.js";
import { badgeMenuHandler } from "../activeTab/Context.js";
import { bg } from "../bg.js";
export class VaultLogin {
    static NEED_ACCOUNT_RECHECK_ON = 10 * 60 * 1000;
    unlockPromise = null;
    lastPasswordModifiedTime = "";
    passphraseCreationTime = "";
    initOnce() {
        this.initOnce = () => { };
        this.autoApproveSharing = js.fn.wrapper.createSingleInstance(this.autoApproveSharing, this);
    }
    async init() {
        this.initOnce();
        const validUpto = await zsessionStorage.load(SessionStorageKeys.ACCOUNT_CHECK_VALID_UPTO, 0);
        const valid = Date.now() < validUpto;
        if (valid) {
            return fnOut.OK;
        }
        return this.getLogin();
    }
    async unlockVault(key) {
        try {
            this.unlockPromise = js.promise.createTimed(10);
            await zsessionStorage.save(SessionStorageKeys.MASTER_KEY, key);
            await this.decryptOrgKey();
            await extCrypto.initPostUnlock();
            bg.vaultSync.sync(false);
            bgEventServer.login.unlocked();
            badgeMenuHandler.changeState(VtLoginState.UNLOCKED);
            inactivityHandler.createAlarms();
            zlocalStorage.remove(LocalStorageKeys.PASSPHRASE_INVALID_COUNT);
            bg.zmaps.init();
            postUnlockTaskHandler.executePostUnlockTask();
        }
        catch (e) {
            logError(e);
        }
        finally {
            this.unlockPromise.resolve();
            this.unlockPromise = null;
        }
    }
    async decryptOrgKey() {
        try {
            const masterKey = await zsessionStorage.load(SessionStorageKeys.MASTER_KEY, "");
            if (!masterKey) {
                return;
            }
            const resp = (await vapi.login.getOrgKey()).result;
            const keys = {
                orgKey: resp.operation.Details.sharedKey,
                privateKey: resp.operation.Details.privateKey
            };
            if (!keys.orgKey) {
                return;
            }
            const privateKey = await bg.zcrypt.decrypt(keys.privateKey, false);
            const org_key = bg.zcrypt.decryptRsa(keys.orgKey, privateKey);
            await zsessionStorage.save(SessionStorageKeys.ORG_KEY, org_key);
            this.autoApproveSharing();
        }
        catch (e) {
            logError(e);
        }
    }
    async getLogin() {
        try {
            const loginResp = (await vapi.login.getLogin()).result;
            if (!vapi.isRespOk(loginResp)) {
                await zsessionStorage.save(SessionStorageKeys.ACCOUNT_CHECK_VALID_UPTO, 0);
                switch (loginResp.operation.result.error_code) {
                    case "USER_NOT_REGISTERED_IN_VAULT":
                    case "PASSPHRASE_NOT_CREATED":
                    case "ORG_NOT_REGISTERED":
                    case "USER_NOT_INVITED":
                        await this.initNewUserInfo();
                        return fnOut.error(VtErrorCode.NEED_SIGN_UP);
                }
                await bg.vault.lock();
                return fnOut.error(loginResp.operation.result.message || loginResp.operation.result.error_code);
            }
            const user = loginResp.operation.details.USER;
            const loginData = loginResp.operation.details;
            this.lastPasswordModifiedTime = loginData.LASTMODFIEDTIME;
            this.passphraseCreationTime = loginData.CREATIONTIME;
            await zlocalStorage.saveAll({
                [LocalStorageKeys.USER_ID]: user.USERID,
                [LocalStorageKeys.ZUID]: user.ZUID,
                [LocalStorageKeys.EMAIL]: user.EMAIL,
                [LocalStorageKeys.USERNAME]: user.USERNAME,
                [LocalStorageKeys.USER_ROLES]: user.ROLES,
                [LocalStorageKeys.ENCRYPTED_DATE]: loginData.PASSPHRASE,
                [LocalStorageKeys.SALT]: loginData.SALT,
                [LocalStorageKeys.LOGIN_TYPE]: loginData.LOGIN,
                [LocalStorageKeys.ITERATIONS]: loginData.ITERATION,
                [LocalStorageKeys.LAST_PASSPHRASE_CHANGE]: this.lastPasswordModifiedTime,
                [LocalStorageKeys.PASSPHRASE_CREATION_TIME]: this.passphraseCreationTime
            });
            await zsessionStorage.saveAll({
                [SessionStorageKeys.ACCOUNT_CHECK_VALID_UPTO]: Date.now() + VaultLogin.NEED_ACCOUNT_RECHECK_ON,
            });
            return fnOut.OK;
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async getApiPassphraseHeaders() {
        if (!this.lastPasswordModifiedTime || !this.passphraseCreationTime) {
            const stored = await zlocalStorage.loadAll({
                [LocalStorageKeys.LAST_PASSPHRASE_CHANGE]: "",
                [LocalStorageKeys.PASSPHRASE_CREATION_TIME]: ""
            });
            this.lastPasswordModifiedTime = stored[LocalStorageKeys.LAST_PASSPHRASE_CHANGE];
            this.passphraseCreationTime = stored[LocalStorageKeys.PASSPHRASE_CREATION_TIME];
        }
        return {
            MODIFIED_TIME: this.lastPasswordModifiedTime,
            CREATION_TIME: this.passphraseCreationTime
        };
    }
    async initNewUserInfo() {
        try {
            const result = (await vapi.other.getNewUserInfo()).result;
            const user = result.operation.Details;
            await zlocalStorage.saveAll({
                [LocalStorageKeys.ZUID]: user.zuid,
                [LocalStorageKeys.EMAIL]: user.email,
                [LocalStorageKeys.USERNAME]: user.name,
            });
        }
        catch (e) {
            logError(e);
        }
    }
    async autoApproveSharing() {
        try {
            const pendingResp = await VaultApi.getChecked("/api/rest/json/v1/user/approval/pending");
            const pendingUserInfos = pendingResp.operation.Details.users;
            if (pendingUserInfos.length == 0) {
                return;
            }
            const orgKey = await bg.zcrypt.getOrgKey();
            const userKeys = [];
            for (let userInfo of pendingUserInfos) {
                userKeys.push({
                    zuid: userInfo.zuid,
                    key: bg.zcrypt.encryptRsa(orgKey, userInfo.publicKey)
                });
            }
            await VaultApi.postChecked("/api/rest/json/v1/user/approval/approve", { INPUT_DATA: JSON.stringify(userKeys) });
        }
        catch (e) {
            logError(e);
        }
    }
    async handlePassphraseChange() {
        await brApi.runtime.reload();
    }
}
