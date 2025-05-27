import { PageQueryResult } from "../types.js";
import { SecretType } from "./SecretType.js";
export class SecretFieldHistory {
    id = "";
    values = [];
}
export class SecretFieldHistoryEntry {
    oldValue = "";
    timestamp = 0;
}
export var SecretClassification;
(function (SecretClassification) {
    SecretClassification["PERSONAL"] = "P";
    SecretClassification["ENTERPRISE"] = "E";
})(SecretClassification || (SecretClassification = {}));
export var SecretSharingType;
(function (SecretSharingType) {
    SecretSharingType["SHARED_BY_ME"] = "SHARED_BY_ME";
    SecretSharingType["SHARED_TO_ME"] = "SHARED_TO_ME";
    SecretSharingType["NONE"] = "NONE";
})(SecretSharingType || (SecretSharingType = {}));
export class Secret {
    static IS_SHARED = {
        YES: "YES",
        NO: "NO"
    };
    static SHARING_LEVEL = {
        MANAGE: 10,
        LOGIN: 20,
        VIEW: 30,
        MODIFY: 40,
        NONE: -1
    };
    static ACCESS_CTRL_STATUS = {
        NO_REQUEST_FOUND: -1,
        REQUESTED: 0,
        PENDING: 1,
        APPROVED: 2,
        REJECTED: 3,
        CHECK_OUT: 4,
        CHECK_IN: 5,
        REQUEST_TIMED_OUT: 6,
        CANCELED_BY_USER: 7,
        APPROVED_FOR_LATER: 8,
        AUTO_APPROVED: 9,
        IN_USE: 10
    };
    static hasViewPermission(sharingLevel) {
        switch (sharingLevel) {
            case Secret.SHARING_LEVEL.MANAGE:
            case Secret.SHARING_LEVEL.MODIFY:
            case Secret.SHARING_LEVEL.VIEW:
                return true;
            default:
                return false;
        }
    }
    static hasEditPermission(sharingLevel) {
        switch (sharingLevel) {
            case Secret.SHARING_LEVEL.MANAGE:
            case Secret.SHARING_LEVEL.MODIFY:
                return true;
            default:
                return false;
        }
    }
    static hasManagePermission(sharingLevel) {
        return sharingLevel == Secret.SHARING_LEVEL.MANAGE;
    }
    static hasAccess(secret) {
        try {
            if (!secret) {
                throw new Error("empty");
            }
            const accessPresent = secret.owned || !secret.access_controlled || (secret.access_request_status == Secret.ACCESS_CTRL_STATUS.CHECK_OUT);
            return accessPresent;
        }
        catch (e) {
            logError(e);
            throw new Error(e);
        }
    }
    id = "";
    name = "";
    name_lowercase = "";
    is_favourite = false;
    shared = false;
    has_totp = false;
    encrypted = {
        notes: "",
        totp: "",
        fields: {},
        custom_columns: [],
        files: []
    };
    sessionEncryptedData = null;
    type_id = "";
    policy_id = "";
    ui_text = "";
    uiFieldName = "";
    logo = "";
    domain_logo = "";
    created_on = 0;
    modifiedOn = 0;
    auto_submit = true;
    urls = [];
    valid_urls = [];
    tags = [];
    description = "";
    classification = SecretClassification.PERSONAL;
    sharing_type = SecretSharingType.NONE;
    sharing_level = Secret.SHARING_LEVEL.NONE;
    access_controlled = false;
    display_access_control_icon = false;
    access_request_status = Secret.ACCESS_CTRL_STATUS.NO_REQUEST_FOUND;
    access_request_id = "";
    user_id = "";
    change_password = false;
    owned = false;
    fetchedOn = 0;
    sort_weight = 0;
    search_words = [];
    highlight_field = "";
    oldValues = null;
    customColumnTypeInfos = null;
    oneauth_id = "";
}
export class SecretAddPreFillInput {
    name = "";
    logo = "";
    folderId = "";
    newFolderName = "";
    urls = [];
    description = "";
    classification = "";
    texts = [];
    passwords = [];
    typeId = "";
}
export class CardAddPreFillInput {
    name = "";
    card_number = "";
    card_holder_name = "";
    cvv = "";
    valid_thru = "";
    classification = "";
    folderId = "";
    newFolderName = "";
}
export class CustomColumn {
    id;
    type;
    colname;
    value;
}
export class CustomColumnTypeInfo {
    static FIELD_TYPE = {
        TEXT: "text",
        PASSWORD: "password",
        FILE: "file",
        TEXTAREA: "textarea"
    };
    id;
    label;
    type;
}
export class SecretEditUIInput {
    secretId = "";
    typeId = "";
    name = "";
    logo = "";
    policyId = "";
    classification = SecretClassification.PERSONAL;
    plainSecretData = {};
    notes = "";
    totpUrl = "";
    shared = false;
    urls = [];
    tags = [];
    files = [];
    description = "";
    customColumns = [];
    oneauthId;
    owned;
}
export class UpdateFileInput {
    size = 0;
    name = "";
    column = "";
    fileId = "";
    data = "";
}
export class UpdateFileApiInput extends UpdateFileInput {
    secretID = "";
}
export class SecretPageQueryResult extends PageQueryResult {
    secrets = [];
}
export class TrashQueryResult extends PageQueryResult {
    query = null;
    secrets = [];
}
export class SaveFrameData {
    name = "";
    username = "";
    password = "";
    urls = [];
    allowedClassifications = [SecretClassification.PERSONAL, SecretClassification.ENTERPRISE];
}
export class SaveFrameUserInput {
    name = "";
    classification = SecretClassification.PERSONAL;
    newFolderName = "";
    folderId = "";
}
export class SiteFrameSecret {
    id = "";
    name = "";
    logo = "";
    username = "";
    favourite = false;
    hasAccess = false;
    accessControlConfigured = false;
    sharingLevel = Secret.SHARING_LEVEL.MANAGE;
    fillFields = [];
    customColFillFields = [];
    hasTotp = false;
    createdOn = 0;
    autoSubmit = false;
    oneauthId = "";
    highlight_field = "";
}
export class CSFillValue {
    static FIELD_TYPE = {
        TEXT: SecretType.FIELD_TYPE.TEXT,
        PASSWORD: SecretType.FIELD_TYPE.PASSWORD,
        TOTP: "totp"
    };
    allowedDomains = [];
    type = CSFillValue.FIELD_TYPE.TEXT;
    value = "";
    secretId = "";
    shareLevel = Secret.SHARING_LEVEL.MANAGE;
}
export class LoginData {
    static STEP = {
        FILL_USERNAME: "FILL_USERNAME",
        FILL_PASSWORD: "FILL_PASSWORD",
        FILL_TOTP: "FILL_TOTP"
    };
    static MAX_REDIRECT_COUNT = 3;
    secretId = "";
    allowedDomains = [];
    texts = [];
    passwords = [];
    passwordFieldNames = [];
    shareLevel = Secret.SHARING_LEVEL.MANAGE;
    hasTotp = false;
    submit = false;
    step = LoginData.STEP.FILL_USERNAME;
    redirectedCount = 0;
    oneauthId = "";
}
