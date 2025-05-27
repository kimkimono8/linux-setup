import { _ProfilePanelCli } from "./_ProfilePanelCli.js";
import { _ProfiePanelUI } from "./_ProfilePanelUI.js";
export class ProfilePanelController {
    static instance = null;
    static get inst() {
        return this.instance || (this.instance = new ProfilePanelController().init());
    }
    init() {
        this.cli = _ProfilePanelCli.inst;
        this.onCloseClick = this.onCloseClick.bind(this);
        return this;
    }
    ui = null;
    cli = null;
    addListeners() {
        this.ui.onCloseInput(() => this.hideUI());
        this.ui.onLockInput(() => this.cli.lock());
        this.ui.onSignOutInput(() => this.cli.signOut());
        this.ui.onOpenHelpInput(() => {
            this.hideUI();
            this.cli.openHelp();
        });
        this.ui.onOpenVideosInput(() => {
            this.hideUI();
            this.cli.openVideos();
        });
        this.ui.onShareFeedbackInput(() => {
            this.hideUI();
            this.cli.shareFeedback();
        });
    }
    async showUI() {
        this.ui = new _ProfiePanelUI();
        this.ui.init();
        this.addListeners();
        const nameEmail = await this.cli.getNameEmail();
        this.ui.setNameEmail(nameEmail.name, nameEmail.email);
        this.ui.setDp(this.cli.getInitialDp());
        this.cli.getDp().then(dp => this.ui.setDp(dp));
        document.body.addEventListener("click", this.onCloseClick);
        this.ui.showUI();
    }
    async hideUI() {
        this.ui.hideUI();
        document.body.removeEventListener("click", this.onCloseClick);
    }
    toggleUI() {
        (this.ui && this.ui.isShown()) ? this.hideUI() : this.showUI();
    }
    onCloseClick(e) {
        if (this.ui.includesElem(e.target)) {
            return;
        }
        this.hideUI();
    }
}
