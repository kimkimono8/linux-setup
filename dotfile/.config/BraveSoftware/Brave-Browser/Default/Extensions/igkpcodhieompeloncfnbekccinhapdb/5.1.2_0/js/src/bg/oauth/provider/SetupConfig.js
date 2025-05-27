import { ConfigKeys } from "../../../conf/service/constants.js";
export class SetupConfig {
    vault = "";
    domains = [];
    clientId = "";
    redirectUrl = "";
    port = "";
    scope = "";
    cdnServer = "";
    init() {
        try {
            const setupName = config.get(ConfigKeys.OAUTH);
            const setup = config.get(setupName);
            this.vault = setup["vault"];
            this.domains = setup["domains"];
            this.clientId = setup["client_id"];
            this.redirectUrl = setup["redirect_url"];
            this.port = setup["port"] ?? "";
            this.scope = config.get(ConfigKeys.OAUTH_SCOPE);
            this.cdnServer = setup["cdn_server"];
        }
        catch (e) {
            logError(e);
        }
    }
}
