import { zt } from "../../../zt.js";
import { BasePasswordFormUI } from "../../BasePasswordFormUI.js";
export class BasePasswordAccessPendingUI extends BasePasswordFormUI {
    p = null;
    containerSelector = "#access_control_request_container";
    overlaySelector = "#access_control_request_pending_overlay";
    templateSelector = "#access_control_request_pending_template";
    secret = null;
    async showUI(secret) {
        try {
            this.secret = secret;
            if (this.elem) {
                this.elem.remove();
            }
            this.elem = UIUtil.createElem({ preRender: true, template: this.templateSelector });
            zt.mainUI.showDotLoading();
            this.initSecretName();
            await this.fillInfo();
            this.showContainer();
        }
        catch (e) {
            throw jserror(e);
        }
        finally {
            zt.mainUI.hideDotLoading();
        }
    }
    async fillInfo() {
        throw "not implemented";
    }
    initSecretName() {
        try {
            this.text("[data-secret_name]", this.secret.name);
            this.p.p.util.addLogoElem(this.elem, this.secret);
            this.text("[data-created_on]", js.date.formatDateMonDYYYY(this.secret.created_on));
        }
        catch (e) {
            throw jserror(e);
        }
    }
    fillApprovalInfo(approvals) {
        try {
            const hasNoApprovals = approvals.length == 0;
            if (hasNoApprovals) {
                this.hide("[data-approval_container]");
                return;
            }
            const fragment = document.createDocumentFragment();
            for (let curApproval of approvals) {
                fragment.append(this.getApprovalRow(curApproval));
            }
            const approvalListElem = this.select("[data-approval_list");
            approvalListElem.append(fragment);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getApprovalRow(approval) {
        try {
            const elem = UIUtil.createElem({ template: "#access_approval_info_row_template" });
            js.dom.setChildText(elem, "[data-status]", approval.status);
            js.dom.setChildText(elem, "[data-admin_name]", approval.adminName);
            js.dom.setChildText(elem, "[data-comment]", approval.comment);
            return elem;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getBasePasswordsUI() {
        return this.p.p;
    }
}
