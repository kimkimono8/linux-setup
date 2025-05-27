import { PasswordHistoryModelBuilder } from "../../../common/ui/model/PasswordHistoryModel.js";
import { bg } from "../../../src/bg/bg.js";
import { PasswordHistoryModel } from "../../../src/service/bgApi/types.js";
import { VaultApi } from "../../server_api/VaultApi.js";
export class PasswordHistory {
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
        const isShared = (await bg.vaultSecrets.secretGetter.getDbOrTrashedSecret(secretId)).shared;
        for (let history of historyList) {
            for (let entry of history.history) {
                entry.value = await bg.zcrypt.decrypt(entry.value, isShared);
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
