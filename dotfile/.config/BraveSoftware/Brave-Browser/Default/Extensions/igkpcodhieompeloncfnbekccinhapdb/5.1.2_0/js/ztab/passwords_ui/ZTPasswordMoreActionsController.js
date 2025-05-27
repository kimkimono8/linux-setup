import { BasePasswordMoreActionsController } from "../../common/ui/components/BasePasswordMoreActionsController.js";
import { zt } from "../zt.js";
import { ZTPasswordMoreActionsCli } from "./ZTPasswordMoreActionsCli.js";
import { ZTPasswordMoreActionsUI } from "./ZTPasswordMoreActionsUI.js";
export class ZTPasswordMoreActionsController extends BasePasswordMoreActionsController {
    static instance = null;
    static get inst() {
        return this.instance || (this.instance = new ZTPasswordMoreActionsController());
    }
    getCliInstance() {
        return ZTPasswordMoreActionsCli.inst;
    }
    getUIInstance() {
        return new ZTPasswordMoreActionsUI();
    }
    onEditInput() {
        zt.passwordsOldUI.passwordEditUI.edit(this.cli.getSecret().id);
        this.hideUI();
    }
    async onAccessControlInput(fn) {
        this.ui.hideUI();
        await fn();
    }
}
