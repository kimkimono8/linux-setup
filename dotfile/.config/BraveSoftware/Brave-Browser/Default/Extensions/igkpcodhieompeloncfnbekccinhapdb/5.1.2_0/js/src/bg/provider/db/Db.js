import { AccountDbImpl } from "./db/AccountDb.js";
import { CommonDbImpl } from "./db/CommonDb.js";
import { GG } from "./GG.js";
export class DbImpl {
    static instance = null;
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return this.instance = new DbImpl();
    }
    gg = new GG(this);
    accountDb = new AccountDbImpl(this.gg);
    commonDb = new CommonDbImpl();
    async init() {
        try {
            await this.accountDb.init();
            await this.commonDb.init();
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async clean() {
        try {
            await Promise.all([
                this.accountDb.db.deleteDb(),
                this.commonDb.db.deleteDb(),
            ]);
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
