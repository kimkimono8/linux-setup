import { UIParent } from "../../../uiUtil/ui/UIParent.js";
export class _ProfiePanelUI extends UIParent {
    onOpenHelpInput(listener) {
        this.select(`[data-name="openHelp"]`).addEventListener("click", listener);
    }
    onOpenVideosInput(listener) {
        this.select(`[data-name="openVideos"]`).addEventListener("click", listener);
    }
    onShareFeedbackInput(listener) {
        this.select(`[data-name="shareFeedback"]`).addEventListener("click", listener);
    }
    onLockInput(listener) {
        this.select(`[data-name="lockVault"]`).addEventListener("click", listener);
    }
    onSignOutInput(listener) {
        this.select(`[data-name="signOut"]`).addEventListener("click", listener);
    }
    init() {
        this.elem = UIUtil.createElem({ preRender: true, template: "#profile_panel_template" });
    }
    isShown() {
        return Boolean(this.elem && this.elem.parentElement);
    }
    showUI() {
        document.body.append(this.elem);
    }
    hideUI() {
        if (this.elem && this.elem.parentElement) {
            this.elem.remove();
        }
    }
    onCloseInput(listener) {
        this.select(`[data-name="closePanel"]`).addEventListener("click", listener);
    }
    setNameEmail(name, email) {
        js.dom.setChildText(this.elem, `[data-name="username"]`, name);
        js.dom.setChildText(this.elem, `[data-name="email"]`, email);
    }
    setDp(dp) {
        this.select("[data-name='dp']").src = dp;
    }
    includesElem(elem) {
        return this.elem.contains(elem);
    }
}
