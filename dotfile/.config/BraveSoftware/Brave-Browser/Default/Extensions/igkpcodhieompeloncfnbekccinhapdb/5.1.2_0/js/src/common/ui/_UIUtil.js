import { VI18N } from "../../service/vt/VI18n.js";
export class _UIUtil {
    static getMustNotContain(field, invalidChars) {
        return field + " " + i18n(VI18N.MUST_NOT_CONTAIN) + " " + invalidChars.join(", ");
    }
    static convertMinuteToUIString(minutes) {
        try {
            if (minutes == 1) {
                return `1 ${i18n(VI18N.MINUTE)}`;
            }
            if (minutes < 60) {
                return `${minutes} ${i18n(VI18N.MINUTES)}`;
            }
            if (minutes == 60) {
                return `1 ${i18n(VI18N.HOUR)}`;
            }
            const oneDayMinutes = 1 * 24 * 60;
            if (minutes < oneDayMinutes) {
                return `${Math.trunc(minutes / 60)} ${i18n(VI18N.HOURS)}`;
            }
            if (minutes == oneDayMinutes) {
                return `1 ${i18n(VI18N.DAY)}`;
            }
            const oneWeekMinutes = oneDayMinutes * 7;
            if (minutes < oneWeekMinutes) {
                return `${Math.trunc(minutes / oneDayMinutes)} ${i18n(VI18N.DAYS)}`;
            }
            if (minutes == oneWeekMinutes) {
                return `1 ${i18n(VI18N.WEEK)}`;
            }
            return `${Math.trunc(minutes / oneWeekMinutes)} ${i18n(VI18N.WEEKS)}`;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
