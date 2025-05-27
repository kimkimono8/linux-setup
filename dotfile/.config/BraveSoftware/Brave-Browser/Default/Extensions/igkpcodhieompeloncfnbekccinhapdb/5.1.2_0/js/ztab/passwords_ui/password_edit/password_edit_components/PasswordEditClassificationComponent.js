import { BasePasswordAddClassificationComponent } from "../../password_add/base_password_add_components/BasePasswordAddClassificationComponent.js";
export class PasswordEditClassificationComponent extends BasePasswordAddClassificationComponent {
    p = null;
    async getAllowedClassifications() {
        try {
            const classifications = await super.getAllowedClassifications();
            if (classifications.length == 2) {
                return classifications;
            }
            if (!classifications.includes(this.p.secretEditUIInput.classification)) {
                classifications.push(this.p.secretEditUIInput.classification);
            }
            return classifications;
        }
        catch (e) {
            throw e;
        }
    }
}
