import { UIUtil1 } from "../../common/ui/ui_util.js";
import { formUtil } from "../../common/util/formUtil.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { UIParent } from "../../src/uiUtil/ui/UIParent.js";
import { zt } from "../zt.js";
import { PasswordsUIUtil } from "./PasswordsUIUtil.js";
export class BasePasswordsUI extends UIParent {
    static ROWS_PER_PAGE = "ZTAB.ROWS_PER_PAGE";
    listener = null;
    detailsUI = null;
    util = new PasswordsUIUtil();
    secretElemCreator = null;
    isCardView = false;
    query = null;
    queryResult = null;
    lastQuery = null;
    showCompleteLoadingOnRefresh = false;
    displayedSecrets = [];
    showSecretOnTopData = {
        id: "",
        upto: 0,
    };
    async syncing() {
        if (!this.isUIShown()) {
            return;
        }
        await this.refreshSyncUIStatus();
    }
    async synced() {
        if (!this.isUIShown()) {
            return;
        }
        await this.refreshSyncUIStatus();
        await this.handleSynced();
        zt.passwordsUI.sidebar.refreshUI();
    }
    async setNoPasswordDivs(typeId) {
        const noMatchingPassword = "[data-no_matching_passwords]";
        const noPassword = "[data-no_passwords]";
        let noMatchingContent = i18n(VI18N.NO_MATCHING_PASSWORDS_FOUND);
        let noPasswordContent = i18n(VI18N.NO_PASSWORDS_FOUND);
        if (typeId) {
            const isCardType = await formUtil.isPaymentCardCategory(typeId);
            const isAddressType = await formUtil.isAddressCategory(typeId);
            if (isCardType) {
                noMatchingContent = i18n(VI18N.NO_CARDS_MATCHING_FOUND);
                noPasswordContent = i18n(VI18N.NO_CARDS_FOUND);
            }
            else if (isAddressType) {
                noMatchingContent = i18n(VI18N.NO_MATCHING_ADDRESSES_FOUND);
                noPasswordContent = i18n(VI18N.NO_ADDRESS_FOUND);
            }
        }
        this.select(noMatchingPassword).querySelector('[data-text]').textContent = noMatchingContent;
        this.select(noPassword).querySelector('[data-text]').textContent = noPasswordContent;
    }
    async refreshViewType() {
        try {
            await this.initViewType();
            this.addSelectedViewHighlight();
            this.addListContainerElem();
            this.detailsUI.hideDetails();
            this.refreshViewTypeFn();
            this.addListKeyboardListeners();
            await this.refreshList();
        }
        catch (e) {
            logError(e);
        }
    }
    async refreshList() {
        if (this.showCompleteLoadingOnRefresh) {
            zt.mainUI.showCompleteLoading();
        }
        await this.updateQueriedResult();
        this.updateFilterIndication();
        this.refreshPagination();
        this.refreshRowsPerPage();
        zt.mainUI.hideCompleteLoading();
        const secretListElem = this.getSecretListelem();
        this.hide("[data-no_passwords]", "[data-no_matching_passwords]");
        if (this.queryResult.secrets.length == 0) {
            this.hide(secretListElem);
            this.showNoPasswordsDiv();
            return;
        }
        this.show(secretListElem);
        await this.secretElemCreator.init();
        this.displayedSecrets = this.queryResult.secrets;
        await this.orderSecrets(this.queryResult.secrets);
        const secretListContent = await this.secretElemCreator.getList(this.queryResult.secrets, this.query);
        js.dom.setContent(secretListElem, secretListContent);
        this.detailsUI.highlightSearch();
        const scrollToTop = this.isScrollRequiredDuringRefresh();
        if (scrollToTop) {
            secretListElem.scrollTop = 0;
        }
        this.lastQuery = { ...this.query };
    }
    async setCardView(enable) {
        try {
            this.isCardView = enable;
            await zlocalStorage.save("ZTAB.CARD_VIEW", enable);
            this.refreshViewType();
        }
        catch (e) {
            logError(e);
        }
    }
    setShowSecretOnTop(secretId) {
        try {
            this.showSecretOnTopData.id = secretId;
            this.showSecretOnTopData.upto = Date.now() + 2000;
        }
        catch (e) {
            logError(e);
        }
    }
    async orderSecrets(secrets) {
        try {
            if (!this.showSecretOnTopData.id) {
                return;
            }
            if (this.showSecretOnTopData.upto < Date.now()) {
                this.showSecretOnTopData.id = "";
                return;
            }
            const secretIndex = secrets.findIndex(x => x.id == this.showSecretOnTopData.id);
            if (secretIndex >= 0) {
                const reqSecret = secrets[secretIndex];
                js.array.removeElemAt(secrets, secretIndex);
                secrets.unshift(reqSecret);
                return;
            }
            if (this.query.search_string) {
                return;
            }
            const secret = await bgApi.secret.getSecret(this.showSecretOnTopData.id);
            secrets.pop();
            secrets.unshift(secret);
        }
        catch (e) {
            logError(e);
        }
    }
    async initViewType() {
        try {
            this.isCardView = await zlocalStorage.load("ZTAB.CARD_VIEW", false);
        }
        catch (e) {
            logError(e);
        }
    }
    isScrollRequiredDuringRefresh() {
        try {
            const scrollRequired = (this.lastQuery == null) ||
                (this.lastQuery.search_string != this.query.search_string) ||
                (this.lastQuery.page_no != this.query.page_no);
            return scrollRequired;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async updateQueriedResult() {
    }
    updateFilterIndication() {
    }
    async showNoPasswordsDiv() {
        const noResults = Boolean(this.getQueryResult().query.search_string) || this.isFiltered();
        const selector = noResults ? "[data-no_matching_passwords]" : "[data-no_passwords]";
        this.show(selector);
    }
    async handleSynced() {
    }
    initSearch() {
        this.refreshSyncUIStatus();
        const searchElem = this.select("[data-search]");
        const query = this.getQuery();
        searchElem.value = query.search_string || "";
        UIUtil1.inst.showSearchClear(searchElem);
    }
    refreshPagination() {
        const result = this.getQueryResult();
        if (result.total_count == 0) {
            this.hide("[data-pagination_panel]");
            return;
        }
        this.show("[data-pagination_panel]");
        const query = result.query;
        const start = (query.page_no * query.rows_per_page) + 1;
        const end = Math.min(start + query.rows_per_page - 1, result.total_count);
        this.text("[data-pagintation_displaying]", start + " - " + end);
        this.text("[data-pagintation_total]", result.total_count + "");
        const isFirstPage = query.page_no == 0;
        if (isFirstPage) {
            this.select("[data-pagination_left_arrow]").classList.add("disabled");
        }
        else {
            this.select("[data-pagination_left_arrow]").classList.remove("disabled");
        }
        const isLastPage = end == result.total_count;
        if (isLastPage) {
            this.select("[data-pagination_right_arrow]").classList.add("disabled");
        }
        else {
            this.select("[data-pagination_right_arrow]").classList.remove("disabled");
        }
    }
    refreshRowsPerPage() {
        const rowsPerPage = this.select("[data-pagination_rows_per_page]");
        $(rowsPerPage).select2({
            minimumResultsForSearch: -1
        });
        $(rowsPerPage).val(this.getQuery().rows_per_page + "").trigger("change.select2");
        $(rowsPerPage).off("change");
        $(rowsPerPage).on("change", e => this.listener.changedRowsPerPage(e));
    }
    isFiltered() {
        return Boolean(this.getQuery().search_string);
    }
    getQuery() {
        return this.query;
    }
    saveQuery(query) {
        this.query = query;
    }
    getQueryResult() {
        return this.queryResult;
    }
    async refreshSyncUIStatus() {
        try {
            const searchElem = this.select("[data-search]");
            const syncing = await zlocalStorage.load(LocalStorageKeys.SYNCING, false);
            if (syncing) {
                searchElem.placeholder = i18n(VI18N.SYNCING) + "...";
                return;
            }
            searchElem.placeholder = i18n(VI18N.SEARCH);
        }
        catch (e) {
            logError(e);
        }
    }
    addListKeyboardListeners() { }
    addSelectedViewHighlight() {
        try {
            const SELECTED_CLASS = "view-change-panel-selected";
            this.select("." + SELECTED_CLASS).classList.remove(SELECTED_CLASS);
            if (this.isCardView) {
                this.select('[data-card_view]').classList.add(SELECTED_CLASS);
                return;
            }
            this.select('[data-list_view]').classList.add(SELECTED_CLASS);
        }
        catch (e) {
            logError(e);
        }
    }
    addListContainerElem() {
        try {
            const elem = VUI.createElem({ template: "#secret_list_container_template" });
            const target = js.selector.selectFrom(this.elem, "[data-list_container]");
            target.replaceWith(elem);
        }
        catch (e) {
            logError(e);
        }
    }
    refreshViewTypeFn() {
        try {
            const passwordDetailsContainer = this.select("[data-password_details_container]");
            if (this.isCardView) {
                passwordDetailsContainer.className = "password-details-slider";
                return;
            }
            passwordDetailsContainer.className = "password-list-view-details-panel clearfix dis-hide";
            passwordDetailsContainer.setAttribute("style", "");
            const secretList = this.getSecretListelem();
            secretList.classList.add("list-view-passwords-list");
        }
        catch (e) {
            logError(e);
        }
    }
    getSecretListelem() {
        return this.select("[data-list]");
    }
}
