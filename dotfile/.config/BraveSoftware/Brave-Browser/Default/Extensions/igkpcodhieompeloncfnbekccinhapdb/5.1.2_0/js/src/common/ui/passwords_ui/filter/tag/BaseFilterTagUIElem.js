import { UIElemContainer } from "../../../../../uiUtil/export.js";
export class BaseFilterTagUIElem extends UIElemContainer {
    tagUI;
    selectContainer;
    tagSelectElem;
    constructor(tagUI) {
        super();
        this.tagUI = tagUI;
    }
    init() {
        this.container = js.selector.selectFrom(this.tagUI.filterUI.elem.container, "[data-tag_container]");
        this.selectContainer = this.select("[data-tag_select_container]");
    }
    getTagModeCheckbox(value) {
        return js.selector.selectFrom(this.container, "input[name='tagMode'][value=" + value + "]");
    }
}
