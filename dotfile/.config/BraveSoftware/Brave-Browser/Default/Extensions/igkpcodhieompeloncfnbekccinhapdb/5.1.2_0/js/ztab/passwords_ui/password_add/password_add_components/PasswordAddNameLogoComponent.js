import { VI18N } from "../../../../src/service/vt/VI18n.js";
import { BasePasswordAddNameLogoComponent } from "../base_password_add_components/BasePasswordAddNameLogoComponent.js";
export class PasswordAddNameLogoComponent extends BasePasswordAddNameLogoComponent {
    async checkPasswordName(name) {
        try {
            const errorMsg = super.checkPasswordName(name);
            if (errorMsg) {
                return errorMsg;
            }
            const existingName = await bgApi.secret.checkExistingPasswordName(name);
            if (existingName) {
                return i18n(VI18N.SAME_NAME_PASSWORD_EXISTS);
            }
            return "";
        }
        catch (e) {
            logError(e);
            return e + "";
        }
    }
}
