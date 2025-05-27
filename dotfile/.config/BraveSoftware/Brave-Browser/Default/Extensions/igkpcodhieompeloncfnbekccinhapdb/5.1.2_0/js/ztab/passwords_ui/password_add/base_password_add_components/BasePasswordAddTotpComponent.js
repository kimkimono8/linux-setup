import { totp } from "../../../../common/components/totp.js";
import { totpUI } from "../../../../common/ui/totpUI.js";
import { UIUtil1 } from "../../../../common/ui/ui_util.js";
import { VI18N } from "../../../../src/service/vt/VI18n.js";
export class BasePasswordAddTotpComponent {
    p = null;
    constructor() {
        js.fn.bindThis(this, [this.generateTotp]);
    }
    createUI() {
        try {
            const totpSettings = this.p.select("[data-totp_settings]");
            const totpAlgorithmElem = this.p.select("[data-totp_algorithm]");
            $(totpAlgorithmElem).select2({
                minimumResultsForSearch: -1, dropdownParent: $(totpSettings)
            });
            $(totpAlgorithmElem).on('select2:select', this.generateTotp);
            const totp_digits = this.p.select("[data-totp_digits]");
            $(totp_digits).select2({
                minimumResultsForSearch: -1, dropdownParent: $(totpSettings)
            });
            $(totp_digits).on('select2:select', this.generateTotp);
        }
        catch (e) {
            logError(e);
        }
    }
    async checkEnteringTotpInput() {
        try {
            this.setErrorMessage("");
            const key = this.getSecretKey();
            if (!key) {
                return true;
            }
            try {
                await totp.validateKey(key);
            }
            catch (e) {
                this.setErrorMessage(this.getTotpErrorMsg(e, key));
                return false;
            }
            return true;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async checkTotpInput() {
        try {
            this.setErrorMessage("");
            const key = this.getSecretKey();
            if (!key) {
                return true;
            }
            const valid = await this.checkEnteringTotpInput();
            if (!valid) {
                return false;
            }
            const errorElem = this.p.select("[data-field_row='totp'] [data-error]");
            if (key.length < totp.MIN_KEY_LENGTH) {
                errorElem.textContent = i18n(VI18N.TOTP_KEY_MUST_CONTAIN_ATLEAST_N_CHARS, "" + totp.MIN_KEY_LENGTH);
                return false;
            }
            return true;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    setErrorMessage(errorMsg) {
        this.p.text("[data-field_row='totp'] [data-error]", errorMsg);
    }
    getSecretKey() {
        try {
            const input = this.getSecretKeyElem();
            const secretKey = input.value;
            return secretKey;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    getSecretKeyElem() {
        return this.p.select("[data-totp_key_input]");
    }
    getTotpErrorMsg(e, key) {
        switch (e) {
            case "EMPTY": return "";
            case "INVALID_CHARS": return i18n(VI18N.TOTP_KEY) + " " + i18n(VI18N.MUST_NOT_CONTAIN) + " " + totp.getInvalidKeyChars(key);
        }
        return e;
    }
    async generateTotp() {
        try {
            const totpUrl = await this.getTotpUrl();
            if (!totpUrl) {
                totpUI.stopGeneratingTotp();
                return;
            }
            totpUI.startGeneratingTotp(totpUrl, this.p.select("[data-current_totp]"), this.p.select("[data-totp_circle]"));
        }
        catch (e) {
            logError(e);
        }
    }
    async getTotpUrl() {
        try {
            const key = this.getSecretKey();
            if (!key) {
                return "";
            }
            const MIN_KEY_LENGTH = 16;
            if (key.length < MIN_KEY_LENGTH) {
                return "";
            }
            try {
                await totp.validateKey(key);
            }
            catch (e) {
                return "";
            }
            const algorithm = this.p.select("[data-totp_algorithm]").value;
            const digits = this.p.select("[data-totp_digits]").value;
            const period = this.p.select("[data-time_period]").value;
            if (!period) {
                return "";
            }
            return `otpauth://totp?secret=${key}&algorithm=${algorithm}&period=${period}&digits=${digits}`;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async setTotpUrl(totpUrl) {
        try {
            const paramsObj = await bgApi.secret.totp.getParams(totpUrl);
            this.getSecretKeyElem().value = paramsObj.secret;
            paramsObj.algorithm = paramsObj.algorithm.replace('-', '');
            $(this.p.select("[data-totp_algorithm]")).val(paramsObj.algorithm).trigger("change.select2");
            $(this.p.select("[data-totp_digits]")).val(paramsObj.digits + "").trigger("change.select2");
            this.p.select("[data-time_period]").value = paramsObj.period + "";
            this.generateTotp();
        }
        catch (e) {
            logError(e);
        }
    }
    async showSettings() {
        try {
            const totpSettingsElem = this.p.select("[data-totp_settings]");
            const overlayElem = this.p.select("[data-totp_settings_overlay]");
            this.p.show(totpSettingsElem, overlayElem);
        }
        catch (e) {
            logError(e);
        }
    }
    async hideSettings() {
        try {
            const totpSettingsElem = this.p.select("[data-totp_settings]");
            const overlayElem = this.p.select("[data-totp_settings_overlay]");
            this.p.hide(totpSettingsElem, overlayElem);
        }
        catch (e) {
            logError(e);
        }
    }
    async checkFinalTotp() {
        try {
            const valid = await this.checkTotpInput();
            if (valid) {
                return true;
            }
            const input = this.getSecretKeyElem();
            input.focus();
            UIUtil1.inst.scrollIntoView(input);
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
