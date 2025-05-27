import { UIElemContainer } from "../../../../../uiUtil/export.js";
export class BaseNoPasswordFilterUIElem extends UIElemContainer {
    viewFiltersElem;
    favouriteElem;
    domainMatchingElem;
    ownedElem;
    recentlyUsedElem;
    recentlyAddedElem;
    classificationElem;
    sharingElem;
    tagsElem;
    searchElem;
    classificationText;
    sharingText;
    init() {
        this.container = UIUtil.createElem({ template: "#applied_filter_name_template" });
        this.viewFiltersElem = this.select("[data-view_filters]");
        this.favouriteElem = this.select("[data-favourite]");
        this.domainMatchingElem = this.select("[data-domain_matching]");
        this.ownedElem = this.select("[data-owned]");
        this.recentlyUsedElem = this.select("[data-recently_used]");
        this.recentlyAddedElem = this.select("[data-recently_added]");
        this.classificationElem = this.select("[data-classification]");
        this.sharingElem = this.select("[data-sharing]");
        this.tagsElem = this.select("[data-tags]");
        this.searchElem = this.select("[data-search]");
        this.classificationText = js.selector.selectFrom(this.classificationElem, "[data-text]");
        this.sharingText = js.selector.selectFrom(this.sharingElem, "[data-text]");
    }
}
