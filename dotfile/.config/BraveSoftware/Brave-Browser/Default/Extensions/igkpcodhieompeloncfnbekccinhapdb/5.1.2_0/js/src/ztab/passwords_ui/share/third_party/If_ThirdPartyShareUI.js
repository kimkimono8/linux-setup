import { ThirdPartyShareOutputUI } from "./ThirdPartyShareOutputUI.js";
export var ThirdParty_UIElem;
(function (ThirdParty_UIElem) {
    ThirdParty_UIElem["EMAIL"] = "EMAIL";
    ThirdParty_UIElem["TIME"] = "TIME";
    ThirdParty_UIElem["MESSAGE"] = "MESSAGE";
})(ThirdParty_UIElem || (ThirdParty_UIElem = {}));
export var ThirdParty_OutputUIElem;
(function (ThirdParty_OutputUIElem) {
    ThirdParty_OutputUIElem["SHARED_MSG"] = "SHARED_MSG";
    ThirdParty_OutputUIElem["ENCRYPTION_KEY"] = "ENCRYPTION_KEY";
})(ThirdParty_OutputUIElem || (ThirdParty_OutputUIElem = {}));
export class ThirdPartyShareOutputProvider {
    static createInstance() {
        const ui = new ThirdPartyShareOutputUI();
        ui.init();
        return ui;
    }
}
