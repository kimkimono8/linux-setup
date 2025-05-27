import { SecretClassification } from "../../../../src/service/bgApi/types/Secret.js";
import { VI18N } from "../../../../src/service/vt/VI18n.js";
import { zt } from "../../../zt.js";
export class BasePasswordAddClassificationComponent {
    disabledClass = "personal-enterprise-switch-disabled";
    p = null;
    async createUI() {
        try {
            const isPersonalPlan = zt.mainUI.data.isPersonalPlan;
            const classificationInput = this.p.select("[data-classification]");
            if (isPersonalPlan) {
                classificationInput.checked = false;
                this.p.hide("[data-classification_container]");
                return;
            }
            const allowedClassifications = await this.getAllowedClassifications();
            if (allowedClassifications.length == 2) {
                return;
            }
            classificationInput.disabled = true;
            this.p.select("[data-classification_label]").classList.add(this.disabledClass);
            if (!allowedClassifications.includes(SecretClassification.PERSONAL)) {
                classificationInput.checked = true;
                this.p.select("[data-classification_label]").dataset.tooltip_content = i18n(VI18N.PERSONAL_PASSWORD_RESTRICTED);
                return;
            }
            classificationInput.checked = false;
            this.p.select("[data-classification_label]").dataset.tooltip_content = i18n(VI18N.ENTERPRISE_PASSWORD_RESTRICTED);
        }
        catch (e) {
            logError(e);
        }
    }
    getClassification() {
        try {
            const classificationInput = this.getClassificationInput();
            if (classificationInput.checked) {
                return SecretClassification.ENTERPRISE;
            }
            return SecretClassification.PERSONAL;
        }
        catch (e) {
            logError(e);
            return SecretClassification.PERSONAL;
        }
    }
    setClassification(classification) {
        try {
            if (!classification) {
                return;
            }
            const classificationInput = this.getClassificationInput();
            classificationInput.checked = classification == SecretClassification.ENTERPRISE;
        }
        catch (e) {
            logError(e);
        }
    }
    async getAllowedClassifications() {
        return bgApi.secret.getAddPasswordClassifications();
    }
    getClassificationInput() {
        return this.p.select("[data-classification]");
    }
}
