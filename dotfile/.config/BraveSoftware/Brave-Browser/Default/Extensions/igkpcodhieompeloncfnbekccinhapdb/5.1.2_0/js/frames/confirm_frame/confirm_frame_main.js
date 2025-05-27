import { vuiMain } from "../../src/provider/VUi/main.js";
vuiMain();
import { globalDomListener } from "../../common/ui/globalDomListener.js";
import { Theme } from "../../common/ui/Theme.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
import { VtEventScopes } from "../../src/service/vt/constants/constants.js";
let confirmData = {
    secretId: "",
    frameId: 0,
    ownedDomain: "{{ownedDomain}}",
    useDomain: "{{useDomain}}",
    allowPermanent: true,
};
class BgEventListener {
    init() {
        portApi.createEventClient().init(VtEventScopes.BG, this);
    }
    settings = new BgSettingsEventHandler();
}
class BgSettingsEventHandler {
    themeChanged() {
        Theme.inst.refreshTheme();
    }
}
class ConfirmFrameUIListeners {
    clickedClose() {
        this.sendResponse(false);
    }
    clickedAllow() {
        this.sendResponse(true);
    }
    async clickedAllowPermanent() {
        bgApi.tab.allowPermanentUse(confirmData.secretId, confirmData.useDomain);
        this.sendResponse(true);
    }
    async sendResponse(allow) {
        await bgApi.tab.setConfirmUse(confirmData.frameId, allow);
        bgApi.tab.closeFrame();
    }
}
class ConfirmFrameMain {
    async main() {
        await vt.init({ logPrefix: "CONFIRM_FRAME:" });
        Theme.inst.init();
        UIUtil.init();
        globalDomListener.init();
        globalDomListener.register("cf", new ConfirmFrameUIListeners());
        const bgEventClient = new BgEventListener();
        bgEventClient.init();
        confirmData = await ztabStorage.load(TabStorageKeys.CONFIRM_USAGE_FOR, confirmData);
        this.setDescription();
        if (!confirmData.allowPermanent) {
            js.selector.select("#allow_permanently_button").remove();
        }
    }
    setDescription() {
        const descriptionElem = js.selector.select("[data-description]");
        descriptionElem.append(brApi.i18n.html("use_xs_password_on_y", this.createDomainElem(confirmData.ownedDomain), this.createDomainElem(confirmData.useDomain)));
    }
    createDomainElem(domain) {
        const elem = UIUtil.createElem({ template: "#domain_template" });
        js.dom.setText(elem, domain);
        return elem;
    }
}
const confirmFrameMain = new ConfirmFrameMain();
confirmFrameMain.main();
