import { globalNodeData } from "../../../../common/ui/globalNodeData.js";
import { SecretType } from "../../../../src/service/bgApi/types/SecretType.js";
import { VI18N } from "../../../../src/service/vt/VI18n.js";
import { BasePasswordAddCustomFieldComponent } from "../../password_add/base_password_add_components/BasePasswordAddCustomFieldComponent.js";
export class PasswordEditCustomFieldComponent extends BasePasswordAddCustomFieldComponent {
    p = null;
    setCustomColumns(customColumns) {
        try {
            const neededOnlySingleEmptyField = customColumns.length == 0;
            if (neededOnlySingleEmptyField) {
                return;
            }
            const container = this.p.select("[data-custom_fields]");
            const existingRow = js.selector.selectFrom(container, "[data-custom_col_row]");
            existingRow.remove();
            let rowElem;
            for (let column of customColumns) {
                rowElem = this.getCustomColumnRow(column);
                container.append(rowElem);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getCustomColumnRow(customColumn) {
        try {
            const rowElem = this.getCustomFieldRow(customColumn.type);
            globalNodeData.setNodeData(rowElem, customColumn);
            const nameInput = js.selector.selectFrom(rowElem, "input[name='column_name']");
            nameInput.value = customColumn.colname;
            const valueInput = js.selector.selectFrom(rowElem, "input[name='column_value']");
            const TYPE = SecretType.FIELD_TYPE;
            const typeSelectElem = js.selector.selectFrom(rowElem, "[data-field_type_select]");
            switch (customColumn.type) {
                case TYPE.TEXT:
                case TYPE.PASSWORD:
                    valueInput.value = customColumn.value;
                    break;
                case TYPE.FILE:
                    this.p.fileComponent.initFileFieldFileInfo(valueInput, customColumn.value);
                    if (!this.p.secretTypeComponent.fileAllowed) {
                        $(typeSelectElem).append(new Option(i18n(VI18N.FILE), "file", true, true)).trigger('change');
                    }
                    break;
            }
            $(typeSelectElem).val(customColumn.type).trigger("change.select2");
            return rowElem;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getColumnIndex(rowOrInput) {
        try {
            const inputRow = js.selector.closest(rowOrInput, "[data-custom_col_row]");
            const customColumn = globalNodeData.getNodeData(inputRow);
            if (customColumn) {
                try {
                    const id = this.getColumnIndexFromId(customColumn.id);
                    return id;
                }
                catch (e) { }
            }
            const existingMaxIndex = this.getMaxExistingColumnIndex();
            let index = existingMaxIndex + 1;
            const allRows = this.getNonEmptyCustomColumnRows();
            let hasValidNodeData = false;
            for (let row of allRows) {
                if (row == inputRow) {
                    return index;
                }
                hasValidNodeData = Boolean(globalNodeData.getNodeData(row));
                if (!hasValidNodeData) {
                    index++;
                }
            }
            throw "cannot find the row";
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getMaxExistingColumnIndex() {
        try {
            const allCustomColumns = this.p.secretEditUIInput.customColumns;
            const columnIndexes = [];
            for (let curCustomColumn of allCustomColumns) {
                try {
                    columnIndexes.push(this.getColumnIndexFromId(curCustomColumn.id));
                }
                catch (e) { }
            }
            return Math.max(-1, ...columnIndexes);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getColumnIndexFromId(id) {
        try {
            const indexRegex = /[^\d]*([\d]*)/;
            const result = indexRegex.exec(id);
            if (result[1] == null) {
                throw "cannot get custom column index from id";
            }
            return parseInt(result[1]);
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
