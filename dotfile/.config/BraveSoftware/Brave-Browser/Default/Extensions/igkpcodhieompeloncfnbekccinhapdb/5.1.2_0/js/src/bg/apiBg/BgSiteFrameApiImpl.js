import { bg } from "../bg.js";
import { ApiServerUtil } from "./BgApiServerUtil.js";
export class BgSiteFrameApiImpl {
    async showSiteFrame(port) {
        return csApi.frame.showSiteFrame(ApiServerUtil.getTabId(port));
    }
    async closeSiteFrame(params, port) {
        return csApi.frame.closeSiteFrame(params, ApiServerUtil.getTabId(port));
    }
    async getSecrets(query, port) {
        return bg.siteFrame.getSiteFrameSecrets(ApiServerUtil.getTabUrl(port), query);
    }
    async frameLogin(secretId, frameId, port) {
        return bg.siteFrame.frameLogin(ApiServerUtil.getTabId(port), frameId, secretId);
    }
    async fillSecret(secretId, frameId, port) {
        return bg.siteFrame.frameFill(ApiServerUtil.getTabId(port), frameId, secretId);
    }
    async fillTotp(secretId, frameId, port) {
        return bg.siteFrame.fillTotp(ApiServerUtil.getTabId(port), frameId, secretId);
    }
    async fillOneAuthTotp(secretId, oneauthId, frameId, port) {
        return bg.siteFrame.fillOneAuthTotp(ApiServerUtil.getTabId(port), frameId, secretId, oneauthId);
    }
    async fillField(secretId, fieldName, frameId, port) {
        return bg.siteFrame.fillField(ApiServerUtil.getTabId(port), frameId, secretId, fieldName);
    }
    async fillCustomCol(secretId, fieldName, frameId, port) {
        return bg.siteFrame.fillCustomCol(ApiServerUtil.getTabId(port), frameId, secretId, fieldName);
    }
    async fillGeneratedPassword(value, frameId, port) {
        return bg.siteFrame.fillGeneratedPassword(ApiServerUtil.getTabId(port), frameId, value);
    }
    async saveGeneratedPassword(password, frameId, port) {
        return bg.siteFrame.saveGeneratedPassword(password, frameId, ApiServerUtil.getTabId(port));
    }
    async openUnlockVaultPage() {
        await bg.unlockTabHandler.create();
    }
    async addPassword(frameId, port) {
        await bg.siteFrame.addPassword(ApiServerUtil.getTabId(port), frameId);
    }
    async isDomainMatchingId(secretId, port) {
        return domainHandler.isDomainMatchingId(secretId, ApiServerUtil.getTabUrl(port));
    }
}
