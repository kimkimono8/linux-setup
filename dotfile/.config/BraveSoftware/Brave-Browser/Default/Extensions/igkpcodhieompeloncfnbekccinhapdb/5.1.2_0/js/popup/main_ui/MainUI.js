import { globalDomListener } from "../../common/ui/globalDomListener.js";
import { globalNodeData } from "../../common/ui/globalNodeData.js";
import { UIUtil1 } from "../../common/ui/ui_util.js";
import { MainUIElem } from "../../src/popup/mainUI/MainUIElem.js";
import { pp } from "../../src/popup/pp.js";
import { settingsUI } from "../../src/popup/settingsUI/export.js";
import { VaultCSS } from "../../src/service/VUi/VaultCSS.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { UIParent } from "../../src/uiUtil/ui/UIParent.js";
import { MainUIListener } from "./MainUIListener.js";
export class MainUI extends UIParent {
    elem1 = new MainUIElem();
    PP_TAB_KEY = "PP_TAB";
    PP_TABS = {
        PASSWORDS: "passwords",
        FOLDERS: "folders",
        GENERATOR: "generator",
        SETTINGS: "settings"
    };
    listener = new MainUIListener();
    init() {
        this.listener.p = this;
        globalDomListener.register("main_ui", this.listener);
        bgApi.other.updateLogo(false);
    }
    async showUI() {
        this.init();
        const elem = this.elem = UIUtil.createElem({ template: "#main_page" });
        this.elem1.init(elem);
        bgApi.user.getDp().then(dp => this.select("#dp").src = dp);
        let stored = {
            [LocalStorageKeys.USERNAME]: "",
            [LocalStorageKeys.EMAIL]: "",
            [LocalStorageKeys.SYNCING]: false,
        };
        let sessionStored = {
            [this.PP_TAB_KEY]: this.PP_TABS.PASSWORDS
        };
        stored = await zlocalStorage.loadAll(stored);
        sessionStored = await zsessionStorage.loadAll(sessionStored);
        this.select("#username").textContent = stored[LocalStorageKeys.USERNAME];
        this.select("#email").textContent = stored[LocalStorageKeys.EMAIL];
        this.refreshDomainMatchingCount();
        this.refreshSyncStatus();
        document.documentElement.style.height = "600px";
        document.body.style.height = "600px";
        this.addKeyboardListener();
        js.dom.setContent("#output", elem);
        this.showTab(sessionStored[this.PP_TAB_KEY]);
        pp.theme.refreshTheme();
    }
    showTab(tabName) {
        try {
            const ACTIVE_MENU_CLASS = "nav-menu-active";
            this.select("a.nav-menu-active").classList.remove(ACTIVE_MENU_CLASS);
            this.select("#" + tabName + "_tab_header").classList.add(ACTIVE_MENU_CLASS);
            zsessionStorage.save(this.PP_TAB_KEY, tabName);
            this.refreshDomainMatchingIcon(tabName);
            switch (tabName) {
                case this.PP_TABS.PASSWORDS:
                    pp.passwordsUI.showUI();
                    break;
                case this.PP_TABS.FOLDERS:
                    pp.foldersUI.showUI();
                    break;
                case this.PP_TABS.GENERATOR:
                    pp.generatorUI.showUI();
                    this.initSearch();
                    break;
                case this.PP_TABS.SETTINGS:
                    settingsUI.showUI();
                    break;
            }
            this.elem1.searchElem.focus();
        }
        catch (e) {
            logError(e);
        }
    }
    showDotLoading(showInSeconds = 0) {
        const dotLoadingElem = this.select("#dot_loading");
        const timeoutId = setTimeout(() => this.show(dotLoadingElem), showInSeconds * 1000);
        globalNodeData.setNodeData(dotLoadingElem, { timeout_id: timeoutId });
    }
    hideDotLoading() {
        const dotLoadingElem = this.select("#dot_loading");
        const { timeout_id } = globalNodeData.getNodeData(dotLoadingElem);
        clearTimeout(timeout_id);
        this.hide(dotLoadingElem);
    }
    showCompleteLoading() {
        js.dom.showNoError("#complete_loading");
    }
    hideCompleteLoading() {
        js.dom.hideNoError("#complete_loading");
    }
    addGlobalKeyboardListener() {
        VUI.keyboard.onKeyDown(document.body, {
            l(e) {
                if (!VUI.keyboard.isCtrlPressed(e)) {
                    return;
                }
                e.preventDefault();
                js.selector.select("[data-lock]")?.click?.();
            },
            d(e) {
                if (!VUI.keyboard.isCtrlPressed(e) || !e.shiftKey) {
                    return;
                }
                e.preventDefault();
                bgApi.ztab.openZTab();
                js.dom.closeWindow();
            }
        });
    }
    async refreshSyncStatus() {
        const syncing = await zlocalStorage.load(LocalStorageKeys.SYNCING, false);
        syncing ? this.syncing() : await this.updateSyncedUI();
    }
    async synced() {
        const isNotShown = !this.isUIShown();
        if (isNotShown) {
            return;
        }
        await this.updateSyncedUI();
        const userSync = await zlocalStorage.load(LocalStorageKeys.USER_SYNC, false);
        if (userSync) {
            VUI.notification.showSuccess(i18n(VI18N.SYNC_COMPLETED), 1);
        }
    }
    async updateSyncedUI() {
        this.elem1.searchElem.placeholder = i18n(VI18N.SEARCH);
        this.hideCompleteLoading();
        this.refreshDomainMatchingCount();
    }
    async syncing() {
        const isNotShown = !this.isUIShown();
        if (isNotShown) {
            return;
        }
        this.elem1.searchElem.placeholder = i18n(VI18N.SYNCING) + "...";
        const lastSynced = await zlocalStorage.load(LocalStorageKeys.LAST_SYNCED, 0);
        if (lastSynced) {
            return;
        }
        this.showCompleteLoading();
    }
    async refreshDomainMatchingCount() {
        const domainMatchingCount = await bgApi.secret.getDomainMatchingCount();
        this.text("[data-domain_matching_count]", "" + domainMatchingCount);
    }
    refreshDomainMatchingIcon(tabName) {
        const enableIcon = tabName != this.PP_TABS.PASSWORDS;
        if (enableIcon) {
            this.setDomainMatchingIcon(false);
        }
    }
    setDomainMatchingIcon(selected) {
        try {
            const iconElem = js.selector.select("#show_domain_matching_icon");
            selected ? iconElem.classList.add(VaultCSS.DISABLED) : iconElem.classList.remove(VaultCSS.DISABLED);
        }
        catch (e) {
            logError(e);
        }
    }
    async closeUI() {
        await js.dom.closeWindow();
    }
    initSearch() {
        try {
            const searchElem = js.selector.select("#search");
            searchElem.dataset.on_keyup = "main_ui.keyed_search_string";
            searchElem.value = "";
            UIUtil1.inst.showSearchClear(searchElem);
        }
        catch (e) {
            logError(e);
        }
    }
    addSearchListener() {
        try {
            const searchElem = js.selector.selectFrom(this.elem, "#search");
            VUI.keyboard.onKeyDown(searchElem, {
                ArrowDown(e) {
                    e.preventDefault();
                    if (pp.passwordsUI.passwordDetailsUI.isUIShown()) {
                        pp.passwordsUI.passwordDetailsUI.focusField();
                        return;
                    }
                    const secretElem = js.selector.select(".password-list-panel");
                    if (!secretElem) {
                        return;
                    }
                    secretElem.focus();
                    secretElem.scrollIntoView();
                },
            });
        }
        catch (e) {
            logError(e);
        }
    }
    addKeyboardListener() {
        try {
            this.addSearchListener();
            VUI.keyboard.onKeyDown(document.body, {
                "/"(e) {
                    if (js.dom.isContentEditable(e.target)) {
                        return;
                    }
                    const searchElem = js.selector.select("#search");
                    if (e.target == searchElem) {
                        return;
                    }
                    e.preventDefault();
                    searchElem.focus();
                }
            });
        }
        catch (e) {
            logError(e);
        }
    }
}
