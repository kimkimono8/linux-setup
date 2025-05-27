import { ZVError } from "../../common/error/ZVError.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
import { VtSettings } from "../../src/service/vt/constants/VtSettings.js";
import { csCardFieldDetector } from "./csCardFieldDetector.js";
import { CSCardFiller } from "./csCardFiller.js";
export class CSCardMain extends CSCardFiller {
    mutationLocked = false;
    mutationCounter = 1;
    static mutationObserver = null;
    handleClicks = this.documentClicked.bind(this);
    handleMutation = this.mutationCallback.bind(this);
    iframeData = {};
    async initForIframe() {
        try {
            const iconNeeded = await this.isIconPopulationNeeded();
            if (!iconNeeded) {
                return;
            }
            await js.dom.waitDomLoad();
            this.cardCategoryId = await zlocalStorage.load(LocalStorageKeys.PAYMENT_CARD_TYPE_ID, null);
            document.addEventListener("click", this.handleClicks);
            this.addMutationObserver();
            await js.time.delay(3);
            this.mutationCounter++;
            this.checkForPageChanges();
        }
        catch (e) {
            logError(e);
        }
    }
    removeClickListener() {
        document.removeEventListener("click", this.handleClicks);
    }
    addClickListener() {
        document.addEventListener("click", this.handleClicks);
    }
    async isIconPopulationNeeded() {
        try {
            const disableVaultIcons = await zlocalStorage.load(VtSettings.DISABLE_WEBSITE_VAULT_ICON, false);
            if (disableVaultIcons) {
                return false;
            }
            const stored = await zlocalStorage.loadAll({
                [LocalStorageKeys.PAYMENT_CARD_TYPE_ID]: "",
                [LocalStorageKeys.ADDRESS_TYPE_ID]: "",
                [LocalStorageKeys.USED_CATEGORIES]: {},
            });
            const secretCountMap = stored[LocalStorageKeys.USED_CATEGORIES];
            const paymentCardId = stored[LocalStorageKeys.PAYMENT_CARD_TYPE_ID];
            const iconNeeded = paymentCardId && (secretCountMap[paymentCardId] > 0);
            return iconNeeded;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    checkForPageChanges() {
        if (!this.mutationLocked && this.mutationCounter > 0) {
            this.mutationLocked = true;
            this.mutationCounter = 0;
            this.populateVaultIconsCC();
            setTimeout(function () {
                this.mutationLocked = false;
                this.mutationCounter > 0 ? this.checkForPageChanges() : "";
            }.bind(this), 1200);
        }
    }
    hasZIcon(e, target) {
        try {
            const boundary = target.getBoundingClientRect();
            const isRightToLeft = csutil.input.checkIsRightToLeft(target);
            const x = e.clientX;
            if (isRightToLeft) {
                const w1Percent = boundary.left + (0.01 * boundary.width) + 15;
                return x < w1Percent;
            }
            const w99Percent = boundary.left + (0.99 * boundary.width) - 15;
            return x > w99Percent;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async documentClicked(e) {
        const elm = e.target;
        if ((elm.hasAttribute("data-zvault-cc") || elm.getAttribute("data-zvault-cc-iframe-enabled") == "true") && this.hasZIcon(e, e.target)) {
            document.removeEventListener("click", this.handleClicks);
            await csCardFieldDetector.ccFieldClicked(e);
            document.addEventListener("click", this.handleClicks);
            return;
        }
        await js.time.delay(1);
        this.mutationCounter++;
        this.checkForPageChanges();
    }
    addMutationObserver() {
        const targetNode = document.body;
        const config = { attributes: false, childList: true, subtree: true };
        CSCardMain.mutationObserver = new MutationObserver(this.handleMutation);
        CSCardMain.mutationObserver.observe(targetNode, config);
    }
    mutationCallback(mutationsList, _observer) {
        this.mutationCounter += mutationsList.length;
        this.checkForPageChanges();
    }
    ;
    async disableIframeCheck() {
        try {
            await js.dom.waitDomLoad();
            await js.time.delay(0.1);
            CSCardMain.mutationObserver.disconnect();
            document.removeEventListener("click", this.handleClicks);
            this.handleClicks = null;
            return;
        }
        catch (e) {
            ZVError.error(e);
        }
    }
    checkIframeFields(data) {
        const iframeId = Object.keys(data)[0];
        this.iframeData[iframeId] = data[iframeId];
        let totalFields = 0;
        for (let id of Object.keys(this.iframeData)) {
            totalFields += this.iframeData[id].fields.length;
        }
        if (totalFields > 2 && Object.keys(this.iframeData).length > 1) {
            this.initiateIconFillToCCFrames();
        }
        return;
    }
    initiateIconFillToCCFrames() {
        for (let frameId of Object.keys(this.iframeData)) {
            bgApi.cardFrame.fillVaultIconCCIframe(this.iframeData[frameId].fields, Number(frameId));
        }
    }
    fillIconsToCCFrames(fields) {
        for (let ccField of fields) {
            const element = js.selector.select("[" + this.attributeName + "-iframe = " + ccField + "]");
            if (!element) {
                continue;
            }
            element.setAttribute(this.attributeName + "-iframe-enabled", "true");
            csCardFieldDetector.fillVaultIcon(element, true);
        }
    }
    async saveCCIframeData() {
        if (Object.keys(this.iframeData).length) {
            const data = {
                topUrl: js.url.getHost(window.location.href),
                frames: this.iframeData
            };
            await ztabStorage.save(TabStorageKeys.CCIFRAMEDATA, data);
        }
    }
}
