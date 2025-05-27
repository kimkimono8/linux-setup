import { bg } from "../../src/bg/bg.js";
import { accountDb } from "../../src/bg/Context.js";
import { FilledFormData } from "../../src/csApi/service/types.js";
import { SecretAddPreFillInput } from "../../src/service/bgApi/types/Secret.js";
export class ZTabPasswordAdd {
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
            return await bg.vaultSecretTypes.getExistingSecretType(tabUrl);
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
                (await bg.vaultSecretTypes.getWebAccountType());
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
