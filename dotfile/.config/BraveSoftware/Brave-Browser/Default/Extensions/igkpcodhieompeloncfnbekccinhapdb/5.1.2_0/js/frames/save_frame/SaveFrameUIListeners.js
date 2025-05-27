export class SaveFrameUIListeners {
    p = null;
    clickedShowHide(e) {
        if (!(e.target instanceof HTMLElement)) {
            return;
        }
        const eye_container = js.selector.closest(e.target, "[data-eye_for]");
        const eye_icon = js.selector.selectFrom(eye_container, "i");
        const input = js.selector.select(eye_container.dataset.eye_for);
        const hide_password = input.dataset.type == "text";
        const auto_hide = eye_container.dataset.auto_hide_eye !== undefined;
        const value = input.dataset.value;
        if (hide_password) {
            input.dataset.type = "password";
            input.textContent = js.dom.getPasswordMask(value);
            eye_icon.dataset.tooltip_content = "i18n:view";
            eye_icon.className = "icon-view";
            if (auto_hide) {
                clearTimeout(+eye_container.dataset.auto_hide_timeout);
            }
            return;
        }
        input.dataset.type = "text";
        input.textContent = value;
        eye_icon.dataset.tooltip_content = "i18n:hide";
        eye_icon.className = "icon-hide";
        if (auto_hide) {
            eye_container.dataset.auto_hide_timeout = "" + setTimeout(() => this.clickedShowHide(e), 10000);
        }
    }
    clickedSave() {
        this.p.passwordAdd.addPassword();
    }
    async clickedNeverSave() {
        try {
            const url = this.p.saveFrameData.urls[0];
            const domain = js.url.getHostName(url);
            (await bgApi.settings.neverSave.add(domain)).result;
            this.clickedClose();
        }
        catch (e) {
            logError(e);
            VUI.notification.showError(e + "");
        }
    }
    async clickedEdit() {
        try {
            bgApi.saveFrame.editSecret(this.p.passwordAdd.getUserInput());
            this.clickedClose();
        }
        catch (e) {
            logError(e);
            VUI.notification.showError(e + "");
        }
    }
    clickedClose() {
        try {
            bgApi.saveFrame.closeSaveFrame({ restoreFoucs: true });
        }
        catch (e) {
            logError(e);
            VUI.notification.showError(e + "");
        }
    }
}
