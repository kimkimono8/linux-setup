import { TabStorageKeys } from "../../service/storage/constants/TabStorageKeys.js";
import { bg } from "../bg.js";
import { bgStorage } from "../storage/export.js";
import { ApiServerUtil } from "./BgApiServerUtil.js";
export class BgCardFrameApiImpl {
    async getTabUrl(port) {
        return ApiServerUtil.getTabUrl(port);
    }
    async showFormFrame(frameUrl, port) {
        return csApi.frame.showFormFrame(ApiServerUtil.getTabId(port), frameUrl);
    }
    async closeCardFrame(port) {
        return csApi.frame.closeCardFrame(ApiServerUtil.getTabId(port));
    }
    async showSaveCardFrame(cardObj, port) {
        cardObj.allowedClassifications = await bg.vaultConfig.getAddPasswordClassifications();
        const tabId = ApiServerUtil.getTabId(port);
        await bgStorage.tab.save(tabId, TabStorageKeys.SAVE_CARD_FRAME_DATA, cardObj);
        return csApi.frame.showSaveCardFrame(tabId);
    }
    async showUpdateCardFrame(cardObj, port) {
        cardObj.allowedClassifications = await bg.vaultConfig.getAddPasswordClassifications();
        const tabId = ApiServerUtil.getTabId(port);
        await bgStorage.tab.save(tabId, TabStorageKeys.SAVE_CARD_FRAME_DATA, cardObj);
        return csApi.frame.showUpdateCardFrame(tabId);
    }
    async closeSaveCardFrame(port) {
        const tabId = ApiServerUtil.getTabId(port);
        await bgStorage.tab.remove(tabId, TabStorageKeys.SAVE_CARD_FRAME_DATA);
        return csApi.frame.closeSaveCardFrame(tabId);
    }
    async getSecrets(query, _port) {
        return bg.cardFrame.getCardListSecrets(query);
    }
    async fillCard(secret, frameId, port) {
        return bg.cardFrame.fillCard(ApiServerUtil.getTabId(port), frameId, secret);
    }
    async fillCardIframe(data, secretId, frameId, port) {
        return bg.cardFrame.fillCardIframe(ApiServerUtil.getTabId(port), frameId, secretId, data);
    }
    async fillForm(secret, frameId, port) {
        return bg.formFrame.fillForm(ApiServerUtil.getTabId(port), frameId, secret);
    }
    async fillFormField(data, frameId, port) {
        return bg.formFrame.fillFormField(ApiServerUtil.getTabId(port), frameId, data);
    }
    async getCardCategory(_port) {
        return bg.vaultSecretTypes.getCardType();
    }
    async checkIframeFields(data, port) {
        return csApi.card.checkIframeFields(ApiServerUtil.getTabId(port), data);
    }
    async fillVaultIconCCIframe(fields, frameId, port) {
        return csApi.card.fillVaultIconCCIframe(fields, { tabId: ApiServerUtil.getTabId(port), frameId });
    }
}
