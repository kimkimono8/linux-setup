import { VtSettings } from "../../../service/vt/constants/VtSettings.js";
import { zicon } from "./Context.js";
import { ZIconAdjuster } from "./ZIconAdjuster.js";
import { SubtractPxCalculator } from "./ZIconSubtractPxCalculator.js";
const ICON_ENABLED = "enabled";
const ICON_DISABLED = "disabled";
export class ZIconAdder {
    iconAdjuster = new ZIconAdjuster();
    NO_VAULT_ICON_ATTR = "data-no-vault-icon";
    ICON_SPACE = 15;
    iconSubtractPixel = Symbol();
    LOGIN_ICON = Symbol();
    inputSet = new WeakSet();
    add = js.fn.emptyFn;
    async init() {
        try {
            const noIcon = await zlocalStorage.load(VtSettings.DISABLE_WEBSITE_VAULT_ICON, false);
            this.enableAddFn(!noIcon);
        }
        catch (e) {
            logError(e);
        }
    }
    enableAdd(enable) {
        try {
            if (!enable) {
                this.enableAddFn(false);
                this.removeAll();
                return;
            }
            this.enableAddFn(true);
            zicon.checker.check();
        }
        catch (e) {
            logError(e);
        }
    }
    disableAddForWeb() {
        this.add = js.fn.emptyFn;
    }
    hasZIcon(input) {
        try {
            return input.style.backgroundImage.includes("vault-input");
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    enableIcons() {
        this.updateIcons(ICON_DISABLED, ICON_ENABLED);
    }
    disableIcons() {
        this.updateIcons(ICON_ENABLED, ICON_DISABLED);
    }
    removeAll() {
        try {
            const inputs = csutil.selector.selectAll("input[style*='vault-input']", { shadowRoot: false });
            for (let input of inputs) {
                this.removeZIcon(input);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async addForContextMenuUsedInput(input) {
        try {
            if (this.inputSet.has(input)) {
                return;
            }
            this.add(input);
            const selector = csutil.uniqSelector.getSelector(input);
            if (selector) {
                await bgApi.tab.saveZIconSelector(selector);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    addForShowSiteFrameContextMenu(params) {
        try {
            if (!params.fromContextMenu) {
                return;
            }
            const activeInput = csutil.input.getActiveInput();
            if (!activeInput) {
                return;
            }
            this.addForContextMenuUsedInput(activeInput);
        }
        catch (e) {
            logError(e);
        }
    }
    enableAddFn(enable) {
        try {
            this.add = enable ? this.addFn : js.fn.emptyFn;
        }
        catch (e) {
            logError(e);
        }
    }
    addFn(input) {
        try {
            info(ZIconAdder.name, "adding zicon: ", input);
            if (input.disabled || input.readOnly) {
                return;
            }
            if (input.offsetWidth < 80 || this.hasZIcon(input)) {
                return;
            }
            if (input.hasAttribute(this.NO_VAULT_ICON_ATTR)) {
                return;
            }
            const vault = zicon.unlocked ? ICON_ENABLED : ICON_DISABLED;
            const subtractPixel = SubtractPxCalculator.calculate(input);
            input[this.iconSubtractPixel] = subtractPixel;
            input[this.LOGIN_ICON] = true;
            this.inputSet.add(input);
            js.dom.setStyleImportant(input, {
                "background-image": `url(${chrome.runtime.getURL(`/images/web_access/vault-input-${vault}.svg`)})`,
                "background-repeat": "no-repeat",
                "background-position": `calc(100% - ${subtractPixel}px) center`,
                "background-size": "14px",
                "background-clip": "border-box",
            });
            zicon.listener.addListeners(input);
            input.autocomplete = "off";
            this.iconAdjuster.adjust(input);
        }
        catch (e) {
            logError(e);
        }
    }
    removeZIcon(input = new HTMLInputElement()) {
        try {
            info(ZIconAdder.name, "removing zicon: ", input);
            js.dom.setStyleImportant(input, { "background-image": "" });
            zicon.listener.removeListeners(input);
            this.inputSet.delete(input);
        }
        catch (e) {
            logError(e);
        }
    }
    updateIcons(from, to) {
        try {
            info(ZIconAdder.name, "updating icons from", from, "to", to);
            const selector = `input[style*='vault-input-${from}']`;
            const inputs = csutil.selector.selectAll(selector, { shadowRoot: false });
            const imagePath = `/images/web_access/vault-input-${to}.svg`;
            for (let input of inputs) {
                input.style.setProperty("background-image", `url(${chrome.runtime.getURL(imagePath)})`);
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
