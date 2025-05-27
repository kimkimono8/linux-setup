import { TabStorageKeys } from "../../service/storage/constants/TabStorageKeys.js";
import { iframeCreator } from "./csframe-IframeCreator.js";
import { iframeShower } from "./csframe-IframeShower.js";
import { util } from "./csframe-util.js";
class CardSaveFrame {
    shownDbKey = TabStorageKeys.SHOWN_SAVE_CARD_FRAME;
    async show() {
        await ztabStorage.remove(TabStorageKeys.SHOWN_UPDATE_CARD_FRAME);
        const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
            id: iframeCreator.ID.CARD_SAVE_UPDATE,
            path: iframeCreator.PATH.SAVE_UPDATE_CARD,
            height: 400,
            width: 350,
        }));
        iframeShower.show(iframeShower.newShowInput({
            frame,
            animateRight: true,
            shownDbKey: this.shownDbKey,
        }));
    }
    close(params = {}) {
        util.removeFrame(params, iframeCreator.ID.CARD_SAVE_UPDATE);
    }
    async restore() {
        return util.restore(this.shownDbKey, this);
    }
}
export const exp_cardSaveFrame = new CardSaveFrame();
