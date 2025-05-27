import { BasePasswordFormUIListener } from "../../BasePasswordFormUIListener.js";
export class PasswordAccessPendingUIListener extends BasePasswordFormUIListener {
    p = null;
    clickedCancelRequest() {
        this.p.cancelAccessRequest();
    }
    clickedCheckout() {
        this.p.checkoutSecret();
    }
}
