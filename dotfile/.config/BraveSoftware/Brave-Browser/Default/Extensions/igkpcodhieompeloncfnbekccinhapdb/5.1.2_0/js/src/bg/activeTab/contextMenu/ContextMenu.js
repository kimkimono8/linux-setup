import { ErrorCode } from "../../../../components/jsUtil/service/constants/ErrorCode.js";
import { SecretQuery } from "../../../service/bgApi/types/SecretQuery.js";
import { VtLoginState } from "../../../service/vt/constants/constants.js";
import { bg } from "../../bg.js";
import { ContextMenuCreator } from "./ContextMenuCreator.js";
import { ContextMenuId } from "./ContextMenuId.js";
import { ContextMenuListener } from "./ContextMenuListener.js";
import { SecretMenuCreator } from "./SecretMenuCreator.js";
export class ContextMenu {
    MAX_CONTEXT_MENU_SECRET = 40;
    menuCreator = new ContextMenuCreator();
    secretMenuCreator = new SecretMenuCreator();
    listener = new ContextMenuListener();
    idUtil = new ContextMenuId();
    ROOT_ID = "ZohoVault";
    CONTEXTS = ["all"];
    init() {
        this.listener.init();
        this.changeState = js.fn.wrapper.createSingleInstListener(this.changeState, this);
    }
    async changeState(state) {
        try {
            await brApi.menu.removeAll();
            switch (state) {
                case VtLoginState.LOGGED_OUT:
                    return;
                case VtLoginState.LOCKED:
                    await this.menuCreator.createUnlockMenu();
                    return;
                case VtLoginState.UNLOCKED:
                    await this.addUnlockedStateMenus();
                    return;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async addUnlockedStateMenus() {
        try {
            await this.menuCreator.createRoot();
            const secrets = await this.getSecrets();
            await this.addSecretsMenus(secrets);
            await this.menuCreator.createAddPassword();
        }
        catch (e) {
            logError(e);
        }
    }
    async getSecrets() {
        try {
            const activeTab = await brApi.tab.getActiveTab();
            if (!activeTab) {
                return [];
            }
            const secretQuery = SecretQuery.newBuilder()
                .rowsPerPage(this.MAX_CONTEXT_MENU_SECRET)
                .domainMatching(true, activeTab.url)
                .noLogo(true)
                .orderByHostRecent()
                .build();
            const secretQueryResult = await bg.vaultSecrets.secretQuerier.query(secretQuery);
            const secrets = secretQueryResult.secrets;
            return secrets;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async addSecretsMenus(secrets) {
        try {
            if (!secrets) {
                throw ErrorCode.INVALID_INPUT;
            }
            if (secrets.length == 0) {
                return;
            }
            await this.menuCreator.createShowAllPasswordsMenu();
            await this.menuCreator.createSeparator(this.ROOT_ID);
            await this.secretMenuCreator.init();
            for (let secret of secrets) {
                await this.secretMenuCreator.create(secret);
            }
            await this.menuCreator.createSeparator(this.ROOT_ID);
        }
        catch (e) {
            logError(e);
        }
    }
}
