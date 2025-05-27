import { zenum } from "../../common/enum/zenum.js";
import { BasePasswordMoreActionsController } from "../../common/ui/components/BasePasswordMoreActionsController.js";
import { globalDomListener } from "../../common/ui/globalDomListener.js";
import { UIUtil1 } from "../../common/ui/ui_util.js";
import { PasswordDetailsUI } from "../../src/popup/passwordsUI/details/PasswordDetailsUI.js";
import { PasswordFilterUI } from "../../src/popup/passwordsUI/filter/PasswordFilterUI.js";
import { pp } from "../../src/popup/pp.js";
import { VaultCSS } from "../../src/service/VUi/VaultCSS.js";
import { SecretClassification, SecretSharingType } from "../../src/service/bgApi/types/Secret.js";
import { SecretQuery } from "../../src/service/bgApi/types/SecretQuery.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { UIParent } from "../../src/uiUtil/ui/UIParent.js";
import { PasswordsUIListener } from "./PasswordsUIListener.js";
import { PasswordsUIUtil } from "./PasswordsUIUtil.js";
import { SecretElemCreator } from "./SecretElemCreator.js";
export class PasswordsUI extends UIParent {
    PP_QUERY_KEY = "PP_QUERY_1";
    PP_PRE_FOLDER_KEY = "PP_PRE_FOLDER_KEY";
    PP_CUR_FODER_NAME = "PP_CUR_FOLDER_NAME";
    listener = new PasswordsUIListener();
    elemCreator = new SecretElemCreator();
    filterUI = new PasswordFilterUI();
    util = new PasswordsUIUtil();
    passwordDetailsUI = new PasswordDetailsUI();
    displayedSecrets = [];
    emptyNewTab = false;
    intersectionObserver = null;
    query = this.createNewSecretQuery();
    queryResult = null;
    constructor() {
        super();
        this.showUI = js.fn.wrapper.createSingleInstListener(this.showUI, this);
    }
    async init() {
        this.init = async () => { };
        this.listener.p = this;
        this.elemCreator.p = this;
        this.handleScrollIntersection = this.handleScrollIntersection.bind(this);
        this.showNextPage = js.fn.wrapper.createSingleInstListener(this.showNextPage, this);
        this.refreshList = js.fn.wrapper.createSingleInstListener(this.refreshList, this);
        globalDomListener.register("passwords_ui", this.listener);
        await this.initDefaultFilter();
        await this.initNewTabDomainMatch();
    }
    async showUI() {
        try {
            await this.init();
            if (this.elem) {
                this.elem.remove();
            }
            const elem = this.elem = UIUtil.createElem({ preRender: true, template: "#page_passwords" });
            await this.initQuery();
            await this.initSearch();
            await this.initHeader();
            await this.initSyncIcon();
            await this.initAddIcon();
            this.initFilters();
            this.addListeners();
            await this.refreshList();
            if (!this.query.folderId) {
                await this.passwordDetailsUI.restore();
            }
            js.dom.setContent("#content_tab", elem);
            this.passwordDetailsUI.restoreFocus();
        }
        catch (e) {
            logError(e);
        }
    }
    async showFolderPasswords(folder) {
        pp.mainUI.showCompleteLoading();
        const existingQuery = await zsessionStorage.load(pp.passwordsUI.PP_QUERY_KEY, null) || this.createNewSecretQuery();
        if (!existingQuery.folderId) {
            await zsessionStorage.save(pp.passwordsUI.PP_PRE_FOLDER_KEY, existingQuery);
        }
        const query = this.createNewSecretQuery();
        query.folderId = folder.id;
        await zsessionStorage.saveAll({
            [pp.passwordsUI.PP_QUERY_KEY]: query,
            [pp.passwordsUI.PP_CUR_FODER_NAME]: folder.name
        });
        pp.mainUI.showTab(pp.mainUI.PP_TABS.PASSWORDS);
    }
    async initSearch() {
        const searchElem = js.selector.select("#search");
        searchElem.dataset.on_keyup = "passwords_ui.keyed_search_string";
        const lastTab = searchElem.dataset.last_tab;
        const hasExistingValidSearch = searchElem.value && lastTab &&
            (lastTab == pp.mainUI.PP_TABS.GENERATOR || lastTab == pp.mainUI.PP_TABS.SETTINGS);
        if (hasExistingValidSearch) {
            this.query.search_string = searchElem.value;
            await zsessionStorage.save(pp.passwordsUI.PP_QUERY_KEY, this.query);
        }
        searchElem.value = this.query.search_string || "";
        UIUtil1.inst.showSearchClear(searchElem);
    }
    async initFilters() {
        const query = this.query;
        pp.mainUI.setDomainMatchingIcon(query.domainMatching);
    }
    addListeners() {
        try {
            VUI.keyboard.addUpDownNavigation({
                parent: js.selector.selectFrom(this.elem, "#secrets_list"),
                onTopUp() {
                    VUI.input.focus(js.selector.select("#search"));
                }
            });
        }
        catch (e) {
            logError(e);
        }
    }
    async synced() {
        if (!this.isUIShown()) {
            return;
        }
        this.passwordDetailsUI.disableClose();
        await this.refreshList();
        this.passwordDetailsUI.enableClose();
        this.initAddIcon();
        this.setSyncingIcon(false);
    }
    async syncing() {
        if (!this.isUIShown()) {
            return;
        }
        this.setSyncingIcon(true);
    }
    async refreshList() {
        const query = this.query =
            await zsessionStorage.load(pp.passwordsUI.PP_QUERY_KEY, null) || this.createNewSecretQuery();
        const secretQueryResult = this.queryResult = await bgApi.secret.query(query);
        const secrets = this.displayedSecrets = secretQueryResult.secrets;
        this.updateFilterIndication(query);
        this.passwordDetailsUI.close();
        this.hide("#no_passwords_div", "#no_matching_passwords_div");
        pp.mainUI.hideCompleteLoading();
        const secretsListElem = this.select("#secrets_list");
        const noSecrets = secrets.length == 0;
        if (noSecrets && query.page_no == 0) {
            this.hide("#secrets_list");
            this.showNoPasswordsDiv();
            return;
        }
        const lastActiveSecret = document.activeElement.dataset.secret_id;
        this.show(secretsListElem);
        if (noSecrets) {
            return;
        }
        await this.elemCreator.init();
        const secretListContent = await this.elemCreator.getList(secrets, secretQueryResult);
        const isFirstPage = query.page_no == 0;
        isFirstPage ? js.dom.setContent(secretsListElem, secretListContent) : secretsListElem.append(secretListContent);
        if (secrets.length >= query.rows_per_page) {
            this.addScrollListener();
        }
        if (lastActiveSecret) {
            js.selector.select(`[data-secret_id="${lastActiveSecret}"]`)?.focus?.();
        }
    }
    async secretChanged(secretId) {
        try {
            if (!this.isUIShown()) {
                return;
            }
            const existingSecretElem = this.select(`#secrets_list [data-secret_id='${secretId}']`);
            if (!existingSecretElem) {
                return;
            }
            const secret = await bgApi.secret.getSecret(secretId);
            await this.updateSecretDisplayedInList(secret);
        }
        catch (e) {
            logError(e);
        }
    }
    secretsRemoved(secretIds) {
        try {
            if (!this.isUIShown()) {
                return;
            }
            BasePasswordMoreActionsController.inst.hideIfSelected(secretIds);
            let secretElem = null;
            for (let secretId of secretIds) {
                secretElem = this.select(`#secrets_list [data-secret_id='${secretId}']`);
                if (secretElem) {
                    secretElem.remove();
                }
            }
            const hasRemainingElem = Boolean(this.select("#secrets_list [data-secret_id]"));
            if (hasRemainingElem) {
                return;
            }
            this.showNoPasswordsDiv();
        }
        catch (e) {
            logError(e);
        }
    }
    async showNextPage() {
        this.query.page_no++;
        await zsessionStorage.save(pp.passwordsUI.PP_QUERY_KEY, this.query);
        await this.refreshList();
    }
    async showNoPasswordsDiv() {
        const noResults = this.filterUI.isQueryFiltered(this.query) || Boolean(this.query.search_string);
        const selector = noResults ? "#no_matching_passwords_div" : "#no_passwords_div";
        const textSelector = selector + " [data-text]";
        this.show(selector, textSelector);
        this.updateNoPasswordFilter(noResults);
        const syncing = await zlocalStorage.load(LocalStorageKeys.SYNCING, false);
        if (syncing && !noResults) {
            pp.mainUI.showCompleteLoading();
            this.hide(textSelector);
        }
        if (!this.query.folderId) {
            return;
        }
        const noResultKey = noResults ? VI18N.NO_PASSWORDS_MATCHING_FOUND_FOLDER : VI18N.NO_PASSWORDS_FOLDER;
        this.text(textSelector, i18n(noResultKey));
    }
    updateFilterIndication(query) {
        const isFiltered = this.filterUI.isQueryFiltered(query);
        const filterCountElem = this.select("[data-filter_counter]");
        const clearFilterElem = "#clear_password_filters";
        if (!isFiltered) {
            this.hide(clearFilterElem, filterCountElem);
            return;
        }
        const filterCount = this.filterUI.countFilters(query);
        filterCountElem.textContent = filterCount + "";
        this.show(clearFilterElem, filterCountElem);
    }
    addScrollListener() {
        try {
            if (this.intersectionObserver) {
                this.intersectionObserver.disconnect();
            }
            this.intersectionObserver = new IntersectionObserver(this.handleScrollIntersection, {
                root: document.body,
                threshold: 0.5
            });
            const secretListElem = this.select("#secrets_list");
            const lastElem = secretListElem.lastElementChild;
            this.intersectionObserver.observe(lastElem);
        }
        catch (e) {
            logError(e);
        }
    }
    handleScrollIntersection(entries, observer) {
        const intersected = entries.some(x => x.isIntersecting);
        if (!intersected) {
            return;
        }
        observer.disconnect();
        this.showNextPage();
    }
    async initHeader() {
        if (!this.query.folderId) {
            return;
        }
        this.show("#back_to_folders");
        const folderName = await zsessionStorage.load(pp.passwordsUI.PP_CUR_FODER_NAME, "");
        this.text("#password_heading", i18n(VI18N.FOLDER) + " - " + folderName);
    }
    async initSyncIcon() {
        try {
            const syncing = await zlocalStorage.load(LocalStorageKeys.SYNCING, false);
            this.setSyncingIcon(syncing);
        }
        catch (e) {
            logError(e);
        }
    }
    setSyncingIcon(syncing) {
        const syncIcon = this.select(PasswordsUIUtil.selector.SYNC_ICON);
        if (syncing) {
            syncIcon.dataset.tooltip_content = i18n(VI18N.SYNCING);
            syncIcon.classList.add(VaultCSS.SYNCING_ANIMATION);
            return;
        }
        syncIcon.classList.remove(VaultCSS.SYNCING_ANIMATION);
        syncIcon.dataset.tooltip_content = i18n(VI18N.SYNC);
    }
    async initAddIcon() {
        try {
            const allowedClassifications = await bgApi.secret.getAddPasswordClassifications();
            if (allowedClassifications.length > 0) {
                this.enableAddPasswordIcon();
                return;
            }
            const addPasswordAllowed = await zlocalStorage.load(LocalStorageKeys.ALLOW_ADD_SECRET, true);
            if (!addPasswordAllowed) {
                this.disableAddPasswordIcon(VI18N.ADD_PASSWORD_RESTRICTED);
                return;
            }
            this.disableAddPasswordIcon(VI18N.ADD_PERSONAL_ENTERPRISE_PASSWORD_RESTRICTED);
        }
        catch (e) {
            logError(e);
        }
    }
    disableAddPasswordIcon(message) {
        try {
            const addPasswordElem = this.select("#add_password");
            addPasswordElem.classList.add(VaultCSS.DISABLED);
            addPasswordElem.dataset.tooltip_content = i18n(message);
            addPasswordElem.parentElement.dataset.on_click = "";
        }
        catch (e) {
            logError(e);
        }
    }
    enableAddPasswordIcon() {
        try {
            const addPasswordElem = this.select("#add_password");
            addPasswordElem.classList.remove(VaultCSS.DISABLED);
            addPasswordElem.dataset.tooltip_content = i18n(VI18N.ADD_PASSWORD);
            addPasswordElem.parentElement.dataset.on_click = "passwords_ui.clicked_add_password";
        }
        catch (e) {
            logError(e);
        }
    }
    async initQuery() {
        try {
            this.query = await this.loadQuery();
            this.query.page_no = 0;
            this.query.domainMatching = this.query.domainMatching && !this.emptyNewTab;
            await zsessionStorage.save(pp.passwordsUI.PP_QUERY_KEY, this.query);
        }
        catch (e) {
            logError(e);
        }
    }
    getQuery() {
        return this.query;
    }
    async loadQuery() {
        return this.query = (await zsessionStorage.load(pp.passwordsUI.PP_QUERY_KEY, null)) || this.createNewSecretQuery();
    }
    async changeDefaultFilter(filterName) {
        const query = this.createNewSecretQuery();
        this.setDefaultFilterInQuery(filterName, query);
        await zsessionStorage.save(pp.passwordsUI.PP_QUERY_KEY, query);
    }
    async restorePreFolderQuery() {
        const curQuery = await zsessionStorage.load(pp.passwordsUI.PP_QUERY_KEY);
        if (!curQuery || !curQuery.folderId) {
            return;
        }
        const query = (await zsessionStorage.load(pp.passwordsUI.PP_PRE_FOLDER_KEY, null)) ||
            this.createNewSecretQuery();
        await zsessionStorage.save(pp.passwordsUI.PP_QUERY_KEY, query);
    }
    async initDefaultFilter() {
        const existing = await zsessionStorage.load(pp.passwordsUI.PP_QUERY_KEY, null);
        if (existing) {
            return;
        }
        const defaultFilter = await zlocalStorage.load(LocalStorageKeys.DEFAULT_FILTER, "");
        if (!defaultFilter) {
            return;
        }
        await this.changeDefaultFilter(defaultFilter);
    }
    async updateSecretDisplayedInList(secret) {
        try {
            const existingSecretElem = this.select(`#secrets_list [data-secret_id='${secret.id}']`);
            if (!existingSecretElem) {
                return;
            }
            await this.elemCreator.init();
            const curDisplayedSecret = this.displayedSecrets.find(x => x.id == secret.id);
            if (curDisplayedSecret) {
                secret.highlight_field = curDisplayedSecret.highlight_field;
            }
            const newSecretElem = await this.elemCreator.createSecretElem({ secret, result: this.queryResult });
            existingSecretElem.replaceWith(newSecretElem);
        }
        catch (e) {
            logError(e);
        }
    }
    showPasswordsFilter() {
        const showFilterElem = this.select("#show_password_filter");
        js.selector.selectFrom(showFilterElem, "a").classList.add("filter-action-icon-list-selected");
        showFilterElem.style.zIndex = "100";
        js.dom.show("#passwords_filter_container", "#password_filter_overlay", "#password_filter_overlay_color_bg");
        this.filterUI.showUI();
    }
    createNewSecretQuery() {
        return SecretQuery.newBuilder().orderByDomainFavourite().build();
    }
    async initNewTabDomainMatch() {
        try {
            const activeTab = await brApi.tab.getActiveTab();
            const isWebsiteUrl = activeTab?.url?.startsWith?.("http");
            this.emptyNewTab = !isWebsiteUrl;
        }
        catch (e) {
            logError(e);
        }
    }
    updateNoPasswordFilter(filtered) {
        try {
            const FILTER_CONTAINER = "[data-applied_filters_container]";
            if (!filtered) {
                this.hide(FILTER_CONTAINER);
                return;
            }
            this.filterUI.noPasswordsUI.showUI();
            this.show(FILTER_CONTAINER);
        }
        catch (e) {
            logError(e);
        }
    }
    setDefaultFilterInQuery(filter, query) {
        try {
            const FILTER = zenum.FILTER;
            switch (filter) {
                case FILTER.ALL:
                    return;
                case FILTER.FAVOURITES:
                    query.favourite = true;
                    return;
                case FILTER.DOMAIN_MATCHING:
                    query.domainMatching = true;
                    return;
                case FILTER.RECENTLY_USED:
                    query.recentlyUsed = true;
                    return;
                case FILTER.RECENTLY_ADDED:
                    query.recentlyAdded = true;
                    return;
                case FILTER.PERSONAL:
                    query.classification = SecretClassification.PERSONAL;
                    return;
                case FILTER.ENTERPRISE:
                    query.classification = SecretClassification.ENTERPRISE;
                    return;
                case FILTER.SHARED_BY_ME:
                    query.sharing = SecretSharingType.SHARED_BY_ME;
                    return;
                case FILTER.SHARED_TO_ME:
                    query.sharing = SecretSharingType.SHARED_TO_ME;
                    return;
                case FILTER.UNSHARED:
                    query.sharing = SecretSharingType.NONE;
                    return;
                case FILTER.OWNED_BY_ME:
                    query.owned = true;
                    return;
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
