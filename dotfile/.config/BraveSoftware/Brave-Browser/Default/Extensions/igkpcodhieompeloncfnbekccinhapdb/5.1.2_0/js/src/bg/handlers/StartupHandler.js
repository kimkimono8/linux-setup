import { devToolsHandler } from "../Context.js";
export class StartupHandler {
    init() {
        try {
            brApi.runtime.onStartup(this.onStartup.bind(this));
        }
        catch (e) {
            logError(e);
        }
    }
    onStartup() {
        try {
            devToolsHandler.browserStarted();
        }
        catch (e) {
            logError(e);
        }
    }
}
