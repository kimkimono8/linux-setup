import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { VtSettings } from "../../src/service/vt/constants/VtSettings.js";
import { SecretElemCreatorHelper } from "./SecretElemCreatorHelper.js";
export class SecretElemCreatorData {
    template = null;
    secretTypeMap = {};
    incognitoAllowed = false;
    isPersonalPlan = false;
    curSecret = null;
    cardTypeId = "";
    disableClickToLogin = false;
}
export class SecretElemCreator {
    data = new SecretElemCreatorData();
    p = null;
    async init() {
        this.data.template = js.selector.select("#secret_list_item_template");
        this.data.secretTypeMap = await bgApi.secretType.getMap();
        this.data.incognitoAllowed = await brApi.tab.isIncognitoAllowed();
        const storage = await zlocalStorage.loadAll({
            [LocalStorageKeys.IS_PERSONAL_PLAN]: false,
            [VtSettings.DISABLE_CLICK_TO_LOGIN]: false,
            [LocalStorageKeys.PAYMENT_CARD_TYPE_ID]: ""
        });
        this.data.isPersonalPlan = storage[LocalStorageKeys.IS_PERSONAL_PLAN];
        this.data.disableClickToLogin = storage[VtSettings.DISABLE_CLICK_TO_LOGIN];
        this.data.cardTypeId = storage[LocalStorageKeys.PAYMENT_CARD_TYPE_ID];
    }
    async getList(secrets, result) {
        const param = { result, secret: null };
        const creator = new SecretElemCreatorHelper(this, this.data);
        const fragment = document.createDocumentFragment();
        for (let secret of secrets) {
            param.secret = secret;
            fragment.append(await creator.createSecretElem(param));
        }
        return fragment;
    }
    async createSecretElem(param) {
        return new SecretElemCreatorHelper(this, this.data).createSecretElem(param);
    }
}
