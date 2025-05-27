import { globalNodeData } from "../../../../../../common/ui/globalNodeData.js";
import { VI18N } from "../../../../../service/vt/VI18n.js";
export class GeneratorHistoryListCreatorImpl {
    gg;
    constructor(gg) {
        this.gg = gg;
    }
    getHistoryList() {
        try {
            const historyEntries = this.gg.generator.history.data.history;
            const fragment = new DocumentFragment();
            const template = js.selector.select("#elem_list_history_generator");
            for (let i = historyEntries.length - 1; i >= 0; i--) {
                fragment.append(this.getHistoryListElem(template, historyEntries[i], i));
            }
            return fragment;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    setOnUseListener(listener) {
        try {
            this.onUseListener = listener;
        }
        catch (e) {
            logError(e);
        }
    }
    onUseListener(password) { password; }
    getHistoryListElem(template, history, index) {
        try {
            const elem = UIUtil.createElem({ template: template });
            const password = history.password;
            js.selector.selectFrom(elem, "h6").append(VUI.password.getColoredPassword(password));
            js.dom.setChildText(elem, "p", js.date.formatDateMonDYYYYHHMMAM(history.time));
            elem.addEventListener("click", e => this.onElemCopy(index, e));
            js.selector.selectFrom(elem, `[data-on="copy"]`).addEventListener("click", e => this.onCopy(index, e));
            this.addSaveListener(elem, index);
            globalNodeData.setNodeData(elem, { index });
            return elem;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    addSaveListener(elem, index) {
        try {
            const saveElem = js.selector.selectFrom(elem, `[data-on="save"]`);
            if (saveElem) {
                saveElem.addEventListener?.("click", () => this.onSave(index));
                return;
            }
            const useElem = js.selector.selectFrom(elem, `[data-on="use"]`);
            if (useElem) {
                useElem.addEventListener("click", () => this.onUseListener(this.gg.generator.history.data.history[index].password));
                return;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    onElemCopy(index, e) {
        try {
            const isOnList = Boolean(js.selector.closest(e.target, `.password-list-icons`));
            if (isOnList) {
                return;
            }
            this.onCopy(index, e);
        }
        catch (e) {
            logError(e);
        }
    }
    async onCopy(index, e) {
        try {
            const password = this.gg.generator.history.data.history[index].password;
            await bgApi.other.copyToClipboard(password, { noAutoClear: true });
            VUI.tooltip.showActionMsg(e, i18n(VI18N.COPIED));
        }
        catch (e) {
            logError(e);
        }
    }
    async onSave(index) {
        try {
            const password = this.gg.generator.history.data.history[index].password;
            await bgApi.ztab.saveGeneratedPassword(password);
            await js.dom.closeWindow();
        }
        catch (e) {
            logError(e);
        }
    }
}
