import { gg } from "../GG.js";
export class BrContextMenuApiImpl {
    async create(createInfo) {
        return new Promise((res, rej) => chrome.contextMenus.create(createInfo, gg.util.createCallback(res, rej)));
    }
    async removeAll() {
        return new Promise((res, rej) => chrome.contextMenus.removeAll(gg.util.createCallback(res, rej)));
    }
    onClick(listener) {
        chrome.contextMenus.onClicked.addListener(listener);
    }
}
