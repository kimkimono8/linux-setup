import { DomMsgServer } from "./api_server/DomMsgServer.js";
export class VaultWebApiServer {
    init() {
        DomMsgServer.createNew("extension", this);
    }
    async echo() {
        return bgApi.other.echo("");
    }
    async getAfterUnlockRoute() {
        return bgApi.vaultWeb.getAfterUnlockRoute();
    }
}
