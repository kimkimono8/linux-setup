import { TabStorageKeys } from "../../service/storage/constants/TabStorageKeys.js";
import { iframeCreator } from "./csframe-IframeCreator.js";
import { iframeShower } from "./csframe-IframeShower.js";
import { util } from "./csframe-util.js";
class UpdateFrame {
    shownDbKey = TabStorageKeys.SHOWN_UPDATE_FRAME;
    async show() {
        const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
            id: iframeCreator.ID.UPDATE,
            path: iframeCreator.PATH.UPDATE,
        }));
        iframeShower.show(iframeShower.newShowInput({
            frame,
            animateRight: true,
            shownDbKey: this.shownDbKey,
        }));
    }
    close(params = {}) {
        util.removeFrame(params, iframeCreator.ID.UPDATE);
    }
    async restore() {
        return util.restore(this.shownDbKey, this);
    }
}
export const exp_updateFrame = new UpdateFrame();
