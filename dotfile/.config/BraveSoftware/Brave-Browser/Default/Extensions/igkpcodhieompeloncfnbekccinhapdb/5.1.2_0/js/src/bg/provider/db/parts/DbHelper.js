import { ErrorCode } from "../../../../../components/jsUtil/service/constants/ErrorCode.js";
import { GG } from "../GG.js";
export class DbHelper {
    input;
    db = null;
    async init(input) {
        try {
            if (!input.name) {
                throw jserror(ErrorCode.INVALID_INPUT + " name");
            }
            if (!input.version) {
                throw jserror(ErrorCode.INVALID_INPUT + " version");
            }
            this.input = input;
            const openRequest = indexedDB.open(input.name, input.version);
            openRequest.onupgradeneeded = this.onUpgrade.bind(this);
            this.db = await GG.util.getResponse(openRequest);
            for (let table in input.tables) {
                await this.testTable(table);
            }
        }
        catch (e) {
            console.info(e);
            await this.retryNewDb();
        }
    }
    getReadTable(name) {
        const transaction = this.db.transaction([name], "readonly");
        return transaction.objectStore(name);
    }
    getWriteTable(name) {
        const transaction = this.db.transaction([name], "readwrite");
        const table = transaction.objectStore(name);
        const promise = GG.util.getTransactionPromise(transaction);
        return { table, transactionPromise: promise };
    }
    async deleteDb() {
        try {
            if (this.db) {
                this.db.close();
            }
            if (this.input?.name) {
                indexedDB.deleteDatabase(this.input.name);
            }
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async retryNewDb() {
        indexedDB.deleteDatabase(this.input.name);
        await js.time.delay(1);
        await brApi.runtime.reload();
    }
    async testTable(name) {
        return await GG.util.getResponse(this.getReadTable(name).get(""));
    }
    onUpgrade(e) {
        const db = e.target.result;
        for (let table of Array.from(db.objectStoreNames)) {
            db.deleteObjectStore(table);
        }
        for (let table in this.input.tables) {
            db.createObjectStore(table, { keyPath: this.input.tables[table] });
        }
    }
}
