import { zcrypt } from "../../../../common/components/zcrypt.js";
import { secretUtil } from "../../../../common/util/vault/secretUtil.js";
import { zt } from "../../../../ztab/zt.js";
import { PasswordShareUI } from "./PasswordShareUI.js";
import { ThirdPartyShareController } from "./third_party/ThirdPartyShareController.js";
import { UserShareController } from "./user/UserShareController.js";
import { UserGroupShareController } from "./user_group/UserGroupShareController.js";
export class PasswordShareController {
    static ui = null;
    static shownTab = null;
    static TAB = {
        USER: "user",
        USER_GROUP: "user_group",
        THIRD_PARTY: "third_party"
    };
    static async showUI(secretId) {
        try {
            zt.mainUI.showDotLoading();
            const h = this;
            this.ui = PasswordShareUI.createInstance(function () {
                this.onCloseInput(() => h.hideUI());
                this.onShowTab(h.showTab.bind(h));
            });
            ThirdPartyShareController.inst.init(secretId);
            await Promise.all([
                this.initPasswordNameInfo(secretId),
                UserShareController.inst.init(secretId),
                UserGroupShareController.inst.init(secretId),
            ]);
            this.ui.showUI();
            this.shownTab = null;
            this.showTab(this.TAB.USER);
        }
        catch (e) {
            logError(e);
        }
        finally {
            zt.mainUI.hideDotLoading();
        }
    }
    static hideUI() {
        this.ui.hideUI();
    }
    static showTab(tabName) {
        try {
            this.ui.highlightTab(tabName);
            if (this.shownTab) {
                this.shownTab.beforeExit();
            }
            const newTab = this.getUITab(tabName);
            newTab.showUI();
            this.shownTab = newTab;
        }
        catch (e) {
            logError(e);
        }
    }
    static getUITab(tabName) {
        const TAB = this.TAB;
        switch (tabName) {
            case TAB.USER:
                return UserShareController.inst;
            case TAB.USER_GROUP:
                return UserGroupShareController.inst;
            case TAB.THIRD_PARTY:
                return ThirdPartyShareController.inst;
            default:
                throw jserror(`invalid tabName=${tabName}`);
        }
    }
    static async initPasswordNameInfo(secretId) {
        try {
            const secret = await bgApi.secret.getDbSecret(secretId);
            const username = secret.ui_text != "" ? await zcrypt.decrypt(secret.ui_text, secret.shared) : "";
            let logo = "";
            if (secret.logo || secret.domain_logo) {
                logo = secretUtil.getLogoStyleSrc(secret.logo || secret.domain_logo);
            }
            this.ui.execute(function () {
                this.setPasswordName(secret.name);
                this.setPasswordUserName(username);
                if (logo) {
                    this.setPasswordLogo(logo);
                }
                else {
                    this.setPasswordLogoChars(secretUtil.getFirst2Chars(secret.name), secretUtil.getLogoColor(secret.created_on, secret.name));
                }
            });
        }
        catch (e) {
            logError(e);
        }
    }
    static getUI() {
        return this.ui;
    }
}
