import { vutil } from "../../../../../vutil/export.js";
import { TableHelper } from "../../parts/TableHelper.js";
import { EditableFolderQuerier } from "./EditableFolderQuerier.js";
import { FolderQuerier } from "./FolderQuerier.js";
export class FolderTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    async load(folderId) {
        return this.table.getRow(folderId);
    }
    async loadAll() {
        return this.table.getAllRows();
    }
    async saveAll(folders) {
        return this.table.addAllRows(folders, true);
    }
    async query(query) {
        try {
            const allFolders = await this.loadAll();
            return FolderQuerier.query(allFolders, query);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async queryTree(query) {
        try {
            const allFolders = await this.loadAll();
            const folders = [];
            let subrootRegex = null;
            if (query.visible_sub_roots.length) {
                subrootRegex = this.getSubrootRegex(query.visible_sub_roots);
            }
            for (let folder of allFolders) {
                if (!folder.parent_id || (subrootRegex && subrootRegex.test(folder.path))) {
                    folders.push(folder);
                }
            }
            folders.sort(this.comparePathParts);
            const result = {
                query,
                folders: folders.slice(0, query.end),
                total: folders.length,
            };
            return result;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async queryEditable(query) {
        try {
            const allFolders = await this.loadAll();
            return EditableFolderQuerier.queryEditable(allFolders, query);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    comparePathParts(x, y) {
        const end = Math.min(x.path_parts.length, y.path_parts.length);
        for (let i = 0; i < end; i++) {
            if (x.path_parts[i] != y.path_parts[i]) {
                return x.path_parts[i].localeCompare(y.path_parts[i]);
            }
        }
        return x.path_parts.length - y.path_parts.length;
    }
    getSubrootRegex(visibleSubRoots) {
        let regexString = visibleSubRoots.map(x => vutil.search.escapeRegex(x)).join("|");
        const sub_root_regex = new RegExp("^(?:" + regexString + ")\\\\[^\\\\]*?$");
        return sub_root_regex;
    }
}
