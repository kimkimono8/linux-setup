import { BasePasswordMoreActionsCli } from "../../common/ui/components/BasePasswordMoreActionsCli.js";
import { zt } from "../zt.js";
export class ZTPasswordMoreActionsCli extends BasePasswordMoreActionsCli {
    static get inst() {
        return this.instance || (this.instance = new ZTPasswordMoreActionsCli());
    }
    enableAccessControl() {
        return zt.passwordsOldUI.accessControlUI.enableAccessControl(this.secret.id);
    }
}
