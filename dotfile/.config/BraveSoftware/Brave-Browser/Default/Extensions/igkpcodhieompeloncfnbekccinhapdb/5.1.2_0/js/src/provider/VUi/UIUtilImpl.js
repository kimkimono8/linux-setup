import { VaultCSS } from "../../service/VUi/VaultCSS.js";
import { customElemUtil, keyboardUtil, templateUtil } from "./Context.js";
import { ListSelectElementImpl } from "./elements/ListSelectElem.js";
import { InputUtilImpl } from "./InputUtil.js";
import { NotificationUtilImpl } from "./NotificationUtil.js";
import { TooltipUtilImpl } from "./TooltipUtil.js";
import { UIComponentsImpl } from "./UIComponents.js";
import { UIPasswordUtilImpl } from "./UIPasswordUtil.js";
export class UIUtilImpl {
    keyboard = keyboardUtil;
    input = new InputUtilImpl();
    password = new UIPasswordUtilImpl();
    tooltip = new TooltipUtilImpl();
    notification = new NotificationUtilImpl();
    components = new UIComponentsImpl();
    init() {
        try {
            this.tooltip.init();
            this.notification.init();
            customElemUtil.init();
        }
        catch (e) {
            logError(e);
        }
    }
    createElem(params) {
        return templateUtil.create(params);
    }
    addI18n(elem) {
        return templateUtil.addI18n(elem);
    }
    addSlimScroll(elem, options = {}) {
        const htmlElem = js.selector.select(elem);
        const reqOption = {
            height: "100%",
            width: "100%",
            wheelStep: 10,
            touchScrollStep: 75,
        };
        if (options.clientWidthHeight) {
            reqOption.height = htmlElem.clientHeight + "px";
            reqOption.width = htmlElem.clientWidth + "px";
        }
        if (options.height) {
            const reqHeight = typeof options.height == "string" ? options.height : Math.ceil(options.height) + "px";
            reqOption.height = reqHeight;
        }
        if (options.width) {
            const reqWidth = typeof options.width == "string" ? options.width : Math.ceil(options.width) + "px";
            reqOption.width = reqWidth;
        }
        $(htmlElem).slimScroll(reqOption);
    }
    show(...elemList) {
        try {
            for (let elem of elemList) {
                js.selector.select(elem).classList.remove(VaultCSS.DIS_HIDE);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    hide(...elemList) {
        try {
            for (let elem of elemList) {
                js.selector.select(elem).classList.add(VaultCSS.DIS_HIDE);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    setLoadingContent(elem) {
        js.dom.setContent(elem, document.createElement("vault-loading"));
    }
    createListSelectElem(params) {
        return ListSelectElementImpl.createListSelect(params);
    }
    highlightNav(params) {
        try {
            this.removeHighlight(params);
            params.targetElem.classList.add(params.highlightClass);
        }
        catch (e) {
            logError(e);
        }
    }
    removeHighlight(params) {
        try {
            const activeElem = js.selector.select("." + params.highlightClass);
            if (!activeElem) {
                return;
            }
            activeElem.classList.remove(params.highlightClass);
        }
        catch (e) {
            logError(e);
        }
    }
}
