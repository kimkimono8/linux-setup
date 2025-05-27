import { iframeCreator } from "./csframe-IframeCreator.js";
import { iframeShower } from "./csframe-IframeShower.js";
import { util } from "./csframe-util.js";
class FormFrame {
    async show(frameUrl) {
        try {
            const width = 380;
            const height = 390;
            const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
                id: iframeCreator.ID.FORM_LIST,
                path: frameUrl,
                width,
                height,
            }));
            await iframeShower.showSiteFrame(iframeShower.newShowInput({ frame }), { width, height });
        }
        catch (e) {
            logError(e);
        }
    }
    close(params = {}) {
        util.removeFrame(params, iframeCreator.ID.FORM_LIST);
    }
}
export const exp_formFrame = new FormFrame();
