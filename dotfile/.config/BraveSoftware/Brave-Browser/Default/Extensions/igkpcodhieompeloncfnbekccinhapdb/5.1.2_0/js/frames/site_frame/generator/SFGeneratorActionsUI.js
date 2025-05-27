import { TabStorageKeys } from "../../../src/service/storage/constants/TabStorageKeys.js";
import { UIElemContainer } from "../../../src/uiUtil/export.js";
class SFGeneratorActionsElem extends UIElemContainer {
    generator;
    constructor(generator) {
        super();
        this.generator = generator;
    }
    fillElem;
    fillSaveElem;
    init() {
        try {
            this.container = this.generator.elem.container;
            this.fillElem = this.select(`[data-action="fill"]`);
            this.fillSaveElem = this.select(`[data-action="fill_and_save"]`);
        }
        catch (e) {
            logError(e);
        }
    }
}
export class SFGeneratorActionsUI {
    generator;
    elem;
    constructor(generator) {
        this.generator = generator;
        this.elem = new SFGeneratorActionsElem(this.generator);
    }
    init() {
        try {
            this.elem.init();
            this.addListeners();
        }
        catch (e) {
            logError(e);
        }
    }
    addListeners() {
        try {
            this.elem.fillElem.addEventListener("click", () => this.onFill());
            this.elem.fillSaveElem.addEventListener("click", () => this.onFillSave());
        }
        catch (e) {
            logError(e);
        }
    }
    async onFill() {
        try {
            const password = this.generator.outUI.getPassword();
            await this.generator.outUI.setColoredOut(false);
            const frameId = await ztabStorage.load(TabStorageKeys.ACTIVE_FRAME_ID, 0);
            await bgApi.siteFrame.fillGeneratedPassword(password, frameId);
            this.generator.data.saveLastUsedPassword(password);
        }
        catch (e) {
            logError(e);
        }
    }
    async onFillSave() {
        try {
            this.onFill();
            const frameId = await ztabStorage.load(TabStorageKeys.ACTIVE_FRAME_ID, 0);
            await bgApi.siteFrame.saveGeneratedPassword(this.generator.outUI.getPassword(), frameId);
        }
        catch (e) {
            logError(e);
        }
    }
}
