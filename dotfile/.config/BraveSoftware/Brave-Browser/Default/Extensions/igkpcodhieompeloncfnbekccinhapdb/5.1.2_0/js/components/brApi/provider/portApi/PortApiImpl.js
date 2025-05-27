import { MsgEventClient } from "./MsgEventClient.js";
import { MsgEventServer } from "./MsgEventServer.js";
import { MsgFnClient } from "./MsgFnClient.js";
import { MsgFnServer } from "./MsgFnServer.js";
export class PortApiImpl {
    createApiServer() {
        return new MsgFnServer();
    }
    createApiClient() {
        return new MsgFnClient();
    }
    createEventServer() {
        return new MsgEventServer();
    }
    createEventClient() {
        return new MsgEventClient();
    }
}
