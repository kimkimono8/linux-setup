export class BgAuditApiImpl {
    async secretAccessed(secretId) {
        bg.vaultAudit.auditSecretAccessed(secretId);
    }
    async fieldViewed(secretId, fieldName) {
        return bg.vaultAudit.fieldViewed(secretId, fieldName);
    }
    async columnViewed(secretId, columnId) {
        return bg.vaultAudit.viewedCustomcolumn(secretId, columnId);
    }
    async totpKeyViewed(secretId) {
        bg.vaultAudit.auditTotpKeyViewed(secretId);
    }
    async fieldCopied(secretId, fieldName) {
        return bg.vaultAudit.fieldCopied(secretId, fieldName);
    }
    async customColumnCopied(secretId, columnId) {
        return bg.vaultAudit.customColumnCopied(secretId, columnId);
    }
    async notesCopied(secretId) {
        return bg.vaultAudit.notesCopied(secretId);
    }
}
