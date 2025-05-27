import { oneauthUI, webauthnUI } from "../src/popup/unlockUI/export.js";
import { VtApiPortNames } from "../src/service/vt/constants/VtApiPortNames.js";
export class PopupApiServer {
    static init() {
        const apiServer = portApi.createApiServer();
        apiServer.init({ name: VtApiPortNames.POPUP, fnObj: new PopupFunctions() });
    }
}
class PopupFunctions {
    async close() {
        window.close();
    }
    async copyToClipboard(text) {
        return js.dom.copyToClipboard(text);
    }
    async oneAuthUnlockComplete(resp) {
        oneauthUI.oneAuthUnlockComplete(fnOut.parse(resp));
    }
    async oneWebauthnComplete(resp) {
        webauthnUI.webauthnUnlockComplete(fnOut.parse(resp));
    }
    async oneAuthPushSent() {
        oneauthUI.oneAuthPushSent();
    }
}
