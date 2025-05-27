import { totp } from "../../../common/components/totp.js";
import { UIUtil1 } from "../../../common/ui/ui_util.js";
import { fileUtil } from "../../../common/util/fileUtil.js";
import { VI18N } from "../../../src/service/vt/VI18n.js";
import { zt } from "../../zt.js";
import { BasePasswordFormUIListener } from "../BasePasswordFormUIListener.js";
export class BasePasswordAddUIListener extends BasePasswordFormUIListener {
    p = null;
    constructor() {
        super();
        js.fn.bindThis(this, [
            this.handlePolicyChange,
            this.handleTagsChange,
            this.handleCustomFieldTypeSelect
        ]);
    }
    async handlePolicyChange() {
        this.p.policyComponent.validateNonEmptyPasswordInputs();
    }
    async handleNameChange() {
        this.p.nameLogoComponent.checkName();
    }
    clickedLogo(e) {
        try {
            const target = js.selector.closest(e.target, "[data-select_logo]");
            const isAdd = !target.classList.contains("add-password-display-icon-remove");
            if (isAdd) {
                this.p.select("[data-logo_input]").click();
                return;
            }
            this.p.nameLogoComponent.removeLogo();
        }
        catch (e) {
            logError(e);
        }
    }
    async handleLogoChange(e) {
        try {
            const logo_file = e.target.files[0];
            if (!logo_file) {
                return;
            }
            const size_kb = logo_file.size / 1024;
            if (size_kb > 100) {
                sweetAlert(i18n(VI18N.FILE_SIZE_CANNOT_EXCEED, "100 KB"));
                return;
            }
            const logo = await fileUtil.readFileContent(logo_file);
            const reqLogo = await js.logo.getBase64Logo(logo);
            this.p.nameLogoComponent.setLogo(reqLogo);
        }
        catch (e) {
            logError(e);
        }
    }
    clickedShowHidePassword(e) {
        UIUtil1.inst.clickedShowHidePassphrase(e);
    }
    async clickedGeneratePassword(e) {
        try {
            const targetElem = this.getTargetElemCheckCurInOut(e, "a");
            const input = {
                targetElem,
                inputElem: js.selector.selectFrom(js.selector.closest(targetElem, ".zv-label-group"), "input"),
                onPolicySelect: policyId => this.p.policyComponent.setPolicyIdFromGenerator(policyId),
            };
            zt.generatorUI.showUI(input);
        }
        catch (e) {
            logError(e);
        }
    }
    getTargetElemCheckCurInOut(e, selector) {
        const target = e.target;
        if (target.matches(selector)) {
            return target;
        }
        return target.querySelector(selector) || target.closest(selector);
    }
    handleFileInputChange(e) {
        try {
            const TWO_MB = 2 * 1024 * 1024;
            const input = e.target;
            const file = input.files[0];
            if (!file) {
                return;
            }
            if (file.size > TWO_MB) {
                input.value = "";
                VUI.notification.showError(i18n(VI18N.MAX_FILE_SIZE_POPUP));
                return;
            }
            this.p.fileComponent.showFileName(input, file.name);
        }
        catch (e) {
            logError(e);
        }
    }
    clickedUpload(e) {
        try {
            const uploadInput = js.selector.selectFrom(js.selector.closest(e.target, "[data-upload_div]"), "input");
            uploadInput.click();
        }
        catch (e) {
            logError(e);
        }
    }
    clickedRemoveFile(e) {
        try {
            const input = js.selector.selectFrom(js.selector.closest(e.target, "[data-field_row]"), "input");
            this.resetFileField(input);
        }
        catch (e) {
            logError(e);
        }
    }
    resetFileField(input) {
        try {
            input.value = "";
            const upload_div = js.selector.closest(input, "[data-upload_div]");
            const file_info_div = upload_div.nextElementSibling;
            file_info_div.classList.remove("dis-block");
            js.dom.hideOld(file_info_div);
            js.dom.showOld(upload_div);
        }
        catch (e) {
            logError(e);
        }
    }
    async handlePasswordChange(e) {
        this.p.policyComponent.checkPasswordInput(e.target);
    }
    handleTotpKeyInput(e) {
        try {
            const input = e.target;
            input.value = input.value.replace(/ /g, "").toUpperCase();
            this.p.totpComponent.checkEnteringTotpInput();
            this.p.totpComponent.generateTotp();
        }
        catch (e) {
            logError(e);
        }
    }
    handleTotpKeyChange(e) {
        try {
            const input = e.target;
            input.value = input.value.replace(/ /g, "").toUpperCase();
            this.p.totpComponent.checkTotpInput();
            this.p.totpComponent.generateTotp();
        }
        catch (e) {
            logError(e);
        }
    }
    clickedShowHideTotpKey(e) {
        UIUtil1.inst.clickedShowHidePassphrase(e);
    }
    async clickedCopyCurrentTotp(e) {
        try {
            const totpUrl = await this.p.totpComponent.getTotpUrl();
            if (!totpUrl) {
                return;
            }
            bgApi.other.copyToClipboard(await totp.generateTotp(totpUrl));
            VUI.tooltip.showActionMsg(e, i18n(VI18N.COPIED));
        }
        catch (e) {
            logError(e);
        }
    }
    clickedShowTotpSettings() {
        try {
            const totpSettingsElem = this.p.select("[data-totp_settings]");
            const isShown = totpSettingsElem.style.display == "block";
            if (isShown) {
                this.p.totpComponent.hideSettings();
                return;
            }
            this.p.totpComponent.showSettings();
        }
        catch (e) {
            logError(e);
        }
    }
    clickedHideTotpSettings() {
        this.p.totpComponent.hideSettings();
    }
    handleTimePeriodChange(e) {
        try {
            const MAX_SECONDS = 360;
            let time_period = (parseInt(e.target.value) || 30);
            if (time_period > MAX_SECONDS) {
                time_period = MAX_SECONDS;
            }
            e.target.value = time_period + "";
            this.p.totpComponent.generateTotp();
        }
        catch (e) {
            logError(e);
        }
    }
    handleTimePeriodEntering(e) {
        try {
            const new_value = (parseInt(e.target.value) || "") + "";
            e.target.value = new_value;
            this.p.totpComponent.generateTotp();
        }
        catch (e) {
            logError(e);
        }
    }
    handleUrlInput(e) {
        this.p.urlComponent.checkUrlInput(e.target);
        this.p.urlComponent.autoFillLogo();
    }
    clickedAddUrlRow(e) {
        try {
            const urlContainer = this.p.select("[data-url_container]");
            if (urlContainer.children.length >= 10) {
                VUI.notification.showError(i18n(VI18N.URLS_MAX_N, "10"));
                return;
            }
            const clickedUrlRow = e.target.closest("[data-url_row]");
            const newUrlRow = this.p.urlComponent.addUrlBelow(clickedUrlRow);
            js.selector.selectFrom(newUrlRow, "input").focus();
        }
        catch (e) {
            logError(e);
        }
    }
    clickedRemoveUrlRow(e) {
        try {
            const urlContainer = e.target.closest("[data-url_container]");
            if (urlContainer.children.length <= 1) {
                js.selector.selectFrom(urlContainer, "input").value = "";
                js.selector.selectFrom(urlContainer, "[data-error]").textContent = "";
                return;
            }
            e.target.closest("[data-url_row]").remove();
            this.p.urlComponent.updateUrlNumbering();
        }
        catch (e) {
            logError(e);
        }
    }
    handleTagsChange() {
        this.p.tagComponent.checkTags();
    }
    clickedShowMoreFields() {
        try {
            const moreFieldsElem = this.p.select("[data-more_fields]");
            js.dom.showOld(moreFieldsElem.nextElementSibling);
            moreFieldsElem.remove();
        }
        catch (e) {
            logError(e);
        }
    }
    clickedAdditionalFields() {
        try {
            this.p.show('#passwords_additional_fields_container');
            this.removeAdditionalFields = this.removeAdditionalFields.bind(this);
            const containerSelector = this.p.getContainerSelector();
            js.selector.select(containerSelector).removeEventListener("click", this.removeAdditionalFields);
            js.selector.select(containerSelector).addEventListener("click", this.removeAdditionalFields);
        }
        catch (e) {
            logError(e);
        }
    }
    removeAdditionalFields(e) {
        try {
            const additionalFields = this.p.select('#passwords_additional_fields_container');
            if (additionalFields.contains(e.target)) {
                return;
            }
            const containerSelector = this.p.getContainerSelector();
            js.selector.select(containerSelector).removeEventListener("click", this.removeAdditionalFields);
            this.p.hide('#passwords_additional_fields_container');
        }
        catch (e) {
            logError(e);
        }
    }
    clickedAdditionalFieldItem(e) {
        try {
            const selector = e.target.dataset.field_selector;
            if (e.target.checked) {
                this.p.select(selector).classList.add('password-additional-field-animation');
                this.p.show(selector);
                this.checkIfAllItemsSelected();
                return;
            }
            const selectAllCheckbox = this.p.select('[data-af_select_all_checkbox]');
            selectAllCheckbox.checked = false;
            this.p.hide(selector);
            this.resetAdditionalField(selector);
        }
        catch (e) {
            logError(e);
        }
    }
    checkIfAllItemsSelected() {
        const afContainer = $('[data-additionalfieldslist]');
        const allCheckboxes = $(afContainer).find('input:checkbox').length;
        const selectedCheckboxes = $(afContainer).find('input:checkbox:checked').length;
        if (allCheckboxes == selectedCheckboxes) {
            this.p.select('[data-af_select_all_checkbox]').checked = true;
        }
    }
    clickedAFSelectAll(e) {
        try {
            const adFieldsConntainer = this.p.select("[data-additionalFieldsList]");
            const allFields = js.selector.selectAll('input[type="checkbox"]', adFieldsConntainer);
            for (let checkbox of allFields) {
                checkbox.checked = e.target.checked;
                const selector = checkbox.dataset.field_selector;
                this.p.select(selector).classList.add('password-additional-field-animation');
                if (e.target.checked) {
                    this.p.show(selector);
                    continue;
                }
                this.p.hide(selector);
                this.resetAdditionalField(selector);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    resetAdditionalField(selector) {
        try {
            const container = this.p.select(selector);
            const fieldSelector = container.getAttribute('data-selector');
            const resetMethod = container.getAttribute('data-reset');
            if (fieldSelector && !resetMethod) {
                const field = this.p.select(fieldSelector);
                if (field.type == "file") {
                    this.resetFileField(field);
                    return;
                }
                field.value = "";
                field.dispatchEvent(new Event('change', { bubbles: true }));
                field.dispatchEvent(new Event('input', { bubbles: true }));
                return;
            }
            if (resetMethod) {
                const dataContainer = fieldSelector ? this.p.select(fieldSelector) : container;
                dataContainer.textContent = "";
                this.p[resetMethod].createUI();
            }
        }
        catch (e) {
            logError(e);
        }
    }
    handleDescriptionChange() {
        this.p.descriptionComponent.checkDescription();
    }
    clickedAddCustomFieldRow(e) {
        try {
            const curRow = js.selector.closest(e.target, "[data-custom_col_row]");
            const newRow = this.p.customFieldComponent.getCustomFieldRow();
            curRow.after(newRow);
            newRow.scrollIntoView();
            js.selector.selectFrom(newRow, "input").focus();
        }
        catch (e) {
            logError(e);
        }
    }
    clickedRemoveCustomFieldRow(e) {
        try {
            const curRow = js.selector.closest(e.target, "[data-custom_col_row]");
            const container = curRow.parentElement;
            curRow.remove();
            if (container.children.length == 0) {
                container.append(this.p.customFieldComponent.getCustomFieldRow());
            }
        }
        catch (e) {
            logError(e);
        }
    }
    handleCustomFieldTypeSelect(e) {
        const row = e.target.closest("[data-custom_col_row]");
        this.p.customFieldComponent.updateCustomFieldType(row);
    }
    clickedShowHideCustomFieldPassword(e) {
        UIUtil1.inst.clickedShowHidePassphrase(e);
    }
    async clickedSavePassword() {
        try {
            const DISABLED = "disabled";
            const saveButton = this.p.select("[data-save]");
            if (saveButton.classList.contains(DISABLED)) {
                return;
            }
            saveButton.classList.add(DISABLED);
            zt.mainUI.showDotLoading();
            try {
                await this.p.savePassword();
            }
            finally {
                saveButton.classList.remove(DISABLED);
                zt.mainUI.hideDotLoading();
            }
        }
        catch (e) {
            VUI.notification.showError(e);
        }
    }
}
