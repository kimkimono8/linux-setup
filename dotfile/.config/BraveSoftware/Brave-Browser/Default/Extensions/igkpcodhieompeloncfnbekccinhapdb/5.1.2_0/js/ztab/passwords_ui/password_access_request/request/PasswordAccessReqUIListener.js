import { BasePasswordFormUIListener } from "../../BasePasswordFormUIListener.js";
export class PasswordAccessRequestUIListener extends BasePasswordFormUIListener {
    p = null;
    clickedRequest() {
        this.p.requestAccess();
    }
    handleImmediateAccessSelect() {
        try {
            this.p.hide("[data-time_container]");
        }
        catch (e) {
            throw jserror(e);
        }
    }
    handleAdvanceApprovalSelect() {
        try {
            this.p.show("[data-time_container]");
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
