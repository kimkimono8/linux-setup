import { globalDomListener } from "../../../../common/ui/globalDomListener.js";
import { AlertUI } from "../../../../src/common/common.js";
import { VI18N } from "../../../../src/service/vt/VI18n.js";
import { zt } from "../../../zt.js";
import { BasePasswordAccessPendingUI } from "./BasePasswordAccessPendingUI.js";
import { PasswordAccessPendingUIListener } from "./PasswordAccessPendingUIListener.js";
export class PasswordAccessPendingUI extends BasePasswordAccessPendingUI {
    listener = new PasswordAccessPendingUIListener();
    pendingInfo = null;
    init(p) {
        this.p = p;
        this.listener.p = this;
        globalDomListener.register("access_pending_request", this.listener);
    }
    async showApprovedLaterUI(secret) {
        try {
            await this.showUI(secret);
            this.text("[data-descripton]", i18n(VI18N.ADVANCE_REQUEST_APPROVED_DESCRIPTION));
            this.hide("[data-cancel_container]");
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async showCheckoutUI(secret) {
        try {
            await this.showUI(secret);
            this.text("[data-descripton]", i18n(VI18N.ACCESS_CHECKOUT_DESCRIPTION));
            this.hide("[data-request_detail_container]", "[data-cancel_container]");
            this.show("[data-checkout_container]");
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async fillInfo() {
        try {
            this.pendingInfo = await bgApi.accessCtrl.getAccessPendingUIInfo(this.secret.access_request_id);
            this.text("[data-reason]", this.pendingInfo.reason);
            this.text("[data-requested_on]", this.pendingInfo.requestedOn);
            if (this.pendingInfo.accessRequiredOn) {
                this.text("[data-access_required_on]", this.pendingInfo.accessRequiredOn);
            }
            else {
                this.hide("[data-access_required_on_container]");
            }
            this.text("[data-request_status]", this.pendingInfo.status);
            this.fillHelpdeskErrorInfo();
            this.fillApprovalInfo(this.pendingInfo.approvals);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async cancelAccessRequest() {
        try {
            const requestId = this.pendingInfo.requestId;
            zt.mainUI.showDotLoading();
            await bgApi.accessCtrl.cancel(requestId);
            VUI.notification.showSuccess(i18n(VI18N.CANCEL_ACCESS_REQUEST_SUCCESS));
            this.hideForm();
        }
        catch (e) {
            throw jserror(e);
        }
        finally {
            zt.mainUI.hideDotLoading();
        }
    }
    async checkoutSecret() {
        try {
            const confirmed = await AlertUI.inst.createAlert()
                .title(" ")
                .text(i18n(VI18N.CONFIRM_CHECKOUT_DESCRIPTION))
                .addButton("confirm", AlertUI.inst.createButton().text(i18n(VI18N.CHECKOUT)).value(true).build())
                .addButton("cancel", AlertUI.inst.createButton().text(i18n(VI18N.CANCEL)).value(false).build())
                .show();
            if (!confirmed) {
                return;
            }
            const requestId = this.pendingInfo.requestId;
            zt.mainUI.showDotLoading();
            await bgApi.accessCtrl.checkout(requestId, this.secret.id);
            VUI.notification.showSuccess(i18n(VI18N.CHECKOUT_SUCCESS));
            this.hideForm();
        }
        catch (e) {
            throw jserror(e);
        }
        finally {
            zt.mainUI.hideDotLoading();
        }
    }
    fillHelpdeskErrorInfo() {
        try {
            const errorInfo = this.pendingInfo.helpdeskError;
            if (!errorInfo) {
                this.hide("[data-helpdesk_error]");
                return;
            }
            this.text("[data-ticket_id]", errorInfo.ticketId);
            this.text("[data-helpdesk_status]", errorInfo.status);
            this.text("[data-helpdesk_error_message]", errorInfo.errorMessage);
        }
        catch (e) {
            logError(e);
        }
    }
}
