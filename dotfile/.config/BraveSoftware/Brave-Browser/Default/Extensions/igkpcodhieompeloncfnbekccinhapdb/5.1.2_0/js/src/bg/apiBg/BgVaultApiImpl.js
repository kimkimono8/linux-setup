import { bg } from "../bg.js";
import { vaultWeb } from "../web/export.js";
export class BgVaultApiImpl {
    async openWebUI({ route = "" }) {
        return vaultWeb.openWebUI({ route });
    }
    async sync() {
        return bg.vaultSync.sync(true);
    }
    async getUrl() {
        return urlProvider.getVaultUrl();
    }
    async getDomain() {
        return urlProvider.getDomain();
    }
    async lock() {
        return bg.vault.lock();
    }
    async signOut() {
        return bg.vault.signOut();
    }
    async syncConfig() {
        return bg.vaultSync.syncConfig();
    }
    async syncThemeFromWeb() {
        return bg.vaultSync.syncThemeFromWeb();
    }
}
