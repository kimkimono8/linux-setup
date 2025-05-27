import { TableHelper } from "../parts/TableHelper.js";
export class ZMapsCountryTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    async loadAll() {
        try {
            return this.table.getAllRows();
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async load(country) {
        const row = await this.table.getRow(country);
        if (!row) {
            return {};
        }
        return row;
    }
    async addCustomCountry(country) {
        const obj = { country, code: "" };
        return this.table.addRow(obj);
    }
    async addStates(row) {
        return this.table.addRow(row);
    }
    async addAll(countries) {
        return this.table.addAllRows(countries.map(x => ({ country: x.country_name, code: x.country_code })));
    }
}
