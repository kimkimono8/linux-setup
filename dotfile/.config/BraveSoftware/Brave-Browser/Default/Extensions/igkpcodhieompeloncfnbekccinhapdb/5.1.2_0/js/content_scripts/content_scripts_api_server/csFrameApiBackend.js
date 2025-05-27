import { csframe } from "../../src/cs/csframe/export.js";
import { cs } from "../cs.js";
export class CSFrameApiBackend {
    async showConfirmFrame() {
        return csframe.confirm.show();
    }
    async showSaveFrame() {
        return csframe.saveFrame.show();
    }
    async showUpdateFrame() {
        return csframe.updateFrame.show();
    }
    async showSiteFrame() {
        return csframe.siteFrame.show();
    }
    async showSaveCardFrame() {
        return csframe.cardSave.show();
    }
    async showFormFrame(frameUrl) {
        await cs.card.saveCCIframeData();
        return csframe.formFrame.show(frameUrl);
    }
    async showUpdateCardFrame() {
        return csframe.cardUpdate.show();
    }
    async showResetFrame() {
        return csframe.resetFrame.show();
    }
    async showAlertFrame() {
        return csframe.alert.show();
    }
    async downloadFile(data) {
        return cs.downloadUtil.saveFile(data);
    }
    async closeFrame(params) {
        return csframe.closeFrame(params);
    }
    async closeSiteFrame(params) {
        return csframe.siteFrame.close(params);
    }
    async closeCardFrame() {
        return csframe.formFrame.close();
    }
    async closeSaveCardFrame() {
        return csframe.cardSave.close();
    }
}
