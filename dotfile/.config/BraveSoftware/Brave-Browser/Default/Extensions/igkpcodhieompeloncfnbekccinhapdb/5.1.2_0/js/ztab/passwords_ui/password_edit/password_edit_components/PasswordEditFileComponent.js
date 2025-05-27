import { ZVError } from "../../../../common/error/ZVError.js";
import { globalNodeData } from "../../../../common/ui/globalNodeData.js";
import { BsaePasswordAddFileComponent } from "../../password_add/base_password_add_components/BasePasswordAddFileComponent.js";
import { PasswordEditFileSource } from "./PasswordEditFileSource.js";
export class PasswordEditFileComponent extends BsaePasswordAddFileComponent {
    p = null;
    addFileSource(input) {
        try {
            if (!input) {
                throw "input empty";
            }
            const fileSource = new PasswordEditFileSource(this.p);
            fileSource.setInput(input);
            globalNodeData.setCustomData(input, fileSource, this.fileSourceSymbol);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getFileSource(input) {
        try {
            const fileSource = super.getFileSource(input);
            if (fileSource instanceof PasswordEditFileSource) {
                return fileSource;
            }
            throw "cannot get edit file source";
        }
        catch (e) {
            throw "cannot get file source";
        }
    }
    initFileFieldFileInfo(input, column) {
        try {
            if (!input || !column) {
                throw "input or column empty";
            }
            const fileInfo = this.p.secretEditUIInput.files.find(x => x.column == column);
            if (!fileInfo) {
                console.error("file info not found", column, this.p.secretEditUIInput.files);
                ZVError.error("file info not found");
                return;
            }
            const fileSource = this.p.fileComponent.getFileSource(input);
            fileSource.setFileInfo(fileInfo);
            const fileName = fileSource.getFileName();
            this.showFileName(input, fileName);
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
