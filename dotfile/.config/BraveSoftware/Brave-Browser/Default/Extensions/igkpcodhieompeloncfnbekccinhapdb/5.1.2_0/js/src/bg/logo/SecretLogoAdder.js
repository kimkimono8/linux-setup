import { commonDb } from "../Context.js";
export class SecretLogoAdder {
    async addLogo(secrets) {
        try {
            const urls = this.getValidFirstUrls(secrets);
            const logoMap = await commonDb.logoTable.loadMap(urls);
            let hostname;
            let parentDomain;
            for (let secret of secrets) {
                if (!secret.valid_urls.length) {
                    continue;
                }
                hostname = js.url.getHostName(secret.valid_urls[0]);
                if (logoMap.has(hostname)) {
                    secret.domain_logo = logoMap.get(hostname);
                    continue;
                }
                parentDomain = js.url.getParentDomainFromHostName(hostname);
                if (logoMap.has(parentDomain)) {
                    secret.domain_logo = logoMap.get(parentDomain);
                }
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getValidFirstUrls(secrets) {
        const validUrls = [];
        for (let secret of secrets) {
            if (secret.valid_urls.length > 0) {
                validUrls.push(secret.valid_urls[0]);
            }
        }
        return validUrls;
    }
}
