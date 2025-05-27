import { bg } from "../../../src/bg/bg.js";
import { accountDb } from "../../../src/bg/Context.js";
import { CSFillValue, LoginData, Secret } from "../../../src/service/bgApi/types/Secret.js";
import { VI18N } from "../../../src/service/vt/VI18n.js";
import { LoginTabGetter } from "./login/LoginTabGetter.js";
import { SecretRecording } from "./SecretRecording.js";
export class SecretLogin {
    loadingTabUrl = brApi.runtime.getUrl("/html/loading.html");
    p = null;
    recording = new SecretRecording();
    loginTabGetter = new LoginTabGetter(this);
    init(p) {
        this.p = p;
        this.recording.init();
    }
    async login(input) {
        try {
            await this.showLoading(input);
            const { secretId, url } = input;
            const secret = await this.p.secretGetter.getSecret(secretId);
            const hasAccess = Secret.hasAccess(secret);
            if (!hasAccess) {
                bg.ztabHandler.getSecretAccess(secretId);
                return;
            }
            const recordingPromise = this.recording.getRecording(url);
            const loginData = await this.getLoginData(secretId);
            await bg.basicAuthenticationHandler.handleBasicAuthenticationLogin(loginData);
            const tab = await this.loginTabGetter.getLoginTab(input, loginData);
            if (!tab) {
                info(SecretLogin.name, "empty login tab", input, js.log.mask(loginData, { keys: ["texts", "passwords"] }));
                return;
            }
            const basicAuthenticationDone = bg.basicAuthenticationHandler.finishBasicAuthentication();
            if (basicAuthenticationDone) {
                this.finishLogin(secretId, tab.id);
                return;
            }
            let recording = await recordingPromise;
            const parentDomain = js.url.getParentDomain(url);
            if (!recording && js.url.getHost(url) != parentDomain) {
                recording = await this.recording.getRecording("https://" + js.url.getParentDomain(url));
            }
            if (recording) {
                this.recording.login(loginData, recording, tab, url);
                this.finishLogin(secretId, tab.id);
                return;
            }
            for (let i = 0; i < 10; i++) {
                if (await csApi.isConnectable({ tabId: tab.id })) {
                    break;
                }
                await js.time.delay(0.3);
            }
            const frames = await this.loginTabGetter.getValidLoginFrames(tab.id, loginData);
            frames.forEach(x => csApi.login.login(loginData, { tabId: tab.id, frameId: x.frameId }));
            this.finishLogin(secretId, tab.id);
        }
        catch (e) {
            logError(e);
        }
    }
    async showLoading(input) {
        try {
            if (!input.showLoading) {
                return;
            }
            await brApi.tab.updateTab(input.tabId, { url: this.loadingTabUrl });
        }
        catch (e) {
            logError(e);
        }
    }
    finishLogin(secretId, tabId) {
        bg.vaultAudit.auditLogin(secretId);
        this.addRecent(secretId, tabId);
    }
    async frameLogin(tabId, frameId, secretId) {
        try {
            const secret = await this.p.secretGetter.getSecret(secretId);
            const hasAccess = Secret.hasAccess(secret);
            if (!hasAccess) {
                bg.ztabHandler.getSecretAccess(secretId);
                return;
            }
            const loginData = await this.getLoginData(secretId);
            const tab = await brApi.tab.getTab(tabId);
            const oneClickCheckOk = await this.loginTabGetter.isOneClickLoginCheckOk(tab, loginData);
            if (!oneClickCheckOk) {
                bg.csUtil.showAlert(tab.id, { message: i18n(VI18N.DEV_TOOLS_NEWTAB_LOGIN) });
                return;
            }
            if (!loginData.submit) {
                this.frameLoginFn(tabId, frameId, loginData);
                return;
            }
            const activeInputType = await csApi.login.getActiveInputLoginType({ tabId, frameId });
            if (activeInputType == "password" || activeInputType == "totp") {
                this.frameLoginFn(tabId, frameId, loginData);
                return;
            }
            const recording = await this.recording.getRecording(tab.url);
            if (!recording) {
                this.frameLoginFn(tabId, frameId, loginData);
                return;
            }
            this.recording.login(loginData, recording, tab, tab.url);
            bg.vaultAudit.auditLogin(secretId);
            this.addRecent(secretId, tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async loginFromWeb(secretId, url) {
        try {
            const unlocked = await bg.vault.isUnlocked();
            if (!unlocked) {
                return;
            }
            const secret = await this.p.secretGetter.getServerSecret(secretId);
            const secretDomains = secret.urls.map(url => js.url.getParentDomain(url));
            const selectedDomain = js.url.getParentDomain(url);
            const validDomain = secretDomains.includes(selectedDomain);
            if (!validDomain) {
                return;
            }
            await this.login({ secretId, url });
        }
        catch (e) {
            logError(e);
        }
    }
    async frameFill(tabId, frameId, secretId) {
        try {
            const loginData = await this.getLoginData(secretId);
            loginData.submit = false;
            csApi.login.frameLogin(loginData, { tabId, frameId });
            bg.vaultAudit.auditFill(secretId);
            this.addRecent(secretId, tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async cardFill(tabId, frameId, secret) {
        try {
            csApi.login.fillCard(secret, { tabId, frameId });
            bg.vaultAudit.auditFill(secret.id);
            this.addRecent(secret.id, tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async formFill(tabId, frameId, secret) {
        try {
            csApi.login.fillForm(secret, { tabId, frameId });
            bg.vaultAudit.auditFill(secret.id);
            this.addRecent(secret.id, tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async formFieldFill(tabId, frameId, data) {
        try {
            csApi.login.fillFormField(data, { tabId, frameId });
            bg.vaultAudit.auditFill(data.secretId);
            this.addRecent(data.secretId, tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async cardFillIframe(tabId, frameId, secretId, data) {
        try {
            csApi.card.fillCardIframe(data, { tabId, frameId });
            if (data.card["ccnumber"]) {
                bg.vaultAudit.auditFill(secretId);
                this.addRecent(secretId, tabId);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async fillField(tabId, frameId, secretId, fieldName) {
        try {
            const fieldLabelObj = { label: "" };
            const fillValue = await this.getCSFillValue(secretId, fieldName, fieldLabelObj);
            csApi.login.fillValue(fillValue, { tabId, frameId });
            bg.vaultAudit.auditFillField(secretId, fieldLabelObj.label);
            this.addRecent(secretId, tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async fillTotp(tabId, frameId, secretId) {
        try {
            const fillValue = await this.getCSTotpFillValue(secretId);
            csApi.login.fillValue(fillValue, { tabId, frameId });
            bg.vaultAudit.auditFillField(secretId, "TOTP");
            this.addRecent(secretId, tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async fillOneAuthTotp(tabId, frameId, secretId, oneauthId) {
        try {
            const totp = await bg.oneAuthTotp.getTotp(oneauthId);
            if (!totp) {
                return;
            }
            const fillValue = await this.getCSTotpFillValue(secretId, totp);
            csApi.login.fillValue(fillValue, { tabId, frameId });
            bg.vaultAudit.auditFillField(secretId, "TOTP");
            this.addRecent(secretId, tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async fillCustomCol(tabId, frameId, secretId, columnId) {
        try {
            const fieldLabelObj = { label: "" };
            const fillValue = await this.getCSCustomColFillValue(secretId, columnId, fieldLabelObj);
            csApi.login.fillValue(fillValue, { tabId, frameId });
            bg.vaultAudit.auditFillField(secretId, fieldLabelObj.label);
            this.addRecent(secretId, tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async frameLoginFn(tabId, frameId, loginData) {
        try {
            csApi.login.frameLogin(loginData, { tabId, frameId });
            bg.vaultAudit.auditLogin(loginData.secretId);
            this.addRecent(loginData.secretId, tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async getLoginData(secretId) {
        try {
            const secret = await this.p.secretGetter.getSecret(secretId);
            const secretType = await accountDb.secretTypeTable.load(secret.type_id);
            const passwordFieldGetter = new PasswordLoginFieldGetter();
            const passwords = await passwordFieldGetter.getValues(secret, secretType);
            const passwordFieldNames = passwordFieldGetter.fieldNames;
            const loginData = {
                secretId: secret.id,
                shareLevel: secret.sharing_level,
                hasTotp: secret.has_totp,
                submit: secret.auto_submit,
                allowedDomains: secret.urls.map(x => js.url.getParentDomain(x)),
                texts: await new TextLoginFieldGetter().getValues(secret, secretType),
                passwords,
                passwordFieldNames,
                step: LoginData.STEP.FILL_USERNAME,
                redirectedCount: 0,
                oneauthId: secret.oneauth_id
            };
            return loginData;
        }
        catch (e) {
            logError(e);
            return new LoginData();
        }
    }
    async getCSFillValue(secretId, fieldName, fieldLabelObj) {
        try {
            const secret = await this.p.secretGetter.getSecret(secretId);
            const encryptedValue = secret.encrypted.fields[fieldName];
            if (!encryptedValue) {
                throw "encrypted value not present";
            }
            const value = await bg.zcrypt.decrypt(encryptedValue, secret.shared);
            const secretType = await accountDb.secretTypeTable.load(secret.type_id);
            const secretTypeField = secretType.fields.find(x => x.name == fieldName);
            const type = secretTypeField.type;
            const fillValue = {
                allowedDomains: secret.urls.map(x => js.url.getParentDomain(x)),
                value,
                type,
                secretId,
                shareLevel: secret.sharing_level
            };
            fieldLabelObj.label = secretTypeField.label;
            return fillValue;
        }
        catch (e) {
            logError(e);
            return new CSFillValue();
        }
    }
    async getCSTotpFillValue(secretId, totpValue = null) {
        try {
            const secret = await accountDb.secretTable.get(secretId);
            const totp = totpValue ? totpValue : await this.p.getTotp(secretId);
            const fillValue = {
                allowedDomains: secret.urls.map(x => js.url.getParentDomain(x)),
                value: totp,
                type: CSFillValue.FIELD_TYPE.TOTP,
                secretId,
                shareLevel: secret.sharing_level
            };
            return fillValue;
        }
        catch (e) {
            logError(e);
            return new CSFillValue();
        }
    }
    async getCSCustomColFillValue(secretId, columnId, fieldLabelObj) {
        try {
            const secret = await this.p.secretGetter.getSecret(secretId);
            const column = secret.encrypted.custom_columns.find(x => x.id == columnId);
            if (!column) {
                throw "cannot find column";
            }
            const encryptedValue = column.value;
            if (!encryptedValue) {
                throw "encrypted value not present";
            }
            const value = await bg.zcrypt.decrypt(encryptedValue, secret.shared);
            const fillValue = {
                allowedDomains: secret.urls.map(x => js.url.getParentDomain(x)),
                value,
                type: column.type,
                secretId,
                shareLevel: secret.sharing_level
            };
            fieldLabelObj.label = column.colname;
            return fillValue;
        }
        catch (e) {
            logError(e);
            return new CSFillValue();
        }
    }
    async addRecent(secretId, tabId) {
        try {
            await accountDb.recentSecretTable.update(secretId);
            const tab = await brApi.tab.getTab(tabId);
            await accountDb.hostRecentSecretTable.add(tab.url, secretId);
        }
        catch (e) {
            logError(e);
        }
    }
}
class LoginFieldGetter {
    fieldNames = [];
    async getValues(secret, secretType) {
        try {
            const encryptedFields = secret.encrypted.fields;
            const validValues = [];
            const fields = this.getFields(secretType);
            for (let field of fields) {
                try {
                    if (!encryptedFields[field.name]) {
                        continue;
                    }
                    this.fieldNames.push(field.name);
                    validValues.push(await bg.zcrypt.decrypt(encryptedFields[field.name], secret.shared));
                }
                catch (e) {
                    logError(e);
                }
            }
            return validValues;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    getFields(secretType) {
        return secretType.fields;
    }
}
class TextLoginFieldGetter extends LoginFieldGetter {
    getFields(secretType) {
        return secretType.text_fields;
    }
}
class PasswordLoginFieldGetter extends LoginFieldGetter {
    getFields(secretType) {
        return secretType.password_fields;
    }
}
