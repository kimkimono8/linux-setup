import { BasePasswordDetailsUI } from "../passwords_ui/password_details/BasePasswordDetailsUI.js";
export class TrashDetailsUI extends BasePasswordDetailsUI {
    async showDetails(secretId) {
        try {
            await super.showDetails(secretId);
            this.removeElems("[data-favourite]", "[data-edit]", "[data-share]", "[data-reset_password]", "[data-login]", "[data-private_login]");
        }
        catch (e) {
            logError(e);
        }
    }
    async getSecret(secretId) {
        try {
            const secret = await bgApi.secret.getTrashedSecret(secretId);
            return secret;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    removeElems(...selectors) {
        try {
            let elems;
            for (let selector of selectors) {
                elems = this.selectAll(selector);
                elems.forEach(x => x.remove());
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
