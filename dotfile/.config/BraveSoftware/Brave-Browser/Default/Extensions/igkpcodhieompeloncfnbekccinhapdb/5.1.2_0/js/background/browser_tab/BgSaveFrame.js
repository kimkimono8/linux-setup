import { bg } from "../../src/bg/bg.js";
import { accountDb } from "../../src/bg/Context.js";
import { logoGetter } from "../../src/bg/logo/export.js";
import { bgStorage } from "../../src/bg/storage/export.js";
import { SaveFrameData, SecretAddPreFillInput } from "../../src/service/bgApi/types/Secret.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
export class BgSaveFrame {
    async show(saveCredential, tabId) {
        try {
            const saveFrameData = new SaveFrameData();
            saveFrameData.name = await bg.vaultSecrets.secretUtil.suggestNewName({ url: saveCredential.urls[0] });
            saveFrameData.username = saveCredential.username;
            saveFrameData.password = saveCredential.password;
            saveFrameData.urls = saveCredential.urls;
            saveFrameData.allowedClassifications = await bg.vaultConfig.getAddPasswordClassifications();
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
            await bg.ztabHandler.addPassword(prefillInput);
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
                typeId: (await bg.vaultSecretTypes.getWebAccountType()).id,
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
            const secret = await bg.vaultSecrets.secretAdd.addSecret(addSecretInput);
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
