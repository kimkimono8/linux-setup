import { vapi } from "../Context.js";
export class CDNUtil {
    async getUrl(path) {
        try {
            const normalizedPath = path.startsWith("/") ? path : "/" + path;
            const pathObj = (await vapi.getCDNUrls([normalizedPath])).result;
            const cdnPath = pathObj[normalizedPath];
            return urlProvider.getCDNServer() + cdnPath;
        }
        catch (e) {
            throw e;
        }
    }
    async getTextContents(path) {
        try {
            const url = await this.getUrl(path);
            const resp = await fetch(url);
            if (!resp.ok) {
                throw ["FAILED_TO_FETCH", path];
            }
            return await resp.text();
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
