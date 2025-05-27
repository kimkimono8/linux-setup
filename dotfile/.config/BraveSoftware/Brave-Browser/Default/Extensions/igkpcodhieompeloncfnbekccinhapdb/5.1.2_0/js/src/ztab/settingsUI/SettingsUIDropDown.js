import { zt } from "../../../ztab/zt.js";
import { LocalStorageKeys } from "../../service/storage/constants/LocalStorageKeys.js";
import { VtSettings } from "../../service/vt/constants/VtSettings.js";
import { VI18N } from "../../service/vt/VI18n.js";
import { settingsTab } from "./Context.js";
export class SettingsUIDropdown {
    init() {
        this.initInactivitySelect();
        this.initClearClipboardSelect();
        this.initFontSelect();
    }
    initInactivitySelect() {
        const inactivitySelect = settingsTab.elem.inactivitySelect;
        const minutesOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
        const minutesSuffix = " " + i18n(VI18N.MINUTES);
        minutesOptions.forEach(minute => inactivitySelect.append(new Option(minute + minutesSuffix, minute + "")));
        inactivitySelect.append(new Option("1 " + i18n(VI18N.HOUR), (1 * 60) + ""));
        const hoursOptions = [2, 4, 8, 12];
        const hoursSuffix = " " + i18n(VI18N.HOURS);
        hoursOptions.forEach(hour => inactivitySelect.append(new Option(hour + hoursSuffix, (hour * 60) + "")));
        inactivitySelect.append(new Option("1 " + i18n(VI18N.DAY), (1 * 24 * 60) + ""));
        inactivitySelect.append(new Option("2 " + i18n(VI18N.DAYS), (2 * 24 * 60) + ""));
        inactivitySelect.append(new Option("1 " + i18n(VI18N.WEEK), (1 * 7 * 24 * 60) + ""));
        this.initSelect2(inactivitySelect, LocalStorageKeys.INACTIVE_TIMEOUT, settingsTab.data.inactivityTimeout);
        this.checkEnforcedInactivity();
    }
    checkEnforcedInactivity() {
        if (!settingsTab.data.inactivityEnforced) {
            return;
        }
        const inactivitySelect = settingsTab.elem.inactivitySelect;
        const inactivityJElem = $(inactivitySelect);
        const option = js.selector.selectFrom(inactivitySelect, "option[value='" + inactivityJElem.val() + "']");
        option.textContent += " (" + i18n(VI18N.SETTING_ENFORCED_BY_AMDIN) + ")";
        inactivityJElem.select2({ disabled: true });
    }
    initClearClipboardSelect() {
        const clipboardSelectElem = settingsTab.elem.clearClipboardSelect;
        const secondsOptions = [30, 60, 90, 120];
        const secondsSuffix = " " + i18n(VI18N.SECONDS);
        secondsOptions.forEach(second => clipboardSelectElem.append(new Option(second + secondsSuffix, second + "")));
        this.initSelect2(clipboardSelectElem, LocalStorageKeys.CLEAR_CLIPBOARD, settingsTab.data.clearClipboard);
    }
    initFontSelect() {
        const fontSelectElem = settingsTab.elem.fontSelect;
        this.initSelect2(fontSelectElem, VtSettings.FONT, settingsTab.data.font, this.changeFont);
    }
    initSelect2(selectElem, key, value, listener = null) {
        const selectedOption = selectElem.querySelector(`option[value='${value}']`);
        if (selectedOption) {
            selectedOption.selected = true;
        }
        $(selectElem).select2({
            minimumResultsForSearch: -1
        });
        if (listener) {
            $(selectElem).on("change", e => listener(e.target.value));
            return;
        }
        $(selectElem).on("change", e => settingsTab.changeSetting(key, e.target.value));
    }
    async changeFont(font) {
        await zt.theme.setFont(font);
        VUI.notification.showSuccess(i18n(VI18N.CHANGES_UPDATED));
    }
}
