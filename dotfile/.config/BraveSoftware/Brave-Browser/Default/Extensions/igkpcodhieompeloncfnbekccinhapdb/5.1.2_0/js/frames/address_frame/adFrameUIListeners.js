import { al } from "./addressList.js";
export class AdFrameUIListeners {
    static instance = null;
    static get inst() {
        if (!this.instance) {
            this.instance = new AdFrameUIListeners();
        }
        return this.instance;
    }
    scrolledToBottom = al.scrolledToBottom.bind(al);
    addAddress = al.addAddress.bind(al);
    initSearch() {
        al.select("#search").addEventListener("input", al.search.bind(al));
        al.select('[data-name="searchClear"]').addEventListener("click", al.clearSearch.bind(al));
        al.select("#search").focus();
    }
    addScrollEndListener() {
        al.select("#password_out").addEventListener("scroll", this.scrolledToBottom);
    }
    removeScrollEndListener() {
        al.select("#password_out").removeEventListener("scroll", this.scrolledToBottom);
    }
    initAddListener(unlocked) {
        const addAddress = js.selector.select("#addAddress");
        addAddress.removeEventListener("click", this.addAddress);
        js.dom.hideOld(addAddress);
        if (unlocked) {
            addAddress.addEventListener("click", this.addAddress);
            js.dom.showOld(addAddress);
        }
    }
    overlayListener(listener) {
        js.selector.select('#more_options_overlay').addEventListener("click", listener);
    }
}
