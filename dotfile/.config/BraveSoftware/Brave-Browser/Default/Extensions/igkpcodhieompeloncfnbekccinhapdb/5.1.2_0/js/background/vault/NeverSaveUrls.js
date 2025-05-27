import { accountDb, vapi } from "../../src/bg/Context.js";
export class NeverSaveUrls {
    STAR_PREFIX = "*.";
    async sync() {
        try {
            const resp = (await vapi.settings.neverSave.getAll()).result;
            const domainSet = new Set(resp.operation.Details.domains);
            const neverSaveDomains = js.array.toArray(domainSet.values());
            await accountDb.neverSaveTable.saveAll(neverSaveDomains);
        }
        catch (e) {
            logError(e);
        }
    }
    async addDomain(domain) {
        try {
            const resp = (await vapi.settings.neverSave.add(domain)).result;
            if (!vapi.isRespOk(resp)) {
                throw resp.operation.result.message;
            }
            await accountDb.neverSaveTable.add(domain);
            return fnOut.OK;
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async removeDomain(domain) {
        try {
            const resp = (await vapi.settings.neverSave.remove(domain)).result;
            if (!vapi.isRespOk(resp)) {
                throw resp.operation.result.message;
            }
            await accountDb.neverSaveTable.remove(domain);
            return fnOut.OK;
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async isNeverSaveUrl(url) {
        try {
            const domain = js.url.getHostName(url);
            if (await this.isNeverSaveDomain(domain)) {
                return true;
            }
            const parts = domain.split(".");
            for (let i = 0; i < parts.length; i++) {
                if (await this.isNeverSaveStarDomain(parts, i)) {
                    return true;
                }
            }
            return false;
        }
        catch (e) {
            logError(e);
            return true;
        }
    }
    async isNeverSaveStarDomain(parts, i) {
        const domain = this.STAR_PREFIX + parts.slice(i).join(".");
        return this.isNeverSaveDomain(domain);
    }
    async isNeverSaveDomain(domain) {
        return accountDb.neverSaveTable.has(domain);
    }
}
