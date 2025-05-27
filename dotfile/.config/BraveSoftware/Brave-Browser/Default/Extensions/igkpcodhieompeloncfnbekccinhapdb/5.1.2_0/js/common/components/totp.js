import { setGlobal } from "../global/global.js";
class Totp {
    MIN_KEY_LENGTH = 16;
    async generateTotp(totpUrl) {
        try {
            const totp = await bgApi.secret.totp.generate(totpUrl);
            return totp;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async validateKey(key) {
        if (key == null || key.length == 0) {
            throw "EMPTY";
        }
        const key_pattern = /^[ABCDEFGHIJKLMNOPQRSTUVWXYZ234567]+$/;
        if (!key_pattern.test(key)) {
            throw "INVALID_CHARS";
        }
        try {
            const totpUrl = `otpauth://totp?secret=${key}&algorithm=SHA1&period=30&digits=6`;
            if (key.length >= this.MIN_KEY_LENGTH) {
                await this.generateTotp(totpUrl);
            }
        }
        catch (e) {
            throw "INVALID_BYTE_VALUE";
        }
        return true;
    }
    getInvalidKeyChars(key) {
        const invalidChars = key.replace(/[ABCDEFGHIJKLMNOPQRSTUVWXYZ234567]/g, "");
        const uniqueInvalidChars = new Set(invalidChars);
        const invalidKeyChars = Array.from(uniqueInvalidChars).join(", ");
        return invalidKeyChars;
    }
    getRemainingSeconds(totpUrl) {
        return this.getRemainingSecondsFn(this.getTimePeriod(totpUrl));
    }
    getRemainingSecondsFn(timePeriod = 30) {
        const ending_time = (Math.floor(Date.now() / 1000 / timePeriod) + 1) * timePeriod;
        return ending_time - (Date.now() / 1000);
    }
    formatTotp(totp) {
        if (totp.length < 6) {
            return totp;
        }
        return totp.slice(0, 3) + " " + this.formatTotp(totp.slice(3));
    }
    getTimePeriod(totpUrl = "") {
        return +(/period=(\d+)/.exec(totpUrl)[1]);
    }
}
export const totp = new Totp();
setGlobal("totp", totp);
