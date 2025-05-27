import { VtSettings } from "../../../service/vt/constants/VtSettings.js";
import { util } from "./Context.js";
import { ZIconAdder } from "./ZIconAdder.js";
import { ZIconChecker } from "./ZIconChecker.js";
import { ZIconEventEmitter } from "./ZIconEventEmitter.js";
import { ZIconListener } from "./ZIconListener.js";
export class ZIconImpl {
    loggedIn = false;
    unlocked = false;
    adder = new ZIconAdder();
    listener = new ZIconListener();
    checker = new ZIconChecker();
    eventEmitter = new ZIconEventEmitter();
    async init() {
        try {
            if (document.body.hasAttribute(this.adder.NO_VAULT_ICON_ATTR)) {
                return;
            }
            const noIcon = await zlocalStorage.load(VtSettings.DISABLE_WEBSITE_VAULT_ICON, false);
            if (noIcon) {
                return;
            }
            const resp = await Promise.all([
                bgApi.login.isLoggedIn(),
                bgApi.login.isUnlocked(),
                this.adder.init(),
                this.listener.init(),
            ]);
            this.loggedIn = resp[0];
            this.unlocked = resp[1];
            await this.checker.init();
            this.eventEmitter.init();
            info(ZIconImpl.name, "zicon initialized");
        }
        catch (e) {
            logError(e);
        }
    }
    async initWeb() {
        try {
            this.adder.disableAddForWeb();
            this.checker.disableCheckForWeb();
        }
        catch (e) {
            logError(e);
        }
    }
    onLoggedOut() {
        try {
            this.loggedIn = false;
            this.unlocked = false;
            this.adder.removeAll();
        }
        catch (e) {
            logError(e);
        }
    }
    onLocked() {
        try {
            this.loggedIn = true;
            this.unlocked = false;
            this.adder.disableIcons();
            this.checker.check();
        }
        catch (e) {
            logError(e);
        }
    }
    onUnlocked() {
        try {
            this.loggedIn = true;
            this.unlocked = true;
            this.adder.enableIcons();
            this.checker.check();
        }
        catch (e) {
            logError(e);
        }
    }
    async onSecretAddEdited() {
        try {
            await this.checker.initIsSecretUrlLoginPage();
            this.checker.check();
        }
        catch (e) {
            logError(e);
        }
    }
    onSettingChanged(name, value) {
        try {
            switch (name) {
                case VtSettings.DISABLE_WEBSITE_VAULT_ICON:
                    this.adder.enableAdd(!value);
                    return;
                case VtSettings.DISABLE_WEBSITE_KEYBOARD_SHORTCUT:
                    this.listener.setNoKeyboard(value);
                    return;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async addForContextMenuUsedInput(input) {
        return this.adder.addForContextMenuUsedInput(input);
    }
    async showSiteFrame(params) {
        try {
            this.adder.addForShowSiteFrameContextMenu(params);
            util.showSiteFrame({ restorePoint: !params.fromContextMenu });
        }
        catch (e) {
            logError(e);
        }
    }
    async showCardFrame() { }
    hasZIcon(input) {
        return this.adder.inputSet.has(input);
    }
}
