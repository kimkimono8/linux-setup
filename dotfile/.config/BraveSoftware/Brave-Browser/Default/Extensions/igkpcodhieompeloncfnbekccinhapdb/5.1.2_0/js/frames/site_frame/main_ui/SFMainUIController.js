import { TabStorageKeys } from "../../../src/service/storage/constants/TabStorageKeys.js";
import { SFTheme } from "../SiteFrame.js";
import { SFGeneratorUI } from "../generator/SFGeneratorUI.js";
import { SFPasswordsUIController } from "../passwords_ui/SFPasswordsUIController.js";
import { SFMainCli } from "./SFMainCli.js";
import { SFMainUI } from "./SFMainUI.js";
export class SFMainUIController {
    static instance = null;
    constructor() { }
    static get inst() {
        return this.instance || (this.instance = new SFMainUIController());
    }
    generator = new SFGeneratorUI();
    static TABS = {
        PASSWORDS: "PASSWORDS",
        GENERATOR: "GENERATOR"
    };
    ui = null;
    get cli() {
        return SFMainCli.inst;
    }
    unlocked = false;
    currentTab = "";
    async initPlusIcon() {
        try {
            const addPasswordAllowed = await this.cli.checkAddPasswordAllowed();
            this.ui.setAddPasswordEnable(addPasswordAllowed);
        }
        catch (e) {
            logError(e);
        }
    }
    async showUI() {
        this.ui = new SFMainUI();
        this.ui.init();
        this.addListeners();
        await this.initPlusIcon();
        await this.initArrow();
        const shownTab = await ztabStorage.load(TabStorageKeys.SF_SHOWN_TAB, SFMainUIController.TABS.PASSWORDS);
        await this.showTab(shownTab);
        this.ui.showUI();
    }
    addListeners() {
        this.ui.onShowPasswordsInput(() => this.showTab(SFMainUIController.TABS.PASSWORDS));
        this.ui.onShowGeneratorInput(() => this.showTab(SFMainUIController.TABS.GENERATOR));
        this.ui.onAddPasswordInput(() => this.onAddPasswordInput());
    }
    async showTab(tabName) {
        this.unlocked = await this.cli.isUnlocked();
        this.ui.setAddPasswordPlusVisible(false);
        if (!this.unlocked) {
            this.showLockedUI();
            return;
        }
        this.ui.highlightTab(tabName);
        this.currentTab = tabName;
        switch (tabName) {
            case SFMainUIController.TABS.PASSWORDS:
                SFPasswordsUIController.inst.showUI();
                this.ui.setAddPasswordPlusVisible(true);
                break;
            case SFMainUIController.TABS.GENERATOR:
                this.generator.showUI();
                break;
        }
        await ztabStorage.save(TabStorageKeys.SF_SHOWN_TAB, tabName);
    }
    async initArrow() {
        try {
            const arrowClass = await ztabStorage.load(TabStorageKeys.SITE_FRAME_ARROW_CLASS, "top-left");
            this.ui.setArrow(arrowClass);
            const marginClass = arrowClass.includes("top") ? "m-t-10" : "m-b-10";
            SFTheme.inst.setArrow(marginClass);
        }
        catch (e) {
            logError(e);
        }
    }
    showLockedUI() {
        this.ui.showLocked();
        this.ui.onUnlockInput(() => this.cli.openUnlockPage());
    }
    onSyncingEvent() {
        if (!this.unlocked) {
            this.showTab(SFMainUIController.TABS.PASSWORDS);
            return;
        }
        if (this.currentTab == SFMainUIController.TABS.PASSWORDS) {
            SFPasswordsUIController.inst.onSyncingEvent();
        }
    }
    onSyncedEvent() {
        if (this.currentTab == SFMainUIController.TABS.PASSWORDS) {
            SFPasswordsUIController.inst.onSyncedEvent();
        }
        this.initPlusIcon();
    }
    async onAddPasswordInput() {
        const addPasswordAllowed = await this.cli.checkAddPasswordAllowed();
        if (!addPasswordAllowed) {
            return;
        }
        this.cli.addPassword();
    }
}
