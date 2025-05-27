import { globalDomListener } from "../../../common/ui/globalDomListener.js";
import { UIUtil1 } from "../../../common/ui/ui_util.js";
import { SecretAccessControlAutoApproveInfo } from "../../../src/service/bgApi/types.js";
import { LocalStorageKeys } from "../../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../../src/service/vt/VI18n.js";
import { BasePasswordFormUI } from "../BasePasswordFormUI.js";
import { PasswordAccessControlUIListener } from "./PasswordAccessControlUIListener.js";
export class PasswordAccessControlUI extends BasePasswordFormUI {
    containerSelector = "#access_control_form";
    overlaySelector = "#access_control_overlay";
    templateSelector = "#access_control_template";
    dropDownUserTemplateSelector = "#access_control_dropdown_user_template";
    dropDownUserTemplate = null;
    p = null;
    listener = new PasswordAccessControlUIListener();
    userName = "";
    userAutoId = "";
    secretId = "";
    constructor() {
        super();
        js.fn.bindThis(this, [
            this.searchOtherAdminsSelect2,
            this.formatDropdownUserSelect2
        ]);
    }
    async init() {
        this.init = async () => { };
        this.listener.p = this;
        this.dropDownUserTemplate = js.selector.select(this.dropDownUserTemplateSelector);
        this.userName = await zlocalStorage.load(LocalStorageKeys.USERNAME, "");
        this.userAutoId = await zlocalStorage.load(LocalStorageKeys.USER_ID, "");
        globalDomListener.register("access_control", this.listener);
    }
    async enableAccessControl(secretId) {
        try {
            this.secretId = secretId;
            await this.showUI();
            this.text("[data-save]", i18n(VI18N.SAVE_AND_ENABLE));
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async manageAccessControl(secretId) {
        try {
            const existingSetting = await bgApi.accessCtrl.getAccessCtrlSettings(secretId);
            this.secretId = secretId;
            await this.showUI();
            this.fillInfo(existingSetting);
            this.text("[data-save]", i18n(VI18N.UPDATE));
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async showUI() {
        try {
            await this.init();
            if (this.elem) {
                this.elem.remove();
            }
            this.elem = UIUtil.createElem({ preRender: true, template: this.templateSelector });
            await this.initSecretName();
            this.initSelect2();
            UIUtil1.inst.slimScroll(this.select("[data-access_control_body]"), document.documentElement.clientHeight - 50);
            this.showContainer();
        }
        catch (e) {
            throw jserror(e);
        }
    }
    fillInfo(input) {
        try {
            this.select("[data-admins_select] option").remove();
            this.fillSelectInfo("[data-admins_select]", input.admins);
            this.fillSelectInfo("[data-exclude_users_select]", input.excludeUsers);
            if (input.dualApproval) {
                this.select("[data-dual_approval]").checked = true;
            }
            this.select("[data-request_timeout]").value = input.requestTimeout + "";
            this.select("[data-checkout_timeout]").value = input.accessTimeMinutes + "";
            if (input.autoApprove) {
                this.select("[data-auto_approve]").checked = true;
                this.fillAutoApproveOption(input.autoApproveInfo);
            }
        }
        catch (e) {
            throw jserror(e);
        }
    }
    fillSelectInfo(selector, users) {
        try {
            const selectElem = this.select(selector);
            for (let user of users) {
                selectElem.append(new Option(user.name, user.userAutoId));
            }
            $(selectElem).val(users.map(x => x.userAutoId)).trigger("change.select2");
        }
        catch (e) {
            throw jserror(e);
        }
    }
    fillAutoApproveOption(autoApproveInfo) {
        try {
            const optionsContainer = this.p.select("[data-auto_approve_options]");
            const DISABLED_CLASS = "disabled";
            optionsContainer.classList.remove(DISABLED_CLASS);
            js.dom.hideOld(js.selector.selectFrom(optionsContainer, "[data-overlay]"));
            if (autoApproveInfo.byTicket) {
                this.select("input[value='ticket']").checked = true;
                return;
            }
            if (autoApproveInfo.weekDays) {
                this.select("input[value='week_days']").checked = true;
                return;
            }
            if (autoApproveInfo.weekEnds) {
                this.select("input[value='week_ends']").checked = true;
                return;
            }
            if (autoApproveInfo.timeRange) {
                this.select("input[value='time']").checked = true;
                const timeRange = autoApproveInfo.timeRange;
                const [fromDiv, toDiv] = js.selector.selectAll("[data-time_container]", optionsContainer);
                const [fromHourSelect, fromMinSelect] = js.selector.selectAll("select", fromDiv);
                const [toHourSelect, toMinSelect] = js.selector.selectAll("select", toDiv);
                $(fromHourSelect).val(timeRange.from.hours + "").trigger("change.select2");
                $(fromMinSelect).val(timeRange.from.minutes + "").trigger("change.select2");
                $(toHourSelect).val(timeRange.to.hours + "").trigger("change.select2");
                $(toMinSelect).val(timeRange.to.minutes + "").trigger("change.select2");
                return;
            }
            throw "INVALID_STATE";
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async initSecretName() {
        try {
            const secret = await bgApi.secret.getSecret(this.secretId);
            this.text("[data-secret_name]", secret.name);
            this.p.util.addLogoElem(this.elem, secret);
            this.text("[data-created_on]", js.date.formatDateMonDYYYY(secret.created_on));
        }
        catch (e) {
            throw jserror(e);
        }
    }
    initSelect2() {
        try {
            const adminsSelect = this.select("[data-admins_select]");
            adminsSelect.append(new Option(this.userName, this.userAutoId, true, true));
            $(adminsSelect).select2({
                ajax: {
                    delay: 250,
                    transport: this.searchOtherAdminsSelect2
                },
                templateResult: this.formatDropdownUserSelect2
            });
            this.preventCurrentUserDeselect(adminsSelect);
            const excludeUsersSelect = this.select("[data-exclude_users_select]");
            $(excludeUsersSelect).select2({
                ajax: {
                    delay: 250,
                    transport: this.searchExcludeUsersSelect2
                },
                templateResult: this.formatDropdownUserSelect2
            });
            this.initTimeSelect2("[data-from_hour_select]", 0, 24);
            this.initTimeSelect2("[data-from_mins_select]", 0, 60);
            this.initTimeSelect2("[data-to_hour_select]", 0, 24);
            this.initTimeSelect2("[data-to_mins_select]", 0, 60);
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
    async searchOtherAdminsSelect2(parameters, successCallbackFn) {
        try {
            const searchString = parameters.data.term || "";
            const users = await bgApi.user.searchAdmins(searchString);
            const select2Users = [];
            let reqSelect2User = null;
            for (let user of users) {
                reqSelect2User = { ...user, id: user.userAutoId, text: user.name };
                select2Users.push(reqSelect2User);
            }
            successCallbackFn({
                results: select2Users
            });
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async searchExcludeUsersSelect2(parameters, successCallbackFn) {
        try {
            const searchString = parameters.data.term || "";
            const users = await bgApi.user.searchUsers(searchString);
            const select2Users = [];
            let reqSelect2User = null;
            for (let user of users) {
                reqSelect2User = { ...user, id: user.userAutoId, text: user.name };
                select2Users.push(reqSelect2User);
            }
            successCallbackFn({
                results: select2Users
            });
        }
        catch (e) {
            throw jserror(e);
        }
    }
    formatDropdownUserSelect2(user) {
        if (user.loading) {
            return i18n(VI18N.SEARCHING) + "...";
        }
        const elem = UIUtil.createElem({ template: this.dropDownUserTemplate });
        js.dom.setChildText(elem, "[data-name]", user.name);
        js.dom.setChildText(elem, "[data-email]", user.email);
        const dpElem = js.selector.selectFrom(elem, "[data-dp]");
        bgApi.user.getDpOf(user.zuid).then(dp => dpElem.src = dp);
        return $(elem);
    }
    preventCurrentUserDeselect(selectElem) {
        const h = this;
        $(selectElem).on("select2:unselecting", function (event) {
            const toBeRemovedId = event.params.args.data.id;
            const preventDeselect = toBeRemovedId == h.userAutoId;
            if (preventDeselect) {
                event.preventDefault();
            }
        });
    }
    async updateAccessControl() {
        try {
            const apiInput = {
                secretId: this.secretId,
                admins: this.getSelectedSelect2Ids("[data-admins_select]"),
                excludeUsers: this.getSelectedSelect2Ids("[data-exclude_users_select]"),
                dualApproval: this.select("[data-dual_approval]").checked,
                requestTimeout: parseInt(this.select("[data-request_timeout]").value),
                accessTimeMinutes: parseInt(this.select("[data-checkout_timeout]").value),
                autoApprove: this.select("[data-auto_approve]").checked,
                autoApproveInfo: null
            };
            const fillSelectedAutoApproveOption = apiInput.autoApprove;
            if (fillSelectedAutoApproveOption) {
                apiInput.autoApproveInfo = this.getAutoApproveInfo();
            }
            const isNotValid = !this.checkApiInput(apiInput);
            if (isNotValid) {
                return;
            }
            await bgApi.accessCtrl.update(apiInput);
            VUI.notification.showSuccess(i18n(VI18N.ACCESS_CONTROL_SAVED_SUCCESS));
            this.hideForm();
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getBasePasswordsUI() {
        return this.p;
    }
    getSelectedSelect2Ids(selector) {
        try {
            const selectedUsers = $(this.select(selector)).select2("data");
            const ids = selectedUsers.map(x => x.id);
            return ids;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getAutoApproveInfo() {
        try {
            const autoApproveInfo = new SecretAccessControlAutoApproveInfo();
            const optionsContainer = this.p.select("[data-auto_approve_options]");
            const checkedInput = js.selector.selectFrom(optionsContainer, "input[name='access_control_auto_approve_mode']:checked");
            switch (checkedInput.value) {
                case "ticket":
                    autoApproveInfo.byTicket = true;
                    break;
                case "week_days":
                    autoApproveInfo.weekDays = true;
                    break;
                case "week_ends":
                    autoApproveInfo.weekEnds = true;
                    break;
                case "time":
                    {
                        const [fromDiv, toDiv] = js.selector.selectAll("[data-time_container]", optionsContainer);
                        autoApproveInfo.timeRange = {
                            from: this.getAutoApproveTime(fromDiv),
                            to: this.getAutoApproveTime(toDiv)
                        };
                    }
                    break;
            }
            return autoApproveInfo;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getAutoApproveTime(timeDiv) {
        try {
            const [hourInput, minuteInput] = js.selector.selectAll("select", timeDiv);
            const reqTime = {
                hours: parseInt($(hourInput).val()),
                minutes: parseInt($(minuteInput).val())
            };
            return reqTime;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    checkApiInput(input) {
        try {
            const minAdminCount = input.dualApproval ? 2 : 1;
            const hasInValidAdminCount = input.admins.length < minAdminCount;
            if (hasInValidAdminCount) {
                VUI.notification.showError(i18n(VI18N.ACCESS_CONTROL_SELECT_ANOTHER_APPROVER));
                return false;
            }
            const checkTime = input.autoApprove && (input.autoApproveInfo.timeRange != null);
            const hasInValidTime = checkTime && !(this.checkTimeRange(input.autoApproveInfo.timeRange));
            if (hasInValidTime) {
                VUI.notification.showError(i18n(VI18N.ACCESS_CONTROL_INVALID_TIME));
                return false;
            }
            return true;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    checkTimeRange(timeRange) {
        try {
            const from = (timeRange.from.hours * 60) + timeRange.from.minutes;
            const to = (timeRange.to.hours * 60) + timeRange.to.minutes;
            return from < to;
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
