import { bg } from "../../src/bg/bg.js";
import { VtSettings } from "../../src/service/vt/constants/VtSettings.js";
const Z_IDENTITY = "_z_identity";
export class LogoutHandler {
    init() {
        try {
            js.fn.bindThis(this, [this.cookieChanged]);
            brApi.cookie.onCookieChange(this.cookieChanged);
        }
        catch (e) {
            logError(e);
        }
    }
    async cookieChanged(changeInfo) {
        try {
            const staySignedIn = await zlocalStorage.load(VtSettings.STAY_SIGNED_IN, false);
            if (staySignedIn) {
                return;
            }
            if (!oauth.isLoggedIn()) {
                return;
            }
            const reqChange = changeInfo.removed &&
                changeInfo.cookie.name == Z_IDENTITY &&
                (changeInfo.cause == "expired_overwrite" || changeInfo.cause == "explicit");
            if (!reqChange) {
                return;
            }
            const accountsDomain = new URL(urlProvider.getAccountsUrl()).host;
            const reqDomain = changeInfo.cookie.domain == accountsDomain;
            if (!reqDomain) {
                return;
            }
            const isIncognitoSignout = await this.checkIncognitoSignout(changeInfo);
            if (isIncognitoSignout) {
                return;
            }
            bg.vault.silentSignOut();
        }
        catch (e) {
            logError(e);
        }
    }
    async checkIncognitoSignout(changeInfo) {
        try {
            const storeId = changeInfo.cookie.storeId;
            const cookieStore = await brApi.cookie.getCookieStore(storeId);
            if (!cookieStore || cookieStore.tabIds.length == 0) {
                return true;
            }
            const tab = await brApi.tab.getTab(cookieStore.tabIds[0]);
            return tab.incognito ?? false;
        }
        catch (e) {
            logError(e);
            return true;
        }
    }
}
