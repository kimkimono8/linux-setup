import { UIElemContainer } from "../../../../../uiUtil/export.js";
export class GeneratorHistoryElem extends UIElemContainer {
    gg;
    closeElem;
    clearElem;
    historyList;
    emptyUIElem;
    constructor(gg) {
        super();
        this.gg = gg;
        this.gg;
    }
    init() {
        try {
            this.container = UIUtil.createElem({ preRender: true, template: "#generator_history_template" });
            this.closeElem = this.select(`[data-action="close"]`);
            this.clearElem = this.select(`[data-action="clear"]`);
            this.historyList = this.select(`[data-out="history_list"]`);
            this.emptyUIElem = this.select(`[data-name="empty_history"]`);
        }
        catch (e) {
            logError(e);
        }
    }
}
