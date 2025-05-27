import { contextChecker } from "../components/contextChecker.js";
import { cs } from "../cs.js";
export class CSOtherApiBackend {
    async setConfirmResponse(allow) {
        return contextChecker.setConfirmResponse(allow);
    }
    async resetPassword() {
        return cs.passwordReset.resetPassword();
    }
    async getFrameUrl() {
        return window.location.href;
    }
    async showSiteFrame(params) {
        return zicon.showSiteFrame(params);
    }
    async showCardFrame() {
        return zicon.showCardFrame();
    }
    async getGeneratorSaveUsername() {
        return cs.other.getGeneratorSaveUsername();
    }
    async getFilledFormData() {
        return cs.other.getFilledFormData();
    }
}
