import { ContentScript } from "../../content_scripts/ContentScript.js";
import { bgApiMain } from "../provider/bgApi/main.js";
import { vtMain } from "../provider/vt/main.js";
import { ZVGlobal } from "../uiUtil/global/ZVGlobal.js";
import { csUtilMain } from "./csutil/provider/main.js";
import { ziconMain } from "./zicon/provider/main.js";
vtMain();
bgApiMain();
csUtilMain();
ziconMain();
class CS_Main {
    async main() {
        const contentScript = new ContentScript();
        await contentScript.main();
        if (!ZVGlobal.isDevMode()) {
            console.error = console.info;
            return;
        }
        document.addEventListener("click", this.clicked.bind(this), true);
        document.addEventListener("contextmenu", this.rightClicked.bind(this), true);
        document.addEventListener("dblclick", this.doubleClicked.bind(this), true);
        document.addEventListener("focusin", this.onFocusIn.bind(this), true);
        if (!csutil.window.isTopFrame()) {
            return;
        }
        this.devMain();
    }
    async devMain() {
    }
    async onFocusIn(e) {
        if (!e.isTrusted) {
            return;
        }
    }
    async clicked(e) {
        if (!e.isTrusted) {
            return;
        }
    }
    async rightClicked(e) {
        if (!e.isTrusted) {
            return;
        }
    }
    async doubleClicked(e) {
        if (!e.isTrusted) {
            return;
        }
    }
}
const csMain = new CS_Main();
csMain.main();
