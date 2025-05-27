import { TableHelper } from "../parts/TableHelper.js";
export class ZMapsDistrictTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    async load(country, state) {
        const row = await this.table.getRow(country + "_" + state);
        if (!row) {
            return {};
        }
        return row;
    }
    async addDistricts(country, state, districts) {
        return this.table.addRow({ country_state: country + "_" + state, districts });
    }
}
