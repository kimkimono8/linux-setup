import { TabStorageKeys } from "../../service/storage/constants/TabStorageKeys.js";
import { iframeCreator } from "./csframe-IframeCreator.js";
import { iframeShower } from "./csframe-IframeShower.js";
import { util } from "./csframe-util.js";
class ResetFrame {
    shownDbKey = TabStorageKeys.SHOWN_RESET_FRAME;
    height = 310;
    width;
    async show() {
        const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
            id: iframeCreator.ID.RESET,
            path: iframeCreator.PATH.RESET,
            height: 310,
            width: 400,
            style: this.getStyle(),
        }));
        iframeShower.show(iframeShower.newShowInput({
            frame,
            shownDbKey: this.shownDbKey,
        }));
    }
    close(params = {}) {
        util.removeFrame(params, iframeCreator.ID.RESET);
    }
    async restore() {
        return util.restore(this.shownDbKey, this);
    }
    getStyle() {
        return `height ${this.height}px !important;width: ${this.width}px !important;` +
            "position: fixed !important;border:none !important;" +
            `min-width: ${this.width}px !important;` +
            `min-height: ${this.height}px !important;` +
            "opacity: 100 !important;" +
            "box-shadow: -2px 0 6px 0 rgba(0,0,0,.15) !important;" +
            "height: max-content !important;" +
            "transition: right 0.5s;" +
            `top: 0px !important; left: 0px !important;` +
            "z-index: " + Date.now() + " !important;" +
            "background-color: #f8f8f8 !important;";
    }
}
export const exp_resetFrame = new ResetFrame();
