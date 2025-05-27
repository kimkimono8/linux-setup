import { bg } from "../../src/bg/bg.js";
export class BgCardFrame {
    async getCardListSecrets(query) {
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
    async fillCard(tabId, frameId, secret) {
        try {
            csApi.frame.closeCardFrame(tabId);
            await bg.vaultSecrets.secretLogin.cardFill(tabId, frameId, secret);
        }
        catch (e) {
            logError(e);
        }
    }
    async fillCardIframe(tabId, frameId, secretId, data) {
        try {
            csApi.frame.closeCardFrame(tabId);
            await bg.vaultSecrets.secretLogin.cardFillIframe(tabId, frameId, secretId, data);
        }
        catch (e) {
            logError(e);
        }
    }
}
