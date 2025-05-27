import { UIUtil1 } from "../../../../common/ui/ui_util.js";
import { CustomColumn } from "../../../../src/service/bgApi/types/Secret.js";
import { SecretType } from "../../../../src/service/bgApi/types/SecretType.js";
import { VI18N } from "../../../../src/service/vt/VI18n.js";
export class BasePasswordAddCustomFieldComponent {
    CUSTOM_COL_PREFIX = "custColDiv_";
    CUSTOM_ATTR_VAL_PREFIX = "customattrivalue_";
    p = null;
    createUI() {
        try {
            const container = this.p.select("[data-custom_fields]");
            container.append(this.getCustomFieldRow(SecretType.FIELD_TYPE.TEXT));
        }
        catch (e) {
            logError(e);
        }
    }
    getCustomFieldRow(type = SecretType.FIELD_TYPE.TEXT) {
        try {
            const elem = UIUtil.createElem({ preRender: true, template: "#add_password_custom_field_template" });
            const columnName = js.selector.selectFrom(elem, "input[name='column_name']");
            columnName.placeholder = i18n(VI18N.FIELD_NAME);
            const columnValueContainer = js.selector.selectFrom(elem, "[data-col_val_container]");
            const fieldElem = this.getCustomFieldValueElem(type);
            columnValueContainer.append(fieldElem);
            const fieldTypeSelect = js.selector.selectFrom(elem, "[data-field_type_select]");
            if (!this.p.secretTypeComponent.fileAllowed) {
                js.selector.selectFrom(fieldTypeSelect, "option[value='file']").remove();
            }
            $(fieldTypeSelect).select2({
                minimumResultsForSearch: -1
            });
            $(fieldTypeSelect).on("select2:select", this.p.listener.handleCustomFieldTypeSelect);
            return elem;
        }
        catch (e) {
            logError(e);
            return document.createElement("div");
        }
    }
    getCustomFieldValueElem(type) {
        try {
            const TYPE = SecretType.FIELD_TYPE;
            switch (type) {
                case TYPE.TEXT: return this.getCustomTextField();
                case TYPE.PASSWORD: return this.getCustomPasswordField();
                case TYPE.FILE: return this.getCustomFileField();
                default:
                    return null;
            }
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getCustomTextField(preFillValue = "") {
        try {
            const elem = UIUtil.createElem({ template: "#add_pass_custom_text_field_template" });
            if (preFillValue) {
                js.selector.selectFrom(elem, "input[name='column_value']").value = preFillValue;
            }
            return elem;
        }
        catch (e) {
            logError(e);
            return document.createElement("div");
        }
    }
    getCustomPasswordField(preFillValue = "") {
        try {
            const elem = UIUtil.createElem({ template: "#add_pass_custom_password_field_template" });
            if (preFillValue) {
                js.selector.selectFrom(elem, "input[name='column_value']").value = preFillValue;
            }
            return elem;
        }
        catch (e) {
            logError(e);
            return document.createElement("div");
        }
    }
    getCustomFileField() {
        try {
            const elem = UIUtil.createElem({ template: "#add_pass_custom_file_field_template" });
            const fileInput = js.selector.selectFrom(elem, "input[type='file']");
            this.p.fileComponent.addFileSource(fileInput);
            return elem;
        }
        catch (e) {
            logError(e);
            return document.createElement("div");
        }
    }
    updateCustomFieldType(row) {
        try {
            const typeSelectElem = js.selector.selectFrom(row, "[data-field_type_select]");
            const selectedType = $(typeSelectElem).val();
            const columnValueContainer = js.selector.selectFrom(row, "[data-col_val_container]");
            const curInput = js.selector.selectFrom(columnValueContainer, "input");
            if (curInput.type == selectedType) {
                return;
            }
            let curInputValue = "";
            if (curInput.type == "text" || curInput.type == "password") {
                curInputValue = curInput.value;
            }
            let newFieldElem = null;
            switch (selectedType) {
                case "text":
                    newFieldElem = this.getCustomTextField(curInputValue);
                    break;
                case "password":
                    newFieldElem = this.getCustomPasswordField(curInputValue);
                    break;
                case "file":
                    newFieldElem = this.getCustomFileField();
                    break;
            }
            js.dom.setContent(columnValueContainer, newFieldElem);
        }
        catch (e) {
            logError(e);
        }
    }
    checkFinalCustomColumn() {
        try {
            const customColumnRows = this.p.selectAll("[data-custom_col_row]");
            const invalidElem = customColumnRows.find(x => !this.checkCustomColumn(x));
            return !Boolean(invalidElem);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    checkCustomColumn(row) {
        try {
            const nameInput = js.selector.selectFrom(row, "input[name='column_name']");
            const valueInput = js.selector.selectFrom(row, "input[name='column_value']");
            const name = nameInput.value;
            const value = valueInput.value;
            const isValid = (!name && !value) || (name && value) || (name && this.isNonEmptyCustomColumnRowValue(row));
            if (isValid) {
                return true;
            }
            if (!name) {
                this.setCustomColumnError(nameInput, i18n(VI18N.PLEASE_ENTER_A) + " " + i18n(VI18N.FIELD_NAME).toLocaleLowerCase());
                return false;
            }
            if (!value) {
                this.setCustomColumnError(valueInput, i18n(VI18N.PLEASE_ENTER_A) + " " + i18n(VI18N.VALUE).toLocaleLowerCase());
                return false;
            }
            throw "INVALID_STATE";
        }
        catch (e) {
            throw jserror(e);
        }
    }
    setCustomColumnError(input, error_msg) {
        try {
            this.p.util.setInputError(input, error_msg);
            input.focus();
            const errorElem = js.selector.selectFrom(js.selector.closest(input, "[data-field_row]"), "[data-error]");
            UIUtil1.inst.scrollIntoView(errorElem);
        }
        catch (e) {
            logError(e);
        }
    }
    getCustomColumns() {
        try {
            const customColumnRows = this.getNonEmptyCustomColumnRows();
            const reqCustomColumns = customColumnRows.map(x => this.getCustomColumn(x));
            return reqCustomColumns;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getNonEmptyCustomColumnRows() {
        try {
            const allRows = this.p.selectAll("[data-custom_col_row]");
            const nonEmptyRows = [];
            let isNonEmptyValue = false;
            for (let row of allRows) {
                isNonEmptyValue = this.isNonEmptyCustomColumnRowValue(row);
                if (isNonEmptyValue) {
                    nonEmptyRows.push(row);
                }
            }
            return nonEmptyRows;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    isNonEmptyCustomColumnRowValue(row) {
        try {
            const valueInput = js.selector.selectFrom(row, "input[name='column_value']");
            const isEmpty = this.p.isEmptyInput(valueInput);
            return !isEmpty;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getCustomColumnId(rowOrInput) {
        return this.CUSTOM_COL_PREFIX + this.getColumnIndex(rowOrInput);
    }
    getColumnIndex(rowOrInput) {
        try {
            const inputRow = js.selector.closest(rowOrInput, "[data-custom_col_row]");
            const allRows = this.getNonEmptyCustomColumnRows();
            const rowIndex = allRows.indexOf(inputRow);
            if (rowIndex < 0) {
                throw "cannot get custom column id";
            }
            return rowIndex;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getCustomColumn(rowOrInput) {
        try {
            const row = js.selector.closest(rowOrInput, "[data-custom_col_row]");
            const customColumn = new CustomColumn();
            const nameInput = js.selector.selectFrom(row, "input[name='column_name']");
            const valueInput = js.selector.selectFrom(row, "input[name='column_value']");
            const fieldTypeSelect = $(js.selector.selectFrom(row, "[data-field_type_select]"));
            customColumn.id = this.getCustomColumnId(row);
            customColumn.colname = nameInput.value;
            customColumn.type = fieldTypeSelect.val();
            if (customColumn.type == SecretType.FIELD_TYPE.FILE) {
                customColumn.value = this.CUSTOM_ATTR_VAL_PREFIX + this.getColumnIndex(row);
            }
            else {
                customColumn.value = valueInput.value;
            }
            return customColumn;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getNonEmptyFileInputs() {
        try {
            const fileInputs = this.p.selectAll("[data-custom_fields] input[type='file']");
            const validFileInputs = fileInputs.filter(x => !this.p.isEmptyInput(x));
            return validFileInputs;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
