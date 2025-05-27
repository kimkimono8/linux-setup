import { accountDb } from "../Context.js";
export class BgSecretTypeApiImpl {
    async getAll() {
        return accountDb.secretTypeTable.loadAll();
    }
    async get(typeId) {
        return accountDb.secretTypeTable.load(typeId);
    }
    async getMap() {
        return bg.vaultSecretTypes.getMap();
    }
    async getCountMap() {
        return bg.vaultSecretTypes.getCountMap();
    }
}
