export class BrUtil {
    checkManifestV2() {
        try {
            return chrome.runtime.getManifest()["manifest_version"] == 2;
        }
        catch (e) {
            return false;
        }
    }
    createCallback(res, rej) {
        return function (resp) {
            chrome.runtime.lastError ? rej(chrome.runtime.lastError.message) : res(resp);
        };
    }
}
