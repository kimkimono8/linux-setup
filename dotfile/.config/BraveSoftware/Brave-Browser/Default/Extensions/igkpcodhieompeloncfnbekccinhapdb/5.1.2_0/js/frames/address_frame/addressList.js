import { vuiMain } from "../../src/provider/VUi/main.js";
vuiMain();
import { ZVError } from "../../common/error/ZVError.js";
import { setGlobal } from "../../common/global/global.js";
import { UIUtil1 } from "../../common/ui/ui_util.js";
import { SecretQuery } from "../../src/service/bgApi/types/SecretQuery.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { AdFrameBgListeners } from "./adFrameBgListeners.js";
import { AdFrameTheme } from "./adFrameTheme.js";
import { AdFrameUIListeners } from "./adFrameUIListeners.js";
import { AddressListUI } from "./addressListUI.js";
class AddressList extends AddressListUI {
    query = SecretQuery.newBuilder().build();
    locked = false;
    parentFrameId;
    formData;
    addressCategoryId;
    async main() {
        await vt.init({ logPrefix: "ADDRESS:" });
        await js.dom.waitDomLoad();
        await this.loadTabMemory();
        await this.initTheme();
        await this.init();
        await this.showUI();
        await this.showTab();
        AdFrameTheme.inst.setArrow();
    }
    async loadTabMemory() {
        this.parentFrameId = await ztabStorage.load(TabStorageKeys.ACTIVE_FRAME_ID);
        this.formData = await ztabStorage.load(TabStorageKeys.FORM_FRAME_DATA);
        this.addressCategoryId = await zlocalStorage.load(LocalStorageKeys.ADDRESS_TYPE_ID, "");
    }
    async initTheme() {
        AdFrameTheme.inst;
        UIUtil1.inst.init();
        UIUtil.init();
        new AdFrameBgListeners().init();
    }
    initQuery() {
        this.query.page_no = 0;
        this.query.rows_per_page = 10;
        this.query.typeId = this.addressCategoryId;
    }
    async showTab() {
        const unlocked = await bgApi.login.isUnlocked();
        if (unlocked) {
            this.initQuery();
            const allSecrets = await bgApi.cardFrame.getSecrets(this.query);
            await this.showAddressTab(allSecrets);
            AdFrameUIListeners.inst.initSearch();
        }
        else {
            await this.showLocked();
        }
        AdFrameUIListeners.inst.initAddListener(unlocked);
    }
    async search(e) {
        this.initQuery();
        this.query.search_string = e.target.value;
        if (e.target.value != "") {
            this.show('[data-name="searchClear"]');
        }
        const allSecrets = await bgApi.cardFrame.getSecrets(this.query);
        await this.showMatchingAddress(allSecrets);
    }
    clearSearch(e) {
        e.target.value = "";
        $("#search").val("");
        this.search(e);
        this.hide('[data-name="searchClear"]');
        this.select("#search").focus();
    }
    async showAddressTab(allSecrets) {
        if (allSecrets.length == 0) {
            this.showNoPasswordsUI();
            return;
        }
        this.showPasswordListUI();
        this.populateAddresses(allSecrets);
    }
    async showMatchingAddress(allSecrets) {
        if (allSecrets.length == 0) {
            this.showNoMatchingPasswordsUI();
            return;
        }
        this.select('#password_out').innerHTML = "";
        this.showMatchingPasswordsUI();
        this.populateAddresses(allSecrets);
    }
    async populateAddresses(allSecrets) {
        if (allSecrets.length == 0) {
            return;
        }
        const fragment = new DocumentFragment();
        for (let secret of allSecrets) {
            fragment.append(await this.buildUI(secret, this.query));
        }
        this.select("#password_out").append(fragment);
        AdFrameUIListeners.inst.addScrollEndListener();
        AdFrameUIListeners.inst.overlayListener(this.hideMoreActions);
    }
    async fillAddress(secret) {
        const allFields = Object.keys(secret.encrypted.fields);
        for (let field of allFields) {
            secret.encrypted.fields[field] = await bgApi.crypto.decrypt(secret.encrypted.fields[field], secret.shared);
        }
        await ztabStorage.save(TabStorageKeys.FORM_FRAME_DATA, this.formData);
        bgApi.cardFrame.fillForm(secret, this.parentFrameId);
    }
    async fillField(secret, fieldName) {
        const value = await bgApi.crypto.decrypt(secret.encrypted.fields[fieldName], secret.shared);
        const data = {
            secretId: secret.id,
            value,
            element: this.formData.element,
            attribute: this.formData.attribute,
            parent: this.formData.parent
        };
        bgApi.cardFrame.fillFormField(data, this.parentFrameId);
    }
    async moreAction(secret, e) {
        this.createMoreActions();
        const addressCategory = await bgApi.secretType.get(secret.type_id);
        for (let field of addressCategory.fields) {
            this.addMoreActionsRow(i18n(VI18N.FILL) + " " + field.label, () => this.fillField(secret, field.name));
        }
        const moreActions = this.getMoreActions();
        this.showMoreActions(moreActions, e);
    }
    async addAddress() {
        bgApi.ztab.addAddress();
        bgApi.cardFrame.closeCardFrame();
    }
    async openUnlockPage() {
        try {
            await bgApi.siteFrame.openUnlockVaultPage();
        }
        catch (e) {
            ZVError.error(e);
        }
    }
    async showLocked() {
        this.locked = true;
        super.showLocked();
        AdFrameUIListeners.inst.initAddListener(false);
    }
    async unlocked() {
        if (this.locked) {
            this.locked = false;
            this.showTab();
        }
    }
    async scrolledToBottom() {
        const container = al.select("#password_out");
        if (container.offsetHeight + container.scrollTop >= container.scrollHeight) {
            AdFrameUIListeners.inst.removeScrollEndListener();
            this.query.page_no++;
            const allSecrets = await bgApi.cardFrame.getSecrets(this.query);
            this.populateAddresses(allSecrets);
        }
    }
}
export const al = new AddressList();
setGlobal("al", al);
al.main();
