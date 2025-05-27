import { VtLoginState } from "../../../service/vt/constants/constants.js";
import { badgeMenuHandler } from "../../activeTab/Context.js";
import { bg } from "../../bg.js";
import { bgEventServer } from "../../Context.js";
import { AlarmHandler } from "../../handlers/AlarmHandler.js";
export class OAuthExternal {
    closePopup() {
        bg.popupClient.close();
    }
    async silentSignOut() {
        return bg.vault.silentSignOut();
    }
    loggedIn() {
        bgEventServer.login.locked();
        badgeMenuHandler.changeState(VtLoginState.LOCKED);
    }
    getOauthAlarmName() {
        return AlarmHandler.ALARM.OAUTH_REFRESH_ALARM;
    }
}
