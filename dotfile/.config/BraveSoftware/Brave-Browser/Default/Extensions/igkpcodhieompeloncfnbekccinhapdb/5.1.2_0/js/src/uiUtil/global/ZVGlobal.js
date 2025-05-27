export class ZVGlobal {
    static isDevMode() {
        return DevModeChecker.isDevMode();
    }
    static setGlobal(key, x) {
        if (globalThis) {
            globalThis[key] = x;
        }
        if (typeof window !== "undefined") {
            window[key] = x;
        }
    }
}
class DevModeChecker {
    static checked = false;
    static devMode = false;
    static isDevMode() {
        if (this.checked) {
            return this.devMode;
        }
        this.devMode = chrome.runtime.getManifest().name.includes("Dev");
        this.checked = true;
        return this.devMode;
    }
}
