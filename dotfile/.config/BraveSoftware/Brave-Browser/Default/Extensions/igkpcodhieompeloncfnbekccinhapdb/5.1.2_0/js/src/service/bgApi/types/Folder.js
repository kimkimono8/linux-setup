import { FilterType, PageQuery } from "../types.js";
export var FolderSharingType;
(function (FolderSharingType) {
    FolderSharingType["SHARED_BY_ME"] = "SHARED_BY_ME";
    FolderSharingType["SHARED_TO_ME"] = "SHARED_TO_ME";
    FolderSharingType["NONE"] = "NONE";
})(FolderSharingType || (FolderSharingType = {}));
export class Folder {
    static SHARING_LEVEL = {
        MANAGE: 110,
        LOGIN: 120,
        VIEW: 130,
        MODIFY: 140,
        NONE: -1
    };
    static SHARING_LEVEL_USER_GROUP = {
        MANAGE: 150,
        LOGIN: 160,
        VIEW: 170,
        MODIFY: 180,
        NONE: -1
    };
    id = "";
    parent_id = "";
    name = "";
    name_lowercase = "";
    path = "";
    has_subfolder = false;
    shared = false;
    sharing_type = FolderSharingType.NONE;
    sharing_level = Folder.SHARING_LEVEL.MANAGE;
    sort_weight = 0;
    path_parts = [];
    highlight_field = "";
}
export class FolderQuery extends PageQuery {
    static createDefaultQuery() {
        return {
            search_string: "",
            page_no: 0,
            rows_per_page: 50,
            sharingType: FilterType.ALL,
        };
    }
    sharingType;
}
export class Folder_Tree_Query {
    end = 50;
    visible_sub_roots = [];
    static createDefaultQuery() {
        const query = {
            end: 50,
            visible_sub_roots: []
        };
        return query;
    }
}
export class FolderEditableQuery extends PageQuery {
}
