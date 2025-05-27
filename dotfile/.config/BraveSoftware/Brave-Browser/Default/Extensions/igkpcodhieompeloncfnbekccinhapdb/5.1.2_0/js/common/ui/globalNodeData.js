import { setGlobal } from "../global/global.js";
export class GlobalNodeData {
    static instance = null;
    static inst() {
        return this.instance || (this.instance = new GlobalNodeData());
    }
    dataType = {
        NODE: "NODE",
        FOCUS: "FOCUS",
        BLUR: "BLUR",
        CLICK: "CLICK",
        INPUT: "INPUT",
        KEYDOWN: "KEYDOWN",
        KEYUP: "KEYUP",
        KEYPRESS: "KEYPRESS",
        ENTER: "ENTER",
        CHANGE: "CHANGE",
        ESCAPE: "ESCAPE",
        COPY: "COPY",
        PASTE: "PASTE"
    };
    keys = {
        [this.dataType.NODE]: Symbol(),
        [this.dataType.FOCUS]: Symbol(),
        [this.dataType.BLUR]: Symbol(),
        [this.dataType.CLICK]: Symbol(),
        [this.dataType.INPUT]: Symbol(),
        [this.dataType.KEYDOWN]: Symbol(),
        [this.dataType.KEYUP]: Symbol(),
        [this.dataType.KEYPRESS]: Symbol(),
        [this.dataType.ENTER]: Symbol(),
        [this.dataType.CHANGE]: Symbol(),
        [this.dataType.ESCAPE]: Symbol(),
        [this.dataType.COPY]: Symbol(),
        [this.dataType.PASTE]: Symbol()
    };
    setData(node, dataType, data) {
        node[this.getKey(dataType)] = data;
    }
    getData(node, dataType) {
        return node[this.getKey(dataType)] || null;
    }
    getNodeData(node, defaultValue = null) {
        return this.getData(node, this.dataType.NODE) || defaultValue;
    }
    setNodeData(node, data) {
        return this.setData(node, this.dataType.NODE, data);
    }
    getClickData(node) {
        return this.getData(node, this.dataType.CLICK);
    }
    setClickData(node, data) {
        return this.setData(node, this.dataType.CLICK, data);
    }
    setCustomData(node, data, key) {
        node[key] = data;
    }
    getCustomData(node, key) {
        return node[key];
    }
    getKey(dataType) {
        const key = this.keys[dataType];
        if (!key) {
            throw new Error("not_found");
        }
        return key;
    }
}
export const globalNodeData = new GlobalNodeData();
setGlobal("globalNodeData", globalNodeData);
