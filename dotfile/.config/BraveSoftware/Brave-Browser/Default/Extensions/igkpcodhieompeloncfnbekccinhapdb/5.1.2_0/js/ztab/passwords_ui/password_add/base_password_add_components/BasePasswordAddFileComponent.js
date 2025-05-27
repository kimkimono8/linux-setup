import { zcrypt } from "../../../../common/components/zcrypt.js";
import { globalNodeData } from "../../../../common/ui/globalNodeData.js";
import { UIUtil1 } from "../../../../common/ui/ui_util.js";
import { SecretType } from "../../../../src/service/bgApi/types/SecretType.js";
import { VI18N } from "../../../../src/service/vt/VI18n.js";
import { BasePasswordAddFileSource } from "./BasePasswordAddFileSource.js";
export class BsaePasswordAddFileComponent {
    static MAX_FILE_COUNT = 2;
    p = null;
    fileSourceSymbol = Symbol();
    addFileSource(input) {
        try {
            if (!input) {
                throw "empty input";
            }
            const fileSource = new BasePasswordAddFileSource(this.p);
            fileSource.setInput(input);
            globalNodeData.setCustomData(input, fileSource, this.fileSourceSymbol);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getFileSource(input) {
        try {
            if (!input) {
                throw "empty input";
            }
            const fileSource = globalNodeData.getCustomData(input, this.fileSourceSymbol);
            if (!fileSource) {
                throw "empty file source";
            }
            return fileSource;
        }
        catch (e) {
            throw "cannot get file source";
        }
    }
    checkFileSizeCount() {
        try {
            const fileSources = this.getAllFileSources();
            const totalCount = fileSources.length;
            const isValidCount = totalCount <= BsaePasswordAddFileComponent.MAX_FILE_COUNT;
            if (!isValidCount) {
                VUI.notification.showError(i18n(VI18N.FILE_ONLY_N_PER_PASSWORD, "2"));
                this.focusFileInputForError();
                return false;
            }
            const TWO_MB = 2 * 1024 * 1024;
            const totalFileSize = js.math.sum(...fileSources.map(x => x.getFileSize()));
            const isValidFileSize = totalFileSize <= TWO_MB;
            if (!isValidFileSize) {
                VUI.notification.showError(i18n(VI18N.FILE_SIZE_PER_PASSWORD_CANNOT_EXCEED, "2 MB"));
                this.focusFileInputForError();
                return false;
            }
            return true;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async getApiFileInfos(shared) {
        try {
            const allFileSources = this.getAllFileSources();
            const reqFileInfos = [];
            let fileInfo = null;
            for (let curFileSource of allFileSources) {
                fileInfo = await curFileSource.getFileInfo();
                if (fileInfo) {
                    reqFileInfos.push(fileInfo);
                }
            }
            for (let curFileInfo of reqFileInfos) {
                curFileInfo.data = await zcrypt.fileEncrypt(curFileInfo.data, shared);
            }
            return reqFileInfos;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getAllFileSources() {
        try {
            const fileInputs = this.p.secretTypeComponent.getNonEmptyInputs(SecretType.FIELD_TYPE.FILE);
            fileInputs.push(...this.p.customFieldComponent.getNonEmptyFileInputs());
            const fileSources = fileInputs.map(x => this.getFileSource(x));
            return fileSources;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    focusFileInputForError() {
        try {
            const fileInput = this.p.secretTypeComponent.getNonEmptyInputs(SecretType.FIELD_TYPE.FILE).find(() => true) ||
                this.p.customFieldComponent.getNonEmptyFileInputs().find(() => true);
            if (!fileInput) {
                throw "cannot get valid file input for focusing";
            }
            this.focusFileInput(fileInput);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    showFileName(input, fileName) {
        try {
            const uploadDiv = js.selector.closest(input, "[data-upload_div]");
            const fileInfoDiv = uploadDiv.nextElementSibling;
            js.dom.setChildText(fileInfoDiv, "[data-file_name]", fileName);
            fileInfoDiv.classList.add("dis-block");
            js.dom.hideOld(uploadDiv);
            js.dom.showOld(fileInfoDiv);
        }
        catch (e) {
            logError(e);
        }
    }
    focusFileInput(input) {
        try {
            if (!input) {
                throw "empty file input for focusing";
            }
            const container = js.selector.closest(input, "[data-field_row]");
            const uploadElem = js.selector.selectFrom(container, "[data-upload_a]");
            uploadElem.focus();
            UIUtil1.inst.scrollIntoView(container);
        }
        catch (e) {
            throw "cannot focus file input";
        }
    }
}
