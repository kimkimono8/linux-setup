import { userAction } from "../../src/cs/csfill/export.js";
import { loginUtil } from "../../src/cs/loginUtil/export.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
import { CSFillInputImpl } from "./CSFillInput.js";
import { csLoginSubmitter } from "./CSLoginSubmitter.js";
export class TotpLogin {
    async login(loginData) {
        try {
            info(TotpLogin.name, "totp login: ", js.log.mask(loginData, { keys: ["texts", "passwords"] }));
            await this.filledTotp();
            if (!this.hasTotpInLoginData(loginData)) {
                return;
            }
            const totpFillInput = this.getTotpCSFillInput();
            if (totpFillInput) {
                this.totpFrameLogin(totpFillInput, loginData);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async totpFrameLogin(fillInput, loginData) {
        try {
            let totp = "";
            if (loginData.hasTotp) {
                totp = await bgApi.secret.totp.getTotp(loginData.secretId);
            }
            else if (loginData.oneauthId != "") {
                totp = await bgApi.secret.totp.getOneAuthTotp(loginData.oneauthId);
            }
            await fillInput.fillValue(totp);
            this.filledTotp();
            if (!loginData.submit) {
                return;
            }
            await csLoginSubmitter.submitInputParent(fillInput.getInputForSubmitting());
        }
        catch (e) {
            logError(e);
        }
    }
    async fillTotpOnApper(loginData) {
        try {
            let totpFillInput = null;
            for (let _ of js.loop.range(15)) {
                totpFillInput = this.getTotpCSFillInput();
                if (totpFillInput) {
                    this.totpFrameLogin(totpFillInput, loginData);
                    break;
                }
                await js.time.delay(1);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getTotpCSFillInput() {
        try {
            const validVisibleInputs = csutil.selector.selectAll("input", { shadowRoot: false })
                .filter(loginUtil.isTotpInput, loginUtil);
            if (validVisibleInputs.length == 0) {
                return null;
            }
            if (validVisibleInputs.length >= 6) {
                const fillInput = this.getSixDigitTotpCSFillInput(validVisibleInputs);
                if (fillInput) {
                    return fillInput;
                }
            }
            return new CSFillInputImpl(validVisibleInputs[0]);
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    hasTotpInLoginData(loginData) {
        try {
            return loginData.hasTotp || loginData.oneauthId;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    getSixDigitTotpCSFillInput(totpInputs) {
        try {
            const selectedInputs = [totpInputs[0]];
            let lastInput = totpInputs[0];
            let curInput = null;
            for (let i = 1; i < totpInputs.length && selectedInputs.length < 6; i++) {
                curInput = totpInputs[i];
                if (curInput.offsetTop == lastInput.offsetTop) {
                    selectedInputs.push(curInput);
                }
                else {
                    selectedInputs.length = 0;
                }
                lastInput = curInput;
            }
            if (selectedInputs.length == 6) {
                return new TotpSixDigitFillInput(selectedInputs);
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async filledTotp() {
        try {
            await ztabStorage.remove(TabStorageKeys.LOGIN_DATA);
        }
        catch (e) {
            logError(e);
        }
    }
}
class TotpSixDigitFillInput {
    inputs = null;
    constructor(inputs) {
        this.inputs = inputs;
    }
    async fillValue(value) {
        const promises = [];
        const end = Math.min(this.inputs.length, value.length);
        for (let i = 0; i < end; i++) {
            promises.push(userAction.userFill(this.inputs[i], value[i]));
            await js.time.delay(0.3);
        }
        await Promise.all(promises);
    }
    getInputForZIconAddition() {
        return null;
    }
    getInputForSubmitting() {
        return this.inputs[0];
    }
}
