import { ErrorCode } from "../../../../components/jsUtil/service/constants/ErrorCode.js";
import { zt } from "../../../../ztab/zt.js";
import { PasswordUIFilterTabs, PasswordUITabType } from "../PasswordsUI.Type.js";
import { PasswordSidebarData } from "./PasswordSidebar.Data.js";
import { PasswordSidebarUIElem } from "./PasswordSidebar.Elem.js";
export class PasswordSidebarUI {
    gg;
    elem;
    data = new PasswordSidebarData();
    HIGHLIGHT_CLASS = "left-nav-menu-active";
    curTab;
    constructor(gg) {
        this.gg = gg;
        this.elem = new PasswordSidebarUIElem(this.gg);
    }
    async showUI() {
        try {
            this.elem.init();
            this.addListeners();
            await this.data.init();
            await this.initForPersonalPlan();
            this.initSecretTypeNav();
            js.dom.setContent("#passwords_nav_panel", this.elem.container);
            this.addScroll();
        }
        catch (e) {
            logError(e);
        }
    }
    async refreshUI() {
        try {
            await this.showUI();
            this.highlight(this.curTab);
        }
        catch (e) {
            logError(e);
        }
    }
    highlight(tab) {
        try {
            this.curTab = tab;
            VUI.highlightNav({ highlightClass: this.HIGHLIGHT_CLASS, targetElem: this.getNavElement(tab) });
        }
        catch (e) {
            logError(e);
        }
    }
    getNavElement(tab) {
        try {
            switch (tab.type) {
                case PasswordUITabType.ALL:
                    return this.elem.allPasswordsNav;
                case PasswordUITabType.FILTER:
                    return this.getFilterNavElement(tab);
                case PasswordUITabType.SECRET_TYPE:
                    {
                        const typeElem = this.elem.typeElemMap[tab.typeId];
                        if (typeElem) {
                            return typeElem;
                        }
                    }
                    ;
                    throw ErrorCode.INVALID_INPUT;
                case PasswordUITabType.TRASH:
                    return this.elem.trashTabNav;
                case PasswordUITabType.FOLDER:
                    return this.elem.folderPasswordsNav;
                default:
                    throw ErrorCode.UNHANDLED_CASE;
            }
        }
        catch (e) {
            logError(e);
            return this.elem.allPasswordsNav;
        }
    }
    getFilterNavElement(tab) {
        try {
            switch (tab.filter) {
                case PasswordUIFilterTabs.FAVOURITES:
                    return this.elem.favouritesTabNav;
                case PasswordUIFilterTabs.SHARED_BY_ME:
                    return this.elem.sharedByMeTabNav;
                case PasswordUIFilterTabs.SHARED_WITH_ME:
                    return this.elem.sharedWithMeTabNav;
                case PasswordUIFilterTabs.OWNED_BY_ME:
                    return this.elem.ownedByMeTabNav;
                default:
                    throw ErrorCode.UNHANDLED_CASE;
            }
        }
        catch (e) {
            logError(e);
            return this.elem.allPasswordsNav;
        }
    }
    async initForPersonalPlan() {
        try {
            if (!zt.mainUI.data.isPersonalPlan) {
                return;
            }
            this.elem.sharedByMeTabNav.remove();
            this.elem.sharedWithMeTabNav.remove();
            this.elem.ownedByMeTabNav.remove();
        }
        catch (e) {
            logError(e);
        }
    }
    addListeners() {
        try {
            this.elem.allPasswordsNav.addEventListener("click", () => this.gg.passwordsUI.showTab({ type: PasswordUITabType.ALL }));
            this.addFilterTabListener(this.elem.favouritesTabNav, PasswordUIFilterTabs.FAVOURITES);
            this.addFilterTabListener(this.elem.ownedByMeTabNav, PasswordUIFilterTabs.OWNED_BY_ME);
            this.addFilterTabListener(this.elem.sharedByMeTabNav, PasswordUIFilterTabs.SHARED_BY_ME);
            this.addFilterTabListener(this.elem.sharedWithMeTabNav, PasswordUIFilterTabs.SHARED_WITH_ME);
            this.elem.trashTabNav.addEventListener("click", () => this.gg.passwordsUI.showTab({ type: PasswordUITabType.TRASH }));
        }
        catch (e) {
            logError(e);
        }
    }
    addFilterTabListener(elem, filter) {
        elem.addEventListener("click", () => this.gg.passwordsUI.showTab({ type: PasswordUITabType.FILTER, filter }));
    }
    addSecretTypeTabListener(elem, typeId) {
        elem.addEventListener("click", () => this.gg.passwordsUI.showTab({ type: PasswordUITabType.SECRET_TYPE, typeId }));
    }
    initSecretTypeNav() {
        try {
            const countIdTypes = Object.keys(this.data.countMap).map(x => ({ id: x, count: this.data.countMap[x] }));
            countIdTypes.sort((x, y) => y.count - x.count);
            js.dom.clearContent(this.elem.categoryNavList);
            for (let x of countIdTypes) {
                this.addSecretType(this.data.secretTypeMap[x.id]);
            }
            const addedTypes = new Set(countIdTypes.map(x => x.id));
            for (let secretType of this.getRequiredBuiltInTypes()) {
                if (addedTypes.has(secretType.id)) {
                    continue;
                }
                this.addSecretType(secretType);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getRequiredBuiltInTypes() {
        try {
            const allSecretTypes = Object.values(this.data.secretTypeMap);
            const enabledBuiltInTypes = allSecretTypes.filter(x => !x.added_by && x.enabled);
            const nameMap = new Map();
            enabledBuiltInTypes.forEach(x => nameMap.set(x.name, x));
            const reqTypes = [];
            const addType = (x) => { if (nameMap.has(x)) {
                reqTypes.push(nameMap.get(x));
            } };
            addType("Web Account");
            addType("Payment Card");
            addType("Address");
            return reqTypes;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    addSecretType(secretType) {
        try {
            const elem = VUI.createElem({ template: "#category_menu_item" });
            js.dom.setChildText(elem, "[data-categoryName]", secretType.name);
            const isBuiltin = !secretType.added_by;
            if (isBuiltin) {
                const iconElem = js.selector.selectFrom(elem, "[data-icon]");
                iconElem.className = "icon-cat-" + secretType.name.trim().toLowerCase().replaceAll(" ", "-");
            }
            const clickElem = js.selector.selectFrom(elem, "[data-click]");
            this.elem.typeElemMap[secretType.id] = clickElem;
            this.addSecretTypeTabListener(clickElem, secretType.id);
            this.elem.categoryNavList.append(elem);
        }
        catch (e) {
            logError(e);
        }
    }
    addScroll() {
        try {
            VUI.addSlimScroll(this.elem.categoryNavList);
        }
        catch (e) {
            logError(e);
        }
    }
}
