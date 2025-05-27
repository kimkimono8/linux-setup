import { VI18N } from "../../../../../service/vt/VI18n.js";
import { UIElemContainer } from "../../../../../uiUtil/export.js";
class GeneratorActionsUIElem extends UIElemContainer {
    gg;
    constructor(gg) {
        super();
        this.gg = gg;
    }
    saveButton;
    historyButton;
    copyButton;
    generateButton;
    init() {
        this.container = this.gg.generator.elem.select("#generatorActionList");
        this.saveButton = this.select("#saveGeneratedValue");
        this.historyButton = this.gg.generator.elem.select(`[data-action="showGeneratorHistory"]`);
        this.copyButton = this.select("#copyGeneratedValue");
        this.generateButton = this.select("#generateValue");
    }
}
export class GeneratorActionsUI {
    gg;
    elem;
    constructor(gg) {
        this.gg = gg;
        this.elem = new GeneratorActionsUIElem(this.gg);
    }
    async showUI() {
        try {
            this.elem.init();
            this.addListeners();
        }
        catch (e) {
            logError(e);
        }
    }
    async saveListener() {
        try {
            const password = this.gg.generator.outUI.getPassword();
            await bgApi.ztab.saveGeneratedPassword(password);
        }
        catch (e) {
            logError(e);
        }
    }
    async copyPassword(password) {
        try {
            await bgApi.other.copyToClipboard(password, { noAutoClear: true });
            bgApi.generator.history.add(password);
            this.gg.generator.data.saveLastUsedPassword(password);
            this.gg.generator.outUI.setColoredOut(false);
        }
        catch (e) {
            logError(e);
        }
    }
    addListeners() {
        try {
            this.elem.saveButton?.addEventListener?.("click", () => this.saveListener());
            this.elem.historyButton.addEventListener("click", () => this.gg.generator.history.showUI());
            this.elem.copyButton.addEventListener("click", e => this.onCopy(e));
            this.elem.generateButton.addEventListener("click", () => this.gg.generator.generateListener());
        }
        catch (e) {
            logError(e);
        }
    }
    async onCopy(e) {
        try {
            const password = this.gg.generator.outUI.getPassword();
            await this.copyPassword(password);
            VUI.tooltip.showActionMsg(e, i18n(VI18N.COPIED));
        }
        catch (e) {
            logError(e);
        }
    }
}
