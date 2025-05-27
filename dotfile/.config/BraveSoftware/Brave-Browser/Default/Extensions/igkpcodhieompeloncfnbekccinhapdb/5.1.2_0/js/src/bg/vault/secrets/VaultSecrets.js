import { BgSecretUtil } from "../../../../background/vault/secrets/BgSecretUtil.js";
import { SecretEdit } from "../../../../background/vault/secrets/edit/SecretEdit.js";
import { SecretAccessControl } from "../../../../background/vault/secrets/SecretAccessControl.js";
import { SecretAdd } from "../../../../background/vault/secrets/SecretAdd.js";
import { SecretCopier } from "../../../../background/vault/secrets/SecretCopier.js";
import { SecretDataHandler } from "../../../../background/vault/secrets/SecretDataHandler.js";
import { SecretFiles } from "../../../../background/vault/secrets/SecretFiles.js";
import { SecretGetter } from "../../../../background/vault/secrets/SecretGetter.js";
import { SecretLogin } from "../../../../background/vault/secrets/SecretLogin.js";
import { SecretQuerier } from "../../../../background/vault/secrets/SecretQuerier.js";
import { SecretShare } from "../../../../background/vault/secrets/SecretShare.js";
import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
import { badgeMenuHandler } from "../../activeTab/export.js";
import { bg } from "../../bg.js";
import { accountDb, bgEventServer, vapi } from "../../Context.js";
import { totpGenerator } from "../../generator/export.js";
import { SecretParser } from "./SecretParser.js";
export class VaultSecrets {
    accessControl = new SecretAccessControl();
    secretGetter = new SecretGetter();
    secretCopier = new SecretCopier();
    secretQuerier = new SecretQuerier();
    secretDataHandler = new SecretDataHandler();
    secretLogin = new SecretLogin();
    secretUtil = new BgSecretUtil();
    secretAdd = new SecretAdd();
    secretEdit = new SecretEdit();
    secretShare = new SecretShare();
    secretFiles = new SecretFiles();
    secretParser = new SecretParser();
    init() {
        try {
            this.secretLogin.p = this;
            this.secretCopier.p = this;
            this.secretGetter.p = this;
            this.secretAdd.p = this;
            this.secretEdit.p = this;
            this.secretShare.p = this;
            this.accessControl.p = this;
            this.secretLogin.init(this);
        }
        catch (e) {
            logError(e);
        }
    }
    async deleteSecret(secretId) {
        try {
            await vapi.secret.setProperty(secretId, { istrashed: true });
            await this.removeLocalSecret(secretId);
        }
        catch (e) {
            logError(e);
        }
    }
    async removeLocalSecrets(secretIds) {
        try {
            await accountDb.secretTable.removeAll(secretIds);
            await accountDb.domainSecretsTable.removeAll(secretIds);
            bgEventServer.secret.removed(secretIds);
            badgeMenuHandler.refresh();
        }
        catch (e) {
            logError(e);
        }
    }
    async removeLocalSecret(secretId) {
        try {
            await accountDb.secretTable.remove(secretId);
            await accountDb.domainSecretsTable.remove(secretId);
            bgEventServer.secret.removed([secretId]);
            badgeMenuHandler.refresh();
        }
        catch (e) {
            logError(e);
        }
    }
    async getTotp(secretId) {
        try {
            const secret = await this.secretGetter.getSecret(secretId);
            if (!secret.encrypted.totp) {
                throw "NO_TOTP_IN_SECRET";
            }
            const totp_url = await bg.zcrypt.decrypt(secret.encrypted.totp, secret.shared);
            const totp = await totpGenerator.generate(totp_url);
            return totp;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async changeFavourite(secretId, favourite) {
        try {
            await vapi.secret.setProperty(secretId, { isfavourites: favourite });
            const secret = await accountDb.secretTable.get(secretId);
            secret.is_favourite = favourite;
            await accountDb.secretTable.put(secret);
            bgEventServer.secret.changed(secretId);
        }
        catch (e) {
            logError(e);
        }
    }
    async restoreSecret(secretId) {
        try {
            await vapi.secret.setProperty(secretId, { istrashed: false });
            await this.secretGetter.getServerSecret(secretId);
            badgeMenuHandler.refresh();
            bgEventServer.secret.added(secretId);
        }
        catch (e) {
            logError(e);
        }
    }
    async saveUsedCategories(allSecrets) {
        try {
            const secretTypeData = {};
            for (let secret of allSecrets) {
                secretTypeData[secret.type_id] = (secretTypeData[secret.type_id] || 0) + 1;
            }
            const addressTypeId = await zlocalStorage.load(LocalStorageKeys.ADDRESS_TYPE_ID);
            const cardTypeId = await zlocalStorage.load(LocalStorageKeys.PAYMENT_CARD_TYPE_ID);
            secretTypeData[addressTypeId] ? null : secretTypeData[addressTypeId] = 0;
            secretTypeData[cardTypeId] ? null : secretTypeData[cardTypeId] = 0;
            await zlocalStorage.save(LocalStorageKeys.USED_CATEGORIES, secretTypeData);
        }
        catch (e) {
            logError(e);
        }
    }
    async sync() {
        try {
            const [resp_secrets] = await Promise.all([
                this.syncSecrets(),
                bg.vaultSecretTypes.sync(),
                bg.vaultLogin.decryptOrgKey()
            ]);
            const secrets = await this.secretParser.parseAll(resp_secrets);
            await this.saveUsedCategories(secrets);
            await domainHandler.addAll(secrets);
            await accountDb.secretTable.saveAll(secrets, true);
        }
        catch (e) {
            logError(e);
        }
    }
    async syncSecrets() {
        try {
            const secrets_group = [];
            for await (let secrets of this.syncSecretsPage()) {
                secrets_group.push(secrets);
            }
            return [].concat(...secrets_group);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async *syncSecretsPage() {
        try {
            const LIMIT = 1000;
            let resp = null;
            let respSecrets = null;
            for (let pageNo = 0; pageNo < 100; pageNo++) {
                resp = (await vapi.secret.getAll({ pageNo, rowsPerPage: LIMIT })).result;
                respSecrets = resp.operation.Details;
                yield respSecrets;
                if (respSecrets.length < LIMIT || respSecrets.length == 0) {
                    return;
                }
                const curFetchCount = (pageNo * LIMIT) + respSecrets.length;
                const totalCount = resp.operation.meta.secretcount;
                if (curFetchCount == totalCount) {
                    return;
                }
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async addVApiSecretResponse(respSecret) {
        try {
            const secret = await this.parseVApiSecretResponse(respSecret);
            await accountDb.secretTable.save(secret);
            await domainHandler.add(secret);
            return accountDb.secretTable.get(secret.id);
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async parseVApiSecretResponse(respSecret) {
        return this.secretParser.parse(respSecret);
    }
    async updateAutoLogin(secretId, enable) {
        try {
            await vapi.secret.setProperty(secretId, { autosubmit: enable });
            const secret = await accountDb.secretTable.get(secretId);
            secret.auto_submit = enable;
            await accountDb.secretTable.put(secret);
            bgEventServer.secret.changed(secretId);
        }
        catch (e) {
            logError(e);
        }
    }
}
