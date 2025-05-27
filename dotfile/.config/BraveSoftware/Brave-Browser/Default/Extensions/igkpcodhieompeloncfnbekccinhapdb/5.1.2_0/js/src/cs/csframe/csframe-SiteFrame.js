import { iframeCreator } from "./csframe-IframeCreator.js";
import { iframeShower } from "./csframe-IframeShower.js";
import { util } from "./csframe-util.js";
class SiteFrame {
    async show() {
        try {
            if (await bgApi.tab.getFrameId() != 0) {
                return;
            }
            const width = 380;
            const height = 390;
            const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
                id: iframeCreator.ID.SITE,
                path: iframeCreator.PATH.SITE,
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
        util.removeFrame(params, iframeCreator.ID.SITE);
    }
}
export const exp_siteFrame = new SiteFrame();
