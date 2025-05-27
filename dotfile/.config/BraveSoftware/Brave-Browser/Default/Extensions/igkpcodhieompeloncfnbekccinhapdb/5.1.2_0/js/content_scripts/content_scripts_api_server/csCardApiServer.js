import { VtApiPortNames } from "../../src/service/vt/constants/VtApiPortNames.js";
import { CSCardApiBackend } from "./csCardApiBackend.js";
export class CSCardApiServer {
    static apiServer;
    static init() {
        const fnMap = {
            card: new CSCardApiBackend()
        };
        const apiServer = CSCardApiServer.apiServer = portApi.createApiServer();
        apiServer.init({ name: VtApiPortNames.CS_CARD, fnObj: fnMap });
    }
    static disconnect() {
        CSCardApiServer.apiServer.disconnect();
    }
}
