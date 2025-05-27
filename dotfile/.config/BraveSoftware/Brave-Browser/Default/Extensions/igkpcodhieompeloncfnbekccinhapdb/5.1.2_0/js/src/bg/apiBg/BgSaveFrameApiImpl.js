import { ApiServerUtil } from "./BgApiServerUtil.js";
import { bg } from "../bg.js";
export class BgSaveFrameApiImpl {
    async showSaveFrame(port) {
        return csApi.frame.showSaveFrame(ApiServerUtil.getTabId(port));
    }
    async saveCredential(saveCredential, port) {
        return bg.savePassword.saveCredential(saveCredential, ApiServerUtil.getTabId(port));
    }
    async disableSavePassword(port) {
        return bg.savePassword.disableSave(ApiServerUtil.getTabId(port));
    }
    async getData(port) {
        return bg.saveFrame.getData(ApiServerUtil.getTabId(port));
    }
    async saveSecret(saveFrameUserInput, port) {
        return bg.saveFrame.savePassword(saveFrameUserInput, ApiServerUtil.getTabId(port));
    }
    async editSecret(saveFrameUserInput, port) {
        return bg.saveFrame.editPassword(saveFrameUserInput, ApiServerUtil.getTabId(port));
    }
    async closeSaveFrame(params, port) {
        return bg.saveFrame.close(params, ApiServerUtil.getTabId(port));
    }
}
