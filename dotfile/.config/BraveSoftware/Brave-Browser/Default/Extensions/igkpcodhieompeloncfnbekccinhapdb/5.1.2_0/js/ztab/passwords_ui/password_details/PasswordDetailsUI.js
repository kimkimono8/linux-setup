import { Secret, SecretClassification } from "../../../src/service/bgApi/types/Secret.js";
import { LocalStorageKeys } from "../../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../../src/service/vt/VI18n.js";
import { ZTPasswordDetailsSearchHighlighter } from "../../../src/ztab/passwords_ui/password_details/ZTPasswordDetailsSearchHighlighter.js";
import { zt } from "../../zt.js";
import { BasePasswordDetailsUI } from "./BasePasswordDetailsUI.js";
export class PasswordDetailsUI extends BasePasswordDetailsUI {
    p = null;
    constructor() {
        super();
        this.showSecretDetails = js.fn.wrapper.createSingleInstListener(this.showSecretDetails, this);
    }
    secretChanged(secret) {
        const reShowDetails = this.isUIShown() && (this.secret.id == secret.id);
        if (reShowDetails) {
            this.showSecretDetails(secret);
        }
    }
    async synced() {
        const reShowDetails = this.isUIShown();
        if (reShowDetails) {
            const secret = await bgApi.secret.getSecret(this.secret.id);
            this.showSecretDetails(secret);
        }
    }
    async secretsRemoved(secretIds) {
        const hideDetails = this.isUIShown() && secretIds.includes(this.secret.id);
        if (hideDetails) {
            this.hideDetails();
        }
    }
    addHistoryIcon() {
        try {
            const hasEditPermission = Secret.hasEditPermission(this.secret.sharing_level);
            if (hasEditPermission) {
                return;
            }
            this.select("[data-history]").remove();
        }
        catch (e) {
            logError(e);
        }
    }
    async addHeaderIcons() {
        this.addEditIcon();
        this.addHistoryIcon();
        await this.addShareIcon();
    }
    addEditIcon() {
        try {
            const hasEditPermission = Secret.hasEditPermission(this.secret.sharing_level);
            if (hasEditPermission) {
                return;
            }
            const editElem = this.select("[data-edit]");
            const icon_elem = js.selector.selectFrom(editElem, "i");
            icon_elem.classList.add("disabled");
            icon_elem.dataset.tooltip_content = i18n(VI18N.NO_EDIT_PERMISSION);
            editElem.dataset.on_click = "";
        }
        catch (e) {
            logError(e);
        }
    }
    async addShareIcon() {
        try {
            const share_elem = this.select("[data-share]");
            if (this.is_personal_plan) {
                share_elem.remove();
                return;
            }
            const sharingRestricted = !(await zlocalStorage.load(LocalStorageKeys.ALLOW_SHARE_SECRET, true));
            if (sharingRestricted) {
                this.disableShareIcon(i18n(VI18N.SHARING_RESTRICTED));
                return;
            }
            if (this.secret.classification == SecretClassification.PERSONAL) {
                this.disableShareIcon(i18n(VI18N.PERSONAL_PASSWORD_CANNOT_BE_SHARED));
                return;
            }
            const hasManagePermission = Secret.hasManagePermission(this.secret.sharing_level);
            if (!hasManagePermission) {
                this.disableShareIcon(i18n(VI18N.NO_SHARE_PERMISSION));
                return;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    disableShareIcon(tooltipMsg) {
        const shareElem = this.select("[data-share]");
        const iconElem = js.selector.selectFrom(shareElem, "i");
        iconElem.classList.add("disabled");
        iconElem.dataset.tooltip_content = tooltipMsg;
        shareElem.dataset.on_click = "";
    }
    async highlightSearch() {
        try {
            if (!this.isUIShown()) {
                return;
            }
            const query = await zt.passwordsOldUI.getQuery();
            const { search_string: searchString } = query;
            const highlighter = new ZTPasswordDetailsSearchHighlighter();
            highlighter.init(this.elem, this.secret, searchString, this.secretType);
            await highlighter.highlightSearch();
        }
        catch (e) {
            logError(e);
        }
    }
}
