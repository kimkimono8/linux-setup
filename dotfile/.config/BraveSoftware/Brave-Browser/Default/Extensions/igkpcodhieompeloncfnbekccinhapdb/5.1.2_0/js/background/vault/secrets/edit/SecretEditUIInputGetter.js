import { secretUtil } from "../../../../common/util/vault/secretUtil.js";
import { bg } from "../../../../src/bg/bg.js";
import { LocalStorageKeys } from "../../../../src/service/storage/constants/LocalStorageKeys.js";
export class SecretEditUIInputGetter {
    async getInput(secret) {
        try {
            const hasValidLogo = Boolean(secret.logo || secret.domain_logo);
            const logo = hasValidLogo ? secretUtil.getLogoDataUrl(secret.logo || secret.domain_logo) : "";
            const policyId = secret.policy_id || (await zlocalStorage.load(LocalStorageKeys.DEFAULT_POLICY_ID, ""));
            const totpUrl = secret.encrypted.totp ? (await bg.zcrypt.decrypt(secret.encrypted.totp, secret.shared)) : "";
            const notes = secret.encrypted.notes ? await bg.zcrypt.decrypt(secret.encrypted.notes, secret.shared) : "";
            const secretEditUIInput = {
                secretId: secret.id,
                typeId: secret.type_id,
                name: secret.name,
                logo,
                policyId,
                classification: secret.classification,
                plainSecretData: await bg.zcrypt.decryptObject(secret.encrypted.fields, secret.shared),
                notes,
                totpUrl,
                shared: secret.shared,
                urls: secret.urls,
                tags: secret.tags,
                files: secret.encrypted.files,
                description: secret.description,
                customColumns: await this.getDecryptedCustomColumns(secret),
                oneauthId: secret.oneauth_id,
                owned: secret.owned
            };
            return secretEditUIInput;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async getDecryptedCustomColumns(secret) {
        try {
            const customColumns = secret.encrypted.custom_columns;
            const reqCustomColumns = [];
            let reqColumn = null;
            for (let curCustomColumn of customColumns) {
                reqColumn = { ...curCustomColumn };
                reqColumn.value = await bg.zcrypt.decrypt(reqColumn.value, secret.shared);
                reqCustomColumns.push(reqColumn);
            }
            return reqCustomColumns;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
