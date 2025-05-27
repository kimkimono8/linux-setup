import { GeneratorActionsUI } from "./comp/GeneratorActionsUI.js";
import { GeneratorOutTextUIImpl } from "./comp/GeneratorOutTextUI.js";
import { GeneratorSubTabUI } from "./comp/GeneratorSubTabUI.js";
import { GeneratorDatamImpl } from "./Generator.Data.js";
import { GeneratorUIElem } from "./Generator.Elem.js";
import { GeneratorSubTab } from "./Generator.Type.js";
import { GG } from "./GG.js";
import { GeneratorHistoryUIImpl } from "./history/GeneratorHistory.UI.js";
import { GeneratorPassphraseOptions } from "./passphrase/GeneratorPassphraseOptions.UI.js";
import { GeneratorPasswordOptions, GeneratorShowUIFrom } from "./password/GeneratorPasswordOptions.UI.js";
export class GeneratorUIImpl {
    gg = new GG(this);
    elem = new GeneratorUIElem();
    data = new GeneratorDatamImpl();
    tab = new GeneratorSubTabUI(this.gg);
    outUI = new GeneratorOutTextUIImpl(this.gg);
    actions = new GeneratorActionsUI(this.gg);
    history = new GeneratorHistoryUIImpl(this.gg);
    passwordActions = new GeneratorPasswordOptions(this.gg);
    passphraseActions = new GeneratorPassphraseOptions(this.gg);
    outputElem = "#content_tab";
    constructor() { }
    async showUI() {
        try {
            this.elem.init();
            await this.data.init();
            this.tab.showUI();
            this.outUI.showUI();
            this.actions.showUI();
            this.showTab(this.data.state.curTab, GeneratorShowUIFrom.MAIN_TAB);
            await this.history.restoreUI();
            const outputElem = js.selector.select(this.outputElem);
            if (outputElem) {
                js.dom.setContent(outputElem, this.elem.container);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async showTab(tab, from) {
        try {
            this.tab.highlight(tab);
            this.data.saveCurTab(tab);
            switch (tab) {
                case GeneratorSubTab.PASSWORD:
                    this.passwordActions.showUI(from);
                    return;
                case GeneratorSubTab.PASSPHRASE:
                    this.passphraseActions.showUI(from);
                    return;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    setGenerateListener(listener) {
        this.generateListener = listener;
    }
    generateListener() { }
    setOutputElem(s) {
        this.outputElem = s;
    }
}
