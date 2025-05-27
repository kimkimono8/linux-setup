import { pp } from "../pp.js";
import { unlockUI } from "../unlockUI/export.js";
import { AccountsErrorUI } from "./errorUI/AccountsErrorUI.js";
import { GG } from "./GG.js";
export class AccountsUI {
    loadingElem = null;
    checkingAccount = false;
    gg = new GG(this);
    errorUI = new AccountsErrorUI();
    init() {
        this.gg.accountsUI = this;
        this.loadingElem = js.selector.select("#loading_main");
    }
    async showUI() {
        try {
            this.init();
            (await this.checkOauth()).result;
            this.loadingElem.dataset.checking_accounts = "true";
            pp.mainUI.addGlobalKeyboardListener();
            const unlocked = await bgApi.login.isUnlocked();
            if (unlocked) {
                return pp.mainUI.showUI();
            }
            const accountCheckResult = await this.checkAccount();
            if (accountCheckResult.ok) {
                unlockUI.showUI();
                return;
            }
            this.errorUI.showError(accountCheckResult.error);
        }
        catch (e) {
            logError(e);
            this.errorUI.showError(e);
        }
    }
    isCheckingAccount() {
        return this.checkingAccount;
    }
    async checkAccount() {
        try {
            this.checkingAccount = true;
            const loginResult = await bgApi.login.initLogin();
            if (loginResult.ok) {
                this.checkingAccount = false;
                return fnOut.OK;
            }
            return fnOut.error(loginResult.error);
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async checkOauth() {
        try {
            const isLoggedIn = await bgApi.login.isLoggedIn();
            if (isLoggedIn) {
                await bgApi.login.refreshTokenIfExpired();
                return fnOut.OK;
            }
            await bgApi.login.generateOauthTokens();
            await js.time.waitForever();
            return fnOut.OK;
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
}
