import { formUtil } from "../../../common/util/formUtil.js";
import { SecretQuery } from "../../service/bgApi/types/SecretQuery.js";
import { SecretType } from "../../service/bgApi/types/SecretType.js";
import { LocalStorageKeys } from "../../service/storage/constants/LocalStorageKeys.js";
import { accountDb, vapi } from "../Context.js";
export class VaultSecretTypes {
    async sync() {
        try {
            const resp = (await vapi.getAllSecretTypes()).result;
            const respSecretTypes = resp.operation.Details.secret_types;
            const secretTypeList = [];
            const systemDefinedTypes = [];
            for (let curRespSecretType of respSecretTypes) {
                try {
                    const secretType = new SecretType();
                    secretType.name = curRespSecretType.secret_type_name;
                    secretType.id = curRespSecretType.secret_type_id;
                    if (curRespSecretType.added_by) {
                        secretType.added_by = curRespSecretType.added_by.zuid;
                    }
                    secretType.enabled = curRespSecretType.status;
                    secretType.fields = curRespSecretType.secret_type_fields;
                    secretType.excludeAssessment = curRespSecretType.exclude_password_assessment;
                    this.fillInitialSecretType(secretType);
                    secretTypeList.push(secretType);
                    if (curRespSecretType.is_system_defined) {
                        systemDefinedTypes.push(secretType);
                    }
                }
                catch (e) {
                    logError(e);
                }
            }
            this.updateStandardTypeIds(systemDefinedTypes);
            await accountDb.secretTypeTable.saveAll(secretTypeList);
        }
        catch (e) {
            logError(e);
        }
    }
    async getWebAccountType() {
        try {
            const secretTypes = await accountDb.secretTypeTable.loadAll();
            const webAccountType = secretTypes.find(x => (x.name == "Web Account") && (x.added_by == ""));
            if (webAccountType) {
                return webAccountType;
            }
            for (let secretType of secretTypes) {
                if (secretType.password_fields.length > 0 && secretType.text_fields.length > 0) {
                    return secretType;
                }
            }
            return secretTypes[0] || new SecretType();
        }
        catch (e) {
            logError(e);
            return new SecretType();
        }
    }
    async getCardType() {
        try {
            const paymentCardId = await formUtil.getPaymentCardCategoryId();
            if (!paymentCardId) {
                return null;
            }
            return await accountDb.secretTypeTable.load(paymentCardId);
        }
        catch (e) {
            logError(e);
            return new SecretType();
        }
    }
    async getMap() {
        try {
            return accountDb.secretTypeTable.loadMap();
        }
        catch (e) {
            logError(e);
            return {};
        }
    }
    async getCountMap() {
        try {
            const map = await this.getMap();
            const secrets = await accountDb.secretTable.loadAll();
            const countMap = {};
            for (let secret of secrets) {
                countMap[secret.type_id] = (countMap[secret.type_id] || 0) + 1;
            }
            const resp = {
                countMap,
                map
            };
            return resp;
        }
        catch (e) {
            logError(e);
            throw e;
        }
    }
    fillInitialSecretType(secret_type) {
        secret_type.text_fields = secret_type.fields.filter(x => !x.isDeleted && x.type == SecretType.FIELD_TYPE.TEXT);
        secret_type.password_fields = secret_type.fields.filter(x => !x.isDeleted && x.type == SecretType.FIELD_TYPE.PASSWORD);
        secret_type.ui_fields = secret_type.text_fields.filter(x => !x.pii).map(x => x.name);
    }
    async getExistingSecretType(url) {
        try {
            const query = SecretQuery.newBuilder().rowsPerPage(-1).domainMatching(true, url).noLogo(true).orderByHostRecent().build();
            const queryResult = await bg.vaultSecrets.secretQuerier.query(query);
            if (queryResult.secrets.length == 0) {
                return null;
            }
            const secret = queryResult.secrets[0];
            return await accountDb.secretTypeTable.load(secret.type_id);
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    updateStandardTypeIds(systemTypes) {
        try {
            for (let secretType of systemTypes) {
                switch (secretType.name) {
                    case "Payment Card":
                        zlocalStorage.save(LocalStorageKeys.PAYMENT_CARD_TYPE_ID, secretType.id);
                        break;
                    case "Address":
                        zlocalStorage.save(LocalStorageKeys.ADDRESS_TYPE_ID, secretType.id);
                        break;
                }
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
