import { csLoginSubmitter } from "../../../../content_scripts/login/CSLoginSubmitter.js";
import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
import { InputType } from "../../../service/vt/constants/InputType.js";
import { loginUtil } from "../../loginUtil/export.js";
import { external, zicon } from "./Context.js";
export class ZIconChecker {
    storedSelectors = [];
    isSecretUrlLoginPage = false;
    async init() {
        try {
            this.check = js.fn.wrapper.createSingleInstTimedListener(this.check, this, 1);
            const resp = await Promise.all([
                bgApi.tab.loadZIconSelectors(),
                this.initIsSecretUrlLoginPage(),
            ]);
            this.storedSelectors = resp[0];
            await this.initCardAddressDetection();
            this.check();
            info("ZICON:", "icon checker initialized");
        }
        catch (e) {
            logError(e);
        }
    }
    async initIsSecretUrlLoginPage() {
        try {
            this.isSecretUrlLoginPage = await bgApi.tab.isLoginDomainPath();
        }
        catch (e) {
            logError(e);
        }
    }
    check() {
        try {
            if (!zicon.loggedIn) {
                return;
            }
            this.addForPasswordFields() ||
                this.addForHiddenPasswordFields() ||
                this.addForSingleUsername() ||
                this.addForSecretUrlLoginPage();
            this.addForTotpField();
            this.addForStoredSelectors();
            this.addForCards();
            this.addForAddresses();
        }
        catch (e) {
            logError(e);
        }
    }
    disableCheckForWeb() {
        this.check = js.fn.emptyFn;
    }
    addForSingleUsername() {
        try {
            const inputs = csutil.input.selectAll({
                visible: true,
                types: [InputType.TEXT, InputType.EMAIL],
                shadowRoot: false,
                editable: true,
            });
            if (inputs.length != 1) {
                return false;
            }
            const usernameInput = inputs[0];
            if (!this.isSingleUsername(usernameInput)) {
                return false;
            }
            const submitButton = csLoginSubmitter.getSubmitButton(usernameInput);
            const nonSubmitRegex = /subscribe/i;
            if (submitButton && nonSubmitRegex.test(submitButton.textContent)) {
                return false;
            }
            this.addIcon(usernameInput);
            return true;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    addForSecretUrlLoginPage() {
        try {
            if (!this.isSecretUrlLoginPage) {
                return false;
            }
            const usernameInput = csutil.input.getUsername({ visible: true, shadowRoot: false, editable: true });
            if (usernameInput) {
                this.addIcon(usernameInput);
                return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    isSingleUsername(input) {
        try {
            const autocompleteRegex = /username|email/i;
            if (autocompleteRegex.test(input.autocomplete)) {
                return true;
            }
            const placeholderRegex = autocompleteRegex;
            if (placeholderRegex.test(input.placeholder)) {
                return true;
            }
            const labelRegex = autocompleteRegex;
            if (labelRegex.test(input.ariaLabel)) {
                return true;
            }
            for (let label of Array.from(input.labels)) {
                if (labelRegex.test(label.textContent.toLocaleLowerCase())) {
                    return true;
                }
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    addForTotpField() {
        try {
            if (csutil.selector.select("textarea", { shadowRoot: false }) && csutil.selector.selectAll("textarea", { visible: true, shadowRoot: false }).length > 0) {
                return;
            }
            const inputTypes = [InputType.TEXT, InputType.EMAIL, InputType.PASSWORD, InputType.TEL, InputType.NUMBER];
            const visibleInputs = csutil.input.selectAll({ visible: true, types: inputTypes, shadowRoot: false, editable: true });
            if (visibleInputs.length != 1) {
                return;
            }
            const input = visibleInputs[0];
            if (input.disabled || input.readOnly || !loginUtil.isTotpInput(visibleInputs[0])) {
                return;
            }
            const container = loginUtil.getInputLoginContainer(input);
            if (!container) {
                this.addIcon(input);
                return;
            }
            const presentVisibleInputs = csutil.input.selectAll({ types: inputTypes, container, shadowRoot: false, editable: true }).filter(x => csutil.isVisible(x, false));
            if (presentVisibleInputs.length > 1) {
                return;
            }
            this.addIcon(input);
        }
        catch (e) {
            logError(e);
        }
    }
    addForStoredSelectors() {
        try {
            for (let selector of this.storedSelectors) {
                this.addForStoredSelector(selector);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    addForStoredSelector(selector) {
        try {
            const elem = csutil.uniqSelector.select(selector);
            if (!elem) {
                return;
            }
            if (!csutil.isVisible(elem)) {
                return;
            }
            this.addIcon(elem);
        }
        catch (e) {
            logError(e);
        }
    }
    addForPasswordFields() {
        try {
            const visiblePasswords = csutil.input.getPasswords({ visible: true, shadowRoot: false });
            for (let password of visiblePasswords) {
                if (zicon.adder.hasZIcon(password)) {
                    continue;
                }
                this.addIcon(password);
                this.addForTextBefore(password);
            }
            return visiblePasswords.length > 0;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    addForHiddenPasswordFields() {
        try {
            const passwords = csutil.input.getPasswords({ shadowRoot: false, editable: true });
            if (passwords.length == 0) {
                return false;
            }
            return passwords.map(x => this.addForHiddenPasswordField(x)).some(x => x);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    addForHiddenPasswordField(password) {
        try {
            const container = loginUtil.getInputLoginContainer(password);
            if (!container) {
                return false;
            }
            const username = csutil.input.getUsername({ container, visible: true, shadowRoot: false, editable: true });
            if (!username) {
                return false;
            }
            this.addIcon(username);
            return true;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    addForTextBefore(passwordInput) {
        try {
            const fields = loginUtil.findFieldsBefore(passwordInput);
            switch (fields.length) {
                case 0: return;
                case 1:
                    this.addIcon(fields[0]);
                    return;
            }
            const field = fields[fields.length - 1];
            if (field.offsetWidth < (0.60 * passwordInput.offsetWidth)) {
                return;
            }
            this.addIcon(field);
        }
        catch (e) {
            logError(e);
        }
    }
    async initCardAddressDetection() {
        try {
            const stored = await zlocalStorage.loadAll({
                [LocalStorageKeys.PAYMENT_CARD_TYPE_ID]: "",
                [LocalStorageKeys.ADDRESS_TYPE_ID]: "",
                [LocalStorageKeys.USED_CATEGORIES]: {},
            });
            const secretCountMap = stored[LocalStorageKeys.USED_CATEGORIES];
            const paymentCardId = stored[LocalStorageKeys.PAYMENT_CARD_TYPE_ID];
            const enablePaymentCard = paymentCardId && (secretCountMap[paymentCardId] > 0);
            await this.initCardDetection(enablePaymentCard);
            const addressId = stored[LocalStorageKeys.ADDRESS_TYPE_ID];
            const disableAddress = !addressId || !(secretCountMap[addressId] > 0);
            if (disableAddress) {
                this.addForAddresses = js.fn.emptyFn;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async initCardDetection(enable) {
        try {
            if (!enable) {
                this.addForCards = js.fn.emptyFn;
                return;
            }
            await external.initCardIcon();
        }
        catch (e) {
            logError(e);
        }
    }
    addForCards() {
        try {
            external.addCardIcon();
        }
        catch (e) {
            logError(e);
        }
    }
    addForAddresses() {
        try {
            external.addAddressIcon();
        }
        catch (e) {
            logError(e);
        }
    }
    addIcon(input) {
        zicon.adder.add(input);
    }
}
