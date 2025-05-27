import { GG } from "../GG.js";
export class TableHelper {
    input;
    constructor(input) {
        this.input = input;
    }
    async addRow(obj) {
        return this.addAllRows([obj]);
    }
    async addAllRows(objList, clean = false) {
        try {
            const { table, transactionPromise } = this.input.db.getWriteTable(this.input.name);
            if (clean) {
                table.clear();
            }
            objList.forEach(x => table.put(x));
            await transactionPromise;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async getRow(key) {
        try {
            return await GG.util.getResponse(this.getReadTable().get(key));
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async getAllRows() {
        try {
            return await GG.util.getResponse(this.getReadTable().getAll());
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async getRows(keys) {
        try {
            const table = this.getReadTable();
            const objList = await Promise.all(keys.map(x => GG.util.getResponse(table.get(x))));
            return objList.filter(x => Boolean(x));
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async hasRows() {
        try {
            const table = this.getReadTable();
            const count = await GG.util.getResponse(table.count());
            return count > 0;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async deleteRow(key) {
        return this.deleteAllRows([key]);
    }
    async deleteAllRows(keys) {
        try {
            const { table, transactionPromise } = this.getWriteTable();
            keys.forEach(x => table.delete(x));
            await transactionPromise;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async clear() {
        try {
            const { table, transactionPromise } = this.getWriteTable();
            table.clear();
            await transactionPromise;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getReadTable() {
        return this.input.db.getReadTable(this.input.name);
    }
    getWriteTable() {
        return this.input.db.getWriteTable(this.input.name);
    }
}
