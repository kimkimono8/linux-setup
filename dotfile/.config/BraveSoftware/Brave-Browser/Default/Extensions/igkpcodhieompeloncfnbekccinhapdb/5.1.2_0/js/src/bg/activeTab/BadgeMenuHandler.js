import { VtLoginState } from "../../service/vt/constants/constants.js";
import { bg } from "../bg.js";
import { badge, contextMenu } from "./Context.js";
import { UrlChangeObserver } from "./UrlChangeObserver.js";
export class BadgeMenuHandler {
    state = VtLoginState.LOGGED_OUT;
    async init() {
        try {
            contextMenu.init();
            this.changeState = js.fn.wrapper.createSingleInstListener(this.changeState, this);
            this.refresh = js.fn.wrapper.createSingleInstListener(this.refresh, this);
            js.fn.bindThis(this, [this.urlChanged]);
            UrlChangeObserver.listen(this.urlChanged);
            await this.changeState(await this.findState());
        }
        catch (e) {
            logError(e);
        }
    }
    async urlChanged(_tab) {
        await this.refreshIfUnlocked();
    }
    async changeState(state) {
        this.state = state;
        await Promise.all([
            badge.changeState(state),
            contextMenu.changeState(state),
        ]);
    }
    async refresh() {
        try {
            if (this.state != VtLoginState.UNLOCKED) {
                return;
            }
            await Promise.all([
                badge.refreshCount(),
                contextMenu.changeState(this.state)
            ]);
        }
        catch (e) {
            logError(e);
        }
    }
    async refreshIfUnlocked() {
        if (this.state != VtLoginState.UNLOCKED) {
            return;
        }
        await this.changeState(VtLoginState.UNLOCKED);
    }
    async findState() {
        try {
            const isLoggedOut = !(oauth.isLoggedIn());
            if (isLoggedOut) {
                return VtLoginState.LOGGED_OUT;
            }
            const isLocked = !(await bg.vault.isUnlocked());
            if (isLocked) {
                return VtLoginState.LOCKED;
            }
            return VtLoginState.UNLOCKED;
        }
        catch (e) {
            logError(e);
            return VtLoginState.LOGGED_OUT;
        }
    }
}
