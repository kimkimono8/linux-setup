import { UIElemContainer } from "../../uiUtil/export.js";
export class MainUIElem extends UIElemContainer {
    searchElem;
    init(container) {
        this.container = container;
        this.searchElem = this.select("#search");
    }
}
