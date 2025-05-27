import { BasePasswordAddFileSource } from "../../password_add/base_password_add_components/BasePasswordAddFileSource.js";
export class PasswordEditFileSource extends BasePasswordAddFileSource {
    p = null;
    fileInfo = null;
    constructor(p) {
        super(p);
        this.p = p;
    }
    setFileInfo(fileInfo) {
        try {
            if (!fileInfo) {
                throw "file info empty";
            }
            this.fileInfo = fileInfo;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async getFileInfo() {
        try {
            if (this.fileInfo) {
                return null;
            }
            return super.getFileInfo();
        }
        catch (e) {
            throw jserror(e);
        }
    }
    removeFile() {
        try {
            if (!this.fileInfo) {
                return;
            }
            const files = this.p.secretEditUIInput.files;
            const fileIndex = files.findIndex(x => x.column == this.fileInfo.column);
            js.array.removeElemAt(files, fileIndex);
            this.p.deletedFiles.push(this.fileInfo.column);
            this.fileInfo = null;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    isEmpty() {
        return (this.fileInfo == null) && super.isEmpty();
    }
    getFileSize() {
        try {
            if (this.fileInfo) {
                return this.fileInfo.size;
            }
            return super.getFileSize();
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getFileName() {
        try {
            if (this.fileInfo) {
                return this.fileInfo.name;
            }
            return super.getFileName();
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
