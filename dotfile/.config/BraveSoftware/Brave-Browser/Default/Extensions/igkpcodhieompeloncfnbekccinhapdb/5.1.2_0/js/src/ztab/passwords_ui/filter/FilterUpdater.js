import { zt } from "../../../../ztab/zt.js";
import { BasePasswordFilterUpdater } from "../../../common/ui/passwords_ui/filter/BaseFilterUpdater.js";
export class FilterUpdater extends BasePasswordFilterUpdater {
    async updateFilter(query) {
        query.page_no = 0;
        zt.passwordsOldUI.detailsUI.hideDetails();
        await zt.passwordsOldUI.refreshList();
    }
    getQuery() {
        return zt.passwordsOldUI.getQuery();
    }
}
