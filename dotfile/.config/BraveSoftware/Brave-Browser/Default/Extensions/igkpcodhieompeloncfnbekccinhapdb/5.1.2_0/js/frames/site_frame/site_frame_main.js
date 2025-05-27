import { vuiMain } from "../../src/provider/VUi/main.js";
vuiMain();
import { SiteFrame } from "./SiteFrame.js";
class SiteFrameMain {
    async main() {
        await new SiteFrame().init();
    }
}
new SiteFrameMain().main();
