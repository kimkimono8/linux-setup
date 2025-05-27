import { UIElemContainer } from "../../../uiUtil/export.js";
export class PasswordSidebarUIElem extends UIElemContainer {
    gg;
    allPasswordsNav;
    favouritesTabNav;
    ownedByMeTabNav;
    sharedByMeTabNav;
    sharedWithMeTabNav;
    trashTabNav;
    categoryNavList;
    folderPasswordsNav;
    typeElemMap = {};
    constructor(gg) {
        super();
        this.gg = gg;
        this.gg;
    }
    init() {
        this.container = VUI.createElem({ template: "#passwords_nav_template" });
        this.allPasswordsNav = this.select("#allPasswordsTabNav");
        this.favouritesTabNav = this.select("#favouritesTabNav");
        this.ownedByMeTabNav = this.select("#ownedByMeTabNav");
        this.sharedByMeTabNav = this.select("#sharedByMeTabNav");
        this.sharedWithMeTabNav = this.select("#sharedWithMeTabNav");
        this.trashTabNav = this.select("#trashTabNav");
        this.categoryNavList = this.select("#categoryItems");
        this.folderPasswordsNav = this.select(`[data-name="folderPasswordsNav"]`);
    }
}
