const DATA_CONTENT_KEY = "tooltip_content";
const ICON_TOOLTIP_DATA_KEY = "icon_tooltip";
export class TooltipUtilImpl {
    tooltipElem = null;
    actionMsgElem = null;
    tooltipArrowElem = null;
    curTarget = null;
    showArrowBottom = false;
    actionTimeout = -1;
    init() {
        this.tooltipElem = js.selector.select("#tooltip_elem");
        this.actionMsgElem = js.selector.select("#elem_msg_action");
        this.tooltipArrowElem = js.selector.select("#tooltip_arrow");
        document.addEventListener("mouseover", this.handleMouseOver.bind(this));
        document.addEventListener("click", this.handleMouseClick.bind(this));
        this.actionMsgElem.addEventListener("mouseleave", this.handleActionMsgMouseLeave.bind(this));
    }
    showActionMsg(e, message, seconds = 1.5) {
        const SPACE = 10;
        const rect = {
            left: e.clientX - SPACE,
            right: e.clientX + SPACE,
            top: e.clientY - SPACE,
            bottom: e.clientY + SPACE,
            width: 2 * SPACE,
            height: 2 * SPACE
        };
        this.showMessageFn(rect, message, seconds);
    }
    showElemMsg(elem, message, seconds = 1.5) {
        this.showMessageFn(elem.getBoundingClientRect(), message, seconds);
    }
    showMessageFn(elemRect, message, seconds = 1.5) {
        clearTimeout(this.actionTimeout);
        this.actionMsgElem.style.opacity = "0";
        this.actionMsgElem.textContent = message;
        this.showContentElem(this.actionMsgElem, elemRect);
        setTimeout(() => window.requestAnimationFrame(() => this.actionMsgElem.style.opacity = "1"), 200);
        this.actionTimeout = setTimeout(() => this.hideActionMsg(), (seconds + 0.5) * 1000);
    }
    handleMouseOver(e) {
        const target = e.target;
        if (this.curTarget && (target == this.curTarget || this.curTarget.contains(target))) {
            return;
        }
        const showTooltip = this.checkShowTooltip(target);
        if (!showTooltip) {
            this.hideTooltip();
            return;
        }
        this.curTarget = target;
        this.tooltipElem.textContent = this.getTooltipContent(target);
        this.tooltipElem.style.opacity = "0";
        this.tooltipArrowElem.style.opacity = "0";
        this.showContentElem(this.tooltipElem, target.getBoundingClientRect());
        if (Boolean(target.dataset[ICON_TOOLTIP_DATA_KEY])) {
            this.showTooltipArrow(target.getBoundingClientRect());
        }
        setTimeout(() => window.requestAnimationFrame(() => {
            this.tooltipElem.style.opacity = "1";
            this.tooltipArrowElem.style.opacity = "1";
        }), 500);
    }
    showContentElem(contentElem, elemRect) {
        js.dom.hideOld(this.tooltipArrowElem);
        const contentRect = js.dom.getContentRect(contentElem);
        const elemMid = elemRect.left + (elemRect.width / 2);
        let left = elemMid - (contentRect.width / 2);
        if (left < 0) {
            left = 0;
        }
        else if (left + contentRect.width > document.documentElement.clientWidth) {
            left = document.documentElement.clientWidth - contentRect.width;
        }
        contentElem.style.left = left + "px";
        this.showArrowBottom = false;
        const TOP_SPACE = 16;
        let top = elemRect.bottom + TOP_SPACE;
        if (top + contentRect.height > document.documentElement.clientHeight) {
            top = elemRect.top - TOP_SPACE - contentRect.height;
            this.showArrowBottom = true;
        }
        contentElem.style.top = top + "px";
        js.dom.showOld(contentElem);
    }
    showTooltipArrow(elem_rect) {
        const ARROW_HALF_WIDTH = 7;
        const ARROW_HEIGHT = 8;
        const ARROW_SEP_SPACE = 8;
        let borderTop = "0px";
        let borderBottom = "8px";
        let top = elem_rect.bottom + ARROW_SEP_SPACE;
        if (this.showArrowBottom) {
            top = elem_rect.top - ARROW_SEP_SPACE - ARROW_HEIGHT;
            borderTop = "8px";
            borderBottom = "0px";
        }
        this.tooltipArrowElem.style.borderTopWidth = borderTop;
        this.tooltipArrowElem.style.borderBottomWidth = borderBottom;
        this.tooltipArrowElem.style.left = elem_rect.left + (elem_rect.width / 2) - ARROW_HALF_WIDTH + "px";
        this.tooltipArrowElem.style.top = top + "px";
        js.dom.showOld(this.tooltipArrowElem);
    }
    checkShowTooltip(target) {
        if (!target.dataset[DATA_CONTENT_KEY]) {
            return false;
        }
        if (target.dataset[ICON_TOOLTIP_DATA_KEY]) {
            return true;
        }
        if (js.dom.hasEllipsis(target)) {
            return true;
        }
        return false;
    }
    getTooltipContent(elem) {
        const tooltipText = elem.dataset[DATA_CONTENT_KEY];
        return tooltipText.startsWith("i18n:") ? i18n(tooltipText.slice(5)) : tooltipText;
    }
    hideTooltip() {
        js.dom.hideOld(this.tooltipArrowElem, this.tooltipElem);
        this.curTarget = null;
    }
    handleMouseClick() {
        this.hideTooltip();
    }
    handleActionMsgMouseLeave() {
        this.actionMsgElem.style.opacity = "0";
        setTimeout(() => this.hideActionMsg(), 500);
    }
    hideActionMsg() {
        this.actionMsgElem.style.display = "none";
    }
}
