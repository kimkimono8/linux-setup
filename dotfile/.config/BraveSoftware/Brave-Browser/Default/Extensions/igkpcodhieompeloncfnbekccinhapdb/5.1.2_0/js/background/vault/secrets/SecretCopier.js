import { bg } from "../../../src/bg/bg.js";
import { accountDb } from "../../../src/bg/Context.js";
export class SecretCopier {
    p;
    async copyTotp(secretId) {
        try {
            const totp = await this.p.getTotp(secretId);
            await bg.clipboard.copy(totp);
            bg.vaultAudit.totpCopied(secretId);
            accountDb.recentSecretTable.update(secretId);
        }
        catch (e) {
            logError(e);
        }
    }
    async copyField(secretId, field_name) {
        try {
            const secret = await this.p.secretGetter.getSecret(secretId);
            const field_val_encrypted = secret.encrypted.fields[field_name];
            const field_val = await bg.zcrypt.decrypt(field_val_encrypted, secret.shared);
            await bg.clipboard.copy(field_val);
            bg.vaultAudit.fieldCopied(secret.id, field_name);
            accountDb.recentSecretTable.update(secretId);
        }
        catch (e) {
            logError(e);
        }
    }
    async copyCustomField(secretId, column_id) {
        try {
            const secret = await this.p.secretGetter.getSecret(secretId);
            const column = secret.encrypted.custom_columns.find(x => x.id == column_id);
            const value = await bg.zcrypt.decrypt(column.value, secret.shared);
            await bg.clipboard.copy(value);
            bg.vaultAudit.customColumnCopied(secretId, column_id);
            accountDb.recentSecretTable.update(secretId);
        }
        catch (e) {
            logError(e);
        }
    }
    async copyOneauthTotp(secretId, totp) {
        try {
            await bg.clipboard.copy(totp);
            bg.vaultAudit.totpCopied(secretId);
            accountDb.recentSecretTable.update(secretId);
        }
        catch (e) {
            logError(e);
        }
    }
}
