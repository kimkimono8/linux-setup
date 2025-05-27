import { SecretClassification } from "../../../src/service/bgApi/types/Secret.js";
import { LocalStorageKeys } from "../../../src/service/storage/constants/LocalStorageKeys.js";
import { zenum } from "../../enum/zenum.js";
import { formUtil } from "../../util/formUtil.js";
export class BasePasswordMoreActionsCli {
    static instance = null;
    secret = null;
    static get inst() {
        return this.instance || (this.instance = new BasePasswordMoreActionsCli());
    }
    async init(secretId) {
        this.secret = await bgApi.secret.getDbSecret(secretId);
    }
    getSecret() {
        return this.secret;
    }
    async isCardType() {
        return formUtil.isPaymentCardCategory(this.secret.type_id);
    }
    async getCopyFieldTypes() {
        try {
            const secretType = await bgApi.secretType.get(this.secret.type_id);
            return secretType.text_fields.concat(secretType.password_fields);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async copyField(fieldName) {
        await bgApi.secret.copyField(this.secret.id, fieldName);
    }
    async copyTotp() {
        await bgApi.secret.totp.copy(this.secret.id);
    }
    async copyOneAuthTotp() {
        const secret = this.secret;
        const totp = await bgApi.secret.totp.getOneAuthTotp(secret.oneauth_id);
        if (totp == null) {
            return false;
        }
        await bgApi.secret.totp.copyOneAuthTotp(this.secret.id, totp);
        return true;
    }
    getCopyCustomCols() {
        try {
            return this.secret.customColumnTypeInfos || [];
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async copyCustomColumn(fieldId) {
        await bgApi.secret.copyCustomColumn(this.secret.id, fieldId);
    }
    async checkNeedAccessControlRows() {
        try {
            const hasFeature = (await zlocalStorage.load(LocalStorageKeys.FEATURES, [])).includes(zenum.ZVFEATURES.ACCESS_CONTROL);
            return hasFeature && (this.secret.classification == SecretClassification.ENTERPRISE) && this.secret.owned;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async enableAccessControl() {
        await bgApi.ztab.enableAccessControl(this.secret.id);
    }
    async manageAccessControl() {
        await bgApi.ztab.manageAccessControl(this.secret.id);
    }
    async disableAccessControl() {
        await bgApi.accessCtrl.disable(this.secret.id);
    }
    async moveToTrash() {
        await bgApi.secret.delete(this.secret.id);
    }
    async changeAutoLogin(enable) {
        return bgApi.secret.edit.setAutoLogin(this.secret.id, enable);
    }
}
