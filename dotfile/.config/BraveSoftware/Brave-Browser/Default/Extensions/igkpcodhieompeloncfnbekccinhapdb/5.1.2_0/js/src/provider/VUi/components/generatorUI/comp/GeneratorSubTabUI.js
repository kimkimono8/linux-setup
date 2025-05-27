import { ErrorCode } from "../../../../../../components/jsUtil/service/constants/ErrorCode.js";
import { UIElemContainer } from "../../../../../uiUtil/export.js";
import { GeneratorSubTab } from "../Generator.Type.js";
class GeneratorSubTabUIElem extends UIElemContainer {
    gg;
    passwordTab;
    passphraseTab;
    constructor(gg) {
        super();
        this.gg = gg;
    }
    init() {
        this.container = this.gg.generator.elem.container;
        this.passwordTab = this.select("#generatorPasswordTab");
        this.passphraseTab = this.select("#generatorPassphraseTab");
    }
}
export class GeneratorSubTabUI {
    gg;
    elem;
    HIGHLIGHT_CLASS = "generator-tabs-selected";
    constructor(gg) {
        this.gg = gg;
        this.elem = new GeneratorSubTabUIElem(this.gg);
    }
    showUI() {
        try {
            this.elem.init();
            this.addListeners();
        }
        catch (e) {
            logError(e);
        }
    }
    highlight(tab) {
        try {
            VUI.highlightNav({ highlightClass: this.HIGHLIGHT_CLASS, targetElem: this.getTabElem(tab) });
        }
        catch (e) {
            logError(e);
        }
    }
    getTabElem(tab) {
        try {
            switch (tab) {
                case GeneratorSubTab.PASSWORD:
                    return this.elem.passwordTab;
                case GeneratorSubTab.PASSPHRASE:
                    return this.elem.passphraseTab;
                default:
                    throw ErrorCode.UNHANDLED_CASE;
            }
        }
        catch (e) {
            logError(e);
            return this.elem.passwordTab;
        }
    }
    addListeners() {
        try {
            this.elem.passwordTab.addEventListener("click", () => this.gg.generator.showTab(GeneratorSubTab.PASSWORD));
            this.elem.passphraseTab.addEventListener("click", () => this.gg.generator.showTab(GeneratorSubTab.PASSPHRASE));
        }
        catch (e) {
            logError(e);
        }
    }
}
