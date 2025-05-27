import { pp } from "../../pp.js";
export class PasswordDetailsShowerPartImpl {
    p;
    constructor(p) {
        this.p = p;
    }
    async postSecretShown() {
        window.requestAnimationFrame(() => this.p.elem.style.right = "0");
        bgApi.audit.secretAccessed(this.p.secret.id);
        await zsessionStorage.save(this.p.PPSessionShownSecretIdKey, this.p.secret.id);
    }
    async handleNoAccess() {
        await bgApi.ztab.getSecretAccess(this.p.secret.id);
        await js.dom.closeWindow();
    }
    async focusField() {
        try {
            this.p.elem.addEventListener("transitionend", () => js.selector.selectFrom(this.p.elem, "[tabindex]")?.focus?.(), { once: true });
        }
        catch (e) {
            logError(e);
        }
    }
}
export class RestorePasswordDetailsShower {
    p;
    constructor(p) {
        this.p = p;
    }
    async postSecretShown() {
        this.p.elem.style.right = "0";
        await this.checkDisplayedDomainMatching();
    }
    async focusField() {
        try {
            const index = await this.p.helper.getLastFocusedIndex();
            js.selector.selectAll("[tabindex='0']", this.p.elem)[index]?.focus();
        }
        catch (e) {
            logError(e);
        }
    }
    async checkDisplayedDomainMatching() {
        try {
            const query = await pp.passwordsUI.loadQuery();
            if (!query.domainMatching) {
                return;
            }
            const activeTab = await brApi.tab.getActiveTab();
            if (!activeTab) {
                return;
            }
            const parentDomain = js.url.getParentDomain(activeTab.url);
            let curParentDomain = "";
            for (let url of this.p.secret.urls) {
                curParentDomain = js.url.getParentDomain(url);
                if (curParentDomain == parentDomain) {
                    return;
                }
            }
            this.p.close();
        }
        catch (e) {
            logError(e);
        }
    }
    async handleNoAccess() {
        await zsessionStorage.save(this.p.PPSessionShownSecretIdKey, null);
    }
}
