import { ZVError } from "../../uiUtil/error/ZVError.js";
export class NotificationUtilImpl {
    DEFAULT_NOTIFICATION_SECONDS = 3;
    ERROR_NOTIFICATION_SECONDS = 5;
    INFO_NOTIFICATION_SECONDS = 4;
    notificationElem = null;
    hideTimeout = -1;
    init() {
        this.notificationElem = js.selector.select("#notification");
        this.notificationElem.addEventListener("mouseenter", () => clearTimeout(this.hideTimeout));
        this.notificationElem.addEventListener("mouseleave", () => this.mouseLeft());
        js.selector.selectFrom(this.notificationElem, "[data-close]").addEventListener("click", () => this.closeImmediately());
    }
    showSuccess(msg, seconds = this.DEFAULT_NOTIFICATION_SECONDS) {
        this.notificationElem.className = "notify clearfix notify-success";
        this.showNotification(msg + "", seconds);
    }
    showError(msg, seconds = this.ERROR_NOTIFICATION_SECONDS) {
        this.notificationElem.className = "notify clearfix notify-error";
        this.showNotification(ZVError.getUIErrorMsg(msg), seconds);
    }
    showInfo(msg, seconds = this.INFO_NOTIFICATION_SECONDS) {
        this.notificationElem.className = "notify clearfix notify-info";
        this.showNotification(ZVError.getUIErrorMsg(msg), seconds);
    }
    async showNotification(msg, seconds = 2) {
        this.closeImmediately();
        await js.dom.waitAnimationFrame();
        this.notificationElem.style.opacity = "0";
        const contentElem = js.selector.selectFrom(this.notificationElem, "[data-content]");
        js.dom.setText(contentElem, msg);
        this.notificationElem.style.display = "block";
        setTimeout(() => window.requestAnimationFrame(() => this.notificationElem.style.opacity = "1"), 0);
        this.hideTimeout = setTimeout(() => this.hideNotification(), seconds * 1000);
    }
    closeImmediately() {
        clearTimeout(this.hideTimeout);
        this.notificationElem.style.display = "none";
    }
    mouseLeft() {
        this.hideTimeout = setTimeout(() => this.hideNotification(), 0.8 * 1000);
    }
    hideNotification() {
        clearTimeout(this.hideTimeout);
        this.notificationElem.style.opacity = "0";
        this.hideTimeout = setTimeout(() => this.notificationElem.style.display = "none", 500);
    }
}
