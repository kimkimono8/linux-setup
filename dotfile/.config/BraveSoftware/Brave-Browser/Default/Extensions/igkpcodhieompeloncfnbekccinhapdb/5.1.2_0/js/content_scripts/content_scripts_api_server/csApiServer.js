import { VtApiPortNames } from "../../src/service/vt/constants/VtApiPortNames.js";
import { CSFrameApiBackend } from "./csFrameApiBackend.js";
import { CSLoginApiBackend } from "./csLoginApiBackend.js";
import { CSOtherApiBackend } from "./csOtherApiBackend.js";
export class CSApiServer {
    static server;
    static init() {
        const fnMap = {
            login: new CSLoginApiBackend(),
            frame: new CSFrameApiBackend(),
            other: new CSOtherApiBackend(),
        };
        const apiServer = CSApiServer.server = portApi.createApiServer();
        apiServer.init({ name: VtApiPortNames.CS, fnObj: fnMap });
    }
    static disconnect() {
        CSApiServer.server.disconnect();
    }
}
