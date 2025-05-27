import { vutil } from "../../../../../vutil/export.js";
import { secretLogoAdder } from "../../../../logo/export.js";
import { TableHelper } from "../../parts/TableHelper.js";
export class SecretTableImpl {
    gg;
    table;
    constructor(gg) {
        this.gg = gg;
    }
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    async save(secret) {
        return this.saveAll([secret]);
    }
    async saveAll(secrets, clear = false) {
        try {
            await bg.vaultSecrets.secretDataHandler.encodeSecretData(secrets);
            const dbSecrets = this.mapDbSecrets(secrets);
            await this.table.addAllRows(dbSecrets, clear);
            this.gg.db.accountDb.tagTable.saveAll(secrets, clear);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    loadAll() {
        return this.table.getAllRows();
    }
    async get(secretId) {
        try {
            const secret = await this.table.getRow(secretId);
            if (!secret) {
                return null;
            }
            await secretLogoAdder.addLogo([secret]);
            await bg.vaultSecrets.secretDataHandler.decodeSecretData([secret]);
            return secret;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async getList(idList) {
        try {
            const results = await Promise.all(idList.map(id => this.table.getRow(id)));
            return results.filter(x => Boolean(x));
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async put(secret) {
        try {
            await bg.vaultSecrets.secretDataHandler.encodeSecretData([secret]);
            await this.table.addRow(secret);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async remove(secretId) {
        return this.table.deleteRow(secretId);
    }
    async removeAll(secretIds) {
        return this.table.deleteAllRows(secretIds);
    }
    async getNames(domain) {
        try {
            const secrets = await this.table.getAllRows();
            const nameRegex = new RegExp("^" + vutil.search.escapeRegex(domain) + "(_\\d+)?" + "$");
            return secrets.filter(x => nameRegex.test(x.name)).map(x => x.name);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    mapDbSecrets(secrets) {
        try {
            const dbSecrets = [];
            let dbSecret;
            for (let secret of secrets) {
                dbSecret = { ...secret };
                dbSecrets.push(dbSecret);
            }
            return dbSecrets;
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
