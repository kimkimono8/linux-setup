import { util } from "./csframe-util.js";
class CreateInput {
    id;
    path;
    width;
    height;
    style;
    static DEFAULT_WIDTH = 350;
    static DEFAULT_HEIGHT = 275;
    constructor(id, path, width, height, style) {
        this.id = id;
        this.path = path;
        this.width = width;
        this.height = height;
        this.style = style;
    }
}
class IFrameCreator {
    ID = {
        ALERT: "zoho_vault_alert_frame",
        CONFIRM: "zoho_vault_confirm_frame",
        SITE: "zoho_vault_site_frame",
        SAVE: "zoho_vault_save_frame",
        UPDATE: "zoho_vault_update_frame",
        CARD_LIST: "zohovault_card_list_frame",
        CARD_SAVE_UPDATE: "zoho_vault_card_save_update_frame",
        FORM_LIST: "zoho_vault_form_filling_frame",
        RESET: "zohovault_reset_frame",
    };
    PATH = {
        CONFIRM: "/html/tab/ConfirmFrame.html",
        RESET: "/html/tab/ResetFrame.html",
        SAVE: "/html/tab/SaveFrame.html",
        SITE: "/html/tab/SiteFrame.html",
        UPDATE: "/html/tab/UpdateFrame.html",
        CARD_LIST: "/html/tab/ZVaultFormList.html",
        ADDRESS_LIST: "/html/tab/ZVaultAddressList.html",
        SAVE_UPDATE_CARD: "/html/tab/ZVaultSaveCard.html",
        ALERT: "/html/tab/Alert.html",
    };
    newCreateInput({ id = "", path = "", width = CreateInput.DEFAULT_WIDTH, height = CreateInput.DEFAULT_HEIGHT, style = "", } = {}) {
        return new CreateInput(id, path, width, height, style);
    }
    createFrame(input) {
        try {
            util.removeFrame({}, input.id);
            const frame = document.createElement("iframe");
            frame.name = input.id;
            frame.id = input.id;
            frame.src = brApi.runtime.getUrl(input.path);
            frame.style.zIndex = Date.now() + "";
            frame.width = input.width + "px";
            frame.height = input.height + "px";
            frame.setAttribute("style", this.getStyle(input));
            if (input.style) {
            }
            return frame;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getStyle(input) {
        if (input.style) {
            return input.style;
        }
        return `height ${input.height}px !important;width: ${input.width}px !important;` +
            "position: fixed !important;border:none !important;" +
            `min-width: ${input.width}px !important;` +
            `min-height: ${input.height}px !important;` +
            "opacity: 100 !important;" +
            "box-shadow: -2px 0 6px 0 rgba(0,0,0,.15) !important;" +
            "height: max-content !important;" +
            "transition: right 0.5s;" +
            `top: 20px !important;right: -${input.width}px !important;` +
            "z-index: " + Date.now() + " !important;";
    }
}
export const iframeCreator = new IFrameCreator();
