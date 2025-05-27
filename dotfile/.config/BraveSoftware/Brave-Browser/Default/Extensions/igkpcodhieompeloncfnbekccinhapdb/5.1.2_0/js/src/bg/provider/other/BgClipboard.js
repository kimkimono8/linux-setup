import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
import { AlarmHandler } from "../../handlers/AlarmHandler.js";
export class BgClipboardImpl {
    async copy(text, options = null) {
        try {
            await this.copyToClipboard(text);
            if (options?.noAutoClear) {
                return;
            }
            const clearTimeSeconds = await zlocalStorage.load(LocalStorageKeys.CLEAR_CLIPBOARD, 30);
            brApi.alarm.createAlarm(AlarmHandler.ALARM.CLEAR_CLIPBOARD, clearTimeSeconds);
        }
        catch (e) {
            logError(e);
        }
    }
    async clear() {
        return this.copyToClipboard(" ");
    }
    async copyToClipboard(text) {
        try {
            if (brApi.isV2()) {
                bg.offscreenApi.copyToClipboard(text);
                return;
            }
            if (chrome.offscreen && chrome.offscreen.createDocument) {
                bg.offscreenApi.copyToClipboard(text);
                return;
            }
            const popupPresent = await bg.popupClient.checkConnectable();
            if (popupPresent) {
                await bg.popupClient.copyToClipboard(text);
                return;
            }
            const zTabPresent = await bg.ztabClient.checkConnectable();
            if (zTabPresent) {
                await bg.ztabClient.copyToClipboard(text);
                return;
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
