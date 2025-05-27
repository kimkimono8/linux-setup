import { bg } from "../bg.js";
import { ApiServerUtil } from "./BgApiServerUtil.js";
export class BgUpdateFrameApiImpl {
    async showUpdateFrame(port) {
        return csApi.frame.showUpdateFrame(ApiServerUtil.getTabId(port));
    }
    async saveChangedCredential(changedCredential, port) {
        return bg.savePassword.saveChangedCredential(changedCredential, ApiServerUtil.getTab(port));
    }
    async updateChangedLoginPassword(changedLoginPassword, port) {
        return bg.updateFrame.updateChangedLoginPassword(changedLoginPassword, ApiServerUtil.getTabId(port));
    }
    async getData(port) {
        return bg.updateFrame.getData(ApiServerUtil.getTabId(port));
    }
    async updateSecret(port) {
        return bg.updateFrame.updatePassword(ApiServerUtil.getTabId(port));
    }
    async editSecret(port) {
        return bg.updateFrame.editPassword(ApiServerUtil.getTabId(port));
    }
    async saveAsNew(port) {
        return bg.updateFrame.saveAsNew(ApiServerUtil.getTabId(port));
    }
    async closeUpdateFrame(params, port) {
        return bg.updateFrame.close(params, ApiServerUtil.getTabId(port));
    }
}
