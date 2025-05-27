import { gg } from "../GG.js";
export class BrLocalStorage {
    async saveAll(keyValObj) {
        return new Promise((res, rej) => chrome.storage.local.set(keyValObj, gg.util.createCallback(res, rej)));
    }
    async loadAll(keyObj) {
        return new Promise((res, rej) => chrome.storage.local.get(keyObj, gg.util.createCallback(res, rej)));
    }
    async remove(keyOrKeys) {
        return new Promise((res, rej) => chrome.storage.local.remove(keyOrKeys, gg.util.createCallback(res, rej)));
    }
    async clear() {
        return new Promise((res, rej) => chrome.storage.local.clear(gg.util.createCallback(res, rej)));
    }
}
export class BrSessionStorage {
    async saveAll(keyValObj) {
        return new Promise((res, rej) => chrome.storage.session.set(keyValObj, gg.util.createCallback(res, rej)));
    }
    async loadAll(keyObj) {
        return new Promise((res, rej) => chrome.storage.session.get(keyObj, gg.util.createCallback(res, rej)));
    }
    async remove(keyOrKeys) {
        return new Promise((res, rej) => chrome.storage.session.remove(keyOrKeys, gg.util.createCallback(res, rej)));
    }
    async clear() {
        return new Promise((res, rej) => chrome.storage.session.clear(gg.util.createCallback(res, rej)));
    }
}
