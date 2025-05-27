import { UIUtil1 } from "../../../../common/ui/ui_util.js";
import { Policy } from "../../../../src/service/bgApi/types/Generator.js";
import { SecretType } from "../../../../src/service/bgApi/types/SecretType.js";
import { LocalStorageKeys } from "../../../../src/service/storage/constants/LocalStorageKeys.js";
export class BasePasswordAddPolicyComponent {
    p = null;
    passwordInputPolicyChecker = new PasswordInputPolicyChecker(this);
    finalPasswordInputPolicyChecker = new FinalPasswordInputPolicyChecker(this);
    policyUsage = "";
    async createUI() {
        try {
            const policies = await bgApi.policy.getAll();
            this.policyUsage = await zlocalStorage.load(LocalStorageKeys.POLICY_USAGE, Policy.USAGE.DEFAULT);
            const selectPolicyId = await this.getInitSelectPolicyId();
            const fragment = document.createDocumentFragment();
            let selected = false;
            for (let policy of policies) {
                if (policy.id == "0") {
                    continue;
                }
                selected = selectPolicyId == policy.id;
                fragment.append(new Option(policy.name, policy.id, selected, selected));
            }
            const isPolicyEnforced = this.policyUsage == Policy.USAGE.ENFORCE;
            const select_input = this.getPolicySelect();
            select_input.append(fragment);
            if (this.policyUsage == Policy.USAGE.DEFAULT) {
                this.p.hide("[data-policy_container]");
            }
            $(select_input).select2({
                minimumResultsForSearch: 10,
                disabled: isPolicyEnforced
            });
            $(select_input).on('select2:select', this.p.listener.handlePolicyChange);
        }
        catch (e) {
            logError(e);
        }
    }
    async getPolicyUsage() {
        const policy_usage = await zlocalStorage.load(LocalStorageKeys.POLICY_USAGE, Policy.USAGE.DEFAULT);
        return policy_usage;
    }
    async getInitSelectPolicyId() {
        return this.getDefaultPolicyId();
    }
    async getDefaultPolicyId() {
        try {
            const defaultPolicyId = await zlocalStorage.load(LocalStorageKeys.DEFAULT_POLICY_ID, "");
            return defaultPolicyId;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async validateNonEmptyPasswordInputs() {
        try {
            const passwordInputs = this.p.secretTypeComponent.getMandatoryFields(SecretType.FIELD_TYPE.PASSWORD);
            const nonEmptyPasswordInputs = passwordInputs.filter(x => Boolean(x.value));
            nonEmptyPasswordInputs.forEach(x => this.checkPasswordInput(x));
        }
        catch (e) {
            logError(e);
        }
    }
    async checkPasswordInput(input) {
        return this.passwordInputPolicyChecker.check(input);
    }
    getPolicyId() {
        try {
            const policyId = $(this.getPolicySelect()).val() + "";
            return policyId;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    setPolicyId(policyId) {
        try {
            const policySelect = this.getPolicySelect();
            $(policySelect).val(policyId).trigger("change.select2");
        }
        catch (e) {
            logError(e);
        }
    }
    async setPolicyIdFromGenerator(policyId) {
        try {
            if (this.policyUsage != Policy.USAGE.ALLOW_USERS) {
                return;
            }
            const hasOptionElem = this.p.select(`option[value="${policyId}"]`);
            if (hasOptionElem) {
                this.setPolicyId(policyId);
                return;
            }
            const defaultPolicyId = await this.getDefaultPolicyId();
            this.setPolicyId(defaultPolicyId);
        }
        catch (e) {
            logError(e);
        }
    }
    getPolicySelect() {
        return this.p.select("[data-policy_select]");
    }
    async checkFinalPolicy() {
        try {
            const policy_usage = await zlocalStorage.load(LocalStorageKeys.POLICY_USAGE, Policy.USAGE.DEFAULT);
            const noNeedPolicyCheck = policy_usage == Policy.USAGE.DEFAULT;
            if (noNeedPolicyCheck) {
                return true;
            }
            const passwordInputs = this.p.secretTypeComponent.getMandatoryFields(SecretType.FIELD_TYPE.PASSWORD);
            let hasError = false;
            for (let input of passwordInputs) {
                hasError = await this.finalPasswordInputPolicyChecker.check(input);
                if (hasError) {
                    input.focus();
                    UIUtil1.inst.scrollIntoView(input);
                    return false;
                }
            }
            return true;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
class PasswordInputPolicyChecker {
    p = null;
    constructor(p) {
        this.p = p;
    }
    async check(input) {
        try {
            const fieldRowElem = js.selector.closest(input, "[data-field_row]");
            js.dom.setChildText(fieldRowElem, "[data-error]", "");
            const newPassword = input.value;
            if (!newPassword && this.isEmptyAllowed()) {
                return true;
            }
            const policyId = $(this.p.p.select("[data-policy_select]")).val() + "";
            const errorMsg = await bgApi.policy.checkPolicyPassword(newPassword, policyId);
            js.dom.setChildText(fieldRowElem, "[data-error]", errorMsg);
            const isValid = Boolean(errorMsg);
            return isValid;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    isEmptyAllowed() {
        return true;
    }
}
class FinalPasswordInputPolicyChecker extends PasswordInputPolicyChecker {
    isEmptyAllowed() {
        return false;
    }
}
