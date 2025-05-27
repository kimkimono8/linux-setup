(function () {
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

    function main$2() {
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

    let GG$3 = class GG {
        brApi;
        util = new BrUtil();
    };
    const gg$2 = new GG$3();

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
    function i18n$1(key, ...placeholders) {
        return brApi$1.i18n.textOf(key, placeholders);
    }
    globalThis["i18n"] = i18n$1;

    let GG$2 = class GG {
        js = null;
    };
    const gg$1 = new GG$2();

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

    let GG$1 = class GG {
        base64Util = new Base64Util();
        hexUtil = new HexUtil();
    };
    const gg = new GG$1();

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

    function main$1() {
        globalThis.i18n = i18n$1;
        globalThis.vt = VtImpl.getInstance();
    }

    class TemplateUtil {
        create(params) {
            try {
                const templateElem = js.selector.select(params.template);
                if (!templateElem) {
                    throw "NO_TEMPLATE_ELEM: " + params.template;
                }
                const elem = templateElem.content.cloneNode(true).firstElementChild;
                this.addI18n(elem);
                if (params.preRender) {
                    this.preRender(elem);
                }
                return elem;
            }
            catch (e) {
                logError(e);
                return document.createElement("div");
            }
        }
        addI18n(elem) {
            try {
                const elems = js.selector.selectAll("[data-i18n_key]", elem);
                for (let elem of elems) {
                    const [key, ...args] = elem.dataset.i18n_key.split(",");
                    elem.textContent = i18n(key, ...args) || elem.textContent;
                }
                this.addI18nToPlaceHolders(elem);
            }
            catch (e) {
                logError(e);
            }
        }
        addI18nToPlaceHolders(elem) {
            try {
                const inputs = js.selector.selectAll("input[placeholder^='i18n:']", elem);
                const SLICE_START = "i18n:".length;
                let i18nKey = "";
                for (let input of inputs) {
                    i18nKey = input.placeholder.slice(SLICE_START);
                    input.placeholder = i18n(i18nKey) || "";
                }
            }
            catch (e) {
                logError(e);
            }
        }
        preRender(elem) {
            const parent = this.getPreRenderParent();
            js.dom.setContent(parent, elem);
        }
        getPreRenderParent() {
            for (let i = 0; true; i++) {
                const curElem = js.selector.select("#pre_render_" + i);
                if (!curElem) {
                    return this.createPreRenderElem(i);
                }
                if (curElem.firstElementChild) {
                    continue;
                }
                return curElem;
            }
        }
        createPreRenderElem(n) {
            const elem = document.createElement("div");
            elem.classList.add("pre-render");
            elem.id = "pre_render_" + n;
            document.body.append(elem);
            return elem;
        }
    }

    class VaultCSS {
        static DIS_SHOW = "dis-show";
        static DIS_HIDE = "dis-hide";
        static DISABLED = "disabled";
        static SYNCING_ANIMATION = "sync-icon-animation";
        static SELECTED = "selected";
        static UP_ARROW = "icon-up-arrow";
        static DOWN_ARROW = "icon-down-arrow";
    }

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

    class ValueSelection {
        value;
        selected;
        elem;
        constructor(value, selected) {
            this.value = value;
            this.selected = selected;
        }
    }
    class ListSelectElementImpl {
        static TEXT_SELECT_ALL = i18n(VI18N.SELECT_ALL);
        static TEXT_UNSELECT_ALL = i18n(VI18N.UNSELECT_ALL);
        static SELECTION_CHANGED = "SELECTION_CHANGED";
        static createListSelect(params) {
            const selectElem = new ListSelectElementImpl();
            selectElem.init(params);
            return selectElem;
        }
        elem;
        inputList = [];
        selectedList = [];
        visibleList = [];
        searchString = "";
        outputContainer;
        placeholderElem;
        outputTextElem;
        outputClearElem;
        outputPlusCountElem;
        dropdownArrowElem;
        dropdownContainerElem;
        dropdownListContainerElem;
        searchElem;
        searchClearElem;
        searchNoMatchElem;
        displayedElemList;
        selectAllElem;
        constructor() { }
        init(params) {
            try {
                this.inputList = params.list.map(x => new ValueSelection(x, false));
                this.initUI();
                js.dom.setText(this.placeholderElem, params.placeholder || "");
                this.initSelectedParam(params);
                if (params.keepDropdownOpen) {
                    this.onDocumentClick = js.fn.emptyFn;
                    this.showList(true);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getSelected() {
            try {
                return this.selectedList.map(x => x.value);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        onSelectionChanged(listener) {
            try {
                this.elem.addEventListener(ListSelectElementImpl.SELECTION_CHANGED, e => listener(...e.detail));
            }
            catch (e) {
                logError(e);
            }
        }
        setValue(value, selected) {
            try {
                const valueSelection = this.inputList.find(x => x.value == value);
                if (!valueSelection) {
                    info(ListSelectElementImpl.name, "not found - value: ", value);
                    return;
                }
                valueSelection.selected = selected;
                this.updateSelection(valueSelection);
                valueSelection.elem.changeSelected(selected);
            }
            catch (e) {
                logError(e);
            }
        }
        async refreshUI() {
            try {
                await js.dom.waitAnimationFrame();
                this.updateOutputSelection();
            }
            catch (e) {
                logError(e);
            }
        }
        initUI() {
            try {
                this.onDocumentClick = this.onDocumentClick.bind(this);
                this.initUIElems();
                this.addListeners();
            }
            catch (e) {
                logError(e);
            }
        }
        initUIElems() {
            try {
                const elem = this.elem = UIUtil.createElem({ template: "#list-select_template", preRender: true });
                this.placeholderElem = js.selector.selectFrom(elem, "[data-placeholder]");
                this.outputContainer = js.selector.selectFrom(this.elem, "[data-output_container]");
                this.outputTextElem = js.selector.selectFrom(this.outputContainer, "[data-output]");
                this.outputClearElem = js.selector.selectFrom(this.outputContainer, "[data-clear]");
                this.outputPlusCountElem = js.selector.selectFrom(this.outputContainer, "[data-plus_count]");
                this.dropdownArrowElem = js.selector.selectFrom(this.outputContainer, "[data-arrow]");
                this.dropdownContainerElem = js.selector.selectFrom(this.elem, "[data-dropdown_container]");
                this.dropdownListContainerElem = js.selector.selectFrom(this.dropdownContainerElem, "[data-dropdown_list_container]");
                this.searchElem = js.selector.selectFrom(this.dropdownContainerElem, "[data-search]");
                this.searchClearElem = js.selector.selectFrom(this.dropdownContainerElem, "[data-clear]");
                this.searchNoMatchElem = js.selector.selectFrom(this.dropdownContainerElem, "[data-no_match]");
                this.intiSelectAll();
            }
            catch (e) {
                logError(e);
            }
        }
        intiSelectAll() {
            try {
                const row = ListSelectRowElem.create(new ValueSelection(ListSelectElementImpl.TEXT_SELECT_ALL, false));
                const container = js.selector.selectFrom(this.elem, "[data-select_all_container]");
                js.dom.setContent(container, row.elem);
                this.selectAllElem = row;
            }
            catch (e) {
                logError(e);
            }
        }
        addListeners() {
            try {
                this.outputContainer.addEventListener("click", () => this.onOutputTextContainerClick());
                this.outputClearElem.addEventListener("click", (e) => this.onClearSelection(e));
                this.selectAllElem.onSelectionChange(() => this.onSelectAllClick());
                this.searchElem.addEventListener("input", () => this.onSearch());
                this.searchClearElem.addEventListener("click", () => this.onClearSearch());
            }
            catch (e) {
                logError(e);
            }
        }
        initSelectedParam(params) {
            try {
                if (!params.selected) {
                    return;
                }
                let valueObj;
                for (let value of params.selected) {
                    valueObj = this.inputList.find(x => x.value == value);
                    if (!valueObj) {
                        continue;
                    }
                    valueObj.selected = true;
                    this.updateSelectionList(valueObj);
                }
                this.updateSelectAll();
                this.updateOutputSelection();
            }
            catch (e) {
                logError(e);
            }
        }
        onOutputTextContainerClick() {
            try {
                const isShown = !this.dropdownContainerElem.classList.contains(VaultCSS.DIS_HIDE);
                if (isShown) {
                    this.showList(false);
                    return;
                }
                this.searchElem.value = "";
                this.searchString = "";
                this.showList(true);
            }
            catch (e) {
                logError(e);
            }
        }
        showList(show) {
            try {
                if (!show) {
                    this.hideList();
                    return;
                }
                js.dom.setContent(this.dropdownListContainerElem, this.getValueList());
                this.dropdownArrowElem.className = VaultCSS.UP_ARROW;
                this.updateSelectAll();
                js.dom.show(this.dropdownContainerElem);
                this.searchElem.focus();
                this.displayedElemList.length > 0 ? VUI.hide(this.searchNoMatchElem) : VUI.show(this.searchNoMatchElem);
                document.removeEventListener("click", this.onDocumentClick);
                document.addEventListener("click", this.onDocumentClick);
            }
            catch (e) {
                logError(e);
            }
        }
        getValueList() {
            try {
                const fragment = document.createDocumentFragment();
                const unselectedList = this.inputList.filter(x => !x.selected);
                const list = this.visibleList = this.filterSearch(this.selectedList).concat(this.filterSearch(unselectedList));
                const rowList = [];
                let row;
                for (let x of list) {
                    row = this.getListElem(x);
                    fragment.append(row.elem);
                    rowList.push(row);
                }
                this.displayedElemList = rowList;
                return fragment;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getListElem(selectObj) {
            try {
                const elem = ListSelectRowElem.create(selectObj);
                elem.onSelectionChange(() => this.onListSelectionChanged(selectObj));
                elem.changeSelected(selectObj.selected);
                return elem;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        onListSelectionChanged(valueSelection) {
            try {
                this.updateSelection(valueSelection);
                this.dispatchOnSelectionChanged();
            }
            catch (e) {
                logError(e);
            }
        }
        dispatchOnSelectionChanged() {
            this.elem.dispatchEvent(new CustomEvent(ListSelectElementImpl.SELECTION_CHANGED, { detail: [this.getSelected()] }));
        }
        updateSelection(valueSelection) {
            try {
                this.updateSelectionList(valueSelection);
                this.updateSelectAll();
                this.updateOutputSelection();
            }
            catch (e) {
                logError(e);
            }
        }
        updateSelectAll() {
            try {
                if (this.visibleList.length < 2) {
                    js.dom.hide(this.selectAllElem.elem);
                    return;
                }
                const selectAll = this.visibleList.some(x => !x.selected);
                this.selectAllElem.setText(selectAll ? ListSelectElementImpl.TEXT_SELECT_ALL : ListSelectElementImpl.TEXT_UNSELECT_ALL);
                this.selectAllElem.changeSelected(!selectAll);
                js.dom.show(this.selectAllElem.elem);
            }
            catch (e) {
                logError(e);
            }
        }
        filterSearch(list) {
            try {
                const searchString = this.searchString.toLowerCase();
                return list.filter(x => x.value.toLowerCase().includes(searchString));
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        hideList() {
            try {
                this.dropdownArrowElem.className = VaultCSS.DOWN_ARROW;
                this.dropdownContainerElem.classList.add(VaultCSS.DIS_HIDE);
                document.removeEventListener("click", this.onDocumentClick);
            }
            catch (e) {
                logError(e);
            }
        }
        onDocumentClick(e) {
            try {
                if (this.elem.contains(e.target)) {
                    return;
                }
                this.hideList();
            }
            catch (e) {
                logError(e);
            }
        }
        updateSelectionList(valueSelection) {
            try {
                if (valueSelection.selected) {
                    this.selectedList.push(valueSelection);
                    return;
                }
                js.array.removeElem(this.selectedList, valueSelection);
            }
            catch (e) {
                logError(e);
            }
        }
        onSearch() {
            try {
                this.searchString = this.searchElem.value;
                js.dom.showHide(this.searchString.length > 0, this.searchClearElem);
                this.showList(true);
            }
            catch (e) {
                logError(e);
            }
        }
        onClearSearch() {
            try {
                this.searchElem.value = "";
                this.onSearch();
            }
            catch (e) {
                logError(e);
            }
        }
        onSelectAllClick() {
            try {
                const selectAll = this.selectAllElem.isSelected();
                for (let x of this.visibleList) {
                    if (x.selected == selectAll) {
                        continue;
                    }
                    x.selected = selectAll;
                    this.updateSelectionList(x);
                }
                this.showList(true);
                this.updateOutputSelection();
                this.dispatchOnSelectionChanged();
            }
            catch (e) {
                logError(e);
            }
        }
        onClearSelection(e) {
            try {
                e.stopPropagation();
                this.inputList.forEach(x => x.selected = false);
                this.selectedList.length = 0;
                for (let row of this.displayedElemList) {
                    row.changeSelected(false);
                }
                this.selectAllElem.changeSelected(false);
                this.selectAllElem.setText(ListSelectElementImpl.TEXT_SELECT_ALL);
                this.updateOutputSelection();
                this.elem.dispatchEvent(new CustomEvent(ListSelectElementImpl.SELECTION_CHANGED, { detail: [[]] }));
            }
            catch (e) {
                logError(e);
            }
        }
        updateOutputSelection() {
            try {
                const selectedElems = this.selectedList;
                const hasSelections = selectedElems.length > 0;
                if (!hasSelections) {
                    js.dom.show(this.placeholderElem);
                    js.dom.hide(this.outputClearElem, this.outputTextElem, this.outputPlusCountElem);
                    return;
                }
                js.dom.show(this.outputClearElem, this.outputTextElem);
                js.dom.hide(this.placeholderElem);
                const maxI = this.getMaxSelectionTextAddable();
                const text = maxI > 0 ? selectedElems.slice(0, maxI).map(x => x.value).join(", ") : selectedElems[0].value;
                const ellipsis = maxI < selectedElems.length ? ", ..." : "";
                js.dom.setText(this.outputTextElem, text + ellipsis);
                const plusIndex = maxI > 0 ? maxI : 1;
                const plusCount = selectedElems.length - plusIndex;
                this.updatePlusCount(plusCount);
            }
            catch (e) {
                logError(e);
            }
        }
        updatePlusCount(count) {
            try {
                if (count == 0) {
                    js.dom.hide(this.outputPlusCountElem);
                    return;
                }
                js.dom.setText(this.outputPlusCountElem, "+" + count);
                js.dom.show(this.outputPlusCountElem);
            }
            catch (e) {
                logError(e);
            }
        }
        getMaxSelectionTextAddable() {
            try {
                js.dom.hide(this.outputPlusCountElem);
                const selectedElems = this.selectedList;
                this.outputTextElem.textContent = selectedElems.map(x => x.value).join(", ");
                if (!this.hasEllipsis(this.outputTextElem)) {
                    return selectedElems.length;
                }
                js.dom.show(this.outputPlusCountElem);
                for (let i = 1; i <= selectedElems.length; i++) {
                    this.outputTextElem.textContent = selectedElems.slice(0, i).map(x => x.value).join(", ") + ", ...";
                    if (this.hasEllipsis(this.outputTextElem)) {
                        return i - 1;
                    }
                }
                return selectedElems.length;
            }
            catch (e) {
                logError(e);
                return 0;
            }
        }
        hasEllipsis(elem) {
            try {
                const width = this.getTextWidth(elem.textContent);
                const parentWidth = elem.parentElement.offsetWidth;
                return width >= parentWidth;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        getTextWidth(s) {
            try {
                const span = document.createElement("span");
                span.textContent = s;
                document.body.append(span);
                const width = span.offsetWidth;
                span.remove();
                return width;
            }
            catch (e) {
                logError(e);
                return 0;
            }
        }
    }
    class ListSelectRowElem {
        valueSelection;
        static SELECTION_CHANGE_EVENT = "selectionChanged";
        static create(valueSelection) {
            const row = new ListSelectRowElem(valueSelection);
            row.initUI();
            return row;
        }
        elem;
        constructor(valueSelection) {
            this.valueSelection = valueSelection;
            valueSelection.elem = this;
        }
        initUI() {
            try {
                const elem = this.elem = UIUtil.createElem({ template: "#list-select-row_template" });
                js.dom.setChildText(elem, "[data-text]", this.valueSelection.value);
                this.addListeners();
            }
            catch (e) {
                logError(e);
            }
        }
        onSelectionChange(listener) {
            try {
                this.elem.addEventListener(ListSelectRowElem.SELECTION_CHANGE_EVENT, listener);
            }
            catch (e) {
                logError(e);
            }
        }
        setText(text) {
            js.dom.setChildText(this.elem, "[data-text]", text);
        }
        changeSelected(selected) {
            try {
                const inputElem = js.selector.selectFrom(this.elem, "input");
                inputElem.checked = selected;
            }
            catch (e) {
                logError(e);
            }
        }
        isSelected() {
            try {
                const inputElem = js.selector.selectFrom(this.elem, "input");
                return inputElem.checked;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        addListeners() {
            try {
                const inputElem = js.selector.selectFrom(this.elem, "input");
                inputElem.addEventListener("click", () => this.onCheckboxInput(inputElem.checked));
            }
            catch (e) {
                logError(e);
            }
        }
        onCheckboxInput(selected) {
            try {
                this.valueSelection.selected = selected;
                const event = new CustomEvent(ListSelectRowElem.SELECTION_CHANGE_EVENT, { detail: selected });
                this.elem.dispatchEvent(event);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class InputUtilImpl {
        focus(elem) {
            try {
                elem.focus();
                this.moveCursorToEnd(elem);
            }
            catch (e) {
                logError(e);
            }
        }
        moveCursorToEnd(elem) {
            try {
                elem.setSelectionRange(elem.value.length, elem.value.length);
            }
            catch (e) {
                logError(e);
            }
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

    class NotificationUtilImpl {
        DEFAULT_NOTIFICATION_SECONDS = 3;
        ERROR_NOTIFICATION_SECONDS = 5;
        INFO_NOTIFICATION_SECONDS = 4;
        notificationElem = null;
        hideTimeout = -1;
        init() {
            this.notificationElem = js.selector.select("#notification");
            this.notificationElem.addEventListener("mouseenter", () => clearTimeout(this.hideTimeout));
            this.notificationElem.addEventListener("mouseleave", () => this.mouseLeft());
            js.selector.selectFrom(this.notificationElem, "[data-close]").addEventListener("click", () => this.closeImmediately());
        }
        showSuccess(msg, seconds = this.DEFAULT_NOTIFICATION_SECONDS) {
            this.notificationElem.className = "notify clearfix notify-success";
            this.showNotification(msg + "", seconds);
        }
        showError(msg, seconds = this.ERROR_NOTIFICATION_SECONDS) {
            this.notificationElem.className = "notify clearfix notify-error";
            this.showNotification(ZVError.getUIErrorMsg(msg), seconds);
        }
        showInfo(msg, seconds = this.INFO_NOTIFICATION_SECONDS) {
            this.notificationElem.className = "notify clearfix notify-info";
            this.showNotification(ZVError.getUIErrorMsg(msg), seconds);
        }
        async showNotification(msg, seconds = 2) {
            this.closeImmediately();
            await js.dom.waitAnimationFrame();
            this.notificationElem.style.opacity = "0";
            const contentElem = js.selector.selectFrom(this.notificationElem, "[data-content]");
            js.dom.setText(contentElem, msg);
            this.notificationElem.style.display = "block";
            setTimeout(() => window.requestAnimationFrame(() => this.notificationElem.style.opacity = "1"), 0);
            this.hideTimeout = setTimeout(() => this.hideNotification(), seconds * 1000);
        }
        closeImmediately() {
            clearTimeout(this.hideTimeout);
            this.notificationElem.style.display = "none";
        }
        mouseLeft() {
            this.hideTimeout = setTimeout(() => this.hideNotification(), 0.8 * 1000);
        }
        hideNotification() {
            clearTimeout(this.hideTimeout);
            this.notificationElem.style.opacity = "0";
            this.hideTimeout = setTimeout(() => this.notificationElem.style.display = "none", 500);
        }
    }

    const DATA_CONTENT_KEY = "tooltip_content";
    const ICON_TOOLTIP_DATA_KEY = "icon_tooltip";
    class TooltipUtilImpl {
        tooltipElem = null;
        actionMsgElem = null;
        tooltipArrowElem = null;
        curTarget = null;
        showArrowBottom = false;
        actionTimeout = -1;
        init() {
            this.tooltipElem = js.selector.select("#tooltip_elem");
            this.actionMsgElem = js.selector.select("#elem_msg_action");
            this.tooltipArrowElem = js.selector.select("#tooltip_arrow");
            document.addEventListener("mouseover", this.handleMouseOver.bind(this));
            document.addEventListener("click", this.handleMouseClick.bind(this));
            this.actionMsgElem.addEventListener("mouseleave", this.handleActionMsgMouseLeave.bind(this));
        }
        showActionMsg(e, message, seconds = 1.5) {
            const SPACE = 10;
            const rect = {
                left: e.clientX - SPACE,
                right: e.clientX + SPACE,
                top: e.clientY - SPACE,
                bottom: e.clientY + SPACE,
                width: 2 * SPACE,
                height: 2 * SPACE
            };
            this.showMessageFn(rect, message, seconds);
        }
        showElemMsg(elem, message, seconds = 1.5) {
            this.showMessageFn(elem.getBoundingClientRect(), message, seconds);
        }
        showMessageFn(elemRect, message, seconds = 1.5) {
            clearTimeout(this.actionTimeout);
            this.actionMsgElem.style.opacity = "0";
            this.actionMsgElem.textContent = message;
            this.showContentElem(this.actionMsgElem, elemRect);
            setTimeout(() => window.requestAnimationFrame(() => this.actionMsgElem.style.opacity = "1"), 200);
            this.actionTimeout = setTimeout(() => this.hideActionMsg(), (seconds + 0.5) * 1000);
        }
        handleMouseOver(e) {
            const target = e.target;
            if (this.curTarget && (target == this.curTarget || this.curTarget.contains(target))) {
                return;
            }
            const showTooltip = this.checkShowTooltip(target);
            if (!showTooltip) {
                this.hideTooltip();
                return;
            }
            this.curTarget = target;
            this.tooltipElem.textContent = this.getTooltipContent(target);
            this.tooltipElem.style.opacity = "0";
            this.tooltipArrowElem.style.opacity = "0";
            this.showContentElem(this.tooltipElem, target.getBoundingClientRect());
            if (Boolean(target.dataset[ICON_TOOLTIP_DATA_KEY])) {
                this.showTooltipArrow(target.getBoundingClientRect());
            }
            setTimeout(() => window.requestAnimationFrame(() => {
                this.tooltipElem.style.opacity = "1";
                this.tooltipArrowElem.style.opacity = "1";
            }), 500);
        }
        showContentElem(contentElem, elemRect) {
            js.dom.hideOld(this.tooltipArrowElem);
            const contentRect = js.dom.getContentRect(contentElem);
            const elemMid = elemRect.left + (elemRect.width / 2);
            let left = elemMid - (contentRect.width / 2);
            if (left < 0) {
                left = 0;
            }
            else if (left + contentRect.width > document.documentElement.clientWidth) {
                left = document.documentElement.clientWidth - contentRect.width;
            }
            contentElem.style.left = left + "px";
            this.showArrowBottom = false;
            const TOP_SPACE = 16;
            let top = elemRect.bottom + TOP_SPACE;
            if (top + contentRect.height > document.documentElement.clientHeight) {
                top = elemRect.top - TOP_SPACE - contentRect.height;
                this.showArrowBottom = true;
            }
            contentElem.style.top = top + "px";
            js.dom.showOld(contentElem);
        }
        showTooltipArrow(elem_rect) {
            const ARROW_HALF_WIDTH = 7;
            const ARROW_HEIGHT = 8;
            const ARROW_SEP_SPACE = 8;
            let borderTop = "0px";
            let borderBottom = "8px";
            let top = elem_rect.bottom + ARROW_SEP_SPACE;
            if (this.showArrowBottom) {
                top = elem_rect.top - ARROW_SEP_SPACE - ARROW_HEIGHT;
                borderTop = "8px";
                borderBottom = "0px";
            }
            this.tooltipArrowElem.style.borderTopWidth = borderTop;
            this.tooltipArrowElem.style.borderBottomWidth = borderBottom;
            this.tooltipArrowElem.style.left = elem_rect.left + (elem_rect.width / 2) - ARROW_HALF_WIDTH + "px";
            this.tooltipArrowElem.style.top = top + "px";
            js.dom.showOld(this.tooltipArrowElem);
        }
        checkShowTooltip(target) {
            if (!target.dataset[DATA_CONTENT_KEY]) {
                return false;
            }
            if (target.dataset[ICON_TOOLTIP_DATA_KEY]) {
                return true;
            }
            if (js.dom.hasEllipsis(target)) {
                return true;
            }
            return false;
        }
        getTooltipContent(elem) {
            const tooltipText = elem.dataset[DATA_CONTENT_KEY];
            return tooltipText.startsWith("i18n:") ? i18n(tooltipText.slice(5)) : tooltipText;
        }
        hideTooltip() {
            js.dom.hideOld(this.tooltipArrowElem, this.tooltipElem);
            this.curTarget = null;
        }
        handleMouseClick() {
            this.hideTooltip();
        }
        handleActionMsgMouseLeave() {
            this.actionMsgElem.style.opacity = "0";
            setTimeout(() => this.hideActionMsg(), 500);
        }
        hideActionMsg() {
            this.actionMsgElem.style.display = "none";
        }
    }

    class _ChildUtil {
        static removeIfPresent(elem, childSelector) {
            try {
                const parentElem = js.selector.select(elem);
                if (!parentElem) {
                    throw jserror("PARENT_ELEM_NOT_FOUND: " + elem);
                }
                const childElem = js.selector.selectFrom(parentElem, childSelector);
                if (childElem) {
                    childElem.remove();
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class UIElemContainer {
        container;
        select(selector) {
            return js.selector.selectFrom(this.container, selector);
        }
    }

    class GeneratorActionsUIElem extends UIElemContainer {
        gg;
        constructor(gg) {
            super();
            this.gg = gg;
        }
        saveButton;
        historyButton;
        copyButton;
        generateButton;
        init() {
            this.container = this.gg.generator.elem.select("#generatorActionList");
            this.saveButton = this.select("#saveGeneratedValue");
            this.historyButton = this.gg.generator.elem.select(`[data-action="showGeneratorHistory"]`);
            this.copyButton = this.select("#copyGeneratedValue");
            this.generateButton = this.select("#generateValue");
        }
    }
    class GeneratorActionsUI {
        gg;
        elem;
        constructor(gg) {
            this.gg = gg;
            this.elem = new GeneratorActionsUIElem(this.gg);
        }
        async showUI() {
            try {
                this.elem.init();
                this.addListeners();
            }
            catch (e) {
                logError(e);
            }
        }
        async saveListener() {
            try {
                const password = this.gg.generator.outUI.getPassword();
                await bgApi.ztab.saveGeneratedPassword(password);
            }
            catch (e) {
                logError(e);
            }
        }
        async copyPassword(password) {
            try {
                await bgApi.other.copyToClipboard(password, { noAutoClear: true });
                bgApi.generator.history.add(password);
                this.gg.generator.data.saveLastUsedPassword(password);
                this.gg.generator.outUI.setColoredOut(false);
            }
            catch (e) {
                logError(e);
            }
        }
        addListeners() {
            try {
                this.elem.saveButton?.addEventListener?.("click", () => this.saveListener());
                this.elem.historyButton.addEventListener("click", () => this.gg.generator.history.showUI());
                this.elem.copyButton.addEventListener("click", e => this.onCopy(e));
                this.elem.generateButton.addEventListener("click", () => this.gg.generator.generateListener());
            }
            catch (e) {
                logError(e);
            }
        }
        async onCopy(e) {
            try {
                const password = this.gg.generator.outUI.getPassword();
                await this.copyPassword(password);
                VUI.tooltip.showActionMsg(e, i18n(VI18N.COPIED));
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class GeneratorOutTextUIElem extends UIElemContainer {
        gg;
        generatedPasswordElem;
        strengthBarElem;
        strengthElem;
        constructor(gg) {
            super();
            this.gg = gg;
        }
        init() {
            this.container = this.gg.generator.elem.container;
            this.generatedPasswordElem = this.select(`[data-name="generatedPassword"]`);
            this.strengthElem = this.select(`[data-name="passwordStrength"]`);
            this.strengthBarElem = this.select(`[data-name="strength_bar"]`);
        }
    }

    class GeneratorOutTextUIImpl {
        gg;
        elem = null;
        USED_PASS_CLASS = "zv-generator-used-pass";
        constructor(gg) {
            this.gg = gg;
            this.elem = new GeneratorOutTextUIElem(this.gg);
            js.fn.bindThis(this, [this.onGeneratedPasswordKeyDown]);
        }
        async showUI() {
            try {
                this.elem.init();
                this.addListeners();
            }
            catch (e) {
                logError(e);
            }
        }
        setPassword(password) {
            try {
                const generatedPasswordElem = this.elem.generatedPasswordElem;
                js.dom.setContent(generatedPasswordElem, VUI.password.getColoredPassword(password));
                this.setColoredOut(true);
            }
            catch (e) {
                logError(e);
            }
        }
        getPassword() {
            try {
                return this.elem.generatedPasswordElem.textContent;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        setStrength(strength) {
            try {
                const strengthElem = this.elem.strengthElem;
                strengthElem.style.width = (strength || 10) + "%";
                let colors = ["#ff0000", "#F75D56", "#FAA53F", "#00C5E4", "#3EB17D", "#3EB17D"];
                strengthElem.style.backgroundColor = colors[(strength / 20) >> 0];
                this.setColoredOut(true);
            }
            catch (e) {
                logError(e);
            }
        }
        showStrengthBar(show) {
            try {
                js.dom.showIf(show, this.elem.strengthBarElem);
            }
            catch (e) {
                logError(e);
            }
        }
        setKeyListener(listener) {
            try {
                this.keyListener = listener;
            }
            catch (e) {
                logError(e);
            }
        }
        setColoredOut(enable) {
            try {
                if (enable) {
                    this.elem.generatedPasswordElem.classList.remove(this.USED_PASS_CLASS);
                    return;
                }
                this.elem.generatedPasswordElem.classList.add(this.USED_PASS_CLASS);
            }
            catch (e) {
                logError(e);
            }
        }
        addListeners() {
            try {
                this.elem.generatedPasswordElem.addEventListener("mouseenter", function () { this.focus(); });
                this.elem.generatedPasswordElem.addEventListener("mouseleave", function () { this.blur(); });
                this.elem.generatedPasswordElem.addEventListener("keydown", this.onGeneratedPasswordKeyDown);
                this.elem.generatedPasswordElem.addEventListener("copy", e => this.onSelectedCopyInput(e));
            }
            catch (e) {
                logError(e);
            }
        }
        onGeneratedPasswordKeyDown(e) {
            try {
                const isControlKey = js.event.isControlKey(e);
                if (isControlKey) {
                    switch (e.key) {
                        case "Backspace":
                            setTimeout(() => this.keyListener(), 0);
                            break;
                    }
                    return;
                }
                js.event.preventDefault(e, true);
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                const x = VUI.password.getColoredChar(e.key);
                const rangeEndElem = range.endContainer;
                this.addGeneratorChar(x, rangeEndElem);
                selection.removeAllRanges();
                range.setStart(x, x.childNodes.length);
                range.setEnd(x, x.childNodes.length);
                selection.addRange(range);
                this.keyListener();
                x?.scrollIntoView?.();
            }
            catch (e) {
                logError(e);
            }
        }
        addGeneratorChar(ch, rangeEndElem) {
            try {
                if (rangeEndElem instanceof HTMLDivElement) {
                    rangeEndElem.append(ch);
                    _ChildUtil.removeIfPresent(rangeEndElem, "br");
                    return;
                }
                if (rangeEndElem instanceof HTMLElement) {
                    rangeEndElem.after(ch);
                    return;
                }
                rangeEndElem.parentElement.after(ch);
            }
            catch (e) {
                logError(e);
            }
        }
        keyListener() { }
        async onSelectedCopyInput(e) {
            try {
                js.event.preventDefault(e, true);
                const password = document.getSelection().toString() || this.getPassword();
                await this.gg.generator.actions.copyPassword(password);
                VUI.tooltip.showElemMsg(this.elem.generatedPasswordElem, i18n(VI18N.COPIED));
            }
            catch (e) {
                logError(e);
            }
        }
    }

    var GeneratorSubTab;
    (function (GeneratorSubTab) {
        GeneratorSubTab["PASSWORD"] = "PASSWORD";
        GeneratorSubTab["PASSPHRASE"] = "PASSPHRASE";
    })(GeneratorSubTab || (GeneratorSubTab = {}));

    class GeneratorSubTabUIElem extends UIElemContainer {
        gg;
        passwordTab;
        passphraseTab;
        constructor(gg) {
            super();
            this.gg = gg;
        }
        init() {
            this.container = this.gg.generator.elem.container;
            this.passwordTab = this.select("#generatorPasswordTab");
            this.passphraseTab = this.select("#generatorPassphraseTab");
        }
    }
    class GeneratorSubTabUI {
        gg;
        elem;
        HIGHLIGHT_CLASS = "generator-tabs-selected";
        constructor(gg) {
            this.gg = gg;
            this.elem = new GeneratorSubTabUIElem(this.gg);
        }
        showUI() {
            try {
                this.elem.init();
                this.addListeners();
            }
            catch (e) {
                logError(e);
            }
        }
        highlight(tab) {
            try {
                VUI.highlightNav({ highlightClass: this.HIGHLIGHT_CLASS, targetElem: this.getTabElem(tab) });
            }
            catch (e) {
                logError(e);
            }
        }
        getTabElem(tab) {
            try {
                switch (tab) {
                    case GeneratorSubTab.PASSWORD:
                        return this.elem.passwordTab;
                    case GeneratorSubTab.PASSPHRASE:
                        return this.elem.passphraseTab;
                    default:
                        throw ErrorCode.UNHANDLED_CASE;
                }
            }
            catch (e) {
                logError(e);
                return this.elem.passwordTab;
            }
        }
        addListeners() {
            try {
                this.elem.passwordTab.addEventListener("click", () => this.gg.generator.showTab(GeneratorSubTab.PASSWORD));
                this.elem.passphraseTab.addEventListener("click", () => this.gg.generator.showTab(GeneratorSubTab.PASSPHRASE));
            }
            catch (e) {
                logError(e);
            }
        }
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

    class ZCrypt {
        async encrypt(plaintext, isShared) {
            return bgApi.crypto.encrypt(plaintext, isShared);
        }
        async decrypt(ciphertext, isShared) {
            return bgApi.crypto.decrypt(ciphertext, isShared);
        }
        async fileEncrypt(plaintext, isShared) {
            return bgApi.crypto.file.encrypt(plaintext, isShared);
        }
        async fileDecrypt(ciphertext = "", isShared) {
            return bgApi.crypto.file.decrypt(ciphertext, isShared);
        }
        async extEncrypt(plaintext) {
            return bgApi.crypto.ext.encrypt(plaintext);
        }
        async extDecrypt(ciphertext) {
            return bgApi.crypto.ext.decrypt(ciphertext);
        }
    }
    const zcrypt = new ZCrypt();
    setGlobal("zcrypt", zcrypt);

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

    class LastUsedPassword {
        password = "";
        validUpto = 0;
    }
    class GeneratorDatamImpl {
        PLUS_LAST_COPIED_VALID_MS = 2 * 60 * 1000;
        state = {
            curTab: GeneratorSubTab.PASSWORD,
            passwordTab: {
                lastUsedPassword: new LastUsedPassword(),
                options: {
                    length: Policy.CUSTOM_POLICY_DEFAULT_LENGTH,
                    policyId: Policy.CUSTOM_POLICY_ID,
                    excludeChars: "",
                    lowercase: true,
                    uppercase: true,
                    splChar: true,
                    number: true
                }
            },
            passphraseTab: {
                lastUsedPassword: new LastUsedPassword(),
                options: {
                    noOfWords: 4,
                    reqCapital: false,
                    reqNumber: false,
                    separator: "-",
                }
            }
        };
        policyList;
        async init() {
            try {
                await Promise.all([
                    this.initPolicyList(),
                    this.loadStoredData(),
                ]);
            }
            catch (e) {
                logError(e);
            }
        }
        async saveCurTab(tab) {
            try {
                this.state.curTab = tab;
                await this.saveState();
            }
            catch (e) {
                logError(e);
            }
        }
        async saveLastUsedPassword(password) {
            try {
                const lastUsedObj = this.getLastUsedObj();
                lastUsedObj.password = await zcrypt.extEncrypt(password);
                lastUsedObj.validUpto = Date.now() + this.PLUS_LAST_COPIED_VALID_MS;
                await this.saveState();
            }
            catch (e) {
                logError(e);
            }
        }
        async saveGeneratePasswordOptions(options) {
            try {
                this.state.passwordTab.options = options;
                await this.saveState();
            }
            catch (e) {
                logError(e);
            }
        }
        async saveGeneratePassphraseOptions(options) {
            try {
                this.state.passphraseTab.options = options;
                await this.saveState();
            }
            catch (e) {
                logError(e);
            }
        }
        async newPasswordGenerated() {
            try {
                const lastUsedObj = this.getLastUsedObj();
                lastUsedObj.validUpto = 0;
                await this.saveState();
            }
            catch (e) {
                logError(e);
            }
        }
        getLastUsedObj() {
            try {
                switch (this.state.curTab) {
                    case GeneratorSubTab.PASSWORD:
                        return this.state.passwordTab.lastUsedPassword;
                    case GeneratorSubTab.PASSPHRASE:
                        return this.state.passphraseTab.lastUsedPassword;
                    default:
                        throw ErrorCode.UNHANDLED_CASE;
                }
            }
            catch (e) {
                logError(e);
                return new LastUsedPassword();
            }
        }
        async saveState() {
            try {
                await zlocalStorage.save(LocalStorageKeys.GENERATOR_STATE, this.state);
            }
            catch (e) {
                logError(e);
            }
        }
        async initPolicyList() {
            try {
                this.policyList = await bgApi.policy.getAll();
            }
            catch (e) {
                logError(e);
            }
        }
        async loadStoredData() {
            try {
                const existing = await zlocalStorage.loadAll({
                    [LocalStorageKeys.GENERATOR_STATE]: this.state,
                });
                this.state = existing[LocalStorageKeys.GENERATOR_STATE];
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class GeneratorUIElem extends UIElemContainer {
        init() {
            this.container = UIUtil.createElem({ template: "#page_generator", preRender: true });
        }
    }

    class GG {
        generator;
        constructor(generator) {
            this.generator = generator;
        }
    }

    class _AlertBuilder {
        params = {};
        text(text) {
            this.params.text = text;
            return this;
        }
        title(title) {
            this.params.title = title;
            return this;
        }
        icon(icon) {
            this.params.icon = icon;
            return this;
        }
        button(button) {
            this.params.button = button;
            return this;
        }
        buttons(buttons) {
            this.params.buttons = buttons;
            return this;
        }
        addButton(name, button) {
            if (!this.params.buttons) {
                this.params.buttons = {};
            }
            this.params.buttons[name] = button;
            return this;
        }
        content(contentElem) {
            this.params.content = contentElem;
            return this;
        }
        className(className) {
            this.params.className = className;
            return this;
        }
        dangerMode(dangerMode) {
            this.params.dangerMode = dangerMode;
            return this;
        }
        async show() {
            return sweetAlert(this.params);
        }
    }
    class _ButtonBuilder {
        obj = {
            text: "",
            value: true,
            visible: true,
            className: "",
            closeModal: true
        };
        text(text) {
            this.obj.text = text;
            return this;
        }
        value(value) {
            this.obj.value = value;
            return this;
        }
        className(className) {
            this.obj.className = className;
            return this;
        }
        build() {
            return this.obj;
        }
    }
    class _AlertUI {
        static instance = null;
        static get inst() {
            return this.instance || (this.instance = new _AlertUI());
        }
        createAlert() {
            return new _AlertBuilder();
        }
        createButton() {
            return new _ButtonBuilder();
        }
        async confirmDelete(title, deleteButtonText, canelButtonText = i18n(VI18N.CANCEL)) {
            try {
                return await new _AlertBuilder()
                    .title(title)
                    .buttons({
                    confirm: {
                        text: deleteButtonText,
                        value: true,
                    },
                    cancel: {
                        text: canelButtonText,
                        value: false,
                        visible: true,
                    }
                })
                    .dangerMode(true)
                    .show();
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    var KeyboardKeys;
    (function (KeyboardKeys) {
        KeyboardKeys["ARROW_UP"] = "ArrowUp";
        KeyboardKeys["ARROW_DOWN"] = "ArrowDown";
        KeyboardKeys["ARROW_LEFT"] = "ArrowLeft";
        KeyboardKeys["ARROW_RIGHT"] = "ArrowRight";
        KeyboardKeys["SPACE"] = " ";
        KeyboardKeys["ENTER"] = "Enter";
        KeyboardKeys["ESCAPE"] = "Escape";
        KeyboardKeys["META"] = "Meta";
        KeyboardKeys["CONTROL"] = "Control";
        KeyboardKeys["SHIFT"] = "Shift";
        KeyboardKeys["/"] = "/";
        KeyboardKeys["c"] = "c";
        KeyboardKeys["u"] = "u";
        KeyboardKeys["p"] = "p";
        KeyboardKeys["l"] = "l";
        KeyboardKeys["t"] = "t";
        KeyboardKeys["o"] = "o";
        KeyboardKeys["d"] = "d";
    })(KeyboardKeys || (KeyboardKeys = {}));

    class ZErrors {
        OFFLINE = "Z_OFFLINE";
        NOT_FOUND = "Z_NOT_FOUND";
        NOT_SUPPORTED = "Z_NOT_SUPPORTED";
        TIMED_OUT = "Z_TIMED_OUT";
        INVALID_PASSPHRASE_SYNC = "INVALID_PASSPHRASE_SYNC";
    }
    const zerror = new ZErrors();
    setGlobal("zerror", zerror);

    class GlobalNodeData {
        static instance = null;
        static inst() {
            return this.instance || (this.instance = new GlobalNodeData());
        }
        dataType = {
            NODE: "NODE",
            FOCUS: "FOCUS",
            BLUR: "BLUR",
            CLICK: "CLICK",
            INPUT: "INPUT",
            KEYDOWN: "KEYDOWN",
            KEYUP: "KEYUP",
            KEYPRESS: "KEYPRESS",
            ENTER: "ENTER",
            CHANGE: "CHANGE",
            ESCAPE: "ESCAPE",
            COPY: "COPY",
            PASTE: "PASTE"
        };
        keys = {
            [this.dataType.NODE]: Symbol(),
            [this.dataType.FOCUS]: Symbol(),
            [this.dataType.BLUR]: Symbol(),
            [this.dataType.CLICK]: Symbol(),
            [this.dataType.INPUT]: Symbol(),
            [this.dataType.KEYDOWN]: Symbol(),
            [this.dataType.KEYUP]: Symbol(),
            [this.dataType.KEYPRESS]: Symbol(),
            [this.dataType.ENTER]: Symbol(),
            [this.dataType.CHANGE]: Symbol(),
            [this.dataType.ESCAPE]: Symbol(),
            [this.dataType.COPY]: Symbol(),
            [this.dataType.PASTE]: Symbol()
        };
        setData(node, dataType, data) {
            node[this.getKey(dataType)] = data;
        }
        getData(node, dataType) {
            return node[this.getKey(dataType)] || null;
        }
        getNodeData(node, defaultValue = null) {
            return this.getData(node, this.dataType.NODE) || defaultValue;
        }
        setNodeData(node, data) {
            return this.setData(node, this.dataType.NODE, data);
        }
        getClickData(node) {
            return this.getData(node, this.dataType.CLICK);
        }
        setClickData(node, data) {
            return this.setData(node, this.dataType.CLICK, data);
        }
        setCustomData(node, data, key) {
            node[key] = data;
        }
        getCustomData(node, key) {
            return node[key];
        }
        getKey(dataType) {
            const key = this.keys[dataType];
            if (!key) {
                throw new Error("not_found");
            }
            return key;
        }
    }
    const globalNodeData = new GlobalNodeData();
    setGlobal("globalNodeData", globalNodeData);

    class GlobalDomListener {
        listenerObjMap = new Map();
        init() {
            const p = document.documentElement;
            p.addEventListener("focusin", e => this.callListener(e, "on_focus", globalNodeData.dataType.FOCUS));
            p.addEventListener("focusout", e => this.callListener(e, "on_blur", globalNodeData.dataType.BLUR));
            p.addEventListener("click", e => this.callListener(e, "on_click", globalNodeData.dataType.CLICK));
            p.addEventListener("input", e => this.callListener(e, "on_input", globalNodeData.dataType.INPUT));
            p.addEventListener("change", e => this.callListener(e, "on_change", globalNodeData.dataType.CHANGE));
            p.addEventListener("keydown", e => this.callListener(e, "on_keydown", globalNodeData.dataType.KEYDOWN));
            p.addEventListener("keypress", e => this.callListener(e, "on_keypress", globalNodeData.dataType.KEYPRESS));
            p.addEventListener("keyup", e => this.keyuped(e));
            p.addEventListener("copy", e => this.callListener(e, "on_copy", globalNodeData.dataType.COPY));
            p.addEventListener("paste", e => this.callListener(e, "on_paste", globalNodeData.dataType.PASTE));
        }
        register(listenerName, listenerObj) {
            this.listenerObjMap.set(listenerName, listenerObj);
        }
        callListener(e, dataKey, eventDataType) {
            const target = e.target.closest("[data-" + dataKey + "]");
            if (!target || !target.dataset[dataKey]) {
                return;
            }
            const listenerKeyString = target.dataset[dataKey];
            const [listenerObjName, listenerFnName] = listenerKeyString.split(".");
            const finalListenerName = this.getListenerObjName(target, listenerObjName);
            const listenerObj = this.listenerObjMap.get(finalListenerName);
            if (!listenerObj || !listenerObj[listenerFnName]) {
                throw new Error(zerror.NOT_FOUND + " " + listenerKeyString);
            }
            const eventData = globalNodeData.getData(target, globalNodeData.dataType[eventDataType]);
            const nodeData = globalNodeData.getNodeData(target);
            listenerObj[listenerFnName].call(listenerObj, e, eventData, nodeData);
        }
        getListenerObjName(target, inputName) {
            try {
                const requireNoSubstitution = !inputName.startsWith("$");
                if (requireNoSubstitution) {
                    return inputName;
                }
                const dataParent = js.selector.closest(target, "[data-on_parent]");
                const listenerName = dataParent.dataset.on_parent;
                return listenerName;
            }
            catch (e) {
                logError(e);
                return inputName;
            }
        }
        keyuped(e) {
            switch (e.key) {
                case "Enter":
                    this.callListener(e, "on_enter", globalNodeData.dataType.ENTER);
                    break;
                case "Escape":
                    this.callListener(e, "on_escape", globalNodeData.dataType.ESCAPE);
                    break;
                default:
                    this.callListener(e, "on_keyup", globalNodeData.dataType.KEYUP);
                    break;
            }
        }
    }
    const globalDomListener = new GlobalDomListener();
    setGlobal("globalDomListener", globalDomListener);

    class UIUtil1 {
        static instance = null;
        static get inst() {
            return this.instance || (this.instance = new UIUtil1());
        }
        init() {
            try {
                if (!isDevMode) {
                    js.dom.disableRightClick();
                }
                globalDomListener.init();
                this.handleGlobalErrors();
                this.setupInactivityMonitor();
            }
            catch (e) {
                logError(e);
            }
        }
        showSearchClear(input) {
            try {
                let clearElem = null;
                const hasParentSelector = Boolean(input.dataset.clear_parent_selector);
                if (hasParentSelector) {
                    const parentElem = js.selector.closest(input, input.dataset.clear_parent_selector);
                    clearElem = js.selector.selectFrom(parentElem, input.dataset.clear_selector);
                }
                else {
                    clearElem = js.selector.select("#" + input.dataset.clear_id);
                }
                if (!clearElem) {
                    throw "cannot find clear elem";
                }
                js.dom.showIf(input.value.length > 0, clearElem);
            }
            catch (e) {
                throw jserror(e);
            }
        }
        clickedClearSearch(e) {
            const closeElem = js.selector.closest(e.target, "[data-on_click]");
            const inputElem = js.selector.select(closeElem.dataset.clear_input);
            this.clearInput(inputElem);
        }
        clickedShowHidePassphrase(e) {
            const eyeContainer = js.selector.closest(e.target, "[data-eye_for]");
            const eyeIcon = js.selector.selectFrom(eyeContainer, "i");
            const inputParentSelector = eyeContainer.dataset.eye_input_parent;
            let input;
            if (inputParentSelector) {
                const inputContainer = js.selector.closest(e.target, inputParentSelector);
                input = js.selector.selectFrom(inputContainer, eyeContainer.dataset.eye_for);
            }
            else {
                input = js.selector.select(eyeContainer.dataset.eye_for);
            }
            const hidePassword = input.type == "text";
            const autoHide = eyeContainer.dataset.auto_hide_eye !== undefined;
            if (hidePassword) {
                input.type = "password";
                eyeIcon.dataset.tooltip_content = "i18n:view";
                eyeIcon.className = "icon-view";
                if (autoHide) {
                    clearTimeout(+eyeContainer.dataset.auto_hide_timeout);
                }
                return;
            }
            input.type = "text";
            eyeIcon.dataset.tooltip_content = "i18n:hide";
            eyeIcon.className = "icon-hide";
            if (autoHide) {
                eyeContainer.dataset.auto_hide_timeout = "" + setTimeout(() => this.clickedShowHidePassphrase(e), 10000);
            }
        }
        handleGlobalErrors() {
            window.addEventListener("error", function (e) {
                if (e.defaultPrevented) {
                    return;
                }
                const errorMsg = e.error?.message || e.message;
                console.error(e, "window error...", e);
                if (e.target instanceof HTMLImageElement) {
                    return;
                }
                const reqErrorMsg = errorMsg ? errorMsg.replace(/^.*ZV:/, "ZV:") : "ZV: Uncaught window error";
                VUI.notification.showError(reqErrorMsg);
            }, true);
            window.addEventListener("unhandledrejection", function (e) {
                if (e.defaultPrevented) {
                    return;
                }
                ZVError.error(e);
                console.error(e, "unhandled rejection...: ", arguments);
                VUI.notification.showError(e.reason);
            }, true);
        }
        async scrollIntoView(elem) {
            try {
                const isVisible = await this.isVisible(elem);
                if (isVisible) {
                    return;
                }
                elem.scrollIntoView();
            }
            catch (e) {
                logError(e);
            }
        }
        async isVisible(elem) {
            try {
                const promise = js.promise.createNew();
                const observer = new IntersectionObserver(function (records, observer) {
                    promise.resolve(records[0].isIntersecting);
                    observer.disconnect();
                });
                observer.observe(elem);
                const isVisible = await promise;
                if (!isVisible) {
                    return false;
                }
                const isInFront = this.isVisibleZIndex(elem);
                return isInFront;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        isVisibleZIndex(elem = new HTMLElement()) {
            const rect = elem.getBoundingClientRect();
            let left = Math.max(0, rect.left);
            let top = Math.max(0, rect.top);
            let right = Math.min(document.documentElement.clientWidth, rect.right);
            let bottom = Math.min(document.documentElement.clientHeight, rect.bottom);
            let x = left + (right - left) / 2;
            let y = top + (bottom - top) / 2;
            const elemAtXY = document.elementFromPoint(x, y);
            if (!elemAtXY) {
                return false;
            }
            if (elem.contains(elemAtXY) || elemAtXY.offsetWidth <= (elem.offsetWidth + 100)) {
                return true;
            }
            return false;
        }
        clearInput(inputElem) {
            try {
                inputElem.value = "";
                inputElem.dispatchEvent(new KeyboardEvent("keyup", {
                    view: window,
                    bubbles: true,
                    cancelable: true
                }));
                inputElem.focus();
            }
            catch (e) {
                throw jserror(e);
            }
        }
        setupInactivityMonitor() {
            function updateLastActive() {
                bgApi.other.updateLastActive();
            }
            document.addEventListener("click", updateLastActive);
            document.addEventListener("keyup", updateLastActive);
        }
        async copySelection(e) {
            e.preventDefault();
            const selection = document.getSelection() + "";
            await bgApi.other.copyToClipboard(selection);
        }
        async waitForConnectable() {
            let connectable = false;
            while (true) {
                connectable = await bgApi.login.checkConnectable();
                if (connectable) {
                    return;
                }
                await js.time.delay(0.1);
            }
        }
        slimScroll(elem, height = "100%", width = "100%") {
            const reqHeight = typeof height == "string" ? height : Math.ceil(height) + "px";
            const reqWidth = typeof width == "string" ? width : Math.ceil(width) + "px";
            $(elem).slimScroll({
                height: reqHeight,
                wheelStep: 10,
                touchScrollStep: 75,
                width: reqWidth
            });
        }
        slimScrollRemove(elem) {
            $(elem).slimScroll({ destroy: true });
        }
        showOpenedEyeIcon(elem) {
            try {
                const eyeIcon = js.selector.selectFrom(elem, "i.icon-hide");
                eyeIcon.dataset.tooltip_content = "i18n:view";
                eyeIcon.className = "icon-view";
            }
            catch (e) {
                logError(e);
            }
        }
        showClosedEyeIcon(elem) {
            try {
                const eyeIcon = js.selector.selectFrom(elem, "i.icon-view");
                eyeIcon.dataset.tooltip_content = "i18n:hide";
                eyeIcon.className = "icon-hide";
            }
            catch (e) {
                logError(e);
            }
        }
        addSearchListener(searchElem, clearElem, listener) {
            try {
                function clear() {
                    searchElem.value = "";
                    listener("");
                    js.dom.hideOld(clearElem);
                    searchElem.focus();
                }
                searchElem.addEventListener("keyup", function (e) {
                    if (e.key == KeyboardKeys.ESCAPE) {
                        clear();
                        return;
                    }
                    if (VUI.keyboard.isControlKey(e.key)) {
                        return;
                    }
                    listener(searchElem.value);
                    js.dom.showIf(searchElem.value.length > 0, clearElem);
                });
                clearElem.addEventListener("click", clear);
            }
            catch (e) {
                logError(e);
            }
        }
        showAddLikeForm(containerElem, contentElem, overlaySelector) {
            const container = js.selector.select(containerElem);
            js.dom.setContent(containerElem, js.selector.select(contentElem));
            container.style.right = "0px";
            js.dom.showOld(overlaySelector);
        }
        hideAddLikeForm(containerElem, overlaySelector) {
            const container = js.selector.select(containerElem);
            container.style.right = "-710px";
            container.textContent = "";
            js.dom.hideOld(overlaySelector);
        }
    }
    const uiUtilOld = new UIUtil1();
    setGlobal("uiUtil", uiUtilOld);

    class GeneratorHistoryData {
        history;
        async init() {
            try {
                this.history = await bgApi.generator.history.get();
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class GeneratorHistoryElem extends UIElemContainer {
        gg;
        closeElem;
        clearElem;
        historyList;
        emptyUIElem;
        constructor(gg) {
            super();
            this.gg = gg;
            this.gg;
        }
        init() {
            try {
                this.container = UIUtil.createElem({ preRender: true, template: "#generator_history_template" });
                this.closeElem = this.select(`[data-action="close"]`);
                this.clearElem = this.select(`[data-action="clear"]`);
                this.historyList = this.select(`[data-out="history_list"]`);
                this.emptyUIElem = this.select(`[data-name="empty_history"]`);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class GeneratorHistoryListCreatorImpl {
        gg;
        constructor(gg) {
            this.gg = gg;
        }
        getHistoryList() {
            try {
                const historyEntries = this.gg.generator.history.data.history;
                const fragment = new DocumentFragment();
                const template = js.selector.select("#elem_list_history_generator");
                for (let i = historyEntries.length - 1; i >= 0; i--) {
                    fragment.append(this.getHistoryListElem(template, historyEntries[i], i));
                }
                return fragment;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        setOnUseListener(listener) {
            try {
                this.onUseListener = listener;
            }
            catch (e) {
                logError(e);
            }
        }
        onUseListener(password) { }
        getHistoryListElem(template, history, index) {
            try {
                const elem = UIUtil.createElem({ template: template });
                const password = history.password;
                js.selector.selectFrom(elem, "h6").append(VUI.password.getColoredPassword(password));
                js.dom.setChildText(elem, "p", js.date.formatDateMonDYYYYHHMMAM(history.time));
                elem.addEventListener("click", e => this.onElemCopy(index, e));
                js.selector.selectFrom(elem, `[data-on="copy"]`).addEventListener("click", e => this.onCopy(index, e));
                this.addSaveListener(elem, index);
                globalNodeData.setNodeData(elem, { index });
                return elem;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        addSaveListener(elem, index) {
            try {
                const saveElem = js.selector.selectFrom(elem, `[data-on="save"]`);
                if (saveElem) {
                    saveElem.addEventListener?.("click", () => this.onSave(index));
                    return;
                }
                const useElem = js.selector.selectFrom(elem, `[data-on="use"]`);
                if (useElem) {
                    useElem.addEventListener("click", () => this.onUseListener(this.gg.generator.history.data.history[index].password));
                    return;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        onElemCopy(index, e) {
            try {
                const isOnList = Boolean(js.selector.closest(e.target, `.password-list-icons`));
                if (isOnList) {
                    return;
                }
                this.onCopy(index, e);
            }
            catch (e) {
                logError(e);
            }
        }
        async onCopy(index, e) {
            try {
                const password = this.gg.generator.history.data.history[index].password;
                await bgApi.other.copyToClipboard(password, { noAutoClear: true });
                VUI.tooltip.showActionMsg(e, i18n(VI18N.COPIED));
            }
            catch (e) {
                logError(e);
            }
        }
        async onSave(index) {
            try {
                const password = this.gg.generator.history.data.history[index].password;
                await bgApi.ztab.saveGeneratedPassword(password);
                await js.dom.closeWindow();
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class GeneratorHistoryUIImpl {
        gg;
        PP_GENERATOR_HISTORY_SHOW_INFO = "PP_GENERATOR_HISTORY_SHOW_INFO";
        PLUS_VALID_SHOW_TIME = 2 * 60 * 1000;
        elem;
        data = new GeneratorHistoryData();
        listCreator;
        restore = true;
        constructor(gg) {
            this.gg = gg;
            this.elem = new GeneratorHistoryElem(this.gg);
            this.listCreator = new GeneratorHistoryListCreatorImpl(this.gg);
        }
        async showUI() {
            try {
                await this.data.init();
                this.elem.init();
                this.addListeners();
                this.initHistoryList();
                const container = js.selector.select("#generator_history_div");
                js.dom.setContent(container, this.elem.container);
                container.style.right = "0px";
                await zsessionStorage.save(this.PP_GENERATOR_HISTORY_SHOW_INFO, { validUpto: Date.now() + this.PLUS_VALID_SHOW_TIME });
                VUI.addSlimScroll(this.elem.historyList);
            }
            catch (e) {
                logError(e);
            }
        }
        async restoreUI() {
            try {
                if (!this.restore) {
                    return;
                }
                const showInfo = await zsessionStorage.load(this.PP_GENERATOR_HISTORY_SHOW_INFO, { validUpto: 0 });
                if (!(showInfo?.validUpto > Date.now())) {
                    return;
                }
                await this.showUI();
            }
            catch (e) {
                logError(e);
            }
        }
        disableRestore() {
            try {
                this.restore = false;
            }
            catch (e) {
                logError(e);
            }
        }
        addListeners() {
            try {
                this.elem.closeElem.addEventListener("click", () => this.onClose());
                this.elem.clearElem.addEventListener("click", () => this.onClear());
            }
            catch (e) {
                logError(e);
            }
        }
        initHistoryList() {
            try {
                if (this.data.history.length == 0) {
                    this.showEmptyHistory();
                    return;
                }
                js.dom.setContent(this.elem.historyList, this.listCreator.getHistoryList());
            }
            catch (e) {
                logError(e);
            }
        }
        showEmptyHistory() {
            try {
                js.dom.clearContent(this.elem.historyList);
                js.dom.hide(this.elem.historyList);
                js.dom.show(this.elem.emptyUIElem);
                js.dom.hide(this.elem.clearElem);
            }
            catch (e) {
                logError(e);
            }
        }
        async onClose() {
            try {
                this.elem.container.parentElement.style.right = "-450px";
                await zsessionStorage.save(this.PP_GENERATOR_HISTORY_SHOW_INFO, { validUpto: 0 });
            }
            catch (e) {
                logError(e);
            }
        }
        async onClear() {
            try {
                const confirmed = await _AlertUI.inst.createAlert()
                    .title(i18n(VI18N.ASK_CLEAR_HISTORY))
                    .addButton("confirm", _AlertUI.inst.createButton().text(i18n(VI18N.CLEAR)).value(true).build())
                    .addButton("cancel", _AlertUI.inst.createButton().text(i18n(VI18N.CANCEL)).value(false).build())
                    .dangerMode(true)
                    .show();
                if (!confirmed) {
                    return;
                }
                await bgApi.generator.history.clear();
                await zsessionStorage.save(this.PP_GENERATOR_HISTORY_SHOW_INFO, { validUpto: 0 });
                this.showEmptyHistory();
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class GeneratorLengthInputElem extends UIElemContainer {
        gg;
        constructor(gg) {
            super();
            this.gg = gg;
            this.gg;
        }
        minTextElem;
        maxTextElem;
        labelElem;
        sliderBarElem;
        lengthInput;
        sliderInput;
        init() {
            try {
                this.container = VUI.createElem({ template: "#generator_length_input_template" });
                this.minTextElem = this.select(`[data-content="minLength"]`);
                this.maxTextElem = this.select(`[data-content="maxLength"]`);
                this.labelElem = this.select(`[data-content="label"]`);
                this.sliderBarElem = this.select(`[data-name="sliderBar"]`);
                this.lengthInput = this.select(`[data-input="length"]`);
                this.sliderInput = this.select(`[data-input="lengthSlider"]`);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class InvalidCharConsumer {
        static LISTENER_ADDED = Symbol();
        validCharRegex = /./;
        consumeInvalidChars(input, validCharRegEx) {
            try {
                const isAddedPreviously = Boolean(input[InvalidCharConsumer.LISTENER_ADDED]);
                if (isAddedPreviously) {
                    return;
                }
                input[InvalidCharConsumer.LISTENER_ADDED] = true;
                this.validCharRegex = validCharRegEx;
                input.addEventListener("keydown", this.handleKeyDown.bind(this), true);
                input.addEventListener("paste", this.handlePaste.bind(this));
            }
            finally {
            }
        }
        handleKeyDown(e) {
            const key = e.key;
            const isControlKey = js.event.isControlKey(e);
            if (isControlKey) {
                return;
            }
            const isValidChar = this.validCharRegex.test(key);
            if (isValidChar) {
                return;
            }
            js.event.preventDefault(e, true);
        }
        async handlePaste(e) {
            const isValidInput = e.target instanceof HTMLInputElement;
            if (!isValidInput) {
                return;
            }
            const input = e.target;
            await js.time.delay(0);
            this.removeInvalidCharsFromInput(input);
        }
        removeInvalidCharsFromInput(input) {
            const value = input.value;
            let validValue = "";
            let isValidChar = false;
            for (let s of value) {
                isValidChar = this.validCharRegex.test(s);
                if (isValidChar) {
                    validValue += s;
                }
            }
            input.value = validValue;
        }
    }

    class GeneratorLengthInputPart {
        p;
        constructor(p) {
            this.p = p;
            js.fn.bindThis(this, [this.onInputComplete]);
        }
        addListeners() {
            try {
                const input = this.p.elem.lengthInput;
                input.addEventListener("click", e => e.target.select());
                new InvalidCharConsumer().consumeInvalidChars(input, /[0-9]/);
                input.addEventListener("blur", this.onInputComplete);
                input.addEventListener("paste", this.onInputComplete);
                input.addEventListener("keydown", this.onKeyDownInput.bind(this));
            }
            catch (e) {
                logError(e);
            }
        }
        onInputComplete() {
            this.p.setLength(js.string.parseInt(this.p.elem.lengthInput.value));
            this.p.callInputListener();
        }
        onKeyDownInput(e) {
            const key = e.key;
            const input = e.target;
            if (key >= '0' && key <= '9') {
                input.value = (input.value + key).slice(-2);
                e.preventDefault();
            }
            else if (key == "ArrowUp") {
                this.addValue(1);
                e.preventDefault();
            }
            else if (key == "ArrowDown") {
                this.addValue(-1);
                e.preventDefault();
            }
            this.p.setLength(parseInt(input.value));
            this.p.callInputListener();
        }
        addValue(n) {
            const input = this.p.elem.lengthInput;
            const value = (js.string.parseInt(input.value) + n);
            input.value = this.p.getPolicyBoundValue(value) + "";
        }
    }

    class GeneratorSliderInput {
        p;
        constructor(p) {
            this.p = p;
            this.sliderLengthInput = js.fn.wrapper.createSingleInstListener(this.sliderLengthInput, this);
            this.updateSliderBar = js.fn.wrapper.createSingleInstListener(this.updateSliderBar, this);
        }
        addListeners() {
            try {
                const input = this.p.elem.sliderInput;
                input.addEventListener("input", this.sliderLengthInput);
                input.addEventListener("input", this.updateSliderBar);
            }
            catch (e) {
                logError(e);
            }
        }
        setValue(value) {
            try {
                this.p.elem.sliderInput.value = value + "";
                this.updateSliderBar();
            }
            catch (e) {
                logError(e);
            }
        }
        async sliderLengthInput() {
            try {
                this.p.elem.lengthInput.value = this.p.elem.sliderInput.value;
                this.p.callInputListener();
                await js.time.delay(0.15);
            }
            catch (e) {
                logError(e);
            }
        }
        updateSliderBar() {
            const inputElem = this.p.elem.sliderInput;
            const min = this.p.limit.min;
            const max = this.p.limit.max;
            const value = +inputElem.value;
            const percent = 100 / (max - min) * (value - min);
            this.p.elem.sliderBarElem.style.width = percent + "%";
        }
    }

    class GeneratorLengthInputUI {
        gg;
        elem;
        limit = {
            min: 1,
            max: 99
        };
        sliderInput = new GeneratorSliderInput(this);
        lengthInput = new GeneratorLengthInputPart(this);
        constructor(gg) {
            this.gg = gg;
            this.elem = new GeneratorLengthInputElem(this.gg);
        }
        createUI(input) {
            try {
                this.elem.init();
                this.setInput(input);
                this.addListeners();
                return this.elem.container;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        setInputListener(listener) {
            try {
                this.inputListener = listener;
            }
            catch (e) {
                logError(e);
            }
        }
        setLength(length) {
            try {
                const validLength = this.getPolicyBoundValue(length);
                this.elem.lengthInput.value = validLength + "";
                this.sliderInput.setValue(validLength);
            }
            catch (e) {
                logError(e);
            }
        }
        setLimits(min, max) {
            try {
                this.limit.min = min;
                this.limit.max = max;
                this.elem.sliderInput.min = "" + min;
                this.elem.sliderInput.max = "" + max;
                js.dom.setText(this.elem.minTextElem, this.elem.sliderInput.min);
                js.dom.setText(this.elem.maxTextElem, this.elem.sliderInput.max);
            }
            catch (e) {
                logError(e);
            }
        }
        getLength() {
            try {
                return js.string.parseInt(this.elem.lengthInput.value);
            }
            catch (e) {
                logError(e);
                return 0;
            }
        }
        getPolicyBoundValue(value) {
            return js.math.getBoundedValueLEGE(this.limit.min, this.limit.max, value);
        }
        callInputListener() {
            try {
                this.inputListener(parseInt(this.elem.lengthInput.value));
            }
            catch (e) {
                logError(e);
            }
        }
        addListeners() {
            try {
                this.lengthInput.addListeners();
                this.sliderInput.addListeners();
            }
            catch (e) {
                logError(e);
            }
        }
        inputListener(n) { }
        setInput(input) {
            try {
                if (!input) {
                    return;
                }
                this.setLimits(input.min, input.max);
                if (input.label) {
                    js.dom.setText(this.elem.labelElem, input.label);
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class GeneratorPasswordOptionsElem extends UIElemContainer {
        gg;
        constructor(gg) {
            super();
            this.gg = gg;
            this.gg;
        }
        lengthInputOutElem;
        policySelect;
        lowercaseCheckbox;
        uppercaseCheckbox;
        splCharCheckbox;
        numberCheckbox;
        noOfSplChars;
        excludeCharsInput;
        init() {
            this.container = VUI.createElem({ template: "#password_generator_options_template", preRender: true });
            this.lengthInputOutElem = this.select(`[data-out="lengthInput"]`);
            this.policySelect = this.select(`[data-input="policy"]`);
            this.lowercaseCheckbox = this.select(`[data-input="lowercase"]`);
            this.uppercaseCheckbox = this.select(`[data-input="uppercase"]`);
            this.splCharCheckbox = this.select(`[data-input="specialchars"]`);
            this.numberCheckbox = this.select(`[data-input="numbers"]`);
            this.noOfSplChars = this.select(`[data-text="noOfSplChars"]`);
            this.excludeCharsInput = this.select(`[data-input="excludeChar"]`);
        }
    }

    var GenerateInputFrom;
    (function (GenerateInputFrom) {
        GenerateInputFrom["GENERATE_BUTTON"] = "GENERATE_BUTTON";
    })(GenerateInputFrom || (GenerateInputFrom = {}));
    var GeneratorShowUIFrom;
    (function (GeneratorShowUIFrom) {
        GeneratorShowUIFrom["MAIN_TAB"] = "MAIN_TAB";
    })(GeneratorShowUIFrom || (GeneratorShowUIFrom = {}));
    class GeneratorPasswordOptions {
        gg;
        elem;
        lengthElem;
        curPolicy;
        constructor(gg) {
            this.gg = gg;
            this.elem = new GeneratorPasswordOptionsElem(this.gg);
            this.lengthElem = new GeneratorLengthInputUI(this.gg);
            js.fn.bindThis(this, [this.generate, this.inputListener, this.updateStrength, this.generatorGenerateListener]);
        }
        async showUI(from) {
            try {
                this.elem.init();
                this.createLengthInputUI();
                this.initPolicyInput();
                this.initCheckbox();
                this.initExcludeChars();
                await this.restoreValues(from);
                this.gg.generator.setGenerateListener(this.generatorGenerateListener);
                this.gg.generator.outUI.showStrengthBar(true);
                this.gg.generator.outUI.setKeyListener(this.updateStrength);
                js.dom.setContent(this.gg.generator.elem.select("#generator_mode_options"), this.elem.container);
            }
            catch (e) {
                logError(e);
            }
        }
        inputListener() {
            this.generate();
        }
        generatorGenerateListener() {
            this.generate(GenerateInputFrom.GENERATE_BUTTON);
        }
        async generate(from) {
            try {
                const password = await this.generatePassword(from);
                this.gg.generator.outUI.setPassword(password);
                this.gg.generator.data.newPasswordGenerated();
                this.updateStrength(password);
                this.saveState();
            }
            catch (e) {
                logError(e);
            }
        }
        async generatePassword(from) {
            try {
                const password = await bgApi.generator.generatePassword(this.getGeneratorInput());
                if (password) {
                    return password;
                }
                if (from != GenerateInputFrom.GENERATE_BUTTON) {
                    return "";
                }
                VUI.notification.showInfo(i18n(VI18N.GENERATOR_POLICY_DEFAULTS_USED));
                this.changePolicy(this.curPolicy.id);
                return await bgApi.generator.generatePassword(this.getGeneratorInput());
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        getGeneratorInput() {
            try {
                const input = {
                    length: this.lengthElem.getLength(),
                    reqLowercase: this.elem.lowercaseCheckbox.checked,
                    reqUppercase: this.elem.uppercaseCheckbox.checked,
                    reqSplChar: this.elem.splCharCheckbox.checked,
                    reqNumber: this.elem.numberCheckbox.checked,
                    noOfSplChar: this.curPolicy.no_of_splchar,
                    excludeChars: this.elem.excludeCharsInput.value,
                    startWithLetter: false,
                };
                return input;
            }
            catch (e) {
                logError(e);
                return {
                    length: Policy.CUSTOM_POLICY_DEFAULT_LENGTH,
                    reqLowercase: true,
                    reqUppercase: true,
                    reqSplChar: true,
                    reqNumber: true,
                    noOfSplChar: 0,
                    excludeChars: "",
                    startWithLetter: false
                };
            }
        }
        async saveState() {
            try {
                const input = this.getGeneratorInput();
                const saveGenerateOptions = {
                    length: input.length,
                    excludeChars: input.excludeChars,
                    lowercase: input.reqLowercase,
                    uppercase: input.reqUppercase,
                    number: input.reqNumber,
                    policyId: this.getPolicyId(),
                    splChar: input.reqSplChar,
                };
                this.gg.generator.data.saveGeneratePasswordOptions(saveGenerateOptions);
            }
            catch (e) {
                logError(e);
            }
        }
        async restoreValues(from) {
            try {
                const options = this.gg.generator.data.state.passwordTab.options;
                this.changePolicy(options.policyId);
                this.lengthElem.setLength(options.length);
                this.elem.lowercaseCheckbox.checked = options.lowercase;
                this.elem.uppercaseCheckbox.checked = options.uppercase;
                this.elem.splCharCheckbox.checked = options.splChar;
                this.elem.numberCheckbox.checked = options.number;
                this.elem.excludeCharsInput.value = options.excludeChars;
                if (from == GeneratorShowUIFrom.MAIN_TAB) {
                    const restored = await this.restoreGeneratedPassword();
                    if (restored) {
                        return;
                    }
                }
                await this.generate();
            }
            catch (e) {
                logError(e);
            }
        }
        async restoreGeneratedPassword() {
            try {
                const state = this.gg.generator.data.state.passwordTab;
                if (!state?.lastUsedPassword?.password) {
                    return false;
                }
                if (state.lastUsedPassword.validUpto < Date.now()) {
                    return false;
                }
                const password = await zcrypt.extDecrypt(state.lastUsedPassword.password);
                this.gg.generator.outUI.setPassword(password);
                this.gg.generator.outUI.setColoredOut(false);
                return true;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        initExcludeChars() {
            try {
                this.elem.excludeCharsInput.addEventListener("input", () => this.inputListener());
            }
            catch (e) {
                logError(e);
            }
        }
        initCheckbox() {
            try {
                const listener = () => this.inputListener();
                this.elem.lowercaseCheckbox.addEventListener("input", listener);
                this.elem.uppercaseCheckbox.addEventListener("input", listener);
                this.elem.splCharCheckbox.addEventListener("input", listener);
                this.elem.numberCheckbox.addEventListener("input", listener);
            }
            catch (e) {
                logError(e);
            }
        }
        initPolicyInput() {
            try {
                js.dom.setContent(this.elem.policySelect, this.getPolicyOptions());
                const policyObj = $(this.elem.policySelect);
                policyObj.select2({
                    minimumResultsForSearch: -1
                });
                policyObj.on("change", e => this.policyInputListener(e.target.value));
            }
            catch (e) {
                logError(e);
            }
        }
        getPolicyId() {
            try {
                return $(this.elem.policySelect).val();
            }
            catch (e) {
                logError(e);
                return "0";
            }
        }
        changePolicy(id) {
            try {
                const policy = this.gg.generator.data.policyList.find(x => x.id == id);
                if (!policy) {
                    throw ErrorCode.NOT_FOUND;
                }
                this.curPolicy = policy;
                this.lengthElem.setLimits(policy.min_length, policy.max_length);
                const length = policy.id != Policy.CUSTOM_POLICY_ID ? policy.max_length : Policy.CUSTOM_POLICY_DEFAULT_LENGTH;
                this.lengthElem.setLength(length);
                this.elem.lowercaseCheckbox.checked = policy.req_lowercase;
                this.elem.uppercaseCheckbox.checked = policy.req_uppercase;
                this.elem.splCharCheckbox.checked = policy.req_splchar;
                this.elem.numberCheckbox.checked = policy.req_number;
                this.elem.excludeCharsInput.value = policy.exclude_chars;
                js.dom.setText(this.elem.noOfSplChars, policy.no_of_splchar ? policy.no_of_splchar + "" : "");
                $(this.elem.policySelect).val(id).trigger("change.select2");
            }
            catch (e) {
                logError(e);
            }
        }
        policyInputListener(policyId) {
            try {
                this.changePolicy(policyId);
                this.generate();
            }
            catch (e) {
                logError(e);
            }
        }
        getPolicyOptions() {
            try {
                const fragment = new DocumentFragment();
                const policies = this.gg.generator.data.policyList;
                policies.forEach(policy => fragment.append(new Option(policy.name, policy.id, false, false)));
                return fragment;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        createLengthInputUI() {
            try {
                const options = {
                    min: 12,
                    max: 99,
                };
                js.dom.setContent(this.elem.lengthInputOutElem, this.lengthElem.createUI(options));
                this.lengthElem.setInputListener(this.inputListener);
            }
            catch (e) {
                logError(e);
            }
        }
        async updateStrength(password) {
            try {
                const reqPassword = password || this.gg.generator.outUI.getPassword();
                const strength = await bgApi.generator.getComplexity(reqPassword);
                this.gg.generator.outUI.setStrength(strength);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class GeneratorPassphraseOptionsElem extends UIElemContainer {
        gg;
        constructor(gg) {
            super();
            this.gg = gg;
            this.gg;
        }
        wordCountOutElem;
        capitalCheckbox;
        numberCheckbox;
        separatorInput;
        init() {
            this.container = VUI.createElem({ template: "#passphrase_generator_options_template", preRender: true });
            this.wordCountOutElem = this.select(`[data-out="wordCountInput"]`);
            this.capitalCheckbox = this.select(`[data-input="capital"]`);
            this.numberCheckbox = this.select(`[data-input="numbers"]`);
            this.separatorInput = this.select(`[data-input="separator"]`);
        }
    }

    class GeneratorPassphraseOptions {
        gg;
        elem;
        wordCountElem;
        words;
        constructor(gg) {
            this.gg = gg;
            this.elem = new GeneratorPassphraseOptionsElem(this.gg);
            this.wordCountElem = new GeneratorLengthInputUI(this.gg);
            js.fn.bindThis(this, [this.generate, this.inputListener, this.generatorGenerateListener]);
        }
        async showUI(from) {
            try {
                this.elem.init();
                this.createWordCountInputUI();
                this.initCheckbox();
                this.initSeparatorInput();
                await this.restoreValues(from);
                this.gg.generator.setGenerateListener(this.generatorGenerateListener);
                this.gg.generator.outUI.showStrengthBar(false);
                this.gg.generator.outUI.setKeyListener(js.fn.emptyFn);
                js.dom.setContent(this.gg.generator.elem.select("#generator_mode_options"), this.elem.container);
            }
            catch (e) {
                logError(e);
            }
        }
        inputListener() {
            this.generate();
        }
        generatorGenerateListener() {
            this.generate(GenerateInputFrom.GENERATE_BUTTON);
        }
        async generate(from) {
            try {
                const input = {
                    noOfWords: this.wordCountElem.getLength(),
                    reqCapital: this.elem.capitalCheckbox.checked,
                    reqNumber: this.elem.numberCheckbox.checked,
                    separator: this.elem.separatorInput.value,
                };
                if (from != GenerateInputFrom.GENERATE_BUTTON) {
                    input.words = this.words;
                }
                const passphraseOutput = await bgApi.generator.generatePassphrase(input);
                this.words = passphraseOutput.words;
                this.gg.generator.outUI.setPassword(passphraseOutput.passphrase);
                this.gg.generator.data.newPasswordGenerated();
                this.saveState(input);
            }
            catch (e) {
                logError(e);
            }
        }
        async restoreValues(from) {
            try {
                const options = this.gg.generator.data.state.passphraseTab.options;
                this.wordCountElem.setLength(options.noOfWords);
                this.elem.capitalCheckbox.checked = options.reqCapital;
                this.elem.numberCheckbox.checked = options.reqNumber;
                this.elem.separatorInput.value = options.separator;
                this.words = options.words;
                if (from == GeneratorShowUIFrom.MAIN_TAB) {
                    const restored = await this.restoreGeneratedPassphrase();
                    if (restored) {
                        return;
                    }
                }
                await this.generate();
            }
            catch (e) {
                logError(e);
            }
        }
        async restoreGeneratedPassphrase() {
            try {
                const state = this.gg.generator.data.state.passphraseTab;
                if (!state?.lastUsedPassword?.password) {
                    return false;
                }
                if (state.lastUsedPassword.validUpto < Date.now()) {
                    return false;
                }
                const password = await zcrypt.extDecrypt(state.lastUsedPassword.password);
                this.gg.generator.outUI.setPassword(password);
                this.gg.generator.outUI.setColoredOut(false);
                return true;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async saveState(input) {
            try {
                this.gg.generator.data.saveGeneratePassphraseOptions(input);
            }
            catch (e) {
                logError(e);
            }
        }
        initSeparatorInput() {
            try {
                const input = this.elem.separatorInput;
                input.addEventListener("click", e => e.target.select());
                const listener = () => this.inputListener();
                input.addEventListener("paste", listener);
                input.addEventListener("input", listener);
            }
            catch (e) {
                logError(e);
            }
        }
        initCheckbox() {
            try {
                const listener = () => this.inputListener();
                this.elem.capitalCheckbox.addEventListener("input", listener);
                this.elem.numberCheckbox.addEventListener("input", listener);
            }
            catch (e) {
                logError(e);
            }
        }
        createWordCountInputUI() {
            try {
                const options = {
                    min: 4,
                    max: 10,
                    label: i18n("no_of_words")
                };
                js.dom.setContent(this.elem.wordCountOutElem, this.wordCountElem.createUI(options));
                this.wordCountElem.setInputListener(this.inputListener);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class GeneratorUIImpl {
        gg = new GG(this);
        elem = new GeneratorUIElem();
        data = new GeneratorDatamImpl();
        tab = new GeneratorSubTabUI(this.gg);
        outUI = new GeneratorOutTextUIImpl(this.gg);
        actions = new GeneratorActionsUI(this.gg);
        history = new GeneratorHistoryUIImpl(this.gg);
        passwordActions = new GeneratorPasswordOptions(this.gg);
        passphraseActions = new GeneratorPassphraseOptions(this.gg);
        outputElem = "#content_tab";
        constructor() { }
        async showUI() {
            try {
                this.elem.init();
                await this.data.init();
                this.tab.showUI();
                this.outUI.showUI();
                this.actions.showUI();
                this.showTab(this.data.state.curTab, GeneratorShowUIFrom.MAIN_TAB);
                await this.history.restoreUI();
                const outputElem = js.selector.select(this.outputElem);
                if (outputElem) {
                    js.dom.setContent(outputElem, this.elem.container);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async showTab(tab, from) {
            try {
                this.tab.highlight(tab);
                this.data.saveCurTab(tab);
                switch (tab) {
                    case GeneratorSubTab.PASSWORD:
                        this.passwordActions.showUI(from);
                        return;
                    case GeneratorSubTab.PASSPHRASE:
                        this.passphraseActions.showUI(from);
                        return;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        setGenerateListener(listener) {
            this.generateListener = listener;
        }
        generateListener() { }
        setOutputElem(s) {
            this.outputElem = s;
        }
    }

    class UIComponentsImpl {
        createGeneratorUI() {
            return new GeneratorUIImpl();
        }
    }

    var InputType;
    (function (InputType) {
        InputType["BUTTON"] = "button";
        InputType["CHECKBOX"] = "checkbox";
        InputType["COLOR"] = "color";
        InputType["DATE"] = "date";
        InputType["DATE_TIME"] = "datetime-local";
        InputType["EMAIL"] = "email";
        InputType["FILE"] = "file";
        InputType["HIDDEN"] = "hidden";
        InputType["IMAGE"] = "image";
        InputType["MONTH"] = "month";
        InputType["NUMBER"] = "number";
        InputType["PASSWORD"] = "password";
        InputType["RADIO"] = "radio";
        InputType["RANGE"] = "range";
        InputType["RESET"] = "reset";
        InputType["SEARCH"] = "search";
        InputType["SUBMIT"] = "submit";
        InputType["TEL"] = "tel";
        InputType["TEXT"] = "text";
        InputType["TIME"] = "time";
        InputType["URL"] = "url";
        InputType["WEEK"] = "week";
    })(InputType || (InputType = {}));

    class UIPasswordUtilImpl {
        passwordColorer = new PasswordColorer();
        getColoredPassword(password) {
            return this.passwordColorer.createColoredPassword(password);
        }
        getColoredChar(ch) {
            return this.passwordColorer.getColoredSpan(ch);
        }
        showText(input) {
            try {
                input.type = InputType.TEXT;
                const eyeIcon = this.getEyeIcon(input);
                if (!eyeIcon) {
                    return;
                }
                eyeIcon.dataset.tooltip_content = "i18n:hide";
                eyeIcon.className = "icon-hide";
            }
            catch (e) {
                logError(e);
            }
        }
        hideText(input) {
            try {
                input.type = InputType.PASSWORD;
                const eyeIcon = this.getEyeIcon(input);
                if (!eyeIcon) {
                    return;
                }
                eyeIcon.dataset.tooltip_content = "i18n:view";
                eyeIcon.className = "icon-view";
            }
            catch (e) {
                logError(e);
            }
        }
        getEyeIcon(input) {
            try {
                if (!input.dataset.parent) {
                    return null;
                }
                const parentElem = js.selector.closest(input, input.dataset.parent);
                if (!parentElem) {
                    return null;
                }
                const eyeIcon = js.selector.selectFrom(parentElem, `[data-icon="eye"]`);
                return eyeIcon;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }
    class PasswordColorer {
        createColoredPassword(password) {
            try {
                const fragment = document.createDocumentFragment();
                for (let ch of password) {
                    fragment.append(this.getColoredSpan(ch));
                }
                return fragment;
            }
            catch (e) {
                logError(e);
                return document.createDocumentFragment();
            }
        }
        getColoredSpan(ch) {
            try {
                const span = document.createElement("span");
                span.textContent = ch;
                span.className = this.getColoredSpanClass(ch);
                return span;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getColoredSpanClass(ch) {
            if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
                return "";
            }
            if (ch >= '0' && ch <= '9') {
                return "pwd-numbers";
            }
            return "pwd-specialchar";
        }
    }

    class UIUtilImpl {
        keyboard = keyboardUtil;
        input = new InputUtilImpl();
        password = new UIPasswordUtilImpl();
        tooltip = new TooltipUtilImpl();
        notification = new NotificationUtilImpl();
        components = new UIComponentsImpl();
        init() {
            try {
                this.tooltip.init();
                this.notification.init();
                customElemUtil.init();
            }
            catch (e) {
                logError(e);
            }
        }
        createElem(params) {
            return templateUtil.create(params);
        }
        addI18n(elem) {
            return templateUtil.addI18n(elem);
        }
        addSlimScroll(elem, options = {}) {
            const htmlElem = js.selector.select(elem);
            const reqOption = {
                height: "100%",
                width: "100%",
                wheelStep: 10,
                touchScrollStep: 75,
            };
            if (options.clientWidthHeight) {
                reqOption.height = htmlElem.clientHeight + "px";
                reqOption.width = htmlElem.clientWidth + "px";
            }
            if (options.height) {
                const reqHeight = typeof options.height == "string" ? options.height : Math.ceil(options.height) + "px";
                reqOption.height = reqHeight;
            }
            if (options.width) {
                const reqWidth = typeof options.width == "string" ? options.width : Math.ceil(options.width) + "px";
                reqOption.width = reqWidth;
            }
            $(htmlElem).slimScroll(reqOption);
        }
        show(...elemList) {
            try {
                for (let elem of elemList) {
                    js.selector.select(elem).classList.remove(VaultCSS.DIS_HIDE);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        hide(...elemList) {
            try {
                for (let elem of elemList) {
                    js.selector.select(elem).classList.add(VaultCSS.DIS_HIDE);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        setLoadingContent(elem) {
            js.dom.setContent(elem, document.createElement("vault-loading"));
        }
        createListSelectElem(params) {
            return ListSelectElementImpl.createListSelect(params);
        }
        highlightNav(params) {
            try {
                this.removeHighlight(params);
                params.targetElem.classList.add(params.highlightClass);
            }
            catch (e) {
                logError(e);
            }
        }
        removeHighlight(params) {
            try {
                const activeElem = js.selector.select("." + params.highlightClass);
                if (!activeElem) {
                    return;
                }
                activeElem.classList.remove(params.highlightClass);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class I18nSpanImpl extends HTMLElement {
        key = "";
        constructor() {
            super();
            this.key = this.textContent;
        }
        connectedCallback() {
            this.setI18n(this.key);
        }
        setI18n(s) {
            const [key, ...placeholders] = s.split(",");
            super.textContent = brApi.i18n.textOf(key, placeholders);
        }
        get textContent() {
            return super.textContent;
        }
        set textContent(x) {
            this.setI18n(x);
        }
        setText(key, ...placeholders) {
            super.textContent = brApi.i18n.textOf(key, placeholders);
        }
        toString() {
            return "test";
        }
    }
    class NoI18nSpanImpl extends HTMLElement {
    }

    class VaultLoadingElemImpl extends HTMLElement {
        constructor() {
            super();
        }
        connectedCallback() {
            this.append(UIUtil.createElem({ template: "#vault_loading_template" }));
        }
    }

    class CustomElemUtil {
        init() {
            customElements.define("i-span", I18nSpanImpl);
            customElements.define("no-i-span", NoI18nSpanImpl);
            customElements.define("vault-loading", VaultLoadingElemImpl);
        }
    }

    class KeyboardNavigatorUtil {
        static inst = new KeyboardNavigatorUtil();
        isValidEvent(e) {
            try {
                if (js.dom.isContentEditable(e.target)) {
                    return false;
                }
                return true;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        getFocusableElems(param) {
            try {
                return js.selector.selectAll("[tabindex]", param.parent).filter(x => x.tabIndex >= 0);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
    }
    class FocusMover {
        param;
        constructor(param) {
            this.param = param;
        }
        move(inc) {
            try {
                const elems = KeyboardNavigatorUtil.inst.getFocusableElems(this.param);
                const activeElem = document.activeElement;
                const index = elems.findIndex(x => x == activeElem);
                if (index < 0) {
                    return false;
                }
                const moveIndex = index + inc;
                if (moveIndex < 0 || moveIndex >= elems.length) {
                    return false;
                }
                const reqElem = elems[moveIndex];
                reqElem.focus();
                return true;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class KeyboardUpDownLeftRightNavigator {
        params;
        focusMover;
        util = KeyboardNavigatorUtil.inst;
        elemFinder = null;
        constructor(params) {
            this.params = params;
            this.focusMover = new FocusMover(params);
            this.elemFinder = new UpDownElemFinder(params);
        }
        addListener() {
            try {
                keyboardUtil.onKeyDown(this.params.parent, this);
            }
            catch (e) {
                logError(e);
            }
        }
        [KeyboardKeys.ARROW_UP](e) {
            try {
                if (!this.util.isValidEvent(e)) {
                    return;
                }
                e.preventDefault();
                const upElem = this.elemFinder.findUpElem();
                if (upElem) {
                    upElem.focus();
                    return;
                }
                this.params?.onTopUp?.();
            }
            catch (e) {
                logError(e);
            }
        }
        [KeyboardKeys.ARROW_DOWN](e) {
            try {
                if (!this.util.isValidEvent(e)) {
                    return;
                }
                e.preventDefault();
                const downElem = this.elemFinder.findDownElem();
                if (downElem) {
                    downElem.focus();
                    return;
                }
                this.params?.onBottomDown?.();
            }
            catch (e) {
                logError(e);
            }
        }
        [KeyboardKeys.ARROW_LEFT](e) {
            try {
                if (!this.util.isValidEvent(e)) {
                    return;
                }
                e.preventDefault();
                const moved = this.focusMover.move(-1);
                moved || this.params?.onTopUp?.();
            }
            catch (e) {
                logError(e);
            }
        }
        [KeyboardKeys.ARROW_RIGHT](e) {
            try {
                if (!this.util.isValidEvent(e)) {
                    return;
                }
                e.preventDefault();
                const moved = this.focusMover.move(1);
                moved || this.params?.onBottomDown?.();
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class UpDownElemFinder {
        params;
        constructor(params) {
            this.params = params;
        }
        findUpElem() {
            return this.findElem({ from: 0, inc: -1 });
        }
        findDownElem() {
            return this.findElem({ from: 0, inc: 1 });
        }
        findElem(arrayIterateParam) {
            try {
                const elems = KeyboardNavigatorUtil.inst.getFocusableElems(this.params);
                if (!this.params.parent.contains(document.activeElement)) {
                    return null;
                }
                const pos = elems.indexOf(document.activeElement);
                if (pos < 0) {
                    return null;
                }
                const rect = document.activeElement.getBoundingClientRect();
                arrayIterateParam.from = pos + arrayIterateParam.inc;
                for (let elem of js.array.iterate(elems, arrayIterateParam)) {
                    if (this.isBoundedLeftRight(rect, elem)) {
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
        isBoundedLeftRight(rect, elem) {
            try {
                const elemRect = elem.getBoundingClientRect();
                const x = elemRect.x + (elemRect.width / 2);
                return this.isBounded(x, rect.left, rect.right);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        isBounded(x, low, high) {
            return (x >= low) && (x <= high);
        }
    }

    class KeyboardUpDownNavigator {
        param;
        focusMover;
        util = KeyboardNavigatorUtil.inst;
        constructor(param) {
            this.param = param;
            this.focusMover = new FocusMover(param);
        }
        addListener() {
            try {
                keyboardUtil.onKeyDown(this.param.parent, this);
            }
            catch (e) {
                logError(e);
            }
        }
        [KeyboardKeys.ARROW_UP](e) {
            try {
                if (!this.util.isValidEvent(e)) {
                    return;
                }
                e.preventDefault();
                const moved = this.focusMover.move(-1);
                moved || this.param?.onTopUp?.();
            }
            catch (e) {
                logError(e);
            }
        }
        [KeyboardKeys.ARROW_DOWN](e) {
            try {
                if (!this.util.isValidEvent(e)) {
                    return;
                }
                e.preventDefault();
                const moved = this.focusMover.move(1);
                moved || this.param?.onBottomDown?.();
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class KeyboardUtilImpl {
        isControlKey(key) {
            try {
                if (key.length == 0) {
                    return false;
                }
                switch (key) {
                    case KeyboardKeys.ARROW_DOWN:
                    case KeyboardKeys.ARROW_LEFT:
                    case KeyboardKeys.ARROW_RIGHT:
                    case KeyboardKeys.ARROW_UP:
                    case KeyboardKeys.CONTROL:
                    case KeyboardKeys.META:
                    case KeyboardKeys.SHIFT:
                        return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        isCtrlPressed(key) {
            try {
                return key.ctrlKey || key.metaKey;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        onKeyDown(elem, listener) {
            try {
                elem.addEventListener("keydown", function (e) {
                    if (listener[e.key]) {
                        listener[e.key](e, elem);
                    }
                });
            }
            catch (e) {
                logError(e);
            }
        }
        onKeyUp(elem, listener) {
            try {
                elem.addEventListener("keyup", function (e) {
                    if (listener[e.key]) {
                        listener[e.key](e, elem);
                    }
                });
            }
            catch (e) {
                logError(e);
            }
        }
        getOnKeyDownProxy(elem) {
            try {
                const proxy = new KeyboardProxyListenerImpl();
                proxy.listen(elem);
                return proxy;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        addUpDownNavigation(param) {
            return new KeyboardUpDownNavigator(param).addListener();
        }
        addUpDownLeftRightNavigation(param) {
            return new KeyboardUpDownLeftRightNavigator(param).addListener();
        }
    }
    class KeyboardProxyListenerImpl {
        subject = {};
        setSubject(listener) {
            this.subject = listener;
        }
        listen(elem) {
            elem.addEventListener("keyup", this.onKeyDown.bind(this));
        }
        onKeyDown(e) {
            if (this.subject?.[e.key]) {
                this.subject[e.key](e);
            }
        }
    }

    let customElemUtil = null;
    let templateUtil = null;
    let uiUtil = null;
    let keyboardUtil = null;
    function initContext() {
        templateUtil = new TemplateUtil();
        customElemUtil = new CustomElemUtil();
        keyboardUtil = new KeyboardUtilImpl();
        uiUtil = new UIUtilImpl();
    }

    async function main() {
        main$1();
        main$2();
        initContext();
        globalThis.UIUtil = uiUtil;
        globalThis.VUI = uiUtil;
    }

    main();
    function getParameters() {
        const url = new URL(window.location.href);
        const params = {};
        url.searchParams.forEach((val, key) => params[key] = val);
        return params;
    }
    VUI.init();
    const apiClient = portApi.createApiClient();
    apiClient.init({ name: VtApiPortNames.OAUTH });
    apiClient.callApi({ path: "setCode", args: [getParameters()] });

})();
