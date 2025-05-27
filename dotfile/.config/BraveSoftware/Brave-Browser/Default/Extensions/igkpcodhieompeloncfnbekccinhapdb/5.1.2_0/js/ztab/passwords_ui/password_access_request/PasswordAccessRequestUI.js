import { Secret } from "../../../src/service/bgApi/types/Secret.js";
import { UIParent } from "../../../src/uiUtil/ui/UIParent.js";
import { zt } from "../../zt.js";
import { PasswordAccessPendingUI } from "./pending/PasswordAccessPendingUI.js";
import { PasswordAccessReqUI } from "./request/PasswordAccessReqUI.js";
export class PasswordAccessRequestUI extends UIParent {
    p = null;
    requestUI = new PasswordAccessReqUI();
    pendingUI = new PasswordAccessPendingUI();
    init() {
        this.init = () => { };
        this.requestUI.init(this);
        this.pendingUI.init(this);
    }
    async getSecretAccess(secretId) {
        try {
            zt.mainUI.showDotLoading();
            const secret = await bgApi.secret.getServerSecret(secretId);
            await this.getSecretAccessFor(secret);
        }
        catch (e) {
            throw jserror(e);
        }
        finally {
            zt.mainUI.hideDotLoading();
        }
    }
    async getSecretAccessFor(secret) {
        try {
            this.init();
            const STATUS = Secret.ACCESS_CTRL_STATUS;
            switch (secret.access_request_status) {
                case STATUS.NO_REQUEST_FOUND:
                    await this.requestUI.showUI(secret);
                    return;
                case STATUS.PENDING:
                    this.pendingUI.showUI(secret);
                    return;
                case STATUS.APPROVED_FOR_LATER:
                    this.pendingUI.showApprovedLaterUI(secret);
                    return;
                case STATUS.APPROVED:
                    this.pendingUI.showCheckoutUI(secret);
                    return;
                default:
                    throw "INVALID_STATE";
            }
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
