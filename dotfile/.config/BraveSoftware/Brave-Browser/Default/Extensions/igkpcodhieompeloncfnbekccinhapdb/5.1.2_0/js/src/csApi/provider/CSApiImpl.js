import { VtApiPortNames } from "../../service/vt/constants/VtApiPortNames.js";
import { CSApiContext } from "./CSApiContext.js";
import { CSCardApiImpl } from "./CSCardApi.js";
import { CSFrameApiImpl } from "./CSFrameApi.js";
import { CSLoginApiImpl } from "./CSLoginApi.js";
import { CSOtherApiImpl } from "./CSOtherApi.js";
import { CSVaultWebApiClientImpl } from "./CSVaultWebApi.js";
import { CSWebAuthnUnlockApiImpl } from "./CSWebAuthnUnlockApi.js";
export class CSApiImpl {
    context = new CSApiContext();
    frame = new CSFrameApiImpl(this.context);
    login = new CSLoginApiImpl(this.context);
    other = new CSOtherApiImpl(this.context);
    web = new CSVaultWebApiClientImpl();
    webauthnUnlock = new CSWebAuthnUnlockApiImpl();
    card;
    init() {
        try {
            const apiClient = this.context.apiClient = portApi.createApiClient();
            apiClient.init({ name: VtApiPortNames.CS });
            this.initCardClient();
        }
        catch (e) {
            logError(e);
        }
    }
    initCardClient() {
        try {
            const cardApiClient = portApi.createApiClient();
            cardApiClient.init({ name: VtApiPortNames.CS_CARD });
            const cardContext = new CSApiContext();
            cardContext.apiClient = cardApiClient;
            this.card = new CSCardApiImpl(cardContext);
        }
        catch (e) {
            logError(e);
        }
    }
    isConnectable(params) {
        return this.context.apiClient.isConnectable(params);
    }
}
