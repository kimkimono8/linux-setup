import { GlobalNodeData } from "../../../common/ui/globalNodeData.js";
import { PasswordHistoryModel } from "../../../src/service/bgApi/types.js";
import { VI18N } from "../../../src/service/vt/VI18n.js";
import { PasswordHistoryCli } from "./PasswordHIstoryCli.js";
import { PasswordHistoryUI } from "./PasswordHistoryUI.js";
export class PasswordHistoryController {
    static instance = null;
    constructor() { }
    static inst() {
        return this.instance || (this.instance = new PasswordHistoryController());
    }
    ui = null;
    cli = null;
    async showPasswordHistory(secretId, e) {
        return this.showUI(secretId, e, () => this.addAllHistory());
    }
    async showColumnHistory(secretId, columnName, e) {
        return this.showUI(secretId, e, () => this.addColumnHistory(columnName));
    }
    async showUI(secretId, e, addHistoryFn) {
        this.ui = new PasswordHistoryUI();
        this.ui.init();
        this.addListeners();
        this.cli = PasswordHistoryCli.inst();
        await this.cli.init(secretId);
        await addHistoryFn();
        this.ui.showAt(e);
    }
    async addAllHistory() {
        const historyList = await this.cli.getHistory();
        if (historyList.length == 0) {
            this.ui.showEmpty();
            return;
        }
        historyList.forEach(this.addUIHistory, this);
    }
    async addColumnHistory(columnName) {
        const history = await this.cli.getColumnHistory(columnName);
        if (!history || history.history.length == 0) {
            this.ui.showEmpty();
            return;
        }
        this.addUIHistory(history);
    }
    addUIHistory(history) {
        switch (history.type) {
            case PasswordHistoryModel.TYPE.TEXT:
                this.addTextHistory(history);
                break;
            case PasswordHistoryModel.TYPE.PASSWORD:
                this.addPasswordHistory(history);
                break;
        }
    }
    addTextHistory(history) {
        this.ui.createTable(history.columnLabel);
        for (let entry of history.history) {
            this.ui.addTextRow(entry.value, entry.modifiedTime, e => this.onCopyInput(entry.value, history.columnName, e));
        }
    }
    addPasswordHistory(history) {
        this.ui.createTable(history.columnLabel);
        for (let entry of history.history) {
            this.ui.addPasswordRow(entry.modifiedTime, e => this.onCopyInput(entry.value, history.columnName, e), elem => this.onViewInput(entry.value, elem));
        }
    }
    addListeners() {
        this.ui.onCloseInput(this.onCloseInput.bind(this));
    }
    onCloseInput() {
        if (!this.ui) {
            return;
        }
        this.ui.hideUI();
    }
    async onCopyInput(value, columnName, e) {
        await this.cli.copyValue(value, columnName);
        VUI.tooltip.showActionMsg(e, i18n(VI18N.COPIED), 1);
    }
    onViewInput(value, elem) {
        let nodeData = {
            isShown: false,
            timoutId: -1
        };
        nodeData = GlobalNodeData.inst().getNodeData(elem, nodeData);
        clearTimeout(nodeData.timoutId);
        if (nodeData.isShown) {
            this.ui.hidePassword(elem);
        }
        else {
            this.ui.showPassword(elem, value);
            nodeData.timoutId = setTimeout(() => { this.ui.hidePassword(elem); nodeData.isShown = false; }, 10000);
        }
        nodeData.isShown = !nodeData.isShown;
        GlobalNodeData.inst().setNodeData(elem, nodeData);
    }
}
