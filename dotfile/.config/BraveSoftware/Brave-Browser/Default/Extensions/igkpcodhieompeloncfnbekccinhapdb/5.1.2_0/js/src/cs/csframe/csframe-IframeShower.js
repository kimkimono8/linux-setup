import { TabStorageKeys } from "../../service/storage/constants/TabStorageKeys.js";
class ShowInput {
    frame;
    shownDbKey;
    animateRight;
    constructor(frame, shownDbKey, animateRight) {
        this.frame = frame;
        this.shownDbKey = shownDbKey;
        this.animateRight = animateRight;
    }
}
class IframeShower {
    newShowInput({ frame = null, animateRight = false, shownDbKey = "", } = {}) {
        return new ShowInput(frame, shownDbKey, animateRight);
    }
    async show(input) {
        try {
            if (input.shownDbKey) {
                await ztabStorage.save(input.shownDbKey, true);
            }
            this.attachFrame(input.frame);
            if (input.animateRight) {
                await js.time.delay(0.1);
                js.dom.setStyleImportant(input.frame, { right: "20px" });
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async showSiteFrame(input, { width = 0, height = 0 } = {}) {
        try {
            const frame = input.frame;
            let { x = 0, y = 0 } = await ztabStorage.load(TabStorageKeys.ZICON_CLICK_LOCATION);
            if (document.activeElement instanceof HTMLIFrameElement) {
                const rect = document.activeElement.getBoundingClientRect();
                x += rect.x;
                y += rect.y;
            }
            let arrow = "";
            let top = 0;
            let left = 0;
            if (y + 10 + height > document.documentElement.clientHeight) {
                top = Math.max(y - 10 - height, 0);
                frame.style.boxShadow = "rgba(0, 0, 0, 0.3) 0px -17px 20px";
                arrow = "bottom";
            }
            else {
                top = y + 10;
                frame.style.boxShadow = "rgba(0, 0, 0, 0.3) 0px 17px 17px";
                arrow = "top";
            }
            if (x - 15 + width > document.documentElement.clientWidth) {
                left = x - width + 15;
                arrow += "-right";
            }
            else {
                left = x - 15;
                arrow += "-left";
            }
            js.dom.setStyleImportant(frame, {
                top: top + "px",
                left: left + "px",
                bottom: "unset",
                right: "unset",
            });
            iframeShower.show(iframeShower.newShowInput({ frame }));
            await ztabStorage.save(TabStorageKeys.SITE_FRAME_ARROW_CLASS, arrow);
        }
        catch (e) {
            logError(e);
        }
    }
    attachFrame(frame) {
        const div = document.createElement("div");
        const shadow = div.attachShadow({ mode: "closed" });
        shadow.append(frame);
        div.id = frame.id;
        div.setAttribute("style", "position: fixed !important;" +
            "opacity: 100 !important;" +
            "z-index: " + Date.now() + " !important;" +
            "display: block !important;");
        document.documentElement.append(div);
    }
}
export const iframeShower = new IframeShower();
