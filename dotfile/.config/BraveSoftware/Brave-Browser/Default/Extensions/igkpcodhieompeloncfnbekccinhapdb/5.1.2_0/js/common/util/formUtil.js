import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { setGlobal } from "../global/global.js";
export class FormUtil {
    async getPaymentCardCategoryId() {
        try {
            return await zlocalStorage.load(LocalStorageKeys.PAYMENT_CARD_TYPE_ID, "");
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async isPaymentCardCategory(categoryId) {
        try {
            if (!categoryId) {
                return false;
            }
            const paymentCardId = await this.getPaymentCardCategoryId();
            return paymentCardId == categoryId;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async getAddressCategoryId() {
        try {
            return await zlocalStorage.load(LocalStorageKeys.ADDRESS_TYPE_ID, "");
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async isAddressCategory(categoryId) {
        try {
            if (!categoryId) {
                return false;
            }
            const addressId = await this.getAddressCategoryId();
            return addressId == categoryId;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
export const formUtil = new FormUtil();
setGlobal("formUtil", formUtil);
