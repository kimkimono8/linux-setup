import { Background } from "../../background/Background.js";
import { ZVaultBG } from "../../background/old/ZVaultBG.js";
import { addressBarHandler, bgApiServer, bgEventServer, db, devToolsHandler, extCrypto, inactivityHandler, installHandler, sidePanelHandler, startupHandler, unlock, vapi } from "./Context.js";
import { bg } from "./bg.js";
import { RuntimeMsgHandler } from "./handlers/RuntimeMsgHandler.js";
import { bgStorage } from "./storage/export.js";
export function bgInit() {
    const background = new Background();
    background.init();
    bgStorage.init();
    installHandler.init();
    startupHandler.init();
    return bgInitAsync();
}
async function bgInitAsync() {
    try {
        await vt.init({ logPrefix: "BG:", skipBgApiInit: true });
        await config.init();
        brApi.other.disablePasswordSaving();
        await oauth.init();
        await db.init();
        vapi.init();
        bg.logoutHandler.init();
        new RuntimeMsgHandler().init();
        unlock.init();
        await extCrypto.init();
        bg.vaultSecrets.init();
        domainHandler.init();
        bg.ztabHandler.init();
        bg.unlockTabHandler.init();
        sidePanelHandler.init();
        bg.basicAuthenticationHandler.init();
        addressBarHandler.init();
        devToolsHandler.init();
        await bgApiServer.init();
        bgEventServer.init();
        bg.popupClient.init();
        bg.ztabClient.init();
        bg.offscreenApi.init();
        csApi.init();
        ZVaultBG.init();
        info("bg initialized");
    }
    catch (e) {
        logError(e);
    }
    finally {
        bg.initialized = true;
    }
    inactivityHandler.checkActivity();
}
