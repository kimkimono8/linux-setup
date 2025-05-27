import { SecretSearchUtil } from "../../../common/vault/SecretSearchUtil.js";
import { CustomColumnTypeInfo, Secret, SecretFieldHistory, SecretSharingType } from "../../../service/bgApi/types/Secret.js";
import { SecretType } from "../../../service/bgApi/types/SecretType.js";
import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
import { bg } from "../../bg.js";
import { accountDb } from "../../Context.js";
import { VaultCrypto } from "../../crypto/VaultCrypto.js";
const TRUE_STRING = "true";
export class SecretParser {
    userId = "";
    secretTypeMap = {};
    PLUS_VALID_MINS_MS = 1 * 60 * 1000;
    async init() {
        this.userId = await zlocalStorage.load(LocalStorageKeys.USER_ID, "");
        this.secretTypeMap = await accountDb.secretTypeTable.loadMap();
    }
    async parseAll(respSecretList) {
        try {
            await this.init();
            const secrets = [];
            const MAX_COUNT = 250;
            const delayCounter = js.loop.createCyclicCounter(MAX_COUNT, 0.1);
            for (let respSecret of respSecretList) {
                try {
                    secrets.push(await new ParseSecret(this, respSecret).parse());
                }
                catch (e) {
                    console.error(e, respSecret);
                }
                await delayCounter.next();
            }
            return secrets;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async parse(respSecret) {
        await this.init();
        return new ParseSecret(this, respSecret).parse();
    }
}
class ParseSecret {
    p;
    respSecret;
    secret = new Secret();
    constructor(p, respSecret) {
        this.p = p;
        this.respSecret = respSecret;
    }
    async parse() {
        try {
            this.initIds();
            this.secret.logo = this.respSecret.logo || "";
            this.initClassifications();
            this.initSharing();
            this.initAccessControl();
            this.secret.oldValues = this.getSecretHistory();
            this.secret.fetchedOn = Date.now();
            await this.initEncryptedAttributes();
            await this.initEncrypted();
            return this.secret;
        }
        catch (e) {
            throw e;
        }
    }
    initIds() {
        this.secret.id = this.respSecret.secretid;
        this.secret.type_id = this.respSecret.accounttype;
        this.secret.policy_id = this.respSecret.policyid || this.respSecret.POLICYID || "";
        this.secret.user_id = this.respSecret.userid;
        this.secret.oneauth_id = this.respSecret.oneauth_id || "";
    }
    initClassifications() {
        this.secret.created_on = this.respSecret.creationtime;
        this.secret.modifiedOn = this.respSecret.lastmodifiedtime || this.secret.created_on;
        this.secret.classification = this.respSecret.classification;
        this.secret.is_favourite = this.respSecret.isfavourites;
        this.secret.change_password = Boolean(this.respSecret.changepassword);
        this.secret.has_totp = false;
        this.secret.owned = this.respSecret.userid == this.p.userId;
        this.secret.auto_submit = this.respSecret.autosubmit === undefined ? true : this.respSecret.autosubmit;
    }
    initSharing() {
        this.secret.shared = this.respSecret.isshared == Secret.IS_SHARED.YES;
        this.secret.sharing_type = this.respSecret.issharedtousers ? this.respSecret.sharingtype : SecretSharingType.NONE;
        this.secret.sharing_level = this.secret.sharing_type == SecretSharingType.SHARED_TO_ME ? this.respSecret.sharinglevel : Secret.SHARING_LEVEL.MANAGE;
    }
    initAccessControl() {
        this.secret.access_controlled = this.respSecret.accesssctrlconfigured == TRUE_STRING;
        this.secret.display_access_control_icon = this.respSecret.displayaccctrlicon || false;
        this.secret.access_request_status = this.respSecret.requeststatus ? this.respSecret.requeststatus : Secret.ACCESS_CTRL_STATUS.NO_REQUEST_FOUND;
        this.secret.access_request_id = this.respSecret.accessrequestid || "";
    }
    async initEncryptedAttributes() {
        const secretName = await this.getName();
        this.secret.name = secretName;
        this.secret.name_lowercase = secretName.toLowerCase();
        this.secret.urls = await this.getUrls();
        this.secret.valid_urls = this.secret.urls.filter(url => js.url.isValid(url));
        this.secret.tags = await this.getTags();
        this.secret.description = await this.getDescription();
    }
    async getName() {
        try {
            if (!this.respSecret.encsecretname) {
                return this.respSecret.secretname;
            }
            return await bg.zcrypt.decrypt(this.respSecret.encsecretname, this.secret.shared);
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async getUrls() {
        try {
            if (!this.respSecret.encryptedurls) {
                return this.respSecret.secretmultipleurl || (this.respSecret.secreturl ? [this.respSecret.secreturl] : []);
            }
            const urls = [];
            for (let encryptedUrl of this.respSecret.encryptedurls) {
                urls.push(await bg.zcrypt.decrypt(encryptedUrl, this.secret.shared));
            }
            return urls;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async getTags() {
        try {
            const tagString = await this.getDecryptedTags();
            if (!tagString.length) {
                return [];
            }
            const tags = tagString.split(",");
            return tags.filter(x => x.length > 0);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async getDecryptedTags() {
        try {
            if (!this.respSecret.encryptedtags) {
                return this.respSecret.tags || "";
            }
            return await bg.zcrypt.decrypt(this.respSecret.encryptedtags, this.secret.shared);
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async getDescription() {
        try {
            if (!this.respSecret.encdescription) {
                return this.respSecret.description || "";
            }
            return await bg.zcrypt.decrypt(this.respSecret.encdescription, this.secret.shared);
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    getSecretHistory() {
        try {
            const hasNoOldValues = !Boolean(this.respSecret.old_values);
            if (hasNoOldValues) {
                return {};
            }
            const oldValueObj = {};
            let colHisory = null;
            for (let respColHistory of this.respSecret.old_values) {
                colHisory = new SecretFieldHistory();
                colHisory.id = respColHistory.SECRETHISTORY_AUTO_ID;
                colHisory.values = this.getColumnHistoryValues(respColHistory.OLDVALUE);
                oldValueObj[respColHistory.COLUMNNAME] = colHisory;
            }
            return oldValueObj;
        }
        catch (e) {
            logError(e);
            return {};
        }
    }
    getColumnHistoryValues(respOldValueString) {
        try {
            let respHistoryEntries = JSON.parse(respOldValueString);
            const historyEntries = [];
            for (let curRespHistoryEntry of respHistoryEntries) {
                historyEntries.push({
                    oldValue: curRespHistoryEntry.oldvalue,
                    timestamp: curRespHistoryEntry.timestamp
                });
            }
            return historyEntries;
        }
        catch (e) {
            throw e;
        }
    }
    initEncrypted() {
        if (!this.respSecret.secretData || !this.isValidJson(this.respSecret.secretData)) {
            this.secret.encrypted = null;
            return;
        }
        const encrypted = {
            fields: JSON.parse(this.respSecret.secretData),
            totp: this.respSecret.totp || "",
            files: this.respSecret.files ? JSON.parse(this.respSecret.files) : [],
            notes: this.respSecret.notes || "",
            custom_columns: this.respSecret.customcolumn ? JSON.parse(VaultCrypto.decodeBase64(this.respSecret.customcolumn)).customcol : []
        };
        this.secret.encrypted = encrypted;
        this.secret.has_totp = Boolean(encrypted.totp) && encrypted.totp.length > 12;
        this.updateUIField(this.secret);
        this.updateSearchWords(this.secret);
        this.updateCustomColumnTypeInfo(this.secret);
    }
    isValidJson(s = "") {
        try {
            JSON.parse(s);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    updateSearchWords(secret) {
        secret.search_words = SecretSearchUtil.getSearchWords(secret);
    }
    updateUIField(secret) {
        const addUIFields = this.p.secretTypeMap[secret.type_id].ui_fields;
        const uiField = addUIFields.find(x => secret.encrypted.fields[x]);
        if (!uiField) {
            return;
        }
        secret.ui_text = secret.encrypted.fields[uiField];
        secret.uiFieldName = uiField;
    }
    updateCustomColumnTypeInfo(secret) {
        try {
            const hasValidCustomColumns = secret.encrypted && secret.encrypted.custom_columns
                && secret.encrypted.custom_columns.length > 0;
            if (!hasValidCustomColumns) {
                return;
            }
            const allCustomColumnTypeInfos = [];
            let customColumnTypeInfo = null;
            let isReqCustomCol = false;
            for (let customColumn of secret.encrypted.custom_columns) {
                isReqCustomCol = (customColumn.type == SecretType.FIELD_TYPE.TEXT || customColumn.type == SecretType.FIELD_TYPE.PASSWORD)
                    && Boolean(customColumn.colname);
                if (!isReqCustomCol) {
                    continue;
                }
                customColumnTypeInfo = new CustomColumnTypeInfo();
                customColumnTypeInfo.id = customColumn.id;
                customColumnTypeInfo.label = customColumn.colname;
                customColumnTypeInfo.type = customColumn.type;
                allCustomColumnTypeInfos.push(customColumnTypeInfo);
            }
            secret.customColumnTypeInfos = allCustomColumnTypeInfos;
        }
        catch (e) {
            logError(e);
        }
    }
}
