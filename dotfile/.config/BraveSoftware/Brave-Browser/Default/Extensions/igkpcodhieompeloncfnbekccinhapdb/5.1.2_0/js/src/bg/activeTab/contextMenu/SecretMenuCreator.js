import { ErrorCode } from "../../../../components/jsUtil/service/constants/ErrorCode.js";
import { Secret } from "../../../service/bgApi/types/Secret.js";
import { SecretType } from "../../../service/bgApi/types/SecretType.js";
import { VI18N } from "../../../service/vt/VI18n.js";
import { bg } from "../../bg.js";
import { accountDb } from "../../Context.js";
import { contextMenu } from "../Context.js";
import { ContextMenuActions as ACTIONS } from "./ContextMenuActions.js";
export class SecretMenuCreator {
    menuCreator = new SecretSubMenuCreator(this);
    secretTypeFillCreator = new SecretTypeFillMenuCreator(this);
    customFieldsFillCreator = new CustomFieldsFillMenuCreator(this);
    title = new TitleProvider(this);
    secret = null;
    async init() {
        try {
            await this.secretTypeFillCreator.init();
        }
        catch (e) {
            logError(e);
        }
    }
    getSecret() {
        return this.secret;
    }
    async create(secret) {
        try {
            if (!secret) {
                throw ErrorCode.INVALID_INPUT;
            }
            this.secret = secret;
            if (!this.hasAccess()) {
                await this.menuCreator.createRoot([ACTIONS.REQUEST_ACCESS, this.secret.id], this.title.formatTitle(i18n(VI18N.REQUEST_ACCESS)));
                return;
            }
            await this.menuCreator.createRoot([this.secret.id], await this.title.getSecretTitle());
            await this.menuCreator.create([ACTIONS.LOGIN, secret.id], i18n(VI18N.LOGIN));
            const hasViewPermission = Secret.hasViewPermission(secret.sharing_level);
            if (hasViewPermission) {
                await this.menuCreator.create([ACTIONS.FILL, secret.id], i18n(VI18N.FILL));
                await this.secretTypeFillCreator.createMenus();
            }
            if (this.secret.has_totp) {
                await this.menuCreator.create([ACTIONS.FILL_TOTP, this.secret.id], i18n(VI18N.FILL) + " TOTP");
            }
            if (secret.oneauth_id) {
                await this.menuCreator.create([ACTIONS.FILL_ONEAUTH_TOTP, this.secret.id, this.secret.oneauth_id], i18n(VI18N.FILL) + " OneAuth TOTP");
            }
            if (hasViewPermission) {
                await this.customFieldsFillCreator.createMenus();
            }
        }
        catch (e) {
            logError(e);
        }
    }
    hasAccess() {
        return !this.secret.access_controlled || (this.secret.access_request_status == Secret.ACCESS_CTRL_STATUS.CHECK_OUT);
    }
}
class SecretTypeFillMenuCreator {
    p;
    secretTypeMap = null;
    constructor(p) {
        this.p = p;
    }
    async init() {
        try {
            this.secretTypeMap = await accountDb.secretTypeTable.loadMap();
        }
        catch (e) {
            logError(e);
        }
    }
    async createMenus() {
        try {
            const secret = this.p.getSecret();
            const secretType = this.secretTypeMap[secret.type_id];
            const FIELD_TYPE = SecretType.FIELD_TYPE;
            const validFields = secretType.fields.filter(x => !x.isDeleted && (x.type == FIELD_TYPE.TEXT || x.type == FIELD_TYPE.PASSWORD));
            if (!validFields.length) {
                return;
            }
            await this.p.menuCreator.createSeparator();
            for (let field of validFields) {
                await this.p.menuCreator.create([ACTIONS.FILL_FIELD, secret.id, field.name], i18n(VI18N.FILL) + " " + field.label);
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
class CustomFieldsFillMenuCreator {
    p;
    constructor(p) {
        this.p = p;
    }
    async createMenus() {
        try {
            const secret = this.p.getSecret();
            const allCustomColInfo = secret.customColumnTypeInfos;
            if (!allCustomColInfo || allCustomColInfo.length == 0) {
                return;
            }
            await this.p.menuCreator.createSeparator();
            for (let column of allCustomColInfo) {
                await this.p.menuCreator.create([ACTIONS.FILL_CUSTOM_FIELD, secret.id, column.id], i18n(VI18N.FILL) + " " + column.label);
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
class TitleProvider {
    p;
    constructor(p) {
        this.p = p;
    }
    async getSecretTitle() {
        const secret = this.p.getSecret();
        const username = await bg.zcrypt.decrypt(secret.ui_text, secret.shared);
        return this.formatTitle(username);
    }
    formatTitle(msg) {
        return `${this.getStarName()} (${msg})`;
    }
    getStarName() {
        const secret = this.p.getSecret();
        const starCodePoint = secret.is_favourite ? 0x2605 : 0x2606;
        return String.fromCodePoint(starCodePoint) + " " + secret.name;
    }
}
class SecretSubMenuCreator {
    p;
    constructor(p) {
        this.p = p;
    }
    async create(id, title) {
        return brApi.menu.create({ id: contextMenu.idUtil.createFrom(id), parentId: this.p.getSecret().id, contexts: contextMenu.CONTEXTS, title });
    }
    async createRoot(id, title) {
        return brApi.menu.create({ id: contextMenu.idUtil.createFrom(id), parentId: contextMenu.ROOT_ID, contexts: contextMenu.CONTEXTS, title });
    }
    async createSeparator() {
        return contextMenu.menuCreator.createSeparator(this.p.getSecret().id);
    }
}
