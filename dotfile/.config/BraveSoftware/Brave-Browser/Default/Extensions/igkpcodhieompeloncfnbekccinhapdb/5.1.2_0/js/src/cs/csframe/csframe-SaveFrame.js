import { TabStorageKeys } from "../../service/storage/constants/TabStorageKeys.js";
import { iframeCreator } from "./csframe-IframeCreator.js";
import { iframeShower } from "./csframe-IframeShower.js";
import { util } from "./csframe-util.js";
class SaveFrame {
    shownDbKey = TabStorageKeys.SHOWN_SAVE_FRAME;
    async show() {
        const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
            id: iframeCreator.ID.SAVE,
            path: iframeCreator.PATH.SAVE,
            height: 350,
            width: 375,
        }));
        iframeShower.show(iframeShower.newShowInput({
            frame,
            animateRight: true,
            shownDbKey: this.shownDbKey,
        }));
    }
    close(params = {}) {
        util.removeFrame(params, iframeCreator.ID.SAVE);
    }
    async restore() {
        return util.restore(this.shownDbKey, this);
    }
}
export const exp_saveFrame = new SaveFrame();
