import { globalDomListener } from "../../common/ui/globalDomListener.js";
import { TrashQuery } from "../../src/service/bgApi/types.js";
import { BasePasswordsUI } from "../passwords_ui/BasePasswordsUI.js";
import { TrashDetailsUI } from "./TrashDetailsUI.js";
import { TrashSecretElemCreator } from "./TrashSecretElemCreator.js";
import { TrashUIListener } from "./TrashUIListener.js";
export class TrashUI extends BasePasswordsUI {
    listener = new TrashUIListener();
    detailsUI = new TrashDetailsUI();
    secretElemCreator = new TrashSecretElemCreator();
    query = TrashQuery.createDefaultQuery();
    showCompleteLoadingOnRefresh = true;
    init() {
        this.init = () => { };
        this.listener.p = this;
        this.secretElemCreator.p = this;
        this.detailsUI.p = this;
        this.refreshList = js.fn.wrapper.createSingleInstListener(this.refreshList, this);
        globalDomListener.register("trash_ui", this.listener);
    }
    async showUI() {
        try {
            this.init();
            if (this.elem) {
                this.elem.remove();
            }
            this.elem = UIUtil.createElem({ preRender: true, template: "#trash_page_template" });
            this.initSearch();
            await this.refreshViewType();
            js.dom.setContent("#passwords_content", this.elem);
            this.select("[data-search]").focus();
        }
        catch (e) {
            logError(e);
        }
    }
    secretsRemoved(_secretIds) {
        try {
            if (!this.isUIShown()) {
                return;
            }
            this.show("[data-search_container]");
            this.refreshList();
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async updateQueriedResult() {
        const query = this.getQuery();
        this.queryResult = await bgApi.trash.queryTrash(query);
    }
    async showNoPasswordsDiv() {
        super.showNoPasswordsDiv();
        this.handleEmptyTrash();
    }
    handleEmptyTrash() {
        const isEmptyTrash = (this.queryResult.total_count == 0) &&
            (this.queryResult.query.search_string.length == 0);
        if (!isEmptyTrash) {
            return;
        }
        this.hide("[data-search_container]");
    }
}
