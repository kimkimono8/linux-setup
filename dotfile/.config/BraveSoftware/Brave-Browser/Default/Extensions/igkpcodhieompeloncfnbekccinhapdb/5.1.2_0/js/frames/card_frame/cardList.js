import { vuiMain } from "../../src/provider/VUi/main.js";
vuiMain();
import { ZVError } from "../../common/error/ZVError.js";
import { setGlobal } from "../../common/global/global.js";
import { Theme } from "../../common/ui/Theme.js";
import { UIUtil1 } from "../../common/ui/ui_util.js";
import { cardFillingUtil } from "../../common/util/cardFillingUtil.js";
import { secretUtil } from "../../common/util/vault/secretUtil.js";
import { AlertUI } from "../../src/common/common.js";
import { Secret } from "../../src/service/bgApi/types/Secret.js";
import { SecretQuery } from "../../src/service/bgApi/types/SecretQuery.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { CardListListeners } from "./cardListListeners.js";
import { UIParent } from "../../src/uiUtil/ui/UIParent.js";
class CardList extends UIParent {
    arrowClass = null;
    tabData = null;
    parentFrameId = null;
    theme = null;
    bgEventHandler = null;
    populatingCards = false;
    query = SecretQuery.newBuilder().build();
    async main() {
        await vt.init({ logPrefix: "CARD_LIST:" });
        await js.dom.waitDomLoad();
        this.theme = new Theme();
        this.bgEventHandler = new CardListListeners();
        this.theme.init();
        UIUtil.init();
        UIUtil1.inst.init();
        this.bgEventHandler.init();
        this.initListeners();
        await this.initTabData();
        await this.initQuery();
        this.initUI();
        this.setArrow();
    }
    async setArrow() {
        if (this.arrowClass) {
            return;
        }
        const arrowClass = await ztabStorage.load(TabStorageKeys.SITE_FRAME_ARROW_CLASS);
        this.arrowClass = arrowClass;
        const marginClass = arrowClass.includes("top") ? "m-t-10" : "m-b-10";
        document.body.classList.add(marginClass);
        document.getElementById('arrow').className = "zvd-panel-arrow-" + arrowClass;
    }
    async initQuery() {
        this.query.rows_per_page = 10;
        this.query.typeId = await zlocalStorage.load(LocalStorageKeys.PAYMENT_CARD_TYPE_ID, "");
    }
    async initListeners() {
        document.getElementById('searchIcon').addEventListener("click", this.showSearchBar);
        document.getElementById('hideSearch').addEventListener("click", this.hideSearchBar);
        document.getElementById('clear_search').addEventListener("click", this.clearSearchBar.bind(this));
        document.getElementById('search').addEventListener("input", this.searchCards.bind(this));
        document.querySelector('[data-name="unlock"]').addEventListener("click", this.openUnlockPage.bind(this));
    }
    showSearchBar() {
        $('#searchField').removeClass('dis-hide');
        $('#search').focus();
    }
    hideSearchBar() {
        $('#searchField').addClass('dis-hide');
    }
    async clearSearchBar(_e) {
        $('#search').val("");
        const unlocked = await bgApi.login.isUnlocked();
        if (unlocked) {
            this.query.search_string = "";
            this.query.page_no = 0;
            const secrets = await bgApi.cardFrame.getSecrets(this.query);
            this.populateCards(secrets);
        }
    }
    async searchCards(e) {
        const unlocked = await bgApi.login.isUnlocked();
        if (unlocked) {
            this.query.search_string = e.target.value;
            this.query.page_no = 0;
            const secrets = await bgApi.cardFrame.getSecrets(this.query);
            this.populateCards(secrets);
        }
    }
    async initTabData() {
        this.tabData = await ztabStorage.load(TabStorageKeys.FORM_FRAME_DATA);
        this.parentFrameId = await ztabStorage.load(TabStorageKeys.ACTIVE_FRAME_ID);
    }
    async initUI() {
        const unlocked = await bgApi.login.isUnlocked();
        if (unlocked) {
            $('#loginError').hide();
            $('#searchIcon').show();
            const secrets = await bgApi.cardFrame.getSecrets(this.query);
            this.populateCards(secrets);
        }
        else {
            $('#loginError').show();
            $('#searchIcon').hide();
            $('#cardList').empty();
        }
    }
    async populateCards(secrets) {
        $('#cardList').empty();
        this.hideScroller();
        if (secrets.length == 0) {
            $('#noCards').show();
            $("#cardList").hide();
            return;
        }
        $("#cardList").show();
        $('#noCards').hide();
        const cardListFragment = await this.getCardFragment(secrets);
        $('#cardList').append(cardListFragment);
        this.addScroller();
        this.populatingCards = false;
    }
    async getCardFragment(secrets) {
        const fragment = new DocumentFragment();
        for (let card of secrets) {
            const hasAccess = Secret.hasAccess(card) && Secret.hasViewPermission(card.sharing_level);
            this.elem = UIUtil.createElem({ template: "#card_list_template" });
            this.text("#heading", card.name);
            const cardNumber = hasAccess && card.encrypted != null ? await bgApi.crypto.decrypt(card.encrypted.fields.card_number, card.shared) : "";
            this.text("#cardNumber", cardNumber.replace(/\S(?=.{4})/g, "•").replace(/(.{4})/g, '$1 '));
            this.setImage(card);
            this.elem.addEventListener("click", () => { this.proceedTofillCard(card); });
            fragment.append(this.elem);
        }
        return fragment;
    }
    setImage(card) {
        if (card.logo != null && card.logo != "") {
            const logo = secretUtil.getLogoDataUrl(card.logo);
            this.select("#image").style.backgroundImage = secretUtil.getLogoStyleSrc(logo);
            this.select("#image").className = "password-list-left-img image-center img-contain";
        }
        else {
            this.select("#image").style.backgroundColor = this.color(card.created_on, card.name);
            this.text("#image", secretUtil.getFirst2Chars(card.name));
        }
    }
    async proceedTofillCard(card) {
        if (this.tabData.multiIframes) {
            this.fillCard(card);
            return;
        }
        if (await this.domainMismatch(card)) {
            return;
        }
        if (await this.showInsecurePrompt(card)) {
            return;
        }
        const devToolsOpen = await bgApi.tab.checkDevToolsOpen();
        (!Secret.hasViewPermission(card.sharing_level)) && devToolsOpen ? new Error(i18n(VI18N.CLOSE_DEV_TOOLS_ONE_CLICK_CARD)) : this.fillCard(card);
    }
    async domainMismatch(card) {
        const taburl = await bgApi.cardFrame.getTabUrl();
        const currentDomain = js.url.getParentDomain(this.tabData.frameUrl);
        const parentDomain = js.url.getParentDomain(taburl);
        const domainMismatch = currentDomain != parentDomain;
        const domainMismatchPrompt = domainMismatch ? !(await zlocalStorage.load(LocalStorageKeys.CARD_AUTOFILL_SUBDOMAIN, false)) : false;
        if (domainMismatchPrompt) {
            const title = i18n(VI18N.DOMAIN_MISMATCH_ALERT);
            const text = "\n" + i18n(VI18N.PARENT_DOMAIN) + ": " + parentDomain + "\n" + i18n(VI18N.CURRENT_DOMAIN) + ": " + currentDomain;
            this.promptAndProceed(title, text, card);
        }
        return domainMismatchPrompt;
    }
    async showInsecurePrompt(card) {
        const taburl = await bgApi.cardFrame.getTabUrl();
        const isInsecure = taburl.startsWith("http:");
        const insecurePrompt = isInsecure ? await zlocalStorage.load(LocalStorageKeys.INSECURE_PAGE_PROMPT, false) : false;
        if (insecurePrompt) {
            const title = i18n(VI18N.INSECURE_PAGE_ALERT);
            const text = i18n(VI18N.INSECURE_CARD_FILL_DESCRIPTION);
            this.promptAndProceed(title, text, card);
        }
        return insecurePrompt;
    }
    async promptAndProceed(title, text, card) {
        const confirmed = await sweetAlert({
            title,
            text,
            buttons: {
                confirm: {
                    text: i18n(VI18N.PROCEED),
                    value: true,
                },
                cancel: {
                    text: i18n(VI18N.DENY),
                    value: false,
                    visible: true,
                }
            },
            dangerMode: true
        });
        if (confirmed) {
            this.fillCard(card);
        }
    }
    async fillCard(card) {
        const allFields = Object.keys(card.encrypted.fields);
        for (let field of allFields) {
            card.encrypted.fields[field] = await bgApi.crypto.decrypt(card.encrypted.fields[field], card.shared);
        }
        await ztabStorage.save(TabStorageKeys.FORM_FRAME_DATA, this.tabData);
        this.tabData.multiIframes ? this.fillCardInMultiIframes(card) : bgApi.cardFrame.fillCard(card, this.parentFrameId);
    }
    async fillCardInMultiIframes(card) {
        const tabData = await ztabStorage.load(TabStorageKeys.CCIFRAMEDATA, {});
        const safeToProceed = await this.isSafeToProceed(tabData);
        if (!safeToProceed) {
            return;
        }
        for (let frameId of Object.keys(tabData.frames)) {
            const frameData = this.getFrameData(card, tabData.frames[frameId].fields);
            bgApi.cardFrame.fillCardIframe(frameData, card.id, Number(frameId));
        }
    }
    async isSafeToProceed(tabData) {
        const mismatchAllowed = await zlocalStorage.load(LocalStorageKeys.CARD_AUTOFILL_SUBDOMAIN, false);
        if (mismatchAllowed) {
            return true;
        }
        const topDomain = js.url.getParentDomain("https://" + tabData.topUrl);
        const mismatching = {};
        for (let id of Object.keys(tabData.frames)) {
            const host = tabData.frames[id].hostUrl;
            host.includes(topDomain) ? null : mismatching[host] = true;
        }
        const misMatchArr = Object.keys(mismatching);
        if (misMatchArr.length) {
            const title = i18n(VI18N.DOMAIN_MISMATCH_ALERT);
            const text = "\n" + i18n(VI18N.DOMAIN_MISMATCH_DETECTED) + "\n\n" + i18n(VI18N.PARENT_DOMAIN) + ": " + topDomain + "\n\n" + i18n(VI18N.CURRENT_DOMAIN) + ": " + misMatchArr.join(", ");
            const confirm = await AlertUI.inst.createAlert()
                .title(title)
                .text(text)
                .addButton("confirm", AlertUI.inst.createButton().text(i18n(VI18N.ALLOW)).value(true).build())
                .addButton("cancel", AlertUI.inst.createButton().text(i18n(VI18N.DENY)).value(false).build())
                .dangerMode(true)
                .show();
            return confirm;
        }
        return true;
    }
    getFrameData(card, allFields) {
        const data = {
            card: {},
            sharing_level: card.sharing_level
        };
        for (let field of allFields) {
            data.card[field] = this.getCCFieldValue(card, field);
        }
        return data;
    }
    getCCFieldValue(card, type) {
        switch (type) {
            case "ccnumber":
                return card.encrypted.fields.card_number;
            case "ccname":
                return card.encrypted.fields.card_holder_name;
            case "ccexpiration":
                return cardFillingUtil.formatValidThru(card.encrypted.fields.valid_thru);
            case "ccmonth":
                return cardFillingUtil.extractCardMonth(card.encrypted.fields.valid_thru);
            case "ccyear":
                return cardFillingUtil.extractCardYear(card.encrypted.fields.valid_thru);
            case "cccvv":
                return card.encrypted.fields.cvv;
            default:
                return "";
        }
    }
    addScroller() {
        $("#cardList").slimscroll({
            wheelStep: 10,
            touchScrollStep: 75,
            width: "100%",
            height: "300px"
        });
        $('#cardList').slimScroll().bind('slimscrolling', this.scrollEnd.bind(this));
    }
    scrollEnd() {
        const buffer = 40;
        if ($("#cardList").prop('scrollHeight') - $("#cardList").scrollTop() <= $("#cardList").height() + buffer) {
            $('#cardList').slimScroll().unbind('slimscrolling');
            this.refreshList();
        }
    }
    hideScroller() {
        $("#cardList").slimscroll({ destroy: true });
    }
    color(created_on = 0, name = "") {
        const colors = ["e0732d", "594139", "759d47", "3988cc", "4296a5", "1e4c41", "4b34a3", "b04120", "22548f", "7c919c"];
        const index = (created_on + name.length) % colors.length;
        return "#" + colors[index];
    }
    async syncing() {
        const searchElem = document.querySelector("#search");
        searchElem.placeholder = i18n(VI18N.SYNCING) + "...";
    }
    async synced() {
        if (!this.populatingCards) {
            this.populatingCards = true;
            this.initUI();
        }
    }
    async refreshList() {
        this.query.page_no++;
        const secrets = await bgApi.cardFrame.getSecrets(this.query);
        if (secrets.length == 0) {
            $('#cardList').slimScroll().unbind('slimscrolling');
        }
        const secretFragment = await this.getCardFragment(secrets);
        $('#cardList').append(secretFragment);
        if (secrets.length == this.query.rows_per_page) {
            $('#cardList').slimScroll().bind('slimscrolling', this.scrollEnd.bind(this));
        }
    }
    async openUnlockPage() {
        try {
            await bgApi.siteFrame.openUnlockVaultPage();
        }
        catch (e) {
            ZVError.error(e);
        }
    }
}
export const cl = new CardList();
setGlobal("cl", cl);
cl.main();
