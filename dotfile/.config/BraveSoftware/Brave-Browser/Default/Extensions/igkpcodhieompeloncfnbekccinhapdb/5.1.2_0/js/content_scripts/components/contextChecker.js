import { Secret } from "../../src/service/bgApi/types/Secret.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
class ContextCheckerGlobal {
    static httpConfirmed = false;
    static confirmedDomains = [];
    static confirmPromise = null;
}
class ContextChecker {
    async isValidFillContext(fillValue) {
        return new FillContextChecker().checkIsValidFillContext(fillValue);
    }
    async isValidLoginContext(loginData) {
        return new LoginContextChecker().checkIsValidLoginContext(loginData);
    }
    async isValidFrameLoginContext(loginData) {
        return new FrameLoginContextChecker().checkIsValidFrameLoginContext(loginData);
    }
    async isValidTabLoginContext(loginData) {
        return new TabLoginContextChecker().checkIsValidTabLoginContext(loginData);
    }
    setConfirmResponse(allow) {
        if (ContextCheckerGlobal.confirmPromise) {
            ContextCheckerGlobal.confirmPromise.resolve(allow);
        }
    }
}
export const contextChecker = new ContextChecker();
class ValidContextChecker {
    async checkOriginHttps() {
        return this.checkOrigin() &&
            (this.checkProtocol() || await this.getHttpConfirmation());
    }
    checkOrigin() {
        return self.origin != "null";
    }
    checkProtocol() {
        return ContextCheckerGlobal.httpConfirmed || !window.location.href.startsWith("http:");
    }
    async getHttpConfirmation() {
        const checkHttp = await zlocalStorage.load(LocalStorageKeys.INSECURE_PAGE_PROMPT, true);
        if (!checkHttp) {
            return true;
        }
        return ContextCheckerGlobal.httpConfirmed = window.confirm(i18n(VI18N.CONFIRM_INSECURE_FILL));
    }
    checkDomain(allowedDomains) {
        const currentDomain = js.url.getParentDomain(window.location.href);
        const validDomain = allowedDomains.includes(currentDomain) || ContextCheckerGlobal.confirmedDomains.includes(currentDomain);
        return validDomain;
    }
    async getUserConsent(allowedDomains, secretId, shareLevel) {
        try {
            ContextCheckerGlobal.confirmPromise = js.promise.createNew();
            const currentDomain = js.url.getParentDomain(window.location.href);
            const domainValues = {
                secretId,
                frameId: await bgApi.tab.getFrameId(),
                ownedDomain: allowedDomains[0],
                useDomain: currentDomain,
                allowPermanent: Secret.hasEditPermission(shareLevel)
            };
            await ztabStorage.save(TabStorageKeys.CONFIRM_USAGE_FOR, domainValues);
            await bgApi.tab.showConfirmFrame();
            const allow = await ContextCheckerGlobal.confirmPromise;
            if (allow) {
                ContextCheckerGlobal.confirmedDomains.push(currentDomain);
            }
            return allow;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
class FillContextChecker extends ValidContextChecker {
    async checkIsValidFillContext(fillValue) {
        return this.checkIsValidFillContextFn(fillValue.allowedDomains, fillValue.secretId, fillValue.shareLevel);
    }
    async checkIsValidFillContextFn(allowedDomains, secretId, shareLevel) {
        const isValid = await this.checkOriginHttps() &&
            (this.checkDomain(allowedDomains) || await this.getUserConsent(allowedDomains, secretId, shareLevel));
        return isValid;
    }
}
class LoginContextChecker extends FillContextChecker {
    async checkIsValidLoginContext(loginData) {
        const isValid = await this.checkOriginHttps() && this.checkDomain(loginData.allowedDomains);
        return isValid;
    }
}
class FrameLoginContextChecker extends FillContextChecker {
    async checkIsValidFrameLoginContext(loginData) {
        return this.checkIsValidFillContextFn(loginData.allowedDomains, loginData.secretId, loginData.shareLevel);
    }
}
class TabLoginContextChecker extends FillContextChecker {
    async checkIsValidTabLoginContext(loginData) {
        const isValid = await this.checkOriginHttps() && (await this.checkTabDomain(loginData.allowedDomains));
        return isValid;
    }
    async checkTabDomain(allowedDomains) {
        const tabDomain = await bgApi.tab.getTabDomain();
        const valid = allowedDomains.includes(tabDomain);
        return valid;
    }
}
