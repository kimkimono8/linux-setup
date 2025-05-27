(function () {
    'use strict';

    class ConfigImpl {
        configObj = null;
        async init() {
            try {
                this.configObj = await fetch("/conf/zvconfig.json").then(x => x.json());
                if (!isDevMode) {
                    return;
                }
                const devConfig = await fetch("/conf/zvconfig_dev.json").then(x => x.json());
                Object.assign(this.configObj, devConfig);
            }
            catch (e) {
                logError(e);
            }
        }
        get(key, defaultValue = null) {
            try {
                if (!this.configObj) {
                    throw "CONFIG_NOT_INITIALIZED";
                }
                if (!(key in this.configObj)) {
                    return defaultValue;
                }
                return (this.configObj[key]);
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }

    function main$6() {
        globalThis.config = new ConfigImpl();
    }

    var VtApiPortNames;
    (function (VtApiPortNames) {
        VtApiPortNames["BG"] = "BG";
        VtApiPortNames["CS"] = "CS";
        VtApiPortNames["CS_CARD"] = "CS_CARD";
        VtApiPortNames["CS_VAULT_WEB"] = "CS_VAULT_WEB";
        VtApiPortNames["CS_WEBAUTHN_UNLOCK"] = "CS_WEBAUTHN_UNLOCK";
        VtApiPortNames["RESET"] = "RESET";
        VtApiPortNames["ZTAB"] = "ZTAB";
        VtApiPortNames["POPUP"] = "POPUP";
        VtApiPortNames["SIDE_PANEL"] = "SIDE_PANEL";
        VtApiPortNames["OFFSCREEN"] = "OFFSCREEN";
        VtApiPortNames["OAUTH"] = "OAUTH";
    })(VtApiPortNames || (VtApiPortNames = {}));

    class CSApiContext {
        apiClient;
    }

    class CSCardApiImpl {
        context;
        prefix = "card.";
        constructor(context) {
            this.context = context;
        }
        async fillCardIframe(data, tabFrameIdparams) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillCardIframe.name, args: [data], connect: tabFrameIdparams });
        }
        async fillVaultIconCCIframe(fields, tabFrameIdparams) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillVaultIconCCIframe.name, args: [fields], connect: tabFrameIdparams });
        }
        async showFormFrame(tabId, frameUrl) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showFormFrame.name, args: [frameUrl], connect: { tabId, frameId: 0 } });
        }
        async checkIframeFields(tabId, data) {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkIframeFields.name, args: [data], connect: { tabId, frameId: 0 } });
        }
    }

    class CSFrameApiImpl {
        context;
        prefix = "frame.";
        constructor(context) {
            this.context = context;
        }
        async showConfirmFrame(tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showConfirmFrame.name, connect: { tabId } });
        }
        async showSaveFrame(tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showSaveFrame.name, connect: { tabId } });
        }
        async showFormFrame(tabId, frameUrl) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showFormFrame.name, args: [frameUrl], connect: { tabId } });
        }
        async showSaveCardFrame(tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showSaveCardFrame.name, connect: { tabId } });
        }
        async showUpdateCardFrame(tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showUpdateCardFrame.name, connect: { tabId } });
        }
        async showCardFrame(tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showCardFrame.name, connect: { tabId } });
        }
        async closeCardFrame(tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeCardFrame.name, connect: { tabId } });
        }
        async closeSaveCardFrame(tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeSaveCardFrame.name, connect: { tabId } });
        }
        async showUpdateFrame(tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showUpdateFrame.name, connect: { tabId } });
        }
        async showSiteFrame(tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showSiteFrame.name, connect: { tabId } });
        }
        async closeFrame(params, tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeFrame.name, args: [params], connect: { tabId } });
        }
        async closeSiteFrame(params, tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeSiteFrame.name, args: [params], connect: { tabId } });
        }
        async showAlertFrame(tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showAlertFrame.name, connect: { tabId } });
        }
        async downloadFile(param, tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.downloadFile.name, args: [param], connect: { tabId } });
        }
    }

    class CSLoginApiImpl {
        context;
        prefix = "login.";
        constructor(context) {
            this.context = context;
        }
        async fillActiveInput(value, tabFrameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillActiveInput.name, args: [value], connect: tabFrameId });
        }
        async fillValue(fillValue, tabFrameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillValue.name, args: [fillValue], connect: tabFrameId });
        }
        async login(loginData, tabFrameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.login.name, args: [loginData], connect: tabFrameId });
        }
        async frameLogin(loginData, tabFrameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.frameLogin.name, args: [loginData], connect: tabFrameId });
        }
        async fillCard(secret, tabFrameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillCard.name, args: [secret], connect: tabFrameId });
        }
        async fillForm(secret, tabFrameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillForm.name, args: [secret], connect: tabFrameId });
        }
        async fillFormField(data, tabFrameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillFormField.name, args: [data], connect: tabFrameId });
        }
        async getActiveInputLoginType(tabFrameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getActiveInputLoginType.name, connect: tabFrameId });
        }
        async fillGeneratedPassword(value, tabFrameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillGeneratedPassword.name, args: [value], connect: tabFrameId });
        }
        async hasValidLoginField(tabFrameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.hasValidLoginField.name, connect: tabFrameId });
        }
    }

    class CSOtherApiImpl {
        context;
        prefix = "other.";
        constructor(context) {
            this.context = context;
        }
        async setConfirmResponse(allow, tabFrameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.setConfirmResponse.name, connect: tabFrameId, args: [allow] });
        }
        async resetPassword(tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.resetPassword.name, connect: { tabId, frameId: 0 } });
        }
        async getFrameUrl(tabFrameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getFrameUrl.name, connect: tabFrameId });
        }
        async showSiteFrame(params, tabFrameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showSiteFrame.name, connect: tabFrameId, args: [params] });
        }
        async showCardFrame(tabFrameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showCardFrame.name, connect: tabFrameId });
        }
        async getGeneratorSaveUsername(tabFrameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getGeneratorSaveUsername.name, connect: tabFrameId });
        }
        async getFilledFormData(tabFrameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getFilledFormData.name, connect: tabFrameId });
        }
    }

    class CSVaultWebApiClientImpl {
        tryUnlock(tabId) {
            const apiClient = portApi.createApiClient();
            apiClient.init({ name: VtApiPortNames.CS_VAULT_WEB });
            apiClient.callApi({ path: this.tryUnlock.name, connect: { tabId } });
        }
    }

    class CSWebAuthnUnlockApiImpl {
        async getCredential(challenge, credentialIds, tabId) {
            const apiClient = portApi.createApiClient();
            await apiClient.init({ name: VtApiPortNames.CS_WEBAUTHN_UNLOCK, checkConnectionBeforeApiCall: true });
            return fnOut.parse(await apiClient.callApi({ path: this.getCredential.name, args: [challenge, credentialIds], connect: { tabId } }));
        }
    }

    class CSApiImpl {
        context = new CSApiContext();
        frame = new CSFrameApiImpl(this.context);
        login = new CSLoginApiImpl(this.context);
        other = new CSOtherApiImpl(this.context);
        web = new CSVaultWebApiClientImpl();
        webauthnUnlock = new CSWebAuthnUnlockApiImpl();
        card;
        init() {
            try {
                const apiClient = this.context.apiClient = portApi.createApiClient();
                apiClient.init({ name: VtApiPortNames.CS });
                this.initCardClient();
            }
            catch (e) {
                logError(e);
            }
        }
        initCardClient() {
            try {
                const cardApiClient = portApi.createApiClient();
                cardApiClient.init({ name: VtApiPortNames.CS_CARD });
                const cardContext = new CSApiContext();
                cardContext.apiClient = cardApiClient;
                this.card = new CSCardApiImpl(cardContext);
            }
            catch (e) {
                logError(e);
            }
        }
        isConnectable(params) {
            return this.context.apiClient.isConnectable(params);
        }
    }

    function main$5() {
        globalThis.csApi = new CSApiImpl();
    }

    let BgAccessCtrlApiImpl$1 = class BgAccessCtrlApiImpl {
        context;
        prefix = "accessCtrl.";
        constructor(context) {
            this.context = context;
        }
        async update(apiInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.update.name, args: [apiInput] });
        }
        async getAccessCtrlSettings(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getAccessCtrlSettings.name, args: [secretId] });
        }
        async createRequest(input) {
            return this.context.apiClient.callApi({ path: this.prefix + this.createRequest.name, args: [input] });
        }
        async getAccessPendingUIInfo(accessRequestId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getAccessPendingUIInfo.name, args: [accessRequestId] });
        }
        async cancel(accessRequestId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.cancel.name, args: [accessRequestId] });
        }
        async checkout(accessRequestId, secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkout.name, args: [accessRequestId, secretId] });
        }
        async checkin(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkin.name, args: [secretId] });
        }
        async disable(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.disable.name, args: [secretId] });
        }
        async isHelpdeskEnabled(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.isHelpdeskEnabled.name, args: [secretId] });
        }
    };

    class BgApiContext {
        apiClient;
    }

    let BgAuditApiImpl$1 = class BgAuditApiImpl {
        context;
        prefix = "audit.";
        constructor(context) {
            this.context = context;
        }
        async secretAccessed(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.secretAccessed.name, args: [secretId] });
        }
        async fieldViewed(secretId, fieldName) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fieldViewed.name, args: [secretId, fieldName] });
        }
        async columnViewed(secretId, columnId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.columnViewed.name, args: [secretId, columnId] });
        }
        async totpKeyViewed(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.totpKeyViewed.name, args: [secretId] });
        }
        async fieldCopied(secretId, fieldName) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fieldCopied.name, args: [secretId, fieldName] });
        }
        async customColumnCopied(secretId, columnId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.customColumnCopied.name, args: [secretId, columnId] });
        }
        async notesCopied(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.notesCopied.name, args: [secretId] });
        }
    };

    let BgCardFrameApiImpl$1 = class BgCardFrameApiImpl {
        context;
        prefix = "cardFrame.";
        constructor(context) {
            this.context = context;
        }
        async getTabUrl() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getTabUrl.name });
        }
        async showFormFrame(frameUrl) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showFormFrame.name, args: [frameUrl] });
        }
        async closeCardFrame() {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeCardFrame.name });
        }
        async showSaveCardFrame(cardObj) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showSaveCardFrame.name, args: [cardObj] });
        }
        async showUpdateCardFrame(cardObj) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showUpdateCardFrame.name, args: [cardObj] });
        }
        async closeSaveCardFrame() {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeSaveCardFrame.name });
        }
        async getSecrets(query) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getSecrets.name, args: [query] });
        }
        async fillCard(secret, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillCard.name, args: [secret, frameId] });
        }
        async getCardCategory() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getCardCategory.name });
        }
        async fillCardIframe(data, secretId, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillCardIframe.name, args: [data, secretId, frameId] });
        }
        async fillForm(secret, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillForm.name, args: [secret, frameId] });
        }
        async fillFormField(data, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillFormField.name, args: [data, frameId] });
        }
        async checkIframeFields(data) {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkIframeFields.name, args: [data] });
        }
        async fillVaultIconCCIframe(fields, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillVaultIconCCIframe.name, args: [fields, frameId] });
        }
    };

    let BgCryptoApiImpl$1 = class BgCryptoApiImpl {
        context;
        prefix = "crypto.";
        file;
        ext;
        constructor(context) {
            this.context = context;
            this.file = new BgFileCryptoApiImpl$1(context);
            this.ext = new BgExtCryptoApiImpl$1(context);
        }
        async encrypt(plaintext, isShared) {
            return this.context.apiClient.callApi({ path: this.prefix + this.encrypt.name, args: [plaintext, isShared] });
        }
        async decrypt(ciphertext, isShared) {
            return this.context.apiClient.callApi({ path: this.prefix + this.decrypt.name, args: [ciphertext, isShared] });
        }
        async getKey(isShared) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getKey.name, args: [isShared] });
        }
        async getIsShared(classification) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getIsShared.name, args: [classification] });
        }
    };
    let BgFileCryptoApiImpl$1 = class BgFileCryptoApiImpl {
        context;
        prefix = "crypto.file.";
        constructor(context) {
            this.context = context;
        }
        async encrypt(plaintext, isShared) {
            return this.context.apiClient.callApi({ path: this.prefix + this.encrypt.name, args: [plaintext, isShared] });
        }
        async decrypt(ciphertext, isShared) {
            return this.context.apiClient.callApi({ path: this.prefix + this.decrypt.name, args: [ciphertext, isShared] });
        }
    };
    let BgExtCryptoApiImpl$1 = class BgExtCryptoApiImpl {
        context;
        prefix = "crypto.ext.";
        constructor(context) {
            this.context = context;
        }
        async encrypt(plaintext) {
            return this.context.apiClient.callApi({ path: this.prefix + this.encrypt.name, args: [plaintext] });
        }
        async decrypt(ciphertext) {
            return this.context.apiClient.callApi({ path: this.prefix + this.decrypt.name, args: [ciphertext] });
        }
    };

    let BgFolderApiImpl$1 = class BgFolderApiImpl {
        context;
        prefix = "folder.";
        constructor(context) {
            this.context = context;
        }
        async queryTree(query) {
            return this.context.apiClient.callApi({ path: this.prefix + this.queryTree.name, args: [query] });
        }
        async query(query) {
            return this.context.apiClient.callApi({ path: this.prefix + this.query.name, args: [query] });
        }
        async queryEditable(query) {
            return this.context.apiClient.callApi({ path: this.prefix + this.queryEditable.name, args: [query] });
        }
        async get(folderId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.get.name, args: [folderId] });
        }
    };

    let BgGeneratorApiImpl$1 = class BgGeneratorApiImpl {
        context;
        prefix = "generator.";
        history;
        constructor(context) {
            this.context = context;
            this.history = new BgGeneratorHistoryApiImpl$1(context);
        }
        async generatePassword(input) {
            return this.context.apiClient.callApi({ path: this.prefix + this.generatePassword.name, args: [input] });
        }
        async getComplexity(password) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getComplexity.name, args: [password] });
        }
        async generatePolicyPassword(policyId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.generatePolicyPassword.name, args: [policyId] });
        }
        async generatePassphrase(input) {
            return this.context.apiClient.callApi({ path: this.prefix + this.generatePassphrase.name, args: [input] });
        }
    };
    let BgGeneratorHistoryApiImpl$1 = class BgGeneratorHistoryApiImpl {
        context;
        prefix = "generator.history.";
        constructor(context) {
            this.context = context;
        }
        async get() {
            return this.context.apiClient.callApi({ path: this.prefix + this.get.name });
        }
        async clear() {
            return this.context.apiClient.callApi({ path: this.prefix + this.clear.name });
        }
        async add(password) {
            return this.context.apiClient.callApi({ path: this.prefix + this.add.name, args: [password] });
        }
    };

    let BgLoginApiImpl$1 = class BgLoginApiImpl {
        context;
        prefix = "login.";
        constructor(context) {
            this.context = context;
        }
        async isLoggedIn() {
            return this.context.apiClient.callApi({ path: this.prefix + this.isLoggedIn.name, args: [] });
        }
        async isUnlocked() {
            return this.context.apiClient.callApi({ path: this.prefix + this.isUnlocked.name, args: [] });
        }
        async generateOauthTokens() {
            return this.context.apiClient.callApi({ path: this.prefix + this.generateOauthTokens.name, args: [] });
        }
        async refreshTokenIfExpired() {
            return this.context.apiClient.callApi({ path: this.prefix + this.refreshTokenIfExpired.name, args: [] });
        }
        async initLogin() {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.initLogin.name, args: [] }));
        }
        async unlock(passphrase) {
            return this.context.apiClient.callApi({ path: this.prefix + this.unlock.name, args: [passphrase] });
        }
        async lock() {
            return this.context.apiClient.callApi({ path: this.prefix + this.lock.name, args: [] });
        }
        async signOut() {
            return this.context.apiClient.callApi({ path: this.prefix + this.signOut.name, args: [] });
        }
        async checkConnectable() {
            return this.context.apiClient.isConnectable();
        }
    };

    let BgOtherApiImpl$1 = class BgOtherApiImpl {
        context;
        prefix = "other.";
        constructor(context) {
            this.context = context;
        }
        async updateLastActive() {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateLastActive.name });
        }
        async copyToClipboard(text, options) {
            return this.context.apiClient.callApi({ path: this.prefix + this.copyToClipboard.name, args: [text, options] });
        }
        async getLogo(url) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getLogo.name, args: [url] });
        }
        async closeUnlockTab() {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeUnlockTab.name });
        }
        async sendRuntimeMessage(msg) {
            return this.context.apiClient.callApi({ path: this.prefix + this.sendRuntimeMessage.name, args: [msg] });
        }
        async clearClipboard() {
            return this.context.apiClient.callApi({ path: this.prefix + this.clearClipboard.name });
        }
        updateLogo(force) {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateLogo.name, args: [force] });
        }
        echo(x) {
            return this.context.apiClient.callApi({ path: this.prefix + this.echo.name, args: [x] });
        }
        sidePanelClosed() {
            return this.context.apiClient.callApi({ path: this.prefix + this.sidePanelClosed.name });
        }
        devToolsOpened(tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.devToolsOpened.name, args: [tabId] });
        }
        devToolsCloseTab() {
            return this.context.apiClient.callApi({ path: this.prefix + this.devToolsCloseTab.name });
        }
    };

    let BgPolicyApiImpl$1 = class BgPolicyApiImpl {
        context;
        prefix = "policy.";
        constructor(context) {
            this.context = context;
        }
        checkPolicyPassword(password, policyId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkPolicyPassword.name, args: [password, policyId] });
        }
        check(password) {
            return this.context.apiClient.callApi({ path: this.prefix + this.check.name, args: [password] });
        }
        getAll() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getAll.name });
        }
        get(policyId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.get.name, args: [policyId] });
        }
    };

    let BgSaveFrameApiImpl$1 = class BgSaveFrameApiImpl {
        context;
        prefix = "saveFrame.";
        constructor(context) {
            this.context = context;
        }
        async showSaveFrame() {
            return this.context.apiClient.callApi({ path: this.prefix + this.showSaveFrame.name });
        }
        async saveCredential(saveCredential) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveCredential.name, args: [saveCredential] });
        }
        async disableSavePassword() {
            return this.context.apiClient.callApi({ path: this.prefix + this.disableSavePassword.name });
        }
        async getData() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getData.name });
        }
        async saveSecret(saveFrameUserInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveSecret.name, args: [saveFrameUserInput] });
        }
        async editSecret(saveFrameUserInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.editSecret.name, args: [saveFrameUserInput] });
        }
        async closeSaveFrame(params) {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeSaveFrame.name, args: [params] });
        }
    };

    let BgSecretApiImpl$1 = class BgSecretApiImpl {
        context;
        prefix = "secret.";
        edit;
        share;
        totp;
        file;
        history;
        constructor(context) {
            this.context = context;
            this.edit = new BgSecretEditApiImpl$1(context);
            this.share = new BgSecretShareApiImpl$1(context);
            this.totp = new BgSecretTotpApiImpl$1(context);
            this.file = new BgSecretFileApiImpl$1(context);
            this.history = new BgSecretHistoryApiImpl$1(context);
        }
        query(query) {
            return this.context.apiClient.callApi({ path: this.prefix + this.query.name, args: [query] });
        }
        add(secretAddInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.add.name, args: [secretAddInput] });
        }
        delete(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.delete.name, args: [secretId] });
        }
        async querySecrets(query) {
            return this.context.apiClient.callApi({ path: this.prefix + this.querySecrets.name, args: [query] });
        }
        async getSecret(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getSecret.name, args: [secretId] });
        }
        async getDbSecret(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getDbSecret.name, args: [secretId] });
        }
        async getServerSecret(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getServerSecret.name, args: [secretId] });
        }
        async getTrashedSecret(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getTrashedSecret.name, args: [secretId] });
        }
        async changeFavourite(secretId, favourite) {
            return this.context.apiClient.callApi({ path: this.prefix + this.changeFavourite.name, args: [secretId, favourite] });
        }
        async copyField(secretId, fieldName) {
            return this.context.apiClient.callApi({ path: this.prefix + this.copyField.name, args: [secretId, fieldName] });
        }
        async copyTotp(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.copyTotp.name, args: [secretId] });
        }
        async copyOneAuthTotp(secretId, totp) {
            return this.context.apiClient.callApi({ path: this.prefix + this.copyOneAuthTotp.name, args: [secretId, totp] });
        }
        async copyCustomColumn(secretId, columnId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.copyCustomColumn.name, args: [secretId, columnId] });
        }
        async login(secretId, url, incognito) {
            return this.context.apiClient.callApi({ path: this.prefix + this.login.name, args: [secretId, url, incognito] });
        }
        async loginFromWeb(secretId, url) {
            return this.context.apiClient.callApi({ path: this.prefix + this.loginFromWeb.name, args: [secretId, url] });
        }
        async deleteSecret(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.deleteSecret.name, args: [secretId] });
        }
        async downloadFile(secretId, fileId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.downloadFile.name, args: [secretId, fileId] });
        }
        async downloadAllFiles(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.downloadAllFiles.name, args: [secretId] });
        }
        async updateFiles(secretId, files) {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateFiles.name, args: [secretId, files] });
        }
        async resetPassword(secretId, fieldName) {
            return this.context.apiClient.callApi({ path: this.prefix + this.resetPassword.name, args: [secretId, fieldName] });
        }
        async generateTotp(totpUrl) {
            return this.context.apiClient.callApi({ path: this.prefix + this.generateTotp.name, args: [totpUrl] });
        }
        async getTotpParams(totpUrl) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getTotpParams.name, args: [totpUrl] });
        }
        async getDomainMatchingCount() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getDomainMatchingCount.name });
        }
        async getTotpOf(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getTotpOf.name, args: [secretId] });
        }
        async checkExistingPasswordName(name) {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkExistingPasswordName.name, args: [name] });
        }
        async checkPolicyFor(password) {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkPolicyFor.name, args: [password] });
        }
        async checkPasswordPolicy(password, policyId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkPasswordPolicy.name, args: [password, policyId] });
        }
        async queryTags(query) {
            return this.context.apiClient.callApi({ path: this.prefix + this.queryTags.name, args: [query] });
        }
        async getEditUIInput(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getEditUIInput.name, args: [secretId] });
        }
        async updateSecret(secretEditInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateSecret.name, args: [secretEditInput] });
        }
        async getUserUIInput(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getUserUIInput.name, args: [secretId] });
        }
        async updateUserSharing(sharingInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateUserSharing.name, args: [sharingInput] });
        }
        async reEncryptSecretForSharing(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.reEncryptSecretForSharing.name, args: [secretId] });
        }
        async getUserGroupUIInput(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getUserGroupUIInput.name, args: [secretId] });
        }
        async updateUserGroupSharing(sharingInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateUserGroupSharing.name, args: [sharingInput] });
        }
        async updateSecretInServer(input) {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateSecretInServer.name, args: [input] });
        }
        async getPasswordHistory(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getPasswordHistory.name, args: [secretId] });
        }
        async getColumnHistory(secretId, columnName) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getColumnHistory.name, args: [secretId, columnName] });
        }
        async getOneAuthTotp(oneauthId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getOneAuthTotp.name, args: [oneauthId] });
        }
        async getSearchHighlightField(secret, searchString) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getSearchHighlightField.name, args: [secret, searchString] });
        }
        async shareToThirdParty(thirdPartyShareInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.shareToThirdParty.name, args: [thirdPartyShareInput] });
        }
        async updateAutoLogin(secretId, enable) {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateAutoLogin.name, args: [secretId, enable] });
        }
        async suggestNewName(params) {
            return this.context.apiClient.callApi({ path: this.prefix + this.suggestNewName.name, args: [params] });
        }
        async getAddPasswordClassifications() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getAddPasswordClassifications.name });
        }
    };
    let BgSecretEditApiImpl$1 = class BgSecretEditApiImpl {
        context;
        prefix = "secret.edit.";
        constructor(context) {
            this.context = context;
        }
        update(secretEditInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.update.name, args: [secretEditInput] });
        }
        getUIInput(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getUIInput.name, args: [secretId] });
        }
        setAutoLogin(secretId, enable) {
            return this.context.apiClient.callApi({ path: this.prefix + this.setAutoLogin.name, args: [secretId, enable] });
        }
        setFavourite(secretId, favourite) {
            return this.context.apiClient.callApi({ path: this.prefix + this.setFavourite.name, args: [secretId, favourite] });
        }
    };
    let BgSecretShareApiImpl$1 = class BgSecretShareApiImpl {
        context;
        prefix = "secret.share.";
        user;
        userGroup;
        constructor(context) {
            this.context = context;
            this.user = new BgSecretShareUserApiImpl$1(context);
            this.userGroup = new BgSecretShareUserGroupApiImpl$1(context);
        }
        reEncryptSecretForSharing(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.reEncryptSecretForSharing.name, args: [secretId] });
        }
        async shareToThirdParty(thirdPartyShareInput) {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.shareToThirdParty.name, args: [thirdPartyShareInput] }));
        }
    };
    let BgSecretShareUserApiImpl$1 = class BgSecretShareUserApiImpl {
        context;
        prefix = "secret.share.user.";
        constructor(context) {
            this.context = context;
        }
        getUIInput(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getUIInput.name, args: [secretId] });
        }
        update(sharingInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.update.name, args: [sharingInput] });
        }
    };
    let BgSecretShareUserGroupApiImpl$1 = class BgSecretShareUserGroupApiImpl {
        context;
        prefix = "secret.share.userGroup.";
        constructor(context) {
            this.context = context;
        }
        getUIInput(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getUIInput.name, args: [secretId] });
        }
        update(sharingInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.update.name, args: [sharingInput] });
        }
    };
    let BgSecretTotpApiImpl$1 = class BgSecretTotpApiImpl {
        context;
        prefix = "secret.totp.";
        constructor(context) {
            this.context = context;
        }
        copy(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.copy.name, args: [secretId] });
        }
        copyOneAuthTotp(secretId, totp) {
            return this.context.apiClient.callApi({ path: this.prefix + this.copyOneAuthTotp.name, args: [secretId, totp] });
        }
        generate(totpUrl) {
            return this.context.apiClient.callApi({ path: this.prefix + this.generate.name, args: [totpUrl] });
        }
        getParams(totpUrl) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getParams.name, args: [totpUrl] });
        }
        getTotp(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getTotp.name, args: [secretId] });
        }
        getOneAuthTotp(oneauthId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getOneAuthTotp.name, args: [oneauthId] });
        }
    };
    let BgSecretFileApiImpl$1 = class BgSecretFileApiImpl {
        context;
        prefix = "secret.file.";
        constructor(context) {
            this.context = context;
        }
        download(secretId, fileId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.download.name, args: [secretId, fileId] });
        }
        downloadAll(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.downloadAll.name, args: [secretId] });
        }
        update(secretId, files) {
            return this.context.apiClient.callApi({ path: this.prefix + this.update.name, args: [secretId, files] });
        }
    };
    let BgSecretHistoryApiImpl$1 = class BgSecretHistoryApiImpl {
        context;
        prefix = "secret.history.";
        constructor(context) {
            this.context = context;
        }
        getPasswordHistory(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getPasswordHistory.name, args: [secretId] });
        }
        getColumnHistory(secretId, columnName) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getColumnHistory.name, args: [secretId, columnName] });
        }
    };

    let BgSecretTypeApiImpl$1 = class BgSecretTypeApiImpl {
        context;
        prefix = "secretType.";
        constructor(context) {
            this.context = context;
        }
        async getAll() {
            return await this.context.apiClient.callApi({ path: this.prefix + this.getAll.name });
        }
        async get(typeId) {
            return await this.context.apiClient.callApi({ path: this.prefix + this.get.name, args: [typeId] });
        }
        async getMap() {
            return await this.context.apiClient.callApi({ path: this.prefix + this.getMap.name });
        }
        async getCountMap() {
            return await this.context.apiClient.callApi({ path: this.prefix + this.getCountMap.name });
        }
    };

    let BgSessionApiImpl$1 = class BgSessionApiImpl {
        context;
        prefix = "session.";
        constructor(context) {
            this.context = context;
        }
        async saveAll(keyValObj) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveAll.name, args: [keyValObj] });
        }
        async loadAll(keyObj) {
            return this.context.apiClient.callApi({ path: this.prefix + this.loadAll.name, args: [keyObj] });
        }
        async remove(keyOrKeys) {
            return this.context.apiClient.callApi({ path: this.prefix + this.remove.name, args: [keyOrKeys] });
        }
        async clear() {
            return this.context.apiClient.callApi({ path: this.prefix + this.clear.name });
        }
    };

    let BgSettingsApiImpl$1 = class BgSettingsApiImpl {
        context;
        prefix = "settings.";
        neverSave;
        constructor(context) {
            this.context = context;
            this.neverSave = new BgSettingsNeverSaveApiImpl$1(context);
        }
        change(name, value) {
            return this.context.apiClient.callApi({ path: this.prefix + this.change.name, args: [name, value] });
        }
        setFont(font) {
            return this.context.apiClient.callApi({ path: this.prefix + this.setFont.name, args: [font] });
        }
        setDarkMode(enable) {
            return this.context.apiClient.callApi({ path: this.prefix + this.setDarkMode.name, args: [enable] });
        }
        isSystemLockSupported() {
            return this.context.apiClient.callApi({ path: this.prefix + this.isSystemLockSupported.name });
        }
        setThemeColor(color) {
            return this.context.apiClient.callApi({ path: this.prefix + this.setThemeColor.name, args: [color] });
        }
    };
    let BgSettingsNeverSaveApiImpl$1 = class BgSettingsNeverSaveApiImpl {
        context;
        prefix = "settings.neverSave.";
        constructor(context) {
            this.context = context;
        }
        async add(domain) {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.add.name, args: [domain] }));
        }
        async remove(domain) {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.remove.name, args: [domain] }));
        }
        getAll() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getAll.name });
        }
        isPresent(domain) {
            return this.context.apiClient.callApi({ path: this.prefix + this.isPresent.name, args: [domain] });
        }
    };

    let BgSiteFrameApiImpl$1 = class BgSiteFrameApiImpl {
        context;
        prefix = "siteFrame.";
        constructor(context) {
            this.context = context;
        }
        async showSiteFrame() {
            return this.context.apiClient.callApi({ path: this.prefix + this.showSiteFrame.name });
        }
        async closeSiteFrame(params = {}) {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeSiteFrame.name, args: [params] });
        }
        async getSecrets(siteFrameSecretQuery) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getSecrets.name, args: [siteFrameSecretQuery] });
        }
        async frameLogin(secretId, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.frameLogin.name, args: [secretId, frameId] });
        }
        async fillSecret(secretId, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillSecret.name, args: [secretId, frameId] });
        }
        async fillTotp(secretId, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillTotp.name, args: [secretId, frameId] });
        }
        async fillOneAuthTotp(secretId, oneauthId, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillOneAuthTotp.name, args: [secretId, oneauthId, frameId] });
        }
        async fillField(secretId, fieldName, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillField.name, args: [secretId, fieldName, frameId] });
        }
        async fillCustomCol(secretId, fieldName, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillCustomCol.name, args: [secretId, fieldName, frameId] });
        }
        async fillGeneratedPassword(value, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillGeneratedPassword.name, args: [value, frameId] });
        }
        async saveGeneratedPassword(password, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveGeneratedPassword.name, args: [password, frameId] });
        }
        async openUnlockVaultPage() {
            return this.context.apiClient.callApi({ path: this.prefix + this.openUnlockVaultPage.name });
        }
        async addPassword(frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.addPassword.name, args: [frameId] });
        }
        async isDomainMatchingId(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.isDomainMatchingId.name, args: [secretId] });
        }
    };

    let BgTabApiImpl$1 = class BgTabApiImpl {
        context;
        prefix = "tab.";
        constructor(context) {
            this.context = context;
        }
        async loadFromMemory(key, defaultVal) {
            return this.context.apiClient.callApi({ path: this.prefix + this.loadFromMemory.name, args: [key, defaultVal] });
        }
        async loadFromDomainMemory(key, defaultVal) {
            return this.context.apiClient.callApi({ path: this.prefix + this.loadFromDomainMemory.name, args: [key, defaultVal] });
        }
        async saveToMemory(key, val) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveToMemory.name, args: [key, val] });
        }
        async saveToDomainMemory(key, val, allowedDomains) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveToDomainMemory.name, args: [key, val, allowedDomains] });
        }
        async removeFromMemory(key) {
            return this.context.apiClient.callApi({ path: this.prefix + this.removeFromMemory.name, args: [key] });
        }
        async clearMemory() {
            return this.context.apiClient.callApi({ path: this.prefix + this.clearMemory.name });
        }
        async showConfirmFrame() {
            return this.context.apiClient.callApi({ path: this.prefix + this.showConfirmFrame.name });
        }
        async closeFrame() {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeFrame.name });
        }
        async getFrameId() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getFrameId.name });
        }
        async getTabDomain() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getTabDomain.name });
        }
        async getTabUrl() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getTabUrl.name });
        }
        async saveZIconSelector(selector) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveZIconSelector.name, args: [selector] });
        }
        async loadZIconSelectors() {
            return this.context.apiClient.callApi({ path: this.prefix + this.loadZIconSelectors.name });
        }
        async isNeverSaveUrl() {
            return this.context.apiClient.callApi({ path: this.prefix + this.isNeverSaveUrl.name });
        }
        async allowPermanentUse(secretId, allowedUrl) {
            return this.context.apiClient.callApi({ path: this.prefix + this.allowPermanentUse.name, args: [secretId, allowedUrl] });
        }
        async finishReset(successfull) {
            return this.context.apiClient.callApi({ path: this.prefix + this.finishReset.name, args: [successfull] });
        }
        async setConfirmUse(frameId, allow) {
            return this.context.apiClient.callApi({ path: this.prefix + this.setConfirmUse.name, args: [frameId, allow] });
        }
        async closeTab() {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeTab.name });
        }
        async closeTabWithId(tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeTabWithId.name, args: [tabId] });
        }
        async checkDevToolsOpen() {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkDevToolsOpen.name });
        }
        async showAlert(config) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showAlert.name, args: [config] });
        }
        async checkConnectable() {
            return this.context.apiClient.isConnectable();
        }
        downloadFileInCS(param) {
            return this.context.apiClient.callApi({ path: this.prefix + this.downloadFileInCS.name, args: [param] });
        }
        async loadZMapsCountries() {
            return this.context.apiClient.callApi({ path: this.prefix + this.loadZMapsCountries.name });
        }
        async loadZMapsStates(country) {
            return this.context.apiClient.callApi({ path: this.prefix + this.loadZMapsStates.name, args: [country] });
        }
        async loadZMapsDistricts(country, state) {
            return this.context.apiClient.callApi({ path: this.prefix + this.loadZMapsDistricts.name, args: [country, state] });
        }
        async saveNewCountry(country) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveNewCountry.name, args: [country] });
        }
        async saveNewState(country, state) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveNewState.name, args: [country, state] });
        }
        async saveNewCity(country, state, city) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveNewCity.name, args: [country, state, city] });
        }
        isLoginDomainPath() {
            return this.context.apiClient.callApi({ path: this.prefix + this.isLoginDomainPath.name });
        }
        hasDevToolsOpened() {
            return this.context.apiClient.callApi({ path: this.prefix + this.hasDevToolsOpened.name });
        }
    };

    let BgTrashApiImpl$1 = class BgTrashApiImpl {
        context;
        prefix = "trash.";
        constructor(context) {
            this.context = context;
        }
        async queryTrash(query) {
            return this.context.apiClient.callApi({ path: this.prefix + this.queryTrash.name, args: [query] });
        }
        async deletePermanent(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.deletePermanent.name, args: [secretId] });
        }
        async restoreSecret(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.restoreSecret.name, args: [secretId] });
        }
        async emptyTrash() {
            return this.context.apiClient.callApi({ path: this.prefix + this.emptyTrash.name });
        }
    };

    let BgUnlockApiImpl$1 = class BgUnlockApiImpl {
        context;
        prefix = "unlock.";
        oneauth;
        webauthn;
        constructor(context) {
            this.context = context;
            this.oneauth = new BgOneAuthUnlockApiImpl$1(context);
            this.webauthn = new BgWebauthnUnlockApiImpl$1(context);
        }
        async getLastUsedUnlock() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getLastUsedUnlock.name });
        }
        async setLastUnlock(method) {
            return this.context.apiClient.callApi({ path: this.prefix + this.setLastUnlock.name, args: [method] });
        }
    };
    let BgOneAuthUnlockApiImpl$1 = class BgOneAuthUnlockApiImpl {
        context;
        prefix = "unlock.oneauth.";
        constructor(context) {
            this.context = context;
        }
        resendPush() {
            return this.context.apiClient.callApi({ path: this.prefix + this.resendPush.name });
        }
        async enable(enable) {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.enable.name, args: [enable] }));
        }
        isUnlockable() {
            return this.context.apiClient.callApi({ path: this.prefix + this.isUnlockable.name });
        }
        unlock() {
            return this.context.apiClient.callApi({ path: this.prefix + this.unlock.name });
        }
    };
    let BgWebauthnUnlockApiImpl$1 = class BgWebauthnUnlockApiImpl {
        context;
        prefix = "unlock.webauthn.";
        constructor(context) {
            this.context = context;
        }
        async setWebAuthnCredential(credential) {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.setWebAuthnCredential.name, args: [credential] }));
        }
        async getCredentialCount() {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.getCredentialCount.name }));
        }
        async enable(enable) {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.enable.name, args: [enable] }));
        }
        isUnlockable() {
            return this.context.apiClient.callApi({ path: this.prefix + this.isUnlockable.name });
        }
        unlock() {
            return this.context.apiClient.callApi({ path: this.prefix + this.unlock.name });
        }
    };

    let BgUpdateFrameApiImpl$1 = class BgUpdateFrameApiImpl {
        context;
        prefix = "updateFrame.";
        constructor(context) {
            this.context = context;
        }
        async showUpdateFrame() {
            return this.context.apiClient.callApi({ path: this.prefix + this.showUpdateFrame.name });
        }
        async saveChangedCredential(changedCredential) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveChangedCredential.name, args: [changedCredential] });
        }
        async updateChangedLoginPassword(changedLoginPassword) {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateChangedLoginPassword.name, args: [changedLoginPassword] });
        }
        async getData() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getData.name });
        }
        async updateSecret() {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateSecret.name });
        }
        async editSecret() {
            return this.context.apiClient.callApi({ path: this.prefix + this.editSecret.name });
        }
        async saveAsNew() {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveAsNew.name });
        }
        async closeUpdateFrame(params) {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeUpdateFrame.name, args: [params] });
        }
    };

    let BgUserApiImpl$1 = class BgUserApiImpl {
        context;
        prefix = "user.";
        constructor(context) {
            this.context = context;
        }
        getDp() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getDp.name });
        }
        getDpSized(size) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getDpSized.name, args: [size] });
        }
        getDpOf(zuid) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getDpOf.name, args: [zuid] });
        }
        searchUsers(searchString) {
            return this.context.apiClient.callApi({ path: this.prefix + this.searchUsers.name, args: [searchString] });
        }
        searchAdmins(searchString) {
            return this.context.apiClient.callApi({ path: this.prefix + this.searchAdmins.name, args: [searchString] });
        }
    };

    let BgVaultApiImpl$1 = class BgVaultApiImpl {
        context;
        prefix = "vault.";
        constructor(context) {
            this.context = context;
        }
        async openWebUI({ route = "" } = {}) {
            return this.context.apiClient.callApi({ path: this.prefix + this.openWebUI.name, args: [{ route }] });
        }
        async sync() {
            return this.context.apiClient.callApi({ path: this.prefix + this.sync.name });
        }
        async getUrl() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getUrl.name });
        }
        async getDomain() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getDomain.name });
        }
        async lock() {
            return this.context.apiClient.callApi({ path: this.prefix + this.lock.name });
        }
        async signOut() {
            return this.context.apiClient.callApi({ path: this.prefix + this.signOut.name });
        }
        async syncConfig() {
            return this.context.apiClient.callApi({ path: this.prefix + this.syncConfig.name });
        }
        async syncThemeFromWeb() {
            return this.context.apiClient.callApi({ path: this.prefix + this.syncThemeFromWeb.name });
        }
    };

    let BgVaultWebApiImpl$1 = class BgVaultWebApiImpl {
        context;
        prefix = "vaultWeb.";
        constructor(context) {
            this.context = context;
        }
        async syncSecret(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.syncSecret.name, args: [secretId] });
        }
        async deleteLocalSecrets(secretIds) {
            return this.context.apiClient.callApi({ path: this.prefix + this.deleteLocalSecrets.name, args: [secretIds] });
        }
        async getWebUnlockKey() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getWebUnlockKey.name });
        }
        async getAfterUnlockRoute() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getAfterUnlockRoute.name });
        }
    };

    let BgZTabApiImpl$1 = class BgZTabApiImpl {
        context;
        prefix = "ztab.";
        constructor(context) {
            this.context = context;
        }
        async openZTab() {
            this.context.apiClient.callApi({ path: this.prefix + this.openZTab.name });
        }
        async closeZTab() {
            this.context.apiClient.callApi({ path: this.prefix + this.closeZTab.name });
        }
        async addPassword(prefillInput) {
            this.context.apiClient.callApi({ path: this.prefix + this.addPassword.name, args: [prefillInput] });
        }
        async addPaymentCard(prefillInput) {
            this.context.apiClient.callApi({ path: this.prefix + this.addPaymentCard.name, args: [prefillInput] });
        }
        async editPaymentCard(prefillInput, secretId) {
            this.context.apiClient.callApi({ path: this.prefix + this.editPaymentCard.name, args: [prefillInput, secretId] });
        }
        async sharePassword(secretId) {
            this.context.apiClient.callApi({ path: this.prefix + this.sharePassword.name, args: [secretId] });
        }
        async editPassword(secretId) {
            this.context.apiClient.callApi({ path: this.prefix + this.editPassword.name, args: [secretId] });
        }
        async enableAccessControl(secretId) {
            this.context.apiClient.callApi({ path: this.prefix + this.enableAccessControl.name, args: [secretId] });
        }
        async manageAccessControl(secretId) {
            this.context.apiClient.callApi({ path: this.prefix + this.manageAccessControl.name, args: [secretId] });
        }
        async saveGeneratedPassword(password) {
            this.context.apiClient.callApi({ path: this.prefix + this.saveGeneratedPassword.name, args: [password] });
        }
        async getZTabTask() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getZTabTask.name });
        }
        async getSecretAccess(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getSecretAccess.name, args: [secretId] });
        }
        async openSettings() {
            return this.context.apiClient.callApi({ path: this.prefix + this.openSettings.name });
        }
        async addAddress() {
            return this.context.apiClient.callApi({ path: this.prefix + this.addAddress.name });
        }
    };

    class BgApiImpl {
        static instance = null;
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return this.instance = new BgApiImpl();
        }
        context = new BgApiContext();
        audit = new BgAuditApiImpl$1(this.context);
        accessCtrl = new BgAccessCtrlApiImpl$1(this.context);
        crypto = new BgCryptoApiImpl$1(this.context);
        settings = new BgSettingsApiImpl$1(this.context);
        siteFrame = new BgSiteFrameApiImpl$1(this.context);
        policy = new BgPolicyApiImpl$1(this.context);
        secret = new BgSecretApiImpl$1(this.context);
        secretType = new BgSecretTypeApiImpl$1(this.context);
        folder = new BgFolderApiImpl$1(this.context);
        unlock = new BgUnlockApiImpl$1(this.context);
        generator = new BgGeneratorApiImpl$1(this.context);
        login = new BgLoginApiImpl$1(this.context);
        cardFrame = new BgCardFrameApiImpl$1(this.context);
        tab = new BgTabApiImpl$1(this.context);
        other = new BgOtherApiImpl$1(this.context);
        saveFrame = new BgSaveFrameApiImpl$1(this.context);
        session = new BgSessionApiImpl$1(this.context);
        ztab = new BgZTabApiImpl$1(this.context);
        updateFrame = new BgUpdateFrameApiImpl$1(this.context);
        vault = new BgVaultApiImpl$1(this.context);
        trash = new BgTrashApiImpl$1(this.context);
        user = new BgUserApiImpl$1(this.context);
        vaultWeb = new BgVaultWebApiImpl$1(this.context);
        async init() {
            try {
                const isInitialized = Boolean(this.context.apiClient);
                if (isInitialized) {
                    return;
                }
                const apiClient = this.context.apiClient = portApi.createApiClient();
                await apiClient.init({ name: VtApiPortNames.BG, checkConnectionBeforeApiCall: true });
            }
            catch (e) {
                logError(e);
            }
        }
    }

    function main$4() {
        globalThis.bgApi = BgApiImpl.getInstance();
    }

    class BrUtil {
        checkManifestV2() {
            try {
                return chrome.runtime.getManifest()["manifest_version"] == 2;
            }
            catch (e) {
                return false;
            }
        }
        createCallback(res, rej) {
            return function (resp) {
                chrome.runtime.lastError ? rej(chrome.runtime.lastError.message) : res(resp);
            };
        }
    }

    let GG$6 = class GG {
        brApi;
        util = new BrUtil();
    };
    const gg$3 = new GG$6();

    var ZVRuntimeMsgType;
    (function (ZVRuntimeMsgType) {
        ZVRuntimeMsgType["EVENT_MSG"] = "EVENT_MSG";
        ZVRuntimeMsgType["API_MSG"] = "API_MSG";
    })(ZVRuntimeMsgType || (ZVRuntimeMsgType = {}));
    var ZVRuntimeApiMsgType;
    (function (ZVRuntimeApiMsgType) {
        ZVRuntimeApiMsgType["REQUEST_MSG"] = "REQUEST_MSG";
        ZVRuntimeApiMsgType["RESPONSE_MSG"] = "RESPONSE_MSG";
    })(ZVRuntimeApiMsgType || (ZVRuntimeApiMsgType = {}));

    class ScopeFnGetter {
        fnObj;
        constructor(fnObj) {
            this.fnObj = fnObj;
        }
        getFn(fnPath) {
            try {
                let parentObj = null;
                let fn = this.fnObj;
                let iteratorResult = null;
                const iterator = fnPath.split(".")[Symbol.iterator]();
                while (fn) {
                    iteratorResult = iterator.next();
                    if (iteratorResult.done) {
                        break;
                    }
                    parentObj = fn;
                    fn = fn[iteratorResult.value];
                }
                if (typeof fn != "function") {
                    return null;
                }
                return { fn, parentObj };
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }

    class MsgEventClient {
        needOrigin = false;
        needUrl = false;
        fnGetter = null;
        scope = "";
        constructor() {
            js.fn.bindThis(this, [this.onMessage]);
        }
        init(scope, fnObj) {
            chrome.runtime.onMessage.addListener(this.onMessage);
            this.fnGetter = new ScopeFnGetter(fnObj);
            this.scope = scope;
        }
        onMessage(msg, sender) {
            try {
                if (msg.type != ZVRuntimeMsgType.EVENT_MSG) {
                    return;
                }
                this.initCheck(sender);
                if (!this.isValidSender(sender)) {
                    return;
                }
                const eventMsg = msg.value;
                if (eventMsg.scope != this.scope) {
                    return;
                }
                const event = eventMsg.event;
                const fnResult = this.fnGetter.getFn(event.path);
                if (!fnResult) {
                    return;
                }
                const { fn, parentObj } = fnResult;
                fn.apply(parentObj, event.args);
            }
            catch (e) {
                logError(e);
            }
        }
        initCheck(sender) {
            this.initCheck = js.fn.emptyFn;
            this.needOrigin = Boolean(sender.origin);
            this.needUrl = Boolean(sender.url);
        }
        isValidSender(sender) {
            try {
                if (this.needOrigin != Boolean(sender.origin)) {
                    return false;
                }
                if (this.needUrl != Boolean(sender.url)) {
                    return false;
                }
                return true;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class MsgEventServer {
        scope = "";
        init(scope) {
            this.scope = scope;
        }
        async dispatch(eventPath, eventArgs = null) {
            try {
                const msg = this.getEventMsg(eventPath, eventArgs);
                try {
                    chrome.runtime.sendMessage(msg, null, function () { chrome.runtime.lastError; });
                }
                catch (e) { }
                const tabs = await gg$3.brApi.tab.getAllTabs();
                for (let tab of tabs) {
                    try {
                        chrome.tabs.sendMessage(tab.id, msg, null, function () { chrome.runtime.lastError; });
                    }
                    catch (e) { }
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getEventMsg(eventPath, eventArgs) {
            try {
                return {
                    type: ZVRuntimeMsgType.EVENT_MSG,
                    value: {
                        scope: this.scope,
                        event: { path: eventPath, args: eventArgs }
                    }
                };
            }
            catch (e) {
                logError(e);
                throw "FAILED_TO_GET_EVENT_MSG";
            }
        }
    }

    class MsgFnClient {
        to;
        checkConnectionBeforeApiCall = false;
        async init(param) {
            try {
                if (!param.name) {
                    throw "param.name null";
                }
                this.to = param.name;
                this.checkConnectionBeforeApiCall = param.checkConnectionBeforeApiCall;
            }
            catch (e) {
                logError(e);
            }
        }
        async isConnectable(param = null) {
            try {
                await this.callApiFn({ path: "", connect: param });
                return true;
            }
            catch (e) {
                return false;
            }
        }
        async callApi(param) {
            try {
                if (this.checkConnectionBeforeApiCall) {
                    await this.waitForConnection(param.connect);
                }
                return this.callApiFn(param);
            }
            catch (e) {
                logError(e);
            }
        }
        async callApiFn(param) {
            try {
                const { path, args } = param;
                const msg = {
                    type: ZVRuntimeMsgType.API_MSG,
                    value: {
                        type: ZVRuntimeApiMsgType.REQUEST_MSG,
                        value: { to: this.to, path, args },
                    }
                };
                return this.sendMessage(msg, param);
            }
            catch (e) {
                logError(e);
            }
        }
        async waitForConnection(param) {
            try {
                const delaySeconds = 0.3;
                for (let i = 0; i < 1e5; i++) {
                    if (await this.isConnectable(param)) {
                        return;
                    }
                    await js.time.delay(delaySeconds);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        sendMessage(msg, param) {
            try {
                const replyHandler = new ReplyHandler(this.to);
                if (!param.connect) {
                    chrome.runtime.sendMessage(msg, null, replyHandler.onReply);
                    return replyHandler.promise;
                }
                chrome.tabs.sendMessage(param.connect.tabId, msg, { frameId: param.connect.frameId ?? 0 }, replyHandler.onReply);
                return replyHandler.promise;
            }
            catch (e) {
                logError(e);
                throw "UNABLE_TO_SEND_MESSAGE";
            }
        }
    }
    class ReplyHandler {
        name;
        promise;
        constructor(name) {
            this.name = name;
            this.promise = js.promise.createNew();
            js.fn.bindThis(this, [this.onReply]);
        }
        onReply(msg) {
            try {
                if (chrome.runtime.lastError || !msg) {
                    const errorMsg = chrome.runtime.lastError || "UNABLE_TO_CONNECT: " + this.name;
                    this.promise.reject(errorMsg);
                    return;
                }
                const respVal = msg.result;
                const value = fnOut.getResult(respVal);
                if (!respVal.ok) {
                    this.promise.reject(value);
                    return;
                }
                this.promise.resolve(value);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class MsgFnServer {
        name = "";
        fnGetter = null;
        constructor() {
            js.fn.bindThis(this, [this.onMessage]);
        }
        init(param) {
            try {
                if (!param.name) {
                    throw "param.name null";
                }
                if (!param.fnObj) {
                    throw "param.fnObj null";
                }
                this.name = param.name;
                this.fnGetter = new ScopeFnGetter(param.fnObj);
                gg$3.brApi.runtime.onMessage(this.onMessage);
            }
            catch (e) {
                logError(e);
            }
        }
        disconnect() {
            gg$3.brApi.runtime.removeOnMessageListener(this.onMessage);
        }
        onMessage(msg, sender, sendResponse) {
            try {
                if (msg.type != ZVRuntimeMsgType.API_MSG) {
                    return false;
                }
                const apiMsg = msg.value;
                if (apiMsg.type != ZVRuntimeApiMsgType.REQUEST_MSG) {
                    return false;
                }
                const apiReqMsg = apiMsg.value;
                if (apiReqMsg.to != this.name) {
                    return false;
                }
                this.callApi(apiReqMsg, sender, sendResponse);
                return true;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async callApi(msg, sender, sendResponse) {
            try {
                if (msg.path.length == 0) {
                    sendResponse(this.getResponseMsg(fnOut.OK));
                    return;
                }
                const fnResult = this.fnGetter.getFn(msg.path);
                if (!fnResult) {
                    sendResponse(this.getResponseMsg(fnOut.error("FN_NOT_FOUND: " + JSON.stringify(msg.path))));
                    return;
                }
                const { fn, parentObj } = fnResult;
                msg.args = msg.args || [];
                msg.args.push(sender);
                const value = await fn.apply(parentObj, msg.args);
                sendResponse(this.getResponseMsg(fnOut.result(value)));
            }
            catch (e) {
                sendResponse(this.getResponseMsg(fnOut.error(e)));
                logError(e);
            }
        }
        getResponseMsg(result) {
            try {
                const msg = {
                    result
                };
                return msg;
            }
            catch (e) {
                logError(e);
                throw "UNABLE_TO_GET_RESPONSE_MSG";
            }
        }
    }

    class PortApiImpl {
        createApiServer() {
            return new MsgFnServer();
        }
        createApiClient() {
            return new MsgFnClient();
        }
        createEventServer() {
            return new MsgEventServer();
        }
        createEventClient() {
            return new MsgEventClient();
        }
    }

    const WHITE_COLOR = "white";
    class BrActionApiImpl {
        static getInstance(isV2) {
            return isV2 ? new BrActionApiImplV2() : new BrActionApiImpl();
        }
        setIcon(pathObj) {
            chrome.action.setIcon({ path: pathObj });
        }
        setTitle(title) {
            chrome.action.setTitle({ title });
        }
        setBadgeColor(color) {
            chrome.action.setBadgeBackgroundColor({ color });
            if (chrome.action.setBadgeTextColor) {
                chrome.action.setBadgeTextColor({ color: WHITE_COLOR });
            }
        }
        setBadgeText(text) {
            chrome.action.setBadgeText({ text });
        }
    }
    class BrActionApiImplV2 {
        setIcon(pathObj) {
            chrome.browserAction.setIcon({ path: pathObj });
        }
        setTitle(title) {
            chrome.browserAction.setTitle({ title });
        }
        setBadgeColor(color) {
            chrome.browserAction.setBadgeBackgroundColor({ color });
            if (globalThis.browser && globalThis.browser.browserAction.setBadgeTextColor) {
                globalThis.browser.browserAction.setBadgeTextColor({ color: WHITE_COLOR });
            }
        }
        setBadgeText(text) {
            chrome.browserAction.setBadgeText({ text });
        }
    }

    class BrAlarmApiImpl {
        static getInstance(isV2) {
            return isV2 ? new BrAlarmApiImplV2() : new BrAlarmApiImpl();
        }
        async createAlarm(alarmName, delaySeconds, removePrevious = true) {
            if (removePrevious) {
                await this.clearAlarm(alarmName);
            }
            chrome.alarms.create(alarmName, { when: Date.now() + (delaySeconds * 1000) });
        }
        async clearAlarm(alarmName) {
            await chrome.alarms.clear(alarmName);
        }
        async clearAll() {
            await chrome.alarms.clearAll();
        }
        listenAlarms(listener) {
            chrome.alarms.onAlarm.addListener(listener);
        }
    }
    class BrAlarmApiImplV2 {
        listeners = [];
        timeoutIds = {};
        constructor() {
            this.handleAlarm = this.handleAlarm.bind(this);
        }
        async createAlarm(alarmName, delaySeconds, removePrevious = true) {
            if (removePrevious) {
                clearTimeout(this.timeoutIds[alarmName]);
            }
            this.timeoutIds[alarmName] = setTimeout(this.handleAlarm, delaySeconds * 1000, alarmName);
        }
        async clearAlarm(alarmName) {
            clearTimeout(this.timeoutIds[alarmName]);
        }
        async clearAll() {
            for (let key in this.timeoutIds) {
                clearTimeout(this.timeoutIds[key]);
            }
        }
        listenAlarms(listener) {
            this.listeners.push(listener);
        }
        handleAlarm(alarmName) {
            this.listeners.forEach(x => x({ name: alarmName }));
        }
    }

    class BrContextMenuApiImpl {
        async create(createInfo) {
            return new Promise((res, rej) => chrome.contextMenus.create(createInfo, gg$3.util.createCallback(res, rej)));
        }
        async removeAll() {
            return new Promise((res, rej) => chrome.contextMenus.removeAll(gg$3.util.createCallback(res, rej)));
        }
        onClick(listener) {
            chrome.contextMenus.onClicked.addListener(listener);
        }
    }

    class BrI18nApiImpl {
        text(key, ...placeholders) {
            return brI18n(key, placeholders);
        }
        textOf(key, placeholders) {
            return brI18n(key, placeholders);
        }
        html(key, ...contentList) {
            try {
                const placeholders = contentList.map((_x, index) => `{${index}}`);
                const text = this.textOf(key, placeholders);
                const textParts = text.split(/\{\d+\}/);
                const fillOrder = this.getFillOrder(text);
                const fragment = document.createDocumentFragment();
                fragment.append(textParts[0]);
                for (let i = 1, fillI = 0; i < textParts.length; i++) {
                    fragment.append(contentList[fillOrder[fillI++]]);
                    fragment.append(textParts[i]);
                }
                return fragment;
            }
            catch (e) {
                logError(e);
                return document.createDocumentFragment();
            }
        }
        getFillOrder(s) {
            try {
                const regex = /\{(\d+)\}/g;
                const order = [];
                for (let match of s.matchAll(regex)) {
                    order.push(parseInt(match[1]));
                }
                return order;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
    }
    function brI18n(key, placeholders) {
        return chrome.i18n.getMessage(key, placeholders) || key;
    }

    class BrOmniboxApiImpl {
        onInputChanged(listener) {
            try {
                chrome?.omnibox?.onInputChanged?.addListener?.(listener);
            }
            catch (e) {
                logError(e);
            }
        }
        onInputEntered(listener) {
            try {
                chrome?.omnibox?.onInputEntered?.addListener?.(listener);
            }
            catch (e) {
                logError(e);
            }
        }
        onInputStarted(listener) {
            try {
                chrome?.omnibox?.onInputStarted?.addListener?.(listener);
            }
            catch (e) {
                logError(e);
            }
        }
        setDefaultSuggestion(suggestion) {
            try {
                chrome.omnibox.setDefaultSuggestion(suggestion);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class BrOtherApiImpl {
        disablePasswordSaving() {
            try {
                if (chrome.privacy) {
                    chrome.privacy.services.passwordSavingEnabled.set({ value: false });
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class BrWindowsApiImpl {
        async update(windowId, updateParams) {
            return chrome.windows.update(windowId, updateParams);
        }
        query(query = null) {
            return new Promise((res, rej) => chrome.windows.getAll(query, gg$3.util.createCallback(res, rej)));
        }
    }
    class BrNotificationApiImpl {
        async create(name, createOption) {
            return chrome.notifications.create(name, createOption);
        }
        async clear(name) {
            return chrome.notifications.clear(name);
        }
    }
    class BrIdleApiImpl {
        onIdle(listener) {
            if (chrome.idle) {
                chrome.idle.onStateChanged.addListener(listener);
            }
        }
        setDetectionIntervalSeconds(seconds) {
            if (chrome.idle) {
                chrome.idle.setDetectionInterval(seconds);
            }
        }
    }
    class BrCookieApiImpl {
        onCookieChange(listener) {
            chrome.cookies.onChanged.addListener(listener);
        }
        getCookie(name, url) {
            return new Promise((res, rej) => chrome.cookies.get({ name, url }, gg$3.util.createCallback(res, rej)));
        }
        async getCookieStore(storeId) {
            try {
                const stores = await new Promise((res, rej) => chrome.cookies.getAllCookieStores(gg$3.util.createCallback(res, rej)));
                const reqStore = stores.find(x => x.id == storeId);
                return reqStore;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }
    class BrSidePanelApiImpl {
        static getInstance(isV2) {
            return isV2 ? new BrSidePanelApiImplV2() : new BrSidePanelApiImpl();
        }
        open(options) {
            return chrome?.sidePanel?.open?.(options);
        }
        isSupported() {
            return Boolean(chrome.sidePanel);
        }
    }
    class BrSidePanelApiImplV2 {
        open(_options) { }
        isSupported() {
            return false;
        }
    }
    class BrDomApiImpl {
        static getInstance(isV2) {
            return isV2 ? new BrDomApiImplV2() : new BrDomApiImpl();
        }
        getShadowRoot(elem) {
            return chrome.dom.openOrClosedShadowRoot(elem);
        }
    }
    class BrDomApiImplV2 {
        getShadowRoot(elem) {
            return elem.openOrClosedShadowRoot;
        }
    }

    var BrIdleState;
    (function (BrIdleState) {
        BrIdleState["ACTIVE"] = "active";
        BrIdleState["IDLE"] = "idle";
        BrIdleState["LOCKED"] = "locked";
    })(BrIdleState || (BrIdleState = {}));
    var BrTabStatus;
    (function (BrTabStatus) {
        BrTabStatus["LOADING"] = "loading";
        BrTabStatus["COMPLETE"] = "complete";
    })(BrTabStatus || (BrTabStatus = {}));
    var BrPlatforms;
    (function (BrPlatforms) {
        BrPlatforms["LINUX"] = "linux";
        BrPlatforms["MAC"] = "mac";
        BrPlatforms["WINDOWS"] = "win";
        BrPlatforms["OTHER"] = "other";
    })(BrPlatforms || (BrPlatforms = {}));
    var BrContextMenuContextType;
    (function (BrContextMenuContextType) {
        BrContextMenuContextType["ALL"] = "all";
        BrContextMenuContextType["PAGE"] = "page";
        BrContextMenuContextType["FRAME"] = "frame";
        BrContextMenuContextType["EDITABLE"] = "editable";
        BrContextMenuContextType["SELECTION"] = "selection";
    })(BrContextMenuContextType || (BrContextMenuContextType = {}));
    var BrContextMenuType;
    (function (BrContextMenuType) {
        BrContextMenuType["NORMAL"] = "normal";
        BrContextMenuType["SEPARATOR"] = "separator";
    })(BrContextMenuType || (BrContextMenuType = {}));
    var BrWindowTypes;
    (function (BrWindowTypes) {
        BrWindowTypes["NORMAL"] = "normal";
        BrWindowTypes["DEV_TOOLS"] = "devtools";
    })(BrWindowTypes || (BrWindowTypes = {}));

    class BrRuntimeApiImpl {
        async reload() {
            chrome.runtime.reload();
        }
        getUrl(path) {
            return chrome.runtime.getURL(path);
        }
        removeConnectListener(listener) {
            chrome.runtime.onConnect.removeListener(listener);
        }
        connect(portName) {
            return chrome.runtime.connect("", { name: portName });
        }
        connectTab(portName, tabId) {
            return chrome.tabs.connect(tabId, { name: portName });
        }
        async sendMessage(msg) {
            return new Promise((res, rej) => chrome.runtime.sendMessage(msg, gg$3.util.createCallback(res, rej)));
        }
        sendMsgNoReply(msg) {
            return chrome.runtime.sendMessage(msg);
        }
        onMessage(listener) {
            chrome.runtime.onMessage.addListener(listener);
        }
        removeOnMessageListener(listener) {
            chrome.runtime.onMessage.removeListener(listener);
        }
        async broadcastMsg(msg) {
            try {
                try {
                    await chrome.runtime.sendMessage(msg);
                }
                catch (e) { }
                const tabs = await gg$3.brApi.tab.getAllTabs();
                for (let tab of tabs) {
                    if (!tab.url?.startsWith("http")) {
                        continue;
                    }
                    try {
                        await chrome.tabs.sendMessage(tab.id, msg);
                    }
                    catch (e) { }
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async getOS() {
            try {
                const { os } = await this.getPlatformInfo();
                switch (os) {
                    case BrPlatforms.WINDOWS:
                    case BrPlatforms.LINUX:
                    case BrPlatforms.MAC:
                        return os;
                    default:
                        return BrPlatforms.OTHER;
                }
            }
            catch (e) {
                return BrPlatforms.OTHER;
            }
        }
        async getPlatformInfo() {
            return chrome.runtime.getPlatformInfo();
        }
        onStartup(listener) {
            chrome.runtime.onStartup.addListener(listener);
        }
        onInstall(listener) {
            chrome.runtime.onInstalled.addListener(listener);
        }
        getManifest() {
            try {
                return chrome?.runtime.getManifest?.();
            }
            catch (e) {
                logError(e);
                return {};
            }
        }
    }

    class BrLocalStorage {
        async saveAll(keyValObj) {
            return new Promise((res, rej) => chrome.storage.local.set(keyValObj, gg$3.util.createCallback(res, rej)));
        }
        async loadAll(keyObj) {
            return new Promise((res, rej) => chrome.storage.local.get(keyObj, gg$3.util.createCallback(res, rej)));
        }
        async remove(keyOrKeys) {
            return new Promise((res, rej) => chrome.storage.local.remove(keyOrKeys, gg$3.util.createCallback(res, rej)));
        }
        async clear() {
            return new Promise((res, rej) => chrome.storage.local.clear(gg$3.util.createCallback(res, rej)));
        }
    }
    class BrSessionStorage {
        async saveAll(keyValObj) {
            return new Promise((res, rej) => chrome.storage.session.set(keyValObj, gg$3.util.createCallback(res, rej)));
        }
        async loadAll(keyObj) {
            return new Promise((res, rej) => chrome.storage.session.get(keyObj, gg$3.util.createCallback(res, rej)));
        }
        async remove(keyOrKeys) {
            return new Promise((res, rej) => chrome.storage.session.remove(keyOrKeys, gg$3.util.createCallback(res, rej)));
        }
        async clear() {
            return new Promise((res, rej) => chrome.storage.session.clear(gg$3.util.createCallback(res, rej)));
        }
    }

    const MAXIMIZED = "maximized";
    class BrTabApiImpl {
        async createTab(params) {
            if (params.incognito) {
                return this.createIncognitoTabFn(params);
            }
            return this.createTabFn(params);
        }
        async createIncognitoTab(url) {
            return this.createIncognitoTabFn({ url });
        }
        async createNormalTab(url) {
            const activeTab = await this.getActiveTab();
            if (!activeTab || !activeTab.incognito) {
                return this.create(url);
            }
            const normalWindow = await this.createWindow(url);
            return normalWindow.tabs[0];
        }
        onTabUpdate(listener) {
            chrome.tabs.onUpdated.addListener(listener);
        }
        removeTabUpdateListener(listener) {
            chrome.tabs.onUpdated.removeListener(listener);
        }
        onTabActivate(listener) {
            chrome.tabs.onActivated.addListener(listener);
        }
        onWindowFocus(listener) {
            chrome.windows.onFocusChanged.addListener(function (id) {
                if (id != chrome.windows.WINDOW_ID_NONE) {
                    listener(id);
                }
            });
        }
        onTabCreate(listener) {
            chrome.tabs.onCreated.addListener(listener);
        }
        onTabRemove(listener) {
            chrome.tabs.onRemoved.addListener(listener);
        }
        getAllTabs() {
            return this.queryTabs({});
        }
        async isIncognitoAllowed() {
            return new Promise((res, rej) => chrome.extension.isAllowedIncognitoAccess(gg$3.util.createCallback(res, rej)));
        }
        async create(url) {
            return new Promise((res, rej) => chrome.tabs.create({ url }, gg$3.util.createCallback(res, rej)));
        }
        getCalledContextTab() {
            return new Promise((res, rej) => chrome.tabs.getCurrent(gg$3.util.createCallback(res, rej)));
        }
        async getTab(tabId) {
            try {
                const tab = await new Promise((res, rej) => chrome.tabs.get(tabId, gg$3.util.createCallback(res, rej)));
                return tab;
            }
            catch (e) {
                return null;
            }
        }
        async getActiveTab() {
            const [tab] = await new Promise((res, rej) => chrome.tabs.query({ active: true, lastFocusedWindow: true }, gg$3.util.createCallback(res, rej)));
            return tab;
        }
        async closeTab(tabId) {
            try {
                await new Promise((res, rej) => chrome.tabs.remove(tabId, gg$3.util.createCallback(res, rej)));
            }
            catch (e) { }
        }
        async getFrames(tabId) {
            try {
                return await new Promise((res, rej) => chrome.webNavigation.getAllFrames({ tabId }, gg$3.util.createCallback(res, rej)));
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async createWindow(url, { incognito = false } = {}) {
            return new Promise((res, rej) => chrome.windows.create({
                url,
                incognito,
                state: MAXIMIZED,
            }, gg$3.util.createCallback(res, rej)));
        }
        async updateTab(tabId, updateParams) {
            return new Promise((res, rej) => chrome.tabs.update(tabId, updateParams, gg$3.util.createCallback(res, rej)));
        }
        queryTabs(query) {
            return new Promise((res, rej) => chrome.tabs.query(query, gg$3.util.createCallback(res, rej)));
        }
        async getCompletedTab(tabId) {
            return new CompletedTabGetter(tabId, this).getTab();
        }
        async createIncognitoTabFn(input) {
            try {
                if (!await this.isIncognitoAllowed()) {
                    return this.createTabFn(input);
                }
                const activeTab = await this.getActiveTab();
                if (activeTab && activeTab.incognito) {
                    return this.createTabFn(input);
                }
                const incognitoWindow = await this.createWindow(input.url, { incognito: true });
                if (incognitoWindow?.tabs) {
                    return incognitoWindow.tabs[0];
                }
                const tabs = await this.queryTabs({ windowId: incognitoWindow.id });
                return tabs[0];
            }
            catch (e) {
                logError(e);
                return this.createTabFn(input);
            }
        }
        async createTabFn(input) {
            return this.createFn({
                url: input.url,
                active: !input.background,
            });
        }
        async createFn(input) {
            return new Promise((res, rej) => chrome.tabs.create(input, gg$3.util.createCallback(res, rej)));
        }
    }
    class CompletedTabGetter {
        tabId;
        tabApi;
        promise;
        constructor(tabId, tabApi) {
            this.tabId = tabId;
            this.tabApi = tabApi;
            this.promise = js.promise.createNew();
        }
        async getTab() {
            try {
                this.handleTabUpdate = this.handleTabUpdate.bind(this);
                this.tabApi.onTabUpdate(this.handleTabUpdate);
                let tab = await this.tabApi.getTab(this.tabId);
                if (tab.status == "complete") {
                    this.promise.resolve(tab);
                }
                try {
                    tab = await this.promise;
                }
                catch (e) {
                    logError(e);
                }
                this.tabApi.removeTabUpdateListener(this.handleTabUpdate);
                return tab;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        handleTabUpdate(tabId, changeInfo, tab) {
            const completed = (tabId == this.tabId) && changeInfo &&
                (changeInfo.status == "complete");
            if (completed) {
                this.promise.resolve(tab);
            }
        }
    }

    class PortConnectorProvider {
        getConnector(params) {
            if (params.frameId != null) {
                return this.frameConnect(params);
            }
            if (params.tabId != null) {
                return this.tabConnect(params);
            }
            return this.normalConnect(params);
        }
        normalConnect(params) {
            return function () {
                return chrome.runtime.connect(null, { name: params.portName });
            };
        }
        tabConnect(params) {
            return function () {
                return chrome.tabs.connect(params.tabId, { name: params.portName });
            };
        }
        frameConnect(params) {
            return function () {
                return chrome.tabs.connect(params.tabId, { name: params.portName, frameId: params.frameId });
            };
        }
    }

    class BrPortApiImpl {
        connectProvider = new PortConnectorProvider();
        async connect(params) {
            return new PortProvider(this.connectProvider.getConnector(params), params.noRetry ?? false).connect();
        }
        onConnect(params) {
            const portFunc = function (port) {
                if (port.name != params.portName) {
                    return;
                }
                port.postMessage("connected");
                params.listener(port);
            };
            chrome.runtime.onConnect.addListener(portFunc);
            return portFunc;
        }
    }
    class PortProvider {
        connector;
        portName;
        maxRetryAttempts = 120;
        constructor(connector, noRetry) {
            this.connector = connector;
            if (noRetry) {
                this.maxRetryAttempts = 1;
            }
        }
        async connect() {
            try {
                const NEXT_CALL_DELAY_SECONDS = 0.5;
                let port;
                for (let _ of js.loop.range(this.maxRetryAttempts)) {
                    try {
                        port = this.connector();
                        await this.waitForResponse(port);
                        if (port) {
                            return port;
                        }
                    }
                    catch (e) {
                        console.info(e);
                    }
                    await js.time.delay(NEXT_CALL_DELAY_SECONDS);
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async waitForResponse(port) {
            const connectedPromise = js.promise.createNew();
            port.onDisconnect.addListener(function () {
                if (chrome.runtime.lastError) {
                    connectedPromise.reject(chrome.runtime.lastError.message);
                    return;
                }
                connectedPromise.reject("disconnected...");
            });
            port.onMessage.addListener(function f() {
                connectedPromise.resolve();
                port.onMessage.removeListener(f);
            });
            setTimeout(() => connectedPromise.reject("connection_timeout..."), 200);
            await connectedPromise;
        }
    }

    class BrApiImpl {
        static getInstance() {
            try {
                if (gg$3.brApi) {
                    return gg$3.brApi;
                }
                return gg$3.brApi = new BrApiImpl();
            }
            catch (e) {
                throw e;
            }
        }
        constructor() { }
        alarm;
        i18n = new BrI18nApiImpl();
        menu;
        omnibox = new BrOmniboxApiImpl();
        port;
        runtime;
        storage = {
            local: null,
            session: null,
        };
        tab;
        idle = new BrIdleApiImpl();
        notification = new BrNotificationApiImpl();
        other = new BrOtherApiImpl();
        sidePanel;
        windows;
        action;
        cookie;
        dom;
        portApi;
        init() {
            try {
                this.init = js.fn.emptyFn;
                globalThis.brApi = this;
                globalThis.portApi = this.portApi = new PortApiImpl();
                this.port = new BrPortApiImpl();
                this.cookie = new BrCookieApiImpl();
                this.windows = new BrWindowsApiImpl();
                this.menu = new BrContextMenuApiImpl();
                this.runtime = new BrRuntimeApiImpl();
                this.tab = new BrTabApiImpl();
                this.storage.local = new BrLocalStorage();
                this.storage.session = new BrSessionStorage();
                const isV2 = this.isV2();
                this.action = BrActionApiImpl.getInstance(isV2);
                this.alarm = BrAlarmApiImpl.getInstance(isV2);
                this.sidePanel = BrSidePanelApiImpl.getInstance(isV2);
                this.dom = BrDomApiImpl.getInstance(isV2);
                globalThis.isDevMode = this.runtime.getManifest()?.name?.includes?.("Dev");
            }
            catch (e) {
                logError(e);
            }
        }
        isV2() {
            return gg$3.util.checkManifestV2();
        }
    }

    const brApi$1 = BrApiImpl.getInstance();
    function i18n$1(key, ...placeholders) {
        return brApi$1.i18n.textOf(key, placeholders);
    }
    globalThis["i18n"] = i18n$1;

    let GG$5 = class GG {
        js = null;
    };
    const gg$2 = new GG$5();

    const AES_GCM = "AES-GCM";
    const AES_ALGORITHM = {
        name: AES_GCM,
        length: 256
    };
    const KEY_USAGES$1 = ["encrypt", "decrypt"];
    class JsCryptoAesUtilImpl {
        textEncoder = new TextEncoder();
        textDecoder = new TextDecoder();
        constructor() { }
        async generateKey() {
            try {
                const key = await crypto.subtle.generateKey(AES_ALGORITHM, true, KEY_USAGES$1);
                return gg$2.js.fnOut.result(key);
            }
            catch (e) {
                console.error(e);
                return gg$2.js.fnOut.error(e);
            }
        }
        async exportKey(key) {
            try {
                if (!key) {
                    throw "EMPTY_KEY";
                }
                const keyBuffer = await crypto.subtle.exportKey("raw", key);
                const base64Key = gg$2.js.encoding.bytesToBase64(keyBuffer);
                return gg$2.js.fnOut.result(base64Key);
            }
            catch (e) {
                console.error(e);
                return gg$2.js.fnOut.error(e);
            }
        }
        async importKey(keyString) {
            try {
                if (!keyString) {
                    throw "EMPTY_KEY_STRING";
                }
                const keyBuffer = gg$2.js.encoding.base64ToBytes(keyString);
                const key = await crypto.subtle.importKey("raw", keyBuffer, AES_GCM, true, KEY_USAGES$1);
                return gg$2.js.fnOut.result(key);
            }
            catch (e) {
                console.error(e);
                return gg$2.js.fnOut.error(e);
            }
        }
        async encrypt(plaintext, key) {
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const encryptedBuffer = await crypto.subtle.encrypt({ name: AES_GCM, iv }, key, this.textEncoder.encode(plaintext));
            const ivBase64 = gg$2.js.encoding.bytesToBase64(iv);
            const encryptedBase64 = gg$2.js.encoding.bytesToBase64(encryptedBuffer);
            const ciphertext = `${ivBase64},${encryptedBase64}`;
            return ciphertext;
        }
        async decrypt(ciphertext, key) {
            const [ivBase64, encryptedBase64] = ciphertext.split(",", 2);
            const ivBuffer = gg$2.js.encoding.base64ToBytes(ivBase64);
            const encryptedBuffer = gg$2.js.encoding.base64ToBytes(encryptedBase64);
            const decryptedBuffer = await crypto.subtle.decrypt({ name: AES_GCM, iv: ivBuffer }, key, encryptedBuffer);
            const plaintext = this.textDecoder.decode(decryptedBuffer);
            return plaintext;
        }
    }

    const RSA_OAEP = "RSA-OAEP";
    const RSA_ALGORITHM = {
        name: RSA_OAEP,
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
    };
    const KEY_USAGES = ["encrypt", "decrypt"];
    class JsCryptoRsaUtilImpl {
        textEncoder = new TextEncoder();
        textDecoder = new TextDecoder();
        constructor() { }
        async generateKey() {
            try {
                const rsaKeyPair = (await crypto.subtle.generateKey(RSA_ALGORITHM, true, KEY_USAGES));
                return gg$2.js.fnOut.result({
                    publicKey: rsaKeyPair.publicKey,
                    privateKey: rsaKeyPair.privateKey
                });
            }
            catch (e) {
                console.error(e);
                return gg$2.js.fnOut.error(e);
            }
        }
        async getBase64PublicKey(key) {
            const exportedBuffer = await window.crypto.subtle.exportKey("spki", key);
            const base64Key = gg$2.js.encoding.bytesToBase64(exportedBuffer);
            return base64Key;
        }
        async getBase64PrivateKey(key) {
            const exportedBuffer = await window.crypto.subtle.exportKey("pkcs8", key);
            const base64Key = gg$2.js.encoding.bytesToBase64(exportedBuffer);
            return base64Key;
        }
        async encrypt(plaintext, key) {
            const encodedPlainText = this.textEncoder.encode(plaintext);
            const arrayBuffer = await crypto.subtle.encrypt({ name: RSA_OAEP }, key, encodedPlainText);
            return gg$2.js.encoding.bytesToBase64(new Uint8Array(arrayBuffer));
        }
        async encryptHex(plaintext, key) {
            const encodedPlainText = this.textEncoder.encode(plaintext);
            const arrayBuffer = await crypto.subtle.encrypt({ name: RSA_OAEP }, key, encodedPlainText);
            return gg$2.js.encoding.bytesToHex(new Uint8Array(arrayBuffer));
        }
        async decrypt(cipherText, key) {
            const cipherBuffer = gg$2.js.encoding.base64ToBytes(cipherText);
            const decryptedBuffer = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, key, cipherBuffer);
            return this.textDecoder.decode(decryptedBuffer);
        }
        async importPublicKey(key) {
            const keyBuffer = gg$2.js.encoding.base64ToBytes(key);
            const RSA_PARAMS = {
                name: RSA_OAEP,
                hash: "SHA-256"
            };
            const publicKey = await crypto.subtle.importKey("spki", keyBuffer, RSA_PARAMS, true, ["encrypt"]);
            return publicKey;
        }
        async importPublicKeyHex(key) {
            const keyBuffer = gg$2.js.encoding.hexToBytes(key);
            const RSA_PARAMS = {
                name: RSA_OAEP,
                hash: "SHA-256"
            };
            const publicKey = await crypto.subtle.importKey("spki", keyBuffer, RSA_PARAMS, true, ["encrypt"]);
            return publicKey;
        }
        async importPrivateKey(key) {
            const keyBuffer = gg$2.js.encoding.base64ToBytes(key);
            const RSA_PARAMS = {
                name: RSA_OAEP,
                hash: "SHA-256"
            };
            const publicKey = await crypto.subtle.importKey("pkcs8", keyBuffer, RSA_PARAMS, true, ["decrypt"]);
            return publicKey;
        }
        async exportPublicKey(key) {
            const exportedBuffer = await crypto.subtle.exportKey("spki", key);
            const base64Key = gg$2.js.encoding.bytesToBase64(exportedBuffer);
            return base64Key;
        }
        async exportPrivateKey(key) {
            const exportedBuffer = await crypto.subtle.exportKey("pkcs8", key);
            const base64Key = gg$2.js.encoding.bytesToBase64(exportedBuffer);
            return base64Key;
        }
    }

    class JsCryptoImpl {
        aes;
        rsa;
        constructor() {
            this.aes = new JsCryptoAesUtilImpl();
            this.rsa = new JsCryptoRsaUtilImpl();
        }
        generateRandom(range) {
            if (range <= 0) {
                throw "INVALID_RANDOM_RANGE";
            }
            const bitMask = this.getBitMask(range);
            let randomNumber = 0;
            while (true) {
                randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
                randomNumber &= bitMask;
                if (randomNumber < range) {
                    return randomNumber;
                }
            }
        }
        generateRandomRange(start, exclusiveEnd) {
            const range = Math.abs(exclusiveEnd - start);
            return this.generateRandom(range) + start;
        }
        getBitMask(n) {
            let mask = 1;
            while (mask < n) {
                mask = (mask << 1) | 1;
            }
            return mask;
        }
        getSalt(noOfBytes) {
            const bytes = new Uint8Array(noOfBytes);
            crypto.getRandomValues(bytes);
            return bytes;
        }
    }

    var JsEncodingFormat;
    (function (JsEncodingFormat) {
        JsEncodingFormat["HEX"] = "HEX";
        JsEncodingFormat["BASE64"] = "BASE64";
        JsEncodingFormat["BASE64_URL"] = "BASE64_URL";
        JsEncodingFormat["BYTES"] = "BYTES";
        JsEncodingFormat["ASCII"] = "ASCII";
    })(JsEncodingFormat || (JsEncodingFormat = {}));

    class Base64Util {
        alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        base64AlphaValueMap = null;
        encodeBytesToString(bytes) {
            let i = 0;
            let ans = "";
            for (; i + 2 < bytes.length; i += 3) {
                ans += this.mapBase64C1(bytes[i]);
                ans += this.mapBase64C2(bytes[i], bytes[i + 1]);
                ans += this.mapBase64C3(bytes[i + 1], bytes[i + 2]);
                ans += this.mapBase64C4(bytes[i + 2]);
            }
            switch (bytes.length - i) {
                case 2:
                    ans += this.mapBase64C1(bytes[i]);
                    ans += this.mapBase64C2(bytes[i], bytes[i + 1]);
                    ans += this.mapBase64C3(bytes[i + 1], 0);
                    ans += "=";
                    break;
                case 1:
                    ans += this.mapBase64C1(bytes[i]);
                    ans += this.mapBase64C2(bytes[i], 0);
                    ans += "==";
                    break;
            }
            return ans;
        }
        decodeStringToBytes(input) {
            const alphaValue = this.getBase64AlphaValueMap();
            const bytes = [];
            while (input.length % 4 != 0) {
                input += "=";
            }
            let c1 = 0, c2 = 0, c3 = 0, c4 = 0;
            for (let i = 0; i < input.length; i += 4) {
                c1 = alphaValue.get(input[i]);
                c2 = alphaValue.get(input[i + 1]);
                c3 = alphaValue.get(input[i + 2]);
                c4 = alphaValue.get(input[i + 3]);
                bytes.push((c1 << 2) | ((c2 & 48) >> 4));
                bytes.push(((c2 & 15) << 4) | ((c3 & 60) >> 2));
                bytes.push(((c3 & 3) << 6) | c4);
            }
            for (let i = input.length - 1; i >= 0 && input[i] == "="; i--) {
                bytes.pop();
            }
            return new Uint8Array(bytes);
        }
        mapBase64C1(byte) {
            return this.alphabet[(byte & 252) >> 2];
        }
        mapBase64C2(b1, b2) {
            return this.alphabet[((b1 & 3) << 4) | ((b2 & 240) >> 4)];
        }
        mapBase64C3(b1, b2) {
            return this.alphabet[((b1 & 15) << 2) | ((b2 & 192) >> 6)];
        }
        mapBase64C4(byte) {
            return this.alphabet[byte & 63];
        }
        getBase64AlphaValueMap() {
            if (this.base64AlphaValueMap == null) {
                const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                const map = new Map(Array.from(alphabet, (x, index) => [x, index]));
                map.set("=", 0);
                this.base64AlphaValueMap = map;
            }
            return this.base64AlphaValueMap;
        }
    }

    class HexUtil {
        encodeBytesToHexString(bytes) {
            return Array.from(bytes).map(x => this.getHex(x)).join("");
        }
        decodeHexStringToBytes(hexString) {
            try {
                if (hexString.length % 2) {
                    hexString = "0" + hexString;
                }
                const array = new Uint8Array(hexString.length / 2);
                let ai = 0;
                for (let i = 0; i < hexString.length; i += 2) {
                    array[ai++] = parseInt(hexString[i] + hexString[i + 1], 16);
                }
                return array;
            }
            catch (e) {
                logError(e, hexString);
                throw e;
            }
        }
        getHex(byte) {
            return ("0" + (byte).toString(16)).slice(-2);
        }
    }

    let GG$4 = class GG {
        base64Util = new Base64Util();
        hexUtil = new HexUtil();
    };
    const gg$1 = new GG$4();

    class JsEncodingByteToXUtil {
        textDecoder = new TextDecoder();
        convertBytes(bytes, input) {
            try {
                switch (input.to) {
                    case JsEncodingFormat.BYTES:
                        return { outputBytes: bytes };
                    case JsEncodingFormat.BASE64:
                        return { outputString: gg$1.base64Util.encodeBytesToString(bytes) };
                    case JsEncodingFormat.ASCII:
                        return { outputString: this.textDecoder.decode(bytes) };
                    case JsEncodingFormat.BASE64_URL:
                        return { outputString: this.getBase64Url(gg$1.base64Util.encodeBytesToString(bytes)) };
                    case JsEncodingFormat.HEX:
                        return { outputString: gg$1.hexUtil.encodeBytesToHexString(bytes) };
                    default:
                        throw ["NEW_CASE", input];
                }
            }
            catch (e) {
                logError(e, bytes, input);
                throw e;
            }
        }
        getBase64Url(text) {
            return text.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
        }
    }

    class JsEncodingXToByteUtil {
        textEncoder = new TextEncoder();
        getBytes(input) {
            try {
                if (input.inputBytes) {
                    if (input.inputBytes instanceof ArrayBuffer) {
                        return new Uint8Array(input.inputBytes);
                    }
                    return input.inputBytes;
                }
                switch (input.from) {
                    case JsEncodingFormat.ASCII:
                        return this.textEncoder.encode(input.inputString);
                    case JsEncodingFormat.BASE64:
                        return gg$1.base64Util.decodeStringToBytes(input.inputString);
                    case JsEncodingFormat.HEX:
                        return gg$1.hexUtil.decodeHexStringToBytes(input.inputString);
                    default:
                        throw ["NEW_CASE", input];
                }
            }
            catch (e) {
                logError(e, input);
                throw e;
            }
        }
    }

    class JsEncodingUtilImpl {
        xToByteUtil = new JsEncodingXToByteUtil();
        byteToXUtil = new JsEncodingByteToXUtil();
        convert(input) {
            try {
                const bytes = this.xToByteUtil.getBytes(input);
                return this.byteToXUtil.convertBytes(bytes, input);
            }
            catch (e) {
                throw ["FAILED_TO_ENCODE", input, e];
            }
        }
        bytesToBase64(input) {
            return this.convert({ from: JsEncodingFormat.BYTES, to: JsEncodingFormat.BASE64, inputBytes: input }).outputString;
        }
        bytesToBase64Url(input) {
            return this.convert({ from: JsEncodingFormat.BYTES, to: JsEncodingFormat.BASE64_URL, inputBytes: input }).outputString;
        }
        bytesToHex(input) {
            return this.convert({ from: JsEncodingFormat.BYTES, to: JsEncodingFormat.HEX, inputBytes: input }).outputString;
        }
        base64ToBytes(input) {
            return this.convert({ from: JsEncodingFormat.BASE64, to: JsEncodingFormat.BYTES, inputString: input }).outputBytes;
        }
        hexToBytes(input) {
            return this.convert({ from: JsEncodingFormat.HEX, to: JsEncodingFormat.BYTES, inputString: input }).outputBytes;
        }
    }

    class FnOutImpl {
        ok;
        out;
        constructor(ok, out) {
            this.ok = ok;
            this.out = out;
        }
        get result() {
            if (!this.ok) {
                throw this.out;
            }
            return this.out;
        }
        get error() {
            return this.out;
        }
        [Symbol.toPrimitive]() {
            return "" + this.out;
        }
    }

    class JsFnOutImpl {
        constructor() { }
        OK = new FnOutImpl(true, null);
        NONE = new FnOutImpl(false, null);
        result(result) {
            return new FnOutImpl(true, result);
        }
        error(errorMsg) {
            return new FnOutImpl(false, errorMsg + "");
        }
        parse(obj) {
            return new FnOutImpl(obj.ok, obj.out);
        }
        getResult(obj) {
            return obj.out;
        }
    }

    class FnCaller {
        fn;
        thisArg;
        constructor(fn, thisArg) {
            this.fn = fn;
            this.thisArg = thisArg;
        }
        callFunction(args) {
            return this.fn.apply(this.thisArg, args);
        }
    }

    class SingleInstanceFnWrapper {
        fnCaller;
        constructor(fnCaller) {
            this.fnCaller = fnCaller;
            gg$2.js.fn.bindThis(this, [this.execute]);
        }
        inProgressMap = new Map();
        async execute() {
            const argHash = gg$2.js.fn.getArgHash(arguments);
            if (this.inProgressMap.has(argHash)) {
                return this.inProgressMap.get(argHash);
            }
            const promise = gg$2.js.promise.createNew();
            this.inProgressMap.set(argHash, promise);
            try {
                const resp = await this.fnCaller.callFunction(arguments);
                promise.resolve(resp);
            }
            catch (e) {
                promise.reject(e);
            }
            this.inProgressMap.delete(argHash);
            return promise;
        }
    }

    class SingleInstanceListener {
        fnCaller;
        inProgress = false;
        callId = 0;
        lastArgs = [];
        constructor(fnCaller) {
            this.fnCaller = fnCaller;
            gg$2.js.fn.bindThis(this, [this.execute]);
        }
        async execute() {
            const callId = ++this.callId;
            if (this.inProgress) {
                this.lastArgs = Array.from(arguments);
                return;
            }
            this.inProgress = true;
            try {
                await this.fnCaller.callFunction(arguments);
            }
            finally {
                this.inProgress = false;
                if (this.callId != callId) {
                    setTimeout(this.execute.bind(this, ...this.lastArgs), 0);
                }
            }
        }
    }

    class SingleInstanceTimedListener {
        fnCaller;
        interCallDelaySec;
        args = null;
        callId = 0;
        timeoutId = -1;
        callFn = null;
        constructor(fnCaller, interCallDelaySec) {
            this.fnCaller = fnCaller;
            this.interCallDelaySec = interCallDelaySec;
            gg$2.js.fn.bindThis(this, [this.execute]);
            this.callFn = this.executeFn;
        }
        execute(...args) {
            this.callId++;
            this.args = args;
            this.callFn();
        }
        async executeFn() {
            this.callFn = this.emptyFn;
            clearTimeout(this.timeoutId);
            const callId = this.callId;
            await this.fnCaller.callFunction(this.args);
            await gg$2.js.time.delay(this.interCallDelaySec);
            if (callId != this.callId) {
                this.timeoutId = setTimeout(() => this.callFn(), 0);
            }
            this.callFn = this.executeFn;
        }
        emptyFn() { }
    }

    class JsFnWrapperImpl {
        createSingleInstance(fn, thisArg = null) {
            return new SingleInstanceFnWrapper(new FnCaller(fn, thisArg)).execute;
        }
        createSingleInstListener(fn, thisArg = null) {
            return new SingleInstanceListener(new FnCaller(fn, thisArg)).execute;
        }
        createInitFn(fn) {
            let called = false;
            return function () {
                if (called) {
                    return;
                }
                called = true;
                return fn.apply(this, arguments);
            };
        }
        createSingleInstTimedListener(fn, thisArg = null, interCallDelaySec) {
            return new SingleInstanceTimedListener(new FnCaller(fn, thisArg), interCallDelaySec).execute;
        }
    }

    class JsFunctionUtilImpl {
        emptyFn = () => { };
        wrapper = new JsFnWrapperImpl();
        bindThis(obj, fns) {
            try {
                for (let fn of fns) {
                    obj[fn.name] = fn.bind(obj);
                    if (fn.name.startsWith("bound")) {
                        throw ["bound called multiple times", obj, fns];
                    }
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getArgHash(calledArguments) {
            return Array.from(calledArguments).map(x => this.getString(x)).join(";");
        }
        getString(x) {
            if (typeof x != "object") {
                return "" + x;
            }
            if (!x) {
                return x + "";
            }
            return Object.keys(x).map(key => `${key}:${"" + x[key]}`).join(";");
        }
    }

    var ErrorCode;
    (function (ErrorCode) {
        ErrorCode["NONE"] = "NONE";
        ErrorCode["INVALID_INPUT"] = "INVALID_INPUT";
        ErrorCode["ASSERT_ERROR"] = "ASSERT_ERROR";
        ErrorCode["UNHANDLED_CASE"] = "UNHANDLED_CASE";
        ErrorCode["NOT_INITIALIZED"] = "NOT_INITIALIZED";
        ErrorCode["INVALID_ENUM_KEY"] = "INVALID_ENUM_KEY";
        ErrorCode["NOT_FOUND"] = "NOT_FOUND";
    })(ErrorCode || (ErrorCode = {}));

    class JsArrayUtilImpl {
        trueFilter(a) {
            return Boolean(a);
        }
        concat(...arrays) {
            return [].concat(...arrays);
        }
        removeElem(a, elem) {
            try {
                if (!a || elem == null) {
                    throw ErrorCode.INVALID_INPUT;
                }
                const index = a.indexOf(elem);
                this.removeElemAt(a, index);
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
        removeElemAt(a, index) {
            try {
                if (!a ||
                    !Number.isFinite(index)) {
                    throw ErrorCode.INVALID_INPUT;
                }
                if (!this.isValidArrayIndex(a, index)) {
                    return;
                }
                a.splice(index, 1);
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
        removeFirstMatch(a, matchCondition) {
            try {
                if (!a || !matchCondition) {
                    throw ErrorCode.INVALID_INPUT;
                }
                const elemIndex = a.findIndex(x => matchCondition(x));
                this.removeElemAt(a, elemIndex);
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
        toArray(iterable) {
            try {
                if (!iterable) {
                    throw ErrorCode.INVALID_INPUT;
                }
                return Array.from(iterable);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        addUnique(a, elem) {
            if (!a.includes(elem)) {
                a.push(elem);
            }
        }
        appendUnique(a, elem) {
            const lastElem = a.length && a[a.length - 1];
            if (lastElem != elem) {
                a.push(elem);
            }
        }
        addHistory(a, elem, limit) {
            this.removeElem(a, elem);
            a.push(elem);
            if (a.length > limit) {
                a.splice(0, a.length - limit);
            }
        }
        getPage(collection, pageNo, rowsPerPage) {
            if (rowsPerPage == -1) {
                return collection;
            }
            const pageStart = pageNo * rowsPerPage;
            const pageEnd = pageStart + rowsPerPage;
            return collection.slice(pageStart, pageEnd);
        }
        sliceAfter(a, elem) {
            try {
                const index = a.findIndex(x => x == elem);
                if (index == -1) {
                    return [];
                }
                return a.slice(index + 1);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        *iterate(a, param) {
            try {
                const inc = param.inc ?? 1;
                const exclusiveEnd = param.exclusiveEnd ?? (inc > 0 ? a.length : -1);
                for (let i = param.from; i != exclusiveEnd; i += inc) {
                    yield a[i];
                }
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
        getUnique(a) {
            try {
                const existing = new Set();
                const ans = [];
                for (let x of a) {
                    if (existing.has(x)) {
                        continue;
                    }
                    ans.push(x);
                    existing.add(x);
                }
                return ans;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        getUniqueObjList(a, idProvider) {
            try {
                const existing = new Set();
                const ans = [];
                for (let x of a) {
                    if (existing.has(idProvider(x))) {
                        continue;
                    }
                    ans.push(x);
                    existing.add(idProvider(x));
                }
                return ans;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        findMaxIndex(a) {
            try {
                if (a.length == 0) {
                    return -1;
                }
                let maxIndex = 0;
                let max = a[0];
                for (let i = 1; i < a.length; i++) {
                    if (a[i] > max) {
                        maxIndex = i;
                        max = a[i];
                    }
                }
                return maxIndex;
            }
            catch (e) {
                logError(e);
                return -1;
            }
        }
        isValidArrayIndex(a, index) {
            try {
                return index >= 0 && index < a?.length;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class UrlProtocol {
        http = "http:";
        https = "https:";
    }
    var BrowserName;
    (function (BrowserName) {
        BrowserName["CHROME"] = "CHROME";
        BrowserName["FIREFOX"] = "FIREFOX";
        BrowserName["EDGE"] = "EDGE";
        BrowserName["SAFARI"] = "SAFARI";
        BrowserName["OPERA"] = "OPERA";
    })(BrowserName || (BrowserName = {}));

    class JsBrowserUtilImpl {
        getName() {
            try {
                const agent = navigator.userAgent;
                if (agent.includes("Opera") || agent.includes("OPR")) {
                    return BrowserName.OPERA;
                }
                if (agent.includes("Edg")) {
                    return BrowserName.EDGE;
                }
                if (agent.includes("Chrome")) {
                    return BrowserName.CHROME;
                }
                if (agent.includes("Safari")) {
                    return BrowserName.SAFARI;
                }
                if (agent.includes("Firefox")) {
                    return BrowserName.FIREFOX;
                }
                return BrowserName.CHROME;
            }
            catch (e) {
                logError(e);
                return BrowserName.CHROME;
            }
        }
        isSafari() {
            return this.getName() == BrowserName.SAFARI;
        }
    }

    class JsDateUtilImpl {
        formatDateMonDYYYY(timestamp) {
            const date = new Date(timestamp);
            return `${this.getShortMonth(date)} ${date.getDate()}, ${date.getFullYear()}`;
        }
        formatDateMonDYYYYHHMMAM(timestamp) {
            const date = new Date(timestamp);
            const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            return `${this.formatDateMonDYYYY(timestamp)} ${timeString}`;
        }
        getShortMonth(date) {
            const shortMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = shortMonth[date.getMonth()];
            return month;
        }
    }

    const DISPLAY_DATA_KEY = "display_css";
    class JsDomUtilImpl {
        async waitDomLoad() {
            const promise = gg$2.js.promise.createNew();
            window.addEventListener("DOMContentLoaded", () => promise.resolve());
            window.addEventListener("load", () => promise.resolve());
            function checkReadyState() {
                if (document.readyState == "complete") {
                    promise.resolve();
                }
            }
            document.addEventListener("readystatechange", checkReadyState);
            checkReadyState();
            return promise;
        }
        async waitAnimationFrame() {
            try {
                await new Promise(res => window.requestAnimationFrame(res));
            }
            catch (e) {
                logError(e);
            }
        }
        setContent(elem, content) {
            try {
                const reqElem = gg$2.js.selector.select(elem);
                reqElem.replaceChildren(content);
            }
            catch (e) {
                logError(e);
            }
        }
        setChildContent(elem, selector, content) {
            try {
                const childElem = gg$2.js.selector.selectFrom(elem, selector);
                if (!childElem) {
                    throw "CHILD_ELEM_NOT_FOUND: " + selector;
                }
                return this.setContent(childElem, content);
            }
            catch (e) {
                logError(e);
            }
        }
        copyToClipboard(text) {
            try {
                const lastActiveElement = document.activeElement;
                let elem = document.createElement('textarea');
                elem.value = text;
                document.body.append(elem);
                elem.select();
                document.execCommand('copy');
                elem.remove();
                if (lastActiveElement != document.activeElement) {
                    lastActiveElement.focus();
                }
            }
            catch (e) {
                logError(e);
            }
        }
        showIf(condition, ...selectors) {
            if (condition) {
                this.showOld(...selectors);
                return;
            }
            this.hideOld(...selectors);
        }
        showOld(...selectors) {
            this.showElems(selectors);
        }
        showElems(selectors) {
            for (let selector of selectors) {
                try {
                    const elem = gg$2.js.selector.select(selector);
                    elem.style.display = elem.dataset[DISPLAY_DATA_KEY] || "block";
                }
                catch (e) {
                    logError(e);
                }
            }
        }
        hideOld(...selectors) {
            this.hideElems(selectors);
        }
        hideElems(selectors) {
            for (let selector of selectors) {
                try {
                    const elem = gg$2.js.selector.select(selector);
                    if (!elem) {
                        throw new Error("NO_ELEMENT_FOUND: " + selector);
                    }
                    const curDisplay = window.getComputedStyle(elem).display;
                    if (curDisplay != "none" && curDisplay != "block") {
                        elem.dataset[DISPLAY_DATA_KEY] = curDisplay;
                    }
                    elem.style.display = "none";
                }
                catch (e) {
                    logError(e);
                }
            }
        }
        showNoError(...selectors) {
            try {
                for (let selector of selectors) {
                    try {
                        const elem = gg$2.js.selector.select(selector);
                        if (elem) {
                            elem.style.display = elem.dataset[DISPLAY_DATA_KEY] || "block";
                        }
                    }
                    catch (e) { }
                }
            }
            catch (e) { }
        }
        hideNoError(...selectors) {
            try {
                for (let selector of selectors) {
                    try {
                        const elem = gg$2.js.selector.select(selector);
                        if (!elem) {
                            continue;
                        }
                        const curDisplay = window.getComputedStyle(elem).display;
                        if (curDisplay != "none" && curDisplay != "block") {
                            elem.dataset[DISPLAY_DATA_KEY] = curDisplay;
                        }
                        elem.style.display = "none";
                    }
                    catch (e) { }
                }
            }
            catch (e) { }
        }
        clearContent(elem) {
            try {
                const reqElem = gg$2.js.selector.select(elem);
                reqElem.replaceChildren();
            }
            catch (e) {
                logError(e);
            }
        }
        setText(selector, text) {
            try {
                const reqElem = gg$2.js.selector.select(selector);
                reqElem.dataset["tooltip_content"] = text;
                reqElem.textContent = text;
            }
            catch (e) {
                logError(e);
            }
        }
        setChildText(parentSelector, childSelector, text) {
            try {
                const elem = gg$2.js.selector.selectFrom(parentSelector, childSelector);
                this.setText(elem, text);
            }
            catch (e) {
                logError(e);
            }
        }
        disableRightClick() {
            try {
                document.addEventListener("contextmenu", function (event) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }, true);
            }
            catch (e) {
                logError(e);
            }
        }
        async closeWindow() {
            setTimeout(() => window.close(), 100);
            await new Promise(res => { });
        }
        getContentRect(elem) {
            const oldLeft = elem.style.left;
            const oldTop = elem.style.top;
            elem.style.left = "0";
            elem.style.top = "0";
            const oldDisplay = elem.style.display;
            elem.style.display = "block";
            const rect = elem.getBoundingClientRect();
            elem.style.display = oldDisplay;
            elem.style.left = oldLeft;
            elem.style.top = oldTop;
            return rect;
        }
        getPasswordMask(value) {
            try {
                const mask = "*".repeat(value.length);
                return mask;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        setStyleImportant(elem, obj) {
            try {
                for (let key in obj) {
                    elem.style.setProperty(key, obj[key], "important");
                }
            }
            catch (e) {
                logError(e);
            }
        }
        changeClass(elem, oldClassName, newClassName) {
            elem.classList.remove(oldClassName);
            elem.classList.add(newClassName);
        }
        removeElem(selector) {
            const elem = gg$2.js.selector.select(selector);
            if (elem) {
                elem.remove();
            }
        }
        finishAnimation(elem) {
            gg$2.js.selector.select(elem).getAnimations({ subtree: true }).forEach(x => x.finish());
        }
        findParent(params) {
            try {
                for (let elem of this.nodeTopIterator(params)) {
                    if (params.criteria(elem)) {
                        return elem;
                    }
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        show(...elemList) {
            this.showHideFn(true, elemList);
        }
        hide(...elemList) {
            this.showHideFn(false, elemList);
        }
        showHide(show, ...elemList) {
            this.showHideFn(show, elemList);
        }
        isContentEditable(elem) {
            try {
                if (elem.isContentEditable) {
                    return true;
                }
                if (elem instanceof HTMLInputElement || elem instanceof HTMLTextAreaElement) {
                    return !elem.readOnly && !elem.disabled;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        hasEllipsis(elem) {
            try {
                if (elem.scrollWidth > 0) {
                    return this.hasEllipsisFn(elem);
                }
                return this.hasEllipsisFn(elem.parentElement);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        hasEllipsisFn(elem) {
            return elem.scrollWidth > elem.offsetWidth;
        }
        showHideFn(show, elemList) {
            try {
                const fn = show ? this.removeClass : this.addClass;
                for (let selector of elemList) {
                    fn.call(this, selector, "dis-hide");
                }
            }
            catch (e) {
                logError(e);
            }
        }
        addClass(selector, className) {
            gg$2.js.selector.select(selector).classList.add(className);
        }
        removeClass(selector, className) {
            gg$2.js.selector.select(selector).classList.remove(className);
        }
        nodeTopIterator(params) {
            return NodeTopIterator.getIteratorInstance(params);
        }
    }
    class NodeTopIterator {
        selector;
        static getIteratorInstance(params) {
            const iterator = new NodeTopIterator(params.selector);
            if (params.limitTop) {
                return new TopLimitedNodeTopIterator(iterator, params.limitTop);
            }
            return iterator;
        }
        constructor(selector) {
            this.selector = selector;
        }
        *[Symbol.iterator]() {
            let elem = gg$2.js.selector.select(this.selector);
            for (; elem; elem = elem.parentElement) {
                yield elem;
            }
        }
    }
    class TopLimitedNodeTopIterator {
        iterator;
        topElem;
        constructor(iterator, topElemSelector) {
            this.iterator = iterator;
            const topElem = gg$2.js.selector.select(topElemSelector);
            this.topElem = topElem.parentElement ?? topElem;
        }
        *[Symbol.iterator]() {
            for (let elem of this.iterator) {
                if (elem == this.topElem) {
                    return;
                }
                yield elem;
            }
        }
    }

    function jserror$1(e, log = true) {
        if (e instanceof JSError) {
            return e;
        }
        const error = new JSError(e);
        if (log) {
            console.error(error);
        }
        return error;
    }
    class JSError extends Error {
        [Symbol.toPrimitive]() {
            return "" + this.message;
        }
    }

    class JsEventImpl {
        isControlKey(e) {
            try {
                return (e.key.length > 1) || e.ctrlKey || e.metaKey || e.altKey;
            }
            catch (e) {
                console.error(e);
                return false;
            }
        }
        preventDefault(e, stopImmediate = false) {
            e.preventDefault();
            if (stopImmediate) {
                e.stopPropagation();
            }
        }
        onEnter(elem, listener, thisArg = null) {
            elem.addEventListener("keyup", function (e) {
                if (e.key == "Enter") {
                    listener.apply(thisArg || this, arguments);
                }
            }, true);
        }
    }

    class JsLogUtilImpl {
        infoPrefix = "";
        start = Date.now();
        init() {
            gg$2.js.fn.bindThis(this, [this.infoFn]);
        }
        info = (..._args) => { };
        setInfoPrefix(prefix) {
            try {
                this.infoPrefix = prefix;
            }
            catch (e) {
                logError(e);
            }
        }
        enableLogging(enable) {
            try {
                if (enable) {
                    globalThis.info = this.info = this.infoFn;
                    return;
                }
                globalThis.info = this.info = gg$2.js.fn.emptyFn;
            }
            catch (e) {
                logError(e);
            }
        }
        mask(input, options) {
            try {
                if (typeof input == "string") {
                    return this.maskFn(input);
                }
                if (typeof input != "object") {
                    return input;
                }
                if (Array.isArray(input)) {
                    return input.map(x => this.mask(x));
                }
                if (options?.keys) {
                    return this.maskObjKeys(input, options.keys);
                }
                return this.maskObj(input);
            }
            catch (e) {
                logError(e);
                return input;
            }
        }
        maskObj(obj) {
            try {
                const maskObj = {};
                for (let key in obj) {
                    maskObj[key] = this.mask(obj[key]);
                }
                return maskObj;
            }
            catch (e) {
                logError(e);
                return {};
            }
        }
        maskObjKeys(obj, keys) {
            try {
                const maskObj = Object.assign({}, obj);
                for (let key of keys) {
                    if (!(key in obj)) {
                        continue;
                    }
                    maskObj[key] = this.mask(obj[key]);
                }
                return maskObj;
            }
            catch (e) {
                logError(e);
                return {};
            }
        }
        maskFn(x) {
            try {
                return `xxxxx(${x.length})`;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        infoFn(...args) {
            if (!globalThis["isDevMode"]) {
                return;
            }
            const currentSecond = ((Date.now() - this.start) / 1000) >> 0;
            console.debug(currentSecond, this.infoPrefix, ...args);
        }
    }

    class JsLogoUtilImpl {
        async getBase64Logo(src) {
            try {
                const img = await this.getImage(src);
                if (!img) {
                    return "";
                }
                const SIZE = 35;
                const bitmap = await createImageBitmap(img, { resizeHeight: SIZE, resizeWidth: SIZE, resizeQuality: "high" });
                const canvas = document.createElement("canvas");
                canvas.width = SIZE;
                canvas.height = SIZE;
                const context = canvas.getContext("2d");
                context.drawImage(bitmap, 0, 0);
                bitmap.close();
                img.src = "";
                const logo = canvas.toDataURL("image/png");
                context.clearRect(0, 0, SIZE, SIZE);
                return logo;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async getImage(src) {
            try {
                src = this.getCorrectedSVG(src);
                let resolve, reject;
                const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
                const image = new Image();
                image.crossOrigin = "anonymous";
                image.onload = resolve;
                image.onerror = reject;
                image.src = src;
                await promise;
                return image;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getCorrectedSVG(src = "") {
            if (!src.startsWith("data:image/svg+xml")) {
                return src;
            }
            const encodedImage = src.slice(src.indexOf(",") + 1);
            const svgText = atob(encodedImage);
            if (/<svg.*?width.*?>/.test(svgText)) {
                return src;
            }
            const correctedSvgText = svgText.replace(/(<svg.*?)>/, '$1 width="50" height="50">');
            const correctedEncodedImage = btoa(correctedSvgText);
            const reqSvgImage = "data:image/svg+xml;base64," + correctedEncodedImage;
            return reqSvgImage;
        }
    }

    class JsLoopUtilImpl {
        async *createCyclicCounter(totalCount, interCycleDelay = 0.1) {
            while (true) {
                for (let i = 0; i < totalCount; i++) {
                    yield i;
                }
                await gg$2.js.time.delay(interCycleDelay);
            }
        }
        range(end) {
            return this.rangeSE(0, end);
        }
        *rangeSE(start, exclusiveEnd) {
            for (let i = start; i < exclusiveEnd; i++) {
                yield i;
            }
        }
    }

    class JsMapUtilImpl {
        createNew({ defaultVal = null, defaultProvider = null } = {}) {
            const map = new JSMapObjImpl();
            map.initDefaultProvider({ defaultVal, defaultProvider });
            return map;
        }
        combine(mapOne, mapTwo) {
            return new Map([...mapOne.entries(), ...mapTwo.entries()]);
        }
    }
    class JSMapObjImpl {
        map = new Map();
        defaultProvider = null;
        get(key) {
            if (this.map.has(key)) {
                return this.map.get(key);
            }
            return (this.defaultProvider && this.defaultProvider()) || null;
        }
        getOrDefaultAdded(key) {
            if (this.map.has(key)) {
                return this.map.get(key);
            }
            if (!this.defaultProvider) {
                return null;
            }
            const defaultVal = this.defaultProvider();
            this.map.set(key, defaultVal);
            return defaultVal;
        }
        initDefaultProvider({ defaultVal = null, defaultProvider = null }) {
            if (defaultVal) {
                this.defaultProvider = () => defaultVal;
                return;
            }
            if (defaultProvider) {
                this.defaultProvider = defaultProvider;
                return;
            }
        }
    }

    class JsMathUtilImpl {
        sum(...a) {
            return this.sumList(a);
        }
        sumList(a) {
            return a.reduce((x, y) => x + y, 0);
        }
        getBoundedValueLEGE(min, max, value) {
            return Math.min(Math.max(min, value), max);
        }
        average(...a) {
            return this.averageList(a);
        }
        averageList(a) {
            return this.sumList(a) / a.length;
        }
    }

    class JsObjUtilImpl {
        DISABLED_FN_SUFFIX = "_disabled__";
        isEmpty(obj) {
            for (let _key in obj) {
                return false;
            }
            return true;
        }
        disableMethod(obj, fnName) {
            obj[fnName + this.DISABLED_FN_SUFFIX] = obj[fnName];
            function empty_fn() { }
            Object.defineProperty(empty_fn, "name", { value: fnName });
            obj[fnName] = empty_fn;
        }
        enableMethod(obj, fnName) {
            obj[fnName] = obj[fnName + this.DISABLED_FN_SUFFIX];
        }
        getFirstProperty(obj) {
            try {
                for (let key in obj) {
                    return obj[key];
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        isNonEmpty(obj) {
            return !this.isEmpty(obj);
        }
    }

    class JsOtherUtilImpl {
        escapeXml(s) {
            try {
                return s.replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&apos;");
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
    }

    class JsRegexUtilImpl {
        escape(s) {
            return s.replace(/[-.*+?^${}()|[\]\\]/g, "\\$&");
        }
    }

    class JsSelectorUtilImpl {
        select(selector) {
            if (selector instanceof Node) {
                return selector;
            }
            return document.querySelector(selector);
        }
        selectFrom(elem, selector) {
            const parent = this.select(elem);
            return parent.querySelector(selector);
        }
        selectAll(selector, parent = document.body) {
            const parentElem = (parent && this.select(parent)) || document.documentElement;
            return Array.from(parentElem.querySelectorAll(selector));
        }
        selectAllOld(parent = document.body, selector) {
            const parentElem = (parent && this.select(parent)) || document.documentElement;
            return Array.from(parentElem.querySelectorAll(selector));
        }
        closest(elem, selector) {
            const domElem = this.select(elem);
            return domElem.closest(selector);
        }
        selectQ(params) {
            try {
                const parentElem = (params.container && this.select(params.container)) || document.documentElement;
                return parentElem.querySelector(params.selector);
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
    }

    class JsStringUtilImpl {
        capitalize(word) {
            try {
                if (!word) {
                    return "";
                }
                return word[0].toUpperCase() + word.slice(1);
            }
            catch (e) {
                logError(e);
                return word;
            }
        }
        removeChars(s, removeChars) {
            const set = new Set(removeChars);
            const replacedString = Array.from(s).filter(ch => !set.has(ch)).join("");
            return replacedString;
        }
        parseInt(s) {
            return parseInt(s) || 0;
        }
    }

    class JsTestImpl {
        initTest() {
            try {
                globalThis.assert = this.assert;
                globalThis.assertError = this.assertError;
                globalThis.logError = console.info;
            }
            catch (e) {
                logError(e);
            }
        }
        assert(condition, ...errorArgs) {
            if (condition) {
                return;
            }
            if (errorArgs.length == 0) {
                errorArgs.push("");
            }
            console.error.apply(console.error, errorArgs);
        }
        assertError(errorCode, code) {
            try {
                code();
            }
            catch (e) {
                if (e == errorCode) {
                    return;
                }
                throw ErrorCode.ASSERT_ERROR + `: expected ${errorCode} got ${e}`;
            }
            throw ErrorCode.ASSERT_ERROR + ` expected ${errorCode} got no error`;
        }
        callTests(objList) {
            for (let obj of objList) {
                this.callTestsFn(obj);
            }
        }
        callTestsFn(obj) {
            for (let key of Object.getOwnPropertyNames(obj.__proto__)) {
                if (!key.startsWith("test")) {
                    continue;
                }
                try {
                    obj[key]();
                }
                catch (e) {
                    console.error(e);
                }
            }
            info("DONE: ", obj?.constructor?.name);
        }
        logError(...errorArgs) {
            console.error.apply(console.error, errorArgs);
            console.trace();
        }
    }

    class JsTimeUtilImpl {
        async delay(seconds = 0) {
            return new Promise(res => setTimeout(res, seconds * 1000));
        }
        getSecondsPassed(fromTime) {
            return ((Date.now() - fromTime) / 1000) >> 0;
        }
        async waitForever() {
            return new Promise(gg$2.js.fn.emptyFn);
        }
    }

    class JsTSUtilImpl {
        getEnum(key, all) {
            if (key in all) {
                return all[key];
            }
            throw ErrorCode.INVALID_ENUM_KEY;
        }
    }

    class JsUrlImpl {
        secondLD = new Set(["ac", "biz", "co", "com", "edu", "firm", "gov", "info", "int", "ltd", "mil", "net",
            "ngo", "org", "pro", "res", "wiki"]);
        wwwPrefixRegex = /^www\./;
        dotDecimalRegex = /^\d{1,3}(?:\.\d{1,3}){3}$/;
        protocol = new UrlProtocol();
        isValid(url) {
            try {
                if (!url) {
                    return false;
                }
                new URL(url).hostname;
                return true;
            }
            catch (e) {
                console.error(e, url);
                return false;
            }
        }
        isAllValid(...urls) {
            try {
                return urls.every(x => this.isValid(x));
            }
            catch (e) {
                console.error(e, urls);
                return false;
            }
        }
        getHostName(url) {
            try {
                return new URL(url).hostname.replace(this.wwwPrefixRegex, "");
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        getHost(url) {
            try {
                return new URL(url).host.replace(this.wwwPrefixRegex, "");
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        getParentDomain(url) {
            try {
                const hostname = this.getHostName(url);
                if (this.isDotDecimalIP(hostname)) {
                    return hostname;
                }
                const parentDomain = this.getParentDomainFromHostName(hostname);
                return parentDomain;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        getParentDomainFromHostName(hostname) {
            try {
                const parts = hostname.split(".");
                switch (parts.length) {
                    case 1: return parts[0];
                    case 2: return parts[0] + "." + parts[1];
                }
                const last1 = parts[parts.length - 1];
                const last2 = parts[parts.length - 2];
                if (last1.length == 2 && this.secondLD.has(last2)) {
                    return parts[parts.length - 3] + "." + last2 + "." + last1;
                }
                return last2 + "." + last1;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        getProtocol(url) {
            try {
                return new URL(url).protocol;
            }
            catch (e) {
                console.error(e);
                return "";
            }
        }
        isDotDecimalIP(input) {
            try {
                return this.dotDecimalRegex.test(input);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class JSWindowImpl {
        isTopFrame() {
            try {
                return window == window.top;
            }
            catch (e) {
                return false;
            }
        }
    }

    function logError$1(...args) {
        console.error(args);
        console.trace();
    }

    class JEventListenersImpl {
        constructor() { }
        listenerMap = {};
        add(eventName, listener) {
            const listeners = this.getListeners(eventName);
            listeners.push(listener);
        }
        dispatch(eventName, eventArgs = []) {
            const listeners = Array.from(this.getListeners(eventName));
            for (let listener of listeners) {
                listener.apply(null, eventArgs);
            }
        }
        remove(eventName, listener) {
            const listeners = this.getListeners(eventName);
            gg$2.js.array.removeElem(listeners, listener);
        }
        getListeners(eventName) {
            const existing = this.listenerMap[eventName];
            if (existing) {
                return existing;
            }
            const newListeners = [];
            this.listenerMap[eventName] = newListeners;
            return newListeners;
        }
    }

    var State;
    (function (State) {
        State["PENDING"] = "PENDING";
        State["RESOLVED"] = "RESOLVED";
        State["REJECTED"] = "REJECTED";
    })(State || (State = {}));
    class PromiseRRImpl {
        state = State.PENDING;
        val = null;
        listeners;
        constructor() {
            this.listeners = new JEventListenersImpl();
        }
        resolve(val = null) {
            this.changeState(State.RESOLVED, val);
        }
        reject(err = null) {
            this.changeState(State.REJECTED, err);
        }
        changeState(state, val) {
            if (this.state != State.PENDING) {
                return;
            }
            this.val = val;
            this.state = state;
            this.listeners.dispatch(state, [val]);
            this.listeners = null;
        }
        then(resolvedCallback, rejectedCallback) {
            switch (this.state) {
                case State.RESOLVED:
                    resolvedCallback(this.val);
                    return this;
                case State.REJECTED:
                    if (!rejectedCallback) {
                        return this;
                    }
                    rejectedCallback(this.val);
                    return this;
            }
            if (resolvedCallback) {
                this.listeners.add(State.RESOLVED, resolvedCallback);
            }
            if (rejectedCallback) {
                this.listeners.add(State.REJECTED, rejectedCallback);
            }
            return this;
        }
        isPending() {
            return this.state == State.PENDING;
        }
    }

    class TimedPromiseRRImpl extends PromiseRRImpl {
        constructor(maxWaitSeconds) {
            super();
            this.setupAutoReject(maxWaitSeconds);
        }
        setupAutoReject(maxWaitSeconds) {
            const timeout = setTimeout(() => this.reject("Z_TIMEOUT"), maxWaitSeconds * 1000);
            const clearTimeoutFn = () => clearTimeout(timeout);
            this.then(clearTimeoutFn, clearTimeoutFn);
        }
    }

    class JsPromiseUtilImpl {
        constructor() { }
        createNew() {
            return new PromiseRRImpl();
        }
        createTimed(maxWaitSeconds) {
            return new TimedPromiseRRImpl(maxWaitSeconds);
        }
    }

    class JsUtilImpl {
        static getInstance() {
            try {
                if (gg$2.js) {
                    return gg$2.js;
                }
                return gg$2.js = new JsUtilImpl();
            }
            catch (e) {
                throw e;
            }
        }
        array = new JsArrayUtilImpl();
        browser = new JsBrowserUtilImpl();
        promise = new JsPromiseUtilImpl();
        crypto = new JsCryptoImpl();
        dom = new JsDomUtilImpl();
        event = new JsEventImpl();
        test = new JsTestImpl();
        fn = new JsFunctionUtilImpl();
        fnOut = new JsFnOutImpl();
        time = new JsTimeUtilImpl();
        loop = new JsLoopUtilImpl();
        log = new JsLogUtilImpl();
        logo = new JsLogoUtilImpl();
        math = new JsMathUtilImpl();
        map = new JsMapUtilImpl();
        obj = new JsObjUtilImpl();
        other = new JsOtherUtilImpl();
        selector = new JsSelectorUtilImpl();
        date = new JsDateUtilImpl();
        encoding = new JsEncodingUtilImpl();
        regex = new JsRegexUtilImpl();
        string = new JsStringUtilImpl();
        tsUtil = new JsTSUtilImpl();
        url = new JsUrlImpl();
        window = new JSWindowImpl();
        init() {
            try {
                this.init = this.fn.emptyFn;
                this.log.init();
                globalThis.js = this;
                globalThis.fnOut = this.fnOut;
                globalThis.jserror = jserror$1;
                globalThis.logError = logError$1;
                globalThis.logInfo = globalThis.info = this.log.info.bind(this.log);
                globalThis.isDevMode = Boolean(globalThis.isDevMode);
            }
            catch (e) {
                logError$1(e);
            }
        }
    }

    var LocalStorageKeys;
    (function (LocalStorageKeys) {
        LocalStorageKeys["ACCESS_TOKEN"] = "ACCESS_TOKEN";
        LocalStorageKeys["REFRESH_TOKEN"] = "REFRESH_TOKEN_1";
        LocalStorageKeys["TOKEN_VALID_UPTO"] = "TOKEN_VALID_UPTO";
        LocalStorageKeys["DOMAIN"] = "DOMAIN";
        LocalStorageKeys["DB_VERSION"] = "DB_VERSION";
        LocalStorageKeys["ZTAB_ID"] = "ZTAB_ID";
        LocalStorageKeys["SECRETSLIMIT"] = "SECRETSLIMIT";
        LocalStorageKeys["SYNCING"] = "SYNCING";
        LocalStorageKeys["USER_SYNC"] = "USER_SYNC";
        LocalStorageKeys["LAST_SYNCED"] = "LAST_SYNCED";
        LocalStorageKeys["FEATURES"] = "FEATURES";
        LocalStorageKeys["PLAN"] = "PLAN";
        LocalStorageKeys["IS_PERSONAL_PLAN"] = "IS_PERSONAL_PLAN";
        LocalStorageKeys["DOMAIN_MATCHING_COUNT"] = "DOMAIN_MATCHING_COUNT";
        LocalStorageKeys["LAST_ACTIVE"] = "LAST_ACTIVE";
        LocalStorageKeys["USED_CATEGORIES"] = "USED_CATEGORIES";
        LocalStorageKeys["PAYMENT_CARD_TYPE_ID"] = "PAYMENT_CARD_TYPE_ID";
        LocalStorageKeys["ADDRESS_TYPE_ID"] = "ADDRESS_TYPE_ID";
        LocalStorageKeys["USER_ID"] = "USER_ID";
        LocalStorageKeys["ZUID"] = "ZUID";
        LocalStorageKeys["EMAIL"] = "EMAIL";
        LocalStorageKeys["USERNAME"] = "USERNAME";
        LocalStorageKeys["USER_ROLES"] = "USER_ROLES";
        LocalStorageKeys["DP"] = "DP";
        LocalStorageKeys["ENCRYPTED_DATE"] = "ENCRYPTED_DATE";
        LocalStorageKeys["SALT"] = "SALT";
        LocalStorageKeys["LOGIN_TYPE"] = "LOGIN_TYPE";
        LocalStorageKeys["ITERATIONS"] = "ITERATIONS";
        LocalStorageKeys["LAST_PASSPHRASE_CHANGE"] = "LAST_PASSPHRASE_CHANGE";
        LocalStorageKeys["PASSPHRASE_CREATION_TIME"] = "PASSPHRASE_CREATION_TIME";
        LocalStorageKeys["CLEAR_CLIPBOARD"] = "CLEAR_CLIPBOARD";
        LocalStorageKeys["DOMAIN_MATCHING_MODE_OLD"] = "DOMAIN_MATCHING_MODE_OLD";
        LocalStorageKeys["DOMAIN_MATCH_MODE"] = "DOMAIN_MATCH_MODE";
        LocalStorageKeys["INACTIVE_TIMEOUT"] = "INACTIVE_TIMEOUT";
        LocalStorageKeys["AUTO_SAVE_UPDATE_PASSWORDS"] = "AUTO_SAVE_UPDATE_PASSWORDS";
        LocalStorageKeys["INSECURE_PAGE_PROMPT"] = "INSECURE_PAGE_PROMPT";
        LocalStorageKeys["DEFAULT_FILTER"] = "DEFAULT_FILTER";
        LocalStorageKeys["INACTIVITY_ENFORCED"] = "INACTIVITY_ENFORCED";
        LocalStorageKeys["CARD_SAVE_PROMPT"] = "CARD_SAVE_PROMPT";
        LocalStorageKeys["CARD_AUTOFILL_SUBDOMAIN"] = "CARD_AUTOFILL_SUBDOMAIN";
        LocalStorageKeys["SHOW_ONLY_USER_DEFINED_SEC_TYPES"] = "SHOW_ONLY_USER_DEFINED_SEC_TYPES";
        LocalStorageKeys["ALLOW_PERSONAL_SECRET"] = "ALLOW_PERSONAL_SECRET";
        LocalStorageKeys["ALLOW_ENTERPRISE_SECRET"] = "ALLOW_ENTERPRISE_SECRET";
        LocalStorageKeys["ALLOW_FILE_ATTACHMENT"] = "ALLOW_FILE_ATTACHMENT";
        LocalStorageKeys["ALLOW_ADD_SECRET"] = "ALLOW_ADD_SECRET";
        LocalStorageKeys["ALLOW_SHARE_SECRET"] = "ALLOW_SHARE_SECRET";
        LocalStorageKeys["PII_ENABLED"] = "PII_ENABLED";
        LocalStorageKeys["ALLOW_SAME_NAME"] = "ALLOW_SAME_NAME";
        LocalStorageKeys["ALLOW_THIRD_PARTY_SHARING"] = "ALLOW_THIRD_PARTY_SHARING";
        LocalStorageKeys["ALLOW_ADD_FOLDER"] = "ALLOW_ADD_FOLDER";
        LocalStorageKeys["POLICY_USAGE"] = "POLICY_USAGE";
        LocalStorageKeys["DEFAULT_POLICY_ID"] = "DEFAULT_POLICY_ID";
        LocalStorageKeys["GENERATOR_STATE"] = "GENERATOR_STATE";
        LocalStorageKeys["ONEAUTH_TOTP_DEVICE"] = "ONEAUTH_TOTP_DEVICE";
        LocalStorageKeys["ONEAUTH_TOTP_SECRETS"] = "ONEAUTH_TOTP_SECRETS";
        LocalStorageKeys["ONE_CLICK_PASS_CHANGE_CHECK"] = "ONE_CLICK_PASS_CHANGE_CHECK";
        LocalStorageKeys["NEW_PLAIN_PASS_CHECK"] = "NEW_PLAIN_PASS_CHECK";
        LocalStorageKeys["USE_OLD_FILL"] = "USE_OLD_FILL";
        LocalStorageKeys["USE_OLD_DEVTOOLS_CHECK"] = "USE_OLD_DEVTOOLS_CHECK";
        LocalStorageKeys["SKIP_ONE_CLICK_BG_CONNECT_CHECK"] = "SKIP_ONE_CLICK_BG_CONNECT_CHECK";
        LocalStorageKeys["SKIP_DISC_PASSWORD_CHECK"] = "SKIP_DISC_PASSWORD_CHECK";
        LocalStorageKeys["SKIP_ONE_CLICK_TAB_CHECK"] = "SKIP_ONE_CLICK_TAB_CHECK";
        LocalStorageKeys["SKIP_PASSWORD_ASSESSMENT"] = "SKIP_PASSWORD_ASSESSMENT";
        LocalStorageKeys["USE_OLD_SUBMIT_REGEX"] = "USE_OLD_SUBMIT_REGEX";
        LocalStorageKeys["RESTRICT_ONEAUTH_UNLOCK"] = "RESTRICT_ONEAUTH_UNLOCK";
        LocalStorageKeys["RESTRICT_WEBAUTHN_UNLOCK"] = "RESTRICT_WEBAUTHN_UNLOCK";
        LocalStorageKeys["ONEAUTH_UNLOCK_ENABLED"] = "ONEAUTH_UNLOCK_ENABLED";
        LocalStorageKeys["ONEAUTH_UNLOCK"] = "ONEAUTH_UNLOCK";
        LocalStorageKeys["LAST_USED_UNLOCK"] = "LAST_USED_UNLOCK";
        LocalStorageKeys["WEBAUTHN_UNLOCK_ENABLED"] = "WEBAUTHN_UNLOCK_ENABLED";
        LocalStorageKeys["WEBAUTHN_UNLOCK"] = "WEBAUTHN_UNLOCK";
        LocalStorageKeys["PASSPHRASE_INVALID_COUNT"] = "PASSPHRASE_INVALID_COUNT";
        LocalStorageKeys["SIDE_PANEL_SUPPORTED"] = "SIDE_PANEL_SUPPORTED";
        LocalStorageKeys["DEV_MASTER_PASSWORD"] = "DEV_MASTER_PASSWORD";
    })(LocalStorageKeys || (LocalStorageKeys = {}));

    var SessionStorageKeys;
    (function (SessionStorageKeys) {
        SessionStorageKeys["MASTER_KEY"] = "MASTER_KEY";
        SessionStorageKeys["ORG_KEY"] = "ORG_KEY";
        SessionStorageKeys["SESSION_AES_KEY"] = "SESSION_AES_KEY";
        SessionStorageKeys["LAST_ACTIVE"] = "LAST_ACTIVE";
        SessionStorageKeys["IN_PROGRESS_RESETS"] = "IN_PROGRESS_RESETS";
        SessionStorageKeys["LAST_BASIC_AUTH_EVENT"] = "LAST_BASIC_AUTH_EVENT";
        SessionStorageKeys["TAB_CREATOR_PREFIX"] = "TAB_CREATOR_";
        SessionStorageKeys["ACCOUNT_CHECK_VALID_UPTO"] = "ACCOUNT_CHECK_VALID_UPTO";
        SessionStorageKeys["SIDE_PANEL_OPENED_FROM"] = "SIDE_PANEL_OPENED_FROM";
        SessionStorageKeys["ZMAPS_INITIALIZED"] = "ZMAPS_INITIALIZED";
        SessionStorageKeys["POST_UNLOCK_TASK"] = "POST_UNLOCK_TASK";
        SessionStorageKeys["OAUTH_IN_PROGRESS"] = "OAUTH_IN_PROGRESS";
        SessionStorageKeys["OAUTH_CHALLENGE"] = "OAUTH_CHALLENGE";
        SessionStorageKeys["ONEAUTH_UNLOCK_STARTED"] = "ONEAUTH_UNLOCK_STARTED";
        SessionStorageKeys["POPUP_UNLOCK_ERROR"] = "POPUP_UNLOCK_ERROR";
        SessionStorageKeys["EXT_CRYPTO_AES_KEY"] = "EXT_CRYPTO_AES_KEY";
    })(SessionStorageKeys || (SessionStorageKeys = {}));

    var TabDomainStorageKeys;
    (function (TabDomainStorageKeys) {
        TabDomainStorageKeys["SAVE_USERNAME"] = "SAVE_USERNAME";
        TabDomainStorageKeys["SAVE_CREDENTIAL"] = "SAVE_CREDENTIAL";
        TabDomainStorageKeys["CHANGED_CREDENTIAL"] = "CHANGED_CREDENTIAL";
        TabDomainStorageKeys["LOGIN_PASSWORD_FILL_INFO"] = "LOGIN_PASSWORD_FILL_INFO";
    })(TabDomainStorageKeys || (TabDomainStorageKeys = {}));

    var TabStorageKeys;
    (function (TabStorageKeys) {
        TabStorageKeys["SHOWN_SAVE_FRAME"] = "SHOWN_SAVE_FRAME";
        TabStorageKeys["SHOWN_UPDATE_FRAME"] = "SHOWN_UPDATE_FRAME";
        TabStorageKeys["SHOWN_RESET_FRAME"] = "SHOWN_RESET_FRAME";
        TabStorageKeys["SHOWN_SAVE_CARD_FRAME"] = "SHOWN_SAVE_CARD_FRAME";
        TabStorageKeys["SHOWN_UPDATE_CARD_FRAME"] = "SHOWN_UPDATE_CARD_FRAME";
        TabStorageKeys["CONFIRM_USAGE_FOR"] = "CONFIRM_USAGE_FOR";
        TabStorageKeys["LOGIN_DATA"] = "LOGIN_DATA";
        TabStorageKeys["ZICON_CLICK_LOCATION"] = "ZICON_CLICK_LOCATION";
        TabStorageKeys["ACTIVE_FRAME_ID"] = "ACTIVE_FRAME_ID";
        TabStorageKeys["SITE_FRAME_ARROW_CLASS"] = "SITE_FRAME_ARROW_CLASS";
        TabStorageKeys["ALERT_CONFIG"] = "ALERT_CONFIG";
        TabStorageKeys["SAVE_FRAME_DATA"] = "SAVE_FRAME_DATA";
        TabStorageKeys["UPDATE_FRAME_DATA"] = "UPDATE_FRAME_DATA";
        TabStorageKeys["CARD_FRAME_DATA"] = "CARD_FRAME_DATA";
        TabStorageKeys["SAVE_CARD_FRAME_DATA"] = "SAVE_CARD_FRAME_DATA";
        TabStorageKeys["FORM_FRAME_DATA"] = "FORM_FRAME_DATA";
        TabStorageKeys["SF_SHOWN_TAB"] = "SF_SHOWN_TAB";
        TabStorageKeys["SF_SEARCH_STRING"] = "SF_SEARCH_STRING";
        TabStorageKeys["PLAYBACK_DATA"] = "PLAYBACK_DATA";
        TabStorageKeys["RESET_PROGRESS"] = "RESET_PROGRESS";
        TabStorageKeys["RESET_DATA"] = "RESET_DATA";
        TabStorageKeys["CCIFRAMEDATA"] = "CCIFRAMEDATA";
        TabStorageKeys["OPENED_DEV_TOOLS"] = "OPENED_DEV_TOOLS";
    })(TabStorageKeys || (TabStorageKeys = {}));

    class LocalStorageImpl {
        static instance = null;
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return this.instance = new LocalStorageImpl();
        }
        async save(key, val) {
            return this.saveAll({ [key]: val });
        }
        async saveAll(keyValObj) {
            return brApi.storage.local.saveAll(keyValObj);
        }
        async load(key, defaultVal = "") {
            const existing = await brApi.storage.local.loadAll({ [key]: defaultVal });
            return existing[key];
        }
        async loadAll(keyObj) {
            return brApi.storage.local.loadAll(keyObj);
        }
        async remove(keyOrKeys) {
            return brApi.storage.local.remove(keyOrKeys);
        }
        async clear() {
            return brApi.storage.local.clear();
        }
    }

    class SessionStorageImpl {
        static instance = null;
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return this.instance = new SessionStorageImpl();
        }
        async save(key, val) {
            return this.saveAll({ [key]: val });
        }
        async load(key, defaultVal = null) {
            const existing = await this.loadAll({ [key]: defaultVal });
            return existing[key];
        }
        async saveAll(keyValObj) {
            return bgApi.session.saveAll(keyValObj);
        }
        async loadAll(keyObj) {
            return bgApi.session.loadAll(keyObj);
        }
        async remove(keyOrKeys) {
            return bgApi.session.remove(keyOrKeys);
        }
        async clear() {
            return bgApi.session.clear();
        }
    }

    class SearchUtil {
        isPresent(pattern, input, ignoreCase = false) {
            if (ignoreCase) {
                pattern = pattern.toLowerCase();
                input = input.toLowerCase();
            }
            let patternI = 0;
            for (let i = 0; patternI < pattern.length && i < input.length; i++) {
                if (pattern[patternI] == input[i]) {
                    patternI++;
                }
            }
            return patternI == pattern.length;
        }
        getSearchRegex(searchString) {
            const regExInput = searchString.split("").map(this.getSearchRegexChar, this).join("");
            const searchRegex = new RegExp(regExInput, "i");
            return searchRegex;
        }
        escapeRegex(s) {
            return s.replace(/[-.*+?^${}()|[\]\\]/g, "\\$&");
        }
        getSearchRegexChar(inputChar) {
            const ch = this.escapeRegex(inputChar);
            return "[^" + ch + "]*?" + ch;
        }
    }

    class VUtil {
        search = context$4.searchUtil;
        async getValidSaveDomains() {
            try {
                const urls = await this.getSaveUrls();
                const parentDomains = urls.map(x => js.url.getParentDomain(x));
                return parentDomains;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async getSaveUrls() {
            try {
                if (this.isTopFrame()) {
                    return [window.location.href];
                }
                return [
                    await bgApi.tab.getTabUrl(),
                    window.location.href
                ];
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        isTopFrame() {
            try {
                return window == window.top;
            }
            catch (e) {
                return false;
            }
        }
    }

    let Context$4 = class Context {
        searchUtil;
        vUtil;
        init() {
            this.searchUtil = new SearchUtil();
            this.vUtil = new VUtil();
        }
    };
    const context$4 = new Context$4();

    const STRING = {
        TRUE: "true",
        FALSE: "false",
    };

    context$4.init();
    const vutil = context$4.vUtil;

    class TabDomainStorageImpl {
        static instance = null;
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return this.instance = new TabDomainStorageImpl();
        }
        async load(key, defaultVal = null) {
            return bgApi.tab.loadFromDomainMemory(key, defaultVal);
        }
        async save(key, val) {
            const allowedDomains = await vutil.getValidSaveDomains();
            return bgApi.tab.saveToDomainMemory(key, val, allowedDomains);
        }
        async saveDomain(key, val, allowedDomains) {
            return bgApi.tab.saveToDomainMemory(key, val, allowedDomains);
        }
        async remove(key) {
            return bgApi.tab.removeFromMemory(key);
        }
    }

    class TabStorageImpl {
        static instance = null;
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return this.instance = new TabStorageImpl();
        }
        async load(key, defaultVal = null) {
            return bgApi.tab.loadFromMemory(key, defaultVal);
        }
        async save(key, val) {
            return bgApi.tab.saveToMemory(key, val);
        }
        async remove(key) {
            return bgApi.tab.removeFromMemory(key);
        }
        async clear() {
            return bgApi.tab.clearMemory();
        }
    }

    class VtImpl {
        static instance = null;
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return this.instance = new VtImpl();
        }
        initializer = new Initializer();
        constructor() {
            this.initializer.init();
        }
        async init(params) {
            try {
                this.initializer.initLogging(params.logPrefix);
                if (!params.skipBgApiInit) {
                    await bgApi.init();
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async isPersonalPlan() {
            try {
                const isPersonalPlan = await zlocalStorage.load(LocalStorageKeys.IS_PERSONAL_PLAN, false);
                return isPersonalPlan;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }
    class Initializer {
        init() {
            try {
                this.initJs();
                BrApiImpl.getInstance().init();
                this.initStorage();
                this.init = js.fn.emptyFn;
            }
            catch (e) {
                logError(e);
            }
        }
        initLogging(prefix) {
            try {
                if (!isDevMode) {
                    return;
                }
                js.log.setInfoPrefix(prefix);
                js.log.enableLogging(true);
            }
            catch (e) {
                logError(e);
            }
        }
        initJs() {
            try {
                globalThis.js = JsUtilImpl.getInstance();
                js.init();
            }
            catch (e) {
                logError(e);
            }
        }
        initStorage() {
            try {
                globalThis.zlocalStorage = LocalStorageImpl.getInstance();
                globalThis.zsessionStorage = SessionStorageImpl.getInstance();
                globalThis.ztabStorage = TabStorageImpl.getInstance();
                globalThis.ztabDomainStorage = TabDomainStorageImpl.getInstance();
                globalThis["LocalStorageKeys"] = LocalStorageKeys;
                globalThis["SessionStorageKeys"] = SessionStorageKeys;
                globalThis["TabStorageKeys"] = TabStorageKeys;
                globalThis["TabDomainStorageKeys"] = TabDomainStorageKeys;
            }
            catch (e) {
                logError(e);
            }
        }
    }

    function main$3() {
        globalThis.i18n = i18n$1;
        globalThis.vt = VtImpl.getInstance();
    }

    class ZVGlobal {
        static isDevMode() {
            return DevModeChecker.isDevMode();
        }
        static setGlobal(key, x) {
            if (globalThis) {
                globalThis[key] = x;
            }
            if (typeof window !== "undefined") {
                window[key] = x;
            }
        }
    }
    class DevModeChecker {
        static checked = false;
        static devMode = false;
        static isDevMode() {
            if (this.checked) {
                return this.devMode;
            }
            this.devMode = chrome.runtime.getManifest().name.includes("Dev");
            this.checked = true;
            return this.devMode;
        }
    }

    function setGlobal(key, x) {
        ZVGlobal.setGlobal(key, x);
    }

    class Bg {
        initialized = false;
        popupClient = null;
        ztabClient = null;
        alarmHandler = null;
        themeHandler = null;
        logoutHandler = null;
        ztabHandler = null;
        basicAuthenticationHandler = null;
        vault = null;
        vaultAudit = null;
        vaultConfig = null;
        vaultFolders = null;
        vaultLogin = null;
        vaultPolicies = null;
        vaultSecrets = null;
        vaultSecretTypes = null;
        vaultSettings = null;
        neverSaveUrls = null;
        vaultSync = null;
        vaultTrash = null;
        user = null;
        zcrypt = null;
        clipboard = null;
        offscreenApi = null;
        siteFrame = null;
        cardFrame = null;
        formFrame = null;
        saveFrame = null;
        confirmFrame = null;
        updateFrame = null;
        savePassword = null;
        neverSaveChecker = null;
        passwordReset = null;
        unlockTabHandler = null;
        csUtil = null;
        oneAuthTotp = null;
        zmaps = null;
    }
    const bg$1 = new Bg();
    setGlobal("bg", bg$1);

    class BgAccessCtrlApiImpl {
        async update(apiInput) {
            return bg$1.vaultSecrets.accessControl.updateAccessControl(apiInput);
        }
        async getAccessCtrlSettings(secretId) {
            return bg$1.vaultSecrets.accessControl.getSecretAccessControlSettings(secretId);
        }
        async createRequest(input) {
            return bg$1.vaultSecrets.accessControl.createAccessRequest(input);
        }
        async getAccessPendingUIInfo(accessRequestId) {
            return bg$1.vaultSecrets.accessControl.getPendingAccessRequestUIInfo(accessRequestId);
        }
        async cancel(accessRequestId) {
            return bg$1.vaultSecrets.accessControl.cancelAccessRequest(accessRequestId);
        }
        async checkout(accessRequestId, secretId) {
            return bg$1.vaultSecrets.accessControl.checkoutSecret(accessRequestId, secretId);
        }
        async checkin(secretId) {
            return bg$1.vaultSecrets.accessControl.checkinSecret(secretId);
        }
        async disable(secretId) {
            return bg$1.vaultSecrets.accessControl.disable(secretId);
        }
        async isHelpdeskEnabled(secretId) {
            return bg$1.vaultSecrets.accessControl.isHelpdeskEnabled(secretId);
        }
    }

    class BgAuditApiImpl {
        async secretAccessed(secretId) {
            bg.vaultAudit.auditSecretAccessed(secretId);
        }
        async fieldViewed(secretId, fieldName) {
            return bg.vaultAudit.fieldViewed(secretId, fieldName);
        }
        async columnViewed(secretId, columnId) {
            return bg.vaultAudit.viewedCustomcolumn(secretId, columnId);
        }
        async totpKeyViewed(secretId) {
            bg.vaultAudit.auditTotpKeyViewed(secretId);
        }
        async fieldCopied(secretId, fieldName) {
            return bg.vaultAudit.fieldCopied(secretId, fieldName);
        }
        async customColumnCopied(secretId, columnId) {
            return bg.vaultAudit.customColumnCopied(secretId, columnId);
        }
        async notesCopied(secretId) {
            return bg.vaultAudit.notesCopied(secretId);
        }
    }

    class SessionMemory {
        static getInstance() {
            const isV2 = brApi.isV2();
            if (isV2) {
                return new SessionMemoryV2();
            }
            return new SessionMemoryImpl();
        }
        async load(key, defaultVal = null) {
            const existing = await this.loadAll({ [key]: defaultVal });
            return existing[key];
        }
        async save(key, val) {
            return this.saveAll({ [key]: val });
        }
    }
    class SessionMemoryImpl extends SessionMemory {
        async saveAll(keyValObj) {
            return brApi.storage.session.saveAll(keyValObj);
        }
        async loadAll(keyObj) {
            return brApi.storage.session.loadAll(keyObj);
        }
        async remove(keyOrKeys) {
            return brApi.storage.session.remove(keyOrKeys);
        }
        async clear() {
            try {
                const keys = Object.keys(await brApi.storage.session.loadAll(null));
                const nonDevCheckKeys = keys.filter(x => !x.includes("OPENED_DEV_TOOLS"));
                await this.remove(nonDevCheckKeys);
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class SessionMemoryV2 extends SessionMemory {
        memory = new Map();
        async saveAll(keyValObj) {
            for (let key in keyValObj) {
                this.memory.set(key, keyValObj[key]);
            }
        }
        async loadAll(keyObj) {
            const reqObj = {};
            for (let key in keyObj) {
                reqObj[key] = this.memory.has(key) ? this.memory.get(key) : keyObj[key];
            }
            return reqObj;
        }
        async remove(keyOrKeys) {
            const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];
            for (let curKey of keys) {
                this.memory.delete(curKey);
            }
        }
        async clear() {
            try {
                const keys = Array.from(this.memory.keys());
                const nonDevCheckKeys = keys.filter(x => !x.includes("OPENED_DEV_TOOLS"));
                await this.remove(nonDevCheckKeys);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class TabStorage {
        prefix;
        constructor(prefix) {
            this.prefix = prefix;
        }
        init() {
            try {
                js.fn.bindThis(this, [this.tabRemoved]);
                brApi.tab.onTabRemove(this.tabRemoved);
            }
            catch (e) {
                logError(e);
            }
        }
        async save(tabId, key, val) {
            try {
                await zsessionStorage.save(this.toStorageKey(tabId, key), val);
            }
            catch (e) {
                logError(e);
            }
        }
        async load(tabId, key, defaultVal = null) {
            try {
                return await zsessionStorage.load(this.toStorageKey(tabId, key), defaultVal);
            }
            catch (e) {
                logError(e);
                return defaultVal;
            }
        }
        async remove(tabId, key) {
            try {
                return await zsessionStorage.remove(this.toStorageKey(tabId, key));
            }
            catch (e) {
                logError(e);
            }
        }
        async saveDomain(tabId, key, val, allowedDomains) {
            try {
                const saveObj = {
                    domains: allowedDomains,
                    val
                };
                await this.save(tabId, key, saveObj);
            }
            catch (e) {
                logError(e);
            }
        }
        async loadDomain(tab, key, defaultVal = null) {
            try {
                if (!tab) {
                    return defaultVal;
                }
                const savedObj = await this.load(tab.id, key);
                if (!savedObj) {
                    return defaultVal;
                }
                const tabDomain = js.url.getParentDomain(tab.url);
                if (!savedObj.domains.includes(tabDomain)) {
                    return defaultVal;
                }
                return savedObj.val;
            }
            catch (e) {
                logError(e);
                return defaultVal;
            }
        }
        async loadDomainV1(tabId, key, defaultVal = null) {
            try {
                const tab = await brApi.tab.getTab(tabId);
                return this.loadDomain(tab, key, defaultVal);
            }
            catch (e) {
                logError(e);
                return defaultVal;
            }
        }
        async clear(tabId) {
            const existing = await zsessionStorage.loadAll(null) || {};
            const tabPrefix = this.getTabPrefix(tabId);
            const tabKeys = Object.keys(existing).filter(x => x.startsWith(tabPrefix));
            await zsessionStorage.remove(tabKeys);
        }
        toStorageKey(tabId, key) {
            return `${this.getTabPrefix(tabId)}_${key}`;
        }
        getTabPrefix(tabId) {
            return `${this.prefix}_${tabId}`;
        }
        async tabRemoved(tabId) {
            await this.clear(tabId);
        }
    }

    class TAB_STORAGE_PREFIX {
        static TAB = "TAB_MEMORY";
        static LOGIN = "TAB_LOGIN_MEMORY_";
    }

    class Storage {
        tab = new TabStorage(TAB_STORAGE_PREFIX.TAB);
        init() {
            try {
                globalThis.zsessionStorage = SessionMemory.getInstance();
                this.tab.init();
            }
            catch (e) {
                logError(e);
            }
        }
        createTabStorage(prefix) {
            return new TabStorage(prefix);
        }
    }

    let Context$3 = class Context {
        storage = null;
        init() {
            this.storage = new Storage();
        }
    };
    const context$3 = new Context$3();

    context$3.init();
    const bgStorage = context$3.storage;
    globalThis["bgStorage"] = bgStorage;

    class ApiServerUtil {
        static getTabId(port) {
            try {
                return port?.tab.id ?? port.sender?.tab?.id;
            }
            catch (e) {
                logError(e);
                return -1;
            }
        }
        static getFrameId(port) {
            try {
                return port?.frameId ?? port.sender?.frameId;
            }
            catch (e) {
                logError(e);
                return -1;
            }
        }
        static getTabUrl(port) {
            try {
                return port?.tab.url ?? port.sender?.tab?.url;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        static getTab(port) {
            try {
                return port?.tab ?? port.sender?.tab;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }

    class BgCardFrameApiImpl {
        async getTabUrl(port) {
            return ApiServerUtil.getTabUrl(port);
        }
        async showFormFrame(frameUrl, port) {
            return csApi.frame.showFormFrame(ApiServerUtil.getTabId(port), frameUrl);
        }
        async closeCardFrame(port) {
            return csApi.frame.closeCardFrame(ApiServerUtil.getTabId(port));
        }
        async showSaveCardFrame(cardObj, port) {
            cardObj.allowedClassifications = await bg$1.vaultConfig.getAddPasswordClassifications();
            const tabId = ApiServerUtil.getTabId(port);
            await bgStorage.tab.save(tabId, TabStorageKeys.SAVE_CARD_FRAME_DATA, cardObj);
            return csApi.frame.showSaveCardFrame(tabId);
        }
        async showUpdateCardFrame(cardObj, port) {
            cardObj.allowedClassifications = await bg$1.vaultConfig.getAddPasswordClassifications();
            const tabId = ApiServerUtil.getTabId(port);
            await bgStorage.tab.save(tabId, TabStorageKeys.SAVE_CARD_FRAME_DATA, cardObj);
            return csApi.frame.showUpdateCardFrame(tabId);
        }
        async closeSaveCardFrame(port) {
            const tabId = ApiServerUtil.getTabId(port);
            await bgStorage.tab.remove(tabId, TabStorageKeys.SAVE_CARD_FRAME_DATA);
            return csApi.frame.closeSaveCardFrame(tabId);
        }
        async getSecrets(query, _port) {
            return bg$1.cardFrame.getCardListSecrets(query);
        }
        async fillCard(secret, frameId, port) {
            return bg$1.cardFrame.fillCard(ApiServerUtil.getTabId(port), frameId, secret);
        }
        async fillCardIframe(data, secretId, frameId, port) {
            return bg$1.cardFrame.fillCardIframe(ApiServerUtil.getTabId(port), frameId, secretId, data);
        }
        async fillForm(secret, frameId, port) {
            return bg$1.formFrame.fillForm(ApiServerUtil.getTabId(port), frameId, secret);
        }
        async fillFormField(data, frameId, port) {
            return bg$1.formFrame.fillFormField(ApiServerUtil.getTabId(port), frameId, data);
        }
        async getCardCategory(_port) {
            return bg$1.vaultSecretTypes.getCardType();
        }
        async checkIframeFields(data, port) {
            return csApi.card.checkIframeFields(ApiServerUtil.getTabId(port), data);
        }
        async fillVaultIconCCIframe(fields, frameId, port) {
            return csApi.card.fillVaultIconCCIframe(fields, { tabId: ApiServerUtil.getTabId(port), frameId });
        }
    }

    class BgCryptoApiImpl {
        file = new BgFileCryptoApiImpl();
        ext = new BgExtCryptoApiImpl();
        async encrypt(plaintext, isShared) {
            return bg$1.zcrypt.encrypt(plaintext, isShared);
        }
        async decrypt(ciphertext, isShared) {
            return bg$1.zcrypt.decrypt(ciphertext, isShared);
        }
        async getKey(isShared) {
            return bg$1.zcrypt.getKey(isShared);
        }
        async getIsShared(classification) {
            return bg$1.zcrypt.getIsShared(classification);
        }
    }
    class BgFileCryptoApiImpl {
        async encrypt(plaintext, isShared) {
            return bg$1.zcrypt.fileEncrypt(plaintext, isShared);
        }
        async decrypt(ciphertext, isShared) {
            return bg$1.zcrypt.fileDecrypt(ciphertext, isShared);
        }
    }
    class BgExtCryptoApiImpl {
        encrypt(plaintext) {
            return extCrypto.encrypt(plaintext);
        }
        decrypt(ciphertext) {
            return extCrypto.decrypt(ciphertext);
        }
    }

    class BgFolderApiImpl {
        async queryTree(query) {
            return accountDb.folderTable.queryTree(query);
        }
        async query(query) {
            return accountDb.folderTable.query(query);
        }
        async queryEditable(query) {
            return accountDb.folderTable.queryEditable(query);
        }
        async get(folderId) {
            return accountDb.folderTable.load(folderId);
        }
    }

    class BgGeneratorApiImpl {
        history = new BgGeneratorHistoryApiImpl();
        async generatePassword(input) {
            return generator.password.generate(input);
        }
        async getComplexity(password) {
            return generator.password.getComplexity(password);
        }
        async generatePolicyPassword(policyId) {
            return bg$1.vaultPolicies.generatePassword(policyId);
        }
        async generatePassphrase(input) {
            return generator.passphrase.generate(input);
        }
    }
    class BgGeneratorHistoryApiImpl {
        async get() {
            return generator.history.get();
        }
        async clear() {
            return generator.history.clean();
        }
        async add(password) {
            return generator.history.add(password);
        }
    }

    class BgLoginApiImpl {
        async isLoggedIn() {
            return oauth.isLoggedIn();
        }
        async isUnlocked() {
            return bg$1.vault.isUnlocked();
        }
        async generateOauthTokens() {
            oauth.generateTokens();
        }
        async refreshTokenIfExpired() {
            await oauth.getAccessToken();
        }
        async initLogin() {
            return bg$1.vaultLogin.init();
        }
        async unlock(passphrase) {
            return unlock.passphrase.unlock(passphrase);
        }
        async lock() {
            return bg$1.vault.lock();
        }
        async signOut() {
            return bg$1.vault.signOut();
        }
        checkConnectable() {
            throw "";
        }
    }

    class LogoGetter {
        async getLogo(url) {
            try {
                if (!js.url.isValid(url)) {
                    return "";
                }
                const openedTabLogo = await this.getLogoFromOpenedTabs(url);
                if (openedTabLogo) {
                    await commonDb.logoTable.save(url, openedTabLogo);
                    return openedTabLogo;
                }
                const storedLogo = await commonDb.logoTable.load(url);
                return storedLogo || "";
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async getLogoFromOpenedTabs(url) {
            try {
                const logoTabResult = await this.getLogoTab(url);
                if (!logoTabResult.ok) {
                    return "";
                }
                const logoTab = logoTabResult.result;
                const logo = await bg$1.offscreenApi.getLogo(logoTab.favIconUrl);
                return logo || "";
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async getLogoTab(url) {
            try {
                const tabs = await brApi.tab.getAllTabs();
                const validTabs = tabs.filter(x => js.url.isValid(x.url) && x.favIconUrl);
                const hostTab = this.getHostMatchingTab(validTabs, url);
                if (hostTab) {
                    return fnOut.result(hostTab);
                }
                const domainTab = this.getDomainMatchingTab(validTabs, url);
                if (domainTab) {
                    return fnOut.result(domainTab);
                }
                return fnOut.NONE;
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        getHostMatchingTab(tabList, url) {
            try {
                const hostname = js.url.getHostName(url);
                for (let tab of tabList) {
                    if (js.url.getHostName(tab.url) == hostname) {
                        return tab;
                    }
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getDomainMatchingTab(tabList, url) {
            try {
                const domain = js.url.getParentDomain(url);
                for (let tab of tabList) {
                    if (js.url.getParentDomain(tab.url) == domain) {
                        return tab;
                    }
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }

    class TabInfo {
        url;
        favIconUrl;
    }
    class LogoUpdater {
        async update(force) {
            try {
                const tabInfoResult = await this.getActiveTabInfo();
                if (!tabInfoResult.ok) {
                    return;
                }
                const tabInfo = tabInfoResult.result;
                const hostname = js.url.getHostName(tabInfo.url);
                const needUpdate = force || await commonDb.logoTable.isLogoNeeded(hostname);
                if (!needUpdate) {
                    return;
                }
                const logo = await bg$1.offscreenApi.getLogo(tabInfo.favIconUrl);
                if (!logo) {
                    return;
                }
                await commonDb.logoTable.save(tabInfo.url, logo);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async getActiveTabInfo() {
            try {
                const activeTab = await brApi.tab.getActiveTab();
                if (!activeTab || !activeTab.favIconUrl) {
                    return fnOut.NONE;
                }
                const url = activeTab.url;
                const isValidHttpUrl = js.url.isValid(url) && url.startsWith("http");
                if (!isValidHttpUrl) {
                    return fnOut.NONE;
                }
                const tabInfo = new TabInfo();
                tabInfo.favIconUrl = activeTab.favIconUrl;
                tabInfo.url = url;
                return fnOut.result(tabInfo);
            }
            catch (e) {
                return fnOut.error(e);
            }
        }
    }

    class SecretLogoAdder {
        async addLogo(secrets) {
            try {
                const urls = this.getValidFirstUrls(secrets);
                const logoMap = await commonDb.logoTable.loadMap(urls);
                let hostname;
                let parentDomain;
                for (let secret of secrets) {
                    if (!secret.valid_urls.length) {
                        continue;
                    }
                    hostname = js.url.getHostName(secret.valid_urls[0]);
                    if (logoMap.has(hostname)) {
                        secret.domain_logo = logoMap.get(hostname);
                        continue;
                    }
                    parentDomain = js.url.getParentDomainFromHostName(hostname);
                    if (logoMap.has(parentDomain)) {
                        secret.domain_logo = logoMap.get(parentDomain);
                    }
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getValidFirstUrls(secrets) {
            const validUrls = [];
            for (let secret of secrets) {
                if (secret.valid_urls.length > 0) {
                    validUrls.push(secret.valid_urls[0]);
                }
            }
            return validUrls;
        }
    }

    let Context$2 = class Context {
        logoGetter;
        logoUpdater;
        secretLogoAdder;
        init() {
            this.logoGetter = new LogoGetter();
            this.logoUpdater = new LogoUpdater();
            this.secretLogoAdder = new SecretLogoAdder();
        }
    };
    const context$2 = new Context$2();

    context$2.init();
    const logoGetter = context$2.logoGetter;
    const logoUpdater = context$2.logoUpdater;
    const secretLogoAdder = context$2.secretLogoAdder;

    class BgOtherApiImpl {
        async updateLastActive() {
            inactivityHandler.updateLastActive();
        }
        async copyToClipboard(text, options) {
            return bg$1.clipboard.copy(text, options);
        }
        async getLogo(url) {
            return logoGetter.getLogo(url);
        }
        async closeUnlockTab() {
            return bg$1.unlockTabHandler.close();
        }
        async sendRuntimeMessage(msg) {
            return new Promise(res => chrome.runtime.sendMessage(msg, function (result) {
                if (chrome.runtime.lastError) {
                    res(chrome.runtime.lastError.message);
                    return;
                }
                res(result);
            }));
        }
        async clearClipboard() {
            return bg$1.clipboard.clear();
        }
        async updateLogo(force) {
            await logoUpdater.update(force);
        }
        async echo(x) {
            return x;
        }
        sidePanelClosed() {
            sidePanelHandler.closed();
        }
        async devToolsOpened(tabId) {
            devToolsHandler.devToolsOpened(tabId);
        }
        async devToolsCloseTab(port) {
            return devToolsHandler.closeTab(ApiServerUtil.getTabId(port));
        }
    }

    class BgPolicyApiImpl {
        async getAll() {
            return accountDb.policyTable.loadAll();
        }
        async get(policy_id) {
            return accountDb.policyTable.load(policy_id);
        }
        async check(password) {
            return bg.vaultPolicies.checkPolicyFor(password);
        }
        async checkPolicyPassword(password, policyId) {
            return bg.vaultPolicies.checkPasswordPolicy(password, policyId);
        }
    }

    class BgSaveFrameApiImpl {
        async showSaveFrame(port) {
            return csApi.frame.showSaveFrame(ApiServerUtil.getTabId(port));
        }
        async saveCredential(saveCredential, port) {
            return bg$1.savePassword.saveCredential(saveCredential, ApiServerUtil.getTabId(port));
        }
        async disableSavePassword(port) {
            return bg$1.savePassword.disableSave(ApiServerUtil.getTabId(port));
        }
        async getData(port) {
            return bg$1.saveFrame.getData(ApiServerUtil.getTabId(port));
        }
        async saveSecret(saveFrameUserInput, port) {
            return bg$1.saveFrame.savePassword(saveFrameUserInput, ApiServerUtil.getTabId(port));
        }
        async editSecret(saveFrameUserInput, port) {
            return bg$1.saveFrame.editPassword(saveFrameUserInput, ApiServerUtil.getTabId(port));
        }
        async closeSaveFrame(params, port) {
            return bg$1.saveFrame.close(params, ApiServerUtil.getTabId(port));
        }
    }

    class SecretAccessControlTimeRange {
        from = new SecretAccessControlTime();
        to = new SecretAccessControlTime();
    }
    class SecretAccessControlTime {
        hours = 0;
        minutes = 0;
    }
    class SecretAccessControlAutoApproveInfo {
        byTicket = false;
        weekDays = false;
        weekEnds = false;
        timeRange = null;
    }
    class ThirdPartyShareOutput {
        passphrase = "";
    }
    var FilterType;
    (function (FilterType) {
        FilterType["ALL"] = "ALL";
        FilterType["ANY"] = "ANY";
    })(FilterType || (FilterType = {}));
    class PageQuery {
        page_no = 0;
        rows_per_page = 50;
        search_string = "";
    }
    class PageQueryBuilder {
        query;
        constructor(query) {
            this.query = query;
        }
        build() {
            return this.query;
        }
        pageNo(pageNo) {
            this.query.page_no = pageNo;
            return this;
        }
        rowsPerPage(rowsPerPage) {
            this.query.rows_per_page = rowsPerPage;
            return this;
        }
        searchString(searchString) {
            this.query.search_string = searchString;
            return this;
        }
    }
    class PageQueryResult {
        query = null;
        total_count = 0;
    }
    class TagQueryResult extends PageQueryResult {
        tags = [];
    }
    class PasswordHistoryModel {
        static TYPE = {
            TEXT: "TEXT",
            PASSWORD: "PASSWORD"
        };
        columnName = "";
        columnLabel = "";
        history = [];
        type = "";
    }
    class SaveCredential {
        username = "";
        password = "";
        urls = [];
    }
    class FillField {
        name = "";
        label = "";
    }
    class PasswordResetInfo {
        static MAX_WAIT_TIME_MS = 1 * 60 * 1000;
        secretId = "";
        fieldName = "";
        userName = "";
        oldPassword = "";
        newPassword = "";
        steps = [];
        currentStepIndex = 0;
        expiresIn = 0;
    }
    let UnlockMethod$1 = class UnlockMethod {
        static MASTER = "MASTER";
        static ONEAUTH = "ONEAUTH";
        static WEBAUTHN = "WEBAUTHN";
    };

    class PasswordHistoryModelBuilder {
        history = new PasswordHistoryModel();
        setColumnName(name) {
            this.history.columnName = name;
            return this;
        }
        setColumnLabel(label) {
            this.history.columnLabel = label;
            return this;
        }
        setType(type) {
            this.history.type = type;
            return this;
        }
        addHistory(value, modifiedTime) {
            this.history.history.push({ value, modifiedTime });
            return this;
        }
        build() {
            return this.history;
        }
    }

    var VFetchMethod;
    (function (VFetchMethod) {
        VFetchMethod["GET"] = "GET";
        VFetchMethod["POST"] = "POST";
        VFetchMethod["PUT"] = "PUT";
        VFetchMethod["DELETE"] = "DELETE";
    })(VFetchMethod || (VFetchMethod = {}));
    var VFetchContentType;
    (function (VFetchContentType) {
        VFetchContentType["URL_ENCODED"] = "application/x-www-form-urlencoded;charset=UTF-8";
        VFetchContentType["TEXT_PLAIN"] = "text/plain;charset=UTF-8";
        VFetchContentType["JSON"] = "application/json; charset=utf-8";
    })(VFetchContentType || (VFetchContentType = {}));
    var VFetchResponseType;
    (function (VFetchResponseType) {
        VFetchResponseType["TEXT"] = "TEXT";
        VFetchResponseType["JSON"] = "JSON";
        VFetchResponseType["RAW"] = "RAW";
        VFetchResponseType["BLOB"] = "BLOB";
    })(VFetchResponseType || (VFetchResponseType = {}));
    var VFetchServer;
    (function (VFetchServer) {
        VFetchServer["VAULT"] = "VAULT";
        VFetchServer["ACCOUNTS"] = "ACCOUNTS";
        VFetchServer["CONTACT"] = "CONTACT";
        VFetchServer["CUSTOM"] = "CUSTOM";
    })(VFetchServer || (VFetchServer = {}));

    class VFetchInput {
        static newBuilder() {
            return new VFetchInputBuilder(new VFetchInput());
        }
        method;
        server;
        endpoint;
        contentType;
        responseType;
        headers;
        params;
        initParams;
        checkResponse;
        constructor() { }
        build() {
            this.method = this.method || VFetchMethod.GET;
            this.server = this.server || VFetchServer.VAULT;
            this.contentType = this.contentType || VFetchContentType.URL_ENCODED;
            this.responseType = this.responseType || VFetchResponseType.JSON;
            this.headers = this.headers || {};
            this.params = this.params || "";
            this.initParams = this.initParams || {};
            this.checkResponse = this.checkResponse ?? false;
            return this;
        }
    }
    globalThis["VFetchInput"] = VFetchInput;
    class VFetchInputBuilder {
        input;
        constructor(input) {
            this.input = input;
        }
        build() { return this.input.build(); }
        method(method) { this.input.method = method; return this; }
        server(server) { this.input.server = server; return this; }
        contentType(contentType) { this.input.contentType = contentType; return this; }
        endpoint(endpoint) { this.input.endpoint = endpoint; return this; }
        responseType(responseType) { this.input.responseType = responseType; return this; }
        headers(headers) { this.input.headers = headers; return this; }
        params(params) { this.input.params = params; return this; }
        initParams(initParams) { this.input.initParams = initParams; return this; }
        checkResponse(checkResponse) { this.input.checkResponse = checkResponse; return this; }
    }

    class VaultApi {
        static SUCCESS = "success";
        static async getChecked(endpoint, queryParams = null) {
            return (await vapi.fetch.fetch(VFetchInput.newBuilder().endpoint(endpoint).params(queryParams).checkResponse(true).build())).result;
        }
        static async post(endpoint, body = "", contentType = VFetchContentType.URL_ENCODED) {
            return (await vapi.fetch.fetch(VFetchInput.newBuilder().endpoint(endpoint).method(VFetchMethod.POST).params(body).contentType(contentType).build())).result;
        }
        static async postChecked(endpoint, body = "", contentType = VFetchContentType.URL_ENCODED) {
            return (await vapi.fetch.fetch(VFetchInput.newBuilder().endpoint(endpoint).method(VFetchMethod.POST).params(body).contentType(contentType).checkResponse(true).build())).result;
        }
        static async put(endpoint, body, contentType = VFetchContentType.URL_ENCODED) {
            return (await vapi.fetch.fetch(VFetchInput.newBuilder().endpoint(endpoint).method(VFetchMethod.PUT).params(body).contentType(contentType).build())).result;
        }
        static async putChecked(endpoint, body, contentType = VFetchContentType.URL_ENCODED) {
            return (await vapi.fetch.fetch(VFetchInput.newBuilder().endpoint(endpoint).method(VFetchMethod.PUT).params(body).contentType(contentType).checkResponse(true).build())).result;
        }
    }
    setGlobal("VaultApi", VaultApi);

    class PasswordHistory {
        static instance = null;
        static inst() {
            return this.instance || (this.instance = new PasswordHistory());
        }
        async getPasswordHistory(secretId) {
            return this.getPasswordHistoryFn(secretId);
        }
        async getPasswordHistoryFn(secretId, apiParams = "") {
            try {
                const resp = await VaultApi.getChecked("/api/rest/json/v1/secrets/secrethistory/" + secretId + apiParams);
                const passwordHistory = [];
                const respObj = resp.operation.Details.responseObj || {};
                let history = null;
                for (let key in respObj) {
                    history = this.getPasswordHistoryModel(respObj[key]);
                    if (history) {
                        passwordHistory.push(history);
                    }
                }
                await this.decryptHistory(passwordHistory, secretId);
                return passwordHistory;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        getPasswordHistoryModel(respHistory) {
            try {
                const builder = new PasswordHistoryModelBuilder()
                    .setColumnName(respHistory.COLUMNNAME)
                    .setColumnLabel(respHistory.COLUMNLABEL)
                    .setType((respHistory.PII_FIELD || respHistory.TYPE == "password") ? PasswordHistoryModel.TYPE.PASSWORD
                    : PasswordHistoryModel.TYPE.TEXT);
                for (let entry of respHistory.OLDVALUE) {
                    builder.addHistory(entry.oldvalue, entry.timestamp);
                }
                const history = builder.build();
                try {
                    history.history.sort((x, y) => Date.parse(y.modifiedTime) - Date.parse(x.modifiedTime));
                }
                catch (e) {
                    logError(e);
                }
                return history;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async decryptHistory(historyList, secretId) {
            if (historyList.length == 0) {
                return;
            }
            const isShared = (await bg$1.vaultSecrets.secretGetter.getDbOrTrashedSecret(secretId)).shared;
            for (let history of historyList) {
                for (let entry of history.history) {
                    entry.value = await bg$1.zcrypt.decrypt(entry.value, isShared);
                }
            }
        }
        async getColumnHistory(secretId, columnName) {
            try {
                const history = await this.getPasswordHistoryFn(secretId, "?columnname=" + columnName);
                return history.length > 0 ? history[0] : null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }

    class VaultCrypto {
        static async pbkdf2(password, salt, iterations) {
            try {
                const saltBuffer = new Uint8Array(salt.split("").map(x => x.charCodeAt(0)));
                const keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), { name: "PBKDF2" }, false, ["deriveBits", "deriveKey"]);
                const derivedBits = await crypto.subtle.deriveBits({
                    name: "PBKDF2", salt: saltBuffer, iterations,
                    hash: "SHA-256"
                }, keyMaterial, 256);
                return js.encoding.bytesToHex(derivedBits);
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        static utf8Encode(s) {
            s = s.replace(/\r\n/g, "\n");
            let code = 0;
            let utf8 = "";
            for (let i = 0; i < s.length; i++) {
                code = s.charCodeAt(i);
                if (code < 0x80) {
                    utf8 += String.fromCharCode(code);
                }
                else if (code <= 0x7ff) {
                    utf8 += String.fromCharCode(0xc0 | (code >> 6));
                    utf8 += String.fromCharCode(0x80 | (code & 0x3f));
                }
                else {
                    utf8 += String.fromCharCode(0xe0 | (code >> 12));
                    utf8 += String.fromCharCode(0x80 | ((code >> 6) & 0x3f));
                    utf8 += String.fromCharCode(0x80 | (code & 0x3f));
                }
            }
            return utf8;
        }
        static utf8Decode(s) {
            let ans = "";
            let code1 = 0;
            let code2 = 0;
            let code3 = 0;
            for (let i = 0; i < s.length;) {
                code1 = s.charCodeAt(i++);
                if (code1 < 0x80) {
                    ans += String.fromCharCode(code1);
                }
                else if ((code1 >= 0xc0) && (code1 < 0xe0)) {
                    code2 = s.charCodeAt(i++);
                    ans += String.fromCharCode(((code1 & 0x1f) << 6) | (code2 & 0x3f));
                }
                else {
                    code2 = s.charCodeAt(i++);
                    code3 = s.charCodeAt(i++);
                    ans += String.fromCharCode(((code1 & 0xf) << 12) | ((code2 & 0x3f) << 6) | (code3 & 0x3f));
                }
            }
            return ans;
        }
        static encodeBase64(s) {
            const utf8String = VaultCrypto.utf8Encode(s);
            return btoa(utf8String);
        }
        static decodeBase64(s) {
            const decoded = atob(s);
            const binaryString = VaultCrypto.utf8Decode(decoded);
            return binaryString;
        }
        static async aesEncrypt(plaintext, key) {
            plaintext = VaultCrypto.utf8Encode(plaintext);
            const cryptoKey = await VaultCrypto.getKey(key);
            const plaintextBuffer = this.binaryToUInt8(plaintext);
            const counter = new Uint8Array(16);
            const nonce = Date.now();
            const nonceMs = nonce % 1000;
            const nonceSeconds = Math.floor(nonce / 1000);
            const nonceRandom = crypto.getRandomValues(new Uint32Array(1))[0];
            counter[0] = nonceMs & 0xFF;
            counter[1] = (nonceMs >>> 8) & 0xFF;
            counter[2] = nonceRandom & 0xFF;
            counter[3] = (nonceRandom >>> 8) & 0xFF;
            for (let i = 0; i < 4; i++) {
                counter[i + 4] = (nonceSeconds >>> i * 8) & 0xFF;
            }
            const encryptedBuffer = await crypto.subtle.encrypt({ name: "AES-CTR", counter, length: 64 }, cryptoKey, plaintextBuffer);
            const finalEncryptedBinary = this.bufferToBinary(counter.slice(0, 8)) + this.bufferToBinary(encryptedBuffer);
            const encodedCiphertext = btoa(finalEncryptedBinary);
            return encodedCiphertext;
        }
        static async aesDecrypt(ciphertext, key) {
            if (!ciphertext) {
                return "";
            }
            const cryptoKey = await VaultCrypto.getKey(key);
            const base64Decoded = atob(ciphertext);
            const ciphertextPart = base64Decoded.slice(8);
            const cipherBuffer = this.binaryToUInt8(ciphertextPart);
            const counter = new Uint8Array(16);
            for (let i = 0; i < 8; i++) {
                counter[i] = base64Decoded[i].charCodeAt(0);
            }
            const decryptedBuffer = await crypto.subtle.decrypt({ name: "AES-CTR", counter, length: 64 }, cryptoKey, cipherBuffer);
            const binaryString = this.bufferToBinary(decryptedBuffer);
            return VaultCrypto.utf8Decode(binaryString);
        }
        static async getKey(password) {
            password = VaultCrypto.utf8Encode(password);
            const keyArray = new Uint8Array(32);
            for (let i = 0; i < password.length; i++) {
                keyArray[i] = password[i].charCodeAt(0);
            }
            const initialCryptoKey = await crypto.subtle.importKey("raw", keyArray, "AES-CTR", true, ["encrypt", "decrypt"]);
            const counter = new Uint8Array(16);
            for (let i = 0; i < 16; i++) {
                counter[i] = keyArray[i];
            }
            const keyPartBuffer = await crypto.subtle.encrypt({ name: "AES-CTR", counter, length: 64 }, initialCryptoKey, new Uint8Array(16));
            const keyPart = new Uint8Array(keyPartBuffer);
            const finalKeyBytes = new Uint8Array(32);
            for (let i = 0; i < keyPart.length; i++) {
                finalKeyBytes[i] = keyPart[i];
                finalKeyBytes[16 + i] = keyPart[i];
            }
            const finalKey = await crypto.subtle.importKey("raw", finalKeyBytes, "AES-CTR", true, ["encrypt", "decrypt"]);
            return finalKey;
        }
        static binaryToUInt8(binaryString) {
            return new Uint8Array(Array.from(binaryString).map(x => x.charCodeAt(0)));
        }
        static bufferToBinary(buffer) {
            const array = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
            let binaryString = "";
            for (let byte of array) {
                binaryString += String.fromCharCode(byte);
            }
            return binaryString;
        }
    }
    setGlobal("VaultCrypto", VaultCrypto);

    class GeneratorInput {
        static REQ_LOWERCASE = "reqLowercase";
        static REQ_UPPERCASE = "reqUppercase";
        static REQ_NUMBER = "reqNumber";
        static REQ_SPL_CHAR = "reqSplChar";
        length = 99;
        reqLowercase = true;
        reqUppercase = true;
        reqNumber = true;
        reqSplChar = true;
        noOfSplChar = 0;
        excludeChars = "";
        startWithLetter = false;
        static createDefaultInput() {
            const input = {
                length: 99,
                reqLowercase: true,
                reqUppercase: true,
                reqNumber: true,
                reqSplChar: true,
                noOfSplChar: 0,
                excludeChars: "",
                startWithLetter: false,
            };
            return input;
        }
    }
    class Policy {
        static CUSTOM_POLICY_ID = "0";
        static CUSTOM_POLICY_DEFAULT_LENGTH = 30;
        static USAGE = {
            DEFAULT: "1",
            ALLOW_USERS: "2",
            ENFORCE: "3"
        };
        id = "";
        name = "";
        min_length = 0;
        max_length = 0;
        req_lowercase = false;
        req_uppercase = false;
        req_number = false;
        req_splchar = false;
        no_of_splchar = 0;
        exclude_chars = "";
        start_with_letter = false;
        is_default = false;
        age = 0;
        static getCustomPolicy() {
            return {
                id: "0",
                name: "Custom",
                min_length: 12,
                max_length: 99,
                req_lowercase: true,
                req_uppercase: true,
                req_number: true,
                req_splchar: true,
                no_of_splchar: 0,
                exclude_chars: "",
                start_with_letter: false,
                is_default: false,
                age: 0,
            };
        }
    }
    class Generator_State {
        static PLUS_LAST_COPIED_VALID_MS = 2 * 60 * 1000;
        static DEFAULT_STATE = new Generator_State();
        generatorInput = new GeneratorInput();
        policy = Policy.getCustomPolicy();
        encryptedLastUsedPassword = "";
        lastUsedValidUpto = 0;
        generatedPassword = "";
        generatedOn = 0;
        lastUsedOn = 0;
    }

    class ThirdPartyShareBg {
        static async sharePassword(input) {
            return new ThirdPartyShare().share(input);
        }
    }
    class ThirdPartyShare {
        input = null;
        secret = null;
        key = "";
        async share(input) {
            try {
                this.input = input;
                const secret = this.secret = await bg$1.vaultSecrets.secretGetter.getSecret(this.input.secretId);
                const salt = this.getSalt();
                const iterations = 1000;
                const passphrase = await this.getPrintablePassphrase();
                this.key = await VaultCrypto.pbkdf2(passphrase, salt, iterations);
                const reqSecret = {
                    secretname: secret.name,
                    secreturl: secret.urls[0],
                    description: secret.description,
                    notes: await this.getNotes(),
                    secretData: await this.getRequestSecretData(),
                    customData: await this.getCustomData(),
                    secretmultipleurl: secret.urls,
                };
                const endpoint = `/api/rest/json/v1/sharing/secret/outsider/${input.secretId}`;
                await VaultApi.postChecked(endpoint, {
                    email: input.thirdPartyEmail,
                    max_allowed_time: input.allowedTime,
                    message: input.message,
                    salt,
                    iteration: iterations,
                    keyAuth: await VaultCrypto.aesEncrypt(JSON.stringify(reqSecret), this.key),
                    file: JSON.stringify(await this.getFiles())
                });
                const output = new ThirdPartyShareOutput();
                output.passphrase = passphrase;
                generator.history.add(passphrase);
                return fnOut.result(output);
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        getSalt() {
            const saltBuffer = js.crypto.getSalt(16);
            const hexSalt = js.encoding.bytesToHex(saltBuffer);
            return hexSalt;
        }
        async getPrintablePassphrase() {
            const PASSPHRASE_LENGTH = 12;
            const input = new GeneratorInput();
            input.length = PASSPHRASE_LENGTH;
            input.reqSplChar = false;
            const password = await generator.password.generate(input);
            return password;
        }
        async getNotes() {
            if (!this.secret.encrypted.notes) {
                return "";
            }
            const notes = await bg$1.zcrypt.decrypt(this.secret.encrypted.notes, this.secret.shared);
            return await VaultCrypto.aesEncrypt(notes, this.key);
        }
        async getRequestSecretData() {
            return VaultCrypto.encodeBase64(JSON.stringify({ secretDatacol: await this.getSecretDataFields() }));
        }
        async getSecretDataFields() {
            const reqFields = [];
            const secretType = await accountDb.secretTypeTable.load(this.secret.type_id);
            let reqField = null;
            for (let field of secretType.fields) {
                reqField = await this.getSecretDataField(field);
                if (!reqField) {
                    continue;
                }
                reqFields.push(reqField);
            }
            return reqFields;
        }
        async getSecretDataField(field) {
            if (field.isDeleted) {
                return null;
            }
            const fieldValue = this.secret.encrypted.fields[field.name];
            if (!fieldValue) {
                return null;
            }
            const plainText = await bg$1.zcrypt.decrypt(fieldValue, this.secret.shared);
            if (!plainText) {
                return null;
            }
            const reqField = {
                value: await VaultCrypto.aesEncrypt(plainText, this.key),
                colname: field.label,
                type: field.type
            };
            return reqField;
        }
        async getCustomData() {
            return VaultCrypto.encodeBase64(JSON.stringify({ customcol: await this.getCustomFields() }));
        }
        async getCustomFields() {
            const reqCustomFields = [];
            for (let column of this.secret.encrypted.custom_columns) {
                reqCustomFields.push(await this.getCustomCol(column));
            }
            return reqCustomFields;
        }
        async getCustomCol(column) {
            const fieldValue = await bg$1.zcrypt.decrypt(column.value, this.secret.shared);
            const reqColumn = {
                id: column.id,
                value: await VaultCrypto.aesEncrypt(fieldValue, this.key),
                colname: column.colname,
                type: column.type,
            };
            return reqColumn;
        }
        async getFiles() {
            const reqFiles = [];
            const hasFiles = this.secret.encrypted.files.length > 0;
            if (!hasFiles) {
                return reqFiles;
            }
            const files = await bg$1.vaultSecrets.secretFiles.downloadAllFiles(this.input.secretId);
            for (let file of files) {
                reqFiles.push(await this.getApiFile(file));
            }
            return reqFiles;
        }
        async getApiFile(file) {
            const fileField = {
                name: file.name,
                column: file.column,
                size: file.size,
                data: await bg$1.zcrypt.fileEncryptV1(await bg$1.zcrypt.fileDecrypt(file.data, file.shared), this.key),
            };
            return fileField;
        }
    }

    class TotpGenerator {
        charsetMap = {
            "2": "11010", "3": "11011", "4": "11100", "5": "11101", "6": "11110", "7": "11111", "A": "00000", "B": "00001", "C": "00010", "D": "00011", "E": "00100", "F": "00101", "G": "00110", "H": "00111", "I": "01000", "J": "01001", "K": "01010", "L": "01011", "M": "01100", "N": "01101", "O": "01110", "P": "01111", "Q": "10000", "R": "10001", "S": "10010", "T": "10011", "U": "10100", "V": "10101", "W": "10110", "X": "10111", "Y": "11000", "Z": "11001"
        };
        async generate(totpUrl) {
            return this.generateFn(totpUrl, Date.now());
        }
        async generateFn(totpUrl, timeMs) {
            const params = this.parseUrl(totpUrl);
            const keyBuffer = this.convertBase32ToBuffer(params.secret);
            const key = await crypto.subtle.importKey("raw", keyBuffer, { name: "HMAC", hash: params.algorithm }, true, ["sign"]);
            const timeInput = this.getTimeBuffer(params.period, timeMs);
            const hash = await crypto.subtle.sign("HMAC", key, timeInput);
            return await this.getOtp(hash, params.digits);
        }
        getOtp(hash_buffer, no_of_digits) {
            const hash = new Uint8Array(hash_buffer);
            const offset = hash[hash.length - 1] & 0xf;
            const n = ((hash[offset] & 0x7f) << 24) |
                ((hash[offset + 1] & 0xff) << 16) |
                ((hash[offset + 2] & 0xff) << 8) |
                (hash[offset + 3] & 0xff);
            const otp = n % Math.pow(10, no_of_digits);
            return ("" + otp).padStart(no_of_digits, "0");
        }
        getTimeBuffer(secondsInterval, timeMs) {
            const reqTime = (timeMs / 1000 / secondsInterval) >> 0;
            const timeBuffer = new ArrayBuffer(8);
            new DataView(timeBuffer).setUint32(4, reqTime, false);
            return timeBuffer;
        }
        parseUrl(totpUrl) {
            const parameters = totpUrl.slice(totpUrl.indexOf("?") + 1).split("&");
            const entries = parameters.map(parameter => parameter.split("="));
            const parameter_obj = Object.fromEntries(entries);
            const reqParams = {
                secret: parameter_obj.secret || "",
                algorithm: parameter_obj.algorithm ? "SHA-" + parameter_obj.algorithm.slice(3) : "SHA1",
                digits: +parameter_obj.digits || 6,
                period: +parameter_obj.period || 30,
            };
            return reqParams;
        }
        convertBase32ToBuffer(base32String) {
            const binaryString = base32String.split("").map(x => this.charsetMap[x]).join("");
            let array_buffer_length = (binaryString.length / 8) >> 0;
            const array_buffer = new Uint8Array(array_buffer_length);
            let ai = 0;
            for (let i = 0; i + 8 <= binaryString.length; i += 8) {
                const cur_part = binaryString.slice(i, i + 8);
                const val = parseInt(cur_part, 2);
                array_buffer[ai++] = val;
            }
            return array_buffer;
        }
        async testTotp() {
            try {
                const allTestCases = [
                    ["otpauth://totp?secret=GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ&algorithm=SHA1&period=30&digits=8", 59, "94287082"],
                    ["otpauth://totp?secret=GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ&algorithm=SHA1&period=30&digits=8", 1111111109, "07081804"],
                    ["otpauth://totp?secret=G4ADEABRAA3AAOIAIYAEKACEAAWQAMIAGYADCACBAAWQANAAIQAEIABZAAWQAQIAIIADGABVAAWQAMYAGQAECACDAA2QANAAIEADCACBABCQAMIAIUAA&algorithm=SHA1&period=30&digits=8", 1, "44301220"],
                ];
                for (let testCase of allTestCases) {
                    if (!(await this.generateFn(testCase[0], testCase[1] * 1000) == testCase[2])) {
                        throw new Error("failed");
                    }
                }
            }
            catch (e) {
                throw e;
            }
        }
    }

    let Context$1 = class Context {
        totpGenerator;
        init() {
            this.totpGenerator = new TotpGenerator();
        }
    };
    const context$1 = new Context$1();

    context$1.init();
    const totpGenerator = context$1.totpGenerator;

    class BgSecretApiImpl {
        share = new BgSecretShareApiImpl();
        totp = new BgSecretTotpApiImpl();
        file = new BgSecretFileApiImpl();
        edit = new BgSecretEditApiImpl();
        history = new BgSecretHistoryApiImpl();
        query(query) {
            return bg.vaultSecrets.secretQuerier.query(query);
        }
        add(secretAddInput) {
            return bg.vaultSecrets.secretAdd.addSecret(secretAddInput);
        }
        delete(secretId) {
            return bg.vaultSecrets.deleteSecret(secretId);
        }
        async getSecret(secretId) {
            return bg.vaultSecrets.secretGetter.getSecret(secretId);
        }
        async getDbSecret(secretId) {
            return bg.vaultSecrets.secretGetter.getDbSecret(secretId);
        }
        async getServerSecret(secretId) {
            return bg.vaultSecrets.secretGetter.getServerSecret(secretId);
        }
        async getTrashedSecret(secretId) {
            return bg.vaultSecrets.secretGetter.getTrashedSecret(secretId);
        }
        async copyField(secretId, field_name) {
            return bg.vaultSecrets.secretCopier.copyField(secretId, field_name);
        }
        async copyCustomColumn(secretId, column_id) {
            return bg.vaultSecrets.secretCopier.copyCustomField(secretId, column_id);
        }
        async login(secretId, url, incognito) {
            return bg.vaultSecrets.secretLogin.login({ secretId, url, incognito });
        }
        async loginFromWeb(secretId, url) {
            return bg.vaultSecrets.secretLogin.loginFromWeb(secretId, url);
        }
        async resetPassword(secretId, fieldName) {
            return bg.passwordReset.resetPassword(secretId, fieldName);
        }
        async getDomainMatchingCount() {
            return domainHandler.getDomainMatchingCount();
        }
        async checkExistingPasswordName(name) {
            return bg.vaultSecrets.secretUtil.checkExistingPasswordName(name);
        }
        async checkPolicyFor(password) {
            return bg.vaultPolicies.checkPolicyFor(password);
        }
        async checkPasswordPolicy(password, policyId) {
            return bg.vaultPolicies.checkPasswordPolicy(password, policyId);
        }
        async queryTags(query) {
            return accountDb.tagTable.query(query);
        }
        async getSearchHighlightField(secret, searchString) {
            return bg.vaultSecrets.secretQuerier.getHighlightField(secret, searchString);
        }
        async suggestNewName(params) {
            return bg.vaultSecrets.secretUtil.suggestNewName(params);
        }
        async getAddPasswordClassifications() {
            return bg.vaultConfig.getAddPasswordClassifications();
        }
    }
    class BgSecretShareApiImpl {
        user = new BgSecretShareUserApiImpl();
        userGroup = new BgSecretShareUserGroupApiImpl();
        reEncryptSecretForSharing(secretId) {
            return bg.vaultSecrets.secretEdit.reEncryptSecretForSharing(secretId);
        }
        shareToThirdParty(thirdPartyShareInput) {
            return ThirdPartyShareBg.sharePassword(thirdPartyShareInput);
        }
    }
    class BgSecretShareUserApiImpl {
        getUIInput(secretId) {
            return bg.vaultSecrets.secretShare.getSecretShareUserUIInput(secretId);
        }
        update(sharingInput) {
            return bg.vaultSecrets.secretShare.updateUserSharing(sharingInput);
        }
    }
    class BgSecretShareUserGroupApiImpl {
        getUIInput(secretId) {
            return bg.vaultSecrets.secretShare.getSecretShareUserGroupUIInput(secretId);
        }
        update(sharingInput) {
            return bg.vaultSecrets.secretShare.updateUserGroupSharing(sharingInput);
        }
    }
    class BgSecretTotpApiImpl {
        copy(secretId) {
            return bg.vaultSecrets.secretCopier.copyTotp(secretId);
        }
        copyOneAuthTotp(secretId, totp) {
            return bg.vaultSecrets.secretCopier.copyOneauthTotp(secretId, totp);
        }
        generate(totpUrl) {
            return totpGenerator.generate(totpUrl);
        }
        async getParams(totpUrl) {
            return totpGenerator.parseUrl(totpUrl);
        }
        getTotp(secretId) {
            return bg.vaultSecrets.getTotp(secretId);
        }
        getOneAuthTotp(oneauthId) {
            return bg.oneAuthTotp.getTotp(oneauthId);
        }
    }
    class BgSecretFileApiImpl {
        async download(secretId, file_id) {
            return bg.vaultSecrets.secretFiles.downloadFile(secretId, file_id);
        }
        async downloadAll(secretId) {
            return bg.vaultSecrets.secretFiles.downloadAllFiles(secretId);
        }
        update(secretId, files) {
            return bg.vaultSecrets.secretFiles.updateFiles(secretId, files);
        }
    }
    class BgSecretEditApiImpl {
        setFavourite(secretId, favourite) {
            return bg.vaultSecrets.changeFavourite(secretId, favourite);
        }
        setAutoLogin(secretId, enable) {
            return bg.vaultSecrets.updateAutoLogin(secretId, enable);
        }
        getUIInput(secretId) {
            return bg.vaultSecrets.secretEdit.getEditUIInput(secretId);
        }
        update(secretEditInput) {
            return bg.vaultSecrets.secretEdit.updatePassword(secretEditInput);
        }
    }
    class BgSecretHistoryApiImpl {
        getPasswordHistory(secretId) {
            return PasswordHistory.inst().getPasswordHistory(secretId);
        }
        getColumnHistory(secretId, columnName) {
            return PasswordHistory.inst().getColumnHistory(secretId, columnName);
        }
    }

    class BgSecretTypeApiImpl {
        async getAll() {
            return accountDb.secretTypeTable.loadAll();
        }
        async get(typeId) {
            return accountDb.secretTypeTable.load(typeId);
        }
        async getMap() {
            return bg.vaultSecretTypes.getMap();
        }
        async getCountMap() {
            return bg.vaultSecretTypes.getCountMap();
        }
    }

    class BgSessionApiImpl {
        async saveAll(keyValObj) {
            return zsessionStorage.saveAll(keyValObj);
        }
        async loadAll(keyObj) {
            return zsessionStorage.loadAll(keyObj);
        }
        async remove(keyOrKeys) {
            return zsessionStorage.remove(keyOrKeys);
        }
        async clear() {
            return zsessionStorage.clear();
        }
    }

    class BgSettingsApiImpl {
        neverSave = new BgSettingsNeverSaveApiImpl();
        async change(name, value) {
            return bg.vaultSettings.changeSettingFromUI(name, value);
        }
        async setThemeColor(color) {
            return bg.themeHandler.setColor(color);
        }
        async setDarkMode(enable) {
            return bg.themeHandler.setDarkMode(enable);
        }
        async setFont(font) {
            return bg.themeHandler.setFont(font);
        }
        async isSystemLockSupported() {
            return bg.vaultSettings.supportsSystemLock();
        }
    }
    class BgSettingsNeverSaveApiImpl {
        async getAll() {
            return accountDb.neverSaveTable.loadAll();
        }
        async add(domain) {
            return bg.neverSaveUrls.addDomain(domain);
        }
        async remove(domain) {
            return bg.neverSaveUrls.removeDomain(domain);
        }
        async isPresent(domain) {
            return accountDb.neverSaveTable.has(domain);
        }
    }

    class BgSiteFrameApiImpl {
        async showSiteFrame(port) {
            return csApi.frame.showSiteFrame(ApiServerUtil.getTabId(port));
        }
        async closeSiteFrame(params, port) {
            return csApi.frame.closeSiteFrame(params, ApiServerUtil.getTabId(port));
        }
        async getSecrets(query, port) {
            return bg$1.siteFrame.getSiteFrameSecrets(ApiServerUtil.getTabUrl(port), query);
        }
        async frameLogin(secretId, frameId, port) {
            return bg$1.siteFrame.frameLogin(ApiServerUtil.getTabId(port), frameId, secretId);
        }
        async fillSecret(secretId, frameId, port) {
            return bg$1.siteFrame.frameFill(ApiServerUtil.getTabId(port), frameId, secretId);
        }
        async fillTotp(secretId, frameId, port) {
            return bg$1.siteFrame.fillTotp(ApiServerUtil.getTabId(port), frameId, secretId);
        }
        async fillOneAuthTotp(secretId, oneauthId, frameId, port) {
            return bg$1.siteFrame.fillOneAuthTotp(ApiServerUtil.getTabId(port), frameId, secretId, oneauthId);
        }
        async fillField(secretId, fieldName, frameId, port) {
            return bg$1.siteFrame.fillField(ApiServerUtil.getTabId(port), frameId, secretId, fieldName);
        }
        async fillCustomCol(secretId, fieldName, frameId, port) {
            return bg$1.siteFrame.fillCustomCol(ApiServerUtil.getTabId(port), frameId, secretId, fieldName);
        }
        async fillGeneratedPassword(value, frameId, port) {
            return bg$1.siteFrame.fillGeneratedPassword(ApiServerUtil.getTabId(port), frameId, value);
        }
        async saveGeneratedPassword(password, frameId, port) {
            return bg$1.siteFrame.saveGeneratedPassword(password, frameId, ApiServerUtil.getTabId(port));
        }
        async openUnlockVaultPage() {
            await bg$1.unlockTabHandler.create();
        }
        async addPassword(frameId, port) {
            await bg$1.siteFrame.addPassword(ApiServerUtil.getTabId(port), frameId);
        }
        async isDomainMatchingId(secretId, port) {
            return domainHandler.isDomainMatchingId(secretId, ApiServerUtil.getTabUrl(port));
        }
    }

    class BgTabApiImpl {
        async loadFromMemory(key, defaultVal, port) {
            return bgStorage.tab.load(ApiServerUtil.getTabId(port), key, defaultVal);
        }
        async loadFromDomainMemory(key, defaultVal, port) {
            return bgStorage.tab.loadDomain(ApiServerUtil.getTab(port), key, defaultVal);
        }
        async saveToMemory(key, val, port) {
            return bgStorage.tab.save(ApiServerUtil.getTabId(port), key, val);
        }
        async saveToDomainMemory(key, val, allowedDomains, port) {
            return bgStorage.tab.saveDomain(ApiServerUtil.getTabId(port), key, val, allowedDomains);
        }
        async removeFromMemory(key, port) {
            return bgStorage.tab.remove(ApiServerUtil.getTabId(port), key);
        }
        async clearMemory(port) {
            return bgStorage.tab.clear(ApiServerUtil.getTabId(port));
        }
        async showConfirmFrame(port) {
            return csApi.frame.showConfirmFrame(ApiServerUtil.getTabId(port));
        }
        async closeFrame(port) {
            return csApi.frame.closeFrame({}, ApiServerUtil.getTabId(port));
        }
        async getFrameId(port) {
            return ApiServerUtil.getFrameId(port);
        }
        async getTabDomain(port) {
            return js.url.getParentDomain(ApiServerUtil.getTabUrl(port));
        }
        async getTabUrl(port) {
            return ApiServerUtil.getTabUrl(port);
        }
        async saveZIconSelector(selector, port) {
            return commonDb.ziconTable.save(ApiServerUtil.getTabUrl(port), selector);
        }
        async loadZIconSelectors(port) {
            return commonDb.ziconTable.load(ApiServerUtil.getTabUrl(port));
        }
        async isNeverSaveUrl(port) {
            return bg$1.neverSaveUrls.isNeverSaveUrl(ApiServerUtil.getTabUrl(port));
        }
        async allowPermanentUse(secretId, allowedUrl) {
            return bg$1.confirmFrame.allowPermanent(secretId, allowedUrl);
        }
        async finishReset(successfull, port) {
            return bg$1.passwordReset.finishReset(ApiServerUtil.getTabId(port), successfull);
        }
        setConfirmUse(frameId, allow, port) {
            return csApi.other.setConfirmResponse(allow, { tabId: ApiServerUtil.getTabId(port), frameId });
        }
        async closeTab(port) {
            const tabId = ApiServerUtil.getTabId(port);
            if (!tabId) {
                logError("cannot close tab", port);
                return;
            }
            return brApi.tab.closeTab(tabId);
        }
        async closeTabWithId(tabId) {
            return brApi.tab.closeTab(tabId);
        }
        async checkDevToolsOpen(port) {
            return devToolsHandler.isDevToolsOpen(ApiServerUtil.getTabId(port));
        }
        async showAlert(config, port) {
            const tabId = ApiServerUtil.getTabId(port);
            return bg$1.csUtil.showAlert(tabId, config);
        }
        async downloadFileInCS(param, _port) {
            try {
                const url = await urlProvider.getVaultUrl() + "/addonRedirect.do";
                const tab = await brApi.tab.createTab({ background: true, url });
                await brApi.tab.getCompletedTab(tab.id);
                for (let i = 0; i < 10; i++) {
                    if (await csApi.isConnectable({ tabId: tab.id })) {
                        break;
                    }
                    await js.time.delay(0.3);
                }
                await csApi.frame.downloadFile(param, tab.id);
            }
            catch (e) {
                logError(e);
            }
        }
        async isLoginDomainPath(port) {
            return domainHandler.isLoginDomainPath(ApiServerUtil.getTabUrl(port));
        }
        async loadZMapsCountries() {
            try {
                const countryData = await commonDb.zmapsCountryTable.loadAll();
                return countryData.map(data => data.country);
            }
            catch (e) {
                console.error(e);
                return [];
            }
        }
        async loadZMapsStates(country) {
            return bg$1.zmaps.getStates(country);
        }
        async loadZMapsDistricts(country, state) {
            return bg$1.zmaps.getDistricts(country, state);
        }
        async saveNewCountry(country) {
            return bg$1.zmaps.saveCountryToDB(country);
        }
        async saveNewState(country, state) {
            return bg$1.zmaps.saveStateToDB(country, state);
        }
        async saveNewCity(country, state, city) {
            return bg$1.zmaps.saveCityToDB(country, state, city);
        }
        checkConnectable() { throw "NOT_NEEDED"; }
        hasDevToolsOpened(port) {
            return devToolsHandler.isValidTab(ApiServerUtil.getTabId(port));
        }
    }

    class BgTrashApiImpl {
        async queryTrash(query) {
            return bg$1.vaultTrash.queryTrash(query);
        }
        async deletePermanent(secretId) {
            await vapi.secret.delete(secretId);
        }
        async restoreSecret(secretId) {
            return bg$1.vaultSecrets.restoreSecret(secretId);
        }
        async emptyTrash() {
            await vapi.emptyTrash();
        }
    }

    class BgUnlockApiImpl {
        oneauth = new BgOneAuthUnlockApiImpl();
        webauthn = new BgWebauthnUnlockApiImpl();
        async setLastUnlock(method) {
            return unlock.setLastUnlockMethod(method);
        }
        async getLastUsedUnlock() {
            return unlock.getLastUnlockMethod();
        }
    }
    class BgOneAuthUnlockApiImpl {
        resendPush() {
            return unlock.oneauth.resendPush();
        }
        enable(enable) {
            return unlock.oneauth.enable(enable);
        }
        isUnlockable() {
            return unlock.oneauth.isUnlockable();
        }
        unlock() {
            return unlock.oneauth.unlock();
        }
    }
    class BgWebauthnUnlockApiImpl {
        setWebAuthnCredential(credential) {
            return unlock.webauthn.setCredential(fnOut.parse(credential));
        }
        getCredentialCount() {
            return unlock.webauthn.getCredentialCount();
        }
        enable(enable) {
            return unlock.webauthn.enable(enable);
        }
        isUnlockable() {
            return unlock.webauthn.isUnlockable();
        }
        unlock() {
            return unlock.webauthn.unlock();
        }
    }

    class BgUpdateFrameApiImpl {
        async showUpdateFrame(port) {
            return csApi.frame.showUpdateFrame(ApiServerUtil.getTabId(port));
        }
        async saveChangedCredential(changedCredential, port) {
            return bg$1.savePassword.saveChangedCredential(changedCredential, ApiServerUtil.getTab(port));
        }
        async updateChangedLoginPassword(changedLoginPassword, port) {
            return bg$1.updateFrame.updateChangedLoginPassword(changedLoginPassword, ApiServerUtil.getTabId(port));
        }
        async getData(port) {
            return bg$1.updateFrame.getData(ApiServerUtil.getTabId(port));
        }
        async updateSecret(port) {
            return bg$1.updateFrame.updatePassword(ApiServerUtil.getTabId(port));
        }
        async editSecret(port) {
            return bg$1.updateFrame.editPassword(ApiServerUtil.getTabId(port));
        }
        async saveAsNew(port) {
            return bg$1.updateFrame.saveAsNew(ApiServerUtil.getTabId(port));
        }
        async closeUpdateFrame(params, port) {
            return bg$1.updateFrame.close(params, ApiServerUtil.getTabId(port));
        }
    }

    class BgUserApiImpl {
        async getDp() {
            return bg$1.user.getDp();
        }
        getDpSized(size) {
            return bg$1.user.getDpSized(size);
        }
        async getDpOf(zuid) {
            return bg$1.user.getDpOf(zuid);
        }
        async searchUsers(searchString) {
            return bg$1.user.searchUsers(searchString);
        }
        async searchAdmins(searchString) {
            return bg$1.user.searchAdmins(searchString);
        }
    }

    class VaultWeb {
        afterUnlockRoute = "";
        async openWebUI({ newTab = false, route = "" } = {}) {
            try {
                this.afterUnlockRoute = route;
                if (newTab) {
                    await this.openWebUINewTab();
                    return;
                }
                await this.openExistingWebUI() || await this.openWebUINewTab();
            }
            catch (e) {
                logError(e);
            }
        }
        getAfterUnlockRoute() {
            return this.afterUnlockRoute;
        }
        async openWebUINewTab() {
            const vaultWebUrl = urlProvider.getVaultWebUrl();
            const tab = await brApi.tab.create(vaultWebUrl);
            context.webUnlock.setAllowedTabId(tab.id);
        }
        async openExistingWebUI() {
            const activeTab = await brApi.tab.getActiveTab();
            if (!activeTab) {
                return false;
            }
            if (!activeTab.url) {
                return false;
            }
            const tabUrl = new URL(activeTab.url);
            const vaultUrl = new URL(urlProvider.getVaultUrl());
            const vaultHost = vaultUrl.host;
            if (tabUrl.host != vaultHost ||
                !tabUrl.hash.includes("/unlock/")) {
                return false;
            }
            context.webUnlock.setAllowedTabId(activeTab.id);
            csApi.web.tryUnlock(activeTab.id);
            return true;
        }
    }

    class WebUnlock {
        WEB_UNLOCK_INFO_KEY = "WEB_UNLOCK_INFO_KEY";
        MAX_ALLOWED_PLUS_TIME = 2 * 60 * 1000;
        unlockInfo = null;
        async getUnlockKey(tabId) {
            try {
                const isAllowedTab = await this.checkIsAllowedTab(tabId);
                if (!isAllowedTab) {
                    return "";
                }
                const unlocked = await bg$1.vault.isUnlocked();
                if (!unlocked) {
                    return "";
                }
                const secretKey = await bg$1.zcrypt.getMasterKey();
                const respJson = (await vapi.unlock.getWebUnlockPublicKey()).result;
                const publicKeyHex = respJson.operation.Details.public_key;
                const publicKey = await js.crypto.rsa.importPublicKeyHex(publicKeyHex);
                const encryptedSecretKeyHex = await js.crypto.rsa.encryptHex(secretKey, publicKey);
                this.setAllowedTabId(Number.NEGATIVE_INFINITY);
                return encryptedSecretKeyHex;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async checkIsAllowedTab(tabId) {
            try {
                if (!this.unlockInfo) {
                    this.unlockInfo = await zsessionStorage.load(this.WEB_UNLOCK_INFO_KEY, null);
                }
                const isAllowed = this.unlockInfo &&
                    (tabId == this.unlockInfo.allowedTabId) && (Date.now() < this.unlockInfo.allowedUpto);
                return isAllowed;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        setAllowedTabId(tabId) {
            this.unlockInfo = {
                allowedTabId: tabId,
                allowedUpto: Date.now() + this.MAX_ALLOWED_PLUS_TIME
            };
            zsessionStorage.save(this.WEB_UNLOCK_INFO_KEY, this.unlockInfo);
        }
    }

    class Context {
        vaultWeb;
        webUnlock;
        init() {
            this.vaultWeb = new VaultWeb();
            this.webUnlock = new WebUnlock();
        }
    }
    const context = new Context();

    context.init();
    const vaultWeb = context.vaultWeb;
    const webUnlock = context.webUnlock;

    class BgVaultApiImpl {
        async openWebUI({ route = "" }) {
            return vaultWeb.openWebUI({ route });
        }
        async sync() {
            return bg$1.vaultSync.sync(true);
        }
        async getUrl() {
            return urlProvider.getVaultUrl();
        }
        async getDomain() {
            return urlProvider.getDomain();
        }
        async lock() {
            return bg$1.vault.lock();
        }
        async signOut() {
            return bg$1.vault.signOut();
        }
        async syncConfig() {
            return bg$1.vaultSync.syncConfig();
        }
        async syncThemeFromWeb() {
            return bg$1.vaultSync.syncThemeFromWeb();
        }
    }

    class BgVaultWebApiImpl {
        async syncSecret(secretId) {
            return bg$1.vaultSecrets.secretGetter.getSecretFromWeb(secretId);
        }
        async deleteLocalSecrets(secretIds) {
            return bg$1.vaultSecrets.removeLocalSecrets(secretIds);
        }
        async getWebUnlockKey(port) {
            return webUnlock.getUnlockKey(ApiServerUtil.getTabId(port));
        }
        async getAfterUnlockRoute() {
            return vaultWeb.getAfterUnlockRoute();
        }
    }

    class BgZTabApiImpl {
        async openZTab() {
            bg$1.ztabHandler.openZTab();
        }
        async closeZTab(port) {
            bg$1.ztabHandler.closeZTabFromId(ApiServerUtil.getTabId(port));
        }
        async addAddress() {
            bg$1.ztabHandler.addAddress();
        }
        async addPassword(prefillInput) {
            bg$1.ztabHandler.addPassword(prefillInput);
        }
        async addPaymentCard(prefillInput) {
            bg$1.ztabHandler.addPaymentCard(prefillInput);
        }
        async editPaymentCard(prefillInput, secretId) {
            bg$1.ztabHandler.editPaymentCard(prefillInput, secretId);
        }
        async sharePassword(secretId) {
            bg$1.ztabHandler.sharePassword(secretId);
        }
        async editPassword(secretId) {
            bg$1.ztabHandler.editPassword(secretId);
        }
        async enableAccessControl(secretId) {
            bg$1.ztabHandler.enableAccessControl(secretId);
        }
        async manageAccessControl(secretId) {
            bg$1.ztabHandler.manageAccessControl(secretId);
        }
        async saveGeneratedPassword(password) {
            bg$1.ztabHandler.saveGeneratedPassword(password);
        }
        async getZTabTask() {
            return bg$1.ztabHandler.getRemovePendingZTabTask();
        }
        async getSecretAccess(secretId) {
            return bg$1.ztabHandler.getSecretAccess(secretId);
        }
        async openSettings() {
            bg$1.ztabHandler.openSettings();
        }
    }

    class BgApiServer {
        secret = new BgSecretApiImpl();
        audit = new BgAuditApiImpl();
        accessCtrl = new BgAccessCtrlApiImpl();
        crypto = new BgCryptoApiImpl();
        settings = new BgSettingsApiImpl();
        siteFrame = new BgSiteFrameApiImpl();
        policy = new BgPolicyApiImpl();
        secretType = new BgSecretTypeApiImpl();
        folder = new BgFolderApiImpl();
        unlock = new BgUnlockApiImpl();
        generator = new BgGeneratorApiImpl();
        login = new BgLoginApiImpl();
        cardFrame = new BgCardFrameApiImpl();
        tab = new BgTabApiImpl();
        other = new BgOtherApiImpl();
        saveFrame = new BgSaveFrameApiImpl();
        session = new BgSessionApiImpl();
        ztab = new BgZTabApiImpl();
        updateFrame = new BgUpdateFrameApiImpl();
        vault = new BgVaultApiImpl();
        trash = new BgTrashApiImpl();
        user = new BgUserApiImpl();
        vaultWeb = new BgVaultWebApiImpl();
        async init() {
            const apiServer = portApi.createApiServer();
            apiServer.init({ name: VtApiPortNames.BG, fnObj: this });
        }
    }

    var VtEventScopes;
    (function (VtEventScopes) {
        VtEventScopes["BG"] = "BG";
    })(VtEventScopes || (VtEventScopes = {}));
    var VtLoginState;
    (function (VtLoginState) {
        VtLoginState["LOGGED_OUT"] = "LOGGED_OUT";
        VtLoginState["LOCKED"] = "LOCKED";
        VtLoginState["UNLOCKED"] = "UNLOCKED";
    })(VtLoginState || (VtLoginState = {}));
    var SecretHighlightFields;
    (function (SecretHighlightFields) {
        SecretHighlightFields["NAME"] = "NAME";
        SecretHighlightFields["UI_TEXT"] = "UI_TEXT";
        SecretHighlightFields["WORDS"] = "WORDS";
        SecretHighlightFields["WORDS_INCLUDE"] = "WORDS_INCLUDE";
    })(SecretHighlightFields || (SecretHighlightFields = {}));
    var FolderHighlightFields;
    (function (FolderHighlightFields) {
        FolderHighlightFields["NAME"] = "NAME";
    })(FolderHighlightFields || (FolderHighlightFields = {}));
    var URL_Part;
    (function (URL_Part) {
        URL_Part["HOST"] = "HOST";
        URL_Part["HOSTNAME"] = "HOSTNAME";
        URL_Part["DOMAIN"] = "DOMAIN";
    })(URL_Part || (URL_Part = {}));

    class BgEventServerContext {
        eventServer;
    }
    class BgEventServer {
        context = new BgEventServerContext();
        init() {
            const eventServer = this.context.eventServer = portApi.createEventServer();
            eventServer.init(VtEventScopes.BG);
        }
        login = new BgLoginEventServer(this.context);
        secret = new BgSecretEventServer(this.context);
        settings = new BgSettingsEventServer(this.context);
        sync = new BgSyncEventServer(this.context);
    }
    class BgSyncEventServer {
        context;
        prefix = "sync.";
        constructor(context) {
            this.context = context;
        }
        synced() {
            this.context.eventServer.dispatch(this.prefix + this.synced.name);
        }
        syncing() {
            this.context.eventServer.dispatch(this.prefix + this.syncing.name);
        }
    }
    class BgSettingsEventServer {
        context;
        prefix = "settings.";
        constructor(context) {
            this.context = context;
        }
        changed() {
            this.context.eventServer.dispatch(this.prefix + this.changed.name);
        }
        settingChanged(name, value) {
            this.context.eventServer.dispatch(this.prefix + this.settingChanged.name, [name, value]);
        }
        themeChanged(info) {
            this.context.eventServer.dispatch(this.prefix + this.themeChanged.name, [info]);
        }
    }
    class BgSecretEventServer {
        context;
        prefix = "secret.";
        constructor(context) {
            this.context = context;
        }
        added(secretId) {
            this.context.eventServer.dispatch(this.prefix + this.added.name, [secretId]);
        }
        changed(secretId) {
            this.context.eventServer.dispatch(this.prefix + this.changed.name, [secretId]);
        }
        removed(secretIds) {
            this.context.eventServer.dispatch(this.prefix + this.removed.name, [secretIds]);
        }
    }
    class BgLoginEventServer {
        context;
        prefix = "login.";
        constructor(context) {
            this.context = context;
        }
        locked() {
            this.context.eventServer.dispatch(this.prefix + this.locked.name);
        }
        loggedOut() {
            this.context?.eventServer?.dispatch?.(this.prefix + this.loggedOut.name);
        }
        unlocked() {
            this.context.eventServer.dispatch(this.prefix + this.unlocked.name);
        }
    }

    var ConfigKeys;
    (function (ConfigKeys) {
        ConfigKeys["OAUTH"] = "oauth";
        ConfigKeys["COMMAND_INDEX"] = "command_index";
        ConfigKeys["COMMANDS"] = "commands";
        ConfigKeys["OAUTH_SCOPE"] = "oauthScope";
        ConfigKeys["CACHE_DEV_MASTER_PASSWORD"] = "cache_dev_master_password";
        ConfigKeys["BROWSER"] = "browser";
        ConfigKeys["ACTION_MAIN"] = "action_main";
    })(ConfigKeys || (ConfigKeys = {}));

    var Browser;
    (function (Browser) {
        Browser["CHROME"] = "chrome";
        Browser["FIREFOX"] = "firefox";
        Browser["EDGE"] = "edge";
        Browser["SAFARI"] = "safari";
        Browser["OPERA"] = "opera";
    })(Browser || (Browser = {}));

    class Exp_TabCreator {
        static newInstance(params) {
            const tabApi = params.reqNormal ? BrTabCreateApiCreateNormal.instance : BrTabCreateApiCreateTab.instance;
            const storageApi = params.reqPersistent ? BrStorageApiLocal.instance : BrStorageApiSession.instance;
            let tabCreator = new TabCreatorImpl(params.tabName, params.url, tabApi, storageApi);
            return tabCreator;
        }
    }
    class TabCreatorImpl {
        tabName;
        url;
        tabCreateApi;
        storageApi;
        activeTabSaver = null;
        constructor(tabName, url = "", tabCreateApi, storageApi) {
            this.tabName = tabName;
            this.url = url;
            this.tabCreateApi = tabCreateApi;
            this.storageApi = storageApi;
            this.activeTabSaver = new ActiveTabSaver(this);
        }
        async create(url) {
            try {
                await this.activeTabSaver.saveActiveTabId();
                await this.closeTab();
                const tab = await this.tabCreateApi.createTab(url);
                brApi.windows.update(tab.windowId, { focused: true });
                await this.storageApi.save(this.getStorageKey(), tab.id);
                return fnOut.result(tab);
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async createTab() {
            return this.create(this.url);
        }
        async close() {
            try {
                await this.activeTabSaver.restoreLastActiveTab();
                await this.closeTab();
            }
            catch (e) {
                logError(e);
            }
        }
        async getTabId() {
            try {
                return this.storageApi.load(this.getStorageKey(), null);
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getTabName() {
            return this.tabName;
        }
        async closeTab() {
            try {
                const existingTabId = await this.getTabId();
                if (existingTabId) {
                    await brApi.tab.closeTab(existingTabId);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getStorageKey() {
            return SessionStorageKeys.TAB_CREATOR_PREFIX + this.tabName;
        }
    }
    class BrTabCreateApiCreateTab {
        static inst = null;
        static get instance() {
            return this.inst || (this.inst = new BrTabCreateApiCreateTab());
        }
        createTab(url) {
            return brApi.tab.create(url);
        }
    }
    class BrTabCreateApiCreateNormal {
        static inst = null;
        static get instance() {
            return this.inst || (this.inst = new BrTabCreateApiCreateNormal());
        }
        createTab(url) {
            return brApi.tab.createNormalTab(url);
        }
    }
    class BrStorageApiSession {
        static inst = null;
        static get instance() {
            return this.inst || (this.inst = new BrStorageApiSession());
        }
        save(key, val) {
            return zsessionStorage.save(key, val);
        }
        load(key, defaultVal) {
            return zsessionStorage.load(key, defaultVal);
        }
    }
    class BrStorageApiLocal {
        static inst = null;
        static get instance() {
            return this.inst || (this.inst = new BrStorageApiLocal());
        }
        save(key, val) {
            return zlocalStorage.save(key, val);
        }
        load(key, defaultVal) {
            return zlocalStorage.load(key, defaultVal);
        }
    }
    class ActiveTabSaver {
        tabCreator;
        constructor(tabCreator) {
            this.tabCreator = tabCreator;
        }
        async saveActiveTabId() {
            try {
                const activeTab = await brApi.tab.getActiveTab();
                if (!activeTab) {
                    await zsessionStorage.save(this.getLastActiveStorageKey(), null);
                    return;
                }
                const createdTabId = await this.tabCreator.getTabId();
                if (createdTabId == activeTab.id) {
                    return;
                }
                await zsessionStorage.save(this.getLastActiveStorageKey(), activeTab.id);
            }
            catch (e) {
                logError(e);
            }
        }
        async restoreLastActiveTab() {
            try {
                const storedTabId = await zsessionStorage.load(this.getLastActiveStorageKey(), null);
                if (!storedTabId) {
                    return;
                }
                const tab = await brApi.tab.getTab(storedTabId);
                if (tab) {
                    await brApi.tab.updateTab(tab.id, { active: true });
                }
                await zsessionStorage.remove(this.getLastActiveStorageKey());
            }
            catch (e) {
                logError(e);
            }
        }
        getLastActiveStorageKey() {
            return SessionStorageKeys.TAB_CREATOR_PREFIX + "LAST_ACTIVE_" + this.tabCreator.getTabName();
        }
    }

    class BgUtilImpl {
        newTabCreator = Exp_TabCreator.newInstance;
        async getClients() {
            try {
                return await globalThis["clients"].matchAll();
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        isSafari() {
            try {
                const browser = config.get(ConfigKeys.BROWSER);
                return browser == Browser.SAFARI;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    function main$2() {
        globalThis.bgUtil = new BgUtilImpl();
    }

    var MapTableKey;
    (function (MapTableKey) {
        MapTableKey["EXT_LOCAL_DATA_KEY"] = "EXT_DATA_KEY";
        MapTableKey["GENERATOR_HISTORY"] = "GENERATOR_HISTORY";
    })(MapTableKey || (MapTableKey = {}));

    class ExtCryptoImpl {
        aesKey = null;
        async init() {
            try {
                await this.restoreKey();
            }
            catch (e) {
                logError(e);
            }
        }
        async initPostUnlock() {
            try {
                const masterKey = await bg.zcrypt.getMasterKey();
                if (!masterKey) {
                    throw "EMPTY_MASTER_KEY";
                }
                await this.initKey();
            }
            catch (e) {
                logError(e);
            }
        }
        async encrypt(plaintext) {
            try {
                if (!this.aesKey) {
                    throw "NO_AES_KEY";
                }
                return await js.crypto.aes.encrypt(plaintext, this.aesKey);
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async decrypt(ciphertext) {
            try {
                if (!this.aesKey) {
                    throw "NO_AES_KEY";
                }
                return await js.crypto.aes.decrypt(ciphertext, this.aesKey);
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async initKey() {
            try {
                await this.loadKeyFromDb();
                if (this.aesKey) {
                    return;
                }
                this.aesKey = (await js.crypto.aes.generateKey()).result;
                const exportedKey = (await js.crypto.aes.exportKey(this.aesKey)).result;
                const encryptedExportedKey = await bg.zcrypt.encrypt(exportedKey, false);
                await accountDb.mapTable.save(MapTableKey.EXT_LOCAL_DATA_KEY, encryptedExportedKey);
            }
            catch (e) {
                logError(e);
            }
        }
        async restoreKey() {
            try {
                const exportedKey = await zsessionStorage.load(SessionStorageKeys.EXT_CRYPTO_AES_KEY, "");
                if (!exportedKey) {
                    return;
                }
                this.aesKey = (await js.crypto.aes.importKey(exportedKey)).result;
            }
            catch (e) {
                logError(e);
            }
        }
        async loadKeyFromDb() {
            try {
                if (this.aesKey) {
                    return;
                }
                const encryptedExportedKey = await accountDb.mapTable.load(MapTableKey.EXT_LOCAL_DATA_KEY);
                if (!encryptedExportedKey) {
                    return;
                }
                try {
                    const exportedKey = await bg.zcrypt.decrypt(encryptedExportedKey, false);
                    this.aesKey = (await js.crypto.aes.importKey(exportedKey)).result;
                    await zsessionStorage.save(SessionStorageKeys.EXT_CRYPTO_AES_KEY, exportedKey);
                }
                catch (e) {
                    console.info(e);
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class Z_Enum {
        URL_PART = {
            URL: "url",
            HOSTNAME: "hostname",
            PARENT_DOMAIN: "parent_domain",
            HOST: "host"
        };
        DOMAIN_MATCHING_MODE = {
            HOSTNAME: this.URL_PART.HOSTNAME,
            PARENT_DOMAIN: this.URL_PART.PARENT_DOMAIN,
            HOST: this.URL_PART.HOST
        };
        FILTER = {
            ALL: "all",
            DOMAIN_MATCHING: "domain_matching",
            FAVOURITES: "favourite",
            RECENTLY_USED: "recently_used",
            RECENTLY_ADDED: "recently_added",
            PERSONAL: "personal",
            ENTERPRISE: "enterprise",
            SHARED_BY_ME: "shared_by_me",
            SHARED_TO_ME: "shared_to_me",
            UNSHARED: "unshared",
            OWNED_BY_ME: "owned_by_me",
        };
        PLAN = {
            PERSONAL: "Personal",
            STANDARD: "Standard",
            PROFESSIONAL: "Professional",
            ENTERPRISE: "Enterprise"
        };
        ZVFEATURES = {
            ACCESS_CONTROL: "AccessControl"
        };
        FIELD_TYPE = {
            TEXT: "text",
            PASSWORD: "password",
            FILE: "file",
            TEXTAREA: "textarea"
        };
        DEFAULT_CATEGORIES = {
            WEB_ACCOUNT: "Web Account",
            BANK_ACCOUNT: "Bank Account",
            WINDOWS: "Windows",
            UNIX: "Unix",
            PAYMENT_CARD: "Payment Card",
            SOCIAL_SECURITY_NUMBER: "Social Security Number",
            HEALTH_CARE: "Health Care",
            FILE_STORE: "File Store",
            ADDRESS: "Address"
        };
    }
    const zenum = new Z_Enum();
    setGlobal("zenum", zenum);

    var VtSettings;
    (function (VtSettings) {
        VtSettings["LOCK_ON_SYSTEM_LOCK"] = "LOCK_ON_SYSTEM_LOCK";
        VtSettings["STAY_SIGNED_IN"] = "STAY_SIGNED_IN";
        VtSettings["THEME"] = "THEME";
        VtSettings["FONT"] = "FONT";
        VtSettings["DARK_MODE"] = "DARK_MODE";
        VtSettings["DISABLE_WEBSITE_VAULT_ICON"] = "DISABLE_WEBSITE_VAULT_ICON";
        VtSettings["DISABLE_WEBSITE_KEYBOARD_SHORTCUT"] = "DISABLE_WEBSITE_KEYBOARD_SHORTCUT";
        VtSettings["DISABLE_BADGE_COUNT"] = "DISABLE_BADGE_COUNT";
        VtSettings["DISABLE_CLICK_TO_LOGIN"] = "DISABLE_CLICK_TO_LOGIN";
        VtSettings["DISABLE_SHADOW_ROOT"] = "DISABLE_SHADOW_ROOT";
    })(VtSettings || (VtSettings = {}));

    var VI18N;
    (function (VI18N) {
        VI18N["ACCESS_CHECKOUT_DESCRIPTION"] = "access_checkout_description";
        VI18N["ACCESS_CONTROL_DESCRIPTION"] = "access_control_description";
        VI18N["ACCESS_CONTROL_DISABLED_SUCCESS"] = "access_control_disabled_success";
        VI18N["ACCESS_CONTROL_INVALID_TIME"] = "access_control_invalid_time";
        VI18N["ACCESS_CONTROL_SAVED_SUCCESS"] = "access_control_saved_success";
        VI18N["ACCESS_CONTROL_SELECT_ANOTHER_APPROVER"] = "access_control_select_another_approver";
        VI18N["ACCESS_REQUEST_CREATED_SUCCESS"] = "access_request_created_success";
        VI18N["ACCESS_REQUEST_PENDING_DESCRIPTION"] = "access_request_pending_description";
        VI18N["ACCESS_REVOKED_SUCCESS"] = "access_revoked_success";
        VI18N["ACCESS_REVOKED_USER_SUCCESS"] = "access_revoked_user_success";
        VI18N["ADD_CARD"] = "add_card";
        VI18N["ADD_FOLDER"] = "add_folder";
        VI18N["ADD_PASSWORD"] = "add_password";
        VI18N["ADD_ADDRESS"] = "add_address";
        VI18N["ADD_PASSWORD_RESTRICTED"] = "add_password_restricted";
        VI18N["ADV_SETTING_DISABLE_BADGE_COUNT_CONTENT"] = "adv_setting_disable_badge_count_content";
        VI18N["ADV_SETTING_DISABLE_BADGE_COUNT_HEADING"] = "adv_setting_disable_badge_count_heading";
        VI18N["ADV_SETTING_DISABLE_CLICK_TO_LOGIN"] = "adv_setting_disable_click_to_login";
        VI18N["ADV_SETTING_DISABLE_CLICK_TO_LOGIN_CONTENT"] = "adv_setting_disable_click_to_login_content";
        VI18N["ADV_SETTING_DISABLE_VAULT_ICON_CONTENT"] = "adv_setting_disable_vault_icon_content";
        VI18N["ADV_SETTING_DISABLE_VAULT_ICON_HEADING"] = "adv_setting_disable_vault_icon_heading";
        VI18N["ADVANCE_REQUEST_APPROVED_DESCRIPTION"] = "advance_request_approved_description";
        VI18N["ALERT_HTTP_FILL"] = "alert_http_fill";
        VI18N["ALL_FOLDERS"] = "all_folders";
        VI18N["ALL_PASSWORDS"] = "all_passwords";
        VI18N["ALL_WEEKDAYS"] = "all_weekdays";
        VI18N["ALL_WEEKENDS"] = "all_weekends";
        VI18N["ASK_CLEAR_HISTORY"] = "ask_clear_history";
        VI18N["AUTOFILL_CARD_SUB_DOMAINS"] = "autofill_card_sub_domains";
        VI18N["AUTOFILL_SUB_DOMAINS"] = "autofill_sub_domains";
        VI18N["AUTOLOGIN_DISABLE_SUCCESS"] = "autologin_disable_success";
        VI18N["AUTOLOGIN_ENABLE_SUCCESS"] = "autologin_enable_success";
        VI18N["BACK_TO_FOLDERS"] = "back_to_folders";
        VI18N["CANCEL"] = "cancel";
        VI18N["CANCEL_ACCESS_REQUEST_SUCCESS"] = "cancel_access_request_success";
        VI18N["CANCEL_REQUEST"] = "cancel_request";
        VI18N["CARD_ADDED_SUCCESSFULLY"] = "card_added_successfully";
        VI18N["CARD_EDITED_SUCCESSFULLY"] = "card_edited_successfully";
        VI18N["ADDRESS_ADDED_SUCCESSFULLY"] = "address_added_successfully";
        VI18N["ADDRESS_EDITED_SUCCESSFULLY"] = "address_edited_successfully";
        VI18N["CARD_MOVE_TO_TRASH_SUCCESS"] = "card_move_to_trash_success";
        VI18N["CARD_NAME_ON_CARD"] = "card_name_on_card";
        VI18N["CHANGES_UPDATED"] = "changes_updated";
        VI18N["CHECK_IN_CONFIRM_DESCRIPTION"] = "check_in_confirm_description";
        VI18N["CHECK_IN_CONFIRM_TITLE"] = "check_in_confirm_title";
        VI18N["CHECK_IN_SUCCESS"] = "check_in_success";
        VI18N["CHECKIN"] = "checkin";
        VI18N["CHECKOUT"] = "checkout";
        VI18N["CHECKOUT_SUCCESS"] = "checkout_success";
        VI18N["CLEAR"] = "clear";
        VI18N["CLEAR_ALL"] = "clear_all";
        VI18N["CLEAR_CLIPBOARD_AFTER"] = "clear_clipboard_after";
        VI18N["CLEAR_FILTERS"] = "clear_filters";
        VI18N["CLOSE_DEV_TOOLS_ONE_CLICK_LOGIN"] = "close_dev_tools_one_click_login";
        VI18N["DEV_TOOLS_NEWTAB_LOGIN"] = "devtools_newtab_login";
        VI18N["DEV_TOOLS_TAB_CLOSED"] = "devtools_tab_closed";
        VI18N["CLOSE_DEV_TOOLS_ONE_CLICK_CARD"] = "close_dev_tools_one_click_card";
        VI18N["CONFIRM_ACCESS_CONTROL_DISABLE"] = "confirm_access_control_disable";
        VI18N["CONFIRM_CHECKOUT_DESCRIPTION"] = "confirm_checkout_description";
        VI18N["CONFIRM_INSECURE_FILL"] = "confirm_insecure_fill";
        VI18N["CONTEXT_MENU_SHOW_ALL_PASSWORDS"] = "context_menu_show_all_passwords";
        VI18N["CONTEXT_MENU_SHOW_ALL_CARDS"] = "context_menu_show_all_cards";
        VI18N["COPIED"] = "copied";
        VI18N["COPY"] = "copy";
        VI18N["COPY_TO_CLIPBOARD"] = "copy_to_clipboard";
        VI18N["CREATE_FOLDER"] = "create_folder";
        VI18N["CREATE_NEW"] = "create_new";
        VI18N["CURRENT_DOMAIN"] = "current_domain";
        VI18N["DAY"] = "day";
        VI18N["DAYS"] = "days";
        VI18N["DEFAULT_VIEW"] = "default_view";
        VI18N["DELETE"] = "delete";
        VI18N["DELETE_DOMAIN_FROM_LIST"] = "delete_domain_from_list";
        VI18N["DELETE_DOMAIN_FROM_LIST_DESCRIPTION"] = "delete_domain_from_list_description";
        VI18N["DELETE_PASSWORD"] = "delete_password";
        VI18N["DELETE_PASSWORD_CONFIRM_MESSAGE"] = "delete_password_confirm_message";
        VI18N["DELETE_PASSWORD_CONFIRM_TITLE"] = "delete_password_confirm_title";
        VI18N["DELETE_PASSWORD_SUCCESS_MESSAGE"] = "delete_password_success_message";
        VI18N["DENY"] = "deny";
        VI18N["ALLOW"] = "allow";
        VI18N["DESCRIPTION"] = "description";
        VI18N["DETAILED_VIEW"] = "detailed_view";
        VI18N["DISABLE"] = "disable";
        VI18N["DISABLE_ACCESS_CONTROL"] = "disable_access_control";
        VI18N["DISABLE_AUTO_LOGIN"] = "disable_auto_login";
        VI18N["DOMAIN_MISMATCH_ALERT"] = "domain_mismatch_alert";
        VI18N["DOMAIN_MISMATCH_DETECTED"] = "domain_mismatch_detected";
        VI18N["DOWNLOAD"] = "download";
        VI18N["EMPTY"] = "";
        VI18N["EDIT"] = "edit";
        VI18N["EDIT_CARD"] = "edit_card";
        VI18N["EDIT_ADDRESS"] = "edit_address";
        VI18N["EDIT_PASSWORD"] = "edit_password";
        VI18N["EMPTY_TRASH"] = "empty_trash";
        VI18N["EMPTY_TRASH_CONFIRM_MESSAGE"] = "empty_trash_confirm_message";
        VI18N["EMPTY_TRASH_CONFIRM_TITLE"] = "empty_trash_confirm_title";
        VI18N["EMPTY_TRASH_SUCCESS_MESSAGE"] = "empty_trash_success_message";
        VI18N["ENABLE_ACCESS_CONTROL"] = "enable_access_control";
        VI18N["ENABLE_AUTO_LOGIN"] = "enable_auto_login";
        VI18N["ENTERPRISE"] = "enterprise";
        VI18N["ENTERPRISE_PASSWORDS"] = "enterprise_passwords";
        VI18N["ERROR_GETTING_ONEAUTH_TOTP"] = "error_getting_oneauth_totp";
        VI18N["FAVOURITES"] = "favourites";
        VI18N["FIELD_NAME"] = "field_name";
        VI18N["FILE"] = "file";
        VI18N["FILE_ONLY_N_PER_PASSWORD"] = "file_only_n_per_password";
        VI18N["FILE_SIZE_CANNOT_EXCEED"] = "file_size_cannot_exceed";
        VI18N["FILE_SIZE_PER_PASSWORD_CANNOT_EXCEED"] = "file_size_per_password_cannot_exceed";
        VI18N["FILL"] = "fill";
        VI18N["FOLDER"] = "folder";
        VI18N["FOLDER_NAME"] = "folder_name";
        VI18N["FOLDERS"] = "folders";
        VI18N["GENERATOR_HISTORY_DESCRIPTION"] = "generator_history_description";
        VI18N["GENERATOR_PASSWORD_LENGTH"] = "generator_password_length";
        VI18N["GET_ONEAUTH_TOTP"] = "get_oneauth_totp";
        VI18N["HOUR"] = "hour";
        VI18N["HOURS"] = "hours";
        VI18N["INSECURE_CARD_FILL_DESCRIPTION"] = "insecure_card_fill_description";
        VI18N["INSECURE_PAGE_ALERT"] = "insecure_page_alert";
        VI18N["INVALID_DATE_ERROR"] = "invalid_date_error";
        VI18N["INVALID_EMAIL_ADDRESS"] = "invalid_email_address";
        VI18N["LIST_VIEW"] = "list_view";
        VI18N["LOGIN"] = "login";
        VI18N["LOGIN_INCOGNITO"] = "login_incognito";
        VI18N["MANAGE"] = "manage";
        VI18N["MANAGE_ACCESS_CONTROL"] = "manage_access_control";
        VI18N["MANAGE_AUTHENTICATOR"] = "manage_authenticator";
        VI18N["MANAGE_AUTHENTICATORS"] = "manage_authenticators";
        VI18N["MANAGE_CUSTOM_FIELDS"] = "manage_custom_fields";
        VI18N["MANAGE_PROMPTS"] = "manage_prompts";
        VI18N["MASTER_PASSWORD"] = "master_password";
        VI18N["MAX_FILE_SIZE_POPUP"] = "max_file_size_popup";
        VI18N["MESSAGE"] = "message";
        VI18N["MINUTE"] = "minute";
        VI18N["MINUTES"] = "minutes";
        VI18N["MODIFY"] = "modify";
        VI18N["MOVE_PASSWORD_NAME_TO_TRASH"] = "move_password_name_to_trash";
        VI18N["MOVE_TO_TRASH"] = "move_to_trash";
        VI18N["MOVE_TO_TRASH_SUCCESS"] = "move_to_trash_success";
        VI18N["MUST_NOT_BE_EMPTY"] = "must_not_be_empty";
        VI18N["MUST_NOT_CONTAIN"] = "must_not_contain";
        VI18N["NAME"] = "name";
        VI18N["NO_CARDS_FOUND"] = "no_cards_found";
        VI18N["NO_ADDRESS_FOUND"] = "no_addresses_found";
        VI18N["NO_CARDS_MATCHING_FOUND"] = "no_cards_matching_found";
        VI18N["NO_COPY_PERMISSION"] = "no_copy_permission";
        VI18N["NO_EDIT_PERMISSION"] = "no_edit_permission";
        VI18N["NO_FOLDERS_FOUND"] = "no_folders_found";
        VI18N["NO_FOLDERS_MATCHING_FOUND"] = "no_folders_matching_found";
        VI18N["NO_MATCHING_FOLDERS_FOUND"] = "no_matching_folders_found";
        VI18N["NO_MATCHING_PASSWORDS_FOUND"] = "no_matching_passwords_found";
        VI18N["NO_MATCHING_ADDRESSES_FOUND"] = "no_matching_addresses_found";
        VI18N["NO_PASSWORDS_FOLDER"] = "no_passwords_folder";
        VI18N["NO_PASSWORDS_FOUND"] = "no_passwords_found";
        VI18N["NO_PASSWORDS_MATCHING_FOUND_FOLDER"] = "no_passwords_matching_found_folder";
        VI18N["NO_PASSWORDS_YET"] = "no_passwords_yet";
        VI18N["NO_SHARE_PERMISSION"] = "no_share_permission";
        VI18N["NO_TRASHED_PASSWORDS"] = "no_trashed_passwords";
        VI18N["NO_USER_GROUPS_FOUND"] = "no_user_groups_found";
        VI18N["NO_USER_GROUPS_MATCHING_FOUND"] = "no_user_groups_matching_found";
        VI18N["NO_USERS_FOUND"] = "no_users_found";
        VI18N["NO_USERS_MATCHING_FOUND"] = "no_users_matching_found";
        VI18N["NO_VIEW_PERMISSION"] = "no_view_permission";
        VI18N["NOTES"] = "notes";
        VI18N["ONE_CLICK_PASSWORD_CHANGE_PREVENTED_POPUP"] = "one_click_password_change_prevented_popup";
        VI18N["ONEAUTH_APPROVE_MESSAGE"] = "oneauth_approve_message";
        VI18N["ONEAUTH_INSTALL_DESCRIPTION"] = "oneauth_install_description";
        VI18N["ONEAUTH_NOTIFICATION_PUSHED"] = "oneauth_notification_pushed";
        VI18N["ONEAUTH_UNLOCK_FAILED"] = "oneauth_unlock_failed";
        VI18N["OPEN_WEB_APP"] = "open_web_app";
        VI18N["PARENT_DOMAIN"] = "parent_domain";
        VI18N["PASSPHRASE_CLEARED"] = "passphrase_cleared";
        VI18N["PASSWORD"] = "password";
        VI18N["PASSWORD_ADDED_SUCCESSFULLY"] = "password_added_successfully";
        VI18N["PASSWORD_EDITED_SUCCESSFULLY"] = "password_edited_successfully";
        VI18N["PASSWORD_MUST_HAVE_LOWERCASE"] = "password_must_have_lowercase";
        VI18N["PASSWORD_MUST_HAVE_MINIMUM_CHARS"] = "password_must_have_minimum_chars";
        VI18N["PASSWORD_MUST_HAVE_NUMBER"] = "password_must_have_number";
        VI18N["PASSWORD_MUST_HAVE_SPL_CHAR"] = "password_must_have_spl_char";
        VI18N["PASSWORD_MUST_HAVE_UPPERCASE"] = "password_must_have_uppercase";
        VI18N["PASSWORD_MUST_NOT_HAVE_CHARS"] = "password_must_not_have_chars";
        VI18N["PASSWORD_MUST_START_WITH_ALPHABET"] = "password_must_start_with_alphabet";
        VI18N["PASSWORD_POLICY"] = "password_policy";
        VI18N["PASSWORDS"] = "passwords";
        VI18N["PERSONAL_PASSWORD_CANNOT_BE_SHARED"] = "personal_password_cannot_be_shared";
        VI18N["PERSONAL_PASSWORD_RESTRICTED"] = "personal_password_restricted";
        VI18N["PERSONAL"] = "personal";
        VI18N["PERSONAL_PASSWORDS"] = "personal_passwords";
        VI18N["PLEASE_ENTER"] = "please_enter";
        VI18N["PLEASE_ENTER_A"] = "please_enter_a";
        VI18N["PLEASE_ENTER_AN_EMAIL"] = "please_enter_an_email";
        VI18N["PLEASE_ENTER_YOUR"] = "please_enter_your";
        VI18N["PLEASE_UPLOAD_YOUR"] = "please_upload_your";
        VI18N["PROCEED"] = "proceed";
        VI18N["PROMPT_AUTO_SAVE_UPDATE"] = "prompt_auto_save_update";
        VI18N["PROMPT_CARD_AUTO_SAVE_UPDATE"] = "prompt_card_auto_save_update";
        VI18N["PUSH_SENT_SUCCESS"] = "push_sent_success";
        VI18N["REASON"] = "reason";
        VI18N["RECENTLY_COPIED_PASSWORDS"] = "recently_copied_passwords";
        VI18N["REQUEST_ACCESS"] = "request_access";
        VI18N["REQUEST_ACCESS_DESCRIPTION"] = "request_access_description";
        VI18N["RESET_PASSWORD"] = "reset_password";
        VI18N["RESOURCE_REMOVED_SUCCESSFULLY"] = "resource_removed_successfully";
        VI18N["RESTORE_PASSWORD"] = "restore_password";
        VI18N["RESTORE_PASSWORD_CONFIRM_MESSAGE"] = "restore_password_confirm_message";
        VI18N["RESTORE_PASSWORD_CONFIRM_TITLE"] = "restore_password_confirm_title";
        VI18N["RESTORE_PASSWORD_SUCCESS_MESSAGE"] = "restore_password_success_message";
        VI18N["SAME_NAME_PASSWORD_EXISTS"] = "same_name_password_exists";
        VI18N["SAVE_AND_ENABLE"] = "save_and_enable";
        VI18N["SAVE_PROMPT_DISABLED_DESCRIPTION"] = "save_prompt_disabled_description";
        VI18N["SEARCH"] = "search";
        VI18N["SEARCHING"] = "searching";
        VI18N["SECONDS"] = "seconds";
        VI18N["SELECT_CREATE_FOLDER"] = "select_create_folder";
        VI18N["SELECT_ONEAUTH_SECRETS"] = "select_oneauth_secrets";
        VI18N["SETTING_ENFORCED_BY_AMDIN"] = "setting_enforced_by_amdin";
        VI18N["SHARE_ONE_CLICK_LOGIN"] = "share_one_click_login";
        VI18N["SHARE_PASSWORD"] = "share_password";
        VI18N["SHARE_SUCCESS"] = "share_success";
        VI18N["SHARE_USER_SUCCESS"] = "share_user_success";
        VI18N["SHARED_BY_ME"] = "shared_by_me";
        VI18N["SHARED_WITH_ME"] = "shared_with_me";
        VI18N["SHARING_RESTRICTED"] = "sharing_restricted";
        VI18N["SIGN_OUT"] = "sign_out";
        VI18N["SIGN_OUT_CONFIRM"] = "sign_out_confirm";
        VI18N["SYNC"] = "sync";
        VI18N["SYNC_COMPLETED"] = "sync_completed";
        VI18N["SYNC_DESCRIPTION"] = "sync_description";
        VI18N["SYNC_STARTED"] = "sync_started";
        VI18N["SYNCING"] = "syncing";
        VI18N["TAGS"] = "tags";
        VI18N["TAG"] = "tag";
        VI18N["THIRD_PARTY_SHARED_OUTPUT"] = "third_party_shared_output";
        VI18N["TILE_VIEW"] = "tile_view";
        VI18N["TOTP_KEY"] = "totp_key";
        VI18N["TOTP_KEY_MUST_CONTAIN_ATLEAST_N_CHARS"] = "totp_key_must_contain_atleast_n_chars";
        VI18N["UNLOCK_ZOHO_VAULT"] = "unlock_zoho_vault";
        VI18N["UNSHARED"] = "unshared";
        VI18N["UNSHARED_FOLDERS"] = "unshared_folders";
        VI18N["UNSHARED_PASSWORDS"] = "unshared_passwords";
        VI18N["UPDATE"] = "update";
        VI18N["UPDATE_CARD"] = "update_card";
        VI18N["UPDATE_PASSWORD_QUESTION"] = "update_password_question";
        VI18N["URL"] = "url";
        VI18N["URL_INVALID"] = "url_invalid";
        VI18N["URLS_MAX_N"] = "urls_max_n";
        VI18N["USE_XS_PASSWORD_ON_Y"] = "use_xs_password_on_y";
        VI18N["USER_NAME_LABEL"] = "user_name_label";
        VI18N["VALUE"] = "value";
        VI18N["VIEW"] = "view";
        VI18N["VIEW_FILTERS"] = "view_filters";
        VI18N["VIEW_MORE"] = "view_more";
        VI18N["WEEK"] = "week";
        VI18N["WEEKS"] = "weeks";
        VI18N["ZOHO_VAULT_EXTENSION_LOCKED"] = "zoho_vault_extension_locked";
        VI18N["SELECT_COUNTRY"] = "select_country";
        VI18N["SELECT_STATE"] = "select_state";
        VI18N["SELECT_CITY"] = "select_city";
        VI18N["SELECT_ALL"] = "select_all";
        VI18N["UNSELECT_ALL"] = "unselect_all";
        VI18N["SELECT"] = "select";
        VI18N["X_MUST_BE_LESS_THAN_Y_CHARS"] = "x_must_be_less_than_y_chars";
        VI18N["SIGNUP_FOR_VAULT"] = "signup_for_vault";
        VI18N["GENERATOR_POLICY_DEFAULTS_USED"] = "generator_policy_defaults_used";
        VI18N["SIGN_UP"] = "sign_up";
        VI18N["ADD_PERSONAL_ENTERPRISE_PASSWORD_RESTRICTED"] = "add_personal_enterprise_password_restricted";
        VI18N["ENTERPRISE_PASSWORD_RESTRICTED"] = "enterprise_password_restricted";
        VI18N["INVALID_MASTER_PASSWORD"] = "invalid_master_passphrase";
        VI18N["INVALID_MASTER_PASSWORD_N_REMAINING"] = "invalid_master_passphrase_n_remaining";
    })(VI18N || (VI18N = {}));

    var BadgeColor;
    (function (BadgeColor) {
        BadgeColor["BLUE"] = "#3761A6";
        BadgeColor["RED"] = "#e42528";
        BadgeColor["WHITE"] = "white";
    })(BadgeColor || (BadgeColor = {}));
    class Badge {
        lockedIconObj = {
            "16": "/images/logo/locked/vault-16.png",
            "32": "/images/logo/locked/vault-32.png",
            "48": "/images/logo/locked/vault-48.png",
            "64": "/images/logo/locked/vault-64.png",
            "128": "/images/logo/locked/vault-128.png",
            "256": "/images/logo/locked/vault-256.png",
            "512": "/images/logo/locked/vault-512.png",
            "1024": "/images/logo/locked/vault-1024.png"
        };
        unlockedIconObj = {
            "16": "/images/logo/vault-16.png",
            "32": "/images/logo/vault-32.png",
            "48": "/images/logo/vault-48.png",
            "64": "/images/logo/vault-64.png",
            "128": "/images/logo/vault-128.png",
            "256": "/images/logo/vault-256.png",
            "512": "/images/logo/vault-512.png",
            "1024": "/images/logo/vault-1024.png"
        };
        states = {
            [VtLoginState.LOGGED_OUT]: {
                iconObj: this.lockedIconObj,
            },
            [VtLoginState.LOCKED]: {
                badgeText: "!",
                tooltipTitle: i18n(VI18N.ZOHO_VAULT_EXTENSION_LOCKED),
                badgeColor: BadgeColor.RED,
            },
            [VtLoginState.UNLOCKED]: {},
        };
        async changeState(state) {
            try {
                if (!(state in this.states)) {
                    throw "UNKNOWN_STATE: " + state;
                }
                switch (state) {
                    case VtLoginState.UNLOCKED:
                        this.changeStateFn(this.states[state]);
                        await this.refreshCount();
                        return;
                    default:
                        this.changeStateFn(this.states[state]);
                        return;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        changeStateFn(badgeState) {
            brApi.action.setIcon(badgeState.iconObj ?? this.unlockedIconObj);
            brApi.action.setBadgeText(badgeState.badgeText ?? "");
            brApi.action.setTitle(badgeState.tooltipTitle ?? "Zoho Vault");
            brApi.action.setBadgeColor(badgeState.badgeColor ?? BadgeColor.BLUE);
        }
        async refreshCount() {
            try {
                brApi.action.setBadgeText(await this.getDomainMatchingCountText());
            }
            catch (e) {
                logError(e);
            }
        }
        async getDomainMatchingCountText() {
            try {
                const badgeCountDisabled = await zlocalStorage.load(VtSettings.DISABLE_BADGE_COUNT, false);
                if (badgeCountDisabled) {
                    return "";
                }
                const count = await domainHandler.getDomainMatchingCount();
                return count > 0 ? count.toString() : "";
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
    }

    class ActiveTabObserver {
        callback;
        constructor(callback) {
            this.callback = callback;
        }
        static listen(callback) {
            new ActiveTabObserver(callback).init();
        }
        init() {
            js.fn.bindThis(this, [this.callCallback, this.tabUpdated]);
            brApi.tab.onTabActivate(this.callCallback);
            brApi.tab.onWindowFocus(this.callCallback);
            brApi.tab.onTabUpdate(this.tabUpdated);
        }
        tabUpdated(_tabId, changeInfo, tab) {
            if (!tab.active || !changeInfo.url) {
                return;
            }
            this.callCallback();
        }
        async callCallback() {
            const activeTab = await brApi.tab.getActiveTab();
            await this.callback(activeTab);
        }
    }

    class UrlChangeObserver {
        callback;
        static listen(callback) {
            new UrlChangeObserver(callback).init();
        }
        lastUrl = "";
        constructor(callback) {
            this.callback = callback;
        }
        init() {
            js.fn.bindThis(this, [this.handleTabChange]);
            ActiveTabObserver.listen(this.handleTabChange);
        }
        handleTabChange(tab) {
            if (!tab || tab.url == this.lastUrl) {
                return;
            }
            this.lastUrl = tab.url;
            this.callback(tab);
        }
    }

    class BadgeMenuHandler {
        state = VtLoginState.LOGGED_OUT;
        async init() {
            try {
                contextMenu.init();
                this.changeState = js.fn.wrapper.createSingleInstListener(this.changeState, this);
                this.refresh = js.fn.wrapper.createSingleInstListener(this.refresh, this);
                js.fn.bindThis(this, [this.urlChanged]);
                UrlChangeObserver.listen(this.urlChanged);
                await this.changeState(await this.findState());
            }
            catch (e) {
                logError(e);
            }
        }
        async urlChanged(_tab) {
            await this.refreshIfUnlocked();
        }
        async changeState(state) {
            this.state = state;
            await Promise.all([
                badge.changeState(state),
                contextMenu.changeState(state),
            ]);
        }
        async refresh() {
            try {
                if (this.state != VtLoginState.UNLOCKED) {
                    return;
                }
                await Promise.all([
                    badge.refreshCount(),
                    contextMenu.changeState(this.state)
                ]);
            }
            catch (e) {
                logError(e);
            }
        }
        async refreshIfUnlocked() {
            if (this.state != VtLoginState.UNLOCKED) {
                return;
            }
            await this.changeState(VtLoginState.UNLOCKED);
        }
        async findState() {
            try {
                const isLoggedOut = !(oauth.isLoggedIn());
                if (isLoggedOut) {
                    return VtLoginState.LOGGED_OUT;
                }
                const isLocked = !(await bg$1.vault.isUnlocked());
                if (isLocked) {
                    return VtLoginState.LOCKED;
                }
                return VtLoginState.UNLOCKED;
            }
            catch (e) {
                logError(e);
                return VtLoginState.LOGGED_OUT;
            }
        }
    }

    class SecretQuery extends PageQuery {
        static ROWS_PER_PAGE = 50;
        static newBuilder() {
            return new SecretQueryBuilder(new SecretQuery());
        }
        constructor() { super(); }
        typeId = "";
        folderId = "";
        includeSecretData = false;
        noLogo = false;
        favourite = false;
        domainMatching = false;
        domainMatchingUrl = "";
        recentlyUsed = false;
        recentlyAdded = false;
        classification = FilterType.ALL;
        sharing = FilterType.ALL;
        orderBy = null;
        owned = false;
        tagMode = FilterType.ALL;
        tags = [];
    }
    var SecretQueryOrderBy;
    (function (SecretQueryOrderBy) {
        SecretQueryOrderBy["HOST_RECENT"] = "HOST_RECENT";
        SecretQueryOrderBy["DOMAIN_FAVOURITE"] = "DOMAIN_FAVOURITE";
    })(SecretQueryOrderBy || (SecretQueryOrderBy = {}));
    class SecretQueryBuilder extends PageQueryBuilder {
        constructor(query) { super(query); }
        typeId(typeId) { this.query.typeId = typeId; return this; }
        folderId(folderId) { this.query.folderId = folderId; return this; }
        noLogo(noLogo) { this.query.noLogo = noLogo; return this; }
        orderByHostRecent() { this.query.orderBy = SecretQueryOrderBy.HOST_RECENT; return this; }
        orderByDomainFavourite() { this.query.orderBy = SecretQueryOrderBy.DOMAIN_FAVOURITE; return this; }
        favourite(favourite) { this.query.favourite = favourite; return this; }
        recentlyUsed(recentlyUsed) { this.query.recentlyUsed = recentlyUsed; return this; }
        recentlyAdded(recentlyAdded) { this.query.recentlyAdded = recentlyAdded; return this; }
        domainMatching(domainMatching, url = "") {
            this.query.domainMatching = domainMatching;
            this.query.domainMatchingUrl = url;
            return this;
        }
        sharing(sharing) { this.query.sharing = sharing; return this; }
        classification(classification) { this.query.classification = classification; return this; }
        includeSecretData(include) { this.query.includeSecretData = include; return this; }
        tagMode(tagMode) { this.query.tagMode = tagMode; return this; }
        tags(tags) { this.query.tags = tags; return this; }
        owned(owned) { this.query.owned = owned; return this; }
    }
    class SecretQueryResult extends PageQueryResult {
        query = null;
        secrets = [];
    }

    var ContextMenuActions;
    (function (ContextMenuActions) {
        ContextMenuActions["REQUEST_ACCESS"] = "REQUEST_ACCESS";
        ContextMenuActions["LOGIN"] = "LOGIN";
        ContextMenuActions["FILL"] = "FILL";
        ContextMenuActions["FILL_FIELD"] = "FILL_FIELD";
        ContextMenuActions["FILL_TOTP"] = "FILL_TOTP";
        ContextMenuActions["FILL_ONEAUTH_TOTP"] = "FILL_ONEAUTH_TOTP";
        ContextMenuActions["FILL_CUSTOM_FIELD"] = "FILL_CUSTOM_FIELD";
        ContextMenuActions["SHOW_ALL_PASSWORDS"] = "SHOW_ALL";
        ContextMenuActions["SHOW_ALL_CARDS"] = "SHOW_ALL_CARDS";
        ContextMenuActions["UNLOCK"] = "UNLOCK";
        ContextMenuActions["ADD_PASSWORD"] = "ADD_PASSWORD";
    })(ContextMenuActions || (ContextMenuActions = {}));

    class ContextMenuCreator {
        randomId = Date.now();
        async createUnlockMenu() {
            return brApi.menu.create({
                id: ContextMenuActions.UNLOCK,
                contexts: contextMenu.CONTEXTS,
                title: i18n(VI18N.UNLOCK_ZOHO_VAULT)
            });
        }
        async createRoot() {
            return brApi.menu.create({
                id: contextMenu.ROOT_ID,
                contexts: contextMenu.CONTEXTS,
                title: "Zoho Vault"
            });
        }
        async createSeparator(parentId) {
            try {
                await brApi.menu.create({
                    id: this.nextRandomId(),
                    contexts: [BrContextMenuContextType.ALL],
                    type: BrContextMenuType.SEPARATOR,
                    parentId
                });
            }
            catch (e) {
                logError(e);
            }
        }
        async createAddPassword() {
            return brApi.menu.create({
                id: ContextMenuActions.ADD_PASSWORD,
                contexts: contextMenu.CONTEXTS,
                title: i18n(VI18N.ADD_PASSWORD),
                parentId: contextMenu.ROOT_ID,
            });
        }
        async createShowAllPasswordsMenu() {
            const title = i18n(VI18N.CONTEXT_MENU_SHOW_ALL_PASSWORDS);
            await brApi.menu.create({
                id: ContextMenuActions.SHOW_ALL_PASSWORDS,
                title,
                contexts: contextMenu.CONTEXTS,
                parentId: contextMenu.ROOT_ID
            });
        }
        async createShowAllCardsMenu() {
            const title = i18n(VI18N.CONTEXT_MENU_SHOW_ALL_CARDS);
            await brApi.menu.create({
                id: ContextMenuActions.SHOW_ALL_CARDS,
                title,
                contexts: contextMenu.CONTEXTS,
                parentId: contextMenu.ROOT_ID
            });
        }
        nextRandomId() {
            return (this.randomId++).toString();
        }
    }

    class ContextMenuId {
        separator = ";";
        create(action, ...args) {
            return action + this.separator + args.join(this.separator);
        }
        createFrom(actionArgs) {
            return actionArgs.join(this.separator);
        }
        parse(idString) {
            try {
                return idString.split(this.separator);
            }
            catch (e) {
                logError(e);
                return [""];
            }
        }
    }

    class ContextMenuListener {
        init() {
            js.fn.bindThis(this, [this.handleMenuClick]);
            brApi.menu.onClick(this.handleMenuClick);
        }
        async handleMenuClick(clickData, tab) {
            try {
                const [action, ...args] = contextMenu.idUtil.parse(clickData.menuItemId.toString());
                const secretId = args[0];
                const tabId = tab.id;
                const frameId = clickData.frameId;
                switch (action) {
                    case ContextMenuActions.UNLOCK:
                        sidePanelHandler.open(tab.windowId);
                        break;
                    case ContextMenuActions.ADD_PASSWORD:
                        bg$1.ztabHandler.addPasswordFromTab(tabId, frameId);
                        break;
                    case ContextMenuActions.SHOW_ALL_PASSWORDS:
                        csApi.other.showSiteFrame({ fromContextMenu: true }, { tabId, frameId });
                        break;
                    case ContextMenuActions.SHOW_ALL_CARDS:
                        csApi.other.showCardFrame({ tabId, frameId });
                        break;
                    case ContextMenuActions.REQUEST_ACCESS:
                        bg$1.ztabHandler.getSecretAccess(secretId);
                        break;
                    case ContextMenuActions.LOGIN:
                        bg$1.vaultSecrets.secretLogin.frameLogin(tabId, frameId, secretId);
                        break;
                    case ContextMenuActions.FILL:
                        bg$1.vaultSecrets.secretLogin.frameFill(tabId, frameId, secretId);
                        break;
                    case ContextMenuActions.FILL_FIELD:
                        {
                            const fieldName = args[1];
                            bg$1.vaultSecrets.secretLogin.fillField(tabId, frameId, secretId, fieldName);
                        }
                        break;
                    case ContextMenuActions.FILL_TOTP:
                        bg$1.vaultSecrets.secretLogin.fillTotp(tabId, frameId, secretId);
                        break;
                    case ContextMenuActions.FILL_ONEAUTH_TOTP:
                        {
                            const oneauthId = args[1];
                            bg$1.vaultSecrets.secretLogin.fillOneAuthTotp(tabId, frameId, secretId, oneauthId);
                        }
                        break;
                    case ContextMenuActions.FILL_CUSTOM_FIELD:
                        {
                            const customColId = args[1];
                            bg$1.vaultSecrets.secretLogin.fillCustomCol(tabId, frameId, secretId, customColId);
                        }
                        break;
                    default:
                        throw "UNKNOWN_ACTION: " + action;
                }
                inactivityHandler.updateLastActive();
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class SecretType {
        static FIELD_TYPE = {
            TEXT: "text",
            PASSWORD: "password",
            FILE: "file",
            TEXTAREA: "textarea"
        };
        static DEFAULT = {
            WEB_ACCOUNT: "Web Account",
            BANK_ACCOUNT: "Bank Account",
            WINDOWS: "Windows",
            UNIX: "Unix",
            PAYMENT_CARD: "Payment Card",
            SOCIAL_SECURITY_NUMBER: "Social Security Number",
            HEALTH_CARE: "Health Care",
            FILE_STORE: "File Store",
            ADDRESS: "Address"
        };
        id = "";
        name = "";
        added_by = "";
        enabled = true;
        fields = [];
        text_fields = [];
        password_fields = [];
        ui_fields = [];
        excludeAssessment = false;
    }

    class SecretFieldHistory {
        id = "";
        values = [];
    }
    var SecretClassification;
    (function (SecretClassification) {
        SecretClassification["PERSONAL"] = "P";
        SecretClassification["ENTERPRISE"] = "E";
    })(SecretClassification || (SecretClassification = {}));
    var SecretSharingType;
    (function (SecretSharingType) {
        SecretSharingType["SHARED_BY_ME"] = "SHARED_BY_ME";
        SecretSharingType["SHARED_TO_ME"] = "SHARED_TO_ME";
        SecretSharingType["NONE"] = "NONE";
    })(SecretSharingType || (SecretSharingType = {}));
    class Secret {
        static IS_SHARED = {
            YES: "YES",
            NO: "NO"
        };
        static SHARING_LEVEL = {
            MANAGE: 10,
            LOGIN: 20,
            VIEW: 30,
            MODIFY: 40,
            NONE: -1
        };
        static ACCESS_CTRL_STATUS = {
            NO_REQUEST_FOUND: -1,
            REQUESTED: 0,
            PENDING: 1,
            APPROVED: 2,
            REJECTED: 3,
            CHECK_OUT: 4,
            CHECK_IN: 5,
            REQUEST_TIMED_OUT: 6,
            CANCELED_BY_USER: 7,
            APPROVED_FOR_LATER: 8,
            AUTO_APPROVED: 9,
            IN_USE: 10
        };
        static hasViewPermission(sharingLevel) {
            switch (sharingLevel) {
                case Secret.SHARING_LEVEL.MANAGE:
                case Secret.SHARING_LEVEL.MODIFY:
                case Secret.SHARING_LEVEL.VIEW:
                    return true;
                default:
                    return false;
            }
        }
        static hasEditPermission(sharingLevel) {
            switch (sharingLevel) {
                case Secret.SHARING_LEVEL.MANAGE:
                case Secret.SHARING_LEVEL.MODIFY:
                    return true;
                default:
                    return false;
            }
        }
        static hasManagePermission(sharingLevel) {
            return sharingLevel == Secret.SHARING_LEVEL.MANAGE;
        }
        static hasAccess(secret) {
            try {
                if (!secret) {
                    throw new Error("empty");
                }
                const accessPresent = secret.owned || !secret.access_controlled || (secret.access_request_status == Secret.ACCESS_CTRL_STATUS.CHECK_OUT);
                return accessPresent;
            }
            catch (e) {
                logError(e);
                throw new Error(e);
            }
        }
        id = "";
        name = "";
        name_lowercase = "";
        is_favourite = false;
        shared = false;
        has_totp = false;
        encrypted = {
            notes: "",
            totp: "",
            fields: {},
            custom_columns: [],
            files: []
        };
        sessionEncryptedData = null;
        type_id = "";
        policy_id = "";
        ui_text = "";
        uiFieldName = "";
        logo = "";
        domain_logo = "";
        created_on = 0;
        modifiedOn = 0;
        auto_submit = true;
        urls = [];
        valid_urls = [];
        tags = [];
        description = "";
        classification = SecretClassification.PERSONAL;
        sharing_type = SecretSharingType.NONE;
        sharing_level = Secret.SHARING_LEVEL.NONE;
        access_controlled = false;
        display_access_control_icon = false;
        access_request_status = Secret.ACCESS_CTRL_STATUS.NO_REQUEST_FOUND;
        access_request_id = "";
        user_id = "";
        change_password = false;
        owned = false;
        fetchedOn = 0;
        sort_weight = 0;
        search_words = [];
        highlight_field = "";
        oldValues = null;
        customColumnTypeInfos = null;
        oneauth_id = "";
    }
    class SecretAddPreFillInput {
        name = "";
        logo = "";
        folderId = "";
        newFolderName = "";
        urls = [];
        description = "";
        classification = "";
        texts = [];
        passwords = [];
        typeId = "";
    }
    class CustomColumnTypeInfo {
        static FIELD_TYPE = {
            TEXT: "text",
            PASSWORD: "password",
            FILE: "file",
            TEXTAREA: "textarea"
        };
        id;
        label;
        type;
    }
    class TrashQueryResult extends PageQueryResult {
        query = null;
        secrets = [];
    }
    class SaveFrameData {
        name = "";
        username = "";
        password = "";
        urls = [];
        allowedClassifications = [SecretClassification.PERSONAL, SecretClassification.ENTERPRISE];
    }
    class CSFillValue {
        static FIELD_TYPE = {
            TEXT: SecretType.FIELD_TYPE.TEXT,
            PASSWORD: SecretType.FIELD_TYPE.PASSWORD,
            TOTP: "totp"
        };
        allowedDomains = [];
        type = CSFillValue.FIELD_TYPE.TEXT;
        value = "";
        secretId = "";
        shareLevel = Secret.SHARING_LEVEL.MANAGE;
    }
    class LoginData {
        static STEP = {
            FILL_USERNAME: "FILL_USERNAME",
            FILL_PASSWORD: "FILL_PASSWORD",
            FILL_TOTP: "FILL_TOTP"
        };
        static MAX_REDIRECT_COUNT = 3;
        secretId = "";
        allowedDomains = [];
        texts = [];
        passwords = [];
        passwordFieldNames = [];
        shareLevel = Secret.SHARING_LEVEL.MANAGE;
        hasTotp = false;
        submit = false;
        step = LoginData.STEP.FILL_USERNAME;
        redirectedCount = 0;
        oneauthId = "";
    }

    class SecretMenuCreator {
        menuCreator = new SecretSubMenuCreator(this);
        secretTypeFillCreator = new SecretTypeFillMenuCreator(this);
        customFieldsFillCreator = new CustomFieldsFillMenuCreator(this);
        title = new TitleProvider(this);
        secret = null;
        async init() {
            try {
                await this.secretTypeFillCreator.init();
            }
            catch (e) {
                logError(e);
            }
        }
        getSecret() {
            return this.secret;
        }
        async create(secret) {
            try {
                if (!secret) {
                    throw ErrorCode.INVALID_INPUT;
                }
                this.secret = secret;
                if (!this.hasAccess()) {
                    await this.menuCreator.createRoot([ContextMenuActions.REQUEST_ACCESS, this.secret.id], this.title.formatTitle(i18n(VI18N.REQUEST_ACCESS)));
                    return;
                }
                await this.menuCreator.createRoot([this.secret.id], await this.title.getSecretTitle());
                await this.menuCreator.create([ContextMenuActions.LOGIN, secret.id], i18n(VI18N.LOGIN));
                const hasViewPermission = Secret.hasViewPermission(secret.sharing_level);
                if (hasViewPermission) {
                    await this.menuCreator.create([ContextMenuActions.FILL, secret.id], i18n(VI18N.FILL));
                    await this.secretTypeFillCreator.createMenus();
                }
                if (this.secret.has_totp) {
                    await this.menuCreator.create([ContextMenuActions.FILL_TOTP, this.secret.id], i18n(VI18N.FILL) + " TOTP");
                }
                if (secret.oneauth_id) {
                    await this.menuCreator.create([ContextMenuActions.FILL_ONEAUTH_TOTP, this.secret.id, this.secret.oneauth_id], i18n(VI18N.FILL) + " OneAuth TOTP");
                }
                if (hasViewPermission) {
                    await this.customFieldsFillCreator.createMenus();
                }
            }
            catch (e) {
                logError(e);
            }
        }
        hasAccess() {
            return !this.secret.access_controlled || (this.secret.access_request_status == Secret.ACCESS_CTRL_STATUS.CHECK_OUT);
        }
    }
    class SecretTypeFillMenuCreator {
        p;
        secretTypeMap = null;
        constructor(p) {
            this.p = p;
        }
        async init() {
            try {
                this.secretTypeMap = await accountDb.secretTypeTable.loadMap();
            }
            catch (e) {
                logError(e);
            }
        }
        async createMenus() {
            try {
                const secret = this.p.getSecret();
                const secretType = this.secretTypeMap[secret.type_id];
                const FIELD_TYPE = SecretType.FIELD_TYPE;
                const validFields = secretType.fields.filter(x => !x.isDeleted && (x.type == FIELD_TYPE.TEXT || x.type == FIELD_TYPE.PASSWORD));
                if (!validFields.length) {
                    return;
                }
                await this.p.menuCreator.createSeparator();
                for (let field of validFields) {
                    await this.p.menuCreator.create([ContextMenuActions.FILL_FIELD, secret.id, field.name], i18n(VI18N.FILL) + " " + field.label);
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class CustomFieldsFillMenuCreator {
        p;
        constructor(p) {
            this.p = p;
        }
        async createMenus() {
            try {
                const secret = this.p.getSecret();
                const allCustomColInfo = secret.customColumnTypeInfos;
                if (!allCustomColInfo || allCustomColInfo.length == 0) {
                    return;
                }
                await this.p.menuCreator.createSeparator();
                for (let column of allCustomColInfo) {
                    await this.p.menuCreator.create([ContextMenuActions.FILL_CUSTOM_FIELD, secret.id, column.id], i18n(VI18N.FILL) + " " + column.label);
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class TitleProvider {
        p;
        constructor(p) {
            this.p = p;
        }
        async getSecretTitle() {
            const secret = this.p.getSecret();
            const username = await bg$1.zcrypt.decrypt(secret.ui_text, secret.shared);
            return this.formatTitle(username);
        }
        formatTitle(msg) {
            return `${this.getStarName()} (${msg})`;
        }
        getStarName() {
            const secret = this.p.getSecret();
            const starCodePoint = secret.is_favourite ? 0x2605 : 0x2606;
            return String.fromCodePoint(starCodePoint) + " " + secret.name;
        }
    }
    class SecretSubMenuCreator {
        p;
        constructor(p) {
            this.p = p;
        }
        async create(id, title) {
            return brApi.menu.create({ id: contextMenu.idUtil.createFrom(id), parentId: this.p.getSecret().id, contexts: contextMenu.CONTEXTS, title });
        }
        async createRoot(id, title) {
            return brApi.menu.create({ id: contextMenu.idUtil.createFrom(id), parentId: contextMenu.ROOT_ID, contexts: contextMenu.CONTEXTS, title });
        }
        async createSeparator() {
            return contextMenu.menuCreator.createSeparator(this.p.getSecret().id);
        }
    }

    class ContextMenu {
        MAX_CONTEXT_MENU_SECRET = 40;
        menuCreator = new ContextMenuCreator();
        secretMenuCreator = new SecretMenuCreator();
        listener = new ContextMenuListener();
        idUtil = new ContextMenuId();
        ROOT_ID = "ZohoVault";
        CONTEXTS = ["all"];
        init() {
            this.listener.init();
            this.changeState = js.fn.wrapper.createSingleInstListener(this.changeState, this);
        }
        async changeState(state) {
            try {
                await brApi.menu.removeAll();
                switch (state) {
                    case VtLoginState.LOGGED_OUT:
                        return;
                    case VtLoginState.LOCKED:
                        await this.menuCreator.createUnlockMenu();
                        return;
                    case VtLoginState.UNLOCKED:
                        await this.addUnlockedStateMenus();
                        return;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async addUnlockedStateMenus() {
            try {
                await this.menuCreator.createRoot();
                const secrets = await this.getSecrets();
                await this.addSecretsMenus(secrets);
                await this.menuCreator.createAddPassword();
            }
            catch (e) {
                logError(e);
            }
        }
        async getSecrets() {
            try {
                const activeTab = await brApi.tab.getActiveTab();
                if (!activeTab) {
                    return [];
                }
                const secretQuery = SecretQuery.newBuilder()
                    .rowsPerPage(this.MAX_CONTEXT_MENU_SECRET)
                    .domainMatching(true, activeTab.url)
                    .noLogo(true)
                    .orderByHostRecent()
                    .build();
                const secretQueryResult = await bg$1.vaultSecrets.secretQuerier.query(secretQuery);
                const secrets = secretQueryResult.secrets;
                return secrets;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async addSecretsMenus(secrets) {
            try {
                if (!secrets) {
                    throw ErrorCode.INVALID_INPUT;
                }
                if (secrets.length == 0) {
                    return;
                }
                await this.menuCreator.createShowAllPasswordsMenu();
                await this.menuCreator.createSeparator(this.ROOT_ID);
                await this.secretMenuCreator.init();
                for (let secret of secrets) {
                    await this.secretMenuCreator.create(secret);
                }
                await this.menuCreator.createSeparator(this.ROOT_ID);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    let badgeMenuHandler$1 = null;
    let badge = null;
    let contextMenu = null;
    function initContext$3() {
        badgeMenuHandler$1 = new BadgeMenuHandler();
        badge = new Badge();
        contextMenu = new ContextMenu();
    }

    class AddressBarQuerierImpl {
        getMatchingIdsHostnameFnProvider = new GetMatchingIdsHostnameFnProvider();
        getMatchingIdsParentDomainFnProvider = new GetMatchingIdsParentDomainFnProvider();
        recentMap = new Map();
        isUnlocked = false;
        init() {
            js.fn.bindThis(this, [this.sortByRecentUse]);
        }
        async query(query) {
            try {
                const result = {
                    secrets: [],
                    idDomainMap: new Map(),
                };
                this.isUnlocked = await bg.vault.isUnlocked();
                const secrets = await this.getMatchingSecrets(query, result);
                if (secrets.length == 0) {
                    return result;
                }
                await this.orderByRecent(secrets);
                result.secrets = secrets.slice(0, query.limit);
                return result;
            }
            catch (e) {
                logError(e);
                return {
                    secrets: [],
                    idDomainMap: new Map(),
                };
            }
        }
        clearCache() {
            try {
                this.recentMap.clear();
            }
            catch (e) {
                logError(e);
            }
        }
        async getMatchingSecrets(query, result) {
            try {
                const secrets = await this.getMatchingSecretsFn(query, result, this.getMatchingIdsHostnameFnProvider);
                if (secrets.length >= query.limit) {
                    return secrets;
                }
                const domainSecrets = await this.getMatchingSecretsFn(query, result, this.getMatchingIdsParentDomainFnProvider);
                return js.array.getUniqueObjList(secrets.concat(domainSecrets), x => x.id);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async getMatchingSecretsFn(query, result, fnProvider) {
            try {
                const ids = await this.getMatchingIdsFromDb(query, result, fnProvider);
                const secrets = await accountDb.secretTable.getList(ids);
                if (!this.isUnlocked || !query.usernamePrefix) {
                    return secrets;
                }
                return await this.getFilteredSecrets(secrets, query);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async getFilteredSecrets(secrets, query) {
            try {
                const a = [];
                for (let secret of secrets) {
                    if (!(await this.isUsernameMatching(secret, query.usernamePrefix))) {
                        continue;
                    }
                    a.push(secret);
                }
                return a;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async isUsernameMatching(secret, prefix) {
            try {
                if (!secret.ui_text) {
                    return false;
                }
                const uiText = await bg.zcrypt.decrypt(secret.ui_text, secret.shared);
                return uiText.startsWith(prefix);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async orderByRecent(secretList) {
            try {
                if (this.recentMap.size == 0) {
                    this.recentMap = await accountDb.recentSecretTable.getMap();
                }
                secretList.sort(this.sortByRecentUse);
            }
            catch (e) {
                logError(e);
            }
        }
        sortByRecentUse(x, y) {
            const xIndex = this.recentMap.has(x.id) ? this.recentMap.get(x.id) : -1;
            const yIndex = this.recentMap.has(y.id) ? this.recentMap.get(y.id) : -1;
            return (yIndex - xIndex);
        }
        async getMatchingIdsFromDb(query, result, fnProvider) {
            try {
                const rowList = await fnProvider.loadAllRows();
                const reqIds = [];
                let domain = "";
                for (let row of rowList) {
                    domain = fnProvider.getDomain(row);
                    if (!domain.startsWith(query.urlPrefix)) {
                        continue;
                    }
                    reqIds.push(...row.ids);
                    fnProvider.setMatchType(reqIds, domain, result);
                }
                return reqIds;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
    }
    class GetMatchingIdsFnProvider {
    }
    class GetMatchingIdsHostnameFnProvider extends GetMatchingIdsFnProvider {
        loadAllRows() {
            return accountDb.hostnameSecretsTable.loadAll();
        }
        getDomain(row) {
            return row.hostname;
        }
        setMatchType(idList, domain, result) {
            for (let id of idList) {
                result.idDomainMap.set(id, { domain, type: URL_Part.HOSTNAME });
            }
        }
    }
    class GetMatchingIdsParentDomainFnProvider extends GetMatchingIdsFnProvider {
        loadAllRows() {
            return accountDb.parentDomainSecretsTable.loadAll();
        }
        getDomain(row) {
            return row.domain;
        }
        setMatchType(idList, domain, result) {
            for (let id of idList) {
                if (result.idDomainMap.has(id)) {
                    continue;
                }
                result.idDomainMap.set(id, { domain, type: URL_Part.DOMAIN });
            }
        }
    }

    class DomainParser {
        getMapping(url) {
            try {
                if (!js.url.isValid(url)) {
                    return null;
                }
                const result = {
                    domain: "",
                    parentDomain: "",
                    hostname: ""
                };
                const urlObj = new URL(url);
                result.hostname = urlObj.hostname;
                result.parentDomain = js.url.getParentDomainFromHostName(urlObj.hostname);
                result.domain = this.getDomain(urlObj, result);
                return result;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        mapUrl(url) {
            try {
                const mapping = this.getMapping(url);
                return mapping?.domain || "";
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        getDomain(urlObj, result) {
            try {
                const parts = [];
                const mode = domainHandler$1.mode;
                if (mode.scheme) {
                    parts.push(urlObj.protocol);
                }
                parts.push(mode.subDomain ? urlObj.hostname : result.parentDomain);
                if (mode.port) {
                    parts.push(urlObj.port);
                }
                if (mode.path) {
                    parts.push(urlObj.pathname);
                }
                return parts.join("@@");
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
    }

    class DomainRowMapper {
        domainIdsMap = js.map.createNew({ defaultProvider: () => new Set() });
        parentDomainIdsMap = js.map.createNew({ defaultProvider: () => new Set() });
        hostnameIdsMap = js.map.createNew({ defaultProvider: () => new Set() });
        parse(secrets) {
            try {
                for (let secret of secrets) {
                    this.parseSecret(secret);
                }
                const result = {
                    domainRows: this.getDomainSecretTableRows(this.domainIdsMap),
                    parentDomainRows: this.getDomainSecretTableRows(this.parentDomainIdsMap),
                    hostnameRows: this.getHostnameTableRows(this.hostnameIdsMap),
                };
                return result;
            }
            catch (e) {
                logError(e);
                return {
                    domainRows: [],
                    parentDomainRows: [],
                    hostnameRows: []
                };
            }
        }
        getDomainSecretTableRows(mapObj) {
            try {
                const rows = [];
                for (let [domain, secretIdSet] of mapObj.map.entries()) {
                    rows.push({ domain, ids: js.array.toArray(secretIdSet) });
                }
                return rows;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        getHostnameTableRows(mapObj) {
            try {
                const rows = [];
                for (let [hostname, secretIdSet] of mapObj.map.entries()) {
                    rows.push({ hostname, ids: js.array.toArray(secretIdSet) });
                }
                return rows;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        parseSecret(secret) {
            try {
                for (let url of secret.valid_urls) {
                    this.parseSecretUrl(secret, url);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        parseSecretUrl(secret, url) {
            try {
                const mappingObj = domainHandler$1.parser.getMapping(url);
                if (!mappingObj?.domain) {
                    return;
                }
                this.domainIdsMap.getOrDefaultAdded(mappingObj.domain).add(secret.id);
                this.parentDomainIdsMap.getOrDefaultAdded(mappingObj.parentDomain).add(secret.id);
                this.hostnameIdsMap.getOrDefaultAdded(mappingObj.hostname).add(secret.id);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class DomainHandlerImpl {
        mode;
        parser = new DomainParser();
        addressBarQuerier = new AddressBarQuerierImpl();
        async init() {
            try {
                this.getDomainMatchingIdsFor = js.fn.wrapper.createSingleInstance(this.getDomainMatchingIdsFor, this);
                this.addressBarQuerier.init();
                this.mode = await this.loadDomainMatchMode();
                await badgeMenuHandler$1.init();
            }
            catch (e) {
                logError(e);
            }
        }
        async modeChanged() {
            try {
                this.mode = await this.loadDomainMatchMode();
                await this.reCreate();
            }
            catch (e) {
                logError(e);
            }
        }
        async addAll(secrets) {
            try {
                const rowsObj = await new DomainRowMapper().parse(secrets);
                accountDb.urlDomainPathTable.saveAll(secrets, true);
                await Promise.all([
                    accountDb.domainSecretsTable.saveAll(rowsObj.domainRows, true),
                    accountDb.parentDomainSecretsTable.saveAll(rowsObj.parentDomainRows, true),
                    accountDb.hostnameSecretsTable.saveAll(rowsObj.hostnameRows, true),
                ]);
            }
            catch (e) {
                logError(e);
            }
        }
        async add(_secret) {
            return this.reCreate();
        }
        async getDomainMatchingIds(params) {
            try {
                if (params.url) {
                    return this.getDomainMatchingIdsFor(params.url);
                }
                const activeTab = await brApi.tab.getActiveTab();
                if (!activeTab) {
                    return [];
                }
                return this.getDomainMatchingIdsFor(activeTab.url);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async getDomainMatchingCount() {
            try {
                const secretIds = await this.getDomainMatchingIds({});
                return secretIds.length;
            }
            catch (e) {
                logError(e);
                return 0;
            }
        }
        async isDomainMatchingId(secretId, url) {
            try {
                const ids = await this.getDomainMatchingIdsFor(url);
                return ids.includes(secretId);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        mapUrl(url) {
            return this.parser.mapUrl(url);
        }
        async isLoginDomainPath(url) {
            try {
                if (!url) {
                    return false;
                }
                const urlObj = new URL(url);
                const paths = await accountDb.urlDomainPathTable.load(urlObj.hostname);
                return paths.includes(urlObj.pathname);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async getDomainMatchingIdsFor(url) {
            try {
                if (!js.url.isValid(url)) {
                    return [];
                }
                const domain = this.parser.mapUrl(url);
                return await accountDb.domainSecretsTable.load(domain);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async reCreate() {
            try {
                const secrets = await accountDb.secretTable.loadAll();
                await this.addAll(secrets);
                await badgeMenuHandler$1.refresh();
            }
            catch (e) {
                logError(e);
            }
        }
        async loadDomainMatchMode() {
            const defaultModeObj = {
                scheme: false,
                subDomain: false,
                port: false,
                path: false,
            };
            try {
                const existing = await zlocalStorage.load(LocalStorageKeys.DOMAIN_MATCH_MODE, "");
                if (existing) {
                    return existing;
                }
                const domainMatchingMode = await zlocalStorage.load(LocalStorageKeys.DOMAIN_MATCHING_MODE_OLD, zenum.DOMAIN_MATCHING_MODE.PARENT_DOMAIN);
                return {
                    subDomain: domainMatchingMode == zenum.DOMAIN_MATCHING_MODE.HOSTNAME
                };
            }
            catch (e) {
                logError(e);
                return defaultModeObj;
            }
        }
    }

    let domainHandler$1 = null;
    function initContext$2() {
        domainHandler$1 = new DomainHandlerImpl();
    }

    function main$1() {
        initContext$2();
        globalThis.domainHandler = domainHandler$1;
    }

    class AddressBarHandlerImpl {
        updateSuggestion = null;
        query = {
            urlPrefix: "",
            usernamePrefix: "",
            limit: 10
        };
        includeUsername = false;
        defaultSuggestionContent = "";
        suggestionHighlighter = null;
        queryResult = null;
        init() {
            try {
                const browser = config.get(ConfigKeys.BROWSER);
                this.suggestionHighlighter = browser == Browser.FIREFOX ? new FirefoxSuggestionHighlighter() : new ChromeSuggestionHighlighter();
                js.fn.bindThis(this, [this.onInputChanged, this.onInputEntered]);
                this.updateResults = js.fn.wrapper.createSingleInstListener(this.updateResults, this);
                brApi.omnibox.onInputStarted(() => domainHandler.addressBarQuerier.clearCache());
                brApi.omnibox.onInputChanged(this.onInputChanged);
                brApi.omnibox.onInputEntered(this.onInputEntered);
            }
            catch (e) {
                logError(e);
            }
        }
        onInputChanged(searchString, callback) {
            try {
                this.updateSuggestion = callback;
                this.updateSearchString(searchString);
                this.updateResults();
            }
            catch (e) {
                logError(e);
            }
        }
        updateSearchString(s) {
            try {
                const terms = s.split(/\s+/);
                this.query.urlPrefix = terms[0];
                this.query.usernamePrefix = terms.length > 1 ? terms[1] : "";
            }
            catch (e) {
                logError(e);
            }
        }
        async onInputEntered(text, tabType) {
            try {
                text = text.trim();
                if (!text) {
                    return;
                }
                const parts = this.getInputParts(text);
                if (parts.length < 2) {
                    return;
                }
                const [url, secretId] = parts;
                const tab = await this.getTab(tabType);
                const loginInput = { secretId, url, tabId: tab.id, showLoading: true };
                if (await bg.vault.isUnlocked()) {
                    await bg.vaultSecrets.secretLogin.login(loginInput);
                    return;
                }
                await postUnlockTaskHandler.loginAfterUnlock(loginInput);
                await bg.unlockTabHandler.create();
            }
            catch (e) {
                logError(e);
            }
        }
        isValildSecretId(id) {
            try {
                return this.queryResult.secrets.some(x => x.id == id);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async getTab(type) {
            try {
                switch (type) {
                    case "currentTab":
                        return brApi.tab.getActiveTab();
                    case "newForegroundTab":
                        return brApi.tab.create("");
                    case "newBackgroundTab":
                        return brApi.tab.createTab({ url: "", background: true });
                }
            }
            catch (e) {
                logError(e);
                return brApi.tab.getActiveTab();
            }
        }
        getInputParts(text) {
            try {
                const parts = text.split(/ +/);
                if (parts.length == 0) {
                    throw "PARTS_OF_LENGTH_0";
                }
                switch (parts.length) {
                    case 0:
                        throw "PARTS_OF_LENGTH_0";
                    case 1:
                        return this.defaultSuggestionContent.split(/ +/);
                }
                const secretId = parts[1];
                if (!this.isValildSecretId(secretId)) {
                    return this.defaultSuggestionContent.split(/ +/);
                }
                return parts;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async updateResults() {
            try {
                this.includeUsername = await bg.vault.isUnlocked();
                const result = this.queryResult = await domainHandler.addressBarQuerier.query(this.query);
                const suggestions = [];
                for (let secret of result.secrets) {
                    await this.addSuggestion(secret, result, suggestions);
                }
                this.updateDefaultSuggestion(suggestions);
                this.updateSuggestion(suggestions.slice(1, suggestions.length));
            }
            catch (e) {
                logError(e);
            }
        }
        updateDefaultSuggestion(suggestions) {
            try {
                if (suggestions.length == 0) {
                    brApi.omnibox.setDefaultSuggestion({ description: i18n(VI18N.NO_MATCHING_PASSWORDS_FOUND) });
                    this.defaultSuggestionContent = "";
                    return;
                }
                this.defaultSuggestionContent = suggestions[0].content;
                brApi.omnibox.setDefaultSuggestion({ description: suggestions[0].description });
            }
            catch (e) {
                logError(e);
            }
        }
        async addSuggestion(secret, result, list) {
            try {
                const context = {
                    result,
                    secret,
                    urlIndex: 0
                };
                const suggestion = await this.getSuggestion(context);
                if (!suggestion) {
                    return;
                }
                list.push(suggestion);
            }
            catch (e) {
                logError(e);
            }
        }
        async getSuggestion(context) {
            try {
                const { secret, result } = context;
                context.urlIndex = this.getMatchingUrlIndex(secret, result);
                const content = await this.getSuggestionContent(context);
                if (!content) {
                    return null;
                }
                const description = await this.getSuggestionDescription(context);
                if (!description) {
                    return null;
                }
                const suggestion = {
                    content,
                    description
                };
                return suggestion;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getMatchingUrlIndex(secret, result) {
            try {
                if (!this.query.urlPrefix) {
                    return 0;
                }
                const matchFn = this.getMatchFn(result.idDomainMap.get(secret.id));
                for (let i = 0; i < secret.valid_urls.length; i++) {
                    if (matchFn(secret.valid_urls[i])) {
                        return i;
                    }
                }
                throw "NO_URL_MATCH";
            }
            catch (e) {
                logError(e);
                return 0;
            }
        }
        getMatchFn(match) {
            try {
                switch (match.type) {
                    case URL_Part.HOSTNAME:
                        return this.isHostnameMatching.bind(null, match.domain);
                    case URL_Part.DOMAIN:
                        return this.isDomainMatching.bind(null, match.domain);
                    default:
                        throw "NEW_CASE";
                }
            }
            catch (e) {
                logError(e);
                return this.isHostnameMatching;
            }
        }
        isHostnameMatching(hostname, url) {
            try {
                return js.url.getHostName(url).startsWith(hostname);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        isDomainMatching(domain, url) {
            try {
                return js.url.getParentDomain(url).startsWith(domain);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async getSuggestionContent(context) {
            try {
                const { secret, urlIndex } = context;
                return `${secret.valid_urls[urlIndex]} ${secret.id}`;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async getSuggestionDescription(context) {
            try {
                const { secret } = context;
                const SEPARATOR = " - ";
                const parts = [secret.name];
                if (this.includeUsername) {
                    const username = await bg.zcrypt.decrypt(secret.ui_text, secret.shared);
                    parts.push(SEPARATOR + this.suggestionHighlighter.getHighlightedUsername(username, this.query));
                }
                parts.push(SEPARATOR + this.suggestionHighlighter.getHighlightedUrl(context, this.query));
                return parts.join("");
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
    }
    class ChromeSuggestionHighlighter {
        getHighlightedUrl(context, query) {
            const { secret, urlIndex } = context;
            const escapedSearchString = js.other.escapeXml(query.urlPrefix);
            const escapedSuffix = js.other.escapeXml(this.getUrlMatchSuffix(secret.valid_urls[urlIndex], query.urlPrefix));
            return "<url><match>" + escapedSearchString + "</match>" + escapedSuffix + "</url>";
        }
        getHighlightedUsername(username, query) {
            const escapedUsernamePrefix = js.other.escapeXml(query.usernamePrefix);
            return "<match>" + escapedUsernamePrefix + "</match>" + username.slice(query.usernamePrefix.length);
        }
        getUrlMatchSuffix(url, searchString) {
            try {
                const urlMatchIndex = url.indexOf(searchString);
                return url.slice(urlMatchIndex + searchString.length);
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
    }
    class FirefoxSuggestionHighlighter {
        getHighlightedUrl(context, _query) {
            return context.secret.valid_urls[context.urlIndex];
        }
        getHighlightedUsername(username, _query) {
            return username;
        }
    }

    class AlarmHandler {
        static instance = null;
        static getInstance() {
            if (!this.instance) {
                this.instance = new AlarmHandler();
            }
            return this.instance;
        }
        static ALARM = {
            CLEAR_CLIPBOARD: "CLEAR_CLIPBOARD",
            INACTIVITY_ALARM: "INACTIVITY_ALARM",
            OAUTH_REFRESH_ALARM: "OAUTH_REFRESH_ALARM",
            PERIODIC_INACTIVITY_ALARM: "PERIODIC_INACTIVITY_ALARM"
        };
        init() {
            js.fn.bindThis(this, [this.handleAlarm]);
            brApi.alarm.listenAlarms(this.handleAlarm);
        }
        handleAlarm({ name = "" }) {
            if (!bg$1.initialized) {
                return;
            }
            info("handling alarm: ", name);
            const ALARM = AlarmHandler.ALARM;
            switch (name) {
                case ALARM.CLEAR_CLIPBOARD:
                    bg$1.clipboard.clear();
                    break;
                case ALARM.OAUTH_REFRESH_ALARM:
                    oauth.autoRefreshToken();
                    break;
                case ALARM.PERIODIC_INACTIVITY_ALARM:
                case ALARM.INACTIVITY_ALARM:
                    inactivityHandler.checkActivity();
                    break;
            }
        }
    }

    const frameUrls = {
        CONFIRM_FRAME: "/html/tab/ConfirmFrame.html",
        RESET_FRAME: "/html/tab/ResetFrame.html",
        SAVE_FRAME: "/html/tab/SaveFrame.html",
        SITE_FRAME: "/html/tab/SiteFrame.html",
        UPDATE_FRAME: "/html/tab/UpdateFrame.html",
        CARD_FRAME: "/html/tab/ZVaultCardsList.html",
        ADDRESS_FRAME: "/html/tab/ZVaultAddressList.html",
        SAVE_CARD_FRAME: "/html/tab/ZVaultSaveCard.html",
        ALERT_FRAME: "/html/tab/Alert.html",
        LOADING_PAGE: "/html/loading.html",
    };

    class DevToolHandler {
        devToolChecker = new DevToolChecker();
        skipTabCheck = false;
        async init() {
            try {
                js.fn.bindThis(this, [this.onTabCreated]);
                brApi.tab.onTabCreate(this.onTabCreated);
                this.initSkipTabCheck();
            }
            catch (e) {
                logError(e);
            }
        }
        async initSkipTabCheck() {
            try {
                this.skipTabCheck = (await zlocalStorage.load(LocalStorageKeys.SKIP_ONE_CLICK_TAB_CHECK, STRING.FALSE)) == STRING.TRUE;
            }
            catch (e) {
                logError(e);
            }
        }
        async devToolsOpened(tabId) {
            try {
                await bgStorage.tab.save(tabId, TabStorageKeys.OPENED_DEV_TOOLS, true);
            }
            catch (e) {
                logError(e);
            }
        }
        async isValidTab(tabId) {
            try {
                if (this.skipTabCheck) {
                    return true;
                }
                const openedDevTools = await bgStorage.tab.load(tabId, TabStorageKeys.OPENED_DEV_TOOLS, null);
                return openedDevTools === false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async isDevToolsOpen(tabId) {
            return this.devToolChecker.isDevToolsOpen(tabId);
        }
        async closeTab(tabId) {
            try {
                await brApi.tab.closeTab(tabId);
                await this.showTabClosedMessage();
            }
            catch (e) {
                logError(e);
            }
        }
        async browserStarted() {
            try {
                const tabs = await brApi.tab.getAllTabs();
                for (let tab of tabs) {
                    await this.markValidTab(tab);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async showTabClosedMessage() {
            try {
                const tab = await brApi.tab.create(frameUrls.LOADING_PAGE);
                await brApi.tab.getCompletedTab(tab.id);
                await bgStorage.tab.save(tab.id, TabStorageKeys.ALERT_CONFIG, { message: i18n(VI18N.DEV_TOOLS_TAB_CLOSED) });
                await brApi.tab.updateTab(tab.id, { url: frameUrls.ALERT_FRAME });
            }
            catch (e) {
                logError(e);
            }
        }
        async onTabCreated(tab) {
            this.markValidTab(tab);
        }
        async markValidTab(tab) {
            try {
                await bgStorage.tab.save(tab.id, TabStorageKeys.OPENED_DEV_TOOLS, false);
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class DevToolChecker {
        async isDevToolsOpen(tabId) {
            try {
                const useOldCheck = (await zlocalStorage.load(LocalStorageKeys.USE_OLD_DEVTOOLS_CHECK, STRING.FALSE)) == STRING.TRUE;
                if (useOldCheck) {
                    return this.hasDevPage(tabId);
                }
                const checks = await Promise.all([
                    this.hasDevPage(tabId),
                    this.hasDevWindow(),
                ]);
                return checks.some(x => x);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async hasDevPage(tabId) {
            try {
                const promise = js.promise.createTimed(0.1);
                brApi.runtime.sendMessage({ fn_name: "is_dev_tools_open", args: [tabId] })
                    .then(x => promise.resolve(x), () => promise.resolve(false));
                return await promise;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async hasDevWindow() {
            try {
                const windows = await brApi.windows.query({ windowTypes: [BrWindowTypes.DEV_TOOLS] });
                return windows.length > 0;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class InactivityHandler {
        static instance = null;
        static getInstance() {
            if (!this.instance) {
                this.instance = new InactivityHandler();
            }
            return this.instance;
        }
        init() {
            js.fn.bindThis(this, [this.idleStateChanged, this.checkActivity]);
            brApi.idle.onIdle(this.idleStateChanged);
        }
        async createAlarms() {
            if (brApi.isV2()) {
                return;
            }
            chrome.alarms.create(AlarmHandler.ALARM.PERIODIC_INACTIVITY_ALARM, {
                delayInMinutes: 1,
                periodInMinutes: 1
            });
        }
        async clearAlarms() {
            if (brApi.isV2()) {
                return;
            }
            chrome.alarms.clear(AlarmHandler.ALARM.PERIODIC_INACTIVITY_ALARM);
        }
        async updateLastActive() {
            try {
                await zsessionStorage.save(SessionStorageKeys.LAST_ACTIVE, Date.now());
                await zlocalStorage.save(LocalStorageKeys.LAST_ACTIVE, Date.now());
            }
            catch (e) {
                logError(e);
            }
        }
        async synced() {
            await this.updateLastActive();
            this.checkActivity();
            await this.updateDetectionInterval();
        }
        async checkActivity() {
            if (!bg$1.initialized) {
                return;
            }
            const unlocked = await bg$1.vault.isUnlocked();
            if (!unlocked) {
                return;
            }
            const secondsLeft = await this.getRemainingSeconds();
            if (secondsLeft > 60) {
                brApi.alarm.createAlarm(AlarmHandler.ALARM.INACTIVITY_ALARM, secondsLeft);
                return;
            }
            if (globalThis.isDevMode) {
                return;
            }
            bg$1.vault.lock();
        }
        async updateDetectionInterval() {
            const inactivityTimeout = await zlocalStorage.load(LocalStorageKeys.INACTIVE_TIMEOUT, 30);
            brApi.idle.setDetectionIntervalSeconds(inactivityTimeout * 60);
        }
        async getRemainingSeconds() {
            try {
                const lastActive = await zsessionStorage.load(SessionStorageKeys.LAST_ACTIVE, 0);
                const inactivityTimeout = await zlocalStorage.load(LocalStorageKeys.INACTIVE_TIMEOUT, 30);
                const secondsLeft = (+inactivityTimeout * 60) - js.time.getSecondsPassed(lastActive);
                return secondsLeft;
            }
            catch (e) {
                logError(e);
                return 0;
            }
        }
        idleStateChanged(newState) {
            const STATE = BrIdleState;
            switch (newState) {
                case STATE.ACTIVE:
                    this.checkActivity();
                    break;
                case STATE.IDLE:
                    this.checkActivity();
                    break;
                case STATE.LOCKED:
                    this.lockOnSystemLock();
                    break;
            }
        }
        async lockOnSystemLock() {
            try {
                const lockExtension = await zlocalStorage.load(VtSettings.LOCK_ON_SYSTEM_LOCK, false);
                if (lockExtension) {
                    bg$1.vault.lock();
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class InstallHandlerImpl {
        init() {
            try {
                brApi.runtime.onInstall(this.handleInstalled.bind(this));
            }
            catch (e) {
                logError(e);
            }
        }
        handleInstalled(installInfo) {
            try {
                switch (installInfo.reason) {
                    case "install":
                        this.installed();
                        break;
                    case "update":
                        this.updated(installInfo.previousVersion);
                        break;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async installed() {
        }
        async updated(_previousVersion) {
            try {
                zlocalStorage.remove("REFRESH_TOKEN");
            }
            catch (e) {
                logError(e);
            }
        }
    }

    var PostUnlockTaskType;
    (function (PostUnlockTaskType) {
        PostUnlockTaskType["LOGIN"] = "LOGIN";
    })(PostUnlockTaskType || (PostUnlockTaskType = {}));
    class PostUnlockTaskHandlerImpl {
        async loginAfterUnlock(input) {
            try {
                const task = {
                    type: PostUnlockTaskType.LOGIN,
                    data: input
                };
                await zsessionStorage.save(SessionStorageKeys.POST_UNLOCK_TASK, task);
            }
            catch (e) {
                logError(e);
            }
        }
        async executePostUnlockTask() {
            try {
                const task = await zsessionStorage.load(SessionStorageKeys.POST_UNLOCK_TASK, {});
                switch (task.type) {
                    case PostUnlockTaskType.LOGIN:
                        await bg.vaultSecrets.secretLogin.login(task.data);
                        return;
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class SidePanelHandlerImpl {
        init() {
        }
        open(windowId, opener = null) {
            try {
                brApi.sidePanel.open({ windowId });
                zsessionStorage.save(SessionStorageKeys.SIDE_PANEL_OPENED_FROM, opener);
                this.openFn();
            }
            catch (e) {
                logError(e);
            }
        }
        async closed() {
            try {
                if (!(await bg$1.vault.isUnlocked())) {
                    return;
                }
                const opener = await zsessionStorage.load(SessionStorageKeys.SIDE_PANEL_OPENED_FROM, null);
                if (!opener) {
                    return;
                }
                await js.time.delay(0.1);
                await csApi.other.showSiteFrame({}, opener);
            }
            catch (e) {
                logError(e);
            }
        }
        async openFn() {
            try {
                const supported = await this.isSupported();
                if (!supported) {
                    bg$1.unlockTabHandler.create();
                    return;
                }
                await js.time.delay(1);
                const opened = (await bgUtil.getClients()).some(x => x.url.includes("sidePanel.html"));
                if (opened) {
                    return;
                }
                bg$1.unlockTabHandler.create();
                zlocalStorage.save(LocalStorageKeys.SIDE_PANEL_SUPPORTED, false);
            }
            catch (e) {
                logError(e);
            }
        }
        async isSupported() {
            try {
                const browser = config.get(ConfigKeys.BROWSER);
                switch (browser) {
                    case Browser.FIREFOX:
                    case Browser.SAFARI:
                    case Browser.OPERA:
                        return false;
                }
                const isSupported = await zlocalStorage.load(LocalStorageKeys.SIDE_PANEL_SUPPORTED, true);
                if (!isSupported) {
                    return false;
                }
                return brApi.sidePanel.isSupported();
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class StartupHandler {
        init() {
            try {
                brApi.runtime.onStartup(this.onStartup.bind(this));
            }
            catch (e) {
                logError(e);
            }
        }
        onStartup() {
            try {
                devToolsHandler.browserStarted();
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class CodeApi {
        apiServer = null;
        init() {
            try {
                if (this.apiServer) {
                    this.apiServer.disconnect();
                }
            }
            catch (e) {
                logError(e);
            }
            const apiServer = this.apiServer = portApi.createApiServer();
            apiServer.init({
                name: VtApiPortNames.OAUTH,
                fnObj: this
            });
        }
        async setCode(codeObj) {
            tokenGenerator.continueTokenGeneration(codeObj);
        }
        disconnect() {
            if (this.apiServer) {
                this.apiServer.disconnect();
            }
        }
    }

    class OAuthPKCEChallenge {
        async setGrantParam(params) {
            try {
                const challengeBuffer = js.crypto.getSalt(64);
                const challenge = js.encoding.bytesToBase64Url(challengeBuffer);
                const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(challenge));
                const hash = js.encoding.bytesToBase64Url(hashBuffer);
                await zsessionStorage.save(SessionStorageKeys.OAUTH_CHALLENGE, challenge);
                params.set("code_challenge_method", "S256");
                params.set("code_challenge", hash);
            }
            catch (e) {
                logError(e);
            }
        }
        async setGenerateParam(parmas) {
            try {
                const challenge = await zsessionStorage.load(SessionStorageKeys.OAUTH_CHALLENGE, "");
                if (!challenge) {
                    throw "EMPTY_CHALLENGE";
                }
                parmas.set("code_verifier", challenge);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class OAuthTokenError {
        EMPTY = "EMPTY";
        EXPIRED = "EXPIRED";
    }
    class OAuthStorage {
        ERROR = new OAuthTokenError();
        saveDomain(domain) {
            return this.save(LocalStorageKeys.DOMAIN, domain);
        }
        loadDomain() {
            return this.load(LocalStorageKeys.DOMAIN, "");
        }
        async saveAccessToken(accessToken) {
            const MINUTES_55_MS = 55 * 60 * 1000;
            await this.save(LocalStorageKeys.ACCESS_TOKEN, accessToken);
            await this.save(LocalStorageKeys.TOKEN_VALID_UPTO, Date.now() + MINUTES_55_MS);
        }
        async saveRefreshToken(refreshToken) {
            return this.save(LocalStorageKeys.REFRESH_TOKEN, refreshToken);
        }
        async loadRefreshToken() {
            return this.load(LocalStorageKeys.REFRESH_TOKEN, "");
        }
        async getTokenValidForMinutes() {
            const validUptoMs = await this.load(LocalStorageKeys.TOKEN_VALID_UPTO, 0);
            if (validUptoMs < Date.now()) {
                return 0;
            }
            return (validUptoMs - Date.now()) / 1000 / 60;
        }
        async clear() {
            const KEY = LocalStorageKeys;
            return zlocalStorage.remove([
                KEY.ACCESS_TOKEN,
                KEY.REFRESH_TOKEN,
                KEY.DOMAIN
            ]);
        }
        async save(key, val) {
            return zlocalStorage.save(key, val);
        }
        async load(key, defaultVal = null) {
            return zlocalStorage.load(key, defaultVal);
        }
    }

    class OAuthFetch {
        async fetchAccessToken(refreshToken) {
            const params = new URLSearchParams();
            params.set("refresh_token", refreshToken);
            params.set("grant_type", "refresh_token");
            return this.fetchTokens(params);
        }
        async fetchRefreshToken(grantCode) {
            const params = new URLSearchParams();
            params.set("code", grantCode);
            params.set("redirect_uri", setupConfig.redirectUrl);
            params.set("grant_type", "authorization_code");
            await pkceChallenge.setGenerateParam(params);
            return this.fetchTokens(params);
        }
        async fetchTokens(params) {
            params.set("client_id", setupConfig.clientId);
            return fetch(urlProvider.getAccountsUrl() + "/oauth/v2/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            }).then(x => x.json());
        }
    }

    class OauthImpl {
        loggedIn = false;
        fetch = new OAuthFetch();
        async init() {
            try {
                this.refreshToken = js.fn.wrapper.createSingleInstance(this.refreshToken, this);
                this.getAccessToken = js.fn.wrapper.createSingleInstance(this.getAccessToken, this);
                setupConfig.init();
                await urlProviderImpl.init();
                await this.initDev();
                (await tokenGenerator.init()).result;
                await this.initLoggedIn();
                if (!this.loggedIn) {
                    return;
                }
                await this.refreshIfExpired();
                this.setupTokenAutoRefresh();
            }
            catch (e) {
                logError(e);
            }
        }
        async initDev() {
            try {
                if (!isDevMode) {
                    return;
                }
                const domains = setupConfig.domains;
                const domain = await storage.loadDomain();
                if (!domain) {
                    return;
                }
                if (domains.includes(domain)) {
                    return;
                }
                await storage.clear();
                await oauthExternal.silentSignOut();
            }
            catch (e) {
                logError(e);
            }
        }
        async generateTokens() {
            oauthExternal.closePopup();
            return tokenGenerator.generateTokens();
        }
        async initLoggedIn() {
            try {
                const refreshToken = await storage.loadRefreshToken();
                this.loggedIn = Boolean(refreshToken);
            }
            catch (e) {
                logError(e);
            }
        }
        isLoggedIn() {
            return this.loggedIn;
        }
        async autoRefreshToken() {
            const refreshToken = await storage.loadRefreshToken();
            if (!refreshToken) {
                return;
            }
            if (!(await this.isUserActive())) {
                return;
            }
            const MIN_VALID_MINUTES = 50;
            const validForMinutes = await storage.getTokenValidForMinutes();
            if (validForMinutes > MIN_VALID_MINUTES) {
                this.setupTokenAutoRefresh(validForMinutes - 5);
                return;
            }
            const resp = await this.fetch.fetchAccessToken(refreshToken);
            if (!resp.access_token) {
                return;
            }
            await storage.saveAccessToken(resp.access_token);
            this.setupTokenAutoRefresh();
        }
        setupTokenAutoRefresh(refreshInMinutes = 0) {
            try {
                const REFRESH_IN_MINUTES = 55;
                const refreshMin = refreshInMinutes || REFRESH_IN_MINUTES;
                const refreshSeconds = refreshMin * 60;
                brApi.alarm.createAlarm(oauthExternal.getOauthAlarmName(), refreshSeconds);
            }
            catch (e) {
                logError(e);
            }
        }
        async getAccessToken() {
            try {
                await this.refreshIfExpired();
                const accessToken = await zlocalStorage.load(LocalStorageKeys.ACCESS_TOKEN, "");
                if (!accessToken) {
                    throw "NO_ACCESS_TOKEN";
                }
                return accessToken;
            }
            catch (e) {
                await oauthExternal.silentSignOut();
                logError(e);
                return "";
            }
        }
        async isUserActive() {
            try {
                const lastActive = await zlocalStorage.load(LocalStorageKeys.LAST_ACTIVE, 0);
                const secondsPassed = js.time.getSecondsPassed(lastActive);
                return secondsPassed < (30 * 60);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async refreshIfExpired() {
            try {
                const validUpto = await zlocalStorage.load(LocalStorageKeys.TOKEN_VALID_UPTO, 0);
                if (validUpto > Date.now()) {
                    return;
                }
                await this.refreshToken();
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
        async refreshToken() {
            try {
                const refreshToken = await storage.loadRefreshToken();
                if (!refreshToken) {
                    await oauthExternal.silentSignOut();
                    return;
                }
                const resp = await this.fetch.fetchAccessToken(refreshToken);
                if (!resp.access_token) {
                    await oauthExternal.silentSignOut();
                    return;
                }
                await storage.saveAccessToken(resp.access_token);
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
    }

    class OAuthExternal {
        closePopup() {
            bg$1.popupClient.close();
        }
        async silentSignOut() {
            return bg$1.vault.silentSignOut();
        }
        loggedIn() {
            bgEventServer.login.locked();
            badgeMenuHandler$1.changeState(VtLoginState.LOCKED);
        }
        getOauthAlarmName() {
            return AlarmHandler.ALARM.OAUTH_REFRESH_ALARM;
        }
    }

    class SetupConfig {
        vault = "";
        domains = [];
        clientId = "";
        redirectUrl = "";
        port = "";
        scope = "";
        cdnServer = "";
        init() {
            try {
                const setupName = config.get(ConfigKeys.OAUTH);
                const setup = config.get(setupName);
                this.vault = setup["vault"];
                this.domains = setup["domains"];
                this.clientId = setup["client_id"];
                this.redirectUrl = setup["redirect_url"];
                this.port = setup["port"] ?? "";
                this.scope = config.get(ConfigKeys.OAUTH_SCOPE);
                this.cdnServer = setup["cdn_server"];
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class TokenGenerator {
        tabCreator = null;
        async init() {
            try {
                this.tabCreator = bgUtil.newTabCreator({ tabName: "OAUTH_TAB", reqNormal: true });
                const inProgress = await zsessionStorage.load(SessionStorageKeys.OAUTH_IN_PROGRESS, false);
                if (inProgress) {
                    codeApi.init();
                }
                return fnOut.OK;
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async generateTokens() {
            try {
                zsessionStorage.save(SessionStorageKeys.OAUTH_IN_PROGRESS, true);
                codeApi.init();
                const oauthUrl = await urlProviderImpl.getOauthUrl();
                this.tabCreator.create(oauthUrl);
                return fnOut.OK;
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async continueTokenGeneration(codeObj) {
            try {
                if (codeObj.error) {
                    throw codeObj.error;
                }
                const domain = this.getDomainFromAccountsUrl(codeObj["accounts-server"]);
                await storage.saveDomain(domain);
                await urlProviderImpl.setDomain(domain);
                const grantCode = codeObj.code;
                const tokenObj = await oauthImpl.fetch.fetchRefreshToken(grantCode);
                if (tokenObj.error) {
                    throw tokenObj.error;
                }
                await storage.saveAccessToken(tokenObj.access_token);
                await storage.saveRefreshToken(tokenObj.refresh_token);
                oauthImpl.setupTokenAutoRefresh();
                await oauthImpl.initLoggedIn();
                oauthExternal.loggedIn();
            }
            catch (e) {
                logError(e);
            }
            codeApi.disconnect();
            this.tabCreator.close();
            this.closeTabSafari();
            zsessionStorage.remove(SessionStorageKeys.OAUTH_IN_PROGRESS);
        }
        getDomainFromAccountsUrl(url) {
            for (let domain of setupConfig.domains) {
                if (url.endsWith(domain)) {
                    return domain;
                }
            }
            throw new Error("Invalid dc");
        }
        async closeTabSafari() {
            try {
                if (!bgUtil.isSafari()) {
                    return;
                }
                const url = brApi.runtime.getUrl("/html/ZVaultGetPP.html");
                const tabs = await brApi.tab.queryTabs({ url });
                tabs.forEach(x => brApi.tab.closeTab(x.id));
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class UrlProviderImpl {
        domain = "";
        async init() {
            try {
                this.domain = await storage.loadDomain();
                return fnOut.OK;
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        setDomain(domain) {
            this.domain = domain;
        }
        getVaultUrl() {
            return `https://${setupConfig.vault}.${this.getDomain()}${setupConfig.port}`;
        }
        getVaultWebUrl() {
            return `${this.getVaultUrl()}/app#/unlock/extension`;
        }
        getAccountsUrl() {
            return `https://accounts.${this.getDomain()}`;
        }
        getContactsUrl() {
            return `https://contacts.${this.getDomain()}`;
        }
        getZMapsUrl() {
            return `https://maps.${this.getDomain()}`;
        }
        getDomain() {
            if (!this.domain) {
                throw "DOMAIN_NOT_INITIALIZED";
            }
            return this.domain;
        }
        getCDNServer() {
            return setupConfig.cdnServer;
        }
        async getOauthUrl() {
            try {
                const domain = await this.getPossibleDomain();
                const authUrl = `https://accounts.${domain}/oauth/v2/auth`;
                const params = new URLSearchParams();
                params.set("scope", setupConfig.scope);
                params.set("client_id", setupConfig.clientId);
                params.set("state", brApi.runtime.getUrl("/html/ZVaultGetPP.html"));
                params.set("redirect_uri", setupConfig.redirectUrl);
                params.set("response_type", "code");
                params.set("prompt", "consent");
                params.set("access_type", "offline");
                await pkceChallenge.setGrantParam(params);
                return authUrl + "?" + params;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async getPossibleDomain() {
            const domains = setupConfig.domains;
            try {
                for (let domain of domains) {
                    if (await this.isRequiredDomain(domain)) {
                        return domain;
                    }
                }
            }
            catch (e) {
                logError(e);
            }
            return domains[0];
        }
        async isRequiredDomain(domain) {
            try {
                const cookie = await brApi.cookie.getCookie("_z_identity", `https://accounts.${domain}`);
                return Boolean(cookie);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    let oauthImpl;
    let urlProviderImpl;
    let setupConfig;
    let storage;
    let oauthExternal;
    let tokenGenerator;
    let codeApi;
    let pkceChallenge;
    function initContext$1() {
        oauthImpl = new OauthImpl();
        urlProviderImpl = new UrlProviderImpl();
        setupConfig = new SetupConfig();
        storage = new OAuthStorage();
        oauthExternal = new OAuthExternal();
        tokenGenerator = new TokenGenerator();
        codeApi = new CodeApi();
        pkceChallenge = new OAuthPKCEChallenge();
    }

    function main() {
        initContext$1();
        globalThis.oauth = oauthImpl;
        globalThis.urlProvider = urlProviderImpl;
    }

    class CDNUtil {
        async getUrl(path) {
            try {
                const normalizedPath = path.startsWith("/") ? path : "/" + path;
                const pathObj = (await vapi.getCDNUrls([normalizedPath])).result;
                const cdnPath = pathObj[normalizedPath];
                return urlProvider.getCDNServer() + cdnPath;
            }
            catch (e) {
                throw e;
            }
        }
        async getTextContents(path) {
            try {
                const url = await this.getUrl(path);
                const resp = await fetch(url);
                if (!resp.ok) {
                    throw ["FAILED_TO_FETCH", path];
                }
                return await resp.text();
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
    }

    class AssessmentContainsUsernameChecker {
        usernamePartRegex = /[^@]*/;
        async checkContainsUsername(assessmentObj) {
            try {
                for (let i = 0; i < assessmentObj.texts.length; i++) {
                    this.checkContainsUsernameFn(assessmentObj, i);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        checkContainsUsernameFn(assessmentObj, index) {
            try {
                const usernameRegex = this.getUsernameRegex(this.getUsernameLowercase(assessmentObj.texts[index]));
                for (let i = 0; i < assessmentObj.passwords.length; i++) {
                    if (!usernameRegex.test(assessmentObj.passwords[i])) {
                        continue;
                    }
                    assessmentObj.assessments[index].containsUsername = true;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getUsernameRegex(name) {
            try {
                const prefixLength = 3;
                const subNames = name.split(/[\W]/);
                const startOfNames = subNames.filter(x => x.length >= prefixLength).map(x => x.slice(0, prefixLength));
                return new RegExp(startOfNames.join("|"), "gi");
            }
            catch (e) {
                throw e;
            }
        }
        getUsernameLowercase(s) {
            try {
                return this.usernamePartRegex.exec(s)[0].toLowerCase();
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
    }

    class AssessmentResultObj {
        complexity = 0;
        containsUsername = false;
        dictionaryWord = false;
        old = false;
        recycled = false;
        reused = false;
        strength = 0;
    }
    class AssessmentObj {
        secret;
        texts = [];
        passwords = [];
        passwordFields = [];
        assessments = [];
        passwordIdsMap = new Map();
        secretTypeMap;
        historyMap = new Map();
    }

    class AssessmentObjCreator {
        async createAssessmentObj(secret) {
            try {
                const obj = new AssessmentObj();
                obj.secret = secret;
                obj.secretTypeMap = await bg.vaultSecretTypes.getMap();
                await this.initTextPasswordFields(obj);
                await this.initSecretIdPasswords(obj);
                await this.initHistoryMap(obj);
                obj.passwordFields.forEach(() => obj.assessments.push(new AssessmentResultObj()));
                return obj;
            }
            catch (e) {
                throw e;
            }
        }
        async initHistoryMap(assessmentObj) {
            try {
                for (let field of assessmentObj.passwordFields) {
                    assessmentObj.historyMap.set(field.name, await this.getHistoryValueSet(assessmentObj, field.name));
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async getHistoryValueSet(assessmentObj, fieldName) {
            try {
                const set = new Set();
                const historyObj = assessmentObj.secret.oldValues;
                if (!historyObj[fieldName]) {
                    return set;
                }
                let plaintext = "";
                for (let history of historyObj[fieldName].values) {
                    plaintext = await bg.zcrypt.decrypt(history.oldValue, assessmentObj.secret.shared);
                    set.add(plaintext);
                }
                return set;
            }
            catch (e) {
                logError(e);
                return new Set();
            }
        }
        async initSecretIdPasswords(assessmentObj) {
            try {
                const query = SecretQuery.newBuilder().rowsPerPage(-1).noLogo(true).includeSecretData(true).owned(true).build();
                const secrets = (await bg.vaultSecrets.secretQuerier.query(query)).secrets;
                for (let secret of secrets) {
                    await this.addToPasswordIdsMap(assessmentObj, secret);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async addToPasswordIdsMap(assessmentObj, secret) {
            try {
                if (!secret.encrypted?.fields) {
                    return;
                }
                const secretType = assessmentObj.secretTypeMap[secret.type_id];
                let plaintext = "";
                for (let field of secretType.password_fields) {
                    if (!secret.encrypted.fields[field.name]) {
                        continue;
                    }
                    plaintext = await bg.zcrypt.decrypt(secret.encrypted.fields[field.name], secret.shared);
                    if (!assessmentObj.passwordIdsMap.has(plaintext)) {
                        assessmentObj.passwordIdsMap.set(plaintext, new Set());
                    }
                    assessmentObj.passwordIdsMap.get(plaintext).add(secret.id);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async initTextPasswordFields(assessmentObj) {
            try {
                const secret = assessmentObj.secret;
                const secretType = assessmentObj.secretTypeMap[secret.type_id];
                if (!secret?.encrypted?.fields) {
                    throw "NO_ENCRYPTED_FIELDS";
                }
                await this.fillTextValues(assessmentObj, secretType);
                await this.fillPasswordValues(assessmentObj, secretType);
            }
            catch (e) {
                logError(e);
            }
        }
        async fillTextValues(assessmentObj, secretType) {
            try {
                const secret = assessmentObj.secret;
                let plaintext = "";
                for (let field of secretType.text_fields) {
                    if (!secret.encrypted.fields[field.name]) {
                        continue;
                    }
                    plaintext = await bg.zcrypt.decrypt(secret.encrypted.fields[field.name], secret.shared);
                    assessmentObj.texts.push(plaintext);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async fillPasswordValues(assessmentObj, secretType) {
            try {
                const secret = assessmentObj.secret;
                let plaintext = "";
                for (let field of secretType.password_fields) {
                    if (!secret.encrypted.fields[field.name]) {
                        continue;
                    }
                    plaintext = await bg.zcrypt.decrypt(secret.encrypted.fields[field.name], secret.shared);
                    assessmentObj.passwords.push(plaintext);
                    assessmentObj.passwordFields.push(field);
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class EnglishDictionary {
        async init() {
            try {
                this.init = js.fn.emptyFn;
                if (await commonDb.dictionaryTable.hasWords()) {
                    return;
                }
                const words = await this.getWordsFromServer();
                await commonDb.dictionaryTable.saveAll(words);
            }
            catch (e) {
                logError(e);
            }
        }
        async isPresent(word) {
            try {
                await this.init();
                return await commonDb.dictionaryTable.isPresent(word);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async getWordsFromServer() {
            try {
                const DICTIONARY_PATH = "/js/English_dic.js";
                const contents = await cdnUtil.getTextContents(DICTIONARY_PATH);
                const jsonContents = contents.slice(contents.indexOf("["), contents.lastIndexOf("]") + 1);
                const words = JSON.parse(jsonContents);
                return words;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
    }

    class PasswordAssessment {
        assessmentObjCreator = new AssessmentObjCreator();
        containsUsernameChecker = new AssessmentContainsUsernameChecker();
        englishDictionary = new EnglishDictionary();
        skipAssessment = false;
        async init() {
            try {
                this.skipAssessment = (await zlocalStorage.load(LocalStorageKeys.SKIP_PASSWORD_ASSESSMENT, STRING.FALSE)) == STRING.TRUE;
            }
            catch (e) {
                logError(e);
            }
        }
        async assessPassword(secret) {
            try {
                await this.init();
                if (this.skipAssessment) {
                    return;
                }
                if (!secret.owned) {
                    return;
                }
                const secretType = await accountDb.secretTypeTable.load(secret.type_id);
                if (secretType.excludeAssessment) {
                    return;
                }
                const assessmentObj = await this.assessmentObjCreator.createAssessmentObj(secret);
                assessmentObj.secret = secret;
                await this.containsUsernameChecker.checkContainsUsername(assessmentObj);
                await this.updateComplexity(assessmentObj);
                await this.updateReused(assessmentObj);
                await this.updateOld(assessmentObj);
                await this.updateRecycled(assessmentObj);
                await this.updateStrength(assessmentObj);
                await this.updateDictionaryWord(assessmentObj);
                const avgStrength = js.math.averageList(assessmentObj.assessments.map(x => x.strength)) >> 0;
                await vapi.secret.saveAssessment({
                    secretid: secret.id,
                    score: avgStrength,
                    columns: this.getAssessmentColumns(assessmentObj),
                });
            }
            catch (e) {
                logError(e);
            }
        }
        async updateDictionaryWord(assessmentObj) {
            try {
                for (let i = 0; i < assessmentObj.passwords.length; i++) {
                    assessmentObj.assessments[i].dictionaryWord = await this.englishDictionary.isPresent(assessmentObj.passwords[i]);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async updateStrength(assessmentObj) {
            try {
                for (let i = 0; i < assessmentObj.passwords.length; i++) {
                    assessmentObj.assessments[i].strength = this.getStrength(assessmentObj, i);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getStrength(assessmentObj, index) {
            try {
                const assessment = assessmentObj.assessments[index];
                const COMPLEXITY_PART = 65;
                const REUSED_PART = 7;
                const USERNAME_PART = 7;
                const OLD_PART = 7;
                const DICTIONARY_PART = 7;
                const RECYCLED_PART = 7;
                const getStrengthPart = (part, ignore) => ignore ? 0 : part;
                let strength = 0;
                strength += COMPLEXITY_PART * (assessment.complexity / 100);
                strength += getStrengthPart(REUSED_PART, assessment.reused);
                strength += getStrengthPart(OLD_PART, assessment.old);
                strength += getStrengthPart(USERNAME_PART, assessment.containsUsername);
                strength += getStrengthPart(DICTIONARY_PART, assessment.dictionaryWord);
                strength += getStrengthPart(RECYCLED_PART, assessment.recycled);
                return Math.max(strength, 10) >> 0;
            }
            catch (e) {
                logError(e);
                return 0;
            }
        }
        async updateRecycled(assessmentObj) {
            try {
                for (let i = 0; i < assessmentObj.passwords.length; i++) {
                    if (assessmentObj.historyMap.get(assessmentObj.passwordFields[i].name)?.has(assessmentObj.passwords[i])) {
                        assessmentObj.assessments[i].recycled = true;
                    }
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async updateOld(assessmentObj) {
            try {
                const policy = await bg.vaultPolicies.getPolicyOrDefault(assessmentObj.secret.policy_id);
                if (policy.age == 0) {
                    return;
                }
                const validUpto = assessmentObj.secret.modifiedOn + (policy.age * 24 * 60 * 60 * 1000);
                const valid = Date.now() < validUpto;
                if (valid) {
                    return;
                }
                assessmentObj.assessments.forEach(x => x.old = true);
            }
            catch (e) {
                logError(e);
            }
        }
        async updateReused(assessmentObj) {
            try {
                for (let i = 0; i < assessmentObj.passwords.length; i++) {
                    if (assessmentObj.passwordIdsMap.get(assessmentObj.passwords[i])?.size > 1) {
                        assessmentObj.assessments[i].reused = true;
                    }
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async updateComplexity(assessmentObj) {
            try {
                for (let i = 0; i < assessmentObj.passwords.length; i++) {
                    assessmentObj.assessments[i].complexity = Math.max(10, generator.password.getComplexity(assessmentObj.passwords[i]));
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getAssessmentColumns(assessmentObj) {
            try {
                const a = [];
                for (let i = 0; i < assessmentObj.assessments.length; i++) {
                    a.push(this.mapAssessmentResult(assessmentObj, i));
                }
                return a.filter(js.array.trueFilter);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        mapAssessmentResult(assessmentObj, index) {
            try {
                const resultObj = assessmentObj.assessments[index];
                const field = assessmentObj.passwordFields[index];
                const apiAssessment = {
                    contains_username: resultObj.containsUsername,
                    dictionary_word: resultObj.dictionaryWord,
                    name: field.name,
                    old: resultObj.old,
                    recycled: resultObj.recycled,
                    reused: resultObj.reused,
                    strength: resultObj.strength,
                    weak: (resultObj.strength < 100),
                };
                return apiAssessment;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }

    let Util$2 = class Util {
        async getResponse(request) {
            return new Promise(function (res, rej) {
                request.onsuccess = () => res(request.result);
                request.onerror = () => rej(request.error);
            });
        }
        async getTransactionPromise(transaction) {
            return new Promise(function (res, rej) {
                transaction.onerror = () => rej(transaction.error);
                transaction.oncomplete = res;
                transaction.abort = () => rej(transaction.error);
            });
        }
    };

    let GG$3 = class GG {
        db;
        static util = new Util$2();
        constructor(db) {
            this.db = db;
        }
    };

    class TableHelper {
        input;
        constructor(input) {
            this.input = input;
        }
        async addRow(obj) {
            return this.addAllRows([obj]);
        }
        async addAllRows(objList, clean = false) {
            try {
                const { table, transactionPromise } = this.input.db.getWriteTable(this.input.name);
                if (clean) {
                    table.clear();
                }
                objList.forEach(x => table.put(x));
                await transactionPromise;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async getRow(key) {
            try {
                return await GG$3.util.getResponse(this.getReadTable().get(key));
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async getAllRows() {
            try {
                return await GG$3.util.getResponse(this.getReadTable().getAll());
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async getRows(keys) {
            try {
                const table = this.getReadTable();
                const objList = await Promise.all(keys.map(x => GG$3.util.getResponse(table.get(x))));
                return objList.filter(x => Boolean(x));
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async hasRows() {
            try {
                const table = this.getReadTable();
                const count = await GG$3.util.getResponse(table.count());
                return count > 0;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async deleteRow(key) {
            return this.deleteAllRows([key]);
        }
        async deleteAllRows(keys) {
            try {
                const { table, transactionPromise } = this.getWriteTable();
                keys.forEach(x => table.delete(x));
                await transactionPromise;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async clear() {
            try {
                const { table, transactionPromise } = this.getWriteTable();
                table.clear();
                await transactionPromise;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        getReadTable() {
            return this.input.db.getReadTable(this.input.name);
        }
        getWriteTable() {
            return this.input.db.getWriteTable(this.input.name);
        }
    }

    class MapTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        async save(key, val) {
            return this.table.addRow({ key, val });
        }
        async load(key, defaultVal = null) {
            try {
                const existing = await this.table.getRow(key);
                return existing !== undefined ? existing.val : defaultVal;
            }
            catch (e) {
                throw jserror(e);
            }
        }
    }

    class NeverSaveTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        async saveAll(neverSaveDomains) {
            const neverSaveDomainObjs = neverSaveDomains.map(this.mapNeverSaveRow);
            return this.table.addAllRows(neverSaveDomainObjs, true);
        }
        async loadAll() {
            try {
                const rows = await this.table.getAllRows();
                const domains = rows.map(x => x.domain);
                return domains;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async add(domain) {
            try {
                await this.table.addRow(this.mapNeverSaveRow(domain));
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async remove(domain) {
            try {
                await this.table.deleteRow(domain);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async has(domain) {
            try {
                const row = await this.table.getRow(domain);
                return Boolean(row);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        mapNeverSaveRow(domain) {
            return { domain };
        }
    }

    class PolicyTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        async saveAll(policies) {
            return this.table.addAllRows(policies, true);
        }
        async loadAll() {
            return this.table.getAllRows();
        }
        async load(policyId) {
            return this.table.getRow(policyId);
        }
    }

    class RecordingTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        async save(domain, steps) {
            try {
                const row = {
                    domain,
                    steps
                };
                return this.table.addRow(row);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async load(domain) {
            try {
                const row = await this.table.getRow(domain);
                return row && row.steps;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        clear() {
            return this.table.clear();
        }
    }

    class SecretTypeTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        async saveAll(secretTypes) {
            return this.table.addAllRows(secretTypes, true);
        }
        async loadAll() {
            return this.table.getAllRows();
        }
        async loadMap() {
            try {
                const map = {};
                const secretTypes = await this.table.getAllRows();
                secretTypes.forEach(x => map[x.id] = x);
                return map;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async load(typeId) {
            return this.table.getRow(typeId);
        }
    }

    class TagTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        rowMapper = new SecretToRowMapper();
        async saveAll(secrets, clear = false) {
            try {
                const rows = this.rowMapper.getRows(secrets);
                await this.table.addAllRows(rows, clear);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async save(secret) {
            return this.saveAll([secret]);
        }
        async query(query) {
            return new SecretTagQuerier(this).queryTags(query);
        }
        async loadAll() {
            try {
                const rows = await this.table.getAllRows();
                const tags = rows.map(x => x.tag);
                return tags;
            }
            catch (e) {
                throw jserror(e);
            }
        }
    }
    class SecretToRowMapper {
        getRows(secrets) {
            try {
                const tagSet = new Set();
                for (let secret of secrets) {
                    if (!secret.tags) {
                        continue;
                    }
                    secret.tags.forEach(x => tagSet.add(x));
                }
                const tags = js.array.toArray(tagSet.values());
                const rows = tags.map(x => ({ tag: x }));
                return rows;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
    }
    class SecretTagQuerier {
        p = null;
        static SORT_WEIGHT = {
            NAME_START: 100,
            NAME_INCLUDES: 90,
            NAME_REGEX: 80,
            NO_MATCH: 0
        };
        search_regex = null;
        searchString = "";
        sortWeightMap = new Map();
        query = null;
        constructor(p) {
            this.p = p;
        }
        async queryTags(query) {
            try {
                this.query = query;
                const allTags = await this.p.loadAll();
                const reqTags = [];
                let searchWeight = 0;
                this.searchString = query.search_string.toLocaleLowerCase();
                if (this.searchString) {
                    this.search_regex = vutil.search.getSearchRegex(this.searchString);
                }
                for (let tag of allTags) {
                    if (query.excludeTags.includes(tag)) {
                        continue;
                    }
                    if (!query.search_string) {
                        reqTags.push(tag);
                        continue;
                    }
                    searchWeight = this.getSearchWeight(tag);
                    if (!searchWeight) {
                        continue;
                    }
                    this.sortWeightMap.set(tag, searchWeight);
                    reqTags.push(tag);
                }
                const sortFn = this.getSortFunction();
                reqTags.sort(sortFn);
                const pagedTags = js.array.getPage(reqTags, query.page_no, query.rows_per_page);
                const result = new TagQueryResult();
                result.query = { ...query };
                result.tags = pagedTags;
                result.total_count = allTags.length;
                return result;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        getSortFunction() {
            if (this.query.search_string) {
                return this.compareSortweight.bind(this);
            }
            return this.compareName;
        }
        compareSortweight(x, y) {
            return this.getSortWeight(y) - this.getSortWeight(x);
        }
        getSortWeight(tag) {
            return this.sortWeightMap.get(tag) || 0;
        }
        compareName(x, y) {
            return x.toLocaleLowerCase().localeCompare(y.toLocaleLowerCase());
        }
        getSearchWeight(tag) {
            const name = tag.toLocaleLowerCase();
            if (name.startsWith(this.searchString)) {
                return SecretTagQuerier.SORT_WEIGHT.NAME_START;
            }
            if (name.includes(this.searchString)) {
                return SecretTagQuerier.SORT_WEIGHT.NAME_INCLUDES;
            }
            if (this.search_regex.test(name)) {
                return SecretTagQuerier.SORT_WEIGHT.NAME_REGEX;
            }
            return SecretTagQuerier.SORT_WEIGHT.NO_MATCH;
        }
    }

    const MAX_VALID_UPTO = 1 * 60 * 1000;
    class FolderSecretMapTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        async save(folderId, secretIds) {
            try {
                const validUpto = Date.now() + MAX_VALID_UPTO;
                const row = { folderId, secretIds, validUpto };
                return this.table.addRow(row);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async addSecret(folderId, secretId) {
            try {
                const existing = await this.loadSecretIds(folderId);
                js.array.addUnique(existing, secretId);
                await this.save(folderId, existing);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async load(folderId) {
            const row = await this.table.getRow(folderId);
            if (!row) {
                return null;
            }
            return row;
        }
        async loadSecretIds(folder_id) {
            const row = await this.load(folder_id);
            return row ? row.secretIds : [];
        }
        clear() {
            return this.table.clear();
        }
    }

    var FolderSharingType;
    (function (FolderSharingType) {
        FolderSharingType["SHARED_BY_ME"] = "SHARED_BY_ME";
        FolderSharingType["SHARED_TO_ME"] = "SHARED_TO_ME";
        FolderSharingType["NONE"] = "NONE";
    })(FolderSharingType || (FolderSharingType = {}));
    class Folder {
        static SHARING_LEVEL = {
            MANAGE: 110,
            LOGIN: 120,
            VIEW: 130,
            MODIFY: 140,
            NONE: -1
        };
        static SHARING_LEVEL_USER_GROUP = {
            MANAGE: 150,
            LOGIN: 160,
            VIEW: 170,
            MODIFY: 180,
            NONE: -1
        };
        id = "";
        parent_id = "";
        name = "";
        name_lowercase = "";
        path = "";
        has_subfolder = false;
        shared = false;
        sharing_type = FolderSharingType.NONE;
        sharing_level = Folder.SHARING_LEVEL.MANAGE;
        sort_weight = 0;
        path_parts = [];
        highlight_field = "";
    }

    class FolderQuerySearcher {
        searchString = "";
        filteredFolders = {
            nameStart: [],
            nameInclude: [],
            namePattern: [],
        };
        init(searchString) {
            this.searchString = searchString.toLocaleLowerCase();
        }
        addIfValid(folder) {
            const searchString = this.searchString;
            if (!this.searchString) {
                this.filteredFolders.nameStart.push(folder);
                folder.highlight_field = "";
                return;
            }
            if (folder.name_lowercase.startsWith(searchString)) {
                this.filteredFolders.nameStart.push(folder);
                folder.highlight_field = FolderHighlightFields.NAME;
                return;
            }
            if (folder.name_lowercase.includes(searchString)) {
                this.filteredFolders.nameInclude.push(folder);
                folder.highlight_field = FolderHighlightFields.NAME;
                return;
            }
            if (vutil.search.isPresent(searchString, folder.name_lowercase)) {
                this.filteredFolders.namePattern.push(folder);
                folder.highlight_field = FolderHighlightFields.NAME;
                return;
            }
        }
        getFilteredFolders() {
            for (let key in this.filteredFolders) {
                this.filteredFolders[key].sort(this.sortByName.bind(this));
            }
            return js.array.concat(this.filteredFolders.nameStart, this.filteredFolders.nameInclude, this.filteredFolders.namePattern);
        }
        sortByName(x, y) {
            return x.name_lowercase.localeCompare(y.name_lowercase);
        }
    }

    class EditableFolderQuerier {
        static queryEditable(folders, query) {
            return new EditableFolderQuerier().queryEditable(folders, query);
        }
        constructor() { }
        query = null;
        searcher = new FolderQuerySearcher();
        async queryEditable(folders, query) {
            this.init(query);
            for (let curFolder of folders) {
                this.filter(curFolder);
            }
            const filteredFolders = this.searcher.getFilteredFolders();
            const result = js.array.getPage(filteredFolders, this.query.page_no, this.query.rows_per_page);
            return result;
        }
        init(query) {
            this.query = query;
            this.searcher.init(query.search_string);
        }
        filter(folder) {
            if (!this.hasEditPermission(folder)) {
                return;
            }
            this.searcher.addIfValid(folder);
        }
        hasEditPermission(folder) {
            try {
                const sharedWithMe = folder.sharing_type == FolderSharingType.SHARED_TO_ME;
                if (!sharedWithMe) {
                    return true;
                }
                switch (folder.sharing_level) {
                    case Folder.SHARING_LEVEL.MANAGE:
                    case Folder.SHARING_LEVEL.MODIFY:
                    case Folder.SHARING_LEVEL_USER_GROUP.MANAGE:
                    case Folder.SHARING_LEVEL_USER_GROUP.MODIFY:
                        return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class FolderQuerier {
        static query(folders, query) {
            return new FolderQuerier().queryFolders(folders, query);
        }
        constructor() { }
        query = null;
        filterBySharingType = false;
        searcher = new FolderQuerySearcher();
        async queryFolders(folders, query) {
            this.init(query);
            for (let curFolder of folders) {
                this.filter(curFolder);
            }
            const filteredFolders = this.searcher.getFilteredFolders();
            const result = js.array.getPage(filteredFolders, this.query.page_no, this.query.rows_per_page);
            return result;
        }
        init(query) {
            this.query = query;
            this.searcher.init(query.search_string);
            this.filterBySharingType = query.sharingType != FilterType.ALL;
        }
        filter(folder) {
            if (this.filterBySharingType && (folder.sharing_type != this.query.sharingType)) {
                return;
            }
            this.searcher.addIfValid(folder);
        }
    }

    class FolderTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        async load(folderId) {
            return this.table.getRow(folderId);
        }
        async loadAll() {
            return this.table.getAllRows();
        }
        async saveAll(folders) {
            return this.table.addAllRows(folders, true);
        }
        async query(query) {
            try {
                const allFolders = await this.loadAll();
                return FolderQuerier.query(allFolders, query);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async queryTree(query) {
            try {
                const allFolders = await this.loadAll();
                const folders = [];
                let subrootRegex = null;
                if (query.visible_sub_roots.length) {
                    subrootRegex = this.getSubrootRegex(query.visible_sub_roots);
                }
                for (let folder of allFolders) {
                    if (!folder.parent_id || (subrootRegex && subrootRegex.test(folder.path))) {
                        folders.push(folder);
                    }
                }
                folders.sort(this.comparePathParts);
                const result = {
                    query,
                    folders: folders.slice(0, query.end),
                    total: folders.length,
                };
                return result;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async queryEditable(query) {
            try {
                const allFolders = await this.loadAll();
                return EditableFolderQuerier.queryEditable(allFolders, query);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        comparePathParts(x, y) {
            const end = Math.min(x.path_parts.length, y.path_parts.length);
            for (let i = 0; i < end; i++) {
                if (x.path_parts[i] != y.path_parts[i]) {
                    return x.path_parts[i].localeCompare(y.path_parts[i]);
                }
            }
            return x.path_parts.length - y.path_parts.length;
        }
        getSubrootRegex(visibleSubRoots) {
            let regexString = visibleSubRoots.map(x => vutil.search.escapeRegex(x)).join("|");
            const sub_root_regex = new RegExp("^(?:" + regexString + ")\\\\[^\\\\]*?$");
            return sub_root_regex;
        }
    }

    class HostRecentSecretTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        async add(url, secretId) {
            try {
                if (!js.url.isValid(url)) {
                    console.info("invalid url: ", url, secretId);
                    return;
                }
                const host = js.url.getHost(url);
                const existing = await this.loadExisting(host);
                js.array.removeElem(existing, secretId);
                existing.push(secretId);
                await this.table.addRow({ host, ids: existing });
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async load(url) {
            try {
                if (!js.url.isValid(url)) {
                    return [];
                }
                const host = js.url.getHost(url);
                return this.loadExisting(host);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async loadExisting(key) {
            const existing = await this.table.getRow(key);
            return (existing && existing.ids) || [];
        }
    }

    class RecentSecretTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        async update(secretId) {
            const row = { id: secretId, usedOn: Date.now() };
            return this.table.addRow(row);
        }
        async getMap() {
            const rows = await this.table.getAllRows();
            const map = new Map();
            rows.forEach(x => map.set(x.id, x.usedOn || x["userOn"]));
            return map;
        }
    }

    class SecretTableImpl {
        gg;
        table;
        constructor(gg) {
            this.gg = gg;
        }
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        async save(secret) {
            return this.saveAll([secret]);
        }
        async saveAll(secrets, clear = false) {
            try {
                await bg.vaultSecrets.secretDataHandler.encodeSecretData(secrets);
                const dbSecrets = this.mapDbSecrets(secrets);
                await this.table.addAllRows(dbSecrets, clear);
                this.gg.db.accountDb.tagTable.saveAll(secrets, clear);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        loadAll() {
            return this.table.getAllRows();
        }
        async get(secretId) {
            try {
                const secret = await this.table.getRow(secretId);
                if (!secret) {
                    return null;
                }
                await secretLogoAdder.addLogo([secret]);
                await bg.vaultSecrets.secretDataHandler.decodeSecretData([secret]);
                return secret;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async getList(idList) {
            try {
                const results = await Promise.all(idList.map(id => this.table.getRow(id)));
                return results.filter(x => Boolean(x));
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async put(secret) {
            try {
                await bg.vaultSecrets.secretDataHandler.encodeSecretData([secret]);
                await this.table.addRow(secret);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async remove(secretId) {
            return this.table.deleteRow(secretId);
        }
        async removeAll(secretIds) {
            return this.table.deleteAllRows(secretIds);
        }
        async getNames(domain) {
            try {
                const secrets = await this.table.getAllRows();
                const nameRegex = new RegExp("^" + vutil.search.escapeRegex(domain) + "(_\\d+)?" + "$");
                return secrets.filter(x => nameRegex.test(x.name)).map(x => x.name);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        mapDbSecrets(secrets) {
            try {
                const dbSecrets = [];
                let dbSecret;
                for (let secret of secrets) {
                    dbSecret = { ...secret };
                    dbSecrets.push(dbSecret);
                }
                return dbSecrets;
            }
            catch (e) {
                throw jserror(e);
            }
        }
    }

    class BaseUrlPartSecretsTableImpl {
        async saveAll(rows, clean) {
            try {
                await this.table.addAllRows(rows, clean);
            }
            catch (e) {
                logError(e);
            }
        }
        async remove(secretId) {
            try {
                const updatedRows = [];
                for (let row of await this.table.getAllRows()) {
                    if (!row.ids.includes(secretId)) {
                        continue;
                    }
                    js.array.removeElem(row.ids, secretId);
                    updatedRows.push(row);
                }
                await this.table.addAllRows(updatedRows);
            }
            catch (e) {
                logError(e);
            }
        }
        async removeAll(secretIds) {
            try {
                const updatedRows = [];
                const secretIdSet = new Set(secretIds);
                let newIds = [];
                for (let row of await this.table.getAllRows()) {
                    newIds = row.ids.filter(x => !secretIdSet.has(x));
                    if (newIds.length == row.ids.length) {
                        continue;
                    }
                    row.ids = newIds;
                    updatedRows.push(row);
                }
                await this.table.addAllRows(updatedRows);
            }
            catch (e) {
                logError(e);
            }
        }
        async load(domain) {
            try {
                const row = await this.table.getRow(domain);
                return (row && row.ids) || [];
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async loadAll() {
            try {
                return this.table.getAllRows();
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
    }

    class DomainSecretsTableImpl extends BaseUrlPartSecretsTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
    }

    class HostnameSecretsTableImpl extends BaseUrlPartSecretsTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
    }

    class ParentDomainSecretsTableImpl extends BaseUrlPartSecretsTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
    }

    class UrlDomainPathTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        async saveAll(secrets, clean) {
            try {
                const rows = new RowParser().parse(secrets);
                await this.table.addAllRows(rows, clean);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async load(domain) {
            try {
                const row = await this.table.getRow(domain);
                return (row && row.paths) || [];
            }
            catch (e) {
                throw jserror(e);
            }
        }
    }
    class RowParser {
        static parse(secrets) {
            return new RowParser().parse(secrets);
        }
        domainPaths = js.map.createNew({ defaultProvider: () => new Set() });
        parse(secrets) {
            const rows = [];
            try {
                for (let secret of secrets) {
                    try {
                        this.parseSecret(secret);
                    }
                    catch (e) {
                        logError(e);
                    }
                }
                for (let [domain, secretIdSet] of this.domainPaths.map.entries()) {
                    rows.push({ domain, paths: js.array.toArray(secretIdSet) });
                }
                return rows;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        parseSecret(secret) {
            try {
                for (let url of secret.valid_urls) {
                    this.parseUrl(url);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        parseUrl(url) {
            try {
                const urlObj = new URL(url);
                this.domainPaths.getOrDefaultAdded(urlObj.hostname).add(urlObj.pathname);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    var TABLE_KEY;
    (function (TABLE_KEY) {
        TABLE_KEY["ID"] = "id";
        TABLE_KEY["KEY"] = "key";
        TABLE_KEY["DOMAIN"] = "domain";
    })(TABLE_KEY || (TABLE_KEY = {}));

    class DbHelper {
        input;
        db = null;
        async init(input) {
            try {
                if (!input.name) {
                    throw jserror(ErrorCode.INVALID_INPUT + " name");
                }
                if (!input.version) {
                    throw jserror(ErrorCode.INVALID_INPUT + " version");
                }
                this.input = input;
                const openRequest = indexedDB.open(input.name, input.version);
                openRequest.onupgradeneeded = this.onUpgrade.bind(this);
                this.db = await GG$3.util.getResponse(openRequest);
                for (let table in input.tables) {
                    await this.testTable(table);
                }
            }
            catch (e) {
                console.info(e);
                await this.retryNewDb();
            }
        }
        getReadTable(name) {
            const transaction = this.db.transaction([name], "readonly");
            return transaction.objectStore(name);
        }
        getWriteTable(name) {
            const transaction = this.db.transaction([name], "readwrite");
            const table = transaction.objectStore(name);
            const promise = GG$3.util.getTransactionPromise(transaction);
            return { table, transactionPromise: promise };
        }
        async deleteDb() {
            try {
                if (this.db) {
                    this.db.close();
                }
                if (this.input?.name) {
                    indexedDB.deleteDatabase(this.input.name);
                }
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async retryNewDb() {
            indexedDB.deleteDatabase(this.input.name);
            await js.time.delay(1);
            await brApi.runtime.reload();
        }
        async testTable(name) {
            return await GG$3.util.getResponse(this.getReadTable(name).get(""));
        }
        onUpgrade(e) {
            const db = e.target.result;
            for (let table of Array.from(db.objectStoreNames)) {
                db.deleteObjectStore(table);
            }
            for (let table in this.input.tables) {
                db.createObjectStore(table, { keyPath: this.input.tables[table] });
            }
        }
    }

    var TABLE_NAME$1;
    (function (TABLE_NAME) {
        TABLE_NAME["NEVER_SAVE"] = "NeverSave";
        TABLE_NAME["POLICY"] = "Policy";
        TABLE_NAME["RECORDING"] = "Recording";
        TABLE_NAME["SECRET_TYPE"] = "SecretType";
        TABLE_NAME["TAG"] = "Tag";
        TABLE_NAME["DOMAIN_SECRETS"] = "DomainSecrets";
        TABLE_NAME["PARENT_DOMAIN_SECRETS"] = "ParentDomainSecrets";
        TABLE_NAME["HOST_SECRETS"] = "HostSecrets";
        TABLE_NAME["URL_DOMAIN_PATH"] = "UrlDomainPath";
        TABLE_NAME["FOLDER_SECRET_MAP"] = "FolderSecretMap";
        TABLE_NAME["FOLDER"] = "Folder";
        TABLE_NAME["HOST_RECENT_SECRET"] = "HostRecentSecret";
        TABLE_NAME["RECENT_SECRET"] = "RecentSecret";
        TABLE_NAME["SECRET"] = "Secret";
        TABLE_NAME["MAP"] = "Map";
    })(TABLE_NAME$1 || (TABLE_NAME$1 = {}));
    class AccountDbHelperInput {
        name = "Account1";
        version = 1;
        tables = {
            [TABLE_NAME$1.SECRET]: TABLE_KEY.ID,
            [TABLE_NAME$1.RECENT_SECRET]: TABLE_KEY.ID,
            [TABLE_NAME$1.HOST_RECENT_SECRET]: "host",
            [TABLE_NAME$1.POLICY]: TABLE_KEY.ID,
            [TABLE_NAME$1.SECRET_TYPE]: TABLE_KEY.ID,
            [TABLE_NAME$1.FOLDER]: TABLE_KEY.ID,
            [TABLE_NAME$1.FOLDER_SECRET_MAP]: "folderId",
            [TABLE_NAME$1.MAP]: TABLE_KEY.KEY,
            [TABLE_NAME$1.NEVER_SAVE]: TABLE_KEY.DOMAIN,
            [TABLE_NAME$1.RECORDING]: TABLE_KEY.DOMAIN,
            [TABLE_NAME$1.DOMAIN_SECRETS]: TABLE_KEY.DOMAIN,
            [TABLE_NAME$1.HOST_SECRETS]: "hostname",
            [TABLE_NAME$1.PARENT_DOMAIN_SECRETS]: TABLE_KEY.DOMAIN,
            [TABLE_NAME$1.TAG]: "tag",
            [TABLE_NAME$1.URL_DOMAIN_PATH]: TABLE_KEY.DOMAIN,
        };
    }
    class AccountDbImpl {
        gg;
        db = new DbHelper();
        constructor(gg) {
            this.gg = gg;
            this.secretTable = new SecretTableImpl(gg);
        }
        policyTable = new PolicyTableImpl();
        secretTypeTable = new SecretTypeTableImpl();
        tagTable = new TagTableImpl();
        mapTable = new MapTableImpl();
        recordingTable = new RecordingTableImpl();
        secretTable;
        recentSecretTable = new RecentSecretTableImpl();
        hostRecentSecretTable = new HostRecentSecretTableImpl();
        neverSaveTable = new NeverSaveTableImpl();
        folderTable = new FolderTableImpl();
        folderSecretMapTable = new FolderSecretMapTableImpl();
        domainSecretsTable = new DomainSecretsTableImpl();
        parentDomainSecretsTable = new ParentDomainSecretsTableImpl();
        hostnameSecretsTable = new HostnameSecretsTableImpl();
        urlDomainPathTable = new UrlDomainPathTableImpl();
        async init() {
            try {
                await this.db.init(new AccountDbHelperInput());
                const initObjMapping = {
                    [TABLE_NAME$1.SECRET]: this.secretTable,
                    [TABLE_NAME$1.RECENT_SECRET]: this.recentSecretTable,
                    [TABLE_NAME$1.HOST_RECENT_SECRET]: this.hostRecentSecretTable,
                    [TABLE_NAME$1.POLICY]: this.policyTable,
                    [TABLE_NAME$1.SECRET_TYPE]: this.secretTypeTable,
                    [TABLE_NAME$1.FOLDER]: this.folderTable,
                    [TABLE_NAME$1.FOLDER_SECRET_MAP]: this.folderSecretMapTable,
                    [TABLE_NAME$1.MAP]: this.mapTable,
                    [TABLE_NAME$1.NEVER_SAVE]: this.neverSaveTable,
                    [TABLE_NAME$1.RECORDING]: this.recordingTable,
                    [TABLE_NAME$1.DOMAIN_SECRETS]: this.domainSecretsTable,
                    [TABLE_NAME$1.HOST_SECRETS]: this.hostnameSecretsTable,
                    [TABLE_NAME$1.PARENT_DOMAIN_SECRETS]: this.parentDomainSecretsTable,
                    [TABLE_NAME$1.TAG]: this.tagTable,
                    [TABLE_NAME$1.URL_DOMAIN_PATH]: this.urlDomainPathTable,
                };
                for (let tableName in initObjMapping) {
                    initObjMapping[tableName].init({ db: this.db, name: tableName });
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class DictionaryTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        async saveAll(words) {
            try {
                const rows = words.map(x => ({ word: x }));
                await this.table.addAllRows(rows, true);
            }
            catch (e) {
                logError(e);
            }
        }
        async isPresent(word) {
            try {
                const row = await this.table.getRow(word.toLowerCase());
                return Boolean(row);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async hasWords() {
            try {
                return await this.table.hasRows();
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    const LogoType = {
        EMPTY: "EMPTY",
        APPROX: "APPROX",
        EXACT: "EXACT",
    };
    class LogoTableRow {
        domain;
        logo;
        type;
        constructor(domain, logo, type) {
            this.domain = domain;
            this.logo = logo;
            this.type = type;
        }
    }
    class LogoTableRowUtil {
        static updateNeeded(row, hostname) {
            switch (row.type) {
                case LogoType.EXACT: return false;
                case LogoType.EMPTY: return true;
                case LogoType.APPROX: return hostname == row.domain;
                default: throw "UNHANDLED_CASE: logo update needed";
            }
        }
    }
    class LogoTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        async save(url, logo) {
            try {
                if (!js.url.isValid(url)) {
                    return;
                }
                const hostname = js.url.getHostName(url);
                const row = new LogoTableRow(hostname, logo, LogoType.EXACT);
                await this.table.addRow(row);
                await this.saveParentDomainLogo(hostname, logo);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async isLogoNeeded(hostname) {
            try {
                const rows = await this.table.getRows([hostname, js.url.getParentDomainFromHostName(hostname)]);
                for (let row of rows) {
                    if (LogoTableRowUtil.updateNeeded(row, hostname)) {
                        return true;
                    }
                }
                return false;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async load(url) {
            try {
                const hostname = js.url.getHostName(url);
                const logo = await this.loadFn(hostname);
                if (logo) {
                    return logo;
                }
                await this.addPendingDomains([hostname]);
                const parentDomain = js.url.getParentDomainFromHostName(hostname);
                if (parentDomain != hostname) {
                    return await this.loadFn(parentDomain);
                }
                return "";
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async loadMap(urls) {
            try {
                const map = new Map();
                const domains = this.getLoadKeys(urls);
                const pendingDomains = new Set(domains);
                const rows = await this.table.getRows(domains);
                for (let row of rows) {
                    pendingDomains.delete(row.domain);
                    if (row.logo) {
                        map.set(row.domain, row.logo);
                    }
                }
                await this.addPendingDomains(js.array.toArray(pendingDomains.values()));
                return map;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        getLoadKeys(urls) {
            const domainSet = new Set();
            let hostname;
            for (let url of urls) {
                if (!js.url.isValid(url)) {
                    console.info("invalid url: ", url);
                    continue;
                }
                hostname = js.url.getHostName(url);
                domainSet.add(hostname);
                domainSet.add(js.url.getParentDomainFromHostName(hostname));
            }
            return js.array.toArray(domainSet);
        }
        async loadFn(hostname) {
            const row = await this.table.getRow(hostname);
            return (row && row.logo) || "";
        }
        async addPendingDomains(domains) {
            try {
                const rows = domains.map(domain => new LogoTableRow(domain, "", LogoType.EMPTY));
                await this.table.addAllRows(rows);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async saveParentDomainLogo(hostname, logo) {
            try {
                const parentDomain = js.url.getParentDomainFromHostName(hostname);
                if (parentDomain == hostname) {
                    return;
                }
                const existingRow = await this.table.getRow(parentDomain);
                if (!existingRow) {
                    await this.table.addRow(new LogoTableRow(parentDomain, logo, LogoType.APPROX));
                    return;
                }
                if (LogoTableRowUtil.updateNeeded(existingRow, hostname)) {
                    await this.table.addRow(new LogoTableRow(parentDomain, logo, LogoType.APPROX));
                    return;
                }
            }
            catch (e) {
                throw jserror(e);
            }
        }
    }

    class ZIconTableRow {
        hostName;
        selectors;
        constructor(hostName, selectors) {
            this.hostName = hostName;
            this.selectors = selectors;
        }
    }
    const MAX_SELECTORS_COUNT = 100;
    class ZIconTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        async save(url, selector) {
            try {
                const { hostName, row } = await this.loadRow(url);
                const selectors = (row && row.selectors) || [];
                js.array.addHistory(selectors, selector, MAX_SELECTORS_COUNT);
                await this.table.addRow(new ZIconTableRow(hostName, selectors));
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async load(url) {
            try {
                const { row } = await this.loadRow(url);
                if (!row?.selectors?.length) {
                    return [];
                }
                if (typeof row.selectors[0] == "string") {
                    this.table.clear();
                    return [];
                }
                return row.selectors;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async loadRow(url) {
            const hostName = js.url.getHostName(url);
            const row = await this.table.getRow(hostName);
            return { hostName, row };
        }
    }

    class ZMapsCountryTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        async loadAll() {
            try {
                return this.table.getAllRows();
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async load(country) {
            const row = await this.table.getRow(country);
            if (!row) {
                return {};
            }
            return row;
        }
        async addCustomCountry(country) {
            const obj = { country, code: "" };
            return this.table.addRow(obj);
        }
        async addStates(row) {
            return this.table.addRow(row);
        }
        async addAll(countries) {
            return this.table.addAllRows(countries.map(x => ({ country: x.country_name, code: x.country_code })));
        }
    }

    class ZMapsDistrictTableImpl {
        table;
        init(tableHelperInput) {
            this.table = new TableHelper(tableHelperInput);
        }
        async load(country, state) {
            const row = await this.table.getRow(country + "_" + state);
            if (!row) {
                return {};
            }
            return row;
        }
        async addDistricts(country, state, districts) {
            return this.table.addRow({ country_state: country + "_" + state, districts });
        }
    }

    var TABLE_NAME;
    (function (TABLE_NAME) {
        TABLE_NAME["LOGO"] = "Logo";
        TABLE_NAME["ZICON"] = "ZIcon";
        TABLE_NAME["ZMAPS_COUNTRY"] = "ZMapsCountry";
        TABLE_NAME["ZMAPS_DISTRICT"] = "ZMapsDistrict";
        TABLE_NAME["ENGLISH_DICTIONARY"] = "EnglishDictionary";
    })(TABLE_NAME || (TABLE_NAME = {}));
    class CommonDbHelperInput {
        name = "Common";
        version = 1;
        tables = {
            [TABLE_NAME.LOGO]: TABLE_KEY.DOMAIN,
            [TABLE_NAME.ZICON]: "hostName",
            [TABLE_NAME.ZMAPS_COUNTRY]: "country",
            [TABLE_NAME.ZMAPS_DISTRICT]: "country_state",
            [TABLE_NAME.ENGLISH_DICTIONARY]: "word",
        };
    }
    class CommonDbImpl {
        db = new DbHelper();
        ziconTable = new ZIconTableImpl();
        logoTable = new LogoTableImpl();
        zmapsCountryTable = new ZMapsCountryTableImpl();
        zmapsDistrictTable = new ZMapsDistrictTableImpl();
        dictionaryTable = new DictionaryTableImpl();
        async init() {
            try {
                await this.db.init(new CommonDbHelperInput());
                const initObjMapping = {
                    [TABLE_NAME.LOGO]: this.logoTable,
                    [TABLE_NAME.ZICON]: this.ziconTable,
                    [TABLE_NAME.ZMAPS_COUNTRY]: this.zmapsCountryTable,
                    [TABLE_NAME.ZMAPS_DISTRICT]: this.zmapsDistrictTable,
                    [TABLE_NAME.ENGLISH_DICTIONARY]: this.dictionaryTable,
                };
                for (let tableName in initObjMapping) {
                    initObjMapping[tableName].init({ db: this.db, name: tableName });
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class DbImpl {
        static instance = null;
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return this.instance = new DbImpl();
        }
        gg = new GG$3(this);
        accountDb = new AccountDbImpl(this.gg);
        commonDb = new CommonDbImpl();
        async init() {
            try {
                await this.accountDb.init();
                await this.commonDb.init();
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async clean() {
            try {
                await Promise.all([
                    this.accountDb.db.deleteDb(),
                    this.commonDb.db.deleteDb(),
                ]);
            }
            catch (e) {
                throw jserror(e);
            }
        }
    }

    class GeneratorHistoryComponentImpl {
        MAX_ENTRIES = 20;
        async add(password) {
            try {
                if (!password) {
                    return;
                }
                const entry = {
                    encryptedPassword: await extCrypto.encrypt(password),
                    time: Date.now()
                };
                const existing = await this.getExisting();
                const lastPassword = await this.getLastPassword(existing);
                const alreadyAdded = lastPassword == password;
                if (alreadyAdded) {
                    return;
                }
                existing.push(entry);
                const history = existing.slice(-this.MAX_ENTRIES + 1);
                await accountDb.mapTable.save(MapTableKey.GENERATOR_HISTORY, history);
            }
            catch (e) {
                logError(e);
            }
        }
        async get() {
            try {
                const history = await this.getExisting();
                const decryptedHistory = [];
                for (let entry of history) {
                    await this.decryptHistoryFn(entry, decryptedHistory);
                }
                return decryptedHistory;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async clean() {
            await accountDb.mapTable.save(MapTableKey.GENERATOR_HISTORY, []);
        }
        async getExisting() {
            return await accountDb.mapTable.load(MapTableKey.GENERATOR_HISTORY, []);
        }
        async getLastPassword(historyList) {
            try {
                if (!historyList.length) {
                    return "";
                }
                const lastIndex = historyList.length - 1;
                if (historyList[lastIndex].encryptedPassword) {
                    return await extCrypto.decrypt(historyList[lastIndex].encryptedPassword);
                }
                if (historyList[lastIndex].encrypted_password) {
                    return await bg.zcrypt.decrypt(historyList[lastIndex].encrypted_password, false);
                }
                throw "INVALID_STATE";
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async decryptHistoryFn(history, output) {
            try {
                if (history.encrypted_password) {
                    output.push({
                        password: await bg.zcrypt.decrypt(history.encrypted_password, false),
                        time: history.time
                    });
                    return;
                }
                if (!history.encryptedPassword) {
                    throw "INVALID_STATE";
                }
            }
            catch (e) {
                logError(e);
                return;
            }
            try {
                const password = await extCrypto.decrypt(history.encryptedPassword);
                if (!password) {
                    return;
                }
                output.push({
                    password,
                    time: history.time
                });
            }
            catch (e) {
                if (e instanceof DOMException) {
                    await this.clean();
                    console.info(e);
                    return;
                }
                logError(e);
            }
        }
    }

    class PassphraseGeneratorImpl {
        words;
        async init() {
            try {
                this.init = js.fn.emptyFn;
                const wordsJson = await fetch("/resources/passphrase_words.json").then(x => x.json());
                this.words = wordsJson.words;
            }
            catch (e) {
                logError(e);
            }
        }
        async generate(input) {
            try {
                await this.init();
                const words = this.getWords(input);
                const outWords = Array.from(words);
                this.capitalize(words, input);
                this.addNumbers(words, input);
                const passphrase = words.join(input.separator);
                return {
                    passphrase,
                    words: outWords
                };
            }
            catch (e) {
                logError(e);
                return { passphrase: "", words: [] };
            }
        }
        getWords(input) {
            try {
                if (input?.words?.length == input.noOfWords) {
                    return Array.from(input.words);
                }
                const words = [];
                for (let _ of js.loop.range(input.noOfWords)) {
                    words.push(this.words[js.crypto.generateRandom(this.words.length)]);
                }
                return words;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        capitalize(words, input) {
            try {
                if (!input.reqCapital) {
                    return;
                }
                for (let i of js.loop.range(words.length)) {
                    words[i] = js.string.capitalize(words[i]);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        addNumbers(words, input) {
            try {
                if (!input.reqNumber) {
                    return;
                }
                const numCount = js.crypto.generateRandomRange(1, words.length);
                for (let _ of js.loop.range(numCount)) {
                    this.addDigit(words);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        addDigit(words) {
            try {
                const digit = js.crypto.generateRandom(10);
                const index = js.crypto.generateRandomRange(0, words.length);
                words[index] = words[index] + digit;
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class PasswordComplexity {
        getComplexity(password) {
            try {
                password = this.removeContinousRepeatedPrefix(password);
                password = this.mergeRepeatedPrefix(password);
                const count_char = new Set(password).size;
                let strength = 1;
                if (count_char <= 4) {
                    strength = Math.pow(count_char, password.length);
                }
                else {
                    const charsetCount = this.getCharSetCount(password);
                    let charsetStrength = {
                        lowercase: 20,
                        uppercase: 20,
                        splChar: 15,
                        number: 10
                    };
                    if (charsetCount.number > 0) {
                        charsetStrength.lowercase += 10;
                        charsetStrength.uppercase += 10;
                        charsetStrength.splChar += 10;
                    }
                    if (charsetCount.lowercase > 0) {
                        charsetStrength.uppercase += 20;
                        charsetStrength.splChar += 20;
                    }
                    if (charsetCount.uppercase > 0) {
                        charsetStrength.lowercase += 20;
                        charsetStrength.splChar += 20;
                    }
                    for (let key in charsetCount) {
                        strength *= Math.pow(charsetStrength[key], charsetCount[key]);
                    }
                }
                return Math.max(Math.min(100, this.getPercentRange(Math.log10(strength), 3, 21)), 0) >> 0;
            }
            catch (e) {
                logError(e);
                return 0;
            }
        }
        mergeRepeatedPrefix(s) {
            let ans = s;
            let prefix = "";
            let len_end = s.length / 2;
            let possible_ans = "";
            for (let len = len_end; len > 1; len--) {
                prefix = s.slice(0, len);
                if (!s.startsWith(prefix + prefix)) {
                    continue;
                }
                possible_ans = prefix + s.replace(new RegExp("^(?:" + vutil.search.escapeRegex(prefix) + ")+"), "");
                if (possible_ans.length < ans.length) {
                    ans = possible_ans;
                }
            }
            return ans;
        }
        getCharSetCount(password) {
            const count = {
                lowercase: 0,
                uppercase: 0,
                splChar: 0,
                number: 0
            };
            let ch;
            for (let i = 0; i < password.length; i++) {
                ch = password[i];
                if (ch >= 'a' && ch <= 'z') {
                    count.lowercase++;
                }
                else if (ch >= 'A' && ch <= 'Z') {
                    count.uppercase++;
                }
                else if (ch >= '0' && ch <= '9') {
                    count.number++;
                }
                else {
                    count.splChar++;
                }
            }
            return count;
        }
        getPercentRange(val, low, high) {
            return (val - low) / (high - low) * 100;
        }
        removeContinousRepeatedPrefix(s) {
            let seqEnd = this.getConsecutiveCharsLength(s);
            const prefix = s.slice(0, seqEnd);
            const regex = new RegExp("^(?:" + vutil.search.escapeRegex(prefix) + ")+");
            return s.replace(regex, "");
        }
        getConsecutiveCharsLength(s) {
            if (!s[1] || !this.isAdjacentChar(s[0], s[1])) {
                return 0;
            }
            for (let i = 1; i < s.length; i++) {
                if (!this.isAdjacentChar(s[i - 1], s[i])) {
                    return i;
                }
            }
            return 0;
        }
        isAdjacentChar(a, b) {
            const codeA = a.charCodeAt(0);
            const codeB = b.charCodeAt(0);
            if (Math.abs(codeA - codeB) <= 1) {
                return true;
            }
            if ("qwertyuiopasdfghjklzxcvbnm".includes(a + b)) {
                return true;
            }
            if ("QWERTYUIOPASDFGHJKLZXCVBNM".includes(a + b)) {
                return true;
            }
            return false;
        }
    }

    class PasswordGeneratorImpl {
        complexity = new PasswordComplexity();
        defaultCharset = {
            letter_lower: "abcdefghijklmnopqrstuvwxyz",
            letter_upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            number: "0123456789",
            char_special: "~!@#$%^&*()-_+=|\\{}[];:'\",.<>/?"
        };
        generate(input) {
            try {
                const password = new Array(input.length);
                const correctedCharset = {
                    lowerCharset: js.string.removeChars(this.defaultCharset.letter_lower, input.excludeChars),
                    upperCharset: js.string.removeChars(this.defaultCharset.letter_upper, input.excludeChars),
                    numberCharset: js.string.removeChars(this.defaultCharset.number, input.excludeChars),
                    specialCharset: js.string.removeChars(this.defaultCharset.char_special, input.excludeChars)
                };
                input.reqNumber = input.reqNumber && (correctedCharset.numberCharset.length > 0);
                input.reqSplChar = input.reqSplChar && (correctedCharset.specialCharset.length > 0);
                input.reqUppercase = input.reqUppercase && (correctedCharset.upperCharset.length > 0);
                input.reqLowercase = input.reqLowercase && (correctedCharset.lowerCharset.length > 0);
                let remainingLength = input.length;
                let count;
                let i = 0;
                if (input.reqSplChar && input.noOfSplChar) {
                    count = input.noOfSplChar;
                    remainingLength -= count;
                    i = this.fillCharSetChar(password, i, count, correctedCharset.specialCharset);
                }
                if (input.reqNumber) {
                    count = Math.min(Math.ceil(0.25 * input.length), remainingLength);
                    remainingLength -= count;
                    i = this.fillCharSetChar(password, i, count, correctedCharset.numberCharset);
                }
                if (input.reqSplChar && !input.noOfSplChar) {
                    count = Math.ceil(0.15 * input.length);
                    remainingLength -= count;
                    i = this.fillCharSetChar(password, i, count, correctedCharset.specialCharset);
                }
                const letterStart = i;
                if (input.reqUppercase) {
                    count = Math.floor(0.50 * remainingLength);
                    remainingLength -= count;
                    i = this.fillCharSetChar(password, i, count, correctedCharset.upperCharset);
                }
                if (input.reqLowercase) {
                    count = remainingLength;
                    remainingLength = 0;
                    i = this.fillCharSetChar(password, i, count, correctedCharset.lowerCharset);
                }
                if (remainingLength) {
                    if (input.reqUppercase) {
                        i = this.fillCharSetChar(password, i, remainingLength, correctedCharset.upperCharset);
                    }
                    else if (input.reqSplChar && (input.noOfSplChar == 0)) {
                        i = this.fillCharSetChar(password, i, remainingLength, correctedCharset.specialCharset);
                    }
                    else if (input.reqNumber) {
                        i = this.fillCharSetChar(password, i, remainingLength, correctedCharset.numberCharset);
                    }
                }
                const startWithLetter = input.startWithLetter && (input.reqUppercase || input.reqLowercase);
                if (startWithLetter && letterStart < password.length) {
                    this.swap(password, password.length - 1, js.crypto.generateRandomRange(letterStart, password.length));
                }
                let end = i;
                this.shuffle(password, startWithLetter ? end - 1 : end);
                if (startWithLetter) {
                    let index_end = end - 1;
                    let temp = password[0];
                    password[0] = password[index_end];
                    password[index_end] = temp;
                }
                this.correctPassword(password, end, correctedCharset);
                return password.join("");
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        getComplexity(password) {
            return this.complexity.getComplexity(password);
        }
        fillCharSetChar(password, i, count, charset) {
            while (count-- > 0) {
                password[i++] = charset[js.crypto.generateRandom(charset.length)];
            }
            return i;
        }
        shuffle(a, end) {
            let pos_rand;
            for (let i = end - 1; i > 0; i--) {
                pos_rand = js.crypto.generateRandom(i + 1);
                this.swap(a, i, pos_rand);
            }
        }
        swap(a, i, j) {
            const temp = a[i];
            a[i] = a[j];
            a[j] = temp;
        }
        correctPassword(password, length, charset_all) {
            let charset_req = "";
            for (let i = 1; i < length; i++) {
                if (Math.abs(password[i].charCodeAt(0) - password[i - 1].charCodeAt(0)) > 1) {
                    continue;
                }
                for (let key in charset_all) {
                    if (charset_all[key].includes(password[i])) {
                        charset_req = charset_all[key];
                        break;
                    }
                }
                charset_req = js.string.removeChars(charset_req, this.getAdjacentChar(password[i]));
                if (charset_req.length) {
                    password[i] = charset_req[js.crypto.generateRandom(charset_req.length)];
                }
            }
        }
        getAdjacentChar(ch) {
            const code = ch.charCodeAt(0);
            return String.fromCharCode(code - 1) + ch + String.fromCharCode(code + 1);
        }
    }

    class GeneratorImpl {
        password = new PasswordGeneratorImpl();
        passphrase = new PassphraseGeneratorImpl();
        history = new GeneratorHistoryComponentImpl();
    }

    let GG$2 = class GG {
        vapi;
        fetch;
        util;
        ext;
    };
    const gg = new GG$2();

    class ContactsApiImpl {
        async getDp(zuid) {
            return this.getDpFromServer(zuid, "force-cache");
        }
        async getDpNoCache(zuid) {
            return this.getDpFromServer(zuid, "reload");
        }
        async getSizedDpFromServer(zuid, size) {
            return gg.vapi.fetch.fetch(VFetchInput.newBuilder()
                .server(VFetchServer.CONTACT)
                .endpoint("/file")
                .params({ height: size, width: size, ID: zuid })
                .initParams({ cache: "reload" })
                .responseType(VFetchResponseType.BLOB)
                .build());
        }
        async getDpFromServer(zuid, cache) {
            return gg.vapi.fetch.fetch(VFetchInput.newBuilder()
                .server(VFetchServer.CONTACT)
                .endpoint("/file")
                .params({ fs: "thumb", exp: "30", ID: zuid })
                .initParams({ cache })
                .responseType(VFetchResponseType.BLOB)
                .build());
        }
    }

    class VApiLoginApiImpl {
        async getLogin() {
            return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/json/login?OPERATION_NAME=GET_LOGIN").build());
        }
        async getLicense() {
            return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/license").build());
        }
        async getOrgKey() {
            return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/user/orgkey").build());
        }
        async isValidAuthPass(authPass) {
            const resp = await gg.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.POST)
                .endpoint("/api/json/login?OPERATION_NAME=IS_VALID_AUTHPASS")
                .params("authPass=" + authPass)
                .build());
            return resp;
        }
    }

    class VApiOneauthApiImpl {
        async getDevices() {
            return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/oneauth/devices").build());
        }
        async getDevicePublicKey(deviceToken) {
            try {
                const resp = (await gg.fetch.fetch(VFetchInput.newBuilder()
                    .method(VFetchMethod.POST)
                    .endpoint("/api/rest/json/v1/oneauth/device/public_key")
                    .params({ deviceToken })
                    .checkResponse(true)
                    .build())).result;
                return fnOut.result(resp.operation.Details.publicKey);
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async sendPush(reqBody) {
            return gg.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.POST)
                .endpoint("/api/rest/json/v1/oneauth/push/send")
                .params(reqBody)
                .contentType(VFetchContentType.JSON)
                .build());
        }
        async getPushStatus(tokenId) {
            return gg.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.POST)
                .endpoint("/api/rest/json/v1/oneauth/push/status")
                .params({ tokenId })
                .build());
        }
    }

    class VApiOtherApiImpl {
        async getNewUserInfo() {
            return gg.fetch.fetch(VFetchInput.newBuilder()
                .endpoint("/api/rest/json/v1/ext/new-user")
                .checkResponse(true)
                .build());
        }
    }

    class VApiSecretApiImpl {
        V1_ENDPOINT = "/api/rest/json/v1/secrets";
        V2_ENDPOINT = "/api/rest/json/v2/secrets";
        accessControl = new VApiSecretAccessControlApiImpl();
        async get(secretId) {
            return gg.fetch.fetch(VFetchInput.newBuilder().endpoint(this.V1_ENDPOINT + "/" + secretId).build());
        }
        async getAll(params) {
            try {
                const input = { pageNum: params.pageNo, isAsc: true, rowPerPage: params.rowsPerPage };
                if (params.chamberId) {
                    input.chamberId = params.chamberId;
                }
                return gg.fetch.fetch(VFetchInput.newBuilder()
                    .endpoint(this.V1_ENDPOINT)
                    .params(input)
                    .build());
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
        async delete(secretId) {
            return gg.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.DELETE)
                .endpoint(`${this.V1_ENDPOINT}/${secretId}`)
                .checkResponse(true)
                .build());
        }
        setProperty(secretId, params) {
            const passwordObj = Object.assign({ secretid: secretId }, params);
            return gg.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.PUT)
                .endpoint(this.V1_ENDPOINT)
                .params(JSON.stringify({ passwords: [passwordObj] }))
                .checkResponse(true)
                .build());
        }
        async add(input) {
            return gg.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.POST)
                .endpoint(this.V2_ENDPOINT)
                .params("INPUT_DATA=" + encodeURIComponent(JSON.stringify(input)))
                .build());
        }
        async update(input) {
            return gg.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.PUT)
                .endpoint(`${this.V2_ENDPOINT}/${input.secret_auto_id}`)
                .params("INPUT_DATA=" + encodeURIComponent(JSON.stringify(input)))
                .build());
        }
        async saveAssessment(input) {
            return gg.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.POST)
                .endpoint("/api/rest/json/v1/passwordReport/secret/" + input.secretid)
                .params({ weakDetails: JSON.stringify([input]) })
                .build());
        }
    }
    class VApiSecretAccessControlApiImpl {
        async isHelpdeskEnabled(secretId) {
            try {
                const resp = await gg.fetch.fetch(VFetchInput.newBuilder()
                    .method(VFetchMethod.GET)
                    .endpoint(`/api/rest/json/v1/accesscontrol/helpdesk/${secretId}`)
                    .build());
                const details = resp.result.operation.Details;
                return details.hdEnabled;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class VApiNeverSaveApiImpl {
        async getAll() {
            return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/ext/never_saves").build());
        }
        async add(domain) {
            return gg.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.POST)
                .endpoint("/api/rest/json/v1/ext/never_save")
                .params({ domain })
                .build());
        }
        async remove(domain) {
            return gg.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.DELETE)
                .endpoint("/api/rest/json/v1/ext/never_save")
                .params({ domain })
                .build());
        }
    }

    class VApiSettingsApiImpl {
        neverSave = new VApiNeverSaveApiImpl();
        async change(name, value) {
            try {
                return await gg.fetch.fetch(VFetchInput.newBuilder()
                    .endpoint("/api/rest/json/v1/settings")
                    .method(VFetchMethod.POST)
                    .params({ mode: "set", name, value })
                    .checkResponse(true)
                    .build());
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async changeExtSetting(name, value) {
            try {
                return await gg.fetch.fetch(VFetchInput.newBuilder()
                    .endpoint("/api/rest/json/v1/ext/settings")
                    .method(VFetchMethod.POST)
                    .params({ name, value })
                    .checkResponse(true)
                    .build());
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async getExperimentalSettings() {
            try {
                const resp = await gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/ext/experimental_settings").build());
                if (!resp.ok) {
                    return resp;
                }
                const obj = resp.result.operation.Details;
                return fnOut.result(obj);
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async getAll() {
            return gg.fetch.fetch(VFetchInput.newBuilder()
                .endpoint("/api/rest/json/v1/ext/settings")
                .build());
        }
    }

    class VApiSharingApiImpl {
        async getUserSharingInfo(secretId) {
            return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/sharing/secret/user" + "/" + secretId).build());
        }
        async getUserGroupSharingInfo(secretId) {
            return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/sharing/secret/usergroup" + "/" + secretId).build());
        }
    }

    class VApiWebauthnUnlockApiImpl {
        async getChallenge() {
            return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/webauthn/challenge").build());
        }
        async getCredentials() {
            return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/webauthn/credentials").build());
        }
        async getPublicKey() {
            return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/webauthn/public_key").build());
        }
        async decrypt(input) {
            return gg.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.POST)
                .endpoint("/api/rest/json/v1/webauthn/decrypt")
                .params(input)
                .contentType(VFetchContentType.JSON)
                .build());
        }
    }

    class VApiUnlockApiImpl {
        webauthn = new VApiWebauthnUnlockApiImpl();
        async getWebUnlockPublicKey() {
            return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/ext/web/public_key").build());
        }
    }

    let Util$1 = class Util {
        getBrowserName() {
            try {
                const name = js.browser.getName();
                switch (name) {
                    case BrowserName.CHROME:
                        return "chrome";
                    case BrowserName.EDGE:
                        return "edge";
                    case BrowserName.FIREFOX:
                        return "firefox";
                    case BrowserName.SAFARI:
                        return "safari";
                    case BrowserName.OPERA:
                        return "opera";
                    default:
                        throw ErrorCode.UNHANDLED_CASE;
                }
            }
            catch (e) {
                logError(e);
                return "chrome";
            }
        }
        getStringParams(input) {
            try {
                if (!input.params) {
                    return "";
                }
                if (typeof input.params == "string") {
                    return input.params;
                }
                if (input instanceof URLSearchParams) {
                    return input.toString();
                }
                const urlSearchParam = new URLSearchParams();
                for (let key in input.params) {
                    urlSearchParam.set(key, input.params[key]);
                }
                return urlSearchParam.toString();
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        printRespType(resp) {
            const type = this.getRespType(resp);
            let type_string = JSON.stringify(type);
            type_string = type_string.replace(/,"/g, ';"');
            type_string = type_string.replace(/([^:"]*?):/g, "$1: ");
            type_string = type_string.replace(/"(string|number|boolean)"/g, "$1");
            type_string = type_string.replace(/"/g, "");
            console.info("\n", type_string);
        }
        getRespType(resp) {
            const types = {};
            let type;
            let cur;
            if (typeof resp != "object") {
                return typeof resp;
            }
            for (let key in resp) {
                cur = resp[key];
                type = typeof cur;
                if (type != "object") ;
                else if (Array.isArray(cur)) {
                    type = [this.getRespType(cur[0])];
                }
                else {
                    type = this.getRespType(cur);
                }
                types[key] = type;
            }
            return types;
        }
    };

    class VApiExternal {
        getApiPassphraseHeaders() {
            return bg.vaultLogin.getApiPassphraseHeaders();
        }
        parseDOMContents(htmlContent, ...selectors) {
            return bg.offscreenApi.parseDOMContents(htmlContent, ...selectors);
        }
        silentSignout() {
            return bg.vault.silentSignOut();
        }
        passphraseChanged() {
            return bg.vaultLogin.handlePassphraseChange();
        }
    }

    class VHeaders {
        ADDON_VERSION = "";
        uiLang = chrome.i18n.getUILanguage();
        init() {
            try {
                this.ADDON_VERSION = gg.util.getBrowserName() + "/" + chrome.runtime.getManifest().version;
            }
            catch (e) {
                logError(e);
            }
        }
        async getHeaders(contentType) {
            return {
                "Content-Type": contentType,
                authorization: "Zoho-oauthtoken " + await oauth.getAccessToken(),
                addonversion: this.ADDON_VERSION,
                language: this.uiLang,
            };
        }
        async getHeadersFn(input) {
            const headers = {
                ...await this.getHeaders(input.contentType),
                ...(input.headers || {})
            };
            if (input.server != VFetchServer.VAULT) {
                return headers;
            }
            const vaultHeaders = await gg.ext.getApiPassphraseHeaders();
            if (!vaultHeaders) {
                return headers;
            }
            if (vaultHeaders.CREATION_TIME) {
                headers["PassphraseCreated"] = vaultHeaders.CREATION_TIME;
            }
            if (vaultHeaders.MODIFIED_TIME) {
                headers["LastPassphraseChange"] = vaultHeaders.MODIFIED_TIME;
            }
            return headers;
        }
    }

    class VResponseGetter {
        async get(input, response) {
            switch (input.responseType) {
                case VFetchResponseType.JSON: {
                    const resp = await this.getJsonResponse(response);
                    await this.checkJsonResponse(input, resp);
                    return resp;
                }
                case VFetchResponseType.TEXT:
                    return response.text();
                case VFetchResponseType.RAW:
                    return response;
                case VFetchResponseType.BLOB:
                    return response.blob();
                default:
                    throw "INVALID_RESPONSE_TYPE";
            }
        }
        async checkJsonResponse(input, resp) {
            await this.checkInvalidOauthTokens(resp);
            await this.checkVaultResponse(resp, input);
        }
        async getJsonResponse(resp) {
            const respText = await resp.text();
            try {
                return JSON.parse(respText);
            }
            catch (e) {
            }
            const errorObj = {
                operation: {
                    result: {
                        status: "failed",
                        message: "JSON_PARSE_ERROR: " + respText
                    }
                }
            };
            if (respText.includes("<html")) {
                try {
                    errorObj.operation.result.message = (await gg.ext.parseDOMContents(respText, "*"))[0];
                }
                catch (e) {
                    logError(e);
                }
            }
            return errorObj;
        }
        async checkInvalidOauthTokens(resp) {
            try {
                if (resp?.operation?.result?.error_code == "INVALID_OAUTHTOKEN") {
                    await gg.ext.silentSignout();
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async checkVaultResponse(resp, input) {
            await this.checkPassphraseChangedError(resp);
            if (!input.checkResponse || resp?.operation?.result?.status?.toLowerCase?.() == "success") {
                return;
            }
            throw this.getApiFailedErrorMsg(resp);
        }
        getApiFailedErrorMsg(resp) {
            if (resp?.operation?.result?.message) {
                return resp?.operation?.result?.message;
            }
            return `API_REQUEST ${resp?.operation?.name || ""} failed`;
        }
        async checkPassphraseChangedError(response) {
            try {
                const errorCode = response?.operation?.result?.error_code;
                if (errorCode == "INVALID_PASSPHRASE_SYNC") {
                    await gg.ext.passphraseChanged();
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class VUrl {
        async get(input) {
            try {
                return `${this.getHost(input)}${input.endpoint}${this.getQueryParams(input)}`;
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
        getHost(input) {
            try {
                switch (input.server) {
                    case VFetchServer.VAULT:
                        return urlProvider.getVaultUrl();
                    case VFetchServer.ACCOUNTS:
                        return urlProvider.getAccountsUrl();
                    case VFetchServer.CONTACT:
                        return urlProvider.getContactsUrl();
                    case VFetchServer.CUSTOM:
                        return "";
                    default:
                        throw "INVALID_SERVER: " + input.server;
                }
            }
            catch (e) {
                logError(e);
                return urlProvider.getVaultUrl();
            }
        }
        getQueryParams(input) {
            try {
                if (input.method != VFetchMethod.GET || !input.params) {
                    return "";
                }
                return "?" + gg.util.getStringParams(input);
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
    }

    class VFetchImpl {
        headers = new VHeaders();
        url = new VUrl();
        response = new VResponseGetter();
        init() {
            try {
                this.headers.init();
            }
            catch (e) {
                logError(e);
            }
        }
        async fetch(input) {
            try {
                const url = await this.url.get(input);
                const headerResp = await fetch(url, {
                    method: input.method,
                    headers: await this.headers.getHeadersFn(input),
                    body: this.getBody(input),
                    ...(input.initParams || {}),
                });
                if (!headerResp.ok) {
                    throw "RESPONSE_NOT_OK";
                }
                const resp = await this.response.get(input, headerResp);
                return fnOut.result(resp);
            }
            catch (e) {
                logError(e);
                const errorMsg = e + "";
                return fnOut.error(errorMsg == "TypeError: Failed to fetch" ? "offline or blocked" : errorMsg);
            }
        }
        async getHeaders(contentType = VFetchContentType.URL_ENCODED) {
            return this.headers.getHeaders(contentType);
        }
        getBody(input) {
            try {
                if (!input.params || input.method == VFetchMethod.GET) {
                    return undefined;
                }
                if (typeof input.params == "string") {
                    return input.params;
                }
                if (input.params instanceof URLSearchParams) {
                    return input.params.toString();
                }
                if (input.contentType == VFetchContentType.JSON) {
                    return JSON.stringify(input.params);
                }
                return gg.util.getStringParams(input);
            }
            catch (e) {
                logError(e);
                return undefined;
            }
        }
    }

    class VApiImpl {
        fetch = new VFetchImpl();
        contacts = new ContactsApiImpl();
        login = new VApiLoginApiImpl();
        oneauth = new VApiOneauthApiImpl();
        unlock = new VApiUnlockApiImpl();
        settings = new VApiSettingsApiImpl();
        sharing = new VApiSharingApiImpl();
        secret = new VApiSecretApiImpl();
        other = new VApiOtherApiImpl();
        init() {
            try {
                gg.vapi = this;
                gg.util = new Util$1();
                gg.ext = new VApiExternal();
                gg.fetch = this.fetch;
                this.fetch.init();
            }
            catch (e) {
                logError(e);
            }
        }
        isRespOk(resp) {
            return resp?.operation?.result?.status?.toLowerCase?.() == "success";
        }
        async getRecordingOld(domain) {
            return this.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/json/quickadd")
                .params({ OPERATION_NAME: "GET_RECORDING", url: domain }).build());
        }
        async getRecording(domain) {
            try {
                const resp = await this.fetch.fetch(VFetchInput.newBuilder()
                    .method(VFetchMethod.POST)
                    .endpoint("/api/rest/json/v1/ext/recording")
                    .params({ domain })
                    .build());
                if (!resp.ok) {
                    throw "API_NEEDS_TO_GO_LIVE";
                }
                return resp;
            }
            catch (e) {
                console.info("ok: api needs to go live ", e);
                return this.getRecordingOld(domain);
            }
        }
        async getAllSecretTypes() {
            return this.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/secrettypes?allTypes=true").build());
        }
        async getAllFolders() {
            return this.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/chambers").params({ pageNum: 0, rowPerPage: -1 }).build());
        }
        async getPasswordResetSteps(secretId, domain) {
            return this.fetch.fetch(VFetchInput.newBuilder()
                .endpoint("/api/json/secrets")
                .params({ OPERATION_NAME: "GET_CHANGE_PASSWORD_DETAILS", SECRET_AUTO_ID: secretId, DOMAIN: domain })
                .build());
        }
        async getExistingSecretNames(name) {
            return this.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/secrets/existing_names").params({ name }).build());
        }
        async getAllFiles(secretId) {
            return this.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/secrets/downloadfile").params({ secretId }).build());
        }
        async auditUserAction(opType) {
            return this.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.POST)
                .endpoint("/api/rest/json/v1/audit/action")
                .params({ action: "userAudit", opType })
                .build());
        }
        async auditMasterPassword(valid) {
            return this.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.POST)
                .endpoint("/api/rest/json/v1/user/login")
                .params({ status: valid + "" })
                .build());
        }
        async emptyTrash() {
            return this.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.DELETE)
                .endpoint("/api/rest/json/v1/secrets/emptytrash")
                .checkResponse(true)
                .build());
        }
        async getCDNUrls(paths) {
            try {
                const resp = await this.fetch.fetch(VFetchInput.newBuilder()
                    .method(VFetchMethod.POST)
                    .endpoint("/api/rest/json/v1/cdn/path")
                    .contentType(VFetchContentType.JSON)
                    .params({ path: paths })
                    .checkResponse(true)
                    .build());
                if (!resp.ok) {
                    return resp;
                }
                const pathObj = resp.result.operation.Details.path;
                return fnOut.result(pathObj);
            }
            catch (e) {
                throw e;
            }
        }
    }

    let GG$1 = class GG {
        unlock;
        constructor(unlock) {
            this.unlock = unlock;
        }
        util;
    };

    var ONEAUTH_STATUS;
    (function (ONEAUTH_STATUS) {
        ONEAUTH_STATUS["NO_DEVICE_FOUND"] = "NO_DEVICE_FOUND";
        ONEAUTH_STATUS["UPGRADE_APP"] = "UPGRADE_APP";
    })(ONEAUTH_STATUS || (ONEAUTH_STATUS = {}));
    var UnlockMethod;
    (function (UnlockMethod) {
        UnlockMethod["MASTER"] = "MASTER";
        UnlockMethod["ONEAUTH"] = "ONEAUTH";
        UnlockMethod["WEBAUTHN"] = "WEBAUTHN";
    })(UnlockMethod || (UnlockMethod = {}));

    class OneAuthDevice {
        name;
        token;
        publicKey;
    }
    class DeviceProvider {
        async getDevice() {
            try {
                const deviceResult = (await this.getDeviceNameToken());
                if (!deviceResult.ok) {
                    return deviceResult;
                }
                const device = deviceResult.result;
                const publicKey = (await vapi.oneauth.getDevicePublicKey(device.token)).result;
                if (!publicKey) {
                    throw ONEAUTH_STATUS.UPGRADE_APP;
                }
                device.publicKey = publicKey;
                return fnOut.result(device);
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async getDeviceNameToken() {
            const resp = (await vapi.oneauth.getDevices()).result;
            if (!vapi.isRespOk(resp)) {
                return fnOut.error(resp.operation.result.message || "INVALID_API_RESPONSE");
            }
            const deviceObj = resp.operation.Details;
            if (js.obj.isEmpty(deviceObj)) {
                return fnOut.error(ONEAUTH_STATUS.NO_DEVICE_FOUND);
            }
            const primaryDevice = this.extractDevice(deviceObj.primary);
            if (primaryDevice) {
                return fnOut.result(primaryDevice);
            }
            const secondaryDevice = this.extractDevice(deviceObj.secondary);
            if (secondaryDevice) {
                return fnOut.result(secondaryDevice);
            }
            return fnOut.error(ONEAUTH_STATUS.NO_DEVICE_FOUND);
        }
        extractDevice(deviceArray = []) {
            if (!deviceArray || !Array.isArray(deviceArray) || deviceArray.length == 0) {
                return null;
            }
            for (let device of deviceArray) {
                if (!device.device_name || !device.device_token) {
                    continue;
                }
                const resDevice = new OneAuthDevice();
                resDevice.name = device.device_name;
                resDevice.token = device.device_token;
                return resDevice;
            }
            return null;
        }
    }

    class OneauthStroage {
        async save(device, localEncMasterKey, oneAuthEncLocalKey) {
            await zlocalStorage.save(LocalStorageKeys.ONEAUTH_UNLOCK, { device, localEncMasterKey, oneAuthEncLocalKey });
        }
        async load() {
            return await zlocalStorage.load(LocalStorageKeys.ONEAUTH_UNLOCK, "");
        }
        async clear() {
            return zlocalStorage.remove(LocalStorageKeys.ONEAUTH_UNLOCK);
        }
    }

    const OneAuthPushRespStatus = {
        DECRYPTION_PENDING: "DECRYPTION_PENDING",
        DECRYPTION_COMPLETED: "DECRYPTION_COMPLETED"
    };
    class PushUnlock {
        gg;
        device = null;
        pushResponsePromise = null;
        pushToken = "";
        currentPushStatus = null;
        pollCallId = 0;
        lastPushArgs = null;
        pushRespData = "";
        constructor(gg) {
            this.gg = gg;
        }
        async unlock() {
            try {
                const existingData = await this.gg.unlock.oneauth.storage.load();
                if (!existingData) {
                    throw "NO_EXISTING_DATA";
                }
                this.device = existingData.device;
                const localEncMasterKey = existingData.localEncMasterKey;
                const oneAuthEncLocalKey = existingData.oneAuthEncLocalKey;
                if (!localEncMasterKey || !oneAuthEncLocalKey || !this.device || !this.device.publicKey || !this.device.token) {
                    this.gg.unlock.oneauth.storage.clear();
                    throw "INVALID_EXISTING_DATA";
                }
                const { publicKey, privateKey } = (await js.crypto.rsa.generateKey()).result;
                const exportedPublicKey = await js.crypto.rsa.exportPublicKey(publicKey);
                const decryptResult = await this.oneAuthDecrypt(oneAuthEncLocalKey, exportedPublicKey);
                if (!decryptResult.ok) {
                    return decryptResult;
                }
                const localKeyRsaEncrypted = decryptResult.result;
                if (!localKeyRsaEncrypted) {
                    throw "CANNOT_OBTAIN_LOCAL_KEY";
                }
                const localKeyBase64 = await js.crypto.rsa.decrypt(localKeyRsaEncrypted, privateKey);
                const localKey = (await js.crypto.aes.importKey(localKeyBase64)).result;
                const key = await js.crypto.aes.decrypt(localEncMasterKey, localKey);
                return fnOut.result(key);
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async resendPush() {
            const pushResp = (await this.sendPush.apply(this, this.lastPushArgs)).result;
            this.pushToken = pushResp.token;
            this.pollResponse();
        }
        async oneAuthDecrypt(ciphertext, reqPublicKey) {
            const pushResp = (await this.sendPush(ciphertext, reqPublicKey)).result;
            this.pushResponsePromise = js.promise.createNew();
            this.pushToken = pushResp.token;
            this.pollResponse();
            const resp = await this.pushResponsePromise;
            if (!resp) {
                return fnOut.error("DENIED");
            }
            return fnOut.result(resp);
        }
        async sendPush(oneauthEncryptedLocalKey, publicKey) {
            try {
                this.lastPushArgs = Array.from(arguments);
                const reqBody = {
                    deviceToken: this.device.token,
                    pushData: {
                        title: "Unlock Zoho Vault",
                        message: "",
                        notifyurl: "https://vault.zoho.com",
                        custom: {
                            val: oneauthEncryptedLocalKey,
                            data: publicKey
                        }
                    }
                };
                const resp = (await vapi.oneauth.sendPush(reqBody)).result;
                if (!resp.operation || !resp.operation.result) {
                    throw new Error("INVALID_RESPONSE");
                }
                if (!vapi.isRespOk(resp)) {
                    throw resp.operation.result.message;
                }
                const iamResp = resp.operation.Details;
                const SUCCESS_CODE = "PN200";
                if (iamResp.code != SUCCESS_CODE) {
                    throw iamResp.message;
                }
                try {
                    this.oneAuthPushSent();
                }
                catch (e) {
                    logError(e);
                }
                return fnOut.result(iamResp);
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async checkStatus() {
            this.currentPushStatus = await this.getPushDecryptStatus(this.pushToken);
            if (this.currentPushStatus == OneAuthPushRespStatus.DECRYPTION_COMPLETED) {
                this.pushResponsePromise.resolve(this.pushRespData);
            }
        }
        async getPushDecryptStatus(tokenId) {
            const resp = (await vapi.oneauth.getPushStatus(tokenId)).result;
            if (!resp.operation || !resp.operation.result) {
                throw new Error("INVALID_RESPONSE");
            }
            if (!vapi.isRespOk(resp)) {
                throw resp.operation.result.message;
            }
            const statusResp = resp.operation.Details;
            switch (statusResp.code) {
                case "D102": return OneAuthPushRespStatus.DECRYPTION_PENDING;
                case "D101":
                    this.pushRespData = statusResp.data;
                    return OneAuthPushRespStatus.DECRYPTION_COMPLETED;
                case "D103":
                    this.pushRespData = "";
                    return OneAuthPushRespStatus.DECRYPTION_COMPLETED;
                default:
                    throw new Error("INVALID_STATE_" + statusResp.code + ": " + statusResp.message);
            }
        }
        async pollResponse() {
            const pollCallId = ++this.pollCallId;
            const timeDelay = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5];
            for (let delay of timeDelay) {
                await this.checkStatus();
                await js.time.delay(delay);
                if (!this.pushResponsePromise.isPending() || pollCallId != this.pollCallId) {
                    return;
                }
            }
            this.pushResponsePromise.reject("TIME_OUT");
        }
        async oneAuthPushSent() {
            try {
                const hasPopup = await bg$1.popupClient.checkConnectable();
                if (hasPopup) {
                    bg$1.popupClient.oneAuthPushSent();
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class OneauthUnlockImpl {
        gg;
        storage = new OneauthStroage();
        deviceProvider = new DeviceProvider();
        pushUnlock;
        constructor(gg) {
            this.gg = gg;
            this.pushUnlock = new PushUnlock(gg);
        }
        init() { }
        async enable(enable) {
            try {
                if (!enable) {
                    await this.storage.clear();
                    (await this.updateSetting(false)).result;
                    return fnOut.OK;
                }
                (await this.setup()).result;
                (await this.updateSetting(true)).result;
                return fnOut.OK;
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async setup() {
            try {
                const masterKey = await bg$1.zcrypt.getMasterKey();
                if (!masterKey) {
                    throw "EMPTY_MASTER_KEY";
                }
                const localKey = (await js.crypto.aes.generateKey()).result;
                const exportedLocalKey = (await js.crypto.aes.exportKey(localKey)).result;
                const deviceResult = await this.deviceProvider.getDevice();
                if (!deviceResult.ok) {
                    return deviceResult;
                }
                const device = deviceResult.result;
                const oneAuthPublicKey = await js.crypto.rsa.importPublicKey(device.publicKey);
                const oneAuthEncryptedLocalKey = await js.crypto.rsa.encrypt(exportedLocalKey, oneAuthPublicKey);
                const localEncryptedMasterKey = await js.crypto.aes.encrypt(masterKey, localKey);
                await this.storage.save(device, localEncryptedMasterKey, oneAuthEncryptedLocalKey);
                return fnOut.OK;
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async unlock() {
            try {
                await zsessionStorage.save(SessionStorageKeys.ONEAUTH_UNLOCK_STARTED, Date.now());
                const keyResp = await this.pushUnlock.unlock();
                if (!keyResp.ok) {
                    this.oneAuthUnlockComplete(keyResp);
                    return keyResp;
                }
                const key = keyResp.result;
                await bg$1.vaultLogin.unlockVault(key);
                vapi.auditUserAction("UnlockedUsingOneAuth");
                this.gg.unlock.setLastUnlockMethod(UnlockMethod$1.ONEAUTH);
                this.oneAuthUnlockComplete(fnOut.OK);
                return fnOut.OK;
            }
            catch (e) {
                logError(e);
                this.oneAuthUnlockComplete(fnOut.error(e));
                return fnOut.error(e);
            }
            finally {
                await zsessionStorage.remove(SessionStorageKeys.ONEAUTH_UNLOCK_STARTED);
            }
        }
        async resendPush() {
            this.pushUnlock.resendPush();
        }
        async sync() {
            try {
                const enabled = await zlocalStorage.load(LocalStorageKeys.ONEAUTH_UNLOCK_ENABLED, false);
                if (!enabled) {
                    return;
                }
                await this.setup();
            }
            catch (e) {
                logError(e);
            }
        }
        async isUnlockable() {
            try {
                const KEYS = LocalStorageKeys;
                const existing = await zlocalStorage.loadAll({
                    [KEYS.RESTRICT_ONEAUTH_UNLOCK]: false,
                    [KEYS.ONEAUTH_UNLOCK_ENABLED]: false,
                    [KEYS.ONEAUTH_UNLOCK]: null,
                });
                return !existing[KEYS.RESTRICT_ONEAUTH_UNLOCK] && existing[KEYS.ONEAUTH_UNLOCK_ENABLED] && existing[KEYS.ONEAUTH_UNLOCK];
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async oneAuthUnlockComplete(resp) {
            try {
                const hasPopup = await bg$1.popupClient.checkConnectable();
                if (hasPopup) {
                    bg$1.popupClient.oneAuthUnlockComplete(resp);
                    return;
                }
                if (!resp.error) {
                    return;
                }
                this.gg.util.setUnlockError(UnlockMethod$1.ONEAUTH, resp);
            }
            catch (e) {
                logError(e);
            }
        }
        async updateSetting(enable) {
            try {
                const value = enable ? bg$1.vaultSettings.SERVER_VALUE.ENABLED : bg$1.vaultSettings.SERVER_VALUE.DISABLED;
                (await bg$1.vaultSettings.changeSettingInServer(bg$1.vaultSettings.SERVER_NAME.ONEAUTH_UNLOCK, value)).result;
                await zlocalStorage.save(LocalStorageKeys.ONEAUTH_UNLOCK_ENABLED, enable);
                return fnOut.OK;
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
    }

    class UnlockAlgorithm {
        gg;
        constructor(gg) {
            this.gg = gg;
        }
    }

    class PBKDF2Algorithm extends UnlockAlgorithm {
        constructor(gg) { super(gg); }
        async unlock(passphrase) {
            try {
                const { salt, iterations, encryptedDate } = this.gg.unlock.passphrase.data;
                const key = await VaultCrypto.pbkdf2(passphrase, salt, iterations);
                try {
                    JSON.parse(await VaultCrypto.aesDecrypt(encryptedDate, key));
                }
                catch (e) {
                    return fnOut.error("INVALID_KEY");
                }
                return fnOut.result(key);
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
    }

    class PassphraseUnlockData {
        loginType;
        salt;
        iterations;
        encryptedDate;
        async init() {
            const KEYS = LocalStorageKeys;
            const stored = await zlocalStorage.loadAll({
                [KEYS.LOGIN_TYPE]: "NONE",
                [KEYS.SALT]: "",
                [KEYS.ITERATIONS]: 0,
                [KEYS.ENCRYPTED_DATE]: "",
            });
            this.loginType = stored[KEYS.LOGIN_TYPE];
            this.salt = stored[KEYS.SALT];
            this.iterations = stored[KEYS.ITERATIONS];
            this.encryptedDate = stored[KEYS.ENCRYPTED_DATE];
        }
    }

    class SHAAlgorithm extends UnlockAlgorithm {
        constructor(gg) { super(gg); }
        async unlock(passphrase) {
            try {
                const { salt } = this.gg.unlock.passphrase.data;
                const key = bg$1.zcrypt.hash(passphrase);
                const authPass = bg$1.zcrypt.hash(key + salt);
                const valid = (await vapi.login.isValidAuthPass(authPass)).result.operation.details.IS_VALID_AUTHPASS;
                if (!valid) {
                    return fnOut.error("INVALID_KEY");
                }
                return fnOut.result(key);
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
    }

    class PassphraseUnlockImpl {
        gg;
        MAX_INVALID_ATTEMPTS = 5;
        data = new PassphraseUnlockData();
        pbkdf2Algorithm;
        shaAlgorithm;
        constructor(gg) {
            this.gg = gg;
            this.pbkdf2Algorithm = new PBKDF2Algorithm(gg);
            this.shaAlgorithm = new SHAAlgorithm(gg);
        }
        init() { }
        async unlock(passphrase) {
            try {
                await this.data.init();
                const unlocker = this.getUnlockAlgorithm(this.data.loginType);
                const unlockResult = await unlocker.unlock(passphrase);
                if (!unlockResult.ok) {
                    const respResult = { unlocked: false };
                    await this.handleInvalidMasterPassword(respResult);
                    return respResult;
                }
                try {
                    bg$1.vaultSync.afterSyncLicenseComplete().then(() => {
                        this.gg.unlock.oneauth.sync();
                        this.gg.unlock.webauthn.sync();
                    });
                }
                catch (e) {
                    logError(e);
                }
                const key = unlockResult.result;
                await bg$1.vaultLogin.unlockVault(key);
                this.gg.unlock.setLastUnlockMethod(UnlockMethod$1.MASTER);
                vapi.auditMasterPassword(true);
                if (isDevMode && config.get(ConfigKeys.CACHE_DEV_MASTER_PASSWORD)) {
                    zlocalStorage.save(LocalStorageKeys.DEV_MASTER_PASSWORD, passphrase);
                }
                return { unlocked: true };
            }
            catch (e) {
                logError(e);
                return { unlocked: false };
            }
        }
        async handleInvalidMasterPassword(unlockResult) {
            try {
                vapi.auditMasterPassword(false);
                const invalidCount = await zlocalStorage.load(LocalStorageKeys.PASSPHRASE_INVALID_COUNT, 0) + 1;
                const remainingAttempts = this.MAX_INVALID_ATTEMPTS - invalidCount;
                unlockResult.attemptsRemaining = remainingAttempts;
                if (remainingAttempts > 0) {
                    await zlocalStorage.save(LocalStorageKeys.PASSPHRASE_INVALID_COUNT, invalidCount);
                    return;
                }
                await bg$1.vault.forceSignOut();
            }
            catch (e) {
                logError(e);
            }
        }
        getUnlockAlgorithm(loginType) {
            try {
                const PBKDF2_AES = "PBKDF2_AES";
                const SHA256 = "SHA256";
                switch (loginType) {
                    case PBKDF2_AES: return this.pbkdf2Algorithm;
                    case SHA256: return this.shaAlgorithm;
                    default: throw "INVALID_ALGORITH: " + loginType;
                }
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
    }

    class UnlockUtil {
        async setUnlockError(type, errorResp) {
            const nextTwoMinute = Date.now() + (2 * 60 * 1000);
            zsessionStorage.save(SessionStorageKeys.POPUP_UNLOCK_ERROR, { type, resp: errorResp, validUpto: nextTwoMinute });
        }
    }

    class CredentialGetter {
        tabCreator = null;
        init() {
            this.tabCreator = bgUtil.newTabCreator({ tabName: "WEBAUTHN_TAB" });
        }
        async getCredential(challenge, credentialIds) {
            try {
                const tab = (await this.tabCreator.create(urlProvider.getVaultUrl() + "/extension/unlock")).result;
                csApi.webauthnUnlock.getCredential(challenge, credentialIds, tab.id);
            }
            catch (e) {
                logError(e);
            }
        }
        closeTab() {
            return this.tabCreator.close();
        }
    }

    class WebAuthnStorage {
        async save(localEncMasterKey, serverEncLocalKey) {
            await zlocalStorage.save(LocalStorageKeys.WEBAUTHN_UNLOCK, { localEncMasterKey, serverEncLocalKey });
        }
        async load() {
            return await zlocalStorage.load(LocalStorageKeys.WEBAUTHN_UNLOCK, "");
        }
        async clear() {
            return zlocalStorage.remove(LocalStorageKeys.WEBAUTHN_UNLOCK);
        }
    }

    class WebAuthnUnlocker {
        gg;
        CHALLENGE_KEY = "WEBAUTHN_CHALLENGE";
        constructor(gg) {
            this.gg = gg;
        }
        async startUnlock() {
            try {
                const challengeResp = (await vapi.unlock.webauthn.getChallenge()).result;
                const challenge = challengeResp.operation.Details.CHALLENGE;
                const credentialIds = challengeResp.operation.Details.CREDENTIAL_IDS;
                await zsessionStorage.save(this.CHALLENGE_KEY, {
                    challengeId: challengeResp.operation.Details.CHALLENGE_ID
                });
                this.gg.unlock.webauthn.credentialGetter.getCredential(challenge, credentialIds);
            }
            catch (e) {
                logError(e);
            }
        }
        async continueUnlock(credentialResp) {
            try {
                if (!credentialResp.ok) {
                    this.webauthnUnlockComplete(credentialResp);
                    return;
                }
                const credential = credentialResp.result;
                const { challengeId } = await zsessionStorage.load(this.CHALLENGE_KEY, {});
                if (!challengeId) {
                    throw "INVALID_CHALLENGE_ID";
                }
                const savedData = await this.gg.unlock.webauthn.storage.load();
                if (!savedData || !savedData.localEncMasterKey || !savedData.serverEncLocalKey) {
                    this.gg.unlock.webauthn.storage.clear();
                    throw "INVALID_EXISTING_DATA";
                }
                const { localEncMasterKey, serverEncLocalKey } = savedData;
                const { publicKey, privateKey } = (await js.crypto.rsa.generateKey()).result;
                const exportedPublicKey = await js.crypto.rsa.exportPublicKey(publicKey);
                const apiInput = {
                    ciphertext: serverEncLocalKey,
                    publicKey: exportedPublicKey,
                    challengeId: challengeId,
                    credentialId: credential.credentialId,
                    signature: credential.signature,
                    clientData: credential.clientData,
                    authData: credential.authData
                };
                const resp = (await vapi.unlock.webauthn.decrypt(apiInput)).result;
                if (resp.operation.result.status != "success") {
                    throw resp.operation.result.message || "webauthn decrypt api response failed";
                }
                const localKeyRsaEncrypted = await resp.operation.Details.key;
                if (!localKeyRsaEncrypted) {
                    throw "INVALID_RESPONSE";
                }
                const localKeyBase64 = await js.crypto.rsa.decrypt(localKeyRsaEncrypted, privateKey);
                if (!localKeyBase64) {
                    throw "EMPTY_DECRYPTED_LOCAL_KEY";
                }
                const localKey = (await js.crypto.aes.importKey(localKeyBase64)).result;
                const key = await js.crypto.aes.decrypt(localEncMasterKey, localKey);
                bg$1.vaultLogin.unlockVault(key);
                vapi.auditUserAction("UnlockedUsingWebAuthn");
                this.gg.unlock.setLastUnlockMethod(UnlockMethod$1.WEBAUTHN);
                this.webauthnUnlockComplete(fnOut.OK);
            }
            catch (e) {
                logError(e);
                this.webauthnUnlockComplete(fnOut.error(e));
            }
        }
        async webauthnUnlockComplete(resp) {
            try {
                this.notifyPopup(resp);
                this.gg.unlock.webauthn.credentialGetter.closeTab();
            }
            catch (e) {
                logError(e);
            }
        }
        async notifyPopup(resp) {
            try {
                const hasPopup = await bg$1.popupClient.checkConnectable();
                if (hasPopup) {
                    bg$1.popupClient.oneWebauthnComplete(resp);
                    return;
                }
                if (!resp.error) {
                    return;
                }
                this.gg.util.setUnlockError(UnlockMethod$1.WEBAUTHN, resp);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class WebauthnUnlockImpl {
        gg;
        storage = new WebAuthnStorage();
        credentialGetter = new CredentialGetter();
        unlocker;
        constructor(gg) {
            this.gg = gg;
            this.unlocker = new WebAuthnUnlocker(this.gg);
        }
        init() {
            this.credentialGetter.init();
        }
        async enable(enable) {
            try {
                if (!enable) {
                    await this.storage.clear();
                    (await this.updateSetting(false)).result;
                    return fnOut.OK;
                }
                (await this.setup()).result;
                (await this.updateSetting(true)).result;
                return fnOut.OK;
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async setup() {
            try {
                const masterKey = await bg$1.zcrypt.getMasterKey();
                if (!masterKey) {
                    throw "EMPTY_MASTER_KEY";
                }
                const localKey = (await js.crypto.aes.generateKey()).result;
                const exportedLocalKey = (await js.crypto.aes.exportKey(localKey)).result;
                const serverPublicKeyData = (await vapi.unlock.webauthn.getPublicKey()).result.operation.Details.key;
                if (!serverPublicKeyData) {
                    throw "EMPTY_SERVER_PUBLIC_KEY";
                }
                const serverPublicKey = await js.crypto.rsa.importPublicKey(serverPublicKeyData);
                const serverEncryptedLocalKey = await js.crypto.rsa.encrypt(exportedLocalKey, serverPublicKey);
                const localEncryptedMasterKey = await js.crypto.aes.encrypt(masterKey, localKey);
                await this.storage.save(localEncryptedMasterKey, serverEncryptedLocalKey);
                return fnOut.OK;
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async unlock() {
            return this.unlocker.startUnlock();
        }
        async sync() {
            try {
                const enabled = await zlocalStorage.load(LocalStorageKeys.WEBAUTHN_UNLOCK_ENABLED, false);
                if (!enabled) {
                    return;
                }
                await this.setup();
            }
            catch (e) {
                logError(e);
            }
        }
        async isUnlockable() {
            try {
                if (js.browser.isSafari()) {
                    return false;
                }
                const KEYS = LocalStorageKeys;
                const existing = await zlocalStorage.loadAll({
                    [KEYS.RESTRICT_WEBAUTHN_UNLOCK]: false,
                    [KEYS.WEBAUTHN_UNLOCK_ENABLED]: false,
                    [KEYS.WEBAUTHN_UNLOCK]: null,
                });
                return !existing[KEYS.RESTRICT_WEBAUTHN_UNLOCK] && existing[KEYS.WEBAUTHN_UNLOCK_ENABLED] && existing[KEYS.WEBAUTHN_UNLOCK];
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        setCredential(credential) {
            this.unlocker.continueUnlock(credential);
        }
        async getCredentialCount() {
            try {
                const credentials = (await vapi.unlock.webauthn.getCredentials()).result.operation.Details;
                return fnOut.result(credentials.length);
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async updateSetting(enable) {
            try {
                const value = enable ? bg$1.vaultSettings.SERVER_VALUE.ENABLED : bg$1.vaultSettings.SERVER_VALUE.DISABLED;
                (await bg$1.vaultSettings.changeSettingInServer(bg$1.vaultSettings.SERVER_NAME.WEBAUTHN_UNLOCK, value)).result;
                await zlocalStorage.save(LocalStorageKeys.WEBAUTHN_UNLOCK_ENABLED, enable);
                return fnOut.OK;
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
    }

    class UnlockImpl {
        static instance = null;
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return this.instance = new UnlockImpl();
        }
        gg = new GG$1(this);
        passphrase = new PassphraseUnlockImpl(this.gg);
        oneauth = new OneauthUnlockImpl(this.gg);
        webauthn = new WebauthnUnlockImpl(this.gg);
        constructor() { }
        init() {
            try {
                const gg = this.gg;
                gg.util = new UnlockUtil();
                this.passphrase.init();
                this.oneauth.init();
                this.webauthn.init();
            }
            catch (e) {
                logError(e);
            }
        }
        async setLastUnlockMethod(method) {
            await zlocalStorage.save(LocalStorageKeys.LAST_USED_UNLOCK, method);
        }
        async getLastUnlockMethod() {
            return zlocalStorage.load(LocalStorageKeys.LAST_USED_UNLOCK, UnlockMethod$1.MASTER);
        }
    }

    let installHandler = null;
    let sidePanelHandler = null;
    let addressBarHandler = null;
    let postUnlockTaskHandler = null;
    let bgEventServer = null;
    let bgApiServer = null;
    let extCrypto = null;
    let unlock = null;
    let alarmHandler = null;
    let inactivityHandler = null;
    let db = null;
    let accountDb = null;
    let commonDb = null;
    let devToolsHandler = null;
    let generator = null;
    let vapi = null;
    let startupHandler = null;
    let cdnUtil = null;
    let passwordAssessment = null;
    function initContext() {
        main$3();
        main$4();
        main$6();
        main$5();
        main$2();
        main$1();
        main();
        db = new DbImpl();
        accountDb = db.accountDb;
        commonDb = db.commonDb;
        vapi = new VApiImpl();
        alarmHandler = AlarmHandler.getInstance();
        inactivityHandler = InactivityHandler.getInstance();
        unlock = UnlockImpl.getInstance();
        unlock.passphrase;
        installHandler = new InstallHandlerImpl();
        sidePanelHandler = new SidePanelHandlerImpl();
        addressBarHandler = new AddressBarHandlerImpl();
        postUnlockTaskHandler = new PostUnlockTaskHandlerImpl();
        bgEventServer = new BgEventServer();
        bgApiServer = new BgApiServer();
        extCrypto = new ExtCryptoImpl();
        devToolsHandler = new DevToolHandler();
        generator = new GeneratorImpl();
        startupHandler = new StartupHandler();
        cdnUtil = new CDNUtil();
        passwordAssessment = new PasswordAssessment();
        initGlobals();
    }
    function initGlobals() {
        globalThis["db"] = db;
        globalThis["accountDb"] = accountDb;
        globalThis["commonDb"] = commonDb;
        globalThis["installHandler"] = installHandler;
        globalThis["sidePanelHandler"] = sidePanelHandler;
        globalThis["addressBarHandler"] = addressBarHandler;
        globalThis["postUnlockTaskHandler"] = postUnlockTaskHandler;
        globalThis["bgEventServer"] = bgEventServer;
        globalThis["extCrypto"] = extCrypto;
        globalThis["devToolsHandler"] = devToolsHandler;
        globalThis["generator"] = generator;
        globalThis["cdnUtil"] = cdnUtil;
        globalThis["vapi"] = vapi;
        globalThis["passwordAssessment"] = passwordAssessment;
    }

    class ZErrors {
        OFFLINE = "Z_OFFLINE";
        NOT_FOUND = "Z_NOT_FOUND";
        NOT_SUPPORTED = "Z_NOT_SUPPORTED";
        TIMED_OUT = "Z_TIMED_OUT";
        INVALID_PASSPHRASE_SYNC = "INVALID_PASSPHRASE_SYNC";
    }
    const zerror = new ZErrors();
    setGlobal("zerror", zerror);

    var CryptoJS$1 = CryptoJS$1 || function (u, p) {
        var d = {}, l = d.lib = {}, s = function () { }, t = l.Base = { extend: function (a) { s.prototype = this; var c = new s; a && c.mixIn(a); c.hasOwnProperty("init") || (c.init = function () { c.$super.init.apply(this, arguments); }); c.init.prototype = c; c.$super = this; return c; }, create: function () { var a = this.extend(); a.init.apply(a, arguments); return a; }, init: function () { }, mixIn: function (a) { for (var c in a)
                a.hasOwnProperty(c) && (this[c] = a[c]); a.hasOwnProperty("toString") && (this.toString = a.toString); }, clone: function () { return this.init.prototype.extend(this); } }, r = l.WordArray = t.extend({ init: function (a, c) { a = this.words = a || []; this.sigBytes = c != p ? c : 4 * a.length; }, toString: function (a) { return (a || v).stringify(this); }, concat: function (a) { var c = this.words, e = a.words, j = this.sigBytes; a = a.sigBytes; this.clamp(); if (j % 4)
                for (var k = 0; k < a; k++)
                    c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - 8 * (k % 4) & 255) << 24 - 8 * ((j + k) % 4);
            else if (65535 < e.length)
                for (k = 0; k < a; k += 4)
                    c[j + k >>> 2] = e[k >>> 2];
            else
                c.push.apply(c, e); this.sigBytes += a; return this; }, clamp: function () {
                var a = this.words, c = this.sigBytes;
                a[c >>> 2] &= 4294967295 <<
                    32 - 8 * (c % 4);
                a.length = u.ceil(c / 4);
            }, clone: function () { var a = t.clone.call(this); a.words = this.words.slice(0); return a; }, random: function (a) { for (var c = [], e = 0; e < a; e += 4)
                c.push(4294967296 * u.random() | 0); return new r.init(c, a); } }), w = d.enc = {}, v = w.Hex = { stringify: function (a) { var c = a.words; a = a.sigBytes; for (var e = [], j = 0; j < a; j++) {
                var k = c[j >>> 2] >>> 24 - 8 * (j % 4) & 255;
                e.push((k >>> 4).toString(16));
                e.push((k & 15).toString(16));
            } return e.join(""); }, parse: function (a) {
                for (var c = a.length, e = [], j = 0; j < c; j += 2)
                    e[j >>> 3] |= parseInt(a.substr(j, 2), 16) << 24 - 4 * (j % 8);
                return new r.init(e, c / 2);
            } }, b = w.Latin1 = { stringify: function (a) { var c = a.words; a = a.sigBytes; for (var e = [], j = 0; j < a; j++)
                e.push(String.fromCharCode(c[j >>> 2] >>> 24 - 8 * (j % 4) & 255)); return e.join(""); }, parse: function (a) { for (var c = a.length, e = [], j = 0; j < c; j++)
                e[j >>> 2] |= (a.charCodeAt(j) & 255) << 24 - 8 * (j % 4); return new r.init(e, c); } }, x = w.Utf8 = { stringify: function (a) { try {
                return decodeURIComponent(escape(b.stringify(a)));
            }
            catch (c) {
                throw Error("Malformed UTF-8 data");
            } }, parse: function (a) { return b.parse(unescape(encodeURIComponent(a))); } }, q = l.BufferedBlockAlgorithm = t.extend({ reset: function () { this._data = new r.init; this._nDataBytes = 0; }, _append: function (a) { "string" == typeof a && (a = x.parse(a)); this._data.concat(a); this._nDataBytes += a.sigBytes; }, _process: function (a) { var c = this._data, e = c.words, j = c.sigBytes, k = this.blockSize, b = j / (4 * k), b = a ? u.ceil(b) : u.max((b | 0) - this._minBufferSize, 0); a = b * k; j = u.min(4 * a, j); if (a) {
                for (var q = 0; q < a; q += k)
                    this._doProcessBlock(e, q);
                q = e.splice(0, a);
                c.sigBytes -= j;
            } return new r.init(q, j); }, clone: function () {
                var a = t.clone.call(this);
                a._data = this._data.clone();
                return a;
            }, _minBufferSize: 0 });
        l.Hasher = q.extend({ cfg: t.extend(), init: function (a) { this.cfg = this.cfg.extend(a); this.reset(); }, reset: function () { q.reset.call(this); this._doReset(); }, update: function (a) { this._append(a); this._process(); return this; }, finalize: function (a) { a && this._append(a); return this._doFinalize(); }, blockSize: 16, _createHelper: function (a) { return function (b, e) { return (new a.init(e)).finalize(b); }; }, _createHmacHelper: function (a) {
                return function (b, e) {
                    return (new n.HMAC.init(a, e)).finalize(b);
                };
            } });
        var n = d.algo = {};
        return d;
    }(Math);
    (function () {
        var u = CryptoJS$1, p = u.lib.WordArray;
        u.enc.Base64 = { stringify: function (d) { var l = d.words, p = d.sigBytes, t = this._map; d.clamp(); d = []; for (var r = 0; r < p; r += 3)
                for (var w = (l[r >>> 2] >>> 24 - 8 * (r % 4) & 255) << 16 | (l[r + 1 >>> 2] >>> 24 - 8 * ((r + 1) % 4) & 255) << 8 | l[r + 2 >>> 2] >>> 24 - 8 * ((r + 2) % 4) & 255, v = 0; 4 > v && r + 0.75 * v < p; v++)
                    d.push(t.charAt(w >>> 6 * (3 - v) & 63)); if (l = t.charAt(64))
                for (; d.length % 4;)
                    d.push(l); return d.join(""); }, parse: function (d) {
                var l = d.length, s = this._map, t = s.charAt(64);
                t && (t = d.indexOf(t), -1 != t && (l = t));
                for (var t = [], r = 0, w = 0; w <
                    l; w++)
                    if (w % 4) {
                        var v = s.indexOf(d.charAt(w - 1)) << 2 * (w % 4), b = s.indexOf(d.charAt(w)) >>> 6 - 2 * (w % 4);
                        t[r >>> 2] |= (v | b) << 24 - 8 * (r % 4);
                        r++;
                    }
                return p.create(t, r);
            }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
    })();
    (function (u) {
        function p(b, n, a, c, e, j, k) { b = b + (n & a | ~n & c) + e + k; return (b << j | b >>> 32 - j) + n; }
        function d(b, n, a, c, e, j, k) { b = b + (n & c | a & ~c) + e + k; return (b << j | b >>> 32 - j) + n; }
        function l(b, n, a, c, e, j, k) { b = b + (n ^ a ^ c) + e + k; return (b << j | b >>> 32 - j) + n; }
        function s(b, n, a, c, e, j, k) { b = b + (a ^ (n | ~c)) + e + k; return (b << j | b >>> 32 - j) + n; }
        for (var t = CryptoJS$1, r = t.lib, w = r.WordArray, v = r.Hasher, r = t.algo, b = [], x = 0; 64 > x; x++)
            b[x] = 4294967296 * u.abs(u.sin(x + 1)) | 0;
        r = r.MD5 = v.extend({ _doReset: function () { this._hash = new w.init([1732584193, 4023233417, 2562383102, 271733878]); },
            _doProcessBlock: function (q, n) {
                for (var a = 0; 16 > a; a++) {
                    var c = n + a, e = q[c];
                    q[c] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360;
                }
                var a = this._hash.words, c = q[n + 0], e = q[n + 1], j = q[n + 2], k = q[n + 3], z = q[n + 4], r = q[n + 5], t = q[n + 6], w = q[n + 7], v = q[n + 8], A = q[n + 9], B = q[n + 10], C = q[n + 11], u = q[n + 12], D = q[n + 13], E = q[n + 14], x = q[n + 15], f = a[0], m = a[1], g = a[2], h = a[3], f = p(f, m, g, h, c, 7, b[0]), h = p(h, f, m, g, e, 12, b[1]), g = p(g, h, f, m, j, 17, b[2]), m = p(m, g, h, f, k, 22, b[3]), f = p(f, m, g, h, z, 7, b[4]), h = p(h, f, m, g, r, 12, b[5]), g = p(g, h, f, m, t, 17, b[6]), m = p(m, g, h, f, w, 22, b[7]), f = p(f, m, g, h, v, 7, b[8]), h = p(h, f, m, g, A, 12, b[9]), g = p(g, h, f, m, B, 17, b[10]), m = p(m, g, h, f, C, 22, b[11]), f = p(f, m, g, h, u, 7, b[12]), h = p(h, f, m, g, D, 12, b[13]), g = p(g, h, f, m, E, 17, b[14]), m = p(m, g, h, f, x, 22, b[15]), f = d(f, m, g, h, e, 5, b[16]), h = d(h, f, m, g, t, 9, b[17]), g = d(g, h, f, m, C, 14, b[18]), m = d(m, g, h, f, c, 20, b[19]), f = d(f, m, g, h, r, 5, b[20]), h = d(h, f, m, g, B, 9, b[21]), g = d(g, h, f, m, x, 14, b[22]), m = d(m, g, h, f, z, 20, b[23]), f = d(f, m, g, h, A, 5, b[24]), h = d(h, f, m, g, E, 9, b[25]), g = d(g, h, f, m, k, 14, b[26]), m = d(m, g, h, f, v, 20, b[27]), f = d(f, m, g, h, D, 5, b[28]), h = d(h, f, m, g, j, 9, b[29]), g = d(g, h, f, m, w, 14, b[30]), m = d(m, g, h, f, u, 20, b[31]), f = l(f, m, g, h, r, 4, b[32]), h = l(h, f, m, g, v, 11, b[33]), g = l(g, h, f, m, C, 16, b[34]), m = l(m, g, h, f, E, 23, b[35]), f = l(f, m, g, h, e, 4, b[36]), h = l(h, f, m, g, z, 11, b[37]), g = l(g, h, f, m, w, 16, b[38]), m = l(m, g, h, f, B, 23, b[39]), f = l(f, m, g, h, D, 4, b[40]), h = l(h, f, m, g, c, 11, b[41]), g = l(g, h, f, m, k, 16, b[42]), m = l(m, g, h, f, t, 23, b[43]), f = l(f, m, g, h, A, 4, b[44]), h = l(h, f, m, g, u, 11, b[45]), g = l(g, h, f, m, x, 16, b[46]), m = l(m, g, h, f, j, 23, b[47]), f = s(f, m, g, h, c, 6, b[48]), h = s(h, f, m, g, w, 10, b[49]), g = s(g, h, f, m, E, 15, b[50]), m = s(m, g, h, f, r, 21, b[51]), f = s(f, m, g, h, u, 6, b[52]), h = s(h, f, m, g, k, 10, b[53]), g = s(g, h, f, m, B, 15, b[54]), m = s(m, g, h, f, e, 21, b[55]), f = s(f, m, g, h, v, 6, b[56]), h = s(h, f, m, g, x, 10, b[57]), g = s(g, h, f, m, t, 15, b[58]), m = s(m, g, h, f, D, 21, b[59]), f = s(f, m, g, h, z, 6, b[60]), h = s(h, f, m, g, C, 10, b[61]), g = s(g, h, f, m, j, 15, b[62]), m = s(m, g, h, f, A, 21, b[63]);
                a[0] = a[0] + f | 0;
                a[1] = a[1] + m | 0;
                a[2] = a[2] + g | 0;
                a[3] = a[3] + h | 0;
            }, _doFinalize: function () {
                var b = this._data, n = b.words, a = 8 * this._nDataBytes, c = 8 * b.sigBytes;
                n[c >>> 5] |= 128 << 24 - c % 32;
                var e = u.floor(a /
                    4294967296);
                n[(c + 64 >>> 9 << 4) + 15] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360;
                n[(c + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360;
                b.sigBytes = 4 * (n.length + 1);
                this._process();
                b = this._hash;
                n = b.words;
                for (a = 0; 4 > a; a++)
                    c = n[a], n[a] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360;
                return b;
            }, clone: function () { var b = v.clone.call(this); b._hash = this._hash.clone(); return b; } });
        t.MD5 = v._createHelper(r);
        t.HmacMD5 = v._createHmacHelper(r);
    })(Math);
    (function () {
        var u = CryptoJS$1, p = u.lib, d = p.Base, l = p.WordArray, p = u.algo, s = p.EvpKDF = d.extend({ cfg: d.extend({ keySize: 4, hasher: p.MD5, iterations: 1 }), init: function (d) { this.cfg = this.cfg.extend(d); }, compute: function (d, r) { for (var p = this.cfg, s = p.hasher.create(), b = l.create(), u = b.words, q = p.keySize, p = p.iterations; u.length < q;) {
                n && s.update(n);
                var n = s.update(d).finalize(r);
                s.reset();
                for (var a = 1; a < p; a++)
                    n = s.finalize(n), s.reset();
                b.concat(n);
            } b.sigBytes = 4 * q; return b; } });
        u.EvpKDF = function (d, l, p) {
            return s.create(p).compute(d, l);
        };
    })();
    CryptoJS$1.lib.Cipher || function (u) {
        var p = CryptoJS$1, d = p.lib, l = d.Base, s = d.WordArray, t = d.BufferedBlockAlgorithm, r = p.enc.Base64, w = p.algo.EvpKDF, v = d.Cipher = t.extend({ cfg: l.extend(), createEncryptor: function (e, a) { return this.create(this._ENC_XFORM_MODE, e, a); }, createDecryptor: function (e, a) { return this.create(this._DEC_XFORM_MODE, e, a); }, init: function (e, a, b) { this.cfg = this.cfg.extend(b); this._xformMode = e; this._key = a; this.reset(); }, reset: function () { t.reset.call(this); this._doReset(); }, process: function (e) { this._append(e); return this._process(); },
            finalize: function (e) { e && this._append(e); return this._doFinalize(); }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function (e) { return { encrypt: function (b, k, d) { return ("string" == typeof k ? c : a).encrypt(e, b, k, d); }, decrypt: function (b, k, d) { return ("string" == typeof k ? c : a).decrypt(e, b, k, d); } }; } });
        d.StreamCipher = v.extend({ _doFinalize: function () { return this._process(true); }, blockSize: 1 });
        var b = p.mode = {}, x = function (e, a, b) {
            var c = this._iv;
            c ? this._iv = u : c = this._prevBlock;
            for (var d = 0; d < b; d++)
                e[a + d] ^=
                    c[d];
        }, q = (d.BlockCipherMode = l.extend({ createEncryptor: function (e, a) { return this.Encryptor.create(e, a); }, createDecryptor: function (e, a) { return this.Decryptor.create(e, a); }, init: function (e, a) { this._cipher = e; this._iv = a; } })).extend();
        q.Encryptor = q.extend({ processBlock: function (e, a) { var b = this._cipher, c = b.blockSize; x.call(this, e, a, c); b.encryptBlock(e, a); this._prevBlock = e.slice(a, a + c); } });
        q.Decryptor = q.extend({ processBlock: function (e, a) {
                var b = this._cipher, c = b.blockSize, d = e.slice(a, a + c);
                b.decryptBlock(e, a);
                x.call(this, e, a, c);
                this._prevBlock = d;
            } });
        b = b.CBC = q;
        q = (p.pad = {}).Pkcs7 = { pad: function (a, b) { for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, l = [], n = 0; n < c; n += 4)
                l.push(d); c = s.create(l, c); a.concat(c); }, unpad: function (a) { a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255; } };
        d.BlockCipher = v.extend({ cfg: v.cfg.extend({ mode: b, padding: q }), reset: function () {
                v.reset.call(this);
                var a = this.cfg, b = a.iv, a = a.mode;
                if (this._xformMode == this._ENC_XFORM_MODE)
                    var c = a.createEncryptor;
                else
                    c = a.createDecryptor, this._minBufferSize = 1;
                this._mode = c.call(a, this, b && b.words);
            }, _doProcessBlock: function (a, b) { this._mode.processBlock(a, b); }, _doFinalize: function () { var a = this.cfg.padding; if (this._xformMode == this._ENC_XFORM_MODE) {
                a.pad(this._data, this.blockSize);
                var b = this._process(true);
            }
            else
                b = this._process(true), a.unpad(b); return b; }, blockSize: 4 });
        var n = d.CipherParams = l.extend({ init: function (a) { this.mixIn(a); }, toString: function (a) { return (a || this.formatter).stringify(this); } }), b = (p.format = {}).OpenSSL = { stringify: function (a) {
                var b = a.ciphertext;
                a = a.salt;
                return (a ? s.create([1398893684,
                    1701076831]).concat(a).concat(b) : b).toString(r);
            }, parse: function (a) { a = r.parse(a); var b = a.words; if (1398893684 == b[0] && 1701076831 == b[1]) {
                var c = s.create(b.slice(2, 4));
                b.splice(0, 4);
                a.sigBytes -= 16;
            } return n.create({ ciphertext: a, salt: c }); } }, a = d.SerializableCipher = l.extend({ cfg: l.extend({ format: b }), encrypt: function (a, b, c, d) { d = this.cfg.extend(d); var l = a.createEncryptor(c, d); b = l.finalize(b); l = l.cfg; return n.create({ ciphertext: b, key: c, iv: l.iv, algorithm: a, mode: l.mode, padding: l.padding, blockSize: a.blockSize, formatter: d.format }); },
            decrypt: function (a, b, c, d) { d = this.cfg.extend(d); b = this._parse(b, d.format); return a.createDecryptor(c, d).finalize(b.ciphertext); }, _parse: function (a, b) { return "string" == typeof a ? b.parse(a, this) : a; } }), p = (p.kdf = {}).OpenSSL = { execute: function (a, b, c, d) { d || (d = s.random(8)); a = w.create({ keySize: b + c }).compute(a, d); c = s.create(a.words.slice(b), 4 * c); a.sigBytes = 4 * b; return n.create({ key: a, iv: c, salt: d }); } }, c = d.PasswordBasedCipher = a.extend({ cfg: a.cfg.extend({ kdf: p }), encrypt: function (b, c, d, l) {
                l = this.cfg.extend(l);
                d = l.kdf.execute(d, b.keySize, b.ivSize);
                l.iv = d.iv;
                b = a.encrypt.call(this, b, c, d.key, l);
                b.mixIn(d);
                return b;
            }, decrypt: function (b, c, d, l) { l = this.cfg.extend(l); c = this._parse(c, l.format); d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt); l.iv = d.iv; return a.decrypt.call(this, b, c, d.key, l); } });
    }();
    (function () {
        for (var u = CryptoJS$1, p = u.lib.BlockCipher, d = u.algo, l = [], s = [], t = [], r = [], w = [], v = [], b = [], x = [], q = [], n = [], a = [], c = 0; 256 > c; c++)
            a[c] = 128 > c ? c << 1 : c << 1 ^ 283;
        for (var e = 0, j = 0, c = 0; 256 > c; c++) {
            var k = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4, k = k >>> 8 ^ k & 255 ^ 99;
            l[e] = k;
            s[k] = e;
            var z = a[e], F = a[z], G = a[F], y = 257 * a[k] ^ 16843008 * k;
            t[e] = y << 24 | y >>> 8;
            r[e] = y << 16 | y >>> 16;
            w[e] = y << 8 | y >>> 24;
            v[e] = y;
            y = 16843009 * G ^ 65537 * F ^ 257 * z ^ 16843008 * e;
            b[k] = y << 24 | y >>> 8;
            x[k] = y << 16 | y >>> 16;
            q[k] = y << 8 | y >>> 24;
            n[k] = y;
            e ? (e = z ^ a[a[a[G ^ z]]], j ^= a[a[j]]) : e = j = 1;
        }
        var H = [0, 1, 2, 4, 8,
            16, 32, 64, 128, 27, 54], d = d.AES = p.extend({ _doReset: function () {
                for (var a = this._key, c = a.words, d = a.sigBytes / 4, a = 4 * ((this._nRounds = d + 6) + 1), e = this._keySchedule = [], j = 0; j < a; j++)
                    if (j < d)
                        e[j] = c[j];
                    else {
                        var k = e[j - 1];
                        j % d ? 6 < d && 4 == j % d && (k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255]) : (k = k << 8 | k >>> 24, k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255], k ^= H[j / d | 0] << 24);
                        e[j] = e[j - d] ^ k;
                    }
                c = this._invKeySchedule = [];
                for (d = 0; d < a; d++)
                    j = a - d, k = d % 4 ? e[j] : e[j - 4], c[d] = 4 > d || 4 >= j ? k : b[l[k >>> 24]] ^ x[l[k >>> 16 & 255]] ^ q[l[k >>>
                        8 & 255]] ^ n[l[k & 255]];
            }, encryptBlock: function (a, b) { this._doCryptBlock(a, b, this._keySchedule, t, r, w, v, l); }, decryptBlock: function (a, c) { var d = a[c + 1]; a[c + 1] = a[c + 3]; a[c + 3] = d; this._doCryptBlock(a, c, this._invKeySchedule, b, x, q, n, s); d = a[c + 1]; a[c + 1] = a[c + 3]; a[c + 3] = d; }, _doCryptBlock: function (a, b, c, d, e, j, l, f) {
                for (var m = this._nRounds, g = a[b] ^ c[0], h = a[b + 1] ^ c[1], k = a[b + 2] ^ c[2], n = a[b + 3] ^ c[3], p = 4, r = 1; r < m; r++)
                    var q = d[g >>> 24] ^ e[h >>> 16 & 255] ^ j[k >>> 8 & 255] ^ l[n & 255] ^ c[p++], s = d[h >>> 24] ^ e[k >>> 16 & 255] ^ j[n >>> 8 & 255] ^ l[g & 255] ^ c[p++], t = d[k >>> 24] ^ e[n >>> 16 & 255] ^ j[g >>> 8 & 255] ^ l[h & 255] ^ c[p++], n = d[n >>> 24] ^ e[g >>> 16 & 255] ^ j[h >>> 8 & 255] ^ l[k & 255] ^ c[p++], g = q, h = s, k = t;
                q = (f[g >>> 24] << 24 | f[h >>> 16 & 255] << 16 | f[k >>> 8 & 255] << 8 | f[n & 255]) ^ c[p++];
                s = (f[h >>> 24] << 24 | f[k >>> 16 & 255] << 16 | f[n >>> 8 & 255] << 8 | f[g & 255]) ^ c[p++];
                t = (f[k >>> 24] << 24 | f[n >>> 16 & 255] << 16 | f[g >>> 8 & 255] << 8 | f[h & 255]) ^ c[p++];
                n = (f[n >>> 24] << 24 | f[g >>> 16 & 255] << 16 | f[h >>> 8 & 255] << 8 | f[k & 255]) ^ c[p++];
                a[b] = q;
                a[b + 1] = s;
                a[b + 2] = t;
                a[b + 3] = n;
            }, keySize: 8 });
        u.AES = p._createHelper(d);
    })();
    globalThis["CryptoJS"] = CryptoJS$1;

    var dbits;
    function BigInteger(a, b, c) {
        if (a != null)
            if ("number" == typeof a)
                this.fromNumber(a, b, c);
            else if (b == null && "string" != typeof a)
                this.fromString(a, 256);
            else
                this.fromString(a, b);
    }
    function nbi() { return new BigInteger(null); }
    function am1(i, x, w, j, c, n) {
        while (--n >= 0) {
            var v = x * this[i++] + w[j] + c;
            c = Math.floor(v / 0x4000000);
            w[j++] = v & 0x3ffffff;
        }
        return c;
    }
    function am2(i, x, w, j, c, n) {
        var xl = x & 0x7fff, xh = x >> 15;
        while (--n >= 0) {
            var l = this[i] & 0x7fff;
            var h = this[i++] >> 15;
            var m = xh * l + h * xl;
            l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
            c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
            w[j++] = l & 0x3fffffff;
        }
        return c;
    }
    function am3(i, x, w, j, c, n) {
        var xl = x & 0x3fff, xh = x >> 14;
        while (--n >= 0) {
            var l = this[i] & 0x3fff;
            var h = this[i++] >> 14;
            var m = xh * l + h * xl;
            l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
            c = (l >> 28) + (m >> 14) + xh * h;
            w[j++] = l & 0xfffffff;
        }
        return c;
    }
    if ((navigator.appName == "Microsoft Internet Explorer")) {
        BigInteger.prototype.am = am2;
        dbits = 30;
    }
    else if ((navigator.appName != "Netscape")) {
        BigInteger.prototype.am = am1;
        dbits = 26;
    }
    else {
        BigInteger.prototype.am = am3;
        dbits = 28;
    }
    BigInteger.prototype.DB = dbits;
    BigInteger.prototype.DM = ((1 << dbits) - 1);
    BigInteger.prototype.DV = (1 << dbits);
    var BI_FP = 52;
    BigInteger.prototype.FV = Math.pow(2, BI_FP);
    BigInteger.prototype.F1 = BI_FP - dbits;
    BigInteger.prototype.F2 = 2 * dbits - BI_FP;
    var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
    var BI_RC = new Array();
    var rr, vv;
    rr = "0".charCodeAt(0);
    for (vv = 0; vv <= 9; ++vv)
        BI_RC[rr++] = vv;
    rr = "a".charCodeAt(0);
    for (vv = 10; vv < 36; ++vv)
        BI_RC[rr++] = vv;
    rr = "A".charCodeAt(0);
    for (vv = 10; vv < 36; ++vv)
        BI_RC[rr++] = vv;
    function int2char(n) { return BI_RM.charAt(n); }
    function intAt(s, i) {
        var c = BI_RC[s.charCodeAt(i)];
        return (c == null) ? -1 : c;
    }
    function bnpCopyTo(r) {
        for (var i = this.t - 1; i >= 0; --i)
            r[i] = this[i];
        r.t = this.t;
        r.s = this.s;
    }
    function bnpFromInt(x) {
        this.t = 1;
        this.s = (x < 0) ? -1 : 0;
        if (x > 0)
            this[0] = x;
        else if (x < -1)
            this[0] = x + DV;
        else
            this.t = 0;
    }
    function nbv(i) { var r = nbi(); r.fromInt(i); return r; }
    function bnpFromString(s, b) {
        var k;
        if (b == 16)
            k = 4;
        else if (b == 8)
            k = 3;
        else if (b == 256)
            k = 8;
        else if (b == 2)
            k = 1;
        else if (b == 32)
            k = 5;
        else if (b == 4)
            k = 2;
        else {
            this.fromRadix(s, b);
            return;
        }
        this.t = 0;
        this.s = 0;
        var i = s.length, mi = false, sh = 0;
        while (--i >= 0) {
            var x = (k == 8) ? s[i] & 0xff : intAt(s, i);
            if (x < 0) {
                if (s.charAt(i) == "-")
                    mi = true;
                continue;
            }
            mi = false;
            if (sh == 0)
                this[this.t++] = x;
            else if (sh + k > this.DB) {
                this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
                this[this.t++] = (x >> (this.DB - sh));
            }
            else
                this[this.t - 1] |= x << sh;
            sh += k;
            if (sh >= this.DB)
                sh -= this.DB;
        }
        if (k == 8 && (s[0] & 0x80) != 0) {
            this.s = -1;
            if (sh > 0)
                this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
        }
        this.clamp();
        if (mi)
            BigInteger.ZERO.subTo(this, this);
    }
    function bnpClamp() {
        var c = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == c)
            --this.t;
    }
    function bnToString(b) {
        if (this.s < 0)
            return "-" + this.negate().toString(b);
        var k;
        if (b == 16)
            k = 4;
        else if (b == 8)
            k = 3;
        else if (b == 2)
            k = 1;
        else if (b == 32)
            k = 5;
        else if (b == 4)
            k = 2;
        else
            return this.toRadix(b);
        var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
        var p = this.DB - (i * this.DB) % k;
        if (i-- > 0) {
            if (p < this.DB && (d = this[i] >> p) > 0) {
                m = true;
                r = int2char(d);
            }
            while (i >= 0) {
                if (p < k) {
                    d = (this[i] & ((1 << p) - 1)) << (k - p);
                    d |= this[--i] >> (p += this.DB - k);
                }
                else {
                    d = (this[i] >> (p -= k)) & km;
                    if (p <= 0) {
                        p += this.DB;
                        --i;
                    }
                }
                if (d > 0)
                    m = true;
                if (m)
                    r += int2char(d);
            }
        }
        return m ? r : "0";
    }
    function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this, r); return r; }
    function bnAbs() { return (this.s < 0) ? this.negate() : this; }
    function bnCompareTo(a) {
        var r = this.s - a.s;
        if (r != 0)
            return r;
        var i = this.t;
        r = i - a.t;
        if (r != 0)
            return r;
        while (--i >= 0)
            if ((r = this[i] - a[i]) != 0)
                return r;
        return 0;
    }
    function nbits(x) {
        var r = 1, t;
        if ((t = x >>> 16) != 0) {
            x = t;
            r += 16;
        }
        if ((t = x >> 8) != 0) {
            x = t;
            r += 8;
        }
        if ((t = x >> 4) != 0) {
            x = t;
            r += 4;
        }
        if ((t = x >> 2) != 0) {
            x = t;
            r += 2;
        }
        if ((t = x >> 1) != 0) {
            x = t;
            r += 1;
        }
        return r;
    }
    function bnBitLength() {
        if (this.t <= 0)
            return 0;
        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
    }
    function bnpDLShiftTo(n, r) {
        var i;
        for (i = this.t - 1; i >= 0; --i)
            r[i + n] = this[i];
        for (i = n - 1; i >= 0; --i)
            r[i] = 0;
        r.t = this.t + n;
        r.s = this.s;
    }
    function bnpDRShiftTo(n, r) {
        for (var i = n; i < this.t; ++i)
            r[i - n] = this[i];
        r.t = Math.max(this.t - n, 0);
        r.s = this.s;
    }
    function bnpLShiftTo(n, r) {
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << cbs) - 1;
        var ds = Math.floor(n / this.DB), c = (this.s << bs) & this.DM, i;
        for (i = this.t - 1; i >= 0; --i) {
            r[i + ds + 1] = (this[i] >> cbs) | c;
            c = (this[i] & bm) << bs;
        }
        for (i = ds - 1; i >= 0; --i)
            r[i] = 0;
        r[ds] = c;
        r.t = this.t + ds + 1;
        r.s = this.s;
        r.clamp();
    }
    function bnpRShiftTo(n, r) {
        r.s = this.s;
        var ds = Math.floor(n / this.DB);
        if (ds >= this.t) {
            r.t = 0;
            return;
        }
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << bs) - 1;
        r[0] = this[ds] >> bs;
        for (var i = ds + 1; i < this.t; ++i) {
            r[i - ds - 1] |= (this[i] & bm) << cbs;
            r[i - ds] = this[i] >> bs;
        }
        if (bs > 0)
            r[this.t - ds - 1] |= (this.s & bm) << cbs;
        r.t = this.t - ds;
        r.clamp();
    }
    function bnpSubTo(a, r) {
        var i = 0, c = 0, m = Math.min(a.t, this.t);
        while (i < m) {
            c += this[i] - a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
        }
        if (a.t < this.t) {
            c -= a.s;
            while (i < this.t) {
                c += this[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            c += this.s;
        }
        else {
            c += this.s;
            while (i < a.t) {
                c -= a[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            c -= a.s;
        }
        r.s = (c < 0) ? -1 : 0;
        if (c < -1)
            r[i++] = this.DV + c;
        else if (c > 0)
            r[i++] = c;
        r.t = i;
        r.clamp();
    }
    function bnpMultiplyTo(a, r) {
        var x = this.abs(), y = a.abs();
        var i = x.t;
        r.t = i + y.t;
        while (--i >= 0)
            r[i] = 0;
        for (i = 0; i < y.t; ++i)
            r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
        r.s = 0;
        r.clamp();
        if (this.s != a.s)
            BigInteger.ZERO.subTo(r, r);
    }
    function bnpSquareTo(r) {
        var x = this.abs();
        var i = r.t = 2 * x.t;
        while (--i >= 0)
            r[i] = 0;
        for (i = 0; i < x.t - 1; ++i) {
            var c = x.am(i, x[i], r, 2 * i, 0, 1);
            if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
                r[i + x.t] -= x.DV;
                r[i + x.t + 1] = 1;
            }
        }
        if (r.t > 0)
            r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
        r.s = 0;
        r.clamp();
    }
    function bnpDivRemTo(m, q, r) {
        var pm = m.abs();
        if (pm.t <= 0)
            return;
        var pt = this.abs();
        if (pt.t < pm.t) {
            if (q != null)
                q.fromInt(0);
            if (r != null)
                this.copyTo(r);
            return;
        }
        if (r == null)
            r = nbi();
        var y = nbi(), ts = this.s, ms = m.s;
        var nsh = this.DB - nbits(pm[pm.t - 1]);
        if (nsh > 0) {
            pm.lShiftTo(nsh, y);
            pt.lShiftTo(nsh, r);
        }
        else {
            pm.copyTo(y);
            pt.copyTo(r);
        }
        var ys = y.t;
        var y0 = y[ys - 1];
        if (y0 == 0)
            return;
        var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
        var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
        var i = r.t, j = i - ys, t = (q == null) ? nbi() : q;
        y.dlShiftTo(j, t);
        if (r.compareTo(t) >= 0) {
            r[r.t++] = 1;
            r.subTo(t, r);
        }
        BigInteger.ONE.dlShiftTo(ys, t);
        t.subTo(y, y);
        while (y.t < ys)
            y[y.t++] = 0;
        while (--j >= 0) {
            var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
            if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
                y.dlShiftTo(j, t);
                r.subTo(t, r);
                while (r[i] < --qd)
                    r.subTo(t, r);
            }
        }
        if (q != null) {
            r.drShiftTo(ys, q);
            if (ts != ms)
                BigInteger.ZERO.subTo(q, q);
        }
        r.t = ys;
        r.clamp();
        if (nsh > 0)
            r.rShiftTo(nsh, r);
        if (ts < 0)
            BigInteger.ZERO.subTo(r, r);
    }
    function bnMod(a) {
        var r = nbi();
        this.abs().divRemTo(a, null, r);
        if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
            a.subTo(r, r);
        return r;
    }
    function Classic(m) { this.m = m; }
    function cConvert(x) {
        if (x.s < 0 || x.compareTo(this.m) >= 0)
            return x.mod(this.m);
        else
            return x;
    }
    function cRevert(x) { return x; }
    function cReduce(x) { x.divRemTo(this.m, null, x); }
    function cMulTo(x, y, r) { x.multiplyTo(y, r); this.reduce(r); }
    function cSqrTo(x, r) { x.squareTo(r); this.reduce(r); }
    Classic.prototype.convert = cConvert;
    Classic.prototype.revert = cRevert;
    Classic.prototype.reduce = cReduce;
    Classic.prototype.mulTo = cMulTo;
    Classic.prototype.sqrTo = cSqrTo;
    function bnpInvDigit() {
        if (this.t < 1)
            return 0;
        var x = this[0];
        if ((x & 1) == 0)
            return 0;
        var y = x & 3;
        y = (y * (2 - (x & 0xf) * y)) & 0xf;
        y = (y * (2 - (x & 0xff) * y)) & 0xff;
        y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff;
        y = (y * (2 - x * y % this.DV)) % this.DV;
        return (y > 0) ? this.DV - y : -y;
    }
    function Montgomery(m) {
        this.m = m;
        this.mp = m.invDigit();
        this.mpl = this.mp & 0x7fff;
        this.mph = this.mp >> 15;
        this.um = (1 << (m.DB - 15)) - 1;
        this.mt2 = 2 * m.t;
    }
    function montConvert(x) {
        var r = nbi();
        x.abs().dlShiftTo(this.m.t, r);
        r.divRemTo(this.m, null, r);
        if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
            this.m.subTo(r, r);
        return r;
    }
    function montRevert(x) {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
    }
    function montReduce(x) {
        while (x.t <= this.mt2)
            x[x.t++] = 0;
        for (var i = 0; i < this.m.t; ++i) {
            var j = x[i] & 0x7fff;
            var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
            j = i + this.m.t;
            x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
            while (x[j] >= x.DV) {
                x[j] -= x.DV;
                x[++j]++;
            }
        }
        x.clamp();
        x.drShiftTo(this.m.t, x);
        if (x.compareTo(this.m) >= 0)
            x.subTo(this.m, x);
    }
    function montSqrTo(x, r) { x.squareTo(r); this.reduce(r); }
    function montMulTo(x, y, r) { x.multiplyTo(y, r); this.reduce(r); }
    Montgomery.prototype.convert = montConvert;
    Montgomery.prototype.revert = montRevert;
    Montgomery.prototype.reduce = montReduce;
    Montgomery.prototype.mulTo = montMulTo;
    Montgomery.prototype.sqrTo = montSqrTo;
    function bnpIsEven() { return ((this.t > 0) ? (this[0] & 1) : this.s) == 0; }
    function bnpExp(e, z) {
        if (e > 0xffffffff || e < 1)
            return BigInteger.ONE;
        var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e) - 1;
        g.copyTo(r);
        while (--i >= 0) {
            z.sqrTo(r, r2);
            if ((e & (1 << i)) > 0)
                z.mulTo(r2, g, r);
            else {
                var t = r;
                r = r2;
                r2 = t;
            }
        }
        return z.revert(r);
    }
    function bnModPowInt(e, m) {
        var z;
        if (e < 256 || m.isEven())
            z = new Classic(m);
        else
            z = new Montgomery(m);
        return this.exp(e, z);
    }
    BigInteger.prototype.copyTo = bnpCopyTo;
    BigInteger.prototype.fromInt = bnpFromInt;
    BigInteger.prototype.fromString = bnpFromString;
    BigInteger.prototype.clamp = bnpClamp;
    BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
    BigInteger.prototype.drShiftTo = bnpDRShiftTo;
    BigInteger.prototype.lShiftTo = bnpLShiftTo;
    BigInteger.prototype.rShiftTo = bnpRShiftTo;
    BigInteger.prototype.subTo = bnpSubTo;
    BigInteger.prototype.multiplyTo = bnpMultiplyTo;
    BigInteger.prototype.squareTo = bnpSquareTo;
    BigInteger.prototype.divRemTo = bnpDivRemTo;
    BigInteger.prototype.invDigit = bnpInvDigit;
    BigInteger.prototype.isEven = bnpIsEven;
    BigInteger.prototype.exp = bnpExp;
    BigInteger.prototype.toString = bnToString;
    BigInteger.prototype.negate = bnNegate;
    BigInteger.prototype.abs = bnAbs;
    BigInteger.prototype.compareTo = bnCompareTo;
    BigInteger.prototype.bitLength = bnBitLength;
    BigInteger.prototype.mod = bnMod;
    BigInteger.prototype.modPowInt = bnModPowInt;
    BigInteger.ZERO = nbv(0);
    BigInteger.ONE = nbv(1);
    function bnClone() { var r = nbi(); this.copyTo(r); return r; }
    function bnIntValue() {
        if (this.s < 0) {
            if (this.t == 1)
                return this[0] - this.DV;
            else if (this.t == 0)
                return -1;
        }
        else if (this.t == 1)
            return this[0];
        else if (this.t == 0)
            return 0;
        return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
    }
    function bnByteValue() { return (this.t == 0) ? this.s : (this[0] << 24) >> 24; }
    function bnShortValue() { return (this.t == 0) ? this.s : (this[0] << 16) >> 16; }
    function bnpChunkSize(r) { return Math.floor(Math.LN2 * this.DB / Math.log(r)); }
    function bnSigNum() {
        if (this.s < 0)
            return -1;
        else if (this.t <= 0 || (this.t == 1 && this[0] <= 0))
            return 0;
        else
            return 1;
    }
    function bnpToRadix(b) {
        if (b == null)
            b = 10;
        if (this.signum() == 0 || b < 2 || b > 36)
            return "0";
        var cs = this.chunkSize(b);
        var a = Math.pow(b, cs);
        var d = nbv(a), y = nbi(), z = nbi(), r = "";
        this.divRemTo(d, y, z);
        while (y.signum() > 0) {
            r = (a + z.intValue()).toString(b).substr(1) + r;
            y.divRemTo(d, y, z);
        }
        return z.intValue().toString(b) + r;
    }
    function bnpFromRadix(s, b) {
        this.fromInt(0);
        if (b == null)
            b = 10;
        var cs = this.chunkSize(b);
        var d = Math.pow(b, cs), mi = false, j = 0, w = 0;
        for (var i = 0; i < s.length; ++i) {
            var x = intAt(s, i);
            if (x < 0) {
                if (s.charAt(i) == "-" && this.signum() == 0)
                    mi = true;
                continue;
            }
            w = b * w + x;
            if (++j >= cs) {
                this.dMultiply(d);
                this.dAddOffset(w, 0);
                j = 0;
                w = 0;
            }
        }
        if (j > 0) {
            this.dMultiply(Math.pow(b, j));
            this.dAddOffset(w, 0);
        }
        if (mi)
            BigInteger.ZERO.subTo(this, this);
    }
    function bnpFromNumber(a, b, c) {
        if ("number" == typeof b) {
            if (a < 2)
                this.fromInt(1);
            else {
                this.fromNumber(a, c);
                if (!this.testBit(a - 1))
                    this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
                if (this.isEven())
                    this.dAddOffset(1, 0);
                while (!this.isProbablePrime(b)) {
                    this.dAddOffset(2, 0);
                    if (this.bitLength() > a)
                        this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
                }
            }
        }
        else {
            var x = new Array(), t = a & 7;
            x.length = (a >> 3) + 1;
            b.nextBytes(x);
            if (t > 0)
                x[0] &= ((1 << t) - 1);
            else
                x[0] = 0;
            this.fromString(x, 256);
        }
    }
    function bnToByteArray() {
        var i = this.t, r = new Array();
        r[0] = this.s;
        var p = this.DB - (i * this.DB) % 8, d, k = 0;
        if (i-- > 0) {
            if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p)
                r[k++] = d | (this.s << (this.DB - p));
            while (i >= 0) {
                if (p < 8) {
                    d = (this[i] & ((1 << p) - 1)) << (8 - p);
                    d |= this[--i] >> (p += this.DB - 8);
                }
                else {
                    d = (this[i] >> (p -= 8)) & 0xff;
                    if (p <= 0) {
                        p += this.DB;
                        --i;
                    }
                }
                if ((d & 0x80) != 0)
                    d |= -256;
                if (k == 0 && (this.s & 0x80) != (d & 0x80))
                    ++k;
                if (k > 0 || d != this.s)
                    r[k++] = d;
            }
        }
        return r;
    }
    function bnEquals(a) { return (this.compareTo(a) == 0); }
    function bnMin(a) { return (this.compareTo(a) < 0) ? this : a; }
    function bnMax(a) { return (this.compareTo(a) > 0) ? this : a; }
    function bnpBitwiseTo(a, op, r) {
        var i, f, m = Math.min(a.t, this.t);
        for (i = 0; i < m; ++i)
            r[i] = op(this[i], a[i]);
        if (a.t < this.t) {
            f = a.s & this.DM;
            for (i = m; i < this.t; ++i)
                r[i] = op(this[i], f);
            r.t = this.t;
        }
        else {
            f = this.s & this.DM;
            for (i = m; i < a.t; ++i)
                r[i] = op(f, a[i]);
            r.t = a.t;
        }
        r.s = op(this.s, a.s);
        r.clamp();
    }
    function op_and(x, y) { return x & y; }
    function bnAnd(a) { var r = nbi(); this.bitwiseTo(a, op_and, r); return r; }
    function op_or(x, y) { return x | y; }
    function bnOr(a) { var r = nbi(); this.bitwiseTo(a, op_or, r); return r; }
    function op_xor(x, y) { return x ^ y; }
    function bnXor(a) { var r = nbi(); this.bitwiseTo(a, op_xor, r); return r; }
    function op_andnot(x, y) { return x & ~y; }
    function bnAndNot(a) { var r = nbi(); this.bitwiseTo(a, op_andnot, r); return r; }
    function bnNot() {
        var r = nbi();
        for (var i = 0; i < this.t; ++i)
            r[i] = this.DM & ~this[i];
        r.t = this.t;
        r.s = ~this.s;
        return r;
    }
    function bnShiftLeft(n) {
        var r = nbi();
        if (n < 0)
            this.rShiftTo(-n, r);
        else
            this.lShiftTo(n, r);
        return r;
    }
    function bnShiftRight(n) {
        var r = nbi();
        if (n < 0)
            this.lShiftTo(-n, r);
        else
            this.rShiftTo(n, r);
        return r;
    }
    function lbit(x) {
        if (x == 0)
            return -1;
        var r = 0;
        if ((x & 0xffff) == 0) {
            x >>= 16;
            r += 16;
        }
        if ((x & 0xff) == 0) {
            x >>= 8;
            r += 8;
        }
        if ((x & 0xf) == 0) {
            x >>= 4;
            r += 4;
        }
        if ((x & 3) == 0) {
            x >>= 2;
            r += 2;
        }
        if ((x & 1) == 0)
            ++r;
        return r;
    }
    function bnGetLowestSetBit() {
        for (var i = 0; i < this.t; ++i)
            if (this[i] != 0)
                return i * this.DB + lbit(this[i]);
        if (this.s < 0)
            return this.t * this.DB;
        return -1;
    }
    function cbit(x) {
        var r = 0;
        while (x != 0) {
            x &= x - 1;
            ++r;
        }
        return r;
    }
    function bnBitCount() {
        var r = 0, x = this.s & this.DM;
        for (var i = 0; i < this.t; ++i)
            r += cbit(this[i] ^ x);
        return r;
    }
    function bnTestBit(n) {
        var j = Math.floor(n / this.DB);
        if (j >= this.t)
            return (this.s != 0);
        return ((this[j] & (1 << (n % this.DB))) != 0);
    }
    function bnpChangeBit(n, op) {
        var r = BigInteger.ONE.shiftLeft(n);
        this.bitwiseTo(r, op, r);
        return r;
    }
    function bnSetBit(n) { return this.changeBit(n, op_or); }
    function bnClearBit(n) { return this.changeBit(n, op_andnot); }
    function bnFlipBit(n) { return this.changeBit(n, op_xor); }
    function bnpAddTo(a, r) {
        var i = 0, c = 0, m = Math.min(a.t, this.t);
        while (i < m) {
            c += this[i] + a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
        }
        if (a.t < this.t) {
            c += a.s;
            while (i < this.t) {
                c += this[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            c += this.s;
        }
        else {
            c += this.s;
            while (i < a.t) {
                c += a[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            c += a.s;
        }
        r.s = (c < 0) ? -1 : 0;
        if (c > 0)
            r[i++] = c;
        else if (c < -1)
            r[i++] = this.DV + c;
        r.t = i;
        r.clamp();
    }
    function bnAdd(a) { var r = nbi(); this.addTo(a, r); return r; }
    function bnSubtract(a) { var r = nbi(); this.subTo(a, r); return r; }
    function bnMultiply(a) { var r = nbi(); this.multiplyTo(a, r); return r; }
    function bnDivide(a) { var r = nbi(); this.divRemTo(a, r, null); return r; }
    function bnRemainder(a) { var r = nbi(); this.divRemTo(a, null, r); return r; }
    function bnDivideAndRemainder(a) {
        var q = nbi(), r = nbi();
        this.divRemTo(a, q, r);
        return new Array(q, r);
    }
    function bnpDMultiply(n) {
        this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
        ++this.t;
        this.clamp();
    }
    function bnpDAddOffset(n, w) {
        if (n == 0)
            return;
        while (this.t <= w)
            this[this.t++] = 0;
        this[w] += n;
        while (this[w] >= this.DV) {
            this[w] -= this.DV;
            if (++w >= this.t)
                this[this.t++] = 0;
            ++this[w];
        }
    }
    function NullExp() { }
    function nNop(x) { return x; }
    function nMulTo(x, y, r) { x.multiplyTo(y, r); }
    function nSqrTo(x, r) { x.squareTo(r); }
    NullExp.prototype.convert = nNop;
    NullExp.prototype.revert = nNop;
    NullExp.prototype.mulTo = nMulTo;
    NullExp.prototype.sqrTo = nSqrTo;
    function bnPow(e) { return this.exp(e, new NullExp()); }
    function bnpMultiplyLowerTo(a, n, r) {
        var i = Math.min(this.t + a.t, n);
        r.s = 0;
        r.t = i;
        while (i > 0)
            r[--i] = 0;
        var j;
        for (j = r.t - this.t; i < j; ++i)
            r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
        for (j = Math.min(a.t, n); i < j; ++i)
            this.am(0, a[i], r, i, 0, n - i);
        r.clamp();
    }
    function bnpMultiplyUpperTo(a, n, r) {
        --n;
        var i = r.t = this.t + a.t - n;
        r.s = 0;
        while (--i >= 0)
            r[i] = 0;
        for (i = Math.max(n - this.t, 0); i < a.t; ++i)
            r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
        r.clamp();
        r.drShiftTo(1, r);
    }
    function Barrett(m) {
        this.r2 = nbi();
        this.q3 = nbi();
        BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
        this.mu = this.r2.divide(m);
        this.m = m;
    }
    function barrettConvert(x) {
        if (x.s < 0 || x.t > 2 * this.m.t)
            return x.mod(this.m);
        else if (x.compareTo(this.m) < 0)
            return x;
        else {
            var r = nbi();
            x.copyTo(r);
            this.reduce(r);
            return r;
        }
    }
    function barrettRevert(x) { return x; }
    function barrettReduce(x) {
        x.drShiftTo(this.m.t - 1, this.r2);
        if (x.t > this.m.t + 1) {
            x.t = this.m.t + 1;
            x.clamp();
        }
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
        while (x.compareTo(this.r2) < 0)
            x.dAddOffset(1, this.m.t + 1);
        x.subTo(this.r2, x);
        while (x.compareTo(this.m) >= 0)
            x.subTo(this.m, x);
    }
    function barrettSqrTo(x, r) { x.squareTo(r); this.reduce(r); }
    function barrettMulTo(x, y, r) { x.multiplyTo(y, r); this.reduce(r); }
    Barrett.prototype.convert = barrettConvert;
    Barrett.prototype.revert = barrettRevert;
    Barrett.prototype.reduce = barrettReduce;
    Barrett.prototype.mulTo = barrettMulTo;
    Barrett.prototype.sqrTo = barrettSqrTo;
    function bnModPow(e, m) {
        var i = e.bitLength(), k, r = nbv(1), z;
        if (i <= 0)
            return r;
        else if (i < 18)
            k = 1;
        else if (i < 48)
            k = 3;
        else if (i < 144)
            k = 4;
        else if (i < 768)
            k = 5;
        else
            k = 6;
        if (i < 8)
            z = new Classic(m);
        else if (m.isEven())
            z = new Barrett(m);
        else
            z = new Montgomery(m);
        var g = new Array(), n = 3, k1 = k - 1, km = (1 << k) - 1;
        g[1] = z.convert(this);
        if (k > 1) {
            var g2 = nbi();
            z.sqrTo(g[1], g2);
            while (n <= km) {
                g[n] = nbi();
                z.mulTo(g2, g[n - 2], g[n]);
                n += 2;
            }
        }
        var j = e.t - 1, w, is1 = true, r2 = nbi(), t;
        i = nbits(e[j]) - 1;
        while (j >= 0) {
            if (i >= k1)
                w = (e[j] >> (i - k1)) & km;
            else {
                w = (e[j] & ((1 << (i + 1)) - 1)) << (k1 - i);
                if (j > 0)
                    w |= e[j - 1] >> (this.DB + i - k1);
            }
            n = k;
            while ((w & 1) == 0) {
                w >>= 1;
                --n;
            }
            if ((i -= n) < 0) {
                i += this.DB;
                --j;
            }
            if (is1) {
                g[w].copyTo(r);
                is1 = false;
            }
            else {
                while (n > 1) {
                    z.sqrTo(r, r2);
                    z.sqrTo(r2, r);
                    n -= 2;
                }
                if (n > 0)
                    z.sqrTo(r, r2);
                else {
                    t = r;
                    r = r2;
                    r2 = t;
                }
                z.mulTo(r2, g[w], r);
            }
            while (j >= 0 && (e[j] & (1 << i)) == 0) {
                z.sqrTo(r, r2);
                t = r;
                r = r2;
                r2 = t;
                if (--i < 0) {
                    i = this.DB - 1;
                    --j;
                }
            }
        }
        return z.revert(r);
    }
    function bnGCD(a) {
        var x = (this.s < 0) ? this.negate() : this.clone();
        var y = (a.s < 0) ? a.negate() : a.clone();
        if (x.compareTo(y) < 0) {
            var t = x;
            x = y;
            y = t;
        }
        var i = x.getLowestSetBit(), g = y.getLowestSetBit();
        if (g < 0)
            return x;
        if (i < g)
            g = i;
        if (g > 0) {
            x.rShiftTo(g, x);
            y.rShiftTo(g, y);
        }
        while (x.signum() > 0) {
            if ((i = x.getLowestSetBit()) > 0)
                x.rShiftTo(i, x);
            if ((i = y.getLowestSetBit()) > 0)
                y.rShiftTo(i, y);
            if (x.compareTo(y) >= 0) {
                x.subTo(y, x);
                x.rShiftTo(1, x);
            }
            else {
                y.subTo(x, y);
                y.rShiftTo(1, y);
            }
        }
        if (g > 0)
            y.lShiftTo(g, y);
        return y;
    }
    function bnpModInt(n) {
        if (n <= 0)
            return 0;
        var d = this.DV % n, r = (this.s < 0) ? n - 1 : 0;
        if (this.t > 0)
            if (d == 0)
                r = this[0] % n;
            else
                for (var i = this.t - 1; i >= 0; --i)
                    r = (d * r + this[i]) % n;
        return r;
    }
    function bnModInverse(m) {
        var ac = m.isEven();
        if ((this.isEven() && ac) || m.signum() == 0)
            return BigInteger.ZERO;
        var u = m.clone(), v = this.clone();
        var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
        while (u.signum() != 0) {
            while (u.isEven()) {
                u.rShiftTo(1, u);
                if (ac) {
                    if (!a.isEven() || !b.isEven()) {
                        a.addTo(this, a);
                        b.subTo(m, b);
                    }
                    a.rShiftTo(1, a);
                }
                else if (!b.isEven())
                    b.subTo(m, b);
                b.rShiftTo(1, b);
            }
            while (v.isEven()) {
                v.rShiftTo(1, v);
                if (ac) {
                    if (!c.isEven() || !d.isEven()) {
                        c.addTo(this, c);
                        d.subTo(m, d);
                    }
                    c.rShiftTo(1, c);
                }
                else if (!d.isEven())
                    d.subTo(m, d);
                d.rShiftTo(1, d);
            }
            if (u.compareTo(v) >= 0) {
                u.subTo(v, u);
                if (ac)
                    a.subTo(c, a);
                b.subTo(d, b);
            }
            else {
                v.subTo(u, v);
                if (ac)
                    c.subTo(a, c);
                d.subTo(b, d);
            }
        }
        if (v.compareTo(BigInteger.ONE) != 0)
            return BigInteger.ZERO;
        if (d.compareTo(m) >= 0)
            return d.subtract(m);
        if (d.signum() < 0)
            d.addTo(m, d);
        else
            return d;
        if (d.signum() < 0)
            return d.add(m);
        else
            return d;
    }
    var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509];
    var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
    function bnIsProbablePrime(t) {
        var i, x = this.abs();
        if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
            for (i = 0; i < lowprimes.length; ++i)
                if (x[0] == lowprimes[i])
                    return true;
            return false;
        }
        if (x.isEven())
            return false;
        i = 1;
        while (i < lowprimes.length) {
            var m = lowprimes[i], j = i + 1;
            while (j < lowprimes.length && m < lplim)
                m *= lowprimes[j++];
            m = x.modInt(m);
            while (i < j)
                if (m % lowprimes[i++] == 0)
                    return false;
        }
        return x.millerRabin(t);
    }
    function bnpMillerRabin(t) {
        var n1 = this.subtract(BigInteger.ONE);
        var k = n1.getLowestSetBit();
        if (k <= 0)
            return false;
        var r = n1.shiftRight(k);
        t = (t + 1) >> 1;
        if (t > lowprimes.length)
            t = lowprimes.length;
        var a = nbi();
        for (var i = 0; i < t; ++i) {
            a.fromInt(lowprimes[i]);
            var y = a.modPow(r, this);
            if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
                var j = 1;
                while (j++ < k && y.compareTo(n1) != 0) {
                    y = y.modPowInt(2, this);
                    if (y.compareTo(BigInteger.ONE) == 0)
                        return false;
                }
                if (y.compareTo(n1) != 0)
                    return false;
            }
        }
        return true;
    }
    BigInteger.prototype.chunkSize = bnpChunkSize;
    BigInteger.prototype.toRadix = bnpToRadix;
    BigInteger.prototype.fromRadix = bnpFromRadix;
    BigInteger.prototype.fromNumber = bnpFromNumber;
    BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
    BigInteger.prototype.changeBit = bnpChangeBit;
    BigInteger.prototype.addTo = bnpAddTo;
    BigInteger.prototype.dMultiply = bnpDMultiply;
    BigInteger.prototype.dAddOffset = bnpDAddOffset;
    BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
    BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
    BigInteger.prototype.modInt = bnpModInt;
    BigInteger.prototype.millerRabin = bnpMillerRabin;
    BigInteger.prototype.clone = bnClone;
    BigInteger.prototype.intValue = bnIntValue;
    BigInteger.prototype.byteValue = bnByteValue;
    BigInteger.prototype.shortValue = bnShortValue;
    BigInteger.prototype.signum = bnSigNum;
    BigInteger.prototype.toByteArray = bnToByteArray;
    BigInteger.prototype.equals = bnEquals;
    BigInteger.prototype.min = bnMin;
    BigInteger.prototype.max = bnMax;
    BigInteger.prototype.and = bnAnd;
    BigInteger.prototype.or = bnOr;
    BigInteger.prototype.xor = bnXor;
    BigInteger.prototype.andNot = bnAndNot;
    BigInteger.prototype.not = bnNot;
    BigInteger.prototype.shiftLeft = bnShiftLeft;
    BigInteger.prototype.shiftRight = bnShiftRight;
    BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
    BigInteger.prototype.bitCount = bnBitCount;
    BigInteger.prototype.testBit = bnTestBit;
    BigInteger.prototype.setBit = bnSetBit;
    BigInteger.prototype.clearBit = bnClearBit;
    BigInteger.prototype.flipBit = bnFlipBit;
    BigInteger.prototype.add = bnAdd;
    BigInteger.prototype.subtract = bnSubtract;
    BigInteger.prototype.multiply = bnMultiply;
    BigInteger.prototype.divide = bnDivide;
    BigInteger.prototype.remainder = bnRemainder;
    BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
    BigInteger.prototype.modPow = bnModPow;
    BigInteger.prototype.modInverse = bnModInverse;
    BigInteger.prototype.pow = bnPow;
    BigInteger.prototype.gcd = bnGCD;
    BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
    function Arcfour() {
        this.i = 0;
        this.j = 0;
        this.S = new Array();
    }
    function ARC4init(key) {
        var i, j, t;
        for (i = 0; i < 256; ++i)
            this.S[i] = i;
        j = 0;
        for (i = 0; i < 256; ++i) {
            j = (j + this.S[i] + key[i % key.length]) & 255;
            t = this.S[i];
            this.S[i] = this.S[j];
            this.S[j] = t;
        }
        this.i = 0;
        this.j = 0;
    }
    function ARC4next() {
        var t;
        this.i = (this.i + 1) & 255;
        this.j = (this.j + this.S[this.i]) & 255;
        t = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = t;
        return this.S[(t + this.S[this.i]) & 255];
    }
    Arcfour.prototype.init = ARC4init;
    Arcfour.prototype.next = ARC4next;
    function prng_newstate() {
        return new Arcfour();
    }
    var rng_psize = 256;
    var rng_state;
    var rng_pool;
    var rng_pptr;
    function rng_seed_int(x) {
        rng_pool[rng_pptr++] ^= x & 255;
        rng_pool[rng_pptr++] ^= (x >> 8) & 255;
        rng_pool[rng_pptr++] ^= (x >> 16) & 255;
        rng_pool[rng_pptr++] ^= (x >> 24) & 255;
        if (rng_pptr >= rng_psize)
            rng_pptr -= rng_psize;
    }
    function rng_seed_time() {
        rng_seed_int(new Date().getTime());
    }
    if (rng_pool == null) {
        rng_pool = new Array();
        rng_pptr = 0;
        var t;
        if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
            var z = window.crypto.random(32);
            for (t = 0; t < z.length; ++t)
                rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
        }
        while (rng_pptr < rng_psize) {
            t = Math.floor(65536 * Math.random());
            rng_pool[rng_pptr++] = t >>> 8;
            rng_pool[rng_pptr++] = t & 255;
        }
        rng_pptr = 0;
        rng_seed_time();
    }
    function rng_get_byte() {
        if (rng_state == null) {
            rng_seed_time();
            rng_state = prng_newstate();
            rng_state.init(rng_pool);
            for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
                rng_pool[rng_pptr] = 0;
            rng_pptr = 0;
        }
        return rng_state.next();
    }
    function rng_get_bytes(ba) {
        var i;
        for (i = 0; i < ba.length; ++i)
            ba[i] = rng_get_byte();
    }
    function SecureRandom() { }
    SecureRandom.prototype.nextBytes = rng_get_bytes;
    function parseBigInt(str, r) {
        return new BigInteger(str, r);
    }
    function pkcs1pad2(s, n) {
        if (n < s.length + 11) {
            alert("Message too long for RSA");
            return null;
        }
        var ba = new Array();
        var i = s.length - 1;
        while (i >= 0 && n > 0) {
            var c = s.charCodeAt(i--);
            if (c < 128) {
                ba[--n] = c;
            }
            else if ((c > 127) && (c < 2048)) {
                ba[--n] = (c & 63) | 128;
                ba[--n] = (c >> 6) | 192;
            }
            else {
                ba[--n] = (c & 63) | 128;
                ba[--n] = ((c >> 6) & 63) | 128;
                ba[--n] = (c >> 12) | 224;
            }
        }
        ba[--n] = 0;
        var rng = new SecureRandom();
        var x = new Array();
        while (n > 2) {
            x[0] = 0;
            while (x[0] == 0)
                rng.nextBytes(x);
            ba[--n] = x[0];
        }
        ba[--n] = 2;
        ba[--n] = 0;
        return new BigInteger(ba);
    }
    function RSAKey$1() {
        this.n = null;
        this.e = 0;
        this.d = null;
        this.p = null;
        this.q = null;
        this.dmp1 = null;
        this.dmq1 = null;
        this.coeff = null;
    }
    function RSASetPublic(N, E) {
        if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
        }
        else
            alert("Invalid RSA public key");
    }
    function RSADoPublic(x) {
        return x.modPowInt(this.e, this.n);
    }
    function RSAEncrypt(text) {
        var m = pkcs1pad2(text, (this.n.bitLength() + 7) >> 3);
        if (m == null)
            return null;
        var c = this.doPublic(m);
        if (c == null)
            return null;
        var h = c.toString(16);
        if ((h.length & 1) == 0)
            return h;
        else
            return "0" + h;
    }
    RSAKey$1.prototype.doPublic = RSADoPublic;
    RSAKey$1.prototype.setPublic = RSASetPublic;
    RSAKey$1.prototype.encrypt = RSAEncrypt;
    function pkcs1unpad2(d, n) {
        var b = d.toByteArray();
        var i = 0;
        while (i < b.length && b[i] == 0)
            ++i;
        if (b.length - i != n - 1 || b[i] != 2)
            return null;
        ++i;
        while (b[i] != 0)
            if (++i >= b.length)
                return null;
        var ret = "";
        while (++i < b.length) {
            var c = b[i] & 255;
            if (c < 128) {
                ret += String.fromCharCode(c);
            }
            else if ((c > 191) && (c < 224)) {
                ret += String.fromCharCode(((c & 31) << 6) | (b[i + 1] & 63));
                ++i;
            }
            else {
                ret += String.fromCharCode(((c & 15) << 12) | ((b[i + 1] & 63) << 6) | (b[i + 2] & 63));
                i += 2;
            }
        }
        return ret;
    }
    function RSASetPrivate(N, E, D) {
        if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
            this.d = parseBigInt(D, 16);
        }
        else
            alert("Invalid RSA private key");
    }
    function RSASetPrivateEx(N, E, D, P, Q, DP, DQ, C) {
        if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
            this.d = parseBigInt(D, 16);
            this.p = parseBigInt(P, 16);
            this.q = parseBigInt(Q, 16);
            this.dmp1 = parseBigInt(DP, 16);
            this.dmq1 = parseBigInt(DQ, 16);
            this.coeff = parseBigInt(C, 16);
        }
        else
            alert("Invalid RSA private key");
    }
    function RSAGenerate(B, E) {
        var rng = new SecureRandom();
        var qs = B >> 1;
        this.e = parseInt(E, 16);
        var ee = new BigInteger(E, 16);
        for (;;) {
            for (;;) {
                this.p = new BigInteger(B - qs, 1, rng);
                if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10))
                    break;
            }
            for (;;) {
                this.q = new BigInteger(qs, 1, rng);
                if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10))
                    break;
            }
            if (this.p.compareTo(this.q) <= 0) {
                var t = this.p;
                this.p = this.q;
                this.q = t;
            }
            var p1 = this.p.subtract(BigInteger.ONE);
            var q1 = this.q.subtract(BigInteger.ONE);
            var phi = p1.multiply(q1);
            if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
                this.n = this.p.multiply(this.q);
                this.d = ee.modInverse(phi);
                this.dmp1 = this.d.mod(p1);
                this.dmq1 = this.d.mod(q1);
                this.coeff = this.q.modInverse(this.p);
                break;
            }
        }
    }
    function RSADoPrivate(x) {
        if (this.p == null || this.q == null)
            return x.modPow(this.d, this.n);
        var xp = x.mod(this.p).modPow(this.dmp1, this.p);
        var xq = x.mod(this.q).modPow(this.dmq1, this.q);
        while (xp.compareTo(xq) < 0)
            xp = xp.add(this.p);
        return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
    }
    function RSADecrypt(ctext) {
        var c = parseBigInt(ctext, 16);
        var m = this.doPrivate(c);
        if (m == null)
            return null;
        return pkcs1unpad2(m, (this.n.bitLength() + 7) >> 3);
    }
    RSAKey$1.prototype.doPrivate = RSADoPrivate;
    RSAKey$1.prototype.setPrivate = RSASetPrivate;
    RSAKey$1.prototype.setPrivateEx = RSASetPrivateEx;
    RSAKey$1.prototype.generate = RSAGenerate;
    RSAKey$1.prototype.decrypt = RSADecrypt;
    globalThis["RSAKey"] = RSAKey$1;

    var Zohovault$1 = {};
    Zohovault$1.hash = function (s) {
        var chrsz = 8;
        function safe_add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }
        function S(X, n) { return (X >>> n) | (X << (32 - n)); }
        function R(X, n) { return (X >>> n); }
        function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
        function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
        function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
        function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
        function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
        function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
        function core_sha256(m, l) {
            var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
            var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
            var W = new Array(64);
            var a, b, c, d, e, f, g, h, i, j;
            var T1, T2;
            m[l >> 5] |= 0x80 << (24 - l % 32);
            m[((l + 64 >> 9) << 4) + 15] = l;
            for (var i = 0; i < m.length; i += 16) {
                a = HASH[0];
                b = HASH[1];
                c = HASH[2];
                d = HASH[3];
                e = HASH[4];
                f = HASH[5];
                g = HASH[6];
                h = HASH[7];
                for (var j = 0; j < 64; j++) {
                    if (j < 16) {
                        W[j] = m[j + i];
                    }
                    else {
                        W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
                    }
                    T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                    T2 = safe_add(Sigma0256(a), Maj(a, b, c));
                    h = g;
                    g = f;
                    f = e;
                    e = safe_add(d, T1);
                    d = c;
                    c = b;
                    b = a;
                    a = safe_add(T1, T2);
                }
                HASH[0] = safe_add(a, HASH[0]);
                HASH[1] = safe_add(b, HASH[1]);
                HASH[2] = safe_add(c, HASH[2]);
                HASH[3] = safe_add(d, HASH[3]);
                HASH[4] = safe_add(e, HASH[4]);
                HASH[5] = safe_add(f, HASH[5]);
                HASH[6] = safe_add(g, HASH[6]);
                HASH[7] = safe_add(h, HASH[7]);
            }
            return HASH;
        }
        function str2binb(str) {
            var bin = Array();
            var mask = (1 << chrsz) - 1;
            for (var i = 0; i < str.length * chrsz; i += chrsz) {
                bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
            }
            return bin;
        }
        function Utf8Encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        }
        function binb2hex(binarray) {
            var hex_tab = "0123456789abcdef";
            var str = "";
            for (var i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                    hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
            }
            return str;
        }
        s = Utf8Encode(s);
        return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
    };
    Zohovault$1.Utf8 = {
        encode: function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        },
        decode: function (utftext) {
            var string = "";
            var i = 0;
            var c2 = 0, c3 = 0;
            var c = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    };
    Zohovault$1.Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = Zohovault$1.Utf8.encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                }
                else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }
            return output;
        },
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = Zohovault$1.Utf8.decode(output);
            return output;
        }
    };
    Zohovault$1.AES = {};
    Zohovault$1.AES.cipher = function (input, w) {
        var Nb = 4;
        var Nr = w.length / Nb - 1;
        var state = [[], [], [], []];
        for (var i = 0; i < 4 * Nb; i++) {
            state[i % 4][Math.floor(i / 4)] = input[i];
        }
        state = Zohovault$1.AES.addRoundKey(state, w, 0, Nb);
        for (var round = 1; round < Nr; round++) {
            state = Zohovault$1.AES.subBytes(state, Nb);
            state = Zohovault$1.AES.shiftRows(state, Nb);
            state = Zohovault$1.AES.mixColumns(state, Nb);
            state = Zohovault$1.AES.addRoundKey(state, w, round, Nb);
        }
        state = Zohovault$1.AES.subBytes(state, Nb);
        state = Zohovault$1.AES.shiftRows(state, Nb);
        state = Zohovault$1.AES.addRoundKey(state, w, Nr, Nb);
        var output = new Array(4 * Nb);
        for (var i = 0; i < 4 * Nb; i++) {
            output[i] = state[i % 4][Math.floor(i / 4)];
        }
        return output;
    };
    Zohovault$1.AES.keyExpansion = function (key) {
        var Nb = 4;
        var Nk = key.length / 4;
        var Nr = Nk + 6;
        var w = new Array(Nb * (Nr + 1));
        var temp = new Array(4);
        for (var i = 0; i < Nk; i++) {
            var r = [key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]];
            w[i] = r;
        }
        for (var i = Nk; i < (Nb * (Nr + 1)); i++) {
            w[i] = new Array(4);
            for (var t = 0; t < 4; t++) {
                temp[t] = w[i - 1][t];
            }
            if (i % Nk == 0) {
                temp = Zohovault$1.AES.subWord(Zohovault$1.AES.rotWord(temp));
                for (var t = 0; t < 4; t++) {
                    temp[t] ^= Zohovault$1.AES.rCon[i / Nk][t];
                }
            }
            else if (Nk > 6 && i % Nk == 4) {
                temp = Zohovault$1.AES.subWord(temp);
            }
            for (var t = 0; t < 4; t++) {
                w[i][t] = w[i - Nk][t] ^ temp[t];
            }
        }
        return w;
    };
    Zohovault$1.AES.subBytes = function (s, Nb) {
        for (var r = 0; r < 4; r++) {
            for (var c = 0; c < Nb; c++) {
                s[r][c] = Zohovault$1.AES.sBox[s[r][c]];
            }
        }
        return s;
    };
    Zohovault$1.AES.shiftRows = function (s, Nb) {
        var t = new Array(4);
        for (var r = 1; r < 4; r++) {
            for (var c = 0; c < 4; c++) {
                t[c] = s[r][(c + r) % Nb];
            }
            for (var c = 0; c < 4; c++) {
                s[r][c] = t[c];
            }
        }
        return s;
    };
    Zohovault$1.AES.mixColumns = function (s, Nb) {
        for (var c = 0; c < 4; c++) {
            var a = new Array(4);
            var b = new Array(4);
            for (var i = 0; i < 4; i++) {
                a[i] = s[i][c];
                b[i] = s[i][c] & 0x80 ? s[i][c] << 1 ^ 0x011b : s[i][c] << 1;
            }
            s[0][c] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3];
            s[1][c] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3];
            s[2][c] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3];
            s[3][c] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3];
        }
        return s;
    };
    Zohovault$1.AES.addRoundKey = function (state, w, rnd, Nb) {
        for (var r = 0; r < 4; r++) {
            for (var c = 0; c < Nb; c++) {
                state[r][c] ^= w[rnd * 4 + c][r];
            }
        }
        return state;
    };
    Zohovault$1.AES.subWord = function (w) {
        for (var i = 0; i < 4; i++) {
            w[i] = Zohovault$1.AES.sBox[w[i]];
        }
        return w;
    };
    Zohovault$1.AES.rotWord = function (w) {
        var tmp = w[0];
        for (var i = 0; i < 3; i++) {
            w[i] = w[i + 1];
        }
        w[3] = tmp;
        return w;
    };
    Zohovault$1.AES.sBox = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
        0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
        0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
        0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
        0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
        0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
        0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
        0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
        0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
        0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
        0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
        0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
        0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
        0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
        0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
        0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
    Zohovault$1.AES.rCon = [[0x00, 0x00, 0x00, 0x00],
        [0x01, 0x00, 0x00, 0x00],
        [0x02, 0x00, 0x00, 0x00],
        [0x04, 0x00, 0x00, 0x00],
        [0x08, 0x00, 0x00, 0x00],
        [0x10, 0x00, 0x00, 0x00],
        [0x20, 0x00, 0x00, 0x00],
        [0x40, 0x00, 0x00, 0x00],
        [0x80, 0x00, 0x00, 0x00],
        [0x1b, 0x00, 0x00, 0x00],
        [0x36, 0x00, 0x00, 0x00]];
    Zohovault$1.AES.encrypt = function (plaintext, password, nBits) {
        var blockSize = 16;
        if (!(nBits == 128 || nBits == 192 || nBits == 256)) {
            return '';
        }
        plaintext = Utf8.encode(plaintext);
        password = Utf8.encode(password);
        var nBytes = nBits / 8;
        var pwBytes = new Array(nBytes);
        for (var i = 0; i < nBytes; i++) {
            pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
        }
        var key = Zohovault$1.AES.cipher(pwBytes, Zohovault$1.AES.keyExpansion(pwBytes));
        key = key.concat(key.slice(0, nBytes - 16));
        var counterBlock = new Array(blockSize);
        var nonce = (new Date()).getTime();
        var nonceMs = nonce % 1000;
        var nonceSec = Math.floor(nonce / 1000);
        var nonceRnd = Math.floor(Math.random() * 0xffff);
        for (var i = 0; i < 2; i++) {
            counterBlock[i] = (nonceMs >>> i * 8) & 0xff;
        }
        for (var i = 0; i < 2; i++) {
            counterBlock[i + 2] = (nonceRnd >>> i * 8) & 0xff;
        }
        for (var i = 0; i < 4; i++) {
            counterBlock[i + 4] = (nonceSec >>> i * 8) & 0xff;
        }
        var ctrTxt = '';
        for (var i = 0; i < 8; i++) {
            ctrTxt += String.fromCharCode(counterBlock[i]);
        }
        var keySchedule = Zohovault$1.AES.keyExpansion(key);
        var blockCount = Math.ceil(plaintext.length / blockSize);
        var ciphertxt = new Array(blockCount);
        for (var b = 0; b < blockCount; b++) {
            for (var c = 0; c < 4; c++) {
                counterBlock[15 - c] = (b >>> c * 8) & 0xff;
            }
            for (var c = 0; c < 4; c++) {
                counterBlock[15 - c - 4] = (b / 0x100000000 >>> c * 8);
            }
            var cipherCntr = Zohovault$1.AES.cipher(counterBlock, keySchedule);
            var blockLength = b < blockCount - 1 ? blockSize : (plaintext.length - 1) % blockSize + 1;
            var cipherChar = new Array(blockLength);
            for (var i = 0; i < blockLength; i++) {
                cipherChar[i] = cipherCntr[i] ^ plaintext.charCodeAt(b * blockSize + i);
                cipherChar[i] = String.fromCharCode(cipherChar[i]);
            }
            ciphertxt[b] = cipherChar.join('');
        }
        var ciphertext = ctrTxt + ciphertxt.join('');
        ciphertext = Base64.encode(ciphertext);
        return ciphertext;
    };
    Zohovault$1.AES.decrypt = function (ciphertext, password, nBits) {
        var blockSize = 16;
        if (!(nBits == 128 || nBits == 192 || nBits == 256)) {
            return '';
        }
        ciphertext = Base64.decode(ciphertext);
        password = Utf8.encode(password);
        var nBytes = nBits / 8;
        var pwBytes = new Array(nBytes);
        for (var i = 0; i < nBytes; i++) {
            pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
        }
        var key = Zohovault$1.AES.cipher(pwBytes, Zohovault$1.AES.keyExpansion(pwBytes));
        key = key.concat(key.slice(0, nBytes - 16));
        var counterBlock = new Array(8);
        ctrTxt = ciphertext.slice(0, 8);
        for (var i = 0; i < 8; i++) {
            counterBlock[i] = ctrTxt.charCodeAt(i);
        }
        var keySchedule = Zohovault$1.AES.keyExpansion(key);
        var nBlocks = Math.ceil((ciphertext.length - 8) / blockSize);
        var ct = new Array(nBlocks);
        for (var b = 0; b < nBlocks; b++) {
            ct[b] = ciphertext.slice(8 + b * blockSize, 8 + b * blockSize + blockSize);
        }
        ciphertext = ct;
        var plaintxt = new Array(ciphertext.length);
        for (var b = 0; b < nBlocks; b++) {
            for (var c = 0; c < 4; c++) {
                counterBlock[15 - c] = ((b) >>> c * 8) & 0xff;
            }
            for (var c = 0; c < 4; c++) {
                counterBlock[15 - c - 4] = (((b + 1) / 0x100000000 - 1) >>> c * 8) & 0xff;
            }
            var cipherCntr = Zohovault$1.AES.cipher(counterBlock, keySchedule);
            var plaintxtByte = new Array(ciphertext[b].length);
            for (var i = 0; i < ciphertext[b].length; i++) {
                plaintxtByte[i] = cipherCntr[i] ^ ciphertext[b].charCodeAt(i);
                plaintxtByte[i] = String.fromCharCode(plaintxtByte[i]);
            }
            plaintxt[b] = plaintxtByte.join('');
        }
        var plaintext = plaintxt.join('');
        plaintext = Utf8.decode(plaintext);
        return plaintext;
    };
    var Base64 = {};
    globalThis.Base64 = Base64;
    Base64.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    Base64.encode = function (str, utf8encode) {
        utf8encode = (typeof utf8encode == 'undefined') ? false : utf8encode;
        var o1, o2, o3, bits, h1, h2, h3, h4, e = [], pad = '', c, plain, coded;
        var b64 = Base64.code;
        plain = utf8encode ? str.encodeUTF8() : str;
        c = plain.length % 3;
        if (c > 0) {
            while (c++ < 3) {
                pad += '=';
                plain += '\0';
            }
        }
        for (c = 0; c < plain.length; c += 3) {
            o1 = plain.charCodeAt(c);
            o2 = plain.charCodeAt(c + 1);
            o3 = plain.charCodeAt(c + 2);
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;
            e[c / 3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        }
        coded = e.join('');
        coded = coded.slice(0, coded.length - pad.length) + pad;
        return coded;
    };
    Base64.decode = function (str, utf8decode) {
        utf8decode = (typeof utf8decode == 'undefined') ? false : utf8decode;
        var o1, o2, o3, h1, h2, h3, h4, bits, d = [], plain, coded;
        var b64 = Base64.code;
        coded = utf8decode ? str.decodeUTF8() : str;
        for (var c = 0; c < coded.length; c += 4) {
            h1 = b64.indexOf(coded.charAt(c));
            h2 = b64.indexOf(coded.charAt(c + 1));
            h3 = b64.indexOf(coded.charAt(c + 2));
            h4 = b64.indexOf(coded.charAt(c + 3));
            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
            o1 = bits >>> 16 & 0xff;
            o2 = bits >>> 8 & 0xff;
            o3 = bits & 0xff;
            d[c / 4] = String.fromCharCode(o1, o2, o3);
            if (h4 == 0x40) {
                d[c / 4] = String.fromCharCode(o1, o2);
            }
            if (h3 == 0x40) {
                d[c / 4] = String.fromCharCode(o1);
            }
        }
        plain = d.join('');
        return utf8decode ? plain.decodeUTF8() : plain;
    };
    var Utf8 = {};
    globalThis.Utf8 = Utf8;
    Utf8.encode = function (strUni) {
        var strUtf = strUni.replace(/[\u0080-\u07ff]/g, function (c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
        });
        strUtf = strUtf.replace(/[\u0800-\uffff]/g, function (c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
        });
        return strUtf;
    };
    Utf8.decode = function (strUtf) {
        var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (c) {
            var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
            return String.fromCharCode(cc);
        });
        strUni = strUni.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (c) {
            var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
            return String.fromCharCode(cc);
        });
        return strUni;
    };
    var ctrTxt;
    globalThis.Zohovault = Zohovault$1;

    class BgZCrypt {
        orgKey = "";
        masterkey = "";
        async encrypt(plaintext, isShared) {
            try {
                const key = await this.getKey(isShared);
                return Zohovault.AES.encrypt(plaintext, key, 256);
            }
            catch (e) {
                throw jserror(e + "");
            }
        }
        async encryptObject(plainObj, isShared) {
            try {
                const encryptedObj = {};
                const encryptionKey = await this.getKey(isShared);
                for (let key in plainObj) {
                    encryptedObj[key] = Zohovault.AES.encrypt(plainObj[key], encryptionKey, 256);
                }
                return encryptedObj;
            }
            catch (e) {
                throw jserror(e + "");
            }
        }
        async decrypt(ciphertext, isShared) {
            try {
                const key = await this.getKey(isShared);
                const decrypted = await VaultCrypto.aesDecrypt(ciphertext, key);
                return decrypted;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async decryptObject(cipherObj, isShared) {
            try {
                const encryptionKey = await this.getKey(isShared);
                const decryptedObj = {};
                for (let key in cipherObj) {
                    decryptedObj[key] = await VaultCrypto.aesDecrypt(cipherObj[key], encryptionKey);
                }
                return decryptedObj;
            }
            catch (e) {
                throw jserror(e + "");
            }
        }
        async getIsShared(classification) {
            try {
                const useOrgKey = classification == SecretClassification.ENTERPRISE && (await this.checkHasOrgKey());
                return useOrgKey;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async getKey(isShared) {
            const key = isShared ? (await this.getOrgKey()) : (await this.getMasterKey());
            return key;
        }
        async clearCachedVariableKeys() {
            this.masterkey = this.orgKey = "";
        }
        async getMasterKey() {
            if (!this.masterkey) {
                this.masterkey = await zsessionStorage.load(SessionStorageKeys.MASTER_KEY, null);
            }
            if (!this.masterkey) {
                throw jserror("MASTER_KEY " + zerror.NOT_FOUND);
            }
            return this.masterkey;
        }
        async getOrgKey() {
            if (!this.orgKey) {
                this.orgKey = await zsessionStorage.load(SessionStorageKeys.ORG_KEY, null);
            }
            if (!this.orgKey) {
                throw jserror("ORG_KEY " + zerror.NOT_FOUND);
            }
            return this.orgKey;
        }
        async checkHasOrgKey() {
            try {
                const key = await zsessionStorage.load(SessionStorageKeys.ORG_KEY, null);
                const validKey = Boolean(key);
                return validKey;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        encodeBase64(text) {
            try {
                return VaultCrypto.encodeBase64(text || "");
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        decodeBase64(encodedText) {
            try {
                return VaultCrypto.decodeBase64(encodedText || "");
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        hash(text) {
            try {
                return Zohovault.hash(text);
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        encryptRsa(plainText, publicKey) {
            try {
                const rsa = new RSAKey();
                rsa.setPublic(publicKey, '10001');
                return rsa.encrypt(plainText);
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        decryptRsa(cipherText, privateKeyParts) {
            try {
                const privateKey = privateKeyParts.split(',');
                let rsa = new RSAKey();
                rsa.setPrivateEx(privateKey[0], privateKey[1], privateKey[2], privateKey[3], privateKey[4], privateKey[5], privateKey[6], privateKey[7]);
                return rsa.decrypt(cipherText);
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async fileEncrypt(fileContent, isShared) {
            try {
                const key = await this.getKey(isShared);
                return this.fileEncryptV1(fileContent, key);
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async fileDecrypt(encryptedFileContent = "", isShared) {
            try {
                const key = await this.getKey(isShared);
                return this.fileDecryptV1(encryptedFileContent, key);
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        fileEncryptV1(fileContent, key) {
            try {
                return CryptoJS.AES.encrypt(fileContent, key).toString();
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        fileDecryptV1(encryptedFileContent = "", key) {
            try {
                return CryptoJS.AES.decrypt(encryptedFileContent, key).toString(CryptoJS.enc.Latin1);
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
    }

    class BgBasicAuthenticationHandler {
        loginData = null;
        providedCredentials = false;
        lastBasicAuthEvent = {
            happenedOn: 0,
            requestId: "",
            tabId: 0,
            url: ""
        };
        init() {
            try {
                const isFirefox = config.get(ConfigKeys.BROWSER) == Browser.FIREFOX;
                if (isFirefox) {
                    globalThis.browser.webRequest.onAuthRequired.addListener(this.handleFirefoxAuthRequired.bind(this), { urls: ["http://*/*", "https://*/*"] }, ["blocking"]);
                    return;
                }
                if (chrome?.webRequest?.onAuthRequired) {
                    chrome.webRequest.onAuthRequired.addListener(this.handleAuthRequired.bind(this), { urls: ["http://*/*", "https://*/*"] }, ["asyncBlocking"]);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async handleBasicAuthenticationLogin(loginData) {
            try {
                await this.repromptIfNeeded();
                this.loginData = loginData;
                this.providedCredentials = false;
            }
            catch (e) {
                logError(e);
            }
        }
        async repromptIfNeeded() {
            try {
                const activeTab = await brApi.tab.getActiveTab();
                const isCompletedActiveTab = activeTab && (activeTab.status == "complete");
                if (!isCompletedActiveTab) {
                    return;
                }
                await this.loadLastEventDetail();
                const isHappenedInSameTab = this.lastBasicAuthEvent.tabId == activeTab.id;
                if (!isHappenedInSameTab) {
                    return;
                }
                const isWithinAMinute = this.lastBasicAuthEvent.happenedOn > (Date.now() - 60 * 1000);
                if (!isWithinAMinute) {
                    return;
                }
                await brApi.tab.updateTab(activeTab.id, { url: activeTab.url });
            }
            catch (e) {
                logError(e);
            }
        }
        finishBasicAuthentication() {
            this.loginData = null;
            const loggedIn = this.providedCredentials;
            this.providedCredentials = false;
            return loggedIn;
        }
        async handleFirefoxAuthRequired(details) {
            return new Promise(res => this.handleAuthRequired(details, res));
        }
        async handleAuthRequired(details, callback) {
            try {
                await this.loadLastEventDetail();
                if (this.lastBasicAuthEvent.requestId == details.requestId) {
                    callback(null);
                    return null;
                }
                const isTopFrame = details.frameId == 0;
                if (!isTopFrame) {
                    callback(null);
                    return null;
                }
                await this.saveEventDetail(details);
                if (!this.loginData) {
                    callback(null);
                    return null;
                }
                const allowedDomain = this.loginData.allowedDomains.includes(js.url.getParentDomainFromHostName(details.challenger.host));
                if (!allowedDomain) {
                    callback(null);
                    return null;
                }
                const hasValidUsername = this.loginData.texts.length > 0 && (this.loginData.texts[0].length > 0);
                if (!hasValidUsername) {
                    callback(null);
                    return null;
                }
                const hasValidPassword = this.loginData.passwords.length > 0 && (this.loginData.passwords[0].length > 0);
                if (!hasValidPassword) {
                    callback(null);
                    return null;
                }
                const username = this.loginData.texts[0];
                const password = this.loginData.passwords[0];
                callback({
                    authCredentials: {
                        username: username,
                        password: password
                    }
                });
                return null;
            }
            catch (e) {
                logError(e);
                callback(null);
                return null;
            }
        }
        async loadLastEventDetail() {
            this.lastBasicAuthEvent = await zsessionStorage.load(SessionStorageKeys.LAST_BASIC_AUTH_EVENT, this.lastBasicAuthEvent);
        }
        async saveEventDetail(authEvent) {
            this.lastBasicAuthEvent.happenedOn = Date.now();
            this.lastBasicAuthEvent.requestId = authEvent.requestId;
            this.lastBasicAuthEvent.tabId = authEvent.tabId;
            this.lastBasicAuthEvent.url = authEvent.url;
            await zsessionStorage.save(SessionStorageKeys.LAST_BASIC_AUTH_EVENT, this.lastBasicAuthEvent);
        }
    }

    class _BgOffscreenApiImpl {
        apiClient;
        setupPromise = null;
        init() {
            this.apiClient = portApi.createApiClient();
            this.apiClient.init({ name: VtApiPortNames.OFFSCREEN });
        }
        async copyToClipboard(text) {
            await this.setupDoc();
            return this.apiClient.callApi({ path: this.copyToClipboard.name, args: [text] });
        }
        async setupDoc() {
            if (this.setupPromise) {
                return this.setupPromise;
            }
            this.setupPromise = js.promise.createNew();
            try {
                const offscreenUrl = brApi.runtime.getUrl("/html/offscreen.html");
                if (await this.isAlreadyOpen(offscreenUrl)) {
                    return;
                }
                await chrome.offscreen.createDocument({
                    url: offscreenUrl,
                    reasons: [chrome.offscreen.Reason.CLIPBOARD, chrome.offscreen.Reason.DOM_PARSER],
                    justification: "for copying contents to clipboard, parsing dom(to get server error message - if error from server is of type text/html), getting websites favIcon"
                });
            }
            finally {
                this.setupPromise.resolve();
                this.setupPromise = null;
            }
        }
        async isAlreadyOpen(url) {
            try {
                const clients = await bgUtil.getClients();
                return clients.some(x => x.url == url);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async parseDOMContents(htmlContent, ...selectors) {
            await this.setupDoc();
            return this.apiClient.callApi({ path: this.parseDOMContents.name, args: [htmlContent, ...selectors] });
        }
        async getLogo(src) {
            await this.setupDoc();
            return this.apiClient.callApi({ path: this.getLogo.name, args: [src] });
        }
    }

    class _BgOffscreenApiImplV2 {
        init() { }
        async copyToClipboard(text) {
            js.dom.copyToClipboard(text);
        }
        async parseDOMContents(htmlContent, ...selectors) {
            try {
                const dom = new DOMParser().parseFromString(htmlContent, "text/html");
                const elements = selectors.map(selector => dom.querySelector(selector));
                const contents = elements.map(x => x ? x.textContent : "");
                return contents;
            }
            catch (e) {
                console.error(e, e + "");
                return [];
            }
        }
        getLogo(src) {
            return js.logo.getBase64Logo(src);
        }
    }

    class BgOffscreenApiImplProvider {
        static getInstance() {
            try {
                if (brApi.isV2()) {
                    return new _BgOffscreenApiImplV2();
                }
                return new _BgOffscreenApiImpl();
            }
            catch (e) {
                return null;
            }
        }
    }

    class BgCSUtil {
        async showAlert(tabId, config) {
            try {
                await bgStorage.tab.save(tabId, TabStorageKeys.ALERT_CONFIG, config);
                return csApi.frame.showAlertFrame(tabId);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class BgClipboardImpl {
        async copy(text, options = null) {
            try {
                await this.copyToClipboard(text);
                if (options?.noAutoClear) {
                    return;
                }
                const clearTimeSeconds = await zlocalStorage.load(LocalStorageKeys.CLEAR_CLIPBOARD, 30);
                brApi.alarm.createAlarm(AlarmHandler.ALARM.CLEAR_CLIPBOARD, clearTimeSeconds);
            }
            catch (e) {
                logError(e);
            }
        }
        async clear() {
            return this.copyToClipboard(" ");
        }
        async copyToClipboard(text) {
            try {
                if (brApi.isV2()) {
                    bg.offscreenApi.copyToClipboard(text);
                    return;
                }
                if (chrome.offscreen && chrome.offscreen.createDocument) {
                    bg.offscreenApi.copyToClipboard(text);
                    return;
                }
                const popupPresent = await bg.popupClient.checkConnectable();
                if (popupPresent) {
                    await bg.popupClient.copyToClipboard(text);
                    return;
                }
                const zTabPresent = await bg.ztabClient.checkConnectable();
                if (zTabPresent) {
                    await bg.ztabClient.copyToClipboard(text);
                    return;
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    initContext$3();
    let badgeMenuHandler = badgeMenuHandler$1;

    class Vault {
        async isUnlocked() {
            try {
                const unlockPromise = bg$1.vaultLogin.unlockPromise;
                if (unlockPromise) {
                    try {
                        await unlockPromise;
                    }
                    catch (e) { }
                }
                const masterKey = await zsessionStorage.load(SessionStorageKeys.MASTER_KEY, "");
                const unlocked = Boolean(masterKey);
                return unlocked;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async lock() {
            try {
                await bg$1.ztabHandler.closeZTab();
                await zsessionStorage.clear();
                await bg$1.zcrypt.clearCachedVariableKeys();
                await bg$1.clipboard.clear();
                badgeMenuHandler.changeState(VtLoginState.LOCKED);
                bgEventServer.login.locked();
                inactivityHandler.clearAlarms();
            }
            catch (e) {
                logError(e);
            }
        }
        async silentSignOut() {
            try {
                await db.clean();
                const persist_keys = [];
                const persist_input = {};
                persist_keys.forEach(x => persist_input[x] = "");
                const persist_obj = await zlocalStorage.loadAll(persist_input);
                await zlocalStorage.clear();
                await zsessionStorage.clear();
                await zlocalStorage.saveAll(persist_obj);
                await bg$1.clipboard.clear();
                bgEventServer.login.loggedOut();
                await js.time.delay(0.5);
                await brApi.runtime.reload();
            }
            catch (e) {
                logError(e);
            }
        }
        async signOut() {
            const staySignedIn = await zlocalStorage.load(VtSettings.STAY_SIGNED_IN, false);
            if (staySignedIn) {
                return this.silentSignOut();
            }
            return this.forceSignOut();
        }
        async forceSignOut() {
            const accountsUrl = urlProvider.getAccountsUrl();
            js.time.delay(0.5).then(() => brApi.tab.create(accountsUrl + "/logout?servicename=ZohoVault"));
            return this.silentSignOut();
        }
    }

    var VtErrorCode;
    (function (VtErrorCode) {
        VtErrorCode["NEED_SIGN_UP"] = "NEED_SIGN_UP";
    })(VtErrorCode || (VtErrorCode = {}));

    class VaultLogin {
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
                bg$1.vaultSync.sync(false);
                bgEventServer.login.unlocked();
                badgeMenuHandler$1.changeState(VtLoginState.UNLOCKED);
                inactivityHandler.createAlarms();
                zlocalStorage.remove(LocalStorageKeys.PASSPHRASE_INVALID_COUNT);
                bg$1.zmaps.init();
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
                const privateKey = await bg$1.zcrypt.decrypt(keys.privateKey, false);
                const org_key = bg$1.zcrypt.decryptRsa(keys.orgKey, privateKey);
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
                    await bg$1.vault.lock();
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
                const orgKey = await bg$1.zcrypt.getOrgKey();
                const userKeys = [];
                for (let userInfo of pendingUserInfos) {
                    userKeys.push({
                        zuid: userInfo.zuid,
                        key: bg$1.zcrypt.encryptRsa(orgKey, userInfo.publicKey)
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

    class FormUtil {
        async getPaymentCardCategoryId() {
            try {
                return await zlocalStorage.load(LocalStorageKeys.PAYMENT_CARD_TYPE_ID, "");
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async isPaymentCardCategory(categoryId) {
            try {
                if (!categoryId) {
                    return false;
                }
                const paymentCardId = await this.getPaymentCardCategoryId();
                return paymentCardId == categoryId;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async getAddressCategoryId() {
            try {
                return await zlocalStorage.load(LocalStorageKeys.ADDRESS_TYPE_ID, "");
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async isAddressCategory(categoryId) {
            try {
                if (!categoryId) {
                    return false;
                }
                const addressId = await this.getAddressCategoryId();
                return addressId == categoryId;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }
    const formUtil = new FormUtil();
    setGlobal("formUtil", formUtil);

    class VaultSecretTypes {
        async sync() {
            try {
                const resp = (await vapi.getAllSecretTypes()).result;
                const respSecretTypes = resp.operation.Details.secret_types;
                const secretTypeList = [];
                const systemDefinedTypes = [];
                for (let curRespSecretType of respSecretTypes) {
                    try {
                        const secretType = new SecretType();
                        secretType.name = curRespSecretType.secret_type_name;
                        secretType.id = curRespSecretType.secret_type_id;
                        if (curRespSecretType.added_by) {
                            secretType.added_by = curRespSecretType.added_by.zuid;
                        }
                        secretType.enabled = curRespSecretType.status;
                        secretType.fields = curRespSecretType.secret_type_fields;
                        secretType.excludeAssessment = curRespSecretType.exclude_password_assessment;
                        this.fillInitialSecretType(secretType);
                        secretTypeList.push(secretType);
                        if (curRespSecretType.is_system_defined) {
                            systemDefinedTypes.push(secretType);
                        }
                    }
                    catch (e) {
                        logError(e);
                    }
                }
                this.updateStandardTypeIds(systemDefinedTypes);
                await accountDb.secretTypeTable.saveAll(secretTypeList);
            }
            catch (e) {
                logError(e);
            }
        }
        async getWebAccountType() {
            try {
                const secretTypes = await accountDb.secretTypeTable.loadAll();
                const webAccountType = secretTypes.find(x => (x.name == "Web Account") && (x.added_by == ""));
                if (webAccountType) {
                    return webAccountType;
                }
                for (let secretType of secretTypes) {
                    if (secretType.password_fields.length > 0 && secretType.text_fields.length > 0) {
                        return secretType;
                    }
                }
                return secretTypes[0] || new SecretType();
            }
            catch (e) {
                logError(e);
                return new SecretType();
            }
        }
        async getCardType() {
            try {
                const paymentCardId = await formUtil.getPaymentCardCategoryId();
                if (!paymentCardId) {
                    return null;
                }
                return await accountDb.secretTypeTable.load(paymentCardId);
            }
            catch (e) {
                logError(e);
                return new SecretType();
            }
        }
        async getMap() {
            try {
                return accountDb.secretTypeTable.loadMap();
            }
            catch (e) {
                logError(e);
                return {};
            }
        }
        async getCountMap() {
            try {
                const map = await this.getMap();
                const secrets = await accountDb.secretTable.loadAll();
                const countMap = {};
                for (let secret of secrets) {
                    countMap[secret.type_id] = (countMap[secret.type_id] || 0) + 1;
                }
                const resp = {
                    countMap,
                    map
                };
                return resp;
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
        fillInitialSecretType(secret_type) {
            secret_type.text_fields = secret_type.fields.filter(x => !x.isDeleted && x.type == SecretType.FIELD_TYPE.TEXT);
            secret_type.password_fields = secret_type.fields.filter(x => !x.isDeleted && x.type == SecretType.FIELD_TYPE.PASSWORD);
            secret_type.ui_fields = secret_type.text_fields.filter(x => !x.pii).map(x => x.name);
        }
        async getExistingSecretType(url) {
            try {
                const query = SecretQuery.newBuilder().rowsPerPage(-1).domainMatching(true, url).noLogo(true).orderByHostRecent().build();
                const queryResult = await bg.vaultSecrets.secretQuerier.query(query);
                if (queryResult.secrets.length == 0) {
                    return null;
                }
                const secret = queryResult.secrets[0];
                return await accountDb.secretTypeTable.load(secret.type_id);
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        updateStandardTypeIds(systemTypes) {
            try {
                for (let secretType of systemTypes) {
                    switch (secretType.name) {
                        case "Payment Card":
                            zlocalStorage.save(LocalStorageKeys.PAYMENT_CARD_TYPE_ID, secretType.id);
                            break;
                        case "Address":
                            zlocalStorage.save(LocalStorageKeys.ADDRESS_TYPE_ID, secretType.id);
                            break;
                    }
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class BgSecretUtil {
        async suggestNewName(params) {
            try {
                const domain = params.url ? js.url.getParentDomain(params.url) : params.domain;
                if (!domain) {
                    return "";
                }
                const resp = await VaultApi.post("/api/rest/json/v1/ext/suggestnewname", "domain=" + domain);
                if (!vapi.isRespOk(resp)) {
                    return "";
                }
                return resp.operation.Details.name;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async checkExistingPasswordName(name) {
            try {
                const sameNameAllowed = await zlocalStorage.load(LocalStorageKeys.ALLOW_SAME_NAME, false);
                if (sameNameAllowed) {
                    return false;
                }
                const resp = (await vapi.getExistingSecretNames(name)).result;
                const passwordNames = resp.operation.Details;
                const exists = passwordNames.includes(name);
                return exists;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class BaseSecretAdd {
        p = null;
        getApiInputLogo(logo) {
            try {
                if (!logo) {
                    return logo;
                }
                const base64Index = logo.indexOf("base64,");
                const hasBase64SubString = base64Index >= 0;
                if (!hasBase64SubString) {
                    return logo;
                }
                const logoDataPart = logo.slice(base64Index + "base64,".length);
                return logoDataPart;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async getApiInputCustomColumn(customColumns, shared) {
            try {
                for (let column of customColumns) {
                    column.value = await bg$1.zcrypt.encrypt(column.value, shared);
                }
                const customColumnString = VaultCrypto.encodeBase64(JSON.stringify({ customcol: customColumns }));
                return customColumnString;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
    }

    class SecretUtil {
        static getLogoColor(createdOn, name) {
            try {
                const colors = ["e0732d", "594139", "759d47", "3988cc", "4296a5", "1e4c41", "4b34a3", "b04120", "22548f", "7c919c"];
                const index = (createdOn + name.length) % colors.length;
                const reqColor = "#" + colors[index];
                return reqColor;
            }
            catch (e) {
                logError(e);
                return "#e0732d";
            }
        }
        static getLogoStyleSrc(base64Logo) {
            try {
                const styleSrc = `url('${this.getLogoDataUrl(base64Logo)}')`;
                return styleSrc;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        static getFirst2Chars(s) {
            try {
                if (!s) {
                    return "";
                }
                const firstChar = s[0];
                let secondChar = "";
                const secondCharRegex = /[^ ]* +(.)/;
                let regExResult = secondCharRegex.exec(s);
                if (regExResult && regExResult[1]) {
                    secondChar = regExResult[1];
                }
                const first2Chars = (firstChar + secondChar).toUpperCase();
                return first2Chars;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        static getLogoDataUrl(base64Logo) {
            try {
                if (base64Logo.startsWith("data:")) {
                    return base64Logo;
                }
                let type = "png";
                try {
                    const decodedLogo = atob(base64Logo);
                    const isWebUISvg = decodedLogo.includes("</svg>");
                    if (isWebUISvg) {
                        type = "svg+xml";
                    }
                }
                catch (e) {
                    logError(e);
                }
                return `data:image/${type};charset=utf-8;base64,${base64Logo}`;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
    }

    class SecretEditUIInputGetter {
        async getInput(secret) {
            try {
                const hasValidLogo = Boolean(secret.logo || secret.domain_logo);
                const logo = hasValidLogo ? SecretUtil.getLogoDataUrl(secret.logo || secret.domain_logo) : "";
                const policyId = secret.policy_id || (await zlocalStorage.load(LocalStorageKeys.DEFAULT_POLICY_ID, ""));
                const totpUrl = secret.encrypted.totp ? (await bg$1.zcrypt.decrypt(secret.encrypted.totp, secret.shared)) : "";
                const notes = secret.encrypted.notes ? await bg$1.zcrypt.decrypt(secret.encrypted.notes, secret.shared) : "";
                const secretEditUIInput = {
                    secretId: secret.id,
                    typeId: secret.type_id,
                    name: secret.name,
                    logo,
                    policyId,
                    classification: secret.classification,
                    plainSecretData: await bg$1.zcrypt.decryptObject(secret.encrypted.fields, secret.shared),
                    notes,
                    totpUrl,
                    shared: secret.shared,
                    urls: secret.urls,
                    tags: secret.tags,
                    files: secret.encrypted.files,
                    description: secret.description,
                    customColumns: await this.getDecryptedCustomColumns(secret),
                    oneauthId: secret.oneauth_id,
                    owned: secret.owned
                };
                return secretEditUIInput;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async getDecryptedCustomColumns(secret) {
            try {
                const customColumns = secret.encrypted.custom_columns;
                const reqCustomColumns = [];
                let reqColumn = null;
                for (let curCustomColumn of customColumns) {
                    reqColumn = { ...curCustomColumn };
                    reqColumn.value = await bg$1.zcrypt.decrypt(reqColumn.value, secret.shared);
                    reqCustomColumns.push(reqColumn);
                }
                return reqCustomColumns;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
    }

    class SecretEditReEncryptApiInputGetter {
        p = null;
        constructor(p) {
            this.p = p;
        }
        async getEditInput(secretId) {
            try {
                const secret = await this.p.p.secretGetter.getServerSecret(secretId);
                const input = await new SecretEditUIInputGetter().getInput(secret);
                const editInput = {
                    secretId,
                    name: input.name,
                    logo: input.logo,
                    policyId: input.policyId,
                    classification: input.classification,
                    plainSecretData: input.plainSecretData,
                    totpUrl: input.totpUrl,
                    notes: input.notes,
                    urls: input.urls,
                    tags: input.tags,
                    deletedFiles: [],
                    description: input.description,
                    customColumns: input.customColumns,
                    oneauth_id: input.oneauthId,
                    reEncrypt: true,
                };
                return editInput;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async getReEncryptedApiOldValues(secret) {
            try {
                const allColumnHistory = [];
                let fieldHistory = null;
                for (let fieldHistoryKey in secret.oldValues) {
                    fieldHistory = secret.oldValues[fieldHistoryKey];
                    allColumnHistory.push({
                        COLUMNNAME: fieldHistoryKey,
                        SECRET_AUTO_ID: secret.id,
                        SECRETHISTORY_AUTO_ID: fieldHistory.id,
                        OLDVALUE: await this.getReEncryptedApiOldValuesForField(fieldHistory)
                    });
                }
                return allColumnHistory;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async getReEncryptedApiOldValuesForField(fieldHistory) {
            try {
                const reqOldValues = [];
                let oldValue = "";
                let encryptedValue = "";
                for (let historyEntry of fieldHistory.values) {
                    oldValue = await bg$1.zcrypt.decrypt(historyEntry.oldValue, false);
                    encryptedValue = await bg$1.zcrypt.encrypt(oldValue, true);
                    reqOldValues.push({
                        oldvalue: encryptedValue,
                        timestamp: historyEntry.timestamp
                    });
                }
                return JSON.stringify(reqOldValues);
            }
            catch (e) {
                throw jserror(e);
            }
        }
    }

    class SecretUpdateHelper {
        p = null;
        constructor(p) {
            this.p = p;
        }
        async update(input) {
            try {
                const secret = await this.p.p.secretGetter.getSecret(input.secretId);
                const shared = input.reEncrypt ? true : secret.shared;
                const apiInput = await this.getApiInput(input, secret, shared);
                const resp = (await vapi.secret.update(apiInput)).result;
                if (resp.operation.result.status != "Success") {
                    const errorMsg = resp.operation.result.message || "Error occured!";
                    throw errorMsg.replace("secret", "password");
                }
                const respSecret = resp.operation.Details;
                const editedSecret = await this.p.p.addVApiSecretResponse(respSecret);
                passwordAssessment.assessPassword(editedSecret);
                bgEventServer.secret.changed(secret.id);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async getApiInput(input, secret, shared) {
            try {
                const initialInput = await new SecretEditUIInputGetter().getInput(secret);
                const oldValues = input.reEncrypt ? null : await this.getOldValues(initialInput, input);
                const includeTotp = (initialInput.totpUrl != input.totpUrl) || input.reEncrypt;
                const apiInput = {
                    secretname: input.name,
                    encsecretname: await bg$1.zcrypt.encrypt(input.name, shared),
                    encdescription: await bg$1.zcrypt.encrypt(input.description, shared),
                    encryptedurls: await Promise.all(input.urls.map(url => bg$1.zcrypt.encrypt(url, shared))),
                    encryptedtags: await bg$1.zcrypt.encrypt(input.tags.join(","), shared),
                    secret_auto_id: input.secretId,
                    logo: this.p.getApiInputLogo(input.logo),
                    secrettypeid: secret.type_id,
                    policyid: input.policyId,
                    classification: input.classification,
                    isshared: shared ? Secret.IS_SHARED.YES : Secret.IS_SHARED.NO,
                    passwordmodified: Boolean(oldValues),
                    secretdata: await bg$1.zcrypt.encryptObject(input.plainSecretData, shared),
                    securenote: await bg$1.zcrypt.encrypt(input.notes, shared),
                    customcolumnnew: await this.p.getApiInputCustomColumn(input.customColumns, shared),
                    oneauth_id: input.oneauth_id
                };
                if (input?.files?.length) {
                    apiInput.files = input.files;
                }
                if (input?.deletedFiles?.length) {
                    apiInput.deletedFiles = input.deletedFiles;
                }
                if (oldValues) {
                    apiInput.oldvalues = await bg$1.zcrypt.encryptObject(oldValues, shared);
                }
                if (input.reEncrypt && secret.oldValues && js.obj.isNonEmpty(secret.oldValues)) {
                    apiInput.old_values = await this.p.reEncryptApiHelper.getReEncryptedApiOldValues(secret);
                }
                if (includeTotp) {
                    apiInput.totp = await bg$1.zcrypt.encrypt(input.totpUrl, shared);
                }
                return apiInput;
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
        async getOldValues(existingInput, editedInput) {
            try {
                const typeId = existingInput.typeId;
                const secretType = await accountDb.secretTypeTable.load(typeId);
                const reqFieldNames = js.array.concat(secretType.text_fields.map(x => x.name), secretType.password_fields.map(x => x.name));
                const oldValues = {};
                const initialPlainSecretData = existingInput.plainSecretData;
                const finalPlainSecretData = editedInput.plainSecretData;
                let isModified = false;
                for (let fieldName of reqFieldNames) {
                    isModified = initialPlainSecretData[fieldName] != finalPlainSecretData[fieldName];
                    if (isModified && initialPlainSecretData[fieldName]) {
                        oldValues[fieldName] = initialPlainSecretData[fieldName] || "";
                    }
                }
                if (js.obj.isEmpty(oldValues)) {
                    return null;
                }
                return oldValues;
            }
            catch (e) {
                throw jserror(e);
            }
        }
    }

    class SecretEdit extends BaseSecretAdd {
        reEncryptApiHelper = new SecretEditReEncryptApiInputGetter(this);
        updateHelper = new SecretUpdateHelper(this);
        async getEditUIInput(secretId) {
            try {
                const secret = await this.p.secretGetter.getServerSecret(secretId);
                const hasNoEditPermission = !Secret.hasEditPermission(secret.sharing_level);
                if (hasNoEditPermission) {
                    throw "No edit permission";
                }
                const editUIInput = await new SecretEditUIInputGetter().getInput(secret);
                return editUIInput;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async updatePassword(input) {
            try {
                await this.updateHelper.update(input);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async reEncryptSecretForSharing(secretId) {
            try {
                const secret = await bg$1.vaultSecrets.secretGetter.getSecret(secretId);
                const noReEncryption = secret.shared;
                if (noReEncryption) {
                    return;
                }
                const reEncryptFiles = secret.encrypted.files.length > 0;
                if (reEncryptFiles) {
                    await this.reEncryptFiles(secretId);
                }
                const editInput = await this.reEncryptApiHelper.getEditInput(secretId);
                await this.updatePassword(editInput);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async reEncryptFiles(secretId) {
            try {
                const files = await bg$1.vaultSecrets.secretFiles.downloadAllFiles(secretId);
                const reqFiles = [];
                let fileData = "";
                let encryptedFileData = "";
                for (let curFile of files) {
                    fileData = await bg$1.zcrypt.fileDecrypt(curFile.data, false);
                    encryptedFileData = await bg$1.zcrypt.fileEncrypt(fileData, true);
                    reqFiles.push({
                        name: curFile.name,
                        column: curFile.column,
                        data: encryptedFileData,
                        fileId: curFile.fileId,
                        size: curFile.size
                    });
                }
                await bg$1.vaultSecrets.secretFiles.updateFiles(secretId, reqFiles);
            }
            catch (e) {
                throw "cannot reencrypt files";
            }
        }
    }

    const SERVER_AUTO_APPROVE_STATUS = {
        DISABLED: -1,
        WEEKDAYS: 0,
        WEEKENDS: 1,
        TIME: 2,
        HELPDESK: 3
    };
    class SecretAccessControl {
        p = null;
        async disable(secretId) {
            try {
                await vapi.secret.setProperty(secretId, { accesssctrlconfigured: false });
                const secret = await bg$1.vaultSecrets.secretGetter.getSecret(secretId);
                secret.access_controlled = false;
                secret.display_access_control_icon = false;
                await accountDb.secretTable.put(secret);
                bgEventServer.secret.changed(secretId);
            }
            catch (e) {
                logError(e);
            }
        }
        async updateAccessControl(input) {
            try {
                const reqInput = {
                    secretids: [input.secretId],
                    admins: input.admins,
                    users: input.excludeUsers,
                    dual_approval: input.dualApproval,
                    request_timeout: input.requestTimeout + "",
                    checkout_timeout: input.accessTimeMinutes + "",
                    auto_approve: input.autoApprove
                };
                if (input.autoApprove) {
                    this.fillAutoApproveInfo(reqInput, input);
                }
                const INPUT_DATA = JSON.stringify(reqInput);
                const reqString = "INPUT_DATA=" + encodeURIComponent(INPUT_DATA);
                await VaultApi.postChecked("/api/rest/json/v1/accesscontrol/settings", reqString);
                const secret = await this.p.secretGetter.getServerSecret(input.secretId);
                bgEventServer.secret.changed(secret.id);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        fillAutoApproveInfo(apiInput, input) {
            try {
                const autoApproveInfo = input.autoApproveInfo;
                if (autoApproveInfo.byTicket) {
                    apiInput.help_desk_ticket = true;
                    return;
                }
                if (autoApproveInfo.weekDays) {
                    apiInput.auto_approve_on_weekdays = true;
                    return;
                }
                if (autoApproveInfo.weekEnds) {
                    apiInput.auto_approve_on_weekends = true;
                    return;
                }
                if (autoApproveInfo.timeRange) {
                    const timeRange = autoApproveInfo.timeRange;
                    apiInput.from_hrs = timeRange.from.hours + "";
                    apiInput.from_mins = timeRange.from.minutes + "";
                    apiInput.to_hrs = timeRange.to.hours + "";
                    apiInput.to_mins = timeRange.to.minutes + "";
                    return;
                }
                throw "INVALID_STATE";
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async getSecretAccessControlSettings(secretId) {
            try {
                const resp = await VaultApi.getChecked("/api/rest/json/v1/accesscontrol/settings/" + secretId);
                const settings = resp.operation.Details;
                const admins = this.mapApiRespUserObj(settings.admins);
                const excludeUsers = this.mapApiRespUserObj(settings.exclude_users);
                const reqInput = {
                    secretId,
                    admins,
                    excludeUsers,
                    dualApproval: settings.dual_approval,
                    requestTimeout: settings.request_timeout,
                    accessTimeMinutes: settings.checkout_timeout,
                    autoApprove: settings.auto_approve != SERVER_AUTO_APPROVE_STATUS.DISABLED,
                    autoApproveInfo: null
                };
                if (reqInput.autoApprove) {
                    reqInput.autoApproveInfo = this.getRespAutoApproveInfo(settings);
                }
                return reqInput;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        getRespAutoApproveInfo(respSetting) {
            try {
                const reqInfo = new SecretAccessControlAutoApproveInfo();
                switch (respSetting.auto_approve) {
                    case SERVER_AUTO_APPROVE_STATUS.WEEKDAYS:
                        reqInfo.weekDays = true;
                        break;
                    case SERVER_AUTO_APPROVE_STATUS.WEEKENDS:
                        reqInfo.weekEnds = true;
                        break;
                    case SERVER_AUTO_APPROVE_STATUS.HELPDESK:
                        reqInfo.byTicket = true;
                        break;
                    case SERVER_AUTO_APPROVE_STATUS.TIME:
                        reqInfo.timeRange = this.getRespTimeRange(respSetting);
                        break;
                    default: throw "INVALID_STATE";
                }
                return reqInfo;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        getRespTimeRange(respSetting) {
            try {
                const range = new SecretAccessControlTimeRange();
                const [from_hours, from_mins] = respSetting.from_time.split(":");
                const [to_hours, to_mins] = respSetting.to_time.split(":");
                range.from.hours = parseInt(from_hours);
                range.from.minutes = parseInt(from_mins);
                range.to.hours = parseInt(to_hours);
                range.to.minutes = parseInt(to_mins);
                return range;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        mapApiRespUserObj(respUserObj) {
            try {
                const users = [];
                let user = null;
                for (let key in respUserObj) {
                    user = this.mapApiRespUser(respUserObj[key]);
                    user.userAutoId = key;
                    users.push(user);
                }
                return users;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        mapApiRespUser(respUser) {
            try {
                const user = {
                    userAutoId: respUser.user_auto_id,
                    name: respUser.username,
                    email: respUser.email,
                    zuid: respUser.zuid
                };
                return user;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async createAccessRequest(input) {
            try {
                const apiInput = {
                    reason: input.reason,
                    requestlater: input.requestAdvance
                };
                if (input.requestAdvance) {
                    const date = new Date(input.date);
                    apiInput.futureTime = {
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear(),
                        hour: input.hour,
                        min: input.minutes
                    };
                }
                if (input.ticketId) {
                    apiInput.ticketid = input.ticketId;
                }
                const requestBody = "INPUT_DATA=" + encodeURIComponent(JSON.stringify(apiInput));
                await VaultApi.putChecked("/api/rest/json/v1/accesscontrol/requestaccess/" + input.secretId, requestBody);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async getPendingAccessRequestUIInfo(accessRequstId) {
            try {
                const resp = await VaultApi.getChecked("/api/rest/json/v1/accesscontrol/request/" + accessRequstId);
                const details = resp.operation.Details;
                const isAdvanceRequest = details.requestlater;
                const accessRequiredOn = isAdvanceRequest ? js.date.formatDateMonDYYYYHHMMAM(parseInt(details.futuretime)) : "";
                const hasValidApprovals = details.approvals && (details.approvals.length > 0);
                const approvals = hasValidApprovals ? details.approvals.map(x => this.getAccessApprovalInfo(x)) : [];
                const uiInfo = {
                    secretId: details.secret_auto_id,
                    requestId: details.request_auto_id,
                    requestedOn: js.date.formatDateMonDYYYYHHMMAM(parseInt(details.timestamp)),
                    accessRequiredOn,
                    status: details.status_string,
                    reason: details.reason,
                    approvals,
                    helpdeskError: this.getHelpDeskErrorInfo(resp),
                };
                return uiInfo;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        getHelpDeskErrorInfo(resp) {
            try {
                const details = resp.operation.Details;
                if (!details.ticketid) {
                    return null;
                }
                const helpdeskError = {
                    ticketId: details.ticketid,
                    status: details.helpdesk_status_message,
                    errorMessage: details.helpdesk_reason,
                };
                return helpdeskError;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getAccessApprovalInfo(respInfo) {
            try {
                const info = {
                    status: respInfo.status == Secret.ACCESS_CTRL_STATUS.APPROVED ? "Approved" : (respInfo.status) + "",
                    adminName: respInfo.username,
                    comment: respInfo.reason
                };
                return info;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async cancelAccessRequest(accessRequstId) {
            try {
                await VaultApi.putChecked("/api/rest/json/v1/accesscontrol/cancel/" + accessRequstId, "");
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async checkoutSecret(accessRequstId, secretId) {
            try {
                await VaultApi.putChecked("/api/rest/json/v1/accesscontrol/checkout/" + accessRequstId, "");
                await this.p.secretGetter.getServerSecret(secretId);
                bgEventServer.secret.changed(secretId);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async checkinSecret(secretId) {
            try {
                await VaultApi.putChecked("/api/rest/json/v1/accesscontrol/checkin/" + secretId, "");
                await this.p.secretGetter.getServerSecret(secretId);
                bgEventServer.secret.changed(secretId);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async isHelpdeskEnabled(secretId) {
            try {
                return await vapi.secret.accessControl.isHelpdeskEnabled(secretId);
            }
            catch (e) {
                logError(e);
                throw ["UNABLE_TO_CHECK_HELPDESK_ENABLE_STATUS", secretId, e];
            }
        }
    }

    class SecretAdd extends BaseSecretAdd {
        async addSecret(input) {
            try {
                const apiInput = await this.getApiInput(input);
                const resp = (await vapi.secret.add(apiInput)).result;
                if (!vapi.isRespOk(resp)) {
                    const errorMsg = resp.operation.result.message || "Error occured!";
                    throw errorMsg.replace("secret", "password");
                }
                if (input.newFolderName || input.folderId) {
                    await bg$1.vaultFolders.sync();
                }
                const respSecret = resp.operation.Details;
                const secret = await this.p.addVApiSecretResponse(respSecret);
                bgEventServer.secret.added(secret.id);
                if (input.folderId) {
                    await accountDb.folderSecretMapTable.addSecret(input.folderId, secret.id);
                }
                passwordAssessment.assessPassword(secret);
                return secret;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async getApiInput(input) {
            try {
                const shared = await bg$1.zcrypt.getIsShared(input.classification);
                const apiInput = {
                    secretname: input.name,
                    encsecretname: await bg$1.zcrypt.encrypt(input.name, shared),
                    encdescription: await bg$1.zcrypt.encrypt(input.description, shared),
                    encryptedurls: await Promise.all(input.urls.map(url => bg$1.zcrypt.encrypt(url, shared))),
                    encryptedtags: await bg$1.zcrypt.encrypt(input.tags.join(","), shared),
                    secrettypeid: input.typeId,
                    logo: this.getApiInputLogo(input.logo),
                    policyid: input.policyId,
                    classification: input.classification,
                    isshared: shared ? Secret.IS_SHARED.YES : Secret.IS_SHARED.NO,
                    secretdata: await bg$1.zcrypt.encryptObject(input.plainSecretData, shared),
                    securenote: await bg$1.zcrypt.encrypt(input.notes, shared),
                    customcolumnnew: await this.getApiInputCustomColumn(input.customColumns, shared),
                };
                if (input.files.length > 0) {
                    apiInput.files = input.files;
                }
                this.setFolder(apiInput, input);
                if (input.totpUrl) {
                    apiInput.totp = await bg$1.zcrypt.encrypt(input.totpUrl, shared);
                }
                if (input.oneauth_id) {
                    apiInput.oneauth_id = input.oneauth_id;
                }
                return apiInput;
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
        setFolder(apiInput, input) {
            try {
                if (input.folderId) {
                    apiInput.chamberid = input.folderId;
                    return;
                }
                if (input.newFolderName) {
                    apiInput.foldername = input.newFolderName;
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class SecretCopier {
        p;
        async copyTotp(secretId) {
            try {
                const totp = await this.p.getTotp(secretId);
                await bg$1.clipboard.copy(totp);
                bg$1.vaultAudit.totpCopied(secretId);
                accountDb.recentSecretTable.update(secretId);
            }
            catch (e) {
                logError(e);
            }
        }
        async copyField(secretId, field_name) {
            try {
                const secret = await this.p.secretGetter.getSecret(secretId);
                const field_val_encrypted = secret.encrypted.fields[field_name];
                const field_val = await bg$1.zcrypt.decrypt(field_val_encrypted, secret.shared);
                await bg$1.clipboard.copy(field_val);
                bg$1.vaultAudit.fieldCopied(secret.id, field_name);
                accountDb.recentSecretTable.update(secretId);
            }
            catch (e) {
                logError(e);
            }
        }
        async copyCustomField(secretId, column_id) {
            try {
                const secret = await this.p.secretGetter.getSecret(secretId);
                const column = secret.encrypted.custom_columns.find(x => x.id == column_id);
                const value = await bg$1.zcrypt.decrypt(column.value, secret.shared);
                await bg$1.clipboard.copy(value);
                bg$1.vaultAudit.customColumnCopied(secretId, column_id);
                accountDb.recentSecretTable.update(secretId);
            }
            catch (e) {
                logError(e);
            }
        }
        async copyOneauthTotp(secretId, totp) {
            try {
                await bg$1.clipboard.copy(totp);
                bg$1.vaultAudit.totpCopied(secretId);
                accountDb.recentSecretTable.update(secretId);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    const SESSION_AES_KEY = "SESSION_AES_KEY";
    class SecretDataHandler {
        sessionAesKey = null;
        async encodeSecretData(secrets) {
            try {
                await this.initKey();
                const MAX_COUNT = 250;
                const delayCounter = js.loop.createCyclicCounter(MAX_COUNT, 0.1);
                for (let secret of secrets) {
                    if (secret.owned || !secret.encrypted) {
                        continue;
                    }
                    secret.sessionEncryptedData = await this.encrypt(JSON.stringify(secret.encrypted));
                    secret.encrypted = null;
                    await delayCounter.next();
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async decodeSecretData(secrets) {
            try {
                await this.restoreKey();
                if (!this.sessionAesKey) {
                    return;
                }
                const MAX_COUNT = 250;
                const delayCounter = js.loop.createCyclicCounter(MAX_COUNT, 0.1);
                for (let secret of secrets) {
                    if (secret.owned || !secret.sessionEncryptedData) {
                        continue;
                    }
                    secret.encrypted = JSON.parse(await this.decrypt(secret.sessionEncryptedData));
                    await delayCounter.next();
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async restoreKey() {
            if (this.sessionAesKey) {
                return;
            }
            const exportedKey = await zsessionStorage.load(SESSION_AES_KEY);
            if (!exportedKey) {
                return;
            }
            this.sessionAesKey = (await js.crypto.aes.importKey(exportedKey)).result;
        }
        async initKey() {
            await this.restoreKey();
            if (this.sessionAesKey) {
                return;
            }
            this.sessionAesKey = (await js.crypto.aes.generateKey()).result;
            const exportedKey = (await js.crypto.aes.exportKey(this.sessionAesKey)).result;
            await zsessionStorage.save(SESSION_AES_KEY, exportedKey);
        }
        async encrypt(plaintext) {
            return js.crypto.aes.encrypt(plaintext, this.sessionAesKey);
        }
        async decrypt(encrypted) {
            try {
                if (!this.sessionAesKey) {
                    return null;
                }
                return js.crypto.aes.decrypt(encrypted, this.sessionAesKey);
            }
            catch (e) {
                return null;
            }
        }
    }

    class SecretFiles {
        async downloadFile(secretId, file_id) {
            const input = {
                OPERATION_NAME: "GET_SECRET_FILES",
                secretId: secretId,
                fileId: file_id
            };
            const resp = await VaultApi.postChecked("/api/json/secrets", input);
            const resp_file_info = JSON.parse(resp.operation.details.FILEDATA)[0];
            return resp_file_info;
        }
        async downloadAllFiles(secretId) {
            try {
                const resp = (await vapi.getAllFiles(secretId)).result;
                const respFiles = Array.isArray(resp.operation.Details) ? resp.operation.Details : [];
                for (let file of respFiles) {
                    file.shared = file.isShared == Secret.IS_SHARED.YES;
                }
                return respFiles;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async updateFiles(secretId, files) {
            try {
                const apiInputFiles = [];
                for (let curFile of files) {
                    apiInputFiles.push({
                        name: curFile.name,
                        secretID: secretId,
                        column: curFile.column,
                        data: curFile.data,
                        fileId: curFile.fileId,
                        size: curFile.size
                    });
                }
                const apiBody = "FILEDATA=" + encodeURIComponent(JSON.stringify(files));
                await VaultApi.putChecked("/api/rest/json/v1/secrets/sharing/updatefile/" + secretId, apiBody);
            }
            catch (e) {
                throw jserror(e);
            }
        }
    }

    class SecretGetter {
        p = null;
        lastGotTrashedSecret = null;
        async getSecret(secretId) {
            try {
                const secret = await accountDb.secretTable.get(secretId);
                const hasValidLocalSecret = secret && Boolean(secret.encrypted) &&
                    (!secret.shared || (!secret.access_controlled && (secret.fetchedOn + this.p.secretParser.PLUS_VALID_MINS_MS > Date.now())));
                if (hasValidLocalSecret) {
                    return secret;
                }
                const serverSecret = await this.getServerSecret(secretId);
                return serverSecret;
            }
            finally {
            }
        }
        async getServerSecret(secretId) {
            try {
                if (!navigator.onLine) {
                    throw "offline";
                }
                const secret = await accountDb.secretTable.get(secretId);
                const accessControlled = secret && (!secret.owned && secret.access_controlled);
                if (accessControlled) {
                    return this.getAccessControlledSecret(secretId);
                }
                const resp = (await vapi.secret.get(secretId)).result;
                if (resp.operation.result.status.toLowerCase() != VaultApi.SUCCESS) {
                    await this.p.removeLocalSecret(secretId);
                    throw jserror(resp.operation.result.message);
                }
                const reqSecret = await this.p.addVApiSecretResponse(resp.operation.Details);
                return reqSecret;
            }
            finally {
            }
        }
        async getTrashedSecret(secretId) {
            try {
                if (!navigator.onLine) {
                    throw "offline";
                }
                const resp = (await vapi.secret.get(secretId)).result;
                if (resp.operation.result.status.toLowerCase() != VaultApi.SUCCESS) {
                    throw jserror(resp.operation.result.message);
                }
                const secret = this.lastGotTrashedSecret = await this.p.parseVApiSecretResponse(resp.operation.Details);
                return secret;
            }
            finally {
            }
        }
        async getDbSecret(secretId) {
            try {
                const secret = await accountDb.secretTable.get(secretId);
                if (!secret) {
                    throw "cannot get db secret";
                }
                return secret;
            }
            finally {
            }
        }
        async getDbOrTrashedSecret(secretId) {
            try {
                const secret = await accountDb.secretTable.get(secretId);
                if (secret) {
                    return secret;
                }
                if (this.lastGotTrashedSecret && this.lastGotTrashedSecret.id == secretId) {
                    return this.lastGotTrashedSecret;
                }
                return this.getTrashedSecret(secretId);
            }
            finally {
            }
        }
        async getSecretFromWeb(secretId) {
            try {
                const secret = await this.refreshSecret(secretId);
                const needVaultSync = secret.shared && !(await bg$1.zcrypt.checkHasOrgKey());
                if (!needVaultSync) {
                    return;
                }
                bg$1.vaultSync.sync(false);
            }
            catch (e) {
                logError(e);
            }
        }
        async getAccessControlledSecret(secret_id) {
            try {
                const resp = await VaultApi.postChecked("/api/json/secrets?OPERATION_NAME=GET_SECRET_DETAILS&SECRET_AUTO_ID=" + secret_id);
                const resp_secret = JSON.parse(resp.operation.details.SECRETS);
                const secret = await this.p.addVApiSecretResponse(resp_secret);
                return secret;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async refreshSecret(secretId) {
            try {
                const resp = (await vapi.secret.get(secretId)).result;
                if (resp.operation.result.status.toLowerCase() != VaultApi.SUCCESS) {
                    await this.p.removeLocalSecret(secretId);
                    throw resp.operation.result.message;
                }
                const secret = await this.p.addVApiSecretResponse(resp.operation.Details);
                return secret;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }

    class LoginTabGetter {
        p;
        constructor(p) {
            this.p = p;
        }
        async getLoginTab(input, loginData) {
            try {
                const loginTab = await this.getLoginTabFn(input, loginData);
                if (!loginTab) {
                    return null;
                }
                const completedTab = await brApi.tab.getCompletedTab(loginTab.id);
                return completedTab;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async getLoginTabFn(input, loginData) {
            try {
                const inputTab = input.tabId ? await brApi.tab.getTab(input.tabId) : null;
                const { url, incognito } = input;
                const curTab = (inputTab || await brApi.tab.getActiveTab());
                if (!curTab) {
                    return brApi.tab.createTab({ url, incognito });
                }
                if (incognito && curTab.incognito == false) {
                    return brApi.tab.createTab({ url, incognito });
                }
                if (this.isNewTab(curTab)) {
                    const updatedTab = await brApi.tab.updateTab(curTab.id, { url });
                    return updatedTab;
                }
                const domainMatchingTab = js.url.getParentDomain(curTab.url) == js.url.getParentDomain(url);
                const useCurrentTab = domainMatchingTab && await this.hasValidLoginField(curTab, loginData);
                const useNewTab = !useCurrentTab;
                if (useNewTab) {
                    return brApi.tab.createTab({ url, incognito });
                }
                const oneClickLoginOk = await this.isOneClickLoginCheckOk(curTab, loginData);
                if (!oneClickLoginOk) {
                    bg.csUtil.showAlert(curTab.id, { message: i18n(VI18N.DEV_TOOLS_NEWTAB_LOGIN) });
                    return null;
                }
                return curTab;
            }
            catch (e) {
                logError(e);
                return brApi.tab.create(input.url);
            }
        }
        async isOneClickLoginCheckOk(curTab, loginData) {
            try {
                if (Secret.hasViewPermission(loginData.shareLevel)) {
                    return true;
                }
                return await devToolsHandler.isValidTab(curTab.id);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        isNewTab(tab) {
            try {
                const url = tab.url;
                if (!url) {
                    return true;
                }
                if (url.startsWith("http")) {
                    return false;
                }
                if (url.includes("newtab")) {
                    return true;
                }
                if (url == this.p.loadingTabUrl) {
                    return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async hasValidLoginField(inputTab, loginData) {
            try {
                const tabResult = await this.getConnectableTab(inputTab);
                if (!tabResult.ok) {
                    return false;
                }
                const tab = tabResult.result;
                const frames = await this.getValidLoginFrames(tab.id, loginData);
                const respPromiseList = frames.map(x => csApi.login.hasValidLoginField({ tabId: tab.id, frameId: x.frameId }));
                for (let resp of respPromiseList) {
                    if (await resp) {
                        return true;
                    }
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async getValidLoginFrames(tabId, loginData) {
            try {
                const frames = await brApi.tab.getFrames(tabId);
                const validFrames = frames.filter(x => this.isValidFrame(x, loginData));
                return validFrames;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        isValidFrame(frame, loginData) {
            try {
                if (!frame.url) {
                    return false;
                }
                const parentDomain = js.url.getParentDomain(frame.url);
                return loginData.allowedDomains.includes(parentDomain);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async getConnectableTab(tab) {
            try {
                const isConnectable = await csApi.isConnectable({ tabId: tab.id });
                if (isConnectable) {
                    return fnOut.result(tab);
                }
                const completedTab = await brApi.tab.getCompletedTab(tab.id);
                const isConnectableNow = await csApi.isConnectable({ tabId: tab.id });
                if (isConnectableNow) {
                    return fnOut.result(completedTab);
                }
                return fnOut.NONE;
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
    }

    const ZVaultUtil = {
        cardPattern: {
            number: new RegExp(/.*(card|cc|acct|account).?(number|no|num)|card.?#|card.?no|cc.?num|acct.?num|nummer|credito|numero|número|numéro|カード番号|Номер.*карты|信用卡号|信用卡号码|信用卡卡號|카드/, 'i'),
            name: new RegExp(/.*(card|account|cc).?(holder|name|owner)|name.*\\bon\\b.*card|cc.?name|cc.?full.?name|owner|karteninhaber|nombre.*tarjeta|nom.*carte|nome.*cart|名前|Имя.*карты|信用卡开户名|开户名|持卡人姓名|持卡人姓名/, 'i'),
            month: new RegExp(/.*(cc|card|account|acc|exp.*).?(month|mon|mm)|month/, 'i'),
            year: new RegExp(/.*(cc|card|account|acc|exp.*).?(year|yyyy|yy)|year/, 'i'),
            cvvOrcid: new RegExp(/verification|card identification|security code|cvn|cvv|cvc|csc/, 'i'),
            label: new RegExp(/.*(card|account|cc).?(label|alias)/, 'i'),
            expiryCommon: new RegExp(/.*(expir|exp.*date|gueltig|gültig|fecha|date.*exp|scadenza|有効期限|validade|Срок действия карты)/, 'i'),
            cancelButton: new RegExp(/.*(cancel|later|skip|not.?now|back)/, 'i')
        },
        category: {
            card: "Payment Card"
        },
        isHostNameMatched: function (secretUrl, frameUrl) {
            try {
                if (!js.url.isAllValid(secretUrl, frameUrl)) {
                    return false;
                }
                return js.url.getHostName(secretUrl) == js.url.getHostName(frameUrl);
            }
            catch (e) {
                logError(e);
                return false;
            }
        },
        isParentDomainMatched: function (secretUrl, frameUrl) {
            try {
                if (!js.url.isAllValid(secretUrl, frameUrl)) {
                    return false;
                }
                return js.url.getParentDomain(secretUrl) == js.url.getParentDomain(frameUrl);
            }
            catch (e) {
                logError(e);
                return false;
            }
        },
        isValid: function (data) {
            return typeof data !== "undefined" && data !== null;
        },
        sendMessage: function (tabId, action, data = undefined, callBack) {
            data = (typeof data !== "undefined") ? data : {};
            callBack = (typeof callBack !== "undefined") ? callBack : function () {
                chrome.runtime.lastError;
            };
            if (typeof tabId !== "undefined" && tabId !== null && tabId !== -1) {
                chrome.tabs.sendMessage(tabId, {
                    "action": action,
                    "data": data,
                    popup: false
                }, callBack);
                return;
            }
            chrome.runtime.sendMessage({
                "action": action,
                "data": data,
                popup: true
            }, callBack);
        },
        extractCardMonth(validThru) {
            if (validThru == "") {
                return 0;
            }
            validThru = validThru.split("/");
            return validThru.length > 0 ? ZVaultUtil.getValidMonth(validThru[0]) : 0;
        },
        extractCardYear(validThru) {
            if (validThru == "") {
                return 0;
            }
            validThru = validThru.split("/");
            return validThru.length > 1 ? ZVaultUtil.getValidYear(validThru[1]) : 0;
        },
        getValidMonth(num) {
            if (isNaN(num)) {
                return 0;
            }
            num = parseInt(num);
            if (num > 0 && num <= 12) {
                return num < 10 ? "0" + num : num;
            }
            return 0;
        },
        getValidYear(num) {
            if (isNaN(num)) {
                return 0;
            }
            if (num <= 0) {
                return 0;
            }
            num = num.toString().trim();
            if (num.length == 2) {
                return "20" + num;
            }
            if (num.length == 4 && num[0] == "2") {
                return num;
            }
            return 0;
        },
        getValidThru(month, year) {
            month = ZVaultUtil.getValidMonth(month);
            month = month == 0 ? "mm" : month;
            year = ZVaultUtil.getValidYear(year);
            year = year == 0 ? "yyyy" : year;
            if (month == "mm" && year == "yyyy") {
                return "";
            }
            return month + " / " + year;
        },
        formatValidThru(validThru) {
            var month = ZVaultUtil.extractCardMonth(validThru);
            var year = ZVaultUtil.extractCardYear(validThru);
            return ZVaultUtil.getValidThru(month, year);
        },
        secretDomainMatches: (savedUrls, topUrl) => {
            for (let url of savedUrls) {
                if (ZVaultUtil.isParentDomainMatched(url, topUrl)) {
                    return true;
                }
            }
            return false;
        },
        async domainMatchedForPlayback(savedUrls) {
            return ZVaultUtil.secretDomainMatches(savedUrls, window.location.href);
        }
    };

    class SecretRecording {
        memory = bgStorage.createTabStorage(TAB_STORAGE_PREFIX.LOGIN);
        init() {
            this.memory.init();
        }
        async getRecording(url) {
            try {
                const domain = js.url.getHostName(url);
                const dbRecording = await accountDb.recordingTable.load(domain);
                if (dbRecording) {
                    return dbRecording;
                }
                const recording = await this.getRecordingFromServer(domain);
                await accountDb.recordingTable.save(domain, recording);
                return recording;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async login(loginData, steps, tab, url) {
            try {
                const secret = await bg$1.vaultSecrets.secretGetter.getSecret(loginData.secretId);
                const secret_data = secret.encrypted.fields;
                const is_shared = secret.shared;
                const ans_secret_data = {};
                for (let x in secret_data) {
                    ans_secret_data[x] = await bg$1.zcrypt.decrypt(secret_data[x], is_shared);
                }
                const secret_type = await accountDb.secretTypeTable.load(secret.type_id);
                const hasViewPermission = Secret.hasViewPermission(loginData.shareLevel);
                const parsedSteps = JSON.parse(steps);
                const infoUrl = parsedSteps[0].url || url;
                const page_info = {
                    secretId: loginData.secretId,
                    secretdata: ans_secret_data,
                    fields: secret_type.fields,
                    secretUrl: infoUrl,
                    urls: secret.urls,
                    accessControl: secret.access_controlled,
                    submit: false,
                    insecure_page_prompt: await zlocalStorage.load(LocalStorageKeys.INSECURE_PAGE_PROMPT, true),
                    has_totp: secret.has_totp,
                    has_view_permission: hasViewPermission,
                    one_click_login: !hasViewPermission,
                    step_no: 0,
                    steps,
                    total_steps: parsedSteps.length,
                    tab: tab.id,
                    countdown: 0,
                    filledData: {
                        text: 0,
                        password: 0
                    },
                    oneauthId: secret.oneauth_id
                };
                const tabData = {
                    playback: true,
                    reloading: false,
                    data: page_info
                };
                await this.setPlaybackData(tab.id, tabData);
                ZVaultUtil.sendMessage(tab.id, "startPlayback", page_info);
            }
            catch (e) {
                logError(e);
            }
        }
        async setPlaybackData(tabId, playbackData) {
            try {
                await this.memory.save(tabId, TabStorageKeys.PLAYBACK_DATA, playbackData);
            }
            catch (e) {
                logError(e);
            }
        }
        async removePlaybackData(tabId) {
            try {
                await this.memory.remove(tabId, TabStorageKeys.PLAYBACK_DATA);
            }
            catch (e) {
                logError(e);
            }
        }
        async getPlaybackData(tabId) {
            try {
                const existing = await this.memory.load(tabId, TabStorageKeys.PLAYBACK_DATA, null);
                return existing;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async updatePlaybackInnerData(tabId, data) {
            try {
                const existing = await this.getPlaybackData(tabId);
                existing.data = data;
                bg$1.vaultSecrets.secretLogin.recording.setPlaybackData(tabId, existing);
            }
            catch (e) {
                logError(e);
            }
        }
        async getRecordingFromServer(domain) {
            try {
                const resp = (await vapi.getRecording(domain)).result;
                if (!vapi.isRespOk(resp)) {
                    return null;
                }
                if (resp.operation.Details && !resp.operation.Details.recording) {
                    return null;
                }
                const stepsString = resp.operation.Details.recording.steps || js.obj.getFirstProperty(resp.operation.details).steps;
                JSON.parse(stepsString);
                return stepsString;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async isInLogin(tabId) {
            try {
                const loginData = await bgStorage.tab.load(tabId, TabStorageKeys.LOGIN_DATA, null);
                if (loginData) {
                    return true;
                }
                const playBackData = await this.memory.load(tabId, TabStorageKeys.PLAYBACK_DATA, null);
                if (playBackData) {
                    return true;
                }
                return false;
            }
            catch (e) {
                throw jserror(e);
            }
        }
    }

    class SecretLogin {
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
                    bg$1.ztabHandler.getSecretAccess(secretId);
                    return;
                }
                const recordingPromise = this.recording.getRecording(url);
                const loginData = await this.getLoginData(secretId);
                await bg$1.basicAuthenticationHandler.handleBasicAuthenticationLogin(loginData);
                const tab = await this.loginTabGetter.getLoginTab(input, loginData);
                if (!tab) {
                    info(SecretLogin.name, "empty login tab", input, js.log.mask(loginData, { keys: ["texts", "passwords"] }));
                    return;
                }
                const basicAuthenticationDone = bg$1.basicAuthenticationHandler.finishBasicAuthentication();
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
            bg$1.vaultAudit.auditLogin(secretId);
            this.addRecent(secretId, tabId);
        }
        async frameLogin(tabId, frameId, secretId) {
            try {
                const secret = await this.p.secretGetter.getSecret(secretId);
                const hasAccess = Secret.hasAccess(secret);
                if (!hasAccess) {
                    bg$1.ztabHandler.getSecretAccess(secretId);
                    return;
                }
                const loginData = await this.getLoginData(secretId);
                const tab = await brApi.tab.getTab(tabId);
                const oneClickCheckOk = await this.loginTabGetter.isOneClickLoginCheckOk(tab, loginData);
                if (!oneClickCheckOk) {
                    bg$1.csUtil.showAlert(tab.id, { message: i18n(VI18N.DEV_TOOLS_NEWTAB_LOGIN) });
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
                bg$1.vaultAudit.auditLogin(secretId);
                this.addRecent(secretId, tabId);
            }
            catch (e) {
                logError(e);
            }
        }
        async loginFromWeb(secretId, url) {
            try {
                const unlocked = await bg$1.vault.isUnlocked();
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
                bg$1.vaultAudit.auditFill(secretId);
                this.addRecent(secretId, tabId);
            }
            catch (e) {
                logError(e);
            }
        }
        async cardFill(tabId, frameId, secret) {
            try {
                csApi.login.fillCard(secret, { tabId, frameId });
                bg$1.vaultAudit.auditFill(secret.id);
                this.addRecent(secret.id, tabId);
            }
            catch (e) {
                logError(e);
            }
        }
        async formFill(tabId, frameId, secret) {
            try {
                csApi.login.fillForm(secret, { tabId, frameId });
                bg$1.vaultAudit.auditFill(secret.id);
                this.addRecent(secret.id, tabId);
            }
            catch (e) {
                logError(e);
            }
        }
        async formFieldFill(tabId, frameId, data) {
            try {
                csApi.login.fillFormField(data, { tabId, frameId });
                bg$1.vaultAudit.auditFill(data.secretId);
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
                    bg$1.vaultAudit.auditFill(secretId);
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
                bg$1.vaultAudit.auditFillField(secretId, fieldLabelObj.label);
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
                bg$1.vaultAudit.auditFillField(secretId, "TOTP");
                this.addRecent(secretId, tabId);
            }
            catch (e) {
                logError(e);
            }
        }
        async fillOneAuthTotp(tabId, frameId, secretId, oneauthId) {
            try {
                const totp = await bg$1.oneAuthTotp.getTotp(oneauthId);
                if (!totp) {
                    return;
                }
                const fillValue = await this.getCSTotpFillValue(secretId, totp);
                csApi.login.fillValue(fillValue, { tabId, frameId });
                bg$1.vaultAudit.auditFillField(secretId, "TOTP");
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
                bg$1.vaultAudit.auditFillField(secretId, fieldLabelObj.label);
                this.addRecent(secretId, tabId);
            }
            catch (e) {
                logError(e);
            }
        }
        async frameLoginFn(tabId, frameId, loginData) {
            try {
                csApi.login.frameLogin(loginData, { tabId, frameId });
                bg$1.vaultAudit.auditLogin(loginData.secretId);
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
                const value = await bg$1.zcrypt.decrypt(encryptedValue, secret.shared);
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
                const value = await bg$1.zcrypt.decrypt(encryptedValue, secret.shared);
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
                        validValues.push(await bg$1.zcrypt.decrypt(encryptedFields[field.name], secret.shared));
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

    const RECENT_ADDITION_ELAPSE_MS = (30 * 24 * 60 * 60 * 1000);
    class DbSecretQuerier {
        static query(allSecrets, query) {
            return new DbSecretQuerier().querySecrets(allSecrets, query);
        }
        constructor() { }
        query = null;
        searchString = "";
        filteredSecretsParts = {
            nameStart: [],
            uiTextStart: [],
            nameInclude: [],
            uiTextInclude: [],
            words: [],
            wordsInclude: [],
            namePattern: [],
            uiTextPattern: [],
        };
        filteredSecrets = null;
        recentlyUsedMap = null;
        hostRecentIds = null;
        recentAdditionStartMs = Date.now() - RECENT_ADDITION_ELAPSE_MS;
        domainMatchingIds = null;
        filterByClassification = false;
        filterBySharingType = false;
        filterByTags = false;
        tagFilterFn = this.tagFilterAll;
        folderSecretIds = [];
        userId = "";
        result = new SecretQueryResult();
        async querySecrets(allSecrets, query) {
            try {
                this.query = query;
                await this.init();
                for (let secret of allSecrets) {
                    await this.filter(secret);
                }
                this.filteredSecrets = this.getFilteredSecrets();
                await this.sortSecrets();
                const result = this.getQueryResult();
                if (!query.noLogo) {
                    await secretLogoAdder.addLogo(result.secrets);
                }
                return result;
            }
            catch (e) {
                logError(e);
                return new SecretQueryResult();
            }
        }
        async init() {
            const query = this.query;
            this.searchString = query.search_string.toLocaleLowerCase();
            if (query.recentlyUsed) {
                this.recentlyUsedMap = await accountDb.recentSecretTable.getMap();
            }
            if (query.orderBy == SecretQueryOrderBy.HOST_RECENT) {
                this.hostRecentIds = await accountDb.hostRecentSecretTable.load(query.domainMatchingUrl);
            }
            if (query.domainMatching) {
                this.domainMatchingIds = new Set(await domainHandler.getDomainMatchingIds({ url: query.domainMatchingUrl }));
            }
            switch (query.classification) {
                case SecretClassification.PERSONAL:
                case SecretClassification.ENTERPRISE:
                    this.filterByClassification = true;
                    break;
            }
            switch (query.sharing) {
                case SecretSharingType.SHARED_BY_ME:
                case SecretSharingType.SHARED_TO_ME:
                case SecretSharingType.NONE:
                    this.filterBySharingType = true;
                    break;
            }
            if (query.folderId) {
                this.folderSecretIds = await accountDb.folderSecretMapTable.loadSecretIds(query.folderId);
            }
            if (query.recentlyAdded) {
                this.userId = await zlocalStorage.load(LocalStorageKeys.USER_ID, "");
            }
            this.filterByTags = this.query.tags.length > 0;
            if (this.filterByTags && this.query.tagMode == FilterType.ANY) {
                this.tagFilterFn = this.tagFilterAny;
            }
        }
        async filter(secret) {
            const query = this.query;
            if (query.typeId && secret.type_id != query.typeId) {
                return;
            }
            if (query.favourite && !secret.is_favourite) {
                return;
            }
            if (query.recentlyUsed && !this.recentlyUsedMap.has(secret.id)) {
                return;
            }
            if (query.recentlyAdded && ((secret.user_id != this.userId) || (secret.created_on < this.recentAdditionStartMs))) {
                return;
            }
            if (query.domainMatching && !this.domainMatchingIds.has(secret.id)) {
                return;
            }
            if (this.filterByClassification && this.query.classification != secret.classification) {
                return;
            }
            if (this.filterBySharingType && this.query.sharing != secret.sharing_type) {
                return;
            }
            if (query.folderId && !this.folderSecretIds.includes(secret.id)) {
                return;
            }
            if (this.filterByTags && !this.tagFilterFn(secret)) {
                return;
            }
            if (query.owned && !secret.owned) {
                return;
            }
            if (!this.searchString) {
                secret.highlight_field = "";
                this.filteredSecretsParts.nameInclude.push(secret);
                return;
            }
            return this.filterSearchString(secret);
        }
        tagFilterAny(secret) {
            return this.query.tags.some(x => secret.tags.includes(x));
        }
        tagFilterAll(secret) {
            return this.query.tags.every(x => secret.tags.includes(x));
        }
        async filterSearchString(secret) {
            const searchString = this.searchString;
            if (secret.name_lowercase.startsWith(searchString)) {
                this.filteredSecretsParts.nameStart.push(secret);
                secret.highlight_field = SecretHighlightFields.NAME;
                return;
            }
            const uiText = (secret.ui_text && (await bg.zcrypt.decrypt(secret.ui_text, secret.shared))) || "";
            const uiTextLower = uiText.toLocaleLowerCase();
            if (uiTextLower && uiTextLower.startsWith(searchString)) {
                this.filteredSecretsParts.uiTextStart.push(secret);
                secret.highlight_field = SecretHighlightFields.UI_TEXT;
                return;
            }
            if (secret.name_lowercase.includes(searchString)) {
                this.filteredSecretsParts.nameInclude.push(secret);
                secret.highlight_field = SecretHighlightFields.NAME;
                return;
            }
            if (uiTextLower && uiTextLower.includes(searchString)) {
                this.filteredSecretsParts.uiTextInclude.push(secret);
                secret.highlight_field = SecretHighlightFields.UI_TEXT;
                return;
            }
            if (secret.search_words.includes(searchString)) {
                this.filteredSecretsParts.words.push(secret);
                secret.highlight_field = SecretHighlightFields.WORDS;
                return;
            }
            if (secret.search_words.some(x => x.includes(searchString))) {
                this.filteredSecretsParts.wordsInclude.push(secret);
                secret.highlight_field = SecretHighlightFields.WORDS_INCLUDE;
                return;
            }
            if (vutil.search.isPresent(searchString, secret.name_lowercase)) {
                this.filteredSecretsParts.namePattern.push(secret);
                secret.highlight_field = SecretHighlightFields.NAME;
                return;
            }
            if (uiTextLower && vutil.search.isPresent(searchString, uiTextLower)) {
                this.filteredSecretsParts.uiTextPattern.push(secret);
                secret.highlight_field = SecretHighlightFields.UI_TEXT;
                return;
            }
        }
        async sortSecrets() {
            const filteredSecrets = this.filteredSecrets;
            if (this.searchString.length > 0) {
                return;
            }
            const query = this.query;
            if (query.recentlyUsed) {
                filteredSecrets.sort(this.sortByRecentUse.bind(this));
                return;
            }
            if (query.recentlyAdded) {
                filteredSecrets.sort(this.sortByRecentAdd.bind(this));
                return;
            }
            switch (query.orderBy) {
                case SecretQueryOrderBy.HOST_RECENT:
                    filteredSecrets.sort(this.sortByHostRecent.bind(this));
                    return;
                case SecretQueryOrderBy.DOMAIN_FAVOURITE:
                    await this.orderByDomainFavourite();
                    return;
            }
        }
        async orderByDomainFavourite() {
            try {
                const activeTab = await brApi.tab.getActiveTab();
                const isWebsiteUrl = activeTab?.url?.startsWith?.("http");
                if (!isWebsiteUrl) {
                    this.filteredSecrets.sort(this.sortByFavourite.bind(this));
                    return;
                }
                this.domainMatchingIds = new Set(await domainHandler.getDomainMatchingIds({ url: activeTab.url }));
                this.filteredSecrets.sort(this.sortByDomainFavourite.bind(this));
            }
            catch (e) {
                logError(e);
            }
        }
        sortByDomainFavourite(x, y) {
            try {
                return this.sortByDomainFavouriteFn(x, y) || this.sortByFavourite(x, y);
            }
            catch (e) {
                logError(e);
                return 0;
            }
        }
        sortByDomainFavouriteFn(x, y) {
            try {
                const xMatch = this.domainMatchingIds.has(x.id);
                const yMatch = this.domainMatchingIds.has(y.id);
                return Number(yMatch) - Number(xMatch);
            }
            catch (e) {
                logError(e);
                return 0;
            }
        }
        sortByRecentUse(x, y) {
            const xIndex = this.recentlyUsedMap.has(x.id) ? this.recentlyUsedMap.get(x.id) : -1;
            const yIndex = this.recentlyUsedMap.has(y.id) ? this.recentlyUsedMap.get(y.id) : -1;
            return (yIndex - xIndex) || this.sortByName(x, y);
        }
        sortByName(x, y) {
            return x.name_lowercase.localeCompare(y.name_lowercase);
        }
        sortByRecentAdd(x, y) {
            return y.created_on - x.created_on;
        }
        sortByHostRecent(x, y) {
            return this.hostRecentIds.indexOf(y.id) - this.hostRecentIds.indexOf(x.id);
        }
        sortByFavourite(x, y) {
            return Number(y.is_favourite) - Number(x.is_favourite);
        }
        getFilteredSecrets() {
            for (let key in this.filteredSecretsParts) {
                this.filteredSecretsParts[key].sort(this.sortByName.bind(this));
            }
            return js.array.concat(this.filteredSecretsParts.nameStart, this.filteredSecretsParts.uiTextStart, this.filteredSecretsParts.nameInclude, this.filteredSecretsParts.uiTextInclude, this.filteredSecretsParts.words, this.filteredSecretsParts.wordsInclude, this.filteredSecretsParts.namePattern, this.filteredSecretsParts.uiTextPattern);
        }
        getQueryResult() {
            const pageSecrets = js.array.getPage(this.filteredSecrets, this.query.page_no, this.query.rows_per_page);
            const result = this.result;
            result.query = { ...this.query };
            result.secrets = pageSecrets;
            result.total_count = this.filteredSecrets.length;
            return result;
        }
    }

    class SecretQuerier {
        async getHighlightField(secret, searchString) {
            try {
                searchString = searchString.toLocaleLowerCase();
                if (secret.name_lowercase.startsWith(searchString)) {
                    return SecretHighlightFields.NAME;
                }
                const uiText = (secret.ui_text && (await bg$1.zcrypt.decrypt(secret.ui_text, secret.shared))) || "";
                const uiTextLower = uiText.toLocaleLowerCase();
                if (uiTextLower && uiTextLower.startsWith(searchString)) {
                    return SecretHighlightFields.UI_TEXT;
                }
                if (secret.name_lowercase.includes(searchString)) {
                    return SecretHighlightFields.NAME;
                }
                if (uiTextLower && uiTextLower.includes(searchString)) {
                    return SecretHighlightFields.UI_TEXT;
                }
                if (secret.search_words.includes(searchString)) {
                    return SecretHighlightFields.WORDS;
                }
                if (secret.search_words.some(x => x.includes(searchString))) {
                    return SecretHighlightFields.WORDS_INCLUDE;
                }
                if (vutil.search.isPresent(searchString, secret.name_lowercase)) {
                    return SecretHighlightFields.NAME;
                }
                if (uiTextLower && vutil.search.isPresent(searchString, uiTextLower)) {
                    return SecretHighlightFields.UI_TEXT;
                }
                return "";
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async query(query) {
            try {
                await this.updateFolderMap(query);
                const allSecrets = await accountDb.secretTable.loadAll();
                const result = await DbSecretQuerier.query(allSecrets, query);
                if (query.includeSecretData) {
                    await bg$1.vaultSecrets.secretDataHandler.decodeSecretData(result.secrets);
                }
                return result;
            }
            catch (e) {
                logError(e);
                return new SecretQueryResult();
            }
        }
        async updateFolderMap(query) {
            try {
                if (!query.folderId) {
                    return;
                }
                const folderId = query.folderId;
                const existing = await accountDb.folderSecretMapTable.load(folderId);
                const hasValidIds = existing && (existing.validUpto > Date.now());
                if (hasValidIds) {
                    return;
                }
                const offlineHasValidIds = !navigator.onLine && existing?.secretIds && (existing.secretIds.length > 0);
                if (offlineHasValidIds) {
                    return;
                }
                await bg$1.vaultFolders.getFolderSecrets(folderId);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    const MAX_URL_LENGTH = 2000;
    class RegexUtil {
        vaultRegex = {
            cleartext: /[0-9a-zA-Z_\-.\$@\?,:'\/!\s\P{ASCII}]/u,
            non_cleartext: /[^0-9a-zA-Z_\-.\$@\?,:'\/!\s\P{ASCII}]/u,
            url: /^(http(s?)|((s|t)?)ftp|ssh|file|telnet|nfs|chrome-extension|moz-extension|ms-browser-extension|safari-extension)\:\/\/[-.\w]*(\/?)([a-zA-Z0-9\-.\?,:;'\/\\\+=&%\$#_@*|~!]*)?$/,
            searchString: /[0-9a-zA-Z_*&\-.\$@\?,#:'\/!+\P{ASCII}\s]/u
        };
        getNonClearTextChars(input) {
            return new RegExInValidCharsGetter(this.vaultRegex.cleartext).getUniqueMatchingChars(input);
        }
        isValidVaultUrl(url) {
            try {
                const regexOk = this.vaultRegex.url.test(url);
                if (!regexOk) {
                    return false;
                }
                const lengthOk = url.length <= MAX_URL_LENGTH;
                if (!lengthOk) {
                    info(RegexUtil.name, "url length exceeded", url);
                    return false;
                }
                return true;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        checkValidVaultUrl(url) {
            try {
                const regexOk = this.vaultRegex.url.test(url);
                if (!regexOk) {
                    return fnOut.error(i18n(VI18N.URL_INVALID));
                }
                const lengthOk = url.length <= MAX_URL_LENGTH;
                if (!lengthOk) {
                    return fnOut.error(i18n(VI18N.X_MUST_BE_LESS_THAN_Y_CHARS, i18n(VI18N.URL), MAX_URL_LENGTH));
                }
                return fnOut.OK;
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        replaceNonClearTextChars(s) {
            return new RegExValidCharsGetter(this.vaultRegex.cleartext).getValidString(s);
        }
        getEmailNamePart(email) {
            try {
                const regex = /[^@]*/;
                const result = regex.exec(email);
                if (result) {
                    return result[0];
                }
                return "";
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        getApiSearchString(searchString) {
            return new RegExValidCharsGetter(this.vaultRegex.searchString).getValidString(searchString);
        }
    }
    const regexUtil = new RegexUtil();
    setGlobal("regexUtil", regexUtil);
    class BaseRegExCharsGetter {
        regex = null;
        constructor(regex) {
            this.regex = regex;
        }
        getMatchingChars(inputString) {
            try {
                const validChars = [];
                let isValidChar = false;
                for (let ch of inputString) {
                    isValidChar = this.isValidChar(ch);
                    if (isValidChar) {
                        validChars.push(ch);
                    }
                }
                return validChars;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        getUniqueMatchingChars(inputString) {
            const invalidChars = this.getMatchingChars(inputString);
            const uniqueInvalidChars = Array.from(new Set(invalidChars));
            return uniqueInvalidChars;
        }
        isValidChar(ch) {
            return this.regex.test(ch);
        }
    }
    class RegExValidCharsGetter extends BaseRegExCharsGetter {
        getValidString(inputString, joinString = "") {
            return super.getMatchingChars(inputString).join(joinString);
        }
    }
    class RegExInValidCharsGetter extends BaseRegExCharsGetter {
        getInValidString(inputString, joinString = "") {
            return super.getMatchingChars(inputString).join(joinString);
        }
        isValidChar(ch) {
            return !this.regex.test(ch);
        }
    }

    class SecretShare {
        p = null;
        async getSecretShareUserUIInput(secretId) {
            try {
                const secret = await bg$1.vaultSecrets.secretGetter.getServerSecret(secretId);
                const uiInput = {
                    secretId,
                    ownerId: "",
                    secretName: secret.name,
                    users: []
                };
                try {
                    const userShareResp = (await vapi.sharing.getUserSharingInfo(secretId)).result;
                    uiInput.users = new SecretShareUIUserGetter().getSecretShareUIUsers(userShareResp);
                }
                catch (e) {
                    console.info(e);
                }
                const curZuid = await zlocalStorage.load(LocalStorageKeys.ZUID, "");
                js.array.removeFirstMatch(uiInput.users, (x) => x.zuid == curZuid);
                return uiInput;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async getSecretShareUserGroupUIInput(secretId) {
            try {
                const secret = await bg$1.vaultSecrets.secretGetter.getDbSecret(secretId);
                const uiInput = {
                    secretId,
                    ownerId: "",
                    secretName: secret.name,
                    users: []
                };
                try {
                    const userShareResp = (await vapi.sharing.getUserGroupSharingInfo(secretId)).result;
                    uiInput.users = new SecretShareUIUserGroupGetter().getSecretShareUIUsers(userShareResp);
                }
                catch (e) {
                    console.info(e);
                }
                return uiInput;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async updateUserSharing(input) {
            return this.updateSharingInServer(input, "/api/rest/json/v1/sharing/secret/users/bulkshare");
        }
        async updateUserGroupSharing(input) {
            return this.updateSharingInServer(input, "/api/rest/json/v1/sharing/secret/usergroups/bulkshare");
        }
        async updateSharingInServer(input, endpoint) {
            try {
                const apiInput = {
                    INPUT_DATA: {
                        manageusers: input.manageUserIds,
                        modifyusers: input.modifyUserIds,
                        viewusers: input.viewUserIds,
                        logonusers: input.loginUserIds,
                    },
                    secretIds: [input.secretId]
                };
                await bg$1.vaultSecrets.secretEdit.reEncryptSecretForSharing(input.secretId);
                const resp = await VaultApi.putChecked(endpoint, JSON.stringify(apiInput), VFetchContentType.JSON);
                const respSecret = resp.operation.Details.secretArray[0];
                const secret = await this.p.addVApiSecretResponse(respSecret);
                bgEventServer.secret.changed(secret.id);
            }
            catch (e) {
                throw jserror(e);
            }
        }
    }
    class BaseSecretShareUIUserGetter {
        getSecretShareUIUsers(userShareResp) {
            try {
                const details = userShareResp.operation.Details;
                const reqUsers = [];
                if (!details) {
                    return reqUsers;
                }
                for (let curRespUser of details.manageusers) {
                    reqUsers.push(this.mapRespUser(curRespUser, Secret.SHARING_LEVEL.MANAGE));
                }
                for (let curRespUser of details.modifyusers) {
                    reqUsers.push(this.mapRespUser(curRespUser, Secret.SHARING_LEVEL.MODIFY));
                }
                for (let curRespUser of details.viewusers) {
                    reqUsers.push(this.mapRespUser(curRespUser, Secret.SHARING_LEVEL.VIEW));
                }
                for (let curRespUser of details.logonusers) {
                    reqUsers.push(this.mapRespUser(curRespUser, Secret.SHARING_LEVEL.LOGIN));
                }
                for (let curRespUser of details.notshared) {
                    reqUsers.push(this.mapRespUser(curRespUser, Secret.SHARING_LEVEL.NONE));
                }
                return reqUsers;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        mapRespUser(respUser, shareLevel) {
            throw "not implemented";
        }
    }
    class SecretShareUIUserGetter extends BaseSecretShareUIUserGetter {
        getSecretShareUIUsers(userShareResp) {
            return super.getSecretShareUIUsers(userShareResp);
        }
        mapRespUser(respUser, shareLevel) {
            try {
                const user = {
                    id: respUser.user_auto_id,
                    zuid: respUser["unique-id"],
                    name: respUser.username,
                    email: respUser.email,
                    selected: false,
                    shareLevel,
                    nameLowerCase: respUser.username.toLowerCase(),
                    emailLowerCase: respUser.email.toLowerCase(),
                    emailNamePartLowerCase: regexUtil.getEmailNamePart(respUser.email).toLowerCase(),
                    searchWeight: 0,
                    dp: ""
                };
                return user;
            }
            catch (e) {
                throw jserror(e);
            }
        }
    }
    class SecretShareUIUserGroupGetter extends BaseSecretShareUIUserGetter {
        getSecretShareUIUsers(userShareResp) {
            return super.getSecretShareUIUsers(userShareResp);
        }
        mapRespUser(respUser, shareLevel) {
            try {
                const userGroup = {
                    id: respUser.usergroup_auto_id,
                    name: respUser.usergroupname,
                    selected: false,
                    shareLevel,
                    nameLowerCase: respUser.usergroupname.toLowerCase(),
                    searchWeight: 0
                };
                return userGroup;
            }
            catch (e) {
                throw jserror(e);
            }
        }
    }

    class SecretSearchUtil {
        static getSearchWords(secret) {
            try {
                return js.array.concat(this.getTagSearchWords(secret), this.getDescriptionSearchWords(secret), this.getUrlSearchWords(secret));
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        static getTagSearchWords(secret) {
            try {
                return this.filterMapSearchWords(secret.tags);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        static filterMapSearchWords(words) {
            return words.filter(x => x.length).map(x => x.toLowerCase());
        }
        static getDescriptionSearchWords(secret) {
            try {
                const searchWords = secret.description.split(/\W/g).filter(x => Boolean(x.length > 2));
                return this.filterMapSearchWords(searchWords);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        static getUrlSearchWords(secret) {
            try {
                const searchWords = secret.valid_urls.map(x => js.url.getParentDomain(x));
                return this.filterMapSearchWords(searchWords);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
    }

    const TRUE_STRING = "true";
    class SecretParser {
        userId = "";
        secretTypeMap = {};
        PLUS_VALID_MINS_MS = 1 * 60 * 1000;
        async init() {
            this.userId = await zlocalStorage.load(LocalStorageKeys.USER_ID, "");
            this.secretTypeMap = await accountDb.secretTypeTable.loadMap();
        }
        async parseAll(respSecretList) {
            try {
                await this.init();
                const secrets = [];
                const MAX_COUNT = 250;
                const delayCounter = js.loop.createCyclicCounter(MAX_COUNT, 0.1);
                for (let respSecret of respSecretList) {
                    try {
                        secrets.push(await new ParseSecret(this, respSecret).parse());
                    }
                    catch (e) {
                        console.error(e, respSecret);
                    }
                    await delayCounter.next();
                }
                return secrets;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async parse(respSecret) {
            await this.init();
            return new ParseSecret(this, respSecret).parse();
        }
    }
    class ParseSecret {
        p;
        respSecret;
        secret = new Secret();
        constructor(p, respSecret) {
            this.p = p;
            this.respSecret = respSecret;
        }
        async parse() {
            try {
                this.initIds();
                this.secret.logo = this.respSecret.logo || "";
                this.initClassifications();
                this.initSharing();
                this.initAccessControl();
                this.secret.oldValues = this.getSecretHistory();
                this.secret.fetchedOn = Date.now();
                await this.initEncryptedAttributes();
                await this.initEncrypted();
                return this.secret;
            }
            catch (e) {
                throw e;
            }
        }
        initIds() {
            this.secret.id = this.respSecret.secretid;
            this.secret.type_id = this.respSecret.accounttype;
            this.secret.policy_id = this.respSecret.policyid || this.respSecret.POLICYID || "";
            this.secret.user_id = this.respSecret.userid;
            this.secret.oneauth_id = this.respSecret.oneauth_id || "";
        }
        initClassifications() {
            this.secret.created_on = this.respSecret.creationtime;
            this.secret.modifiedOn = this.respSecret.lastmodifiedtime || this.secret.created_on;
            this.secret.classification = this.respSecret.classification;
            this.secret.is_favourite = this.respSecret.isfavourites;
            this.secret.change_password = Boolean(this.respSecret.changepassword);
            this.secret.has_totp = false;
            this.secret.owned = this.respSecret.userid == this.p.userId;
            this.secret.auto_submit = this.respSecret.autosubmit === undefined ? true : this.respSecret.autosubmit;
        }
        initSharing() {
            this.secret.shared = this.respSecret.isshared == Secret.IS_SHARED.YES;
            this.secret.sharing_type = this.respSecret.issharedtousers ? this.respSecret.sharingtype : SecretSharingType.NONE;
            this.secret.sharing_level = this.secret.sharing_type == SecretSharingType.SHARED_TO_ME ? this.respSecret.sharinglevel : Secret.SHARING_LEVEL.MANAGE;
        }
        initAccessControl() {
            this.secret.access_controlled = this.respSecret.accesssctrlconfigured == TRUE_STRING;
            this.secret.display_access_control_icon = this.respSecret.displayaccctrlicon || false;
            this.secret.access_request_status = this.respSecret.requeststatus ? this.respSecret.requeststatus : Secret.ACCESS_CTRL_STATUS.NO_REQUEST_FOUND;
            this.secret.access_request_id = this.respSecret.accessrequestid || "";
        }
        async initEncryptedAttributes() {
            const secretName = await this.getName();
            this.secret.name = secretName;
            this.secret.name_lowercase = secretName.toLowerCase();
            this.secret.urls = await this.getUrls();
            this.secret.valid_urls = this.secret.urls.filter(url => js.url.isValid(url));
            this.secret.tags = await this.getTags();
            this.secret.description = await this.getDescription();
        }
        async getName() {
            try {
                if (!this.respSecret.encsecretname) {
                    return this.respSecret.secretname;
                }
                return await bg$1.zcrypt.decrypt(this.respSecret.encsecretname, this.secret.shared);
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async getUrls() {
            try {
                if (!this.respSecret.encryptedurls) {
                    return this.respSecret.secretmultipleurl || (this.respSecret.secreturl ? [this.respSecret.secreturl] : []);
                }
                const urls = [];
                for (let encryptedUrl of this.respSecret.encryptedurls) {
                    urls.push(await bg$1.zcrypt.decrypt(encryptedUrl, this.secret.shared));
                }
                return urls;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async getTags() {
            try {
                const tagString = await this.getDecryptedTags();
                if (!tagString.length) {
                    return [];
                }
                const tags = tagString.split(",");
                return tags.filter(x => x.length > 0);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async getDecryptedTags() {
            try {
                if (!this.respSecret.encryptedtags) {
                    return this.respSecret.tags || "";
                }
                return await bg$1.zcrypt.decrypt(this.respSecret.encryptedtags, this.secret.shared);
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async getDescription() {
            try {
                if (!this.respSecret.encdescription) {
                    return this.respSecret.description || "";
                }
                return await bg$1.zcrypt.decrypt(this.respSecret.encdescription, this.secret.shared);
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        getSecretHistory() {
            try {
                const hasNoOldValues = !Boolean(this.respSecret.old_values);
                if (hasNoOldValues) {
                    return {};
                }
                const oldValueObj = {};
                let colHisory = null;
                for (let respColHistory of this.respSecret.old_values) {
                    colHisory = new SecretFieldHistory();
                    colHisory.id = respColHistory.SECRETHISTORY_AUTO_ID;
                    colHisory.values = this.getColumnHistoryValues(respColHistory.OLDVALUE);
                    oldValueObj[respColHistory.COLUMNNAME] = colHisory;
                }
                return oldValueObj;
            }
            catch (e) {
                logError(e);
                return {};
            }
        }
        getColumnHistoryValues(respOldValueString) {
            try {
                let respHistoryEntries = JSON.parse(respOldValueString);
                const historyEntries = [];
                for (let curRespHistoryEntry of respHistoryEntries) {
                    historyEntries.push({
                        oldValue: curRespHistoryEntry.oldvalue,
                        timestamp: curRespHistoryEntry.timestamp
                    });
                }
                return historyEntries;
            }
            catch (e) {
                throw e;
            }
        }
        initEncrypted() {
            if (!this.respSecret.secretData || !this.isValidJson(this.respSecret.secretData)) {
                this.secret.encrypted = null;
                return;
            }
            const encrypted = {
                fields: JSON.parse(this.respSecret.secretData),
                totp: this.respSecret.totp || "",
                files: this.respSecret.files ? JSON.parse(this.respSecret.files) : [],
                notes: this.respSecret.notes || "",
                custom_columns: this.respSecret.customcolumn ? JSON.parse(VaultCrypto.decodeBase64(this.respSecret.customcolumn)).customcol : []
            };
            this.secret.encrypted = encrypted;
            this.secret.has_totp = Boolean(encrypted.totp) && encrypted.totp.length > 12;
            this.updateUIField(this.secret);
            this.updateSearchWords(this.secret);
            this.updateCustomColumnTypeInfo(this.secret);
        }
        isValidJson(s = "") {
            try {
                JSON.parse(s);
            }
            catch (e) {
                return false;
            }
            return true;
        }
        updateSearchWords(secret) {
            secret.search_words = SecretSearchUtil.getSearchWords(secret);
        }
        updateUIField(secret) {
            const addUIFields = this.p.secretTypeMap[secret.type_id].ui_fields;
            const uiField = addUIFields.find(x => secret.encrypted.fields[x]);
            if (!uiField) {
                return;
            }
            secret.ui_text = secret.encrypted.fields[uiField];
            secret.uiFieldName = uiField;
        }
        updateCustomColumnTypeInfo(secret) {
            try {
                const hasValidCustomColumns = secret.encrypted && secret.encrypted.custom_columns
                    && secret.encrypted.custom_columns.length > 0;
                if (!hasValidCustomColumns) {
                    return;
                }
                const allCustomColumnTypeInfos = [];
                let customColumnTypeInfo = null;
                let isReqCustomCol = false;
                for (let customColumn of secret.encrypted.custom_columns) {
                    isReqCustomCol = (customColumn.type == SecretType.FIELD_TYPE.TEXT || customColumn.type == SecretType.FIELD_TYPE.PASSWORD)
                        && Boolean(customColumn.colname);
                    if (!isReqCustomCol) {
                        continue;
                    }
                    customColumnTypeInfo = new CustomColumnTypeInfo();
                    customColumnTypeInfo.id = customColumn.id;
                    customColumnTypeInfo.label = customColumn.colname;
                    customColumnTypeInfo.type = customColumn.type;
                    allCustomColumnTypeInfos.push(customColumnTypeInfo);
                }
                secret.customColumnTypeInfos = allCustomColumnTypeInfos;
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class VaultSecrets {
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
                const totp_url = await bg$1.zcrypt.decrypt(secret.encrypted.totp, secret.shared);
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
                    bg$1.vaultSecretTypes.sync(),
                    bg$1.vaultLogin.decryptOrgKey()
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

    class BgUnlockTabHandler {
        tabCreator = null;
        init() {
            try {
                this.tabCreator = bgUtil.newTabCreator({ tabName: "UNLOCK_TAB", url: "/html/unlockPage.html" });
            }
            catch (e) {
                logError(e);
            }
        }
        async create() {
            return this.tabCreator.createTab();
        }
        async close() {
            return this.tabCreator.close();
        }
    }

    class ZVError {
        static error(e) {
            if (ZVUIError.isUIError(e)) {
                throw ZVUIError.getInstance(e);
            }
        }
        static getUIErrorMsg(e) {
            if (!ZVUIError.isUIError(e)) {
                return e + "";
            }
            const errorMsg = ZVUIError.getUIErrorMsg(e);
            if (errorMsg.startsWith("i18n:")) {
                return chrome.i18n.getMessage(errorMsg.slice("i18n:".length));
            }
            return errorMsg;
        }
    }
    class ZVUIError extends Error {
        static PREFIX = "ZV: ";
        constructor(message) {
            super(message);
        }
        static getErrorMsg(error) {
            error = error + "";
            return error.startsWith(this.PREFIX) ? error : this.PREFIX + error;
        }
        static getInstance(error) {
            if (error instanceof ZVUIError) {
                return error;
            }
            throw new ZVUIError(this.getErrorMsg(error));
        }
        static isUIError(e) {
            return e instanceof ZVUIError ||
                ((typeof e == "string") && e.startsWith(this.PREFIX));
        }
        [Symbol.toPrimitive]() {
            return this.message;
        }
        static getUIErrorMsg(error) {
            try {
                if (!this.isUIError(error)) {
                    return error;
                }
                return (error + "").slice(this.PREFIX.length);
            }
            catch (e) {
                logError(e);
                return "" + error;
            }
        }
    }

    var ZTAB_TASK;
    (function (ZTAB_TASK) {
        ZTAB_TASK["ADD"] = "ADD";
        ZTAB_TASK["EDIT"] = "EDIT";
        ZTAB_TASK["ADD_CARD"] = "ADD_CARD";
        ZTAB_TASK["ADD_ADDRESS"] = "ADD_ADDRESS";
        ZTAB_TASK["EDIT_CARD"] = "EDIT_CARD";
        ZTAB_TASK["SHARE"] = "SHARE";
        ZTAB_TASK["ENABLE_ACCESS_CONTROL"] = "ENABLE_ACCESS_CONTROL";
        ZTAB_TASK["MANAGE_ACCESS_CONTROL"] = "MANAGE_ACCESS_CONTROL";
        ZTAB_TASK["REQUEST_ACCESS"] = "REQUEST_ACCESS";
        ZTAB_TASK["OPEN_SETTINGS"] = "OPEN_SETTINGS";
    })(ZTAB_TASK || (ZTAB_TASK = {}));
    class ZTabTask {
        type;
        constructor(type) {
            this.type = type;
        }
    }
    class ZTabAddTask extends ZTabTask {
        constructor() {
            super(ZTAB_TASK.ADD);
        }
        prefillInput = null;
    }
    class ZTabAddCardTask extends ZTabTask {
        constructor() {
            super(ZTAB_TASK.ADD_CARD);
        }
        prefillInput = null;
    }
    class ZTabAddAddressTask extends ZTabTask {
        constructor() {
            super(ZTAB_TASK.ADD_ADDRESS);
        }
    }
    class ZTabEditCardTask extends ZTabTask {
        constructor() {
            super(ZTAB_TASK.EDIT_CARD);
        }
        secretId = "";
        prefillInput = null;
    }
    class ZTabEditTask extends ZTabTask {
        constructor() {
            super(ZTAB_TASK.EDIT);
        }
        secretId = "";
        editInput = null;
    }
    class ZTabShareTask extends ZTabTask {
        constructor() {
            super(ZTAB_TASK.SHARE);
        }
        secretId = "";
    }
    class ZTabEnableAccessControlTask extends ZTabTask {
        constructor() {
            super(ZTAB_TASK.ENABLE_ACCESS_CONTROL);
        }
        secretId = "";
    }
    class ZTabManageAccessControlTask extends ZTabTask {
        constructor() {
            super(ZTAB_TASK.MANAGE_ACCESS_CONTROL);
        }
        secretId = "";
    }
    class ZTabRequestAcessTask extends ZTabTask {
        constructor() {
            super(ZTAB_TASK.REQUEST_ACCESS);
        }
        secretId = "";
    }

    class FilledFormData {
        texts = [];
        passwords = [];
    }

    class ZTabPasswordAdd {
        async getPrefillInput(tabId, frameId) {
            try {
                const connectable = await csApi.isConnectable({ tabId, frameId });
                if (!connectable) {
                    return new SecretAddPreFillInput();
                }
                const prefillInput = new SecretAddPreFillInput();
                const fillFrameUrl = frameId != 0;
                if (fillFrameUrl) {
                    const frameUrl = await csApi.other.getFrameUrl({ tabId, frameId });
                    prefillInput.urls.push(frameUrl);
                }
                const filledFormFields = await this.getFilledFormFields(tabId, frameId);
                prefillInput.texts = filledFormFields.texts;
                prefillInput.passwords = filledFormFields.passwords;
                const needCustomCategory = prefillInput.texts.length > 1 || prefillInput.passwords.length > 1;
                if (needCustomCategory) {
                    await this.setCustomCategroy(prefillInput, tabId);
                }
                return prefillInput;
            }
            catch (e) {
                logError(e);
                return new SecretAddPreFillInput();
            }
        }
        async getFilledFormFields(tabId, frameId) {
            try {
                const isConnectable = await csApi.isConnectable({ tabId, frameId });
                if (!isConnectable) {
                    throw "frame not connectable";
                }
                return await csApi.other.getFilledFormData({ tabId, frameId });
            }
            catch (e) {
                logError(e);
                return new FilledFormData();
            }
        }
        async getExistingSecretType(tabId) {
            try {
                const tabUrl = (await brApi.tab.getTab(tabId)).url;
                return await bg$1.vaultSecretTypes.getExistingSecretType(tabUrl);
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async getPossibleSecretType(prefillInput) {
            try {
                const secretTypes = await accountDb.secretTypeTable.loadAll();
                const passwordCountMatchingTypes = secretTypes.filter(x => x.password_fields.length == prefillInput.passwords.length);
                switch (passwordCountMatchingTypes.length) {
                    case 0: return null;
                    case 1:
                        passwordCountMatchingTypes[0];
                        break;
                }
                const textMatchingTypes = passwordCountMatchingTypes.filter(x => x.text_fields.length == prefillInput.texts.length);
                switch (textMatchingTypes.length) {
                    case 0: return null;
                    case 1:
                        textMatchingTypes[0];
                        break;
                }
                return textMatchingTypes[0];
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async setCustomCategroy(prefillInput, tabId) {
            try {
                const reqSecretType = await this.getExistingSecretType(tabId) ||
                    (await this.getPossibleSecretType(prefillInput)) ||
                    (await bg$1.vaultSecretTypes.getWebAccountType());
                while (reqSecretType.text_fields.length < prefillInput.texts.length) {
                    prefillInput.texts.shift();
                }
                prefillInput.typeId = reqSecretType.id;
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class BgZTabHandler {
        pendingZTabTask = null;
        tabCreator = null;
        passwordAdd = new ZTabPasswordAdd();
        init() {
            try {
                this.tabCreator = bgUtil.newTabCreator({ tabName: "ZTAB", url: "/html/ztab.html" });
            }
            catch (e) {
                logError(e);
            }
        }
        async openZTab() {
            try {
                await this.tabCreator.createTab();
            }
            catch (e) {
                logError(e);
            }
        }
        async closeZTab() {
            try {
                await this.tabCreator.close();
            }
            catch (e) {
                logError(e);
            }
        }
        async closeZTabFromId(id) {
            try {
                await this.closeZTab();
                await brApi.tab.closeTab(id);
            }
            catch (e) {
                logError(e);
            }
        }
        async addPassword(prefillInput) {
            try {
                const addTask = new ZTabAddTask();
                addTask.prefillInput = prefillInput;
                await this.fillTabInfo(prefillInput);
                await this.executeZTabTask(addTask);
            }
            catch (e) {
                logError(e);
            }
        }
        async addPasswordFromTab(tabId, frameId) {
            try {
                await this.addPassword(await this.passwordAdd.getPrefillInput(tabId, frameId));
            }
            catch (e) {
                logError(e);
            }
        }
        async addAddress() {
            try {
                const addTask = new ZTabAddAddressTask();
                await this.executeZTabTask(addTask);
            }
            catch (e) {
                ZVError.error(e);
            }
        }
        async addPaymentCard(prefillInput) {
            try {
                const addTask = new ZTabAddCardTask();
                addTask.prefillInput = prefillInput;
                await this.executeZTabTask(addTask);
            }
            catch (e) {
                logError(e);
            }
        }
        async editPaymentCard(prefillInput, secretId) {
            try {
                const editTask = new ZTabEditCardTask();
                editTask.secretId = secretId;
                editTask.prefillInput = prefillInput;
                await this.executeZTabTask(editTask);
            }
            catch (e) {
                logError(e);
            }
        }
        async editPassword(secretId) {
            try {
                const editTask = new ZTabEditTask();
                editTask.secretId = secretId;
                await this.executeZTabTask(editTask);
            }
            catch (e) {
                logError(e);
            }
        }
        async editInput(secretEditUIInput) {
            try {
                const editTask = new ZTabEditTask();
                editTask.editInput = secretEditUIInput;
                await this.executeZTabTask(editTask);
            }
            catch (e) {
                logError(e);
            }
        }
        async sharePassword(secretId) {
            try {
                const shareTask = new ZTabShareTask();
                shareTask.secretId = secretId;
                await this.executeZTabTask(shareTask);
            }
            catch (e) {
                logError(e);
            }
        }
        async enableAccessControl(secretId) {
            try {
                const enableTask = new ZTabEnableAccessControlTask();
                enableTask.secretId = secretId;
                await this.executeZTabTask(enableTask);
            }
            catch (e) {
                logError(e);
            }
        }
        async manageAccessControl(secretId) {
            try {
                const enableTask = new ZTabManageAccessControlTask();
                enableTask.secretId = secretId;
                await this.executeZTabTask(enableTask);
            }
            catch (e) {
                logError(e);
            }
        }
        async getSecretAccess(secretId) {
            try {
                const requestTask = new ZTabRequestAcessTask();
                requestTask.secretId = secretId;
                await this.executeZTabTask(requestTask);
            }
            catch (e) {
                logError(e);
            }
        }
        async openSettings() {
            try {
                await this.executeZTabTask(new ZTabTask(ZTAB_TASK.OPEN_SETTINGS));
            }
            catch (e) {
                logError(e);
            }
        }
        async fillTabInfo(prefillInput) {
            try {
                const activeTab = await brApi.tab.getActiveTab();
                if (!activeTab || !activeTab.url) {
                    return;
                }
                const isNonSiteUrl = !activeTab.url.startsWith("http");
                if (isNonSiteUrl) {
                    return;
                }
                prefillInput.name = js.url.getParentDomain(activeTab.url);
                prefillInput.logo = await logoGetter.getLogo(activeTab.url);
                prefillInput.description = regexUtil.replaceNonClearTextChars(activeTab.title);
                this.addPrefillUrl(prefillInput, activeTab.url);
            }
            catch (e) {
                logError(e);
            }
        }
        addPrefillUrl(prefillInput, url) {
            try {
                const urlDomain = domainHandler.mapUrl(url);
                for (let existingUrl of prefillInput.urls) {
                    if (domainHandler.mapUrl(existingUrl) == urlDomain) {
                        return;
                    }
                }
                if (prefillInput.urls == prefillInput.texts) {
                    prefillInput.urls = [];
                }
                prefillInput.urls.unshift(url);
            }
            catch (e) {
                logError(e);
            }
        }
        async executeZTabTask(ztabTask) {
            try {
                const isValid = ztabTask instanceof ZTabTask;
                if (!isValid) {
                    throw "INVALID_TASK";
                }
                this.pendingZTabTask = ztabTask;
                await this.openZTab();
            }
            catch (e) {
                logError(e);
            }
        }
        async saveGeneratedPassword(password) {
            try {
                const prefillInput = new SecretAddPreFillInput();
                prefillInput.passwords.push(password);
                await this.addPassword(prefillInput);
            }
            catch (e) {
                logError(e);
            }
        }
        getRemovePendingZTabTask() {
            try {
                const task = this.pendingZTabTask;
                this.pendingZTabTask = null;
                return task;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }

    class BgCardFrame {
        async getCardListSecrets(query) {
            try {
                query.includeSecretData = true;
                const secretQueryResult = await bg$1.vaultSecrets.secretQuerier.query(query);
                return secretQueryResult.secrets;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async fillCard(tabId, frameId, secret) {
            try {
                csApi.frame.closeCardFrame(tabId);
                await bg$1.vaultSecrets.secretLogin.cardFill(tabId, frameId, secret);
            }
            catch (e) {
                logError(e);
            }
        }
        async fillCardIframe(tabId, frameId, secretId, data) {
            try {
                csApi.frame.closeCardFrame(tabId);
                await bg$1.vaultSecrets.secretLogin.cardFillIframe(tabId, frameId, secretId, data);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class BgConfirmFrame {
        async allowPermanent(secretId, allowedDomain) {
            try {
                const editUIInput = await bg$1.vaultSecrets.secretEdit.getEditUIInput(secretId);
                const urls = editUIInput.urls;
                const allowedUrl = "https://" + allowedDomain;
                urls.push(allowedUrl);
                const input = {
                    secretId,
                    name: editUIInput.name,
                    logo: editUIInput.logo,
                    policyId: editUIInput.policyId,
                    classification: editUIInput.classification,
                    plainSecretData: editUIInput.plainSecretData,
                    totpUrl: editUIInput.totpUrl,
                    notes: editUIInput.notes,
                    urls,
                    tags: editUIInput.tags,
                    files: [],
                    deletedFiles: [],
                    description: editUIInput.description,
                    customColumns: editUIInput.customColumns,
                    oneauth_id: editUIInput.oneauthId
                };
                await bg$1.vaultSecrets.secretEdit.updatePassword(input);
            }
            catch (e) {
                throw jserror(e);
            }
        }
    }

    class BgFormFrame {
        async getFormListSecrets(query) {
            try {
                query.includeSecretData = true;
                const secretQueryResult = await bg.vaultSecrets.secretQuerier.query(query);
                return secretQueryResult.secrets;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async fillForm(tabId, frameId, secret) {
            try {
                csApi.frame.closeCardFrame(tabId);
                await bg.vaultSecrets.secretLogin.formFill(tabId, frameId, secret);
            }
            catch (e) {
                logError(e);
            }
        }
        async fillFormField(tabId, frameId, data) {
            try {
                csApi.frame.closeCardFrame(tabId);
                await bg.vaultSecrets.secretLogin.formFieldFill(tabId, frameId, data);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class BgNeverSaveChecker {
        async checkNoNeedAutoSaveUpdate(tabId, url) {
            return new AutoSaveNeverSaveChecker().checkNeedSaveDisable(tabId, url);
        }
        async checkNoNeedUpdateLoginPasswordChange(tabId) {
            return new LoginUpdateNeverSaveChecker().checkNeedUpdateDisable(tabId);
        }
    }
    class BaseNeverSaveChecker {
        async checkNeedDisable(url) {
            try {
                const unlocked = await bg$1.vault.isUnlocked();
                if (!unlocked) {
                    return true;
                }
                const autoSave = await zlocalStorage.load(LocalStorageKeys.AUTO_SAVE_UPDATE_PASSWORDS, true);
                if (!autoSave) {
                    return true;
                }
                const isNeverSaveUrl = await bg$1.neverSaveUrls.isNeverSaveUrl(url);
                if (isNeverSaveUrl) {
                    return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }
    class AutoSaveNeverSaveChecker extends BaseNeverSaveChecker {
        async checkNeedSaveDisable(tabId, url) {
            try {
                const disableSave = await super.checkNeedDisable(url);
                if (disableSave) {
                    return true;
                }
                const isInLogin = await bg$1.vaultSecrets.secretLogin.recording.isInLogin(tabId);
                if (isInLogin) {
                    return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }
    class LoginUpdateNeverSaveChecker extends BaseNeverSaveChecker {
        async checkNeedUpdateDisable(tabId) {
            try {
                const tab = await brApi.tab.getTab(tabId);
                const disableSave = await super.checkNeedDisable(tab.url);
                if (disableSave) {
                    return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class BgSaveFrame {
        async show(saveCredential, tabId) {
            try {
                const saveFrameData = new SaveFrameData();
                saveFrameData.name = await bg$1.vaultSecrets.secretUtil.suggestNewName({ url: saveCredential.urls[0] });
                saveFrameData.username = saveCredential.username;
                saveFrameData.password = saveCredential.password;
                saveFrameData.urls = saveCredential.urls;
                saveFrameData.allowedClassifications = await bg$1.vaultConfig.getAddPasswordClassifications();
                await bgStorage.tab.save(tabId, TabStorageKeys.SAVE_FRAME_DATA, saveFrameData);
                await bgStorage.tab.save(tabId, TabStorageKeys.SHOWN_SAVE_FRAME, true);
                csApi.frame.showSaveFrame(tabId);
            }
            catch (e) {
                logError(e);
            }
        }
        async getData(tabId) {
            try {
                const saveFrameData = await bgStorage.tab.load(tabId, TabStorageKeys.SAVE_FRAME_DATA);
                return saveFrameData;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async editPassword(saveFrameUserInput, tabId) {
            try {
                const saveFrameData = await this.getData(tabId);
                const prefillInput = new SecretAddPreFillInput();
                let logo = "";
                try {
                    logo = await logoGetter.getLogo(saveFrameData.urls[0]);
                }
                catch (e) {
                    console.error(e, saveFrameData.urls[0]);
                }
                prefillInput.name = saveFrameUserInput.name;
                prefillInput.logo = logo;
                prefillInput.texts.push(saveFrameData.username);
                prefillInput.passwords.push(saveFrameData.password);
                prefillInput.urls = saveFrameData.urls;
                prefillInput.classification = saveFrameUserInput.classification;
                prefillInput.folderId = saveFrameUserInput.folderId;
                prefillInput.newFolderName = saveFrameUserInput.newFolderName;
                await bg$1.ztabHandler.addPassword(prefillInput);
            }
            catch (e) {
                logError(e);
            }
        }
        async savePassword(saveFrameUserInput, tabId) {
            try {
                const saveFrameData = await this.getData(tabId);
                let logo = "";
                try {
                    logo = await logoGetter.getLogo(saveFrameData.urls[0]);
                }
                catch (e) {
                    console.error(e, saveFrameData.urls);
                }
                const addSecretInput = {
                    typeId: (await bg$1.vaultSecretTypes.getWebAccountType()).id,
                    name: saveFrameUserInput.name,
                    logo,
                    policyId: await zlocalStorage.load(LocalStorageKeys.DEFAULT_POLICY_ID, ""),
                    classification: saveFrameUserInput.classification,
                    plainSecretData: {
                        username: saveFrameData.username,
                        password: saveFrameData.password
                    },
                    notes: "",
                    totpUrl: "",
                    urls: saveFrameData.urls,
                    description: "",
                    customColumns: [],
                    files: [],
                    tags: [],
                    folderId: saveFrameUserInput.folderId,
                    newFolderName: saveFrameUserInput.newFolderName,
                    oneauth_id: ""
                };
                const secret = await bg$1.vaultSecrets.secretAdd.addSecret(addSecretInput);
                accountDb.hostRecentSecretTable.add(secret.urls[0], secret.id);
                this.close({ restoreFoucs: true }, tabId);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async close(params, tabId) {
            try {
                await bgStorage.tab.save(tabId, TabStorageKeys.SAVE_FRAME_DATA, null);
                await bgStorage.tab.save(tabId, TabStorageKeys.SHOWN_SAVE_FRAME, false);
                csApi.frame.closeFrame(params, tabId);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class BgSavePassword {
        async saveCredential(saveCredential, tabId) {
            try {
                await this.clearSavedData(tabId);
                const noSave = await bg$1.neverSaveChecker.checkNoNeedAutoSaveUpdate(tabId, saveCredential.urls[0]);
                if (noSave) {
                    info(BgSavePassword.name, "not saving ", js.log.mask(saveCredential, { keys: ["username", "password"] }));
                    return;
                }
                const secretSelector = new SecretSelecterSaveCredential();
                const domainSecrets = await secretSelector.getDomainMatchingSecrets(saveCredential.urls[0]);
                const usernameMatchingSecrets = await secretSelector.getFieldTypeValueMatchingSecrets(domainSecrets, SecretType.FIELD_TYPE.TEXT, saveCredential.username);
                if (usernameMatchingSecrets.length > 0) {
                    await this.updateCredential({ secretSelector, usernameMatchingSecrets, tabId, saveCredential });
                    return;
                }
                const allowedClassifications = await bg$1.vaultConfig.getAddPasswordClassifications();
                const noValidClassification = allowedClassifications.length == 0;
                if (noValidClassification) {
                    return;
                }
                await bg$1.saveFrame.show(saveCredential, tabId);
            }
            catch (e) {
                logError(e);
            }
        }
        async disableSave(tabId) {
            try {
                await bg$1.saveFrame.close({}, tabId);
                await bg$1.updateFrame.close({}, tabId);
                await this.clearSavedData(tabId);
                await csApi.frame.closeFrame({}, tabId);
            }
            catch (e) {
                logError(e);
            }
        }
        async saveChangedCredential(changedCredential, tab) {
            try {
                await this.clearSavedData(tab.id);
                const noSave = await bg$1.neverSaveChecker.checkNoNeedAutoSaveUpdate(tab.id, tab.url);
                if (noSave) {
                    return;
                }
                const reqUpdateSecret = await new SecretSelecterChangedCredential().getSecretToUpdate(changedCredential, tab.url);
                if (!reqUpdateSecret) {
                    return;
                }
                const saveCredential = {
                    username: await this.getUserName(reqUpdateSecret),
                    password: changedCredential.newPassword,
                    urls: reqUpdateSecret.urls
                };
                bg$1.updateFrame.show(saveCredential, reqUpdateSecret, tab.id);
            }
            catch (e) {
                logError(e);
            }
        }
        async updateCredential(param) {
            try {
                const { secretSelector, usernameMatchingSecrets, tabId, saveCredential } = param;
                const passwordMatched = await secretSelector.hasFieldTypeValueMatchingSecrets(usernameMatchingSecrets, SecretType.FIELD_TYPE.PASSWORD, saveCredential.password);
                if (passwordMatched) {
                    return;
                }
                const tab = await brApi.tab.getTab(tabId);
                const secretToUpdate = await secretSelector.getSecretToUpdate(usernameMatchingSecrets, tab.url);
                if (secretToUpdate) {
                    await bg$1.updateFrame.show(saveCredential, secretToUpdate, tabId);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async getUserName(secret) {
            try {
                const secretType = await accountDb.secretTypeTable.load(secret.type_id);
                if (!secretType) {
                    throw "secret type not found";
                }
                const hasValidEncrypted = Secret.hasAccess(secret) && secret.encrypted && secret.encrypted.fields;
                if (!hasValidEncrypted) {
                    throw "secret data empty";
                }
                let plainText = "";
                for (let field of secretType.text_fields) {
                    if (!secret.encrypted.fields[field.name]) {
                        continue;
                    }
                    plainText = await bg$1.zcrypt.decrypt(secret.encrypted.fields[field.name], secret.shared);
                    if (plainText) {
                        return plainText;
                    }
                }
                return plainText;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async clearSavedData(tabId) {
            try {
                await bgStorage.tab.remove(tabId, TabDomainStorageKeys.SAVE_CREDENTIAL);
                await bgStorage.tab.remove(tabId, TabDomainStorageKeys.SAVE_USERNAME);
                await bgStorage.tab.remove(tabId, TabDomainStorageKeys.CHANGED_CREDENTIAL);
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class BaseFieldMatchingSecretGetter {
        async getFieldTypeValueMatchingSecrets(secrets, fieldType, fieldValue) {
            try {
                const matchingSecrets = [];
                const fieldNamesMap = await this.getSecretTypeIdFieldNamesMap(fieldType);
                let fieldNames = null;
                let isReqSecret = false;
                for (let curSecret of secrets) {
                    fieldNames = fieldNamesMap[curSecret.type_id];
                    if (!fieldNames || !fieldNames.length) {
                        continue;
                    }
                    for (let curFieldName of fieldNames) {
                        isReqSecret = curSecret.encrypted && curSecret.encrypted.fields && curSecret.encrypted.fields[curFieldName] &&
                            (await bg$1.zcrypt.decrypt(curSecret.encrypted.fields[curFieldName], curSecret.shared) == fieldValue);
                        if (isReqSecret) {
                            matchingSecrets.push(curSecret);
                        }
                    }
                }
                return matchingSecrets;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async hasFieldTypeValueMatchingSecrets(secrets, fieldType, fieldValue) {
            try {
                const fieldNamesMap = await this.getSecretTypeIdFieldNamesMap(fieldType);
                let fieldNames = null;
                let isReqSecret = false;
                for (let curSecret of secrets) {
                    fieldNames = fieldNamesMap[curSecret.type_id];
                    if (!fieldNames || !fieldNames.length) {
                        continue;
                    }
                    for (let curFieldName of fieldNames) {
                        isReqSecret = curSecret.encrypted && curSecret.encrypted.fields && curSecret.encrypted.fields[curFieldName] &&
                            (await bg$1.zcrypt.decrypt(curSecret.encrypted.fields[curFieldName], curSecret.shared) == fieldValue);
                        if (isReqSecret) {
                            return true;
                        }
                    }
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async getSecretTypeIdFieldNamesMap(fieldType) {
            try {
                const allSecretTypes = await accountDb.secretTypeTable.loadAll();
                const map = {};
                let reqFieldNames = null;
                for (let secretType of allSecretTypes) {
                    reqFieldNames = secretType.fields.filter(x => x.type == fieldType).map(x => x.name);
                    map[secretType.id] = reqFieldNames;
                }
                return map;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async getDomainMatchingSecrets(url) {
            try {
                const secretQuery = SecretQuery.newBuilder().rowsPerPage(-1).domainMatching(true, url).noLogo(true)
                    .orderByHostRecent().includeSecretData(true).build();
                const queryResult = await bg$1.vaultSecrets.secretQuerier.query(secretQuery);
                const secrets = queryResult.secrets;
                return secrets;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        getEditableSecrets(secrets) {
            try {
                const reqSecerts = [];
                let editable = false;
                for (let curSecret of secrets) {
                    editable = Secret.hasEditPermission(curSecret.sharing_level) && Secret.hasAccess(curSecret);
                    if (editable) {
                        reqSecerts.push(curSecret);
                    }
                }
                return reqSecerts;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async getMaximumDomainMatchingSecret(secrets, url) {
            try {
                secrets.sort((x, y) => this.getUpdateSortWeight(y) - this.getUpdateSortWeight(x));
                let maximumMatchedSecret = secrets[0];
                let currentMaxScore = 0;
                const reversedDomainParts = url => js.url.getHostName(url).split(".").reverse();
                function equalCount(a = [], b = []) {
                    const misMatchIndex = a.findIndex((_x, i) => a[i] != b[i]);
                    return misMatchIndex == -1 ? a.length : misMatchIndex;
                }
                const inputUrlReversedDomainParts = reversedDomainParts(url);
                const calculateUrlScore = url => equalCount(inputUrlReversedDomainParts, reversedDomainParts(url));
                const updateMaximumMatchedSecret = function (s) {
                    const score = Math.max.apply(null, s.urls.map(calculateUrlScore));
                    if (score <= currentMaxScore) {
                        return;
                    }
                    maximumMatchedSecret = s;
                    currentMaxScore = score;
                };
                secrets.forEach(updateMaximumMatchedSecret);
                return maximumMatchedSecret;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getUpdateSortWeight(secret) {
            const weight = secret.is_favourite ? 10 : 0;
            return secret.sharing_type != SecretSharingType.SHARED_TO_ME ? weight + 5 : weight;
        }
        async getExactHostnameSecret(secrets, url) {
            try {
                const domain = js.url.getHostName(url);
                const exactDomainSecret = secrets.find(s => s.urls.some(url => js.url.getHostName(url) == domain));
                return exactDomainSecret ? exactDomainSecret : null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }
    class SecretSelecterSaveCredential extends BaseFieldMatchingSecretGetter {
        async getSecretToUpdate(matchingSecrets, url) {
            try {
                const editableSecrets = this.getEditableSecrets(matchingSecrets);
                if (editableSecrets.length == 0) {
                    return null;
                }
                if (editableSecrets.length == 1) {
                    return editableSecrets[0];
                }
                const exactHostNameSecret = await this.getExactHostnameSecret(editableSecrets, url);
                if (exactHostNameSecret) {
                    return exactHostNameSecret;
                }
                const maxMatchingSecret = await this.getMaximumDomainMatchingSecret(editableSecrets, url);
                if (maxMatchingSecret) {
                    return maxMatchingSecret;
                }
                throw "INVALID_STATE";
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }
    class SecretSelecterChangedCredential extends BaseFieldMatchingSecretGetter {
        async getSecretToUpdate(changedCredential, url) {
            try {
                const domainSecrets = await this.getDomainMatchingSecrets(url);
                const editableSecrets = this.getEditableSecrets(domainSecrets);
                const passwordMatchingSecrets = Boolean(changedCredential.oldPassword) ?
                    await this.getFieldTypeValueMatchingSecrets(editableSecrets, SecretType.FIELD_TYPE.PASSWORD, changedCredential.oldPassword) :
                    editableSecrets;
                const passwordMatched = await this.hasFieldTypeValueMatchingSecrets(passwordMatchingSecrets, SecretType.FIELD_TYPE.PASSWORD, changedCredential.newPassword);
                const reqNoAction = passwordMatched || passwordMatchingSecrets.length == 0;
                if (reqNoAction) {
                    return null;
                }
                if (passwordMatchingSecrets.length == 1) {
                    return passwordMatchingSecrets[0];
                }
                const exactHostNameSecret = await this.getExactHostnameSecret(passwordMatchingSecrets, url);
                if (exactHostNameSecret) {
                    return exactHostNameSecret;
                }
                const maxMatchingSecret = await this.getMaximumDomainMatchingSecret(passwordMatchingSecrets, url);
                if (maxMatchingSecret) {
                    return maxMatchingSecret;
                }
                throw "INVALID_STATE";
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }

    class SecretToFillFieldMapper {
        secretTypeMap = null;
        async map(secrets) {
            try {
                this.secretTypeMap = await accountDb.secretTypeTable.loadMap();
                const mappedSecrets = [];
                let mappedSecret = null;
                for (let secret of secrets) {
                    try {
                        mappedSecret = await this.mapSecret(secret);
                        if (!mappedSecret) {
                            continue;
                        }
                        mappedSecrets.push(mappedSecret);
                    }
                    catch (e) {
                        logError(e);
                    }
                }
                return mappedSecrets;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async mapSecret(secret) {
            return null;
        }
        getFillFields(secret) {
            try {
                if (!Secret.hasViewPermission(secret.sharing_level)) {
                    return [];
                }
                const fillFields = [];
                const secretTypeFields = this.getFillFieldsFn(secret.type_id);
                for (let field of secretTypeFields) {
                    fillFields.push({
                        name: field.name,
                        label: field.label
                    });
                }
                return fillFields;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        getCustomColFillFields(secret) {
            try {
                if (!Secret.hasViewPermission(secret.sharing_level)) {
                    return [];
                }
                const fillFields = [];
                const allCustomColInfo = secret.customColumnTypeInfos;
                if (!allCustomColInfo || allCustomColInfo.length == 0) {
                    return [];
                }
                for (let customColInfo of allCustomColInfo) {
                    fillFields.push({
                        name: customColInfo.id,
                        label: customColInfo.label
                    });
                }
                return fillFields;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        getFillFieldsFn(typeId) {
            try {
                const secretType = this.secretTypeMap[typeId];
                const fields = [];
                for (let field of secretType.fields) {
                    if (field.isDeleted) {
                        continue;
                    }
                    switch (field.type) {
                        case SecretType.FIELD_TYPE.TEXT:
                        case SecretType.FIELD_TYPE.PASSWORD:
                            fields.push(field);
                            break;
                    }
                }
                return fields;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
    }

    class BgSiteFrame {
        async getSiteFrameSecrets(url, query) {
            try {
                const secretQuery = this.getSecretQuery(url, query);
                const secretQueryResult = await bg$1.vaultSecrets.secretQuerier.query(secretQuery);
                const siteFrameSecrets = await new SecretToSiteFrameMenuSecretMapper().map(secretQueryResult.secrets);
                return siteFrameSecrets;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async frameLogin(tabId, frameId, secretId) {
            try {
                csApi.frame.closeSiteFrame({}, tabId);
                await bg$1.vaultSecrets.secretLogin.frameLogin(tabId, frameId, secretId);
            }
            catch (e) {
                logError(e);
            }
        }
        async frameFill(tabId, frameId, secretId) {
            try {
                csApi.frame.closeSiteFrame({}, tabId);
                await bg$1.vaultSecrets.secretLogin.frameFill(tabId, frameId, secretId);
            }
            catch (e) {
                logError(e);
            }
        }
        async fillField(tabId, frameId, secretId, fieldName) {
            try {
                csApi.frame.closeSiteFrame({}, tabId);
                await bg$1.vaultSecrets.secretLogin.fillField(tabId, frameId, secretId, fieldName);
            }
            catch (e) {
                logError(e);
            }
        }
        async fillTotp(tabId, frameId, secretId) {
            try {
                csApi.frame.closeSiteFrame({}, tabId);
                await bg$1.vaultSecrets.secretLogin.fillTotp(tabId, frameId, secretId);
            }
            catch (e) {
                logError(e);
            }
        }
        async fillOneAuthTotp(tabId, frameId, secretId, oneauthId) {
            try {
                csApi.frame.closeSiteFrame({}, tabId);
                await bg$1.vaultSecrets.secretLogin.fillOneAuthTotp(tabId, frameId, secretId, oneauthId);
            }
            catch (e) {
                logError(e);
            }
        }
        async fillCustomCol(tabId, frameId, secretId, columnId) {
            try {
                csApi.frame.closeSiteFrame({}, tabId);
                await bg$1.vaultSecrets.secretLogin.fillCustomCol(tabId, frameId, secretId, columnId);
            }
            catch (e) {
                logError(e);
            }
        }
        async fillGeneratedPassword(tabId, frameId, value) {
            try {
                await csApi.login.fillGeneratedPassword(value, { tabId, frameId });
            }
            catch (e) {
                logError(e);
            }
        }
        checkSiteFrameTab(url) {
            try {
                const urlObj = new URL(url);
                return brApi.runtime.getUrl("/html/tab/SiteFrame.html") == urlObj.origin + urlObj.pathname;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        getSecretQuery(url, siteFrameQuery) {
            try {
                const queryBuilder = SecretQuery.newBuilder()
                    .rowsPerPage(siteFrameQuery.rows_per_page)
                    .searchString(siteFrameQuery.search_string)
                    .pageNo(siteFrameQuery.page_no);
                if (!this.checkSiteFrameTab(url)) {
                    queryBuilder.domainMatching(true, url).orderByHostRecent();
                }
                return queryBuilder.build();
            }
            catch (e) {
                logError(e);
                return SecretQuery.newBuilder().build();
            }
        }
        async saveGeneratedPassword(password, frameId, tabId) {
            try {
                const prefillInput = new SecretAddPreFillInput();
                prefillInput.texts.push(await this.getGeneratorSaveUsername(tabId, frameId));
                prefillInput.passwords.push(password);
                const fillFrameUrl = frameId != 0;
                if (fillFrameUrl) {
                    const frameUrl = await csApi.other.getFrameUrl({ tabId, frameId });
                    prefillInput.urls.push(frameUrl);
                }
                await bg$1.ztabHandler.addPassword(prefillInput);
            }
            catch (e) {
                logError(e);
            }
        }
        async getGeneratorSaveUsername(tabId, frameId) {
            try {
                const isConnectable = await csApi.isConnectable({ tabId, frameId });
                if (!isConnectable) {
                    throw "frame not connectable";
                }
                const username = await csApi.other.getGeneratorSaveUsername({ tabId, frameId });
                return username;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async addPassword(tabId, frameId) {
            try {
                csApi.frame.closeSiteFrame({ restoreFoucs: true }, tabId);
                await bg$1.ztabHandler.addPasswordFromTab(tabId, frameId);
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class SecretToSiteFrameMenuSecretMapper extends SecretToFillFieldMapper {
        async mapSecret(secret) {
            try {
                if (!this.secretTypeMap[secret.type_id]) {
                    return null;
                }
                const hasAccess = Secret.hasAccess(secret);
                const userName = hasAccess ? await bg$1.zcrypt.decrypt(secret.ui_text, secret.shared) : "";
                const siteFrameSecret = {
                    id: secret.id,
                    name: secret.name,
                    username: userName,
                    logo: secret.logo || secret.domain_logo,
                    favourite: secret.is_favourite,
                    hasTotp: secret.has_totp,
                    sharingLevel: secret.sharing_level,
                    hasAccess,
                    fillFields: this.getFillFields(secret),
                    customColFillFields: this.getCustomColFillFields(secret),
                    autoSubmit: secret.auto_submit,
                    createdOn: secret.created_on,
                    accessControlConfigured: secret.display_access_control_icon,
                    oneauthId: secret.oneauth_id,
                    highlight_field: secret.highlight_field
                };
                return siteFrameSecret;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }

    class BgUpdateFrame {
        async show(saveCredential, secret, tabId) {
            try {
                const updateFrameData = {
                    secretId: secret.id,
                    name: secret.name,
                    username: saveCredential.username,
                    password: saveCredential.password,
                    urls: saveCredential.urls,
                    usernameField: new FillField(),
                    passwordField: new FillField()
                };
                await this.fillUpdateUsernamePasswordFillField(updateFrameData, secret);
                await this.showUpdateFrame(updateFrameData, tabId);
            }
            catch (e) {
                logError(e);
            }
        }
        async updateChangedLoginPassword(changedLoginPassword, tabId) {
            try {
                const noUpdate = await bg$1.neverSaveChecker.checkNoNeedUpdateLoginPasswordChange(tabId);
                if (noUpdate) {
                    return;
                }
                const secret = await accountDb.secretTable.get(changedLoginPassword.secretId);
                const secretType = await accountDb.secretTypeTable.load(secret.type_id);
                const passwordField = secretType.password_fields
                    .find(x => x.name == changedLoginPassword.passwordFieldName);
                const usernameField = secretType.text_fields
                    .find(x => secret.encrypted.fields[x.name]);
                const username = await bg$1.zcrypt.decrypt(secret.encrypted.fields[usernameField.name], secret.shared);
                const updateFrameData = {
                    secretId: changedLoginPassword.secretId,
                    name: secret.name,
                    urls: secret.urls,
                    username,
                    password: changedLoginPassword.newPassword,
                    usernameField: {
                        label: usernameField.label,
                        name: usernameField.name
                    },
                    passwordField: {
                        label: passwordField.label,
                        name: passwordField.name
                    }
                };
                await this.showUpdateFrame(updateFrameData, tabId);
            }
            catch (e) {
                logError(e);
            }
        }
        async getData(tabId) {
            try {
                const updateFrameData = await bgStorage.tab.load(tabId, TabStorageKeys.UPDATE_FRAME_DATA);
                return updateFrameData;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async editPassword(tabId) {
            try {
                const updateFrameData = await this.getData(tabId);
                const secretId = updateFrameData.secretId;
                const editUIInput = await bg$1.vaultSecrets.secretEdit.getEditUIInput(secretId);
                const passwordFieldName = updateFrameData.passwordField.name;
                const plainSecretData = editUIInput.plainSecretData;
                plainSecretData[passwordFieldName] = updateFrameData.password;
                await bg$1.ztabHandler.editInput(editUIInput);
                this.close({ restoreFoucs: true }, tabId);
            }
            catch (e) {
                logError(e);
            }
        }
        async saveAsNew(tabId) {
            try {
                const updateFrameData = await this.getData(tabId);
                const saveCredential = new SaveCredential();
                saveCredential.username = updateFrameData.username;
                saveCredential.password = updateFrameData.password;
                saveCredential.urls = updateFrameData.urls;
                this.close({}, tabId);
                bg$1.saveFrame.show(saveCredential, tabId);
            }
            catch (e) {
                logError(e);
            }
        }
        async updatePassword(tabId) {
            try {
                const updateFrameData = await this.getData(tabId);
                const secretId = updateFrameData.secretId;
                const editUIInput = await bg$1.vaultSecrets.secretEdit.getEditUIInput(secretId);
                const passwordFieldName = updateFrameData.passwordField.name;
                const plainSecretData = editUIInput.plainSecretData;
                plainSecretData[passwordFieldName] = updateFrameData.password;
                const input = {
                    secretId,
                    name: editUIInput.name,
                    logo: editUIInput.logo,
                    policyId: editUIInput.policyId,
                    classification: editUIInput.classification,
                    plainSecretData: editUIInput.plainSecretData,
                    totpUrl: editUIInput.totpUrl,
                    notes: editUIInput.notes,
                    urls: editUIInput.urls,
                    tags: editUIInput.tags,
                    files: [],
                    deletedFiles: [],
                    description: editUIInput.description,
                    customColumns: editUIInput.customColumns,
                    oneauth_id: editUIInput.oneauthId
                };
                await bg$1.vaultSecrets.secretEdit.updatePassword(input);
                this.close({ restoreFoucs: true }, tabId);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async close(params, tabId) {
            try {
                await bgStorage.tab.save(tabId, TabStorageKeys.UPDATE_FRAME_DATA, null);
                await bgStorage.tab.save(tabId, TabStorageKeys.SHOWN_UPDATE_FRAME, false);
                csApi.frame.closeFrame(params, tabId);
            }
            catch (e) {
                logError(e);
            }
        }
        async showUpdateFrame(updateFrameData, tabId) {
            try {
                await bgStorage.tab.save(tabId, TabStorageKeys.UPDATE_FRAME_DATA, updateFrameData);
                await bgStorage.tab.save(tabId, TabStorageKeys.SHOWN_UPDATE_FRAME, true);
                csApi.frame.showUpdateFrame(tabId);
            }
            catch (e) {
                logError(e);
            }
        }
        async fillUpdateUsernamePasswordFillField(updateFrameData, secret) {
            try {
                const secretDataFields = secret.encrypted.fields;
                const secretType = await accountDb.secretTypeTable.load(secret.type_id);
                let isReqUsernameField = false;
                for (let field of secretType.text_fields) {
                    isReqUsernameField = secretDataFields[field.name] &&
                        ((await bg$1.zcrypt.decrypt(secretDataFields[field.name], secret.shared)) == updateFrameData.username);
                    if (isReqUsernameField) {
                        updateFrameData.usernameField.name = field.name;
                        updateFrameData.usernameField.label = field.label;
                        break;
                    }
                }
                const passwordField = secretType.password_fields[0];
                updateFrameData.passwordField.name = passwordField.name;
                updateFrameData.passwordField.label = passwordField.label;
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class PopupClient {
        apiClient;
        init() {
            this.apiClient = portApi.createApiClient();
            this.apiClient.init({ name: VtApiPortNames.POPUP });
        }
        async checkConnectable() {
            return this.apiClient.isConnectable();
        }
        async copyToClipboard(text) {
            this.apiClient.callApi({ path: this.copyToClipboard.name, args: [text] });
        }
        async oneAuthUnlockComplete(resp) {
            this.apiClient.callApi({ path: this.oneAuthUnlockComplete.name, args: [resp] });
        }
        async oneWebauthnComplete(resp) {
            this.apiClient.callApi({ path: this.oneWebauthnComplete.name, args: [resp] });
        }
        async oneAuthPushSent() {
            this.apiClient.callApi({ path: this.oneAuthPushSent.name });
        }
        async close() {
            try {
                await this.apiClient.callApi({ path: this.close.name });
            }
            catch (e) { }
        }
    }

    class ZTabClient {
        apiClient;
        init() {
            this.apiClient = portApi.createApiClient();
            this.apiClient.init({ name: VtApiPortNames.ZTAB });
        }
        async checkConnectable() {
            return this.apiClient.isConnectable();
        }
        async copyToClipboard(text) {
            this.apiClient.callApi({ path: this.copyToClipboard.name, args: [text] });
        }
        async close() {
            try {
                await this.apiClient.callApi({ path: this.close.name });
            }
            catch (e) { }
        }
    }

    class PasswordReset {
        async resetPassword(secretId, fieldName) {
            try {
                const secret = await bg$1.vaultSecrets.secretGetter.getServerSecret(secretId);
                const url = secret.urls[0];
                const domain = js.url.getParentDomain(url);
                const inProgress = await this.checkInProgress(domain);
                if (inProgress) {
                    return;
                }
                await this.addInProgress(domain);
                bg$1.vaultAudit.auditResetPasswordInitiated(secretId);
                await new PasswordReseter().resetPassword(secret, fieldName);
            }
            catch (e) {
                logError(e);
            }
        }
        async finishReset(tabId, successfull) {
            try {
                const passwordResetInfo = await bgStorage.tab.load(tabId, TabStorageKeys.RESET_DATA, null);
                await bgStorage.tab.remove(tabId, TabStorageKeys.RESET_DATA);
                const secret = await bg$1.vaultSecrets.secretGetter.getSecret(passwordResetInfo.secretId);
                const domain = js.url.getParentDomain(secret.urls[0]);
                await this.removeInProgress(domain);
                if (!successfull) {
                    bg$1.vaultAudit.auditResetPasswordFailure(secret.id);
                    await this.showNotification(secret.name, false);
                    return;
                }
                await this.saveChangedPassword(secret, passwordResetInfo);
                await this.showNotification(secret.name, true);
                bg$1.vaultAudit.auditResetPasswordSuccess(secret.id);
            }
            catch (e) {
                logError(e);
            }
        }
        async saveChangedPassword(secret, passwordResetInfo) {
            try {
                const secretId = secret.id;
                const editUIInput = await bg$1.vaultSecrets.secretEdit.getEditUIInput(secretId);
                const passwordFieldName = passwordResetInfo.fieldName;
                const plainSecretData = editUIInput.plainSecretData;
                plainSecretData[passwordFieldName] = passwordResetInfo.newPassword;
                const customColumns = editUIInput.customColumns;
                if (customColumns[customColumns.length - 1].colname.startsWith("ChangePassword")) {
                    customColumns.pop();
                }
                const input = {
                    secretId,
                    name: editUIInput.name,
                    logo: editUIInput.logo,
                    policyId: editUIInput.policyId,
                    classification: editUIInput.classification,
                    plainSecretData: editUIInput.plainSecretData,
                    totpUrl: editUIInput.totpUrl,
                    notes: editUIInput.notes,
                    urls: editUIInput.urls,
                    tags: editUIInput.tags,
                    files: [],
                    deletedFiles: [],
                    description: editUIInput.description,
                    customColumns: editUIInput.customColumns,
                    oneauth_id: editUIInput.oneauthId
                };
                await bg$1.vaultSecrets.secretEdit.updatePassword(input);
            }
            catch (e) {
                logError(e);
            }
        }
        async showNotification(secretName, successfull) {
            try {
                const RESET_NOTIFICATION = "RESET_NOTIFICATION";
                await brApi.notification.create(RESET_NOTIFICATION, {
                    type: "basic",
                    iconUrl: "/images/logo/vault-128.png",
                    title: "Password Change Notification",
                    message: `Password change attempt for ${secretName} ${successfull ? "successfull" : "failed"}.`
                });
            }
            catch (e) {
                logError(e);
            }
        }
        async checkInProgress(domain) {
            try {
                const inProgressResets = await this.getInProgressObj();
                return Boolean(inProgressResets[domain]);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async addInProgress(domain) {
            try {
                const inProgressResets = await this.getInProgressObj();
                inProgressResets[domain] = true;
                await zsessionStorage.save(SessionStorageKeys.IN_PROGRESS_RESETS, inProgressResets);
            }
            catch (e) {
                logError(e);
            }
        }
        async removeInProgress(domain) {
            try {
                const inProgressResets = await this.getInProgressObj();
                delete inProgressResets[domain];
                await zsessionStorage.save(SessionStorageKeys.IN_PROGRESS_RESETS, inProgressResets);
            }
            catch (e) {
                logError(e);
            }
        }
        async getInProgressObj() {
            try {
                const inProgressResets = await zsessionStorage.load(SessionStorageKeys.IN_PROGRESS_RESETS, {});
                return inProgressResets;
            }
            catch (e) {
                logError(e);
                return {};
            }
        }
    }
    class PasswordReseter {
        secret = null;
        secretType = null;
        launchUrl = "";
        async resetPassword(secret, fieldName) {
            try {
                this.secret = secret;
                this.secretType = await accountDb.secretTypeTable.load(secret.type_id);
                const passwordResetInfo = {
                    secretId: this.secret.id,
                    fieldName,
                    userName: await this.getUsername(),
                    oldPassword: await this.getOldPassword(fieldName),
                    newPassword: await bg$1.vaultPolicies.generatePassword(this.secret.policy_id),
                    steps: await this.getResetSteps(),
                    currentStepIndex: 0,
                    expiresIn: 0
                };
                await this.addNewPasswordAsCustomColumn(passwordResetInfo.newPassword);
                const tab = await brApi.tab.create(this.launchUrl);
                await brApi.tab.getCompletedTab(tab.id);
                passwordResetInfo.expiresIn = Date.now() + PasswordResetInfo.MAX_WAIT_TIME_MS;
                await bgStorage.tab.save(tab.id, TabStorageKeys.RESET_DATA, passwordResetInfo);
                csApi.other.resetPassword(tab.id);
            }
            catch (e) {
                logError(e);
            }
        }
        async addNewPasswordAsCustomColumn(newPassword) {
            try {
                const secret = this.secret;
                const secretId = secret.id;
                const editUIInput = await bg$1.vaultSecrets.secretEdit.getEditUIInput(secretId);
                const customColumns = editUIInput.customColumns;
                customColumns.push({
                    colname: "ChangePassword-" + new Date(),
                    id: "customColDiv_" + customColumns.length,
                    type: "password",
                    value: newPassword
                });
                const input = {
                    secretId,
                    name: editUIInput.name,
                    logo: editUIInput.logo,
                    policyId: editUIInput.policyId,
                    classification: editUIInput.classification,
                    plainSecretData: editUIInput.plainSecretData,
                    totpUrl: editUIInput.totpUrl,
                    notes: editUIInput.notes,
                    urls: editUIInput.urls,
                    tags: editUIInput.tags,
                    files: [],
                    deletedFiles: [],
                    description: editUIInput.description,
                    customColumns: editUIInput.customColumns,
                    oneauth_id: editUIInput.oneauthId
                };
                await bg$1.vaultSecrets.secretEdit.updatePassword(input);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        async getResetSteps() {
            const domain = js.url.getParentDomain(this.secret.urls[0]);
            const resp = (await vapi.getPasswordResetSteps(this.secret.id, domain)).result;
            if (!vapi.isRespOk(resp)) {
                throw (resp.operation.result.message);
            }
            const resetData = resp.operation.details.CHANGEPASSWORD[0];
            this.launchUrl = resetData.APPURL;
            return resetData.FIELDDETAILS;
        }
        async getUsername() {
            const usernameField = this.secretType.text_fields[0].name;
            const username = await bg$1.zcrypt.decrypt(this.secret.encrypted.fields[usernameField], this.secret.shared);
            return username;
        }
        async getOldPassword(fieldName) {
            const oldPassword = await bg$1.zcrypt.decrypt(this.secret.encrypted.fields[fieldName], this.secret.shared);
            return oldPassword;
        }
    }

    const Z_IDENTITY = "_z_identity";
    class LogoutHandler {
        init() {
            try {
                js.fn.bindThis(this, [this.cookieChanged]);
                brApi.cookie.onCookieChange(this.cookieChanged);
            }
            catch (e) {
                logError(e);
            }
        }
        async cookieChanged(changeInfo) {
            try {
                const staySignedIn = await zlocalStorage.load(VtSettings.STAY_SIGNED_IN, false);
                if (staySignedIn) {
                    return;
                }
                if (!oauth.isLoggedIn()) {
                    return;
                }
                const reqChange = changeInfo.removed &&
                    changeInfo.cookie.name == Z_IDENTITY &&
                    (changeInfo.cause == "expired_overwrite" || changeInfo.cause == "explicit");
                if (!reqChange) {
                    return;
                }
                const accountsDomain = new URL(urlProvider.getAccountsUrl()).host;
                const reqDomain = changeInfo.cookie.domain == accountsDomain;
                if (!reqDomain) {
                    return;
                }
                const isIncognitoSignout = await this.checkIncognitoSignout(changeInfo);
                if (isIncognitoSignout) {
                    return;
                }
                bg$1.vault.silentSignOut();
            }
            catch (e) {
                logError(e);
            }
        }
        async checkIncognitoSignout(changeInfo) {
            try {
                const storeId = changeInfo.cookie.storeId;
                const cookieStore = await brApi.cookie.getCookieStore(storeId);
                if (!cookieStore || cookieStore.tabIds.length == 0) {
                    return true;
                }
                const tab = await brApi.tab.getTab(cookieStore.tabIds[0]);
                return tab.incognito ?? false;
            }
            catch (e) {
                logError(e);
                return true;
            }
        }
    }

    class ThemeHandler {
        async setColor(color) {
            await zlocalStorage.save(VtSettings.THEME, color);
            bgEventServer.settings.themeChanged();
            await bg$1.vaultSettings.changeSettingInServer(bg$1.vaultSettings.SERVER_NAME.THEME, color.toUpperCase() + "THEME");
        }
        async setDarkMode(enable) {
            await zlocalStorage.save(VtSettings.DARK_MODE, enable);
            bgEventServer.settings.themeChanged();
            await bg$1.vaultSettings.changeSettingInServer(bg$1.vaultSettings.SERVER_NAME.DARK_MODE, (+enable) + "");
        }
        async setFont(font) {
            await zlocalStorage.save(VtSettings.FONT, font);
            bgEventServer.settings.themeChanged();
            await bg$1.vaultSettings.changeSettingInServer(bg$1.vaultSettings.SERVER_NAME.FONT, font.toLowerCase());
        }
    }

    class OneAuthTotp {
        deviceId = null;
        notificationName = "OneAuthTotp";
        async sync() {
            try {
                const totpLookupApi = await this.getAccountsAPI("/signin/v2/lookup/self?mode=extension");
                const response = await fetch(totpLookupApi, { method: "POST",
                    headers: await vapi.fetch.getHeaders()
                });
                const resp = await response.json();
                if (resp.status_code == 201) {
                    for (let device of resp.lookup.device) {
                        if (device.is_primary) {
                            this.deviceId = device.device_id;
                            zlocalStorage.save(LocalStorageKeys.ONEAUTH_TOTP_DEVICE, device);
                            break;
                        }
                    }
                    zlocalStorage.save(LocalStorageKeys.ONEAUTH_TOTP_SECRETS, resp.lookup.tp_data != undefined ? resp.lookup.tp_data : []);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async getAccountsAPI(endpoint) {
            return urlProvider.getAccountsUrl() + endpoint;
        }
        async getDeviceId() {
            if (this.deviceId != null) {
                return this.deviceId;
            }
            const oneAuthDevice = await zlocalStorage.load(LocalStorageKeys.ONEAUTH_TOTP_DEVICE, "");
            if (!oneAuthDevice) {
                return null;
            }
            return oneAuthDevice.device_id;
        }
        async getTotp(oneauthId) {
            const token = await this.pushNotification(oneauthId);
            if (token != null) {
                await this.showDesktopNotification();
                await js.time.delay(5);
                const totp = await this.getOneAuthResponse(token);
                await this.clearDesktopNotification();
                return totp;
            }
            return null;
        }
        async pushNotification(oneauthId) {
            const deviceId = await this.getDeviceId();
            if (deviceId == null) {
                return null;
            }
            const param = JSON.stringify({ sendpushnotify: { app_id: oneauthId } });
            const pushAPI = await this.getAccountsAPI("/api/v1/extension/self/device/" + deviceId + "/push");
            const response = await fetch(pushAPI, {
                method: "POST",
                headers: await vapi.fetch.getHeaders(VFetchContentType.JSON), body: param
            });
            const data = await response.json();
            if (data.message == "device push status sent" && data.status_code == 201) {
                return data.sendpushnotify.token;
            }
            return null;
        }
        async pollOneAuthServer(token) {
            const deviceId = await this.getDeviceId();
            if (deviceId == null) {
                return;
            }
            const pollAPI = await this.getAccountsAPI("/api/v1/extension/self/device/" + deviceId + "/poll");
            const headers = await vapi.fetch.getHeaders();
            headers["Z-authorization"] = "Zoho-oauthtoken " + token;
            const response = await fetch(pollAPI, {
                method: "PUT",
                headers
            });
            return await response.json();
        }
        async getOneAuthResponse(token, count = 0) {
            const pollData = await this.pollOneAuthServer(token);
            if (pollData.status_code == 200) {
                if (pollData.code == "D101" && pollData.verifypushnotify[0].totp != undefined) {
                    const totp = pollData.verifypushnotify[0].totp;
                    return totp;
                }
            }
            else if (pollData.status_code == 500 && pollData.errors[0].code == "D102" && count < 20) {
                await js.time.delay(3);
                return await this.getOneAuthResponse(token, ++count);
            }
            return null;
        }
        async showDesktopNotification() {
            await this.clearDesktopNotification();
            await brApi.notification.create(this.notificationName, {
                type: "basic",
                iconUrl: "/images/logo/vault-128.png",
                title: i18n(VI18N.ONEAUTH_NOTIFICATION_PUSHED),
                message: i18n(VI18N.ONEAUTH_APPROVE_MESSAGE)
            });
        }
        async clearDesktopNotification() {
            await brApi.notification.clear(this.notificationName);
        }
    }

    class BgVaultUser {
        static DEFAULT_DP = "/images/user/profile.svg";
        constructor() {
            this.getDpOf = js.fn.wrapper.createSingleInstance(this.getDpOf, this);
        }
        async getDpSized(size) {
            try {
                const zuid = await zlocalStorage.load(LocalStorageKeys.ZUID, "");
                const blob = await vapi.contacts.getSizedDpFromServer(zuid, size);
                return await this.readBlobAsDataUrl(blob.result);
            }
            catch (e) {
                logError(e);
                return BgVaultUser.DEFAULT_DP;
            }
        }
        async getDp() {
            try {
                const zuid = await zlocalStorage.load(LocalStorageKeys.ZUID, "");
                if (!zuid) {
                    return BgVaultUser.DEFAULT_DP;
                }
                const existing = await zlocalStorage.load(LocalStorageKeys.DP, "");
                if (existing) {
                    return existing;
                }
                return this.getDpFromServer();
            }
            catch (e) {
                logError(e);
                return BgVaultUser.DEFAULT_DP;
            }
        }
        async getDpFromServer() {
            try {
                const zuid = await zlocalStorage.load(LocalStorageKeys.ZUID, "");
                const blob = await vapi.contacts.getDpNoCache(zuid);
                const dp = await this.readBlobAsDataUrl(blob.result);
                if (!this.isValidDp(dp)) {
                    return BgVaultUser.DEFAULT_DP;
                }
                await zlocalStorage.save(LocalStorageKeys.DP, dp);
                return dp;
            }
            catch (e) {
                logError(e);
                return BgVaultUser.DEFAULT_DP;
            }
        }
        async getDpOf(zuid) {
            try {
                const blob = await vapi.contacts.getDp(zuid);
                const dp = await this.readBlobAsDataUrl(blob.result);
                if (!this.isValidDp(dp)) {
                    return BgVaultUser.DEFAULT_DP;
                }
                return dp;
            }
            catch (e) {
                logError(e);
                return BgVaultUser.DEFAULT_DP;
            }
        }
        isValidDp(dp) {
            return Boolean(dp) && !dp.includes("html");
        }
        async readBlobAsDataUrl(blob) {
            return await new Promise(function (res, rej) {
                const fr = new FileReader();
                fr.onload = () => res(fr.result);
                fr.onerror = () => rej("error: reading dp");
                fr.readAsDataURL(blob);
            });
        }
        async searchUsers(searchString) {
            return new BaseServerUserSearcher().search(searchString);
        }
        async searchAdmins(searchString) {
            return new ServerAdminUserSearcher().search(searchString);
        }
    }
    class BaseServerUserSearcher {
        async search(searchString) {
            try {
                const apiParams = this.getSearchParams(searchString);
                const users = await this.getUsersFromServer(apiParams);
                return users;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        getSearchParams(searchString) {
            const params = {
                currentUser: false,
                status: "active",
                searchString: regexUtil.getApiSearchString(searchString),
                pageNumber: 1,
                rowsPerPage: 50
            };
            return params;
        }
        async getUsersFromServer(filterParams) {
            try {
                const resp = await VaultApi.getChecked("/api/rest/json/v1/user/filter", filterParams);
                const reqUsers = [];
                for (let user of resp.operation.Details.users) {
                    reqUsers.push({
                        userAutoId: user.user_auto_id,
                        name: user.username,
                        email: user.email,
                        zuid: user.zuid
                    });
                }
                return reqUsers;
            }
            catch (e) {
                throw jserror(e);
            }
        }
    }
    class ServerAdminUserSearcher extends BaseServerUserSearcher {
        getSearchParams(searchString) {
            const params = { ...super.getSearchParams(searchString), role: "Admin" };
            return params;
        }
    }

    class NeverSaveUrls {
        STAR_PREFIX = "*.";
        async sync() {
            try {
                const resp = (await vapi.settings.neverSave.getAll()).result;
                const domainSet = new Set(resp.operation.Details.domains);
                const neverSaveDomains = js.array.toArray(domainSet.values());
                await accountDb.neverSaveTable.saveAll(neverSaveDomains);
            }
            catch (e) {
                logError(e);
            }
        }
        async addDomain(domain) {
            try {
                const resp = (await vapi.settings.neverSave.add(domain)).result;
                if (!vapi.isRespOk(resp)) {
                    throw resp.operation.result.message;
                }
                await accountDb.neverSaveTable.add(domain);
                return fnOut.OK;
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async removeDomain(domain) {
            try {
                const resp = (await vapi.settings.neverSave.remove(domain)).result;
                if (!vapi.isRespOk(resp)) {
                    throw resp.operation.result.message;
                }
                await accountDb.neverSaveTable.remove(domain);
                return fnOut.OK;
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async isNeverSaveUrl(url) {
            try {
                const domain = js.url.getHostName(url);
                if (await this.isNeverSaveDomain(domain)) {
                    return true;
                }
                const parts = domain.split(".");
                for (let i = 0; i < parts.length; i++) {
                    if (await this.isNeverSaveStarDomain(parts, i)) {
                        return true;
                    }
                }
                return false;
            }
            catch (e) {
                logError(e);
                return true;
            }
        }
        async isNeverSaveStarDomain(parts, i) {
            const domain = this.STAR_PREFIX + parts.slice(i).join(".");
            return this.isNeverSaveDomain(domain);
        }
        async isNeverSaveDomain(domain) {
            return accountDb.neverSaveTable.has(domain);
        }
    }

    class VaultAudit {
        async fieldViewed(secretId, fieldName) {
            return new SecretAudit({
                action: SecretAuditAction.VIEWED,
                label: {
                    type: SecretAuditLabelType.FIELD,
                    value: { fieldName }
                },
                secretId
            }).audit();
        }
        async viewedCustomcolumn(secretId, columnId) {
            return new SecretAudit({
                action: SecretAuditAction.VIEWED,
                label: {
                    type: SecretAuditLabelType.CUSTOM_COL,
                    value: { columnId }
                },
                secretId
            }).audit();
        }
        async auditSecretAccessed(secretId) {
            try {
                const secret = await bg$1.vaultSecrets.secretGetter.getDbSecret(secretId);
                const MAX_TIME_SECONDS = 3;
                const elapsedSeconds = (Date.now() - secret.fetchedOn) / 1000;
                if (elapsedSeconds < MAX_TIME_SECONDS) {
                    return;
                }
                await VaultApi.post("/api/rest/json/v1/audit/secrets/accessed", "secretid=" + secretId);
            }
            catch (e) {
                logError(e);
            }
        }
        async fieldCopied(secretId, fieldName) {
            return new SecretAudit({
                action: SecretAuditAction.COPIED,
                label: {
                    type: SecretAuditLabelType.FIELD,
                    value: { fieldName }
                },
                secretId
            }).audit();
        }
        async totpCopied(secretId) {
            return new SecretAudit({
                action: SecretAuditAction.COPIED,
                label: {
                    type: SecretAuditLabelType.TOTP,
                },
                secretId
            }).audit();
        }
        async notesCopied(secretId) {
            return new SecretAudit({
                action: SecretAuditAction.COPIED,
                label: {
                    type: SecretAuditLabelType.NOTES,
                },
                secretId
            }).audit();
        }
        async auditTotpKeyViewed(secretId) {
            await VaultApi.post("/api/rest/json/v1/audit/secrets/viewedtotp", "secretid=" + secretId);
        }
        async customColumnCopied(secretId, columnId) {
            return new SecretAudit({
                action: SecretAuditAction.COPIED,
                label: {
                    type: SecretAuditLabelType.CUSTOM_COL,
                    value: { columnId }
                },
                secretId
            }).audit();
        }
        async auditLogin(secretId) {
            return new SecretMAudit({
                type: SecretMAuditType.SECRET_ACCESSED,
                secretId,
                message: "Login attempt made",
            }).audit();
        }
        async auditFill(secretId) {
            return new SecretMAudit({
                type: SecretMAuditType.SECRET_ACCESSED,
                secretId,
                message: "Password Filled",
            }).audit();
        }
        async auditFillField(secretId, fieldLabel) {
            return new SecretMAudit({
                type: SecretMAuditType.SECRET_ACCESSED,
                secretId,
                message: "Filled " + fieldLabel,
            }).audit();
        }
        async auditResetPasswordInitiated(secretId) {
            return new SecretMAudit({
                type: SecretMAuditType.PASSCHANGE_INITIATED,
                secretId,
            }).audit();
        }
        async auditResetPasswordSuccess(secretId) {
            return new SecretMAudit({
                type: SecretMAuditType.PASSCHANGE_SUCCESS,
                secretId,
            }).audit();
        }
        async auditResetPasswordFailure(secretId) {
            return new SecretMAudit({
                type: SecretMAuditType.PASSCHANGE_FAILED,
                secretId,
            }).audit();
        }
    }
    var SecretAuditAction;
    (function (SecretAuditAction) {
        SecretAuditAction["COPIED"] = "copied";
        SecretAuditAction["VIEWED"] = "viewed";
    })(SecretAuditAction || (SecretAuditAction = {}));
    var SecretAuditLabelType;
    (function (SecretAuditLabelType) {
        SecretAuditLabelType["FIELD"] = "FIELD";
        SecretAuditLabelType["TOTP"] = "TOTP";
        SecretAuditLabelType["NOTES"] = "NOTES";
        SecretAuditLabelType["CUSTOM_COL"] = "CUSTOM_COL";
    })(SecretAuditLabelType || (SecretAuditLabelType = {}));
    class SecretAudit {
        param;
        constructor(param) {
            this.param = param;
        }
        async audit() {
            try {
                const labelValueGetter = new LabelValueGetter(this.param);
                const label = await labelValueGetter.getLabel();
                const input = {
                    secretid: this.param.secretId,
                    name: label,
                    isPassField: labelValueGetter.isPasswordField ? STRING.TRUE : STRING.FALSE
                };
                await VaultApi.post(this.getEndpoint(), input);
            }
            catch (e) {
                logError(e);
            }
        }
        getEndpoint() {
            return `/api/rest/json/v1/audit/secrets/${this.param.action}`;
        }
    }
    class LabelValueGetter {
        param;
        isPasswordField = false;
        constructor(param) {
            this.param = param;
        }
        async getLabel() {
            try {
                switch (this.param.label.type) {
                    case SecretAuditLabelType.FIELD:
                        return this.getFieldLabel();
                    case SecretAuditLabelType.CUSTOM_COL:
                        return this.getCustomColLabel();
                    case SecretAuditLabelType.NOTES:
                        return "Notes";
                    case SecretAuditLabelType.TOTP:
                        return "TOTP";
                    default:
                        throw "NEW_CASE";
                }
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async getFieldLabel() {
            try {
                const secret = await bg$1.vaultSecrets.secretGetter.getDbOrTrashedSecret(this.param.secretId);
                const secretType = await accountDb.secretTypeTable.load(secret.type_id);
                const secretTypeField = secretType.fields.find(x => x.name == this.param.label.value.fieldName);
                if (!secretTypeField) {
                    throw "cannot find secret type field";
                }
                this.isPasswordField = secretTypeField.type == SecretType.FIELD_TYPE.PASSWORD;
                return secretTypeField.label;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async getCustomColLabel() {
            try {
                const secret = await bg$1.vaultSecrets.secretGetter.getSecret(this.param.secretId);
                const column = secret.encrypted.custom_columns.find(x => x.id == this.param.label.value.columnId);
                if (!column) {
                    throw "cannot find column";
                }
                this.isPasswordField = column.type == SecretType.FIELD_TYPE.PASSWORD;
                return column.colname;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
    }
    var SecretMAuditType;
    (function (SecretMAuditType) {
        SecretMAuditType["SECRET_ACCESSED"] = "SecretAccessed";
        SecretMAuditType["PASSCHANGE_INITIATED"] = "AutoPasswordChangeInitiated";
        SecretMAuditType["PASSCHANGE_SUCCESS"] = "AutoPasswordChangeSuccess";
        SecretMAuditType["PASSCHANGE_FAILED"] = "AutoPasswordChangeFailed";
    })(SecretMAuditType || (SecretMAuditType = {}));
    class SecretMAudit {
        param;
        constructor(param) {
            this.param = param;
        }
        async audit() {
            try {
                const secret = await accountDb.secretTable.get(this.param.secretId);
                const input = {
                    operatedOnId: this.param.secretId,
                    operatedOnName: secret.name,
                    operationType: this.param.type,
                    scope: 2,
                    reason: this.param.message || "",
                };
                const inputData = JSON.stringify({ operationDetails: [input] });
                const body = "INPUT_DATA=" + encodeURIComponent(inputData);
                await VaultApi.post("/api/json/audit?OPERATION_NAME=M_AUDIT", body);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class VaultConfig {
        async isAddPasswordDisabled() {
            try {
                const addEnabled = await zlocalStorage.load(LocalStorageKeys.ALLOW_ADD_SECRET, true);
                return !addEnabled;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async getAddPasswordClassifications() {
            try {
                const existing = await zlocalStorage.loadAll({
                    [LocalStorageKeys.IS_PERSONAL_PLAN]: false,
                    [LocalStorageKeys.ALLOW_PERSONAL_SECRET]: true,
                    [LocalStorageKeys.ALLOW_ENTERPRISE_SECRET]: true,
                    [LocalStorageKeys.ALLOW_ADD_SECRET]: true,
                });
                if (existing[LocalStorageKeys.IS_PERSONAL_PLAN]) {
                    return [SecretClassification.PERSONAL];
                }
                if (!existing[LocalStorageKeys.ALLOW_ADD_SECRET]) {
                    return [];
                }
                const allowedClassification = [];
                if (existing[LocalStorageKeys.ALLOW_PERSONAL_SECRET]) {
                    allowedClassification.push(SecretClassification.PERSONAL);
                }
                if (existing[LocalStorageKeys.ALLOW_ENTERPRISE_SECRET]) {
                    allowedClassification.push(SecretClassification.ENTERPRISE);
                }
                return allowedClassification;
            }
            catch (e) {
                logError(e);
                return [SecretClassification.PERSONAL];
            }
        }
    }

    class VaultFolders {
        async sync() {
            try {
                const resp = (await vapi.getAllFolders()).result;
                const resp_folders = resp.operation.Details;
                const folders = [];
                let folder;
                const subfolder_set = new Set();
                for (let resp_folder of resp_folders) {
                    try {
                        folder = new Folder();
                        folder.id = resp_folder.chamberid;
                        folder.parent_id = resp_folder.parentchid;
                        folder.name = resp_folder.chambername;
                        folder.name_lowercase = folder.name.toLocaleLowerCase();
                        folder.path = resp_folder.path;
                        folder.path_parts = folder.path.split("\\");
                        if (resp_folder.isshared) {
                            folder.shared = true;
                            folder.sharing_type = resp_folder.sharingtype;
                            folder.sharing_level = resp_folder.sharinglevel;
                        }
                        subfolder_set.add(folder.parent_id);
                        folders.push(folder);
                    }
                    catch (e) {
                        logError(e);
                    }
                }
                for (let folder of folders) {
                    folder.has_subfolder = subfolder_set.has(folder.id);
                }
                await accountDb.folderTable.saveAll(folders);
            }
            catch (e) {
                logError(e);
            }
        }
        async getFolderSecrets(folderId) {
            try {
                const respSecrets = await this.getFolderSecretsFromServer(folderId);
                const secrets = await bg$1.vaultSecrets.secretParser.parseAll(respSecrets);
                await accountDb.secretTable.saveAll(secrets);
                const secret_ids = secrets.map(x => x.id);
                await accountDb.folderSecretMapTable.save(folderId, secret_ids);
                return secrets;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async getFolderSecretsFromServer(folderId) {
            try {
                const LIMIT = 1000;
                let resp = null;
                let respSecrets = null;
                const allSecrets = [];
                for (let pageNo = 0; pageNo < 100; pageNo++) {
                    resp = (await vapi.secret.getAll({ pageNo, rowsPerPage: LIMIT, chamberId: folderId })).result;
                    respSecrets = resp.operation.Details;
                    allSecrets.push(...respSecrets);
                    if (respSecrets.length < LIMIT || respSecrets.length == 0) {
                        break;
                    }
                    const curFetchCount = (pageNo * LIMIT) + respSecrets.length;
                    const totalCount = resp.operation.meta.secretcount;
                    if (curFetchCount == totalCount) {
                        break;
                    }
                }
                return allSecrets;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
    }

    class VaultPolicies {
        async sync() {
            try {
                const resp = await VaultApi.getChecked("/api/json/secrets?OPERATION_NAME=GET_PASSWORD_POLICIES");
                const policy_usage = resp.operation.details.POLICY_USAGE;
                await zlocalStorage.save(LocalStorageKeys.POLICY_USAGE, policy_usage);
                const policies = [];
                let policy;
                let default_policy_id = "0";
                for (let resp_policy of resp.operation.details.POLICIES) {
                    policy = new Policy();
                    policy.id = resp_policy.PASSWDRULE_AUTO_ID;
                    policy.name = resp_policy.PASSWDRULENAME;
                    policy.min_length = resp_policy.MINLENGTH;
                    policy.max_length = resp_policy.MAXLENGTH;
                    policy.req_lowercase = true;
                    policy.req_uppercase = resp_policy.REQMIXEDCASE;
                    policy.req_number = resp_policy.REQNUMERALS;
                    policy.req_splchar = resp_policy.REQSPCLCHAR;
                    policy.no_of_splchar = resp_policy.NUMOFSPCLCHAR;
                    policy.start_with_letter = resp_policy.BEGINWITHLETTER;
                    policy.is_default = Boolean(resp_policy.ISDEFAULT);
                    if (policy.is_default) {
                        default_policy_id = policy.id;
                    }
                    policy.age = resp_policy.PASSWORDAGE ?? 0;
                    policy.exclude_chars = resp_policy.NOTREQCHARS || "";
                    policies.push(policy);
                }
                policies.push(Policy.getCustomPolicy());
                await accountDb.policyTable.saveAll(policies);
                await zlocalStorage.save(LocalStorageKeys.DEFAULT_POLICY_ID, default_policy_id);
            }
            catch (e) {
                logError(e);
            }
        }
        async getDefaultPolicy() {
            try {
                const defaultPolicyId = await zlocalStorage.load(LocalStorageKeys.DEFAULT_POLICY_ID, "");
                const defaultPolicy = await accountDb.policyTable.load(defaultPolicyId);
                return defaultPolicy;
            }
            catch (e) {
                logError(e);
                return new Policy();
            }
        }
        async getPolicyOrDefault(policyId) {
            try {
                if (!policyId) {
                    return this.getDefaultPolicy();
                }
                const policy = await accountDb.policyTable.load(policyId);
                return policy || this.getDefaultPolicy();
            }
            catch (e) {
                logError(e);
                return new Policy();
            }
        }
        async generatePassword(policyId) {
            try {
                const policy = await this.getPolicyOrDefault(policyId);
                const generatorInput = {
                    length: policy.max_length,
                    startWithLetter: policy.start_with_letter,
                    excludeChars: policy.exclude_chars,
                    noOfSplChar: policy.no_of_splchar,
                    reqSplChar: policy.req_splchar,
                    reqLowercase: policy.req_lowercase,
                    reqUppercase: policy.req_uppercase,
                    reqNumber: policy.req_number
                };
                const password = await generator.password.generate(generatorInput);
                return password;
            }
            catch (e) {
                logError(e);
                const defaultInput = GeneratorInput.createDefaultInput();
                return generator.password.generate(defaultInput);
            }
        }
        async checkPolicyFor(password) {
            try {
                const defaultPolicyId = await zlocalStorage.load(LocalStorageKeys.DEFAULT_POLICY_ID, "");
                return this.checkPasswordPolicy(password, defaultPolicyId);
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async checkPasswordPolicy(password, policyId) {
            try {
                const policyUsage = await zlocalStorage.load(LocalStorageKeys.POLICY_USAGE, Policy.USAGE.DEFAULT);
                if (policyUsage == Policy.USAGE.DEFAULT) {
                    return "";
                }
                const policy = await accountDb.policyTable.load(policyId);
                if (!policy) {
                    return "";
                }
                const errorMsg = this.validatePasswordLength(password, policy) ||
                    this.validatePasswordRequirements(password, policy) ||
                    this.validatePasswordExcludeChars(password, policy);
                return errorMsg;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        validatePasswordExcludeChars(password, policy) {
            try {
                const excluded_chars_present = new Set();
                for (let ch of policy.exclude_chars) {
                    if (!password.includes(ch)) {
                        continue;
                    }
                    excluded_chars_present.add(ch);
                }
                if (excluded_chars_present.size > 0) {
                    const excludeCharString = Array.from(excluded_chars_present.values()).join(", ");
                    return `Characters ${excludeCharString} are not allowed in password.`;
                }
                return "";
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        validatePasswordRequirements(password, policy) {
            try {
                const letter_regex = /[a-zA-Z\P{ASCII}]/u;
                if (policy.start_with_letter && !letter_regex.test(password[0])) {
                    return "Password must begin with alphabet.";
                }
                const lowercase_regex = /[a-z\P{ASCII}]/u;
                const uppercase_rgex = /[A-Z\P{ASCII}]/u;
                const number_regex = /[0-9]/;
                const alphanum_regex = /[a-zA-Z0-9\P{ASCII}]/gu;
                if (!policy.req_uppercase) {
                }
                else if (!uppercase_rgex.test(password)) {
                    return "Password must contain at least one Uppercase letter.";
                }
                else if (!lowercase_regex.test(password)) {
                    return "Password must contain at least one lowercase letter.";
                }
                if (policy.req_number && !number_regex.test(password)) {
                    return "Password must contain at least one number.";
                }
                if (policy.req_splchar) {
                    const special_char_count = password.replace(alphanum_regex, "").length;
                    if (policy.req_splchar && special_char_count < policy.no_of_splchar) {
                        const minCount = (policy.no_of_splchar || 1);
                        return `Password must contain at least ${minCount} special characters.`;
                    }
                }
                return "";
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        validatePasswordLength(password, policy) {
            try {
                if (!password.length) {
                    return "Please enter your password";
                }
                if (password.length < policy.min_length) {
                    return `Password must have minimum ${policy.min_length} characters.`;
                }
                return "";
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
    }

    class VaultSettings {
        parser = new ServerSettingParser();
        SERVER_VALUE = {
            ENABLED: "Enabled",
            DISABLED: "Disabled",
        };
        SERVER_NAME = {
            ONEAUTH_UNLOCK: "ONEAUTH_UNLOCK",
            WEBAUTHN_UNLOCK: "WEBAUTHN_UNLOCK",
            DARK_MODE: "nightMode",
            THEME: "theme",
            FONT: "webfont",
        };
        async changeSettingFromUI(name, value) {
            const reqServerValue = this.getServerSettingValue(name, value);
            const reqServerName = this.getServerSettingName(name);
            await this.changeSettingInServer(reqServerName, reqServerValue);
            await zlocalStorage.save(name, value);
            bgEventServer.settings.settingChanged(name, value);
            switch (name) {
                case LocalStorageKeys.DOMAIN_MATCH_MODE:
                    domainHandler.modeChanged();
                    break;
                case LocalStorageKeys.INACTIVE_TIMEOUT:
                    inactivityHandler.synced();
                    break;
            }
        }
        async changeSettingInServer(serverName, serverValue) {
            try {
                switch (serverName) {
                    case VtSettings.LOCK_ON_SYSTEM_LOCK:
                    case VtSettings.STAY_SIGNED_IN:
                    case VtSettings.DISABLE_BADGE_COUNT:
                    case VtSettings.DISABLE_WEBSITE_VAULT_ICON:
                    case VtSettings.DISABLE_WEBSITE_KEYBOARD_SHORTCUT:
                    case LocalStorageKeys.DOMAIN_MATCH_MODE:
                    case VtSettings.DISABLE_SHADOW_ROOT:
                        (await vapi.settings.changeExtSetting(serverName, serverValue)).result;
                        break;
                    default:
                        (await vapi.settings.change(serverName, serverValue)).result;
                        break;
                }
                return fnOut.OK;
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        getServerSettingName(name) {
            const X = LocalStorageKeys;
            switch (name) {
                case X.CLEAR_CLIPBOARD: return "EXT_CLEAR_CLIPBOARD";
                case X.INACTIVE_TIMEOUT: return "EXT_TIMEOUT";
                case X.AUTO_SAVE_UPDATE_PASSWORDS: return "EXT_SAVE_PROMPT";
                case X.INSECURE_PAGE_PROMPT: return "EXT_INSECURE_PAGE_PROMPT";
                case X.DEFAULT_FILTER: return "EXT_DEFAULT_FILTER";
                case X.CARD_AUTOFILL_SUBDOMAIN: return "EXT_CARD_AUTOFILL_SUBDOMAIN";
                case X.CARD_SAVE_PROMPT: return "EXT_CARD_SAVE_PROMPT";
                case VtSettings.DARK_MODE: return "nightMode";
                case VtSettings.THEME: return "theme";
                case VtSettings.FONT: return "webfont";
                default: return name;
            }
        }
        getServerSettingValue(name, value) {
            const X = LocalStorageKeys;
            switch (name) {
                case X.DOMAIN_MATCH_MODE:
                    return JSON.stringify(value);
                case X.ONEAUTH_UNLOCK_ENABLED:
                    return value ? this.SERVER_VALUE.ENABLED : this.SERVER_VALUE.DISABLED;
                default:
                    return value;
            }
        }
        async sync(configSyncPromise) {
            try {
                const resp = await vapi.settings.getAll();
                const settings = resp.result.operation.Details;
                const saveSetting = {};
                for (let key in settings) {
                    this.setSetting(key, settings[key], saveSetting);
                }
                await configSyncPromise;
                const parsedSettings = await this.parser.parse(saveSetting);
                await zlocalStorage.saveAll(parsedSettings);
            }
            catch (e) {
                logError(e);
            }
        }
        setSetting(name, value, settingObj) {
            try {
                switch (name) {
                    case VtSettings.STAY_SIGNED_IN:
                    case VtSettings.LOCK_ON_SYSTEM_LOCK:
                    case VtSettings.DISABLE_BADGE_COUNT:
                    case VtSettings.DISABLE_WEBSITE_VAULT_ICON:
                    case VtSettings.DISABLE_WEBSITE_KEYBOARD_SHORTCUT:
                    case VtSettings.DISABLE_CLICK_TO_LOGIN:
                    case VtSettings.DISABLE_SHADOW_ROOT:
                        settingObj[name] = (value == STRING.TRUE);
                        return;
                    case LocalStorageKeys.DOMAIN_MATCH_MODE:
                        settingObj[name] = value;
                        break;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        supportsSystemLock() {
            try {
                return Boolean(chrome?.idle?.IdleState?.LOCKED);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }
    class ServerSettingParser {
        settingObj;
        async parse(settingObj) {
            try {
                this.settingObj = settingObj;
                await Promise.all([
                    this.setDomainMatch()
                ]);
            }
            catch (e) {
                logError(e);
            }
            return settingObj;
        }
        async setDomainMatch() {
            try {
                this.settingObj[LocalStorageKeys.DOMAIN_MATCH_MODE] = await this.getServerDomainMatch();
            }
            catch (e) {
                logError(e);
            }
        }
        async getServerDomainMatch() {
            const defaultModeObj = {
                scheme: false,
                subDomain: false,
                port: false,
                path: false,
            };
            try {
                const serverString = this.settingObj[LocalStorageKeys.DOMAIN_MATCH_MODE];
                if (!serverString) {
                    const domainMatchingMode = await zlocalStorage.load(LocalStorageKeys.DOMAIN_MATCHING_MODE_OLD, zenum.DOMAIN_MATCHING_MODE.PARENT_DOMAIN);
                    return {
                        subDomain: domainMatchingMode == zenum.DOMAIN_MATCHING_MODE.HOSTNAME
                    };
                }
                const serverObj = JSON.parse(serverString);
                return Object.assign(defaultModeObj, serverObj);
            }
            catch (e) {
                logError(e);
                return defaultModeObj;
            }
        }
    }

    var VtColors;
    (function (VtColors) {
        VtColors["BLUE"] = "blue";
        VtColors["RED"] = "red";
        VtColors["GREEN"] = "green";
        VtColors["ORANGE"] = "orange";
        VtColors["PURPLE"] = "purple";
    })(VtColors || (VtColors = {}));

    class Theme {
        static FONT = {
            OPENSANS: "OPENSANS",
            ZOHOPUVI: "ZOHOPUVI"
        };
        static instance = null;
        static get inst() {
            return this.instance || (this.instance = new Theme());
        }
        static async loadTheme() {
            const keyObj = {
                [VtSettings.THEME]: VtColors.BLUE,
                [VtSettings.DARK_MODE]: false,
                [VtSettings.FONT]: Theme.FONT.ZOHOPUVI
            };
            const stored = await zlocalStorage.loadAll(keyObj);
            const vaultTheme = {
                color: stored[VtSettings.THEME],
                darkMode: stored[VtSettings.DARK_MODE],
                font: stored[VtSettings.FONT],
            };
            return vaultTheme;
        }
        init() {
            this.refreshTheme();
        }
        async setColor(color) {
            return bgApi.settings.setThemeColor(color);
        }
        async setDarkMode(enable) {
            return bgApi.settings.setDarkMode(enable);
        }
        async setFont(font) {
            return bgApi.settings.setFont(font);
        }
        async refreshTheme() {
            const theme = await Theme.loadTheme();
            const fontClass = this.getFontClass(theme.font);
            const skinColor = "skin-" + theme.color;
            const darkModeClasss = theme.darkMode ? skinColor + "-nightmode nightmode" : "";
            const className = `${this.getThemeClass()} ${skinColor} ${fontClass} ${darkModeClasss}`;
            document.body.className = className;
            this.refreshUI(theme.color, theme.darkMode);
        }
        refreshUI(color, darkMode) {
        }
        getThemeClass() {
            return "";
        }
        getFontClass(font) {
            switch (font) {
                case Theme.FONT.ZOHOPUVI: return "zvf-zohopuvi";
                case Theme.FONT.OPENSANS:
                default:
                    return "zvf-opensans";
            }
        }
    }
    setGlobal(Theme.name, Theme);

    class VaultExpSettings {
        async sync() {
            try {
                const initSettings = this.getDefaultExpSettings();
                await zlocalStorage.saveAll(initSettings);
                const serverSettings = (await vapi.settings.getExperimentalSettings()).result;
                for (let key in initSettings) {
                    if (serverSettings[key]) {
                        initSettings[key] = serverSettings[key];
                    }
                }
                await zlocalStorage.saveAll(initSettings);
                devToolsHandler.initSkipTabCheck();
            }
            catch (e) {
                logError(e);
            }
        }
        getDefaultExpSettings() {
            return {
                [LocalStorageKeys.ONE_CLICK_PASS_CHANGE_CHECK]: STRING.TRUE,
                [LocalStorageKeys.NEW_PLAIN_PASS_CHECK]: STRING.TRUE,
                [LocalStorageKeys.USE_OLD_FILL]: STRING.FALSE,
                [LocalStorageKeys.USE_OLD_DEVTOOLS_CHECK]: STRING.FALSE,
                [LocalStorageKeys.SKIP_ONE_CLICK_BG_CONNECT_CHECK]: STRING.FALSE,
                [LocalStorageKeys.SKIP_ONE_CLICK_TAB_CHECK]: STRING.FALSE,
                [LocalStorageKeys.SKIP_DISC_PASSWORD_CHECK]: STRING.FALSE,
                [LocalStorageKeys.SKIP_PASSWORD_ASSESSMENT]: STRING.FALSE,
                [LocalStorageKeys.USE_OLD_SUBMIT_REGEX]: STRING.FALSE,
            };
        }
    }
    const exp_vaultExpSettings = new VaultExpSettings();

    class VaultSync {
        syncLicenseComplete = null;
        constructor() {
            this.sync = js.fn.wrapper.createSingleInstance(this.sync, this);
        }
        async sync(fromUser) {
            try {
                await zlocalStorage.saveAll({
                    [LocalStorageKeys.SYNCING]: true,
                    [LocalStorageKeys.USER_SYNC]: fromUser
                });
                bgEventServer.sync.syncing();
                accountDb.recordingTable.clear();
                accountDb.folderSecretMapTable.clear();
                const configSyncPromise = this.syncConfig();
                await Promise.all([
                    configSyncPromise,
                    bg$1.neverSaveUrls.sync(),
                    bg$1.vaultSecrets.sync(),
                    bg$1.vaultFolders.sync(),
                    bg$1.vaultPolicies.sync(),
                    bg$1.vaultSettings.sync(configSyncPromise),
                    bg$1.user.getDpFromServer(),
                    bg$1.vaultLogin.getLogin(),
                    exp_vaultExpSettings.sync(),
                ]);
                inactivityHandler.synced();
                badgeMenuHandler.refresh();
                bgEventServer.sync.synced();
            }
            finally {
                await zlocalStorage.saveAll({
                    [LocalStorageKeys.SYNCING]: false,
                    [LocalStorageKeys.LAST_SYNCED]: Date.now()
                });
            }
            try {
                bg$1.oneAuthTotp.sync();
            }
            catch (e) {
                logError(e);
            }
        }
        async afterSyncLicenseComplete() {
            if (!this.syncLicenseComplete) {
                this.syncLicenseComplete = js.promise.createNew();
            }
            return this.syncLicenseComplete;
        }
        async syncLicense() {
            try {
                const resp = (await vapi.login.getLicense()).result;
                const respLicense = resp.operation.Details[0];
                const respConfig = respLicense.USERCONFIG;
                const ENABLED = "Enabled";
                const DISABLED = "Disabled";
                await zlocalStorage.saveAll({
                    [LocalStorageKeys.PLAN]: respLicense.VAULTPLAN,
                    [LocalStorageKeys.IS_PERSONAL_PLAN]: respLicense.VAULTPLAN == zenum.PLAN.PERSONAL,
                    [LocalStorageKeys.FEATURES]: respLicense.FEATURES,
                    [LocalStorageKeys.PII_ENABLED]: respConfig.PII_FIELD_CONTROL == ENABLED,
                    [LocalStorageKeys.ALLOW_ADD_SECRET]: respConfig.DISABLE_ADD_SECRETS != DISABLED,
                    [LocalStorageKeys.ALLOW_PERSONAL_SECRET]: respConfig.PERSONAL_SECRETS != DISABLED,
                    [LocalStorageKeys.ALLOW_ENTERPRISE_SECRET]: respConfig.ENTERPRISE_SECRETS != DISABLED,
                    [LocalStorageKeys.ALLOW_FILE_ATTACHMENT]: respConfig.FILE_ATTACHMENT != DISABLED,
                    [LocalStorageKeys.SHOW_ONLY_USER_DEFINED_SEC_TYPES]: respConfig.SHOW_USER_DEFINED_SECRETTYPE == ENABLED,
                    [LocalStorageKeys.CLEAR_CLIPBOARD]: parseInt(respConfig.EXT_CLEAR_CLIPBOARD || "30"),
                    [LocalStorageKeys.DOMAIN_MATCHING_MODE_OLD]: respConfig.EXT_AUTOFILL_SUBDOMAIN != STRING.FALSE ?
                        zenum.DOMAIN_MATCHING_MODE.PARENT_DOMAIN : zenum.DOMAIN_MATCHING_MODE.HOSTNAME,
                    [LocalStorageKeys.INACTIVE_TIMEOUT]: parseInt(respConfig.EXT_TIMEOUT || "30"),
                    [LocalStorageKeys.INACTIVITY_ENFORCED]: respConfig.EXT_INACTIVE_TIMEOUT_FOR_ORG == ENABLED,
                    [LocalStorageKeys.AUTO_SAVE_UPDATE_PASSWORDS]: respConfig.EXT_SAVE_PROMPT != STRING.FALSE,
                    [LocalStorageKeys.INSECURE_PAGE_PROMPT]: respConfig.EXT_INSECURE_PAGE_PROMPT != STRING.FALSE,
                    [LocalStorageKeys.DEFAULT_FILTER]: this.convert_old_filter_name(respConfig.EXT_DEFAULT_FILTER || zenum.FILTER.ALL),
                    [LocalStorageKeys.ALLOW_SAME_NAME]: respConfig.ALLOW_SAME_NAME == ENABLED,
                    [LocalStorageKeys.ALLOW_SHARE_SECRET]: respConfig.DISABLE_SHARING_SECRETS != DISABLED,
                    [LocalStorageKeys.CARD_SAVE_PROMPT]: respConfig.EXT_CARD_SAVE_PROMPT != STRING.FALSE,
                    [LocalStorageKeys.CARD_AUTOFILL_SUBDOMAIN]: respConfig.EXT_CARD_AUTOFILL_SUBDOMAIN != STRING.FALSE,
                    [LocalStorageKeys.ALLOW_THIRD_PARTY_SHARING]: respConfig.SHARING_SECRETS_THIRD_PARTY == ENABLED,
                    [LocalStorageKeys.ONEAUTH_UNLOCK_ENABLED]: respConfig.ONEAUTH_UNLOCK == ENABLED,
                    [LocalStorageKeys.WEBAUTHN_UNLOCK_ENABLED]: respConfig.WEBAUTHN_UNLOCK == ENABLED,
                    [LocalStorageKeys.RESTRICT_ONEAUTH_UNLOCK]: respConfig.RESTRICT_ONEAUTH_UNLOCK == ENABLED,
                    [LocalStorageKeys.RESTRICT_WEBAUTHN_UNLOCK]: respConfig.RESTRICT_WEBAUTHN_UNLOCK == ENABLED,
                    [LocalStorageKeys.ALLOW_ADD_FOLDER]: respConfig.ADD_FOLDER != DISABLED,
                    [VtSettings.DARK_MODE]: respConfig.NIGHT_MODE == ENABLED,
                    [VtSettings.THEME]: this.getTheme(respConfig.THEME),
                    [VtSettings.FONT]: this.getFont(respConfig.USER_WEB_FONT),
                });
                if (this.syncLicenseComplete) {
                    this.syncLicenseComplete.resolve();
                }
                this.syncLicenseComplete = null;
            }
            catch (e) {
                logError(e);
            }
        }
        async syncThemeFromWeb() {
            await this.syncLicense();
            bgEventServer.settings.themeChanged({ from: "web" });
        }
        convert_old_filter_name(name) {
            switch (name) {
                case "favorites": return zenum.FILTER.FAVOURITES;
                case "not_shared": return zenum.FILTER.UNSHARED;
                case "recentlyAdded": return zenum.FILTER.RECENTLY_ADDED;
                case "recentlyUsed": return zenum.FILTER.RECENTLY_USED;
                default:
                    return name;
            }
        }
        async syncConfig() {
            await this.syncLicense();
            bgEventServer.settings.themeChanged();
        }
        getTheme(respTheme) {
            try {
                switch (respTheme) {
                    case "BLUETHEME": return VtColors.BLUE;
                    case "REDTHEME": return VtColors.RED;
                    case "GREENTHEME": return VtColors.GREEN;
                    case "ORANGETHEME": return VtColors.ORANGE;
                    case "PURPLETHEME": return VtColors.PURPLE;
                    default: return VtColors.BLUE;
                }
            }
            catch (e) {
                logError(e);
                return VtColors.BLUE;
            }
        }
        getFont(respFont = "") {
            try {
                if (!respFont) {
                    return Theme.FONT.ZOHOPUVI;
                }
                const upperCaseFont = respFont.toUpperCase();
                switch (upperCaseFont) {
                    case Theme.FONT.OPENSANS:
                    case Theme.FONT.ZOHOPUVI:
                        return upperCaseFont;
                    default:
                        return Theme.FONT.ZOHOPUVI;
                }
            }
            catch (e) {
                logError(e);
                return Theme.FONT.ZOHOPUVI;
            }
        }
    }

    class VaultTrash {
        async queryTrash(query) {
            try {
                const queryObj = {
                    rowPerPage: query.rows_per_page,
                    pageNum: query.page_no,
                    isAsc: true,
                    secretName: query.search_string
                };
                const resp = await VaultApi.getChecked("/api/rest/json/v1/secrets/trashedsecrets", queryObj);
                const secrets = await bg$1.vaultSecrets.secretParser.parseAll(resp.operation.Details);
                const queryResult = new TrashQueryResult();
                queryResult.query = query;
                queryResult.secrets = secrets;
                queryResult.total_count = resp.operation.meta.secretcount;
                return queryResult;
            }
            catch (e) {
                throw jserror(e);
            }
        }
    }

    class ZMaps {
        mapsUrl;
        constructor() {
            this.init = js.fn.wrapper.createSingleInstance(this.init, this);
        }
        async init() {
            try {
                const initialized = await zsessionStorage.load(SessionStorageKeys.ZMAPS_INITIALIZED, false);
                this.mapsUrl = urlProvider.getZMapsUrl();
                if (initialized) {
                    return;
                }
                const check = await commonDb.zmapsCountryTable.load("India");
                if (!Object.keys(check).length) {
                    await this.fetchCountriesFromServer();
                }
                await zsessionStorage.save(SessionStorageKeys.ZMAPS_INITIALIZED, true);
            }
            catch (e) {
                logError(e);
            }
        }
        getZMapsCountryUrl() {
            return this.mapsUrl + "/v1/address/get_countries";
        }
        getZMapsStateUrl(country) {
            return this.mapsUrl + "/v1/address/get_states?country=" + country;
        }
        getZMapsDistrictUrl(country, state) {
            return this.mapsUrl + `/v1/address/get_districts?country=${country}&state=${state}`;
        }
        async fetchCountriesFromServer() {
            try {
                const response = await fetch(this.getZMapsCountryUrl());
                const data = await response.json();
                await commonDb.zmapsCountryTable.addAll(data.countries);
            }
            catch (e) {
                if (e instanceof TypeError) {
                    return;
                }
                console.error(e);
            }
        }
        async getStates(country) {
            try {
                await this.init();
                const countryRow = await commonDb.zmapsCountryTable.load(country);
                if (!countryRow.states) {
                    countryRow.states = await this.fetchStatesFromServer(country);
                    this.saveStatesData(countryRow);
                }
                return countryRow.states;
            }
            catch (e) {
                console.error(e);
                return [];
            }
        }
        async fetchStatesFromServer(country) {
            try {
                const response = await fetch(this.getZMapsStateUrl(country));
                const statesData = await response.json();
                return statesData.data.map(data => data.state_name);
            }
            catch (e) {
                console.error(e);
                return [];
            }
        }
        async saveStatesData(countryRow) {
            if (countryRow.states.length) {
                await commonDb.zmapsCountryTable.addStates(countryRow);
            }
        }
        async getDistricts(country, state) {
            try {
                await this.init();
                const districtRow = await commonDb.zmapsDistrictTable.load(country, state);
                if (!districtRow.districts) {
                    districtRow.districts = await this.fetchDistrictsFromServer(country, state);
                    this.saveDistrictsData(country, state, districtRow.districts);
                }
                return districtRow.districts;
            }
            catch (e) {
                console.error(e);
                return [];
            }
        }
        async fetchDistrictsFromServer(country, state) {
            try {
                const response = await fetch(this.getZMapsDistrictUrl(country, state));
                const districtsData = await response.json();
                return districtsData.data.district;
            }
            catch (e) {
                console.error(e);
                return [];
            }
        }
        async saveDistrictsData(country, state, districts) {
            if (districts.length) {
                await commonDb.zmapsDistrictTable.addDistricts(country, state, districts);
            }
        }
        async saveCountryToDB(country) {
            await commonDb.zmapsCountryTable.addCustomCountry(country);
        }
        async saveStateToDB(country, state) {
            const countryRow = await commonDb.zmapsCountryTable.load(country);
            countryRow.states = countryRow.states ? countryRow.states : [];
            countryRow.states.push(state);
            await commonDb.zmapsCountryTable.addStates(countryRow);
        }
        async saveCityToDB(country, state, city) {
            const stateRow = await commonDb.zmapsDistrictTable.load(country, state);
            const districts = stateRow.districts ? stateRow.districts : [];
            districts.push(city);
            await commonDb.zmapsDistrictTable.addDistricts(country, state, districts);
        }
    }

    class Background {
        init() {
            bg$1.popupClient = new PopupClient();
            bg$1.ztabClient = new ZTabClient();
            bg$1.alarmHandler = new AlarmHandler();
            bg$1.themeHandler = new ThemeHandler();
            bg$1.logoutHandler = new LogoutHandler();
            bg$1.ztabHandler = new BgZTabHandler();
            bg$1.basicAuthenticationHandler = new BgBasicAuthenticationHandler();
            bg$1.vault = new Vault();
            bg$1.vaultAudit = new VaultAudit();
            bg$1.vaultConfig = new VaultConfig();
            bg$1.vaultFolders = new VaultFolders();
            bg$1.vaultLogin = new VaultLogin();
            bg$1.vaultPolicies = new VaultPolicies();
            bg$1.vaultSecrets = new VaultSecrets();
            bg$1.vaultSecretTypes = new VaultSecretTypes();
            bg$1.vaultSettings = new VaultSettings();
            bg$1.neverSaveUrls = new NeverSaveUrls();
            bg$1.vaultSync = new VaultSync();
            bg$1.vaultTrash = new VaultTrash();
            bg$1.user = new BgVaultUser();
            bg$1.zcrypt = new BgZCrypt();
            bg$1.clipboard = new BgClipboardImpl();
            bg$1.offscreenApi = BgOffscreenApiImplProvider.getInstance();
            bg$1.siteFrame = new BgSiteFrame();
            bg$1.cardFrame = new BgCardFrame();
            bg$1.formFrame = new BgFormFrame();
            bg$1.saveFrame = new BgSaveFrame();
            bg$1.confirmFrame = new BgConfirmFrame();
            bg$1.updateFrame = new BgUpdateFrame();
            bg$1.savePassword = new BgSavePassword();
            bg$1.neverSaveChecker = new BgNeverSaveChecker();
            bg$1.passwordReset = new PasswordReset();
            bg$1.unlockTabHandler = new BgUnlockTabHandler();
            bg$1.csUtil = new BgCSUtil();
            bg$1.oneAuthTotp = new OneAuthTotp();
            bg$1.zmaps = new ZMaps();
        }
    }

    var CARD_FIELDS;
    (function (CARD_FIELDS) {
        CARD_FIELDS["NAME"] = "card_holder_name";
        CARD_FIELDS["NUMBER"] = "card_number";
        CARD_FIELDS["CVV"] = "cvv";
        CARD_FIELDS["VALID_UPTO"] = "valid_thru";
    })(CARD_FIELDS || (CARD_FIELDS = {}));
    var ADDRESS_FIELDS;
    (function (ADDRESS_FIELDS) {
        ADDRESS_FIELDS["FIRST_NAME"] = "first_name";
        ADDRESS_FIELDS["MIDDLE_NAME"] = "middle_name";
        ADDRESS_FIELDS["LAST_NAME"] = "last_name";
        ADDRESS_FIELDS["ADDRESS_1"] = "address_1";
        ADDRESS_FIELDS["ADDRESS_2"] = "address_2";
        ADDRESS_FIELDS["ADDRESS_3"] = "address_3";
        ADDRESS_FIELDS["COUNTRY"] = "country";
        ADDRESS_FIELDS["STATE"] = "state";
        ADDRESS_FIELDS["CITY"] = "city";
        ADDRESS_FIELDS["ZIP"] = "zip";
        ADDRESS_FIELDS["MOBILE"] = "mobile";
    })(ADDRESS_FIELDS || (ADDRESS_FIELDS = {}));

    const ZVaultBG = {
        inProgressResets: new Set(),
        latestError: null,
        data: {
            activeTabId: -1,
            totpDevice: {},
            totpData: null,
            newsecretstate: {
                state: {},
                set: function (key, value) {
                    this.state[key] = JSON.stringify(value);
                },
                get: function (key) {
                    return JSON.parse(this.state[key]);
                },
                contains: function (key) {
                    return ZVaultUtil.isValid(this.state[key]);
                },
                delete: function (key) {
                    delete this.state[key];
                },
                destroy: function () {
                    this.state = {};
                }
            },
        },
        init() {
            chrome.runtime.onMessage.addListener(function (msg, sender) {
                ZVaultBG.processRequest(msg, sender);
                return false;
            });
        },
        api: {
            get_secret_details: async (id) => { return urlProvider.getVaultUrl() + "/api/json/secrets?OPERATION_NAME=GET_SECRET_DETAILS" + "&SECRET_AUTO_ID=" + id; },
            get_request_details: async (reqId) => { return urlProvider.getVaultUrl() + "/api/rest/json/v1/accesscontrol/request/" + reqId; },
            request_access: async (id) => { return urlProvider.getVaultUrl() + "/api/rest/json/v1/accesscontrol/requestaccess/" + id; },
            cancel_access_request: async (reqId) => { return urlProvider.getVaultUrl() + "/api/rest/json/v1/accesscontrol/cancel/" + reqId; },
            checkout_request: async (reqId) => { return urlProvider.getVaultUrl() + "/api/rest/json/v1/accesscontrol/checkout/" + reqId; },
            totp_lookup: async () => urlProvider.getAccountsUrl() + "/signin/v2/lookup/self?mode=extension",
            totp_push: async (device_id) => urlProvider.getAccountsUrl() + "/api/v1/extension/self/device/" + device_id + "/push",
            totp_status: async (device_id) => urlProvider.getAccountsUrl() + "/api/v1/extension/self/device/" + device_id + "/poll"
        },
        callAPI: async (url, method = "", params = undefined, content_type = VFetchContentType.URL_ENCODED) => {
            try {
                if (navigator.onLine === false) {
                    return { status: false, error: "Offline" };
                }
                if (!js.url.isValid(url)) {
                    return { status: false, error: "Invalid Url" };
                }
                if (params != undefined && params != "" && typeof params == "object") {
                    let parameterString = "";
                    for (let key in params) {
                        parameterString += key + "=" + encodeURIComponent(params[key]) + "&";
                    }
                    params = parameterString.slice(0, parameterString.length - 1);
                }
                const resp = await fetch(url, {
                    method,
                    headers: await vapi.fetch.getHeaders(content_type),
                    body: params
                });
                const respJson = await resp.json();
                return respJson;
            }
            catch (e) {
                return { status: false };
            }
        },
        async sync() {
            ZVaultBG.checkTotpLookup();
        },
        checkTotpLookup: async () => {
            var response = await ZVaultBG.callAPI(await ZVaultBG.api.totp_lookup(), "POST");
            if (response.status_code == 201 && response.message == "Success") {
                for (let device of response.lookup.device) {
                    if (device.is_primary) {
                        ZVaultBG.data.totpDevice = device;
                        break;
                    }
                }
                ZVaultBG.data.totpData = response.lookup.tp_data != undefined ? response.lookup.tp_data : [];
            }
        },
        pushTotpNotification: async (username, url) => {
            const is_empty = Object.keys(ZVaultBG.data.totpDevice).length == 0;
            if (is_empty) {
                return;
            }
            var param;
            let domain = js.url.getHostName(url);
            let parentDomain = js.url.getParentDomain(url);
            for (let tp_data of ZVaultBG.data.totpData) {
                if (tp_data.label == username && (domain == tp_data.app_name.toLowerCase() || parentDomain == tp_data.app_name.toLowerCase())) {
                    param = JSON.stringify({ "sendpushnotify": tp_data });
                    break;
                }
            }
            if (param != undefined) {
                var response = await ZVaultBG.callAPI(await ZVaultBG.api.totp_push(ZVaultBG.data.totpDevice.device_id), "POST", param, VFetchContentType.JSON);
                if (response.message == "Success" && response.status_code == 201) {
                    return response.sendpushnotify.token;
                }
            }
            return null;
        },
        getTotpStatus: async (token) => {
            try {
                const resp = await fetch(await ZVaultBG.api.totp_status(ZVaultBG.data.totpDevice.device_id), {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        authorization: "Zoho-oauthtoken " + await oauth.getAccessToken(),
                        "Z-authorization": "Zoho-oauthtoken " + token,
                    },
                    body: ""
                });
                const respJson = await resp.json();
                return respJson;
            }
            catch (e) {
                return { status: false };
            }
        },
        checkTotpStatus: async (tabId, data, token, count) => {
            var totpResponse = await ZVaultBG.getTotpStatus(token);
            if (totpResponse.status_code == 200) {
                if (totpResponse.code == "D101" && totpResponse.verifypushnotify[0].totp != undefined) {
                    var otp = totpResponse.verifypushnotify[0].totp;
                    data.otp = otp;
                    await bg$1.vaultSecrets.secretLogin.recording.updatePlaybackInnerData(data.tab, data);
                    ZVaultUtil.sendMessage(tabId, "startPlayback", data);
                }
                else if ((totpResponse.code == "D102" || totpResponse.code == "D101") && count < 10) {
                    setTimeout(function () {
                        ZVaultBG.checkTotpStatus(tabId, data, token, ++count);
                    }, 2500);
                }
                else {
                    await bg$1.vaultSecrets.secretLogin.recording.removePlaybackData(tabId);
                }
            }
            else {
                await bg$1.vaultSecrets.secretLogin.recording.removePlaybackData(tabId);
            }
        },
        getPaymentCards: async function (search = "") {
            const query = SecretQuery.newBuilder().build();
            const cardCategory = await bg$1.vaultSecretTypes.getCardType();
            query.typeId = cardCategory != null ? cardCategory.id : null;
            if (search) {
                query.search_string = search;
            }
            const secret_query_result = await bg$1.vaultSecrets.secretQuerier.query(query);
            return secret_query_result;
        },
        async checkPlayback(tabId, { url = "" }) {
            const playBackData = await bg$1.vaultSecrets.secretLogin.recording.getPlaybackData(tabId);
            if (!playBackData) {
                return;
            }
            const secretUrls = playBackData.data.urls;
            if (!ZVaultUtil.secretDomainMatches(secretUrls, url)) {
                return;
            }
            if (js.url.getProtocol(url) == js.url.protocol.http && (await zlocalStorage.load(LocalStorageKeys.INSECURE_PAGE_PROMPT, true))) {
                const sendData = playBackData.data;
                sendData.action = "fill_secret_insecure_page_context_menu";
                sendData.secretaction = "fill_secret_insecure_page";
                ZVaultUtil.sendMessage(tabId, "show_message_touser", { "id": "insecure_frame", "corresData": sendData, "type": "context", "specificCol": false });
                return;
            }
            if ((!playBackData.playback) && (!playBackData.data.submit)) {
                ZVaultUtil.sendMessage(tabId, "fill_secret_on_loginform", playBackData.data);
                await bg$1.vaultSecrets.secretLogin.recording.removePlaybackData(tabId);
                return;
            }
            if (playBackData.playback) {
                url = playBackData.data.secretUrl;
                const steps = JSON.parse(playBackData.data.steps);
                const newUrl = steps[playBackData.data.step_no].url;
                if (newUrl) {
                    url = newUrl;
                    playBackData.data.urls.push(newUrl);
                    playBackData.data.secretUrl = newUrl;
                    bg$1.vaultSecrets.secretLogin.recording.setPlaybackData(tabId, playBackData);
                }
                if (ZVaultUtil.secretDomainMatches(playBackData.data.urls, url)) {
                    playBackData.reloading = false;
                    bg$1.vaultSecrets.secretLogin.recording.setPlaybackData(tabId, playBackData);
                    ZVaultUtil.sendMessage(tabId, "startPlayback", playBackData.data);
                }
                return;
            }
        },
        async checkCardDiff(card, data) {
            const cardHolderName = await ZVaultBG.isCardFieldDifferent(card, data, CARD_FIELDS.NAME);
            const cardCvv = await ZVaultBG.isCardFieldDifferent(card, data, CARD_FIELDS.CVV);
            const validThru = await ZVaultBG.isCardFieldDifferent(card, data, CARD_FIELDS.VALID_UPTO);
            return (cardHolderName || cardCvv || validThru);
        },
        async isCardFieldDifferent(card, data, field) {
            const stored = await bg$1.zcrypt.decrypt(card.encrypted.fields[field], card.shared);
            const entered = data[field];
            if (entered == undefined || entered == "") {
                return false;
            }
            else if (stored == entered) {
                return false;
            }
            return true;
        },
        async encryptAllFields(secretdata, isShared) {
            for (let i in secretdata) {
                secretdata[i] = await bg$1.zcrypt.encrypt(secretdata[i], isShared);
            }
            return secretdata;
        },
        processRequest: async (request, sender) => {
            const action = request.action;
            if (!action) {
                return;
            }
            let data = request.data;
            if (ZVaultUtil.isValid(data) && !(data instanceof Object)) {
                data = JSON.parse(data);
            }
            const tabId = action == "devToolsOpened" ? request.tabId : sender.tab.id;
            let temp;
            switch (action) {
                case "continuePlayback":
                    if (ZVaultUtil.secretDomainMatches(data.urls, data.frameurl)) {
                        if (data.step_no < data.total_steps) {
                            let playbackData = await bg$1.vaultSecrets.secretLogin.recording.getPlaybackData(tabId);
                            if ((playbackData.data.step_no + 1) == data.step_no && !playbackData.reloading) {
                                playbackData.data = data;
                                var steps = JSON.parse(data.steps);
                                var step_data = steps[data.step_no];
                                if (step_data.url != undefined) {
                                    data.urls.push(step_data.url);
                                    data.secretUrl = step_data.url;
                                }
                                bg$1.vaultSecrets.secretLogin.recording.setPlaybackData(tabId, playbackData);
                                ZVaultUtil.sendMessage(tabId, "startPlayback", data);
                            }
                        }
                        else {
                            bg$1.vaultSecrets.secretLogin.recording.removePlaybackData(tabId);
                        }
                    }
                    break;
                case "repeatPlayback":
                    if (ZVaultUtil.secretDomainMatches(data.urls, data.frameurl)) {
                        const playbackData = await bg$1.vaultSecrets.secretLogin.recording.getPlaybackData(tabId);
                        if (data.step_no < data.total_steps && playbackData) {
                            if ((playbackData.data.step_no) == data.step_no && (playbackData.data.countdown) + 1 == data.countdown) {
                                await bg$1.vaultSecrets.secretLogin.recording.updatePlaybackInnerData(data.tab, data);
                                ZVaultUtil.sendMessage(tabId, "startPlayback", data);
                            }
                        }
                        else {
                            bg$1.vaultSecrets.secretLogin.recording.removePlaybackData(tabId);
                        }
                    }
                    break;
                case "saveProgress":
                    if (data.step_no < data.total_steps) {
                        await bg$1.vaultSecrets.secretLogin.recording.updatePlaybackInnerData(tabId, data);
                    }
                    else {
                        bg$1.vaultSecrets.secretLogin.recording.removePlaybackData(tabId);
                    }
                    break;
                case "playbackFailure":
                    bg$1.vaultSecrets.secretLogin.recording.removePlaybackData(tabId);
                    break;
                case "reloading":
                    {
                        const existing = await bg$1.vaultSecrets.secretLogin.recording.getPlaybackData(tabId);
                        if (existing) {
                            existing.reloading = true;
                            await bg$1.vaultSecrets.secretLogin.recording.setPlaybackData(data.tab, existing);
                        }
                    }
                    break;
                case "checkPlayback":
                    if (!await bg$1.vault.isUnlocked()) {
                        return;
                    }
                    temp = js.url.getParentDomain(data.url);
                    if (!temp.startsWith("zoho.")) {
                        ZVaultBG.checkPlayback(tabId, data);
                        return;
                    }
                    break;
                case "fetchTotp":
                    if (ZVaultUtil.secretDomainMatches(data.urls, data.frameurl)) {
                        var username = data.secretdata.username;
                        var token = await ZVaultBG.pushTotpNotification(username, data.secretUrl);
                        if (token != null) {
                            setTimeout(function () {
                                ZVaultBG.checkTotpStatus(tabId, data, token, 0);
                            }, 5000);
                        }
                        else {
                            await bg$1.vaultSecrets.secretLogin.recording.removePlaybackData(tabId);
                        }
                    }
                    break;
                case "devToolsOpened":
                    ZVaultUtil.sendMessage(tabId, action);
                    break;
            }
        },
    };
    setGlobal("ZVaultBG", ZVaultBG);

    class RuntimeMsgHandler {
        init() {
            try {
                const h = this;
                brApi.runtime.onMessage(function (msg, sender) {
                    h.handleMessage(msg, sender);
                    return false;
                });
            }
            catch (e) {
                logError(e);
            }
        }
        async handleMessage(msg, sender) {
            try {
                if (!msg.fn) {
                    return false;
                }
                const { fn, args } = msg;
                if (!this[fn]) {
                    return false;
                }
                this[fn](args, sender);
            }
            catch (e) {
                logError(e);
            }
            return false;
        }
        openSidePanel(_args, sender) {
            sidePanelHandler.open(sender.tab.windowId, { tabId: sender.tab.id, frameId: sender.frameId });
        }
    }

    function bgInit() {
        const background = new Background();
        background.init();
        bgStorage.init();
        installHandler.init();
        startupHandler.init();
        return bgInitAsync();
    }
    async function bgInitAsync() {
        try {
            await vt.init({ logPrefix: "BG:", skipBgApiInit: true });
            await config.init();
            brApi.other.disablePasswordSaving();
            await oauth.init();
            await db.init();
            vapi.init();
            bg$1.logoutHandler.init();
            new RuntimeMsgHandler().init();
            unlock.init();
            await extCrypto.init();
            bg$1.vaultSecrets.init();
            domainHandler.init();
            bg$1.ztabHandler.init();
            bg$1.unlockTabHandler.init();
            sidePanelHandler.init();
            bg$1.basicAuthenticationHandler.init();
            addressBarHandler.init();
            devToolsHandler.init();
            await bgApiServer.init();
            bgEventServer.init();
            bg$1.popupClient.init();
            bg$1.ztabClient.init();
            bg$1.offscreenApi.init();
            csApi.init();
            ZVaultBG.init();
            info("bg initialized");
        }
        catch (e) {
            logError(e);
        }
        finally {
            bg$1.initialized = true;
        }
        inactivityHandler.checkActivity();
    }

    class CommandHandler {
        gg;
        constructor(gg) {
            this.gg = gg;
        }
        init() {
            if (!chrome.commands?.onCommand?.addListener) {
                return;
            }
            chrome.commands.onCommand.addListener(this.commandHandler.bind(this));
        }
        async commandHandler() {
            const commands = config.get(ConfigKeys.COMMANDS);
            const commandIndex = parseInt(config.get(ConfigKeys.COMMAND_INDEX)) || 0;
            const command = commands[commandIndex];
            switch (command) {
                case "reload_extension":
                    chrome.runtime.reload();
                    return;
                case "reload_content_scripts":
                    this.reloadContentScripts();
                    return;
            }
        }
        async reloadContentScripts() {
            await this.gg.devMain.contentScripts.reRegisterContentScripts();
            const activeTab = await brApi.tab.getActiveTab();
            if (activeTab) {
                chrome.tabs.update({ url: activeTab.url });
            }
        }
    }

    class ContentScriptHandler {
        csMapper = ContentScriptMapper.getInstance();
        async reRegisterContentScripts() {
            await this.unregisterAllContentScripts();
            await chrome.scripting.registerContentScripts(await this.getContentScripts());
        }
        async unregisterAllContentScripts() {
            try {
                const scripts = (await chrome.scripting.getRegisteredContentScripts()) || [];
                const ids = scripts.map(x => x.id);
                await chrome.scripting.unregisterContentScripts({ ids });
            }
            catch (e) {
                logError(e);
            }
        }
        async getContentScripts() {
            const liveManifest = await fetch("/manifest/manifest-chrome.json").then(x => x.json());
            const contentScripts = liveManifest.content_scripts.map((x, index) => this.csMapper.mapContentScript(x, index));
            for (let cs of contentScripts) {
                this.addDevUrls(cs.excludeMatches);
                this.addDevUrls(cs.matches);
            }
            return contentScripts;
        }
        addDevUrls(urls) {
            const devUrls = [];
            const vaultRegex = /vault\.zoho\.com(?=\/)/;
            const setups = [
                "*.localzoho.com",
                "*.csez.zohocorpin.com",
                "prevault.zoho.com",
            ];
            for (let url of urls) {
                if (!vaultRegex.test(url)) {
                    continue;
                }
                for (let setup of setups) {
                    devUrls.push(url.replace(vaultRegex, setup));
                }
            }
            urls.push(...devUrls);
        }
    }
    class ContentScriptMapper {
        static getInstance() {
            if (brApi.isV2()) {
                return new ContentScriptMapper();
            }
            return new ContentScriptMapperV3();
        }
        mapContentScript(cs, index) {
            const x = {
                id: "cs" + index,
                matches: cs.matches,
                excludeMatches: cs.exclude_matches || [],
                js: cs.js,
                runAt: cs.run_at || "document_start",
                allFrames: cs.allFrames ?? true,
            };
            return x;
        }
    }
    class ContentScriptMapperV3 extends ContentScriptMapper {
        mapContentScript(cs, index) {
            const x = super.mapContentScript(cs, index);
            x.world = cs.world || "ISOLATED";
            return x;
        }
    }

    class GG {
        devMain;
        constructor(devMain) {
            this.devMain = devMain;
        }
    }

    class Util {
        gg;
        constructor(gg) {
            this.gg = gg;
        }
        initActionHandler() {
            try {
                if (!chrome.action) {
                    return;
                }
                const useActionMain = config.get(ConfigKeys.ACTION_MAIN, false);
                if (!useActionMain) {
                    chrome.action.setPopup({ popup: "/html/popup.html" });
                    return;
                }
                chrome.action.onClicked.addListener(() => this.gg.devMain.actionMain());
            }
            catch (e) {
                logError(e);
            }
        }
        async callReloadMain() {
            try {
                const RELOADED = "reloaded";
                const reloaded = await zsessionStorage.load(RELOADED, true);
                if (reloaded) {
                    await zsessionStorage.save(RELOADED, false);
                    this.gg.devMain.reloadMain();
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async initDevConfig() {
            try {
                const cacheMasterPassword = config.get(ConfigKeys.CACHE_DEV_MASTER_PASSWORD);
                if (cacheMasterPassword) {
                    return;
                }
                await zlocalStorage.remove(LocalStorageKeys.DEV_MASTER_PASSWORD);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class DevMain {
        gg = new GG(this);
        contentScripts = new ContentScriptHandler();
        commandHandler = new CommandHandler(this.gg);
        util = new Util(this.gg);
        async init() {
            if (!isDevMode) {
                return;
            }
            this.commandHandler.init();
            this.contentScripts.reRegisterContentScripts();
            this.util.initActionHandler();
            await this.util.initDevConfig();
            await this.util.callReloadMain();
        }
        async reloadMain() {
        }
        async actionMain() {
        }
    }

    function bgSyncMain() {
        initContext();
        const fn = js.fn.emptyFn;
        chrome.runtime.onConnect.addListener(fn);
        chrome.runtime.onInstalled.addListener(fn);
        chrome.runtime.onMessage.addListener(fn);
        chrome.tabs.onActivated.addListener(fn);
        chrome.tabs.onUpdated.addListener(fn);
        chrome.windows.onFocusChanged.addListener(fn);
        chrome.contextMenus.onClicked.addListener(fn);
        chrome.runtime.onStartup.addListener(fn);
        if (chrome.alarms) {
            chrome.alarms.onAlarm.addListener(fn);
        }
        if (chrome.idle) {
            chrome.idle.onStateChanged.addListener(fn);
        }
        alarmHandler.init();
        inactivityHandler.init();
        chrome.cookies.onChanged.addListener(fn);
        bgMain.main();
    }
    class BgMain {
        main() {
            bgInit().then(() => new DevMain().init());
        }
    }
    const bgMain = new BgMain();

    bgSyncMain();

})();
