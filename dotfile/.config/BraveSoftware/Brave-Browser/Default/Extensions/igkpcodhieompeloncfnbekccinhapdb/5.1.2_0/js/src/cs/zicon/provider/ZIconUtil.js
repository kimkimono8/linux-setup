import { TabStorageKeys } from "../../../service/storage/constants/TabStorageKeys.js";
export class ZIconUtil {
    async showSiteFrame(input) {
        try {
            const point = await this.getPoint(input);
            this.saveClickLocation(point);
            const activeFrameId = await bgApi.tab.getFrameId();
            ztabStorage.save(TabStorageKeys.ACTIVE_FRAME_ID, activeFrameId);
            bgApi.siteFrame.showSiteFrame();
        }
        catch (e) {
            logError(e);
        }
    }
    async saveClickLocation(point) {
        try {
            await ztabStorage.save(TabStorageKeys.ZICON_CLICK_LOCATION, point);
        }
        catch (e) {
            logError(e);
        }
    }
    async getPoint(input) {
        try {
            if (input.point) {
                return input.point;
            }
            if (input.restorePoint) {
                const clickPoint = await ztabStorage.load(TabStorageKeys.ZICON_CLICK_LOCATION);
                if (clickPoint) {
                    return clickPoint;
                }
            }
            return this.getFirstInputPoint();
        }
        catch (e) {
            logError(e);
        }
    }
    getFirstInputPoint() {
        try {
            const point = { x: 0, y: 0 };
            const firstVisibleInput = csutil.input.getActiveInput() ||
                csutil.input.getUsername({ visible: true, shadowRoot: false }) || csutil.input.getPassword({ visible: true, shadowRoot: false });
            if (!firstVisibleInput) {
                return point;
            }
            const rect = firstVisibleInput.getBoundingClientRect();
            point.y = rect.bottom - (rect.height / 2);
            const isRightToLeft = csutil.input.checkIsRightToLeft(firstVisibleInput);
            if (isRightToLeft) {
                point.x = rect.left + 15;
                return point;
            }
            point.x = rect.right - 15;
            return point;
        }
        catch (e) {
            logError(e);
            return { x: 0, y: 0 };
        }
    }
}
