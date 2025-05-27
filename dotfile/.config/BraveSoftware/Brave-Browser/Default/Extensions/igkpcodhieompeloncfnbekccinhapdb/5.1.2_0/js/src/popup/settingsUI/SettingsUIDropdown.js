import { LocalStorageKeys } from "../../service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../service/vt/VI18n.js";
import { pp } from "../pp.js";
import { context } from "./Context.js";
export class SettingsUIDropdown {
    init() {
        this.initFilterSelect();
        this.initInactivitySelect();
        this.initClearClipboardSelect();
        $(context.settingsUI.elem.filterSelect).on("change", e => pp.passwordsUI.changeDefaultFilter(e.target.value));
    }
    initFilterSelect() {
        this.initSelect2(context.settingsUI.elem.filterSelect, LocalStorageKeys.DEFAULT_FILTER, context.settingsUI.data.filter);
        if (context.settingsUI.data.isPersonalPlan) {
            js.selector.selectAll("[data-enterprise]", context.settingsUI.elem.container).forEach(x => x.remove());
        }
    }
    initInactivitySelect() {
        const inactivitySelect = context.settingsUI.elem.inactivitySelect;
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
        this.initSelect2(inactivitySelect, LocalStorageKeys.INACTIVE_TIMEOUT, context.settingsUI.data.inactivityTimeout);
        this.checkEnforcedInactivity();
    }
    checkEnforcedInactivity() {
        if (!context.settingsUI.data.inactivityEnforced) {
            return;
        }
        const inactivitySelect = context.settingsUI.elem.inactivitySelect;
        const inactivityJElem = $(inactivitySelect);
        const option = js.selector.selectFrom(inactivitySelect, "option[value='" + inactivityJElem.val() + "']");
        option.textContent += " (" + i18n(VI18N.SETTING_ENFORCED_BY_AMDIN) + ")";
        inactivityJElem.select2({ disabled: true });
    }
    initClearClipboardSelect() {
        const clipboardSelectElem = context.settingsUI.elem.clearClipboardSelect;
        const secondsOptions = [30, 60, 90, 120];
        const secondsSuffix = " " + i18n(VI18N.SECONDS);
        secondsOptions.forEach(second => clipboardSelectElem.append(new Option(second + secondsSuffix, second + "")));
        this.initSelect2(clipboardSelectElem, LocalStorageKeys.CLEAR_CLIPBOARD, context.settingsUI.data.clearClipboard);
    }
    initSelect2(selectElem, key, value) {
        const selectedOption = selectElem.querySelector(`option[value='${value}']`);
        if (selectedOption) {
            selectedOption.selected = true;
        }
        $(selectElem).select2({
            minimumResultsForSearch: -1
        });
        $(selectElem).on("change", e => context.settingsUI.changeSetting(key, e.target.value));
    }
}
