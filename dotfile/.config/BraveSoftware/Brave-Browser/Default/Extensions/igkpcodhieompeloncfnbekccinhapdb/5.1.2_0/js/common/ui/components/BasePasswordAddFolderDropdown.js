import { FolderEditableQuery } from "../../../src/service/bgApi/types/Folder.js";
import { LocalStorageKeys } from "../../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../../src/service/vt/VI18n.js";
import { regexUtil } from "../../util/regexUtil.js";
import { UIUtil1 } from "../ui_util.js";
import { InvalidCharConsumer } from "../util/InvalidCharConsumer.js";
export class BasePasswordAddFolderDropDown {
    editableFolderQuery = null;
    placeholder = "";
    init() {
        this.init = js.fn.emptyFn;
        js.fn.bindThis(this, [
            this.checkFolderName,
            this.getFoldersSelect2,
            this.formatSelect2Folder,
            this.handleSelect2CreateTag
        ]);
    }
    async createUI() {
        try {
            this.init();
            this.editableFolderQuery = new FolderEditableQuery();
            const selectInput = this.getFolderSelectElem();
            const newFolderAllowed = await zlocalStorage.load(LocalStorageKeys.ALLOW_ADD_FOLDER, true);
            $(selectInput).select2({
                dropdownParent: $(this.getSelect2DropDownParent()),
                placeholder: this.placeholder,
                allowClear: true,
                tags: newFolderAllowed,
                ajax: {
                    transport: this.getFoldersSelect2
                },
                templateResult: this.formatSelect2Folder,
                createTag: this.handleSelect2CreateTag,
            });
            $(selectInput).on("change.select2", this.checkFolderName);
            this.addInvalidCharListener();
        }
        catch (e) {
            logError(e);
        }
    }
    async getFoldersSelect2(params, on_success, _on_failure) {
        const select2_data = params.data;
        const query = this.editableFolderQuery;
        if (query.search_string != select2_data.term) {
            query.search_string = select2_data.term || "";
        }
        if (typeof select2_data.page != "undefined") {
            query.page_no = select2_data.page - 1;
        }
        const folders = await bgApi.folder.queryEditable(query);
        folders.forEach(folder => folder.text = folder.name);
        on_success({
            results: folders,
            pagination: {
                more: folders.length == query.rows_per_page
            }
        });
    }
    formatSelect2Folder(state) {
        if (state.loading) {
            return "";
        }
        const elem = UIUtil.createElem({ template: "#folder_select2_dropdown" });
        js.dom.setChildText(elem, "[data-folder_name]", state.text);
        const arrow = UIUtil.createElem({ template: "#folder_select2_arrow" });
        const path_elem = js.selector.selectFrom(elem, "[data-folder_path]");
        if (state.id == state.text) {
            path_elem.textContent = i18n(VI18N.CREATE_NEW);
        }
        else if (state.path.includes("\\")) {
            const path_parts = state.path.split("\\");
            path_elem.append(path_parts[0]);
            for (let i = 1; i < path_parts.length; i++) {
                path_elem.append(arrow.cloneNode(true));
                path_elem.append(path_parts[i]);
            }
        }
        else {
            path_elem.remove();
        }
        return $(elem);
    }
    checkFolderName() {
        try {
            const folderSelectElem = this.getFolderSelectElem();
            const folderName = this.getNewFolderName();
            const select2_data = $(folderSelectElem).select2("data")[0];
            this.setErrorMessage("");
            const isNewFolder = folderName && select2_data.id == select2_data.text;
            if (!isNewFolder) {
                return true;
            }
            const newFolderName = select2_data.text;
            const errorMsg = this.checkFolderNameFn(newFolderName);
            this.setErrorMessage(errorMsg);
            return !Boolean(errorMsg);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    checkFinalFolderName() {
        try {
            const isValid = this.checkFolderName();
            if (isValid) {
                return true;
            }
            const folderSelectElem = this.getFolderSelectElem();
            UIUtil1.inst.scrollIntoView(folderSelectElem);
            folderSelectElem.focus();
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    getNewFolderName() {
        try {
            const folderSelectElem = this.getFolderSelectElem();
            const selectedVal = $(folderSelectElem).val() || "";
            if (!selectedVal) {
                return "";
            }
            const select2_data = $(folderSelectElem).select2("data")[0];
            const isNewFolder = select2_data.id == select2_data.text;
            if (!isNewFolder) {
                return "";
            }
            return selectedVal;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    getFolderId() {
        try {
            const folderSelectElem = this.getFolderSelectElem();
            const selectedVal = $(folderSelectElem).val() || "";
            if (!selectedVal) {
                return "";
            }
            const select2_data = $(folderSelectElem).select2("data")[0];
            const existingFolder = select2_data.id != select2_data.text;
            if (!existingFolder) {
                return "";
            }
            return selectedVal;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    checkFolderNameFn(name) {
        try {
            const invalidChars = regexUtil.getNonClearTextChars(name);
            if (invalidChars.length) {
                return i18n(VI18N.FOLDER) + " " + i18n(VI18N.NAME) + " " + i18n(VI18N.MUST_NOT_CONTAIN) + " " + invalidChars.join(", ");
            }
            return "";
        }
        catch (e) {
            logError(e);
            return e + "";
        }
    }
    async prefillFolderId(folderId) {
        return new FolderIdPreFiller().prefill(folderId, this.getFolderSelectElem());
    }
    async prefillNewFolderName(name) {
        return new FolderNamePreFiller().prefill(name, this.getFolderSelectElem());
    }
    addInvalidCharListener() {
        try {
            const folderSelectElem = this.getFolderSelectElem();
            const searchInputElem = $(folderSelectElem).data("select2").dropdown.$search[0];
            new InvalidCharConsumer().consumeInvalidChars(searchInputElem, regexUtil.vaultRegex.cleartext);
        }
        catch (e) {
            logError(e);
        }
    }
    handleSelect2CreateTag(params) {
        const validString = regexUtil.replaceNonClearTextChars(params.term).trim();
        if (!validString) {
            return null;
        }
        return {
            id: validString,
            text: validString,
        };
    }
    getFolderSelectElem() {
        const folderRowElem = this.getFolderRowElem();
        const folderSelectElem = js.selector.selectFrom(folderRowElem, "[data-folder_select]");
        return folderSelectElem;
    }
    getSelect2DropDownParent() {
        return document.body;
    }
    setErrorMessage(errorMsg) {
        errorMsg;
    }
}
class FolderNamePreFiller {
    prefill(name, folderSelectElem) {
        try {
            if (!name) {
                return;
            }
            this.addSelectOption(name, name, folderSelectElem);
        }
        catch (e) {
            logError(e);
        }
    }
    addSelectOption(id, name, folderSelectElem) {
        const option = new Option(name, id, true, true);
        $(folderSelectElem).append(option);
        $(folderSelectElem).val(id).trigger("change.select2");
    }
}
class FolderIdPreFiller extends FolderNamePreFiller {
    async prefill(folderId, folderSelectElem) {
        try {
            if (!folderId) {
                return;
            }
            const folder = await bgApi.folder.get(folderId);
            this.addSelectOption(folder.id, folder.name, folderSelectElem);
        }
        catch (e) {
            logError(e);
        }
    }
}
