import { zerror } from "../enum/zerror.js";
import { setGlobal } from "../global/global.js";
import { globalNodeData } from "./globalNodeData.js";
class GlobalDomListener {
    listenerObjMap = new Map();
    init() {
        const p = document.documentElement;
        p.addEventListener("focusin", e => this.callListener(e, "on_focus", globalNodeData.dataType.FOCUS));
        p.addEventListener("focusout", e => this.callListener(e, "on_blur", globalNodeData.dataType.BLUR));
        p.addEventListener("click", e => this.callListener(e, "on_click", globalNodeData.dataType.CLICK));
        p.addEventListener("input", e => this.callListener(e, "on_input", globalNodeData.dataType.INPUT));
        p.addEventListener("change", e => this.callListener(e, "on_change", globalNodeData.dataType.CHANGE));
        p.addEventListener("keydown", e => this.callListener(e, "on_keydown", globalNodeData.dataType.KEYDOWN));
        p.addEventListener("keypress", e => this.callListener(e, "on_keypress", globalNodeData.dataType.KEYPRESS));
        p.addEventListener("keyup", e => this.keyuped(e));
        p.addEventListener("copy", e => this.callListener(e, "on_copy", globalNodeData.dataType.COPY));
        p.addEventListener("paste", e => this.callListener(e, "on_paste", globalNodeData.dataType.PASTE));
    }
    register(listenerName, listenerObj) {
        this.listenerObjMap.set(listenerName, listenerObj);
    }
    callListener(e, dataKey, eventDataType) {
        const target = e.target.closest("[data-" + dataKey + "]");
        if (!target || !target.dataset[dataKey]) {
            return;
        }
        const listenerKeyString = target.dataset[dataKey];
        const [listenerObjName, listenerFnName] = listenerKeyString.split(".");
        const finalListenerName = this.getListenerObjName(target, listenerObjName);
        const listenerObj = this.listenerObjMap.get(finalListenerName);
        if (!listenerObj || !listenerObj[listenerFnName]) {
            throw new Error(zerror.NOT_FOUND + " " + listenerKeyString);
        }
        const eventData = globalNodeData.getData(target, globalNodeData.dataType[eventDataType]);
        const nodeData = globalNodeData.getNodeData(target);
        listenerObj[listenerFnName].call(listenerObj, e, eventData, nodeData);
    }
    getListenerObjName(target, inputName) {
        try {
            const requireNoSubstitution = !inputName.startsWith("$");
            if (requireNoSubstitution) {
                return inputName;
            }
            const dataParent = js.selector.closest(target, "[data-on_parent]");
            const listenerName = dataParent.dataset.on_parent;
            return listenerName;
        }
        catch (e) {
            logError(e);
            return inputName;
        }
    }
    keyuped(e) {
        switch (e.key) {
            case "Enter":
                this.callListener(e, "on_enter", globalNodeData.dataType.ENTER);
                break;
            case "Escape":
                this.callListener(e, "on_escape", globalNodeData.dataType.ESCAPE);
                break;
            default:
                this.callListener(e, "on_keyup", globalNodeData.dataType.KEYUP);
                break;
        }
    }
}
export const globalDomListener = new GlobalDomListener();
setGlobal("globalDomListener", globalDomListener);
