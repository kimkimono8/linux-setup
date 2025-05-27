import { totp } from "../../../common/components/totp.js";
import { zcrypt } from "../../../common/components/zcrypt.js";
import { globalDomListener } from "../../../common/ui/globalDomListener.js";
import { globalNodeData } from "../../../common/ui/globalNodeData.js";
import { totpUI } from "../../../common/ui/totpUI.js";
import { AlertUI } from "../../../src/common/common.js";
import { PasswordDetailsUtil } from "../../../src/common/ui/passwords_ui/password_details/PasswordDetailsUtil.js";
import { Secret } from "../../../src/service/bgApi/types/Secret.js";
import { SecretType } from "../../../src/service/bgApi/types/SecretType.js";
import { LocalStorageKeys } from "../../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../../src/service/vt/VI18n.js";
import { UIParent } from "../../../src/uiUtil/ui/UIParent.js";
import { zt } from "../../zt.js";
import { PasswordDetailsUIListener } from "./PasswordDetailsUIListener.js";
export class BasePasswordDetailsUI extends UIParent {
    p = null;
    templateSelector = "#password_details_template";
    secret = null;
    secretType = null;
    listener = new PasswordDetailsUIListener();
    incognitoAllowed = false;
    is_personal_plan = false;
    pii_enabled = false;
    SECRET_LIST_HIGHLIGHT_CLASS = "password-list-view-selected";
    tagTemplate = null;
    async init() {
        this.init = async () => { };
        this.listener.p = this;
        this.is_personal_plan = await zlocalStorage.load(LocalStorageKeys.IS_PERSONAL_PLAN, false);
        this.pii_enabled = await zlocalStorage.load(LocalStorageKeys.PII_ENABLED, false);
        this.showDetails = js.fn.wrapper.createSingleInstListener(this.showDetails, this);
        globalDomListener.register("password_details", this.listener);
    }
    async showDetails(secretId) {
        try {
            await this.init();
            zt.mainUI.showDotLoading(0.3);
            const secret = await this.getSecret(secretId);
            await this.showSecretDetails(secret);
            bgApi.audit.secretAccessed(secretId);
        }
        catch (e) {
            VUI.notification.showError(e + "");
            this.hideDetails();
        }
        zt.mainUI.hideDotLoading();
    }
    async showSecretDetails(secret) {
        try {
            this.secret = secret;
            if (secret.access_controlled && secret.access_request_status != Secret.ACCESS_CTRL_STATUS.CHECK_OUT) {
                await zt.passwordsOldUI.accessRequestUI.getSecretAccessFor(secret);
                return;
            }
            const elem = this.elem = UIUtil.createElem({ preRender: true, template: this.templateSelector });
            elem.dataset.secret_id = secret.id;
            globalNodeData.setNodeData(elem, { secret });
            await this.addHeader();
            await this.addFields();
            await this.addTotp();
            await this.addNotes();
            await this.addUrls();
            this.addTags();
            this.addDescription();
            await this.addCustomColumns();
            this.initCheckIn();
            await this.highlightSearch();
            this.addKeyboardListener();
            if (this.p.isCardView) {
                this.showCardViewDetails();
            }
            else {
                this.showListViewDetails();
                this.highlightListSecret();
            }
            zt.passwordsOldUI.updateSecretDisplayedInList(secret);
            js.selector.selectFrom(elem, "[tabindex='0']")?.focus?.();
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async addCustomColumns() {
        try {
            if (this.secret.encrypted.custom_columns.length == 0) {
                this.select("[data-custom_fields_container]").remove();
                return;
            }
            const list = this.select("[data-custom_fields]");
            const fragment = document.createDocumentFragment();
            let rowElem;
            const is_shared = this.secret.shared;
            for (let column of this.secret.encrypted.custom_columns) {
                const plain_value = await zcrypt.decrypt(column.value, is_shared);
                if (!plain_value) {
                    continue;
                }
                switch (column.type) {
                    case SecretType.FIELD_TYPE.TEXT:
                        rowElem = this.getCustomFieldTextRow(column, plain_value);
                        break;
                    case SecretType.FIELD_TYPE.PASSWORD:
                        rowElem = this.getCustomFieldPasswordRow(column, plain_value);
                        break;
                    case SecretType.FIELD_TYPE.FILE:
                        rowElem = this.getFileRow(column.colname, plain_value);
                        break;
                }
                if (rowElem) {
                    fragment.append(rowElem);
                }
            }
            list.append(fragment);
        }
        catch (e) {
            logError(e);
        }
    }
    getCustomFieldPasswordRow(column, value) {
        try {
            const secret = this.secret;
            if (!Secret.hasViewPermission(secret.sharing_level)) {
                const elem = UIUtil.createElem({ template: "#password_details_no_view_permission_template" });
                js.dom.setChildText(elem, "[data-name]", column.colname);
                return elem;
            }
            const elem = UIUtil.createElem({ template: "#password_details_custom_password_field_template" });
            js.dom.setChildText(elem, "[data-name]", column.colname);
            globalNodeData.setNodeData(elem, { column, value });
            this.addFieldCopyListener(elem);
            return elem;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    addDescription() {
        try {
            if (!this.secret.description) {
                this.select("[data-description_container]").remove();
                return;
            }
            js.dom.setChildText(this.elem, PasswordDetailsUtil.elem.DESCRIPTION, this.secret.description);
        }
        catch (e) {
            logError(e);
        }
    }
    addTags() {
        try {
            if (!this.secret.tags.length) {
                this.select(PasswordDetailsUtil.elem.TAG).remove();
                return;
            }
            const tags = this.secret.tags;
            const fragment = document.createDocumentFragment();
            this.tagTemplate = js.selector.select("#password_details_tag_template");
            for (let tag of tags) {
                fragment.append(this.createTag(tag));
            }
            this.select("[data-tag_list]").append(fragment);
        }
        catch (e) {
            logError(e);
        }
    }
    createTag(tagName) {
        const tagElem = UIUtil.createElem({ template: this.tagTemplate });
        const tagValueElem = js.selector.selectFrom(tagElem, PasswordDetailsUtil.elem.TAG);
        tagValueElem.dataset.tag = tagName;
        js.dom.setText(tagValueElem, tagName);
        return tagElem;
    }
    async addUrls() {
        try {
            this.incognitoAllowed = await brApi.tab.isIncognitoAllowed();
            const urls = this.secret.urls;
            for (let i = 0; i < urls.length; i++) {
                this.addUrl(urls[i], i);
            }
            if (urls.length == 1) {
                js.selector.selectFrom(this.elem, "[data-url_n]").textContent = "";
            }
        }
        catch (e) {
            logError(e);
        }
    }
    addUrl(url, index) {
        try {
            const elem = UIUtil.createElem({ template: "#password_details_url_row_template" });
            globalNodeData.setNodeData(elem, { url });
            js.dom.setChildText(elem, "[data-url_n]", index + 1 + "");
            const urlElem = js.selector.selectFrom(elem, "[data-url]");
            js.dom.setText(urlElem, url);
            globalNodeData.setClickData(urlElem, { value: url });
            const copyIcon = js.selector.selectFrom(elem, "[data-copy]");
            globalNodeData.setClickData(copyIcon, { value: url });
            const loginElem = js.selector.selectFrom(elem, "[data-login]");
            if (!this.secret.auto_submit) {
                js.selector.selectFrom(loginElem, "i").className = "icon-login-disabled";
            }
            const privateLoginElem = js.selector.selectFrom(elem, "[data-private_login]");
            globalNodeData.setClickData(loginElem, { url });
            globalNodeData.setClickData(privateLoginElem, { url, incognito: true });
            if (!this.incognitoAllowed) {
                privateLoginElem.remove();
            }
            const focusElem = js.selector.selectFrom(elem, "[tabindex='0']");
            VUI.keyboard.onKeyDown(focusElem, {
                Enter() {
                    loginElem.click();
                },
                c(e) {
                    if (!VUI.keyboard.isCtrlPressed(e)) {
                        return;
                    }
                    copyIcon.click();
                }
            });
            this.addFieldCopyListener(urlElem, true);
            this.select(PasswordDetailsUtil.elem.TAG).before(elem);
        }
        catch (e) {
            logError(e);
        }
    }
    async addNotes() {
        try {
            const encrypted_notes = this.secret.encrypted.notes;
            const notesElem = this.select("[data-notes]");
            if (!encrypted_notes) {
                notesElem.remove();
                return;
            }
            const notes = await zcrypt.decrypt(encrypted_notes, this.secret.shared);
            if (!notes) {
                notesElem.remove();
                return;
            }
            const copyElem = js.selector.selectFrom(notesElem, "[data-copy]");
            globalNodeData.setClickData(copyElem, { notes });
            const notesInput = js.selector.selectFrom(notesElem, "textarea");
            notesInput.value = notes;
            this.addFieldCopyListener(notesElem);
            this.select(PasswordDetailsUtil.elem.TAG).before(notesElem);
        }
        catch (e) {
            logError(e);
        }
    }
    async addTotp() {
        try {
            if (!this.secret.has_totp) {
                return;
            }
            const totp_elem = UIUtil.createElem({ template: "#password_details_totp_template" });
            const totp_url = await zcrypt.decrypt(this.secret.encrypted.totp, this.secret.shared);
            const current_totp_elem = js.selector.selectFrom(totp_elem, "#current_totp");
            current_totp_elem.textContent = totp.formatTotp(await totp.generateTotp(totp_url));
            this.select("#password_details_fields_container").after(totp_elem);
            const totp_circle = js.selector.selectFrom(this.elem, "#totp_circle");
            totpUI.startGeneratingTotp(totp_url, current_totp_elem, totp_circle);
            this.addFieldCopyListener(totp_elem);
        }
        catch (e) {
            logError(e);
        }
    }
    async addTextAreaField(field) {
        try {
            const value = await this.getFieldValue(field.name);
            if (!value) {
                return;
            }
            const elem = UIUtil.createElem({ template: "#password_details_textarea_template" });
            js.dom.setChildText(elem, "[data-name]", field.label);
            js.dom.setChildText(elem, "[data-value]", value);
            globalNodeData.setNodeData(elem, { field });
            this.appendSecretDetailsField(elem);
            this.addFieldCopyListener(elem);
        }
        catch (e) {
            logError(e);
        }
    }
    async addOtherField(field) {
        const FIELD_TYPE = SecretType.FIELD_TYPE;
        try {
            switch (field.type) {
                case FIELD_TYPE.TEXT:
                case FIELD_TYPE.PASSWORD:
                case FIELD_TYPE.FILE:
                    break;
                case FIELD_TYPE.TEXTAREA:
                    await this.addTextAreaField(field);
                    break;
                default:
                    await this.addTextField(field);
                    break;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async addFields() {
        try {
            const secret = this.secret;
            const secret_type = this.secretType = await bgApi.secretType.get(secret.type_id);
            for (let field of secret_type.text_fields) {
                await this.addTextField(field);
            }
            for (let field of secret_type.password_fields) {
                await this.addPasswordField(field);
            }
            try {
                for (let field of secret_type.fields) {
                    await this.addOtherField(field);
                }
            }
            catch (e) {
                logError(e);
            }
            const file_fields = secret_type.fields.filter(x => !x.isDeleted && x.type == SecretType.FIELD_TYPE.FILE);
            file_fields.forEach(this.addFileField, this);
        }
        catch (e) {
            logError(e);
        }
    }
    async addFileField(field) {
        try {
            const value = await this.getFieldValue(field.name);
            if (!value) {
                return;
            }
            const fileRow = this.getFileRow(field.label, value);
            this.appendSecretDetailsField(fileRow);
        }
        catch (e) {
            logError(e);
        }
    }
    getFileRow(label, file_column) {
        try {
            const file_info = this.secret.encrypted.files.find(file => file.column == file_column);
            if (!file_info) {
                return document.createElement("span");
            }
            const elem = UIUtil.createElem({ template: "#password_details_file_field_template" });
            js.dom.setChildText(elem, "[data-name]", label);
            const value_elem = js.selector.selectFrom(elem, "[data-value]");
            js.dom.setText(value_elem, file_info.name);
            globalNodeData.setClickData(value_elem, { file_id: file_info.fileId });
            return elem;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async addPasswordField(field) {
        try {
            const value = await this.getFieldValue(field.name);
            if (!value) {
                return;
            }
            const secret = this.secret;
            const hasViewPermission = Secret.hasViewPermission(secret.sharing_level);
            if (!hasViewPermission) {
                const elem = UIUtil.createElem({ template: "#password_details_no_view_permission_template" });
                js.dom.setChildText(elem, "[data-name]", field.label);
                this.appendSecretDetailsField(elem);
                return;
            }
            const elem = UIUtil.createElem({ template: "#password_details_password_field_template" });
            js.dom.setChildText(elem, "[data-name]", field.label);
            globalNodeData.setNodeData(elem, { field, value });
            const reset_elem = js.selector.selectFrom(elem, "[data-reset_password]");
            if (!secret.change_password) {
                reset_elem.remove();
            }
            this.addFieldCopyListener(elem);
            this.appendSecretDetailsField(elem);
        }
        catch (e) {
            logError(e);
        }
    }
    async addTextField(field) {
        try {
            const val = await this.getFieldValue(field.name);
            if (!val) {
                return;
            }
            if (field.pii && this.pii_enabled) {
                await this.addPasswordField(field);
                return;
            }
            const textRow = this.getFieldTextRow(field, val);
            if (textRow) {
                this.appendSecretDetailsField(textRow);
            }
            this.addFieldCopyListener(textRow);
        }
        catch (e) {
            logError(e);
        }
    }
    appendSecretDetailsField(elem) {
        this.select("#password_details_fields_container").append(elem);
    }
    getFieldTextRow(field, value) {
        try {
            const elem = UIUtil.createElem({ template: "#password_details_text_field_template" });
            js.dom.setChildText(elem, "[data-name]", field.label);
            js.dom.setChildText(elem, "[data-value]", value);
            elem.dataset.field_name = field.name;
            globalNodeData.setNodeData(elem, { field });
            return elem;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getCustomFieldTextRow(column, value) {
        try {
            const elem = UIUtil.createElem({ template: "#password_details_custom_text_field_template" });
            js.dom.setChildText(elem, "[data-name]", column.colname);
            js.dom.setChildText(elem, "[data-value]", value);
            globalNodeData.setNodeData(elem, { column });
            this.addFieldCopyListener(elem);
            return elem;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async getFieldValue(field_name) {
        try {
            const field_val = this.secret.encrypted.fields[field_name];
            if (!field_val) {
                return null;
            }
            const decrypted_text = await zcrypt.decrypt(this.secret.encrypted.fields[field_name], this.secret.shared);
            return decrypted_text || null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async getSecret(secretId) {
        try {
            const secret = await bgApi.secret.getServerSecret(secretId);
            return secret;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async addHeader() {
        try {
            js.dom.setChildText(this.elem, "[data-secret_name]", this.secret.name);
            this.p.util.addLogoElem(this.elem, this.secret);
            const favoriteElem = this.select("[data-favourite]");
            if (favoriteElem) {
                this.p.util.updateFavouriteElem(this.elem, this.secret.is_favourite);
            }
            this.updateOwnedByMeIcon();
            js.dom.setChildText(this.elem, "[data-created_on]", js.date.formatDateMonDYYYY(this.secret.created_on));
            await this.addHeaderIcons();
        }
        catch (e) {
            logError(e);
        }
    }
    async addHeaderIcons() {
    }
    hideDetails() {
        try {
            const container_of_secrets = js.selector.select("[data-list_container]");
            const container_of_details = js.selector.select("[data-password_details_container]");
            container_of_secrets.classList.remove("calcWidth", "full-width");
            container_of_details.classList.add("dis-hide");
            container_of_details.style.right = "-710px";
            container_of_details.textContent = "";
            container_of_details.style.height = "100%";
            js.dom.hideOld("[data-password_details_overlay]");
            this.removeListSecretHighlight();
        }
        catch (e) {
            logError(e);
        }
    }
    showCardViewDetails() {
        try {
            const container_elem = js.selector.select("[data-password_details_container]");
            js.dom.setContent(container_elem, this.elem);
            js.dom.showOld("[data-password_details_overlay]");
            container_elem.style.right = "0px";
            container_elem.classList.remove("dis-hide");
        }
        catch (e) {
            logError(e);
        }
    }
    showListViewDetails() {
        try {
            const container_elem = js.selector.select("[data-password_details_container]");
            js.dom.setContent(container_elem, this.elem);
            this.elem.classList.remove("password-list-view-details-panel");
            container_elem.classList.remove("dis-hide");
            const container_of_secrets = js.selector.select("[data-list_container]");
            container_of_secrets.classList.add("calcWidth", "full-width");
            container_elem.setAttribute("style", "opacity: 1;height: calc(100vh - 150px);" +
                "right: -20; overflow-y: auto;z-index: 100;");
            container_elem.style.right = "0px";
        }
        catch (e) {
            logError(e);
        }
    }
    initCheckIn() {
        const showCheckIn = this.secret.access_controlled;
        if (showCheckIn) {
            this.show("[data-check_in_container]");
        }
    }
    async checkInSecret() {
        try {
            const confirmed = await AlertUI.inst.createAlert()
                .title(i18n(VI18N.CHECK_IN_CONFIRM_TITLE))
                .text(i18n(VI18N.CHECK_IN_CONFIRM_DESCRIPTION))
                .addButton("confirm", AlertUI.inst.createButton().text(i18n(VI18N.CHECKIN)).value(true).build())
                .addButton("cancel", AlertUI.inst.createButton().text(i18n(VI18N.CANCEL)).value(false).build())
                .show();
            if (!confirmed) {
                return;
            }
            await bgApi.accessCtrl.checkin(this.secret.id);
            VUI.notification.showSuccess(i18n(VI18N.CHECK_IN_SUCCESS));
            this.hideDetails();
        }
        catch (e) {
            throw jserror(e);
        }
    }
    highlightListSecret() {
        try {
            this.removeListSecretHighlight();
            const secretHighlightElem = this.p.select("[data-secret_id='" + this.secret.id + "'] .card-view-password-list-inner");
            secretHighlightElem.classList.add(this.SECRET_LIST_HIGHLIGHT_CLASS);
        }
        catch (e) {
            logError(e);
        }
    }
    removeListSecretHighlight() {
        try {
            const secretHighlightElem = this.p.select("." + this.SECRET_LIST_HIGHLIGHT_CLASS);
            if (secretHighlightElem) {
                secretHighlightElem.classList.remove(this.SECRET_LIST_HIGHLIGHT_CLASS);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async highlightSearch() { }
    addKeyboardListener() {
        try {
            const h = this;
            const hideAndRestoreFocus = () => { this.hideDetails(); js.selector.select(`[data-secret_id="${h.secret.id}"]`)?.focus?.(); };
            VUI.keyboard.addUpDownNavigation({
                parent: this.elem,
                onTopUp: hideAndRestoreFocus,
            });
            VUI.keyboard.onKeyDown(this.elem, {
                ArrowLeft: hideAndRestoreFocus,
                Escape: hideAndRestoreFocus,
            });
        }
        catch (e) {
            logError(e);
        }
    }
    addFieldCopyListener(elem, noCopyonEnter = false) {
        try {
            const copyElem = js.selector.selectFrom(elem, "[data-copy]");
            this.onKeyboardCopy(elem, () => copyElem.click());
            if (noCopyonEnter) {
                return;
            }
            VUI.keyboard.onKeyDown(elem, {
                Enter() {
                    copyElem.click();
                }
            });
        }
        catch (e) {
            logError(e);
        }
    }
    onKeyboardCopy(elem, listener) {
        try {
            VUI.keyboard.onKeyDown(elem, {
                c(e) {
                    if (!VUI.keyboard.isCtrlPressed(e)) {
                        return;
                    }
                    if (document.getSelection().toString()) {
                        return;
                    }
                    listener();
                }
            });
        }
        catch (e) {
            logError(e);
        }
    }
    updateOwnedByMeIcon() {
        try {
            if (this.secret.owned) {
                return;
            }
            const icon = js.selector.selectFrom(this.elem, "i[data-owned_by_me_icon]");
            icon.className = "icon-share-by-me icon-lg";
            icon.dataset.tooltip_content = "i18n:shared_with_me";
            icon.parentElement.classList.add("sharetome");
        }
        catch (e) {
            logError(e);
        }
    }
}
