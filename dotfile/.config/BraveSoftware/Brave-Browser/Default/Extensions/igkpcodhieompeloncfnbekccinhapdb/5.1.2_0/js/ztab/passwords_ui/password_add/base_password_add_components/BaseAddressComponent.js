import { VI18N } from "../../../../src/service/vt/VI18n.js";
import { ADDRESS_FIELDS } from "../../../../src/vutil/types/PasswordCategory.js";
export class BaseAddressComponent {
    formContainer = null;
    countryDropdown = null;
    stateDropdown = null;
    cityDropdown = null;
    async formatAddressFields(fields_container) {
        const countries = await bgApi.tab.loadZMapsCountries();
        await this.initDropDowns(fields_container);
        this.setOptionToDropdown(this.countryDropdown, countries);
        this.addListeners(this.countryDropdown, this.resetStateDropdown);
        this.preventEnterKeyPress();
    }
    async initDropDowns(fields_container) {
        this.formContainer = fields_container;
        this.countryDropdown = this.formContainer.querySelector("select[name='" + ADDRESS_FIELDS.COUNTRY + "']");
        this.stateDropdown = this.formContainer.querySelector("select[name='" + ADDRESS_FIELDS.STATE + "']");
        this.cityDropdown = this.formContainer.querySelector("select[name='" + ADDRESS_FIELDS.CITY + "']");
        this.initiateDropdown(this.countryDropdown, i18n(VI18N.SELECT_COUNTRY), "#text_" + ADDRESS_FIELDS.COUNTRY);
        this.initiateDropdown(this.stateDropdown, i18n(VI18N.SELECT_STATE), "#text_" + ADDRESS_FIELDS.STATE);
        this.initiateDropdown(this.cityDropdown, i18n(VI18N.SELECT_CITY), "#text_" + ADDRESS_FIELDS.CITY);
    }
    addListeners(selector, listener) {
        $(selector).off(".addressDropdown");
        $(selector).on("change.addressDropdown", listener.bind(this));
    }
    preventEnterKeyPress() {
        $(this.formContainer).off(".enterListener");
        $(this.formContainer).on("keyup.enterListener", function (e) {
            if (e.which == 13 && e.target.tagName == "SPAN") {
                e.stopImmediatePropagation();
                e.preventDefault();
            }
        });
    }
    async resetStateDropdown() {
        const isCustomTag = this.isCustomTag(this.countryDropdown);
        const country = this.countryDropdown.value;
        this.stateDropdown.innerHTML = "";
        this.cityDropdown.innerHTML = "";
        if (country == "" || isCustomTag) {
            return;
        }
        const states = await bgApi.tab.loadZMapsStates(country);
        this.setOptionToDropdown(this.stateDropdown, states);
        this.addListeners(this.stateDropdown, this.resetCityDropdown);
    }
    async resetCityDropdown() {
        const isCustomTag = this.isCustomTag(this.stateDropdown);
        const state = this.stateDropdown.value;
        const country = this.countryDropdown.value;
        this.cityDropdown.innerHTML = "";
        if (state == "" || isCustomTag) {
            return;
        }
        const cities = await bgApi.tab.loadZMapsDistricts(country, state);
        this.setOptionToDropdown(this.cityDropdown, cities);
    }
    initiateDropdown(selector, placeholder, inputSelector) {
        this.addSelect2ToAddress(selector, placeholder);
        $(selector).on("change", (e) => {
            $(inputSelector).val(e.currentTarget.value);
        });
    }
    addSelect2ToAddress(selector, placeholder) {
        $(selector).select2({
            placeholder: placeholder,
            allowClear: true,
            tags: true,
            createTag: function (params) {
                var term = $.trim(params.term);
                if (term === '') {
                    return null;
                }
                return {
                    id: term,
                    text: term,
                    newTag: true
                };
            }
        });
    }
    setOptionToDropdown(dropdown, dataArray) {
        dropdown.innerHTML = "";
        if (!dataArray) {
            return;
        }
        let opt = document.createElement("option");
        dropdown.append(opt);
        for (let data of dataArray) {
            opt = document.createElement("option");
            opt.value = data;
            opt.innerHTML = data;
            dropdown.append(opt);
        }
    }
    isCustomTag(selector) {
        const selectedOption = selector[selector.selectedIndex];
        return selector.selectedIndex <= 0 ? false : selectedOption.getAttribute("data-select2-tag") == "true";
    }
    async checkForNewTags() {
        if (this.isCustomTag(this.countryDropdown)) {
            bgApi.tab.saveNewCountry(this.countryDropdown.value);
        }
        if (this.isCustomTag(this.stateDropdown)) {
            bgApi.tab.saveNewState(this.countryDropdown.value, this.stateDropdown.value);
        }
        if (this.isCustomTag(this.cityDropdown)) {
            bgApi.tab.saveNewCity(this.countryDropdown.value, this.stateDropdown.value, this.cityDropdown.value);
        }
    }
}
