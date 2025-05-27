import { globalDomListener } from "../../../../common/ui/globalDomListener.js";
import { InvalidCharConsumer } from "../../../../common/ui/util/InvalidCharConsumer.js";
import { regexUtil } from "../../../../common/util/regexUtil.js";
import { VI18N } from "../../../../src/service/vt/VI18n.js";
import { zt } from "../../../zt.js";
import { BasePasswordFormUI } from "../../BasePasswordFormUI.js";
import { PasswordAccessRequestUIListener } from "./PasswordAccessReqUIListener.js";
export class PasswordAccessReqUI extends BasePasswordFormUI {
    p = null;
    containerSelector = "#access_control_request_container";
    overlaySelector = "#access_control_request_overlay";
    templateSelector = "#access_control_request_template";
    listener = new PasswordAccessRequestUIListener();
    secret = null;
    init(p) {
        this.p = p;
        this.listener.p = this;
        globalDomListener.register("access_request", this.listener);
    }
    async showUI(secret) {
        try {
            zt.mainUI.showDotLoading();
            this.secret = secret;
            if (this.elem) {
                this.elem.remove();
            }
            this.elem = UIUtil.createElem({ preRender: true, template: this.templateSelector });
            this.initSecretName();
            this.initDate();
            this.initTime();
            this.addInvalidCharListener();
            await this.initHelpdeskTicketId();
            this.showContainer();
        }
        catch (e) {
            throw jserror(e);
        }
        finally {
            zt.mainUI.hideDotLoading();
        }
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
    getBasePasswordsUI() {
        return this.p.p;
    }
    initDate() {
        try {
            const dateInput = this.select("[data-request_date]");
            const date = new Date();
            const todayString = this.getDateValueInputString(date);
            date.setDate(date.getDate() + 6);
            const endDayString = this.getDateValueInputString(date);
            dateInput.min = todayString;
            dateInput.max = endDayString;
            dateInput.value = todayString;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    initTime() {
        try {
            this.initTimeSelect2("[data-hour_select]", 0, 24);
            this.initTimeSelect2("[data-minute_select]", 0, 60);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    initTimeSelect2(selector, inclusiveStart, exclusiveEnd) {
        try {
            const timeSelect = this.select(selector);
            for (let i = inclusiveStart; i < exclusiveEnd; i++) {
                timeSelect.append(new Option((i + "").padStart(2, "0"), i + "", false, false));
            }
            $(timeSelect).select2({
                minimumResultsForSearch: -1, dropdownParent: $(this.elem)
            });
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getDateValueInputString(date) {
        try {
            if (!date) {
                throw "empty date";
            }
            const dateRegex = /\d\d\d\d-\d\d-\d\d/;
            const reqDateString = dateRegex.exec(date.toISOString())[0];
            return reqDateString;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async requestAccess() {
        try {
            const input = {
                secretId: this.secret.id,
                reason: this.getReasonElem().value,
                requestAdvance: this.select("[data-advance_request]").checked
            };
            if (input.requestAdvance) {
                input.date = this.select("[data-request_date]").value;
                input.hour = parseInt($(this.select("[data-hour_select]")).val());
                input.minutes = parseInt($(this.select("[data-minute_select]")).val());
            }
            const isNotValid = !this.checkInput(input);
            if (isNotValid) {
                return;
            }
            const ticketIdInput = this.getTicketIdInput();
            if (ticketIdInput.value) {
                input.ticketId = ticketIdInput.value;
            }
            zt.mainUI.showDotLoading();
            await bgApi.accessCtrl.createRequest(input);
            VUI.notification.showSuccess(i18n(VI18N.ACCESS_REQUEST_CREATED_SUCCESS));
            this.hideForm();
        }
        catch (e) {
            throw jserror(e);
        }
        finally {
            zt.mainUI.hideDotLoading();
        }
    }
    checkInput(input) {
        try {
            const reasonErrorSelector = "[data-field_row='reason'] [data-error]";
            const hasEmptyReason = input.reason.length == 0;
            if (hasEmptyReason) {
                this.text(reasonErrorSelector, i18n(VI18N.PLEASE_ENTER) + " " + i18n(VI18N.REASON).toLowerCase());
                return false;
            }
            const invalidReasonChars = regexUtil.getNonClearTextChars(input.reason);
            const hasInValidReason = invalidReasonChars.length > 0;
            if (hasInValidReason) {
                const errorMsg = i18n(VI18N.REASON) + " " + i18n(VI18N.MUST_NOT_CONTAIN) + " " + invalidReasonChars.join(", ");
                this.text(reasonErrorSelector, errorMsg);
                return false;
            }
            const hasInValidDate = input.requestAdvance && !(input.date);
            if (hasInValidDate) {
                VUI.notification.showError(i18n(VI18N.INVALID_DATE_ERROR));
                return false;
            }
            return true;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getReasonElem() {
        try {
            const reasonElem = this.select("[data-reason]");
            if (!reasonElem) {
                throw "INVALID_STATE";
            }
            return reasonElem;
        }
        finally {
        }
    }
    addInvalidCharListener() {
        try {
            const reasonElem = this.getReasonElem();
            new InvalidCharConsumer().consumeInvalidChars(reasonElem, regexUtil.vaultRegex.cleartext);
        }
        catch (e) {
            logError(e);
        }
    }
    async initHelpdeskTicketId() {
        try {
            const isHelpdeskEnabled = await bgApi.accessCtrl.isHelpdeskEnabled(this.secret.id);
            if (!isHelpdeskEnabled) {
                return;
            }
            js.dom.show(this.select("[data-ticket_container]"));
            new InvalidCharConsumer().consumeInvalidChars(this.getTicketIdInput(), regexUtil.vaultRegex.cleartext);
        }
        catch (e) {
            logError(e);
        }
    }
    getTicketIdInput() {
        try {
            return this.select("[data-ticket_id]");
        }
        catch (e) {
            logError(e);
            throw "CANNOT_GET_TICKET_ID_INPUT";
        }
    }
}
