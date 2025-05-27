import { globalNodeData } from "../../../../common/ui/globalNodeData.js";
import { formUtil } from "../../../../common/util/formUtil.js";
import { SecretType } from "../../../../src/service/bgApi/types/SecretType.js";
import { BasePasswordAddSecretTypeComponent } from "../../password_add/base_password_add_components/BasePasswordAddSecretTypeComponent.js";
import { PasswordHistoryController } from "../../password_history/PasswordHistoryController.js";
export class PasswordEditSecretTypeComponent extends BasePasswordAddSecretTypeComponent {
    p = null;
    async createUI() {
        const typeId = this.p.secretEditUIInput.typeId;
        this.editSecretData = this.p.secretEditUIInput;
        await this.addSecretTypeFields(typeId);
        if (!await formUtil.isPaymentCardCategory(typeId)) {
            this.addPasswordHistoryIcons();
        }
    }
    isOptionalFileEndAppend() {
        return false;
    }
    async setInitValues(plainSecretData) {
        try {
            await this.reAddRestrictedFileFields(plainSecretData);
            const allInputs = this.getAllInputs();
            let field = null;
            const FIELD_TYPE = SecretType.FIELD_TYPE;
            for (let input of allInputs) {
                field = globalNodeData.getNodeData(input);
                if (!plainSecretData[field.name]) {
                    continue;
                }
                switch (input.type) {
                    case FIELD_TYPE.TEXT:
                    case FIELD_TYPE.PASSWORD:
                    case FIELD_TYPE.TEXTAREA:
                        input.value = plainSecretData[field.name];
                        break;
                    case FIELD_TYPE.FILE:
                        this.p.fileComponent.initFileFieldFileInfo(input, field.name);
                        break;
                }
            }
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async reAddRestrictedFileFields(plainSecretData) {
        try {
            if (this.fileAllowed) {
                return;
            }
            const typeId = this.p.secretEditUIInput.typeId;
            const secretType = await bgApi.secretType.get(typeId);
            const presentFileFields = secretType.fields.filter(x => x.type == SecretType.FIELD_TYPE.FILE && plainSecretData[x.name]);
            if (presentFileFields.length == 0) {
                return;
            }
            for (let field of presentFileFields) {
                this.addTypeField(field);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    addPasswordHistoryIcons() {
        try {
            const textPasswordInputs = this.getAllInputs()
                .filter(x => x.type == SecretType.FIELD_TYPE.TEXT || x.type == SecretType.FIELD_TYPE.PASSWORD);
            const template = js.selector.select("#password_history_icon_template");
            for (let input of textPasswordInputs) {
                js.selector.selectFrom(js.selector.closest(input, ".zv-label-group"), ".zvright-label ul").append(this.getHistoryIcon(template, input));
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getHistoryIcon(template, input) {
        try {
            const field = globalNodeData.getNodeData(input);
            const elem = UIUtil.createElem({ template: template });
            elem.firstElementChild.addEventListener("click", (e) => PasswordHistoryController.inst().showColumnHistory(this.p.secretEditUIInput.secretId, field.name, e));
            return elem;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
}
