export class SecretAccessControlTimeRange {
    from = new SecretAccessControlTime();
    to = new SecretAccessControlTime();
}
export class SecretAccessControlTime {
    hours = 0;
    minutes = 0;
}
export class SecretAccessControlAutoApproveInfo {
    byTicket = false;
    weekDays = false;
    weekEnds = false;
    timeRange = null;
}
export class VaultUser {
    userAutoId = "";
    zuid = "";
    name = "";
    email = "";
}
export class ThirdPartyShareInput {
    secretId = "";
    thirdPartyEmail = "";
    allowedTime = 0;
    message = "";
}
export class ThirdPartyShareOutput {
    passphrase = "";
}
export var FilterType;
(function (FilterType) {
    FilterType["ALL"] = "ALL";
    FilterType["ANY"] = "ANY";
})(FilterType || (FilterType = {}));
;
export class PageQuery {
    page_no = 0;
    rows_per_page = 50;
    search_string = "";
}
export class PageQueryBuilder {
    query;
    constructor(query) {
        this.query = query;
    }
    build() {
        return this.query;
    }
    pageNo(pageNo) {
        this.query.page_no = pageNo;
        return this;
    }
    rowsPerPage(rowsPerPage) {
        this.query.rows_per_page = rowsPerPage;
        return this;
    }
    searchString(searchString) {
        this.query.search_string = searchString;
        return this;
    }
}
export class PageQueryResult {
    query = null;
    total_count = 0;
}
export class TagQuery extends PageQuery {
    excludeTags = [];
}
export class TagQueryResult extends PageQueryResult {
    tags = [];
}
export class TrashQuery extends PageQuery {
    static createDefaultQuery() {
        return new TrashQuery();
    }
}
export class PasswordHistoryModel {
    static TYPE = {
        TEXT: "TEXT",
        PASSWORD: "PASSWORD"
    };
    columnName = "";
    columnLabel = "";
    history = [];
    type = "";
}
export class SaveCredential {
    username = "";
    password = "";
    urls = [];
}
export class SiteFrameSecretQuery extends PageQuery {
}
export class FillField {
    name = "";
    label = "";
}
export class ChangedCredential {
    oldPassword = "";
    newPassword = "";
}
export class ChangedLoginPassword {
    secretId = "";
    passwordFieldName = "";
    newPassword = "";
}
export class ConfirmUsageDomain {
    secretId = "";
    frameId = 0;
    ownedDomain = "";
    useDomain = "";
    allowPermanent = false;
}
export class ResetStep {
    id_func = "";
    id_type = "";
    id_value = "";
}
export class PasswordResetInfo {
    static MAX_WAIT_TIME_MS = 1 * 60 * 1000;
    secretId = "";
    fieldName = "";
    userName = "";
    oldPassword = "";
    newPassword = "";
    steps = [];
    currentStepIndex = 0;
    expiresIn = 0;
}
export class UpdateFrameData {
    secretId = "";
    name = "";
    username = "";
    password = "";
    usernameField = new FillField();
    passwordField = new FillField();
    urls = [];
}
export class UnlockMethod {
    static MASTER = "MASTER";
    static ONEAUTH = "ONEAUTH";
    static WEBAUTHN = "WEBAUTHN";
}
export class WebAuthnCredentialResponse {
    credentialId;
    signature;
    clientData;
    authData;
    constructor(credentialId, signature, clientData, authData) {
        this.credentialId = credentialId;
        this.signature = signature;
        this.clientData = clientData;
        this.authData = authData;
    }
    static newInstance(input) {
        return new WebAuthnCredentialResponse(input.credentialId, input.signature, input.clientData, input.authData);
    }
}
