import { iframeCreator } from "./csframe-IframeCreator.js";
import { iframeShower } from "./csframe-IframeShower.js";
import { util } from "./csframe-util.js";
class ConfirmFrame {
    async show() {
        const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
            id: iframeCreator.ID.CONFIRM,
            path: iframeCreator.PATH.CONFIRM,
            height: 200,
        }));
        iframeShower.show(iframeShower.newShowInput({ frame, animateRight: true }));
    }
    close(params = {}) {
        util.removeFrame(params, iframeCreator.ID.CONFIRM);
    }
}
export const exp_confirmFrame = new ConfirmFrame();
