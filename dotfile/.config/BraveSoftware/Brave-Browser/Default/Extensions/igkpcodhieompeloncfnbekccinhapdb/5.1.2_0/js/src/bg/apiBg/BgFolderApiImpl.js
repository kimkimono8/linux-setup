import { accountDb } from "../Context.js";
export class BgFolderApiImpl {
    async queryTree(query) {
        return accountDb.folderTable.queryTree(query);
    }
    async query(query) {
        return accountDb.folderTable.query(query);
    }
    async queryEditable(query) {
        return accountDb.folderTable.queryEditable(query);
    }
    async get(folderId) {
        return accountDb.folderTable.load(folderId);
    }
}
