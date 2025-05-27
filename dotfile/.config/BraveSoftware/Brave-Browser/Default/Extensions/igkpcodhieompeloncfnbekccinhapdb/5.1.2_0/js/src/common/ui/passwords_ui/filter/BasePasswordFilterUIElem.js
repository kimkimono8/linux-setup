import { UIElemContainer } from "../../../../uiUtil/export.js";
export class BasePasswordFilterUIElem extends UIElemContainer {
    favouriteCheckbox;
    domainCheckbox;
    ownedCheckbox;
    recentlyUsedCheckbox;
    recentlyAddedCheckbox;
    sharingSelect;
    favouriteContainer;
    classificationContainer;
    ownedContainer;
    sharingContainer;
    generalSelectionMark;
    recentSelectionMark;
    classificationSelectionMark;
    sharingSelectionMark;
    tagsSelectionMark;
    init() {
        this.container = UIUtil.createElem({ preRender: true, template: "#password_filter_template" });
        this.favouriteCheckbox = this.select("[data-favourite]");
        this.domainCheckbox = this.select("[data-domain_matching]");
        this.ownedCheckbox = this.select("[data-owned]");
        this.recentlyUsedCheckbox = this.select("[data-recently_used]");
        this.recentlyAddedCheckbox = this.select("[data-recently_added]");
        this.sharingSelect = this.select("[data-sharing]");
        this.favouriteContainer = this.select("[data-favourite_container]");
        this.classificationContainer = this.select("[data-classification_container]");
        this.ownedContainer = this.select("[data-owned_container]");
        this.sharingContainer = this.select("[data-sharing_container]");
        this.generalSelectionMark = this.select("[data-general_container] [data-selected]");
        this.recentSelectionMark = this.select("[data-recent_container] [data-selected]");
        this.classificationSelectionMark = this.select("[data-classification_container] [data-selected]");
        this.sharingSelectionMark = this.select("[data-sharing_container] [data-selected]");
        this.tagsSelectionMark = this.select("[data-tag_container] [data-selected]");
    }
    getClassificationCheckbox(value) {
        return this.select("input[name='classification'][value=" + value + "]");
    }
}
