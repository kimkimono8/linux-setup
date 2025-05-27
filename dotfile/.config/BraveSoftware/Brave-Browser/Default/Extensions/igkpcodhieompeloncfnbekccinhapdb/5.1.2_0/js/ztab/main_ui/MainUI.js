import { globalDomListener } from "../../common/ui/globalDomListener.js";
import { globalNodeData } from "../../common/ui/globalNodeData.js";
import { UIUtil1 } from "../../common/ui/ui_util.js";
import { ErrorCode } from "../../components/jsUtil/service/constants/ErrorCode.js";
import { VaultCSS } from "../../src/service/VUi/VaultCSS.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { UIParent } from "../../src/uiUtil/ui/UIParent.js";
import { MainUIData } from "../../src/ztab/main_ui/MainUI.data.js";
import { MainUITabType } from "../../src/ztab/main_ui/MainUI.Type.js";
import { SidebarUI } from "../../src/ztab/main_ui/sidebar/Sidebar.UI.js";
import { SearchElemObserver } from "../../src/ztab/other/SearchElemObserver.js";
import { settingsUI } from "../../src/ztab/settingsUI/export.js";
import { zt } from "../zt.js";
import { MainUIElem } from "./MainUIElem.js";
import { MainUIListener } from "./MainUIListener.js";
export class MainUI extends UIParent {
    static ZTAB_PASSWORD_TAB = {
        PASSWORDS: "passwords",
        TRASH: "trash",
        FAVOURITES: "favourites",
        SHARED_BY_ME: "shared_by_me",
        SHARED_WITH_ME: "shared_with_me"
    };
    elem1;
    listener = new MainUIListener();
    searchElemObserver = new SearchElemObserver();
    sidebarUI = new SidebarUI();
    data = new MainUIData();
    init() {
        this.init = () => { };
        this.listener.p = this;
        this.elem1 = new MainUIElem();
        globalDomListener.register("main_ui", this.listener);
        this.addWindowAdjustmentListener();
    }
    addWindowAdjustmentListener() {
        $(window).bind('resize', this.handleWindowAdjustment);
    }
    async handleWindowAdjustment(_e) {
        $(window).unbind('resize');
        zt.mainUI.addLeftMenuScroller();
        await js.time.delay(0.2);
        zt.mainUI.addWindowAdjustmentListener();
    }
    addLeftMenuScroller() {
        UIUtil1.inst.slimScroll(this.select("#mainMenu"), document.documentElement.clientHeight - 60);
    }
    async showUI() {
        this.init();
        this.elem1.init();
        this.elem = this.elem1.container;
        this.sidebarUI.showUI();
        await this.data.init();
        this.initDp();
        this.searchElemObserver.init();
        await zt.taskHandler.init();
        const tab = zt.taskHandler.getTab() || { type: MainUITabType.PASSWORDS };
        const tabShowPromise = this.showTab(tab);
        this.addLeftMenuScroller();
        js.dom.setContent("#output", this.elem1.container);
        await tabShowPromise;
        zt.taskHandler.performTask();
    }
    async showTab(tab) {
        try {
            this.sidebarUI.highlight(tab);
            switch (tab.type) {
                case MainUITabType.PASSWORDS: return zt.passwordsUI.showUI(tab.passwordTab);
                case MainUITabType.FOLDERS: return zt.foldersUI.showUI();
                case MainUITabType.SETTINGS: return settingsUI.showUI();
                default:
                    throw ErrorCode.UNHANDLED_CASE;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async initDp() {
        try {
            const dp = await bgApi.user.getDp();
            this.selectAll("[data-name='dp']").forEach(x => x.src = dp);
        }
        catch (e) {
            logError(e);
        }
    }
    showDotLoading(showInSeconds = 0) {
        try {
            const dotLoadingElem = js.selector.select("#dot_loading");
            js.dom.showOld(dotLoadingElem);
            const timeout_id = setTimeout(() => dotLoadingElem.style.opacity = "1", showInSeconds * 1000);
            globalNodeData.setNodeData(dotLoadingElem, { timeout_id });
        }
        catch (e) {
            logError(e);
        }
    }
    hideDotLoading() {
        try {
            const dotLoadingElem = js.selector.select("#dot_loading");
            const nodeData = globalNodeData.getNodeData(dotLoadingElem);
            if (nodeData) {
                const { timeout_id } = nodeData;
                clearTimeout(timeout_id);
            }
            dotLoadingElem.style.opacity = "0";
            js.dom.hideOld(dotLoadingElem);
        }
        catch (e) {
            logError(e);
        }
    }
    showCompleteLoading() {
        js.dom.showNoError("#complete_loading");
    }
    hideCompleteLoading() {
        js.dom.hideNoError("#complete_loading");
    }
    async syncing() {
        try {
            this.setSyncingIcon(true);
        }
        catch (e) {
            logError(e);
        }
    }
    async synced() {
        try {
            this.setSyncingIcon(false);
            const userSync = await zlocalStorage.load(LocalStorageKeys.USER_SYNC, false);
            if (userSync) {
                VUI.notification.showSuccess(i18n(VI18N.SYNC_COMPLETED), 1);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    setSyncingIcon(syncing) {
        try {
            const syncIcon = this.elem1.syncIcon;
            if (syncing) {
                syncIcon.dataset.tooltip_content = i18n(VI18N.SYNCING);
                syncIcon.classList.add(VaultCSS.SYNCING_ANIMATION);
                return;
            }
            syncIcon.classList.remove(VaultCSS.SYNCING_ANIMATION);
            syncIcon.dataset.tooltip_content = i18n(VI18N.SYNC);
        }
        catch (e) {
            logError(e);
        }
    }
}
