import { globalNodeData } from "../../common/ui/globalNodeData.js";
import { UIUtil1 } from "../../common/ui/ui_util.js";
import { BasePasswordsUI } from "./BasePasswordsUI.js";
export class BasePasswordsUIListener {
    p = null;
    constructor() {
        this.keyed_search_string = js.fn.wrapper.createSingleInstListener(this.keyed_search_string, this);
    }
    async keyed_search_string(e) {
        if (VUI.keyboard.isControlKey(e.key)) {
            return;
        }
        const input = e.target;
        UIUtil1.inst.showSearchClear(input);
        const query = this.p.getQuery();
        query.search_string = input.value;
        query.page_no = 0;
        this.p.saveQuery(query);
        await this.p.refreshList();
        this.p.detailsUI.hideDetails();
    }
    clicked_clear_search(e) {
        UIUtil1.inst.clickedClearSearch(e);
    }
    pressed_search_escape(e) {
        UIUtil1.inst.clearInput(e.target);
    }
    clicked_prev_page() {
        const query = this.p.getQuery();
        if (query.page_no == 0) {
            return;
        }
        query.page_no--;
        this.p.saveQuery(query);
        this.p.detailsUI.hideDetails();
        this.p.refreshList();
    }
    async clicked_next_page() {
        const query = this.p.getQuery();
        const result = this.p.getQueryResult();
        const isInLastPage = ((query.page_no + 1) * query.rows_per_page) >= result.total_count;
        if (isInLastPage) {
            return;
        }
        query.page_no++;
        this.p.saveQuery(query);
        this.p.detailsUI.hideDetails();
        this.p.refreshList();
    }
    changedRowsPerPage(e) {
        const rowsPerPage = +(e.target.value);
        const query = this.p.getQuery();
        query.page_no = 0;
        query.rows_per_page = rowsPerPage;
        this.p.detailsUI.hideDetails();
        this.p.refreshList();
        zlocalStorage.save(BasePasswordsUI.ROWS_PER_PAGE, rowsPerPage);
    }
    async clicked_show_card_view() {
        this.p.setCardView(true);
    }
    async clicked_show_list_view() {
        this.p.setCardView(false);
    }
    async clicked_show_password_details(e) {
        const secretId = this.p.util.getSecretId(e);
        this.p.detailsUI.showDetails(secretId);
    }
    clicked_hide_password_details() {
        this.p.detailsUI.hideDetails();
    }
    getSecret(e) {
        try {
            const elem = js.selector.closest(e.target, "[data-secret_id]");
            if (!elem) {
                return null;
            }
            const secret = globalNodeData.getNodeData(elem);
            return secret;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
}
