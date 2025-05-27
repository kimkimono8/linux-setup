import { csUtilMain } from "../../src/cs/csutil/provider/main.js";
import { ziconMain } from "../../src/cs/zicon/provider/main.js";
import { VaultWebApiServer } from "../../src/cs/web/VaultWebApiServer.js";
import { ContentScript } from "../ContentScript.js";
import { VaultDomMsgServer } from "./VaultDomMsgServer.js";
import { VaultWebCSBgEventListener } from "./VaultWebCSBgEventListener.js";
import { csVaultWebApiServer } from "./csVaultWebApiServer.js";
import { vtMain } from "../../src/provider/vt/main.js";
import { bgApiMain } from "../../src/provider/bgApi/main.js";
const ONE_ZOHO_PREFIX = "one.";
vtMain();
bgApiMain();
csUtilMain();
ziconMain();
class VaultWeb {
    msgServer = new VaultDomMsgServer();
    bgEventListener = new VaultWebCSBgEventListener();
    async main() {
        await vt.init({ logPrefix: "VAULT_WEB:" });
        const isValidVaultFrame = await this.checkValidVaultFrame();
        if (!isValidVaultFrame) {
            return;
        }
        this.msgServer.init();
        this.bgEventListener.init();
        csVaultWebApiServer.init();
        new VaultWebApiServer().init();
        document.documentElement.dataset.ext_installed = "y";
        js.fn.bindThis(this, [this.handleResetPasswordClick]);
        document.addEventListener("click", this.handleResetPasswordClick);
    }
    async checkValidVaultFrame() {
        try {
            const isTopFrame = csutil.window.isTopFrame();
            if (!isTopFrame && !await this.isOneZohoIframe()) {
                return false;
            }
            const validDc = await this.checkIsLoggedInDc();
            return validDc;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async isOneZohoIframe() {
        try {
            const topFrameUrl = await bgApi.tab.getTabUrl();
            const host = new URL(topFrameUrl).host;
            const domain = await bgApi.vault.getDomain();
            const oneZohoUrl = ONE_ZOHO_PREFIX + domain;
            return host == oneZohoUrl;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async checkIsLoggedInDc() {
        try {
            const isLoggedIn = await bgApi.login.isLoggedIn();
            if (!isLoggedIn) {
                return false;
            }
            const vaultUrl = await bgApi.vault.getUrl();
            const validDc = window.location.hostname == js.url.getHostName(vaultUrl);
            return validDc;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async handleResetPasswordClick(e) {
        const targetElem = e.target;
        const isChangePasswordClick = targetElem.parentElement && (targetElem.parentElement.id == "changePassword_WebVersion");
        if (!isChangePasswordClick) {
            return;
        }
        const changePasswordElem = document.querySelector("#changePassword_WebVersion");
        changePasswordElem.setAttribute("isPassphraseLoggedIn", "false");
        const loggedIn = await bgApi.login.isLoggedIn();
        changePasswordElem.setAttribute("isPassphraseLoggedIn", "" + loggedIn);
        if (!loggedIn) {
            return;
        }
        await js.time.delay(1);
        const requiredElement = document.getElementById("passPolicy_changePass_Attrs");
        const secretId = requiredElement.getAttribute("secretid");
        const selectedPasswordColumn = requiredElement.getAttribute("columnname");
        bgApi.secret.resetPassword(secretId, selectedPasswordColumn);
    }
}
export const vaultWeb = new VaultWeb();
vaultWeb.main();
new ContentScript().webMain();
