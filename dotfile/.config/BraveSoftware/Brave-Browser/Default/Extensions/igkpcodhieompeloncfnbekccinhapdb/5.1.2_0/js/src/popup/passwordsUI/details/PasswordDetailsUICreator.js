import { totp } from "../../../../common/components/totp.js";
import { zcrypt } from "../../../../common/components/zcrypt.js";
import { globalNodeData } from "../../../../common/ui/globalNodeData.js";
import { totpUI } from "../../../../common/ui/totpUI.js";
import { PasswordDetailsSearchHighlighter } from "../../../common/ui/passwords_ui/password_details/PasswordDetailsSearchHighlighter.js";
import { PasswordDetailsUtil } from "../../../common/ui/passwords_ui/password_details/PasswordDetailsUtil.js";
import { i18n } from "../../../provider/vt/i18n.js";
import { Secret } from "../../../service/bgApi/types/Secret.js";
import { SecretType } from "../../../service/bgApi/types/SecretType.js";
import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../../service/vt/VI18n.js";
import { pp } from "../../pp.js";
export class PasswordDetailsUICreator {
    p;
    elem;
    piiEnabled = false;
    incognitoAllowed = false;
    secretType = null;
    secret;
    constructor(p) {
        this.p = p;
        this.secret = p.secret;
    }
    async create() {
        try {
            this.elem = UIUtil.createElem({ preRender: true, template: "#password_details_template" });
            this.elem.dataset.secret_id = this.secret.id;
            globalNodeData.setNodeData(this.elem, { secret: this.secret });
            this.addHeader();
            await this.addFields();
            await this.addTotp();
            await this.addNotes();
            await this.addUrls();
            this.addTags();
            this.addDescription();
            await this.addCustomColumns();
            await this.highlightSearch();
            this.addListeners();
            return this.elem;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async addCustomColumns() {
        try {
            const isShared = this.secret.shared;
            let plainValue = "";
            let rowElem = null;
            for (let column of this.secret.encrypted.custom_columns) {
                plainValue = await zcrypt.decrypt(column.value, isShared);
                if (!plainValue) {
                    continue;
                }
                switch (column.type) {
                    case SecretType.FIELD_TYPE.TEXT:
                        rowElem = this.getCustomFieldTextRow(column, plainValue);
                        break;
                    case SecretType.FIELD_TYPE.PASSWORD:
                        rowElem = this.getCustomFieldPasswordRow(column, plainValue);
                        break;
                    case SecretType.FIELD_TYPE.FILE:
                        rowElem = this.getFileRow(column.colname, plainValue);
                        break;
                }
                if (rowElem) {
                    this.elem.append(rowElem);
                }
            }
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
            const copyElem = js.selector.selectFrom(elem, "[data-copy]");
            VUI.keyboard.onKeyDown(elem, {
                Enter() {
                    copyElem.click();
                }
            });
            this.onKeyboardCopy(elem, () => copyElem.click());
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
                return;
            }
            const elem = UIUtil.createElem({ template: "#password_details_description_template" });
            js.selector.selectFrom(elem, "[data-value]").dataset.description = "";
            js.dom.setChildText(elem, PasswordDetailsUtil.elem.DESCRIPTION, this.secret.description);
            this.elem.append(elem);
        }
        catch (e) {
            logError(e);
        }
    }
    addTags() {
        try {
            if (this.secret.tags.length == 0) {
                return;
            }
            const tagsText = this.secret.tags.join(", ");
            const elem = UIUtil.createElem({ template: "#password_details_description_template" });
            js.dom.setChildText(elem, "[data-name]", i18n(VI18N.TAGS));
            js.selector.selectFrom(elem, "[data-value]").dataset.tag = "";
            js.dom.setChildText(elem, PasswordDetailsUtil.elem.TAG, tagsText);
            this.elem.append(elem);
        }
        catch (e) {
            logError(e);
        }
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
            urlElem.dataset.tooltip_content = "i18n:copy";
            const copyEventData = { value: url };
            globalNodeData.setClickData(urlElem, copyEventData);
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
            VUI.keyboard.onKeyDown(elem, {
                Enter() {
                    loginElem.click();
                },
            });
            this.onKeyboardCopy(elem, () => urlElem.click());
            this.elem.append(elem);
        }
        catch (e) {
            logError(e);
        }
    }
    async addNotes() {
        try {
            const secret = this.secret;
            if (!secret.encrypted.notes) {
                return;
            }
            const notes = await zcrypt.decrypt(secret.encrypted.notes, secret.shared);
            if (!notes) {
                return;
            }
            const elem = UIUtil.createElem({ template: "#password_details_notes_template" });
            js.dom.setChildText(elem, "[data-name]", i18n(VI18N.NOTES));
            js.dom.setChildText(elem, "[data-value]", notes);
            const copyElem = js.selector.selectFrom(elem, "[data-copy]");
            globalNodeData.setClickData(copyElem, { value: notes });
            VUI.keyboard.onKeyDown(elem, {
                Enter() {
                    copyElem.click();
                }
            });
            this.onKeyboardCopy(elem, () => copyElem.click());
            this.elem.append(elem);
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
            const totpElem = UIUtil.createElem({ template: "#secret_totp_template" });
            const totpUrl = await zcrypt.decrypt(this.secret.encrypted.totp, this.secret.shared);
            const currentTotpElem = js.selector.selectFrom(totpElem, "#current_totp");
            currentTotpElem.textContent = totp.formatTotp(await totp.generateTotp(totpUrl));
            this.elem.append(totpElem);
            const totpCircle = js.selector.selectFrom(this.elem, "#totp_circle");
            totpUI.startGeneratingTotp(totpUrl, currentTotpElem, totpCircle);
            const copyElem = js.selector.selectFrom(totpElem, "[data-copy]");
            VUI.keyboard.onKeyDown(totpElem, {
                Enter() {
                    copyElem.click();
                },
            });
            this.onKeyboardCopy(totpElem, () => copyElem.click());
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
            this.elem.append(elem);
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
            const secretType = this.secretType = await bgApi.secretType.get(secret.type_id);
            this.piiEnabled = await zlocalStorage.load(LocalStorageKeys.PII_ENABLED, false);
            for (let field of secretType.text_fields) {
                await this.addTextField(field);
            }
            for (let field of secretType.password_fields) {
                await this.addPasswordField(field);
            }
            try {
                for (let field of secretType.fields) {
                    await this.addOtherField(field);
                }
            }
            catch (e) {
                logError(e);
            }
            const fileFields = secretType.fields.filter(x => !x.isDeleted && x.type == SecretType.FIELD_TYPE.FILE);
            fileFields.forEach(this.addFileField, this);
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
            this.elem.append(fileRow);
        }
        catch (e) {
            logError(e);
        }
    }
    getFileRow(label, file_column) {
        try {
            const fileInfo = this.secret.encrypted.files.find(file => file.column == file_column);
            if (!fileInfo) {
                return document.createElement("span");
            }
            const elem = UIUtil.createElem({ template: "#password_details_file_field_template" });
            js.dom.setChildText(elem, "[data-name]", label);
            const valueElem = js.selector.selectFrom(elem, "[data-value]");
            js.dom.setText(valueElem, fileInfo.name);
            globalNodeData.setClickData(valueElem, { file_id: fileInfo.fileId });
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
                this.elem.append(elem);
                return;
            }
            const elem = UIUtil.createElem({ template: "#password_details_password_field_template" });
            js.dom.setChildText(elem, "[data-name]", field.label);
            globalNodeData.setNodeData(elem, { field, value });
            const resetElem = js.selector.selectFrom(elem, "[data-reset_password]");
            if (!secret.change_password) {
                resetElem.remove();
            }
            const copyElem = js.selector.selectFrom(elem, "[data-copy]");
            VUI.keyboard.onKeyDown(elem, {
                Enter() {
                    copyElem.click();
                }
            });
            this.onKeyboardCopy(elem, () => copyElem.click());
            this.elem.append(elem);
        }
        catch (e) {
            logError(e);
        }
    }
    async addTextField(field) {
        try {
            const value = await this.getFieldValue(field.name);
            if (!value) {
                return;
            }
            if (field.pii && this.piiEnabled) {
                await this.addPasswordField(field);
                return;
            }
            const textRow = this.getFieldTextRow(field, value);
            if (textRow) {
                this.elem.append(textRow);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getFieldTextRow(field, value) {
        try {
            const elem = UIUtil.createElem({ template: "#password_details_text_field_template" });
            js.dom.setChildText(elem, "[data-name]", field.label);
            js.dom.setChildText(elem, "[data-value]", value);
            elem.dataset.field_name = field.name;
            globalNodeData.setNodeData(elem, { field });
            const copyElem = js.selector.selectFrom(elem, "[data-copy]");
            VUI.keyboard.onKeyDown(elem, {
                Enter() {
                    copyElem.click();
                }
            });
            this.onKeyboardCopy(elem, () => copyElem.click());
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
            const copyElem = js.selector.selectFrom(elem, "[data-copy]");
            VUI.keyboard.onKeyDown(elem, {
                Enter() {
                    copyElem.click();
                }
            });
            this.onKeyboardCopy(elem, () => copyElem.click());
            return elem;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async getFieldValue(field_name) {
        try {
            const fieldValue = this.secret.encrypted.fields[field_name];
            if (!fieldValue) {
                return "";
            }
            const decrypted_text = await zcrypt.decrypt(this.secret.encrypted.fields[field_name], this.secret.shared);
            return decrypted_text || "";
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    addHeader() {
        try {
            const elem = this.elem;
            const secret = this.secret;
            js.dom.setText(js.selector.selectFrom(elem, PasswordDetailsUtil.elem.NAME), secret.name);
            pp.passwordsUI.util.addLogoElem(elem, secret);
            pp.passwordsUI.util.updateFavouriteElem(elem, secret.is_favourite);
            this.updateOwnedByMeIcon();
            js.dom.setChildText(elem, "[data-created_on]", js.date.formatDateMonDYYYY(secret.created_on));
            const hasNoEditPermission = !Secret.hasEditPermission(secret.sharing_level);
            if (hasNoEditPermission) {
                js.dom.hide(js.selector.selectFrom(this.elem, "[data-edit]"));
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async highlightSearch() {
        try {
            const query = await pp.passwordsUI.loadQuery();
            const { search_string: searchString } = query;
            if (!searchString) {
                return;
            }
            const highlighter = new PasswordDetailsSearchHighlighter();
            highlighter.init(this.elem, this.secret, searchString, this.secretType);
            await highlighter.highlightSearch();
        }
        catch (e) {
            logError(e);
        }
    }
    addListeners() {
        try {
            this.addKeyboardListener();
            this.elem.addEventListener("focusin", () => this.p.helper.saveFocusedIndex());
        }
        catch (e) {
            logError(e);
        }
    }
    addKeyboardListener() {
        try {
            const elem = this.elem;
            const h = this;
            VUI.keyboard.addUpDownNavigation({
                parent: elem,
                onTopUp() {
                    VUI.input.focus(js.selector.select("#search"));
                }
            });
            VUI.keyboard.onKeyDown(elem, {
                ArrowLeft(e) {
                    if (js.dom.isContentEditable(e.target)) {
                        return;
                    }
                    pp.passwordsUI.passwordDetailsUI.close();
                    js.selector.select(`[data-secret_id="${h.secret.id}"]`)?.focus?.();
                },
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
