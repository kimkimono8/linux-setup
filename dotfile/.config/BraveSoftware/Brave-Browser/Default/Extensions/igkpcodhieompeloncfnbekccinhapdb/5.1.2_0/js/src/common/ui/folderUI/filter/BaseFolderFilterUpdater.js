export class BaseFolderFilterUpdater {
    filterUI;
    constructor(filterUI) {
        this.filterUI = filterUI;
    }
    changeSearchString(searchString) {
        this.update(x => x.search_string = searchString);
    }
    changeSharingType(value) {
        this.update(x => x.sharingType = value);
    }
    update(fn) {
        try {
            const query = this.filterUI.data.getQuery();
            fn(query);
            this.updateFilter(query);
        }
        catch (e) {
            logError(e);
        }
    }
}
