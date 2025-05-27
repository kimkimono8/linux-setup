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

    let GG$4 = class GG {
        brApi;
        util = new BrUtil();
    };
    const gg$2 = new GG$4();

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

    let GG$3 = class GG {
        js = null;
    };
    const gg$1 = new GG$3();

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

    let GG$2 = class GG {
        base64Util = new Base64Util();
        hexUtil = new HexUtil();
    };
    const gg = new GG$2();

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
        search = context$3.searchUtil;
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

    let Context$3 = class Context {
        searchUtil;
        vUtil;
        init() {
            this.searchUtil = new SearchUtil();
            this.vUtil = new VUtil();
        }
    };
    const context$3 = new Context$3();

    context$3.init();
    const vutil = context$3.vUtil;

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

    class _TextHighlighter {
        static highlight(pattern, text) {
            const reqPattern = pattern.toLocaleLowerCase();
            return this.highlightInclude(reqPattern, text) ||
                this.highlightPattern(reqPattern, text);
        }
        static highlightUrlDomain(pattern, url) {
            try {
                if (!js.url.isValid(url)) {
                    return null;
                }
                const urlObj = new URL(url);
                const domain = js.url.getParentDomain(url);
                const highlightedNode = this.highlight(pattern, domain);
                const preDomain = urlObj.hostname.slice(0, urlObj.hostname.length - domain.length);
                const splitMark = "x".repeat(url.length);
                urlObj.hostname = splitMark;
                const parts = (urlObj + "").split(splitMark);
                const fragment = document.createDocumentFragment();
                fragment.append(parts[0], preDomain, highlightedNode, parts[1]);
                return fragment;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        static highlightInclude(pattern, text) {
            const index = text.toLocaleLowerCase().indexOf(pattern);
            if (index == -1) {
                return null;
            }
            const parts = [
                text.slice(0, index),
                this.getHighlightSpan(text.slice(index, index + pattern.length)),
                text.slice(index + pattern.length)
            ];
            return this.getFragment(parts);
        }
        static getHighlightSpan(ch) {
            const span = document.createElement("span");
            span.textContent = ch;
            span.className = this.getHighlightSpanClass();
            return span;
        }
        static getHighlightSpanClass() {
            return "match-highlight-text";
        }
        static highlightPattern(pattern, text) {
            const nodes = text.split("");
            let patternI = 0;
            for (let i = 0; patternI < pattern.length && i < text.length; i++) {
                if (pattern[patternI] == text[i].toLocaleLowerCase()) {
                    nodes[i] = this.getHighlightSpan(text[i]);
                    patternI++;
                }
            }
            return this.getFragment(nodes);
        }
        static getFragment(parts) {
            const fragment = document.createDocumentFragment();
            fragment.append(...parts);
            return fragment;
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

    let GG$1 = class GG {
        generator;
        constructor(generator) {
            this.generator = generator;
        }
    };

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

    class _PositionUtil {
        static positionMoreActions(moreActionselem, targetElem) {
            const SPACE = 10;
            let innerElem = moreActionselem.firstElementChild;
            if (innerElem.classList.contains("slimScrollDiv")) {
                innerElem = innerElem.firstElementChild;
                $(innerElem).slimScroll({ destroy: true });
            }
            innerElem.style.height = "max-content";
            innerElem.style.overflowY = "hidden";
            const rect = js.dom.getContentRect(moreActionselem);
            const targetElemRect = targetElem.getBoundingClientRect();
            let left = targetElemRect.right - rect.width + 2;
            let top = targetElemRect.bottom + SPACE;
            let height = rect.height;
            let arrow = "top";
            let width = rect.width;
            if (rect.height + top > document.documentElement.clientHeight) {
                top = targetElemRect.top - rect.height - SPACE;
                arrow = "bottom";
            }
            if (top < 0) {
                const availableSpaceBottom = document.documentElement.clientHeight - targetElemRect.bottom - SPACE;
                const availableSpaceTop = targetElemRect.top - SPACE;
                if (availableSpaceBottom > availableSpaceTop) {
                    arrow = "top";
                    top = targetElemRect.bottom + SPACE;
                    height = availableSpaceBottom - 15;
                }
                else {
                    arrow = "bottom";
                    top = targetElemRect.top - SPACE - availableSpaceTop + 15;
                    height = availableSpaceTop - 15;
                }
                innerElem.style.overflowY = "scroll";
            }
            if (left < 0) {
                left = SPACE;
                width = Math.min(rect.width, document.documentElement.clientWidth) - (2 * SPACE);
                innerElem.style.overflowX = "scroll";
            }
            height = Math.ceil(height);
            width = Math.ceil(width);
            innerElem.style.height = height + "px";
            moreActionselem.style.top = top + "px";
            moreActionselem.style.left = left + "px";
            targetElem.dataset.arrow = arrow;
            moreActionselem.classList.add("zv-dropdown-popup");
            moreActionselem.classList.remove("zv-dropdown-popup-arrow-top", "zv-dropdown-popup-arrow-bottom");
            moreActionselem.classList.add("zv-dropdown-popup-arrow-" + arrow);
            UIUtil1.inst.slimScroll(innerElem, height, width);
        }
        static newPositionInput() {
            return new PositionInput();
        }
        static positionElem(input) {
            return new PopupPositioner().positionElem(input);
        }
    }
    class PositionAlignment {
        static VERTICAL = {
            TOP: "TOP",
            BOTTOM: "BOTTOM"
        };
        static HORIZONTAL = {
            LEFT: "LEFT",
            RIGHT: "RIGHT"
        };
        VERTICAL = PositionAlignment.VERTICAL;
        HORIZONTAL = PositionAlignment.HORIZONTAL;
        vertical = this.VERTICAL.TOP;
        horizontal = this.HORIZONTAL.LEFT;
        static getInstance(vertical, horizontal) {
            const a = new PositionAlignment();
            a.vertical = vertical;
            a.horizontal = horizontal;
            return a;
        }
        constructor() { }
        verticalEq(value) {
            return this.vertical == value;
        }
        horizontalEq(value) {
            return this.horizontal == value;
        }
    }
    class PositionInput {
        target = {
            elem: null,
            x: 0,
            y: 0
        };
        containerId = "";
        popupElem = null;
        alignLeft = true;
        adjust = {
            left_x: 0,
            right_x: 0,
        };
    }
    class PopupPositioner {
        input = null;
        x = 0;
        y = 0;
        containerElem = null;
        popupElem = null;
        popupRect = null;
        topResp = {
            top: 0,
            topAligned: false,
            needScroll: false,
            scrollHeight: 0
        };
        leftResp = {
            left: 0,
            leftAligned: false,
            needScroll: false,
            scrollWidth: 0
        };
        positionElem(input) {
            this.input = input;
            this.initXY();
            this.initPopupElem();
            this.initContainer();
            this.initLeft();
            this.initTop();
            this.positionContainer();
            return this.getResult();
        }
        initXY() {
            const target = this.input.target;
            if (!target.elem) {
                this.x = target.x;
                this.y = target.y;
                return;
            }
            const elem = js.selector.select(target.elem);
            const elemRect = elem.getBoundingClientRect();
            this.x = elemRect.x + elem.offsetWidth / 2;
            this.y = elemRect.y + elem.offsetHeight / 2;
        }
        initContainer() {
            const containerId = this.input.containerId;
            if (!containerId) {
                this.initNewContainer(containerId);
                return;
            }
            const curContainerElem = document.querySelector("#" + containerId);
            if (!curContainerElem) {
                this.initNewContainer(containerId);
                return;
            }
            const contentElem = document.createElement("div");
            js.dom.setContent(curContainerElem, contentElem);
            js.dom.setContent(contentElem, this.popupElem);
            this.containerElem = curContainerElem;
        }
        initNewContainer(containerId) {
            const templateHtml = "#more_options_position_container_template";
            const containerElem = UIUtil.createElem({ template: templateHtml });
            containerElem.id = containerId;
            document.body.append(containerElem);
            this.containerElem = containerElem;
            js.dom.setContent(this.containerElem.firstElementChild, this.popupElem);
        }
        initPopupElem() {
            this.popupElem = js.selector.select(this.input.popupElem);
            document.body.append(this.popupElem);
            this.popupRect = this.popupElem.getBoundingClientRect();
        }
        initLeft() {
            if (this.input.alignLeft) {
                const aligned = this.alignLeftLeft() || this.alignLeftRight();
                if (aligned) {
                    return;
                }
            }
            if (!this.input.alignLeft) {
                const aligned = this.alignLeftRight() || this.alignLeftLeft();
                if (aligned) {
                    return;
                }
            }
            const resp = this.leftResp;
            const popupRect = this.popupRect;
            const x = this.x;
            const right = popupRect.width + x;
            const screenWidth = document.documentElement.clientWidth;
            if (right <= screenWidth) {
                resp.left = x;
                resp.leftAligned = true;
                return;
            }
            const left = x - popupRect.width;
            if (left >= 0) {
                resp.left = left;
                resp.leftAligned = false;
                return;
            }
            resp.needScroll = true;
            const MIN_MARGIN_SPACE = 10;
            const rightHasMoreSpace = (screenWidth - x) > x;
            if (rightHasMoreSpace) {
                resp.left = x;
                resp.leftAligned = true;
                resp.scrollWidth = screenWidth - x - MIN_MARGIN_SPACE;
                return;
            }
            resp.left = MIN_MARGIN_SPACE;
            resp.scrollWidth = x - MIN_MARGIN_SPACE;
            resp.leftAligned = false;
        }
        alignLeftLeft() {
            const right = this.popupRect.width + this.x;
            const screenWidth = document.documentElement.clientWidth;
            if (right > screenWidth) {
                return false;
            }
            this.leftResp.left = this.x;
            this.leftResp.leftAligned = true;
            return true;
        }
        alignLeftRight() {
            const left = this.x - this.popupRect.width;
            if (left <= 0) {
                return false;
            }
            this.leftResp.left = left;
            this.leftResp.leftAligned = false;
            return true;
        }
        initTop() {
            const resp = this.topResp;
            const popupRect = this.popupRect;
            const y = this.y;
            const bottom = popupRect.height + y;
            if (bottom <= document.documentElement.clientHeight) {
                resp.top = y;
                resp.topAligned = true;
                return;
            }
            const top = y - popupRect.height;
            if (top >= 0) {
                resp.top = y - popupRect.height;
                resp.topAligned = false;
                return;
            }
            resp.needScroll = true;
            const MIN_MARGIN_SPACE = 10;
            const bottomHasMoreSpace = (document.documentElement.clientHeight - y) > y;
            if (bottomHasMoreSpace) {
                resp.top = y;
                resp.scrollHeight = document.documentElement.clientHeight - y - MIN_MARGIN_SPACE;
                resp.topAligned = true;
                return;
            }
            resp.top = MIN_MARGIN_SPACE;
            resp.scrollHeight = y - MIN_MARGIN_SPACE;
            resp.topAligned = false;
        }
        positionContainer() {
            const containerElem = this.containerElem;
            const popupRect = this.popupRect;
            const topResp = this.topResp;
            const leftResp = this.leftResp;
            containerElem.style.top = topResp.top + "px";
            containerElem.style.left = leftResp.left + this.getAdjustLeft() + "px";
            if (topResp.needScroll || leftResp.needScroll) {
                const height = topResp.needScroll ? topResp.scrollHeight : popupRect.height;
                const width = leftResp.needScroll ? leftResp.scrollWidth : popupRect.width;
                UIUtil.addSlimScroll(containerElem.firstElementChild, { height, width });
            }
            document.body.append(containerElem);
        }
        getAdjustLeft() {
            return this.leftResp.leftAligned ? this.input.adjust.left_x : this.input.adjust.right_x;
        }
        getResult() {
            const verticalAlignment = this.topResp.topAligned ? PositionAlignment.VERTICAL.TOP : PositionAlignment.VERTICAL.BOTTOM;
            const horizontalAlignment = this.leftResp.leftAligned ? PositionAlignment.HORIZONTAL.LEFT : PositionAlignment.HORIZONTAL.RIGHT;
            const alignment = PositionAlignment.getInstance(verticalAlignment, horizontalAlignment);
            return {
                alignment
            };
        }
    }

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
        gg = new GG$1(this);
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

    class PP {
        theme = null;
        mainUI = null;
        passwordsUI = null;
        foldersUI = null;
        generatorUI = null;
        bgEventListener = null;
    }
    const pp = new PP();
    setGlobal("pp", pp);

    class UnlockOrUIElem extends UIElemContainer {
        passphraseButton;
        oneauthButton;
        webauthnButton;
        init() {
            this.container = UIUtil.createElem({ preRender: true, template: "#unlock_or_template" });
            this.passphraseButton = this.select("[data-unlock_master]");
            this.oneauthButton = this.select("[data-oneauth_unlock]");
            this.webauthnButton = this.select("[data-webauthn_unlock]");
        }
    }

    class UnlockOrUI {
        oneauthUnlockable = false;
        webauthnUnlockable = false;
        elem;
        async init() {
            this.elem = new UnlockOrUIElem();
            this.elem.init();
            this.addListeners();
            this.oneauthUnlockable = await bgApi.unlock.oneauth.isUnlockable();
            this.webauthnUnlockable = await bgApi.unlock.webauthn.isUnlockable();
            js.dom.setContent(context$2.unlockUI.elem.unlockOrOut, this.elem.container);
        }
        showUI({ passphraseUI = false, oneauthUI = false, webauthnUI = false }) {
            const unlockable = this.oneauthUnlockable || this.webauthnUnlockable;
            this.elem.container.classList.toggle(VaultCSS.DIS_HIDE, !unlockable);
            if (!unlockable) {
                return;
            }
            this.elem.passphraseButton.classList.toggle(VaultCSS.DIS_HIDE, passphraseUI);
            this.elem.oneauthButton.classList.toggle(VaultCSS.DIS_HIDE, oneauthUI || !this.oneauthUnlockable);
            this.elem.webauthnButton.classList.toggle(VaultCSS.DIS_HIDE, webauthnUI || !this.webauthnUnlockable);
        }
        addListeners() {
            this.elem.oneauthButton.addEventListener("click", () => context$2.oneauthUI.showUI({ unlockClicked: true }));
            this.elem.passphraseButton.addEventListener("click", () => context$2.passphraseUI.showUI());
            this.elem.webauthnButton.addEventListener("click", () => context$2.webauthnUI.showUI({ unlockClicked: true }));
        }
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
    class TagQuery extends PageQuery {
        excludeTags = [];
    }
    let UnlockMethod$1 = class UnlockMethod {
        static MASTER = "MASTER";
        static ONEAUTH = "ONEAUTH";
        static WEBAUTHN = "WEBAUTHN";
    };

    class UnlockUIElem extends UIElemContainer {
        unlockOut;
        unlockOrOut;
        usernameSpan;
        signoutButton;
        dpImg;
        loadingElem;
        init() {
            this.container = UIUtil.createElem({ preRender: true, template: "#passphrase_page" });
            this.unlockOut = this.select("#unlock_out");
            this.unlockOrOut = this.select("#unlock_or_out");
            this.usernameSpan = this.select("[data-name]");
            this.signoutButton = this.select(`[data-name="signout_button"]`);
            this.dpImg = this.select("[data-dp]");
            this.loadingElem = this.select("[data-open_vault_loading]");
        }
    }

    class UnlockUI {
        elem;
        async showUI() {
            this.elem = new UnlockUIElem();
            this.elem.init();
            const username = await zlocalStorage.load(LocalStorageKeys.USERNAME, "");
            js.dom.setText(this.elem.usernameSpan, username);
            bgApi.user.getDp().then(dp => this.elem.dpImg.src = dp);
            this.elem.signoutButton.addEventListener("click", this.signout);
            await context$2.unlockOrUI.init();
            await this.showUnlockMethod();
            js.dom.setContent("#output", this.elem.container);
        }
        showLoading(show) {
            js.dom.showIf(show, this.elem.loadingElem);
        }
        async showUnlockMethod() {
            try {
                const existingError = await zsessionStorage.load(SessionStorageKeys.POPUP_UNLOCK_ERROR);
                if (existingError) {
                    this.handleUnlockError(existingError);
                    context$2.passphraseUI.showUI();
                    return;
                }
                const lastUsedMethod = await bgApi.unlock.getLastUsedUnlock();
                if (lastUsedMethod == UnlockMethod$1.MASTER) {
                    context$2.passphraseUI.showUI();
                    return;
                }
                if (lastUsedMethod == UnlockMethod$1.ONEAUTH && await bgApi.unlock.oneauth.isUnlockable()) {
                    context$2.oneauthUI.showUI();
                    return;
                }
                if (lastUsedMethod == UnlockMethod$1.WEBAUTHN && await bgApi.unlock.webauthn.isUnlockable()) {
                    context$2.webauthnUI.showUI();
                    return;
                }
            }
            catch (e) {
                logError(e);
            }
            context$2.passphraseUI.showUI();
        }
        handleUnlockError(error) {
            try {
                zsessionStorage.remove(SessionStorageKeys.POPUP_UNLOCK_ERROR);
                if (Date.now() > error.validUpto) {
                    return;
                }
                switch (error.type) {
                    case UnlockMethod$1.ONEAUTH:
                        context$2.oneauthUI.oneAuthUnlockComplete(error.resp);
                        break;
                    case UnlockMethod$1.WEBAUTHN:
                        context$2.webauthnUI.webauthnUnlockComplete(error.resp);
                        break;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        signout() {
            bgApi.login.signOut();
            pp.mainUI.closeUI();
        }
    }

    class OneauthUIElem extends UIElemContainer {
        unlockElem;
        loadingElem;
        resendPushButton;
        init() {
            this.container = UIUtil.createElem({ preRender: true, template: "#oneauth_unlock_template" });
            this.unlockElem = this.select("[data-unlock_oneauth]");
            this.loadingElem = this.select("[data-loading_container]");
            this.resendPushButton = this.select("[data-resend_push]");
        }
    }

    class OneAuthUI {
        elem;
        async showUI({ unlockClicked = false } = {}) {
            this.elem = new OneauthUIElem();
            this.elem.init();
            this.addListeners();
            if (await this.isUnlockInProgress()) {
                this.showLoading();
                this.elem.resendPushButton.classList.remove(VaultCSS.DIS_HIDE);
            }
            if (unlockClicked) {
                this.unlock();
            }
            context$2.unlockOrUI.showUI({ oneauthUI: true });
            js.dom.setContent(context$2.unlockUI.elem.unlockOut, this.elem.container);
        }
        oneAuthPushSent() {
            VUI.notification.showSuccess(i18n(VI18N.PUSH_SENT_SUCCESS));
            this.elem.resendPushButton.classList.remove(VaultCSS.DIS_HIDE);
        }
        oneAuthUnlockComplete(resp) {
            if (resp.ok) {
                pp.mainUI.showUI();
                return;
            }
            switch (resp.error) {
                case "DENIED":
                    context$2.passphraseUI.showUI();
                    break;
                default:
                    VUI.notification.showError(i18n(VI18N.ONEAUTH_UNLOCK_FAILED));
                    context$2.passphraseUI.showUI();
                    console.info(resp.error);
                    break;
            }
        }
        addListeners() {
            this.elem.unlockElem.addEventListener("click", () => this.unlock());
            this.elem.resendPushButton.addEventListener("click", () => bgApi.unlock.oneauth.resendPush());
        }
        async isUnlockInProgress() {
            const lastStarted = await zsessionStorage.load(SessionStorageKeys.ONEAUTH_UNLOCK_STARTED, 0);
            const secondsPassed = js.time.getSecondsPassed(lastStarted);
            return secondsPassed <= 60;
        }
        unlock() {
            bgApi.unlock.setLastUnlock(UnlockMethod$1.ONEAUTH);
            this.showLoading();
            bgApi.unlock.oneauth.unlock();
        }
        showLoading() {
            this.elem.unlockElem.classList.add(VaultCSS.DIS_HIDE);
            this.elem.loadingElem.classList.remove(VaultCSS.DIS_HIDE);
        }
    }

    class PassphraseUIElem extends UIElemContainer {
        errorMsgElem;
        passphraseElem;
        eyeIconElem;
        openButton;
        showHideButton;
        init() {
            this.container = UIUtil.createElem({ preRender: true, template: "#master_unlock_template" });
            this.errorMsgElem = this.select("#error_passphrase");
            this.passphraseElem = this.select("#input_passphrase");
            this.eyeIconElem = this.select("#icon_view_hide_passphrase i");
            this.openButton = this.select(`[data-name="open_vault_button"]`);
            this.showHideButton = this.select("[data-show_hide_passphrase]");
        }
    }

    class PassphraseUI {
        elem;
        showUI() {
            this.elem = new PassphraseUIElem();
            this.elem.init();
            this.addListeners();
            bgApi.unlock.setLastUnlock(UnlockMethod$1.MASTER);
            context$2.unlockOrUI.showUI({ passphraseUI: true });
            js.dom.setContent(context$2.unlockUI.elem.unlockOut, this.elem.container);
        }
        addListeners() {
            this.elem.openButton.addEventListener("click", () => this.unlock());
            this.elem.showHideButton.addEventListener("click", e => uiUtilOld.clickedShowHidePassphrase(e));
            const input = this.elem.passphraseElem;
            input.addEventListener("focus", function () {
                js.selector.closest(input, "div.form-group").classList.add("active");
            });
            input.addEventListener("blur", function () {
                if (!input.value) {
                    js.selector.closest(input, "div.form-group").classList.remove("active");
                }
            });
            js.event.onEnter(input, () => this.unlock());
            input.addEventListener("keyup", (e) => {
                if (e.key != "Enter") {
                    js.dom.hideOld(this.elem.errorMsgElem);
                }
            });
            if (globalThis.sidePanel) {
                document.documentElement.addEventListener("click", function () {
                    js.selector.select("#input_passphrase")?.focus?.();
                }, { once: true });
            }
        }
        async unlock() {
            const passphraseElem = this.elem.passphraseElem;
            const passphrase = passphraseElem.value;
            if (!passphrase) {
                passphraseElem.focus();
                return;
            }
            passphraseElem.blur();
            const showLoadingTimeout = setTimeout(() => context$2.unlockUI.showLoading(true), 300);
            const unlockResult = await bgApi.login.unlock(passphrase);
            const unlocked = unlockResult.unlocked;
            clearTimeout(showLoadingTimeout);
            if (!unlocked) {
                this.showErrorMessage(unlockResult);
                context$2.unlockUI.showLoading(false);
                passphraseElem.focus();
                return;
            }
            this.clearPassphraseBeforeLogin();
            context$2.unlockUI.showLoading(true);
            pp.mainUI.showUI();
        }
        clearPassphraseBeforeLogin() {
            this.elem.passphraseElem.type = "password";
            this.elem.passphraseElem.value = "";
            this.elem.eyeIconElem.className = "icon-view";
        }
        showErrorMessage(unlockResult) {
            try {
                js.dom.setText(this.elem.errorMsgElem, this.getUnlockErrorMessage(unlockResult));
                js.dom.showOld(this.elem.errorMsgElem);
            }
            catch (e) {
                logError(e);
            }
        }
        getUnlockErrorMessage(unlockResult) {
            try {
                if (unlockResult.attemptsRemaining > 3) {
                    return i18n(VI18N.INVALID_MASTER_PASSWORD);
                }
                return i18n(VI18N.INVALID_MASTER_PASSWORD_N_REMAINING, unlockResult.attemptsRemaining);
            }
            catch (e) {
                logError(e);
                return i18n(VI18N.INVALID_MASTER_PASSWORD);
            }
        }
    }

    class WebauthnUIElem extends UIElemContainer {
        unlockElem;
        loadingElem;
        init() {
            this.container = UIUtil.createElem({ preRender: true, template: "#webauthn_unlock_template" });
            this.unlockElem = this.select("[data-unlock]");
            this.loadingElem = this.select("[data-loading_container]");
        }
    }

    class WebauthnUI {
        elem;
        showUI({ unlockClicked = false } = {}) {
            this.elem = new WebauthnUIElem();
            this.elem.init();
            this.addListeners();
            if (unlockClicked) {
                this.unlock();
            }
            context$2.unlockOrUI.showUI({ webauthnUI: true });
            js.dom.setContent(context$2.unlockUI.elem.unlockOut, this.elem.container);
        }
        webauthnUnlockComplete(resp) {
            if (resp.ok) {
                pp.mainUI.showUI();
                return;
            }
            VUI.notification.showError(i18n(VI18N.ONEAUTH_UNLOCK_FAILED));
            context$2.passphraseUI.showUI();
            console.info(resp.error);
        }
        addListeners() {
            this.elem.unlockElem.addEventListener("click", () => this.unlock());
        }
        async unlock() {
            this.elem.unlockElem.classList.add(VaultCSS.DIS_HIDE);
            this.elem.loadingElem.classList.remove(VaultCSS.DIS_HIDE);
            await bgApi.unlock.webauthn.unlock();
        }
    }

    let Context$2 = class Context {
        unlockUI;
        passphraseUI;
        oneauthUI;
        unlockOrUI;
        webauthnUI;
        init() {
            this.unlockUI = new UnlockUI();
            this.passphraseUI = new PassphraseUI();
            this.oneauthUI = new OneAuthUI();
            this.unlockOrUI = new UnlockOrUI();
            this.webauthnUI = new WebauthnUI();
        }
    };
    const context$2 = new Context$2();

    context$2.init();
    const unlockUI = context$2.unlockUI;
    const oneauthUI = context$2.oneauthUI;
    const webauthnUI = context$2.webauthnUI;

    var VtErrorCode;
    (function (VtErrorCode) {
        VtErrorCode["NEED_SIGN_UP"] = "NEED_SIGN_UP";
    })(VtErrorCode || (VtErrorCode = {}));

    class AccountsErrorUIElem extends UIElemContainer {
        usernameElem;
        emailElem;
        dpImg;
        errorMsg;
        actionButton;
        signoutButton;
        init() {
            this.container = UIUtil.createElem({ template: "#accounts_error" });
            this.usernameElem = this.select("#username");
            this.emailElem = this.select("#email");
            this.dpImg = this.select("#dp");
            this.errorMsg = this.select("#errorMsg");
            this.actionButton = this.select("#actionBtn");
            this.signoutButton = this.select(`[data-name="signout_button"]`);
        }
    }

    class AccountsErrorUI {
        elem;
        constructor() { }
        init() {
            this.elem = new AccountsErrorUIElem();
        }
        async showError(errorCode) {
            try {
                this.init();
                this.elem.init();
                this.addListeners();
                await this.showUserInfo();
                js.dom.setText(this.elem.errorMsg, this.getErrorMsg(errorCode));
                this.showAction(errorCode);
                js.dom.setContent("#output", this.elem.container);
            }
            catch (e) {
                logError(e);
            }
        }
        addListeners() {
            try {
                this.elem.signoutButton.addEventListener("click", () => this.signOut());
            }
            catch (e) {
                logError(e);
            }
        }
        async showUserInfo() {
            try {
                const data = await zlocalStorage.loadAll({
                    [LocalStorageKeys.USERNAME]: "",
                    [LocalStorageKeys.EMAIL]: "",
                });
                js.dom.setText(this.elem.usernameElem, data[LocalStorageKeys.USERNAME]);
                js.dom.setText(this.elem.emailElem, data[LocalStorageKeys.EMAIL]);
                bgApi.user.getDp().then(dp => this.elem.dpImg.src = dp);
            }
            catch (e) {
                logError(e);
            }
        }
        getErrorMsg(errorCode) {
            try {
                switch (errorCode) {
                    case VtErrorCode.NEED_SIGN_UP:
                        return i18n$1(VI18N.SIGNUP_FOR_VAULT);
                    default:
                        return errorCode;
                }
            }
            catch (e) {
                logError(e);
                return errorCode;
            }
        }
        showAction(errorCode) {
            try {
                switch (errorCode) {
                    case VtErrorCode.NEED_SIGN_UP:
                        js.dom.setText(this.elem.actionButton, i18n$1(VI18N.SIGN_UP));
                        this.elem.actionButton.addEventListener("click", function () {
                            bgApi.vault.openWebUI();
                            js.dom.closeWindow();
                        });
                        return;
                    default:
                        this.elem.actionButton.addEventListener("click", () => window.location.reload());
                }
            }
            catch (e) {
                logError(e);
            }
        }
        signOut() {
            try {
                bgApi.login.signOut();
                pp.mainUI.closeUI();
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class GG {
        accountsUI;
        constructor(accountsUI) {
            this.accountsUI = accountsUI;
        }
    }

    class AccountsUI {
        loadingElem = null;
        checkingAccount = false;
        gg = new GG(this);
        errorUI = new AccountsErrorUI();
        init() {
            this.gg.accountsUI = this;
            this.loadingElem = js.selector.select("#loading_main");
        }
        async showUI() {
            try {
                this.init();
                (await this.checkOauth()).result;
                this.loadingElem.dataset.checking_accounts = "true";
                pp.mainUI.addGlobalKeyboardListener();
                const unlocked = await bgApi.login.isUnlocked();
                if (unlocked) {
                    return pp.mainUI.showUI();
                }
                const accountCheckResult = await this.checkAccount();
                if (accountCheckResult.ok) {
                    unlockUI.showUI();
                    return;
                }
                this.errorUI.showError(accountCheckResult.error);
            }
            catch (e) {
                logError(e);
                this.errorUI.showError(e);
            }
        }
        isCheckingAccount() {
            return this.checkingAccount;
        }
        async checkAccount() {
            try {
                this.checkingAccount = true;
                const loginResult = await bgApi.login.initLogin();
                if (loginResult.ok) {
                    this.checkingAccount = false;
                    return fnOut.OK;
                }
                return fnOut.error(loginResult.error);
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
        async checkOauth() {
            try {
                const isLoggedIn = await bgApi.login.isLoggedIn();
                if (isLoggedIn) {
                    await bgApi.login.refreshTokenIfExpired();
                    return fnOut.OK;
                }
                await bgApi.login.generateOauthTokens();
                await js.time.waitForever();
                return fnOut.OK;
            }
            catch (e) {
                logError(e);
                return fnOut.error(e);
            }
        }
    }

    let Context$1 = class Context {
        accountsUI;
        init() {
            this.accountsUI = new AccountsUI();
        }
    };
    const context$1 = new Context$1();

    context$1.init();
    const accountsUI = context$1.accountsUI;

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

    class SettingsUIData {
        inactivityTimeout;
        inactivityEnforced;
        clearClipboard;
        filter;
        staySignedIn;
        autoSavePasswords;
        oneauthEnabled;
        webauthnEnabled;
        isPersonalPlan;
        oneAuthUnlockRestricted;
        webauthnUnlockRestricted;
        async init() {
            const KEYS = LocalStorageKeys;
            const existing = await zlocalStorage.loadAll({
                [KEYS.INACTIVE_TIMEOUT]: "30",
                [KEYS.INACTIVITY_ENFORCED]: false,
                [KEYS.CLEAR_CLIPBOARD]: "30",
                [KEYS.DEFAULT_FILTER]: zenum.FILTER.ALL,
                [VtSettings.STAY_SIGNED_IN]: false,
                [KEYS.AUTO_SAVE_UPDATE_PASSWORDS]: true,
                [KEYS.ONEAUTH_UNLOCK_ENABLED]: false,
                [KEYS.WEBAUTHN_UNLOCK_ENABLED]: false,
                [KEYS.IS_PERSONAL_PLAN]: false,
                [KEYS.RESTRICT_ONEAUTH_UNLOCK]: false,
                [KEYS.RESTRICT_WEBAUTHN_UNLOCK]: false,
            });
            this.inactivityTimeout = existing[KEYS.INACTIVE_TIMEOUT];
            this.inactivityEnforced = existing[KEYS.INACTIVITY_ENFORCED];
            this.clearClipboard = existing[KEYS.CLEAR_CLIPBOARD];
            this.filter = existing[KEYS.DEFAULT_FILTER];
            this.staySignedIn = existing[VtSettings.STAY_SIGNED_IN];
            this.autoSavePasswords = existing[KEYS.AUTO_SAVE_UPDATE_PASSWORDS];
            this.oneauthEnabled = existing[KEYS.ONEAUTH_UNLOCK_ENABLED];
            this.webauthnEnabled = existing[KEYS.WEBAUTHN_UNLOCK_ENABLED];
            this.isPersonalPlan = existing[KEYS.IS_PERSONAL_PLAN];
            this.oneAuthUnlockRestricted = existing[KEYS.RESTRICT_ONEAUTH_UNLOCK];
            this.webauthnUnlockRestricted = existing[KEYS.RESTRICT_WEBAUTHN_UNLOCK];
        }
    }

    class SettingsUIDropdown {
        init() {
            this.initFilterSelect();
            this.initInactivitySelect();
            this.initClearClipboardSelect();
            $(context.settingsUI.elem.filterSelect).on("change", e => pp.passwordsUI.changeDefaultFilter(e.target.value));
        }
        initFilterSelect() {
            this.initSelect2(context.settingsUI.elem.filterSelect, LocalStorageKeys.DEFAULT_FILTER, context.settingsUI.data.filter);
            if (context.settingsUI.data.isPersonalPlan) {
                js.selector.selectAll("[data-enterprise]", context.settingsUI.elem.container).forEach(x => x.remove());
            }
        }
        initInactivitySelect() {
            const inactivitySelect = context.settingsUI.elem.inactivitySelect;
            const minutesOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
            const minutesSuffix = " " + i18n(VI18N.MINUTES);
            minutesOptions.forEach(minute => inactivitySelect.append(new Option(minute + minutesSuffix, minute + "")));
            inactivitySelect.append(new Option("1 " + i18n(VI18N.HOUR), (1 * 60) + ""));
            const hoursOptions = [2, 4, 8, 12];
            const hoursSuffix = " " + i18n(VI18N.HOURS);
            hoursOptions.forEach(hour => inactivitySelect.append(new Option(hour + hoursSuffix, (hour * 60) + "")));
            inactivitySelect.append(new Option("1 " + i18n(VI18N.DAY), (1 * 24 * 60) + ""));
            inactivitySelect.append(new Option("2 " + i18n(VI18N.DAYS), (2 * 24 * 60) + ""));
            inactivitySelect.append(new Option("1 " + i18n(VI18N.WEEK), (1 * 7 * 24 * 60) + ""));
            this.initSelect2(inactivitySelect, LocalStorageKeys.INACTIVE_TIMEOUT, context.settingsUI.data.inactivityTimeout);
            this.checkEnforcedInactivity();
        }
        checkEnforcedInactivity() {
            if (!context.settingsUI.data.inactivityEnforced) {
                return;
            }
            const inactivitySelect = context.settingsUI.elem.inactivitySelect;
            const inactivityJElem = $(inactivitySelect);
            const option = js.selector.selectFrom(inactivitySelect, "option[value='" + inactivityJElem.val() + "']");
            option.textContent += " (" + i18n(VI18N.SETTING_ENFORCED_BY_AMDIN) + ")";
            inactivityJElem.select2({ disabled: true });
        }
        initClearClipboardSelect() {
            const clipboardSelectElem = context.settingsUI.elem.clearClipboardSelect;
            const secondsOptions = [30, 60, 90, 120];
            const secondsSuffix = " " + i18n(VI18N.SECONDS);
            secondsOptions.forEach(second => clipboardSelectElem.append(new Option(second + secondsSuffix, second + "")));
            this.initSelect2(clipboardSelectElem, LocalStorageKeys.CLEAR_CLIPBOARD, context.settingsUI.data.clearClipboard);
        }
        initSelect2(selectElem, key, value) {
            const selectedOption = selectElem.querySelector(`option[value='${value}']`);
            if (selectedOption) {
                selectedOption.selected = true;
            }
            $(selectElem).select2({
                minimumResultsForSearch: -1
            });
            $(selectElem).on("change", e => context.settingsUI.changeSetting(key, e.target.value));
        }
    }

    class SettingsUIElem extends UIElemContainer {
        inactivitySelect;
        clearClipboardSelect;
        filterSelect;
        syncIcon;
        autoSaveCheckbox;
        staySignedInCheckbox;
        oneauthCheckbox;
        webauthnCheckbox;
        viewAllButton;
        oneauthUnlockContainer;
        webauthnUnlockContainer;
        oneauthInstallElem;
        closeOneauthInstallElem;
        oneauthInstallHeading;
        init() {
            this.container = UIUtil.createElem({ preRender: true, template: "#page_settings" });
            this.inactivitySelect = this.select("#inactivity_select");
            this.clearClipboardSelect = this.select("#select_clear_clipboard");
            this.filterSelect = this.select("#select_filter");
            this.syncIcon = this.select("#sync_icon");
            this.autoSaveCheckbox = this.select("#prompt_save");
            this.staySignedInCheckbox = this.select("#stay_signed_in");
            this.oneauthCheckbox = this.select("#oneauth_unlock");
            this.webauthnCheckbox = this.select("#webauthn_unlock");
            this.viewAllButton = this.select("#view_all_settings");
            this.oneauthUnlockContainer = this.select("#oneauth_unlock_container");
            this.webauthnUnlockContainer = this.select("#webauthn_unlock_container");
        }
        createOneauthInstallPrompt() {
            this.oneauthInstallElem = UIUtil.createElem({ preRender: true, template: "#oneauth_install_template" });
            this.closeOneauthInstallElem = js.selector.select("#oneAuthInstallClose");
            this.oneauthInstallHeading = js.selector.select("#oneauthInstallHeading");
        }
    }

    class SettingsUI {
        elem;
        data;
        dropdowns;
        init() {
            this.elem = new SettingsUIElem();
            this.data = new SettingsUIData();
            this.dropdowns = new SettingsUIDropdown();
            this.init = js.fn.emptyFn;
        }
        async showUI() {
            this.init();
            await this.data.init();
            this.elem.init();
            pp.mainUI.initSearch();
            this.dropdowns.init();
            this.initCheckboxes();
            this.addListeners();
            this.initUnlock();
            UIUtil1.inst.slimScroll(js.selector.selectFrom(this.elem.container, ".page-container"), "450px");
            js.dom.setContent("#content_tab", this.elem.container);
        }
        syncing() {
            const isUIShown = this.elem?.container?.parentElement;
            if (!isUIShown) {
                return;
            }
            this.setSyncingIcon(true);
        }
        synced() {
            const isUIShown = this.elem?.container?.parentElement;
            if (!isUIShown) {
                return;
            }
            this.showUI();
            this.setSyncingIcon(false);
        }
        addListeners() {
            const KEYS = LocalStorageKeys;
            this.elem.autoSaveCheckbox.addEventListener("input", () => this.changeCheckboxSetting(this.elem.autoSaveCheckbox, KEYS.AUTO_SAVE_UPDATE_PASSWORDS));
            this.elem.staySignedInCheckbox.addEventListener("input", () => this.changeCheckboxSetting(this.elem.staySignedInCheckbox, VtSettings.STAY_SIGNED_IN));
            this.elem.oneauthCheckbox.addEventListener("input", () => this.changeOneAuthUnlock());
            this.elem.webauthnCheckbox.addEventListener("input", () => this.changeWebauthnUnlock());
            this.elem.syncIcon.addEventListener("click", () => this.sync());
            this.elem.viewAllButton.addEventListener("click", () => this.viewAllSettings());
            this.elem.container.addEventListener("click", e => this.handleCheckboxLabelClick(e));
        }
        sync() {
            const syncing = this.elem.syncIcon.classList.contains(VaultCSS.SYNCING_ANIMATION);
            if (syncing) {
                return;
            }
            bgApi.vault.sync();
            VUI.notification.showSuccess(i18n$1(VI18N.SYNC_STARTED), 1);
        }
        async viewAllSettings() {
            await bgApi.ztab.openSettings();
            await js.dom.closeWindow();
        }
        initCheckboxes() {
            this.elem.autoSaveCheckbox.checked = this.data.autoSavePasswords;
            this.elem.staySignedInCheckbox.checked = this.data.staySignedIn;
            this.elem.oneauthCheckbox.checked = this.data.oneauthEnabled;
            this.elem.webauthnCheckbox.checked = this.data.webauthnEnabled;
        }
        async changeSetting(name, value) {
            try {
                pp.mainUI.showDotLoading();
                await bgApi.settings.change(name, value);
                VUI.notification.showSuccess(i18n$1(VI18N.CHANGES_UPDATED));
            }
            finally {
                pp.mainUI.hideDotLoading();
            }
        }
        async changeCheckboxSetting(input, name, trueValue = true, falseValue = false) {
            try {
                await this.changeSetting(name, input.checked ? trueValue : falseValue);
            }
            catch (e) {
                input.checked = !input.checked;
                throw e;
            }
        }
        async changeOneAuthUnlock() {
            try {
                pp.mainUI.showDotLoading();
                const input = this.elem.oneauthCheckbox;
                const enable = input.checked;
                const result = await bgApi.unlock.oneauth.enable(enable);
                pp.mainUI.hideDotLoading();
                if (result.ok) {
                    VUI.notification.showSuccess(i18n$1(VI18N.CHANGES_UPDATED));
                    return;
                }
                const errorCode = result.error;
                input.checked = !input.checked;
                switch (errorCode) {
                    case ONEAUTH_STATUS.NO_DEVICE_FOUND:
                    case ONEAUTH_STATUS.UPGRADE_APP:
                        break;
                    default:
                        throw errorCode;
                }
                const action = errorCode == ONEAUTH_STATUS.UPGRADE_APP ? i18n$1(VI18N.UPDATE) : i18n$1(VI18N.DOWNLOAD);
                this.elem.createOneauthInstallPrompt();
                this.elem.closeOneauthInstallElem.addEventListener("click", () => this.elem.oneauthInstallElem.remove());
                js.dom.setText(this.elem.oneauthInstallHeading, action);
                document.body.append(this.elem.oneauthInstallElem);
            }
            catch (e) {
                logError(e);
                VUI.notification.showError(e);
            }
            finally {
                pp.mainUI.hideDotLoading();
            }
        }
        async changeWebauthnUnlock() {
            try {
                pp.mainUI.showDotLoading();
                const input = this.elem.webauthnCheckbox;
                const enable = input.checked;
                if (!enable) {
                    (await bgApi.unlock.webauthn.enable(false)).result;
                    VUI.notification.showSuccess(i18n$1(VI18N.CHANGES_UPDATED));
                    return;
                }
                const countRespPromise = bgApi.unlock.webauthn.getCredentialCount();
                (await bgApi.unlock.webauthn.enable(true)).result;
                VUI.notification.showSuccess(i18n$1(VI18N.CHANGES_UPDATED));
                const authenticatorCount = (await countRespPromise).result;
                if (authenticatorCount == 0) {
                    this.confirmWebauthnAddAuthenticator();
                }
            }
            catch (e) {
                logError(e);
                VUI.notification.showError(e);
            }
            finally {
                pp.mainUI.hideDotLoading();
            }
        }
        async confirmWebauthnAddAuthenticator() {
            try {
                const confirmed = await _AlertUI.inst.createAlert()
                    .title("Add Authenticator?")
                    .text("You can choose the authenticator based on your operating system and browser.")
                    .addButton("confirm", _AlertUI.inst.createButton().text("Add Authenticator").value(true).build())
                    .addButton("cancel", _AlertUI.inst.createButton().text(i18n$1(VI18N.CANCEL)).value(false).build())
                    .show();
                if (!confirmed) {
                    return;
                }
                await bgApi.vault.openWebUI({ route: "/main/settings/unlock/authenticator/add" });
            }
            catch (e) {
                logError(e);
            }
        }
        initUnlock() {
            if (this.data.oneAuthUnlockRestricted) {
                this.elem.oneauthUnlockContainer.classList.add(VaultCSS.DIS_HIDE);
            }
            if (this.data.webauthnUnlockRestricted) {
                this.elem.webauthnUnlockContainer.classList.add(VaultCSS.DIS_HIDE);
            }
        }
        setSyncingIcon(syncing) {
            const syncIcon = this.elem.syncIcon;
            if (syncing) {
                syncIcon.dataset.tooltip_content = i18n$1(VI18N.SYNCING);
                syncIcon.classList.add(VaultCSS.SYNCING_ANIMATION);
                return;
            }
            syncIcon.classList.remove(VaultCSS.SYNCING_ANIMATION);
            syncIcon.dataset.tooltip_content = i18n$1(VI18N.SYNC);
        }
        handleCheckboxLabelClick(e) {
            const target = e.target;
            if (!target.matches("[data-checkbox_label]")) {
                return;
            }
            const checkboxSelector = `input[type="checkbox"]`;
            const parent = js.dom.findParent({ selector: target, criteria: x => Boolean(x.querySelector(checkboxSelector)) });
            const checkboxInput = js.selector.selectFrom(parent, checkboxSelector);
            checkboxInput.click();
        }
    }

    class Context {
        settingsUI;
        init() {
            this.settingsUI = new SettingsUI();
        }
    }
    const context = new Context();

    context.init();
    const settingsUI = context.settingsUI;

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

    class PPBgEventListener {
        init() {
            portApi.createEventClient().init(VtEventScopes.BG, this);
        }
        login = new BgLoginEventHandler();
        settings = new BgSettingsEventHandler();
        sync = new BgSyncEventHandler();
        ;
        secret = new BgSecretEventHandler();
    }
    class BgSecretEventHandler {
        changed(secretId) {
            try {
                pp.passwordsUI.secretChanged(secretId);
                pp.mainUI.refreshDomainMatchingCount();
            }
            catch (e) {
                logError(e);
            }
        }
        removed(secretIds) {
            try {
                pp.passwordsUI.secretsRemoved(secretIds);
                pp.mainUI.refreshDomainMatchingCount();
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class BgLoginEventHandler {
        locked() {
            try {
                if (accountsUI.isCheckingAccount()) {
                    return;
                }
                window.location.reload();
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class BgSettingsEventHandler {
        themeChanged() {
            pp.theme.refreshTheme();
        }
    }
    class BgSyncEventHandler {
        syncing() {
            pp.mainUI.syncing();
            pp.passwordsUI.syncing();
            settingsUI.syncing();
        }
        synced() {
            try {
                pp.mainUI.synced();
                pp.passwordsUI.synced();
                pp.foldersUI.synced();
                settingsUI.synced();
            }
            catch (e) {
                logError(e);
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

    class ThemeDarkModeIcon {
        setDarkMode(enable) {
            enable ? this.enableDarkMode() : this.disableDarkMode();
        }
        async enableDarkMode() {
            const iconElem = js.selector.select("#dark_mode_icon");
            if (!iconElem) {
                return;
            }
            iconElem.className = "icon-light-theme";
            iconElem.dataset.tooltip_content = "i18n:turn_off_dark_mode";
            const settingsDarkModeElem = js.selector.select("#dark_mode");
            if (settingsDarkModeElem) {
                settingsDarkModeElem.checked = true;
            }
        }
        async disableDarkMode() {
            const iconElem = js.selector.select("#dark_mode_icon");
            if (!iconElem) {
                return;
            }
            iconElem.className = "icon-dark-theme";
            iconElem.dataset.tooltip_content = "i18n:turn_on_dark_mode";
            const settingsDarkModeElem = js.selector.select("#dark_mode");
            if (settingsDarkModeElem) {
                settingsDarkModeElem.checked = false;
            }
        }
    }

    class PPTheme extends Theme {
        icon = new ThemeDarkModeIcon();
        refreshUI(color, darkMode) {
            this.icon.setDarkMode(darkMode);
        }
    }

    class PopupApiServer {
        static init() {
            const apiServer = portApi.createApiServer();
            apiServer.init({ name: VtApiPortNames.POPUP, fnObj: new PopupFunctions() });
        }
    }
    class PopupFunctions {
        async close() {
            window.close();
        }
        async copyToClipboard(text) {
            return js.dom.copyToClipboard(text);
        }
        async oneAuthUnlockComplete(resp) {
            oneauthUI.oneAuthUnlockComplete(fnOut.parse(resp));
        }
        async oneWebauthnComplete(resp) {
            webauthnUI.webauthnUnlockComplete(fnOut.parse(resp));
        }
        async oneAuthPushSent() {
            oneauthUI.oneAuthPushSent();
        }
    }

    var FolderSharingType;
    (function (FolderSharingType) {
        FolderSharingType["SHARED_BY_ME"] = "SHARED_BY_ME";
        FolderSharingType["SHARED_TO_ME"] = "SHARED_TO_ME";
        FolderSharingType["NONE"] = "NONE";
    })(FolderSharingType || (FolderSharingType = {}));
    class FolderQuery extends PageQuery {
        static createDefaultQuery() {
            return {
                search_string: "",
                page_no: 0,
                rows_per_page: 50,
                sharingType: FilterType.ALL,
            };
        }
        sharingType;
    }
    class Folder_Tree_Query {
        end = 50;
        visible_sub_roots = [];
        static createDefaultQuery() {
            const query = {
                end: 50,
                visible_sub_roots: []
            };
            return query;
        }
    }

    class BaseFolderFilterUIElem extends UIElemContainer {
        init() {
            this.container = js.selector.select("#folders_filter_container");
        }
        getSharingCheckbox(value) {
            try {
                return this.select("input[name='folder_sharing'][value=" + value + "]");
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }

    class BaseFolderFilterUI {
        elem = new BaseFolderFilterUIElem();
        init() {
            try {
                this.elem.init();
                this.initUI();
                this.addListeners();
            }
            catch (e) {
                logError(e);
            }
        }
        showUI() {
            try {
                js.dom.show(this.elem.container);
            }
            catch (e) {
                logError(e);
            }
        }
        hideUI() {
            try {
                js.dom.hide(this.elem.container);
            }
            catch (e) {
                logError(e);
            }
        }
        isFiltered(query) {
            return query.sharingType != FilterType.ALL;
        }
        countFilters(query) {
            return this.isFiltered(query) ? 1 : 0;
        }
        initUI() {
            try {
                this.elem.getSharingCheckbox(this.data.getQuery().sharingType).checked = true;
            }
            catch (e) {
                logError(e);
            }
        }
        addListeners() {
            try {
                this.elem.getSharingCheckbox(FilterType.ALL).addEventListener("input", () => this.updater.changeSharingType(FilterType.ALL));
                this.elem.getSharingCheckbox(FolderSharingType.SHARED_BY_ME).addEventListener("input", () => this.updater.changeSharingType(FolderSharingType.SHARED_BY_ME));
                this.elem.getSharingCheckbox(FolderSharingType.SHARED_TO_ME).addEventListener("input", () => this.updater.changeSharingType(FolderSharingType.SHARED_TO_ME));
                this.elem.getSharingCheckbox(FolderSharingType.NONE).addEventListener("input", () => this.updater.changeSharingType(FolderSharingType.NONE));
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class BaseFolderFilterUpdater {
        filterUI;
        constructor(filterUI) {
            this.filterUI = filterUI;
        }
        changeSearchString(searchString) {
            this.update(x => x.search_string = searchString);
        }
        changeSharingType(value) {
            this.update(x => x.sharingType = value);
        }
        update(fn) {
            try {
                const query = this.filterUI.data.getQuery();
                fn(query);
                this.updateFilter(query);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    let FilterUpdater$1 = class FilterUpdater extends BaseFolderFilterUpdater {
        async updateFilter(query) {
            query.page_no = 0;
            await zsessionStorage.save(FoldersUI.PP_FOLDER_QUERY, query);
            await pp.foldersUI.refreshFolderList();
        }
    };

    class BaseFolderFilterUIData {
    }

    class FolderFilterUIData extends BaseFolderFilterUIData {
        getQuery() {
            return pp.foldersUI.getQuery();
        }
    }

    class FolderFilterUI extends BaseFolderFilterUI {
        data = new FolderFilterUIData();
        updater = new FilterUpdater$1(this);
    }

    class UIParent {
        elem = null;
        select(selector) {
            return js.selector.selectFrom(this.elem, selector);
        }
        selectAll(selector) {
            return js.selector.selectAll(selector, this.elem);
        }
        showIf(condition, ...selectors) {
            if (condition) {
                this.show(...selectors);
                return;
            }
            this.hide(...selectors);
        }
        show(...selectors) {
            this.showElems(selectors);
        }
        showElems(selectors) {
            const elems = this.selectElems(selectors);
            js.dom.showElems(elems);
        }
        hide(...selectors) {
            this.hideElems(selectors);
        }
        hideElems(selectors) {
            const elems = this.selectElems(selectors);
            js.dom.hideElems(elems);
        }
        selectElems(selectors) {
            const elems = selectors.map(x => typeof x == "string" ? this.select(x) : x);
            return elems;
        }
        text(selector, text) {
            js.dom.setChildText(this.elem, selector, text);
        }
        isUIShown() {
            try {
                return Boolean(this.elem?.closest?.("html"));
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        remove(...selectors) {
            for (let selector of selectors) {
                this.select(selector).remove();
            }
        }
        setContent(selector, content) {
            js.dom.setContent(this.select(selector), content);
        }
        setParent(selector) {
            js.dom.setContent(selector, this.elem);
        }
    }

    class FolderTree {
        p = null;
        static PP_FOLDER_TREE_QUERY = "PP_FOLDER_TREE_QUERY";
        folderTemplateElem = null;
        folderListElem = null;
        intersectionObserver = null;
        async init() {
            this.init = async () => { };
            this.handleScrollIntersection = this.handleScrollIntersection.bind(this);
            this.showNextPage = js.fn.wrapper.createSingleInstListener(this.showNextPage, this);
            this.refreshFolderTree = js.fn.wrapper.createSingleInstListener(this.refreshFolderTree, this);
        }
        async showUI() {
            await this.initQuery();
            this.folderListElem = this.p.select("#folders_list");
            this.folderTemplateElem = js.selector.select("#folder_list_item_template");
            this.folderListElem.replaceChildren();
            await this.refreshFolderTree();
        }
        async refreshFolderTree() {
            try {
                const query = await zsessionStorage.load(FolderTree.PP_FOLDER_TREE_QUERY, null) || Folder_Tree_Query.createDefaultQuery();
                const result = await bgApi.folder.queryTree(query);
                const folders = result.folders;
                if (folders.length == 0) {
                    this.p.show("#no_folders_div");
                    return;
                }
                this.p.show("#folders_list");
                this.p.hide("#no_folders_div", "#no_matching_folders_div");
                this.folderListElem.replaceChildren(this.getFolderTree(folders));
                if (result.total > query.end) {
                    this.addScrollListener();
                }
            }
            catch (e) {
                logError(e);
            }
        }
        addScrollListener() {
            try {
                const LAST_NTH = 3;
                const folderListElem = this.folderListElem;
                const elementToObserve = folderListElem.children[folderListElem.children.length - LAST_NTH];
                if (!elementToObserve) {
                    return;
                }
                if (this.intersectionObserver) {
                    this.intersectionObserver.disconnect();
                }
                this.intersectionObserver = new IntersectionObserver(this.handleScrollIntersection, {
                    root: document.body,
                    threshold: 1,
                });
                if (elementToObserve) {
                    this.intersectionObserver.observe(elementToObserve);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        handleScrollIntersection(entries, observer) {
            const intersected = entries.some(x => x.isIntersecting);
            if (!intersected) {
                return;
            }
            observer.disconnect();
            this.showNextPage();
        }
        async showNextPage() {
            const ROWS_PER_PAGE = 50;
            const query = await zsessionStorage.load(FolderTree.PP_FOLDER_TREE_QUERY, null) || Folder_Tree_Query.createDefaultQuery();
            query.end += ROWS_PER_PAGE;
            await zsessionStorage.save(FolderTree.PP_FOLDER_TREE_QUERY, query);
            await this.refreshFolderTree();
        }
        getFolderTree(folders) {
            const fragment = document.createDocumentFragment();
            for (let folder of folders) {
                fragment.append(this.createFolderElem(folder));
            }
            this.updateArrowDirection(fragment);
            this.updatePadding(fragment);
            return fragment;
        }
        updateArrowDirection(container) {
            const folderElems = container.children;
            const iEnd = folderElems.length - 1;
            let curElem = null;
            let nextElem = null;
            for (let i = 0; i < iEnd; i++) {
                curElem = folderElems[i];
                nextElem = folderElems[i + 1];
                if (nextElem.dataset.parent_id == curElem.dataset.id) {
                    this.showCollapseArrow(curElem);
                }
            }
        }
        updatePadding(container) {
            const folderElems = Array.from(container.children);
            const maxPadding = document.documentElement.clientWidth / 2;
            for (let elem of folderElems) {
                const padding = Math.min((elem.dataset.path.split("\\").length - 1) * 10, maxPadding);
                js.selector.selectFrom(elem, "div.folder-list-panel-inner").style.marginLeft = padding + "px";
            }
        }
        createFolderElem(folder) {
            const elem = UIUtil.createElem({ template: this.folderTemplateElem });
            js.dom.setChildText(elem, "[data-name]", folder.name);
            elem.dataset.path = folder.path;
            elem.dataset.id = folder.id;
            elem.dataset.parent_id = folder.parent_id;
            globalNodeData.setNodeData(elem, folder);
            this.updateArrow(elem, folder);
            this.p.updateSharingIcon(elem, folder);
            return elem;
        }
        showExpandArrow(elem) {
            js.dom.showOld(js.selector.selectFrom(elem, "[data-expand]"));
            js.dom.hideOld(js.selector.selectFrom(elem, "[data-collapse]"));
        }
        showCollapseArrow(elem) {
            js.dom.hideOld(js.selector.selectFrom(elem, "[data-expand]"));
            js.dom.showOld(js.selector.selectFrom(elem, "[data-collapse]"));
        }
        updateArrow(elem, folder) {
            const expandElem = js.selector.selectFrom(elem, "[data-expand]");
            const collapseElem = js.selector.selectFrom(elem, "[data-collapse]");
            if (!folder.has_subfolder) {
                expandElem.remove();
                collapseElem.remove();
                return;
            }
            globalNodeData.setClickData(expandElem, { path: folder.path });
            globalNodeData.setClickData(collapseElem, { path: folder.path });
        }
        async initQuery() {
            const query = await zsessionStorage.load(FolderTree.PP_FOLDER_TREE_QUERY, null) || Folder_Tree_Query.createDefaultQuery();
            await zsessionStorage.save(FolderTree.PP_FOLDER_TREE_QUERY, query);
            return query;
        }
    }
    const folderTree = new FolderTree();
    setGlobal("folderTree", folderTree);

    class FoldersUIListener {
        p = null;
        async clicked_clear_folder_filters() {
            const query = await this.p.loadQuery();
            const filterElems = js.selector.selectAll("input", "#folders_filter_container");
            filterElems.forEach(x => x.checked = false);
            query.sharingType = FilterType.ALL;
            await this.p.filterUI.updater.updateFilter(query);
            this.clicked_hide_folders_filter();
        }
        async clicked_filter(e, event_data) {
            const input = e.target;
            const enable = input.checked;
            const { filter } = event_data;
            const query = await this.p.loadQuery();
            query[filter] = enable;
            await this.p.filterUI.updater.updateFilter(query);
        }
        clicked_show_folders_filter() {
            const showFilterElem = js.selector.select("#show_folders_filter");
            const isShown = showFilterElem.style.zIndex != "";
            if (isShown) {
                this.clicked_hide_folders_filter();
                return;
            }
            js.selector.selectFrom(showFilterElem, "a").classList.add("filter-action-icon-list-selected");
            showFilterElem.style.zIndex = "100";
            js.dom.show("#folder_filter_overlay", "#folder_filter_overlay_color_bg");
            this.p.filterUI.showUI();
        }
        clicked_hide_folders_filter() {
            const showFilterElem = js.selector.select("#show_folders_filter");
            js.selector.selectFrom(showFilterElem, "a").classList.remove("filter-action-icon-list-selected");
            showFilterElem.style.zIndex = "";
            js.dom.hide("#folder_filter_overlay", "#folder_filter_overlay_color_bg");
            this.p.filterUI.hideUI();
        }
        async clicked_show_folder_passwords(_e, _event_data, node_data) {
            const folder = node_data;
            pp.passwordsUI.showFolderPasswords(folder);
        }
        async clicked_expand_arrow(_e, event_data) {
            const { path } = event_data;
            const query = await zsessionStorage.load(FolderTree.PP_FOLDER_TREE_QUERY, null) || Folder_Tree_Query.createDefaultQuery();
            js.array.addUnique(query.visible_sub_roots, path);
            await zsessionStorage.save(FolderTree.PP_FOLDER_TREE_QUERY, query);
            folderTree.refreshFolderTree();
        }
        async clicked_collapse_arrow(_e, event_data) {
            const { path } = event_data;
            const query = await zsessionStorage.load(FolderTree.PP_FOLDER_TREE_QUERY, null) || Folder_Tree_Query.createDefaultQuery();
            query.visible_sub_roots = query.visible_sub_roots.filter(x => !x.startsWith(path));
            await zsessionStorage.save(FolderTree.PP_FOLDER_TREE_QUERY, query);
            folderTree.refreshFolderTree();
        }
        async keyed_search_string(e) {
            const input = e.target;
            UIUtil1.inst.showSearchClear(input);
            const query = await this.p.loadQuery();
            query.search_string = input.value;
            await this.p.filterUI.updater.updateFilter(query);
        }
        async clicked_add_folder() {
            const confirmed = await _AlertUI.inst.createAlert()
                .title(" ")
                .text("You can only create folders from our web app and mobile apps at the moment.")
                .addButton("confirm", _AlertUI.inst.createButton().text(i18n(VI18N.OPEN_WEB_APP)).value(true).build())
                .addButton("cancel", _AlertUI.inst.createButton().text(i18n(VI18N.CANCEL)).value(false).build())
                .show();
            if (!confirmed) {
                return;
            }
            await bgApi.vault.openWebUI({ route: "/main/folders" });
            await js.dom.closeWindow();
        }
    }

    class FoldersUI extends UIParent {
        static PP_FOLDER_QUERY = "PP_FOLDER_QUERY";
        query = null;
        intersectionObserver = null;
        isPersonalPlan = false;
        filterUI = new FolderFilterUI();
        listener = new FoldersUIListener();
        async init() {
            this.init = async () => { };
            this.listener.p = this;
            folderTree.p = this;
            this.isPersonalPlan = await zlocalStorage.load(LocalStorageKeys.IS_PERSONAL_PLAN, false);
            folderTree.init();
            this.refreshFolderList = js.fn.wrapper.createSingleInstListener(this.refreshFolderList, this);
            this.refreshQueriedList = js.fn.wrapper.createSingleInstListener(this.refreshQueriedList, this);
            this.handleScrollIntersection = this.handleScrollIntersection.bind(this);
            this.showNextPage = js.fn.wrapper.createSingleInstListener(this.showNextPage, this);
            globalDomListener.register("folders_ui", this.listener);
        }
        async showUI() {
            await this.init();
            if (this.elem) {
                this.elem.remove();
            }
            pp.passwordsUI.restorePreFolderQuery();
            const elem = this.elem = UIUtil.createElem({ preRender: true, template: "#page_folders" });
            await this.initQuery();
            this.initSearch();
            this.initFilters();
            await this.refreshFolderList();
            js.dom.setContent("#content_tab", elem);
        }
        async synced() {
            if (!this.isUIShown()) {
                return;
            }
            this.refreshFolderList();
        }
        initSearch() {
            const searchElem = js.selector.select("#search");
            searchElem.dataset.on_keyup = "folders_ui.keyed_search_string";
            searchElem.focus();
            searchElem.value = this.query.search_string || "";
            UIUtil1.inst.showSearchClear(searchElem);
        }
        async refreshFolderList() {
            this.hide("#no_folders_div", "#no_matching_folders_div");
            this.query = (await zsessionStorage.load(FoldersUI.PP_FOLDER_QUERY, null)) || FolderQuery.createDefaultQuery();
            this.updateFilterIndication();
            const isQueried = this.isQueried();
            if (!isQueried) {
                await folderTree.showUI();
                return;
            }
            await this.refreshQueriedList();
        }
        async initFilters() {
            const isPersonalPlan = await zlocalStorage.load(LocalStorageKeys.IS_PERSONAL_PLAN, false);
            if (isPersonalPlan) {
                this.select("#show_folders_filter").remove();
                return;
            }
            this.filterUI.init();
        }
        async refreshQueriedList() {
            const query = this.query =
                (await zsessionStorage.load(FoldersUI.PP_FOLDER_QUERY, null)) || FolderQuery.createDefaultQuery();
            const folders = await bgApi.folder.query(this.query);
            this.updateFilterIndication();
            const folderListElem = this.select("#folders_list");
            if (query.page_no == 0) {
                js.dom.clearContent(folderListElem);
            }
            if (folders.length == 0) {
                if (query.page_no == 0) {
                    this.hide(folderListElem);
                    this.show("#no_matching_folders_div");
                    const filtered = this.filterUI.isFiltered(this.query);
                    this.showIf(filtered, "[data-view_filters]");
                }
                return;
            }
            this.show(folderListElem);
            this.hide("#no_folders_div", "#no_matching_folders_div");
            folderListElem.append(this.getQueriedFoldersList(folders));
            this.addScrollListener();
        }
        updateFilterIndication() {
            if (this.isPersonalPlan) {
                return;
            }
            const isFiltered = this.filterUI.isFiltered(this.query);
            const filterCountElem = this.select("[data-filter_counter]");
            const clearFilterElem = "#clear_folder_filters";
            if (!isFiltered) {
                js.dom.hide(clearFilterElem, filterCountElem);
                return;
            }
            const filterCount = this.filterUI.countFilters(this.query);
            filterCountElem.textContent = filterCount + "";
            js.dom.show(clearFilterElem, filterCountElem);
        }
        addScrollListener() {
            const LAST_NTH = 10;
            if (this.intersectionObserver) {
                this.intersectionObserver.disconnect();
            }
            this.intersectionObserver = new IntersectionObserver(this.handleScrollIntersection, {
                root: document.body,
                threshold: 0.5
            });
            const folderListElem = this.select("#folders_list");
            const elementToObserve = folderListElem.children[folderListElem.children.length - LAST_NTH];
            if (elementToObserve) {
                this.intersectionObserver.observe(elementToObserve);
            }
            if (folderListElem.children.length == this.query.rows_per_page) {
                this.intersectionObserver.observe(folderListElem.lastElementChild);
            }
        }
        handleScrollIntersection(entries, observer) {
            const intersected = entries.some(x => x.isIntersecting);
            if (!intersected) {
                return;
            }
            observer.disconnect();
            this.showNextPage();
        }
        async showNextPage() {
            this.query.page_no++;
            await zsessionStorage.save(FoldersUI.PP_FOLDER_QUERY, this.query);
            await this.refreshQueriedList();
        }
        getQueriedFoldersList(folders) {
            const fragment = document.createDocumentFragment();
            const folderTemplate = js.selector.select("#folder_search_list_item_template");
            for (let folder of folders) {
                fragment.append(this.createQueriedFolderElem(folderTemplate, folder));
            }
            return fragment;
        }
        createQueriedFolderElem(template, folder) {
            const folderElem = UIUtil.createElem({ template: template });
            const nameElem = js.selector.selectFrom(folderElem, "[data-name]");
            js.dom.setText(nameElem, folder.name);
            js.dom.setChildText(folderElem, "[data-path]", folder.path.includes("\\") ? this.getDisplayFolderPath(folder.path) : " ");
            if (this.query.search_string) {
                js.dom.setContent(nameElem, _TextHighlighter.highlight(this.query.search_string, folder.name));
            }
            this.updateSharingIcon(folderElem, folder);
            globalNodeData.setNodeData(folderElem, folder);
            return folderElem;
        }
        getDisplayFolderPath(path) {
            return path.replace(/\\/g, " / ");
        }
        isQueried() {
            return Boolean(this.query.search_string) || this.filterUI.isFiltered(this.query);
        }
        async initQuery() {
            this.query = await this.loadQuery();
            this.query.page_no = 0;
            await zsessionStorage.save(FoldersUI.PP_FOLDER_QUERY, this.query);
        }
        async loadQuery() {
            return this.query = (await zsessionStorage.load(FoldersUI.PP_FOLDER_QUERY, null)) || FolderQuery.createDefaultQuery();
        }
        getQuery() {
            return this.query;
        }
        updateSharingIcon(elem, folder) {
            const sharedByMeIcon = js.selector.selectFrom(elem, "[data-shared_by_me]");
            const sharedToMeIcon = js.selector.selectFrom(elem, "[data-shared_to_me]");
            const removeBothIcons = this.isPersonalPlan || folder.sharing_type == FolderSharingType.NONE;
            if (removeBothIcons) {
                sharedByMeIcon.remove();
                sharedToMeIcon.remove();
                return;
            }
            const removeSharedToMe = folder.sharing_type == FolderSharingType.SHARED_BY_ME;
            if (removeSharedToMe) {
                sharedToMeIcon.remove();
                return;
            }
            sharedByMeIcon.remove();
        }
    }

    class MainUIElem extends UIElemContainer {
        searchElem;
        init(container) {
            this.container = container;
            this.searchElem = this.select("#search");
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

    class MainUIListener {
        p = null;
        constructor() {
            this.close_profile_panel_on_click = this.close_profile_panel_on_click.bind(this);
        }
        keyed_search_string(e) {
            if (VUI.keyboard.isControlKey(e.key)) {
                return;
            }
            const inputElem = e.target;
            const activeTabName = js.selector.select(".nav-menu-active").parentElement.dataset.tab_name;
            inputElem.dataset.last_tab = activeTabName;
            this.p.showTab(pp.mainUI.PP_TABS.PASSWORDS);
        }
        clicked_show_tab(e) {
            const tabName = js.selector.closest(e.target, "[data-tab_name]").dataset.tab_name;
            this.p.showTab(tabName);
        }
        clicked_clear_search(e) {
            UIUtil1.inst.clickedClearSearch(e);
        }
        async clicked_show_domain_matching_icon() {
            const iconElem = js.selector.select("#show_domain_matching_icon");
            const enable = !iconElem.classList.contains("disabled");
            iconElem.classList.toggle("disabled");
            js.dom.hideNoError("#folder_filter_overlay", "#folder_filter_overlay_color_bg");
            const query = await zsessionStorage.load(pp.passwordsUI.PP_QUERY_KEY, null) || SecretQuery.newBuilder().orderByDomainFavourite().build();
            query.domainMatching = enable;
            const filter = js.selector.select("[data-domain_matching_filter]");
            if (filter) {
                filter.checked = enable;
                await pp.passwordsUI.filterUI.updater.updateFilter(query);
                return;
            }
            await zsessionStorage.save(pp.passwordsUI.PP_QUERY_KEY, query);
            this.p.showTab(this.p.PP_TABS.PASSWORDS);
        }
        async clicked_sign_out() {
            const confirmed = await _AlertUI.inst.createAlert()
                .title(i18n$1(VI18N.SIGN_OUT_CONFIRM))
                .addButton("confirm", _AlertUI.inst.createButton().text(i18n$1(VI18N.SIGN_OUT)).value(true).build())
                .addButton("cancel", _AlertUI.inst.createButton().text(i18n$1(VI18N.CANCEL)).value(false).build())
                .dangerMode(true)
                .show();
            if (!confirmed) {
                return;
            }
            bgApi.login.signOut();
            await js.dom.closeWindow();
        }
        async clicked_lock() {
            await bgApi.login.lock();
            window.location.reload();
            await js.time.delay(0.1);
            window.close();
        }
        async clicked_open_tab_view() {
            await bgApi.ztab.openZTab();
            await js.dom.closeWindow();
        }
        clicked_open_web_app() {
            bgApi.vault.openWebUI();
            js.dom.closeWindow();
        }
        async clicked_toggle_dark_mode() {
            const toDarkMode = !(await zlocalStorage.load(VtSettings.DARK_MODE, false));
            pp.theme.setDarkMode(toDarkMode);
        }
        clicked_toggle_profile_panel() {
            const elem = this.p.elem;
            const profileElem = js.selector.selectFrom(elem, "#profile");
            const closePanel = profileElem.classList.contains("vault-expand");
            profileElem.classList.toggle("vault-expand");
            const toggleElem = js.selector.selectFrom(elem, "[data-toggle_profile_panel]");
            if (closePanel) {
                document.removeEventListener("click", this.close_profile_panel_on_click);
                toggleElem.dataset.tooltip_content = "i18n:open_profile_panel";
                return;
            }
            toggleElem.dataset.tooltip_content = "i18n:close_profile_panel";
            setTimeout(() => document.addEventListener("click", this.close_profile_panel_on_click), 100);
        }
        close_profile_panel_on_click(e) {
            const profileElem = js.selector.select("#profile");
            if (profileElem.contains(e.target)) {
                return;
            }
            this.clicked_toggle_profile_panel();
        }
    }

    class MainUI extends UIParent {
        elem1 = new MainUIElem();
        PP_TAB_KEY = "PP_TAB";
        PP_TABS = {
            PASSWORDS: "passwords",
            FOLDERS: "folders",
            GENERATOR: "generator",
            SETTINGS: "settings"
        };
        listener = new MainUIListener();
        init() {
            this.listener.p = this;
            globalDomListener.register("main_ui", this.listener);
            bgApi.other.updateLogo(false);
        }
        async showUI() {
            this.init();
            const elem = this.elem = UIUtil.createElem({ template: "#main_page" });
            this.elem1.init(elem);
            bgApi.user.getDp().then(dp => this.select("#dp").src = dp);
            let stored = {
                [LocalStorageKeys.USERNAME]: "",
                [LocalStorageKeys.EMAIL]: "",
                [LocalStorageKeys.SYNCING]: false,
            };
            let sessionStored = {
                [this.PP_TAB_KEY]: this.PP_TABS.PASSWORDS
            };
            stored = await zlocalStorage.loadAll(stored);
            sessionStored = await zsessionStorage.loadAll(sessionStored);
            this.select("#username").textContent = stored[LocalStorageKeys.USERNAME];
            this.select("#email").textContent = stored[LocalStorageKeys.EMAIL];
            this.refreshDomainMatchingCount();
            this.refreshSyncStatus();
            document.documentElement.style.height = "600px";
            document.body.style.height = "600px";
            this.addKeyboardListener();
            js.dom.setContent("#output", elem);
            this.showTab(sessionStored[this.PP_TAB_KEY]);
            pp.theme.refreshTheme();
        }
        showTab(tabName) {
            try {
                const ACTIVE_MENU_CLASS = "nav-menu-active";
                this.select("a.nav-menu-active").classList.remove(ACTIVE_MENU_CLASS);
                this.select("#" + tabName + "_tab_header").classList.add(ACTIVE_MENU_CLASS);
                zsessionStorage.save(this.PP_TAB_KEY, tabName);
                this.refreshDomainMatchingIcon(tabName);
                switch (tabName) {
                    case this.PP_TABS.PASSWORDS:
                        pp.passwordsUI.showUI();
                        break;
                    case this.PP_TABS.FOLDERS:
                        pp.foldersUI.showUI();
                        break;
                    case this.PP_TABS.GENERATOR:
                        pp.generatorUI.showUI();
                        this.initSearch();
                        break;
                    case this.PP_TABS.SETTINGS:
                        settingsUI.showUI();
                        break;
                }
                this.elem1.searchElem.focus();
            }
            catch (e) {
                logError(e);
            }
        }
        showDotLoading(showInSeconds = 0) {
            const dotLoadingElem = this.select("#dot_loading");
            const timeoutId = setTimeout(() => this.show(dotLoadingElem), showInSeconds * 1000);
            globalNodeData.setNodeData(dotLoadingElem, { timeout_id: timeoutId });
        }
        hideDotLoading() {
            const dotLoadingElem = this.select("#dot_loading");
            const { timeout_id } = globalNodeData.getNodeData(dotLoadingElem);
            clearTimeout(timeout_id);
            this.hide(dotLoadingElem);
        }
        showCompleteLoading() {
            js.dom.showNoError("#complete_loading");
        }
        hideCompleteLoading() {
            js.dom.hideNoError("#complete_loading");
        }
        addGlobalKeyboardListener() {
            VUI.keyboard.onKeyDown(document.body, {
                l(e) {
                    if (!VUI.keyboard.isCtrlPressed(e)) {
                        return;
                    }
                    e.preventDefault();
                    js.selector.select("[data-lock]")?.click?.();
                },
                d(e) {
                    if (!VUI.keyboard.isCtrlPressed(e) || !e.shiftKey) {
                        return;
                    }
                    e.preventDefault();
                    bgApi.ztab.openZTab();
                    js.dom.closeWindow();
                }
            });
        }
        async refreshSyncStatus() {
            const syncing = await zlocalStorage.load(LocalStorageKeys.SYNCING, false);
            syncing ? this.syncing() : await this.updateSyncedUI();
        }
        async synced() {
            const isNotShown = !this.isUIShown();
            if (isNotShown) {
                return;
            }
            await this.updateSyncedUI();
            const userSync = await zlocalStorage.load(LocalStorageKeys.USER_SYNC, false);
            if (userSync) {
                VUI.notification.showSuccess(i18n(VI18N.SYNC_COMPLETED), 1);
            }
        }
        async updateSyncedUI() {
            this.elem1.searchElem.placeholder = i18n(VI18N.SEARCH);
            this.hideCompleteLoading();
            this.refreshDomainMatchingCount();
        }
        async syncing() {
            const isNotShown = !this.isUIShown();
            if (isNotShown) {
                return;
            }
            this.elem1.searchElem.placeholder = i18n(VI18N.SYNCING) + "...";
            const lastSynced = await zlocalStorage.load(LocalStorageKeys.LAST_SYNCED, 0);
            if (lastSynced) {
                return;
            }
            this.showCompleteLoading();
        }
        async refreshDomainMatchingCount() {
            const domainMatchingCount = await bgApi.secret.getDomainMatchingCount();
            this.text("[data-domain_matching_count]", "" + domainMatchingCount);
        }
        refreshDomainMatchingIcon(tabName) {
            const enableIcon = tabName != this.PP_TABS.PASSWORDS;
            if (enableIcon) {
                this.setDomainMatchingIcon(false);
            }
        }
        setDomainMatchingIcon(selected) {
            try {
                const iconElem = js.selector.select("#show_domain_matching_icon");
                selected ? iconElem.classList.add(VaultCSS.DISABLED) : iconElem.classList.remove(VaultCSS.DISABLED);
            }
            catch (e) {
                logError(e);
            }
        }
        async closeUI() {
            await js.dom.closeWindow();
        }
        initSearch() {
            try {
                const searchElem = js.selector.select("#search");
                searchElem.dataset.on_keyup = "main_ui.keyed_search_string";
                searchElem.value = "";
                UIUtil1.inst.showSearchClear(searchElem);
            }
            catch (e) {
                logError(e);
            }
        }
        addSearchListener() {
            try {
                const searchElem = js.selector.selectFrom(this.elem, "#search");
                VUI.keyboard.onKeyDown(searchElem, {
                    ArrowDown(e) {
                        e.preventDefault();
                        if (pp.passwordsUI.passwordDetailsUI.isUIShown()) {
                            pp.passwordsUI.passwordDetailsUI.focusField();
                            return;
                        }
                        const secretElem = js.selector.select(".password-list-panel");
                        if (!secretElem) {
                            return;
                        }
                        secretElem.focus();
                        secretElem.scrollIntoView();
                    },
                });
            }
            catch (e) {
                logError(e);
            }
        }
        addKeyboardListener() {
            try {
                this.addSearchListener();
                VUI.keyboard.onKeyDown(document.body, {
                    "/"(e) {
                        if (js.dom.isContentEditable(e.target)) {
                            return;
                        }
                        const searchElem = js.selector.select("#search");
                        if (e.target == searchElem) {
                            return;
                        }
                        e.preventDefault();
                        searchElem.focus();
                    }
                });
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

    class BasePasswordMoreActionsCli {
        static instance = null;
        secret = null;
        static get inst() {
            return this.instance || (this.instance = new BasePasswordMoreActionsCli());
        }
        async init(secretId) {
            this.secret = await bgApi.secret.getDbSecret(secretId);
        }
        getSecret() {
            return this.secret;
        }
        async isCardType() {
            return formUtil.isPaymentCardCategory(this.secret.type_id);
        }
        async getCopyFieldTypes() {
            try {
                const secretType = await bgApi.secretType.get(this.secret.type_id);
                return secretType.text_fields.concat(secretType.password_fields);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async copyField(fieldName) {
            await bgApi.secret.copyField(this.secret.id, fieldName);
        }
        async copyTotp() {
            await bgApi.secret.totp.copy(this.secret.id);
        }
        async copyOneAuthTotp() {
            const secret = this.secret;
            const totp = await bgApi.secret.totp.getOneAuthTotp(secret.oneauth_id);
            if (totp == null) {
                return false;
            }
            await bgApi.secret.totp.copyOneAuthTotp(this.secret.id, totp);
            return true;
        }
        getCopyCustomCols() {
            try {
                return this.secret.customColumnTypeInfos || [];
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async copyCustomColumn(fieldId) {
            await bgApi.secret.copyCustomColumn(this.secret.id, fieldId);
        }
        async checkNeedAccessControlRows() {
            try {
                const hasFeature = (await zlocalStorage.load(LocalStorageKeys.FEATURES, [])).includes(zenum.ZVFEATURES.ACCESS_CONTROL);
                return hasFeature && (this.secret.classification == SecretClassification.ENTERPRISE) && this.secret.owned;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async enableAccessControl() {
            await bgApi.ztab.enableAccessControl(this.secret.id);
        }
        async manageAccessControl() {
            await bgApi.ztab.manageAccessControl(this.secret.id);
        }
        async disableAccessControl() {
            await bgApi.accessCtrl.disable(this.secret.id);
        }
        async moveToTrash() {
            await bgApi.secret.delete(this.secret.id);
        }
        async changeAutoLogin(enable) {
            return bgApi.secret.edit.setAutoLogin(this.secret.id, enable);
        }
    }

    class BasePasswordMoreActionsUI extends UIParent {
        overlaySelector = "#more_options_overlay";
        init() {
            this.elem = UIUtil.createElem({ template: "#password_more_actions_template", preRender: true });
        }
        addRow(text, listener) {
            this.appendRow(text, listener);
        }
        getList() {
            return this.select("ul");
        }
        addDeleteRow(text, listener) {
            this.appendRow(text, listener, "text-danger");
        }
        appendRow(text, listener, classText = "") {
            const row = UIUtil.createElem({ template: "#passwore_more_actions_item_template" });
            js.dom.setChildText(row, "[data-text]", text);
            row.addEventListener("click", listener);
            if (classText) {
                js.selector.selectFrom(row, "a").className = classText;
            }
            this.getList().append(row);
        }
        showAt(e) {
            this.highlightIcon(e);
            document.body.append(this.elem);
            _PositionUtil.positionMoreActions(this.elem, js.selector.closest(e.target, "[data-show_more_options]"));
            js.dom.showOld(this.overlaySelector);
        }
        hideUI() {
            this.removeHighlight();
            this.elem.remove();
            js.dom.hideNoError(this.overlaySelector);
        }
        highlightIcon(e) {
            const ICON_SELECTED_CLASS = "action-icon-list-selected";
            const MORE_ACTIONS_SEC_CLASS = "more-actions";
            const moreActionsIcon = js.selector.closest(e.target, "[data-show_more_options]");
            js.selector.selectFrom(moreActionsIcon, "a").classList.add(ICON_SELECTED_CLASS);
            js.selector.closest(moreActionsIcon, "[data-secret_id]").classList.add(MORE_ACTIONS_SEC_CLASS);
        }
        removeHighlight() {
            const secretElem = js.selector.select(".more-actions");
            if (!secretElem) {
                return;
            }
            secretElem.classList.remove("more-actions");
            js.selector.selectFrom(secretElem, ".action-icon-list-selected").classList.remove("action-icon-list-selected");
        }
    }

    class BasePasswordMoreActionsController {
        static instance = null;
        constructor() { }
        static get inst() {
            return this.instance || (this.instance = new BasePasswordMoreActionsController());
        }
        ui = null;
        cli = null;
        isShown = false;
        async showUI(secretId, e) {
            this.ui = this.getUIInstance();
            this.ui.init();
            this.cli = this.getCliInstance();
            await this.cli.init(secretId);
            await this.addRows();
            this.ui.showAt(e);
            this.isShown = true;
        }
        getCliInstance() {
            return BasePasswordMoreActionsCli.inst;
        }
        getUIInstance() {
            return new BasePasswordMoreActionsUI();
        }
        async addRows() {
            const secret = this.cli.getSecret();
            const hasEditPermission = Secret.hasEditPermission(secret.sharing_level);
            const hasManagePermission = Secret.hasManagePermission(secret.sharing_level);
            const hasViewPermission = Secret.hasViewPermission(secret.sharing_level);
            if (hasEditPermission) {
                this.ui.addRow(i18n(VI18N.EDIT), this.onEditInput.bind(this));
            }
            await this.addCopyFieldRows(hasViewPermission);
            this.addTotpRow(secret);
            this.addCopyCustomColRows(hasViewPermission);
            await this.addAccessControlRows(hasManagePermission);
            this.addManageAutoLoginRow(hasEditPermission);
            if (hasManagePermission) {
                this.ui.addDeleteRow(i18n(VI18N.MOVE_TO_TRASH), this.onTrashInput.bind(this));
            }
        }
        addTotpRow(secret) {
            try {
                if (secret.has_totp) {
                    this.ui.addRow(i18n(VI18N.COPY) + " TOTP", this.onCopyTotpInput.bind(this));
                }
                if (secret.oneauth_id) {
                    this.ui.addRow(i18n(VI18N.GET_ONEAUTH_TOTP), this.onGetOneAuthTotpInput.bind(this));
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async addCopyFieldRows(hasViewPermission) {
            try {
                if (!hasViewPermission) {
                    return;
                }
                const copyFieldRows = await this.cli.getCopyFieldTypes();
                for (let field of copyFieldRows) {
                    this.ui.addRow(i18n(VI18N.COPY) + " " + field.label, () => this.onCopyFieldInput(field));
                }
            }
            catch (e) {
                logError(e);
            }
        }
        addCopyCustomColRows(hasViewPermission) {
            try {
                if (!hasViewPermission) {
                    return;
                }
                const columnInfos = this.cli.getCopyCustomCols();
                for (let info of columnInfos) {
                    this.ui.addRow(i18n(VI18N.COPY) + " " + info.label, () => this.onCopyCustomColInput(info));
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async addAccessControlRows(hasManagePermission) {
            try {
                if (!hasManagePermission) {
                    return;
                }
                const hasRows = await this.cli.checkNeedAccessControlRows();
                if (!hasRows) {
                    return;
                }
                if (!this.cli.getSecret().display_access_control_icon) {
                    this.ui.addRow(i18n(VI18N.ENABLE_ACCESS_CONTROL), this.onEnableAccessControlInput.bind(this));
                    return;
                }
                this.ui.addRow(i18n(VI18N.MANAGE_ACCESS_CONTROL), this.onManageAccessControlInput.bind(this));
                this.ui.addRow(i18n(VI18N.DISABLE_ACCESS_CONTROL), this.onDisableAccessControlInput.bind(this));
            }
            catch (e) {
                logError(e);
            }
        }
        addManageAutoLoginRow(hasEditPermission) {
            try {
                if (!hasEditPermission) {
                    return;
                }
                const secret = this.cli.getSecret();
                const hasValidUrl = secret.valid_urls.length > 0;
                if (!hasValidUrl) {
                    return;
                }
                const autoLoginEnabled = secret.auto_submit;
                if (!autoLoginEnabled) {
                    this.ui.addRow(i18n(VI18N.ENABLE_AUTO_LOGIN), () => this.onChangeAutoLoginInput(true));
                    return;
                }
                this.ui.addRow(i18n(VI18N.DISABLE_AUTO_LOGIN), () => this.onChangeAutoLoginInput(false));
            }
            catch (e) {
                logError(e);
            }
        }
        async hideUI() {
            if (!this.ui) {
                return;
            }
            this.ui.hideUI();
            this.isShown = false;
        }
        async hideIfSelected(secretIds) {
            try {
                if (!this.cli) {
                    return;
                }
                const secret = this.cli.getSecret();
                const hideSelection = this.isShown && secret && secretIds.includes(secret.id);
                if (hideSelection) {
                    this.hideUI();
                }
            }
            catch (e) {
                logError(e);
            }
        }
        onEditInput() {
            bgApi.ztab.editPassword(this.cli.getSecret().id);
            this.ui.hideUI();
            js.dom.closeWindow();
        }
        async onCopyFieldInput(field) {
            this.hideUI();
            await this.cli.copyField(field.name);
            VUI.notification.showSuccess(field.label + " " + i18n(VI18N.COPIED));
        }
        async onCopyTotpInput() {
            this.ui.hideUI();
            await this.cli.copyTotp();
            VUI.notification.showSuccess("TOTP " + i18n(VI18N.COPIED));
        }
        async onGetOneAuthTotpInput() {
            this.ui.hideUI();
            const copied = await this.cli.copyOneAuthTotp();
            if (!copied) {
                VUI.notification.showError(i18n(VI18N.ERROR_GETTING_ONEAUTH_TOTP));
                return;
            }
            VUI.notification.showSuccess("TOTP " + i18n(VI18N.COPIED));
        }
        async onCopyCustomColInput(columnInfo) {
            this.ui.hideUI();
            await this.cli.copyCustomColumn(columnInfo.id);
            VUI.notification.showSuccess(columnInfo.label + " " + i18n(VI18N.COPIED));
        }
        async onEnableAccessControlInput() {
            return this.onAccessControlInput(() => this.cli.enableAccessControl());
        }
        async onManageAccessControlInput() {
            return this.onAccessControlInput(() => this.cli.enableAccessControl());
        }
        async onDisableAccessControlInput() {
            this.ui.hideUI();
            const confirmed = await _AlertUI.inst.confirmDelete(i18n(VI18N.CONFIRM_ACCESS_CONTROL_DISABLE), i18n(VI18N.DISABLE));
            if (!confirmed) {
                return;
            }
            await this.cli.disableAccessControl();
            VUI.notification.showSuccess(i18n(VI18N.ACCESS_CONTROL_DISABLED_SUCCESS));
        }
        async onAccessControlInput(fn) {
            this.ui.hideUI();
            await fn();
            await js.dom.closeWindow();
        }
        async onChangeAutoLoginInput(enable) {
            this.ui.hideUI();
            await this.cli.changeAutoLogin(enable);
            const msgKey = enable ? VI18N.AUTOLOGIN_ENABLE_SUCCESS : VI18N.AUTOLOGIN_DISABLE_SUCCESS;
            VUI.notification.showSuccess(i18n(msgKey));
        }
        async onTrashInput() {
            this.ui.hideUI();
            const confirmed = await _AlertUI.inst.confirmDelete(i18n(VI18N.MOVE_PASSWORD_NAME_TO_TRASH, this.cli.getSecret().name), i18n(VI18N.MOVE_TO_TRASH));
            if (!confirmed) {
                return;
            }
            await this.cli.moveToTrash();
            const successMsgKey = await this.cli.isCardType() ? VI18N.CARD_MOVE_TO_TRASH_SUCCESS : VI18N.MOVE_TO_TRASH_SUCCESS;
            VUI.notification.showSuccess(i18n(successMsgKey));
        }
    }

    class PasswordDetailsListener {
        p = null;
        async clicked_show_hide_custom_field(e) {
            const rowElem = js.selector.closest(e.target, "[data-field_row]");
            const show = rowElem.dataset.type != SecretType.FIELD_TYPE.TEXT;
            if (!show) {
                this.hide_password_field_div(rowElem);
                return;
            }
            this.show_password_field_div(rowElem);
            const column = globalNodeData.getNodeData(rowElem).column;
            const secretId = this.getSecretId();
            bgApi.audit.columnViewed(secretId, column.id);
        }
        async clicked_copy_custom_field(e) {
            const fieldElem = js.selector.closest(e.target, "[data-field_row]");
            const column = globalNodeData.getNodeData(fieldElem).column;
            const secretId = this.getSecretId();
            await bgApi.secret.copyCustomColumn(secretId, column.id);
            this.showCopiedMessage(e);
        }
        copiedCustomField(e) {
            UIUtil1.inst.copySelection(e);
            const fieldElem = js.selector.closest(e.target, "[data-field_row]");
            const column = globalNodeData.getNodeData(fieldElem).column;
            const seretId = this.getSecretId();
            bgApi.audit.customColumnCopied(seretId, column.id);
            VUI.tooltip.showElemMsg(e.target, i18n$1(VI18N.COPIED), 1);
        }
        copiedCustomPasswordField(e) {
            const fieldElem = js.selector.closest(e.target, "[data-field_row]");
            const hasValidPassword = Boolean(js.selector.selectFrom(fieldElem, "i.icon-hide"));
            if (hasValidPassword) {
                this.copiedCustomField(e);
            }
        }
        async clicked_copy_value(e, event_data) {
            const { value } = event_data;
            js.dom.copyToClipboard(value);
            this.showCopiedMessage(e);
        }
        async clicked_copy_notes(e, event_data) {
            const { value } = event_data;
            js.dom.copyToClipboard(value);
            bgApi.audit.notesCopied(this.getSecretId());
            this.showCopiedMessage(e);
        }
        async clicked_copy_totp(e) {
            const secretId = this.getSecretId();
            await bgApi.secret.totp.copy(secretId);
            this.showCopiedMessage(e);
        }
        async clicked_download_file(_e, event_data) {
            const { file_id } = event_data;
            const secretId = this.getSecretId();
            pp.mainUI.showDotLoading();
            await pp.passwordsUI.util.downloadFile(secretId, file_id);
            pp.mainUI.hideDotLoading();
        }
        async clicked_reset_password(e) {
            const rowElem = js.selector.closest(e.target, "[data-field_row]");
            const secretId = this.getSecretId();
            const field = globalNodeData.getNodeData(rowElem).field;
            await bgApi.secret.resetPassword(secretId, field.name);
            await js.dom.closeWindow();
        }
        getSecretId() {
            const rowElem = js.selector.select("[data-secret_details][data-secret_id]");
            return rowElem.dataset.secret_id;
        }
        async clicked_show_hide_password_field(e) {
            const rowElem = js.selector.closest(e.target, "[data-field_row]");
            const show = rowElem.dataset.type != SecretType.FIELD_TYPE.TEXT;
            if (!show) {
                this.hide_password_field_div(rowElem);
                return;
            }
            this.show_password_field_div(rowElem);
            const field = globalNodeData.getNodeData(rowElem).field;
            const secretId = this.getSecretId();
            bgApi.audit.fieldViewed(secretId, field.name);
        }
        hide_password_field_div(row_elem) {
            row_elem.dataset.type = SecretType.FIELD_TYPE.PASSWORD;
            js.dom.setChildText(row_elem, "[data-value]", "****************");
            const eyeIconElem = js.selector.selectFrom(row_elem, "[data-view_password] i");
            eyeIconElem.dataset.tooltip_content = "i18n:view";
            eyeIconElem.className = "icon-view";
        }
        show_password_field_div(row_elem) {
            row_elem.dataset.type = SecretType.FIELD_TYPE.TEXT;
            const { value } = globalNodeData.getNodeData(row_elem);
            js.dom.setChildContent(row_elem, "[data-value]", VUI.password.getColoredPassword(value));
            const eyeIconElem = js.selector.selectFrom(row_elem, "[data-view_password] i");
            eyeIconElem.dataset.tooltip_content = "i18n:hide";
            eyeIconElem.className = "icon-hide";
        }
        async clickedCopyField(e) {
            const fieldElem = js.selector.closest(e.target, "[data-field_row]");
            const field = globalNodeData.getNodeData(fieldElem).field;
            const secretId = this.getSecretId();
            await bgApi.secret.copyField(secretId, field.name);
            this.showCopiedMessage(e);
        }
        copiedField(e) {
            if (!document.getSelection().toString()) {
                return;
            }
            UIUtil1.inst.copySelection(e);
            const fieldElem = js.selector.closest(e.target, "[data-field_row]");
            const field = globalNodeData.getNodeData(fieldElem).field;
            const secretId = this.getSecretId();
            bgApi.audit.fieldCopied(secretId, field.name);
            VUI.tooltip.showElemMsg(e.target, i18n$1(VI18N.COPIED), 1);
        }
        copiedPasswordField(e) {
            const fieldElem = js.selector.closest(e.target, "[data-field_row]");
            const hasValidPassword = Boolean(js.selector.selectFrom(fieldElem, "i.icon-hide"));
            if (hasValidPassword) {
                this.copiedField(e);
            }
        }
        async clicked_hide_password_details() {
            this.p.elem.remove();
            await zsessionStorage.save(this.p.PPSessionShownSecretIdKey, null);
        }
        clickedEditPassword() {
            const secretId = this.getSecretId();
            bgApi.ztab.editPassword(secretId);
            js.dom.closeWindow();
        }
        copiedNotes(e) {
            try {
                if (!document.getSelection().toString()) {
                    return;
                }
                UIUtil1.inst.copySelection(e);
                bgApi.audit.notesCopied(this.getSecretId());
                VUI.tooltip.showElemMsg(e.target, i18n$1(VI18N.COPIED), 1);
            }
            catch (e) {
                logError(e);
            }
        }
        showCopiedMessage(e) {
            try {
                if (e.clientX) {
                    VUI.tooltip.showElemMsg(e.target, i18n$1(VI18N.COPIED), 1);
                    return;
                }
                const fieldElem = js.selector.closest(e.target, ".add-password-one-col");
                VUI.tooltip.showElemMsg(fieldElem, i18n$1(VI18N.COPIED), 1);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class PasswordDetailsShowerPartImpl {
        p;
        constructor(p) {
            this.p = p;
        }
        async postSecretShown() {
            window.requestAnimationFrame(() => this.p.elem.style.right = "0");
            bgApi.audit.secretAccessed(this.p.secret.id);
            await zsessionStorage.save(this.p.PPSessionShownSecretIdKey, this.p.secret.id);
        }
        async handleNoAccess() {
            await bgApi.ztab.getSecretAccess(this.p.secret.id);
            await js.dom.closeWindow();
        }
        async focusField() {
            try {
                this.p.elem.addEventListener("transitionend", () => js.selector.selectFrom(this.p.elem, "[tabindex]")?.focus?.(), { once: true });
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class RestorePasswordDetailsShower {
        p;
        constructor(p) {
            this.p = p;
        }
        async postSecretShown() {
            this.p.elem.style.right = "0";
            await this.checkDisplayedDomainMatching();
        }
        async focusField() {
            try {
                const index = await this.p.helper.getLastFocusedIndex();
                js.selector.selectAll("[tabindex='0']", this.p.elem)[index]?.focus();
            }
            catch (e) {
                logError(e);
            }
        }
        async checkDisplayedDomainMatching() {
            try {
                const query = await pp.passwordsUI.loadQuery();
                if (!query.domainMatching) {
                    return;
                }
                const activeTab = await brApi.tab.getActiveTab();
                if (!activeTab) {
                    return;
                }
                const parentDomain = js.url.getParentDomain(activeTab.url);
                let curParentDomain = "";
                for (let url of this.p.secret.urls) {
                    curParentDomain = js.url.getParentDomain(url);
                    if (curParentDomain == parentDomain) {
                        return;
                    }
                }
                this.p.close();
            }
            catch (e) {
                logError(e);
            }
        }
        async handleNoAccess() {
            await zsessionStorage.save(this.p.PPSessionShownSecretIdKey, null);
        }
    }

    class Totp {
        MIN_KEY_LENGTH = 16;
        async generateTotp(totpUrl) {
            try {
                const totp = await bgApi.secret.totp.generate(totpUrl);
                return totp;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async validateKey(key) {
            if (key == null || key.length == 0) {
                throw "EMPTY";
            }
            const key_pattern = /^[ABCDEFGHIJKLMNOPQRSTUVWXYZ234567]+$/;
            if (!key_pattern.test(key)) {
                throw "INVALID_CHARS";
            }
            try {
                const totpUrl = `otpauth://totp?secret=${key}&algorithm=SHA1&period=30&digits=6`;
                if (key.length >= this.MIN_KEY_LENGTH) {
                    await this.generateTotp(totpUrl);
                }
            }
            catch (e) {
                throw "INVALID_BYTE_VALUE";
            }
            return true;
        }
        getInvalidKeyChars(key) {
            const invalidChars = key.replace(/[ABCDEFGHIJKLMNOPQRSTUVWXYZ234567]/g, "");
            const uniqueInvalidChars = new Set(invalidChars);
            const invalidKeyChars = Array.from(uniqueInvalidChars).join(", ");
            return invalidKeyChars;
        }
        getRemainingSeconds(totpUrl) {
            return this.getRemainingSecondsFn(this.getTimePeriod(totpUrl));
        }
        getRemainingSecondsFn(timePeriod = 30) {
            const ending_time = (Math.floor(Date.now() / 1000 / timePeriod) + 1) * timePeriod;
            return ending_time - (Date.now() / 1000);
        }
        formatTotp(totp) {
            if (totp.length < 6) {
                return totp;
            }
            return totp.slice(0, 3) + " " + this.formatTotp(totp.slice(3));
        }
        getTimePeriod(totpUrl = "") {
            return +(/period=(\d+)/.exec(totpUrl)[1]);
        }
    }
    const totp = new Totp();
    setGlobal("totp", totp);

    class TotpUI {
        timeoutIds = {
            generateTotp: -1,
            totp_circle: -1
        };
        calledOn = {
            totpCircle: -1
        };
        elem = {
            totpElem: null,
            totpCircle: null
        };
        startGeneratingTotp(totpUrl = "", totpElem, totpCircle) {
            try {
                const h = this;
                this.elem.totpElem = totpElem;
                this.elem.totpCircle = totpCircle;
                if (!totpElem) {
                    return;
                }
                clearTimeout(this.timeoutIds.generateTotp);
                this.showTotpCircle();
                const setTotpValue = totpElem instanceof HTMLInputElement ?
                    (val) => totpElem.value = val :
                    (val) => totpElem.textContent = val;
                async function generateTotp() {
                    setTotpValue(totp.formatTotp(await totp.generateTotp(totpUrl)));
                    const remaining_s = Math.round(totp.getRemainingSeconds(totpUrl));
                    h.startCircleAnimation(remaining_s, totp.getTimePeriod(totpUrl));
                    h.timeoutIds.generateTotp =
                        setTimeout(generateTotp, remaining_s * 1000);
                }
                generateTotp();
            }
            catch (e) {
                logError(e);
            }
        }
        startCircleAnimation(remainingSeconds = 0, timePeriod = 30) {
            const BLUE = "#4780da";
            const RED = "#f75d56";
            const h = this;
            const circleElem = h.elem.totpCircle;
            if (!circleElem) {
                return;
            }
            const radius = +circleElem.getAttribute("r");
            const end = -(2 * Math.PI * radius);
            const inc = end / timePeriod;
            const last_5_s = Math.round((5 / 6) * timePeriod);
            const calledOn = Date.now();
            this.calledOn.totpCircle = calledOn;
            clearTimeout(this.timeoutIds.totp_circle);
            let i = 1;
            if (remainingSeconds == 0) {
                init();
            }
            else {
                init_once(Math.round(timePeriod - remainingSeconds) + 1);
            }
            function init_once(start) {
                circleElem.style.stroke = start >= last_5_s ? RED : BLUE;
                circleElem.style.transition = "none";
                circleElem.style.strokeDashoffset = (start - 1) * inc + "";
                i = start;
                window.requestAnimationFrame(() => h.timeoutIds.totp_circle = setTimeout(f));
            }
            function init() {
                i = 1;
                circleElem.style.stroke = BLUE;
                circleElem.style.transition = "none";
                circleElem.style.strokeDashoffset = "0";
                window.requestAnimationFrame(() => h.timeoutIds.totp_circle = setTimeout(f));
            }
            function f() {
                if (calledOn != h.calledOn.totpCircle) {
                    return;
                }
                circleElem.style.transition = "all 1s linear";
                if (i >= last_5_s) {
                    circleElem.style.stroke = RED;
                }
                if (i == timePeriod) {
                    circleElem.style.strokeDashoffset = end + "";
                    return;
                }
                circleElem.style.strokeDashoffset = i++ * inc + "";
                h.timeoutIds.totp_circle = setTimeout(f, 1000);
            }
        }
        stopGeneratingTotp() {
            clearTimeout(this.timeoutIds.generateTotp);
            clearTimeout(this.timeoutIds.totp_circle);
            this.showTotpCircle(false);
            if (this.elem.totpElem) {
                this.elem.totpElem[this.elem.totpElem instanceof HTMLInputElement ? "value" : "textContent"] = "";
            }
        }
        showTotpCircle(show = true) {
            if (!this.elem.totpCircle) {
                return;
            }
            const circlePanel = this.elem.totpCircle.closest(".totp-panel");
            if (!circlePanel) {
                return;
            }
            circlePanel.style.display = show ? "block" : "none";
        }
    }
    const totpUI = new TotpUI();
    setGlobal("totpUI", totpUI);

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

    class PasswordDetailsUtil {
        static elem = {
            NAME: "[data-secret_name]",
            TAG: "[data-tag]",
            DESCRIPTION: "[data-description]",
            URL: "[data-url_row]"
        };
    }

    class PasswordDetailsSearchHighlighter {
        elem = null;
        secret = null;
        searchString = "";
        secretType = null;
        init(elem, secret, searchString, secretType) {
            this.elem = elem;
            this.secret = secret;
            this.searchString = searchString.toLocaleLowerCase();
            this.secretType = secretType;
        }
        async highlightSearch() {
            try {
                const highlightField = await bgApi.secret.getSearchHighlightField(this.secret, this.searchString);
                const FIELD = SecretHighlightFields;
                switch (highlightField) {
                    case FIELD.NAME:
                        this.highlightName();
                        return;
                    case FIELD.UI_TEXT:
                        this.highlightUIText();
                        return;
                    case FIELD.WORDS:
                        this.highlightWordMatch();
                        return;
                    case FIELD.WORDS_INCLUDE:
                        this.highlightWordInclude();
                        return;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        highlightName() {
            const nameElem = js.selector.selectFrom(this.elem, PasswordDetailsUtil.elem.NAME);
            js.dom.setContent(nameElem, _TextHighlighter.highlight(this.searchString, this.secret.name));
        }
        highlightUIText() {
            const fieldName = this.getUIFieldName();
            if (!fieldName) {
                return;
            }
            const fieldValueElem = js.selector.selectFrom(this.elem, `[data-field_name="${fieldName}"] [data-value]`);
            if (!fieldValueElem) {
                return;
            }
            js.dom.setContent(fieldValueElem, _TextHighlighter.highlight(this.searchString, fieldValueElem.textContent));
        }
        getUIFieldName() {
            try {
                for (let fieldName of this.secretType.ui_fields) {
                    if (this.secret.encrypted.fields[fieldName]) {
                        return fieldName;
                    }
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        highlightWordMatch() {
            new PasswordDetailsSearchHighlight(this.elem, this.searchString, this.secret).highlightExact();
        }
        highlightWordInclude() {
            new PasswordDetailsSearchHighlight(this.elem, this.searchString, this.secret).highlightInclude();
        }
    }
    class PasswordDetailsSearchHighlight {
        elem = null;
        searchString = "";
        secret = null;
        checkPresent = null;
        highlightUrlSearch = null;
        constructor(elem, searchString, secret) {
            this.elem = elem;
            this.searchString = searchString;
            this.secret = secret;
        }
        highlightExact() {
            this.checkPresent = this.checkPresentExact;
            this.highlightUrlSearch = this.highlightUrlExact;
            this.highlight();
        }
        highlightInclude() {
            this.checkPresent = this.checkPresentInclude;
            this.highlightUrlSearch = this.highlightUrlInclude;
            this.highlight();
        }
        highlight() {
            const tagSearchWords = SecretSearchUtil.getTagSearchWords(this.secret);
            if (this.checkPresent(tagSearchWords)) {
                this.highlightTags();
                return;
            }
            const descriptionSearchWords = SecretSearchUtil.getDescriptionSearchWords(this.secret);
            if (this.checkPresent(descriptionSearchWords)) {
                this.highlightElemValue(PasswordDetailsUtil.elem.DESCRIPTION, this.secret.description);
                return;
            }
            const urlSearchWords = SecretSearchUtil.getUrlSearchWords(this.secret);
            if (this.checkPresent(urlSearchWords)) {
                this.highlightUrlSearch();
                return;
            }
        }
        checkPresentExact(words) {
            return words.includes(this.searchString);
        }
        checkPresentInclude(words) {
            return words.some(x => x.includes(this.searchString));
        }
        highlightElemValue(selector, value) {
            const reqElem = js.selector.selectFrom(this.elem, selector);
            js.dom.setContent(reqElem, _TextHighlighter.highlight(this.searchString, value));
        }
        highlightTags() {
            this.highlightElemValue(PasswordDetailsUtil.elem.TAG, this.secret.tags.join(", "));
        }
        highlightUrlExact() {
            new UrlSearchHighlight(this.elem, this.searchString).highlightMatch();
        }
        highlightUrlInclude() {
            new UrlSearchHighlight(this.elem, this.searchString).highlightInclude();
        }
    }
    class UrlSearchHighlight {
        elem = null;
        searchString = "";
        checkDomain = null;
        constructor(elem, searchString) {
            this.elem = elem;
            this.searchString = searchString;
        }
        highlightMatch() {
            this.checkDomain = this.checkDomainMatch;
            this.highlight();
        }
        highlightInclude() {
            this.checkDomain = this.checkDomainInclude;
            this.highlight();
        }
        highlight() {
            const allUrlElems = js.selector.selectAll(PasswordDetailsUtil.elem.URL, this.elem);
            for (let urlElem of allUrlElems) {
                if (this.highlightUrlElem(urlElem)) {
                    return;
                }
            }
        }
        highlightUrlElem(elem) {
            const { url } = globalNodeData.getNodeData(elem);
            if (!js.url.isValid(url)) {
                return false;
            }
            const domain = js.url.getParentDomain(url).toLocaleLowerCase();
            if (!this.checkDomain(domain)) {
                return false;
            }
            const urlValueElem = js.selector.selectFrom(elem, "[data-url]");
            js.dom.setContent(urlValueElem, _TextHighlighter.highlightUrlDomain(this.searchString, url));
            return true;
        }
        checkDomainMatch(domain) {
            return domain == this.searchString;
        }
        checkDomainInclude(domain) {
            return domain.includes(this.searchString);
        }
    }

    class PasswordDetailsUICreator {
        p;
        elem;
        piiEnabled = false;
        incognitoAllowed = false;
        secretType = null;
        secret;
        constructor(p) {
            this.p = p;
            this.secret = p.secret;
        }
        async create() {
            try {
                this.elem = UIUtil.createElem({ preRender: true, template: "#password_details_template" });
                this.elem.dataset.secret_id = this.secret.id;
                globalNodeData.setNodeData(this.elem, { secret: this.secret });
                this.addHeader();
                await this.addFields();
                await this.addTotp();
                await this.addNotes();
                await this.addUrls();
                this.addTags();
                this.addDescription();
                await this.addCustomColumns();
                await this.highlightSearch();
                this.addListeners();
                return this.elem;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async addCustomColumns() {
            try {
                const isShared = this.secret.shared;
                let plainValue = "";
                let rowElem = null;
                for (let column of this.secret.encrypted.custom_columns) {
                    plainValue = await zcrypt.decrypt(column.value, isShared);
                    if (!plainValue) {
                        continue;
                    }
                    switch (column.type) {
                        case SecretType.FIELD_TYPE.TEXT:
                            rowElem = this.getCustomFieldTextRow(column, plainValue);
                            break;
                        case SecretType.FIELD_TYPE.PASSWORD:
                            rowElem = this.getCustomFieldPasswordRow(column, plainValue);
                            break;
                        case SecretType.FIELD_TYPE.FILE:
                            rowElem = this.getFileRow(column.colname, plainValue);
                            break;
                    }
                    if (rowElem) {
                        this.elem.append(rowElem);
                    }
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getCustomFieldPasswordRow(column, value) {
            try {
                const secret = this.secret;
                if (!Secret.hasViewPermission(secret.sharing_level)) {
                    const elem = UIUtil.createElem({ template: "#password_details_no_view_permission_template" });
                    js.dom.setChildText(elem, "[data-name]", column.colname);
                    return elem;
                }
                const elem = UIUtil.createElem({ template: "#password_details_custom_password_field_template" });
                js.dom.setChildText(elem, "[data-name]", column.colname);
                globalNodeData.setNodeData(elem, { column, value });
                const copyElem = js.selector.selectFrom(elem, "[data-copy]");
                VUI.keyboard.onKeyDown(elem, {
                    Enter() {
                        copyElem.click();
                    }
                });
                this.onKeyboardCopy(elem, () => copyElem.click());
                return elem;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        addDescription() {
            try {
                if (!this.secret.description) {
                    return;
                }
                const elem = UIUtil.createElem({ template: "#password_details_description_template" });
                js.selector.selectFrom(elem, "[data-value]").dataset.description = "";
                js.dom.setChildText(elem, PasswordDetailsUtil.elem.DESCRIPTION, this.secret.description);
                this.elem.append(elem);
            }
            catch (e) {
                logError(e);
            }
        }
        addTags() {
            try {
                if (this.secret.tags.length == 0) {
                    return;
                }
                const tagsText = this.secret.tags.join(", ");
                const elem = UIUtil.createElem({ template: "#password_details_description_template" });
                js.dom.setChildText(elem, "[data-name]", i18n$1(VI18N.TAGS));
                js.selector.selectFrom(elem, "[data-value]").dataset.tag = "";
                js.dom.setChildText(elem, PasswordDetailsUtil.elem.TAG, tagsText);
                this.elem.append(elem);
            }
            catch (e) {
                logError(e);
            }
        }
        async addUrls() {
            try {
                this.incognitoAllowed = await brApi.tab.isIncognitoAllowed();
                const urls = this.secret.urls;
                for (let i = 0; i < urls.length; i++) {
                    this.addUrl(urls[i], i);
                }
                if (urls.length == 1) {
                    js.selector.selectFrom(this.elem, "[data-url_n]").textContent = "";
                }
            }
            catch (e) {
                logError(e);
            }
        }
        addUrl(url, index) {
            try {
                const elem = UIUtil.createElem({ template: "#password_details_url_row_template" });
                globalNodeData.setNodeData(elem, { url });
                js.dom.setChildText(elem, "[data-url_n]", index + 1 + "");
                const urlElem = js.selector.selectFrom(elem, "[data-url]");
                js.dom.setText(urlElem, url);
                urlElem.dataset.tooltip_content = "i18n:copy";
                const copyEventData = { value: url };
                globalNodeData.setClickData(urlElem, copyEventData);
                const loginElem = js.selector.selectFrom(elem, "[data-login]");
                if (!this.secret.auto_submit) {
                    js.selector.selectFrom(loginElem, "i").className = "icon-login-disabled";
                }
                const privateLoginElem = js.selector.selectFrom(elem, "[data-private_login]");
                globalNodeData.setClickData(loginElem, { url });
                globalNodeData.setClickData(privateLoginElem, { url, incognito: true });
                if (!this.incognitoAllowed) {
                    privateLoginElem.remove();
                }
                VUI.keyboard.onKeyDown(elem, {
                    Enter() {
                        loginElem.click();
                    },
                });
                this.onKeyboardCopy(elem, () => urlElem.click());
                this.elem.append(elem);
            }
            catch (e) {
                logError(e);
            }
        }
        async addNotes() {
            try {
                const secret = this.secret;
                if (!secret.encrypted.notes) {
                    return;
                }
                const notes = await zcrypt.decrypt(secret.encrypted.notes, secret.shared);
                if (!notes) {
                    return;
                }
                const elem = UIUtil.createElem({ template: "#password_details_notes_template" });
                js.dom.setChildText(elem, "[data-name]", i18n$1(VI18N.NOTES));
                js.dom.setChildText(elem, "[data-value]", notes);
                const copyElem = js.selector.selectFrom(elem, "[data-copy]");
                globalNodeData.setClickData(copyElem, { value: notes });
                VUI.keyboard.onKeyDown(elem, {
                    Enter() {
                        copyElem.click();
                    }
                });
                this.onKeyboardCopy(elem, () => copyElem.click());
                this.elem.append(elem);
            }
            catch (e) {
                logError(e);
            }
        }
        async addTotp() {
            try {
                if (!this.secret.has_totp) {
                    return;
                }
                const totpElem = UIUtil.createElem({ template: "#secret_totp_template" });
                const totpUrl = await zcrypt.decrypt(this.secret.encrypted.totp, this.secret.shared);
                const currentTotpElem = js.selector.selectFrom(totpElem, "#current_totp");
                currentTotpElem.textContent = totp.formatTotp(await totp.generateTotp(totpUrl));
                this.elem.append(totpElem);
                const totpCircle = js.selector.selectFrom(this.elem, "#totp_circle");
                totpUI.startGeneratingTotp(totpUrl, currentTotpElem, totpCircle);
                const copyElem = js.selector.selectFrom(totpElem, "[data-copy]");
                VUI.keyboard.onKeyDown(totpElem, {
                    Enter() {
                        copyElem.click();
                    },
                });
                this.onKeyboardCopy(totpElem, () => copyElem.click());
            }
            catch (e) {
                logError(e);
            }
        }
        async addTextAreaField(field) {
            try {
                const value = await this.getFieldValue(field.name);
                if (!value) {
                    return;
                }
                const elem = UIUtil.createElem({ template: "#password_details_textarea_template" });
                js.dom.setChildText(elem, "[data-name]", field.label);
                js.dom.setChildText(elem, "[data-value]", value);
                globalNodeData.setNodeData(elem, { field });
                this.elem.append(elem);
            }
            catch (e) {
                logError(e);
            }
        }
        async addOtherField(field) {
            const FIELD_TYPE = SecretType.FIELD_TYPE;
            try {
                switch (field.type) {
                    case FIELD_TYPE.TEXT:
                    case FIELD_TYPE.PASSWORD:
                    case FIELD_TYPE.FILE:
                        break;
                    case FIELD_TYPE.TEXTAREA:
                        await this.addTextAreaField(field);
                        break;
                    default:
                        await this.addTextField(field);
                        break;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async addFields() {
            try {
                const secret = this.secret;
                const secretType = this.secretType = await bgApi.secretType.get(secret.type_id);
                this.piiEnabled = await zlocalStorage.load(LocalStorageKeys.PII_ENABLED, false);
                for (let field of secretType.text_fields) {
                    await this.addTextField(field);
                }
                for (let field of secretType.password_fields) {
                    await this.addPasswordField(field);
                }
                try {
                    for (let field of secretType.fields) {
                        await this.addOtherField(field);
                    }
                }
                catch (e) {
                    logError(e);
                }
                const fileFields = secretType.fields.filter(x => !x.isDeleted && x.type == SecretType.FIELD_TYPE.FILE);
                fileFields.forEach(this.addFileField, this);
            }
            catch (e) {
                logError(e);
            }
        }
        async addFileField(field) {
            try {
                const value = await this.getFieldValue(field.name);
                if (!value) {
                    return;
                }
                const fileRow = this.getFileRow(field.label, value);
                this.elem.append(fileRow);
            }
            catch (e) {
                logError(e);
            }
        }
        getFileRow(label, file_column) {
            try {
                const fileInfo = this.secret.encrypted.files.find(file => file.column == file_column);
                if (!fileInfo) {
                    return document.createElement("span");
                }
                const elem = UIUtil.createElem({ template: "#password_details_file_field_template" });
                js.dom.setChildText(elem, "[data-name]", label);
                const valueElem = js.selector.selectFrom(elem, "[data-value]");
                js.dom.setText(valueElem, fileInfo.name);
                globalNodeData.setClickData(valueElem, { file_id: fileInfo.fileId });
                return elem;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async addPasswordField(field) {
            try {
                const value = await this.getFieldValue(field.name);
                if (!value) {
                    return;
                }
                const secret = this.secret;
                const hasViewPermission = Secret.hasViewPermission(secret.sharing_level);
                if (!hasViewPermission) {
                    const elem = UIUtil.createElem({ template: "#password_details_no_view_permission_template" });
                    js.dom.setChildText(elem, "[data-name]", field.label);
                    this.elem.append(elem);
                    return;
                }
                const elem = UIUtil.createElem({ template: "#password_details_password_field_template" });
                js.dom.setChildText(elem, "[data-name]", field.label);
                globalNodeData.setNodeData(elem, { field, value });
                const resetElem = js.selector.selectFrom(elem, "[data-reset_password]");
                if (!secret.change_password) {
                    resetElem.remove();
                }
                const copyElem = js.selector.selectFrom(elem, "[data-copy]");
                VUI.keyboard.onKeyDown(elem, {
                    Enter() {
                        copyElem.click();
                    }
                });
                this.onKeyboardCopy(elem, () => copyElem.click());
                this.elem.append(elem);
            }
            catch (e) {
                logError(e);
            }
        }
        async addTextField(field) {
            try {
                const value = await this.getFieldValue(field.name);
                if (!value) {
                    return;
                }
                if (field.pii && this.piiEnabled) {
                    await this.addPasswordField(field);
                    return;
                }
                const textRow = this.getFieldTextRow(field, value);
                if (textRow) {
                    this.elem.append(textRow);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getFieldTextRow(field, value) {
            try {
                const elem = UIUtil.createElem({ template: "#password_details_text_field_template" });
                js.dom.setChildText(elem, "[data-name]", field.label);
                js.dom.setChildText(elem, "[data-value]", value);
                elem.dataset.field_name = field.name;
                globalNodeData.setNodeData(elem, { field });
                const copyElem = js.selector.selectFrom(elem, "[data-copy]");
                VUI.keyboard.onKeyDown(elem, {
                    Enter() {
                        copyElem.click();
                    }
                });
                this.onKeyboardCopy(elem, () => copyElem.click());
                return elem;
            }
            catch (e) {
                throw jserror(e);
            }
        }
        getCustomFieldTextRow(column, value) {
            try {
                const elem = UIUtil.createElem({ template: "#password_details_custom_text_field_template" });
                js.dom.setChildText(elem, "[data-name]", column.colname);
                js.dom.setChildText(elem, "[data-value]", value);
                globalNodeData.setNodeData(elem, { column });
                const copyElem = js.selector.selectFrom(elem, "[data-copy]");
                VUI.keyboard.onKeyDown(elem, {
                    Enter() {
                        copyElem.click();
                    }
                });
                this.onKeyboardCopy(elem, () => copyElem.click());
                return elem;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async getFieldValue(field_name) {
            try {
                const fieldValue = this.secret.encrypted.fields[field_name];
                if (!fieldValue) {
                    return "";
                }
                const decrypted_text = await zcrypt.decrypt(this.secret.encrypted.fields[field_name], this.secret.shared);
                return decrypted_text || "";
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        addHeader() {
            try {
                const elem = this.elem;
                const secret = this.secret;
                js.dom.setText(js.selector.selectFrom(elem, PasswordDetailsUtil.elem.NAME), secret.name);
                pp.passwordsUI.util.addLogoElem(elem, secret);
                pp.passwordsUI.util.updateFavouriteElem(elem, secret.is_favourite);
                this.updateOwnedByMeIcon();
                js.dom.setChildText(elem, "[data-created_on]", js.date.formatDateMonDYYYY(secret.created_on));
                const hasNoEditPermission = !Secret.hasEditPermission(secret.sharing_level);
                if (hasNoEditPermission) {
                    js.dom.hide(js.selector.selectFrom(this.elem, "[data-edit]"));
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async highlightSearch() {
            try {
                const query = await pp.passwordsUI.loadQuery();
                const { search_string: searchString } = query;
                if (!searchString) {
                    return;
                }
                const highlighter = new PasswordDetailsSearchHighlighter();
                highlighter.init(this.elem, this.secret, searchString, this.secretType);
                await highlighter.highlightSearch();
            }
            catch (e) {
                logError(e);
            }
        }
        addListeners() {
            try {
                this.addKeyboardListener();
                this.elem.addEventListener("focusin", () => this.p.helper.saveFocusedIndex());
            }
            catch (e) {
                logError(e);
            }
        }
        addKeyboardListener() {
            try {
                const elem = this.elem;
                const h = this;
                VUI.keyboard.addUpDownNavigation({
                    parent: elem,
                    onTopUp() {
                        VUI.input.focus(js.selector.select("#search"));
                    }
                });
                VUI.keyboard.onKeyDown(elem, {
                    ArrowLeft(e) {
                        if (js.dom.isContentEditable(e.target)) {
                            return;
                        }
                        pp.passwordsUI.passwordDetailsUI.close();
                        js.selector.select(`[data-secret_id="${h.secret.id}"]`)?.focus?.();
                    },
                });
            }
            catch (e) {
                logError(e);
            }
        }
        onKeyboardCopy(elem, listener) {
            try {
                VUI.keyboard.onKeyDown(elem, {
                    c(e) {
                        if (!VUI.keyboard.isCtrlPressed(e)) {
                            return;
                        }
                        if (document.getSelection().toString()) {
                            return;
                        }
                        listener();
                    }
                });
            }
            catch (e) {
                logError(e);
            }
        }
        updateOwnedByMeIcon() {
            try {
                if (this.secret.owned) {
                    return;
                }
                const icon = js.selector.selectFrom(this.elem, "i[data-owned_by_me_icon]");
                icon.className = "icon-share-by-me icon-lg";
                icon.dataset.tooltip_content = "i18n:shared_with_me";
                icon.parentElement.classList.add("sharetome");
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class PasswordDetailsUI extends UIParent {
        PPSessionShownSecretIdKey = "pp_shown_secret_id";
        listener = new PasswordDetailsListener();
        helper = new PasswordDetailsUIHelper(this);
        showerPart = new PasswordDetailsShowerPartImpl(this);
        restorePart = new RestorePasswordDetailsShower(this);
        secret = null;
        init() {
            this.init = () => { };
            this.listener.p = this;
            globalDomListener.register("password_details", this.listener);
        }
        async showDetails(secretId) {
            await this.showDetailsFn(secretId, this.showerPart);
        }
        async restore() {
            try {
                const shownSecretId = await zsessionStorage.load(this.PPSessionShownSecretIdKey, null);
                if (!shownSecretId) {
                    return;
                }
                await this.showDetailsFn(shownSecretId, this.restorePart);
            }
            catch (e) {
                logError(e);
            }
        }
        focusField() {
            js.selector.selectFrom(this.elem, "[tabindex]")?.focus?.();
        }
        restoreFocus() {
            try {
                if (!this.elem || !this.elem.parentElement) {
                    return;
                }
                this.restorePart.focusField();
            }
            catch (e) {
                logError(e);
            }
        }
        close() {
            if (!this.elem || !this.elem.parentElement) {
                return;
            }
            this.elem.remove();
            zsessionStorage.save(this.PPSessionShownSecretIdKey, null);
        }
        disableClose() {
            js.obj.disableMethod(this, this.close.name);
        }
        enableClose() {
            js.obj.enableMethod(this, this.close.name);
        }
        async showDetailsFn(secretId, part) {
            try {
                this.init();
                pp.mainUI.showDotLoading(0.3);
                const secret = this.secret = await bgApi.secret.getSecret(secretId);
                const hasNoAccess = !Secret.hasAccess(secret);
                if (hasNoAccess) {
                    await part.handleNoAccess();
                    return;
                }
                const elem = this.elem = await new PasswordDetailsUICreator(this).create();
                js.dom.setContent("#password_details_container", elem);
                await part.postSecretShown();
                pp.passwordsUI.updateSecretDisplayedInList(secret);
                part.focusField();
            }
            catch (e) {
                VUI.notification.showError(e + "");
                this.close();
            }
            finally {
                pp.mainUI.hideDotLoading();
            }
        }
    }
    class PasswordDetailsUIHelper {
        p;
        PPSessionFocusedField = "pp_details_focused_field";
        constructor(p) {
            this.p = p;
        }
        async saveFocusedIndex() {
            try {
                const index = js.selector.selectAll("[tabindex='0']", this.p.elem).indexOf(document.activeElement);
                if (index < 0) {
                    throw "INVALID_INDEX";
                }
                await zsessionStorage.save(this.PPSessionFocusedField, index);
            }
            catch (e) {
                logError(e);
            }
        }
        async getLastFocusedIndex() {
            try {
                return zsessionStorage.load(this.PPSessionFocusedField, 0);
            }
            catch (e) {
                logError(e);
                return 0;
            }
        }
    }

    class BasePasswordFilterUIElem extends UIElemContainer {
        favouriteCheckbox;
        domainCheckbox;
        ownedCheckbox;
        recentlyUsedCheckbox;
        recentlyAddedCheckbox;
        sharingSelect;
        favouriteContainer;
        classificationContainer;
        ownedContainer;
        sharingContainer;
        generalSelectionMark;
        recentSelectionMark;
        classificationSelectionMark;
        sharingSelectionMark;
        tagsSelectionMark;
        init() {
            this.container = UIUtil.createElem({ preRender: true, template: "#password_filter_template" });
            this.favouriteCheckbox = this.select("[data-favourite]");
            this.domainCheckbox = this.select("[data-domain_matching]");
            this.ownedCheckbox = this.select("[data-owned]");
            this.recentlyUsedCheckbox = this.select("[data-recently_used]");
            this.recentlyAddedCheckbox = this.select("[data-recently_added]");
            this.sharingSelect = this.select("[data-sharing]");
            this.favouriteContainer = this.select("[data-favourite_container]");
            this.classificationContainer = this.select("[data-classification_container]");
            this.ownedContainer = this.select("[data-owned_container]");
            this.sharingContainer = this.select("[data-sharing_container]");
            this.generalSelectionMark = this.select("[data-general_container] [data-selected]");
            this.recentSelectionMark = this.select("[data-recent_container] [data-selected]");
            this.classificationSelectionMark = this.select("[data-classification_container] [data-selected]");
            this.sharingSelectionMark = this.select("[data-sharing_container] [data-selected]");
            this.tagsSelectionMark = this.select("[data-tag_container] [data-selected]");
        }
        getClassificationCheckbox(value) {
            return this.select("input[name='classification'][value=" + value + "]");
        }
    }

    class BaseFilterTagUIData {
        tags = [];
        async init() {
            try {
                const tagQuery = new TagQuery();
                tagQuery.rows_per_page = -1;
                const tagResult = await bgApi.secret.queryTags(tagQuery);
                this.tags = tagResult.tags;
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class BaseFilterTagUIElem extends UIElemContainer {
        tagUI;
        selectContainer;
        tagSelectElem;
        constructor(tagUI) {
            super();
            this.tagUI = tagUI;
        }
        init() {
            this.container = js.selector.selectFrom(this.tagUI.filterUI.elem.container, "[data-tag_container]");
            this.selectContainer = this.select("[data-tag_select_container]");
        }
        getTagModeCheckbox(value) {
            return js.selector.selectFrom(this.container, "input[name='tagMode'][value=" + value + "]");
        }
    }

    class BaseFilterTagUI {
        filterUI;
        elem = new BaseFilterTagUIElem(this);
        data = new BaseFilterTagUIData();
        constructor(filterUI) {
            this.filterUI = filterUI;
        }
        showUI() {
            try {
                this.elem.init();
                if (this.data.tags.length == 0) {
                    js.dom.hide(this.elem.container);
                    return;
                }
                this.initUIValues();
                this.initTagSelect();
                this.addUIListeners();
                this.addSlimScroll();
            }
            catch (e) {
                logError(e);
            }
        }
        initUIValues() {
            try {
                this.elem.getTagModeCheckbox(this.filterUI.data.getQuery().tagMode).checked = true;
                this.updateTagsSelectionMark();
            }
            catch (e) {
                logError(e);
            }
        }
        initTagSelect() {
            try {
                const tags = this.data.tags;
                const query = this.filterUI.data.getQuery();
                const tagElem = UIUtil.createListSelectElem({
                    list: tags,
                    selected: query.tags,
                    placeholder: i18n(VI18N.SELECT) + " " + i18n(VI18N.TAG),
                    keepDropdownOpen: query.tags.length > 0,
                });
                this.elem.tagSelectElem = tagElem;
                js.dom.setContent(this.elem.selectContainer, tagElem.elem);
                tagElem.refreshUI();
            }
            catch (e) {
                logError(e);
            }
        }
        addUIListeners() {
            try {
                this.elem.getTagModeCheckbox(FilterType.ALL).addEventListener("input", () => this.filterUI.updater.changeTagMode(FilterType.ALL));
                this.elem.getTagModeCheckbox(FilterType.ANY).addEventListener("input", () => this.filterUI.updater.changeTagMode(FilterType.ANY));
                this.elem.tagSelectElem.onSelectionChanged((tags) => {
                    this.filterUI.updater.changeTags(tags);
                    this.updateTagsSelectionMark();
                });
            }
            catch (e) {
                logError(e);
            }
        }
        addSlimScroll() {
            try {
                const tagListElem = this.elem.select("[data-dropdown_list_container]");
                UIUtil.addSlimScroll(tagListElem);
            }
            catch (e) {
                logError(e);
            }
        }
        updateTagsSelectionMark() {
            try {
                const query = this.filterUI.data.getQuery();
                const selected = query.tags.length > 0;
                js.dom.showHide(selected, this.filterUI.elem.tagsSelectionMark);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class BasePasswordFilterUI {
        elem = new BasePasswordFilterUIElem();
        tagUI = new BaseFilterTagUI(this);
        async showUI() {
            try {
                this.elem.init();
                await this.data.init();
                this.initSharingDropdown();
                this.tagUI.showUI();
                this.initUIValues();
                this.addUIListeners();
                this.initPlanFilters();
                js.dom.setContent("#passwords_filter_container", this.elem.container);
            }
            catch (e) {
                logError(e);
            }
        }
        hideUI() {
            try {
                this.elem.container?.remove?.();
            }
            catch (e) {
                logError(e);
            }
        }
        isQueryFiltered(query) {
            return this.countFilters(query) > 0;
        }
        countFilters(query) {
            const q = query;
            let count = 0;
            q.favourite && count++;
            q.domainMatching && count++;
            q.owned && count++;
            q.recentlyUsed && count++;
            q.recentlyAdded && count++;
            (q.classification != FilterType.ALL) && count++;
            (q.sharing != FilterType.ALL) && count++;
            (q.tags.length > 0) && count++;
            return count;
        }
        initSharingDropdown() {
            try {
                const query = this.data.getQuery();
                js.selector.selectFrom(this.elem.sharingSelect, `option[value="${query.sharing}"]`).selected = true;
                $(this.elem.sharingSelect).select2({ minimumResultsForSearch: -1 });
                $(this.elem.sharingSelect).on("change", e => {
                    this.updater.changeSharing((e.target.value));
                    this.updateSharingSelectionMark();
                });
            }
            catch (e) {
                logError(e);
            }
        }
        initUIValues() {
            try {
                const query = this.data.getQuery();
                this.elem.favouriteCheckbox.checked = query.favourite;
                this.elem.domainCheckbox.checked = query.domainMatching;
                this.elem.ownedCheckbox.checked = query.owned;
                this.elem.recentlyUsedCheckbox.checked = query.recentlyUsed;
                this.elem.recentlyAddedCheckbox.checked = query.recentlyAdded;
                this.elem.getClassificationCheckbox(query.classification).checked = true;
                this.updateGeneralSelectionMark();
                this.updateRecentSelectionMark();
                this.updateClassificationSelectionMark();
                this.updateSharingSelectionMark();
            }
            catch (e) {
                logError(e);
            }
        }
        addUIListeners() {
            try {
                this.elem.favouriteCheckbox.addEventListener("input", () => {
                    this.updater.changeFavourite(this.elem.favouriteCheckbox.checked);
                    this.updateGeneralSelectionMark();
                });
                this.elem.domainCheckbox.addEventListener("input", () => {
                    this.updater.changeDomainMatching(this.elem.domainCheckbox.checked);
                    this.updateGeneralSelectionMark();
                });
                this.elem.ownedCheckbox.addEventListener("input", () => {
                    this.updater.changeOwned(this.elem.ownedCheckbox.checked);
                    this.updateGeneralSelectionMark();
                });
                this.elem.recentlyUsedCheckbox.addEventListener("input", () => {
                    this.updater.changeRecentlyUsed(this.elem.recentlyUsedCheckbox.checked);
                    this.updateRecentSelectionMark();
                });
                this.elem.recentlyAddedCheckbox.addEventListener("input", () => {
                    this.updater.changeRecentlyAdded(this.elem.recentlyAddedCheckbox.checked);
                    this.updateRecentSelectionMark();
                });
                this.elem.getClassificationCheckbox(FilterType.ALL).addEventListener("input", () => {
                    this.updater.changeClassification(FilterType.ALL);
                    this.updateClassificationSelectionMark();
                });
                this.elem.getClassificationCheckbox(SecretClassification.PERSONAL).addEventListener("input", () => {
                    this.updater.changeClassification(SecretClassification.PERSONAL);
                    this.updateClassificationSelectionMark();
                });
                this.elem.getClassificationCheckbox(SecretClassification.ENTERPRISE).addEventListener("input", () => {
                    this.updater.changeClassification(SecretClassification.ENTERPRISE);
                    this.updateClassificationSelectionMark();
                });
            }
            catch (e) {
                logError(e);
            }
        }
        initPlanFilters() {
            try {
                if (!this.data.isPersonalPlan) {
                    return;
                }
                VUI.hide(this.elem.classificationContainer, this.elem.sharingContainer, this.elem.ownedContainer);
            }
            catch (e) {
                logError(e);
            }
        }
        updateGeneralSelectionMark() {
            try {
                const query = this.data.getQuery();
                const selected = query.favourite || query.domainMatching || query.owned;
                js.dom.showHide(selected, this.elem.generalSelectionMark);
            }
            catch (e) {
                logError(e);
            }
        }
        updateRecentSelectionMark() {
            try {
                const query = this.data.getQuery();
                const selected = query.recentlyUsed || query.recentlyAdded;
                js.dom.showHide(selected, this.elem.recentSelectionMark);
            }
            catch (e) {
                logError(e);
            }
        }
        updateClassificationSelectionMark() {
            try {
                const query = this.data.getQuery();
                const selected = query.classification != FilterType.ALL;
                js.dom.showHide(selected, this.elem.classificationSelectionMark);
            }
            catch (e) {
                logError(e);
            }
        }
        updateSharingSelectionMark() {
            try {
                const query = this.data.getQuery();
                const selected = query.sharing != FilterType.ALL;
                js.dom.showHide(selected, this.elem.sharingSelectionMark);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class BasePasswordFilterUpdater {
        async changeFavourite(selected) {
            this.update(x => x.favourite = selected);
        }
        async changeDomainMatching(selected) {
            try {
                this.update(x => x.domainMatching = selected);
                this.setDomainMatchingIcon(selected);
            }
            catch (e) {
                logError(e);
            }
        }
        async changeRecentlyUsed(selected) {
            this.update(x => x.recentlyUsed = selected);
        }
        changeRecentlyAdded(selected) {
            this.update(x => x.recentlyAdded = selected);
        }
        changeSharing(value) {
            this.update(x => x.sharing = value);
        }
        changeClassification(value) {
            this.update(x => x.classification = value);
        }
        changeTagMode(value) {
            this.update(x => x.tagMode = value);
        }
        changeTags(tags) {
            this.update(x => x.tags = tags);
        }
        changeSearchString(searchString) {
            this.update(x => x.search_string = searchString);
        }
        changeOwned(selected) {
            this.update(x => x.owned = selected);
        }
        clearFilters() {
            this.update(x => {
                x.favourite = false;
                x.domainMatching = false;
                x.recentlyUsed = false;
                x.recentlyAdded = false;
                x.classification = FilterType.ALL;
                x.sharing = FilterType.ALL;
                x.tags.length = 0;
                x.owned = false;
            });
        }
        update(fn) {
            try {
                const query = this.getQuery();
                fn(query);
                this.updateFilter(query);
            }
            catch (e) {
                logError(e);
            }
        }
        setDomainMatchingIcon(_selected) { }
    }

    class FilterUpdater extends BasePasswordFilterUpdater {
        async updateFilter(query) {
            query.page_no = 0;
            await zsessionStorage.save(pp.passwordsUI.PP_QUERY_KEY, query);
            await pp.passwordsUI.refreshList();
        }
        getQuery() {
            return pp.passwordsUI.getQuery();
        }
        setDomainMatchingIcon(selected) {
            pp.mainUI.setDomainMatchingIcon(selected);
        }
    }

    class BaseNoPasswordFilterUIElem extends UIElemContainer {
        viewFiltersElem;
        favouriteElem;
        domainMatchingElem;
        ownedElem;
        recentlyUsedElem;
        recentlyAddedElem;
        classificationElem;
        sharingElem;
        tagsElem;
        searchElem;
        classificationText;
        sharingText;
        init() {
            this.container = UIUtil.createElem({ template: "#applied_filter_name_template" });
            this.viewFiltersElem = this.select("[data-view_filters]");
            this.favouriteElem = this.select("[data-favourite]");
            this.domainMatchingElem = this.select("[data-domain_matching]");
            this.ownedElem = this.select("[data-owned]");
            this.recentlyUsedElem = this.select("[data-recently_used]");
            this.recentlyAddedElem = this.select("[data-recently_added]");
            this.classificationElem = this.select("[data-classification]");
            this.sharingElem = this.select("[data-sharing]");
            this.tagsElem = this.select("[data-tags]");
            this.searchElem = this.select("[data-search]");
            this.classificationText = js.selector.selectFrom(this.classificationElem, "[data-text]");
            this.sharingText = js.selector.selectFrom(this.sharingElem, "[data-text]");
        }
    }

    class BaseNoPasswordFilterUI {
        filterUI;
        elem = new BaseNoPasswordFilterUIElem();
        query;
        constructor(filterUI) {
            this.filterUI = filterUI;
        }
        showUI() {
            try {
                this.elem.init();
                this.query = this.filterUI.data.getQuery();
                this.showHideFilters();
                this.addListeners();
                js.dom.setContent(js.selector.selectFrom(this.getPasswordsElem(), "[data-applied_filters_container]"), this.elem.container);
            }
            catch (e) {
                logError(e);
            }
        }
        showHideFilters() {
            try {
                const showElems = [];
                this.query.favourite && showElems.push(this.elem.favouriteElem);
                this.query.domainMatching && showElems.push(this.elem.domainMatchingElem);
                this.query.owned && showElems.push(this.elem.ownedElem);
                this.query.recentlyUsed && showElems.push(this.elem.recentlyUsedElem);
                this.query.recentlyAdded && showElems.push(this.elem.recentlyAddedElem);
                this.showClassification();
                this.showSharing();
                this.query.tags.length > 0 && showElems.push(this.elem.tagsElem);
                this.query.search_string && showElems.push(this.elem.searchElem);
                if (this.query.search_string) {
                    js.dom.setChildText(this.elem.searchElem, "[data-text]", this.query.search_string);
                }
                if (!this.filterUI.isQueryFiltered(this.query)) {
                    js.dom.hide(this.elem.viewFiltersElem);
                }
                VUI.show(...showElems);
            }
            catch (e) {
                logError(e);
            }
        }
        showSharing() {
            try {
                if (this.query.sharing == FilterType.ALL) {
                    return;
                }
                js.dom.setText(this.elem.sharingText, i18n(this.getSharingText()));
                js.dom.show(this.elem.sharingElem);
            }
            catch (e) {
                logError(e);
            }
        }
        getSharingText() {
            try {
                switch (this.query.sharing) {
                    case SecretSharingType.SHARED_BY_ME:
                        return VI18N.SHARED_BY_ME;
                    case SecretSharingType.SHARED_TO_ME:
                        return VI18N.SHARED_WITH_ME;
                    case SecretSharingType.NONE:
                        return VI18N.UNSHARED;
                    default:
                        throw "NEW_STATE";
                }
            }
            catch (e) {
                logError(e);
                return VI18N.EMPTY;
            }
        }
        showClassification() {
            try {
                if (this.query.classification == FilterType.ALL) {
                    return;
                }
                js.dom.setText(this.elem.classificationText, i18n(this.getClassificationText()));
                js.dom.show(this.elem.classificationElem);
            }
            catch (e) {
                logError(e);
            }
        }
        getClassificationText() {
            try {
                switch (this.query.classification) {
                    case SecretClassification.PERSONAL:
                        return VI18N.PERSONAL;
                    case SecretClassification.ENTERPRISE:
                        return VI18N.ENTERPRISE;
                    default:
                        throw "NEW_STATE";
                }
            }
            catch (e) {
                logError(e);
                return VI18N.EMPTY;
            }
        }
        addListeners() {
            try {
                this.query.favourite && this.elem.favouriteElem.addEventListener("click", () => this.filterUI.updater.changeFavourite(false));
                this.query.domainMatching && this.elem.domainMatchingElem.addEventListener("click", () => this.filterUI.updater.changeDomainMatching(false));
                this.query.owned && this.elem.ownedElem.addEventListener("click", () => this.filterUI.updater.changeOwned(false));
                this.query.recentlyUsed && this.elem.recentlyUsedElem.addEventListener("click", () => this.filterUI.updater.changeRecentlyUsed(false));
                this.query.recentlyAdded && this.elem.recentlyAddedElem.addEventListener("click", () => this.filterUI.updater.changeRecentlyAdded(false));
                this.query.classification != FilterType.ALL && this.elem.classificationElem.addEventListener("click", () => this.filterUI.updater.changeClassification(FilterType.ALL));
                this.query.sharing != FilterType.ALL && this.elem.sharingElem.addEventListener("click", () => this.filterUI.updater.changeSharing(FilterType.ALL));
                this.query.tags.length > 0 && this.elem.tagsElem.addEventListener("click", () => this.filterUI.updater.changeTags([]));
                this.query.search_string && this.elem.searchElem.addEventListener("click", () => this.onClearSearch());
            }
            catch (e) {
                logError(e);
            }
        }
        onClearSearch() {
            try {
                this.filterUI.updater.changeSearchString("");
                const searchElem = this.getSearchElem();
                searchElem.value = "";
                uiUtilOld.showSearchClear(searchElem);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class NoPasswordFilterUI extends BaseNoPasswordFilterUI {
        getPasswordsElem() {
            return pp.passwordsUI.elem;
        }
        getSearchElem() {
            return pp.mainUI.elem1.searchElem;
        }
    }

    class BasePasswordFilterUIData {
        filterUI;
        isPersonalPlan = false;
        constructor(filterUI) {
            this.filterUI = filterUI;
        }
        async init() {
            try {
                await Promise.all([
                    this.filterUI.tagUI.data.init(),
                    this.initFromStorage(),
                ]);
            }
            catch (e) {
                logError(e);
            }
        }
        async initFromStorage() {
            try {
                const storageObj = await zlocalStorage.loadAll({
                    [LocalStorageKeys.IS_PERSONAL_PLAN]: false
                });
                this.isPersonalPlan = storageObj[LocalStorageKeys.IS_PERSONAL_PLAN];
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class PasswordFilterUIData extends BasePasswordFilterUIData {
        filterUI;
        constructor(filterUI) {
            super(filterUI);
            this.filterUI = filterUI;
        }
        getQuery() {
            return pp.passwordsUI.getQuery();
        }
    }

    class PasswordFilterUI extends BasePasswordFilterUI {
        data = new PasswordFilterUIData(this);
        updater = new FilterUpdater();
        noPasswordsUI = new NoPasswordFilterUI(this);
    }

    class PasswordsUIListener {
        p = null;
        init() {
            this.keyed_search_string = js.fn.wrapper.createSingleInstListener(this.keyed_search_string, this);
        }
        async clicked_clear_password_filters() {
            await this.p.filterUI.updater.clearFilters();
            js.selector.select("#show_domain_matching_icon").classList.remove("disabled");
            this.clicked_hide_password_filter();
        }
        async clicked_back_to_folders() {
            await this.p.restorePreFolderQuery();
            pp.mainUI.showTab(pp.mainUI.PP_TABS.FOLDERS);
        }
        async clicked_filter(e, event_data) {
            const input = e.target;
            const enable = input.checked;
            const { filter } = event_data;
            const query = await this.p.loadQuery();
            query[filter] = enable;
            await this.p.filterUI.updater.updateFilter(query);
        }
        clicked_show_password_filter() {
            const showFilterElem = js.selector.select("#show_password_filter");
            const isShown = showFilterElem.style.zIndex != "";
            if (isShown) {
                this.clicked_hide_password_filter();
                return;
            }
            this.p.showPasswordsFilter();
        }
        clicked_hide_password_filter() {
            this.p.filterUI.hideUI();
            const showFilterElem = js.selector.select("#show_password_filter");
            js.selector.selectFrom(showFilterElem, "a").classList.remove("filter-action-icon-list-selected");
            showFilterElem.style.zIndex = "";
            js.dom.hide("#passwords_filter_container", "#password_filter_overlay", "#password_filter_overlay_color_bg");
        }
        async keyed_search_string(e) {
            if (VUI.keyboard.isControlKey(e.key)) {
                return;
            }
            const input = e.target;
            UIUtil1.inst.showSearchClear(input);
            const query = await zsessionStorage.load(pp.passwordsUI.PP_QUERY_KEY, null) || this.p.createNewSecretQuery();
            query.search_string = input.value;
            await this.p.filterUI.updater.updateFilter(query);
        }
        clicked_show_more_actions(e) {
            const secretId = this.p.util.getSecretId(e);
            BasePasswordMoreActionsController.inst.showUI(secretId, e);
        }
        clicked_hide_more_actions() {
            BasePasswordMoreActionsController.inst.hideUI();
        }
        async clicked_share_password(e) {
            const secretId = this.p.util.getSecretId(e);
            bgApi.ztab.sharePassword(secretId);
            js.dom.closeWindow();
        }
        async clicked_login(e, event_data) {
            const secretId = this.p.util.getSecretId(e);
            const { url, incognito = false } = event_data;
            bgApi.secret.login(secretId, url, incognito);
            js.dom.closeWindow();
        }
        async clicked_copy_password_icon(e, eventData) {
            try {
                const { fieldName, fieldLabel } = eventData;
                const secretId = this.p.util.getSecretId(e);
                pp.mainUI.showDotLoading(0.5);
                await bgApi.secret.copyField(secretId, fieldName);
                pp.mainUI.hideDotLoading();
                const target = e.target;
                if (target.nodeName == "I") {
                    VUI.tooltip.showActionMsg(e, fieldLabel + " " + i18n(VI18N.COPIED), 1);
                    return;
                }
                const passwordElem = js.selector.select(`[data-secret_id="${secretId}"]`);
                VUI.tooltip.showElemMsg(passwordElem, fieldLabel + " " + i18n(VI18N.COPIED), 1);
            }
            catch (e) {
                logError(e);
            }
        }
        async clicked_copy_username_icon(e, eventData) {
            this.clicked_copy_password_icon(e, eventData);
        }
        async clicked_show_password_details(e) {
            const secretId = this.p.util.getSecretId(e);
            this.p.passwordDetailsUI.showDetails(secretId);
        }
        async clicked_change_favourite(e) {
            const secretId = this.p.util.getSecretId(e);
            const secret = await bgApi.secret.getSecret(secretId);
            const favourite = !secret.is_favourite;
            bgApi.secret.edit.setFavourite(secretId, favourite);
            js.selector.selectAll("div[data-secret_id='" + secret.id + "'] span[data-favourite]", this.p.elem)
                .forEach(x => this.p.util.updateFavouriteElem(x, favourite));
        }
        async clicked_add_password() {
            const query = await this.p.loadQuery();
            const prefillInput = new SecretAddPreFillInput();
            if (query.folderId) {
                prefillInput.folderId = query.folderId;
            }
            await bgApi.ztab.addPassword(prefillInput);
            await js.dom.closeWindow();
        }
        async clicked_sync(e) {
            const syncIcon = e.target;
            const syncing = syncIcon.classList.contains(VaultCSS.SYNCING_ANIMATION);
            if (syncing) {
                return;
            }
            bgApi.vault.sync();
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

    class PasswordsUIUtil {
        static selector = {
            SYNC_ICON: "[data-sync_icon]"
        };
        async downloadFile(secretId, fileId) {
            const respFileInfo = await bgApi.secret.file.download(secretId, fileId);
            const encodedContent = await zcrypt.fileDecrypt(respFileInfo.data, respFileInfo.isShared == "YES");
            const fileType = encodedContent.slice(encodedContent.indexOf(":") + 1, encodedContent.indexOf(";"));
            const encodedFileContent = encodedContent.slice(encodedContent.indexOf(",") + 1);
            if (js.browser.isSafari()) {
                bgApi.tab.downloadFileInCS({ base64Data: encodedFileContent, type: fileType, name: respFileInfo.name });
                return;
            }
            const fileContent = atob(encodedFileContent);
            const fileInfo = {
                name: respFileInfo.name,
                type: fileType};
            const a = new Array(fileContent.length);
            for (let i = 0; i < a.length; i++) {
                a[i] = fileContent.charCodeAt(i) & 0xFF;
            }
            const blob = new Blob([new Uint8Array(a).buffer], { type: fileInfo.type });
            saveAs(blob, fileInfo.name);
        }
        updateFavouriteElem(elem, is_favourite) {
            const icon = js.selector.selectFrom(elem, "i[data-favourite_icon]");
            if (!is_favourite) {
                icon.className = "icon-star-1 text-default";
                icon.dataset.tooltip_content = "i18n:mark_favourite";
                return;
            }
            icon.className = "icon-star text-warning";
            icon.dataset.tooltip_content = "i18n:unmark_favourite";
        }
        getSecretId(event) {
            return js.selector.closest(event.target, "[data-secret_id]").dataset.secret_id;
        }
        addLogoElem(elem, secret) {
            try {
                const noLogoElem = js.selector.selectFrom(elem, "[data-no_logo]");
                const logoElem = js.selector.selectFrom(elem, "[data-logo]");
                const logo = secret.logo || secret.domain_logo;
                if (logo) {
                    noLogoElem.remove();
                    logoElem.style.backgroundImage = SecretUtil.getLogoStyleSrc(logo);
                    return;
                }
                logoElem.remove();
                noLogoElem.textContent = SecretUtil.getFirst2Chars(secret.name);
                noLogoElem.style.background = SecretUtil.getLogoColor(secret.created_on, secret.name);
            }
            catch (e) {
                logError(e);
            }
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

    class SecretElemCreatorHelper {
        p;
        pData;
        secret;
        query;
        elem;
        constructor(p, pData) {
            this.p = p;
            this.pData = pData;
        }
        async createSecretElem(param) {
            const elem = this.elem = UIUtil.createElem({ template: this.pData.template });
            const secret = this.secret = param.secret;
            this.query = param.result.query;
            elem.dataset.secret_id = secret.id;
            globalNodeData.setNodeData(elem, secret);
            this.setName();
            await this.setDescription();
            this.p.p.util.updateFavouriteElem(elem, secret.is_favourite);
            this.p.p.util.addLogoElem(elem, secret);
            if (!secret.display_access_control_icon) {
                js.selector.selectFrom(elem, "[data-access_control_icon]").remove();
            }
            await this.addIcons();
            this.addKeyboardListener();
            return elem;
        }
        setName() {
            try {
                const secret = this.secret;
                const query = this.query;
                const secretNameElem = js.selector.selectFrom(this.elem, "[data-secret_name]");
                if (!query || !query.search_string || secret.highlight_field != SecretHighlightFields.NAME) {
                    js.dom.setText(secretNameElem, secret.name);
                    return;
                }
                js.dom.setContent(secretNameElem, _TextHighlighter.highlight(query.search_string, secret.name));
                secretNameElem.dataset.tooltip_content = secret.name;
            }
            catch (e) {
                logError(e);
            }
        }
        async setDescription() {
            try {
                const secret = this.secret;
                const query = this.query;
                const hasAccess = Secret.hasAccess(secret);
                if (!hasAccess) {
                    this.removeDescription();
                    return;
                }
                if (secret.type_id == this.pData.cardTypeId) {
                    const uiText = secret.encrypted != null ? await zcrypt.decrypt(secret.encrypted.fields.card_number, secret.shared) : "";
                    this.setDescriptionText(uiText.replace(/\S(?=.{4})/g, "*").replace(/(.{4})/g, '$1 '), CARD_FIELDS.NUMBER);
                    return;
                }
                if (!secret.ui_text) {
                    this.removeDescription();
                    return;
                }
                const userName = await zcrypt.decrypt(secret.ui_text, secret.shared);
                if (userName.trim().length == 0) {
                    this.removeDescription();
                    return;
                }
                if (!query || !query.search_string || secret.highlight_field != SecretHighlightFields.UI_TEXT) {
                    this.setDescriptionText(userName, secret.uiFieldName);
                    return;
                }
                js.dom.setChildContent(this.elem, "[data-description]", _TextHighlighter.highlight(query.search_string, userName));
            }
            catch (e) {
                logError(e);
            }
        }
        removeDescription() {
            try {
                js.selector.selectFrom(this.elem, "[data-description_container]").remove();
            }
            catch (e) {
                logError(e);
            }
        }
        setDescriptionText(description, fieldName) {
            try {
                js.dom.setChildText(this.elem, "[data-description]", description);
                const secretType = this.pData.secretTypeMap[this.secret.type_id];
                if (!secretType) {
                    throw ["SECRET_TYPE_NOT_FOUND", this.secret.type_id];
                }
                const field = secretType.fields.find(x => x.name == fieldName);
                if (!field) {
                    throw ["SECRET_TYPE_FIELD_NOT_FOUND", fieldName];
                }
                const copyElem = js.selector.selectFrom(this.elem, "[data-copy_username]");
                const iconElem = js.selector.selectFrom(copyElem, "i");
                iconElem.dataset.tooltip_content = i18n$1(VI18N.COPY) + " " + field.label;
                globalNodeData.setClickData(copyElem, { fieldName: field.name, fieldLabel: field.label });
            }
            catch (e) {
                logError(e);
            }
        }
        async addIcons() {
            const hasAccess = !this.secret.access_controlled ||
                this.secret.access_request_status == Secret.ACCESS_CTRL_STATUS.CHECK_OUT;
            if (!hasAccess) {
                js.selector.selectFrom(this.elem, "[data-password_actions]").remove();
                return;
            }
            this.addCopyIcon();
            this.addLoginIcon();
            await this.addShareIcon();
            this.addShowMoreActionsIcon();
        }
        addShowMoreActionsIcon() {
            const moreActionsElem = js.selector.selectFrom(this.elem, "[data-show_more_options]");
            const hasViewPermission = Secret.hasViewPermission(this.secret.sharing_level);
            if (hasViewPermission || this.secret.has_totp) {
                return;
            }
            js.selector.selectFrom(moreActionsElem, "i").classList.add("disabled");
            moreActionsElem.dataset.on_click = "";
        }
        async addShareIcon() {
            if (this.pData.isPersonalPlan) {
                js.selector.selectFrom(this.elem, "[data-share]").remove();
                return;
            }
            const sharingRestricted = !(await zlocalStorage.load(LocalStorageKeys.ALLOW_SHARE_SECRET, true));
            if (sharingRestricted) {
                this.disableShareIcon(i18n$1(VI18N.SHARING_RESTRICTED));
                return;
            }
            const secret = this.secret;
            const isPersonalSecret = secret.classification == SecretClassification.PERSONAL;
            if (isPersonalSecret) {
                this.disableShareIcon(i18n$1(VI18N.PERSONAL_PASSWORD_CANNOT_BE_SHARED));
                return;
            }
            const hasManagePermission = Secret.hasManagePermission(secret.sharing_level);
            if (!hasManagePermission) {
                this.disableShareIcon(i18n$1(VI18N.NO_SHARE_PERMISSION));
                return;
            }
        }
        disableShareIcon(tooltipMsg) {
            const shareElem = js.selector.selectFrom(this.elem, "[data-share]");
            const iconElem = js.selector.selectFrom(shareElem, "i");
            iconElem.classList.add("disabled");
            iconElem.dataset.tooltip_content = tooltipMsg;
            shareElem.dataset.on_click = "";
        }
        addLoginIcon() {
            const loginElem = js.selector.selectFrom(this.elem, "[data-login]");
            const privateLoginElem = js.selector.selectFrom(this.elem, "[data-private_login]");
            const secret = this.secret;
            if (!secret.urls.length) {
                loginElem.remove();
                privateLoginElem.remove();
                return;
            }
            if (!this.pData.disableClickToLogin) {
                this.elem.dataset.on_click = "passwords_ui.clicked_login";
                this.elem.dataset.on_enter = "passwords_ui.clicked_login";
                globalNodeData.setClickData(this.elem, { url: secret.urls[0] });
                globalNodeData.setData(this.elem, globalNodeData.dataType.ENTER, { url: secret.urls[0] });
            }
            globalNodeData.setClickData(loginElem, { url: secret.urls[0] });
            globalNodeData.setClickData(privateLoginElem, { url: secret.urls[0], incognito: true });
            if (!this.pData.incognitoAllowed) {
                privateLoginElem.remove();
            }
            if (!secret.auto_submit) {
                js.selector.selectFrom(loginElem, "i").className = "icon-login-disabled";
            }
        }
        addCopyIcon() {
            const secret = this.secret;
            const passwordField = this.pData.secretTypeMap[secret.type_id].password_fields[0];
            const copyElem = js.selector.selectFrom(this.elem, "[data-copy_password]");
            if (!passwordField) {
                copyElem.remove();
                return;
            }
            const iconElem = js.selector.selectFrom(copyElem, "i");
            const hasViewPermission = Secret.hasViewPermission(secret.sharing_level);
            if (!hasViewPermission) {
                copyElem.dataset.on_click = "";
                iconElem.classList.add("disabled");
                return;
            }
            iconElem.dataset.tooltip_content = i18n$1(VI18N.COPY) + " " + passwordField.label;
            globalNodeData.setClickData(copyElem, { fieldName: passwordField.name, fieldLabel: passwordField.label });
        }
        addKeyboardListener() {
            try {
                const elem = this.elem;
                const secret = this.secret;
                const h = this;
                const copyPasswordFn = (e) => {
                    e.preventDefault();
                    if (!VUI.keyboard.isCtrlPressed(e)) {
                        return;
                    }
                    const copyElem = js.selector.selectFrom(elem, "[data-copy_password]");
                    if (!copyElem) {
                        return;
                    }
                    copyElem.click();
                };
                const copyTotp = (e) => {
                    if (!VUI.keyboard.isCtrlPressed(e)) {
                        return;
                    }
                    e.preventDefault();
                    h.copyTotp(secret);
                };
                VUI.keyboard.onKeyDown(elem, {
                    ArrowRight(e) {
                        e.preventDefault();
                        pp.passwordsUI.passwordDetailsUI.showDetails(secret.id);
                    },
                    c: copyPasswordFn,
                    p: copyPasswordFn,
                    t: copyTotp,
                    o: copyTotp,
                    u(e) {
                        if (!VUI.keyboard.isCtrlPressed(e)) {
                            return;
                        }
                        e.preventDefault();
                        h.copyUIText(secret);
                    },
                });
            }
            catch (e) {
                logError(e);
            }
        }
        async copyUIText(secret) {
            try {
                if (!secret.ui_text || !secret.uiFieldName) {
                    return;
                }
                const uiText = await zcrypt.decrypt(secret.ui_text, secret.shared);
                if (!uiText) {
                    return;
                }
                const secretType = await bgApi.secretType.get(secret.type_id);
                const field = secretType.fields.find(x => x.name == secret.uiFieldName);
                if (!field) {
                    return;
                }
                pp.mainUI.showDotLoading(0.5);
                await bgApi.secret.copyField(secret.id, field.name);
                this.showCopiedMessage(secret, field.label);
            }
            catch (e) {
                logError(e);
            }
        }
        async copyTotp(secret) {
            try {
                if (!secret.has_totp) {
                    return;
                }
                pp.mainUI.showDotLoading(0.5);
                await bgApi.secret.totp.copy(secret.id);
                this.showCopiedMessage(secret, "TOTP");
            }
            catch (e) {
                logError(e);
            }
        }
        showCopiedMessage(secret, prefix) {
            try {
                const message = prefix + " " + i18n$1(VI18N.COPIED);
                pp.mainUI.hideDotLoading();
                const secretElem = js.selector.select(`[data-secret_id="${secret.id}"]`);
                VUI.tooltip.showElemMsg(secretElem, message, 1);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class SecretElemCreatorData {
        template = null;
        secretTypeMap = {};
        incognitoAllowed = false;
        isPersonalPlan = false;
        curSecret = null;
        cardTypeId = "";
        disableClickToLogin = false;
    }
    class SecretElemCreator {
        data = new SecretElemCreatorData();
        p = null;
        async init() {
            this.data.template = js.selector.select("#secret_list_item_template");
            this.data.secretTypeMap = await bgApi.secretType.getMap();
            this.data.incognitoAllowed = await brApi.tab.isIncognitoAllowed();
            const storage = await zlocalStorage.loadAll({
                [LocalStorageKeys.IS_PERSONAL_PLAN]: false,
                [VtSettings.DISABLE_CLICK_TO_LOGIN]: false,
                [LocalStorageKeys.PAYMENT_CARD_TYPE_ID]: ""
            });
            this.data.isPersonalPlan = storage[LocalStorageKeys.IS_PERSONAL_PLAN];
            this.data.disableClickToLogin = storage[VtSettings.DISABLE_CLICK_TO_LOGIN];
            this.data.cardTypeId = storage[LocalStorageKeys.PAYMENT_CARD_TYPE_ID];
        }
        async getList(secrets, result) {
            const param = { result, secret: null };
            const creator = new SecretElemCreatorHelper(this, this.data);
            const fragment = document.createDocumentFragment();
            for (let secret of secrets) {
                param.secret = secret;
                fragment.append(await creator.createSecretElem(param));
            }
            return fragment;
        }
        async createSecretElem(param) {
            return new SecretElemCreatorHelper(this, this.data).createSecretElem(param);
        }
    }

    class PasswordsUI extends UIParent {
        PP_QUERY_KEY = "PP_QUERY_1";
        PP_PRE_FOLDER_KEY = "PP_PRE_FOLDER_KEY";
        PP_CUR_FODER_NAME = "PP_CUR_FOLDER_NAME";
        listener = new PasswordsUIListener();
        elemCreator = new SecretElemCreator();
        filterUI = new PasswordFilterUI();
        util = new PasswordsUIUtil();
        passwordDetailsUI = new PasswordDetailsUI();
        displayedSecrets = [];
        emptyNewTab = false;
        intersectionObserver = null;
        query = this.createNewSecretQuery();
        queryResult = null;
        constructor() {
            super();
            this.showUI = js.fn.wrapper.createSingleInstListener(this.showUI, this);
        }
        async init() {
            this.init = async () => { };
            this.listener.p = this;
            this.elemCreator.p = this;
            this.handleScrollIntersection = this.handleScrollIntersection.bind(this);
            this.showNextPage = js.fn.wrapper.createSingleInstListener(this.showNextPage, this);
            this.refreshList = js.fn.wrapper.createSingleInstListener(this.refreshList, this);
            globalDomListener.register("passwords_ui", this.listener);
            await this.initDefaultFilter();
            await this.initNewTabDomainMatch();
        }
        async showUI() {
            try {
                await this.init();
                if (this.elem) {
                    this.elem.remove();
                }
                const elem = this.elem = UIUtil.createElem({ preRender: true, template: "#page_passwords" });
                await this.initQuery();
                await this.initSearch();
                await this.initHeader();
                await this.initSyncIcon();
                await this.initAddIcon();
                this.initFilters();
                this.addListeners();
                await this.refreshList();
                if (!this.query.folderId) {
                    await this.passwordDetailsUI.restore();
                }
                js.dom.setContent("#content_tab", elem);
                this.passwordDetailsUI.restoreFocus();
            }
            catch (e) {
                logError(e);
            }
        }
        async showFolderPasswords(folder) {
            pp.mainUI.showCompleteLoading();
            const existingQuery = await zsessionStorage.load(pp.passwordsUI.PP_QUERY_KEY, null) || this.createNewSecretQuery();
            if (!existingQuery.folderId) {
                await zsessionStorage.save(pp.passwordsUI.PP_PRE_FOLDER_KEY, existingQuery);
            }
            const query = this.createNewSecretQuery();
            query.folderId = folder.id;
            await zsessionStorage.saveAll({
                [pp.passwordsUI.PP_QUERY_KEY]: query,
                [pp.passwordsUI.PP_CUR_FODER_NAME]: folder.name
            });
            pp.mainUI.showTab(pp.mainUI.PP_TABS.PASSWORDS);
        }
        async initSearch() {
            const searchElem = js.selector.select("#search");
            searchElem.dataset.on_keyup = "passwords_ui.keyed_search_string";
            const lastTab = searchElem.dataset.last_tab;
            const hasExistingValidSearch = searchElem.value && lastTab &&
                (lastTab == pp.mainUI.PP_TABS.GENERATOR || lastTab == pp.mainUI.PP_TABS.SETTINGS);
            if (hasExistingValidSearch) {
                this.query.search_string = searchElem.value;
                await zsessionStorage.save(pp.passwordsUI.PP_QUERY_KEY, this.query);
            }
            searchElem.value = this.query.search_string || "";
            UIUtil1.inst.showSearchClear(searchElem);
        }
        async initFilters() {
            const query = this.query;
            pp.mainUI.setDomainMatchingIcon(query.domainMatching);
        }
        addListeners() {
            try {
                VUI.keyboard.addUpDownNavigation({
                    parent: js.selector.selectFrom(this.elem, "#secrets_list"),
                    onTopUp() {
                        VUI.input.focus(js.selector.select("#search"));
                    }
                });
            }
            catch (e) {
                logError(e);
            }
        }
        async synced() {
            if (!this.isUIShown()) {
                return;
            }
            this.passwordDetailsUI.disableClose();
            await this.refreshList();
            this.passwordDetailsUI.enableClose();
            this.initAddIcon();
            this.setSyncingIcon(false);
        }
        async syncing() {
            if (!this.isUIShown()) {
                return;
            }
            this.setSyncingIcon(true);
        }
        async refreshList() {
            const query = this.query =
                await zsessionStorage.load(pp.passwordsUI.PP_QUERY_KEY, null) || this.createNewSecretQuery();
            const secretQueryResult = this.queryResult = await bgApi.secret.query(query);
            const secrets = this.displayedSecrets = secretQueryResult.secrets;
            this.updateFilterIndication(query);
            this.passwordDetailsUI.close();
            this.hide("#no_passwords_div", "#no_matching_passwords_div");
            pp.mainUI.hideCompleteLoading();
            const secretsListElem = this.select("#secrets_list");
            const noSecrets = secrets.length == 0;
            if (noSecrets && query.page_no == 0) {
                this.hide("#secrets_list");
                this.showNoPasswordsDiv();
                return;
            }
            const lastActiveSecret = document.activeElement.dataset.secret_id;
            this.show(secretsListElem);
            if (noSecrets) {
                return;
            }
            await this.elemCreator.init();
            const secretListContent = await this.elemCreator.getList(secrets, secretQueryResult);
            const isFirstPage = query.page_no == 0;
            isFirstPage ? js.dom.setContent(secretsListElem, secretListContent) : secretsListElem.append(secretListContent);
            if (secrets.length >= query.rows_per_page) {
                this.addScrollListener();
            }
            if (lastActiveSecret) {
                js.selector.select(`[data-secret_id="${lastActiveSecret}"]`)?.focus?.();
            }
        }
        async secretChanged(secretId) {
            try {
                if (!this.isUIShown()) {
                    return;
                }
                const existingSecretElem = this.select(`#secrets_list [data-secret_id='${secretId}']`);
                if (!existingSecretElem) {
                    return;
                }
                const secret = await bgApi.secret.getSecret(secretId);
                await this.updateSecretDisplayedInList(secret);
            }
            catch (e) {
                logError(e);
            }
        }
        secretsRemoved(secretIds) {
            try {
                if (!this.isUIShown()) {
                    return;
                }
                BasePasswordMoreActionsController.inst.hideIfSelected(secretIds);
                let secretElem = null;
                for (let secretId of secretIds) {
                    secretElem = this.select(`#secrets_list [data-secret_id='${secretId}']`);
                    if (secretElem) {
                        secretElem.remove();
                    }
                }
                const hasRemainingElem = Boolean(this.select("#secrets_list [data-secret_id]"));
                if (hasRemainingElem) {
                    return;
                }
                this.showNoPasswordsDiv();
            }
            catch (e) {
                logError(e);
            }
        }
        async showNextPage() {
            this.query.page_no++;
            await zsessionStorage.save(pp.passwordsUI.PP_QUERY_KEY, this.query);
            await this.refreshList();
        }
        async showNoPasswordsDiv() {
            const noResults = this.filterUI.isQueryFiltered(this.query) || Boolean(this.query.search_string);
            const selector = noResults ? "#no_matching_passwords_div" : "#no_passwords_div";
            const textSelector = selector + " [data-text]";
            this.show(selector, textSelector);
            this.updateNoPasswordFilter(noResults);
            const syncing = await zlocalStorage.load(LocalStorageKeys.SYNCING, false);
            if (syncing && !noResults) {
                pp.mainUI.showCompleteLoading();
                this.hide(textSelector);
            }
            if (!this.query.folderId) {
                return;
            }
            const noResultKey = noResults ? VI18N.NO_PASSWORDS_MATCHING_FOUND_FOLDER : VI18N.NO_PASSWORDS_FOLDER;
            this.text(textSelector, i18n(noResultKey));
        }
        updateFilterIndication(query) {
            const isFiltered = this.filterUI.isQueryFiltered(query);
            const filterCountElem = this.select("[data-filter_counter]");
            const clearFilterElem = "#clear_password_filters";
            if (!isFiltered) {
                this.hide(clearFilterElem, filterCountElem);
                return;
            }
            const filterCount = this.filterUI.countFilters(query);
            filterCountElem.textContent = filterCount + "";
            this.show(clearFilterElem, filterCountElem);
        }
        addScrollListener() {
            try {
                if (this.intersectionObserver) {
                    this.intersectionObserver.disconnect();
                }
                this.intersectionObserver = new IntersectionObserver(this.handleScrollIntersection, {
                    root: document.body,
                    threshold: 0.5
                });
                const secretListElem = this.select("#secrets_list");
                const lastElem = secretListElem.lastElementChild;
                this.intersectionObserver.observe(lastElem);
            }
            catch (e) {
                logError(e);
            }
        }
        handleScrollIntersection(entries, observer) {
            const intersected = entries.some(x => x.isIntersecting);
            if (!intersected) {
                return;
            }
            observer.disconnect();
            this.showNextPage();
        }
        async initHeader() {
            if (!this.query.folderId) {
                return;
            }
            this.show("#back_to_folders");
            const folderName = await zsessionStorage.load(pp.passwordsUI.PP_CUR_FODER_NAME, "");
            this.text("#password_heading", i18n(VI18N.FOLDER) + " - " + folderName);
        }
        async initSyncIcon() {
            try {
                const syncing = await zlocalStorage.load(LocalStorageKeys.SYNCING, false);
                this.setSyncingIcon(syncing);
            }
            catch (e) {
                logError(e);
            }
        }
        setSyncingIcon(syncing) {
            const syncIcon = this.select(PasswordsUIUtil.selector.SYNC_ICON);
            if (syncing) {
                syncIcon.dataset.tooltip_content = i18n(VI18N.SYNCING);
                syncIcon.classList.add(VaultCSS.SYNCING_ANIMATION);
                return;
            }
            syncIcon.classList.remove(VaultCSS.SYNCING_ANIMATION);
            syncIcon.dataset.tooltip_content = i18n(VI18N.SYNC);
        }
        async initAddIcon() {
            try {
                const allowedClassifications = await bgApi.secret.getAddPasswordClassifications();
                if (allowedClassifications.length > 0) {
                    this.enableAddPasswordIcon();
                    return;
                }
                const addPasswordAllowed = await zlocalStorage.load(LocalStorageKeys.ALLOW_ADD_SECRET, true);
                if (!addPasswordAllowed) {
                    this.disableAddPasswordIcon(VI18N.ADD_PASSWORD_RESTRICTED);
                    return;
                }
                this.disableAddPasswordIcon(VI18N.ADD_PERSONAL_ENTERPRISE_PASSWORD_RESTRICTED);
            }
            catch (e) {
                logError(e);
            }
        }
        disableAddPasswordIcon(message) {
            try {
                const addPasswordElem = this.select("#add_password");
                addPasswordElem.classList.add(VaultCSS.DISABLED);
                addPasswordElem.dataset.tooltip_content = i18n(message);
                addPasswordElem.parentElement.dataset.on_click = "";
            }
            catch (e) {
                logError(e);
            }
        }
        enableAddPasswordIcon() {
            try {
                const addPasswordElem = this.select("#add_password");
                addPasswordElem.classList.remove(VaultCSS.DISABLED);
                addPasswordElem.dataset.tooltip_content = i18n(VI18N.ADD_PASSWORD);
                addPasswordElem.parentElement.dataset.on_click = "passwords_ui.clicked_add_password";
            }
            catch (e) {
                logError(e);
            }
        }
        async initQuery() {
            try {
                this.query = await this.loadQuery();
                this.query.page_no = 0;
                this.query.domainMatching = this.query.domainMatching && !this.emptyNewTab;
                await zsessionStorage.save(pp.passwordsUI.PP_QUERY_KEY, this.query);
            }
            catch (e) {
                logError(e);
            }
        }
        getQuery() {
            return this.query;
        }
        async loadQuery() {
            return this.query = (await zsessionStorage.load(pp.passwordsUI.PP_QUERY_KEY, null)) || this.createNewSecretQuery();
        }
        async changeDefaultFilter(filterName) {
            const query = this.createNewSecretQuery();
            this.setDefaultFilterInQuery(filterName, query);
            await zsessionStorage.save(pp.passwordsUI.PP_QUERY_KEY, query);
        }
        async restorePreFolderQuery() {
            const curQuery = await zsessionStorage.load(pp.passwordsUI.PP_QUERY_KEY);
            if (!curQuery || !curQuery.folderId) {
                return;
            }
            const query = (await zsessionStorage.load(pp.passwordsUI.PP_PRE_FOLDER_KEY, null)) ||
                this.createNewSecretQuery();
            await zsessionStorage.save(pp.passwordsUI.PP_QUERY_KEY, query);
        }
        async initDefaultFilter() {
            const existing = await zsessionStorage.load(pp.passwordsUI.PP_QUERY_KEY, null);
            if (existing) {
                return;
            }
            const defaultFilter = await zlocalStorage.load(LocalStorageKeys.DEFAULT_FILTER, "");
            if (!defaultFilter) {
                return;
            }
            await this.changeDefaultFilter(defaultFilter);
        }
        async updateSecretDisplayedInList(secret) {
            try {
                const existingSecretElem = this.select(`#secrets_list [data-secret_id='${secret.id}']`);
                if (!existingSecretElem) {
                    return;
                }
                await this.elemCreator.init();
                const curDisplayedSecret = this.displayedSecrets.find(x => x.id == secret.id);
                if (curDisplayedSecret) {
                    secret.highlight_field = curDisplayedSecret.highlight_field;
                }
                const newSecretElem = await this.elemCreator.createSecretElem({ secret, result: this.queryResult });
                existingSecretElem.replaceWith(newSecretElem);
            }
            catch (e) {
                logError(e);
            }
        }
        showPasswordsFilter() {
            const showFilterElem = this.select("#show_password_filter");
            js.selector.selectFrom(showFilterElem, "a").classList.add("filter-action-icon-list-selected");
            showFilterElem.style.zIndex = "100";
            js.dom.show("#passwords_filter_container", "#password_filter_overlay", "#password_filter_overlay_color_bg");
            this.filterUI.showUI();
        }
        createNewSecretQuery() {
            return SecretQuery.newBuilder().orderByDomainFavourite().build();
        }
        async initNewTabDomainMatch() {
            try {
                const activeTab = await brApi.tab.getActiveTab();
                const isWebsiteUrl = activeTab?.url?.startsWith?.("http");
                this.emptyNewTab = !isWebsiteUrl;
            }
            catch (e) {
                logError(e);
            }
        }
        updateNoPasswordFilter(filtered) {
            try {
                const FILTER_CONTAINER = "[data-applied_filters_container]";
                if (!filtered) {
                    this.hide(FILTER_CONTAINER);
                    return;
                }
                this.filterUI.noPasswordsUI.showUI();
                this.show(FILTER_CONTAINER);
            }
            catch (e) {
                logError(e);
            }
        }
        setDefaultFilterInQuery(filter, query) {
            try {
                const FILTER = zenum.FILTER;
                switch (filter) {
                    case FILTER.ALL:
                        return;
                    case FILTER.FAVOURITES:
                        query.favourite = true;
                        return;
                    case FILTER.DOMAIN_MATCHING:
                        query.domainMatching = true;
                        return;
                    case FILTER.RECENTLY_USED:
                        query.recentlyUsed = true;
                        return;
                    case FILTER.RECENTLY_ADDED:
                        query.recentlyAdded = true;
                        return;
                    case FILTER.PERSONAL:
                        query.classification = SecretClassification.PERSONAL;
                        return;
                    case FILTER.ENTERPRISE:
                        query.classification = SecretClassification.ENTERPRISE;
                        return;
                    case FILTER.SHARED_BY_ME:
                        query.sharing = SecretSharingType.SHARED_BY_ME;
                        return;
                    case FILTER.SHARED_TO_ME:
                        query.sharing = SecretSharingType.SHARED_TO_ME;
                        return;
                    case FILTER.UNSHARED:
                        query.sharing = SecretSharingType.NONE;
                        return;
                    case FILTER.OWNED_BY_ME:
                        query.owned = true;
                        return;
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class Popup {
        async init() {
            await vt.init({ logPrefix: "POPUP:" });
            pp.theme = new PPTheme();
            pp.mainUI = new MainUI();
            pp.passwordsUI = new PasswordsUI();
            pp.foldersUI = new FoldersUI();
            pp.generatorUI = VUI.components.createGeneratorUI();
            pp.bgEventListener = new PPBgEventListener();
            UIUtil.init();
            PopupApiServer.init();
            UIUtil1.inst.init();
            pp.theme.init();
            pp.bgEventListener.init();
        }
    }
    const popup = new Popup();
    setGlobal("popup", popup);

    class DevMain {
        async main() {
            await this.unlockVaultDevMode();
        }
        async unlockVaultDevMode() {
            try {
                const isLoggedIn = await bgApi.login.isLoggedIn();
                if (!isLoggedIn) {
                    return;
                }
                const isUnlocked = await bgApi.login.isUnlocked();
                if (isUnlocked) {
                    return;
                }
                const masterPassword = await zlocalStorage.load(LocalStorageKeys.DEV_MASTER_PASSWORD, "");
                if (!masterPassword) {
                    return;
                }
                await bgApi.login.initLogin();
                const unlocked = await bgApi.login.unlock(masterPassword);
                if (!unlocked) {
                    await zlocalStorage.remove(LocalStorageKeys.DEV_MASTER_PASSWORD);
                }
                window.location.reload();
            }
            catch (e) {
                logError(e);
            }
        }
        async createPopupTab() {
            const tab = await brApi.tab.getCalledContextTab();
            if (tab) {
                return;
            }
            const activeTab = await brApi.tab.getActiveTab();
            if (activeTab.title == "Popup") {
                return;
            }
            const popupTabs = await brApi.tab.queryTabs({ title: "Popup" });
            for (let tab of popupTabs) {
                brApi.tab.closeTab(tab.id);
            }
            await brApi.tab.create("/html/popup.html");
            await js.dom.closeWindow();
        }
    }
    const devMain = new DevMain();

    main();
    class PPMain {
        async main() {
            await popup.init();
            accountsUI.showUI();
            if (isDevMode) {
                await devMain.main();
            }
        }
    }
    const ppMain = new PPMain();
    ppMain.main();

})();
