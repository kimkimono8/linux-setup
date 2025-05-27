import { bg } from "../../bg.js";
import { inactivityHandler, sidePanelHandler } from "../../Context.js";
import { contextMenu } from "../Context.js";
import { ContextMenuActions as ACTIONS } from "./ContextMenuActions.js";
export class ContextMenuListener {
    init() {
        js.fn.bindThis(this, [this.handleMenuClick]);
        brApi.menu.onClick(this.handleMenuClick);
    }
    async handleMenuClick(clickData, tab) {
        try {
            const [action, ...args] = contextMenu.idUtil.parse(clickData.menuItemId.toString());
            const secretId = args[0];
            const tabId = tab.id;
            const frameId = clickData.frameId;
            switch (action) {
                case ACTIONS.UNLOCK:
                    sidePanelHandler.open(tab.windowId);
                    break;
                case ACTIONS.ADD_PASSWORD:
                    bg.ztabHandler.addPasswordFromTab(tabId, frameId);
                    break;
                case ACTIONS.SHOW_ALL_PASSWORDS:
                    csApi.other.showSiteFrame({ fromContextMenu: true }, { tabId, frameId });
                    break;
                case ACTIONS.SHOW_ALL_CARDS:
                    csApi.other.showCardFrame({ tabId, frameId });
                    break;
                case ACTIONS.REQUEST_ACCESS:
                    bg.ztabHandler.getSecretAccess(secretId);
                    break;
                case ACTIONS.LOGIN:
                    bg.vaultSecrets.secretLogin.frameLogin(tabId, frameId, secretId);
                    break;
                case ACTIONS.FILL:
                    bg.vaultSecrets.secretLogin.frameFill(tabId, frameId, secretId);
                    break;
                case ACTIONS.FILL_FIELD:
                    {
                        const fieldName = args[1];
                        bg.vaultSecrets.secretLogin.fillField(tabId, frameId, secretId, fieldName);
                    }
                    break;
                case ACTIONS.FILL_TOTP:
                    bg.vaultSecrets.secretLogin.fillTotp(tabId, frameId, secretId);
                    break;
                case ACTIONS.FILL_ONEAUTH_TOTP:
                    {
                        const oneauthId = args[1];
                        bg.vaultSecrets.secretLogin.fillOneAuthTotp(tabId, frameId, secretId, oneauthId);
                    }
                    break;
                case ACTIONS.FILL_CUSTOM_FIELD:
                    {
                        const customColId = args[1];
                        bg.vaultSecrets.secretLogin.fillCustomCol(tabId, frameId, secretId, customColId);
                    }
                    break;
                default:
                    throw "UNKNOWN_ACTION: " + action;
            }
            inactivityHandler.updateLastActive();
        }
        catch (e) {
            logError(e);
        }
    }
}
