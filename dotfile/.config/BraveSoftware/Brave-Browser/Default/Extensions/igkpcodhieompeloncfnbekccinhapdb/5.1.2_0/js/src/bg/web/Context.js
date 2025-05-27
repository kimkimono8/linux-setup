import { VaultWeb } from "./VaultWeb.js";
import { WebUnlock } from "./WebUnlock.js";
class Context {
    vaultWeb;
    webUnlock;
    init() {
        this.vaultWeb = new VaultWeb();
        this.webUnlock = new WebUnlock();
    }
}
export const context = new Context();
