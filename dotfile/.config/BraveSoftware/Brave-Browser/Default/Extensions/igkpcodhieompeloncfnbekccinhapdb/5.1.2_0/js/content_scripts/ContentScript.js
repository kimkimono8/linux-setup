import { userAction } from "../src/cs/csfill/export.js";
import { csframe } from "../src/cs/csframe/export.js";
import { CSBgEventListener } from "./CSBgEventListener.js";
import { CSCardMain } from "./card/csCardMain.js";
import { CSOther } from "./components/CSOther.js";
import { CSApiServer } from "./content_scripts_api_server/csApiServer.js";
import { CSCardApiServer } from "./content_scripts_api_server/csCardApiServer.js";
import { cs } from "./cs.js";
import { CSFormFiller } from "./formFilling/csFormFiller.js";
import { csLoginSubmitter } from "./login/CSLoginSubmitter.js";
import { TotpLogin } from "./login/TotpLogin.js";
import { CSFieldFiller } from "./login/csFieldFiller.js";
import { CSLogin } from "./login/csLogin.js";
import { ZVaultCS } from "./old/ZVaultLogin.js";
import { PasswordReset } from "./password_reset/PasswordReset.js";
import { DownloadUtil } from "./safari/DownloadUtil.js";
import { LoginPasswordChangeHandler } from "./save_update/LoginPasswordChangeHandler.js";
import { SavePasswordHandler } from "./save_update/SavePasswordHandler.js";
import { SitePasswordChangeObserver } from "./save_update/SitePasswordChangeObserver.js";
export class ContentScript {
    async main() {
        await vt.init({ logPrefix: "CS:" });
        await csutil.init();
        cs.card = new CSCardMain();
        CSCardApiServer.init();
        cs.card.initForIframe();
        await csutil.window.waitForValidWindow();
        info("GEN:", "valid window wait complete");
        await cs.card.disableIframeCheck();
        cs.fieldFillder = new CSFieldFiller();
        cs.form = new CSFormFiller();
        cs.login = new CSLogin();
        cs.totpLogin = new TotpLogin();
        cs.passwordReset = new PasswordReset();
        cs.savePasswordHandler = new SavePasswordHandler();
        cs.sitePasswordChangeObserver = new SitePasswordChangeObserver();
        cs.loginPasswordChangeHandler = new LoginPasswordChangeHandler();
        cs.other = new CSOther();
        cs.downloadUtil = new DownloadUtil();
        new CSBgEventListener().init();
        await userAction.init();
        await csLoginSubmitter.init();
        csframe.init();
        cs.login.init();
        zicon.init();
        cs.savePasswordHandler.init();
        cs.sitePasswordChangeObserver.init();
        cs.loginPasswordChangeHandler.init();
        cs.passwordReset.init();
        CSApiServer.init();
        ZVaultCS.init();
        info("GEN:", "content script initialized");
    }
    async webMain() {
        await csutil.init();
        await csutil.window.waitForValidWindow();
        cs.fieldFillder = new CSFieldFiller();
        cs.card = new CSCardMain();
        cs.login = new CSLogin();
        cs.totpLogin = new TotpLogin();
        cs.passwordReset = new PasswordReset();
        cs.savePasswordHandler = new SavePasswordHandler();
        cs.sitePasswordChangeObserver = new SitePasswordChangeObserver();
        cs.loginPasswordChangeHandler = new LoginPasswordChangeHandler();
        cs.other = new CSOther();
        new CSBgEventListener().init();
        cs.login.init();
        zicon.initWeb();
        CSApiServer.init();
    }
}
