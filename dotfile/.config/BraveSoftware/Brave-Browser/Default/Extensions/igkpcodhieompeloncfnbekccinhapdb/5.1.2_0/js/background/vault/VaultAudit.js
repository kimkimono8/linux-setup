import { bg } from "../../src/bg/bg.js";
import { accountDb } from "../../src/bg/Context.js";
import { SecretType } from "../../src/service/bgApi/types/SecretType.js";
import { STRING } from "../../src/vutil/export.js";
import { VaultApi } from "../server_api/VaultApi.js";
export class VaultAudit {
    async fieldViewed(secretId, fieldName) {
        return new SecretAudit({
            action: SecretAuditAction.VIEWED,
            label: {
                type: SecretAuditLabelType.FIELD,
                value: { fieldName }
            },
            secretId
        }).audit();
    }
    async viewedCustomcolumn(secretId, columnId) {
        return new SecretAudit({
            action: SecretAuditAction.VIEWED,
            label: {
                type: SecretAuditLabelType.CUSTOM_COL,
                value: { columnId }
            },
            secretId
        }).audit();
    }
    async auditSecretAccessed(secretId) {
        try {
            const secret = await bg.vaultSecrets.secretGetter.getDbSecret(secretId);
            const MAX_TIME_SECONDS = 3;
            const elapsedSeconds = (Date.now() - secret.fetchedOn) / 1000;
            if (elapsedSeconds < MAX_TIME_SECONDS) {
                return;
            }
            await VaultApi.post("/api/rest/json/v1/audit/secrets/accessed", "secretid=" + secretId);
        }
        catch (e) {
            logError(e);
        }
    }
    async fieldCopied(secretId, fieldName) {
        return new SecretAudit({
            action: SecretAuditAction.COPIED,
            label: {
                type: SecretAuditLabelType.FIELD,
                value: { fieldName }
            },
            secretId
        }).audit();
    }
    async totpCopied(secretId) {
        return new SecretAudit({
            action: SecretAuditAction.COPIED,
            label: {
                type: SecretAuditLabelType.TOTP,
            },
            secretId
        }).audit();
    }
    async notesCopied(secretId) {
        return new SecretAudit({
            action: SecretAuditAction.COPIED,
            label: {
                type: SecretAuditLabelType.NOTES,
            },
            secretId
        }).audit();
    }
    async auditTotpKeyViewed(secretId) {
        await VaultApi.post("/api/rest/json/v1/audit/secrets/viewedtotp", "secretid=" + secretId);
    }
    async customColumnCopied(secretId, columnId) {
        return new SecretAudit({
            action: SecretAuditAction.COPIED,
            label: {
                type: SecretAuditLabelType.CUSTOM_COL,
                value: { columnId }
            },
            secretId
        }).audit();
    }
    async auditLogin(secretId) {
        return new SecretMAudit({
            type: SecretMAuditType.SECRET_ACCESSED,
            secretId,
            message: "Login attempt made",
        }).audit();
    }
    async auditFill(secretId) {
        return new SecretMAudit({
            type: SecretMAuditType.SECRET_ACCESSED,
            secretId,
            message: "Password Filled",
        }).audit();
    }
    async auditFillField(secretId, fieldLabel) {
        return new SecretMAudit({
            type: SecretMAuditType.SECRET_ACCESSED,
            secretId,
            message: "Filled " + fieldLabel,
        }).audit();
    }
    async auditResetPasswordInitiated(secretId) {
        return new SecretMAudit({
            type: SecretMAuditType.PASSCHANGE_INITIATED,
            secretId,
        }).audit();
    }
    async auditResetPasswordSuccess(secretId) {
        return new SecretMAudit({
            type: SecretMAuditType.PASSCHANGE_SUCCESS,
            secretId,
        }).audit();
    }
    async auditResetPasswordFailure(secretId) {
        return new SecretMAudit({
            type: SecretMAuditType.PASSCHANGE_FAILED,
            secretId,
        }).audit();
    }
}
var SecretAuditAction;
(function (SecretAuditAction) {
    SecretAuditAction["COPIED"] = "copied";
    SecretAuditAction["VIEWED"] = "viewed";
})(SecretAuditAction || (SecretAuditAction = {}));
var SecretAuditLabelType;
(function (SecretAuditLabelType) {
    SecretAuditLabelType["FIELD"] = "FIELD";
    SecretAuditLabelType["TOTP"] = "TOTP";
    SecretAuditLabelType["NOTES"] = "NOTES";
    SecretAuditLabelType["CUSTOM_COL"] = "CUSTOM_COL";
})(SecretAuditLabelType || (SecretAuditLabelType = {}));
class SecretAudit {
    param;
    constructor(param) {
        this.param = param;
    }
    async audit() {
        try {
            const labelValueGetter = new LabelValueGetter(this.param);
            const label = await labelValueGetter.getLabel();
            const input = {
                secretid: this.param.secretId,
                name: label,
                isPassField: labelValueGetter.isPasswordField ? STRING.TRUE : STRING.FALSE
            };
            await VaultApi.post(this.getEndpoint(), input);
        }
        catch (e) {
            logError(e);
        }
    }
    getEndpoint() {
        return `/api/rest/json/v1/audit/secrets/${this.param.action}`;
    }
}
class LabelValueGetter {
    param;
    isPasswordField = false;
    constructor(param) {
        this.param = param;
    }
    async getLabel() {
        try {
            switch (this.param.label.type) {
                case SecretAuditLabelType.FIELD:
                    return this.getFieldLabel();
                case SecretAuditLabelType.CUSTOM_COL:
                    return this.getCustomColLabel();
                case SecretAuditLabelType.NOTES:
                    return "Notes";
                case SecretAuditLabelType.TOTP:
                    return "TOTP";
                default:
                    throw "NEW_CASE";
            }
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async getFieldLabel() {
        try {
            const secret = await bg.vaultSecrets.secretGetter.getDbOrTrashedSecret(this.param.secretId);
            const secretType = await accountDb.secretTypeTable.load(secret.type_id);
            const secretTypeField = secretType.fields.find(x => x.name == this.param.label.value.fieldName);
            if (!secretTypeField) {
                throw "cannot find secret type field";
            }
            this.isPasswordField = secretTypeField.type == SecretType.FIELD_TYPE.PASSWORD;
            return secretTypeField.label;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async getCustomColLabel() {
        try {
            const secret = await bg.vaultSecrets.secretGetter.getSecret(this.param.secretId);
            const column = secret.encrypted.custom_columns.find(x => x.id == this.param.label.value.columnId);
            if (!column) {
                throw "cannot find column";
            }
            this.isPasswordField = column.type == SecretType.FIELD_TYPE.PASSWORD;
            return column.colname;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
var SecretMAuditType;
(function (SecretMAuditType) {
    SecretMAuditType["SECRET_ACCESSED"] = "SecretAccessed";
    SecretMAuditType["PASSCHANGE_INITIATED"] = "AutoPasswordChangeInitiated";
    SecretMAuditType["PASSCHANGE_SUCCESS"] = "AutoPasswordChangeSuccess";
    SecretMAuditType["PASSCHANGE_FAILED"] = "AutoPasswordChangeFailed";
})(SecretMAuditType || (SecretMAuditType = {}));
class SecretMAudit {
    param;
    constructor(param) {
        this.param = param;
    }
    async audit() {
        try {
            const secret = await accountDb.secretTable.get(this.param.secretId);
            const input = {
                operatedOnId: this.param.secretId,
                operatedOnName: secret.name,
                operationType: this.param.type,
                scope: 2,
                reason: this.param.message || "",
            };
            const inputData = JSON.stringify({ operationDetails: [input] });
            const body = "INPUT_DATA=" + encodeURIComponent(inputData);
            await VaultApi.post("/api/json/audit?OPERATION_NAME=M_AUDIT", body);
        }
        catch (e) {
            logError(e);
        }
    }
}
