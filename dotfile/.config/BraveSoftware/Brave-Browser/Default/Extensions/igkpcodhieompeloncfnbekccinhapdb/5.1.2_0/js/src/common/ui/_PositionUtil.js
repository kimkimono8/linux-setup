import { UIUtil1 as UIUtil2 } from "../../../common/ui/ui_util.js";
export class _PositionUtil {
    static positionMoreActions(moreActionselem, targetElem) {
        const SPACE = 10;
        let innerElem = moreActionselem.firstElementChild;
        if (innerElem.classList.contains("slimScrollDiv")) {
            innerElem = innerElem.firstElementChild;
            $(innerElem).slimScroll({ destroy: true });
        }
        innerElem.style.height = "max-content";
        innerElem.style.overflowY = "hidden";
        const rect = js.dom.getContentRect(moreActionselem);
        const targetElemRect = targetElem.getBoundingClientRect();
        let left = targetElemRect.right - rect.width + 2;
        let top = targetElemRect.bottom + SPACE;
        let height = rect.height;
        let arrow = "top";
        let width = rect.width;
        if (rect.height + top > document.documentElement.clientHeight) {
            top = targetElemRect.top - rect.height - SPACE;
            arrow = "bottom";
        }
        if (top < 0) {
            const availableSpaceBottom = document.documentElement.clientHeight - targetElemRect.bottom - SPACE;
            const availableSpaceTop = targetElemRect.top - SPACE;
            if (availableSpaceBottom > availableSpaceTop) {
                arrow = "top";
                top = targetElemRect.bottom + SPACE;
                height = availableSpaceBottom - 15;
            }
            else {
                arrow = "bottom";
                top = targetElemRect.top - SPACE - availableSpaceTop + 15;
                height = availableSpaceTop - 15;
            }
            innerElem.style.overflowY = "scroll";
        }
        if (left < 0) {
            left = SPACE;
            width = Math.min(rect.width, document.documentElement.clientWidth) - (2 * SPACE);
            innerElem.style.overflowX = "scroll";
        }
        height = Math.ceil(height);
        width = Math.ceil(width);
        innerElem.style.height = height + "px";
        moreActionselem.style.top = top + "px";
        moreActionselem.style.left = left + "px";
        targetElem.dataset.arrow = arrow;
        moreActionselem.classList.add("zv-dropdown-popup");
        moreActionselem.classList.remove("zv-dropdown-popup-arrow-top", "zv-dropdown-popup-arrow-bottom");
        moreActionselem.classList.add("zv-dropdown-popup-arrow-" + arrow);
        UIUtil2.inst.slimScroll(innerElem, height, width);
    }
    static newPositionInput() {
        return new PositionInput();
    }
    static positionElem(input) {
        return new PopupPositioner().positionElem(input);
    }
}
class PositionAlignment {
    static VERTICAL = {
        TOP: "TOP",
        BOTTOM: "BOTTOM"
    };
    static HORIZONTAL = {
        LEFT: "LEFT",
        RIGHT: "RIGHT"
    };
    VERTICAL = PositionAlignment.VERTICAL;
    HORIZONTAL = PositionAlignment.HORIZONTAL;
    vertical = this.VERTICAL.TOP;
    horizontal = this.HORIZONTAL.LEFT;
    static getInstance(vertical, horizontal) {
        const a = new PositionAlignment();
        a.vertical = vertical;
        a.horizontal = horizontal;
        return a;
    }
    constructor() { }
    verticalEq(value) {
        return this.vertical == value;
    }
    horizontalEq(value) {
        return this.horizontal == value;
    }
}
class PositionInput {
    target = {
        elem: null,
        x: 0,
        y: 0
    };
    containerId = "";
    popupElem = null;
    alignLeft = true;
    adjust = {
        left_x: 0,
        right_x: 0,
    };
}
class PopupPositioner {
    input = null;
    x = 0;
    y = 0;
    containerElem = null;
    popupElem = null;
    popupRect = null;
    topResp = {
        top: 0,
        topAligned: false,
        needScroll: false,
        scrollHeight: 0
    };
    leftResp = {
        left: 0,
        leftAligned: false,
        needScroll: false,
        scrollWidth: 0
    };
    positionElem(input) {
        this.input = input;
        this.initXY();
        this.initPopupElem();
        this.initContainer();
        this.initLeft();
        this.initTop();
        this.positionContainer();
        return this.getResult();
    }
    initXY() {
        const target = this.input.target;
        if (!target.elem) {
            this.x = target.x;
            this.y = target.y;
            return;
        }
        const elem = js.selector.select(target.elem);
        const elemRect = elem.getBoundingClientRect();
        this.x = elemRect.x + elem.offsetWidth / 2;
        this.y = elemRect.y + elem.offsetHeight / 2;
    }
    initContainer() {
        const containerId = this.input.containerId;
        if (!containerId) {
            this.initNewContainer(containerId);
            return;
        }
        const curContainerElem = document.querySelector("#" + containerId);
        if (!curContainerElem) {
            this.initNewContainer(containerId);
            return;
        }
        const contentElem = document.createElement("div");
        js.dom.setContent(curContainerElem, contentElem);
        js.dom.setContent(contentElem, this.popupElem);
        this.containerElem = curContainerElem;
    }
    initNewContainer(containerId) {
        const templateHtml = "#more_options_position_container_template";
        const containerElem = UIUtil.createElem({ template: templateHtml });
        containerElem.id = containerId;
        document.body.append(containerElem);
        this.containerElem = containerElem;
        js.dom.setContent(this.containerElem.firstElementChild, this.popupElem);
    }
    initPopupElem() {
        this.popupElem = js.selector.select(this.input.popupElem);
        document.body.append(this.popupElem);
        this.popupRect = this.popupElem.getBoundingClientRect();
    }
    initLeft() {
        if (this.input.alignLeft) {
            const aligned = this.alignLeftLeft() || this.alignLeftRight();
            if (aligned) {
                return;
            }
        }
        if (!this.input.alignLeft) {
            const aligned = this.alignLeftRight() || this.alignLeftLeft();
            if (aligned) {
                return;
            }
        }
        const resp = this.leftResp;
        const popupRect = this.popupRect;
        const x = this.x;
        const right = popupRect.width + x;
        const screenWidth = document.documentElement.clientWidth;
        if (right <= screenWidth) {
            resp.left = x;
            resp.leftAligned = true;
            return;
        }
        const left = x - popupRect.width;
        if (left >= 0) {
            resp.left = left;
            resp.leftAligned = false;
            return;
        }
        resp.needScroll = true;
        const MIN_MARGIN_SPACE = 10;
        const rightHasMoreSpace = (screenWidth - x) > x;
        if (rightHasMoreSpace) {
            resp.left = x;
            resp.leftAligned = true;
            resp.scrollWidth = screenWidth - x - MIN_MARGIN_SPACE;
            return;
        }
        resp.left = MIN_MARGIN_SPACE;
        resp.scrollWidth = x - MIN_MARGIN_SPACE;
        resp.leftAligned = false;
    }
    alignLeftLeft() {
        const right = this.popupRect.width + this.x;
        const screenWidth = document.documentElement.clientWidth;
        if (right > screenWidth) {
            return false;
        }
        this.leftResp.left = this.x;
        this.leftResp.leftAligned = true;
        return true;
    }
    alignLeftRight() {
        const left = this.x - this.popupRect.width;
        if (left <= 0) {
            return false;
        }
        this.leftResp.left = left;
        this.leftResp.leftAligned = false;
        return true;
    }
    initTop() {
        const resp = this.topResp;
        const popupRect = this.popupRect;
        const y = this.y;
        const bottom = popupRect.height + y;
        if (bottom <= document.documentElement.clientHeight) {
            resp.top = y;
            resp.topAligned = true;
            return;
        }
        const top = y - popupRect.height;
        if (top >= 0) {
            resp.top = y - popupRect.height;
            resp.topAligned = false;
            return;
        }
        resp.needScroll = true;
        const MIN_MARGIN_SPACE = 10;
        const bottomHasMoreSpace = (document.documentElement.clientHeight - y) > y;
        if (bottomHasMoreSpace) {
            resp.top = y;
            resp.scrollHeight = document.documentElement.clientHeight - y - MIN_MARGIN_SPACE;
            resp.topAligned = true;
            return;
        }
        resp.top = MIN_MARGIN_SPACE;
        resp.scrollHeight = y - MIN_MARGIN_SPACE;
        resp.topAligned = false;
    }
    positionContainer() {
        const containerElem = this.containerElem;
        const popupRect = this.popupRect;
        const topResp = this.topResp;
        const leftResp = this.leftResp;
        containerElem.style.top = topResp.top + "px";
        containerElem.style.left = leftResp.left + this.getAdjustLeft() + "px";
        if (topResp.needScroll || leftResp.needScroll) {
            const height = topResp.needScroll ? topResp.scrollHeight : popupRect.height;
            const width = leftResp.needScroll ? leftResp.scrollWidth : popupRect.width;
            UIUtil.addSlimScroll(containerElem.firstElementChild, { height, width });
        }
        document.body.append(containerElem);
    }
    getAdjustLeft() {
        return this.leftResp.leftAligned ? this.input.adjust.left_x : this.input.adjust.right_x;
    }
    getResult() {
        const verticalAlignment = this.topResp.topAligned ? PositionAlignment.VERTICAL.TOP : PositionAlignment.VERTICAL.BOTTOM;
        const horizontalAlignment = this.leftResp.leftAligned ? PositionAlignment.HORIZONTAL.LEFT : PositionAlignment.HORIZONTAL.RIGHT;
        const alignment = PositionAlignment.getInstance(verticalAlignment, horizontalAlignment);
        return {
            alignment
        };
    }
}
