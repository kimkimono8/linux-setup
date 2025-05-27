import { bg } from "../bg.js";
import { inactivityHandler } from "../Context.js";
export class AlarmHandler {
    static instance = null;
    static getInstance() {
        if (!this.instance) {
            this.instance = new AlarmHandler();
        }
        return this.instance;
    }
    static ALARM = {
        CLEAR_CLIPBOARD: "CLEAR_CLIPBOARD",
        INACTIVITY_ALARM: "INACTIVITY_ALARM",
        OAUTH_REFRESH_ALARM: "OAUTH_REFRESH_ALARM",
        PERIODIC_INACTIVITY_ALARM: "PERIODIC_INACTIVITY_ALARM"
    };
    init() {
        js.fn.bindThis(this, [this.handleAlarm]);
        brApi.alarm.listenAlarms(this.handleAlarm);
    }
    handleAlarm({ name = "" }) {
        if (!bg.initialized) {
            return;
        }
        info("handling alarm: ", name);
        const ALARM = AlarmHandler.ALARM;
        switch (name) {
            case ALARM.CLEAR_CLIPBOARD:
                bg.clipboard.clear();
                break;
            case ALARM.OAUTH_REFRESH_ALARM:
                oauth.autoRefreshToken();
                break;
            case ALARM.PERIODIC_INACTIVITY_ALARM:
            case ALARM.INACTIVITY_ALARM:
                inactivityHandler.checkActivity();
                break;
        }
    }
}
