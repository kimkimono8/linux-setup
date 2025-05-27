class Util {
    removeFrame(params = {}, frameId) {
        try {
            document.getElementById(frameId)?.remove?.();
            if (params.restoreFoucs) {
                this.restoreFocus();
            }
        }
        catch (e) {
            logError(e);
        }
    }
    restoreFocus() {
        csutil.input.getActiveInput()?.focus?.();
    }
    async restore(key, shower) {
        try {
            if (!csutil.window.isTopFrame()) {
                return;
            }
            await js.dom.waitDomLoad();
            const shownIframe = await ztabStorage.load(key, false);
            if (!shownIframe) {
                return;
            }
            info("FRAME_SHOWER", "restore frame: ", key);
            await shower.show();
        }
        catch (e) {
            logError(e);
        }
    }
}
export const util = new Util();
