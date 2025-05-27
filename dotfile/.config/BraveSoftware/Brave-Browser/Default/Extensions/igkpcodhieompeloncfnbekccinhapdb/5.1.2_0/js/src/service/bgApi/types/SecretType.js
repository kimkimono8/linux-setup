export class SecretType {
    static FIELD_TYPE = {
        TEXT: "text",
        PASSWORD: "password",
        FILE: "file",
        TEXTAREA: "textarea"
    };
    static DEFAULT = {
        WEB_ACCOUNT: "Web Account",
        BANK_ACCOUNT: "Bank Account",
        WINDOWS: "Windows",
        UNIX: "Unix",
        PAYMENT_CARD: "Payment Card",
        SOCIAL_SECURITY_NUMBER: "Social Security Number",
        HEALTH_CARE: "Health Care",
        FILE_STORE: "File Store",
        ADDRESS: "Address"
    };
    id = "";
    name = "";
    added_by = "";
    enabled = true;
    fields = [];
    text_fields = [];
    password_fields = [];
    ui_fields = [];
    excludeAssessment = false;
}
