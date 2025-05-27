import { ZVError } from "../../../../common/error/ZVError.js";
import { globalNodeData } from "../../../../common/ui/globalNodeData.js";
import { fileUtil } from "../../../../common/util/fileUtil.js";
export class BasePasswordAddFileSource {
    p = null;
    inputElem = null;
    constructor(p) {
        this.p = p;
    }
    setInput(input) {
        try {
            if (!input) {
                throw "invalid input";
            }
            this.inputElem = input;
        }
        catch (e) {
            logError(e);
        }
    }
    async getFileInfo() {
        try {
            const input = this.inputElem;
            if (!input) {
                throw "cannot get file info for empty input";
            }
            const file = input.files[0];
            const fileInfo = {
                name: this.getFileName(),
                size: file.size + "",
                data: await fileUtil.readFileContent(file),
                column: this.getColumnName()
            };
            return fileInfo;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getColumnName() {
        try {
            const input = this.inputElem;
            if (!input) {
                throw "cannot get column name for empty input";
            }
            const secretTypeField = globalNodeData.getNodeData(input);
            if (secretTypeField) {
                return secretTypeField.name;
            }
            try {
                const customColumn = this.p.customFieldComponent.getCustomColumn(input);
                if (customColumn) {
                    return customColumn.value;
                }
            }
            catch (e) {
                ZVError.error(e);
            }
            throw "not supported";
        }
        catch (e) {
            throw logError(e);
        }
    }
    isEmpty() {
        return !Boolean(this.inputElem.value);
    }
    getFileSize() {
        try {
            if (!this.inputElem) {
                throw "input elem not found";
            }
            const hasNoFiles = this.inputElem.files.length == 0;
            if (hasNoFiles) {
                throw "has no files";
            }
            return this.inputElem.files[0].size;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getFileName() {
        try {
            if (!this.inputElem) {
                throw "input elem not found";
            }
            const hasNoFiles = this.inputElem.files.length == 0;
            if (hasNoFiles) {
                throw "has no files";
            }
            const fileName = this.inputElem.files[0].name;
            return fileName;
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
