import { VI18N } from "../../../src/service/vt/VI18n.js";
import { SFPasswordsCli } from "./SFPasswordsCli.js";
import { SFPasswordsUI } from "./SFPasswordsUI.js";
import { SFPasswordUIBuilder } from "./password/SFPasswordUIBuilder.js";
export class SFPasswordsUIController {
    static instance = null;
    constructor() { }
    static get inst() {
        return this.instance || (this.instance = new SFPasswordsUIController().init());
    }
    ui = null;
    get cli() {
        return SFPasswordsCli.inst;
    }
    shownNoPasswords = false;
    showUIProgress = false;
    init() {
        this.onSearchInput = js.fn.wrapper.createSingleInstListener(this.onSearchInput, this);
        this.refreshList = js.fn.wrapper.createSingleInstListener(this.refreshList, this);
        this.showUI = js.fn.wrapper.createSingleInstListener(this.showUI, this);
        return this;
    }
    async initSearchString() {
        const searchString = await this.cli.loadSearchString();
        this.ui.setSearchString(searchString);
        this.cli.initQuery(searchString);
    }
    showNoPasswordsFoundUI() {
        this.shownNoPasswords = true;
        this.ui.hideLoading();
        this.ui.showNoPasswordsUI();
    }
    async showNoMatchingPasswordsUI() {
        try {
            const searchString = this.cli.getQuery().search_string;
            this.ui.showNoMatchingPasswordsUI();
            const syncing = await this.cli.isSyncing();
            this.ui.showNoMatchingPasswordsUITextIf(!syncing);
            if (syncing && !searchString) {
                this.ui.showLoading();
            }
            else {
                this.ui.hideLoading();
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async showNoPasswordsUI() {
        const query = this.cli.getQuery();
        if (query.search_string.length == 0 && query.page_no == 0) {
            const syncing = await this.cli.isSyncing();
            if (!syncing) {
                this.showNoPasswordsFoundUI();
                return;
            }
        }
        await this.showNoMatchingPasswordsUI();
    }
    async getSecretList(secrets, query) {
        try {
            const fragment = new DocumentFragment();
            for (let secret of secrets) {
                fragment.append(await SFPasswordUIBuilder.buildUI(secret, query));
            }
            return fragment;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async refreshList() {
        try {
            const query = this.cli.getQuery();
            const secrets = await this.cli.getSecrets(query);
            if (secrets.length == 0 && query.page_no == 0) {
                await this.showNoPasswordsUI();
                return;
            }
            this.ui.hideLoading();
            const secretList = await this.getSecretList(secrets, query);
            this.ui.showPasswordList(secretList, query.page_no == 0);
            this.ui.focusSearch();
            if (secrets.length == query.rows_per_page) {
                this.ui.onScrollEndInput(this.onScrollEndInput.bind(this));
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async onSearchInput(searchString) {
        try {
            await this.cli.setSearchString(searchString);
            await this.refreshList();
        }
        catch (e) {
            logError(e);
        }
    }
    addListeners() {
        this.ui.onSearchKeyupInput(this.onSearchInput.bind(this));
        this.ui.onHideMoreActionsClickInput(() => this.hideMoreActions());
        this.addKeyboardListener();
    }
    async initSyncStatus() {
        const isSyncing = await this.cli.isSyncing();
        this.ui.setSearchPlaceholder(isSyncing ? i18n(VI18N.SYNCING) + "..." : i18n(VI18N.SEARCH));
    }
    async showUI() {
        try {
            this.showUIProgress = true;
            this.ui = new SFPasswordsUI();
            this.ui.init();
            this.addListeners();
            this.ui.showLoading();
            await this.initSearchString();
            await this.initSyncStatus();
            js.dom.setContent("#main_out", this.ui.elem);
            await this.refreshList();
        }
        catch (e) {
            logError(e);
        }
        finally {
            this.showUIProgress = false;
        }
    }
    async onSyncingEvent() {
        if (!this.ui.isShown()) {
            return;
        }
        this.ui.setSearchPlaceholder(i18n(VI18N.SYNCING) + "...");
    }
    async onSyncedEvent() {
        if (!this.ui.isShown() || this.showUIProgress) {
            return;
        }
        if (this.shownNoPasswords) {
            this.showUI();
            return;
        }
        this.ui.setSearchPlaceholder(i18n(VI18N.SEARCH));
        await this.refreshList();
    }
    onScrollEndInput() {
        this.cli.getQuery().page_no++;
        this.refreshList();
    }
    async refreshListForSecretChangeEvent() {
        try {
            if (!this.ui.isShown()) {
                return;
            }
            if (this.shownNoPasswords) {
                this.showUI();
                return;
            }
            const query = this.cli.getQuery();
            const pageNo = query.page_no;
            const oldRowsPerPage = query.rows_per_page;
            const currentSecrets = (pageNo + 1) * query.rows_per_page;
            const currentScrollTop = this.ui.getListScrollPosition();
            this.ui.hideMoreActions();
            query.rows_per_page = currentSecrets;
            query.page_no = 0;
            await this.refreshList();
            query.page_no = pageNo;
            query.rows_per_page = oldRowsPerPage;
            this.ui.setListScrollPosition(currentScrollTop);
        }
        catch (e) {
            logError(e);
        }
    }
    onSecretAddedEvent() {
        this.refreshListForSecretChangeEvent();
    }
    onSecretsRemovedEvent() {
        this.refreshListForSecretChangeEvent();
    }
    onSecretChangedEvent(secretId) {
        try {
            if (!this.ui.isShown()) {
                return;
            }
            if (this.shownNoPasswords) {
                this.checkSecretUrlChanged(secretId);
                return;
            }
            const secretElem = this.ui.getSecretElem(secretId);
            if (secretElem) {
                this.refreshListForSecretChangeEvent();
                return;
            }
            this.checkSecretUrlChanged(secretId);
        }
        catch (e) {
            logError(e);
        }
    }
    async checkSecretUrlChanged(secretId) {
        const isDomainMatchingSecret = await bgApi.siteFrame.isDomainMatchingId(secretId);
        if (isDomainMatchingSecret) {
            this.refreshListForSecretChangeEvent();
        }
    }
    showMoreActions(moreActionsFragment, e) {
        this.ui.showMoreActions(moreActionsFragment, e);
    }
    hideMoreActions() {
        this.ui.hideMoreActions();
    }
    addSearchListener() {
        try {
            const searchElem = js.selector.selectFrom(this.ui.elem, "#search");
            VUI.keyboard.onKeyDown(searchElem, {
                ArrowDown(e) {
                    const secretElem = js.selector.select(".password-list-panel");
                    if (!secretElem) {
                        return;
                    }
                    secretElem.focus();
                    secretElem.scrollIntoView();
                    e.preventDefault();
                }
            });
        }
        catch (e) {
            logError(e);
        }
    }
    addKeyboardListener() {
        try {
            this.addSearchListener();
            const searchElem = js.selector.select("#search");
            const passwordListElem = js.selector.selectFrom(this.ui.elem, "#password_out");
            VUI.keyboard.addUpDownNavigation({
                parent: passwordListElem,
                onTopUp() {
                    VUI.input.focus(searchElem);
                },
            });
            VUI.keyboard.onKeyDown(passwordListElem, {
                "/"(e) {
                    if (js.dom.isContentEditable(e.target)) {
                        return;
                    }
                    if (e.target == searchElem) {
                        return;
                    }
                    e.preventDefault();
                    searchElem.focus();
                },
                ArrowLeft() {
                    bgApi.siteFrame.closeSiteFrame({ restoreFoucs: true });
                }
            });
        }
        catch (e) {
            logError(e);
        }
    }
}
