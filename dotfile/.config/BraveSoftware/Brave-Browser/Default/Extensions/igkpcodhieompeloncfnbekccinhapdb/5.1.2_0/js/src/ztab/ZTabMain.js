import { vuiMain } from "../provider/VUi/main.js";
vuiMain();
import { ZTab } from "../../ztab/ZTab.js";
class ZTabMain {
    async main() {
        const ztab = new ZTab();
        await ztab.init();
        this.devMain();
    }
    async devMain() {
    }
}
const ztMain = new ZTabMain();
ztMain.main();
