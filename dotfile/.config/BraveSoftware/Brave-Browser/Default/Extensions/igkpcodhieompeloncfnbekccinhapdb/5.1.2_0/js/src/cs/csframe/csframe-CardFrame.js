import { iframeCreator } from "./csframe-IframeCreator.js";
import { iframeShower } from "./csframe-IframeShower.js";
import { util } from "./csframe-util.js";
class CardFrame {
    async show() {
        try {
            const width = 380;
            const height = 390;
            const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
                id: iframeCreator.ID.CARD_SAVE_UPDATE,
                path: iframeCreator.PATH.CARD_LIST,
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
        util.removeFrame(params, iframeCreator.ID.CARD_SAVE_UPDATE);
    }
}
export const exp_cardFrame = new CardFrame();
