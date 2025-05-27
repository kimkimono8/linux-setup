import { Theme } from "../../common/ui/Theme.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
export class AdFrameTheme extends Theme {
    static instance = null;
    constructor() { super(); }
    arrow = "";
    static get inst() {
        if (!this.instance) {
            this.instance = new AdFrameTheme();
            this.instance.init();
        }
        return this.instance;
    }
    async setArrow() {
        this.arrow = this.arrow == "" ? await ztabStorage.load(TabStorageKeys.SITE_FRAME_ARROW_CLASS) : this.arrow;
        const marginClass = (this.arrow != null && this.arrow.includes("top")) ? "m-t-10" : "m-b-10";
        document.body.classList.add(marginClass);
        document.getElementById('arrow').className = "zvd-panel-arrow-" + this.arrow;
    }
}
