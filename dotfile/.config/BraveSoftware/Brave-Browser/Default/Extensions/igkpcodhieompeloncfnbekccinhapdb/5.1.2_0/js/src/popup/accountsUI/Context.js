import { AccountsUI } from "./AccountsUI.js";
class Context {
    accountsUI;
    init() {
        this.accountsUI = new AccountsUI();
    }
}
export const context = new Context();
