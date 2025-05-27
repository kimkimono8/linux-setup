export class ConfigImpl {
    configObj = null;
    async init() {
        try {
            this.configObj = await fetch("/conf/zvconfig.json").then(x => x.json());
            if (!isDevMode) {
                return;
            }
            const devConfig = await fetch("/conf/zvconfig_dev.json").then(x => x.json());
            Object.assign(this.configObj, devConfig);
        }
        catch (e) {
            logError(e);
        }
    }
    get(key, defaultValue = null) {
        try {
            if (!this.configObj) {
                throw "CONFIG_NOT_INITIALIZED";
            }
            if (!(key in this.configObj)) {
                return defaultValue;
            }
            return (this.configObj[key]);
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
}
