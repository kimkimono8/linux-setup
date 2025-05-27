import { AlertUI } from "../../src/common/common.js";
import { VaultCSS } from "../../src/service/VUi/VaultCSS.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { VtSettings } from "../../src/service/vt/constants/VtSettings.js";
import { MainUITabType } from "../../src/ztab/main_ui/MainUI.Type.js";
import { ProfilePanelController } from "../../src/ztab/main_ui/ProfilePanel/ProfilePanelController.js";
import { zt } from "../zt.js";
export class MainUIListener {
    p = null;
    clicked_show_tab(e) {
        const tabName = js.selector.closest(e.target, "[data-tab_name]").dataset.tab_name;
        this.p.showTab({ type: js.tsUtil.getEnum(tabName, MainUITabType) });
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
    openWebUI() {
        bgApi.vault.openWebUI();
    }
    clickedToggleProfilePanel() {
        ProfilePanelController.inst.toggleUI();
    }
    clickedSync(e) {
        const syncIcon = e.target;
        const syncing = syncIcon.classList.contains(VaultCSS.SYNCING_ANIMATION);
        if (syncing) {
            return;
        }
        bgApi.vault.sync();
    }
    async clickedToggleDarkMode() {
        const toDarkMode = !(await zlocalStorage.load(VtSettings.DARK_MODE));
        zt.theme.setDarkMode(toDarkMode);
    }
}
