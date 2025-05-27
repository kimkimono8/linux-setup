var web_cs = (function () {
    'use strict';

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

    class BgAccessCtrlApiImpl {
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
    }

    class BgApiContext {
        apiClient;
    }

    class BgAuditApiImpl {
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
    }

    class BgCardFrameApiImpl {
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
    }

    class BgCryptoApiImpl {
        context;
        prefix = "crypto.";
        file;
        ext;
        constructor(context) {
            this.context = context;
            this.file = new BgFileCryptoApiImpl(context);
            this.ext = new BgExtCryptoApiImpl(context);
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
    }
    class BgFileCryptoApiImpl {
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
    }
    class BgExtCryptoApiImpl {
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
    }

    class BgFolderApiImpl {
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
    }

    class BgGeneratorApiImpl {
        context;
        prefix = "generator.";
        history;
        constructor(context) {
            this.context = context;
            this.history = new BgGeneratorHistoryApiImpl(context);
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
    }
    class BgGeneratorHistoryApiImpl {
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
    }

    class BgLoginApiImpl {
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
    }

    class BgOtherApiImpl {
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
    }

    class BgPolicyApiImpl {
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
    }

    class BgSaveFrameApiImpl {
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
    }

    class BgSecretApiImpl {
        context;
        prefix = "secret.";
        edit;
        share;
        totp;
        file;
        history;
        constructor(context) {
            this.context = context;
            this.edit = new BgSecretEditApiImpl(context);
            this.share = new BgSecretShareApiImpl(context);
            this.totp = new BgSecretTotpApiImpl(context);
            this.file = new BgSecretFileApiImpl(context);
            this.history = new BgSecretHistoryApiImpl(context);
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
    }
    class BgSecretEditApiImpl {
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
    }
    class BgSecretShareApiImpl {
        context;
        prefix = "secret.share.";
        user;
        userGroup;
        constructor(context) {
            this.context = context;
            this.user = new BgSecretShareUserApiImpl(context);
            this.userGroup = new BgSecretShareUserGroupApiImpl(context);
        }
        reEncryptSecretForSharing(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.reEncryptSecretForSharing.name, args: [secretId] });
        }
        async shareToThirdParty(thirdPartyShareInput) {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.shareToThirdParty.name, args: [thirdPartyShareInput] }));
        }
    }
    class BgSecretShareUserApiImpl {
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
    }
    class BgSecretShareUserGroupApiImpl {
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
    }
    class BgSecretTotpApiImpl {
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
    }
    class BgSecretFileApiImpl {
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
    }
    class BgSecretHistoryApiImpl {
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
    }

    class BgSecretTypeApiImpl {
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
    }

    class BgSessionApiImpl {
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
    }

    class BgSettingsApiImpl {
        context;
        prefix = "settings.";
        neverSave;
        constructor(context) {
            this.context = context;
            this.neverSave = new BgSettingsNeverSaveApiImpl(context);
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
    }
    class BgSettingsNeverSaveApiImpl {
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
    }

    class BgSiteFrameApiImpl {
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
    }

    class BgTabApiImpl {
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
    }

    class BgTrashApiImpl {
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
    }

    class BgUnlockApiImpl {
        context;
        prefix = "unlock.";
        oneauth;
        webauthn;
        constructor(context) {
            this.context = context;
            this.oneauth = new BgOneAuthUnlockApiImpl(context);
            this.webauthn = new BgWebauthnUnlockApiImpl(context);
        }
        async getLastUsedUnlock() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getLastUsedUnlock.name });
        }
        async setLastUnlock(method) {
            return this.context.apiClient.callApi({ path: this.prefix + this.setLastUnlock.name, args: [method] });
        }
    }
    class BgOneAuthUnlockApiImpl {
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
    }
    class BgWebauthnUnlockApiImpl {
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
    }

    class BgUpdateFrameApiImpl {
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
    }

    class BgUserApiImpl {
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
    }

    class BgVaultApiImpl {
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
    }

    class BgVaultWebApiImpl {
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
    }

    class BgZTabApiImpl {
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
    }

    class BgApiImpl {
        static instance = null;
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return this.instance = new BgApiImpl();
        }
        context = new BgApiContext();
        audit = new BgAuditApiImpl(this.context);
        accessCtrl = new BgAccessCtrlApiImpl(this.context);
        crypto = new BgCryptoApiImpl(this.context);
        settings = new BgSettingsApiImpl(this.context);
        siteFrame = new BgSiteFrameApiImpl(this.context);
        policy = new BgPolicyApiImpl(this.context);
        secret = new BgSecretApiImpl(this.context);
        secretType = new BgSecretTypeApiImpl(this.context);
        folder = new BgFolderApiImpl(this.context);
        unlock = new BgUnlockApiImpl(this.context);
        generator = new BgGeneratorApiImpl(this.context);
        login = new BgLoginApiImpl(this.context);
        cardFrame = new BgCardFrameApiImpl(this.context);
        tab = new BgTabApiImpl(this.context);
        other = new BgOtherApiImpl(this.context);
        saveFrame = new BgSaveFrameApiImpl(this.context);
        session = new BgSessionApiImpl(this.context);
        ztab = new BgZTabApiImpl(this.context);
        updateFrame = new BgUpdateFrameApiImpl(this.context);
        vault = new BgVaultApiImpl(this.context);
        trash = new BgTrashApiImpl(this.context);
        user = new BgUserApiImpl(this.context);
        vaultWeb = new BgVaultWebApiImpl(this.context);
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

    function main$1() {
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

    let GG$2 = class GG {
        brApi;
        util = new BrUtil();
    };
    const gg$2 = new GG$2();

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
                const tabs = await gg$2.brApi.tab.getAllTabs();
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
                gg$2.brApi.runtime.onMessage(this.onMessage);
            }
            catch (e) {
                logError(e);
            }
        }
        disconnect() {
            gg$2.brApi.runtime.removeOnMessageListener(this.onMessage);
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
            return new Promise((res, rej) => chrome.contextMenus.create(createInfo, gg$2.util.createCallback(res, rej)));
        }
        async removeAll() {
            return new Promise((res, rej) => chrome.contextMenus.removeAll(gg$2.util.createCallback(res, rej)));
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
            return new Promise((res, rej) => chrome.windows.getAll(query, gg$2.util.createCallback(res, rej)));
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
            return new Promise((res, rej) => chrome.cookies.get({ name, url }, gg$2.util.createCallback(res, rej)));
        }
        async getCookieStore(storeId) {
            try {
                const stores = await new Promise((res, rej) => chrome.cookies.getAllCookieStores(gg$2.util.createCallback(res, rej)));
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
            return new Promise((res, rej) => chrome.runtime.sendMessage(msg, gg$2.util.createCallback(res, rej)));
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
                const tabs = await gg$2.brApi.tab.getAllTabs();
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
            return new Promise((res, rej) => chrome.storage.local.set(keyValObj, gg$2.util.createCallback(res, rej)));
        }
        async loadAll(keyObj) {
            return new Promise((res, rej) => chrome.storage.local.get(keyObj, gg$2.util.createCallback(res, rej)));
        }
        async remove(keyOrKeys) {
            return new Promise((res, rej) => chrome.storage.local.remove(keyOrKeys, gg$2.util.createCallback(res, rej)));
        }
        async clear() {
            return new Promise((res, rej) => chrome.storage.local.clear(gg$2.util.createCallback(res, rej)));
        }
    }
    class BrSessionStorage {
        async saveAll(keyValObj) {
            return new Promise((res, rej) => chrome.storage.session.set(keyValObj, gg$2.util.createCallback(res, rej)));
        }
        async loadAll(keyObj) {
            return new Promise((res, rej) => chrome.storage.session.get(keyObj, gg$2.util.createCallback(res, rej)));
        }
        async remove(keyOrKeys) {
            return new Promise((res, rej) => chrome.storage.session.remove(keyOrKeys, gg$2.util.createCallback(res, rej)));
        }
        async clear() {
            return new Promise((res, rej) => chrome.storage.session.clear(gg$2.util.createCallback(res, rej)));
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
            return new Promise((res, rej) => chrome.extension.isAllowedIncognitoAccess(gg$2.util.createCallback(res, rej)));
        }
        async create(url) {
            return new Promise((res, rej) => chrome.tabs.create({ url }, gg$2.util.createCallback(res, rej)));
        }
        getCalledContextTab() {
            return new Promise((res, rej) => chrome.tabs.getCurrent(gg$2.util.createCallback(res, rej)));
        }
        async getTab(tabId) {
            try {
                const tab = await new Promise((res, rej) => chrome.tabs.get(tabId, gg$2.util.createCallback(res, rej)));
                return tab;
            }
            catch (e) {
                return null;
            }
        }
        async getActiveTab() {
            const [tab] = await new Promise((res, rej) => chrome.tabs.query({ active: true, lastFocusedWindow: true }, gg$2.util.createCallback(res, rej)));
            return tab;
        }
        async closeTab(tabId) {
            try {
                await new Promise((res, rej) => chrome.tabs.remove(tabId, gg$2.util.createCallback(res, rej)));
            }
            catch (e) { }
        }
        async getFrames(tabId) {
            try {
                return await new Promise((res, rej) => chrome.webNavigation.getAllFrames({ tabId }, gg$2.util.createCallback(res, rej)));
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
            }, gg$2.util.createCallback(res, rej)));
        }
        async updateTab(tabId, updateParams) {
            return new Promise((res, rej) => chrome.tabs.update(tabId, updateParams, gg$2.util.createCallback(res, rej)));
        }
        queryTabs(query) {
            return new Promise((res, rej) => chrome.tabs.query(query, gg$2.util.createCallback(res, rej)));
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
            return new Promise((res, rej) => chrome.tabs.create(input, gg$2.util.createCallback(res, rej)));
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
                if (gg$2.brApi) {
                    return gg$2.brApi;
                }
                return gg$2.brApi = new BrApiImpl();
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
            return gg$2.util.checkManifestV2();
        }
    }

    const brApi$1 = BrApiImpl.getInstance();
    function i18n(key, ...placeholders) {
        return brApi$1.i18n.textOf(key, placeholders);
    }
    globalThis["i18n"] = i18n;

    let GG$1 = class GG {
        js = null;
    };
    const gg$1 = new GG$1();

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
                return gg$1.js.fnOut.result(key);
            }
            catch (e) {
                console.error(e);
                return gg$1.js.fnOut.error(e);
            }
        }
        async exportKey(key) {
            try {
                if (!key) {
                    throw "EMPTY_KEY";
                }
                const keyBuffer = await crypto.subtle.exportKey("raw", key);
                const base64Key = gg$1.js.encoding.bytesToBase64(keyBuffer);
                return gg$1.js.fnOut.result(base64Key);
            }
            catch (e) {
                console.error(e);
                return gg$1.js.fnOut.error(e);
            }
        }
        async importKey(keyString) {
            try {
                if (!keyString) {
                    throw "EMPTY_KEY_STRING";
                }
                const keyBuffer = gg$1.js.encoding.base64ToBytes(keyString);
                const key = await crypto.subtle.importKey("raw", keyBuffer, AES_GCM, true, KEY_USAGES$1);
                return gg$1.js.fnOut.result(key);
            }
            catch (e) {
                console.error(e);
                return gg$1.js.fnOut.error(e);
            }
        }
        async encrypt(plaintext, key) {
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const encryptedBuffer = await crypto.subtle.encrypt({ name: AES_GCM, iv }, key, this.textEncoder.encode(plaintext));
            const ivBase64 = gg$1.js.encoding.bytesToBase64(iv);
            const encryptedBase64 = gg$1.js.encoding.bytesToBase64(encryptedBuffer);
            const ciphertext = `${ivBase64},${encryptedBase64}`;
            return ciphertext;
        }
        async decrypt(ciphertext, key) {
            const [ivBase64, encryptedBase64] = ciphertext.split(",", 2);
            const ivBuffer = gg$1.js.encoding.base64ToBytes(ivBase64);
            const encryptedBuffer = gg$1.js.encoding.base64ToBytes(encryptedBase64);
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
                return gg$1.js.fnOut.result({
                    publicKey: rsaKeyPair.publicKey,
                    privateKey: rsaKeyPair.privateKey
                });
            }
            catch (e) {
                console.error(e);
                return gg$1.js.fnOut.error(e);
            }
        }
        async getBase64PublicKey(key) {
            const exportedBuffer = await window.crypto.subtle.exportKey("spki", key);
            const base64Key = gg$1.js.encoding.bytesToBase64(exportedBuffer);
            return base64Key;
        }
        async getBase64PrivateKey(key) {
            const exportedBuffer = await window.crypto.subtle.exportKey("pkcs8", key);
            const base64Key = gg$1.js.encoding.bytesToBase64(exportedBuffer);
            return base64Key;
        }
        async encrypt(plaintext, key) {
            const encodedPlainText = this.textEncoder.encode(plaintext);
            const arrayBuffer = await crypto.subtle.encrypt({ name: RSA_OAEP }, key, encodedPlainText);
            return gg$1.js.encoding.bytesToBase64(new Uint8Array(arrayBuffer));
        }
        async encryptHex(plaintext, key) {
            const encodedPlainText = this.textEncoder.encode(plaintext);
            const arrayBuffer = await crypto.subtle.encrypt({ name: RSA_OAEP }, key, encodedPlainText);
            return gg$1.js.encoding.bytesToHex(new Uint8Array(arrayBuffer));
        }
        async decrypt(cipherText, key) {
            const cipherBuffer = gg$1.js.encoding.base64ToBytes(cipherText);
            const decryptedBuffer = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, key, cipherBuffer);
            return this.textDecoder.decode(decryptedBuffer);
        }
        async importPublicKey(key) {
            const keyBuffer = gg$1.js.encoding.base64ToBytes(key);
            const RSA_PARAMS = {
                name: RSA_OAEP,
                hash: "SHA-256"
            };
            const publicKey = await crypto.subtle.importKey("spki", keyBuffer, RSA_PARAMS, true, ["encrypt"]);
            return publicKey;
        }
        async importPublicKeyHex(key) {
            const keyBuffer = gg$1.js.encoding.hexToBytes(key);
            const RSA_PARAMS = {
                name: RSA_OAEP,
                hash: "SHA-256"
            };
            const publicKey = await crypto.subtle.importKey("spki", keyBuffer, RSA_PARAMS, true, ["encrypt"]);
            return publicKey;
        }
        async importPrivateKey(key) {
            const keyBuffer = gg$1.js.encoding.base64ToBytes(key);
            const RSA_PARAMS = {
                name: RSA_OAEP,
                hash: "SHA-256"
            };
            const publicKey = await crypto.subtle.importKey("pkcs8", keyBuffer, RSA_PARAMS, true, ["decrypt"]);
            return publicKey;
        }
        async exportPublicKey(key) {
            const exportedBuffer = await crypto.subtle.exportKey("spki", key);
            const base64Key = gg$1.js.encoding.bytesToBase64(exportedBuffer);
            return base64Key;
        }
        async exportPrivateKey(key) {
            const exportedBuffer = await crypto.subtle.exportKey("pkcs8", key);
            const base64Key = gg$1.js.encoding.bytesToBase64(exportedBuffer);
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

    class GG {
        base64Util = new Base64Util();
        hexUtil = new HexUtil();
    }
    const gg = new GG();

    class JsEncodingByteToXUtil {
        textDecoder = new TextDecoder();
        convertBytes(bytes, input) {
            try {
                switch (input.to) {
                    case JsEncodingFormat.BYTES:
                        return { outputBytes: bytes };
                    case JsEncodingFormat.BASE64:
                        return { outputString: gg.base64Util.encodeBytesToString(bytes) };
                    case JsEncodingFormat.ASCII:
                        return { outputString: this.textDecoder.decode(bytes) };
                    case JsEncodingFormat.BASE64_URL:
                        return { outputString: this.getBase64Url(gg.base64Util.encodeBytesToString(bytes)) };
                    case JsEncodingFormat.HEX:
                        return { outputString: gg.hexUtil.encodeBytesToHexString(bytes) };
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
                        return gg.base64Util.decodeStringToBytes(input.inputString);
                    case JsEncodingFormat.HEX:
                        return gg.hexUtil.decodeHexStringToBytes(input.inputString);
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
            gg$1.js.fn.bindThis(this, [this.execute]);
        }
        inProgressMap = new Map();
        async execute() {
            const argHash = gg$1.js.fn.getArgHash(arguments);
            if (this.inProgressMap.has(argHash)) {
                return this.inProgressMap.get(argHash);
            }
            const promise = gg$1.js.promise.createNew();
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
            gg$1.js.fn.bindThis(this, [this.execute]);
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
            gg$1.js.fn.bindThis(this, [this.execute]);
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
            await gg$1.js.time.delay(this.interCallDelaySec);
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
            const promise = gg$1.js.promise.createNew();
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
                const reqElem = gg$1.js.selector.select(elem);
                reqElem.replaceChildren(content);
            }
            catch (e) {
                logError(e);
            }
        }
        setChildContent(elem, selector, content) {
            try {
                const childElem = gg$1.js.selector.selectFrom(elem, selector);
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
                    const elem = gg$1.js.selector.select(selector);
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
                    const elem = gg$1.js.selector.select(selector);
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
                        const elem = gg$1.js.selector.select(selector);
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
                        const elem = gg$1.js.selector.select(selector);
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
                const reqElem = gg$1.js.selector.select(elem);
                reqElem.replaceChildren();
            }
            catch (e) {
                logError(e);
            }
        }
        setText(selector, text) {
            try {
                const reqElem = gg$1.js.selector.select(selector);
                reqElem.dataset["tooltip_content"] = text;
                reqElem.textContent = text;
            }
            catch (e) {
                logError(e);
            }
        }
        setChildText(parentSelector, childSelector, text) {
            try {
                const elem = gg$1.js.selector.selectFrom(parentSelector, childSelector);
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
            const elem = gg$1.js.selector.select(selector);
            if (elem) {
                elem.remove();
            }
        }
        finishAnimation(elem) {
            gg$1.js.selector.select(elem).getAnimations({ subtree: true }).forEach(x => x.finish());
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
            gg$1.js.selector.select(selector).classList.add(className);
        }
        removeClass(selector, className) {
            gg$1.js.selector.select(selector).classList.remove(className);
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
            let elem = gg$1.js.selector.select(this.selector);
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
            const topElem = gg$1.js.selector.select(topElemSelector);
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

    function jserror(e, log = true) {
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
            gg$1.js.fn.bindThis(this, [this.infoFn]);
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
                globalThis.info = this.info = gg$1.js.fn.emptyFn;
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
                await gg$1.js.time.delay(interCycleDelay);
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
            return new Promise(gg$1.js.fn.emptyFn);
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
            gg$1.js.array.removeElem(listeners, listener);
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
                if (gg$1.js) {
                    return gg$1.js;
                }
                return gg$1.js = new JsUtilImpl();
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
                globalThis.jserror = jserror;
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
        search = context.searchUtil;
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

    class Context {
        searchUtil;
        vUtil;
        init() {
            this.searchUtil = new SearchUtil();
            this.vUtil = new VUtil();
        }
    }
    const context = new Context();

    context.init();
    const vutil = context.vUtil;

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

    function main() {
        globalThis.i18n = i18n;
        globalThis.vt = VtImpl.getInstance();
    }

    var FilterType;
    (function (FilterType) {
        FilterType["ALL"] = "ALL";
        FilterType["ANY"] = "ANY";
    })(FilterType || (FilterType = {}));
    class WebAuthnCredentialResponse {
        credentialId;
        signature;
        clientData;
        authData;
        constructor(credentialId, signature, clientData, authData) {
            this.credentialId = credentialId;
            this.signature = signature;
            this.clientData = clientData;
            this.authData = authData;
        }
        static newInstance(input) {
            return new WebAuthnCredentialResponse(input.credentialId, input.signature, input.clientData, input.authData);
        }
    }

    class CredentialGetter {
        async getCredential(challenge, credentialIds) {
            try {
                const getOption = {
                    publicKey: {
                        challenge: js.encoding.base64ToBytes(challenge),
                        allowCredentials: credentialIds.map(x => ({
                            id: js.encoding.base64ToBytes(x),
                            type: "public-key"
                        })),
                        rpId: window.location.hostname,
                        timeout: 60000,
                        userVerification: "required",
                    }
                };
                const credential = await navigator.credentials.get(getOption);
                const resp = credential.response;
                const reqCredential = WebAuthnCredentialResponse.newInstance({
                    credentialId: js.encoding.bytesToBase64(credential.rawId),
                    signature: js.encoding.bytesToBase64(resp.signature),
                    clientData: js.encoding.bytesToBase64(resp.clientDataJSON),
                    authData: js.encoding.bytesToBase64(resp.authenticatorData),
                });
                bgApi.unlock.webauthn.setWebAuthnCredential(fnOut.result(reqCredential));
                this.updateVerifyUI();
                return fnOut.result(reqCredential);
            }
            catch (e) {
                bgApi.unlock.webauthn.setWebAuthnCredential(fnOut.error(e));
                return fnOut.error(e);
            }
        }
        updateVerifyUI() {
            try {
                document.querySelector("#status_elem").textContent = "Unlocking...";
            }
            catch (e) {
                logError(e);
            }
        }
    }
    const credentialGetter = new CredentialGetter();

    class WebAuthnUnlockApiServer {
        init() {
            const apiServer = portApi.createApiServer();
            apiServer.init({ name: VtApiPortNames.CS_WEBAUTHN_UNLOCK, fnObj: this });
        }
        async getCredential(challenge, credentialIds) {
            return credentialGetter.getCredential(challenge, credentialIds);
        }
    }
    const webauthnUnlockApiServer = new WebAuthnUnlockApiServer();

    main();
    main$1();
    class Main {
        async main() {
            await vt.init({ logPrefix: "CS_UNLOCK:" });
            webauthnUnlockApiServer.init();
        }
    }
    new Main().main();
    var unlockMain = {};

    return unlockMain;

})();
