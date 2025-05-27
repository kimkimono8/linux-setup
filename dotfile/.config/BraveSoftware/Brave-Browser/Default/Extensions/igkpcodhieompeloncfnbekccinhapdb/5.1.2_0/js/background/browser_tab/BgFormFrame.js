export class BgFormFrame {
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
