import { globalDomListener } from "../../common/ui/globalDomListener.js";
import { VaultCSS } from "../../src/service/VUi/VaultCSS.js";
import { SecretSharingType } from "../../src/service/bgApi/types/Secret.js";
import { SecretQuery } from "../../src/service/bgApi/types/SecretQuery.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { MainUITabType } from "../../src/ztab/main_ui/MainUI.Type.js";
import { PasswordUIFilterTabs, PasswordUITabType } from "../../src/ztab/passwords_ui/PasswordsUI.Type.js";
import { PasswordFilterUI } from "../../src/ztab/passwords_ui/filter/PasswordFilterUI.js";
import { zt } from "../zt.js";
import { BasePasswordsUI } from "./BasePasswordsUI.js";
import { PasswordsUIListener } from "./PasswordsUIListener.js";
import { SecretElemCreator } from "./SecretElemCreator.js";
import { ZTPasswordMoreActionsController } from "./ZTPasswordMoreActionsController.js";
import { PasswordAccessControlUI } from "./password_access_control/PasswordAccessControlUI.js";
import { PasswordAccessRequestUI } from "./password_access_request/PasswordAccessRequestUI.js";
import { PasswordAddUI } from "./password_add/PasswordAddUI.js";
import { PasswordDetailsUI } from "./password_details/PasswordDetailsUI.js";
import { PasswordEditUI } from "./password_edit/PasswordEditUI.js";
export class PasswordsOldUI extends BasePasswordsUI {
    passwordAddUI = new PasswordAddUI();
    passwordEditUI = new PasswordEditUI();
    detailsUI = new PasswordDetailsUI();
    accessControlUI = new PasswordAccessControlUI();
    accessRequestUI = new PasswordAccessRequestUI();
    secretElemCreator = new SecretElemCreator();
    listener = new PasswordsUIListener();
    queryResult = null;
    secret_query_result = null;
    preFolderQuery = null;
    query = this.createNewSecretQuery();
    filterUI = new PasswordFilterUI();
    curTab;
    async init() {
        this.init = async () => { };
        this.listener.p = this;
        this.secretElemCreator.p = this;
        this.detailsUI.p = this;
        this.passwordAddUI.p = this;
        this.passwordEditUI.p = this;
        this.accessControlUI.p = this;
        this.accessRequestUI.p = this;
        this.refreshList = js.fn.wrapper.createSingleInstListener(this.refreshList, this);
        globalDomListener.register("passwords_ui", this.listener);
    }
    async initQuery(tab) {
        try {
            const rowsPerPage = await zlocalStorage.load(PasswordsOldUI.ROWS_PER_PAGE, SecretQuery.ROWS_PER_PAGE);
            const query = this.createNewSecretQuery();
            query.rows_per_page = rowsPerPage;
            switch (tab.type) {
                case PasswordUITabType.ALL:
                    break;
                case PasswordUITabType.FILTER:
                    this.initFilterQuery(query, tab);
                    break;
                case PasswordUITabType.SECRET_TYPE:
                    query.typeId = tab.typeId;
                    break;
                case PasswordUITabType.FOLDER:
                    query.folderId = tab.folderId;
                    break;
            }
            this.saveQuery(query);
        }
        catch (e) {
            logError(e);
        }
    }
    async showUI(tab) {
        try {
            await this.init();
            const oldElem = this.elem;
            this.elem = UIUtil.createElem({ preRender: true, template: "#passwords_page_template" });
            await this.initAdd();
            await this.initQuery(tab);
            await this.initHeader(tab);
            this.curTab = tab;
            this.initSearch();
            await this.refreshViewType();
            await this.setNoPasswordDivs(this.query.typeId);
            this.addKeyboardListener();
            oldElem?.remove?.();
            js.dom.setContent("#passwords_content", this.elem);
            this.select("[data-search]").focus();
        }
        catch (e) {
            logError(e);
        }
    }
    async initAdd() {
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
            addPasswordElem.dataset.on_click = "";
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
            addPasswordElem.dataset.on_click = "passwords_ui.clicked_add_password";
        }
        catch (e) {
            logError(e);
        }
    }
    async initHeader(tab) {
        try {
            switch (tab.type) {
                case PasswordUITabType.ALL:
                    return;
                case PasswordUITabType.FILTER:
                    this.text("#password_heading", this.getFilterHeading(tab.filter));
                    return;
                case PasswordUITabType.SECRET_TYPE:
                    this.text("#password_heading", zt.passwordsUI.sidebar.data.secretTypeMap[tab.typeId].name);
                    return;
                case PasswordUITabType.FOLDER: {
                    this.show("#back_to_folders");
                    const folder = await bgApi.folder.get(this.query.folderId);
                    this.text("#password_heading", i18n(VI18N.FOLDER) + " - " + folder.name);
                    return;
                }
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async handleSynced() {
        try {
            if (!this.isUIShown()) {
                return;
            }
            this.refreshList();
            this.detailsUI.synced();
            this.initAdd();
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async secretAdded(_secretId) {
        try {
            if (!this.isUIShown()) {
                return;
            }
            ZTPasswordMoreActionsController.inst.hideUI();
            this.refreshList();
        }
        catch (e) {
            logError(e);
        }
    }
    async secretChanged(secretId) {
        try {
            if (!this.isUIShown()) {
                return;
            }
            const secret = await bgApi.secret.getSecret(secretId);
            this.detailsUI.secretChanged(secret);
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
            this.detailsUI.secretsRemoved(secretIds);
            const hasRemovedElemInUI = secretIds.some(x => Boolean(this.select(`[data-list] [data-secret_id='${x}']`)));
            if (!hasRemovedElemInUI) {
                return;
            }
            ZTPasswordMoreActionsController.inst.hideIfSelected(secretIds);
            this.refreshList();
        }
        catch (e) {
            logError(e);
        }
    }
    async updateQueriedResult() {
        const query = this.getQuery();
        this.queryResult = await bgApi.secret.query(query);
    }
    async showFolderPasswords(folder) {
        zt.mainUI.showCompleteLoading();
        zt.mainUI.showTab({ type: MainUITabType.PASSWORDS, passwordTab: { type: PasswordUITabType.FOLDER, folderId: folder.id } });
    }
    async restorePreFolderQuery() {
        this.query = this.preFolderQuery || this.query;
    }
    updateFilterIndication() {
        const isFiltered = this.isFiltered();
        const filterCountElem = this.select("[data-filter_counter]");
        const clearFilterElem = "#clear_password_filters";
        if (!isFiltered) {
            js.dom.hide(clearFilterElem, filterCountElem);
            return;
        }
        const filterCount = this.filterUI.countFilters(this.query);
        filterCountElem.textContent = filterCount + "";
        js.dom.show(clearFilterElem, filterCountElem);
    }
    async showNoPasswordsDiv() {
        const noResults = Boolean(this.getQueryResult().query.search_string) || this.isFiltered();
        const selector = noResults ? "[data-no_matching_passwords]" : "[data-no_passwords]";
        this.show(selector);
        this.updateNoPasswordFilter(noResults);
        const syncing = await zlocalStorage.load(LocalStorageKeys.SYNCING, false);
        if (syncing && !noResults) {
            zt.mainUI.showCompleteLoading();
        }
        if (!this.getQueryResult().query.folderId) {
            return;
        }
        const textKey = noResults ? VI18N.NO_PASSWORDS_MATCHING_FOUND_FOLDER : VI18N.NO_PASSWORDS_FOLDER;
        this.text(selector + " [data-text]", i18n(textKey));
    }
    isFiltered() {
        return this.filterUI.isQueryFiltered(this.getQuery());
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
    async updateSecretDisplayedInList(secret) {
        try {
            const existingSecretElem = this.select(`#secrets_list [data-secret_id='${secret.id}']`);
            if (!existingSecretElem) {
                return;
            }
            const secretElemCreator = new SecretElemCreator();
            secretElemCreator.p = this;
            await secretElemCreator.init();
            const curDisplayedSecret = this.displayedSecrets.find(x => x.id == secret.id);
            if (curDisplayedSecret) {
                secret.highlight_field = curDisplayedSecret.highlight_field;
            }
            const newSecretElem = await secretElemCreator.createSecretElem(secret, this.query);
            const innerHighlightDivSelector = ".card-view-password-list-inner";
            const existingHighlightClass = existingSecretElem.querySelector(innerHighlightDivSelector).className;
            newSecretElem.querySelector(innerHighlightDivSelector).className = existingHighlightClass;
            existingSecretElem.replaceWith(newSecretElem);
        }
        catch (e) {
            logError(e);
        }
    }
    createNewSecretQuery() {
        return SecretQuery.newBuilder().orderByDomainFavourite().build();
    }
    addListKeyboardListeners() {
        try {
            const searchElem = js.selector.selectFrom(this.elem, "[data-search]");
            const secretListElem = js.selector.selectFrom(this.elem, "#secrets_list");
            const param = {
                parent: secretListElem,
                onTopUp() {
                    VUI.input.focus(searchElem);
                }
            };
            if (!this.isCardView) {
                VUI.keyboard.addUpDownNavigation(param);
                return;
            }
            VUI.keyboard.addUpDownLeftRightNavigation(param);
        }
        catch (e) {
            logError(e);
        }
    }
    initFilterQuery(query, tab) {
        try {
            switch (tab.filter) {
                case PasswordUIFilterTabs.SHARED_BY_ME:
                    query.sharing = SecretSharingType.SHARED_BY_ME;
                    break;
                case PasswordUIFilterTabs.SHARED_WITH_ME:
                    query.sharing = SecretSharingType.SHARED_TO_ME;
                    break;
                case PasswordUIFilterTabs.FAVOURITES:
                    query.favourite = true;
                    break;
                case PasswordUIFilterTabs.OWNED_BY_ME:
                    query.owned = true;
                    break;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getFilterHeading(filter) {
        switch (filter) {
            case "favourite": return i18n(VI18N.FAVOURITES);
            case "shared_to_me": return i18n(VI18N.SHARED_WITH_ME);
            default: return i18n(filter);
        }
    }
    updateNoPasswordFilter(filtered) {
        try {
            const FILTER_CONTAINER = "[data-applied_filters_container]";
            if (!filtered) {
                this.hide(FILTER_CONTAINER);
                return;
            }
            if (this.curTab.type != PasswordUITabType.ALL) {
                return;
            }
            this.filterUI.noPasswordsUI.showUI();
            this.show(FILTER_CONTAINER);
        }
        catch (e) {
            logError(e);
        }
    }
    addKeyboardListener() {
        try {
            const searchElem = js.selector.selectFrom(this.elem, "[data-search]");
            VUI.keyboard.onKeyDown(searchElem, {
                ArrowDown(e) {
                    e.preventDefault();
                    js.selector.select(".card-view-password-list")?.focus?.();
                },
            });
        }
        catch (e) {
            logError(e);
        }
    }
}
