export class InstallHandlerImpl {
    init() {
        try {
            brApi.runtime.onInstall(this.handleInstalled.bind(this));
        }
        catch (e) {
            logError(e);
        }
    }
    handleInstalled(installInfo) {
        try {
            switch (installInfo.reason) {
                case "install":
                    this.installed();
                    break;
                case "update":
                    this.updated(installInfo.previousVersion);
                    break;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async installed() {
    }
    async updated(_previousVersion) {
        try {
            zlocalStorage.remove("REFRESH_TOKEN");
        }
        catch (e) {
            logError(e);
        }
    }
}
