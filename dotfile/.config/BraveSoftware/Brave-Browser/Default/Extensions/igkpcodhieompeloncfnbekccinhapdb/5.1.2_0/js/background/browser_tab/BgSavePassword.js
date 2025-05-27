import { bg } from "../../src/bg/bg.js";
import { accountDb } from "../../src/bg/Context.js";
import { bgStorage } from "../../src/bg/storage/export.js";
import { Secret, SecretSharingType } from "../../src/service/bgApi/types/Secret.js";
import { SecretQuery } from "../../src/service/bgApi/types/SecretQuery.js";
import { SecretType } from "../../src/service/bgApi/types/SecretType.js";
import { TabDomainStorageKeys } from "../../src/service/storage/constants/TabDomainStorageKeys.js";
export class BgSavePassword {
    async saveCredential(saveCredential, tabId) {
        try {
            await this.clearSavedData(tabId);
            const noSave = await bg.neverSaveChecker.checkNoNeedAutoSaveUpdate(tabId, saveCredential.urls[0]);
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
            const allowedClassifications = await bg.vaultConfig.getAddPasswordClassifications();
            const noValidClassification = allowedClassifications.length == 0;
            if (noValidClassification) {
                return;
            }
            await bg.saveFrame.show(saveCredential, tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async disableSave(tabId) {
        try {
            await bg.saveFrame.close({}, tabId);
            await bg.updateFrame.close({}, tabId);
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
            const noSave = await bg.neverSaveChecker.checkNoNeedAutoSaveUpdate(tab.id, tab.url);
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
            bg.updateFrame.show(saveCredential, reqUpdateSecret, tab.id);
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
                await bg.updateFrame.show(saveCredential, secretToUpdate, tabId);
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
                plainText = await bg.zcrypt.decrypt(secret.encrypted.fields[field.name], secret.shared);
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
                        (await bg.zcrypt.decrypt(curSecret.encrypted.fields[curFieldName], curSecret.shared) == fieldValue);
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
                        (await bg.zcrypt.decrypt(curSecret.encrypted.fields[curFieldName], curSecret.shared) == fieldValue);
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
            const queryResult = await bg.vaultSecrets.secretQuerier.query(secretQuery);
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
