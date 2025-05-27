import { VtApiPortNames } from "../src/service/vt/constants/VtApiPortNames.js";
export class ZTabApiServer {
    static init() {
        const apiServer = portApi.createApiServer();
        apiServer.init({ name: VtApiPortNames.ZTAB, fnObj: new ZTab_Functions() });
    }
}
class ZTab_Functions {
    async copyToClipboard(text) {
        return js.dom.copyToClipboard(text);
    }
}
