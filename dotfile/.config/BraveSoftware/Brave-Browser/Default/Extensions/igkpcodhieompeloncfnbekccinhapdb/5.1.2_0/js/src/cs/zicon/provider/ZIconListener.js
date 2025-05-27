import { VtSettings } from "../../../service/vt/constants/VtSettings.js";
import { InputType } from "../../../service/vt/constants/InputType.js";
import { external, util, zicon } from "./Context.js";
export class ZIconListener {
    noKeyboard = false;
    async init() {
        try {
            js.fn.bindThis(this, [
                this.onMouseMove,
                this.handleClick,
                this.handleKeydown,
            ]);
            document.addEventListener("click", this.handleClick, true);
            this.noKeyboard = await zlocalStorage.load(VtSettings.DISABLE_WEBSITE_KEYBOARD_SHORTCUT, false);
        }
        catch (e) {
            logError(e);
        }
    }
    addClickListener(elem) {
        elem.addEventListener("click", this.handleClick, true);
    }
    addListeners(input) {
        try {
            input.addEventListener("mousemove", this.onMouseMove, true);
            input.addEventListener("keydown", this.handleKeydown, true);
        }
        catch (e) {
            logError(e);
        }
    }
    removeListeners(input) {
        try {
            input.removeEventListener("mousemove", this.onMouseMove, true);
            input.removeEventListener("keydown", this.handleKeydown, true);
        }
        catch (e) {
            logError(e);
        }
    }
    setNoKeyboard(enable) {
        this.noKeyboard = enable;
    }
    onMouseMove(e) {
        e.target.style.cursor = this.hasZIconOn(e.target, e) ? "pointer" : "text";
    }
    handleClick(e) {
        try {
            if (!e.isTrusted || !zicon.loggedIn) {
                return;
            }
            bgApi.siteFrame.closeSiteFrame();
            bgApi.cardFrame.closeCardFrame();
            const input = csutil.dom.getEventTargetInput(e);
            if (!input) {
                return;
            }
            if (csutil.input.typeOf(input) != InputType.PASSWORD && this.isAddressField(e)) {
                external.clickedAddressIcon(e);
                return;
            }
            if (this.isCardField(e)) {
                external.clickedCardIcon(e);
                return;
            }
            if (!input[zicon.adder.LOGIN_ICON]) {
                this.handleCardAddressClick(e);
                return;
            }
            const inputSet = zicon.adder.inputSet;
            if (inputSet.has(input)) {
                this.clickedZIcon(input, e);
                return;
            }
            const elements = csutil.dom.getElementsFromPoint({ x: e.clientX, y: e.clientY });
            const reqElement = elements.find(x => inputSet.has(x));
            if (!reqElement) {
                return;
            }
            this.clickedZIcon(reqElement, e);
        }
        catch (e) {
            logError(e);
        }
    }
    handleCardAddressClick(e) {
        try {
            if (this.isCardField(e)) {
                external.clickedCardIcon(e);
                return true;
            }
            if (this.isAddressField(e)) {
                external.clickedAddressIcon(e);
                return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async clickedZIcon(input, e) {
        try {
            if (!this.hasZIconOn(input, e)) {
                return;
            }
            this.showSiteFrame({ x: e.clientX, y: e.clientY });
        }
        catch (e) {
            logError(e);
        }
    }
    isCardField(event) {
        const elm = event.target;
        if ((elm.hasAttribute("data-zvault-cc") || elm.getAttribute("data-zvault-cc-iframe-enabled") == "true") && this.hasZIconOn(elm, event)) {
            return true;
        }
        return false;
    }
    isAddressField(event) {
        const elm = event.target;
        if ((elm.hasAttribute("data-zvault-address") || elm.hasAttribute("data-zvault-address-iframe")) && this.hasZIconOn(elm, event)) {
            return true;
        }
        return false;
    }
    hasZIconOn(input, e) {
        try {
            const boundary = input.getBoundingClientRect();
            const x = e.clientX;
            const rangeEnd = boundary.right - input[zicon.adder.iconSubtractPixel];
            const rangeStart = rangeEnd - zicon.adder.ICON_SPACE;
            const isInRange = (x >= rangeStart) && (x <= rangeEnd);
            return isInRange;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    handleKeydown(e) {
        try {
            if (this.noKeyboard) {
                return;
            }
            const isShortcut = (e.ctrlKey || e.metaKey) && e.key == " ";
            if (!isShortcut) {
                return;
            }
            if (!(e.target instanceof HTMLInputElement)) {
                return;
            }
            const input = e.target;
            const rect = input.getBoundingClientRect();
            this.showSiteFrame({ x: rect.right - input[zicon.adder.iconSubtractPixel] - 15, y: rect.y + (rect.height / 2) });
        }
        catch (e) {
            logError(e);
        }
    }
    showSiteFrame(point) {
        try {
            if (!zicon.unlocked) {
                util.saveClickLocation(point);
                brApi.runtime.sendMsgNoReply({ fn: "openSidePanel" });
                return;
            }
            util.showSiteFrame({ point });
        }
        catch (e) {
            logError(e);
        }
    }
}
