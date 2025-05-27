import { globalDomListener } from "../../../../common/ui/globalDomListener.js";
import { Secret } from "../../../service/bgApi/types/Secret.js";
import { UIParent } from "../../../uiUtil/ui/UIParent.js";
import { pp } from "../../pp.js";
import { PasswordDetailsListener } from "./PasswordDetailsListener.js";
import { PasswordDetailsShowerPartImpl, RestorePasswordDetailsShower } from "./PasswordDetailsShowerPart.js";
import { PasswordDetailsUICreator } from "./PasswordDetailsUICreator.js";
export class PasswordDetailsUI extends UIParent {
    PPSessionShownSecretIdKey = "pp_shown_secret_id";
    listener = new PasswordDetailsListener();
    helper = new PasswordDetailsUIHelper(this);
    showerPart = new PasswordDetailsShowerPartImpl(this);
    restorePart = new RestorePasswordDetailsShower(this);
    secret = null;
    init() {
        this.init = () => { };
        this.listener.p = this;
        globalDomListener.register("password_details", this.listener);
    }
    async showDetails(secretId) {
        await this.showDetailsFn(secretId, this.showerPart);
    }
    async restore() {
        try {
            const shownSecretId = await zsessionStorage.load(this.PPSessionShownSecretIdKey, null);
            if (!shownSecretId) {
                return;
            }
            await this.showDetailsFn(shownSecretId, this.restorePart);
        }
        catch (e) {
            logError(e);
        }
    }
    focusField() {
        js.selector.selectFrom(this.elem, "[tabindex]")?.focus?.();
    }
    restoreFocus() {
        try {
            if (!this.elem || !this.elem.parentElement) {
                return;
            }
            this.restorePart.focusField();
        }
        catch (e) {
            logError(e);
        }
    }
    close() {
        if (!this.elem || !this.elem.parentElement) {
            return;
        }
        this.elem.remove();
        zsessionStorage.save(this.PPSessionShownSecretIdKey, null);
    }
    disableClose() {
        js.obj.disableMethod(this, this.close.name);
    }
    enableClose() {
        js.obj.enableMethod(this, this.close.name);
    }
    async showDetailsFn(secretId, part) {
        try {
            this.init();
            pp.mainUI.showDotLoading(0.3);
            const secret = this.secret = await bgApi.secret.getSecret(secretId);
            const hasNoAccess = !Secret.hasAccess(secret);
            if (hasNoAccess) {
                await part.handleNoAccess();
                return;
            }
            const elem = this.elem = await new PasswordDetailsUICreator(this).create();
            js.dom.setContent("#password_details_container", elem);
            await part.postSecretShown();
            pp.passwordsUI.updateSecretDisplayedInList(secret);
            part.focusField();
        }
        catch (e) {
            VUI.notification.showError(e + "");
            this.close();
        }
        finally {
            pp.mainUI.hideDotLoading();
        }
    }
}
class PasswordDetailsUIHelper {
    p;
    PPSessionFocusedField = "pp_details_focused_field";
    constructor(p) {
        this.p = p;
    }
    async saveFocusedIndex() {
        try {
            const index = js.selector.selectAll("[tabindex='0']", this.p.elem).indexOf(document.activeElement);
            if (index < 0) {
                throw "INVALID_INDEX";
            }
            await zsessionStorage.save(this.PPSessionFocusedField, index);
        }
        catch (e) {
            logError(e);
        }
    }
    async getLastFocusedIndex() {
        try {
            return zsessionStorage.load(this.PPSessionFocusedField, 0);
        }
        catch (e) {
            logError(e);
            return 0;
        }
    }
}
