import { iframeCreator } from "./csframe-IframeCreator.js";
import { iframeShower } from "./csframe-IframeShower.js";
import { util } from "./csframe-util.js";
class AlertFrame {
    async show() {
        const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
            id: iframeCreator.ID.ALERT,
            path: iframeCreator.PATH.ALERT,
            style: this.getStyle(),
        }));
        iframeShower.show(iframeShower.newShowInput({ frame }));
    }
    close(params = {}) {
        util.removeFrame(params, iframeCreator.ID.ALERT);
    }
    getStyle() {
        return `height: 100% !important;width: 100% !important;` +
            "position: fixed !important;border:none !important;" +
            "opacity: 100 !important;" +
            "box-shadow: -2px 0 6px 0 rgba(0,0,0,.15) !important;" +
            "transition: right 0.5s;" +
            `top: 0px !important;right: 0px !important;` +
            "z-index: " + Date.now() + " !important;";
    }
}
export const exp_alertFrame = new AlertFrame();
