import { UIUtil1 } from "../../common/ui/ui_util.js";
import { AlertUI } from "../../src/common/common.js";
import { pp } from "../../src/popup/pp.js";
import { i18n } from "../../src/provider/vt/i18n.js";
import { SecretQuery } from "../../src/service/bgApi/types/SecretQuery.js";
import { VtSettings } from "../../src/service/vt/constants/VtSettings.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
export class MainUIListener {
    p = null;
    constructor() {
        this.close_profile_panel_on_click = this.close_profile_panel_on_click.bind(this);
    }
    keyed_search_string(e) {
        if (VUI.keyboard.isControlKey(e.key)) {
            return;
        }
        const inputElem = e.target;
        const activeTabName = js.selector.select(".nav-menu-active").parentElement.dataset.tab_name;
        inputElem.dataset.last_tab = activeTabName;
        this.p.showTab(pp.mainUI.PP_TABS.PASSWORDS);
    }
    clicked_show_tab(e) {
        const tabName = js.selector.closest(e.target, "[data-tab_name]").dataset.tab_name;
        this.p.showTab(tabName);
    }
    clicked_clear_search(e) {
        UIUtil1.inst.clickedClearSearch(e);
    }
    async clicked_show_domain_matching_icon() {
        const iconElem = js.selector.select("#show_domain_matching_icon");
        const enable = !iconElem.classList.contains("disabled");
        iconElem.classList.toggle("disabled");
        js.dom.hideNoError("#folder_filter_overlay", "#folder_filter_overlay_color_bg");
        const query = await zsessionStorage.load(pp.passwordsUI.PP_QUERY_KEY, null) || SecretQuery.newBuilder().orderByDomainFavourite().build();
        query.domainMatching = enable;
        const filter = js.selector.select("[data-domain_matching_filter]");
        if (filter) {
            filter.checked = enable;
            await pp.passwordsUI.filterUI.updater.updateFilter(query);
            return;
        }
        await zsessionStorage.save(pp.passwordsUI.PP_QUERY_KEY, query);
        this.p.showTab(this.p.PP_TABS.PASSWORDS);
    }
    async clicked_sign_out() {
        const confirmed = await AlertUI.inst.createAlert()
            .title(i18n(VI18N.SIGN_OUT_CONFIRM))
            .addButton("confirm", AlertUI.inst.createButton().text(i18n(VI18N.SIGN_OUT)).value(true).build())
            .addButton("cancel", AlertUI.inst.createButton().text(i18n(VI18N.CANCEL)).value(false).build())
            .dangerMode(true)
            .show();
        if (!confirmed) {
            return;
        }
        bgApi.login.signOut();
        await js.dom.closeWindow();
    }
    async clicked_lock() {
        await bgApi.login.lock();
        window.location.reload();
        await js.time.delay(0.1);
        window.close();
    }
    async clicked_open_tab_view() {
        await bgApi.ztab.openZTab();
        await js.dom.closeWindow();
    }
    clicked_open_web_app() {
        bgApi.vault.openWebUI();
        js.dom.closeWindow();
    }
    async clicked_toggle_dark_mode() {
        const toDarkMode = !(await zlocalStorage.load(VtSettings.DARK_MODE, false));
        pp.theme.setDarkMode(toDarkMode);
    }
    clicked_toggle_profile_panel() {
        const elem = this.p.elem;
        const profileElem = js.selector.selectFrom(elem, "#profile");
        const closePanel = profileElem.classList.contains("vault-expand");
        profileElem.classList.toggle("vault-expand");
        const toggleElem = js.selector.selectFrom(elem, "[data-toggle_profile_panel]");
        if (closePanel) {
            document.removeEventListener("click", this.close_profile_panel_on_click);
            toggleElem.dataset.tooltip_content = "i18n:open_profile_panel";
            return;
        }
        toggleElem.dataset.tooltip_content = "i18n:close_profile_panel";
        setTimeout(() => document.addEventListener("click", this.close_profile_panel_on_click), 100);
    }
    close_profile_panel_on_click(e) {
        const profileElem = js.selector.select("#profile");
        if (profileElem.contains(e.target)) {
            return;
        }
        this.clicked_toggle_profile_panel();
    }
}
