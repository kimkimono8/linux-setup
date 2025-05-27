import { totp } from "../components/totp.js";
import { setGlobal } from "../global/global.js";
class TotpUI {
    timeoutIds = {
        generateTotp: -1,
        totp_circle: -1
    };
    calledOn = {
        totpCircle: -1
    };
    elem = {
        totpElem: null,
        totpCircle: null
    };
    startGeneratingTotp(totpUrl = "", totpElem, totpCircle) {
        try {
            const h = this;
            this.elem.totpElem = totpElem;
            this.elem.totpCircle = totpCircle;
            if (!totpElem) {
                return;
            }
            clearTimeout(this.timeoutIds.generateTotp);
            this.showTotpCircle();
            const setTotpValue = totpElem instanceof HTMLInputElement ?
                (val) => totpElem.value = val :
                (val) => totpElem.textContent = val;
            async function generateTotp() {
                setTotpValue(totp.formatTotp(await totp.generateTotp(totpUrl)));
                const remaining_s = Math.round(totp.getRemainingSeconds(totpUrl));
                h.startCircleAnimation(remaining_s, totp.getTimePeriod(totpUrl));
                h.timeoutIds.generateTotp =
                    setTimeout(generateTotp, remaining_s * 1000);
            }
            generateTotp();
        }
        catch (e) {
            logError(e);
        }
    }
    startCircleAnimation(remainingSeconds = 0, timePeriod = 30) {
        const BLUE = "#4780da";
        const RED = "#f75d56";
        const h = this;
        const circleElem = h.elem.totpCircle;
        if (!circleElem) {
            return;
        }
        const radius = +circleElem.getAttribute("r");
        const end = -(2 * Math.PI * radius);
        const inc = end / timePeriod;
        const last_5_s = Math.round((5 / 6) * timePeriod);
        const calledOn = Date.now();
        this.calledOn.totpCircle = calledOn;
        clearTimeout(this.timeoutIds.totp_circle);
        let i = 1;
        if (remainingSeconds == 0) {
            init();
        }
        else {
            init_once(Math.round(timePeriod - remainingSeconds) + 1);
        }
        function init_once(start) {
            circleElem.style.stroke = start >= last_5_s ? RED : BLUE;
            circleElem.style.transition = "none";
            circleElem.style.strokeDashoffset = (start - 1) * inc + "";
            i = start;
            window.requestAnimationFrame(() => h.timeoutIds.totp_circle = setTimeout(f));
        }
        function init() {
            i = 1;
            circleElem.style.stroke = BLUE;
            circleElem.style.transition = "none";
            circleElem.style.strokeDashoffset = "0";
            window.requestAnimationFrame(() => h.timeoutIds.totp_circle = setTimeout(f));
        }
        function f() {
            if (calledOn != h.calledOn.totpCircle) {
                return;
            }
            circleElem.style.transition = "all 1s linear";
            if (i >= last_5_s) {
                circleElem.style.stroke = RED;
            }
            if (i == timePeriod) {
                circleElem.style.strokeDashoffset = end + "";
                return;
            }
            circleElem.style.strokeDashoffset = i++ * inc + "";
            h.timeoutIds.totp_circle = setTimeout(f, 1000);
        }
    }
    stopGeneratingTotp() {
        clearTimeout(this.timeoutIds.generateTotp);
        clearTimeout(this.timeoutIds.totp_circle);
        this.showTotpCircle(false);
        if (this.elem.totpElem) {
            this.elem.totpElem[this.elem.totpElem instanceof HTMLInputElement ? "value" : "textContent"] = "";
        }
    }
    showTotpCircle(show = true) {
        if (!this.elem.totpCircle) {
            return;
        }
        const circlePanel = this.elem.totpCircle.closest(".totp-panel");
        if (!circlePanel) {
            return;
        }
        circlePanel.style.display = show ? "block" : "none";
    }
}
export const totpUI = new TotpUI();
setGlobal("totpUI", totpUI);
