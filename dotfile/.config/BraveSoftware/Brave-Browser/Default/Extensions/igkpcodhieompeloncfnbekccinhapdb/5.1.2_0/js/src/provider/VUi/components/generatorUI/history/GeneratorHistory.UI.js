import { AlertUI } from "../../../../../common/common.js";
import { VI18N } from "../../../../../service/vt/VI18n.js";
import { GeneratorHistoryData } from "./GeneratorHistory.Data.js";
import { GeneratorHistoryElem } from "./GeneratorHIstory.Elem.js";
import { GeneratorHistoryListCreatorImpl } from "./GeneratorHistoryListCreator.js";
export class GeneratorHistoryUIImpl {
    gg;
    PP_GENERATOR_HISTORY_SHOW_INFO = "PP_GENERATOR_HISTORY_SHOW_INFO";
    PLUS_VALID_SHOW_TIME = 2 * 60 * 1000;
    elem;
    data = new GeneratorHistoryData();
    listCreator;
    restore = true;
    constructor(gg) {
        this.gg = gg;
        this.elem = new GeneratorHistoryElem(this.gg);
        this.listCreator = new GeneratorHistoryListCreatorImpl(this.gg);
    }
    async showUI() {
        try {
            await this.data.init();
            this.elem.init();
            this.addListeners();
            this.initHistoryList();
            const container = js.selector.select("#generator_history_div");
            js.dom.setContent(container, this.elem.container);
            container.style.right = "0px";
            await zsessionStorage.save(this.PP_GENERATOR_HISTORY_SHOW_INFO, { validUpto: Date.now() + this.PLUS_VALID_SHOW_TIME });
            VUI.addSlimScroll(this.elem.historyList);
        }
        catch (e) {
            logError(e);
        }
    }
    async restoreUI() {
        try {
            if (!this.restore) {
                return;
            }
            const showInfo = await zsessionStorage.load(this.PP_GENERATOR_HISTORY_SHOW_INFO, { validUpto: 0 });
            if (!(showInfo?.validUpto > Date.now())) {
                return;
            }
            await this.showUI();
        }
        catch (e) {
            logError(e);
        }
    }
    disableRestore() {
        try {
            this.restore = false;
        }
        catch (e) {
            logError(e);
        }
    }
    addListeners() {
        try {
            this.elem.closeElem.addEventListener("click", () => this.onClose());
            this.elem.clearElem.addEventListener("click", () => this.onClear());
        }
        catch (e) {
            logError(e);
        }
    }
    initHistoryList() {
        try {
            if (this.data.history.length == 0) {
                this.showEmptyHistory();
                return;
            }
            js.dom.setContent(this.elem.historyList, this.listCreator.getHistoryList());
        }
        catch (e) {
            logError(e);
        }
    }
    showEmptyHistory() {
        try {
            js.dom.clearContent(this.elem.historyList);
            js.dom.hide(this.elem.historyList);
            js.dom.show(this.elem.emptyUIElem);
            js.dom.hide(this.elem.clearElem);
        }
        catch (e) {
            logError(e);
        }
    }
    async onClose() {
        try {
            this.elem.container.parentElement.style.right = "-450px";
            await zsessionStorage.save(this.PP_GENERATOR_HISTORY_SHOW_INFO, { validUpto: 0 });
        }
        catch (e) {
            logError(e);
        }
    }
    async onClear() {
        try {
            const confirmed = await AlertUI.inst.createAlert()
                .title(i18n(VI18N.ASK_CLEAR_HISTORY))
                .addButton("confirm", AlertUI.inst.createButton().text(i18n(VI18N.CLEAR)).value(true).build())
                .addButton("cancel", AlertUI.inst.createButton().text(i18n(VI18N.CANCEL)).value(false).build())
                .dangerMode(true)
                .show();
            if (!confirmed) {
                return;
            }
            await bgApi.generator.history.clear();
            await zsessionStorage.save(this.PP_GENERATOR_HISTORY_SHOW_INFO, { validUpto: 0 });
            this.showEmptyHistory();
        }
        catch (e) {
            logError(e);
        }
    }
}
