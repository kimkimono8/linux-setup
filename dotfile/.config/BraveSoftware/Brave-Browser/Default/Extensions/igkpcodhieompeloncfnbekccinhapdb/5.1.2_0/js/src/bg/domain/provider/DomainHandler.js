import { zenum } from "../../../../common/enum/zenum.js";
import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
import { badgeMenuHandler } from "../../activeTab/Context.js";
import { accountDb } from "../../Context.js";
import { AddressBarQuerierImpl } from "./AddressBarQuerier.js";
import { DomainParser } from "./DomainParser.js";
import { DomainRowMapper } from "./DomainRowMapper.js";
export class DomainHandlerImpl {
    mode;
    parser = new DomainParser();
    addressBarQuerier = new AddressBarQuerierImpl();
    async init() {
        try {
            this.getDomainMatchingIdsFor = js.fn.wrapper.createSingleInstance(this.getDomainMatchingIdsFor, this);
            this.addressBarQuerier.init();
            this.mode = await this.loadDomainMatchMode();
            await badgeMenuHandler.init();
        }
        catch (e) {
            logError(e);
        }
    }
    async modeChanged() {
        try {
            this.mode = await this.loadDomainMatchMode();
            await this.reCreate();
        }
        catch (e) {
            logError(e);
        }
    }
    async addAll(secrets) {
        try {
            const rowsObj = await new DomainRowMapper().parse(secrets);
            accountDb.urlDomainPathTable.saveAll(secrets, true);
            await Promise.all([
                accountDb.domainSecretsTable.saveAll(rowsObj.domainRows, true),
                accountDb.parentDomainSecretsTable.saveAll(rowsObj.parentDomainRows, true),
                accountDb.hostnameSecretsTable.saveAll(rowsObj.hostnameRows, true),
            ]);
        }
        catch (e) {
            logError(e);
        }
    }
    async add(_secret) {
        return this.reCreate();
    }
    async getDomainMatchingIds(params) {
        try {
            if (params.url) {
                return this.getDomainMatchingIdsFor(params.url);
            }
            const activeTab = await brApi.tab.getActiveTab();
            if (!activeTab) {
                return [];
            }
            return this.getDomainMatchingIdsFor(activeTab.url);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async getDomainMatchingCount() {
        try {
            const secretIds = await this.getDomainMatchingIds({});
            return secretIds.length;
        }
        catch (e) {
            logError(e);
            return 0;
        }
    }
    async isDomainMatchingId(secretId, url) {
        try {
            const ids = await this.getDomainMatchingIdsFor(url);
            return ids.includes(secretId);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    mapUrl(url) {
        return this.parser.mapUrl(url);
    }
    async isLoginDomainPath(url) {
        try {
            if (!url) {
                return false;
            }
            const urlObj = new URL(url);
            const paths = await accountDb.urlDomainPathTable.load(urlObj.hostname);
            return paths.includes(urlObj.pathname);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async getDomainMatchingIdsFor(url) {
        try {
            if (!js.url.isValid(url)) {
                return [];
            }
            const domain = this.parser.mapUrl(url);
            return await accountDb.domainSecretsTable.load(domain);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async reCreate() {
        try {
            const secrets = await accountDb.secretTable.loadAll();
            await this.addAll(secrets);
            await badgeMenuHandler.refresh();
        }
        catch (e) {
            logError(e);
        }
    }
    async loadDomainMatchMode() {
        const defaultModeObj = {
            scheme: false,
            subDomain: false,
            port: false,
            path: false,
        };
        try {
            const existing = await zlocalStorage.load(LocalStorageKeys.DOMAIN_MATCH_MODE, "");
            if (existing) {
                return existing;
            }
            const domainMatchingMode = await zlocalStorage.load(LocalStorageKeys.DOMAIN_MATCHING_MODE_OLD, zenum.DOMAIN_MATCHING_MODE.PARENT_DOMAIN);
            return {
                subDomain: domainMatchingMode == zenum.DOMAIN_MATCHING_MODE.HOSTNAME
            };
        }
        catch (e) {
            logError(e);
            return defaultModeObj;
        }
    }
}
