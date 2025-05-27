import { VtApiPortNames } from "../../../service/vt/constants/VtApiPortNames.js";
import { tokenGenerator } from "./Context.js";
export class CodeApi {
    apiServer = null;
    init() {
        try {
            if (this.apiServer) {
                this.apiServer.disconnect();
            }
        }
        catch (e) {
            logError(e);
        }
        const apiServer = this.apiServer = portApi.createApiServer();
        apiServer.init({
            name: VtApiPortNames.OAUTH,
            fnObj: this
        });
    }
    async setCode(codeObj) {
        tokenGenerator.continueTokenGeneration(codeObj);
    }
    disconnect() {
        if (this.apiServer) {
            this.apiServer.disconnect();
        }
    }
}
