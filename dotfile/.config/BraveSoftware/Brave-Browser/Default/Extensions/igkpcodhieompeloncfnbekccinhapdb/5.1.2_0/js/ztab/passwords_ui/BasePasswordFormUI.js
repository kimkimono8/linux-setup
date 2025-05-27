import { UIParent } from "../../src/uiUtil/ui/UIParent.js";
export class BasePasswordFormUI extends UIParent {
    listener = null;
    showContainer() {
        const parent = this.getBasePasswordsUI();
        const container = parent.select(this.containerSelector);
        js.dom.setContent(container, this.elem);
        container.style.right = "0px";
        parent.show(this.overlaySelector);
    }
    async hideForm() {
        const parent = this.getBasePasswordsUI();
        const container = parent.select(this.containerSelector);
        parent.hide(this.overlaySelector);
        container.style.right = "-710px";
        container.textContent = "";
    }
}
