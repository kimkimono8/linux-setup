import { VtApiPortNames } from "../../src/service/vt/constants/VtApiPortNames.js";
import { vaultDomEventServer } from "./event_server/VaultDomEventServer.js";
class CSVautlWebApiServer {
    apiServer;
    init() {
        this.apiServer = portApi.createApiServer();
        this.apiServer.init({
            name: VtApiPortNames.CS_VAULT_WEB,
            fnObj: this
        });
    }
    tryUnlock() {
        vaultDomEventServer.tryUnlock();
    }
}
export const csVaultWebApiServer = new CSVautlWebApiServer();
