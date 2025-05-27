import { bg } from "../../../../src/bg/bg.js";
import { SecretEditUIInputGetter } from "./SecretEditUIInputGetter.js";
export class SecretEditReEncryptApiInputGetter {
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
                oldValue = await bg.zcrypt.decrypt(historyEntry.oldValue, false);
                encryptedValue = await bg.zcrypt.encrypt(oldValue, true);
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
