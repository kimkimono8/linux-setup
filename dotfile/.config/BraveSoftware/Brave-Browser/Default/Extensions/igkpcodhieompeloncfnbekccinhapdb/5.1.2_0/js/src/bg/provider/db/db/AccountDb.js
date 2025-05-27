import { MapTableImpl } from "../accountDb/MapTable.js";
import { NeverSaveTableImpl } from "../accountDb/NeverSaveTable.js";
import { PolicyTableImpl } from "../accountDb/PolicyTable.js";
import { RecordingTableImpl } from "../accountDb/RecordingTable.js";
import { SecretTypeTableImpl } from "../accountDb/SecretTypeTable.js";
import { TagTableImpl } from "../accountDb/TagTable.js";
import { FolderSecretMapTableImpl } from "../accountDb/folder/FolderSecretMapTable.js";
import { FolderTableImpl } from "../accountDb/folder/FolderTable.js";
import { HostRecentSecretTableImpl } from "../accountDb/secret/HostRecentSecretTable.js";
import { RecentSecretTableImpl } from "../accountDb/secret/RecentSecretTable.js";
import { SecretTableImpl } from "../accountDb/secret/SecretTable.js";
import { DomainSecretsTableImpl } from "../accountDb/url/DomainSecretsTable.js";
import { HostnameSecretsTableImpl } from "../accountDb/url/HostnameSecretsTable.js";
import { ParentDomainSecretsTableImpl } from "../accountDb/url/ParentDomainSecretsTable.js";
import { UrlDomainPathTableImpl } from "../accountDb/url/UrlDomainPathTable.js";
import { TABLE_KEY } from "../constants.js";
import { DbHelper } from "../parts/DbHelper.js";
var TABLE_NAME;
(function (TABLE_NAME) {
    TABLE_NAME["NEVER_SAVE"] = "NeverSave";
    TABLE_NAME["POLICY"] = "Policy";
    TABLE_NAME["RECORDING"] = "Recording";
    TABLE_NAME["SECRET_TYPE"] = "SecretType";
    TABLE_NAME["TAG"] = "Tag";
    TABLE_NAME["DOMAIN_SECRETS"] = "DomainSecrets";
    TABLE_NAME["PARENT_DOMAIN_SECRETS"] = "ParentDomainSecrets";
    TABLE_NAME["HOST_SECRETS"] = "HostSecrets";
    TABLE_NAME["URL_DOMAIN_PATH"] = "UrlDomainPath";
    TABLE_NAME["FOLDER_SECRET_MAP"] = "FolderSecretMap";
    TABLE_NAME["FOLDER"] = "Folder";
    TABLE_NAME["HOST_RECENT_SECRET"] = "HostRecentSecret";
    TABLE_NAME["RECENT_SECRET"] = "RecentSecret";
    TABLE_NAME["SECRET"] = "Secret";
    TABLE_NAME["MAP"] = "Map";
})(TABLE_NAME || (TABLE_NAME = {}));
class AccountDbHelperInput {
    name = "Account1";
    version = 1;
    tables = {
        [TABLE_NAME.SECRET]: TABLE_KEY.ID,
        [TABLE_NAME.RECENT_SECRET]: TABLE_KEY.ID,
        [TABLE_NAME.HOST_RECENT_SECRET]: "host",
        [TABLE_NAME.POLICY]: TABLE_KEY.ID,
        [TABLE_NAME.SECRET_TYPE]: TABLE_KEY.ID,
        [TABLE_NAME.FOLDER]: TABLE_KEY.ID,
        [TABLE_NAME.FOLDER_SECRET_MAP]: "folderId",
        [TABLE_NAME.MAP]: TABLE_KEY.KEY,
        [TABLE_NAME.NEVER_SAVE]: TABLE_KEY.DOMAIN,
        [TABLE_NAME.RECORDING]: TABLE_KEY.DOMAIN,
        [TABLE_NAME.DOMAIN_SECRETS]: TABLE_KEY.DOMAIN,
        [TABLE_NAME.HOST_SECRETS]: "hostname",
        [TABLE_NAME.PARENT_DOMAIN_SECRETS]: TABLE_KEY.DOMAIN,
        [TABLE_NAME.TAG]: "tag",
        [TABLE_NAME.URL_DOMAIN_PATH]: TABLE_KEY.DOMAIN,
    };
}
export class AccountDbImpl {
    gg;
    db = new DbHelper();
    constructor(gg) {
        this.gg = gg;
        this.secretTable = new SecretTableImpl(gg);
    }
    policyTable = new PolicyTableImpl();
    secretTypeTable = new SecretTypeTableImpl();
    tagTable = new TagTableImpl();
    mapTable = new MapTableImpl();
    recordingTable = new RecordingTableImpl();
    secretTable;
    recentSecretTable = new RecentSecretTableImpl();
    hostRecentSecretTable = new HostRecentSecretTableImpl();
    neverSaveTable = new NeverSaveTableImpl();
    folderTable = new FolderTableImpl();
    folderSecretMapTable = new FolderSecretMapTableImpl();
    domainSecretsTable = new DomainSecretsTableImpl();
    parentDomainSecretsTable = new ParentDomainSecretsTableImpl();
    hostnameSecretsTable = new HostnameSecretsTableImpl();
    urlDomainPathTable = new UrlDomainPathTableImpl();
    async init() {
        try {
            await this.db.init(new AccountDbHelperInput());
            const initObjMapping = {
                [TABLE_NAME.SECRET]: this.secretTable,
                [TABLE_NAME.RECENT_SECRET]: this.recentSecretTable,
                [TABLE_NAME.HOST_RECENT_SECRET]: this.hostRecentSecretTable,
                [TABLE_NAME.POLICY]: this.policyTable,
                [TABLE_NAME.SECRET_TYPE]: this.secretTypeTable,
                [TABLE_NAME.FOLDER]: this.folderTable,
                [TABLE_NAME.FOLDER_SECRET_MAP]: this.folderSecretMapTable,
                [TABLE_NAME.MAP]: this.mapTable,
                [TABLE_NAME.NEVER_SAVE]: this.neverSaveTable,
                [TABLE_NAME.RECORDING]: this.recordingTable,
                [TABLE_NAME.DOMAIN_SECRETS]: this.domainSecretsTable,
                [TABLE_NAME.HOST_SECRETS]: this.hostnameSecretsTable,
                [TABLE_NAME.PARENT_DOMAIN_SECRETS]: this.parentDomainSecretsTable,
                [TABLE_NAME.TAG]: this.tagTable,
                [TABLE_NAME.URL_DOMAIN_PATH]: this.urlDomainPathTable,
            };
            for (let tableName in initObjMapping) {
                initObjMapping[tableName].init({ db: this.db, name: tableName });
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
