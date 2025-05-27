import { SiteFrameSecretQuery } from "../../../src/service/bgApi/types.js";
import { LocalStorageKeys } from "../../../src/service/storage/constants/LocalStorageKeys.js";
import { TabStorageKeys } from "../../../src/service/storage/constants/TabStorageKeys.js";
export class SFPasswordsCli {
    static instance = null;
    constructor() { }
    static get inst() {
        return this.instance || (this.instance = new SFPasswordsCli());
    }
    query = null;
    setSearchString(s) {
        try {
            this.query.search_string = s;
            this.query.page_no = 0;
            ztabStorage.save(TabStorageKeys.SF_SEARCH_STRING, s);
        }
        catch (e) {
            logError(e);
        }
    }
    async loadSearchString() {
        try {
            return await ztabStorage.load(TabStorageKeys.SF_SEARCH_STRING, "");
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async isSyncing() {
        try {
            return await zlocalStorage.load(LocalStorageKeys.SYNCING, false);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    initQuery(searchString) {
        this.query = new SiteFrameSecretQuery();
        this.query.search_string = searchString;
    }
    getQuery() {
        return this.query;
    }
    async getSecrets(query) {
        try {
            const secrets = await bgApi.siteFrame.getSecrets(query);
            return secrets;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
