import { BasePasswordFilterUpdater } from "../../../common/ui/passwords_ui/filter/BaseFilterUpdater.js";
import { pp } from "../../pp.js";
export class FilterUpdater extends BasePasswordFilterUpdater {
    async updateFilter(query) {
        query.page_no = 0;
        await zsessionStorage.save(pp.passwordsUI.PP_QUERY_KEY, query);
        await pp.passwordsUI.refreshList();
    }
    getQuery() {
        return pp.passwordsUI.getQuery();
    }
    setDomainMatchingIcon(selected) {
        pp.mainUI.setDomainMatchingIcon(selected);
    }
}
