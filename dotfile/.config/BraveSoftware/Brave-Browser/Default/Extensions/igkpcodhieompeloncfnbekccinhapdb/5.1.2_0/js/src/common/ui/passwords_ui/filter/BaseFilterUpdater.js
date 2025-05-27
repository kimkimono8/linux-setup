import { FilterType } from "../../../../service/bgApi/types.js";
export class BasePasswordFilterUpdater {
    async changeFavourite(selected) {
        this.update(x => x.favourite = selected);
    }
    async changeDomainMatching(selected) {
        try {
            this.update(x => x.domainMatching = selected);
            this.setDomainMatchingIcon(selected);
        }
        catch (e) {
            logError(e);
        }
    }
    async changeRecentlyUsed(selected) {
        this.update(x => x.recentlyUsed = selected);
    }
    changeRecentlyAdded(selected) {
        this.update(x => x.recentlyAdded = selected);
    }
    changeSharing(value) {
        this.update(x => x.sharing = value);
    }
    changeClassification(value) {
        this.update(x => x.classification = value);
    }
    changeTagMode(value) {
        this.update(x => x.tagMode = value);
    }
    changeTags(tags) {
        this.update(x => x.tags = tags);
    }
    changeSearchString(searchString) {
        this.update(x => x.search_string = searchString);
    }
    changeOwned(selected) {
        this.update(x => x.owned = selected);
    }
    clearFilters() {
        this.update(x => {
            x.favourite = false;
            x.domainMatching = false;
            x.recentlyUsed = false;
            x.recentlyAdded = false;
            x.classification = FilterType.ALL;
            x.sharing = FilterType.ALL;
            x.tags.length = 0;
            x.owned = false;
        });
    }
    update(fn) {
        try {
            const query = this.getQuery();
            fn(query);
            this.updateFilter(query);
        }
        catch (e) {
            logError(e);
        }
    }
    setDomainMatchingIcon(_selected) { }
}
