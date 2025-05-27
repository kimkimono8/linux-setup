import { globalNodeData } from "../../common/ui/globalNodeData.js";
import { Secret, SecretClassification, SecretSharingType } from "../../src/service/bgApi/types/Secret.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { zt } from "../zt.js";
import { BaseSecretElemCreator } from "./BaseSecretElemCreator.js";
export class SecretElemCreator extends BaseSecretElemCreator {
    incognitoAllowed = false;
    isPersonalPlan = false;
    async init() {
        await super.init();
        this.incognitoAllowed = await brApi.tab.isIncognitoAllowed();
        this.isPersonalPlan = zt.mainUI.data.isPersonalPlan;
    }
    async createSecretElemFn() {
        this.p.util.updateFavouriteElem(this.elem, this.curSecret.is_favourite);
        if (!this.curSecret.display_access_control_icon) {
            this.select("[data-access_control_icon]").remove();
        }
        this.addSharingIcon();
        await this.addIcons();
    }
    async addIcons() {
        const hasAccess = !this.curSecret.access_controlled ||
            this.curSecret.access_request_status == Secret.ACCESS_CTRL_STATUS.CHECK_OUT;
        if (!hasAccess) {
            this.select("[data-password_actions]").remove();
            return;
        }
        this.addCopyIcon();
        this.addLoginIcon();
        await this.addShareIcon();
        this.addShowMoreActionsIcon();
    }
    addShowMoreActionsIcon() {
        const moreActionsElem = this.select("[data-show_more_options]");
        const hasViewPermission = Secret.hasViewPermission(this.curSecret.sharing_level);
        if (hasViewPermission || this.curSecret.has_totp) {
            return;
        }
        js.selector.selectFrom(moreActionsElem, "i").classList.add("disabled");
        moreActionsElem.dataset.on_click = "";
    }
    async addShareIcon() {
        if (this.isPersonalPlan) {
            this.remove("[data-share]");
            return;
        }
        const sharingRestricted = !(await zlocalStorage.load(LocalStorageKeys.ALLOW_SHARE_SECRET, true));
        if (sharingRestricted) {
            this.disableShareIcon(i18n(VI18N.SHARING_RESTRICTED));
            return;
        }
        const secret = this.curSecret;
        const isPersonalSecret = secret.classification == SecretClassification.PERSONAL;
        if (isPersonalSecret) {
            this.disableShareIcon(i18n(VI18N.PERSONAL_PASSWORD_CANNOT_BE_SHARED));
            return;
        }
        const hasManagePermission = Secret.hasManagePermission(secret.sharing_level);
        if (!hasManagePermission) {
            this.disableShareIcon(i18n(VI18N.NO_SHARE_PERMISSION));
            return;
        }
    }
    disableShareIcon(tooltipMsg) {
        const shareElem = this.select("[data-share]");
        const iconElem = js.selector.selectFrom(shareElem, "i");
        iconElem.classList.add("disabled");
        iconElem.dataset.tooltip_content = tooltipMsg;
        shareElem.dataset.on_click = "";
    }
    addLoginIcon() {
        const loginElem = this.select("[data-login]");
        const privateLoginElem = this.select("[data-private_login]");
        const secret = this.curSecret;
        if (!secret.urls.length) {
            loginElem.remove();
            privateLoginElem.remove();
            return;
        }
        globalNodeData.setClickData(loginElem, { url: secret.urls[0] });
        globalNodeData.setClickData(privateLoginElem, { url: secret.urls[0], incognito: true });
        if (!this.incognitoAllowed) {
            privateLoginElem.remove();
        }
        if (!secret.auto_submit) {
            js.selector.selectFrom(loginElem, "i").className = "icon-login-disabled";
        }
    }
    addCopyIcon() {
        const secret = this.curSecret;
        const passwordField = this.secretTypeMap[secret.type_id].password_fields[0];
        const copyElem = this.select("[data-copy_password]");
        if (!passwordField) {
            copyElem.remove();
            return;
        }
        const icon = js.selector.selectFrom(copyElem, "i");
        const hasViewPermission = Secret.hasViewPermission(secret.sharing_level);
        if (!hasViewPermission) {
            copyElem.dataset.on_click = "";
            icon.classList.add("disabled");
            return;
        }
        icon.dataset.tooltip_content = i18n(VI18N.COPY) + " " + passwordField.label;
        globalNodeData.setClickData(copyElem, { fieldName: passwordField.name, fieldLabel: passwordField.label });
    }
    addSharingIcon() {
        const sharedByMeIcon = this.select("[data-shared_by_me_icon]");
        const sharedToMeIcon = this.select("[data-shared_to_me_icon]");
        const removeBothIcons = this.isPersonalPlan || this.curSecret.sharing_type == SecretSharingType.NONE;
        if (removeBothIcons) {
            sharedByMeIcon.remove();
            sharedToMeIcon.remove();
            return;
        }
        const removeSharedToMe = this.curSecret.sharing_type == SecretSharingType.SHARED_BY_ME;
        if (removeSharedToMe) {
            sharedToMeIcon.remove();
            return;
        }
        sharedByMeIcon.remove();
    }
}
