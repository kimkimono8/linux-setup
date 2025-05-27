import { BrContextMenuContextType, BrContextMenuType } from "../../../../components/brApi/service/enum.js";
import { VI18N } from "../../../service/vt/VI18n.js";
import { contextMenu } from "../Context.js";
import { ContextMenuActions as ACTIONS } from "./ContextMenuActions.js";
export class ContextMenuCreator {
    randomId = Date.now();
    async createUnlockMenu() {
        return brApi.menu.create({
            id: ACTIONS.UNLOCK,
            contexts: contextMenu.CONTEXTS,
            title: i18n(VI18N.UNLOCK_ZOHO_VAULT)
        });
    }
    async createRoot() {
        return brApi.menu.create({
            id: contextMenu.ROOT_ID,
            contexts: contextMenu.CONTEXTS,
            title: "Zoho Vault"
        });
    }
    async createSeparator(parentId) {
        try {
            await brApi.menu.create({
                id: this.nextRandomId(),
                contexts: [BrContextMenuContextType.ALL],
                type: BrContextMenuType.SEPARATOR,
                parentId
            });
        }
        catch (e) {
            logError(e);
        }
    }
    async createAddPassword() {
        return brApi.menu.create({
            id: ACTIONS.ADD_PASSWORD,
            contexts: contextMenu.CONTEXTS,
            title: i18n(VI18N.ADD_PASSWORD),
            parentId: contextMenu.ROOT_ID,
        });
    }
    async createShowAllPasswordsMenu() {
        const title = i18n(VI18N.CONTEXT_MENU_SHOW_ALL_PASSWORDS);
        await brApi.menu.create({
            id: ACTIONS.SHOW_ALL_PASSWORDS,
            title,
            contexts: contextMenu.CONTEXTS,
            parentId: contextMenu.ROOT_ID
        });
    }
    async createShowAllCardsMenu() {
        const title = i18n(VI18N.CONTEXT_MENU_SHOW_ALL_CARDS);
        await brApi.menu.create({
            id: ACTIONS.SHOW_ALL_CARDS,
            title,
            contexts: contextMenu.CONTEXTS,
            parentId: contextMenu.ROOT_ID
        });
    }
    nextRandomId() {
        return (this.randomId++).toString();
    }
}
