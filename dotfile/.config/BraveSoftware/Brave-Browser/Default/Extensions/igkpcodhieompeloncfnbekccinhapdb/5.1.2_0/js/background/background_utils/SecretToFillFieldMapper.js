import { accountDb } from "../../src/bg/Context.js";
import { Secret } from "../../src/service/bgApi/types/Secret.js";
import { SecretType } from "../../src/service/bgApi/types/SecretType.js";
export class SecretToFillFieldMapper {
    secretTypeMap = null;
    async map(secrets) {
        try {
            this.secretTypeMap = await accountDb.secretTypeTable.loadMap();
            const mappedSecrets = [];
            let mappedSecret = null;
            for (let secret of secrets) {
                try {
                    mappedSecret = await this.mapSecret(secret);
                    if (!mappedSecret) {
                        continue;
                    }
                    mappedSecrets.push(mappedSecret);
                }
                catch (e) {
                    logError(e);
                }
            }
            return mappedSecrets;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async mapSecret(secret) {
        secret;
        return null;
    }
    getFillFields(secret) {
        try {
            if (!Secret.hasViewPermission(secret.sharing_level)) {
                return [];
            }
            const fillFields = [];
            const secretTypeFields = this.getFillFieldsFn(secret.type_id);
            for (let field of secretTypeFields) {
                fillFields.push({
                    name: field.name,
                    label: field.label
                });
            }
            return fillFields;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    getCustomColFillFields(secret) {
        try {
            if (!Secret.hasViewPermission(secret.sharing_level)) {
                return [];
            }
            const fillFields = [];
            const allCustomColInfo = secret.customColumnTypeInfos;
            if (!allCustomColInfo || allCustomColInfo.length == 0) {
                return [];
            }
            for (let customColInfo of allCustomColInfo) {
                fillFields.push({
                    name: customColInfo.id,
                    label: customColInfo.label
                });
            }
            return fillFields;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    getFillFieldsFn(typeId) {
        try {
            const secretType = this.secretTypeMap[typeId];
            const fields = [];
            for (let field of secretType.fields) {
                if (field.isDeleted) {
                    continue;
                }
                switch (field.type) {
                    case SecretType.FIELD_TYPE.TEXT:
                    case SecretType.FIELD_TYPE.PASSWORD:
                        fields.push(field);
                        break;
                }
            }
            return fields;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
