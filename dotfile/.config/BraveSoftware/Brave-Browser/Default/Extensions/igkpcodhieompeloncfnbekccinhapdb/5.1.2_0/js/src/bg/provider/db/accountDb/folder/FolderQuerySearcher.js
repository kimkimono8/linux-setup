import { FolderHighlightFields } from "../../../../../service/vt/constants/constants.js";
import { vutil } from "../../../../../vutil/export.js";
export class FolderQuerySearcher {
    searchString = "";
    filteredFolders = {
        nameStart: [],
        nameInclude: [],
        namePattern: [],
    };
    init(searchString) {
        this.searchString = searchString.toLocaleLowerCase();
    }
    addIfValid(folder) {
        const searchString = this.searchString;
        if (!this.searchString) {
            this.filteredFolders.nameStart.push(folder);
            folder.highlight_field = "";
            return;
        }
        if (folder.name_lowercase.startsWith(searchString)) {
            this.filteredFolders.nameStart.push(folder);
            folder.highlight_field = FolderHighlightFields.NAME;
            return;
        }
        if (folder.name_lowercase.includes(searchString)) {
            this.filteredFolders.nameInclude.push(folder);
            folder.highlight_field = FolderHighlightFields.NAME;
            return;
        }
        if (vutil.search.isPresent(searchString, folder.name_lowercase)) {
            this.filteredFolders.namePattern.push(folder);
            folder.highlight_field = FolderHighlightFields.NAME;
            return;
        }
    }
    getFilteredFolders() {
        for (let key in this.filteredFolders) {
            this.filteredFolders[key].sort(this.sortByName.bind(this));
        }
        return js.array.concat(this.filteredFolders.nameStart, this.filteredFolders.nameInclude, this.filteredFolders.namePattern);
    }
    sortByName(x, y) {
        return x.name_lowercase.localeCompare(y.name_lowercase);
    }
}
