(function () {
    'use strict';

    var VtColors;
    (function (VtColors) {
        VtColors["BLUE"] = "blue";
        VtColors["RED"] = "red";
        VtColors["GREEN"] = "green";
        VtColors["ORANGE"] = "orange";
        VtColors["PURPLE"] = "purple";
    })(VtColors || (VtColors = {}));

    var VtSettings;
    (function (VtSettings) {
        VtSettings["LOCK_ON_SYSTEM_LOCK"] = "LOCK_ON_SYSTEM_LOCK";
        VtSettings["STAY_SIGNED_IN"] = "STAY_SIGNED_IN";
        VtSettings["THEME"] = "THEME";
        VtSettings["FONT"] = "FONT";
        VtSettings["DARK_MODE"] = "DARK_MODE";
        VtSettings["DISABLE_WEBSITE_VAULT_ICON"] = "DISABLE_WEBSITE_VAULT_ICON";
        VtSettings["DISABLE_WEBSITE_KEYBOARD_SHORTCUT"] = "DISABLE_WEBSITE_KEYBOARD_SHORTCUT";
        VtSettings["DISABLE_BADGE_COUNT"] = "DISABLE_BADGE_COUNT";
        VtSettings["DISABLE_CLICK_TO_LOGIN"] = "DISABLE_CLICK_TO_LOGIN";
        VtSettings["DISABLE_SHADOW_ROOT"] = "DISABLE_SHADOW_ROOT";
    })(VtSettings || (VtSettings = {}));

    class Highlighter {
        colorMap = {
            [VtColors.BLUE]: "#4780da",
            [VtColors.RED]: "#d23040",
            [VtColors.GREEN]: "#58bc66",
            [VtColors.ORANGE]: "#db7942",
            [VtColors.PURPLE]: "#6847a5",
        };
        styleObj = {
            color: this.colorMap[VtColors.BLUE],
            opacity: "0.6",
            "text-decoration": "underline"
        };
        prevValSymbols = {};
        async init() {
            try {
                const theme = await zlocalStorage.load(VtSettings.THEME, VtColors.BLUE);
                this.styleObj.color = theme in this.colorMap ? this.colorMap[theme] : this.colorMap[VtColors.BLUE];
                for (let key in this.styleObj) {
                    this.prevValSymbols[key] = Symbol();
                }
            }
            catch (e) {
                logError(e);
            }
        }
        highlight(elem) {
            try {
                for (let key in this.styleObj) {
                    elem[this.prevValSymbols[key]] = elem.style.getPropertyValue(key);
                }
                js.dom.setStyleImportant(elem, this.styleObj);
            }
            catch (e) {
                logError(e);
            }
        }
        removeHighLight(elem) {
            try {
                for (let key in this.styleObj) {
                    elem.style.setProperty(key, elem[this.prevValSymbols[key]]);
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    var LocalStorageKeys;
    (function (LocalStorageKeys) {
        LocalStorageKeys["ACCESS_TOKEN"] = "ACCESS_TOKEN";
        LocalStorageKeys["REFRESH_TOKEN"] = "REFRESH_TOKEN_1";
        LocalStorageKeys["TOKEN_VALID_UPTO"] = "TOKEN_VALID_UPTO";
        LocalStorageKeys["DOMAIN"] = "DOMAIN";
        LocalStorageKeys["DB_VERSION"] = "DB_VERSION";
        LocalStorageKeys["ZTAB_ID"] = "ZTAB_ID";
        LocalStorageKeys["SECRETSLIMIT"] = "SECRETSLIMIT";
        LocalStorageKeys["SYNCING"] = "SYNCING";
        LocalStorageKeys["USER_SYNC"] = "USER_SYNC";
        LocalStorageKeys["LAST_SYNCED"] = "LAST_SYNCED";
        LocalStorageKeys["FEATURES"] = "FEATURES";
        LocalStorageKeys["PLAN"] = "PLAN";
        LocalStorageKeys["IS_PERSONAL_PLAN"] = "IS_PERSONAL_PLAN";
        LocalStorageKeys["DOMAIN_MATCHING_COUNT"] = "DOMAIN_MATCHING_COUNT";
        LocalStorageKeys["LAST_ACTIVE"] = "LAST_ACTIVE";
        LocalStorageKeys["USED_CATEGORIES"] = "USED_CATEGORIES";
        LocalStorageKeys["PAYMENT_CARD_TYPE_ID"] = "PAYMENT_CARD_TYPE_ID";
        LocalStorageKeys["ADDRESS_TYPE_ID"] = "ADDRESS_TYPE_ID";
        LocalStorageKeys["USER_ID"] = "USER_ID";
        LocalStorageKeys["ZUID"] = "ZUID";
        LocalStorageKeys["EMAIL"] = "EMAIL";
        LocalStorageKeys["USERNAME"] = "USERNAME";
        LocalStorageKeys["USER_ROLES"] = "USER_ROLES";
        LocalStorageKeys["DP"] = "DP";
        LocalStorageKeys["ENCRYPTED_DATE"] = "ENCRYPTED_DATE";
        LocalStorageKeys["SALT"] = "SALT";
        LocalStorageKeys["LOGIN_TYPE"] = "LOGIN_TYPE";
        LocalStorageKeys["ITERATIONS"] = "ITERATIONS";
        LocalStorageKeys["LAST_PASSPHRASE_CHANGE"] = "LAST_PASSPHRASE_CHANGE";
        LocalStorageKeys["PASSPHRASE_CREATION_TIME"] = "PASSPHRASE_CREATION_TIME";
        LocalStorageKeys["CLEAR_CLIPBOARD"] = "CLEAR_CLIPBOARD";
        LocalStorageKeys["DOMAIN_MATCHING_MODE_OLD"] = "DOMAIN_MATCHING_MODE_OLD";
        LocalStorageKeys["DOMAIN_MATCH_MODE"] = "DOMAIN_MATCH_MODE";
        LocalStorageKeys["INACTIVE_TIMEOUT"] = "INACTIVE_TIMEOUT";
        LocalStorageKeys["AUTO_SAVE_UPDATE_PASSWORDS"] = "AUTO_SAVE_UPDATE_PASSWORDS";
        LocalStorageKeys["INSECURE_PAGE_PROMPT"] = "INSECURE_PAGE_PROMPT";
        LocalStorageKeys["DEFAULT_FILTER"] = "DEFAULT_FILTER";
        LocalStorageKeys["INACTIVITY_ENFORCED"] = "INACTIVITY_ENFORCED";
        LocalStorageKeys["CARD_SAVE_PROMPT"] = "CARD_SAVE_PROMPT";
        LocalStorageKeys["CARD_AUTOFILL_SUBDOMAIN"] = "CARD_AUTOFILL_SUBDOMAIN";
        LocalStorageKeys["SHOW_ONLY_USER_DEFINED_SEC_TYPES"] = "SHOW_ONLY_USER_DEFINED_SEC_TYPES";
        LocalStorageKeys["ALLOW_PERSONAL_SECRET"] = "ALLOW_PERSONAL_SECRET";
        LocalStorageKeys["ALLOW_ENTERPRISE_SECRET"] = "ALLOW_ENTERPRISE_SECRET";
        LocalStorageKeys["ALLOW_FILE_ATTACHMENT"] = "ALLOW_FILE_ATTACHMENT";
        LocalStorageKeys["ALLOW_ADD_SECRET"] = "ALLOW_ADD_SECRET";
        LocalStorageKeys["ALLOW_SHARE_SECRET"] = "ALLOW_SHARE_SECRET";
        LocalStorageKeys["PII_ENABLED"] = "PII_ENABLED";
        LocalStorageKeys["ALLOW_SAME_NAME"] = "ALLOW_SAME_NAME";
        LocalStorageKeys["ALLOW_THIRD_PARTY_SHARING"] = "ALLOW_THIRD_PARTY_SHARING";
        LocalStorageKeys["ALLOW_ADD_FOLDER"] = "ALLOW_ADD_FOLDER";
        LocalStorageKeys["POLICY_USAGE"] = "POLICY_USAGE";
        LocalStorageKeys["DEFAULT_POLICY_ID"] = "DEFAULT_POLICY_ID";
        LocalStorageKeys["GENERATOR_STATE"] = "GENERATOR_STATE";
        LocalStorageKeys["ONEAUTH_TOTP_DEVICE"] = "ONEAUTH_TOTP_DEVICE";
        LocalStorageKeys["ONEAUTH_TOTP_SECRETS"] = "ONEAUTH_TOTP_SECRETS";
        LocalStorageKeys["ONE_CLICK_PASS_CHANGE_CHECK"] = "ONE_CLICK_PASS_CHANGE_CHECK";
        LocalStorageKeys["NEW_PLAIN_PASS_CHECK"] = "NEW_PLAIN_PASS_CHECK";
        LocalStorageKeys["USE_OLD_FILL"] = "USE_OLD_FILL";
        LocalStorageKeys["USE_OLD_DEVTOOLS_CHECK"] = "USE_OLD_DEVTOOLS_CHECK";
        LocalStorageKeys["SKIP_ONE_CLICK_BG_CONNECT_CHECK"] = "SKIP_ONE_CLICK_BG_CONNECT_CHECK";
        LocalStorageKeys["SKIP_DISC_PASSWORD_CHECK"] = "SKIP_DISC_PASSWORD_CHECK";
        LocalStorageKeys["SKIP_ONE_CLICK_TAB_CHECK"] = "SKIP_ONE_CLICK_TAB_CHECK";
        LocalStorageKeys["SKIP_PASSWORD_ASSESSMENT"] = "SKIP_PASSWORD_ASSESSMENT";
        LocalStorageKeys["USE_OLD_SUBMIT_REGEX"] = "USE_OLD_SUBMIT_REGEX";
        LocalStorageKeys["RESTRICT_ONEAUTH_UNLOCK"] = "RESTRICT_ONEAUTH_UNLOCK";
        LocalStorageKeys["RESTRICT_WEBAUTHN_UNLOCK"] = "RESTRICT_WEBAUTHN_UNLOCK";
        LocalStorageKeys["ONEAUTH_UNLOCK_ENABLED"] = "ONEAUTH_UNLOCK_ENABLED";
        LocalStorageKeys["ONEAUTH_UNLOCK"] = "ONEAUTH_UNLOCK";
        LocalStorageKeys["LAST_USED_UNLOCK"] = "LAST_USED_UNLOCK";
        LocalStorageKeys["WEBAUTHN_UNLOCK_ENABLED"] = "WEBAUTHN_UNLOCK_ENABLED";
        LocalStorageKeys["WEBAUTHN_UNLOCK"] = "WEBAUTHN_UNLOCK";
        LocalStorageKeys["PASSPHRASE_INVALID_COUNT"] = "PASSPHRASE_INVALID_COUNT";
        LocalStorageKeys["SIDE_PANEL_SUPPORTED"] = "SIDE_PANEL_SUPPORTED";
        LocalStorageKeys["DEV_MASTER_PASSWORD"] = "DEV_MASTER_PASSWORD";
    })(LocalStorageKeys || (LocalStorageKeys = {}));

    class SearchUtil {
        isPresent(pattern, input, ignoreCase = false) {
            if (ignoreCase) {
                pattern = pattern.toLowerCase();
                input = input.toLowerCase();
            }
            let patternI = 0;
            for (let i = 0; patternI < pattern.length && i < input.length; i++) {
                if (pattern[patternI] == input[i]) {
                    patternI++;
                }
            }
            return patternI == pattern.length;
        }
        getSearchRegex(searchString) {
            const regExInput = searchString.split("").map(this.getSearchRegexChar, this).join("");
            const searchRegex = new RegExp(regExInput, "i");
            return searchRegex;
        }
        escapeRegex(s) {
            return s.replace(/[-.*+?^${}()|[\]\\]/g, "\\$&");
        }
        getSearchRegexChar(inputChar) {
            const ch = this.escapeRegex(inputChar);
            return "[^" + ch + "]*?" + ch;
        }
    }

    class VUtil {
        search = context.searchUtil;
        async getValidSaveDomains() {
            try {
                const urls = await this.getSaveUrls();
                const parentDomains = urls.map(x => js.url.getParentDomain(x));
                return parentDomains;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async getSaveUrls() {
            try {
                if (this.isTopFrame()) {
                    return [window.location.href];
                }
                return [
                    await bgApi.tab.getTabUrl(),
                    window.location.href
                ];
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        isTopFrame() {
            try {
                return window == window.top;
            }
            catch (e) {
                return false;
            }
        }
    }

    class Context {
        searchUtil;
        vUtil;
        init() {
            this.searchUtil = new SearchUtil();
            this.vUtil = new VUtil();
        }
    }
    const context = new Context();

    const STRING = {
        TRUE: "true",
        FALSE: "false",
    };

    context.init();
    const vutil = context.vUtil;

    class UserAction {
        useOldFill = false;
        async init() {
            try {
                this.useOldFill = (await zlocalStorage.load(LocalStorageKeys.USE_OLD_FILL, STRING.FALSE)) == STRING.TRUE;
                await highlighter.init();
                info(UserAction.name, "user action - use old fill?", this.useOldFill);
            }
            catch (e) {
                logError(e);
            }
        }
        async userFill(input, value) {
            try {
                info(UserAction.name, "filling by user fill");
                highlighter.highlight(input);
                await js.time.delay(0.3);
                await this.fill(input, value);
                highlighter.removeHighLight(input);
            }
            catch (e) {
                logError(e);
            }
        }
        async fill(input, value) {
            info(UserAction.name, "filling input: ", input, "value: ", js.log.mask(value));
            const defaultInitObj = {
                bubbles: true,
                cancelable: true,
                view: window
            };
            input.dispatchEvent(new MouseEvent("mousedown", defaultInitObj));
            input.focus();
            input.dispatchEvent(new MouseEvent("mouseup", defaultInitObj));
            input.dispatchEvent(new MouseEvent("click", defaultInitObj));
            input.dispatchEvent(new KeyboardEvent("keydown", defaultInitObj));
            input.dispatchEvent(new KeyboardEvent("keypress", defaultInitObj));
            input.dispatchEvent(new KeyboardEvent("keyup", defaultInitObj));
            input.value = value;
            if (this.useOldFill) {
                input.dispatchEvent(new KeyboardEvent("keydown", defaultInitObj));
                input.dispatchEvent(new KeyboardEvent("keypress", defaultInitObj));
                input.dispatchEvent(new KeyboardEvent("keyup", defaultInitObj));
            }
            input.dispatchEvent(new InputEvent("input", defaultInitObj));
            input.dispatchEvent(new InputEvent("change", defaultInitObj));
            input.blur();
            input.focus();
            await js.time.delay(0.2);
            if (input.value != value) {
                input.value = value;
            }
        }
        async click(elem) {
            try {
                info(UserAction.name, "clicking: ", elem);
                highlighter.highlight(elem);
                await js.time.delay(0.3);
                elem.click();
                highlighter.removeHighLight(elem);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    let userAction$1;
    let highlighter;
    function initContext$3() {
        userAction$1 = new UserAction();
        highlighter = new Highlighter();
    }

    initContext$3();
    const userAction = userAction$1;

    let Util$1 = class Util {
        removeFrame(params = {}, frameId) {
            try {
                document.getElementById(frameId)?.remove?.();
                if (params.restoreFoucs) {
                    this.restoreFocus();
                }
            }
            catch (e) {
                logError(e);
            }
        }
        restoreFocus() {
            csutil.input.getActiveInput()?.focus?.();
        }
        async restore(key, shower) {
            try {
                if (!csutil.window.isTopFrame()) {
                    return;
                }
                await js.dom.waitDomLoad();
                const shownIframe = await ztabStorage.load(key, false);
                if (!shownIframe) {
                    return;
                }
                info("FRAME_SHOWER", "restore frame: ", key);
                await shower.show();
            }
            catch (e) {
                logError(e);
            }
        }
    };
    const util$2 = new Util$1();

    class CreateInput {
        id;
        path;
        width;
        height;
        style;
        static DEFAULT_WIDTH = 350;
        static DEFAULT_HEIGHT = 275;
        constructor(id, path, width, height, style) {
            this.id = id;
            this.path = path;
            this.width = width;
            this.height = height;
            this.style = style;
        }
    }
    class IFrameCreator {
        ID = {
            ALERT: "zoho_vault_alert_frame",
            CONFIRM: "zoho_vault_confirm_frame",
            SITE: "zoho_vault_site_frame",
            SAVE: "zoho_vault_save_frame",
            UPDATE: "zoho_vault_update_frame",
            CARD_LIST: "zohovault_card_list_frame",
            CARD_SAVE_UPDATE: "zoho_vault_card_save_update_frame",
            FORM_LIST: "zoho_vault_form_filling_frame",
            RESET: "zohovault_reset_frame",
        };
        PATH = {
            CONFIRM: "/html/tab/ConfirmFrame.html",
            RESET: "/html/tab/ResetFrame.html",
            SAVE: "/html/tab/SaveFrame.html",
            SITE: "/html/tab/SiteFrame.html",
            UPDATE: "/html/tab/UpdateFrame.html",
            CARD_LIST: "/html/tab/ZVaultFormList.html",
            ADDRESS_LIST: "/html/tab/ZVaultAddressList.html",
            SAVE_UPDATE_CARD: "/html/tab/ZVaultSaveCard.html",
            ALERT: "/html/tab/Alert.html",
        };
        newCreateInput({ id = "", path = "", width = CreateInput.DEFAULT_WIDTH, height = CreateInput.DEFAULT_HEIGHT, style = "", } = {}) {
            return new CreateInput(id, path, width, height, style);
        }
        createFrame(input) {
            try {
                util$2.removeFrame({}, input.id);
                const frame = document.createElement("iframe");
                frame.name = input.id;
                frame.id = input.id;
                frame.src = brApi.runtime.getUrl(input.path);
                frame.style.zIndex = Date.now() + "";
                frame.width = input.width + "px";
                frame.height = input.height + "px";
                frame.setAttribute("style", this.getStyle(input));
                if (input.style) {
                }
                return frame;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getStyle(input) {
            if (input.style) {
                return input.style;
            }
            return `height ${input.height}px !important;width: ${input.width}px !important;` +
                "position: fixed !important;border:none !important;" +
                `min-width: ${input.width}px !important;` +
                `min-height: ${input.height}px !important;` +
                "opacity: 100 !important;" +
                "box-shadow: -2px 0 6px 0 rgba(0,0,0,.15) !important;" +
                "height: max-content !important;" +
                "transition: right 0.5s;" +
                `top: 20px !important;right: -${input.width}px !important;` +
                "z-index: " + Date.now() + " !important;";
        }
    }
    const iframeCreator = new IFrameCreator();

    var TabStorageKeys;
    (function (TabStorageKeys) {
        TabStorageKeys["SHOWN_SAVE_FRAME"] = "SHOWN_SAVE_FRAME";
        TabStorageKeys["SHOWN_UPDATE_FRAME"] = "SHOWN_UPDATE_FRAME";
        TabStorageKeys["SHOWN_RESET_FRAME"] = "SHOWN_RESET_FRAME";
        TabStorageKeys["SHOWN_SAVE_CARD_FRAME"] = "SHOWN_SAVE_CARD_FRAME";
        TabStorageKeys["SHOWN_UPDATE_CARD_FRAME"] = "SHOWN_UPDATE_CARD_FRAME";
        TabStorageKeys["CONFIRM_USAGE_FOR"] = "CONFIRM_USAGE_FOR";
        TabStorageKeys["LOGIN_DATA"] = "LOGIN_DATA";
        TabStorageKeys["ZICON_CLICK_LOCATION"] = "ZICON_CLICK_LOCATION";
        TabStorageKeys["ACTIVE_FRAME_ID"] = "ACTIVE_FRAME_ID";
        TabStorageKeys["SITE_FRAME_ARROW_CLASS"] = "SITE_FRAME_ARROW_CLASS";
        TabStorageKeys["ALERT_CONFIG"] = "ALERT_CONFIG";
        TabStorageKeys["SAVE_FRAME_DATA"] = "SAVE_FRAME_DATA";
        TabStorageKeys["UPDATE_FRAME_DATA"] = "UPDATE_FRAME_DATA";
        TabStorageKeys["CARD_FRAME_DATA"] = "CARD_FRAME_DATA";
        TabStorageKeys["SAVE_CARD_FRAME_DATA"] = "SAVE_CARD_FRAME_DATA";
        TabStorageKeys["FORM_FRAME_DATA"] = "FORM_FRAME_DATA";
        TabStorageKeys["SF_SHOWN_TAB"] = "SF_SHOWN_TAB";
        TabStorageKeys["SF_SEARCH_STRING"] = "SF_SEARCH_STRING";
        TabStorageKeys["PLAYBACK_DATA"] = "PLAYBACK_DATA";
        TabStorageKeys["RESET_PROGRESS"] = "RESET_PROGRESS";
        TabStorageKeys["RESET_DATA"] = "RESET_DATA";
        TabStorageKeys["CCIFRAMEDATA"] = "CCIFRAMEDATA";
        TabStorageKeys["OPENED_DEV_TOOLS"] = "OPENED_DEV_TOOLS";
    })(TabStorageKeys || (TabStorageKeys = {}));

    class ShowInput {
        frame;
        shownDbKey;
        animateRight;
        constructor(frame, shownDbKey, animateRight) {
            this.frame = frame;
            this.shownDbKey = shownDbKey;
            this.animateRight = animateRight;
        }
    }
    class IframeShower {
        newShowInput({ frame = null, animateRight = false, shownDbKey = "", } = {}) {
            return new ShowInput(frame, shownDbKey, animateRight);
        }
        async show(input) {
            try {
                if (input.shownDbKey) {
                    await ztabStorage.save(input.shownDbKey, true);
                }
                this.attachFrame(input.frame);
                if (input.animateRight) {
                    await js.time.delay(0.1);
                    js.dom.setStyleImportant(input.frame, { right: "20px" });
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async showSiteFrame(input, { width = 0, height = 0 } = {}) {
            try {
                const frame = input.frame;
                let { x = 0, y = 0 } = await ztabStorage.load(TabStorageKeys.ZICON_CLICK_LOCATION);
                if (document.activeElement instanceof HTMLIFrameElement) {
                    const rect = document.activeElement.getBoundingClientRect();
                    x += rect.x;
                    y += rect.y;
                }
                let arrow = "";
                let top = 0;
                let left = 0;
                if (y + 10 + height > document.documentElement.clientHeight) {
                    top = Math.max(y - 10 - height, 0);
                    frame.style.boxShadow = "rgba(0, 0, 0, 0.3) 0px -17px 20px";
                    arrow = "bottom";
                }
                else {
                    top = y + 10;
                    frame.style.boxShadow = "rgba(0, 0, 0, 0.3) 0px 17px 17px";
                    arrow = "top";
                }
                if (x - 15 + width > document.documentElement.clientWidth) {
                    left = x - width + 15;
                    arrow += "-right";
                }
                else {
                    left = x - 15;
                    arrow += "-left";
                }
                js.dom.setStyleImportant(frame, {
                    top: top + "px",
                    left: left + "px",
                    bottom: "unset",
                    right: "unset",
                });
                iframeShower.show(iframeShower.newShowInput({ frame }));
                await ztabStorage.save(TabStorageKeys.SITE_FRAME_ARROW_CLASS, arrow);
            }
            catch (e) {
                logError(e);
            }
        }
        attachFrame(frame) {
            const div = document.createElement("div");
            const shadow = div.attachShadow({ mode: "closed" });
            shadow.append(frame);
            div.id = frame.id;
            div.setAttribute("style", "position: fixed !important;" +
                "opacity: 100 !important;" +
                "z-index: " + Date.now() + " !important;" +
                "display: block !important;");
            document.documentElement.append(div);
        }
    }
    const iframeShower = new IframeShower();

    class AlertFrame {
        async show() {
            const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
                id: iframeCreator.ID.ALERT,
                path: iframeCreator.PATH.ALERT,
                style: this.getStyle(),
            }));
            iframeShower.show(iframeShower.newShowInput({ frame }));
        }
        close(params = {}) {
            util$2.removeFrame(params, iframeCreator.ID.ALERT);
        }
        getStyle() {
            return `height: 100% !important;width: 100% !important;` +
                "position: fixed !important;border:none !important;" +
                "opacity: 100 !important;" +
                "box-shadow: -2px 0 6px 0 rgba(0,0,0,.15) !important;" +
                "transition: right 0.5s;" +
                `top: 0px !important;right: 0px !important;` +
                "z-index: " + Date.now() + " !important;";
        }
    }
    const exp_alertFrame = new AlertFrame();

    class CardFrame {
        async show() {
            try {
                const width = 380;
                const height = 390;
                const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
                    id: iframeCreator.ID.CARD_SAVE_UPDATE,
                    path: iframeCreator.PATH.CARD_LIST,
                    width,
                    height,
                }));
                await iframeShower.showSiteFrame(iframeShower.newShowInput({ frame }), { width, height });
            }
            catch (e) {
                logError(e);
            }
        }
        close(params = {}) {
            util$2.removeFrame(params, iframeCreator.ID.CARD_SAVE_UPDATE);
        }
    }
    const exp_cardFrame = new CardFrame();

    class CardSaveFrame {
        shownDbKey = TabStorageKeys.SHOWN_SAVE_CARD_FRAME;
        async show() {
            await ztabStorage.remove(TabStorageKeys.SHOWN_UPDATE_CARD_FRAME);
            const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
                id: iframeCreator.ID.CARD_SAVE_UPDATE,
                path: iframeCreator.PATH.SAVE_UPDATE_CARD,
                height: 400,
                width: 350,
            }));
            iframeShower.show(iframeShower.newShowInput({
                frame,
                animateRight: true,
                shownDbKey: this.shownDbKey,
            }));
        }
        close(params = {}) {
            util$2.removeFrame(params, iframeCreator.ID.CARD_SAVE_UPDATE);
        }
        async restore() {
            return util$2.restore(this.shownDbKey, this);
        }
    }
    const exp_cardSaveFrame = new CardSaveFrame();

    class CardUpdateFrame {
        shownDbKey = TabStorageKeys.SHOWN_UPDATE_CARD_FRAME;
        async show() {
            await ztabStorage.remove(TabStorageKeys.SHOWN_SAVE_CARD_FRAME);
            const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
                id: iframeCreator.ID.CARD_SAVE_UPDATE,
                path: iframeCreator.PATH.SAVE_UPDATE_CARD,
                height: 340,
                width: 350,
            }));
            iframeShower.show(iframeShower.newShowInput({
                frame,
                animateRight: true,
                shownDbKey: this.shownDbKey,
            }));
        }
        close(params = {}) {
            util$2.removeFrame(params, iframeCreator.ID.CARD_SAVE_UPDATE);
        }
        async restore() {
            return util$2.restore(this.shownDbKey, this);
        }
    }
    const exp_cardUpdateFrame = new CardUpdateFrame();

    class ConfirmFrame {
        async show() {
            const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
                id: iframeCreator.ID.CONFIRM,
                path: iframeCreator.PATH.CONFIRM,
                height: 200,
            }));
            iframeShower.show(iframeShower.newShowInput({ frame, animateRight: true }));
        }
        close(params = {}) {
            util$2.removeFrame(params, iframeCreator.ID.CONFIRM);
        }
    }
    const exp_confirmFrame = new ConfirmFrame();

    class FormFrame {
        async show(frameUrl) {
            try {
                const width = 380;
                const height = 390;
                const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
                    id: iframeCreator.ID.FORM_LIST,
                    path: frameUrl,
                    width,
                    height,
                }));
                await iframeShower.showSiteFrame(iframeShower.newShowInput({ frame }), { width, height });
            }
            catch (e) {
                logError(e);
            }
        }
        close(params = {}) {
            util$2.removeFrame(params, iframeCreator.ID.FORM_LIST);
        }
    }
    const exp_formFrame = new FormFrame();

    class ResetFrame {
        shownDbKey = TabStorageKeys.SHOWN_RESET_FRAME;
        height = 310;
        width;
        async show() {
            const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
                id: iframeCreator.ID.RESET,
                path: iframeCreator.PATH.RESET,
                height: 310,
                width: 400,
                style: this.getStyle(),
            }));
            iframeShower.show(iframeShower.newShowInput({
                frame,
                shownDbKey: this.shownDbKey,
            }));
        }
        close(params = {}) {
            util$2.removeFrame(params, iframeCreator.ID.RESET);
        }
        async restore() {
            return util$2.restore(this.shownDbKey, this);
        }
        getStyle() {
            return `height ${this.height}px !important;width: ${this.width}px !important;` +
                "position: fixed !important;border:none !important;" +
                `min-width: ${this.width}px !important;` +
                `min-height: ${this.height}px !important;` +
                "opacity: 100 !important;" +
                "box-shadow: -2px 0 6px 0 rgba(0,0,0,.15) !important;" +
                "height: max-content !important;" +
                "transition: right 0.5s;" +
                `top: 0px !important; left: 0px !important;` +
                "z-index: " + Date.now() + " !important;" +
                "background-color: #f8f8f8 !important;";
        }
    }
    const exp_resetFrame = new ResetFrame();

    class SaveFrame {
        shownDbKey = TabStorageKeys.SHOWN_SAVE_FRAME;
        async show() {
            const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
                id: iframeCreator.ID.SAVE,
                path: iframeCreator.PATH.SAVE,
                height: 350,
                width: 375,
            }));
            iframeShower.show(iframeShower.newShowInput({
                frame,
                animateRight: true,
                shownDbKey: this.shownDbKey,
            }));
        }
        close(params = {}) {
            util$2.removeFrame(params, iframeCreator.ID.SAVE);
        }
        async restore() {
            return util$2.restore(this.shownDbKey, this);
        }
    }
    const exp_saveFrame = new SaveFrame();

    class SiteFrame {
        async show() {
            try {
                if (await bgApi.tab.getFrameId() != 0) {
                    return;
                }
                const width = 380;
                const height = 390;
                const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
                    id: iframeCreator.ID.SITE,
                    path: iframeCreator.PATH.SITE,
                    width,
                    height,
                }));
                await iframeShower.showSiteFrame(iframeShower.newShowInput({ frame }), { width, height });
            }
            catch (e) {
                logError(e);
            }
        }
        close(params = {}) {
            util$2.removeFrame(params, iframeCreator.ID.SITE);
        }
    }
    const exp_siteFrame = new SiteFrame();

    class UpdateFrame {
        shownDbKey = TabStorageKeys.SHOWN_UPDATE_FRAME;
        async show() {
            const frame = iframeCreator.createFrame(iframeCreator.newCreateInput({
                id: iframeCreator.ID.UPDATE,
                path: iframeCreator.PATH.UPDATE,
            }));
            iframeShower.show(iframeShower.newShowInput({
                frame,
                animateRight: true,
                shownDbKey: this.shownDbKey,
            }));
        }
        close(params = {}) {
            util$2.removeFrame(params, iframeCreator.ID.UPDATE);
        }
        async restore() {
            return util$2.restore(this.shownDbKey, this);
        }
    }
    const exp_updateFrame = new UpdateFrame();

    class CSFrame {
        alert = exp_alertFrame;
        confirm = exp_confirmFrame;
        siteFrame = exp_siteFrame;
        saveFrame = exp_saveFrame;
        updateFrame = exp_updateFrame;
        cardFrame = exp_cardFrame;
        cardSave = exp_cardSaveFrame;
        formFrame = exp_formFrame;
        cardUpdate = exp_cardUpdateFrame;
        resetFrame = exp_resetFrame;
        async init() {
            try {
                if (!csutil.window.isTopFrame()) {
                    return;
                }
                await js.dom.waitDomLoad();
                await this.saveFrame.restore();
                await this.updateFrame.restore();
                await this.resetFrame.restore();
                await this.cardSave.restore();
                await this.cardUpdate.restore();
            }
            catch (e) {
                logError(e);
            }
        }
        async closeFrame(params = {}) {
            try {
                this.saveFrame.close();
                this.updateFrame.close();
                this.resetFrame.close();
                this.cardSave.close();
                this.cardUpdate.close();
                this.alert.close();
                this.confirm.close();
                if (params.restoreFoucs) {
                    util$2.restoreFocus();
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async closeAllFrames() {
            try {
                await this.closeFrame();
                await this.siteFrame.close();
                await this.cardFrame.close();
            }
            catch (e) {
                logError(e);
            }
        }
    }
    const exp_csframe = new CSFrame();

    var VtEventScopes;
    (function (VtEventScopes) {
        VtEventScopes["BG"] = "BG";
    })(VtEventScopes || (VtEventScopes = {}));
    var VtLoginState;
    (function (VtLoginState) {
        VtLoginState["LOGGED_OUT"] = "LOGGED_OUT";
        VtLoginState["LOCKED"] = "LOCKED";
        VtLoginState["UNLOCKED"] = "UNLOCKED";
    })(VtLoginState || (VtLoginState = {}));
    var SecretHighlightFields;
    (function (SecretHighlightFields) {
        SecretHighlightFields["NAME"] = "NAME";
        SecretHighlightFields["UI_TEXT"] = "UI_TEXT";
        SecretHighlightFields["WORDS"] = "WORDS";
        SecretHighlightFields["WORDS_INCLUDE"] = "WORDS_INCLUDE";
    })(SecretHighlightFields || (SecretHighlightFields = {}));
    var FolderHighlightFields;
    (function (FolderHighlightFields) {
        FolderHighlightFields["NAME"] = "NAME";
    })(FolderHighlightFields || (FolderHighlightFields = {}));
    var URL_Part;
    (function (URL_Part) {
        URL_Part["HOST"] = "HOST";
        URL_Part["HOSTNAME"] = "HOSTNAME";
        URL_Part["DOMAIN"] = "DOMAIN";
    })(URL_Part || (URL_Part = {}));

    class ZVGlobal {
        static isDevMode() {
            return DevModeChecker.isDevMode();
        }
        static setGlobal(key, x) {
            if (globalThis) {
                globalThis[key] = x;
            }
            if (typeof window !== "undefined") {
                window[key] = x;
            }
        }
    }
    class DevModeChecker {
        static checked = false;
        static devMode = false;
        static isDevMode() {
            if (this.checked) {
                return this.devMode;
            }
            this.devMode = chrome.runtime.getManifest().name.includes("Dev");
            this.checked = true;
            return this.devMode;
        }
    }

    function setGlobal(key, x) {
        ZVGlobal.setGlobal(key, x);
    }

    class CS {
        fieldFillder = null;
        card = null;
        form = null;
        login = null;
        totpLogin = null;
        passwordReset = null;
        savePasswordHandler = null;
        sitePasswordChangeObserver = null;
        loginPasswordChangeHandler = null;
        other = null;
        downloadUtil = null;
    }
    const cs = new CS();
    setGlobal("cs", cs);

    class CSBgEventListener {
        init() {
            portApi.createEventClient().init(VtEventScopes.BG, this);
        }
        login = new BgLoginEventHandler();
        settings = new BgSettingsEventHandler();
        secret = new BgSecretEventHandler();
    }
    class BgSecretEventHandler {
        added() {
            try {
                zicon.onSecretAddEdited();
            }
            catch (e) {
                logError(e);
            }
        }
        changed() {
            try {
                zicon.onSecretAddEdited();
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class BgLoginEventHandler {
        locked() {
            try {
                zicon.onLocked();
                exp_csframe.closeFrame();
                cs.savePasswordHandler.disableSave();
                cs.sitePasswordChangeObserver.disableSave();
            }
            catch (e) {
                logError(e);
            }
        }
        unlocked() {
            try {
                zicon.onUnlocked();
                cs.savePasswordHandler.enableSave();
                cs.sitePasswordChangeObserver.enableSave();
            }
            catch (e) {
                logError(e);
            }
        }
        loggedOut() {
            try {
                zicon.onLoggedOut();
                exp_csframe.closeAllFrames();
                cs.savePasswordHandler.disableSave();
                cs.sitePasswordChangeObserver.disableSave();
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class BgSettingsEventHandler {
        settingChanged(name, value) {
            try {
                zicon.onSettingChanged(name, value);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class ZVError {
        static error(e) {
            if (ZVUIError.isUIError(e)) {
                throw ZVUIError.getInstance(e);
            }
        }
        static getUIErrorMsg(e) {
            if (!ZVUIError.isUIError(e)) {
                return e + "";
            }
            const errorMsg = ZVUIError.getUIErrorMsg(e);
            if (errorMsg.startsWith("i18n:")) {
                return chrome.i18n.getMessage(errorMsg.slice("i18n:".length));
            }
            return errorMsg;
        }
    }
    class ZVUIError extends Error {
        static PREFIX = "ZV: ";
        constructor(message) {
            super(message);
        }
        static getErrorMsg(error) {
            error = error + "";
            return error.startsWith(this.PREFIX) ? error : this.PREFIX + error;
        }
        static getInstance(error) {
            if (error instanceof ZVUIError) {
                return error;
            }
            throw new ZVUIError(this.getErrorMsg(error));
        }
        static isUIError(e) {
            return e instanceof ZVUIError ||
                ((typeof e == "string") && e.startsWith(this.PREFIX));
        }
        [Symbol.toPrimitive]() {
            return this.message;
        }
        static getUIErrorMsg(error) {
            try {
                if (!this.isUIError(error)) {
                    return error;
                }
                return (error + "").slice(this.PREFIX.length);
            }
            catch (e) {
                logError(e);
                return "" + error;
            }
        }
    }

    const frameUrls = {
        CARD_FRAME: "/html/tab/ZVaultCardsList.html",
        ADDRESS_FRAME: "/html/tab/ZVaultAddressList.html"};

    class CardFillingUtil {
        numberRegEx = new RegExp(/.*(card|cc|acct|account).?(number|no|num)|card.?#|card.?no|cc.?num|acct.?num|nummer|credito|numero|número|numéro|カード番号|Номер.*карты|信用卡号|信用卡号码|信用卡卡號|카드/, 'i');
        nameRegEx = new RegExp(/.*(card|account|cc).?(holder|name|owner)|name.*\\bon\\b.*card|cc.?name|name.*on.*card|cc.?full.?name|owner|karteninhaber|name.*auf.*der.*karte|nombre.*tarjeta|nom.*carte|nome.*cart|名前|Имя.*карты|信用卡开户名|开户名|持卡人姓名|持卡人姓名/, 'i');
        nameFilterRegEx = new RegExp(/.*((first|last|user|guest|company|login|Vor|Nach|employer|employee|billing|signin).?)name/, 'i');
        monthRegEx = new RegExp(/.*(cc|card|account|acc|exp.*).?(month|mon|mm)|month|.?mes/, 'i');
        yearRegEx = new RegExp(/.*(cc|card|account|acc|exp.*).?(year|yyyy|yy|yr)|year|.?anio/, 'i');
        monthRegEx2 = new RegExp(/.*(cc|card|account|acc|exp.*)?.?(month|mon|mm)|month/, 'i');
        yearRegEx2 = new RegExp(/.*(cc|card|account|acc|exp.*)?.?(year|yyyy|yy|yr)|year/, 'i');
        cvvOrcidRegEx = new RegExp(/card identification|^verification|security.?code|cvn|cvv|cvc|csc|codigo.?seguridad/, 'i');
        labelRegEx = new RegExp(/.*(card|account|cc).?(label|alias)/, 'i');
        expiryCommonRegEx = new RegExp(/.*(expir|exp.*date|mm.yy|ablauf|gueltig|gültig|fecha|date.*exp|scadenza|有効期限|validade|Срок действия карты)/, 'i');
        cancelButtonRegEx = new RegExp(/.*(cancel|later|skip|not.?now|back)/, 'i');
        isValidCardValue(field) {
            let value = field.value;
            if (value == undefined || value == "") {
                return false;
            }
            if (field.tagName == 'SELECT') {
                if (parseInt(field.value) == 0 || isNaN(parseInt(field.value))) {
                    return false;
                }
            }
            return true;
        }
        extractCardMonth(validThru) {
            if (validThru == "") {
                return 0;
            }
            validThru = validThru.split("/");
            return validThru.length > 0 ? this.getValidMonth(validThru[0]) : 0;
        }
        extractCardYear(validThru) {
            if (validThru == "") {
                return 0;
            }
            validThru = validThru.split("/");
            return validThru.length > 1 ? this.getValidYear(validThru[1]) : 0;
        }
        getValidMonth(num) {
            if (isNaN(num)) {
                return this.getMonthNumber(num);
            }
            num = parseInt(num);
            if (num > 0 && num <= 12) {
                return num < 10 ? "0" + num : num;
            }
            return 0;
        }
        getMonthNumber(str) {
            const monthMap = {
                "Jan": "01",
                "Feb": "02",
                "Mar": "03",
                "Apr": "04",
                "May": "05",
                "Jun": "06",
                "Jul": "07",
                "Aug": "08",
                "Sep": "09",
                "Oct": "10",
                "Nov": "11",
                "Dec": "12"
            };
            const monthRegex = new RegExp(Object.keys(monthMap).join("|"), "i");
            const match = str.match(monthRegex);
            if (match) {
                return monthMap[match[0]];
            }
            return 0;
        }
        getValidYear(num) {
            if (isNaN(num)) {
                return 0;
            }
            else if (num <= 0) {
                return 0;
            }
            num = num.toString().trim();
            if (num.length == 2) {
                return "20" + num;
            }
            else if (num.length == 4 && num[0] == "2") {
                return num;
            }
            else {
                return 0;
            }
        }
        getValidThru(month, year) {
            month = this.getValidMonth(month);
            month = month == 0 ? "mm" : month;
            year = this.getValidYear(year);
            year = year == 0 ? "yyyy" : year;
            if (month == "mm" && year == "yyyy") {
                return "";
            }
            return month + " / " + year;
        }
        formatValidThru(validThru) {
            const month = this.extractCardMonth(validThru);
            const year = this.extractCardYear(validThru);
            return this.getValidThru(month, year);
        }
        findMonthOption(element, value) {
            if (element.tagName.toLowerCase() != "select") {
                return value;
            }
            const allOptions = element.options;
            for (let option of allOptions) {
                const elmValue = option.value;
                if (this.getValidMonth(elmValue) == value) {
                    return elmValue;
                }
            }
            return 0;
        }
        getYearForInput(element, value) {
            if (element.hasAttribute('maxlength')) {
                const length = element.getAttribute('maxlength');
                return value.toString().substring(length);
            }
            return value;
        }
        findYearOption(element, value) {
            if (element.tagName.toLowerCase() != "select") {
                return this.getYearForInput(element, value);
            }
            const allOptions = element.options;
            for (let option of allOptions) {
                const elmValue = option.value;
                if (this.getValidYear(elmValue) == value) {
                    return elmValue;
                }
            }
            if (value.toString().length == 4) {
                return this.findYearOption(element, value.toString().substring(2));
            }
            return 0;
        }
        checkAttribute(elem, attr, regex) {
            const attrValue = $(elem).attr(attr);
            if (typeof attr !== 'undefined' && attr != false) {
                return regex.test(attrValue);
            }
            return false;
        }
        async getPaymentCardCategoryId() {
            try {
                return await zlocalStorage.load(LocalStorageKeys.PAYMENT_CARD_TYPE_ID, "");
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async isPaymentCardCategory(categoryId) {
            try {
                const paymentCardId = await this.getPaymentCardCategoryId();
                return paymentCardId == categoryId;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }
    const cardFillingUtil = new CardFillingUtil();
    setGlobal("cardFillingUtil", cardFillingUtil);

    var FilterType;
    (function (FilterType) {
        FilterType["ALL"] = "ALL";
        FilterType["ANY"] = "ANY";
    })(FilterType || (FilterType = {}));
    class PageQuery {
        page_no = 0;
        rows_per_page = 50;
        search_string = "";
    }
    class PageQueryBuilder {
        query;
        constructor(query) {
            this.query = query;
        }
        build() {
            return this.query;
        }
        pageNo(pageNo) {
            this.query.page_no = pageNo;
            return this;
        }
        rowsPerPage(rowsPerPage) {
            this.query.rows_per_page = rowsPerPage;
            return this;
        }
        searchString(searchString) {
            this.query.search_string = searchString;
            return this;
        }
    }
    class ChangedCredential {
        oldPassword = "";
        newPassword = "";
    }
    class PasswordResetInfo {
        static MAX_WAIT_TIME_MS = 1 * 60 * 1000;
        secretId = "";
        fieldName = "";
        userName = "";
        oldPassword = "";
        newPassword = "";
        steps = [];
        currentStepIndex = 0;
        expiresIn = 0;
    }

    class SecretQuery extends PageQuery {
        static ROWS_PER_PAGE = 50;
        static newBuilder() {
            return new SecretQueryBuilder(new SecretQuery());
        }
        constructor() { super(); }
        typeId = "";
        folderId = "";
        includeSecretData = false;
        noLogo = false;
        favourite = false;
        domainMatching = false;
        domainMatchingUrl = "";
        recentlyUsed = false;
        recentlyAdded = false;
        classification = FilterType.ALL;
        sharing = FilterType.ALL;
        orderBy = null;
        owned = false;
        tagMode = FilterType.ALL;
        tags = [];
    }
    var SecretQueryOrderBy;
    (function (SecretQueryOrderBy) {
        SecretQueryOrderBy["HOST_RECENT"] = "HOST_RECENT";
        SecretQueryOrderBy["DOMAIN_FAVOURITE"] = "DOMAIN_FAVOURITE";
    })(SecretQueryOrderBy || (SecretQueryOrderBy = {}));
    class SecretQueryBuilder extends PageQueryBuilder {
        constructor(query) { super(query); }
        typeId(typeId) { this.query.typeId = typeId; return this; }
        folderId(folderId) { this.query.folderId = folderId; return this; }
        noLogo(noLogo) { this.query.noLogo = noLogo; return this; }
        orderByHostRecent() { this.query.orderBy = SecretQueryOrderBy.HOST_RECENT; return this; }
        orderByDomainFavourite() { this.query.orderBy = SecretQueryOrderBy.DOMAIN_FAVOURITE; return this; }
        favourite(favourite) { this.query.favourite = favourite; return this; }
        recentlyUsed(recentlyUsed) { this.query.recentlyUsed = recentlyUsed; return this; }
        recentlyAdded(recentlyAdded) { this.query.recentlyAdded = recentlyAdded; return this; }
        domainMatching(domainMatching, url = "") {
            this.query.domainMatching = domainMatching;
            this.query.domainMatchingUrl = url;
            return this;
        }
        sharing(sharing) { this.query.sharing = sharing; return this; }
        classification(classification) { this.query.classification = classification; return this; }
        includeSecretData(include) { this.query.includeSecretData = include; return this; }
        tagMode(tagMode) { this.query.tagMode = tagMode; return this; }
        tags(tags) { this.query.tags = tags; return this; }
        owned(owned) { this.query.owned = owned; return this; }
    }

    var CARD_FIELDS;
    (function (CARD_FIELDS) {
        CARD_FIELDS["NAME"] = "card_holder_name";
        CARD_FIELDS["NUMBER"] = "card_number";
        CARD_FIELDS["CVV"] = "cvv";
        CARD_FIELDS["VALID_UPTO"] = "valid_thru";
    })(CARD_FIELDS || (CARD_FIELDS = {}));
    var ADDRESS_FIELDS;
    (function (ADDRESS_FIELDS) {
        ADDRESS_FIELDS["FIRST_NAME"] = "first_name";
        ADDRESS_FIELDS["MIDDLE_NAME"] = "middle_name";
        ADDRESS_FIELDS["LAST_NAME"] = "last_name";
        ADDRESS_FIELDS["ADDRESS_1"] = "address_1";
        ADDRESS_FIELDS["ADDRESS_2"] = "address_2";
        ADDRESS_FIELDS["ADDRESS_3"] = "address_3";
        ADDRESS_FIELDS["COUNTRY"] = "country";
        ADDRESS_FIELDS["STATE"] = "state";
        ADDRESS_FIELDS["CITY"] = "city";
        ADDRESS_FIELDS["ZIP"] = "zip";
        ADDRESS_FIELDS["MOBILE"] = "mobile";
    })(ADDRESS_FIELDS || (ADDRESS_FIELDS = {}));

    class CSFormDetector {
        attributeName = "";
        formAttribute = "";
        formIndex = 0;
        frameUrl = "";
        async detectFields(selector, regex, type, checkClass = true, filterOut = null) {
            const field = selector.filter(function () {
                let text = this.getAttribute('name') + this.getAttribute('autocomplete') + this.getAttribute('id')
                    + this.getAttribute('placeholder');
                text = checkClass ? text + this.getAttribute('class') : text;
                const remove = filterOut && filterOut.test(text);
                return regex.test(text) && !remove && (this.offsetWidth > 10 || this.tagName == "SELECT");
            });
            let matchCount = 0;
            for (let element of field) {
                matchCount++;
                if (element.hasAttribute(this.attributeName)) {
                    continue;
                }
                this.markCCField(element, type);
                break;
            }
            return matchCount == 0 ? [] : field;
        }
        markCCField(element, type) {
            element.setAttribute(this.attributeName, type);
            element.setAttribute(this.attributeName + "-iframe", type);
            const form = element.form == undefined ? document.body : element.form;
            if (form != undefined) {
                const formData = form.getAttribute(this.formAttribute);
                if (formData == undefined) {
                    form.setAttribute(this.formAttribute, "ccform" + this.formIndex);
                    element.setAttribute(this.attributeName + "-parent", "ccform" + this.formIndex++);
                }
                else {
                    element.setAttribute(this.attributeName + "-parent", formData);
                }
            }
        }
        async fillVaultIcon(element, _clickAction) {
            if (!element) {
                return;
            }
            zicon.adder.add(element);
        }
        async ccFieldClicked(event) {
            const elm = event.target;
            const currentType = elm.getAttribute('type');
            if (currentType == "button" || currentType == "submit") {
                return;
            }
            const data = {};
            data.element = elm.getAttribute(this.attributeName);
            data.attribute = this.attributeName;
            data.parent = elm.getAttribute(this.attributeName + '-parent');
            data.boundary = { x: event.clientX, y: event.clientY };
            data.multiIframes = elm.hasAttribute(this.attributeName + '-iframe-enabled');
            await this.loadFormFillingFrame(data);
            return;
        }
        async loadFormFillingFrame(data) {
            const clickLocation = data.boundary;
            ztabStorage.save(TabStorageKeys.ZICON_CLICK_LOCATION, clickLocation);
            const activeFrameId = await bgApi.tab.getFrameId();
            ztabStorage.save(TabStorageKeys.ACTIVE_FRAME_ID, activeFrameId);
            await bgApi.cardFrame.showFormFrame(this.frameUrl);
            data.frameUrl = window.location.href;
            ztabStorage.save(TabStorageKeys.FORM_FRAME_DATA, data);
            return;
        }
        removeCustomAttributes(removeIframe) {
            for (let index = 0; index < this.formIndex; index++) {
                const attribute = this.attributeName + '-parent=ccform' + index + ']';
                const ccfields = document.querySelectorAll('input[' + attribute + ', select[' + attribute);
                this.removeAttributesFromArray(ccfields, removeIframe);
            }
        }
        removeAttributesFromArray(ccfields, removeIframe) {
            if (!ccfields.length) {
                return;
            }
            for (let ccElement of ccfields) {
                ccElement.removeAttribute(this.attributeName + '-parent');
                ccElement.removeAttribute(this.attributeName);
                if (removeIframe) {
                    ccElement.removeAttribute(this.attributeName + '-iframe');
                }
            }
        }
    }

    class CSCardFieldDetector extends CSFormDetector {
        inputTags;
        inputAndSelectTags;
        attributeName = "data-zvault-cc";
        formAttribute = "data-zvault-cc-form";
        frameUrl = frameUrls.CARD_FRAME;
        cardCategoryId = null;
        async init() {
            this.cardCategoryId = await zlocalStorage.load(LocalStorageKeys.PAYMENT_CARD_TYPE_ID, "");
        }
        async populateVaultIconsCC() {
            const cardCategoryId = this.cardCategoryId;
            if (cardCategoryId == null) {
                return;
            }
            this.inputTags = $("input:not([type=hidden],[type=radio],[type=checkbox],[type=file])");
            this.inputAndSelectTags = $('input:not([type=hidden],[type=radio],[type=checkbox]),select');
            const ccnumber = await this.detectFields(this.inputTags, cardFillingUtil.numberRegEx, "ccnumber");
            const cvv = await this.detectFields(this.inputTags, cardFillingUtil.cvvOrcidRegEx, "cccvv");
            const ccname = await this.detectFields(this.inputTags, cardFillingUtil.nameRegEx, "ccname", true, ccnumber.length ? null : cardFillingUtil.nameFilterRegEx);
            const ccexpiry = await this.detectExpiryField(ccnumber.length);
            const cclabel = await this.detectFields(this.inputTags, cardFillingUtil.labelRegEx, "cclabel");
            if (ccnumber.length > 0) {
                this.fillVaultIconInCCForm();
                this.setSubmitListeners();
            }
            else if (cvv.length == 1) {
                this.fillVaultIconInCCForm(true);
            }
            else {
                this.removeCustomAttributes(false);
            }
            this.iframeCheck({ ccnumber, cccvv: cvv, ccname, cclabel, ccexpiration: ccexpiry });
        }
        async iframeCheck(allFields) {
            const fieldsArray = [];
            let count = 0;
            for (let field of Object.keys(allFields)) {
                if (allFields[field] == true || allFields[field].length) {
                    count++;
                    fieldsArray.push(field);
                }
            }
            if (!count) {
                return;
            }
            if (fieldsArray.length) {
                const frameId = await bgApi.tab.getFrameId();
                const iframeData = {
                    [frameId]: {
                        fields: fieldsArray,
                        hostUrl: js.url.getHost(window.location.href)
                    }
                };
                bgApi.cardFrame.checkIframeFields(iframeData);
            }
        }
        async detectExpiryField(numberField) {
            try {
                let expField = await this.detectFields(this.inputTags, cardFillingUtil.expiryCommonRegEx, "ccexpiration");
                let mmField = await this.detectFields(this.inputAndSelectTags, cardFillingUtil.monthRegEx, "ccmonth");
                let yyField = await this.detectFields(this.inputAndSelectTags, cardFillingUtil.yearRegEx, "ccyear");
                if (expField.length == 0 && mmField.length == 0 && yyField.length == 0) {
                    mmField = await this.detectFields(this.inputAndSelectTags, cardFillingUtil.monthRegEx2, "ccmonth");
                    yyField = await this.detectFields(this.inputAndSelectTags, cardFillingUtil.yearRegEx2, "ccyear");
                }
                if ((mmField.length == 0 || yyField.length == 0) && expField.length == 0 && numberField) {
                    const form = document.querySelector("[data-zvault-cc-form='ccform" + this.formIndex + "']");
                    const label = form.querySelector("[aria-label='MM/YY']");
                    expField = label.querySelectorAll('input');
                    this.markCCField(expField[0], "ccexpiration");
                }
                const isExpiryPresent = (mmField.length && yyField.length) || expField.length;
                if (!isExpiryPresent) {
                    this.removeAttributesFromArray([mmField], false);
                    this.removeAttributesFromArray([yyField], false);
                }
                return isExpiryPresent;
            }
            catch (e) {
                ZVError.error(e);
                return false;
            }
        }
        setSubmitListeners() {
            for (let i = 0; i < this.formIndex; i++) {
                const formName = "ccform" + i;
                const form = document.querySelector('form[' + this.formAttribute + '="' + formName + '"]');
                if (form != undefined) {
                    const buttons = form.querySelectorAll('button,input[type="submit"],input[type="button"]');
                    this.buttonListeners(buttons, formName);
                }
            }
        }
        fillVaultIconInCCForm(isOnlyCVVFied = false) {
            for (let index = 0; index < this.formIndex; index++) {
                const ccfields = $('input[' + this.attributeName + '-parent=ccform' + index + ']');
                const ccSelectFields = $('select[' + this.attributeName + '-parent=ccform' + index + ']');
                if (this.ccFieldVariety(ccfields, ccSelectFields) >= 3 || isOnlyCVVFied) {
                    for (let ccElement of ccfields) {
                        if (ccElement.type.toLowerCase() == 'button' || ccElement.type.toLowerCase() == "submit") {
                            continue;
                        }
                        this.fillVaultIcon(ccElement, true);
                    }
                }
                else {
                    for (let ccElement of ccfields) {
                        ccElement.removeAttribute(this.attributeName + '-parent');
                        ccElement.removeAttribute(this.attributeName);
                    }
                }
            }
        }
        ccFieldVariety(allInput, allSelect) {
            if (!(allInput.length + allSelect.length)) {
                return 0;
            }
            const variety = {};
            for (let element of allInput) {
                const type = element.getAttribute(this.attributeName);
                variety[type] = true;
            }
            for (let element of allSelect) {
                const type = element.getAttribute(this.attributeName);
                variety[type] = true;
            }
            return Object.keys(variety).length;
        }
        buttonListeners(allButtons, formName) {
            for (let button of allButtons) {
                if (button != undefined && !button.innerText.match(cardFillingUtil.cancelButtonRegEx)) {
                    this.cardFormSubmitted = this.cardFormSubmitted.bind(this);
                    $(button).unbind();
                    $(button).click(this.cardFormSubmitted);
                    button.setAttribute(this.attributeName + "-parent", formName);
                }
            }
        }
        cardFormSubmitted(e) {
            const formId = e.target.getAttribute(this.attributeName + '-parent');
            const form = document.querySelector('form[' + this.formAttribute + '=' + formId + ']');
            const fields = form.querySelectorAll('input,select');
            const data = {};
            let month;
            let year;
            for (let field of fields) {
                if (field.hasAttribute(this.attributeName) && cardFillingUtil.isValidCardValue(field)) {
                    switch (field.getAttribute(this.attributeName)) {
                        case 'ccnumber':
                            data.card_number = field.value.replaceAll(" ", "");
                            break;
                        case 'ccname':
                            data.card_holder_name = field.value;
                            break;
                        case 'ccmonth':
                            month = field.value;
                            break;
                        case 'ccyear':
                            year = field.value;
                            break;
                        case 'cccvv':
                            data.cvv = field.value;
                            break;
                        case "ccexpiration":
                            data.valid_thru = cardFillingUtil.formatValidThru(field.value);
                            break;
                    }
                }
            }
            if (month != undefined || year != undefined) {
                data.valid_thru = cardFillingUtil.getValidThru(month, year);
            }
            this.checkFilledCard(data);
        }
        async checkCardDiff(card, data) {
            const cardHolderName = await this.isCardFieldDifferent(card, data, CARD_FIELDS.NAME);
            const cardCvv = await this.isCardFieldDifferent(card, data, CARD_FIELDS.CVV);
            const validThru = await this.isCardFieldDifferent(card, data, CARD_FIELDS.VALID_UPTO);
            return (cardHolderName || cardCvv || validThru);
        }
        async isCardFieldDifferent(card, data, field) {
            const stored = await bgApi.crypto.decrypt(card.encrypted.fields[field], card.shared);
            const entered = data[field];
            if (entered == undefined || entered == "") {
                return false;
            }
            else if (stored == entered) {
                return false;
            }
            return true;
        }
        async checkFilledCard(data) {
            const isUnlocked = await bgApi.login.isUnlocked();
            if (!isUnlocked) {
                return;
            }
            if (data.card_number == null || data.card_number.length == 0) {
                return;
            }
            const cardCategory = await bgApi.cardFrame.getCardCategory();
            const savePrompt = await zlocalStorage.load(LocalStorageKeys.CARD_SAVE_PROMPT, true);
            const addSecret = await zlocalStorage.load(LocalStorageKeys.ALLOW_ADD_SECRET, true);
            if (savePrompt && addSecret && cardCategory.enabled) {
                const query = SecretQuery.newBuilder().build();
                query.typeId = cardCategory.id;
                const secretQueryResult = await bgApi.cardFrame.getSecrets(query);
                let cardState = {
                    current: data,
                    type: "card",
                    state: "new"
                };
                for (let card of secretQueryResult) {
                    const cardNumber = await bgApi.crypto.decrypt(card.encrypted.fields[CARD_FIELDS.NUMBER], card.shared);
                    if (cardNumber == data.card_number) {
                        const updateCardFrame = await this.checkCardDiff(card, data);
                        if (updateCardFrame) {
                            cardState.secret = card;
                            cardState.state = "update";
                            bgApi.cardFrame.showUpdateCardFrame(cardState);
                        }
                        return;
                    }
                }
                ztabStorage.save(TabStorageKeys.SAVE_CARD_FRAME_DATA, cardState);
                bgApi.cardFrame.showSaveCardFrame(cardState);
            }
        }
    }
    const csCardFieldDetector = new CSCardFieldDetector();
    setGlobal("csCardFieldDetector", csCardFieldDetector);

    class SecretType {
        static FIELD_TYPE = {
            TEXT: "text",
            PASSWORD: "password",
            FILE: "file",
            TEXTAREA: "textarea"
        };
        static DEFAULT = {
            WEB_ACCOUNT: "Web Account",
            BANK_ACCOUNT: "Bank Account",
            WINDOWS: "Windows",
            UNIX: "Unix",
            PAYMENT_CARD: "Payment Card",
            SOCIAL_SECURITY_NUMBER: "Social Security Number",
            HEALTH_CARE: "Health Care",
            FILE_STORE: "File Store",
            ADDRESS: "Address"
        };
        id = "";
        name = "";
        added_by = "";
        enabled = true;
        fields = [];
        text_fields = [];
        password_fields = [];
        ui_fields = [];
        excludeAssessment = false;
    }

    var SecretClassification;
    (function (SecretClassification) {
        SecretClassification["PERSONAL"] = "P";
        SecretClassification["ENTERPRISE"] = "E";
    })(SecretClassification || (SecretClassification = {}));
    var SecretSharingType;
    (function (SecretSharingType) {
        SecretSharingType["SHARED_BY_ME"] = "SHARED_BY_ME";
        SecretSharingType["SHARED_TO_ME"] = "SHARED_TO_ME";
        SecretSharingType["NONE"] = "NONE";
    })(SecretSharingType || (SecretSharingType = {}));
    class Secret {
        static IS_SHARED = {
            YES: "YES",
            NO: "NO"
        };
        static SHARING_LEVEL = {
            MANAGE: 10,
            LOGIN: 20,
            VIEW: 30,
            MODIFY: 40,
            NONE: -1
        };
        static ACCESS_CTRL_STATUS = {
            NO_REQUEST_FOUND: -1,
            REQUESTED: 0,
            PENDING: 1,
            APPROVED: 2,
            REJECTED: 3,
            CHECK_OUT: 4,
            CHECK_IN: 5,
            REQUEST_TIMED_OUT: 6,
            CANCELED_BY_USER: 7,
            APPROVED_FOR_LATER: 8,
            AUTO_APPROVED: 9,
            IN_USE: 10
        };
        static hasViewPermission(sharingLevel) {
            switch (sharingLevel) {
                case Secret.SHARING_LEVEL.MANAGE:
                case Secret.SHARING_LEVEL.MODIFY:
                case Secret.SHARING_LEVEL.VIEW:
                    return true;
                default:
                    return false;
            }
        }
        static hasEditPermission(sharingLevel) {
            switch (sharingLevel) {
                case Secret.SHARING_LEVEL.MANAGE:
                case Secret.SHARING_LEVEL.MODIFY:
                    return true;
                default:
                    return false;
            }
        }
        static hasManagePermission(sharingLevel) {
            return sharingLevel == Secret.SHARING_LEVEL.MANAGE;
        }
        static hasAccess(secret) {
            try {
                if (!secret) {
                    throw new Error("empty");
                }
                const accessPresent = secret.owned || !secret.access_controlled || (secret.access_request_status == Secret.ACCESS_CTRL_STATUS.CHECK_OUT);
                return accessPresent;
            }
            catch (e) {
                logError(e);
                throw new Error(e);
            }
        }
        id = "";
        name = "";
        name_lowercase = "";
        is_favourite = false;
        shared = false;
        has_totp = false;
        encrypted = {
            notes: "",
            totp: "",
            fields: {},
            custom_columns: [],
            files: []
        };
        sessionEncryptedData = null;
        type_id = "";
        policy_id = "";
        ui_text = "";
        uiFieldName = "";
        logo = "";
        domain_logo = "";
        created_on = 0;
        modifiedOn = 0;
        auto_submit = true;
        urls = [];
        valid_urls = [];
        tags = [];
        description = "";
        classification = SecretClassification.PERSONAL;
        sharing_type = SecretSharingType.NONE;
        sharing_level = Secret.SHARING_LEVEL.NONE;
        access_controlled = false;
        display_access_control_icon = false;
        access_request_status = Secret.ACCESS_CTRL_STATUS.NO_REQUEST_FOUND;
        access_request_id = "";
        user_id = "";
        change_password = false;
        owned = false;
        fetchedOn = 0;
        sort_weight = 0;
        search_words = [];
        highlight_field = "";
        oldValues = null;
        customColumnTypeInfos = null;
        oneauth_id = "";
    }
    class CSFillValue {
        static FIELD_TYPE = {
            TEXT: SecretType.FIELD_TYPE.TEXT,
            PASSWORD: SecretType.FIELD_TYPE.PASSWORD,
            TOTP: "totp"
        };
        allowedDomains = [];
        type = CSFillValue.FIELD_TYPE.TEXT;
        value = "";
        secretId = "";
        shareLevel = Secret.SHARING_LEVEL.MANAGE;
    }
    class LoginData {
        static STEP = {
            FILL_USERNAME: "FILL_USERNAME",
            FILL_PASSWORD: "FILL_PASSWORD",
            FILL_TOTP: "FILL_TOTP"
        };
        static MAX_REDIRECT_COUNT = 3;
        secretId = "";
        allowedDomains = [];
        texts = [];
        passwords = [];
        passwordFieldNames = [];
        shareLevel = Secret.SHARING_LEVEL.MANAGE;
        hasTotp = false;
        submit = false;
        step = LoginData.STEP.FILL_USERNAME;
        redirectedCount = 0;
        oneauthId = "";
    }

    class CSCardFieldMasking extends CSCardFieldDetector {
        devtoolsFunc = this.devToolsOpened.bind(this);
        devtoolsFuncIframe = this.devToolsOpenedIframe.bind(this);
        currentCCForm = null;
        iframeElement = null;
        constructor() {
            super();
            js.fn.bindThis(this, [this.onMessageListener, this.onMessageDevToolsFncIframeListener]);
        }
        async applyMasking(field) {
            await this.removeMasking(field);
            const dimensions = await this.getmaskingDimensions(field);
            const top = ($(field).outerHeight() - $(field).innerHeight()) / 2;
            const left = ($(field).outerWidth() - $(field).innerWidth()) / 2;
            const mainTag = document.createElement('span');
            mainTag.setAttribute("data-zvault-mask", "");
            mainTag.style.backgroundImage = `url(${chrome.runtime.getURL("/images/web_access/red-star.png")})`;
            mainTag.style.backgroundPosition = "center";
            mainTag.style.backgroundSize = "15px";
            mainTag.style.backgroundRepeat = "repeat-x";
            mainTag.style.height = dimensions.maxHeight + "px";
            mainTag.style.width = dimensions.maxWidth + "px";
            mainTag.style.display = "inline-block";
            mainTag.style.backgroundColor = "white";
            mainTag.style.position = "absolute";
            mainTag.style.zIndex = "1000";
            mainTag.style.marginTop = top + "px";
            mainTag.style.marginLeft = left + "px";
            mainTag.style.borderRadius = "5px";
            $(mainTag).insertBefore(field);
            this.setTabIndex(field);
            setTimeout(function () {
                mainTag.click();
            }, 50);
            return;
        }
        async removeMasking(field) {
            const parent = $(field).parent();
            const masking = parent.find('span[data-zvault-mask=""]');
            if (masking.length) {
                field.removeEventListener("focus", this.preventFocus);
                masking.remove();
            }
            return;
        }
        async getmaskingDimensions(field) {
            let maxHeight = $(field).innerHeight();
            let maxWidth = $(field).innerWidth();
            if (field.tagName == "INPUT") {
                maxWidth = (0.98 * maxWidth) - 14;
                return { maxHeight, maxWidth };
            }
            $(field).parent().children().each(function () {
                const height = $(this).innerHeight();
                maxHeight = height > maxHeight ? height : maxHeight;
                const width = this.offsetWidth;
                maxWidth = width > maxWidth ? width : maxWidth;
            });
            return { maxHeight, maxWidth };
        }
        setTabIndex(field) {
            $(field).attr("tabindex", "-1");
            field.removeEventListener("focus", this.preventFocus);
            field.addEventListener("focus", this.preventFocus);
        }
        preventFocus(objEvent) {
            $(objEvent.currentTarget).blur();
            objEvent.preventDefault();
            objEvent.stopImmediatePropagation();
        }
        preventTabClicks(formId) {
            const form = document.querySelector(`[${this.formAttribute} = ${formId}]`);
            form.removeEventListener("keydown", this.tabClickListener);
            form.addEventListener("keydown", this.tabClickListener);
        }
        tabClickListener(objEvent) {
            if (objEvent.keyCode == 9) {
                objEvent.preventDefault();
                objEvent.stopImmediatePropagation();
            }
        }
        clearCCData() {
            const form = document.querySelector("form[" + this.formAttribute + "=" + this.currentCCForm);
            this.clearMaskingField(form, CardField.NUMBER);
            this.clearMaskingField(form, CardField.NAME);
            this.clearMaskingField(form, CardField.LABEL);
            this.clearMaskingField(form, CardField.EXPIRATION);
            this.clearMaskingField(form, CardField.MONTH);
            this.clearMaskingField(form, CardField.YEAR);
            this.clearMaskingField(form, CardField.CVV);
            form.removeEventListener("keydown", this.tabClickListener);
            this.currentCCForm = null;
        }
        async clearMaskingField(form, name) {
            const field = form.querySelector(`[${this.attributeName} = ${name}]`);
            if (!field) {
                return;
            }
            await userAction.fill(field, "");
            this.removeMasking(field);
        }
        addDevToolsListener(masking, formId) {
            chrome.runtime.onMessage.removeListener(this.onMessageListener);
            this.currentCCForm = null;
            if (masking) {
                chrome.runtime.onMessage.addListener(this.onMessageListener);
                this.currentCCForm = formId;
                this.preventTabClicks(formId);
            }
            return;
        }
        onMessageListener(msg, sender) {
            this.devtoolsFunc(msg, sender);
            return false;
        }
        onMessageDevToolsFncIframeListener(msg, sender) {
            this.devtoolsFuncIframe(msg, sender);
            return false;
        }
        async devToolsOpened(request, _sender, _sendResponse) {
            if (request.action != "devToolsOpened") {
                return;
            }
            this.clearCCData();
        }
        addDevToolsListenerIframe(masking, element) {
            chrome.runtime.onMessage.removeListener(this.onMessageDevToolsFncIframeListener);
            this.currentCCForm = null;
            if (masking) {
                chrome.runtime.onMessage.addListener(this.onMessageDevToolsFncIframeListener);
                this.iframeElement = element;
                element.removeEventListener("keydown", this.tabClickListener);
                element.addEventListener("keydown", this.tabClickListener);
            }
            return;
        }
        async devToolsOpenedIframe(request, _sender, _sendResponse) {
            if (request.action != "devToolsOpened") {
                return;
            }
            try {
                await userAction.fill(this.iframeElement, "");
                this.removeMasking(this.iframeElement);
            }
            catch (e) {
                ZVError.error(e);
            }
        }
    }

    class CardField {
        static NUMBER = "ccnumber";
        static NAME = "ccname";
        static LABEL = "cclabel";
        static CVV = "cccvv";
        static MONTH = "ccmonth";
        static YEAR = "ccyear";
        static EXPIRATION = "ccexpiration";
    }
    class CSCardFiller extends CSCardFieldMasking {
        async fillCard(secret) {
            const devToolsOpen = await bgApi.tab.checkDevToolsOpen();
            if (devToolsOpen && !Secret.hasViewPermission(secret.sharing_level)) {
                return;
            }
            const cardData = await ztabStorage.load(TabStorageKeys.FORM_FRAME_DATA);
            cardData.card = secret;
            this.fillCCData(cardData);
        }
        async fillCCInIframe(data) {
            const devToolsOpen = await bgApi.tab.checkDevToolsOpen();
            const hasViewPermission = Secret.hasViewPermission(data.sharing_level);
            const masking = !hasViewPermission;
            if (devToolsOpen && masking) {
                return;
            }
            for (let field of Object.keys(data.card)) {
                const element = document.querySelector('input[' + this.attributeName + '-iframe="' + field + '"],select[' + this.attributeName + '-iframe="' + field + '"]');
                const value = data.card[field];
                if (element != undefined && value != undefined) {
                    this.addDevToolsListenerIframe(masking, element);
                    await userAction.fill(element, value);
                    masking ? await this.applyMasking(element) : await this.removeMasking(element);
                }
            }
        }
        async fillField(formId, name, value, masking) {
            const field = document.querySelector('input[' + this.attributeName + '-parent=' + formId + '][' + this.attributeName + '=' + name + ']');
            value = value == undefined ? "" : value;
            if (field != undefined) {
                masking ? await this.applyMasking(field) : this.removeMasking(field);
                userAction.fill(field, value);
            }
            return field;
        }
        async fillDateField(formId, name, value, masking) {
            let field = document.querySelector('select[' + this.attributeName + '-parent=' + formId + '][' + this.attributeName + '=' + name + ']');
            const maskingFunc = masking ? this.applyMasking.bind(this) : this.removeMasking.bind(this);
            if (field == undefined) {
                field = document.querySelector('input[' + this.attributeName + '-parent=' + formId + '][' + this.attributeName + '=' + name + ']');
            }
            if (field != undefined && value != 0) {
                await maskingFunc(field);
                value = name == "ccmonth" ? cardFillingUtil.findMonthOption(field, value) : cardFillingUtil.findYearOption(field, value);
                await userAction.fill(field, value.toString());
                await maskingFunc(field);
            }
        }
        async fillValidThru(formId, value, masking) {
            const expiration = document.querySelector('input[' + this.attributeName + '-parent=' + formId + '][' + this.attributeName + '=ccexpiration]');
            if (expiration != undefined && value != "") {
                const month = cardFillingUtil.extractCardMonth(value);
                let validThru = month + "/";
                const year = cardFillingUtil.extractCardYear(value);
                if (expiration.placeholder != undefined && year != "") {
                    if (expiration.placeholder.toLowerCase().indexOf("yyyy") != -1) {
                        validThru += year;
                    }
                    else {
                        validThru += (year % 100);
                    }
                }
                masking ? await this.applyMasking(expiration) : this.removeMasking(expiration);
                userAction.fill(expiration, validThru);
            }
        }
        async fillCCData(data) {
            const formId = data.parent;
            if ($('form[' + this.formAttribute + '=' + formId + ']').length == 0 && $('body[' + this.formAttribute + '=' + formId + ']').length == 0) {
                return;
            }
            const hasViewPermission = Secret.hasViewPermission(data.card.sharing_level);
            const masking = !hasViewPermission;
            const devToolsOpen = await bgApi.tab.checkDevToolsOpen();
            if (masking && devToolsOpen) {
                return;
            }
            this.addDevToolsListener(masking, formId);
            const ccnumner = await this.fillField(formId, "ccnumber", data.card.encrypted.fields.card_number, masking);
            await this.fillField(formId, "ccname", data.card.encrypted.fields.card_holder_name, masking);
            await this.fillField(formId, "cclabel", data.card.name, masking);
            await this.fillField(formId, "cccvv", data.card.encrypted.fields.cvv, masking);
            const monthValue = cardFillingUtil.extractCardMonth(data.card.encrypted.fields.valid_thru);
            await this.fillDateField(formId, "ccmonth", monthValue, masking);
            const yearValue = cardFillingUtil.extractCardYear(data.card.encrypted.fields.valid_thru);
            await this.fillDateField(formId, "ccyear", yearValue, masking);
            await this.fillValidThru(formId, data.card.encrypted.fields.valid_thru, masking);
            masking ? null : ccnumner.click();
        }
    }

    class CSCardMain extends CSCardFiller {
        mutationLocked = false;
        mutationCounter = 1;
        static mutationObserver = null;
        handleClicks = this.documentClicked.bind(this);
        handleMutation = this.mutationCallback.bind(this);
        iframeData = {};
        async initForIframe() {
            try {
                const iconNeeded = await this.isIconPopulationNeeded();
                if (!iconNeeded) {
                    return;
                }
                await js.dom.waitDomLoad();
                this.cardCategoryId = await zlocalStorage.load(LocalStorageKeys.PAYMENT_CARD_TYPE_ID, null);
                document.addEventListener("click", this.handleClicks);
                this.addMutationObserver();
                await js.time.delay(3);
                this.mutationCounter++;
                this.checkForPageChanges();
            }
            catch (e) {
                logError(e);
            }
        }
        removeClickListener() {
            document.removeEventListener("click", this.handleClicks);
        }
        addClickListener() {
            document.addEventListener("click", this.handleClicks);
        }
        async isIconPopulationNeeded() {
            try {
                const disableVaultIcons = await zlocalStorage.load(VtSettings.DISABLE_WEBSITE_VAULT_ICON, false);
                if (disableVaultIcons) {
                    return false;
                }
                const stored = await zlocalStorage.loadAll({
                    [LocalStorageKeys.PAYMENT_CARD_TYPE_ID]: "",
                    [LocalStorageKeys.ADDRESS_TYPE_ID]: "",
                    [LocalStorageKeys.USED_CATEGORIES]: {},
                });
                const secretCountMap = stored[LocalStorageKeys.USED_CATEGORIES];
                const paymentCardId = stored[LocalStorageKeys.PAYMENT_CARD_TYPE_ID];
                const iconNeeded = paymentCardId && (secretCountMap[paymentCardId] > 0);
                return iconNeeded;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        checkForPageChanges() {
            if (!this.mutationLocked && this.mutationCounter > 0) {
                this.mutationLocked = true;
                this.mutationCounter = 0;
                this.populateVaultIconsCC();
                setTimeout(function () {
                    this.mutationLocked = false;
                    this.mutationCounter > 0 ? this.checkForPageChanges() : "";
                }.bind(this), 1200);
            }
        }
        hasZIcon(e, target) {
            try {
                const boundary = target.getBoundingClientRect();
                const isRightToLeft = csutil.input.checkIsRightToLeft(target);
                const x = e.clientX;
                if (isRightToLeft) {
                    const w1Percent = boundary.left + (0.01 * boundary.width) + 15;
                    return x < w1Percent;
                }
                const w99Percent = boundary.left + (0.99 * boundary.width) - 15;
                return x > w99Percent;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async documentClicked(e) {
            const elm = e.target;
            if ((elm.hasAttribute("data-zvault-cc") || elm.getAttribute("data-zvault-cc-iframe-enabled") == "true") && this.hasZIcon(e, e.target)) {
                document.removeEventListener("click", this.handleClicks);
                await csCardFieldDetector.ccFieldClicked(e);
                document.addEventListener("click", this.handleClicks);
                return;
            }
            await js.time.delay(1);
            this.mutationCounter++;
            this.checkForPageChanges();
        }
        addMutationObserver() {
            const targetNode = document.body;
            const config = { attributes: false, childList: true, subtree: true };
            CSCardMain.mutationObserver = new MutationObserver(this.handleMutation);
            CSCardMain.mutationObserver.observe(targetNode, config);
        }
        mutationCallback(mutationsList, _observer) {
            this.mutationCounter += mutationsList.length;
            this.checkForPageChanges();
        }
        ;
        async disableIframeCheck() {
            try {
                await js.dom.waitDomLoad();
                await js.time.delay(0.1);
                CSCardMain.mutationObserver.disconnect();
                document.removeEventListener("click", this.handleClicks);
                this.handleClicks = null;
                return;
            }
            catch (e) {
                ZVError.error(e);
            }
        }
        checkIframeFields(data) {
            const iframeId = Object.keys(data)[0];
            this.iframeData[iframeId] = data[iframeId];
            let totalFields = 0;
            for (let id of Object.keys(this.iframeData)) {
                totalFields += this.iframeData[id].fields.length;
            }
            if (totalFields > 2 && Object.keys(this.iframeData).length > 1) {
                this.initiateIconFillToCCFrames();
            }
            return;
        }
        initiateIconFillToCCFrames() {
            for (let frameId of Object.keys(this.iframeData)) {
                bgApi.cardFrame.fillVaultIconCCIframe(this.iframeData[frameId].fields, Number(frameId));
            }
        }
        fillIconsToCCFrames(fields) {
            for (let ccField of fields) {
                const element = js.selector.select("[" + this.attributeName + "-iframe = " + ccField + "]");
                if (!element) {
                    continue;
                }
                element.setAttribute(this.attributeName + "-iframe-enabled", "true");
                csCardFieldDetector.fillVaultIcon(element, true);
            }
        }
        async saveCCIframeData() {
            if (Object.keys(this.iframeData).length) {
                const data = {
                    topUrl: js.url.getHost(window.location.href),
                    frames: this.iframeData
                };
                await ztabStorage.save(TabStorageKeys.CCIFRAMEDATA, data);
            }
        }
    }

    class Z_Enum {
        URL_PART = {
            URL: "url",
            HOSTNAME: "hostname",
            PARENT_DOMAIN: "parent_domain",
            HOST: "host"
        };
        DOMAIN_MATCHING_MODE = {
            HOSTNAME: this.URL_PART.HOSTNAME,
            PARENT_DOMAIN: this.URL_PART.PARENT_DOMAIN,
            HOST: this.URL_PART.HOST
        };
        FILTER = {
            ALL: "all",
            DOMAIN_MATCHING: "domain_matching",
            FAVOURITES: "favourite",
            RECENTLY_USED: "recently_used",
            RECENTLY_ADDED: "recently_added",
            PERSONAL: "personal",
            ENTERPRISE: "enterprise",
            SHARED_BY_ME: "shared_by_me",
            SHARED_TO_ME: "shared_to_me",
            UNSHARED: "unshared",
            OWNED_BY_ME: "owned_by_me",
        };
        PLAN = {
            PERSONAL: "Personal",
            STANDARD: "Standard",
            PROFESSIONAL: "Professional",
            ENTERPRISE: "Enterprise"
        };
        ZVFEATURES = {
            ACCESS_CONTROL: "AccessControl"
        };
        FIELD_TYPE = {
            TEXT: "text",
            PASSWORD: "password",
            FILE: "file",
            TEXTAREA: "textarea"
        };
        DEFAULT_CATEGORIES = {
            WEB_ACCOUNT: "Web Account",
            BANK_ACCOUNT: "Bank Account",
            WINDOWS: "Windows",
            UNIX: "Unix",
            PAYMENT_CARD: "Payment Card",
            SOCIAL_SECURITY_NUMBER: "Social Security Number",
            HEALTH_CARE: "Health Care",
            FILE_STORE: "File Store",
            ADDRESS: "Address"
        };
    }
    const zenum = new Z_Enum();
    setGlobal("zenum", zenum);

    class FilledFormData {
        texts = [];
        passwords = [];
    }

    class Util {
        isNumberLoginAllowed(container) {
            try {
                const visibleInputs = csutil.selector.selectAll("input", { container, shadowRoot: true })
                    .filter(x => csutil.isVisible(x));
                let lastInput = null;
                for (let input of visibleInputs) {
                    if (csutil.input.typeOf(input) == "password") {
                        if (!lastInput) {
                            return false;
                        }
                        return ["tel", "number"].includes(lastInput.type);
                    }
                    lastInput = input;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }
    const util$1 = new Util();

    class LoginFieldIteratorProvider {
        iterate(container) {
            return new CSLoginFieldIterator$1(container);
        }
    }
    let CSLoginFieldIterator$1 = class CSLoginFieldIterator {
        container;
        constructor(container) {
            this.container = container;
        }
        *[Symbol.iterator]() {
            const inputs = csutil.selector.selectAll("input", { container: this.container, shadowRoot: false });
            const allowNumberLogin = util$1.isNumberLoginAllowed(this.container);
            let validInput = false;
            for (let input of inputs) {
                if (!csutil.isVisible(input)) {
                    continue;
                }
                if (input.type == "text" && csutil.input.isCaptcha(input)) {
                    continue;
                }
                validInput = allowNumberLogin ? csutil.input.isValidTextPasswordNumber(input) : csutil.input.isValidTextPassword(input);
                if (!validInput) {
                    continue;
                }
                switch (csutil.input.typeOf(input)) {
                    case "tel":
                    case "number":
                        if (!allowNumberLogin) {
                            continue;
                        }
                    case "text":
                    case "email":
                    case "password":
                        yield input;
                        break;
                }
            }
        }
    };
    const loginFieldIterator = new LoginFieldIteratorProvider();

    var InputType;
    (function (InputType) {
        InputType["BUTTON"] = "button";
        InputType["CHECKBOX"] = "checkbox";
        InputType["COLOR"] = "color";
        InputType["DATE"] = "date";
        InputType["DATE_TIME"] = "datetime-local";
        InputType["EMAIL"] = "email";
        InputType["FILE"] = "file";
        InputType["HIDDEN"] = "hidden";
        InputType["IMAGE"] = "image";
        InputType["MONTH"] = "month";
        InputType["NUMBER"] = "number";
        InputType["PASSWORD"] = "password";
        InputType["RADIO"] = "radio";
        InputType["RANGE"] = "range";
        InputType["RESET"] = "reset";
        InputType["SEARCH"] = "search";
        InputType["SUBMIT"] = "submit";
        InputType["TEL"] = "tel";
        InputType["TEXT"] = "text";
        InputType["TIME"] = "time";
        InputType["URL"] = "url";
        InputType["WEEK"] = "week";
    })(InputType || (InputType = {}));

    class InputLoginContainer {
        getContainer(input) {
            try {
                const form = csutil.selector.closest(input, "form");
                if (form) {
                    return form;
                }
                return this.getContainerFn(input) || null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getContainerFn(input) {
            if (csutil.input.typeOf(input) == InputType.PASSWORD) {
                return ParentElemGetter.password.getParent(input) || ParentElemGetter.submitablePassword.getParent(input);
            }
            return ParentElemGetter.username.getParent(input) || ParentElemGetter.submitableUsername.getParent(input);
        }
    }
    class ValidParentChecker {
    }
    class ValidParentCheckerForUsername extends ValidParentChecker {
        static instance = new ValidParentCheckerForUsername();
        isValidParent(elem, parent) {
            return csutil.input.getUsername({ visible: true, container: parent, shadowRoot: false }) == elem;
        }
    }
    class ValidParentCheckerForPassword extends ValidParentChecker {
        static instance = new ValidParentCheckerForPassword();
        isValidParent(elem, parent) {
            return csutil.input.getPassword({ container: parent, visible: true, shadowRoot: false }) == elem;
        }
    }
    class RequiredParentChecker {
    }
    class RequiredParentCheckerForUsername extends RequiredParentChecker {
        static instance = new RequiredParentCheckerForUsername();
        isRequiredParent(elem) {
            return csutil.input.getPassword({ container: elem, visible: true, shadowRoot: false }) != null;
        }
    }
    class RequiredParentCheckerForPassword extends RequiredParentChecker {
        static instance = new RequiredParentCheckerForPassword();
        isRequiredParent(elem) {
            return csutil.input.getUsername({ visible: true, container: elem, shadowRoot: false }) != null;
        }
    }
    class RequiredParentCheckerSubmitable extends RequiredParentChecker {
        static instance = new RequiredParentCheckerSubmitable();
        isRequiredParent(elem) {
            return elem.querySelector("button,input[type='submit']") != null;
        }
    }
    class ParentElemGetter {
        validParentChecker;
        requiredParentChecker;
        static username = new ParentElemGetter(ValidParentCheckerForUsername.instance, RequiredParentCheckerForUsername.instance);
        static submitableUsername = new ParentElemGetter(ValidParentCheckerForUsername.instance, RequiredParentCheckerSubmitable.instance);
        static password = new ParentElemGetter(ValidParentCheckerForPassword.instance, RequiredParentCheckerForPassword.instance);
        static submitablePassword = new ParentElemGetter(ValidParentCheckerForPassword.instance, RequiredParentCheckerSubmitable.instance);
        constructor(validParentChecker, requiredParentChecker) {
            this.validParentChecker = validParentChecker;
            this.requiredParentChecker = requiredParentChecker;
        }
        getParent(elem) {
            try {
                for (let parent of csutil.dom.getParentIterator(elem)) {
                    if (!this.validParentChecker.isValidParent(elem, parent)) {
                        return null;
                    }
                    if (this.requiredParentChecker.isRequiredParent(parent)) {
                        return parent;
                    }
                }
                let parent = elem.parentElement;
                while (parent && this.validParentChecker.isValidParent(elem, parent)) {
                    if (this.requiredParentChecker.isRequiredParent(parent)) {
                        return parent;
                    }
                    parent = parent.parentElement;
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }
    const inputLoginContainer = new InputLoginContainer();

    class LoginUtilSymbol {
        filledPasswordSymbol = Symbol("filled password");
        filledTextSymbol = Symbol("filled text");
    }
    const symbols = new LoginUtilSymbol();

    class TotpUtil {
        isTotpInput(input) {
            try {
                if (!input) {
                    return false;
                }
                const isVisible = csutil.isVisible(input);
                if (!isVisible) {
                    return false;
                }
                const isValidType = csutil.input.isValidTextPasswordNumber(input);
                if (!isValidType) {
                    return false;
                }
                const invalidCodeRegex = /(?:zip.*code)|(?:country.*code)/i;
                if (csutil.dom.hasAttribute({ elem: input, key: invalidCodeRegex })) {
                    return false;
                }
                const totpRegex = /(?:t?otp)|(?:(?:c|k)ode)|(?:mfa)|(?:token)|(?:verification)|(?:digit)|(?:2fact)|(?:one-time-code)/i;
                const invalidTotpRegex = /(?:keyCode)/i;
                const ignoreAttribute = ["style"];
                const hasTotpRegex = csutil.dom.hasAttribute({
                    elem: input, key: totpRegex, invalidKey: invalidTotpRegex, ignoreAttribute
                });
                if (!hasTotpRegex) {
                    return false;
                }
                if (input[symbols.filledTextSymbol] || input[symbols.filledPasswordSymbol]) {
                    return false;
                }
                return true;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }
    const totpUtil = new TotpUtil();

    class LoginUtil {
        getInputLoginContainer(input) {
            return inputLoginContainer.getContainer(input);
        }
        setFilledText(input) {
            input[symbols.filledTextSymbol] = true;
        }
        setFilledPassword(input) {
            input[symbols.filledPasswordSymbol] = true;
        }
        checkPreFilled(input) {
            return input[symbols.filledTextSymbol] || input[symbols.filledPasswordSymbol] || false;
        }
        isNumberLoginAllowed(container) {
            return util$1.isNumberLoginAllowed(container);
        }
        iterateLoginFields(container) {
            return loginFieldIterator.iterate(container);
        }
        isTotpInput(input) {
            return totpUtil.isTotpInput(input);
        }
        findFieldsBefore(input) {
            try {
                const container = this.getInputLoginContainer(input);
                if (!container) {
                    return [];
                }
                const inputs = [];
                for (let curInput of this.iterateLoginFields(container)) {
                    if (curInput == input) {
                        return inputs;
                    }
                    inputs.push(curInput);
                }
                return inputs;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
    }
    const exp_loginUtil = new LoginUtil();
    globalThis["loginUtil"] = exp_loginUtil;

    class ContainerFormLogin {
        getContainer() {
            try {
                const forms = csutil.selector.selectAll("form", { shadowRoot: false });
                const loginForms = forms.filter(form => this.isLoginForm(form));
                const visibleForm = loginForms.find(form => csutil.isVisible(form) ||
                    csutil.input.getPassword({ visible: true, container: form, shadowRoot: false }));
                return visibleForm || loginForms[0];
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        isLoginForm(form) {
            try {
                if (form.getAttribute("method") && form.getAttribute("method").toLowerCase() == "get") {
                    return false;
                }
                const passwordElems = csutil.input.getPasswords({ container: form, shadowRoot: false });
                if (passwordElems.length > 0) {
                    return true;
                }
                if (csutil.dom.hasAttribute({ elem: form, key: "search" })) {
                    return false;
                }
                if (csutil.login.isLoginUrl(window.location.href) && ([1, 2].includes(csutil.input.getUsernames({ visible: true, container: form, shadowRoot: false }).length)) &&
                    !csutil.selector.select("input[type='password']", { shadowRoot: false }) && !form.querySelector("textarea")) {
                    return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }
    const _containerFormLogin = new ContainerFormLogin();

    class ContainerUsernameLogin {
        signinRegex = /\b((sign|log)\W*(i|o)n|continue|next)\b/i;
        getContainer() {
            try {
                const visibleUsernames = csutil.input.getUsernames({ visible: true, container: document.body, shadowRoot: false });
                if (visibleUsernames.length != 1) {
                    return null;
                }
                const [visibleInput] = visibleUsernames;
                if (visibleInput.disabled || visibleInput.readOnly) {
                    return null;
                }
                if (this.isUsernameInput(visibleUsernames[0])) {
                    return exp_loginUtil.getInputLoginContainer(visibleUsernames[0]);
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        isUsernameInput(input) {
            try {
                if (csutil.login.isLoginUrl(window.location.href) || this.isUsernameAutocomplete(input)) {
                    return true;
                }
                if (input.form) {
                    return this.isFormLoginInput(input);
                }
                return this.isContainerLoginInput(input);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        isUsernameAutocomplete(input) {
            try {
                if (!input.autocomplete) {
                    return false;
                }
                switch (input.autocomplete) {
                    case "username":
                    case "email":
                        return true;
                    default:
                        return false;
                }
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        isFormLoginInput(input) {
            try {
                const form = input.form;
                if (!form) {
                    return false;
                }
                if (this.testLoginContainer(form)) {
                    return true;
                }
                let formParent = form;
                for (let i = 0; i < 10 && (formParent.offsetWidth * formParent.offsetHeight <= 100000); i++) {
                    formParent = formParent.parentElement;
                }
                if (this.testLoginContainer(formParent)) {
                    return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        isContainerLoginInput(input) {
            try {
                let parent = input.parentElement;
                for (let i = 0; i < 10 && (parent.offsetWidth * parent.offsetHeight <= 100000); i++) {
                    parent = parent.parentElement;
                }
                return this.testLoginContainer(parent);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        testLoginContainer(container) {
            try {
                if (!container) {
                    throw "EMPTY_CONTAINER";
                }
                const selectorList = [
                    "*[type='submit']",
                    "button",
                    "*[type='button']",
                    "*[role='button']",
                    "input[type='image']",
                    "a[href^='javascript:']",
                    "a[href^='#']"
                ];
                let submitElems = null;
                for (let selector of selectorList) {
                    submitElems = js.selector.selectAll(selector, container);
                    if (submitElems.length == 0) {
                        continue;
                    }
                    return this.testLoginSubmitElems(submitElems);
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        testLoginSubmitElems(elems) {
            for (let elem of elems) {
                if (this.testLoginSubmitElem(elem) && csutil.isVisible(elem, false)) {
                    return true;
                }
            }
            return false;
        }
        testLoginSubmitElem(elem) {
            try {
                if (elem instanceof HTMLInputElement) {
                    if (elem.type == "image") {
                        return this.signinRegex.test(elem.alt);
                    }
                    return this.signinRegex.test(elem.value) || this.signinRegex.test(elem.parentElement.textContent);
                }
                return this.signinRegex.test(elem.textContent);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }
    const _containerUsernameLogin = new ContainerUsernameLogin();

    class CSLoginContainer {
        getPageLoginContainer() {
            try {
                const form = _containerFormLogin.getContainer();
                if (form) {
                    return form;
                }
                const passwordInput = csutil.input.getPassword({ visible: true, container: document.body, shadowRoot: false });
                if (passwordInput) {
                    return this.getInputLoginContainer(passwordInput);
                }
                const usernameLoginContainer = _containerUsernameLogin.getContainer();
                if (usernameLoginContainer) {
                    return usernameLoginContainer;
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getInputLoginContainer(input) {
            return exp_loginUtil.getInputLoginContainer(input);
        }
    }
    const csLoginContainer = new CSLoginContainer();
    setGlobal("csLoginContainer", csLoginContainer);

    class CSLoginFieldIterator {
        constructor() { }
        container = null;
        static iterate(container) {
            const iterator = new CSLoginFieldIterator();
            iterator.container = container;
            return iterator;
        }
        *[Symbol.iterator]() {
            const inputs = csutil.selector.selectAll("input", { container: this.container, visible: true, shadowRoot: false });
            const allowNumberLogin = exp_loginUtil.isNumberLoginAllowed(this.container);
            let validInput = false;
            for (let input of inputs) {
                if (input.type == "text" && csutil.input.isCaptcha(input)) {
                    continue;
                }
                validInput = allowNumberLogin ? csutil.input.isValidTextPasswordNumber(input) : csutil.input.isValidTextPassword(input);
                if (!validInput) {
                    continue;
                }
                switch (csutil.input.typeOf(input)) {
                    case "tel":
                    case "number":
                        if (!allowNumberLogin) {
                            continue;
                        }
                    case "text":
                    case "email":
                    case "password":
                        yield input;
                        break;
                }
            }
        }
    }

    class CSOther {
        getGeneratorSaveUsername() {
            try {
                const usernameInput = this.getGeneratorUsenameInput();
                return (usernameInput && usernameInput.value) || "";
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        getGeneratorUsenameInput() {
            try {
                const activeInput = csutil.input.getActiveInput();
                if (!activeInput) {
                    return null;
                }
                const isPassword = csutil.input.typeOf(activeInput) == zenum.FIELD_TYPE.PASSWORD;
                if (!isPassword) {
                    return activeInput;
                }
                const loginContainer = csLoginContainer.getInputLoginContainer(activeInput);
                if (!loginContainer) {
                    return null;
                }
                let usernameInput = null;
                for (let input of CSLoginFieldIterator.iterate(loginContainer)) {
                    switch (csutil.input.typeOf(input)) {
                        case "text":
                        case "email":
                            usernameInput = input;
                            break;
                        case "password":
                            if (input == activeInput) {
                                return usernameInput;
                            }
                    }
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async getFilledFormData() {
            const filledFormData = new FilledFormData();
            try {
                const activeInput = csutil.input.getActiveInput();
                if (!activeInput) {
                    return filledFormData;
                }
                const loginContainer = csLoginContainer.getInputLoginContainer(activeInput);
                if (!loginContainer) {
                    return filledFormData;
                }
                for (let input of CSLoginFieldIterator.iterate(loginContainer)) {
                    switch (csutil.input.typeOf(input)) {
                        case "text":
                        case "email":
                            filledFormData.texts.push(input.value);
                            break;
                        case "password":
                            filledFormData.passwords.push(input.value);
                            break;
                    }
                }
                return filledFormData;
            }
            catch (e) {
                logError(e);
            }
            return filledFormData;
        }
    }

    var VtApiPortNames;
    (function (VtApiPortNames) {
        VtApiPortNames["BG"] = "BG";
        VtApiPortNames["CS"] = "CS";
        VtApiPortNames["CS_CARD"] = "CS_CARD";
        VtApiPortNames["CS_VAULT_WEB"] = "CS_VAULT_WEB";
        VtApiPortNames["CS_WEBAUTHN_UNLOCK"] = "CS_WEBAUTHN_UNLOCK";
        VtApiPortNames["RESET"] = "RESET";
        VtApiPortNames["ZTAB"] = "ZTAB";
        VtApiPortNames["POPUP"] = "POPUP";
        VtApiPortNames["SIDE_PANEL"] = "SIDE_PANEL";
        VtApiPortNames["OFFSCREEN"] = "OFFSCREEN";
        VtApiPortNames["OAUTH"] = "OAUTH";
    })(VtApiPortNames || (VtApiPortNames = {}));

    class CSFrameApiBackend {
        async showConfirmFrame() {
            return exp_csframe.confirm.show();
        }
        async showSaveFrame() {
            return exp_csframe.saveFrame.show();
        }
        async showUpdateFrame() {
            return exp_csframe.updateFrame.show();
        }
        async showSiteFrame() {
            return exp_csframe.siteFrame.show();
        }
        async showSaveCardFrame() {
            return exp_csframe.cardSave.show();
        }
        async showFormFrame(frameUrl) {
            await cs.card.saveCCIframeData();
            return exp_csframe.formFrame.show(frameUrl);
        }
        async showUpdateCardFrame() {
            return exp_csframe.cardUpdate.show();
        }
        async showResetFrame() {
            return exp_csframe.resetFrame.show();
        }
        async showAlertFrame() {
            return exp_csframe.alert.show();
        }
        async downloadFile(data) {
            return cs.downloadUtil.saveFile(data);
        }
        async closeFrame(params) {
            return exp_csframe.closeFrame(params);
        }
        async closeSiteFrame(params) {
            return exp_csframe.siteFrame.close(params);
        }
        async closeCardFrame() {
            return exp_csframe.formFrame.close();
        }
        async closeSaveCardFrame() {
            return exp_csframe.cardSave.close();
        }
    }

    class GeneratedPasswordFiller {
        async fill(value) {
            try {
                const inputs = await this.getFillInputs();
                await Promise.all(inputs.map(x => userAction$1.fill(x, value)));
                inputs[0].focus();
                return inputs.length > 0;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async getFillInputs() {
            try {
                const input = csutil.input.getActiveInput();
                if (!input) {
                    return [];
                }
                const otherInput = await this.getConfirmPasswordField(input);
                if (!otherInput) {
                    return [input];
                }
                return [input, otherInput];
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async getConfirmPasswordField(passwordInput) {
            try {
                const container = await this.getConfirmPasswordContainer(passwordInput);
                if (!container) {
                    return null;
                }
                const passwordList = csutil.input.getPasswords({ container, visible: true, shadowRoot: false });
                switch (passwordList.length) {
                    case 2:
                    case 3:
                        break;
                    default:
                        return null;
                }
                const index = passwordList.indexOf(passwordInput);
                const nextIndex = index + 1;
                const hasManyAfter = (nextIndex + 1) < passwordList.length;
                if (hasManyAfter) {
                    return null;
                }
                const confirmPassword = passwordList[nextIndex];
                if (!this.isSimilarDimension(confirmPassword, passwordInput) ||
                    !this.checkIsNextField(container, passwordInput, confirmPassword)) {
                    return null;
                }
                return confirmPassword;
            }
            catch (e) {
                logError(e);
            }
            return null;
        }
        checkIsNextField(container, passwordInput, confirmPassword) {
            try {
                const inputs = csutil.input.selectAll({ container, types: [InputType.TEXT, InputType.EMAIL, InputType.TEL, InputType.NUMBER, InputType.PASSWORD], shadowRoot: false });
                const index = inputs.indexOf(passwordInput);
                if (index >= inputs.length || inputs[index + 1] != confirmPassword) {
                    return false;
                }
                return true;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async getConfirmPasswordContainer(passwordInput) {
            try {
                const passwordList = await csutil.input.getPasswords({ visible: true, shadowRoot: false });
                const index = passwordList.indexOf(passwordInput);
                if (index == -1 || index == (passwordList.length - 1)) {
                    return null;
                }
                switch (passwordList.length) {
                    case 1: return null;
                    case 2: return csutil.dom.getAncestor(passwordList[0], passwordList[1]);
                }
                switch (index) {
                    case 0: return csutil.dom.getAncestor(passwordList[0], passwordList[1]);
                    case passwordList.length - 1: return csutil.dom.getAncestor(passwordList[passwordList.length - 2], passwordList[passwordList.length - 1]);
                }
                const prevAncestor = csutil.dom.getAncestor(passwordInput, passwordList[index - 1]);
                const nextAncestor = csutil.dom.getAncestor(passwordInput, passwordList[index + 1]);
                if (prevAncestor.contains(nextAncestor)) {
                    return prevAncestor;
                }
                return nextAncestor;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        isSimilarDimension(input, otherInput) {
            const OK_DIFF = 20;
            return (Math.abs(input.offsetWidth - otherInput.offsetWidth) < OK_DIFF) &&
                (Math.abs(input.offsetHeight - otherInput.offsetHeight) < OK_DIFF);
        }
    }

    let generatedPasswordFiller$1 = null;
    function initContext$2() {
        generatedPasswordFiller$1 = new GeneratedPasswordFiller();
    }

    class PasswordViewPreventer {
        plainPassChecker = new PlainPasswordNodeChecker();
        skipBgConnectCheck = false;
        async init() {
            try {
                this.init = js.fn.emptyFn;
                this.skipBgConnectCheck = (await zlocalStorage.load(LocalStorageKeys.SKIP_ONE_CLICK_BG_CONNECT_CHECK, STRING.FALSE)) == STRING.TRUE;
                csutil.input.listenPasswordToText(this.onPasswordToText.bind(this));
                this.checkDevtools();
                this.plainPassChecker.init();
                info(PasswordViewPreventer.name, "password view preventer initialized");
            }
            catch (e) {
                logError(e);
            }
        }
        async filledPassword(password) {
            try {
                await this.init();
                info(PasswordViewPreventer.name, "filled password added to checks", js.log.mask(password));
                this.plainPassChecker.filledPasswords.add(password);
            }
            catch (e) {
                logError(e);
            }
        }
        async checkDevtools() {
            try {
                while (true) {
                    await this.check();
                    await js.time.delay(0.5);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async check() {
            try {
                const apiConnectable = this.skipBgConnectCheck ? true : await bgApi.tab.checkConnectable();
                if (!apiConnectable) {
                    info(PasswordViewPreventer.name, "api not connectable");
                    this.closeTab();
                    return;
                }
                const isDevToolsOpen = await bgApi.tab.checkDevToolsOpen();
                if (isDevToolsOpen) {
                    info(PasswordViewPreventer.name, "dev tools open");
                    this.closeTab();
                    return;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        onPasswordToText(input) {
            try {
                if (input.type == InputType.PASSWORD) {
                    return;
                }
                input.type = InputType.PASSWORD;
                info(PasswordViewPreventer.name, "input reverted to password type", input);
            }
            catch (e) {
                logError(e);
            }
        }
        async closeTab() {
            try {
                info(PasswordViewPreventer.name, "closing tab");
                await bgApi.other.devToolsCloseTab();
            }
            catch (e) {
                this.clearInputs();
                logError(e);
            }
        }
        clearInputs() {
            try {
                for (let input of Array.from(csutil.selector.selectAll("input", { shadowRoot: false }))) {
                    if (input.value.length == 0) {
                        continue;
                    }
                    userAction$1.fill(input, "");
                    info(PasswordViewPreventer.name, "clearing input: ", input);
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class PlainPasswordNodeChecker {
        filledPasswords = new Set();
        async init() {
            try {
                const TRUE = "true";
                const setting = await zlocalStorage.load(LocalStorageKeys.NEW_PLAIN_PASS_CHECK, TRUE);
                if (setting != TRUE) {
                    return;
                }
                const observer = new MutationObserver(this.handleNewChildMutation.bind(this));
                observer.observe(document.body || document.documentElement, {
                    subtree: true,
                    childList: true,
                });
            }
            catch (e) {
                logError(e);
            }
        }
        handleNewChildMutation(mutations, _observer) {
            try {
                for (let mutation of mutations) {
                    for (let input of this.getInputElements(mutation)) {
                        this.checkInput(input);
                    }
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getInputElements(mutation) {
            try {
                const inputs = [];
                if (mutation.target instanceof HTMLInputElement) {
                    inputs.push(mutation.target);
                }
                let elem;
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    elem = mutation.addedNodes.item(i);
                    if (!(elem instanceof HTMLElement)) {
                        continue;
                    }
                    if (elem instanceof HTMLInputElement) {
                        inputs.push(elem);
                        continue;
                    }
                    for (let inputElem of csutil.selector.selectAll("input", { container: elem, shadowRoot: false })) {
                        inputs.push(inputElem);
                    }
                }
                return inputs;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        checkInput(input) {
            try {
                if (!this.filledPasswords.has(input.value)) {
                    return;
                }
                if (input.type == InputType.PASSWORD) {
                    return;
                }
                info(PasswordViewPreventer.name, "reverting newly appeared dom input with same filled value", input);
                input.type = InputType.PASSWORD;
            }
            catch (e) {
                logError(e);
            }
        }
    }
    const exp_passwordViewPreventer = new PasswordViewPreventer();

    initContext$2();
    const generatedPasswordFiller = generatedPasswordFiller$1;

    class CSLoginApiBackend {
        async fillActiveInput(value) {
            return cs.fieldFillder.fillActiveInput(value);
        }
        async fillValue(fillValue) {
            return cs.fieldFillder.fillValue(fillValue);
        }
        async login(loginData) {
            cs.login.login(loginData);
        }
        async frameLogin(loginData) {
            cs.login.frameLogin(loginData);
        }
        async fillCard(secret) {
            return cs.card.fillCard(secret);
        }
        async fillForm(secret) {
            return cs.form.fillAddress(secret);
        }
        async fillFormField(data) {
            return cs.form.fillFormField(data);
        }
        async getActiveInputLoginType() {
            return cs.login.getActiveInputLoginType();
        }
        async fillGeneratedPassword(value) {
            return generatedPasswordFiller.fill(value);
        }
        async hasValidLoginField() {
            return cs.login.hasValidLoginField();
        }
    }

    var VI18N;
    (function (VI18N) {
        VI18N["ACCESS_CHECKOUT_DESCRIPTION"] = "access_checkout_description";
        VI18N["ACCESS_CONTROL_DESCRIPTION"] = "access_control_description";
        VI18N["ACCESS_CONTROL_DISABLED_SUCCESS"] = "access_control_disabled_success";
        VI18N["ACCESS_CONTROL_INVALID_TIME"] = "access_control_invalid_time";
        VI18N["ACCESS_CONTROL_SAVED_SUCCESS"] = "access_control_saved_success";
        VI18N["ACCESS_CONTROL_SELECT_ANOTHER_APPROVER"] = "access_control_select_another_approver";
        VI18N["ACCESS_REQUEST_CREATED_SUCCESS"] = "access_request_created_success";
        VI18N["ACCESS_REQUEST_PENDING_DESCRIPTION"] = "access_request_pending_description";
        VI18N["ACCESS_REVOKED_SUCCESS"] = "access_revoked_success";
        VI18N["ACCESS_REVOKED_USER_SUCCESS"] = "access_revoked_user_success";
        VI18N["ADD_CARD"] = "add_card";
        VI18N["ADD_FOLDER"] = "add_folder";
        VI18N["ADD_PASSWORD"] = "add_password";
        VI18N["ADD_ADDRESS"] = "add_address";
        VI18N["ADD_PASSWORD_RESTRICTED"] = "add_password_restricted";
        VI18N["ADV_SETTING_DISABLE_BADGE_COUNT_CONTENT"] = "adv_setting_disable_badge_count_content";
        VI18N["ADV_SETTING_DISABLE_BADGE_COUNT_HEADING"] = "adv_setting_disable_badge_count_heading";
        VI18N["ADV_SETTING_DISABLE_CLICK_TO_LOGIN"] = "adv_setting_disable_click_to_login";
        VI18N["ADV_SETTING_DISABLE_CLICK_TO_LOGIN_CONTENT"] = "adv_setting_disable_click_to_login_content";
        VI18N["ADV_SETTING_DISABLE_VAULT_ICON_CONTENT"] = "adv_setting_disable_vault_icon_content";
        VI18N["ADV_SETTING_DISABLE_VAULT_ICON_HEADING"] = "adv_setting_disable_vault_icon_heading";
        VI18N["ADVANCE_REQUEST_APPROVED_DESCRIPTION"] = "advance_request_approved_description";
        VI18N["ALERT_HTTP_FILL"] = "alert_http_fill";
        VI18N["ALL_FOLDERS"] = "all_folders";
        VI18N["ALL_PASSWORDS"] = "all_passwords";
        VI18N["ALL_WEEKDAYS"] = "all_weekdays";
        VI18N["ALL_WEEKENDS"] = "all_weekends";
        VI18N["ASK_CLEAR_HISTORY"] = "ask_clear_history";
        VI18N["AUTOFILL_CARD_SUB_DOMAINS"] = "autofill_card_sub_domains";
        VI18N["AUTOFILL_SUB_DOMAINS"] = "autofill_sub_domains";
        VI18N["AUTOLOGIN_DISABLE_SUCCESS"] = "autologin_disable_success";
        VI18N["AUTOLOGIN_ENABLE_SUCCESS"] = "autologin_enable_success";
        VI18N["BACK_TO_FOLDERS"] = "back_to_folders";
        VI18N["CANCEL"] = "cancel";
        VI18N["CANCEL_ACCESS_REQUEST_SUCCESS"] = "cancel_access_request_success";
        VI18N["CANCEL_REQUEST"] = "cancel_request";
        VI18N["CARD_ADDED_SUCCESSFULLY"] = "card_added_successfully";
        VI18N["CARD_EDITED_SUCCESSFULLY"] = "card_edited_successfully";
        VI18N["ADDRESS_ADDED_SUCCESSFULLY"] = "address_added_successfully";
        VI18N["ADDRESS_EDITED_SUCCESSFULLY"] = "address_edited_successfully";
        VI18N["CARD_MOVE_TO_TRASH_SUCCESS"] = "card_move_to_trash_success";
        VI18N["CARD_NAME_ON_CARD"] = "card_name_on_card";
        VI18N["CHANGES_UPDATED"] = "changes_updated";
        VI18N["CHECK_IN_CONFIRM_DESCRIPTION"] = "check_in_confirm_description";
        VI18N["CHECK_IN_CONFIRM_TITLE"] = "check_in_confirm_title";
        VI18N["CHECK_IN_SUCCESS"] = "check_in_success";
        VI18N["CHECKIN"] = "checkin";
        VI18N["CHECKOUT"] = "checkout";
        VI18N["CHECKOUT_SUCCESS"] = "checkout_success";
        VI18N["CLEAR"] = "clear";
        VI18N["CLEAR_ALL"] = "clear_all";
        VI18N["CLEAR_CLIPBOARD_AFTER"] = "clear_clipboard_after";
        VI18N["CLEAR_FILTERS"] = "clear_filters";
        VI18N["CLOSE_DEV_TOOLS_ONE_CLICK_LOGIN"] = "close_dev_tools_one_click_login";
        VI18N["DEV_TOOLS_NEWTAB_LOGIN"] = "devtools_newtab_login";
        VI18N["DEV_TOOLS_TAB_CLOSED"] = "devtools_tab_closed";
        VI18N["CLOSE_DEV_TOOLS_ONE_CLICK_CARD"] = "close_dev_tools_one_click_card";
        VI18N["CONFIRM_ACCESS_CONTROL_DISABLE"] = "confirm_access_control_disable";
        VI18N["CONFIRM_CHECKOUT_DESCRIPTION"] = "confirm_checkout_description";
        VI18N["CONFIRM_INSECURE_FILL"] = "confirm_insecure_fill";
        VI18N["CONTEXT_MENU_SHOW_ALL_PASSWORDS"] = "context_menu_show_all_passwords";
        VI18N["CONTEXT_MENU_SHOW_ALL_CARDS"] = "context_menu_show_all_cards";
        VI18N["COPIED"] = "copied";
        VI18N["COPY"] = "copy";
        VI18N["COPY_TO_CLIPBOARD"] = "copy_to_clipboard";
        VI18N["CREATE_FOLDER"] = "create_folder";
        VI18N["CREATE_NEW"] = "create_new";
        VI18N["CURRENT_DOMAIN"] = "current_domain";
        VI18N["DAY"] = "day";
        VI18N["DAYS"] = "days";
        VI18N["DEFAULT_VIEW"] = "default_view";
        VI18N["DELETE"] = "delete";
        VI18N["DELETE_DOMAIN_FROM_LIST"] = "delete_domain_from_list";
        VI18N["DELETE_DOMAIN_FROM_LIST_DESCRIPTION"] = "delete_domain_from_list_description";
        VI18N["DELETE_PASSWORD"] = "delete_password";
        VI18N["DELETE_PASSWORD_CONFIRM_MESSAGE"] = "delete_password_confirm_message";
        VI18N["DELETE_PASSWORD_CONFIRM_TITLE"] = "delete_password_confirm_title";
        VI18N["DELETE_PASSWORD_SUCCESS_MESSAGE"] = "delete_password_success_message";
        VI18N["DENY"] = "deny";
        VI18N["ALLOW"] = "allow";
        VI18N["DESCRIPTION"] = "description";
        VI18N["DETAILED_VIEW"] = "detailed_view";
        VI18N["DISABLE"] = "disable";
        VI18N["DISABLE_ACCESS_CONTROL"] = "disable_access_control";
        VI18N["DISABLE_AUTO_LOGIN"] = "disable_auto_login";
        VI18N["DOMAIN_MISMATCH_ALERT"] = "domain_mismatch_alert";
        VI18N["DOMAIN_MISMATCH_DETECTED"] = "domain_mismatch_detected";
        VI18N["DOWNLOAD"] = "download";
        VI18N["EMPTY"] = "";
        VI18N["EDIT"] = "edit";
        VI18N["EDIT_CARD"] = "edit_card";
        VI18N["EDIT_ADDRESS"] = "edit_address";
        VI18N["EDIT_PASSWORD"] = "edit_password";
        VI18N["EMPTY_TRASH"] = "empty_trash";
        VI18N["EMPTY_TRASH_CONFIRM_MESSAGE"] = "empty_trash_confirm_message";
        VI18N["EMPTY_TRASH_CONFIRM_TITLE"] = "empty_trash_confirm_title";
        VI18N["EMPTY_TRASH_SUCCESS_MESSAGE"] = "empty_trash_success_message";
        VI18N["ENABLE_ACCESS_CONTROL"] = "enable_access_control";
        VI18N["ENABLE_AUTO_LOGIN"] = "enable_auto_login";
        VI18N["ENTERPRISE"] = "enterprise";
        VI18N["ENTERPRISE_PASSWORDS"] = "enterprise_passwords";
        VI18N["ERROR_GETTING_ONEAUTH_TOTP"] = "error_getting_oneauth_totp";
        VI18N["FAVOURITES"] = "favourites";
        VI18N["FIELD_NAME"] = "field_name";
        VI18N["FILE"] = "file";
        VI18N["FILE_ONLY_N_PER_PASSWORD"] = "file_only_n_per_password";
        VI18N["FILE_SIZE_CANNOT_EXCEED"] = "file_size_cannot_exceed";
        VI18N["FILE_SIZE_PER_PASSWORD_CANNOT_EXCEED"] = "file_size_per_password_cannot_exceed";
        VI18N["FILL"] = "fill";
        VI18N["FOLDER"] = "folder";
        VI18N["FOLDER_NAME"] = "folder_name";
        VI18N["FOLDERS"] = "folders";
        VI18N["GENERATOR_HISTORY_DESCRIPTION"] = "generator_history_description";
        VI18N["GENERATOR_PASSWORD_LENGTH"] = "generator_password_length";
        VI18N["GET_ONEAUTH_TOTP"] = "get_oneauth_totp";
        VI18N["HOUR"] = "hour";
        VI18N["HOURS"] = "hours";
        VI18N["INSECURE_CARD_FILL_DESCRIPTION"] = "insecure_card_fill_description";
        VI18N["INSECURE_PAGE_ALERT"] = "insecure_page_alert";
        VI18N["INVALID_DATE_ERROR"] = "invalid_date_error";
        VI18N["INVALID_EMAIL_ADDRESS"] = "invalid_email_address";
        VI18N["LIST_VIEW"] = "list_view";
        VI18N["LOGIN"] = "login";
        VI18N["LOGIN_INCOGNITO"] = "login_incognito";
        VI18N["MANAGE"] = "manage";
        VI18N["MANAGE_ACCESS_CONTROL"] = "manage_access_control";
        VI18N["MANAGE_AUTHENTICATOR"] = "manage_authenticator";
        VI18N["MANAGE_AUTHENTICATORS"] = "manage_authenticators";
        VI18N["MANAGE_CUSTOM_FIELDS"] = "manage_custom_fields";
        VI18N["MANAGE_PROMPTS"] = "manage_prompts";
        VI18N["MASTER_PASSWORD"] = "master_password";
        VI18N["MAX_FILE_SIZE_POPUP"] = "max_file_size_popup";
        VI18N["MESSAGE"] = "message";
        VI18N["MINUTE"] = "minute";
        VI18N["MINUTES"] = "minutes";
        VI18N["MODIFY"] = "modify";
        VI18N["MOVE_PASSWORD_NAME_TO_TRASH"] = "move_password_name_to_trash";
        VI18N["MOVE_TO_TRASH"] = "move_to_trash";
        VI18N["MOVE_TO_TRASH_SUCCESS"] = "move_to_trash_success";
        VI18N["MUST_NOT_BE_EMPTY"] = "must_not_be_empty";
        VI18N["MUST_NOT_CONTAIN"] = "must_not_contain";
        VI18N["NAME"] = "name";
        VI18N["NO_CARDS_FOUND"] = "no_cards_found";
        VI18N["NO_ADDRESS_FOUND"] = "no_addresses_found";
        VI18N["NO_CARDS_MATCHING_FOUND"] = "no_cards_matching_found";
        VI18N["NO_COPY_PERMISSION"] = "no_copy_permission";
        VI18N["NO_EDIT_PERMISSION"] = "no_edit_permission";
        VI18N["NO_FOLDERS_FOUND"] = "no_folders_found";
        VI18N["NO_FOLDERS_MATCHING_FOUND"] = "no_folders_matching_found";
        VI18N["NO_MATCHING_FOLDERS_FOUND"] = "no_matching_folders_found";
        VI18N["NO_MATCHING_PASSWORDS_FOUND"] = "no_matching_passwords_found";
        VI18N["NO_MATCHING_ADDRESSES_FOUND"] = "no_matching_addresses_found";
        VI18N["NO_PASSWORDS_FOLDER"] = "no_passwords_folder";
        VI18N["NO_PASSWORDS_FOUND"] = "no_passwords_found";
        VI18N["NO_PASSWORDS_MATCHING_FOUND_FOLDER"] = "no_passwords_matching_found_folder";
        VI18N["NO_PASSWORDS_YET"] = "no_passwords_yet";
        VI18N["NO_SHARE_PERMISSION"] = "no_share_permission";
        VI18N["NO_TRASHED_PASSWORDS"] = "no_trashed_passwords";
        VI18N["NO_USER_GROUPS_FOUND"] = "no_user_groups_found";
        VI18N["NO_USER_GROUPS_MATCHING_FOUND"] = "no_user_groups_matching_found";
        VI18N["NO_USERS_FOUND"] = "no_users_found";
        VI18N["NO_USERS_MATCHING_FOUND"] = "no_users_matching_found";
        VI18N["NO_VIEW_PERMISSION"] = "no_view_permission";
        VI18N["NOTES"] = "notes";
        VI18N["ONE_CLICK_PASSWORD_CHANGE_PREVENTED_POPUP"] = "one_click_password_change_prevented_popup";
        VI18N["ONEAUTH_APPROVE_MESSAGE"] = "oneauth_approve_message";
        VI18N["ONEAUTH_INSTALL_DESCRIPTION"] = "oneauth_install_description";
        VI18N["ONEAUTH_NOTIFICATION_PUSHED"] = "oneauth_notification_pushed";
        VI18N["ONEAUTH_UNLOCK_FAILED"] = "oneauth_unlock_failed";
        VI18N["OPEN_WEB_APP"] = "open_web_app";
        VI18N["PARENT_DOMAIN"] = "parent_domain";
        VI18N["PASSPHRASE_CLEARED"] = "passphrase_cleared";
        VI18N["PASSWORD"] = "password";
        VI18N["PASSWORD_ADDED_SUCCESSFULLY"] = "password_added_successfully";
        VI18N["PASSWORD_EDITED_SUCCESSFULLY"] = "password_edited_successfully";
        VI18N["PASSWORD_MUST_HAVE_LOWERCASE"] = "password_must_have_lowercase";
        VI18N["PASSWORD_MUST_HAVE_MINIMUM_CHARS"] = "password_must_have_minimum_chars";
        VI18N["PASSWORD_MUST_HAVE_NUMBER"] = "password_must_have_number";
        VI18N["PASSWORD_MUST_HAVE_SPL_CHAR"] = "password_must_have_spl_char";
        VI18N["PASSWORD_MUST_HAVE_UPPERCASE"] = "password_must_have_uppercase";
        VI18N["PASSWORD_MUST_NOT_HAVE_CHARS"] = "password_must_not_have_chars";
        VI18N["PASSWORD_MUST_START_WITH_ALPHABET"] = "password_must_start_with_alphabet";
        VI18N["PASSWORD_POLICY"] = "password_policy";
        VI18N["PASSWORDS"] = "passwords";
        VI18N["PERSONAL_PASSWORD_CANNOT_BE_SHARED"] = "personal_password_cannot_be_shared";
        VI18N["PERSONAL_PASSWORD_RESTRICTED"] = "personal_password_restricted";
        VI18N["PERSONAL"] = "personal";
        VI18N["PERSONAL_PASSWORDS"] = "personal_passwords";
        VI18N["PLEASE_ENTER"] = "please_enter";
        VI18N["PLEASE_ENTER_A"] = "please_enter_a";
        VI18N["PLEASE_ENTER_AN_EMAIL"] = "please_enter_an_email";
        VI18N["PLEASE_ENTER_YOUR"] = "please_enter_your";
        VI18N["PLEASE_UPLOAD_YOUR"] = "please_upload_your";
        VI18N["PROCEED"] = "proceed";
        VI18N["PROMPT_AUTO_SAVE_UPDATE"] = "prompt_auto_save_update";
        VI18N["PROMPT_CARD_AUTO_SAVE_UPDATE"] = "prompt_card_auto_save_update";
        VI18N["PUSH_SENT_SUCCESS"] = "push_sent_success";
        VI18N["REASON"] = "reason";
        VI18N["RECENTLY_COPIED_PASSWORDS"] = "recently_copied_passwords";
        VI18N["REQUEST_ACCESS"] = "request_access";
        VI18N["REQUEST_ACCESS_DESCRIPTION"] = "request_access_description";
        VI18N["RESET_PASSWORD"] = "reset_password";
        VI18N["RESOURCE_REMOVED_SUCCESSFULLY"] = "resource_removed_successfully";
        VI18N["RESTORE_PASSWORD"] = "restore_password";
        VI18N["RESTORE_PASSWORD_CONFIRM_MESSAGE"] = "restore_password_confirm_message";
        VI18N["RESTORE_PASSWORD_CONFIRM_TITLE"] = "restore_password_confirm_title";
        VI18N["RESTORE_PASSWORD_SUCCESS_MESSAGE"] = "restore_password_success_message";
        VI18N["SAME_NAME_PASSWORD_EXISTS"] = "same_name_password_exists";
        VI18N["SAVE_AND_ENABLE"] = "save_and_enable";
        VI18N["SAVE_PROMPT_DISABLED_DESCRIPTION"] = "save_prompt_disabled_description";
        VI18N["SEARCH"] = "search";
        VI18N["SEARCHING"] = "searching";
        VI18N["SECONDS"] = "seconds";
        VI18N["SELECT_CREATE_FOLDER"] = "select_create_folder";
        VI18N["SELECT_ONEAUTH_SECRETS"] = "select_oneauth_secrets";
        VI18N["SETTING_ENFORCED_BY_AMDIN"] = "setting_enforced_by_amdin";
        VI18N["SHARE_ONE_CLICK_LOGIN"] = "share_one_click_login";
        VI18N["SHARE_PASSWORD"] = "share_password";
        VI18N["SHARE_SUCCESS"] = "share_success";
        VI18N["SHARE_USER_SUCCESS"] = "share_user_success";
        VI18N["SHARED_BY_ME"] = "shared_by_me";
        VI18N["SHARED_WITH_ME"] = "shared_with_me";
        VI18N["SHARING_RESTRICTED"] = "sharing_restricted";
        VI18N["SIGN_OUT"] = "sign_out";
        VI18N["SIGN_OUT_CONFIRM"] = "sign_out_confirm";
        VI18N["SYNC"] = "sync";
        VI18N["SYNC_COMPLETED"] = "sync_completed";
        VI18N["SYNC_DESCRIPTION"] = "sync_description";
        VI18N["SYNC_STARTED"] = "sync_started";
        VI18N["SYNCING"] = "syncing";
        VI18N["TAGS"] = "tags";
        VI18N["TAG"] = "tag";
        VI18N["THIRD_PARTY_SHARED_OUTPUT"] = "third_party_shared_output";
        VI18N["TILE_VIEW"] = "tile_view";
        VI18N["TOTP_KEY"] = "totp_key";
        VI18N["TOTP_KEY_MUST_CONTAIN_ATLEAST_N_CHARS"] = "totp_key_must_contain_atleast_n_chars";
        VI18N["UNLOCK_ZOHO_VAULT"] = "unlock_zoho_vault";
        VI18N["UNSHARED"] = "unshared";
        VI18N["UNSHARED_FOLDERS"] = "unshared_folders";
        VI18N["UNSHARED_PASSWORDS"] = "unshared_passwords";
        VI18N["UPDATE"] = "update";
        VI18N["UPDATE_CARD"] = "update_card";
        VI18N["UPDATE_PASSWORD_QUESTION"] = "update_password_question";
        VI18N["URL"] = "url";
        VI18N["URL_INVALID"] = "url_invalid";
        VI18N["URLS_MAX_N"] = "urls_max_n";
        VI18N["USE_XS_PASSWORD_ON_Y"] = "use_xs_password_on_y";
        VI18N["USER_NAME_LABEL"] = "user_name_label";
        VI18N["VALUE"] = "value";
        VI18N["VIEW"] = "view";
        VI18N["VIEW_FILTERS"] = "view_filters";
        VI18N["VIEW_MORE"] = "view_more";
        VI18N["WEEK"] = "week";
        VI18N["WEEKS"] = "weeks";
        VI18N["ZOHO_VAULT_EXTENSION_LOCKED"] = "zoho_vault_extension_locked";
        VI18N["SELECT_COUNTRY"] = "select_country";
        VI18N["SELECT_STATE"] = "select_state";
        VI18N["SELECT_CITY"] = "select_city";
        VI18N["SELECT_ALL"] = "select_all";
        VI18N["UNSELECT_ALL"] = "unselect_all";
        VI18N["SELECT"] = "select";
        VI18N["X_MUST_BE_LESS_THAN_Y_CHARS"] = "x_must_be_less_than_y_chars";
        VI18N["SIGNUP_FOR_VAULT"] = "signup_for_vault";
        VI18N["GENERATOR_POLICY_DEFAULTS_USED"] = "generator_policy_defaults_used";
        VI18N["SIGN_UP"] = "sign_up";
        VI18N["ADD_PERSONAL_ENTERPRISE_PASSWORD_RESTRICTED"] = "add_personal_enterprise_password_restricted";
        VI18N["ENTERPRISE_PASSWORD_RESTRICTED"] = "enterprise_password_restricted";
        VI18N["INVALID_MASTER_PASSWORD"] = "invalid_master_passphrase";
        VI18N["INVALID_MASTER_PASSWORD_N_REMAINING"] = "invalid_master_passphrase_n_remaining";
    })(VI18N || (VI18N = {}));

    class ContextCheckerGlobal {
        static httpConfirmed = false;
        static confirmedDomains = [];
        static confirmPromise = null;
    }
    class ContextChecker {
        async isValidFillContext(fillValue) {
            return new FillContextChecker().checkIsValidFillContext(fillValue);
        }
        async isValidLoginContext(loginData) {
            return new LoginContextChecker().checkIsValidLoginContext(loginData);
        }
        async isValidFrameLoginContext(loginData) {
            return new FrameLoginContextChecker().checkIsValidFrameLoginContext(loginData);
        }
        async isValidTabLoginContext(loginData) {
            return new TabLoginContextChecker().checkIsValidTabLoginContext(loginData);
        }
        setConfirmResponse(allow) {
            if (ContextCheckerGlobal.confirmPromise) {
                ContextCheckerGlobal.confirmPromise.resolve(allow);
            }
        }
    }
    const contextChecker = new ContextChecker();
    class ValidContextChecker {
        async checkOriginHttps() {
            return this.checkOrigin() &&
                (this.checkProtocol() || await this.getHttpConfirmation());
        }
        checkOrigin() {
            return self.origin != "null";
        }
        checkProtocol() {
            return ContextCheckerGlobal.httpConfirmed || !window.location.href.startsWith("http:");
        }
        async getHttpConfirmation() {
            const checkHttp = await zlocalStorage.load(LocalStorageKeys.INSECURE_PAGE_PROMPT, true);
            if (!checkHttp) {
                return true;
            }
            return ContextCheckerGlobal.httpConfirmed = window.confirm(i18n(VI18N.CONFIRM_INSECURE_FILL));
        }
        checkDomain(allowedDomains) {
            const currentDomain = js.url.getParentDomain(window.location.href);
            const validDomain = allowedDomains.includes(currentDomain) || ContextCheckerGlobal.confirmedDomains.includes(currentDomain);
            return validDomain;
        }
        async getUserConsent(allowedDomains, secretId, shareLevel) {
            try {
                ContextCheckerGlobal.confirmPromise = js.promise.createNew();
                const currentDomain = js.url.getParentDomain(window.location.href);
                const domainValues = {
                    secretId,
                    frameId: await bgApi.tab.getFrameId(),
                    ownedDomain: allowedDomains[0],
                    useDomain: currentDomain,
                    allowPermanent: Secret.hasEditPermission(shareLevel)
                };
                await ztabStorage.save(TabStorageKeys.CONFIRM_USAGE_FOR, domainValues);
                await bgApi.tab.showConfirmFrame();
                const allow = await ContextCheckerGlobal.confirmPromise;
                if (allow) {
                    ContextCheckerGlobal.confirmedDomains.push(currentDomain);
                }
                return allow;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }
    class FillContextChecker extends ValidContextChecker {
        async checkIsValidFillContext(fillValue) {
            return this.checkIsValidFillContextFn(fillValue.allowedDomains, fillValue.secretId, fillValue.shareLevel);
        }
        async checkIsValidFillContextFn(allowedDomains, secretId, shareLevel) {
            const isValid = await this.checkOriginHttps() &&
                (this.checkDomain(allowedDomains) || await this.getUserConsent(allowedDomains, secretId, shareLevel));
            return isValid;
        }
    }
    class LoginContextChecker extends FillContextChecker {
        async checkIsValidLoginContext(loginData) {
            const isValid = await this.checkOriginHttps() && this.checkDomain(loginData.allowedDomains);
            return isValid;
        }
    }
    class FrameLoginContextChecker extends FillContextChecker {
        async checkIsValidFrameLoginContext(loginData) {
            return this.checkIsValidFillContextFn(loginData.allowedDomains, loginData.secretId, loginData.shareLevel);
        }
    }
    class TabLoginContextChecker extends FillContextChecker {
        async checkIsValidTabLoginContext(loginData) {
            const isValid = await this.checkOriginHttps() && (await this.checkTabDomain(loginData.allowedDomains));
            return isValid;
        }
        async checkTabDomain(allowedDomains) {
            const tabDomain = await bgApi.tab.getTabDomain();
            const valid = allowedDomains.includes(tabDomain);
            return valid;
        }
    }

    class CSOtherApiBackend {
        async setConfirmResponse(allow) {
            return contextChecker.setConfirmResponse(allow);
        }
        async resetPassword() {
            return cs.passwordReset.resetPassword();
        }
        async getFrameUrl() {
            return window.location.href;
        }
        async showSiteFrame(params) {
            return zicon.showSiteFrame(params);
        }
        async showCardFrame() {
            return zicon.showCardFrame();
        }
        async getGeneratorSaveUsername() {
            return cs.other.getGeneratorSaveUsername();
        }
        async getFilledFormData() {
            return cs.other.getFilledFormData();
        }
    }

    class CSApiServer {
        static server;
        static init() {
            const fnMap = {
                login: new CSLoginApiBackend(),
                frame: new CSFrameApiBackend(),
                other: new CSOtherApiBackend(),
            };
            const apiServer = CSApiServer.server = portApi.createApiServer();
            apiServer.init({ name: VtApiPortNames.CS, fnObj: fnMap });
        }
        static disconnect() {
            CSApiServer.server.disconnect();
        }
    }

    class CSCardApiBackend {
        async showFormFrame(frameUrl) {
            await cs.card.saveCCIframeData();
            return exp_csframe.formFrame.show(frameUrl);
        }
        async checkIframeFields(data) {
            return cs.card.checkIframeFields(data);
        }
        async fillCardIframe(data) {
            cs.card.removeClickListener();
            await cs.card.fillCCInIframe(data);
            await js.time.delay(0.2);
            return cs.card.addClickListener();
        }
        async fillVaultIconCCIframe(fields) {
            return cs.card.fillIconsToCCFrames(fields);
        }
    }

    class CSCardApiServer {
        static apiServer;
        static init() {
            const fnMap = {
                card: new CSCardApiBackend()
            };
            const apiServer = CSCardApiServer.apiServer = portApi.createApiServer();
            apiServer.init({ name: VtApiPortNames.CS_CARD, fnObj: fnMap });
        }
        static disconnect() {
            CSCardApiServer.apiServer.disconnect();
        }
    }

    var AddressFields;
    (function (AddressFields) {
        AddressFields["FIRSTNAME"] = "FIRSTNAME";
        AddressFields["MIDDLENAME"] = "MIDDLENAME";
        AddressFields["LASTNAME"] = "LASTNAME";
        AddressFields["NAME"] = "NAME";
        AddressFields["ADDRESS1"] = "ADDRESS1";
        AddressFields["ADDRESS2"] = "ADDRESS2";
        AddressFields["ADDRESS3"] = "ADDRESS3";
        AddressFields["MOBILE"] = "MOBILE";
        AddressFields["CITY"] = "CITY";
        AddressFields["ZIP"] = "ZIP";
        AddressFields["STATE"] = "STATE";
        AddressFields["COUNTRY"] = "COUNTRY";
    })(AddressFields || (AddressFields = {}));
    class CSAddressDetector extends CSFormDetector {
        firstName = new RegExp(/.*first.*name|initials|fname|first$|vorname|nombre|forename|prénom|prenom|名|nome|Имя|이름/, 'i');
        lastName = new RegExp(/.*last.*name|lname|surname|last$|secondname|nachname|apellido|famille|^nom|cognome|姓|morada|apelidos|surename|sobrenome|Фамилия|성[^명]?/, 'i');
        middleName = new RegExp(/.*middle.*name|mname|middle$|apellido.?materno/, 'i');
        name = new RegExp(/.*name|full.?name|your.?name|customer.?name|firstandlastname|bill.?name|ship.?name/, 'i');
        mobile = new RegExp(/.*phone|mobile|telefonnummer|telefono|teléfono|telfixe|電話|telefone|telemovel|телефон|电话|(전화|핸드폰|휴대폰|휴대전화)(.?번호)?/, 'i');
        address1 = new RegExp(/.*address.*line.?1|address.?1|addr1|street|area|strasse|straße|hausnummer|housenumber|house.?name|direccion|dirección|adresse|indirizzo|住所1|morada|endereço|Адрес|地址|주소.?1/, 'i');
        address2 = new RegExp(/.*address.*line.?2|address2|addr2|locality|suite|unit|adresszusatz|ergänzende.?angaben|direccion2|colonia|adicional|addresssuppl|complementnom|appartement|indirizzo2|住所2|complemento|addrcomplement|Улица|地址2|주소.?2/, 'i');
        address3 = new RegExp(/.*address.*line3|address3|addr3|landmark|line3|municipio|batiment|residence|indirizzo3/, 'i');
        city = new RegExp(/.*city|town|\\bort\\b|stadt|suburb|ciudad|provincia|localidad|poblacion|ville|commune|localita|市区町村|cidade|Город|市|分區|^시[^도·・]|시[·・]?군[·・]?구/, 'i');
        state = new RegExp(/^(?!.*country.*)(?!.*united.*state)(.*state|county|.*region|province|land|county|principality|都道府県|estado|provincia|область|省|地區|^시[·・]?도)/, 'i');
        zip = new RegExp(/.*zip|pin.?code|postal.?code|^-$|post2|codpos2/, 'i');
        country = new RegExp(/.*country.*|countries|location|país|pais|国|国家|국가|나라/, 'i');
        attributeName = "data-zvault-address";
        formAttribute = "data-zvault-address-form";
        frameUrl = frameUrls.ADDRESS_FRAME;
        async populateVaultIcons() {
            const disableVaultIcons = await zlocalStorage.load(VtSettings.DISABLE_WEBSITE_VAULT_ICON, false);
            if (disableVaultIcons) {
                return;
            }
            const inputFields = $("input:not([type=hidden],[type=radio],[type=checkbox],[type=file])");
            const selectFields = $("select:not([type=hidden])");
            const textareaFields = $("textarea");
            $.merge(selectFields, inputFields);
            $.merge(textareaFields, inputFields);
            const add1 = await this.detectFields(textareaFields, this.address1, AddressFields.ADDRESS1, false);
            const city = await this.detectFields(selectFields, this.city, AddressFields.CITY, false);
            const zip = await this.detectFields(inputFields, this.zip, AddressFields.ZIP, false);
            const state = await this.detectFields(selectFields, this.state, AddressFields.STATE, false);
            if (add1.length + city.length + zip.length + state.length < 4) {
                this.removeCustomAttributes(true);
                return;
            }
            this.detectFields(textareaFields, this.address2, AddressFields.ADDRESS2, false);
            this.detectFields(textareaFields, this.address3, AddressFields.ADDRESS3, false);
            this.detectFields(selectFields, this.country, AddressFields.COUNTRY, false);
            const firstName = await this.detectFields(inputFields, this.firstName, AddressFields.FIRSTNAME, false);
            if (firstName.length == 0) {
                this.detectFields(inputFields, this.name, AddressFields.NAME, false);
            }
            else {
                this.detectFields(inputFields, this.middleName, AddressFields.MIDDLENAME, false);
                this.detectFields(inputFields, this.lastName, AddressFields.LASTNAME, false);
            }
            this.detectFields(inputFields, this.mobile, AddressFields.MOBILE, false);
            this.fillVaultIconInFields();
        }
        fillVaultIconInFields() {
            for (let index = 0; index < this.formIndex; index++) {
                const attribute = this.attributeName + '-parent=ccform' + index;
                const ccfields = $('input[' + attribute + '], textarea[' + attribute + ']');
                for (let ccElement of ccfields) {
                    if (ccElement.type.toLowerCase() == 'button' || ccElement.type.toLowerCase() == "submit") {
                        continue;
                    }
                    this.fillVaultIcon(ccElement, true);
                }
            }
        }
    }
    const csAddressDetector = new CSAddressDetector();
    setGlobal("csAddressDetector", csAddressDetector);

    class CSFormFiller extends CSAddressDetector {
        async fillAddress(secret) {
            const cardData = await ztabStorage.load(TabStorageKeys.FORM_FRAME_DATA);
            const formId = cardData.parent;
            if ($('form[' + this.formAttribute + '=' + formId + ']').length == 0 && $('body[' + this.formAttribute + '=' + formId + ']').length == 0) {
                return;
            }
            await Promise.all([
                this.fillNameField(formId, secret),
                this.fillField(formId, AddressFields.MOBILE, secret.encrypted.fields[ADDRESS_FIELDS.MOBILE]),
                this.fillField(formId, AddressFields.ADDRESS1, secret.encrypted.fields[ADDRESS_FIELDS.ADDRESS_1]),
                this.fillField(formId, AddressFields.ADDRESS2, secret.encrypted.fields[ADDRESS_FIELDS.ADDRESS_2]),
                this.fillField(formId, AddressFields.ADDRESS3, secret.encrypted.fields[ADDRESS_FIELDS.ADDRESS_3]),
                this.fillField(formId, AddressFields.CITY, secret.encrypted.fields[ADDRESS_FIELDS.CITY]),
                this.fillField(formId, AddressFields.STATE, secret.encrypted.fields[ADDRESS_FIELDS.STATE])
            ]);
            if (secret.encrypted.fields[ADDRESS_FIELDS.ZIP] != "") {
                await this.fillField(formId, AddressFields.ZIP, secret.encrypted.fields[ADDRESS_FIELDS.ZIP]);
            }
            await js.time.delay(0.5);
            $('form[' + this.formAttribute + '=' + formId + ']').click();
        }
        hasSingleNameField(formId) {
            const targetAttr = this.attributeName + '-parent=' + formId + '][' + this.attributeName + '=' + AddressFields.NAME;
            let field = document.querySelector('input[' + targetAttr + '], textarea[' + targetAttr + ']');
            return field != null;
        }
        async fillNameField(formId, secret) {
            if (this.hasSingleNameField(formId)) {
                let name = secret.encrypted.fields[ADDRESS_FIELDS.FIRST_NAME] + " " + secret.encrypted.fields[ADDRESS_FIELDS.MIDDLE_NAME] + " " + secret.encrypted.fields[ADDRESS_FIELDS.LAST_NAME];
                name = name.trim();
                this.fillField(formId, AddressFields.NAME, name);
            }
            else {
                this.fillField(formId, AddressFields.FIRSTNAME, secret.encrypted.fields[ADDRESS_FIELDS.FIRST_NAME]);
                this.fillField(formId, AddressFields.MIDDLENAME, secret.encrypted.fields[ADDRESS_FIELDS.MIDDLE_NAME]);
                this.fillField(formId, AddressFields.LASTNAME, secret.encrypted.fields[ADDRESS_FIELDS.LAST_NAME]);
            }
        }
        async fillFormField(data) {
            const targetAttr = data.attribute + '-parent=' + data.parent + '][' + data.attribute + '=' + data.element;
            let field = document.querySelector('input[' + targetAttr + '], textarea[' + targetAttr + ']');
            userAction$1.fill(field, data.value);
        }
        async fillField(formId, name, value) {
            const targetAttr = this.attributeName + '-parent=' + formId + '][' + this.attributeName + '=' + name;
            let field = document.querySelector('input[' + targetAttr + '], textarea[' + targetAttr + ']');
            field = field == null ? document.querySelector('select[' + targetAttr + ']') : field;
            if (field == undefined) {
                return;
            }
            value = value == undefined ? "" : this.findMatchingOption(field, value);
            if (field.tagName == "SELECT" && value == "") {
                return;
            }
            userAction$1.fill(field, value);
        }
        findMatchingOption(element, value) {
            if (element.tagName.toLowerCase() != "select") {
                return value;
            }
            const allOptions = element.options;
            for (let option of allOptions) {
                const elmValue = option.value;
                if (option.innerText.toLowerCase() == value.toLowerCase()) {
                    return elmValue;
                }
            }
            return "";
        }
    }

    class CSLoginSubmitter {
        submitRegex = new NewSubmitRegex();
        async init() {
            try {
                const useOldSubmitRegex = (await zlocalStorage.load(LocalStorageKeys.USE_OLD_SUBMIT_REGEX, STRING.FALSE)) == STRING.TRUE;
                if (useOldSubmitRegex) {
                    this.submitRegex = new SumbitRegex();
                }
                info(CSLoginSubmitter.name, "use old submit regex: ", useOldSubmitRegex);
            }
            catch (e) {
                logError(e);
            }
        }
        async submit(container, filledInput) {
            try {
                info(CSLoginSubmitter.name, "submitting: ", container, "filled input: ", filledInput);
                await js.time.delay(0.3);
                const submitElem = new SubmitButtonGetter(this.submitRegex).get(container, filledInput);
                if (!submitElem) {
                    return false;
                }
                userAction.click(submitElem);
                return true;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async submitInputParent(input) {
            try {
                const container = csLoginContainer.getInputLoginContainer(input);
                info(CSLoginSubmitter.name, "submit input parent: ", input, "container: ", container);
                if (!container) {
                    return false;
                }
                return await this.submit(container, input);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        getSubmitButton(input) {
            try {
                const submitButton = new SubmitButtonGetter(this.submitRegex).get(csLoginContainer.getInputLoginContainer(input), input);
                return submitButton;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }
    class SumbitRegex {
        nextRegExp = /(?:next)|(?:continue)|(?:sign.?in)|(?:log.?in)|(?:log.?on)|(?:submit)/i;
        nonSubmitRegExp = /(?:\?)|(?:forg)|(?:password)|(?:\?)|(?:reset)|(?:show)|(?:cancel)/i;
    }
    class NewSubmitRegex extends SumbitRegex {
        nextRegExp = /(?:next)|(?:continue)|(?:sign.?in)|(?:log.?in)|(?:log.?on)|(?:submit)|(?:anmelden)|(?:einloggen)/i;
        nonSubmitRegExp = /(?:\?)|(?:forg)|(?:(?<!verify)password)|(?:\?)|(?:reset)|(?:show)|(?:cancel)|(?:regist)|(?:vergessen)/i;
    }
    class SubmitButtonGetter {
        submitRegex;
        static buttonNonAlphaRegex = /[^a-z?]/ig;
        container;
        filledInput;
        constructor(submitRegex) {
            this.submitRegex = submitRegex;
        }
        get(container, filledInput) {
            try {
                this.container = container;
                this.filledInput = filledInput;
                return this.getSubmit() ||
                    this.getSingleButton() ||
                    this.getNextTextButton() ||
                    this.getNextTextInputButton() ||
                    this.getTabIndexedButton() ||
                    this.getNextRegexButton() ||
                    this.getSingleButtonAfterInput() ||
                    this.getInputValueLogin() ||
                    this.getNextTextCustomButton() ||
                    this.getAnchor() ||
                    this.getDiv() ||
                    this.getSubmitOutsiteForm();
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getSubmit() {
            try {
                const submitButtons = this.selectAllFiltered("input[type='submit'],button[type='submit'],input[value='Login']", { afterInput: true, visible: true });
                switch (submitButtons.length) {
                    case 0: return null;
                    case 1: return submitButtons[0];
                }
                const validSubmitButtons = submitButtons.filter(x => this.testSubmitElem(x));
                if (validSubmitButtons.length == 1) {
                    return validSubmitButtons[0];
                }
                return submitButtons[0];
            }
            catch (e) {
                logError(e);
            }
            return null;
        }
        testSubmitElem(elem) {
            try {
                if (elem instanceof HTMLButtonElement) {
                    return this.testSubmitButtonElem(elem);
                }
                if (elem instanceof HTMLInputElement) {
                    return this.testSubmitInputElem(elem);
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        testSubmitButtonElem(elem) {
            try {
                const text = this.getButtonAlphaText(elem);
                return this.testSubmitButtonElemMinCheck(elem) && this.submitRegex.nextRegExp.test(text);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        testSubmitButtonElemMinCheck(elem) {
            try {
                const text = this.getButtonAlphaText(elem);
                return text && !this.submitRegex.nonSubmitRegExp.test(text) && this.checkNotShowButton(elem);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        testSubmitInputElem(elem) {
            try {
                const text = elem.value;
                return !this.submitRegex.nonSubmitRegExp.test(text);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        getSingleButton() {
            try {
                const buttons = this.selectAllFiltered("button", { visible: true, afterInput: true });
                if (buttons.length != 1) {
                    return null;
                }
                const reqButton = buttons[0];
                const isValidSubmitButton = this.testSubmitButtonElemMinCheck(reqButton);
                if (!isValidSubmitButton) {
                    return null;
                }
                return reqButton;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getTabIndexedButton() {
            try {
                const buttons = this.selectAllFiltered("button", { afterInput: true, visible: true });
                const tabIndexedButtons = buttons.filter(x => x.matches("button[tabindex]"));
                for (let button of tabIndexedButtons) {
                    if (button.tabIndex >= 0 && this.testSubmitButtonElemMinCheck(button)) {
                        return button;
                    }
                }
            }
            catch (e) {
                logError(e);
            }
            return null;
        }
        checkNotShowButton(button) {
            try {
                const rect = button.getBoundingClientRect();
                const midX = rect.x + (rect.width / 2);
                const midY = rect.y + (rect.height / 2);
                return !this.hasInputOn(midX, midY);
            }
            catch (e) {
                logError(e);
                return true;
            }
        }
        hasInputOn(x, y) {
            try {
                const elements = csutil.dom.getElementsFromPoint({ x, y });
                for (let curElement of elements) {
                    if (curElement instanceof HTMLInputElement) {
                        return true;
                    }
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        getNextTextButton() {
            return this.getNextTextButtonFn(this.container);
        }
        getNextTextButtonFn(container) {
            try {
                const buttons = this.selectAllFiltered("button", { afterInput: true, visible: true, container });
                return buttons.find(button => this.testSubmitButtonElem(button));
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getNextTextInputButton() {
            return this.getNextTextInputButtonFn(this.container);
        }
        getNextTextInputButtonFn(container) {
            try {
                const visibleInputButtons = this.selectAllFiltered("input[type='button']", { visible: true, afterInput: true, container });
                return visibleInputButtons.find(button => this.submitRegex.nextRegExp.test(this.getInputButtonAlphaText(button)));
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getAlphaTextFor(text) {
            try {
                return text.replace(SubmitButtonGetter.buttonNonAlphaRegex, "");
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        getButtonAlphaText(button) {
            return this.getAlphaTextFor(button.textContent || button.ariaLabel);
        }
        getInputButtonAlphaText(input) {
            return this.getAlphaTextFor(input.value);
        }
        getNextRegexButton() {
            try {
                const buttons = this.selectAllFiltered("button", { afterInput: true, visible: true });
                const nextButton = buttons.find(button => this.testSubmitButtonElemMinCheck(button) &&
                    csutil.dom.hasAttribute({ elem: button, key: this.submitRegex.nextRegExp }));
                return nextButton;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getSingleButtonAfterInput() {
            try {
                const buttons = this.selectAllFiltered("button", { afterInput: true, visible: true });
                if (buttons.length != 1) {
                    return null;
                }
                const reqButton = buttons[0];
                if (this.submitRegex.nonSubmitRegExp.test(reqButton.outerHTML)) {
                    return null;
                }
                return reqButton;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getInputValueLogin() {
            try {
                const visibleInputs = this.selectAllFiltered("input[type='image']", { afterInput: true, visible: true });
                return visibleInputs.find(x => this.submitRegex.nextRegExp.test(this.getInputButtonAlphaText(x)));
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getNextTextCustomButton() {
            try {
                const visibleCustomButtons = this.selectAllFiltered("[role='button'],[type='button'],[type='submit']", { afterInput: true, visible: true });
                return visibleCustomButtons.find(button => this.testSubmitButtonElem(button));
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getAnchor() {
            try {
                const elements = this.selectAllFiltered("a", { visible: true, afterInput: true });
                const hrefRegex = /(?:^$)|(?:^#$)|(?:javascript)/;
                for (let elem of elements) {
                    if (this.submitRegex.nonSubmitRegExp.test(elem.outerHTML) ||
                        !hrefRegex.test(elem.getAttribute("href")) ||
                        !this.submitRegex.nextRegExp.test(this.getButtonAlphaText(elem))) {
                        continue;
                    }
                    return elem;
                }
            }
            catch (e) {
                logError(e);
            }
            return null;
        }
        getDiv() {
            try {
                const elements = this.selectAllFiltered("div", { visible: true, afterInput: true });
                for (let elem of elements) {
                    if (window.getComputedStyle(elem).cursor != "pointer" ||
                        this.submitRegex.nonSubmitRegExp.test(this.getButtonAlphaText(elem)) ||
                        !this.submitRegex.nextRegExp.test(elem.outerHTML)) {
                        continue;
                    }
                    return elem;
                }
            }
            catch (e) {
                logError(e);
            }
            return null;
        }
        getSubmitOutsiteForm() {
            try {
                const isForm = this.container instanceof HTMLFormElement;
                if (!isForm) {
                    return null;
                }
                let parent = this.container;
                let submitElem = null;
                while (parent) {
                    submitElem = this.getNextTextButtonFn(parent) || this.getNextTextInputButtonFn(parent);
                    if (submitElem) {
                        return submitElem;
                    }
                    parent = parent.parentElement;
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        selectAllFiltered(selector, { afterInput = true, visible = true, container = null }) {
            const reqContainer = container || this.container;
            const allElems = csutil.selector.selectAll(selector, { container: reqContainer, shadowRoot: true, visible, });
            const afterInputElems = afterInput ? this.filterAfter(allElems, this.filledInput) : allElems;
            return afterInputElems;
        }
        filterAfter(elemList, input) {
            const inputRect = input.getBoundingClientRect();
            return elemList.filter(x => x.getBoundingClientRect().bottom >= inputRect.top);
        }
    }
    const csLoginSubmitter = new CSLoginSubmitter();
    setGlobal("csLoginSubmitter", csLoginSubmitter);

    class CSFillInputImpl {
        input = null;
        constructor(input) {
            this.input = input;
        }
        async fillValue(value) {
            await userAction.userFill(this.input, value);
        }
        getInputForZIconAddition() {
            return this.input;
        }
        getInputForSubmitting() {
            return this.input;
        }
    }

    class TotpLogin {
        async login(loginData) {
            try {
                info(TotpLogin.name, "totp login: ", js.log.mask(loginData, { keys: ["texts", "passwords"] }));
                await this.filledTotp();
                if (!this.hasTotpInLoginData(loginData)) {
                    return;
                }
                const totpFillInput = this.getTotpCSFillInput();
                if (totpFillInput) {
                    this.totpFrameLogin(totpFillInput, loginData);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async totpFrameLogin(fillInput, loginData) {
            try {
                let totp = "";
                if (loginData.hasTotp) {
                    totp = await bgApi.secret.totp.getTotp(loginData.secretId);
                }
                else if (loginData.oneauthId != "") {
                    totp = await bgApi.secret.totp.getOneAuthTotp(loginData.oneauthId);
                }
                await fillInput.fillValue(totp);
                this.filledTotp();
                if (!loginData.submit) {
                    return;
                }
                await csLoginSubmitter.submitInputParent(fillInput.getInputForSubmitting());
            }
            catch (e) {
                logError(e);
            }
        }
        async fillTotpOnApper(loginData) {
            try {
                let totpFillInput = null;
                for (let _ of js.loop.range(15)) {
                    totpFillInput = this.getTotpCSFillInput();
                    if (totpFillInput) {
                        this.totpFrameLogin(totpFillInput, loginData);
                        break;
                    }
                    await js.time.delay(1);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getTotpCSFillInput() {
            try {
                const validVisibleInputs = csutil.selector.selectAll("input", { shadowRoot: false })
                    .filter(exp_loginUtil.isTotpInput, exp_loginUtil);
                if (validVisibleInputs.length == 0) {
                    return null;
                }
                if (validVisibleInputs.length >= 6) {
                    const fillInput = this.getSixDigitTotpCSFillInput(validVisibleInputs);
                    if (fillInput) {
                        return fillInput;
                    }
                }
                return new CSFillInputImpl(validVisibleInputs[0]);
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        hasTotpInLoginData(loginData) {
            try {
                return loginData.hasTotp || loginData.oneauthId;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        getSixDigitTotpCSFillInput(totpInputs) {
            try {
                const selectedInputs = [totpInputs[0]];
                let lastInput = totpInputs[0];
                let curInput = null;
                for (let i = 1; i < totpInputs.length && selectedInputs.length < 6; i++) {
                    curInput = totpInputs[i];
                    if (curInput.offsetTop == lastInput.offsetTop) {
                        selectedInputs.push(curInput);
                    }
                    else {
                        selectedInputs.length = 0;
                    }
                    lastInput = curInput;
                }
                if (selectedInputs.length == 6) {
                    return new TotpSixDigitFillInput(selectedInputs);
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async filledTotp() {
            try {
                await ztabStorage.remove(TabStorageKeys.LOGIN_DATA);
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class TotpSixDigitFillInput {
        inputs = null;
        constructor(inputs) {
            this.inputs = inputs;
        }
        async fillValue(value) {
            const promises = [];
            const end = Math.min(this.inputs.length, value.length);
            for (let i = 0; i < end; i++) {
                promises.push(userAction.userFill(this.inputs[i], value[i]));
                await js.time.delay(0.3);
            }
            await Promise.all(promises);
        }
        getInputForZIconAddition() {
            return null;
        }
        getInputForSubmitting() {
            return this.inputs[0];
        }
    }

    class CSFieldFiller {
        async fillValue(fillValue) {
            try {
                const isValidDomain = await contextChecker.isValidFillContext(fillValue);
                if (!isValidDomain) {
                    return;
                }
                const fillInput = BaseFillInputGetter.getInstance(fillValue.type).getFillInput();
                if (!fillInput) {
                    return;
                }
                await fillInput.fillValue(fillValue.value);
                const inputForZIconAddition = fillInput.getInputForZIconAddition();
                if (inputForZIconAddition) {
                    zicon.addForContextMenuUsedInput(inputForZIconAddition);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async fillActiveInput(value) {
            const input = csutil.input.getActiveInput();
            if (!input) {
                return false;
            }
            await userAction.userFill(input, value);
            return true;
        }
    }
    class BaseFillInputGetter {
        getFillInput() {
            const input = csutil.input.getActiveInput() || this.getPossibleNonActiveInput();
            if (input) {
                return new CSFillInputImpl(input);
            }
            return null;
        }
        static getInstance(type) {
            switch (type) {
                case CSFillValue.FIELD_TYPE.TEXT:
                    return new TextFillInputGetter();
                case CSFillValue.FIELD_TYPE.PASSWORD:
                    return new PasswordFillInputGetter();
                case CSFillValue.FIELD_TYPE.TOTP:
                    return new TotpFillInputGetter();
                default:
                    throw "INVALID_STATE";
            }
        }
    }
    class TextFillInputGetter extends BaseFillInputGetter {
        getPossibleNonActiveInput() {
            return csutil.input.getUsername({ visible: true, container: document.body, shadowRoot: false });
        }
    }
    class PasswordFillInputGetter extends BaseFillInputGetter {
        getPossibleNonActiveInput() {
            return csutil.input.getPassword({ visible: true, container: document.body, shadowRoot: false });
        }
    }
    class TotpFillInputGetter extends BaseFillInputGetter {
        getFillInput() {
            const totpFillInput = cs.totpLogin.getTotpCSFillInput();
            if (totpFillInput) {
                return totpFillInput;
            }
            return super.getFillInput();
        }
        getPossibleNonActiveInput() {
            return csutil.input.getUsername({ visible: true, container: document.body, shadowRoot: false }) ||
                csutil.input.getPassword({ visible: true, container: document.body, shadowRoot: false });
        }
    }

    class CSLogin {
        loginData = null;
        init() {
            this.restoreLogin();
        }
        async login(loginData) {
            try {
                const validContext = await contextChecker.isValidLoginContext(loginData);
                info(CSLogin.name, "valid login context?", window.location.href, validContext);
                if (!validContext) {
                    return;
                }
                const inputAppeared = await csutil.input.waitForVisibleInput({ shadowRoot: true });
                info(CSLogin.name, "visible input appeared?", inputAppeared);
                if (!inputAppeared) {
                    return;
                }
                await ztabStorage.save(TabStorageKeys.LOGIN_DATA, loginData);
                info(CSLogin.name, "login: ", js.log.mask(loginData, { keys: ["texts", "passwords"] }));
                if (loginData.step == LoginData.STEP.FILL_TOTP) {
                    cs.totpLogin.login(loginData);
                    return;
                }
                const loginContainer = csLoginContainer.getPageLoginContainer() || document.body;
                info(CSLogin.name, "login container: ", loginContainer);
                if (loginContainer) {
                    await this.loginFn(loginContainer, loginData);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async frameLogin(loginData) {
            try {
                const validContext = await contextChecker.isValidFrameLoginContext(loginData);
                info(CSLogin.name, "valid frame login container?", validContext);
                if (!validContext) {
                    return;
                }
                const activeInput = csutil.input.getActiveInput() ||
                    csutil.input.getPassword({ visible: true, container: document.body, shadowRoot: true }) ||
                    csutil.input.getUsername({ visible: true, container: document.body, shadowRoot: true });
                info(CSLogin.name, "active input: ", activeInput);
                if (!activeInput) {
                    return;
                }
                if (loginData.hasTotp && exp_loginUtil.isTotpInput(activeInput)) {
                    const totpFillInput = cs.totpLogin.getTotpCSFillInput();
                    if (totpFillInput) {
                        info(CSLogin.name, "totp fill input", totpFillInput);
                        await cs.totpLogin.totpFrameLogin(totpFillInput, loginData);
                    }
                    return;
                }
                await ztabStorage.save(TabStorageKeys.LOGIN_DATA, loginData);
                const loginContainer = csLoginContainer.getInputLoginContainer(activeInput) || document.body;
                info(CSLogin.name, "login container: ", loginContainer);
                if (loginContainer) {
                    await this.loginFn(loginContainer, loginData);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getActiveInputLoginType() {
            try {
                const activeInput = csutil.input.getActiveInput();
                if (!activeInput) {
                    return "text";
                }
                if (csutil.input.typeOf(activeInput) == "password") {
                    return "password";
                }
                if (exp_loginUtil.isTotpInput(activeInput)) {
                    return "totp";
                }
                return "text";
            }
            catch (e) {
                logError(e);
                return "text";
            }
        }
        hasValidLoginField() {
            try {
                const hasPassword = Boolean(csutil.input.getPassword({ visible: true, shadowRoot: true }));
                if (hasPassword) {
                    return true;
                }
                const hasUsername = Boolean(csutil.input.getUsername({ visible: true, shadowRoot: true }));
                if (hasUsername) {
                    return true;
                }
                const totpInput = Boolean(cs.totpLogin.getTotpCSFillInput());
                if (totpInput) {
                    return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async loginFn(container, loginData) {
            try {
                info(CSLogin.name, "login fn - login data: ", js.log.mask(loginData, { keys: ["texts", "passwords"] }));
                this.loginData = loginData;
                let passwordFilled = false;
                const inputs = csutil.selector.selectAll("input", { container, visible: true, shadowRoot: true });
                let textI = 0;
                let passwordI = 0;
                let hasCaptcha = false;
                let unfilledInput = null;
                let oneClickChecksOk = false;
                const textInputs = [];
                const texts = [];
                const allowNumberLogin = exp_loginUtil.isNumberLoginAllowed(container);
                let validInput = false;
                let lastValidInput = null;
                for (let input of inputs) {
                    if (input.type == "text" && csutil.input.isCaptcha(input)) {
                        if (input.value == "") {
                            hasCaptcha = true;
                            unfilledInput = input;
                        }
                        continue;
                    }
                    validInput = allowNumberLogin ? csutil.input.isValidTextPasswordNumber(input) : csutil.input.isValidTextPassword(input);
                    if (!validInput) {
                        continue;
                    }
                    switch (csutil.input.typeOf(input)) {
                        case "tel":
                        case "number":
                            if (!allowNumberLogin) {
                                continue;
                            }
                        case "text":
                        case "email":
                            textInputs.push(input);
                            if (textI == loginData.texts.length) {
                                continue;
                            }
                            texts.push(loginData.texts[textI++]);
                            await this.filledUsername();
                            lastValidInput = input;
                            break;
                        case "password":
                            passwordFilled = true;
                            await this.fillTextInputs(textInputs, texts);
                            if (passwordI == loginData.passwords.length) {
                                if (unfilledInput == null && input.value == "") {
                                    unfilledInput = input;
                                }
                                continue;
                            }
                            oneClickChecksOk = await this.checkOneClickLoginChecks(loginData);
                            if (!oneClickChecksOk) {
                                info(CSLogin.name, "failed one click checks");
                                await this.finishLogin();
                                return;
                            }
                            await this.goingToFillPassword(input, passwordI);
                            await userAction.userFill(input, loginData.passwords[passwordI]);
                            exp_loginUtil.setFilledPassword(input);
                            await this.filledPassword();
                            lastValidInput = input;
                            passwordI++;
                            break;
                    }
                }
                await this.fillTextInputs(textInputs, texts);
                if (!unfilledInput && textInputs.length > 0) {
                    for (let i = 0; i < textInputs.length; i++) {
                        if (textInputs[i].value == "") {
                            unfilledInput = textInputs[i];
                            break;
                        }
                    }
                }
                if (unfilledInput) {
                    unfilledInput.focus();
                }
                const filled = Boolean(lastValidInput);
                if (loginData.submit && !hasCaptcha && !unfilledInput && !csutil.dom.hasCaptchaFrame(container, lastValidInput) && filled) {
                    csLoginSubmitter.submit(container, lastValidInput);
                }
                if (!passwordFilled) {
                    this.fillPasswordOnAppear(loginData);
                }
                if (loginData.hasTotp) {
                    cs.totpLogin.fillTotpOnApper(loginData);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async fillTextInputs(inputs, texts) {
            const inputStart = inputs.length - texts.length;
            let curInput = null;
            for (let i = 0; i < texts.length; i++) {
                curInput = inputs[inputStart + i];
                await userAction.userFill(curInput, texts[i]);
                exp_loginUtil.setFilledText(curInput);
            }
            inputs.splice(inputStart, texts.length);
            texts.length = 0;
        }
        async fillPasswordOnAppear(loginData) {
            try {
                info(CSLogin.name, "filling password on appear");
                let reqPasswordElem = null;
                for (let _ of js.loop.range(15)) {
                    try {
                        reqPasswordElem = csutil.input.getPassword({ visible: true, container: document.body, shadowRoot: true });
                        if (reqPasswordElem) {
                            break;
                        }
                    }
                    catch (e) {
                        logError(e);
                    }
                    await js.time.delay(1);
                }
                if (!reqPasswordElem) {
                    return;
                }
                if (!await this.checkOneClickLoginChecks(loginData)) {
                    await this.finishLogin();
                    return;
                }
                await this.goingToFillPassword(reqPasswordElem, 0);
                await userAction.userFill(reqPasswordElem, loginData.passwords[0]);
                exp_loginUtil.setFilledPassword(reqPasswordElem);
                await this.filledPassword();
                if (loginData.submit) {
                    csLoginSubmitter.submitInputParent(reqPasswordElem);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async filledUsername() {
            try {
                this.loginData.step = LoginData.STEP.FILL_PASSWORD;
                await ztabStorage.save(TabStorageKeys.LOGIN_DATA, this.loginData);
                info(CSLogin.name, "tab storage - login data", this.loginData);
            }
            catch (e) {
                logError(e);
            }
        }
        async goingToFillPassword(passwordInput, passwordIndex) {
            try {
                await cs.savePasswordHandler.disableSave();
                if (Secret.hasEditPermission(this.loginData.shareLevel)) {
                    await cs.loginPasswordChangeHandler.checkPasswordChange(this.loginData.secretId, passwordInput, this.loginData.passwordFieldNames[passwordIndex]);
                }
                if (!Secret.hasViewPermission(this.loginData.shareLevel)) {
                    passwordInput.type = InputType.PASSWORD;
                    exp_passwordViewPreventer.filledPassword(this.loginData.passwords[passwordIndex]);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async checkOneClickLoginChecks(loginData) {
            try {
                if (Secret.hasViewPermission(loginData.shareLevel)) {
                    return true;
                }
                const isPasswordChangePage = await this.checkOneClickPasswordChange();
                if (isPasswordChangePage) {
                    info(CSLogin.name, "in password change page");
                    bgApi.tab.showAlert({ message: i18n(VI18N.ONE_CLICK_PASSWORD_CHANGE_PREVENTED_POPUP) });
                    return false;
                }
                const isDevToolsOpen = await bgApi.tab.checkDevToolsOpen();
                if (isDevToolsOpen) {
                    info(CSLogin.name, "dev tools open");
                    bgApi.tab.showAlert({ message: i18n(VI18N.CLOSE_DEV_TOOLS_ONE_CLICK_LOGIN) });
                    return false;
                }
                return true;
            }
            catch (e) {
                logError(e);
                return true;
            }
        }
        async filledPassword() {
            try {
                if (!this.loginData.hasTotp && this.loginData.oneauthId == "") {
                    await this.finishLogin();
                    return;
                }
                this.loginData.step = LoginData.STEP.FILL_TOTP;
                await ztabStorage.save(TabStorageKeys.LOGIN_DATA, this.loginData);
                info(CSLogin.name, "tab storage - login data", this.loginData);
            }
            catch (e) {
                logError(e);
            }
        }
        async finishLogin() {
            try {
                info(CSLogin.name, "login finished");
                await ztabStorage.remove(TabStorageKeys.LOGIN_DATA);
            }
            catch (e) {
                logError(e);
            }
        }
        async restoreLogin() {
            const loginData = await ztabStorage.load(TabStorageKeys.LOGIN_DATA, null);
            if (!loginData) {
                return;
            }
            const validContext = (await contextChecker.isValidTabLoginContext(loginData)) &&
                (loginData.redirectedCount < LoginData.MAX_REDIRECT_COUNT);
            info(CSLogin.name, "restore login - valid context?", validContext);
            if (!validContext) {
                await this.finishLogin();
                return;
            }
            if (loginData.step == LoginData.STEP.FILL_PASSWORD) {
                loginData.texts = [];
            }
            if (csutil.window.isTopFrame()) {
                loginData.redirectedCount++;
                await ztabStorage.save(TabStorageKeys.LOGIN_DATA, loginData);
            }
            this.login(loginData);
        }
        async checkOneClickPasswordChange() {
            try {
                const TRUE = "true";
                const setting = await zlocalStorage.load(LocalStorageKeys.ONE_CLICK_PASS_CHANGE_CHECK, TRUE);
                if (setting != TRUE) {
                    return false;
                }
                return csutil.page.isPasswordChangePage();
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    const ZVaultUtil = {
        cardPattern: {
            number: new RegExp(/.*(card|cc|acct|account).?(number|no|num)|card.?#|card.?no|cc.?num|acct.?num|nummer|credito|numero|número|numéro|カード番号|Номер.*карты|信用卡号|信用卡号码|信用卡卡號|카드/, 'i'),
            name: new RegExp(/.*(card|account|cc).?(holder|name|owner)|name.*\\bon\\b.*card|cc.?name|cc.?full.?name|owner|karteninhaber|nombre.*tarjeta|nom.*carte|nome.*cart|名前|Имя.*карты|信用卡开户名|开户名|持卡人姓名|持卡人姓名/, 'i'),
            month: new RegExp(/.*(cc|card|account|acc|exp.*).?(month|mon|mm)|month/, 'i'),
            year: new RegExp(/.*(cc|card|account|acc|exp.*).?(year|yyyy|yy)|year/, 'i'),
            cvvOrcid: new RegExp(/verification|card identification|security code|cvn|cvv|cvc|csc/, 'i'),
            label: new RegExp(/.*(card|account|cc).?(label|alias)/, 'i'),
            expiryCommon: new RegExp(/.*(expir|exp.*date|gueltig|gültig|fecha|date.*exp|scadenza|有効期限|validade|Срок действия карты)/, 'i'),
            cancelButton: new RegExp(/.*(cancel|later|skip|not.?now|back)/, 'i')
        },
        category: {
            card: "Payment Card"
        },
        isHostNameMatched: function (secretUrl, frameUrl) {
            try {
                if (!js.url.isAllValid(secretUrl, frameUrl)) {
                    return false;
                }
                return js.url.getHostName(secretUrl) == js.url.getHostName(frameUrl);
            }
            catch (e) {
                logError(e);
                return false;
            }
        },
        isParentDomainMatched: function (secretUrl, frameUrl) {
            try {
                if (!js.url.isAllValid(secretUrl, frameUrl)) {
                    return false;
                }
                return js.url.getParentDomain(secretUrl) == js.url.getParentDomain(frameUrl);
            }
            catch (e) {
                logError(e);
                return false;
            }
        },
        isValid: function (data) {
            return typeof data !== "undefined" && data !== null;
        },
        sendMessage: function (tabId, action, data = undefined, callBack) {
            data = (typeof data !== "undefined") ? data : {};
            callBack = (typeof callBack !== "undefined") ? callBack : function () {
                chrome.runtime.lastError;
            };
            if (typeof tabId !== "undefined" && tabId !== null && tabId !== -1) {
                chrome.tabs.sendMessage(tabId, {
                    "action": action,
                    "data": data,
                    popup: false
                }, callBack);
                return;
            }
            chrome.runtime.sendMessage({
                "action": action,
                "data": data,
                popup: true
            }, callBack);
        },
        extractCardMonth(validThru) {
            if (validThru == "") {
                return 0;
            }
            validThru = validThru.split("/");
            return validThru.length > 0 ? ZVaultUtil.getValidMonth(validThru[0]) : 0;
        },
        extractCardYear(validThru) {
            if (validThru == "") {
                return 0;
            }
            validThru = validThru.split("/");
            return validThru.length > 1 ? ZVaultUtil.getValidYear(validThru[1]) : 0;
        },
        getValidMonth(num) {
            if (isNaN(num)) {
                return 0;
            }
            num = parseInt(num);
            if (num > 0 && num <= 12) {
                return num < 10 ? "0" + num : num;
            }
            return 0;
        },
        getValidYear(num) {
            if (isNaN(num)) {
                return 0;
            }
            if (num <= 0) {
                return 0;
            }
            num = num.toString().trim();
            if (num.length == 2) {
                return "20" + num;
            }
            if (num.length == 4 && num[0] == "2") {
                return num;
            }
            return 0;
        },
        getValidThru(month, year) {
            month = ZVaultUtil.getValidMonth(month);
            month = month == 0 ? "mm" : month;
            year = ZVaultUtil.getValidYear(year);
            year = year == 0 ? "yyyy" : year;
            if (month == "mm" && year == "yyyy") {
                return "";
            }
            return month + " / " + year;
        },
        formatValidThru(validThru) {
            var month = ZVaultUtil.extractCardMonth(validThru);
            var year = ZVaultUtil.extractCardYear(validThru);
            return ZVaultUtil.getValidThru(month, year);
        },
        secretDomainMatches: (savedUrls, topUrl) => {
            for (let url of savedUrls) {
                if (ZVaultUtil.isParentDomainMatched(url, topUrl)) {
                    return true;
                }
            }
            return false;
        },
        async domainMatchedForPlayback(savedUrls) {
            return ZVaultUtil.secretDomainMatches(savedUrls, window.location.href);
        }
    };

    class ZVLoginSelector {
        getElement(encodedSelector) {
            try {
                const selector = atob(encodedSelector);
                if (selector.startsWith("{")) {
                    return csutil.uniqSelector.select(JSON.parse(selector));
                }
                const [elemSelector, indexString = "0"] = this.getTokens(selector);
                const index = parseInt(indexString);
                return document.querySelectorAll(elemSelector)[index];
            }
            catch (e) {
                logError(e);
                return document.querySelector(atob(encodedSelector));
            }
        }
        getElements(encodedSelector) {
            try {
                const selector = atob(encodedSelector);
                const [elemSelector, ...indexesString] = this.getTokens(selector);
                const indexes = indexesString.map(x => parseInt(x));
                const allElements = document.querySelectorAll(elemSelector);
                if (allElements.length == 0) {
                    return null;
                }
                const reqElements = indexes.map(x => allElements[x]);
                return reqElements;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getTokens(selector) {
            const separator = selector.includes(":") ? ":" : ",";
            return selector.split(separator);
        }
    }
    const loginContext = {
        selector: new ZVLoginSelector()
    };
    const ZVaultLogin = {
        one_click_login: false,
        has_view_permission: false,
        in_login: false,
        fillPref: {
            activeElement: null
        },
        vaultIconClick: {},
        callbackTimer: null,
        getSecretTypeUniqueFields: function (fields) {
            var count = { "text": 0, "password": 0 };
            for (let indx in fields) {
                if (!fields[indx].isDeleted) {
                    if (fields[indx].type === "text") {
                        count.text += 1;
                    }
                    else if (fields[indx].type === "password") {
                        count.password += 1;
                    }
                }
            }
            return count;
        },
        isVisibleElement: function (element) {
            var offSetCheck = (element.offsetWidth > 0 || element.offsetHeight > 0) ? true : false;
            var isVisible = !($(element).is(':hidden')) && element.style.display !== "none";
            var rect = element.getBoundingClientRect();
            return (offSetCheck || isVisible) && (($(element).css("visibility")).toLowerCase() !== "hidden") && (rect.top >= 0 && rect.left >= 0);
        },
        isUserNameField: function (type) {
            if (type === "email" || type === "text") {
                return true;
            }
            return false;
        },
        isTelField: function (type) {
            if (type === "tel" || type === "number") {
                return true;
            }
            return false;
        },
        fillSecretOnFormsInPage_new: function (secretdata, secTypeFields, actionTrigger, allForms) {
            var secTypeFieldCount = ZVaultLogin.getSecretTypeUniqueFields(secTypeFields);
            var forms = Array.prototype.slice.call(document.forms);
            var shadowFroms = ZVaultLogin.getShadowRootForms();
            if (shadowFroms.length > 0) {
                forms = forms.concat(shadowFroms);
            }
            var loginForms = [];
            var secondPriorityForms = [];
            var thirdPriorityForms = [];
            var secretForm = false;
            for (var i = 0; i < forms.length; i++) {
                if (!ZVaultLogin.isVisibleElement(forms[i])) {
                    continue;
                }
                var fields = forms[i].elements;
                var text = 0;
                var secret = 0;
                for (var j = 0; j < fields.length; j++) {
                    if (ZVaultLogin.isVisibleElement(fields[j]) && (ZVaultLogin.isUserNameField(fields[j].type) || ZVaultLogin.isTelField(fields[j].type))) {
                        if (fields[j].value != undefined && fields[j].value.toLowerCase() === "password") {
                            secret++;
                            continue;
                        }
                        text++;
                    }
                    else if (ZVaultLogin.isVisibleElement(fields[j]) && fields[j].type === "password") {
                        secret++;
                    }
                }
                if ((text <= secTypeFieldCount.text && text >= 1) && secret === 1) {
                    secretForm = true;
                    loginForms.push(forms[i]);
                }
                else if ((secTypeFieldCount.text === text) && (secTypeFieldCount.password === secret) && (secTypeFieldCount.password <= 2) && (secTypeFieldCount.password > 0) && (text === 0)) {
                    secondPriorityForms.push(forms[i]);
                }
                else if (text === 0 && secret === 1) {
                    thirdPriorityForms.push(forms[i]);
                }
            }
            if (loginForms.length === 1) {
                ZVaultLogin.autoFillInForm(loginForms[0], secretdata, secTypeFields, actionTrigger);
                return false;
            }
            else if (loginForms.length > 1) {
                for (var i = 0; i < loginForms.length; i++) {
                    ZVaultLogin.autoFillInForm(loginForms[i], secretdata, secTypeFields, actionTrigger);
                }
                return false;
            }
            if (ZVaultUtil.isValid(allForms) && allForms === true) {
                if (secretForm === false) {
                    if (secondPriorityForms.length > 0) {
                        for (var k = 0; k < secondPriorityForms.length; k++) {
                            var fields = secondPriorityForms[k].elements;
                            var fieldlength = fields.length;
                            for (var i = 0; i < fieldlength; i++) {
                                if (fields[i].type === "password" && ZVaultLogin.isVisibleElement(fields[i])) {
                                    passFieldIndx = i;
                                    var elemIdx = i;
                                    for (let idx in secTypeFields) {
                                        var secFeilds = secTypeFields[idx];
                                        if (!secFeilds.isDeleted && secFeilds.type === "password") {
                                            ZVaultLogin.setValueOnSecretField(fields[elemIdx], secretdata[secFeilds.name]);
                                        }
                                        elemIdx++;
                                    }
                                    var actionbtn = null;
                                    var loginregex = /^(log in|sign in|login|logon|signin|login!|connect)$/i;
                                    for (var ii = passFieldIndx; ii < fieldlength; ii++) {
                                        var element = fields[ii];
                                        if (element.type === "submit" && ZVaultLogin.isVisibleElement(element) && (loginregex.test(element.value) || loginregex.test(element.innerText.trim()))) {
                                            actionbtn = element;
                                            break;
                                        }
                                    }
                                    if (actionTrigger === true && actionbtn != null) {
                                        actionbtn.click();
                                    }
                                    secretForm = true;
                                    break;
                                }
                            }
                        }
                    }
                    else if (thirdPriorityForms.length > 0) {
                        for (var k = 0; k < thirdPriorityForms.length; k++) {
                            var fields = thirdPriorityForms[k].elements;
                            var fieldlength = fields.length;
                            for (var i = 0; i < fieldlength; i++) {
                                if (fields[i].type === "password" && ZVaultLogin.isVisibleElement(fields[i])) {
                                    passFieldIndx = i;
                                    for (let idx in secTypeFields) {
                                        var secFeilds = secTypeFields[idx];
                                        if (!secFeilds.isDeleted && secFeilds.type === "password") {
                                            ZVaultLogin.setValueOnSecretField(fields[i], secretdata[secFeilds.name]);
                                            break;
                                        }
                                    }
                                    var actionbtn = null;
                                    var loginregex = /^(log in|sign in|login|logon|signin|login!|connect)$/i;
                                    for (var ii = passFieldIndx; ii < fieldlength; ii++) {
                                        var element = fields[ii];
                                        if (element.type === "submit" && ZVaultLogin.isVisibleElement(element) && (loginregex.test(element.value) || loginregex.test(element.innerText.trim()))) {
                                            actionbtn = element;
                                            break;
                                        }
                                    }
                                    if (actionTrigger === true && actionbtn != null) {
                                        actionbtn.click();
                                    }
                                    secretForm = true;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (secretForm === false) {
                    var secTypeIndx;
                    var passSecIndx;
                    var docTextField = 0;
                    var passFieldIndx = 0;
                    var fields = document.getElementsByTagName("input");
                    var isPasswordFieldPres = false;
                    for (var i = 0; i < fields.length; i++) {
                        if (fields[i].type === "password" && ZVaultLogin.isVisibleElement(fields[i])) {
                            isPasswordFieldPres = true;
                            var j = i;
                            j--;
                            passFieldIndx = i;
                            for (let indx in secTypeFields) {
                                secTypeIndx = indx;
                                if (!secTypeFields[secTypeIndx].isDeleted && secTypeFields[secTypeIndx].type === "password") {
                                    passSecIndx = secTypeIndx;
                                    break;
                                }
                            }
                            while (j >= 0 && secTypeFieldCount.text > docTextField) {
                                if (ZVaultLogin.isVisibleElement(fields[j]) && (ZVaultLogin.isUserNameField(fields[j].type) || ZVaultLogin.isTelField(fields[j].type))) {
                                    docTextField += 1;
                                    var validFields;
                                    do {
                                        secTypeIndx--;
                                        validFields = secTypeFields[secTypeIndx];
                                        if (validFields === undefined) {
                                            break;
                                        }
                                    } while (secTypeIndx > 0 && validFields.isDeleted);
                                    if (validFields !== undefined) {
                                        ZVaultLogin.setValueOnSecretField(fields[j], secretdata[validFields.name]);
                                    }
                                }
                                j--;
                            }
                            if (docTextField > 0) {
                                ZVaultLogin.setValueOnSecretField(fields[i], secretdata[secTypeFields[passSecIndx].name]);
                                secretForm = true;
                                break;
                            }
                        }
                    }
                    var submitBtn = false;
                    var passwordEle = null;
                    if (secretForm && ZVaultUtil.isValid(passSecIndx)) {
                        var fields = document.getElementsByTagName("input");
                        passwordEle = fields[passFieldIndx];
                        var actionbtn = null;
                        var loginregex = /^(log in|sign in|login|logon|signin|login!|connect)$/i;
                        for (var i = passFieldIndx + 1; i <= passFieldIndx + 3; i++) {
                            var element = fields[i];
                            if (element !== undefined && (element.type === "submit" || element.type === "button") && ZVaultLogin.isVisibleElement(element) && (loginregex.test(element.value) || loginregex.test(element.innerText.trim()))) {
                                actionbtn = element;
                                break;
                            }
                        }
                        if (actionTrigger === true && actionbtn != null) {
                            actionbtn.disabled = false;
                            submitBtn = true;
                            actionbtn.click();
                        }
                    }
                    if (secretForm && ZVaultUtil.isValid(passSecIndx) && !submitBtn && ZVaultUtil.isValid(passwordEle)) {
                        var fields = document.body.getElementsByTagName("*");
                        var actionbtn = null;
                        var loginregex = /^(log in|sign in|login|logon|signin|login!|connect)$/i;
                        for (var i = 0; i < fields.length; i++) {
                            var element = fields[i];
                            if (ZVaultLogin.isVisibleElement(element) && (loginregex.test(element.title) || loginregex.test(element.value) || loginregex.test(element.innerText.trim()))) {
                                var j = i;
                                j--;
                                for (j; j >= 0; j--) {
                                    if (fields[j].type === "password" && ZVaultLogin.isVisibleElement(fields[j]) && passwordEle === fields[j]) {
                                        actionbtn = element;
                                        break;
                                    }
                                }
                            }
                            if (actionbtn != null) {
                                var child = actionbtn.getElementsByTagName("*");
                                if (child.length > 0) {
                                    for (var k = 0; k < child.length; k++) {
                                        if (ZVaultLogin.isVisibleElement(child[k]) && (loginregex.test(child[k].value) || loginregex.test(child[k].innerText.trim()))) {
                                            actionbtn = child[k];
                                        }
                                    }
                                }
                                break;
                            }
                        }
                        if (actionTrigger === true && actionbtn != null) {
                            actionbtn.click();
                        }
                    }
                    if (isPasswordFieldPres === false) {
                        var secTypeIndx;
                        var passSecIndx;
                        var docTextField = 0;
                        for (var i = 0; i < fields.length; i++) {
                            if (fields[i].type === "password") {
                                var j = i;
                                j--;
                                for (let indx in secTypeFields) {
                                    secTypeIndx = indx;
                                    if (!secTypeFields[secTypeIndx].isDeleted && secTypeFields[secTypeIndx].type === "password") {
                                        passSecIndx = secTypeIndx;
                                        break;
                                    }
                                }
                                var usernameFieldCount = 0;
                                while (j >= 0 && secTypeFieldCount.text > docTextField) {
                                    if (ZVaultLogin.isUserNameField(fields[j].type)) {
                                        usernameFieldCount += 1;
                                    }
                                    if (ZVaultLogin.isVisibleElement(fields[j]) && ZVaultLogin.isUserNameField(fields[j].type)) {
                                        docTextField += 1;
                                        var validFields;
                                        do {
                                            secTypeIndx--;
                                            validFields = secTypeFields[secTypeIndx];
                                        } while (secTypeIndx > 0 && validFields.isDeleted);
                                        ZVaultLogin.setValueOnSecretField(fields[j], secretdata[validFields.name]);
                                    }
                                    if (usernameFieldCount > secTypeFieldCount.text) {
                                        break;
                                    }
                                    j--;
                                }
                                if (docTextField > 0) {
                                    ZVaultLogin.setValueOnSecretField(fields[i], secretdata[secTypeFields[passSecIndx].name]);
                                    secretForm = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            return null;
        },
        fireEvent: function (element, event) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent(event, true, true);
            return !element.dispatchEvent(evt);
        },
        setValueOnSecretField: function (field, value) {
            if (field.value === field.defaultValue) {
                field.value = "";
            }
            try {
                if (ZVaultLogin.one_click_login && csutil.input.typeOf(field) == "password") {
                    exp_passwordViewPreventer.filledPassword(value);
                }
            }
            catch (e) {
                logError(e);
            }
            ZVaultLogin.fireEvent(field, "click");
            ZVaultLogin.fireEvent(field, "change");
            ZVaultLogin.fireEvent(field, "input");
            field.value = value;
            ZVaultLogin.fireEvent(field, "click");
            ZVaultLogin.fireEvent(field, "change");
            ZVaultLogin.fireEvent(field, "input");
            if (field.value != value) {
                field.value = value;
            }
        },
        autoFillInForm: function (formObj, secretdata, secTypefields, actionTrigger) {
            var secTypeIndx;
            var lform = formObj;
            var lf_fields = lform.elements;
            var passFieldIndx = 0;
            var isPasswordFieldPres = false;
            var matchLoginRegex = /log in|sign in|login|logon|signin|login!|connect/gi;
            var getMappedSecretDet = ZVaultLogin.checkFormFieldsMatchesSecretTypeFeilds(lf_fields, secTypefields);
            var secTypeFieldCount = ZVaultLogin.getSecretTypeUniqueFields(secTypefields);
            if (getMappedSecretDet.status) {
                var array = getMappedSecretDet.details;
                for (let idx in array) {
                    var element = array[idx].element;
                    var field = array[idx].field;
                    ZVaultLogin.setValueOnSecretField(element, secretdata[field.name]);
                }
                passFieldIndx = getMappedSecretDet.passFieldIndx;
            }
            else if (($(formObj).find('input[type="text"]').length === 1 || $(formObj).find('input[type="email"]').length === 1) && $(formObj).find('input[type="password"]').length === 1 && secTypeFieldCount.text === 1 && secTypeFieldCount.password === 1) {
                for (let indx in secTypefields) {
                    secTypeIndx = indx;
                    if (!secTypefields[secTypeIndx].isDeleted && secTypefields[secTypeIndx].type === "password") {
                        ZVaultLogin.setValueOnSecretField($(formObj).find('input[type="password"]')[0], secretdata[secTypefields[secTypeIndx].name]);
                    }
                    else if (!secTypefields[secTypeIndx].isDeleted && secTypefields[secTypeIndx].type === "text") {
                        if ($(formObj).find('input[type="text"]').length === 1) {
                            ZVaultLogin.setValueOnSecretField($(formObj).find('input[type="text"]')[0], secretdata[secTypefields[secTypeIndx].name]);
                        }
                        if ($(formObj).find('input[type="email"]').length === 1) {
                            ZVaultLogin.setValueOnSecretField($(formObj).find('input[type="email"]')[0], secretdata[secTypefields[secTypeIndx].name]);
                        }
                    }
                }
                elementLoop: for (var lf = 0; lf < lf_fields.length; lf++) {
                    var lfElem = lf_fields[lf];
                    if ((lfElem.type === "password" || (lfElem.value != undefined && lfElem.value.toLowerCase() === "password")) && ZVaultLogin.isVisibleElement(lfElem)) {
                        isPasswordFieldPres = true;
                        passFieldIndx = lf;
                        lf--;
                        break elementLoop;
                    }
                }
            }
            else if ((secTypeFieldCount.password === $(formObj).find('input[type="password"]').length) && ((secTypeFieldCount.password <= 2) && (secTypeFieldCount.password > 0)) && (secTypeFieldCount.text === 0) && ($(formObj).find('input[type="text"], input[type="email"]').length === 0)) {
                var passFieldsInForm = $(formObj).find('input[type="password"]');
                var passFieldsIndex = 0;
                for (let indx in secTypefields) {
                    secTypeIndx = indx;
                    if ((!secTypefields[secTypeIndx].isDeleted && secTypefields[secTypeIndx].type === "password") && (passFieldsIndex < passFieldsInForm.length)) {
                        ZVaultLogin.setValueOnSecretField(passFieldsInForm[passFieldsIndex], secretdata[secTypefields[secTypeIndx].name]);
                    }
                    passFieldsIndex++;
                }
                elementLoop: for (var lf = 0; lf < lf_fields.length; lf++) {
                    var lfElem = lf_fields[lf];
                    if ((lfElem.type === "password" || (lfElem.value != undefined && lfElem.value.toLowerCase() === "password")) && ZVaultLogin.isVisibleElement(lfElem)) {
                        isPasswordFieldPres = true;
                        passFieldIndx = lf;
                        lf--;
                        break elementLoop;
                    }
                }
            }
            else {
                elementLoop: for (var lf = 0; lf < lf_fields.length; lf++) {
                    var lfElem = lf_fields[lf];
                    if ((lfElem.type === "password" || (lfElem.value != undefined && lfElem.value.toLowerCase() === "password")) && ZVaultLogin.isVisibleElement(lfElem)) {
                        isPasswordFieldPres = true;
                        for (let indx in secTypefields) {
                            secTypeIndx = indx;
                            if (!secTypefields[secTypeIndx].isDeleted && secTypefields[secTypeIndx].type === "password") {
                                ZVaultLogin.setValueOnSecretField(lfElem, secretdata[secTypefields[secTypeIndx].name]);
                                secTypeIndx--;
                                passFieldIndx = lf;
                                lf--;
                                break elementLoop;
                            }
                        }
                        lf--;
                        break;
                    }
                }
                if (isPasswordFieldPres === false) {
                    var passFieldIndx = 0;
                    elementLoop1: for (var lf = 0; lf < lf_fields.length; lf++) {
                        var lfElem = lf_fields[lf];
                        if ((lfElem.type === "password" || (lfElem.value != undefined && lfElem.value.toLowerCase() === "password"))) {
                            for (let indx in secTypefields) {
                                secTypeIndx = indx;
                                if (!secTypefields[secTypeIndx].isDeleted && secTypefields[secTypeIndx].type === "password") {
                                    ZVaultLogin.setValueOnSecretField(lfElem, secretdata[secTypefields[secTypeIndx].name]);
                                    secTypeIndx--;
                                    passFieldIndx = lf;
                                    lf--;
                                    break elementLoop1;
                                }
                            }
                            lf--;
                            break;
                        }
                    }
                }
                try {
                    var traverseBelowPass = lf;
                    traverseBelowPass += 2;
                    var traverseSecTypeBelow = secTypeIndx;
                    traverseSecTypeBelow += 2;
                    while (traverseBelowPass < lf_fields.length) {
                        if (ZVaultLogin.isVisibleElement(lf_fields[traverseBelowPass]) && ZVaultLogin.isUserNameField(lf_fields[traverseBelowPass].type)) {
                            loopType1: while (traverseSecTypeBelow < secTypefields.length) {
                                if (secTypefields[traverseSecTypeBelow].type === "text" && !secTypefields[traverseSecTypeBelow].isDeleted) {
                                    ZVaultLogin.setValueOnSecretField(lf_fields[traverseBelowPass], secretdata[secTypefields[traverseSecTypeBelow].name]);
                                    traverseSecTypeBelow++;
                                    break loopType1;
                                }
                                traverseSecTypeBelow++;
                            }
                        }
                        traverseBelowPass++;
                    }
                }
                catch (er) { }
                while (lf >= 0) {
                    if (ZVaultLogin.isVisibleElement(lf_fields[lf]) && ZVaultLogin.isUserNameField(lf_fields[lf].type)) {
                        loopType: while (secTypeIndx > -1) {
                            if (secTypefields[secTypeIndx].type === "text" && !secTypefields[secTypeIndx].isDeleted) {
                                ZVaultLogin.setValueOnSecretField(lf_fields[lf], secretdata[secTypefields[secTypeIndx].name]);
                                secTypeIndx--;
                                break loopType;
                            }
                            secTypeIndx--;
                        }
                    }
                    lf--;
                }
            }
            var submitBtn = false;
            var passwordEle = lf_fields[passFieldIndx];
            var actionbtn = null;
            var loginregex = /^(log in|sign in|login|signin|logon|login!|connect|continue)$/i;
            for (var i = passFieldIndx; i < lf_fields.length; i++) {
                var element = lf_fields[i];
                if (element.type === "submit" && ZVaultLogin.isVisibleElement(element)) {
                    actionbtn = element;
                    submitBtn = true;
                    break;
                }
                else if (element.type === "submit") {
                    if (ZVaultUtil.isValid(element.nextSibling)) {
                        if (ZVaultUtil.isValid(element.nextSibling.innerText) && loginregex.test(element.nextSibling.innerText.trim())) {
                            actionbtn = element;
                            submitBtn = true;
                        }
                    }
                    if (ZVaultUtil.isValid(element.previousSibling) && actionbtn === null) {
                        if (ZVaultUtil.isValid(element.previousSibling.innerText) && loginregex.test(element.previousSibling.innerText.trim())) {
                            actionbtn = element;
                            submitBtn = true;
                        }
                    }
                    if (actionbtn === null && ZVaultUtil.isValid(element.value) && (element.value.toLowerCase().match(matchLoginRegex) || element.innerText.trim().toLowerCase().match(matchLoginRegex))) {
                        actionbtn = element;
                        submitBtn = true;
                    }
                }
            }
            if (actionTrigger === true && actionbtn != null) {
                if (document.readyState === "complete") {
                    actionbtn.click();
                }
                else {
                    var time = 0;
                    if (ZVaultLogin.callbackTimer !== null) {
                        clearInterval(ZVaultLogin.callbackTimer);
                    }
                    ZVaultLogin.callbackTimer = window.setInterval(function () {
                        if (time > 3 || document.readyState === "complete") {
                            actionbtn.click();
                            clearInterval(ZVaultLogin.callbackTimer);
                        }
                        time = time + 1;
                    }, 1000);
                }
            }
            if (!submitBtn && ZVaultUtil.isValid(passwordEle)) {
                var fields = document.body.getElementsByTagName("*");
                var actionbtn = null;
                var loginregex = /^(log in|sign in|login|signin|logon|login!|connect|continue)$/i;
                for (var i = 0; i < fields.length; i++) {
                    var element = fields[i];
                    if (ZVaultLogin.isVisibleElement(element) && ((element.value != undefined && loginregex.test(element.value)) || (element.innerText != undefined && loginregex.test(element.innerText.trim())))) {
                        var j = i;
                        j--;
                        for (j; j >= 0; j--) {
                            if (fields[j].type === "password" && ZVaultLogin.isVisibleElement(fields[j]) && passwordEle === fields[j]) {
                                actionbtn = element;
                                break;
                            }
                        }
                    }
                    if (actionbtn != null) {
                        var child = actionbtn.getElementsByTagName("*");
                        if (child.length > 0) {
                            for (var k = 0; k < child.length; k++) {
                                if (ZVaultLogin.isVisibleElement(child[k]) && (loginregex.test(child[k].value) || loginregex.test(child[k].innerText.trim()))) {
                                    actionbtn = child[k];
                                }
                            }
                        }
                        break;
                    }
                }
                if (actionTrigger === true && actionbtn != null) {
                    actionbtn.click();
                }
            }
            return false;
        },
        checkFormFieldsMatchesSecretTypeFeilds: function (formFields, secTypefields) {
            var respObj = {};
            try {
                var text = 0;
                var password = 0;
                var formElements = [];
                var array = [];
                var passIndx = 0;
                for (var i = 0; i < formFields.length; i++) {
                    var element = formFields[i];
                    if (ZVaultLogin.isVisibleElement(element) && (element.type === "password" || (element.value != undefined && element.value.toLowerCase() === "password"))) {
                        element.click();
                    }
                }
                for (var i = 0; i < formFields.length; i++) {
                    var element = formFields[i];
                    if (ZVaultLogin.isVisibleElement(element) && (element.type === "password" || (element.value != undefined && element.value.toLowerCase() === "password"))) {
                        password += 1;
                        passIndx = i;
                        formElements.push(element);
                    }
                    else if ((ZVaultLogin.isUserNameField(element.type) || ZVaultLogin.isTelField(element.type)) && ZVaultLogin.isVisibleElement(element)) {
                        text += 1;
                        formElements.push(element);
                    }
                }
                var secTypeFieldCount = ZVaultLogin.getSecretTypeUniqueFields(secTypefields);
                var count = 0;
                if (text !== 0 && password !== 0 && secTypeFieldCount.text === text && secTypeFieldCount.password === password) {
                    for (let idx in secTypefields) {
                        var secretFormFeildMap = {};
                        if (!secTypefields[idx].isDeleted) {
                            var formElement = formElements[count];
                            if (secTypefields[idx].type === "password") {
                                if (ZVaultLogin.isVisibleElement(formElement) && (formElement.type === "password" || (formElement.value != undefined && formElement.value.toLowerCase() === "password"))) {
                                    secretFormFeildMap.field = secTypefields[idx];
                                    secretFormFeildMap.element = formElement;
                                    array.push(secretFormFeildMap);
                                }
                            }
                            else if (secTypefields[idx].type === "text") {
                                if ((ZVaultLogin.isUserNameField(formElement.type) || ZVaultLogin.isTelField(formElement.type))) {
                                    secretFormFeildMap.field = secTypefields[idx];
                                    secretFormFeildMap.element = formElement;
                                    array.push(secretFormFeildMap);
                                }
                            }
                            count += 1;
                        }
                    }
                }
                if (array.length > 0 && array.length === (secTypeFieldCount.text + secTypeFieldCount.password)) {
                    respObj.status = true;
                    respObj.details = array;
                    respObj.passFieldIndx = passIndx;
                }
                else {
                    respObj.status = false;
                }
            }
            catch (er) {
                respObj.status = false;
            }
            return respObj;
        },
        getShadowRootForms: () => {
            var all = document.getElementsByTagName("*");
            var formArray = [];
            for (var i = 0, max = all.length; i < max; i++) {
                if (all[i].shadowRoot != null) {
                    var shadowForms = all[i].shadowRoot.querySelectorAll('form');
                    if (shadowForms.length > 0) {
                        shadowForms = Array.prototype.slice.call(shadowForms);
                        formArray = formArray.concat(shadowForms);
                    }
                }
            }
            return formArray;
        }
    };
    const ZVaultCS = {
        vaultIconClick: {},
        contextMenuTag: null,
        frameLoaded: false,
        buttonClicked: false,
        msFrameTop: true,
        msFrameLeft: true,
        mutationCounter: 0,
        mutationLocked: false,
        mutationObserver: null,
        init: async function () {
            await ZVaultCS.waitForCompleteReadyState();
            chrome.runtime.onMessage.addListener(function (msg, sender) {
                ZVaultCS.processRequest(msg, sender);
                return false;
            });
            chrome.runtime.lastError;
            ZVaultCS.pageLoaded();
            document.addEventListener("contextmenu", function (e) {
                if ((e.target !== undefined) && (e.target.tagName !== undefined) && (e.target.tagName === "INPUT")) {
                    ZVaultCS.contextMenuTag = e.target;
                }
            });
        },
        pageLoaded: function () {
            ZVaultUtil.sendMessage(null, "contentScriptLoaded", { "frameurl": window.location.href });
            ZVaultUtil.sendMessage(null, "checkPlayback", { "url": window.location.href });
        },
        triggerEvent: function (el, type) {
            if ('createEvent' in document) {
                var e = document.createEvent('HTMLEvents');
                e.initEvent(type, false, true);
                el.dispatchEvent(e);
            }
            else {
                var e = document.createEventObject();
                e.eventType = type;
                el.fireEvent('on' + e.eventType, e);
            }
        },
        fireEvent: function (element, event) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent(event, true, true);
            return !element.dispatchEvent(evt);
        },
        setValueOnSecretField: function (field, value) {
            if (field.value === field.defaultValue) {
                field.value = "";
            }
            try {
                if (ZVaultLogin.one_click_login && csutil.input.typeOf(field) == "password") {
                    exp_passwordViewPreventer.filledPassword(value);
                }
            }
            catch (e) {
                logError(e);
            }
            ZVaultCS.fireEvent(field, "click");
            ZVaultCS.fireEvent(field, "change");
            ZVaultCS.fireEvent(field, "input");
            field.value = value;
            ZVaultCS.fireEvent(field, "click");
            ZVaultCS.fireEvent(field, "change");
            ZVaultCS.fireEvent(field, "input");
            if (field.value != value) {
                field.value = value;
            }
        },
        continuePlayback: function (data) {
            setTimeout(function () {
                ZVaultUtil.sendMessage(null, "continuePlayback", data);
            }, 1000);
        },
        repeatPlayback: function (data) {
            setTimeout(function () {
                ZVaultUtil.sendMessage(null, "repeatPlayback", data);
            }, 1000);
        },
        executePlaybackAction: function (data, step_data, selector) {
            if (selector == null) {
                if (step_data.type == "skip_username" || step_data.type == "skip_password" || step_data.type == "skip_click") {
                    data.step_no = data.step_no + 1;
                    ZVaultUtil.sendMessage(null, "continuePlayback", data);
                    return;
                }
                data.countdown = data.countdown + 1;
                if (data.countdown > 10) {
                    ZVaultUtil.sendMessage(null, "playbackFailure", data);
                    return;
                }
                ZVaultCS.repeatPlayback(data);
                return;
            }
            window.onbeforeunload = function () {
                ZVaultUtil.sendMessage(null, "reloading", data);
            };
            if (step_data.type == "click" || step_data.type == "skip_click") {
                data.step_no = data.step_no + 1;
                ZVaultCS.buttonClicked = true;
                ZVaultUtil.sendMessage(null, "continuePlayback", data);
                selector.click();
                return;
            }
            else if (step_data.type == "select") {
                selector.selected = 'selected';
            }
            else if (step_data.type == "username" || step_data.type == "password" || step_data.type == "skip_username" || step_data.type == "skip_password" || step_data.type == "username_direct" || step_data.type == "password_direct" || step_data.type == "skip_username_direct" || step_data.type == "skip_password_direct" || step_data.type.indexOf("column") != -1) {
                var type = "";
                if (step_data.type == "skip_username" || step_data.type == "username_direct" || step_data.type == "skip_username_direct") {
                    type = "username";
                }
                else if (step_data.type == "skip_password" || step_data.type == "password_direct" || step_data.type == "skip_password_direct") {
                    type = "password";
                }
                else {
                    type = step_data.type;
                }
                var data_to_fill = data.secretdata[type];
                if (data_to_fill == undefined) {
                    data_to_fill = ZVaultCS.getDataToFill(data, type);
                }
                try {
                    if (step_data.type == "username" || step_data.type == "password" || step_data.type == "skip_username" || step_data.type == "skip_password") {
                        ZVaultCS.setValueOnSecretField(selector, data_to_fill);
                    }
                    else {
                        selector.value = data_to_fill;
                    }
                }
                catch (e) {
                    ZVaultUtil.sendMessage(null, "playbackFailure", data);
                }
            }
            else {
                try {
                    ZVaultCS.triggerEvent(selector, step_data.type);
                }
                catch (e) {
                    ZVaultUtil.sendMessage(null, "playbackFailure", data);
                }
            }
            data.step_no = data.step_no + 1;
            ZVaultUtil.sendMessage(null, "continuePlayback", data);
        },
        getDataToFill(data, type) {
            type = type == "username" ? "text" : "password";
            var counter = data.filledData[type];
            var match_found = 0;
            var fields = data.fields;
            for (let field of fields) {
                if (field.type == type && counter == match_found) {
                    data.filledData[type] += 1;
                    return data.secretdata[field.name];
                }
                else if (field.type == type) {
                    match_found++;
                }
            }
        },
        login: (data) => {
            var state = document.readyState;
            if (state != "complete" && state != "interactive") {
                setTimeout(function () {
                    ZVaultCS.login(data);
                }, 1000);
                return;
            }
            var fill = true;
            if (document.location.protocol === 'http:' && data.insecure_page_prompt == "true") {
                fill = confirm('You are about to fill your password in an insecure page. Zoho Vault strictly recommends you against doing so unless you trust this website. Proceed with filling your password anyway?');
            }
            if (fill) {
                const actionTrigger = (data.submit && ZVaultUtil.secretDomainMatches(data.urls, window.location.href));
                ZVaultLogin.fillSecretOnFormsInPage_new(data.secretdata, data.fields, actionTrigger, true);
            }
        },
        isUserNameField: function (type) {
            if (type === "email" || type === "text") {
                return true;
            }
            return false;
        },
        waitForNSec(n) {
            return new Promise(resolve => setTimeout(resolve, n * 1000));
        },
        waitForCompleteReadyState: function () {
            return new Promise(function (resolve) {
                let checkReadyState = function () {
                    if (document.readyState != "complete") {
                        return;
                    }
                    resolve(true);
                };
                document.addEventListener("readystatechange", checkReadyState);
                checkReadyState();
            });
        },
        fillOneAuthTOTP: async function (data, selector) {
            const totp = await bgApi.secret.totp.getOneAuthTotp(data.oneauthId);
            ZVaultCS.setValueOnSecretField(selector, totp);
            data.step_no = data.step_no + 1;
            ZVaultUtil.sendMessage(null, "continuePlayback", data);
        },
        async processRequest(request, _sender) {
            var action = request.action;
            if (!action) {
                return;
            }
            var data = request.data;
            if (ZVaultUtil.isValid(data) && !(data instanceof Object)) {
                data = JSON.parse(data);
            }
            switch (action) {
                case "autologin":
                    ZVaultCS.login(data);
                    break;
                case "fillSpecificField":
                    if (!ZVaultUtil.isHostNameMatched(data.secretUrl, window.location.href) &&
                        !ZVaultUtil.isParentDomainMatched(data.secretUrl, window.location.href) &&
                        !data.secretUrls.split(",").some(x => ZVaultUtil.isParentDomainMatched(x, window.location.href))) {
                        return;
                    }
                    if (ZVaultCS.contextMenuTag != null) {
                        if (data.type == "password" && (ZVaultCS.contextMenuTag.type === "password" || ZVaultCS.contextMenuTag.value.toLowerCase() === "password")) {
                            ZVaultCS.setValueOnSecretField(ZVaultCS.contextMenuTag, data.fieldValue);
                        }
                        else if (data.type == "text" && ZVaultCS.isUserNameField(ZVaultCS.contextMenuTag.type)) {
                            ZVaultCS.setValueOnSecretField(ZVaultCS.contextMenuTag, data.fieldValue);
                        }
                    }
                    break;
                case "startPlayback":
                    ZVaultLogin.one_click_login = data.one_click_login;
                    ZVaultLogin.has_view_permission = data.has_view_permission;
                    ZVaultLogin.in_login = true;
                    if (await ZVaultUtil.domainMatchedForPlayback(data.urls)) {
                        var state = document.readyState;
                        if (state != "complete") {
                            ZVaultCS.repeatPlayback(data);
                            break;
                        }
                        if (ZVaultCS.buttonClicked) {
                            ZVaultCS.repeatPlayback(data);
                            ZVaultCS.buttonClicked = false;
                        }
                        var steps = JSON.parse(data.steps);
                        var step_data = steps[data.step_no];
                        data.frameurl = window.location.href;
                        if (step_data.fill_using_context_menu) {
                            data.submit = false;
                            ZVaultCS.login(data);
                            data.step_no = data.step_no + 1;
                            ZVaultCS.continuePlayback(data);
                        }
                        else if (step_data.type == "wait") {
                            data.step_no = data.step_no + 1;
                            ZVaultCS.continuePlayback(data);
                        }
                        else if (step_data.type == "complete_load") {
                            var state = document.readyState;
                            if (state == "complete") {
                                data.step_no = data.step_no + 1;
                                ZVaultCS.continuePlayback(data);
                            }
                            else {
                                ZVaultCS.repeatPlayback(data);
                            }
                            break;
                        }
                        else if (step_data.type == "pin") {
                            var selectors = JSON.parse(atob(step_data.selector));
                            var length = selectors.length;
                            var pin = data.secretdata.password;
                            for (var i = 0; i < length; i++) {
                                var current_selector = document.querySelector(selectors[i]);
                                if (current_selector != null) {
                                    data.countdown = 0;
                                    document.querySelector(selectors[i]).focus();
                                    ZVaultCS.setValueOnSecretField(current_selector, pin[i]);
                                }
                                else {
                                    data.countdown = data.countdown + 1;
                                    if (data.countdown > 10) {
                                        ZVaultUtil.sendMessage(null, "playbackFailure", data);
                                        break;
                                    }
                                    ZVaultCS.continuePlayback(data);
                                    break;
                                }
                            }
                            data.step_no = data.step_no + 1;
                            ZVaultUtil.sendMessage(null, "continuePlayback", data);
                            break;
                        }
                        else if (step_data.type == "totp") {
                            var selector = document.querySelector(atob(step_data.selector));
                            if (selector == null) {
                                data.countdown = data.countdown + 1;
                                if (data.countdown > 10) {
                                    ZVaultUtil.sendMessage(null, "playbackFailure", data);
                                    return;
                                }
                                ZVaultCS.repeatPlayback(data);
                            }
                            else if (window.top == window && data.oneauthId != undefined) {
                                ZVaultCS.fillOneAuthTOTP(data, selector);
                            }
                            break;
                        }
                        else if (step_data.type == "shadowRoot_username" || step_data.type == "shadowRoot_password" || step_data.type == "shadowRoot_click") {
                            var selectorData = JSON.parse(atob(step_data.selector));
                            var selector = document.querySelector(selectorData.shadowRoot).shadowRoot.querySelector(selectorData.field);
                            if (selector == null) {
                                data.step_no = data.step_no + 1;
                                if (data.countdown > 10) {
                                    ZVaultUtil.sendMessage(null, "playbackFailure", data);
                                    return;
                                }
                                ZVaultCS.repeatPlayback(data);
                            }
                            else {
                                step_data.type = step_data.type.split("_").pop();
                                ZVaultCS.executePlaybackAction(data, step_data, selector);
                            }
                        }
                        else if (step_data.type == "fill_totp") {
                            if (data.has_totp) {
                                ZVaultCS.fill_totp(data);
                            }
                            else if (data.oneauthId != "" || data.oneauthId != null) {
                                ZVaultCS.fillOneAuthTOTP(data, loginContext.selector.getElement(step_data.selector));
                            }
                            else {
                                ZVaultCS.advanceSteps(data, 2);
                            }
                        }
                        else if (step_data.type == "totp_fill_digits") {
                            ZVaultCS.fill_digits_totp(data);
                        }
                        else if (step_data.type == "userActionText") {
                            userAction$1.fill(loginContext.selector.getElement(step_data.selector), ZVaultCS.getDataToFill(data, "username"));
                            this.advanceSteps(data, 1);
                        }
                        else if (step_data.type == "userActionPassword") {
                            userAction$1.fill(loginContext.selector.getElement(step_data.selector), ZVaultCS.getDataToFill(data, "password"));
                            this.advanceSteps(data, 1);
                        }
                        else if (step_data.type == "userActionClick") {
                            userAction$1.click(loginContext.selector.getElement(step_data.selector));
                            this.advanceSteps(data, 1);
                        }
                        else {
                            let element = null;
                            if (step_data.selector) {
                                element = loginContext.selector.getElement(step_data.selector);
                            }
                            ZVaultCS.executePlaybackAction(data, step_data, element);
                        }
                    }
                    break;
            }
        },
        async fill_totp(data) {
            if (!data.has_totp) {
                this.advanceSteps(2);
                return;
            }
            try {
                const step = JSON.parse(data.steps)[data.step_no];
                const elem = await this.getElemRetry(() => loginContext.selector.getElement(step.selector), 10);
                if (!elem) {
                    throw new Error("ELEMENT_NOT_FOUND");
                }
                const totp = await bgApi.secret.totp.getTotp(data.secretId);
                ZVaultCS.setValueOnSecretField(elem, totp);
                this.advanceSteps(data, 1);
            }
            catch (e) {
                logError(e);
                this.advanceSteps(data, 2);
            }
        },
        async fill_digits_totp(data) {
            if (!data.has_totp) {
                this.advanceSteps(2);
                return;
            }
            try {
                const step = JSON.parse(data.steps)[data.step_no];
                const elem = await this.getElemRetry(() => loginContext.selector.getElement(step.selector), 10);
                if (!elem) {
                    throw new Error("ELEMENT_NOT_FOUND");
                }
                const reqElements = loginContext.selector.getElements(step.selector);
                if (reqElements == null || reqElements.length == 0) {
                    throw new Error("ELEMENT_NOT_FOUND");
                }
                const totp = await bgApi.secret.totp.getTotp(data.secretId);
                const end = Math.min(reqElements.length, totp.length);
                for (let i = 0; i < end; i++) {
                    ZVaultCS.setValueOnSecretField(reqElements[i], totp[i]);
                }
                this.advanceSteps(data, 1);
            }
            catch (e) {
                logError(e);
                this.advanceSteps(data, 2);
            }
        },
        advanceSteps(data, noOfSteps) {
            data.step_no = data.step_no + noOfSteps;
            ZVaultUtil.sendMessage(null, "continuePlayback", data);
        },
        async getElemRetry(getElem, max_s = 10) {
            try {
                let elem = null;
                for (let i = 0; i < max_s; i++) {
                    elem = getElem();
                    if (elem) {
                        return elem;
                    }
                    await js.time.delay(1);
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        },
        async get_elem(selector = "", max_s = 10) {
            try {
                for (let i = 0; i < max_s; i++) {
                    if (document.querySelector(selector)) {
                        return document.querySelector(selector);
                    }
                    await js.time.delay(1);
                }
            }
            catch (e) {
                logError(e);
            }
            return false;
        }
    };

    class ResetUIApi {
        apiClient;
        init() {
            this.apiClient = portApi.createApiClient();
            this.apiClient.init({ name: VtApiPortNames.RESET });
        }
        async updateProgress(progress) {
            try {
                await ztabStorage.save(TabStorageKeys.RESET_PROGRESS, progress);
                this.apiClient.callApi({ path: this.updateProgress.name });
            }
            catch (e) {
                logError(e);
            }
        }
    }
    const resetUIApi = new ResetUIApi();

    class PasswordReset {
        resetData = null;
        async init() {
            if (!csutil.window.isTopFrame()) {
                return;
            }
            resetUIApi.init();
            this.resetPassword = js.fn.wrapper.createSingleInstance(this.resetPassword, this);
            await this.resetPassword();
        }
        async resetPassword() {
            try {
                await js.dom.waitDomLoad();
                this.resetData = await ztabStorage.load(TabStorageKeys.RESET_DATA, null);
                if (!this.resetData) {
                    return;
                }
                const expired = this.resetData.expiresIn < Date.now();
                if (expired) {
                    this.finishReset(false);
                    return;
                }
                if (this.resetData.currentStepIndex == 0) {
                    exp_csframe.resetFrame.show();
                }
                this.updateProgressUI();
                cs.sitePasswordChangeObserver.disableSave();
                cs.loginPasswordChangeHandler.disableSave();
                const resetClient = new PasswordResetClient();
                let step;
                while (this.resetData.currentStepIndex < this.resetData.steps.length) {
                    step = this.resetData.steps[this.resetData.currentStepIndex];
                    await resetClient.execute(step.id_func, this.getArguments(step.id_value));
                    this.resetData.currentStepIndex++;
                    await this.saveProgress();
                    if (resetClient.inWaitForever) {
                        return;
                    }
                }
                this.finishReset(true);
            }
            catch (e) {
                logError(e);
                this.finishReset(false);
            }
        }
        async finishReset(successfull) {
            try {
                const finalProgress = successfull ? 100 : -1;
                resetUIApi.updateProgress(finalProgress);
                bgApi.tab.finishReset(successfull);
            }
            catch (e) {
                logError(e);
            }
        }
        getArguments(argumentString) {
            let argumentArray = JSON.parse(argumentString);
            let y = (s) => this.resetData[s.slice(1)];
            return argumentArray.map(x => typeof (x) == "string" && x[0] == '$' ? y(x) : x);
        }
        async saveProgress() {
            try {
                this.resetData.expiresIn = Date.now() + PasswordResetInfo.MAX_WAIT_TIME_MS;
                await ztabStorage.save(TabStorageKeys.RESET_DATA, this.resetData);
                this.updateProgressUI();
            }
            catch (e) {
                logError(e);
            }
        }
        updateProgressUI() {
            try {
                const INC = (0.20 * this.resetData.steps.length) >> 0;
                const current = this.resetData.currentStepIndex + INC;
                const total = this.resetData.steps.length + INC;
                const progress = ((current / total) * 100) >> 0;
                resetUIApi.updateProgress(progress);
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class PasswordResetClient {
        inWaitForever = false;
        async execute(fn, args) {
            await this.waitForMutations(1, 0.5);
            const result = await this[fn].apply(this, args);
            return result;
        }
        async ifPathPath(pathToCheck, ifPath, elsePath) {
            let currentPath = this.getCurrentPath();
            if (pathToCheck == currentPath) {
                return await this.goToPath(ifPath);
            }
            if (typeof (elsePath) == "undefined") {
                return true;
            }
            await this.goToPath(elsePath);
            return false;
        }
        async ifPresentClick(ifSelector, ifClickSelector, elseClickSelector) {
            ifClickSelector = ifClickSelector || ifSelector;
            if (document.querySelector(ifSelector)) {
                return await this.clickElement(ifClickSelector);
            }
            if (typeof (elseClickSelector) != "undefined") {
                return await this.clickElement(elseClickSelector);
            }
            return true;
        }
        async ifPresentFill(ifSelector, selector, value) {
            if (document.querySelector(ifSelector)) {
                return await this.fillInput(selector, value);
            }
            return true;
        }
        async ifPresentClickNth(ifSelector, ifClickSelector, ifN, elseClickSelector, elseN) {
            if (document.querySelector(ifSelector)) {
                return await this.clickElementNth(ifClickSelector, ifN);
            }
            if (typeof (elseClickSelector) != "undefined") {
                return await this.clickElementNth(elseClickSelector, elseN);
            }
            return true;
        }
        async ifPathClick(path, ifSelector, elseSelector) {
            let currentPath = this.getCurrentPath();
            if (currentPath == path) {
                return await this.clickElement(ifSelector);
            }
            if (typeof (elseSelector) != "undefined") {
                return await this.clickElement(elseSelector);
            }
            return true;
        }
        getCurrentPath() {
            let path = window.location.pathname;
            if (path == "/") {
                return "/";
            }
            return path.endsWith("/") ? path.slice(0, path.length - 1) : path;
        }
        async goToPath(path) {
            this.inWaitForever = true;
            window.location.href = path;
            this.waitForever();
            return true;
        }
        async goToHash(hash) {
            window.location.hash = hash;
            return true;
        }
        waitForever() {
            return new Promise(js.fn.emptyFn);
        }
        async fillInput(selectorString, value) {
            await this.waitForElement(selectorString);
            this.fillValue(document.querySelector(selectorString), value);
            return true;
        }
        fillValue(inputElement, value) {
            inputElement.focus();
            inputElement.click();
            this.createInputEvents(inputElement);
            inputElement.value = "";
            inputElement.value = value;
            this.createInputEvents(inputElement);
        }
        async waitForElement(selectorString) {
            await new ElementAddObserver(selectorString).waitForElementToAppear();
            return true;
        }
        async waitForNthElement(selectorString, index) {
            await new NthElementAddObserver(selectorString, index);
            return true;
        }
        createInputEvents(element) {
            let fireEvent = function (element, eventName) {
                let event = document.createEvent("HTMLEvents");
                event.initEvent(eventName, true, true);
                return !element.dispatchEvent(event);
            };
            fireEvent(element, "click");
            fireEvent(element, "change");
            fireEvent(element, "input");
        }
        async clickElement(selectorString) {
            await this.waitForElement(selectorString);
            this.clickElementNode(document.querySelector(selectorString));
            return true;
        }
        async clickElementNth(selectorString, index) {
            await this.waitForNthElement(selectorString, index);
            this.clickElementNode(document.querySelectorAll(selectorString)[index]);
            return true;
        }
        clickElementNode(element) {
            element.disabled = false;
            element.click();
        }
        async clickElementChained(...operations) {
            let elementToClick = new ChainedDocumentResult().getChainedResult(operations);
            return this.clickElementNode(elementToClick);
        }
        async fillInputNth(selectorString, index, value) {
            await this.waitForNthElement(selectorString, index);
            this.fillValue(document.querySelectorAll(selectorString)[index], value);
            return true;
        }
        async fillInputChained(value, ...operations) {
            let inputElement = new ChainedDocumentResult().getChainedResult(operations);
            return await this.fillValue(inputElement, value);
        }
        async redirect(...paths) {
            let newPath = paths.pop();
            let currentPath = this.getCurrentPath();
            if (currentPath == newPath) {
                return true;
            }
            if (paths.some(path => currentPath == path)) {
                window.location.pathname = newPath;
            }
            await this.waitForever();
            return false;
        }
        async waitForMutations(initialDelay, timeToWaitInBet) {
            await new MutationFinishWaiter(initialDelay, timeToWaitInBet).waitForMutationFinish();
        }
        async waitForPath(...paths) {
            let currentPath = this.getCurrentPath();
            if (paths.some(path => currentPath == path)) {
                return true;
            }
            await this.waitForever();
            return false;
        }
        async delay(secondsString) {
            await this.waitForNSec(+secondsString);
        }
        waitForNSec(n) {
            return new Promise(resolve => setTimeout(resolve, n * 1000));
        }
        async waitForIframeDomReady(selector) {
            let iframeDocument = document.querySelector(selector).contentDocument;
            let waitPromiseResolve;
            let waitPromise = new Promise(resolve => { waitPromiseResolve = resolve; });
            let checkReadyState = function (resolve) {
                if (iframeDocument.readyState == "complete") {
                    resolve();
                }
            };
            iframeDocument.addEventListener("readystatechange", () => checkReadyState(waitPromiseResolve));
            checkReadyState(waitPromiseResolve);
            await waitPromise;
        }
    }
    class DocumentBodyMutationObserver {
        toBeCalled = false;
        timeoutId = null;
        callBackToCall = null;
        observer = null;
        constructor(callBackToCall) {
            this.callBackToCall = callBackToCall;
            this.initializeMutationObserver();
        }
        initializeMutationObserver() {
            this.observer = new MutationObserver(() => this.handleMutation());
            this.observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
        handleMutation() {
            if (this.toBeCalled) {
                return;
            }
            this.toBeCalled = true;
            this.timeoutId = setTimeout(() => {
                this.callBackToCall();
                this.toBeCalled = false;
            }, 1000);
        }
        disconnect() {
            this.observer.disconnect();
            clearTimeout(this.timeoutId);
        }
    }
    class ElementAddObserver {
        selectorString = "";
        waitPromiseResolve = null;
        toBeChecked = false;
        observer = null;
        constructor(selectorString) {
            this.selectorString = selectorString;
        }
        async waitForElementToAppear() {
            if (this.isElementPresent()) {
                return true;
            }
            let waitPromise = new Promise(resolve => this.waitPromiseResolve = resolve);
            this.observer = new DocumentBodyMutationObserver(() => this.checkElementPresence());
            await waitPromise;
            return false;
        }
        isElementPresent() {
            return document.querySelector(this.selectorString) != null;
        }
        checkElementPresence() {
            if (!this.isElementPresent()) {
                return;
            }
            this.observer.disconnect();
            this.waitPromiseResolve();
        }
    }
    class NthElementAddObserver {
        index = 0;
        selectorString = "";
        waitPromiseResolve = null;
        toBeChecked = false;
        observer = null;
        constructor(selectorString, index) {
            this.index = index;
            this.selectorString = selectorString;
        }
        async waitForElementToAppear() {
            if (this.isElementPresent()) {
                return true;
            }
            let waitPromise = new Promise(resolve => this.waitPromiseResolve = resolve);
            this.observer = new DocumentBodyMutationObserver(() => this.checkElementPresence());
            await waitPromise;
            return false;
        }
        isElementPresent() {
            return document.querySelectorAll(this.selectorString)[this.index] != null;
        }
        checkElementPresence() {
            if (!this.isElementPresent()) {
                return;
            }
            this.observer.disconnect();
            this.waitPromiseResolve();
        }
    }
    class MutationFinishWaiter {
        initialDelay = 0;
        timeToWaitInMs = 0;
        waitPromiseResolve = null;
        timeoutId = 0;
        observer = null;
        constructor(initialDelay, timeToWait) {
            this.initialDelay = initialDelay * 1000;
            this.timeToWaitInMs = timeToWait * 1000;
        }
        async waitForMutationFinish() {
            let waitPromise = new Promise(resolve => { this.waitPromiseResolve = resolve; });
            this.timeoutId = setTimeout(() => this.finishWaiting(), this.initialDelay);
            this.initializeMutationObserver();
            await waitPromise;
        }
        startWaitingAgain() {
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => this.finishWaiting(), this.timeToWaitInMs);
        }
        finishWaiting() {
            this.observer.disconnect();
            this.waitPromiseResolve();
        }
        initializeMutationObserver() {
            this.observer = new MutationObserver(_mutationRecordArray => this.handleMutation());
            this.observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
        handleMutation() {
            this.startWaitingAgain();
        }
    }
    class ChainedDocumentResult {
        getChainedResult(operations) {
            let ans = document;
            for (let operation of operations) {
                ans = this.getOperationResult(ans, operation);
            }
            return ans;
        }
        getOperationResult(obj, [operationType, value, ...args]) {
            switch (operationType) {
                case "()":
                    return obj[value].apply(obj, args);
                case "[]":
                    return obj[value];
            }
        }
    }

    class DownloadUtil {
        async saveFile(data) {
            const fileContent = atob(data.base64Data);
            const fileInfo = {
                name: data.name,
                type: data.type};
            const a = new Array(fileContent.length);
            for (let i = 0; i < a.length; i++) {
                a[i] = fileContent.charCodeAt(i) & 0xFF;
            }
            const blob = new Blob([new Uint8Array(a).buffer], { type: fileInfo.type });
            await saveAs(blob, fileInfo.name);
            setTimeout(function () { window.close(); }, 500);
        }
    }

    var TabDomainStorageKeys;
    (function (TabDomainStorageKeys) {
        TabDomainStorageKeys["SAVE_USERNAME"] = "SAVE_USERNAME";
        TabDomainStorageKeys["SAVE_CREDENTIAL"] = "SAVE_CREDENTIAL";
        TabDomainStorageKeys["CHANGED_CREDENTIAL"] = "CHANGED_CREDENTIAL";
        TabDomainStorageKeys["LOGIN_PASSWORD_FILL_INFO"] = "LOGIN_PASSWORD_FILL_INFO";
    })(TabDomainStorageKeys || (TabDomainStorageKeys = {}));

    class LoginPasswordChangeHandler {
        fillInfo = null;
        passwordInput = null;
        saveDisabled = false;
        async init() {
            try {
                js.fn.bindThis(this, [this.inputValueChanged]);
                this.fillInfo = await ztabDomainStorage.load(TabDomainStorageKeys.LOGIN_PASSWORD_FILL_INFO, null);
                this.addChangeListener();
                await this.finishSave();
            }
            catch (e) {
                logError(e);
            }
        }
        async checkPasswordChange(secretId, passwordInput, fieldName) {
            try {
                info(LoginPasswordChangeHandler.name, "checking password change: ", passwordInput);
                const selector = csutil.uniqSelector.getSelector(passwordInput);
                this.fillInfo = {
                    secretId,
                    filledPassword: passwordInput.value,
                    observedInputSelector: selector,
                    updatedPassword: "",
                    fieldName
                };
                this.passwordInput = passwordInput;
                this.addInputChangeListener(passwordInput);
                await ztabDomainStorage.save(TabDomainStorageKeys.LOGIN_PASSWORD_FILL_INFO, this.fillInfo);
            }
            catch (e) {
                logError(e);
            }
        }
        async disableSave() {
            try {
                this.saveDisabled = true;
                this.clear();
            }
            catch (e) {
                logError(e);
            }
        }
        addInputChangeListener(input) {
            try {
                if (input.getRootNode() == document) {
                    return;
                }
                input.removeEventListener("change", this.inputValueChanged);
                input.addEventListener("change", this.inputValueChanged);
            }
            catch (e) {
                logError(e);
            }
        }
        async inputValueChanged(e) {
            try {
                if (this.saveDisabled) {
                    return;
                }
                if (!this.fillInfo) {
                    return;
                }
                if (!e.isTrusted) {
                    return;
                }
                const curInput = csutil.dom.getEventTargetInput(e);
                if (!curInput) {
                    return;
                }
                if (!this.passwordInput || this.passwordInput != curInput) {
                    return;
                }
                if (this.fillInfo.observedInputSelector && (csutil.uniqSelector.select(this.fillInfo.observedInputSelector) != curInput)) {
                    return;
                }
                const newValue = curInput.value;
                if (newValue == this.fillInfo.filledPassword) {
                    return;
                }
                this.fillInfo.updatedPassword = newValue;
                await ztabDomainStorage.save(TabDomainStorageKeys.LOGIN_PASSWORD_FILL_INFO, this.fillInfo);
            }
            catch (e) {
                logError(e);
            }
        }
        async finishSave() {
            try {
                await csutil.input.waitForPasswordDisappear({ shadowRoot: false });
                const visiblePassword = csutil.input.getPassword({ visible: true, shadowRoot: false });
                if (visiblePassword) {
                    return;
                }
                const fillInfo = this.fillInfo;
                if (!fillInfo) {
                    return;
                }
                await this.clear();
                if (!fillInfo.updatedPassword) {
                    return;
                }
                const changedLogin = {
                    secretId: fillInfo.secretId,
                    newPassword: fillInfo.updatedPassword,
                    passwordFieldName: fillInfo.fieldName
                };
                await bgApi.updateFrame.updateChangedLoginPassword(changedLogin);
            }
            catch (e) {
                logError(e);
            }
        }
        async clear() {
            try {
                this.passwordInput = null;
                this.fillInfo = null;
                await ztabDomainStorage.remove(TabDomainStorageKeys.LOGIN_PASSWORD_FILL_INFO);
            }
            catch (e) {
                logError(e);
            }
        }
        addChangeListener() {
            try {
                if (document.body) {
                    document.body.addEventListener("change", this.inputValueChanged);
                    return;
                }
                document.documentElement.addEventListener("change", this.inputValueChanged);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class BaseSavePasswordHandler {
        saveDisabled = false;
        async init() {
            try {
                js.fn.bindThis(this, [
                    this.check,
                    this.handleClick,
                    this.onDomInput,
                ]);
                this.finishSave = js.fn.wrapper.createSingleInstance(this.finishSave, this);
                this.saveDisabled = await this.checkNeedSaveDisable();
            }
            catch (e) {
                logError(e);
            }
        }
        async disableSave() {
            try {
                this.saveDisabled = true;
            }
            catch (e) {
                logError(e);
            }
        }
        async enableSave() {
            try {
                this.saveDisabled = false;
            }
            catch (e) {
                logError(e);
            }
        }
        initDomListeners() {
            try {
                document.addEventListener("input", this.onDomInput, true);
                document.addEventListener("submit", this.finishSave, true);
                document.addEventListener("click", this.handleClick, true);
            }
            catch (e) {
                logError(e);
            }
        }
        onDomInput(e) {
            try {
                const target = csutil.dom.getEventTarget(e);
                if (target instanceof HTMLInputElement) {
                    this.check(target);
                    return;
                }
                if (target instanceof HTMLTextAreaElement) {
                    return;
                }
                const activeInput = csutil.input.getActiveInput();
                if (!activeInput) {
                    return;
                }
                this.check(activeInput);
            }
            catch (e) {
                logError(e);
            }
        }
        async checkNeedSaveDisable() {
            try {
                const autoSave = await zlocalStorage.load(LocalStorageKeys.AUTO_SAVE_UPDATE_PASSWORDS, true);
                if (!autoSave) {
                    return true;
                }
                const isNeverSaveUrl = await bgApi.tab.isNeverSaveUrl();
                if (isNeverSaveUrl) {
                    return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        handleClick(e) {
            try {
                const isSubmitClick = this.isSubmitClick(e);
                if (isSubmitClick) {
                    this.finishSave();
                }
            }
            catch (e) {
                logError(e);
            }
        }
        isSubmitClick(e) {
            try {
                const target = csutil.dom.getEventTarget(e);
                const isInputElement = target instanceof HTMLInputElement;
                if (isInputElement) {
                    if (target.type == InputType.SUBMIT) {
                        return true;
                    }
                    if (zicon.hasZIcon(target)) {
                        return false;
                    }
                }
                const isPointableElem = window.getComputedStyle(target).cursor == "pointer";
                if (isPointableElem) {
                    return true;
                }
                const checkSubmitInPoint = Number.isFinite(e.clientX) && Number.isFinite(e.clientY);
                if (checkSubmitInPoint) {
                    const pointElements = csutil.dom.getElementsFromPoint({ x: e.clientX, y: e.clientY });
                    const hasSubmitInPoint = pointElements.some(x => (x instanceof HTMLInputElement) && (x.type == "submit"));
                    if (hasSubmitInPoint) {
                        return true;
                    }
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class SavePasswordHandler extends BaseSavePasswordHandler {
        username = "";
        password = "";
        urls = [];
        lastPageContainerInput = null;
        pageLoginContainer = null;
        hasNonNumericLastSaveCredential = false;
        async init() {
            try {
                this.pageFinishSave();
                await super.init();
                info(SavePasswordHandler.name, "save password disabled: ", this.saveDisabled);
                await this.initNonNumericLastSaveCredential();
                await csutil.input.waitForVisibleInput({ shadowRoot: false });
                await this.restoreSavedUsername();
                await this.clearUsername();
                this.initDomListeners();
                info(SavePasswordHandler.name, "save password handler initialized");
            }
            catch (e) {
                logError(e);
            }
        }
        async disableSave() {
            try {
                super.disableSave();
                this.username = "";
                this.password = "";
                await bgApi.saveFrame.disableSavePassword();
                info(SavePasswordHandler.name, "save password disabled");
            }
            catch (e) {
                logError(e);
            }
        }
        check(input) {
            try {
                if (this.saveDisabled || !csutil.input.isValidTextPassword(input) || !input.value || input.hasAttribute("data-zvault-cc")) {
                    return;
                }
                if (csutil.input.typeOf(input) == InputType.PASSWORD) {
                    this.savePassword(input);
                    return;
                }
                this.saveUsername(input);
            }
            catch (e) {
                logError(e);
            }
        }
        async saveUsername(usernameInput) {
            try {
                const loginContainer = this.getPageLoginContainer(usernameInput) ||
                    csLoginContainer.getInputLoginContainer(usernameInput) || document.body;
                const usernameField = this.getUsernameField(loginContainer);
                if (usernameField != usernameInput) {
                    return;
                }
                this.username = usernameInput.value;
                this.urls = await vutil.getSaveUrls();
                const saveUsername = {
                    username: this.username,
                    urls: this.urls
                };
                await ztabDomainStorage.save(TabDomainStorageKeys.SAVE_USERNAME, saveUsername);
                await this.updateToBeSavedCredential();
            }
            catch (e) {
                logError(e);
            }
        }
        getPageLoginContainer(input) {
            try {
                if (this.lastPageContainerInput != input) {
                    this.lastPageContainerInput = input;
                    this.pageLoginContainer = csLoginContainer.getPageLoginContainer() || document.body;
                }
                return this.pageLoginContainer;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getUsernameField(loginContainer) {
            try {
                const inputs = csutil.selector.selectAll("input", { container: loginContainer, shadowRoot: false });
                const validInputs = inputs.filter(input => csutil.input.isValidTextPassword(input));
                let lastTextInput = null;
                for (let input of validInputs) {
                    if (input.type == "password") {
                        break;
                    }
                    if (csutil.isVisible(input) && csutil.input.isValidTextPassword(input)) {
                        lastTextInput = input;
                    }
                }
                if (lastTextInput) {
                    return lastTextInput;
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async savePassword(passwordInput) {
            try {
                const loginContainer = this.getPageLoginContainer(passwordInput) ||
                    csLoginContainer.getInputLoginContainer(passwordInput) || document.body;
                const passwordField = csutil.input.getPassword({ visible: true, container: loginContainer, shadowRoot: false });
                if (passwordField != passwordInput) {
                    info(SavePasswordHandler.name, "not saving as password field mismatches", passwordField, passwordInput);
                    return;
                }
                this.password = passwordInput.value;
                await this.updateToBeSavedCredential();
            }
            catch (e) {
                logError(e);
            }
        }
        async updateToBeSavedCredential() {
            try {
                if (!this.username || !this.password || !this.urls || !this.urls.length) {
                    return;
                }
                const credential = {
                    username: this.username,
                    password: this.password,
                    urls: this.urls
                };
                const isPossibleMFA = this.hasNonNumericLastSaveCredential && !/\D/.test(this.password);
                if (isPossibleMFA) {
                    info(SavePasswordHandler.name, "not updating to be saved credential because of possible MFA input");
                    return;
                }
                info(SavePasswordHandler.name, "to be saved credential: ", js.log.mask(credential, { keys: ["username", "password"] }));
                const allowedDomains = this.urls.map(x => js.url.getParentDomain(x));
                await ztabDomainStorage.saveDomain(TabDomainStorageKeys.SAVE_CREDENTIAL, credential, allowedDomains);
            }
            catch (e) {
                logError(e);
            }
        }
        async pageFinishSave() {
            try {
                if (!csutil.window.isTopFrame()) {
                    return;
                }
                const savedCredential = await ztabDomainStorage.load(TabDomainStorageKeys.SAVE_CREDENTIAL, null);
                if (!savedCredential) {
                    return;
                }
                info(SavePasswordHandler.name, "has save credential: ", js.log.mask(savedCredential, { keys: ["username", "password"] }));
                await js.time.delay(0.5);
                const visiblePassword = csutil.input.getPassword({ visible: true, shadowRoot: false });
                if (visiblePassword) {
                    info(SavePasswordHandler.name, "not showing save because of visible password");
                    return;
                }
                this.finishSave();
            }
            catch (e) {
                logError(e);
            }
        }
        async finishSave() {
            try {
                if (!csutil.window.isTopFrame()) {
                    return;
                }
                const hasSavedCredential = Boolean(await ztabDomainStorage.load(TabDomainStorageKeys.SAVE_CREDENTIAL, null));
                if (!hasSavedCredential) {
                    return;
                }
                info(SavePasswordHandler.name, "finish save - wait for password disappear");
                await js.time.delay(0.5);
                await csutil.input.waitForPasswordDisappear({ maxWaitSecs: Number.MAX_SAFE_INTEGER, shadowRoot: false });
                const savedCredential = await ztabDomainStorage.load(TabDomainStorageKeys.SAVE_CREDENTIAL, null);
                if (!savedCredential) {
                    return;
                }
                await bgApi.saveFrame.saveCredential(savedCredential);
            }
            catch (e) {
                logError(e);
            }
        }
        async restoreSavedUsername() {
            try {
                const savedUsername = await ztabDomainStorage.load(TabDomainStorageKeys.SAVE_USERNAME, null);
                if (!savedUsername) {
                    return;
                }
                info(SavePasswordHandler.name, "restoring saved username: ", js.log.mask(savedUsername.username), savedUsername.urls);
                const allowedDomains = savedUsername.urls.map(x => js.url.getParentDomain(x));
                const curDomain = await bgApi.tab.getTabDomain();
                if (!allowedDomains.includes(curDomain)) {
                    if (csutil.window.isTopFrame()) {
                        await ztabDomainStorage.remove(TabDomainStorageKeys.SAVE_USERNAME);
                    }
                    return;
                }
                info(SavePasswordHandler.name, "restored saved username");
                this.username = savedUsername.username;
                this.urls = savedUsername.urls;
            }
            catch (e) {
                logError(e);
            }
        }
        async clearUsername() {
            try {
                if (!this.username) {
                    return;
                }
                if (!csutil.window.isTopFrame()) {
                    return;
                }
                const hasVisiblePassword = Boolean(csutil.input.getPassword({ visible: true, container: document.body, shadowRoot: false }));
                if (hasVisiblePassword) {
                    info(SavePasswordHandler.name, "has visible password - not clearing username");
                    return;
                }
                info(SavePasswordHandler.name, "cleared saved username");
                await ztabDomainStorage.remove(TabDomainStorageKeys.SAVE_USERNAME);
            }
            catch (e) {
                logError(e);
            }
        }
        async initNonNumericLastSaveCredential() {
            try {
                const savedCredential = await ztabDomainStorage.load(TabDomainStorageKeys.SAVE_CREDENTIAL, null);
                if (!savedCredential || !savedCredential.password) {
                    return;
                }
                const hasNonNumericPassword = /\D/.test(savedCredential.password);
                if (!hasNonNumericPassword) {
                    return;
                }
                this.hasNonNumericLastSaveCredential = true;
                info(SavePasswordHandler.name, "has non numeric saved credential");
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class SitePasswordChangeObserver extends BaseSavePasswordHandler {
        oldPasswordChecker = new OldPasswordChecker();
        newPasswordChecker = new NewPasswordChecker();
        savedNewConfirmToMemory = false;
        async init() {
            try {
                this.finishSave();
                await super.init();
                await csutil.input.waitForVisibleInput({ shadowRoot: false });
                super.initDomListeners();
                info(SitePasswordChangeObserver.name, "initialized site password change observer");
            }
            catch (e) {
                logError(e);
            }
        }
        async check(input) {
            try {
                if (this.saveDisabled || csutil.input.typeOf(input) != "password") {
                    return;
                }
                const visiblePasswords = csutil.input.getPasswords({ visible: true, shadowRoot: false });
                const hasAtleast2PasswordInputs = visiblePasswords.length >= 2;
                if (!hasAtleast2PasswordInputs) {
                    return;
                }
                const hasUsername = this.checkHasUsernameInput(input);
                if (hasUsername) {
                    return;
                }
                const hasNewConfirm = visiblePasswords.length == 2 && (visiblePasswords[0].value == visiblePasswords[1].value);
                if (hasNewConfirm) {
                    const changedCredential = {
                        oldPassword: "",
                        newPassword: visiblePasswords[0].value
                    };
                    ztabDomainStorage.save(TabDomainStorageKeys.CHANGED_CREDENTIAL, changedCredential);
                    this.savedNewConfirmToMemory = true;
                    return;
                }
                if (this.savedNewConfirmToMemory) {
                    await ztabDomainStorage.remove(TabDomainStorageKeys.CHANGED_CREDENTIAL);
                    this.savedNewConfirmToMemory = false;
                }
                const inputIndex = visiblePasswords.indexOf(input);
                switch (inputIndex) {
                    case 0:
                        this.oldPasswordChecker.check(input);
                        break;
                    case 1:
                        this.newPasswordChecker.check(input);
                        break;
                    case 2:
                        this.checkOldNewPassword();
                        break;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        checkHasUsernameInput(passwordInput) {
            const containerElem = csLoginContainer.getInputLoginContainer(passwordInput) || document.body;
            const userNameInput = csutil.input.getUsername({ visible: true, container: containerElem, shadowRoot: false });
            return Boolean(userNameInput);
        }
        async checkOldNewPassword() {
            try {
                const [oldPassword, newPassword, confirmNewPassword] = csutil.input.getPasswords({ visible: true, shadowRoot: false }).slice(0, 3);
                if (newPassword.value != confirmNewPassword.value || !oldPassword.value || !newPassword.value) {
                    return;
                }
                const changeCredential = {
                    oldPassword: oldPassword.value,
                    newPassword: newPassword.value
                };
                await ztabDomainStorage.save(TabDomainStorageKeys.CHANGED_CREDENTIAL, changeCredential);
            }
            catch (e) {
                logError(e);
            }
        }
        async finishSave() {
            try {
                if (!csutil.window.isTopFrame()) {
                    return;
                }
                const hasCredential = Boolean(await ztabDomainStorage.load(TabDomainStorageKeys.CHANGED_CREDENTIAL, null));
                if (!hasCredential) {
                    return;
                }
                info(SitePasswordChangeObserver.name, "finish save - waiting for password disappear");
                await js.time.delay(0.5);
                await csutil.input.waitForPasswordDisappear({ maxWaitSecs: Number.MAX_SAFE_INTEGER, shadowRoot: false });
                const changedCredential = await ztabDomainStorage.load(TabDomainStorageKeys.CHANGED_CREDENTIAL, null);
                if (!changedCredential) {
                    return;
                }
                await bgApi.updateFrame.saveChangedCredential(changedCredential);
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class PasswordChecker {
        fieldRegEx = /test/i;
        credentialObjKey = "";
        async check(input) {
            try {
                if (!input.value) {
                    return;
                }
                const matchesRegex = csutil.dom.hasAttribute({ elem: input, key: this.fieldRegEx });
                if (!matchesRegex) {
                    return;
                }
                await this.updateValue(input.value);
            }
            catch (e) {
                logError(e);
            }
        }
        async updateValue(value) {
            try {
                const credential = await ztabDomainStorage.load(TabDomainStorageKeys.CHANGED_CREDENTIAL, new ChangedCredential());
                credential[this.credentialObjKey] = value;
                await ztabDomainStorage.save(TabDomainStorageKeys.CHANGED_CREDENTIAL, credential);
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class OldPasswordChecker extends PasswordChecker {
        fieldRegEx = /(?:(\b|_)old)|(?:(\b|_)cur[^a-z])|(?:(\b|_)current)/i;
        credentialObjKey = "oldPassword";
    }
    class NewPasswordChecker extends PasswordChecker {
        fieldRegEx = /(?:(\b|_)new)/i;
        credentialObjKey = "newPassword";
    }

    class ContentScript {
        async main() {
            await vt.init({ logPrefix: "CS:" });
            await csutil.init();
            cs.card = new CSCardMain();
            CSCardApiServer.init();
            cs.card.initForIframe();
            await csutil.window.waitForValidWindow();
            info("GEN:", "valid window wait complete");
            await cs.card.disableIframeCheck();
            cs.fieldFillder = new CSFieldFiller();
            cs.form = new CSFormFiller();
            cs.login = new CSLogin();
            cs.totpLogin = new TotpLogin();
            cs.passwordReset = new PasswordReset();
            cs.savePasswordHandler = new SavePasswordHandler();
            cs.sitePasswordChangeObserver = new SitePasswordChangeObserver();
            cs.loginPasswordChangeHandler = new LoginPasswordChangeHandler();
            cs.other = new CSOther();
            cs.downloadUtil = new DownloadUtil();
            new CSBgEventListener().init();
            await userAction.init();
            await csLoginSubmitter.init();
            exp_csframe.init();
            cs.login.init();
            zicon.init();
            cs.savePasswordHandler.init();
            cs.sitePasswordChangeObserver.init();
            cs.loginPasswordChangeHandler.init();
            cs.passwordReset.init();
            CSApiServer.init();
            ZVaultCS.init();
            info("GEN:", "content script initialized");
        }
        async webMain() {
            await csutil.init();
            await csutil.window.waitForValidWindow();
            cs.fieldFillder = new CSFieldFiller();
            cs.card = new CSCardMain();
            cs.login = new CSLogin();
            cs.totpLogin = new TotpLogin();
            cs.passwordReset = new PasswordReset();
            cs.savePasswordHandler = new SavePasswordHandler();
            cs.sitePasswordChangeObserver = new SitePasswordChangeObserver();
            cs.loginPasswordChangeHandler = new LoginPasswordChangeHandler();
            cs.other = new CSOther();
            new CSBgEventListener().init();
            cs.login.init();
            zicon.initWeb();
            CSApiServer.init();
        }
    }

    class BgAccessCtrlApiImpl {
        context;
        prefix = "accessCtrl.";
        constructor(context) {
            this.context = context;
        }
        async update(apiInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.update.name, args: [apiInput] });
        }
        async getAccessCtrlSettings(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getAccessCtrlSettings.name, args: [secretId] });
        }
        async createRequest(input) {
            return this.context.apiClient.callApi({ path: this.prefix + this.createRequest.name, args: [input] });
        }
        async getAccessPendingUIInfo(accessRequestId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getAccessPendingUIInfo.name, args: [accessRequestId] });
        }
        async cancel(accessRequestId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.cancel.name, args: [accessRequestId] });
        }
        async checkout(accessRequestId, secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkout.name, args: [accessRequestId, secretId] });
        }
        async checkin(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkin.name, args: [secretId] });
        }
        async disable(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.disable.name, args: [secretId] });
        }
        async isHelpdeskEnabled(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.isHelpdeskEnabled.name, args: [secretId] });
        }
    }

    class BgApiContext {
        apiClient;
    }

    class BgAuditApiImpl {
        context;
        prefix = "audit.";
        constructor(context) {
            this.context = context;
        }
        async secretAccessed(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.secretAccessed.name, args: [secretId] });
        }
        async fieldViewed(secretId, fieldName) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fieldViewed.name, args: [secretId, fieldName] });
        }
        async columnViewed(secretId, columnId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.columnViewed.name, args: [secretId, columnId] });
        }
        async totpKeyViewed(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.totpKeyViewed.name, args: [secretId] });
        }
        async fieldCopied(secretId, fieldName) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fieldCopied.name, args: [secretId, fieldName] });
        }
        async customColumnCopied(secretId, columnId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.customColumnCopied.name, args: [secretId, columnId] });
        }
        async notesCopied(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.notesCopied.name, args: [secretId] });
        }
    }

    class BgCardFrameApiImpl {
        context;
        prefix = "cardFrame.";
        constructor(context) {
            this.context = context;
        }
        async getTabUrl() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getTabUrl.name });
        }
        async showFormFrame(frameUrl) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showFormFrame.name, args: [frameUrl] });
        }
        async closeCardFrame() {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeCardFrame.name });
        }
        async showSaveCardFrame(cardObj) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showSaveCardFrame.name, args: [cardObj] });
        }
        async showUpdateCardFrame(cardObj) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showUpdateCardFrame.name, args: [cardObj] });
        }
        async closeSaveCardFrame() {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeSaveCardFrame.name });
        }
        async getSecrets(query) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getSecrets.name, args: [query] });
        }
        async fillCard(secret, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillCard.name, args: [secret, frameId] });
        }
        async getCardCategory() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getCardCategory.name });
        }
        async fillCardIframe(data, secretId, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillCardIframe.name, args: [data, secretId, frameId] });
        }
        async fillForm(secret, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillForm.name, args: [secret, frameId] });
        }
        async fillFormField(data, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillFormField.name, args: [data, frameId] });
        }
        async checkIframeFields(data) {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkIframeFields.name, args: [data] });
        }
        async fillVaultIconCCIframe(fields, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillVaultIconCCIframe.name, args: [fields, frameId] });
        }
    }

    class BgCryptoApiImpl {
        context;
        prefix = "crypto.";
        file;
        ext;
        constructor(context) {
            this.context = context;
            this.file = new BgFileCryptoApiImpl(context);
            this.ext = new BgExtCryptoApiImpl(context);
        }
        async encrypt(plaintext, isShared) {
            return this.context.apiClient.callApi({ path: this.prefix + this.encrypt.name, args: [plaintext, isShared] });
        }
        async decrypt(ciphertext, isShared) {
            return this.context.apiClient.callApi({ path: this.prefix + this.decrypt.name, args: [ciphertext, isShared] });
        }
        async getKey(isShared) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getKey.name, args: [isShared] });
        }
        async getIsShared(classification) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getIsShared.name, args: [classification] });
        }
    }
    class BgFileCryptoApiImpl {
        context;
        prefix = "crypto.file.";
        constructor(context) {
            this.context = context;
        }
        async encrypt(plaintext, isShared) {
            return this.context.apiClient.callApi({ path: this.prefix + this.encrypt.name, args: [plaintext, isShared] });
        }
        async decrypt(ciphertext, isShared) {
            return this.context.apiClient.callApi({ path: this.prefix + this.decrypt.name, args: [ciphertext, isShared] });
        }
    }
    class BgExtCryptoApiImpl {
        context;
        prefix = "crypto.ext.";
        constructor(context) {
            this.context = context;
        }
        async encrypt(plaintext) {
            return this.context.apiClient.callApi({ path: this.prefix + this.encrypt.name, args: [plaintext] });
        }
        async decrypt(ciphertext) {
            return this.context.apiClient.callApi({ path: this.prefix + this.decrypt.name, args: [ciphertext] });
        }
    }

    class BgFolderApiImpl {
        context;
        prefix = "folder.";
        constructor(context) {
            this.context = context;
        }
        async queryTree(query) {
            return this.context.apiClient.callApi({ path: this.prefix + this.queryTree.name, args: [query] });
        }
        async query(query) {
            return this.context.apiClient.callApi({ path: this.prefix + this.query.name, args: [query] });
        }
        async queryEditable(query) {
            return this.context.apiClient.callApi({ path: this.prefix + this.queryEditable.name, args: [query] });
        }
        async get(folderId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.get.name, args: [folderId] });
        }
    }

    class BgGeneratorApiImpl {
        context;
        prefix = "generator.";
        history;
        constructor(context) {
            this.context = context;
            this.history = new BgGeneratorHistoryApiImpl(context);
        }
        async generatePassword(input) {
            return this.context.apiClient.callApi({ path: this.prefix + this.generatePassword.name, args: [input] });
        }
        async getComplexity(password) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getComplexity.name, args: [password] });
        }
        async generatePolicyPassword(policyId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.generatePolicyPassword.name, args: [policyId] });
        }
        async generatePassphrase(input) {
            return this.context.apiClient.callApi({ path: this.prefix + this.generatePassphrase.name, args: [input] });
        }
    }
    class BgGeneratorHistoryApiImpl {
        context;
        prefix = "generator.history.";
        constructor(context) {
            this.context = context;
        }
        async get() {
            return this.context.apiClient.callApi({ path: this.prefix + this.get.name });
        }
        async clear() {
            return this.context.apiClient.callApi({ path: this.prefix + this.clear.name });
        }
        async add(password) {
            return this.context.apiClient.callApi({ path: this.prefix + this.add.name, args: [password] });
        }
    }

    class BgLoginApiImpl {
        context;
        prefix = "login.";
        constructor(context) {
            this.context = context;
        }
        async isLoggedIn() {
            return this.context.apiClient.callApi({ path: this.prefix + this.isLoggedIn.name, args: [] });
        }
        async isUnlocked() {
            return this.context.apiClient.callApi({ path: this.prefix + this.isUnlocked.name, args: [] });
        }
        async generateOauthTokens() {
            return this.context.apiClient.callApi({ path: this.prefix + this.generateOauthTokens.name, args: [] });
        }
        async refreshTokenIfExpired() {
            return this.context.apiClient.callApi({ path: this.prefix + this.refreshTokenIfExpired.name, args: [] });
        }
        async initLogin() {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.initLogin.name, args: [] }));
        }
        async unlock(passphrase) {
            return this.context.apiClient.callApi({ path: this.prefix + this.unlock.name, args: [passphrase] });
        }
        async lock() {
            return this.context.apiClient.callApi({ path: this.prefix + this.lock.name, args: [] });
        }
        async signOut() {
            return this.context.apiClient.callApi({ path: this.prefix + this.signOut.name, args: [] });
        }
        async checkConnectable() {
            return this.context.apiClient.isConnectable();
        }
    }

    class BgOtherApiImpl {
        context;
        prefix = "other.";
        constructor(context) {
            this.context = context;
        }
        async updateLastActive() {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateLastActive.name });
        }
        async copyToClipboard(text, options) {
            return this.context.apiClient.callApi({ path: this.prefix + this.copyToClipboard.name, args: [text, options] });
        }
        async getLogo(url) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getLogo.name, args: [url] });
        }
        async closeUnlockTab() {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeUnlockTab.name });
        }
        async sendRuntimeMessage(msg) {
            return this.context.apiClient.callApi({ path: this.prefix + this.sendRuntimeMessage.name, args: [msg] });
        }
        async clearClipboard() {
            return this.context.apiClient.callApi({ path: this.prefix + this.clearClipboard.name });
        }
        updateLogo(force) {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateLogo.name, args: [force] });
        }
        echo(x) {
            return this.context.apiClient.callApi({ path: this.prefix + this.echo.name, args: [x] });
        }
        sidePanelClosed() {
            return this.context.apiClient.callApi({ path: this.prefix + this.sidePanelClosed.name });
        }
        devToolsOpened(tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.devToolsOpened.name, args: [tabId] });
        }
        devToolsCloseTab() {
            return this.context.apiClient.callApi({ path: this.prefix + this.devToolsCloseTab.name });
        }
    }

    class BgPolicyApiImpl {
        context;
        prefix = "policy.";
        constructor(context) {
            this.context = context;
        }
        checkPolicyPassword(password, policyId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkPolicyPassword.name, args: [password, policyId] });
        }
        check(password) {
            return this.context.apiClient.callApi({ path: this.prefix + this.check.name, args: [password] });
        }
        getAll() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getAll.name });
        }
        get(policyId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.get.name, args: [policyId] });
        }
    }

    class BgSaveFrameApiImpl {
        context;
        prefix = "saveFrame.";
        constructor(context) {
            this.context = context;
        }
        async showSaveFrame() {
            return this.context.apiClient.callApi({ path: this.prefix + this.showSaveFrame.name });
        }
        async saveCredential(saveCredential) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveCredential.name, args: [saveCredential] });
        }
        async disableSavePassword() {
            return this.context.apiClient.callApi({ path: this.prefix + this.disableSavePassword.name });
        }
        async getData() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getData.name });
        }
        async saveSecret(saveFrameUserInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveSecret.name, args: [saveFrameUserInput] });
        }
        async editSecret(saveFrameUserInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.editSecret.name, args: [saveFrameUserInput] });
        }
        async closeSaveFrame(params) {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeSaveFrame.name, args: [params] });
        }
    }

    class BgSecretApiImpl {
        context;
        prefix = "secret.";
        edit;
        share;
        totp;
        file;
        history;
        constructor(context) {
            this.context = context;
            this.edit = new BgSecretEditApiImpl(context);
            this.share = new BgSecretShareApiImpl(context);
            this.totp = new BgSecretTotpApiImpl(context);
            this.file = new BgSecretFileApiImpl(context);
            this.history = new BgSecretHistoryApiImpl(context);
        }
        query(query) {
            return this.context.apiClient.callApi({ path: this.prefix + this.query.name, args: [query] });
        }
        add(secretAddInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.add.name, args: [secretAddInput] });
        }
        delete(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.delete.name, args: [secretId] });
        }
        async querySecrets(query) {
            return this.context.apiClient.callApi({ path: this.prefix + this.querySecrets.name, args: [query] });
        }
        async getSecret(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getSecret.name, args: [secretId] });
        }
        async getDbSecret(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getDbSecret.name, args: [secretId] });
        }
        async getServerSecret(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getServerSecret.name, args: [secretId] });
        }
        async getTrashedSecret(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getTrashedSecret.name, args: [secretId] });
        }
        async changeFavourite(secretId, favourite) {
            return this.context.apiClient.callApi({ path: this.prefix + this.changeFavourite.name, args: [secretId, favourite] });
        }
        async copyField(secretId, fieldName) {
            return this.context.apiClient.callApi({ path: this.prefix + this.copyField.name, args: [secretId, fieldName] });
        }
        async copyTotp(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.copyTotp.name, args: [secretId] });
        }
        async copyOneAuthTotp(secretId, totp) {
            return this.context.apiClient.callApi({ path: this.prefix + this.copyOneAuthTotp.name, args: [secretId, totp] });
        }
        async copyCustomColumn(secretId, columnId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.copyCustomColumn.name, args: [secretId, columnId] });
        }
        async login(secretId, url, incognito) {
            return this.context.apiClient.callApi({ path: this.prefix + this.login.name, args: [secretId, url, incognito] });
        }
        async loginFromWeb(secretId, url) {
            return this.context.apiClient.callApi({ path: this.prefix + this.loginFromWeb.name, args: [secretId, url] });
        }
        async deleteSecret(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.deleteSecret.name, args: [secretId] });
        }
        async downloadFile(secretId, fileId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.downloadFile.name, args: [secretId, fileId] });
        }
        async downloadAllFiles(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.downloadAllFiles.name, args: [secretId] });
        }
        async updateFiles(secretId, files) {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateFiles.name, args: [secretId, files] });
        }
        async resetPassword(secretId, fieldName) {
            return this.context.apiClient.callApi({ path: this.prefix + this.resetPassword.name, args: [secretId, fieldName] });
        }
        async generateTotp(totpUrl) {
            return this.context.apiClient.callApi({ path: this.prefix + this.generateTotp.name, args: [totpUrl] });
        }
        async getTotpParams(totpUrl) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getTotpParams.name, args: [totpUrl] });
        }
        async getDomainMatchingCount() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getDomainMatchingCount.name });
        }
        async getTotpOf(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getTotpOf.name, args: [secretId] });
        }
        async checkExistingPasswordName(name) {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkExistingPasswordName.name, args: [name] });
        }
        async checkPolicyFor(password) {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkPolicyFor.name, args: [password] });
        }
        async checkPasswordPolicy(password, policyId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkPasswordPolicy.name, args: [password, policyId] });
        }
        async queryTags(query) {
            return this.context.apiClient.callApi({ path: this.prefix + this.queryTags.name, args: [query] });
        }
        async getEditUIInput(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getEditUIInput.name, args: [secretId] });
        }
        async updateSecret(secretEditInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateSecret.name, args: [secretEditInput] });
        }
        async getUserUIInput(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getUserUIInput.name, args: [secretId] });
        }
        async updateUserSharing(sharingInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateUserSharing.name, args: [sharingInput] });
        }
        async reEncryptSecretForSharing(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.reEncryptSecretForSharing.name, args: [secretId] });
        }
        async getUserGroupUIInput(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getUserGroupUIInput.name, args: [secretId] });
        }
        async updateUserGroupSharing(sharingInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateUserGroupSharing.name, args: [sharingInput] });
        }
        async updateSecretInServer(input) {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateSecretInServer.name, args: [input] });
        }
        async getPasswordHistory(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getPasswordHistory.name, args: [secretId] });
        }
        async getColumnHistory(secretId, columnName) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getColumnHistory.name, args: [secretId, columnName] });
        }
        async getOneAuthTotp(oneauthId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getOneAuthTotp.name, args: [oneauthId] });
        }
        async getSearchHighlightField(secret, searchString) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getSearchHighlightField.name, args: [secret, searchString] });
        }
        async shareToThirdParty(thirdPartyShareInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.shareToThirdParty.name, args: [thirdPartyShareInput] });
        }
        async updateAutoLogin(secretId, enable) {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateAutoLogin.name, args: [secretId, enable] });
        }
        async suggestNewName(params) {
            return this.context.apiClient.callApi({ path: this.prefix + this.suggestNewName.name, args: [params] });
        }
        async getAddPasswordClassifications() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getAddPasswordClassifications.name });
        }
    }
    class BgSecretEditApiImpl {
        context;
        prefix = "secret.edit.";
        constructor(context) {
            this.context = context;
        }
        update(secretEditInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.update.name, args: [secretEditInput] });
        }
        getUIInput(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getUIInput.name, args: [secretId] });
        }
        setAutoLogin(secretId, enable) {
            return this.context.apiClient.callApi({ path: this.prefix + this.setAutoLogin.name, args: [secretId, enable] });
        }
        setFavourite(secretId, favourite) {
            return this.context.apiClient.callApi({ path: this.prefix + this.setFavourite.name, args: [secretId, favourite] });
        }
    }
    class BgSecretShareApiImpl {
        context;
        prefix = "secret.share.";
        user;
        userGroup;
        constructor(context) {
            this.context = context;
            this.user = new BgSecretShareUserApiImpl(context);
            this.userGroup = new BgSecretShareUserGroupApiImpl(context);
        }
        reEncryptSecretForSharing(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.reEncryptSecretForSharing.name, args: [secretId] });
        }
        async shareToThirdParty(thirdPartyShareInput) {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.shareToThirdParty.name, args: [thirdPartyShareInput] }));
        }
    }
    class BgSecretShareUserApiImpl {
        context;
        prefix = "secret.share.user.";
        constructor(context) {
            this.context = context;
        }
        getUIInput(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getUIInput.name, args: [secretId] });
        }
        update(sharingInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.update.name, args: [sharingInput] });
        }
    }
    class BgSecretShareUserGroupApiImpl {
        context;
        prefix = "secret.share.userGroup.";
        constructor(context) {
            this.context = context;
        }
        getUIInput(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getUIInput.name, args: [secretId] });
        }
        update(sharingInput) {
            return this.context.apiClient.callApi({ path: this.prefix + this.update.name, args: [sharingInput] });
        }
    }
    class BgSecretTotpApiImpl {
        context;
        prefix = "secret.totp.";
        constructor(context) {
            this.context = context;
        }
        copy(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.copy.name, args: [secretId] });
        }
        copyOneAuthTotp(secretId, totp) {
            return this.context.apiClient.callApi({ path: this.prefix + this.copyOneAuthTotp.name, args: [secretId, totp] });
        }
        generate(totpUrl) {
            return this.context.apiClient.callApi({ path: this.prefix + this.generate.name, args: [totpUrl] });
        }
        getParams(totpUrl) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getParams.name, args: [totpUrl] });
        }
        getTotp(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getTotp.name, args: [secretId] });
        }
        getOneAuthTotp(oneauthId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getOneAuthTotp.name, args: [oneauthId] });
        }
    }
    class BgSecretFileApiImpl {
        context;
        prefix = "secret.file.";
        constructor(context) {
            this.context = context;
        }
        download(secretId, fileId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.download.name, args: [secretId, fileId] });
        }
        downloadAll(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.downloadAll.name, args: [secretId] });
        }
        update(secretId, files) {
            return this.context.apiClient.callApi({ path: this.prefix + this.update.name, args: [secretId, files] });
        }
    }
    class BgSecretHistoryApiImpl {
        context;
        prefix = "secret.history.";
        constructor(context) {
            this.context = context;
        }
        getPasswordHistory(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getPasswordHistory.name, args: [secretId] });
        }
        getColumnHistory(secretId, columnName) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getColumnHistory.name, args: [secretId, columnName] });
        }
    }

    class BgSecretTypeApiImpl {
        context;
        prefix = "secretType.";
        constructor(context) {
            this.context = context;
        }
        async getAll() {
            return await this.context.apiClient.callApi({ path: this.prefix + this.getAll.name });
        }
        async get(typeId) {
            return await this.context.apiClient.callApi({ path: this.prefix + this.get.name, args: [typeId] });
        }
        async getMap() {
            return await this.context.apiClient.callApi({ path: this.prefix + this.getMap.name });
        }
        async getCountMap() {
            return await this.context.apiClient.callApi({ path: this.prefix + this.getCountMap.name });
        }
    }

    class BgSessionApiImpl {
        context;
        prefix = "session.";
        constructor(context) {
            this.context = context;
        }
        async saveAll(keyValObj) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveAll.name, args: [keyValObj] });
        }
        async loadAll(keyObj) {
            return this.context.apiClient.callApi({ path: this.prefix + this.loadAll.name, args: [keyObj] });
        }
        async remove(keyOrKeys) {
            return this.context.apiClient.callApi({ path: this.prefix + this.remove.name, args: [keyOrKeys] });
        }
        async clear() {
            return this.context.apiClient.callApi({ path: this.prefix + this.clear.name });
        }
    }

    class BgSettingsApiImpl {
        context;
        prefix = "settings.";
        neverSave;
        constructor(context) {
            this.context = context;
            this.neverSave = new BgSettingsNeverSaveApiImpl(context);
        }
        change(name, value) {
            return this.context.apiClient.callApi({ path: this.prefix + this.change.name, args: [name, value] });
        }
        setFont(font) {
            return this.context.apiClient.callApi({ path: this.prefix + this.setFont.name, args: [font] });
        }
        setDarkMode(enable) {
            return this.context.apiClient.callApi({ path: this.prefix + this.setDarkMode.name, args: [enable] });
        }
        isSystemLockSupported() {
            return this.context.apiClient.callApi({ path: this.prefix + this.isSystemLockSupported.name });
        }
        setThemeColor(color) {
            return this.context.apiClient.callApi({ path: this.prefix + this.setThemeColor.name, args: [color] });
        }
    }
    class BgSettingsNeverSaveApiImpl {
        context;
        prefix = "settings.neverSave.";
        constructor(context) {
            this.context = context;
        }
        async add(domain) {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.add.name, args: [domain] }));
        }
        async remove(domain) {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.remove.name, args: [domain] }));
        }
        getAll() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getAll.name });
        }
        isPresent(domain) {
            return this.context.apiClient.callApi({ path: this.prefix + this.isPresent.name, args: [domain] });
        }
    }

    class BgSiteFrameApiImpl {
        context;
        prefix = "siteFrame.";
        constructor(context) {
            this.context = context;
        }
        async showSiteFrame() {
            return this.context.apiClient.callApi({ path: this.prefix + this.showSiteFrame.name });
        }
        async closeSiteFrame(params = {}) {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeSiteFrame.name, args: [params] });
        }
        async getSecrets(siteFrameSecretQuery) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getSecrets.name, args: [siteFrameSecretQuery] });
        }
        async frameLogin(secretId, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.frameLogin.name, args: [secretId, frameId] });
        }
        async fillSecret(secretId, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillSecret.name, args: [secretId, frameId] });
        }
        async fillTotp(secretId, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillTotp.name, args: [secretId, frameId] });
        }
        async fillOneAuthTotp(secretId, oneauthId, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillOneAuthTotp.name, args: [secretId, oneauthId, frameId] });
        }
        async fillField(secretId, fieldName, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillField.name, args: [secretId, fieldName, frameId] });
        }
        async fillCustomCol(secretId, fieldName, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillCustomCol.name, args: [secretId, fieldName, frameId] });
        }
        async fillGeneratedPassword(value, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.fillGeneratedPassword.name, args: [value, frameId] });
        }
        async saveGeneratedPassword(password, frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveGeneratedPassword.name, args: [password, frameId] });
        }
        async openUnlockVaultPage() {
            return this.context.apiClient.callApi({ path: this.prefix + this.openUnlockVaultPage.name });
        }
        async addPassword(frameId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.addPassword.name, args: [frameId] });
        }
        async isDomainMatchingId(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.isDomainMatchingId.name, args: [secretId] });
        }
    }

    class BgTabApiImpl {
        context;
        prefix = "tab.";
        constructor(context) {
            this.context = context;
        }
        async loadFromMemory(key, defaultVal) {
            return this.context.apiClient.callApi({ path: this.prefix + this.loadFromMemory.name, args: [key, defaultVal] });
        }
        async loadFromDomainMemory(key, defaultVal) {
            return this.context.apiClient.callApi({ path: this.prefix + this.loadFromDomainMemory.name, args: [key, defaultVal] });
        }
        async saveToMemory(key, val) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveToMemory.name, args: [key, val] });
        }
        async saveToDomainMemory(key, val, allowedDomains) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveToDomainMemory.name, args: [key, val, allowedDomains] });
        }
        async removeFromMemory(key) {
            return this.context.apiClient.callApi({ path: this.prefix + this.removeFromMemory.name, args: [key] });
        }
        async clearMemory() {
            return this.context.apiClient.callApi({ path: this.prefix + this.clearMemory.name });
        }
        async showConfirmFrame() {
            return this.context.apiClient.callApi({ path: this.prefix + this.showConfirmFrame.name });
        }
        async closeFrame() {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeFrame.name });
        }
        async getFrameId() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getFrameId.name });
        }
        async getTabDomain() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getTabDomain.name });
        }
        async getTabUrl() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getTabUrl.name });
        }
        async saveZIconSelector(selector) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveZIconSelector.name, args: [selector] });
        }
        async loadZIconSelectors() {
            return this.context.apiClient.callApi({ path: this.prefix + this.loadZIconSelectors.name });
        }
        async isNeverSaveUrl() {
            return this.context.apiClient.callApi({ path: this.prefix + this.isNeverSaveUrl.name });
        }
        async allowPermanentUse(secretId, allowedUrl) {
            return this.context.apiClient.callApi({ path: this.prefix + this.allowPermanentUse.name, args: [secretId, allowedUrl] });
        }
        async finishReset(successfull) {
            return this.context.apiClient.callApi({ path: this.prefix + this.finishReset.name, args: [successfull] });
        }
        async setConfirmUse(frameId, allow) {
            return this.context.apiClient.callApi({ path: this.prefix + this.setConfirmUse.name, args: [frameId, allow] });
        }
        async closeTab() {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeTab.name });
        }
        async closeTabWithId(tabId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeTabWithId.name, args: [tabId] });
        }
        async checkDevToolsOpen() {
            return this.context.apiClient.callApi({ path: this.prefix + this.checkDevToolsOpen.name });
        }
        async showAlert(config) {
            return this.context.apiClient.callApi({ path: this.prefix + this.showAlert.name, args: [config] });
        }
        async checkConnectable() {
            return this.context.apiClient.isConnectable();
        }
        downloadFileInCS(param) {
            return this.context.apiClient.callApi({ path: this.prefix + this.downloadFileInCS.name, args: [param] });
        }
        async loadZMapsCountries() {
            return this.context.apiClient.callApi({ path: this.prefix + this.loadZMapsCountries.name });
        }
        async loadZMapsStates(country) {
            return this.context.apiClient.callApi({ path: this.prefix + this.loadZMapsStates.name, args: [country] });
        }
        async loadZMapsDistricts(country, state) {
            return this.context.apiClient.callApi({ path: this.prefix + this.loadZMapsDistricts.name, args: [country, state] });
        }
        async saveNewCountry(country) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveNewCountry.name, args: [country] });
        }
        async saveNewState(country, state) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveNewState.name, args: [country, state] });
        }
        async saveNewCity(country, state, city) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveNewCity.name, args: [country, state, city] });
        }
        isLoginDomainPath() {
            return this.context.apiClient.callApi({ path: this.prefix + this.isLoginDomainPath.name });
        }
        hasDevToolsOpened() {
            return this.context.apiClient.callApi({ path: this.prefix + this.hasDevToolsOpened.name });
        }
    }

    class BgTrashApiImpl {
        context;
        prefix = "trash.";
        constructor(context) {
            this.context = context;
        }
        async queryTrash(query) {
            return this.context.apiClient.callApi({ path: this.prefix + this.queryTrash.name, args: [query] });
        }
        async deletePermanent(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.deletePermanent.name, args: [secretId] });
        }
        async restoreSecret(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.restoreSecret.name, args: [secretId] });
        }
        async emptyTrash() {
            return this.context.apiClient.callApi({ path: this.prefix + this.emptyTrash.name });
        }
    }

    class BgUnlockApiImpl {
        context;
        prefix = "unlock.";
        oneauth;
        webauthn;
        constructor(context) {
            this.context = context;
            this.oneauth = new BgOneAuthUnlockApiImpl(context);
            this.webauthn = new BgWebauthnUnlockApiImpl(context);
        }
        async getLastUsedUnlock() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getLastUsedUnlock.name });
        }
        async setLastUnlock(method) {
            return this.context.apiClient.callApi({ path: this.prefix + this.setLastUnlock.name, args: [method] });
        }
    }
    class BgOneAuthUnlockApiImpl {
        context;
        prefix = "unlock.oneauth.";
        constructor(context) {
            this.context = context;
        }
        resendPush() {
            return this.context.apiClient.callApi({ path: this.prefix + this.resendPush.name });
        }
        async enable(enable) {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.enable.name, args: [enable] }));
        }
        isUnlockable() {
            return this.context.apiClient.callApi({ path: this.prefix + this.isUnlockable.name });
        }
        unlock() {
            return this.context.apiClient.callApi({ path: this.prefix + this.unlock.name });
        }
    }
    class BgWebauthnUnlockApiImpl {
        context;
        prefix = "unlock.webauthn.";
        constructor(context) {
            this.context = context;
        }
        async setWebAuthnCredential(credential) {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.setWebAuthnCredential.name, args: [credential] }));
        }
        async getCredentialCount() {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.getCredentialCount.name }));
        }
        async enable(enable) {
            return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.enable.name, args: [enable] }));
        }
        isUnlockable() {
            return this.context.apiClient.callApi({ path: this.prefix + this.isUnlockable.name });
        }
        unlock() {
            return this.context.apiClient.callApi({ path: this.prefix + this.unlock.name });
        }
    }

    class BgUpdateFrameApiImpl {
        context;
        prefix = "updateFrame.";
        constructor(context) {
            this.context = context;
        }
        async showUpdateFrame() {
            return this.context.apiClient.callApi({ path: this.prefix + this.showUpdateFrame.name });
        }
        async saveChangedCredential(changedCredential) {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveChangedCredential.name, args: [changedCredential] });
        }
        async updateChangedLoginPassword(changedLoginPassword) {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateChangedLoginPassword.name, args: [changedLoginPassword] });
        }
        async getData() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getData.name });
        }
        async updateSecret() {
            return this.context.apiClient.callApi({ path: this.prefix + this.updateSecret.name });
        }
        async editSecret() {
            return this.context.apiClient.callApi({ path: this.prefix + this.editSecret.name });
        }
        async saveAsNew() {
            return this.context.apiClient.callApi({ path: this.prefix + this.saveAsNew.name });
        }
        async closeUpdateFrame(params) {
            return this.context.apiClient.callApi({ path: this.prefix + this.closeUpdateFrame.name, args: [params] });
        }
    }

    class BgUserApiImpl {
        context;
        prefix = "user.";
        constructor(context) {
            this.context = context;
        }
        getDp() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getDp.name });
        }
        getDpSized(size) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getDpSized.name, args: [size] });
        }
        getDpOf(zuid) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getDpOf.name, args: [zuid] });
        }
        searchUsers(searchString) {
            return this.context.apiClient.callApi({ path: this.prefix + this.searchUsers.name, args: [searchString] });
        }
        searchAdmins(searchString) {
            return this.context.apiClient.callApi({ path: this.prefix + this.searchAdmins.name, args: [searchString] });
        }
    }

    class BgVaultApiImpl {
        context;
        prefix = "vault.";
        constructor(context) {
            this.context = context;
        }
        async openWebUI({ route = "" } = {}) {
            return this.context.apiClient.callApi({ path: this.prefix + this.openWebUI.name, args: [{ route }] });
        }
        async sync() {
            return this.context.apiClient.callApi({ path: this.prefix + this.sync.name });
        }
        async getUrl() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getUrl.name });
        }
        async getDomain() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getDomain.name });
        }
        async lock() {
            return this.context.apiClient.callApi({ path: this.prefix + this.lock.name });
        }
        async signOut() {
            return this.context.apiClient.callApi({ path: this.prefix + this.signOut.name });
        }
        async syncConfig() {
            return this.context.apiClient.callApi({ path: this.prefix + this.syncConfig.name });
        }
        async syncThemeFromWeb() {
            return this.context.apiClient.callApi({ path: this.prefix + this.syncThemeFromWeb.name });
        }
    }

    class BgVaultWebApiImpl {
        context;
        prefix = "vaultWeb.";
        constructor(context) {
            this.context = context;
        }
        async syncSecret(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.syncSecret.name, args: [secretId] });
        }
        async deleteLocalSecrets(secretIds) {
            return this.context.apiClient.callApi({ path: this.prefix + this.deleteLocalSecrets.name, args: [secretIds] });
        }
        async getWebUnlockKey() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getWebUnlockKey.name });
        }
        async getAfterUnlockRoute() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getAfterUnlockRoute.name });
        }
    }

    class BgZTabApiImpl {
        context;
        prefix = "ztab.";
        constructor(context) {
            this.context = context;
        }
        async openZTab() {
            this.context.apiClient.callApi({ path: this.prefix + this.openZTab.name });
        }
        async closeZTab() {
            this.context.apiClient.callApi({ path: this.prefix + this.closeZTab.name });
        }
        async addPassword(prefillInput) {
            this.context.apiClient.callApi({ path: this.prefix + this.addPassword.name, args: [prefillInput] });
        }
        async addPaymentCard(prefillInput) {
            this.context.apiClient.callApi({ path: this.prefix + this.addPaymentCard.name, args: [prefillInput] });
        }
        async editPaymentCard(prefillInput, secretId) {
            this.context.apiClient.callApi({ path: this.prefix + this.editPaymentCard.name, args: [prefillInput, secretId] });
        }
        async sharePassword(secretId) {
            this.context.apiClient.callApi({ path: this.prefix + this.sharePassword.name, args: [secretId] });
        }
        async editPassword(secretId) {
            this.context.apiClient.callApi({ path: this.prefix + this.editPassword.name, args: [secretId] });
        }
        async enableAccessControl(secretId) {
            this.context.apiClient.callApi({ path: this.prefix + this.enableAccessControl.name, args: [secretId] });
        }
        async manageAccessControl(secretId) {
            this.context.apiClient.callApi({ path: this.prefix + this.manageAccessControl.name, args: [secretId] });
        }
        async saveGeneratedPassword(password) {
            this.context.apiClient.callApi({ path: this.prefix + this.saveGeneratedPassword.name, args: [password] });
        }
        async getZTabTask() {
            return this.context.apiClient.callApi({ path: this.prefix + this.getZTabTask.name });
        }
        async getSecretAccess(secretId) {
            return this.context.apiClient.callApi({ path: this.prefix + this.getSecretAccess.name, args: [secretId] });
        }
        async openSettings() {
            return this.context.apiClient.callApi({ path: this.prefix + this.openSettings.name });
        }
        async addAddress() {
            return this.context.apiClient.callApi({ path: this.prefix + this.addAddress.name });
        }
    }

    class BgApiImpl {
        static instance = null;
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return this.instance = new BgApiImpl();
        }
        context = new BgApiContext();
        audit = new BgAuditApiImpl(this.context);
        accessCtrl = new BgAccessCtrlApiImpl(this.context);
        crypto = new BgCryptoApiImpl(this.context);
        settings = new BgSettingsApiImpl(this.context);
        siteFrame = new BgSiteFrameApiImpl(this.context);
        policy = new BgPolicyApiImpl(this.context);
        secret = new BgSecretApiImpl(this.context);
        secretType = new BgSecretTypeApiImpl(this.context);
        folder = new BgFolderApiImpl(this.context);
        unlock = new BgUnlockApiImpl(this.context);
        generator = new BgGeneratorApiImpl(this.context);
        login = new BgLoginApiImpl(this.context);
        cardFrame = new BgCardFrameApiImpl(this.context);
        tab = new BgTabApiImpl(this.context);
        other = new BgOtherApiImpl(this.context);
        saveFrame = new BgSaveFrameApiImpl(this.context);
        session = new BgSessionApiImpl(this.context);
        ztab = new BgZTabApiImpl(this.context);
        updateFrame = new BgUpdateFrameApiImpl(this.context);
        vault = new BgVaultApiImpl(this.context);
        trash = new BgTrashApiImpl(this.context);
        user = new BgUserApiImpl(this.context);
        vaultWeb = new BgVaultWebApiImpl(this.context);
        async init() {
            try {
                const isInitialized = Boolean(this.context.apiClient);
                if (isInitialized) {
                    return;
                }
                const apiClient = this.context.apiClient = portApi.createApiClient();
                await apiClient.init({ name: VtApiPortNames.BG, checkConnectionBeforeApiCall: true });
            }
            catch (e) {
                logError(e);
            }
        }
    }

    function main$3() {
        globalThis.bgApi = BgApiImpl.getInstance();
    }

    class BrUtil {
        checkManifestV2() {
            try {
                return chrome.runtime.getManifest()["manifest_version"] == 2;
            }
            catch (e) {
                return false;
            }
        }
        createCallback(res, rej) {
            return function (resp) {
                chrome.runtime.lastError ? rej(chrome.runtime.lastError.message) : res(resp);
            };
        }
    }

    let GG$2 = class GG {
        brApi;
        util = new BrUtil();
    };
    const gg$2 = new GG$2();

    var ZVRuntimeMsgType;
    (function (ZVRuntimeMsgType) {
        ZVRuntimeMsgType["EVENT_MSG"] = "EVENT_MSG";
        ZVRuntimeMsgType["API_MSG"] = "API_MSG";
    })(ZVRuntimeMsgType || (ZVRuntimeMsgType = {}));
    var ZVRuntimeApiMsgType;
    (function (ZVRuntimeApiMsgType) {
        ZVRuntimeApiMsgType["REQUEST_MSG"] = "REQUEST_MSG";
        ZVRuntimeApiMsgType["RESPONSE_MSG"] = "RESPONSE_MSG";
    })(ZVRuntimeApiMsgType || (ZVRuntimeApiMsgType = {}));

    class ScopeFnGetter {
        fnObj;
        constructor(fnObj) {
            this.fnObj = fnObj;
        }
        getFn(fnPath) {
            try {
                let parentObj = null;
                let fn = this.fnObj;
                let iteratorResult = null;
                const iterator = fnPath.split(".")[Symbol.iterator]();
                while (fn) {
                    iteratorResult = iterator.next();
                    if (iteratorResult.done) {
                        break;
                    }
                    parentObj = fn;
                    fn = fn[iteratorResult.value];
                }
                if (typeof fn != "function") {
                    return null;
                }
                return { fn, parentObj };
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }

    class MsgEventClient {
        needOrigin = false;
        needUrl = false;
        fnGetter = null;
        scope = "";
        constructor() {
            js.fn.bindThis(this, [this.onMessage]);
        }
        init(scope, fnObj) {
            chrome.runtime.onMessage.addListener(this.onMessage);
            this.fnGetter = new ScopeFnGetter(fnObj);
            this.scope = scope;
        }
        onMessage(msg, sender) {
            try {
                if (msg.type != ZVRuntimeMsgType.EVENT_MSG) {
                    return;
                }
                this.initCheck(sender);
                if (!this.isValidSender(sender)) {
                    return;
                }
                const eventMsg = msg.value;
                if (eventMsg.scope != this.scope) {
                    return;
                }
                const event = eventMsg.event;
                const fnResult = this.fnGetter.getFn(event.path);
                if (!fnResult) {
                    return;
                }
                const { fn, parentObj } = fnResult;
                fn.apply(parentObj, event.args);
            }
            catch (e) {
                logError(e);
            }
        }
        initCheck(sender) {
            this.initCheck = js.fn.emptyFn;
            this.needOrigin = Boolean(sender.origin);
            this.needUrl = Boolean(sender.url);
        }
        isValidSender(sender) {
            try {
                if (this.needOrigin != Boolean(sender.origin)) {
                    return false;
                }
                if (this.needUrl != Boolean(sender.url)) {
                    return false;
                }
                return true;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class MsgEventServer {
        scope = "";
        init(scope) {
            this.scope = scope;
        }
        async dispatch(eventPath, eventArgs = null) {
            try {
                const msg = this.getEventMsg(eventPath, eventArgs);
                try {
                    chrome.runtime.sendMessage(msg, null, function () { chrome.runtime.lastError; });
                }
                catch (e) { }
                const tabs = await gg$2.brApi.tab.getAllTabs();
                for (let tab of tabs) {
                    try {
                        chrome.tabs.sendMessage(tab.id, msg, null, function () { chrome.runtime.lastError; });
                    }
                    catch (e) { }
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getEventMsg(eventPath, eventArgs) {
            try {
                return {
                    type: ZVRuntimeMsgType.EVENT_MSG,
                    value: {
                        scope: this.scope,
                        event: { path: eventPath, args: eventArgs }
                    }
                };
            }
            catch (e) {
                logError(e);
                throw "FAILED_TO_GET_EVENT_MSG";
            }
        }
    }

    class MsgFnClient {
        to;
        checkConnectionBeforeApiCall = false;
        async init(param) {
            try {
                if (!param.name) {
                    throw "param.name null";
                }
                this.to = param.name;
                this.checkConnectionBeforeApiCall = param.checkConnectionBeforeApiCall;
            }
            catch (e) {
                logError(e);
            }
        }
        async isConnectable(param = null) {
            try {
                await this.callApiFn({ path: "", connect: param });
                return true;
            }
            catch (e) {
                return false;
            }
        }
        async callApi(param) {
            try {
                if (this.checkConnectionBeforeApiCall) {
                    await this.waitForConnection(param.connect);
                }
                return this.callApiFn(param);
            }
            catch (e) {
                logError(e);
            }
        }
        async callApiFn(param) {
            try {
                const { path, args } = param;
                const msg = {
                    type: ZVRuntimeMsgType.API_MSG,
                    value: {
                        type: ZVRuntimeApiMsgType.REQUEST_MSG,
                        value: { to: this.to, path, args },
                    }
                };
                return this.sendMessage(msg, param);
            }
            catch (e) {
                logError(e);
            }
        }
        async waitForConnection(param) {
            try {
                const delaySeconds = 0.3;
                for (let i = 0; i < 1e5; i++) {
                    if (await this.isConnectable(param)) {
                        return;
                    }
                    await js.time.delay(delaySeconds);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        sendMessage(msg, param) {
            try {
                const replyHandler = new ReplyHandler(this.to);
                if (!param.connect) {
                    chrome.runtime.sendMessage(msg, null, replyHandler.onReply);
                    return replyHandler.promise;
                }
                chrome.tabs.sendMessage(param.connect.tabId, msg, { frameId: param.connect.frameId ?? 0 }, replyHandler.onReply);
                return replyHandler.promise;
            }
            catch (e) {
                logError(e);
                throw "UNABLE_TO_SEND_MESSAGE";
            }
        }
    }
    class ReplyHandler {
        name;
        promise;
        constructor(name) {
            this.name = name;
            this.promise = js.promise.createNew();
            js.fn.bindThis(this, [this.onReply]);
        }
        onReply(msg) {
            try {
                if (chrome.runtime.lastError || !msg) {
                    const errorMsg = chrome.runtime.lastError || "UNABLE_TO_CONNECT: " + this.name;
                    this.promise.reject(errorMsg);
                    return;
                }
                const respVal = msg.result;
                const value = fnOut.getResult(respVal);
                if (!respVal.ok) {
                    this.promise.reject(value);
                    return;
                }
                this.promise.resolve(value);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class MsgFnServer {
        name = "";
        fnGetter = null;
        constructor() {
            js.fn.bindThis(this, [this.onMessage]);
        }
        init(param) {
            try {
                if (!param.name) {
                    throw "param.name null";
                }
                if (!param.fnObj) {
                    throw "param.fnObj null";
                }
                this.name = param.name;
                this.fnGetter = new ScopeFnGetter(param.fnObj);
                gg$2.brApi.runtime.onMessage(this.onMessage);
            }
            catch (e) {
                logError(e);
            }
        }
        disconnect() {
            gg$2.brApi.runtime.removeOnMessageListener(this.onMessage);
        }
        onMessage(msg, sender, sendResponse) {
            try {
                if (msg.type != ZVRuntimeMsgType.API_MSG) {
                    return false;
                }
                const apiMsg = msg.value;
                if (apiMsg.type != ZVRuntimeApiMsgType.REQUEST_MSG) {
                    return false;
                }
                const apiReqMsg = apiMsg.value;
                if (apiReqMsg.to != this.name) {
                    return false;
                }
                this.callApi(apiReqMsg, sender, sendResponse);
                return true;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async callApi(msg, sender, sendResponse) {
            try {
                if (msg.path.length == 0) {
                    sendResponse(this.getResponseMsg(fnOut.OK));
                    return;
                }
                const fnResult = this.fnGetter.getFn(msg.path);
                if (!fnResult) {
                    sendResponse(this.getResponseMsg(fnOut.error("FN_NOT_FOUND: " + JSON.stringify(msg.path))));
                    return;
                }
                const { fn, parentObj } = fnResult;
                msg.args = msg.args || [];
                msg.args.push(sender);
                const value = await fn.apply(parentObj, msg.args);
                sendResponse(this.getResponseMsg(fnOut.result(value)));
            }
            catch (e) {
                sendResponse(this.getResponseMsg(fnOut.error(e)));
                logError(e);
            }
        }
        getResponseMsg(result) {
            try {
                const msg = {
                    result
                };
                return msg;
            }
            catch (e) {
                logError(e);
                throw "UNABLE_TO_GET_RESPONSE_MSG";
            }
        }
    }

    class PortApiImpl {
        createApiServer() {
            return new MsgFnServer();
        }
        createApiClient() {
            return new MsgFnClient();
        }
        createEventServer() {
            return new MsgEventServer();
        }
        createEventClient() {
            return new MsgEventClient();
        }
    }

    const WHITE_COLOR = "white";
    class BrActionApiImpl {
        static getInstance(isV2) {
            return isV2 ? new BrActionApiImplV2() : new BrActionApiImpl();
        }
        setIcon(pathObj) {
            chrome.action.setIcon({ path: pathObj });
        }
        setTitle(title) {
            chrome.action.setTitle({ title });
        }
        setBadgeColor(color) {
            chrome.action.setBadgeBackgroundColor({ color });
            if (chrome.action.setBadgeTextColor) {
                chrome.action.setBadgeTextColor({ color: WHITE_COLOR });
            }
        }
        setBadgeText(text) {
            chrome.action.setBadgeText({ text });
        }
    }
    class BrActionApiImplV2 {
        setIcon(pathObj) {
            chrome.browserAction.setIcon({ path: pathObj });
        }
        setTitle(title) {
            chrome.browserAction.setTitle({ title });
        }
        setBadgeColor(color) {
            chrome.browserAction.setBadgeBackgroundColor({ color });
            if (globalThis.browser && globalThis.browser.browserAction.setBadgeTextColor) {
                globalThis.browser.browserAction.setBadgeTextColor({ color: WHITE_COLOR });
            }
        }
        setBadgeText(text) {
            chrome.browserAction.setBadgeText({ text });
        }
    }

    class BrAlarmApiImpl {
        static getInstance(isV2) {
            return isV2 ? new BrAlarmApiImplV2() : new BrAlarmApiImpl();
        }
        async createAlarm(alarmName, delaySeconds, removePrevious = true) {
            if (removePrevious) {
                await this.clearAlarm(alarmName);
            }
            chrome.alarms.create(alarmName, { when: Date.now() + (delaySeconds * 1000) });
        }
        async clearAlarm(alarmName) {
            await chrome.alarms.clear(alarmName);
        }
        async clearAll() {
            await chrome.alarms.clearAll();
        }
        listenAlarms(listener) {
            chrome.alarms.onAlarm.addListener(listener);
        }
    }
    class BrAlarmApiImplV2 {
        listeners = [];
        timeoutIds = {};
        constructor() {
            this.handleAlarm = this.handleAlarm.bind(this);
        }
        async createAlarm(alarmName, delaySeconds, removePrevious = true) {
            if (removePrevious) {
                clearTimeout(this.timeoutIds[alarmName]);
            }
            this.timeoutIds[alarmName] = setTimeout(this.handleAlarm, delaySeconds * 1000, alarmName);
        }
        async clearAlarm(alarmName) {
            clearTimeout(this.timeoutIds[alarmName]);
        }
        async clearAll() {
            for (let key in this.timeoutIds) {
                clearTimeout(this.timeoutIds[key]);
            }
        }
        listenAlarms(listener) {
            this.listeners.push(listener);
        }
        handleAlarm(alarmName) {
            this.listeners.forEach(x => x({ name: alarmName }));
        }
    }

    class BrContextMenuApiImpl {
        async create(createInfo) {
            return new Promise((res, rej) => chrome.contextMenus.create(createInfo, gg$2.util.createCallback(res, rej)));
        }
        async removeAll() {
            return new Promise((res, rej) => chrome.contextMenus.removeAll(gg$2.util.createCallback(res, rej)));
        }
        onClick(listener) {
            chrome.contextMenus.onClicked.addListener(listener);
        }
    }

    class BrI18nApiImpl {
        text(key, ...placeholders) {
            return brI18n(key, placeholders);
        }
        textOf(key, placeholders) {
            return brI18n(key, placeholders);
        }
        html(key, ...contentList) {
            try {
                const placeholders = contentList.map((_x, index) => `{${index}}`);
                const text = this.textOf(key, placeholders);
                const textParts = text.split(/\{\d+\}/);
                const fillOrder = this.getFillOrder(text);
                const fragment = document.createDocumentFragment();
                fragment.append(textParts[0]);
                for (let i = 1, fillI = 0; i < textParts.length; i++) {
                    fragment.append(contentList[fillOrder[fillI++]]);
                    fragment.append(textParts[i]);
                }
                return fragment;
            }
            catch (e) {
                logError(e);
                return document.createDocumentFragment();
            }
        }
        getFillOrder(s) {
            try {
                const regex = /\{(\d+)\}/g;
                const order = [];
                for (let match of s.matchAll(regex)) {
                    order.push(parseInt(match[1]));
                }
                return order;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
    }
    function brI18n(key, placeholders) {
        return chrome.i18n.getMessage(key, placeholders) || key;
    }

    class BrOmniboxApiImpl {
        onInputChanged(listener) {
            try {
                chrome?.omnibox?.onInputChanged?.addListener?.(listener);
            }
            catch (e) {
                logError(e);
            }
        }
        onInputEntered(listener) {
            try {
                chrome?.omnibox?.onInputEntered?.addListener?.(listener);
            }
            catch (e) {
                logError(e);
            }
        }
        onInputStarted(listener) {
            try {
                chrome?.omnibox?.onInputStarted?.addListener?.(listener);
            }
            catch (e) {
                logError(e);
            }
        }
        setDefaultSuggestion(suggestion) {
            try {
                chrome.omnibox.setDefaultSuggestion(suggestion);
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class BrOtherApiImpl {
        disablePasswordSaving() {
            try {
                if (chrome.privacy) {
                    chrome.privacy.services.passwordSavingEnabled.set({ value: false });
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }
    class BrWindowsApiImpl {
        async update(windowId, updateParams) {
            return chrome.windows.update(windowId, updateParams);
        }
        query(query = null) {
            return new Promise((res, rej) => chrome.windows.getAll(query, gg$2.util.createCallback(res, rej)));
        }
    }
    class BrNotificationApiImpl {
        async create(name, createOption) {
            return chrome.notifications.create(name, createOption);
        }
        async clear(name) {
            return chrome.notifications.clear(name);
        }
    }
    class BrIdleApiImpl {
        onIdle(listener) {
            if (chrome.idle) {
                chrome.idle.onStateChanged.addListener(listener);
            }
        }
        setDetectionIntervalSeconds(seconds) {
            if (chrome.idle) {
                chrome.idle.setDetectionInterval(seconds);
            }
        }
    }
    class BrCookieApiImpl {
        onCookieChange(listener) {
            chrome.cookies.onChanged.addListener(listener);
        }
        getCookie(name, url) {
            return new Promise((res, rej) => chrome.cookies.get({ name, url }, gg$2.util.createCallback(res, rej)));
        }
        async getCookieStore(storeId) {
            try {
                const stores = await new Promise((res, rej) => chrome.cookies.getAllCookieStores(gg$2.util.createCallback(res, rej)));
                const reqStore = stores.find(x => x.id == storeId);
                return reqStore;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }
    class BrSidePanelApiImpl {
        static getInstance(isV2) {
            return isV2 ? new BrSidePanelApiImplV2() : new BrSidePanelApiImpl();
        }
        open(options) {
            return chrome?.sidePanel?.open?.(options);
        }
        isSupported() {
            return Boolean(chrome.sidePanel);
        }
    }
    class BrSidePanelApiImplV2 {
        open(_options) { }
        isSupported() {
            return false;
        }
    }
    class BrDomApiImpl {
        static getInstance(isV2) {
            return isV2 ? new BrDomApiImplV2() : new BrDomApiImpl();
        }
        getShadowRoot(elem) {
            return chrome.dom.openOrClosedShadowRoot(elem);
        }
    }
    class BrDomApiImplV2 {
        getShadowRoot(elem) {
            return elem.openOrClosedShadowRoot;
        }
    }

    var BrIdleState;
    (function (BrIdleState) {
        BrIdleState["ACTIVE"] = "active";
        BrIdleState["IDLE"] = "idle";
        BrIdleState["LOCKED"] = "locked";
    })(BrIdleState || (BrIdleState = {}));
    var BrTabStatus;
    (function (BrTabStatus) {
        BrTabStatus["LOADING"] = "loading";
        BrTabStatus["COMPLETE"] = "complete";
    })(BrTabStatus || (BrTabStatus = {}));
    var BrPlatforms;
    (function (BrPlatforms) {
        BrPlatforms["LINUX"] = "linux";
        BrPlatforms["MAC"] = "mac";
        BrPlatforms["WINDOWS"] = "win";
        BrPlatforms["OTHER"] = "other";
    })(BrPlatforms || (BrPlatforms = {}));
    var BrContextMenuContextType;
    (function (BrContextMenuContextType) {
        BrContextMenuContextType["ALL"] = "all";
        BrContextMenuContextType["PAGE"] = "page";
        BrContextMenuContextType["FRAME"] = "frame";
        BrContextMenuContextType["EDITABLE"] = "editable";
        BrContextMenuContextType["SELECTION"] = "selection";
    })(BrContextMenuContextType || (BrContextMenuContextType = {}));
    var BrContextMenuType;
    (function (BrContextMenuType) {
        BrContextMenuType["NORMAL"] = "normal";
        BrContextMenuType["SEPARATOR"] = "separator";
    })(BrContextMenuType || (BrContextMenuType = {}));
    var BrWindowTypes;
    (function (BrWindowTypes) {
        BrWindowTypes["NORMAL"] = "normal";
        BrWindowTypes["DEV_TOOLS"] = "devtools";
    })(BrWindowTypes || (BrWindowTypes = {}));

    class BrRuntimeApiImpl {
        async reload() {
            chrome.runtime.reload();
        }
        getUrl(path) {
            return chrome.runtime.getURL(path);
        }
        removeConnectListener(listener) {
            chrome.runtime.onConnect.removeListener(listener);
        }
        connect(portName) {
            return chrome.runtime.connect("", { name: portName });
        }
        connectTab(portName, tabId) {
            return chrome.tabs.connect(tabId, { name: portName });
        }
        async sendMessage(msg) {
            return new Promise((res, rej) => chrome.runtime.sendMessage(msg, gg$2.util.createCallback(res, rej)));
        }
        sendMsgNoReply(msg) {
            return chrome.runtime.sendMessage(msg);
        }
        onMessage(listener) {
            chrome.runtime.onMessage.addListener(listener);
        }
        removeOnMessageListener(listener) {
            chrome.runtime.onMessage.removeListener(listener);
        }
        async broadcastMsg(msg) {
            try {
                try {
                    await chrome.runtime.sendMessage(msg);
                }
                catch (e) { }
                const tabs = await gg$2.brApi.tab.getAllTabs();
                for (let tab of tabs) {
                    if (!tab.url?.startsWith("http")) {
                        continue;
                    }
                    try {
                        await chrome.tabs.sendMessage(tab.id, msg);
                    }
                    catch (e) { }
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async getOS() {
            try {
                const { os } = await this.getPlatformInfo();
                switch (os) {
                    case BrPlatforms.WINDOWS:
                    case BrPlatforms.LINUX:
                    case BrPlatforms.MAC:
                        return os;
                    default:
                        return BrPlatforms.OTHER;
                }
            }
            catch (e) {
                return BrPlatforms.OTHER;
            }
        }
        async getPlatformInfo() {
            return chrome.runtime.getPlatformInfo();
        }
        onStartup(listener) {
            chrome.runtime.onStartup.addListener(listener);
        }
        onInstall(listener) {
            chrome.runtime.onInstalled.addListener(listener);
        }
        getManifest() {
            try {
                return chrome?.runtime.getManifest?.();
            }
            catch (e) {
                logError(e);
                return {};
            }
        }
    }

    class BrLocalStorage {
        async saveAll(keyValObj) {
            return new Promise((res, rej) => chrome.storage.local.set(keyValObj, gg$2.util.createCallback(res, rej)));
        }
        async loadAll(keyObj) {
            return new Promise((res, rej) => chrome.storage.local.get(keyObj, gg$2.util.createCallback(res, rej)));
        }
        async remove(keyOrKeys) {
            return new Promise((res, rej) => chrome.storage.local.remove(keyOrKeys, gg$2.util.createCallback(res, rej)));
        }
        async clear() {
            return new Promise((res, rej) => chrome.storage.local.clear(gg$2.util.createCallback(res, rej)));
        }
    }
    class BrSessionStorage {
        async saveAll(keyValObj) {
            return new Promise((res, rej) => chrome.storage.session.set(keyValObj, gg$2.util.createCallback(res, rej)));
        }
        async loadAll(keyObj) {
            return new Promise((res, rej) => chrome.storage.session.get(keyObj, gg$2.util.createCallback(res, rej)));
        }
        async remove(keyOrKeys) {
            return new Promise((res, rej) => chrome.storage.session.remove(keyOrKeys, gg$2.util.createCallback(res, rej)));
        }
        async clear() {
            return new Promise((res, rej) => chrome.storage.session.clear(gg$2.util.createCallback(res, rej)));
        }
    }

    const MAXIMIZED = "maximized";
    class BrTabApiImpl {
        async createTab(params) {
            if (params.incognito) {
                return this.createIncognitoTabFn(params);
            }
            return this.createTabFn(params);
        }
        async createIncognitoTab(url) {
            return this.createIncognitoTabFn({ url });
        }
        async createNormalTab(url) {
            const activeTab = await this.getActiveTab();
            if (!activeTab || !activeTab.incognito) {
                return this.create(url);
            }
            const normalWindow = await this.createWindow(url);
            return normalWindow.tabs[0];
        }
        onTabUpdate(listener) {
            chrome.tabs.onUpdated.addListener(listener);
        }
        removeTabUpdateListener(listener) {
            chrome.tabs.onUpdated.removeListener(listener);
        }
        onTabActivate(listener) {
            chrome.tabs.onActivated.addListener(listener);
        }
        onWindowFocus(listener) {
            chrome.windows.onFocusChanged.addListener(function (id) {
                if (id != chrome.windows.WINDOW_ID_NONE) {
                    listener(id);
                }
            });
        }
        onTabCreate(listener) {
            chrome.tabs.onCreated.addListener(listener);
        }
        onTabRemove(listener) {
            chrome.tabs.onRemoved.addListener(listener);
        }
        getAllTabs() {
            return this.queryTabs({});
        }
        async isIncognitoAllowed() {
            return new Promise((res, rej) => chrome.extension.isAllowedIncognitoAccess(gg$2.util.createCallback(res, rej)));
        }
        async create(url) {
            return new Promise((res, rej) => chrome.tabs.create({ url }, gg$2.util.createCallback(res, rej)));
        }
        getCalledContextTab() {
            return new Promise((res, rej) => chrome.tabs.getCurrent(gg$2.util.createCallback(res, rej)));
        }
        async getTab(tabId) {
            try {
                const tab = await new Promise((res, rej) => chrome.tabs.get(tabId, gg$2.util.createCallback(res, rej)));
                return tab;
            }
            catch (e) {
                return null;
            }
        }
        async getActiveTab() {
            const [tab] = await new Promise((res, rej) => chrome.tabs.query({ active: true, lastFocusedWindow: true }, gg$2.util.createCallback(res, rej)));
            return tab;
        }
        async closeTab(tabId) {
            try {
                await new Promise((res, rej) => chrome.tabs.remove(tabId, gg$2.util.createCallback(res, rej)));
            }
            catch (e) { }
        }
        async getFrames(tabId) {
            try {
                return await new Promise((res, rej) => chrome.webNavigation.getAllFrames({ tabId }, gg$2.util.createCallback(res, rej)));
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async createWindow(url, { incognito = false } = {}) {
            return new Promise((res, rej) => chrome.windows.create({
                url,
                incognito,
                state: MAXIMIZED,
            }, gg$2.util.createCallback(res, rej)));
        }
        async updateTab(tabId, updateParams) {
            return new Promise((res, rej) => chrome.tabs.update(tabId, updateParams, gg$2.util.createCallback(res, rej)));
        }
        queryTabs(query) {
            return new Promise((res, rej) => chrome.tabs.query(query, gg$2.util.createCallback(res, rej)));
        }
        async getCompletedTab(tabId) {
            return new CompletedTabGetter(tabId, this).getTab();
        }
        async createIncognitoTabFn(input) {
            try {
                if (!await this.isIncognitoAllowed()) {
                    return this.createTabFn(input);
                }
                const activeTab = await this.getActiveTab();
                if (activeTab && activeTab.incognito) {
                    return this.createTabFn(input);
                }
                const incognitoWindow = await this.createWindow(input.url, { incognito: true });
                if (incognitoWindow?.tabs) {
                    return incognitoWindow.tabs[0];
                }
                const tabs = await this.queryTabs({ windowId: incognitoWindow.id });
                return tabs[0];
            }
            catch (e) {
                logError(e);
                return this.createTabFn(input);
            }
        }
        async createTabFn(input) {
            return this.createFn({
                url: input.url,
                active: !input.background,
            });
        }
        async createFn(input) {
            return new Promise((res, rej) => chrome.tabs.create(input, gg$2.util.createCallback(res, rej)));
        }
    }
    class CompletedTabGetter {
        tabId;
        tabApi;
        promise;
        constructor(tabId, tabApi) {
            this.tabId = tabId;
            this.tabApi = tabApi;
            this.promise = js.promise.createNew();
        }
        async getTab() {
            try {
                this.handleTabUpdate = this.handleTabUpdate.bind(this);
                this.tabApi.onTabUpdate(this.handleTabUpdate);
                let tab = await this.tabApi.getTab(this.tabId);
                if (tab.status == "complete") {
                    this.promise.resolve(tab);
                }
                try {
                    tab = await this.promise;
                }
                catch (e) {
                    logError(e);
                }
                this.tabApi.removeTabUpdateListener(this.handleTabUpdate);
                return tab;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        handleTabUpdate(tabId, changeInfo, tab) {
            const completed = (tabId == this.tabId) && changeInfo &&
                (changeInfo.status == "complete");
            if (completed) {
                this.promise.resolve(tab);
            }
        }
    }

    class PortConnectorProvider {
        getConnector(params) {
            if (params.frameId != null) {
                return this.frameConnect(params);
            }
            if (params.tabId != null) {
                return this.tabConnect(params);
            }
            return this.normalConnect(params);
        }
        normalConnect(params) {
            return function () {
                return chrome.runtime.connect(null, { name: params.portName });
            };
        }
        tabConnect(params) {
            return function () {
                return chrome.tabs.connect(params.tabId, { name: params.portName });
            };
        }
        frameConnect(params) {
            return function () {
                return chrome.tabs.connect(params.tabId, { name: params.portName, frameId: params.frameId });
            };
        }
    }

    class BrPortApiImpl {
        connectProvider = new PortConnectorProvider();
        async connect(params) {
            return new PortProvider(this.connectProvider.getConnector(params), params.noRetry ?? false).connect();
        }
        onConnect(params) {
            const portFunc = function (port) {
                if (port.name != params.portName) {
                    return;
                }
                port.postMessage("connected");
                params.listener(port);
            };
            chrome.runtime.onConnect.addListener(portFunc);
            return portFunc;
        }
    }
    class PortProvider {
        connector;
        portName;
        maxRetryAttempts = 120;
        constructor(connector, noRetry) {
            this.connector = connector;
            if (noRetry) {
                this.maxRetryAttempts = 1;
            }
        }
        async connect() {
            try {
                const NEXT_CALL_DELAY_SECONDS = 0.5;
                let port;
                for (let _ of js.loop.range(this.maxRetryAttempts)) {
                    try {
                        port = this.connector();
                        await this.waitForResponse(port);
                        if (port) {
                            return port;
                        }
                    }
                    catch (e) {
                        console.info(e);
                    }
                    await js.time.delay(NEXT_CALL_DELAY_SECONDS);
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        async waitForResponse(port) {
            const connectedPromise = js.promise.createNew();
            port.onDisconnect.addListener(function () {
                if (chrome.runtime.lastError) {
                    connectedPromise.reject(chrome.runtime.lastError.message);
                    return;
                }
                connectedPromise.reject("disconnected...");
            });
            port.onMessage.addListener(function f() {
                connectedPromise.resolve();
                port.onMessage.removeListener(f);
            });
            setTimeout(() => connectedPromise.reject("connection_timeout..."), 200);
            await connectedPromise;
        }
    }

    class BrApiImpl {
        static getInstance() {
            try {
                if (gg$2.brApi) {
                    return gg$2.brApi;
                }
                return gg$2.brApi = new BrApiImpl();
            }
            catch (e) {
                throw e;
            }
        }
        constructor() { }
        alarm;
        i18n = new BrI18nApiImpl();
        menu;
        omnibox = new BrOmniboxApiImpl();
        port;
        runtime;
        storage = {
            local: null,
            session: null,
        };
        tab;
        idle = new BrIdleApiImpl();
        notification = new BrNotificationApiImpl();
        other = new BrOtherApiImpl();
        sidePanel;
        windows;
        action;
        cookie;
        dom;
        portApi;
        init() {
            try {
                this.init = js.fn.emptyFn;
                globalThis.brApi = this;
                globalThis.portApi = this.portApi = new PortApiImpl();
                this.port = new BrPortApiImpl();
                this.cookie = new BrCookieApiImpl();
                this.windows = new BrWindowsApiImpl();
                this.menu = new BrContextMenuApiImpl();
                this.runtime = new BrRuntimeApiImpl();
                this.tab = new BrTabApiImpl();
                this.storage.local = new BrLocalStorage();
                this.storage.session = new BrSessionStorage();
                const isV2 = this.isV2();
                this.action = BrActionApiImpl.getInstance(isV2);
                this.alarm = BrAlarmApiImpl.getInstance(isV2);
                this.sidePanel = BrSidePanelApiImpl.getInstance(isV2);
                this.dom = BrDomApiImpl.getInstance(isV2);
                globalThis.isDevMode = this.runtime.getManifest()?.name?.includes?.("Dev");
            }
            catch (e) {
                logError(e);
            }
        }
        isV2() {
            return gg$2.util.checkManifestV2();
        }
    }

    const brApi$1 = BrApiImpl.getInstance();
    function i18n$1(key, ...placeholders) {
        return brApi$1.i18n.textOf(key, placeholders);
    }
    globalThis["i18n"] = i18n$1;

    let GG$1 = class GG {
        js = null;
    };
    const gg$1 = new GG$1();

    const AES_GCM = "AES-GCM";
    const AES_ALGORITHM = {
        name: AES_GCM,
        length: 256
    };
    const KEY_USAGES$1 = ["encrypt", "decrypt"];
    class JsCryptoAesUtilImpl {
        textEncoder = new TextEncoder();
        textDecoder = new TextDecoder();
        constructor() { }
        async generateKey() {
            try {
                const key = await crypto.subtle.generateKey(AES_ALGORITHM, true, KEY_USAGES$1);
                return gg$1.js.fnOut.result(key);
            }
            catch (e) {
                console.error(e);
                return gg$1.js.fnOut.error(e);
            }
        }
        async exportKey(key) {
            try {
                if (!key) {
                    throw "EMPTY_KEY";
                }
                const keyBuffer = await crypto.subtle.exportKey("raw", key);
                const base64Key = gg$1.js.encoding.bytesToBase64(keyBuffer);
                return gg$1.js.fnOut.result(base64Key);
            }
            catch (e) {
                console.error(e);
                return gg$1.js.fnOut.error(e);
            }
        }
        async importKey(keyString) {
            try {
                if (!keyString) {
                    throw "EMPTY_KEY_STRING";
                }
                const keyBuffer = gg$1.js.encoding.base64ToBytes(keyString);
                const key = await crypto.subtle.importKey("raw", keyBuffer, AES_GCM, true, KEY_USAGES$1);
                return gg$1.js.fnOut.result(key);
            }
            catch (e) {
                console.error(e);
                return gg$1.js.fnOut.error(e);
            }
        }
        async encrypt(plaintext, key) {
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const encryptedBuffer = await crypto.subtle.encrypt({ name: AES_GCM, iv }, key, this.textEncoder.encode(plaintext));
            const ivBase64 = gg$1.js.encoding.bytesToBase64(iv);
            const encryptedBase64 = gg$1.js.encoding.bytesToBase64(encryptedBuffer);
            const ciphertext = `${ivBase64},${encryptedBase64}`;
            return ciphertext;
        }
        async decrypt(ciphertext, key) {
            const [ivBase64, encryptedBase64] = ciphertext.split(",", 2);
            const ivBuffer = gg$1.js.encoding.base64ToBytes(ivBase64);
            const encryptedBuffer = gg$1.js.encoding.base64ToBytes(encryptedBase64);
            const decryptedBuffer = await crypto.subtle.decrypt({ name: AES_GCM, iv: ivBuffer }, key, encryptedBuffer);
            const plaintext = this.textDecoder.decode(decryptedBuffer);
            return plaintext;
        }
    }

    const RSA_OAEP = "RSA-OAEP";
    const RSA_ALGORITHM = {
        name: RSA_OAEP,
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
    };
    const KEY_USAGES = ["encrypt", "decrypt"];
    class JsCryptoRsaUtilImpl {
        textEncoder = new TextEncoder();
        textDecoder = new TextDecoder();
        constructor() { }
        async generateKey() {
            try {
                const rsaKeyPair = (await crypto.subtle.generateKey(RSA_ALGORITHM, true, KEY_USAGES));
                return gg$1.js.fnOut.result({
                    publicKey: rsaKeyPair.publicKey,
                    privateKey: rsaKeyPair.privateKey
                });
            }
            catch (e) {
                console.error(e);
                return gg$1.js.fnOut.error(e);
            }
        }
        async getBase64PublicKey(key) {
            const exportedBuffer = await window.crypto.subtle.exportKey("spki", key);
            const base64Key = gg$1.js.encoding.bytesToBase64(exportedBuffer);
            return base64Key;
        }
        async getBase64PrivateKey(key) {
            const exportedBuffer = await window.crypto.subtle.exportKey("pkcs8", key);
            const base64Key = gg$1.js.encoding.bytesToBase64(exportedBuffer);
            return base64Key;
        }
        async encrypt(plaintext, key) {
            const encodedPlainText = this.textEncoder.encode(plaintext);
            const arrayBuffer = await crypto.subtle.encrypt({ name: RSA_OAEP }, key, encodedPlainText);
            return gg$1.js.encoding.bytesToBase64(new Uint8Array(arrayBuffer));
        }
        async encryptHex(plaintext, key) {
            const encodedPlainText = this.textEncoder.encode(plaintext);
            const arrayBuffer = await crypto.subtle.encrypt({ name: RSA_OAEP }, key, encodedPlainText);
            return gg$1.js.encoding.bytesToHex(new Uint8Array(arrayBuffer));
        }
        async decrypt(cipherText, key) {
            const cipherBuffer = gg$1.js.encoding.base64ToBytes(cipherText);
            const decryptedBuffer = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, key, cipherBuffer);
            return this.textDecoder.decode(decryptedBuffer);
        }
        async importPublicKey(key) {
            const keyBuffer = gg$1.js.encoding.base64ToBytes(key);
            const RSA_PARAMS = {
                name: RSA_OAEP,
                hash: "SHA-256"
            };
            const publicKey = await crypto.subtle.importKey("spki", keyBuffer, RSA_PARAMS, true, ["encrypt"]);
            return publicKey;
        }
        async importPublicKeyHex(key) {
            const keyBuffer = gg$1.js.encoding.hexToBytes(key);
            const RSA_PARAMS = {
                name: RSA_OAEP,
                hash: "SHA-256"
            };
            const publicKey = await crypto.subtle.importKey("spki", keyBuffer, RSA_PARAMS, true, ["encrypt"]);
            return publicKey;
        }
        async importPrivateKey(key) {
            const keyBuffer = gg$1.js.encoding.base64ToBytes(key);
            const RSA_PARAMS = {
                name: RSA_OAEP,
                hash: "SHA-256"
            };
            const publicKey = await crypto.subtle.importKey("pkcs8", keyBuffer, RSA_PARAMS, true, ["decrypt"]);
            return publicKey;
        }
        async exportPublicKey(key) {
            const exportedBuffer = await crypto.subtle.exportKey("spki", key);
            const base64Key = gg$1.js.encoding.bytesToBase64(exportedBuffer);
            return base64Key;
        }
        async exportPrivateKey(key) {
            const exportedBuffer = await crypto.subtle.exportKey("pkcs8", key);
            const base64Key = gg$1.js.encoding.bytesToBase64(exportedBuffer);
            return base64Key;
        }
    }

    class JsCryptoImpl {
        aes;
        rsa;
        constructor() {
            this.aes = new JsCryptoAesUtilImpl();
            this.rsa = new JsCryptoRsaUtilImpl();
        }
        generateRandom(range) {
            if (range <= 0) {
                throw "INVALID_RANDOM_RANGE";
            }
            const bitMask = this.getBitMask(range);
            let randomNumber = 0;
            while (true) {
                randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
                randomNumber &= bitMask;
                if (randomNumber < range) {
                    return randomNumber;
                }
            }
        }
        generateRandomRange(start, exclusiveEnd) {
            const range = Math.abs(exclusiveEnd - start);
            return this.generateRandom(range) + start;
        }
        getBitMask(n) {
            let mask = 1;
            while (mask < n) {
                mask = (mask << 1) | 1;
            }
            return mask;
        }
        getSalt(noOfBytes) {
            const bytes = new Uint8Array(noOfBytes);
            crypto.getRandomValues(bytes);
            return bytes;
        }
    }

    var JsEncodingFormat;
    (function (JsEncodingFormat) {
        JsEncodingFormat["HEX"] = "HEX";
        JsEncodingFormat["BASE64"] = "BASE64";
        JsEncodingFormat["BASE64_URL"] = "BASE64_URL";
        JsEncodingFormat["BYTES"] = "BYTES";
        JsEncodingFormat["ASCII"] = "ASCII";
    })(JsEncodingFormat || (JsEncodingFormat = {}));

    class Base64Util {
        alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        base64AlphaValueMap = null;
        encodeBytesToString(bytes) {
            let i = 0;
            let ans = "";
            for (; i + 2 < bytes.length; i += 3) {
                ans += this.mapBase64C1(bytes[i]);
                ans += this.mapBase64C2(bytes[i], bytes[i + 1]);
                ans += this.mapBase64C3(bytes[i + 1], bytes[i + 2]);
                ans += this.mapBase64C4(bytes[i + 2]);
            }
            switch (bytes.length - i) {
                case 2:
                    ans += this.mapBase64C1(bytes[i]);
                    ans += this.mapBase64C2(bytes[i], bytes[i + 1]);
                    ans += this.mapBase64C3(bytes[i + 1], 0);
                    ans += "=";
                    break;
                case 1:
                    ans += this.mapBase64C1(bytes[i]);
                    ans += this.mapBase64C2(bytes[i], 0);
                    ans += "==";
                    break;
            }
            return ans;
        }
        decodeStringToBytes(input) {
            const alphaValue = this.getBase64AlphaValueMap();
            const bytes = [];
            while (input.length % 4 != 0) {
                input += "=";
            }
            let c1 = 0, c2 = 0, c3 = 0, c4 = 0;
            for (let i = 0; i < input.length; i += 4) {
                c1 = alphaValue.get(input[i]);
                c2 = alphaValue.get(input[i + 1]);
                c3 = alphaValue.get(input[i + 2]);
                c4 = alphaValue.get(input[i + 3]);
                bytes.push((c1 << 2) | ((c2 & 48) >> 4));
                bytes.push(((c2 & 15) << 4) | ((c3 & 60) >> 2));
                bytes.push(((c3 & 3) << 6) | c4);
            }
            for (let i = input.length - 1; i >= 0 && input[i] == "="; i--) {
                bytes.pop();
            }
            return new Uint8Array(bytes);
        }
        mapBase64C1(byte) {
            return this.alphabet[(byte & 252) >> 2];
        }
        mapBase64C2(b1, b2) {
            return this.alphabet[((b1 & 3) << 4) | ((b2 & 240) >> 4)];
        }
        mapBase64C3(b1, b2) {
            return this.alphabet[((b1 & 15) << 2) | ((b2 & 192) >> 6)];
        }
        mapBase64C4(byte) {
            return this.alphabet[byte & 63];
        }
        getBase64AlphaValueMap() {
            if (this.base64AlphaValueMap == null) {
                const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                const map = new Map(Array.from(alphabet, (x, index) => [x, index]));
                map.set("=", 0);
                this.base64AlphaValueMap = map;
            }
            return this.base64AlphaValueMap;
        }
    }

    class HexUtil {
        encodeBytesToHexString(bytes) {
            return Array.from(bytes).map(x => this.getHex(x)).join("");
        }
        decodeHexStringToBytes(hexString) {
            try {
                if (hexString.length % 2) {
                    hexString = "0" + hexString;
                }
                const array = new Uint8Array(hexString.length / 2);
                let ai = 0;
                for (let i = 0; i < hexString.length; i += 2) {
                    array[ai++] = parseInt(hexString[i] + hexString[i + 1], 16);
                }
                return array;
            }
            catch (e) {
                logError(e, hexString);
                throw e;
            }
        }
        getHex(byte) {
            return ("0" + (byte).toString(16)).slice(-2);
        }
    }

    class GG {
        base64Util = new Base64Util();
        hexUtil = new HexUtil();
    }
    const gg = new GG();

    class JsEncodingByteToXUtil {
        textDecoder = new TextDecoder();
        convertBytes(bytes, input) {
            try {
                switch (input.to) {
                    case JsEncodingFormat.BYTES:
                        return { outputBytes: bytes };
                    case JsEncodingFormat.BASE64:
                        return { outputString: gg.base64Util.encodeBytesToString(bytes) };
                    case JsEncodingFormat.ASCII:
                        return { outputString: this.textDecoder.decode(bytes) };
                    case JsEncodingFormat.BASE64_URL:
                        return { outputString: this.getBase64Url(gg.base64Util.encodeBytesToString(bytes)) };
                    case JsEncodingFormat.HEX:
                        return { outputString: gg.hexUtil.encodeBytesToHexString(bytes) };
                    default:
                        throw ["NEW_CASE", input];
                }
            }
            catch (e) {
                logError(e, bytes, input);
                throw e;
            }
        }
        getBase64Url(text) {
            return text.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
        }
    }

    class JsEncodingXToByteUtil {
        textEncoder = new TextEncoder();
        getBytes(input) {
            try {
                if (input.inputBytes) {
                    if (input.inputBytes instanceof ArrayBuffer) {
                        return new Uint8Array(input.inputBytes);
                    }
                    return input.inputBytes;
                }
                switch (input.from) {
                    case JsEncodingFormat.ASCII:
                        return this.textEncoder.encode(input.inputString);
                    case JsEncodingFormat.BASE64:
                        return gg.base64Util.decodeStringToBytes(input.inputString);
                    case JsEncodingFormat.HEX:
                        return gg.hexUtil.decodeHexStringToBytes(input.inputString);
                    default:
                        throw ["NEW_CASE", input];
                }
            }
            catch (e) {
                logError(e, input);
                throw e;
            }
        }
    }

    class JsEncodingUtilImpl {
        xToByteUtil = new JsEncodingXToByteUtil();
        byteToXUtil = new JsEncodingByteToXUtil();
        convert(input) {
            try {
                const bytes = this.xToByteUtil.getBytes(input);
                return this.byteToXUtil.convertBytes(bytes, input);
            }
            catch (e) {
                throw ["FAILED_TO_ENCODE", input, e];
            }
        }
        bytesToBase64(input) {
            return this.convert({ from: JsEncodingFormat.BYTES, to: JsEncodingFormat.BASE64, inputBytes: input }).outputString;
        }
        bytesToBase64Url(input) {
            return this.convert({ from: JsEncodingFormat.BYTES, to: JsEncodingFormat.BASE64_URL, inputBytes: input }).outputString;
        }
        bytesToHex(input) {
            return this.convert({ from: JsEncodingFormat.BYTES, to: JsEncodingFormat.HEX, inputBytes: input }).outputString;
        }
        base64ToBytes(input) {
            return this.convert({ from: JsEncodingFormat.BASE64, to: JsEncodingFormat.BYTES, inputString: input }).outputBytes;
        }
        hexToBytes(input) {
            return this.convert({ from: JsEncodingFormat.HEX, to: JsEncodingFormat.BYTES, inputString: input }).outputBytes;
        }
    }

    class FnOutImpl {
        ok;
        out;
        constructor(ok, out) {
            this.ok = ok;
            this.out = out;
        }
        get result() {
            if (!this.ok) {
                throw this.out;
            }
            return this.out;
        }
        get error() {
            return this.out;
        }
        [Symbol.toPrimitive]() {
            return "" + this.out;
        }
    }

    class JsFnOutImpl {
        constructor() { }
        OK = new FnOutImpl(true, null);
        NONE = new FnOutImpl(false, null);
        result(result) {
            return new FnOutImpl(true, result);
        }
        error(errorMsg) {
            return new FnOutImpl(false, errorMsg + "");
        }
        parse(obj) {
            return new FnOutImpl(obj.ok, obj.out);
        }
        getResult(obj) {
            return obj.out;
        }
    }

    class FnCaller {
        fn;
        thisArg;
        constructor(fn, thisArg) {
            this.fn = fn;
            this.thisArg = thisArg;
        }
        callFunction(args) {
            return this.fn.apply(this.thisArg, args);
        }
    }

    class SingleInstanceFnWrapper {
        fnCaller;
        constructor(fnCaller) {
            this.fnCaller = fnCaller;
            gg$1.js.fn.bindThis(this, [this.execute]);
        }
        inProgressMap = new Map();
        async execute() {
            const argHash = gg$1.js.fn.getArgHash(arguments);
            if (this.inProgressMap.has(argHash)) {
                return this.inProgressMap.get(argHash);
            }
            const promise = gg$1.js.promise.createNew();
            this.inProgressMap.set(argHash, promise);
            try {
                const resp = await this.fnCaller.callFunction(arguments);
                promise.resolve(resp);
            }
            catch (e) {
                promise.reject(e);
            }
            this.inProgressMap.delete(argHash);
            return promise;
        }
    }

    class SingleInstanceListener {
        fnCaller;
        inProgress = false;
        callId = 0;
        lastArgs = [];
        constructor(fnCaller) {
            this.fnCaller = fnCaller;
            gg$1.js.fn.bindThis(this, [this.execute]);
        }
        async execute() {
            const callId = ++this.callId;
            if (this.inProgress) {
                this.lastArgs = Array.from(arguments);
                return;
            }
            this.inProgress = true;
            try {
                await this.fnCaller.callFunction(arguments);
            }
            finally {
                this.inProgress = false;
                if (this.callId != callId) {
                    setTimeout(this.execute.bind(this, ...this.lastArgs), 0);
                }
            }
        }
    }

    class SingleInstanceTimedListener {
        fnCaller;
        interCallDelaySec;
        args = null;
        callId = 0;
        timeoutId = -1;
        callFn = null;
        constructor(fnCaller, interCallDelaySec) {
            this.fnCaller = fnCaller;
            this.interCallDelaySec = interCallDelaySec;
            gg$1.js.fn.bindThis(this, [this.execute]);
            this.callFn = this.executeFn;
        }
        execute(...args) {
            this.callId++;
            this.args = args;
            this.callFn();
        }
        async executeFn() {
            this.callFn = this.emptyFn;
            clearTimeout(this.timeoutId);
            const callId = this.callId;
            await this.fnCaller.callFunction(this.args);
            await gg$1.js.time.delay(this.interCallDelaySec);
            if (callId != this.callId) {
                this.timeoutId = setTimeout(() => this.callFn(), 0);
            }
            this.callFn = this.executeFn;
        }
        emptyFn() { }
    }

    class JsFnWrapperImpl {
        createSingleInstance(fn, thisArg = null) {
            return new SingleInstanceFnWrapper(new FnCaller(fn, thisArg)).execute;
        }
        createSingleInstListener(fn, thisArg = null) {
            return new SingleInstanceListener(new FnCaller(fn, thisArg)).execute;
        }
        createInitFn(fn) {
            let called = false;
            return function () {
                if (called) {
                    return;
                }
                called = true;
                return fn.apply(this, arguments);
            };
        }
        createSingleInstTimedListener(fn, thisArg = null, interCallDelaySec) {
            return new SingleInstanceTimedListener(new FnCaller(fn, thisArg), interCallDelaySec).execute;
        }
    }

    class JsFunctionUtilImpl {
        emptyFn = () => { };
        wrapper = new JsFnWrapperImpl();
        bindThis(obj, fns) {
            try {
                for (let fn of fns) {
                    obj[fn.name] = fn.bind(obj);
                    if (fn.name.startsWith("bound")) {
                        throw ["bound called multiple times", obj, fns];
                    }
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getArgHash(calledArguments) {
            return Array.from(calledArguments).map(x => this.getString(x)).join(";");
        }
        getString(x) {
            if (typeof x != "object") {
                return "" + x;
            }
            if (!x) {
                return x + "";
            }
            return Object.keys(x).map(key => `${key}:${"" + x[key]}`).join(";");
        }
    }

    var ErrorCode;
    (function (ErrorCode) {
        ErrorCode["NONE"] = "NONE";
        ErrorCode["INVALID_INPUT"] = "INVALID_INPUT";
        ErrorCode["ASSERT_ERROR"] = "ASSERT_ERROR";
        ErrorCode["UNHANDLED_CASE"] = "UNHANDLED_CASE";
        ErrorCode["NOT_INITIALIZED"] = "NOT_INITIALIZED";
        ErrorCode["INVALID_ENUM_KEY"] = "INVALID_ENUM_KEY";
        ErrorCode["NOT_FOUND"] = "NOT_FOUND";
    })(ErrorCode || (ErrorCode = {}));

    class JsArrayUtilImpl {
        trueFilter(a) {
            return Boolean(a);
        }
        concat(...arrays) {
            return [].concat(...arrays);
        }
        removeElem(a, elem) {
            try {
                if (!a || elem == null) {
                    throw ErrorCode.INVALID_INPUT;
                }
                const index = a.indexOf(elem);
                this.removeElemAt(a, index);
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
        removeElemAt(a, index) {
            try {
                if (!a ||
                    !Number.isFinite(index)) {
                    throw ErrorCode.INVALID_INPUT;
                }
                if (!this.isValidArrayIndex(a, index)) {
                    return;
                }
                a.splice(index, 1);
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
        removeFirstMatch(a, matchCondition) {
            try {
                if (!a || !matchCondition) {
                    throw ErrorCode.INVALID_INPUT;
                }
                const elemIndex = a.findIndex(x => matchCondition(x));
                this.removeElemAt(a, elemIndex);
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
        toArray(iterable) {
            try {
                if (!iterable) {
                    throw ErrorCode.INVALID_INPUT;
                }
                return Array.from(iterable);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        addUnique(a, elem) {
            if (!a.includes(elem)) {
                a.push(elem);
            }
        }
        appendUnique(a, elem) {
            const lastElem = a.length && a[a.length - 1];
            if (lastElem != elem) {
                a.push(elem);
            }
        }
        addHistory(a, elem, limit) {
            this.removeElem(a, elem);
            a.push(elem);
            if (a.length > limit) {
                a.splice(0, a.length - limit);
            }
        }
        getPage(collection, pageNo, rowsPerPage) {
            if (rowsPerPage == -1) {
                return collection;
            }
            const pageStart = pageNo * rowsPerPage;
            const pageEnd = pageStart + rowsPerPage;
            return collection.slice(pageStart, pageEnd);
        }
        sliceAfter(a, elem) {
            try {
                const index = a.findIndex(x => x == elem);
                if (index == -1) {
                    return [];
                }
                return a.slice(index + 1);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        *iterate(a, param) {
            try {
                const inc = param.inc ?? 1;
                const exclusiveEnd = param.exclusiveEnd ?? (inc > 0 ? a.length : -1);
                for (let i = param.from; i != exclusiveEnd; i += inc) {
                    yield a[i];
                }
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
        getUnique(a) {
            try {
                const existing = new Set();
                const ans = [];
                for (let x of a) {
                    if (existing.has(x)) {
                        continue;
                    }
                    ans.push(x);
                    existing.add(x);
                }
                return ans;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        getUniqueObjList(a, idProvider) {
            try {
                const existing = new Set();
                const ans = [];
                for (let x of a) {
                    if (existing.has(idProvider(x))) {
                        continue;
                    }
                    ans.push(x);
                    existing.add(idProvider(x));
                }
                return ans;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        findMaxIndex(a) {
            try {
                if (a.length == 0) {
                    return -1;
                }
                let maxIndex = 0;
                let max = a[0];
                for (let i = 1; i < a.length; i++) {
                    if (a[i] > max) {
                        maxIndex = i;
                        max = a[i];
                    }
                }
                return maxIndex;
            }
            catch (e) {
                logError(e);
                return -1;
            }
        }
        isValidArrayIndex(a, index) {
            try {
                return index >= 0 && index < a?.length;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class UrlProtocol {
        http = "http:";
        https = "https:";
    }
    var BrowserName;
    (function (BrowserName) {
        BrowserName["CHROME"] = "CHROME";
        BrowserName["FIREFOX"] = "FIREFOX";
        BrowserName["EDGE"] = "EDGE";
        BrowserName["SAFARI"] = "SAFARI";
        BrowserName["OPERA"] = "OPERA";
    })(BrowserName || (BrowserName = {}));

    class JsBrowserUtilImpl {
        getName() {
            try {
                const agent = navigator.userAgent;
                if (agent.includes("Opera") || agent.includes("OPR")) {
                    return BrowserName.OPERA;
                }
                if (agent.includes("Edg")) {
                    return BrowserName.EDGE;
                }
                if (agent.includes("Chrome")) {
                    return BrowserName.CHROME;
                }
                if (agent.includes("Safari")) {
                    return BrowserName.SAFARI;
                }
                if (agent.includes("Firefox")) {
                    return BrowserName.FIREFOX;
                }
                return BrowserName.CHROME;
            }
            catch (e) {
                logError(e);
                return BrowserName.CHROME;
            }
        }
        isSafari() {
            return this.getName() == BrowserName.SAFARI;
        }
    }

    class JsDateUtilImpl {
        formatDateMonDYYYY(timestamp) {
            const date = new Date(timestamp);
            return `${this.getShortMonth(date)} ${date.getDate()}, ${date.getFullYear()}`;
        }
        formatDateMonDYYYYHHMMAM(timestamp) {
            const date = new Date(timestamp);
            const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            return `${this.formatDateMonDYYYY(timestamp)} ${timeString}`;
        }
        getShortMonth(date) {
            const shortMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = shortMonth[date.getMonth()];
            return month;
        }
    }

    const DISPLAY_DATA_KEY = "display_css";
    class JsDomUtilImpl {
        async waitDomLoad() {
            const promise = gg$1.js.promise.createNew();
            window.addEventListener("DOMContentLoaded", () => promise.resolve());
            window.addEventListener("load", () => promise.resolve());
            function checkReadyState() {
                if (document.readyState == "complete") {
                    promise.resolve();
                }
            }
            document.addEventListener("readystatechange", checkReadyState);
            checkReadyState();
            return promise;
        }
        async waitAnimationFrame() {
            try {
                await new Promise(res => window.requestAnimationFrame(res));
            }
            catch (e) {
                logError(e);
            }
        }
        setContent(elem, content) {
            try {
                const reqElem = gg$1.js.selector.select(elem);
                reqElem.replaceChildren(content);
            }
            catch (e) {
                logError(e);
            }
        }
        setChildContent(elem, selector, content) {
            try {
                const childElem = gg$1.js.selector.selectFrom(elem, selector);
                if (!childElem) {
                    throw "CHILD_ELEM_NOT_FOUND: " + selector;
                }
                return this.setContent(childElem, content);
            }
            catch (e) {
                logError(e);
            }
        }
        copyToClipboard(text) {
            try {
                const lastActiveElement = document.activeElement;
                let elem = document.createElement('textarea');
                elem.value = text;
                document.body.append(elem);
                elem.select();
                document.execCommand('copy');
                elem.remove();
                if (lastActiveElement != document.activeElement) {
                    lastActiveElement.focus();
                }
            }
            catch (e) {
                logError(e);
            }
        }
        showIf(condition, ...selectors) {
            if (condition) {
                this.showOld(...selectors);
                return;
            }
            this.hideOld(...selectors);
        }
        showOld(...selectors) {
            this.showElems(selectors);
        }
        showElems(selectors) {
            for (let selector of selectors) {
                try {
                    const elem = gg$1.js.selector.select(selector);
                    elem.style.display = elem.dataset[DISPLAY_DATA_KEY] || "block";
                }
                catch (e) {
                    logError(e);
                }
            }
        }
        hideOld(...selectors) {
            this.hideElems(selectors);
        }
        hideElems(selectors) {
            for (let selector of selectors) {
                try {
                    const elem = gg$1.js.selector.select(selector);
                    if (!elem) {
                        throw new Error("NO_ELEMENT_FOUND: " + selector);
                    }
                    const curDisplay = window.getComputedStyle(elem).display;
                    if (curDisplay != "none" && curDisplay != "block") {
                        elem.dataset[DISPLAY_DATA_KEY] = curDisplay;
                    }
                    elem.style.display = "none";
                }
                catch (e) {
                    logError(e);
                }
            }
        }
        showNoError(...selectors) {
            try {
                for (let selector of selectors) {
                    try {
                        const elem = gg$1.js.selector.select(selector);
                        if (elem) {
                            elem.style.display = elem.dataset[DISPLAY_DATA_KEY] || "block";
                        }
                    }
                    catch (e) { }
                }
            }
            catch (e) { }
        }
        hideNoError(...selectors) {
            try {
                for (let selector of selectors) {
                    try {
                        const elem = gg$1.js.selector.select(selector);
                        if (!elem) {
                            continue;
                        }
                        const curDisplay = window.getComputedStyle(elem).display;
                        if (curDisplay != "none" && curDisplay != "block") {
                            elem.dataset[DISPLAY_DATA_KEY] = curDisplay;
                        }
                        elem.style.display = "none";
                    }
                    catch (e) { }
                }
            }
            catch (e) { }
        }
        clearContent(elem) {
            try {
                const reqElem = gg$1.js.selector.select(elem);
                reqElem.replaceChildren();
            }
            catch (e) {
                logError(e);
            }
        }
        setText(selector, text) {
            try {
                const reqElem = gg$1.js.selector.select(selector);
                reqElem.dataset["tooltip_content"] = text;
                reqElem.textContent = text;
            }
            catch (e) {
                logError(e);
            }
        }
        setChildText(parentSelector, childSelector, text) {
            try {
                const elem = gg$1.js.selector.selectFrom(parentSelector, childSelector);
                this.setText(elem, text);
            }
            catch (e) {
                logError(e);
            }
        }
        disableRightClick() {
            try {
                document.addEventListener("contextmenu", function (event) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }, true);
            }
            catch (e) {
                logError(e);
            }
        }
        async closeWindow() {
            setTimeout(() => window.close(), 100);
            await new Promise(res => { });
        }
        getContentRect(elem) {
            const oldLeft = elem.style.left;
            const oldTop = elem.style.top;
            elem.style.left = "0";
            elem.style.top = "0";
            const oldDisplay = elem.style.display;
            elem.style.display = "block";
            const rect = elem.getBoundingClientRect();
            elem.style.display = oldDisplay;
            elem.style.left = oldLeft;
            elem.style.top = oldTop;
            return rect;
        }
        getPasswordMask(value) {
            try {
                const mask = "*".repeat(value.length);
                return mask;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        setStyleImportant(elem, obj) {
            try {
                for (let key in obj) {
                    elem.style.setProperty(key, obj[key], "important");
                }
            }
            catch (e) {
                logError(e);
            }
        }
        changeClass(elem, oldClassName, newClassName) {
            elem.classList.remove(oldClassName);
            elem.classList.add(newClassName);
        }
        removeElem(selector) {
            const elem = gg$1.js.selector.select(selector);
            if (elem) {
                elem.remove();
            }
        }
        finishAnimation(elem) {
            gg$1.js.selector.select(elem).getAnimations({ subtree: true }).forEach(x => x.finish());
        }
        findParent(params) {
            try {
                for (let elem of this.nodeTopIterator(params)) {
                    if (params.criteria(elem)) {
                        return elem;
                    }
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        show(...elemList) {
            this.showHideFn(true, elemList);
        }
        hide(...elemList) {
            this.showHideFn(false, elemList);
        }
        showHide(show, ...elemList) {
            this.showHideFn(show, elemList);
        }
        isContentEditable(elem) {
            try {
                if (elem.isContentEditable) {
                    return true;
                }
                if (elem instanceof HTMLInputElement || elem instanceof HTMLTextAreaElement) {
                    return !elem.readOnly && !elem.disabled;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        hasEllipsis(elem) {
            try {
                if (elem.scrollWidth > 0) {
                    return this.hasEllipsisFn(elem);
                }
                return this.hasEllipsisFn(elem.parentElement);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        hasEllipsisFn(elem) {
            return elem.scrollWidth > elem.offsetWidth;
        }
        showHideFn(show, elemList) {
            try {
                const fn = show ? this.removeClass : this.addClass;
                for (let selector of elemList) {
                    fn.call(this, selector, "dis-hide");
                }
            }
            catch (e) {
                logError(e);
            }
        }
        addClass(selector, className) {
            gg$1.js.selector.select(selector).classList.add(className);
        }
        removeClass(selector, className) {
            gg$1.js.selector.select(selector).classList.remove(className);
        }
        nodeTopIterator(params) {
            return NodeTopIterator.getIteratorInstance(params);
        }
    }
    class NodeTopIterator {
        selector;
        static getIteratorInstance(params) {
            const iterator = new NodeTopIterator(params.selector);
            if (params.limitTop) {
                return new TopLimitedNodeTopIterator(iterator, params.limitTop);
            }
            return iterator;
        }
        constructor(selector) {
            this.selector = selector;
        }
        *[Symbol.iterator]() {
            let elem = gg$1.js.selector.select(this.selector);
            for (; elem; elem = elem.parentElement) {
                yield elem;
            }
        }
    }
    class TopLimitedNodeTopIterator {
        iterator;
        topElem;
        constructor(iterator, topElemSelector) {
            this.iterator = iterator;
            const topElem = gg$1.js.selector.select(topElemSelector);
            this.topElem = topElem.parentElement ?? topElem;
        }
        *[Symbol.iterator]() {
            for (let elem of this.iterator) {
                if (elem == this.topElem) {
                    return;
                }
                yield elem;
            }
        }
    }

    function jserror(e, log = true) {
        if (e instanceof JSError) {
            return e;
        }
        const error = new JSError(e);
        if (log) {
            console.error(error);
        }
        return error;
    }
    class JSError extends Error {
        [Symbol.toPrimitive]() {
            return "" + this.message;
        }
    }

    class JsEventImpl {
        isControlKey(e) {
            try {
                return (e.key.length > 1) || e.ctrlKey || e.metaKey || e.altKey;
            }
            catch (e) {
                console.error(e);
                return false;
            }
        }
        preventDefault(e, stopImmediate = false) {
            e.preventDefault();
            if (stopImmediate) {
                e.stopPropagation();
            }
        }
        onEnter(elem, listener, thisArg = null) {
            elem.addEventListener("keyup", function (e) {
                if (e.key == "Enter") {
                    listener.apply(thisArg || this, arguments);
                }
            }, true);
        }
    }

    class JsLogUtilImpl {
        infoPrefix = "";
        start = Date.now();
        init() {
            gg$1.js.fn.bindThis(this, [this.infoFn]);
        }
        info = (..._args) => { };
        setInfoPrefix(prefix) {
            try {
                this.infoPrefix = prefix;
            }
            catch (e) {
                logError(e);
            }
        }
        enableLogging(enable) {
            try {
                if (enable) {
                    globalThis.info = this.info = this.infoFn;
                    return;
                }
                globalThis.info = this.info = gg$1.js.fn.emptyFn;
            }
            catch (e) {
                logError(e);
            }
        }
        mask(input, options) {
            try {
                if (typeof input == "string") {
                    return this.maskFn(input);
                }
                if (typeof input != "object") {
                    return input;
                }
                if (Array.isArray(input)) {
                    return input.map(x => this.mask(x));
                }
                if (options?.keys) {
                    return this.maskObjKeys(input, options.keys);
                }
                return this.maskObj(input);
            }
            catch (e) {
                logError(e);
                return input;
            }
        }
        maskObj(obj) {
            try {
                const maskObj = {};
                for (let key in obj) {
                    maskObj[key] = this.mask(obj[key]);
                }
                return maskObj;
            }
            catch (e) {
                logError(e);
                return {};
            }
        }
        maskObjKeys(obj, keys) {
            try {
                const maskObj = Object.assign({}, obj);
                for (let key of keys) {
                    if (!(key in obj)) {
                        continue;
                    }
                    maskObj[key] = this.mask(obj[key]);
                }
                return maskObj;
            }
            catch (e) {
                logError(e);
                return {};
            }
        }
        maskFn(x) {
            try {
                return `xxxxx(${x.length})`;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        infoFn(...args) {
            if (!globalThis["isDevMode"]) {
                return;
            }
            const currentSecond = ((Date.now() - this.start) / 1000) >> 0;
            console.debug(currentSecond, this.infoPrefix, ...args);
        }
    }

    class JsLogoUtilImpl {
        async getBase64Logo(src) {
            try {
                const img = await this.getImage(src);
                if (!img) {
                    return "";
                }
                const SIZE = 35;
                const bitmap = await createImageBitmap(img, { resizeHeight: SIZE, resizeWidth: SIZE, resizeQuality: "high" });
                const canvas = document.createElement("canvas");
                canvas.width = SIZE;
                canvas.height = SIZE;
                const context = canvas.getContext("2d");
                context.drawImage(bitmap, 0, 0);
                bitmap.close();
                img.src = "";
                const logo = canvas.toDataURL("image/png");
                context.clearRect(0, 0, SIZE, SIZE);
                return logo;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        async getImage(src) {
            try {
                src = this.getCorrectedSVG(src);
                let resolve, reject;
                const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
                const image = new Image();
                image.crossOrigin = "anonymous";
                image.onload = resolve;
                image.onerror = reject;
                image.src = src;
                await promise;
                return image;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getCorrectedSVG(src = "") {
            if (!src.startsWith("data:image/svg+xml")) {
                return src;
            }
            const encodedImage = src.slice(src.indexOf(",") + 1);
            const svgText = atob(encodedImage);
            if (/<svg.*?width.*?>/.test(svgText)) {
                return src;
            }
            const correctedSvgText = svgText.replace(/(<svg.*?)>/, '$1 width="50" height="50">');
            const correctedEncodedImage = btoa(correctedSvgText);
            const reqSvgImage = "data:image/svg+xml;base64," + correctedEncodedImage;
            return reqSvgImage;
        }
    }

    class JsLoopUtilImpl {
        async *createCyclicCounter(totalCount, interCycleDelay = 0.1) {
            while (true) {
                for (let i = 0; i < totalCount; i++) {
                    yield i;
                }
                await gg$1.js.time.delay(interCycleDelay);
            }
        }
        range(end) {
            return this.rangeSE(0, end);
        }
        *rangeSE(start, exclusiveEnd) {
            for (let i = start; i < exclusiveEnd; i++) {
                yield i;
            }
        }
    }

    class JsMapUtilImpl {
        createNew({ defaultVal = null, defaultProvider = null } = {}) {
            const map = new JSMapObjImpl();
            map.initDefaultProvider({ defaultVal, defaultProvider });
            return map;
        }
        combine(mapOne, mapTwo) {
            return new Map([...mapOne.entries(), ...mapTwo.entries()]);
        }
    }
    class JSMapObjImpl {
        map = new Map();
        defaultProvider = null;
        get(key) {
            if (this.map.has(key)) {
                return this.map.get(key);
            }
            return (this.defaultProvider && this.defaultProvider()) || null;
        }
        getOrDefaultAdded(key) {
            if (this.map.has(key)) {
                return this.map.get(key);
            }
            if (!this.defaultProvider) {
                return null;
            }
            const defaultVal = this.defaultProvider();
            this.map.set(key, defaultVal);
            return defaultVal;
        }
        initDefaultProvider({ defaultVal = null, defaultProvider = null }) {
            if (defaultVal) {
                this.defaultProvider = () => defaultVal;
                return;
            }
            if (defaultProvider) {
                this.defaultProvider = defaultProvider;
                return;
            }
        }
    }

    class JsMathUtilImpl {
        sum(...a) {
            return this.sumList(a);
        }
        sumList(a) {
            return a.reduce((x, y) => x + y, 0);
        }
        getBoundedValueLEGE(min, max, value) {
            return Math.min(Math.max(min, value), max);
        }
        average(...a) {
            return this.averageList(a);
        }
        averageList(a) {
            return this.sumList(a) / a.length;
        }
    }

    class JsObjUtilImpl {
        DISABLED_FN_SUFFIX = "_disabled__";
        isEmpty(obj) {
            for (let _key in obj) {
                return false;
            }
            return true;
        }
        disableMethod(obj, fnName) {
            obj[fnName + this.DISABLED_FN_SUFFIX] = obj[fnName];
            function empty_fn() { }
            Object.defineProperty(empty_fn, "name", { value: fnName });
            obj[fnName] = empty_fn;
        }
        enableMethod(obj, fnName) {
            obj[fnName] = obj[fnName + this.DISABLED_FN_SUFFIX];
        }
        getFirstProperty(obj) {
            try {
                for (let key in obj) {
                    return obj[key];
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        isNonEmpty(obj) {
            return !this.isEmpty(obj);
        }
    }

    class JsOtherUtilImpl {
        escapeXml(s) {
            try {
                return s.replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&apos;");
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
    }

    class JsRegexUtilImpl {
        escape(s) {
            return s.replace(/[-.*+?^${}()|[\]\\]/g, "\\$&");
        }
    }

    class JsSelectorUtilImpl {
        select(selector) {
            if (selector instanceof Node) {
                return selector;
            }
            return document.querySelector(selector);
        }
        selectFrom(elem, selector) {
            const parent = this.select(elem);
            return parent.querySelector(selector);
        }
        selectAll(selector, parent = document.body) {
            const parentElem = (parent && this.select(parent)) || document.documentElement;
            return Array.from(parentElem.querySelectorAll(selector));
        }
        selectAllOld(parent = document.body, selector) {
            const parentElem = (parent && this.select(parent)) || document.documentElement;
            return Array.from(parentElem.querySelectorAll(selector));
        }
        closest(elem, selector) {
            const domElem = this.select(elem);
            return domElem.closest(selector);
        }
        selectQ(params) {
            try {
                const parentElem = (params.container && this.select(params.container)) || document.documentElement;
                return parentElem.querySelector(params.selector);
            }
            catch (e) {
                logError(e);
                throw e;
            }
        }
    }

    class JsStringUtilImpl {
        capitalize(word) {
            try {
                if (!word) {
                    return "";
                }
                return word[0].toUpperCase() + word.slice(1);
            }
            catch (e) {
                logError(e);
                return word;
            }
        }
        removeChars(s, removeChars) {
            const set = new Set(removeChars);
            const replacedString = Array.from(s).filter(ch => !set.has(ch)).join("");
            return replacedString;
        }
        parseInt(s) {
            return parseInt(s) || 0;
        }
    }

    class JsTestImpl {
        initTest() {
            try {
                globalThis.assert = this.assert;
                globalThis.assertError = this.assertError;
                globalThis.logError = console.info;
            }
            catch (e) {
                logError(e);
            }
        }
        assert(condition, ...errorArgs) {
            if (condition) {
                return;
            }
            if (errorArgs.length == 0) {
                errorArgs.push("");
            }
            console.error.apply(console.error, errorArgs);
        }
        assertError(errorCode, code) {
            try {
                code();
            }
            catch (e) {
                if (e == errorCode) {
                    return;
                }
                throw ErrorCode.ASSERT_ERROR + `: expected ${errorCode} got ${e}`;
            }
            throw ErrorCode.ASSERT_ERROR + ` expected ${errorCode} got no error`;
        }
        callTests(objList) {
            for (let obj of objList) {
                this.callTestsFn(obj);
            }
        }
        callTestsFn(obj) {
            for (let key of Object.getOwnPropertyNames(obj.__proto__)) {
                if (!key.startsWith("test")) {
                    continue;
                }
                try {
                    obj[key]();
                }
                catch (e) {
                    console.error(e);
                }
            }
            info("DONE: ", obj?.constructor?.name);
        }
        logError(...errorArgs) {
            console.error.apply(console.error, errorArgs);
            console.trace();
        }
    }

    class JsTimeUtilImpl {
        async delay(seconds = 0) {
            return new Promise(res => setTimeout(res, seconds * 1000));
        }
        getSecondsPassed(fromTime) {
            return ((Date.now() - fromTime) / 1000) >> 0;
        }
        async waitForever() {
            return new Promise(gg$1.js.fn.emptyFn);
        }
    }

    class JsTSUtilImpl {
        getEnum(key, all) {
            if (key in all) {
                return all[key];
            }
            throw ErrorCode.INVALID_ENUM_KEY;
        }
    }

    class JsUrlImpl {
        secondLD = new Set(["ac", "biz", "co", "com", "edu", "firm", "gov", "info", "int", "ltd", "mil", "net",
            "ngo", "org", "pro", "res", "wiki"]);
        wwwPrefixRegex = /^www\./;
        dotDecimalRegex = /^\d{1,3}(?:\.\d{1,3}){3}$/;
        protocol = new UrlProtocol();
        isValid(url) {
            try {
                if (!url) {
                    return false;
                }
                new URL(url).hostname;
                return true;
            }
            catch (e) {
                console.error(e, url);
                return false;
            }
        }
        isAllValid(...urls) {
            try {
                return urls.every(x => this.isValid(x));
            }
            catch (e) {
                console.error(e, urls);
                return false;
            }
        }
        getHostName(url) {
            try {
                return new URL(url).hostname.replace(this.wwwPrefixRegex, "");
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        getHost(url) {
            try {
                return new URL(url).host.replace(this.wwwPrefixRegex, "");
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        getParentDomain(url) {
            try {
                const hostname = this.getHostName(url);
                if (this.isDotDecimalIP(hostname)) {
                    return hostname;
                }
                const parentDomain = this.getParentDomainFromHostName(hostname);
                return parentDomain;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        getParentDomainFromHostName(hostname) {
            try {
                const parts = hostname.split(".");
                switch (parts.length) {
                    case 1: return parts[0];
                    case 2: return parts[0] + "." + parts[1];
                }
                const last1 = parts[parts.length - 1];
                const last2 = parts[parts.length - 2];
                if (last1.length == 2 && this.secondLD.has(last2)) {
                    return parts[parts.length - 3] + "." + last2 + "." + last1;
                }
                return last2 + "." + last1;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
        getProtocol(url) {
            try {
                return new URL(url).protocol;
            }
            catch (e) {
                console.error(e);
                return "";
            }
        }
        isDotDecimalIP(input) {
            try {
                return this.dotDecimalRegex.test(input);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class JSWindowImpl {
        isTopFrame() {
            try {
                return window == window.top;
            }
            catch (e) {
                return false;
            }
        }
    }

    function logError$1(...args) {
        console.error(args);
        console.trace();
    }

    class JEventListenersImpl {
        constructor() { }
        listenerMap = {};
        add(eventName, listener) {
            const listeners = this.getListeners(eventName);
            listeners.push(listener);
        }
        dispatch(eventName, eventArgs = []) {
            const listeners = Array.from(this.getListeners(eventName));
            for (let listener of listeners) {
                listener.apply(null, eventArgs);
            }
        }
        remove(eventName, listener) {
            const listeners = this.getListeners(eventName);
            gg$1.js.array.removeElem(listeners, listener);
        }
        getListeners(eventName) {
            const existing = this.listenerMap[eventName];
            if (existing) {
                return existing;
            }
            const newListeners = [];
            this.listenerMap[eventName] = newListeners;
            return newListeners;
        }
    }

    var State;
    (function (State) {
        State["PENDING"] = "PENDING";
        State["RESOLVED"] = "RESOLVED";
        State["REJECTED"] = "REJECTED";
    })(State || (State = {}));
    class PromiseRRImpl {
        state = State.PENDING;
        val = null;
        listeners;
        constructor() {
            this.listeners = new JEventListenersImpl();
        }
        resolve(val = null) {
            this.changeState(State.RESOLVED, val);
        }
        reject(err = null) {
            this.changeState(State.REJECTED, err);
        }
        changeState(state, val) {
            if (this.state != State.PENDING) {
                return;
            }
            this.val = val;
            this.state = state;
            this.listeners.dispatch(state, [val]);
            this.listeners = null;
        }
        then(resolvedCallback, rejectedCallback) {
            switch (this.state) {
                case State.RESOLVED:
                    resolvedCallback(this.val);
                    return this;
                case State.REJECTED:
                    if (!rejectedCallback) {
                        return this;
                    }
                    rejectedCallback(this.val);
                    return this;
            }
            if (resolvedCallback) {
                this.listeners.add(State.RESOLVED, resolvedCallback);
            }
            if (rejectedCallback) {
                this.listeners.add(State.REJECTED, rejectedCallback);
            }
            return this;
        }
        isPending() {
            return this.state == State.PENDING;
        }
    }

    class TimedPromiseRRImpl extends PromiseRRImpl {
        constructor(maxWaitSeconds) {
            super();
            this.setupAutoReject(maxWaitSeconds);
        }
        setupAutoReject(maxWaitSeconds) {
            const timeout = setTimeout(() => this.reject("Z_TIMEOUT"), maxWaitSeconds * 1000);
            const clearTimeoutFn = () => clearTimeout(timeout);
            this.then(clearTimeoutFn, clearTimeoutFn);
        }
    }

    class JsPromiseUtilImpl {
        constructor() { }
        createNew() {
            return new PromiseRRImpl();
        }
        createTimed(maxWaitSeconds) {
            return new TimedPromiseRRImpl(maxWaitSeconds);
        }
    }

    class JsUtilImpl {
        static getInstance() {
            try {
                if (gg$1.js) {
                    return gg$1.js;
                }
                return gg$1.js = new JsUtilImpl();
            }
            catch (e) {
                throw e;
            }
        }
        array = new JsArrayUtilImpl();
        browser = new JsBrowserUtilImpl();
        promise = new JsPromiseUtilImpl();
        crypto = new JsCryptoImpl();
        dom = new JsDomUtilImpl();
        event = new JsEventImpl();
        test = new JsTestImpl();
        fn = new JsFunctionUtilImpl();
        fnOut = new JsFnOutImpl();
        time = new JsTimeUtilImpl();
        loop = new JsLoopUtilImpl();
        log = new JsLogUtilImpl();
        logo = new JsLogoUtilImpl();
        math = new JsMathUtilImpl();
        map = new JsMapUtilImpl();
        obj = new JsObjUtilImpl();
        other = new JsOtherUtilImpl();
        selector = new JsSelectorUtilImpl();
        date = new JsDateUtilImpl();
        encoding = new JsEncodingUtilImpl();
        regex = new JsRegexUtilImpl();
        string = new JsStringUtilImpl();
        tsUtil = new JsTSUtilImpl();
        url = new JsUrlImpl();
        window = new JSWindowImpl();
        init() {
            try {
                this.init = this.fn.emptyFn;
                this.log.init();
                globalThis.js = this;
                globalThis.fnOut = this.fnOut;
                globalThis.jserror = jserror;
                globalThis.logError = logError$1;
                globalThis.logInfo = globalThis.info = this.log.info.bind(this.log);
                globalThis.isDevMode = Boolean(globalThis.isDevMode);
            }
            catch (e) {
                logError$1(e);
            }
        }
    }

    var SessionStorageKeys;
    (function (SessionStorageKeys) {
        SessionStorageKeys["MASTER_KEY"] = "MASTER_KEY";
        SessionStorageKeys["ORG_KEY"] = "ORG_KEY";
        SessionStorageKeys["SESSION_AES_KEY"] = "SESSION_AES_KEY";
        SessionStorageKeys["LAST_ACTIVE"] = "LAST_ACTIVE";
        SessionStorageKeys["IN_PROGRESS_RESETS"] = "IN_PROGRESS_RESETS";
        SessionStorageKeys["LAST_BASIC_AUTH_EVENT"] = "LAST_BASIC_AUTH_EVENT";
        SessionStorageKeys["TAB_CREATOR_PREFIX"] = "TAB_CREATOR_";
        SessionStorageKeys["ACCOUNT_CHECK_VALID_UPTO"] = "ACCOUNT_CHECK_VALID_UPTO";
        SessionStorageKeys["SIDE_PANEL_OPENED_FROM"] = "SIDE_PANEL_OPENED_FROM";
        SessionStorageKeys["ZMAPS_INITIALIZED"] = "ZMAPS_INITIALIZED";
        SessionStorageKeys["POST_UNLOCK_TASK"] = "POST_UNLOCK_TASK";
        SessionStorageKeys["OAUTH_IN_PROGRESS"] = "OAUTH_IN_PROGRESS";
        SessionStorageKeys["OAUTH_CHALLENGE"] = "OAUTH_CHALLENGE";
        SessionStorageKeys["ONEAUTH_UNLOCK_STARTED"] = "ONEAUTH_UNLOCK_STARTED";
        SessionStorageKeys["POPUP_UNLOCK_ERROR"] = "POPUP_UNLOCK_ERROR";
        SessionStorageKeys["EXT_CRYPTO_AES_KEY"] = "EXT_CRYPTO_AES_KEY";
    })(SessionStorageKeys || (SessionStorageKeys = {}));

    class LocalStorageImpl {
        static instance = null;
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return this.instance = new LocalStorageImpl();
        }
        async save(key, val) {
            return this.saveAll({ [key]: val });
        }
        async saveAll(keyValObj) {
            return brApi.storage.local.saveAll(keyValObj);
        }
        async load(key, defaultVal = "") {
            const existing = await brApi.storage.local.loadAll({ [key]: defaultVal });
            return existing[key];
        }
        async loadAll(keyObj) {
            return brApi.storage.local.loadAll(keyObj);
        }
        async remove(keyOrKeys) {
            return brApi.storage.local.remove(keyOrKeys);
        }
        async clear() {
            return brApi.storage.local.clear();
        }
    }

    class SessionStorageImpl {
        static instance = null;
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return this.instance = new SessionStorageImpl();
        }
        async save(key, val) {
            return this.saveAll({ [key]: val });
        }
        async load(key, defaultVal = null) {
            const existing = await this.loadAll({ [key]: defaultVal });
            return existing[key];
        }
        async saveAll(keyValObj) {
            return bgApi.session.saveAll(keyValObj);
        }
        async loadAll(keyObj) {
            return bgApi.session.loadAll(keyObj);
        }
        async remove(keyOrKeys) {
            return bgApi.session.remove(keyOrKeys);
        }
        async clear() {
            return bgApi.session.clear();
        }
    }

    class TabDomainStorageImpl {
        static instance = null;
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return this.instance = new TabDomainStorageImpl();
        }
        async load(key, defaultVal = null) {
            return bgApi.tab.loadFromDomainMemory(key, defaultVal);
        }
        async save(key, val) {
            const allowedDomains = await vutil.getValidSaveDomains();
            return bgApi.tab.saveToDomainMemory(key, val, allowedDomains);
        }
        async saveDomain(key, val, allowedDomains) {
            return bgApi.tab.saveToDomainMemory(key, val, allowedDomains);
        }
        async remove(key) {
            return bgApi.tab.removeFromMemory(key);
        }
    }

    class TabStorageImpl {
        static instance = null;
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return this.instance = new TabStorageImpl();
        }
        async load(key, defaultVal = null) {
            return bgApi.tab.loadFromMemory(key, defaultVal);
        }
        async save(key, val) {
            return bgApi.tab.saveToMemory(key, val);
        }
        async remove(key) {
            return bgApi.tab.removeFromMemory(key);
        }
        async clear() {
            return bgApi.tab.clearMemory();
        }
    }

    class VtImpl {
        static instance = null;
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return this.instance = new VtImpl();
        }
        initializer = new Initializer();
        constructor() {
            this.initializer.init();
        }
        async init(params) {
            try {
                this.initializer.initLogging(params.logPrefix);
                if (!params.skipBgApiInit) {
                    await bgApi.init();
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async isPersonalPlan() {
            try {
                const isPersonalPlan = await zlocalStorage.load(LocalStorageKeys.IS_PERSONAL_PLAN, false);
                return isPersonalPlan;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }
    class Initializer {
        init() {
            try {
                this.initJs();
                BrApiImpl.getInstance().init();
                this.initStorage();
                this.init = js.fn.emptyFn;
            }
            catch (e) {
                logError(e);
            }
        }
        initLogging(prefix) {
            try {
                if (!isDevMode) {
                    return;
                }
                js.log.setInfoPrefix(prefix);
                js.log.enableLogging(true);
            }
            catch (e) {
                logError(e);
            }
        }
        initJs() {
            try {
                globalThis.js = JsUtilImpl.getInstance();
                js.init();
            }
            catch (e) {
                logError(e);
            }
        }
        initStorage() {
            try {
                globalThis.zlocalStorage = LocalStorageImpl.getInstance();
                globalThis.zsessionStorage = SessionStorageImpl.getInstance();
                globalThis.ztabStorage = TabStorageImpl.getInstance();
                globalThis.ztabDomainStorage = TabDomainStorageImpl.getInstance();
                globalThis["LocalStorageKeys"] = LocalStorageKeys;
                globalThis["SessionStorageKeys"] = SessionStorageKeys;
                globalThis["TabStorageKeys"] = TabStorageKeys;
                globalThis["TabDomainStorageKeys"] = TabDomainStorageKeys;
            }
            catch (e) {
                logError(e);
            }
        }
    }

    function main$2() {
        globalThis.i18n = i18n$1;
        globalThis.vt = VtImpl.getInstance();
    }

    class AttributeChecker {
        params;
        static check(params) {
            return new AttributeChecker(params).check();
        }
        testValue;
        testAttribute;
        constructor(params) {
            this.params = params;
            this.initAttributePredicate();
        }
        initAttributePredicate() {
            const checkPredicate = this.testValue = this.getCheckPredicate();
            if (this.params.checkOnlyValue) {
                this.testAttribute = testAttributeValue.bind(null, checkPredicate);
                return;
            }
            this.testAttribute = testAttribute.bind(null, checkPredicate);
        }
        check() {
            try {
                const ignoreAttribute = new Set(this.params.ignoreAttribute || []);
                const elem = this.params.elem;
                for (let i = 0; i < elem.attributes.length; i++) {
                    if (ignoreAttribute.has(elem.attributes[i].name)) {
                        continue;
                    }
                    if (this.testAttribute(elem.attributes[i])) {
                        return true;
                    }
                }
                return this.checkLabels();
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        getCheckPredicate() {
            const keyPredicate = this.getTestPredicate(this.params.key);
            if (!this.params.invalidKey) {
                return keyPredicate;
            }
            const invalidKeyPredicate = this.getTestPredicate(this.params.invalidKey);
            return x => keyPredicate(x) && !invalidKeyPredicate(x);
        }
        getTestPredicate(value) {
            if (typeof value == "string") {
                return testString.bind(null, value.toLocaleLowerCase());
            }
            if (value instanceof RegExp) {
                return testRegex.bind(null, value);
            }
            throw "NEW_STATE";
        }
        checkLabels() {
            try {
                const elem = this.params.elem;
                if (!elem.labels || !elem.labels.length) {
                    return false;
                }
                for (let label of Array.from(elem.labels)) {
                    if (this.testValue(label.textContent)) {
                        return true;
                    }
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }
    function testAttribute(testPredicate, attribute) {
        return testPredicate(attribute.name) || testPredicate(attribute.value);
    }
    function testAttributeValue(testPredicate, attribute) {
        return testPredicate(attribute.value);
    }
    function testString(key, value) {
        return value.toLocaleLowerCase().includes(key);
    }
    function testRegex(regex, value) {
        return regex.test(value.toLocaleLowerCase());
    }

    class CSNodeIterator {
        root;
        constructor(root) {
            this.root = root;
        }
        *[Symbol.iterator]() {
            try {
                if (!this.root) {
                    throw "INVALID_ROOT";
                }
                const walker = document.createTreeWalker(this.root, NodeFilter.SHOW_ELEMENT);
                let shadowRoot = null;
                while (walker.nextNode()) {
                    if (!(walker.currentNode instanceof HTMLElement)) {
                        continue;
                    }
                    yield walker.currentNode;
                    shadowRoot = csutil$1.dom.getShadowRoot(walker.currentNode);
                    if (!shadowRoot) {
                        continue;
                    }
                    for (let elem of new CSNodeIterator(shadowRoot)) {
                        yield elem;
                    }
                }
                const isHtmlElement = this.root instanceof HTMLElement;
                if (!isHtmlElement) {
                    return;
                }
                shadowRoot = csutil$1.dom.getShadowRoot(this.root);
                if (!shadowRoot) {
                    return;
                }
                for (let elem of new CSNodeIterator(shadowRoot)) {
                    yield elem;
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class CSDomUtilImpl {
        hasAttribute(params) {
            return AttributeChecker.check(params);
        }
        getAttributeValues(elem) {
            try {
                const ans = [];
                for (let i = 0; i < elem.attributes.length; i++) {
                    ans.push(elem.attributes[i].value.toLowerCase());
                }
                return ans;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        getAncestor(child1, child2) {
            try {
                const parent1List = this.getParentNodes(child1);
                const parent2List = this.getParentNodes(child2);
                let parent = document.documentElement;
                let i1 = parent1List.length - 1;
                let i2 = parent2List.length - 1;
                for (; (i1 >= 0) && (i2 >= 0); i1--, i2--) {
                    if (parent1List[i1] != parent2List[i2]) {
                        return parent;
                    }
                    parent = parent1List[i1];
                }
                return parent;
            }
            catch (e) {
                logError(e);
                return document.documentElement;
            }
        }
        hasCaptchaFrame(container, input) {
            try {
                const captchaFrame = this.getCaptchaFrame(container);
                return captchaFrame && (!input || !captchaFrame.contains(input));
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        getShadowRoot(elem) {
            try {
                if (elem instanceof SVGElement) {
                    return null;
                }
                if (elem.shadowRoot) {
                    return brApi.dom.getShadowRoot(elem);
                }
                if (!elem.nodeName.includes("-")) {
                    return null;
                }
                return brApi.dom.getShadowRoot(elem);
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        contains(parent, child) {
            try {
                if (parent.contains(child)) {
                    return true;
                }
                for (let elem of new CSNodeIterator(parent)) {
                    if (elem == child) {
                        return true;
                    }
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        *getParentIterator(elem) {
            try {
                while (elem.parentElement) {
                    yield elem.parentElement;
                    elem = elem.parentElement;
                }
                const shadowRoot = this.getShadowParent(elem);
                if (!shadowRoot) {
                    return;
                }
                for (let elem of this.getParentIterator(shadowRoot)) {
                    yield elem;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getParentNodes(elem) {
            return [...this.getParentIterator(elem)];
        }
        getElementsFromPoint(point) {
            try {
                return this.getElementsFromPointFn(point, document);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        getElementFromPoint(point) {
            try {
                const elemList = this.getElementsFromPoint(point);
                if (elemList.length == 0) {
                    return null;
                }
                return elemList[0];
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getEventTarget(e) {
            try {
                const mEvent = e;
                if (mEvent.clientX && mEvent.clientY) {
                    return this.getElementFromPoint({ x: mEvent.clientX, y: mEvent.clientY });
                }
                return e.target;
            }
            catch (e) {
                logError(e);
                return e.target;
            }
        }
        getEventTargetInput(e) {
            try {
                if (e.target instanceof HTMLInputElement) {
                    return e.target;
                }
                const mEvent = e;
                if (!(mEvent.clientX && mEvent.clientY)) {
                    return null;
                }
                const inputElem = this.getInputFromPoint({ x: mEvent.clientX, y: mEvent.clientY });
                if (inputElem) {
                    return inputElem;
                }
                return null;
            }
            catch (e) {
                logError(e);
                return e.target;
            }
        }
        getInputFromPoint(point) {
            try {
                const elemList = this.getElementsFromPoint(point);
                if (elemList.length == 0) {
                    return null;
                }
                for (let elem of elemList) {
                    if (elem instanceof HTMLInputElement) {
                        return elem;
                    }
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getElementsFromPointFn(point, fragment) {
            try {
                const elements = fragment.elementsFromPoint(point.x, point.y);
                if (elements.length == 0) {
                    return [];
                }
                const innerShadowRoot = this.getShadowRoot(elements[0]);
                if (!innerShadowRoot) {
                    return elements;
                }
                if (innerShadowRoot == fragment) {
                    return elements;
                }
                return this.getElementsFromPointFn(point, innerShadowRoot);
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getShadowParent(elem) {
            return elem.getRootNode().host;
        }
        getCaptchaFrame(container) {
            try {
                const elements = csutil.selector.selectAll("iframe,button,input[type='submit']", { container, shadowRoot: false });
                let frame = null;
                for (let elem of elements) {
                    if (!csutil.isVisible(elem)) {
                        continue;
                    }
                    if (elem.matches("iframe")) {
                        frame = elem;
                        continue;
                    }
                    if (frame != null && frame.getBoundingClientRect().bottom < elem.getBoundingClientRect().top) {
                        return frame;
                    }
                    return null;
                }
                if (frame != null && csutil.isVisible(frame)) {
                    return frame;
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }

    class ActiveInputObserver {
        activeInput = null;
        init() {
            js.fn.bindThis(this, [this.check]);
            document.addEventListener("focusin", this.check, true);
            document.addEventListener("click", this.check, true);
            document.addEventListener("contextmenu", this.check, true);
            const activeElem = this.getActiveDomElement();
            if (activeElem instanceof HTMLInputElement) {
                this.activeInput = activeElem;
            }
        }
        getActiveInput() {
            const activeElem = this.getActiveDomElement();
            if (activeElem instanceof HTMLInputElement) {
                return activeElem;
            }
            return this.activeInput;
        }
        check(e) {
            try {
                if (!e.isTrusted) {
                    return;
                }
                const activeElem = this.getActiveDomElement();
                if (activeElem instanceof HTMLInputElement) {
                    this.checkSetValidInput(activeElem);
                    return;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        getActiveDomElement() {
            if (!document.activeElement) {
                return null;
            }
            return this.getActiveDomElementFn(document.activeElement);
        }
        getActiveDomElementFn(elem) {
            try {
                if (!elem) {
                    return null;
                }
                const shadowRoot = csutil.dom.getShadowRoot(elem);
                if (shadowRoot) {
                    return this.getActiveDomElementFn(shadowRoot.activeElement);
                }
                return elem;
            }
            catch (e) {
                logError(e);
                return elem;
            }
        }
        checkSetValidInput(input) {
            try {
                if (this.isValidInput(input)) {
                    this.activeInput = input;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        isValidInput(input) {
            const validInputTypes = ["text", "email", "number", "password", "tel", "search"];
            const isValidInputType = validInputTypes.includes(input.type);
            return isValidInputType;
        }
    }

    class CSInputFilterImpl {
        visibleFilter = visibleFilter;
        usernameFilter = usernameFilter;
        editableFilter = (input) => !input.disabled && !input.readOnly;
        and(...filters) {
            return function (input) {
                return filters.every(filter => filter(input));
            };
        }
        or(...filters) {
            return function (input) {
                return filters.some(filter => filter(input));
            };
        }
        newTypeFilter(types) {
            return function typeFilter(input) {
                return types.includes(csutil$1.input.typeOf(input));
            };
        }
    }
    function visibleFilter(input) {
        return csutil$1.isVisible(input);
    }
    function usernameFilter(input) {
        return [InputType.TEXT, InputType.EMAIL].includes(csutil$1.input.typeOf(input)) &&
            !csutil$1.dom.hasAttribute({ elem: input, key: /search|captcha/ });
    }

    class InputTypeProvider {
        typeSymbol = Symbol();
        async init() {
            try {
                js.fn.bindThis(this, [this.check, this.passwordToTextListener]);
                document.addEventListener("click", this.check, true);
                document.addEventListener("focusin", this.check, true);
                csutil$1.input.listenPasswordToText(this.passwordToTextListener);
                const skipDiscPasswordCheck = (await zlocalStorage.load(LocalStorageKeys.SKIP_DISC_PASSWORD_CHECK, STRING.FALSE)) == STRING.TRUE;
                if (skipDiscPasswordCheck) {
                    this.isDiscPassword = () => false;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        typeOf(input) {
            try {
                if (input[this.typeSymbol] == InputType.PASSWORD || this.isDiscPassword(input)) {
                    return InputType.PASSWORD;
                }
                return input[this.typeSymbol] || input.type;
            }
            catch (e) {
                logError(e);
                return input.type;
            }
        }
        check(e) {
            try {
                if (!e.isTrusted) {
                    return;
                }
                const input = csutil$1.dom.getEventTargetInput(e);
                if (!input) {
                    return;
                }
                if (input.type != InputType.PASSWORD) {
                    return;
                }
                input[this.typeSymbol] = InputType.PASSWORD;
            }
            catch (e) {
                logError(e);
            }
        }
        passwordToTextListener(input) {
            input[this.typeSymbol] = InputType.PASSWORD;
        }
        isDiscPassword(input) {
            try {
                const textSecurity = window.getComputedStyle(input)["webkitTextSecurity"];
                return textSecurity && textSecurity != "none";
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class PasswordToTextObserver {
        listener;
        constructor(listener) {
            this.listener = listener;
        }
        init() {
            try {
                js.fn.bindThis(this, [this.handleMutation]);
                const observer = new MutationObserver(this.handleMutation);
                observer.observe(document.body || document.documentElement, {
                    attributeFilter: ["type"],
                    subtree: true,
                    attributeOldValue: true
                });
            }
            catch (e) {
                logError(e);
            }
        }
        handleMutation(mutations, _observer) {
            let reqMutation = false;
            for (let mutation of mutations) {
                reqMutation = (mutation.target instanceof HTMLInputElement) && (mutation.oldValue == "password");
                if (!reqMutation) {
                    continue;
                }
                this.listener(mutation.target);
            }
        }
    }

    class CSInputUtilImpl {
        typeProvider = new InputTypeProvider();
        activeInputObserver = new ActiveInputObserver();
        filter = new CSInputFilterImpl();
        constructor() {
            this.waitForVisibleInput = js.fn.wrapper.createSingleInstance(this.waitForVisibleInput, this);
            this.waitForPasswordDisappear = js.fn.wrapper.createSingleInstance(this.waitForPasswordDisappear, this);
        }
        async init() {
            try {
                this.activeInputObserver.init();
                await this.typeProvider.init();
            }
            catch (e) {
                logError(e);
            }
        }
        listenPasswordToText(x) {
            new PasswordToTextObserver(x).init();
        }
        typeOf(input) {
            return this.typeProvider.typeOf(input);
        }
        getActiveInput() {
            return this.activeInputObserver.getActiveInput();
        }
        isCaptcha(elem) {
            return csutil.dom.hasAttribute({ elem, key: "captcha" });
        }
        select(params) {
            try {
                const inputs = this.selectAll(params);
                return inputs.length > 0 ? inputs[0] : null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        selectAll(params) {
            try {
                const inputs = csutil.selector.selectAll("input", { container: params.container, visible: params.visible, shadowRoot: params.shadowRoot });
                const reqTypeInputs = this.filterInputType(inputs, params);
                const editableInputs = this.filterEditable(reqTypeInputs, params);
                return editableInputs;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        async waitForVisibleInput(params) {
            try {
                await js.dom.waitDomLoad();
                const selectParams = {
                    visible: true,
                    types: [InputType.TEXT, InputType.PASSWORD, InputType.EMAIL, InputType.TEL, InputType.NUMBER],
                    shadowRoot: params.shadowRoot,
                };
                const maxWaitSecs = params.maxWaitSecs ?? 15;
                for (let _ of js.loop.range(maxWaitSecs)) {
                    if (this.select(selectParams)) {
                        return true;
                    }
                    await js.time.delay(1);
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async waitForPasswordDisappear(param) {
            try {
                await js.dom.waitDomLoad();
                const selectParams = {
                    visible: true,
                    types: [InputType.PASSWORD],
                    shadowRoot: param.shadowRoot,
                };
                const maxWaitSecs = param.maxWaitSecs ?? 15;
                for (let _ of js.loop.range(maxWaitSecs)) {
                    if (!this.select(selectParams)) {
                        return;
                    }
                    await js.time.delay(1);
                }
            }
            catch (e) {
                logError(e);
                return;
            }
        }
        getPasswords(params) {
            try {
                const selectParams = {
                    container: params.container,
                    visible: params.visible,
                    types: [InputType.PASSWORD],
                    shadowRoot: params.shadowRoot,
                    editable: params.editable,
                };
                return this.selectAll(selectParams);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        getPassword(params) {
            try {
                const selectParams = {
                    container: params.container,
                    visible: params.visible,
                    types: [InputType.PASSWORD],
                    shadowRoot: params.shadowRoot,
                    editable: params.editable,
                };
                return this.select(selectParams);
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getUsernames(params) {
            try {
                return this.selectAll({
                    container: params.container,
                    visible: params.visible,
                    types: [InputType.TEXT, InputType.EMAIL],
                    shadowRoot: params.shadowRoot,
                    editable: params.editable,
                });
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        getUsername(params) {
            try {
                return this.select({
                    container: params.container,
                    types: [InputType.TEXT, InputType.EMAIL],
                    visible: params.visible,
                    shadowRoot: params.shadowRoot,
                    editable: params.editable,
                });
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        checkIsRightToLeft(input) {
            try {
                const RIGHT_TO_LEFT = "rtl";
                const direction = window.getComputedStyle(input).direction;
                return direction == RIGHT_TO_LEFT;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        isValidTextPassword(input) {
            try {
                return input.type == InputType.PASSWORD || this.filter.usernameFilter(input);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        isValidTextPasswordNumber(input) {
            try {
                return [InputType.PASSWORD, InputType.TEL, InputType.NUMBER].includes(input.type) || this.filter.usernameFilter(input);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        filterInputType(inputs, params) {
            try {
                const filter = this.getTypeFilter(params);
                return inputs.filter(filter);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        getTypeFilter(params) {
            try {
                if (!params.types.includes(InputType.TEXT)) {
                    return this.filter.newTypeFilter(params.types);
                }
                if (params.types.length == 1) {
                    return this.filter.usernameFilter;
                }
                const nonTextTypes = params.types.filter(x => x != InputType.TEXT);
                return this.filter.or(this.filter.usernameFilter, this.filter.newTypeFilter(nonTextTypes));
            }
            catch (e) {
                logError(e);
                return () => true;
            }
        }
        filterEditable(inputs, params) {
            try {
                if (!params.editable) {
                    return inputs;
                }
                return inputs.filter(this.filter.editableFilter);
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
    }

    class LoginUtilImpl {
        isLoginUrl(url) {
            try {
                const urlObj = new URL(url);
                const hyphenRegex = /(-|_)/g;
                const hostName = urlObj.hostname.toLowerCase().replace(hyphenRegex, "");
                const hostNameRegex = /\b(accounts?|auth|login|signin|logon)\b/;
                if (hostNameRegex.test(hostName)) {
                    return true;
                }
                const path = urlObj.pathname.toLowerCase().replace(hyphenRegex, "");
                const pathRegex = /\b(login|signin|auth|logon)\b/;
                if (pathRegex.test(path)) {
                    return true;
                }
                const hash = urlObj.hash.toLowerCase().replace(hyphenRegex, "");
                if (pathRegex.test(hash)) {
                    return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class NewPassPageCheckerProvider {
        static isPasswordChangePage() {
            return new NewPassPageChecker().isPasswordChangePage();
        }
    }
    class CheckRegex {
        static oldPassword = /old|cur(rent)?/i;
        static newPassword = /new/i;
        static confirmPassword = /confirm|check|repeat|again/i;
    }
    class NewPassPageChecker {
        visiblePasswords = null;
        visibleUsernames = null;
        isPasswordChangePage() {
            try {
                this.visiblePasswords = csutil.input.getPasswords({ visible: true, shadowRoot: false });
                this.visibleUsernames = csutil.input.getUsernames({ visible: true, shadowRoot: false });
                if (this.check3PassNoUsername()) {
                    info(NewPassPageChecker.name, "password change page - 3 passwords no username");
                    return true;
                }
                if (this.checkAttribute()) {
                    info(NewPassPageChecker.name, "password change page - attribute");
                    return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        check3PassNoUsername() {
            return (this.visiblePasswords.length == 3) && (this.visibleUsernames.length == 0);
        }
        checkAttribute() {
            if (this.checkSignUpAndLoginPage()) {
                return false;
            }
            if (this.check3Passwords()) {
                return true;
            }
            if (this.check2Passwords()) {
                return true;
            }
            return false;
        }
        check3Passwords() {
            try {
                if (this.visiblePasswords.length != 3) {
                    return false;
                }
                if (this.checkOldPasswordAttribute(this.visiblePasswords[0])) {
                    info(NewPassPageChecker.name, "3 password - old password");
                    return true;
                }
                if (this.checkNewPasswordAttribute(this.visiblePasswords[1])) {
                    info(NewPassPageChecker.name, "3 password - new password");
                    return true;
                }
                if (this.checkConfirmPasswordAttribute(this.visiblePasswords[2])) {
                    info(NewPassPageChecker.name, "3 password - confirm password");
                    return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        check2Passwords() {
            try {
                if (this.visiblePasswords.length != 2) {
                    return false;
                }
                if (this.checkOldPasswordAttribute(this.visiblePasswords[0])) {
                    info(NewPassPageChecker.name, "2 passwords - 1 old password");
                    return true;
                }
                if (this.checkNewPasswordAttribute(this.visiblePasswords[0])) {
                    info(NewPassPageChecker.name, "2 passwords - 1 new password");
                    return true;
                }
                if (this.checkNewPasswordAttribute(this.visiblePasswords[1])) {
                    info(NewPassPageChecker.name, "2 passwords - 2 new password");
                    return true;
                }
                if (this.checkConfirmPasswordAttribute(this.visiblePasswords[1])) {
                    info(NewPassPageChecker.name, "2 passwords - 2 confirm password");
                    return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        checkOldPasswordAttribute(password) {
            return this.checkAttributeRegex(this.getValidAttributes(password), [CheckRegex.oldPassword]);
        }
        checkNewPasswordAttribute(password) {
            return this.checkAttributeRegex(this.getValidAttributes(password), [CheckRegex.newPassword]);
        }
        checkConfirmPasswordAttribute(password) {
            return this.checkAttributeRegex(this.getValidAttributes(password), [CheckRegex.confirmPassword]);
        }
        checkAttributeRegex(attributes, regexList) {
            let curRegex;
            let curAttributes = attributes;
            for (let i = 0; i < regexList.length && curAttributes.length > 0; i++) {
                curRegex = regexList[i];
                curAttributes = curAttributes.filter(x => curRegex.test(x));
            }
            return curAttributes.length > 0;
        }
        getValidAttributes(elem) {
            try {
                const attributes = csutil.dom.getAttributeValues(elem);
                const passAttributes = attributes.filter(x => x.includes("password") ? x.length > 8 : x.includes("pass"));
                return passAttributes;
            }
            catch (e) {
                console.error(e, elem);
                return [];
            }
        }
        checkSignUpAndLoginPage() {
            try {
                if (this.visiblePasswords.length != 3) {
                    return false;
                }
                const parent = csutil.dom.getAncestor(this.visiblePasswords[1], this.visiblePasswords[2]);
                return !parent.contains(this.visiblePasswords[0]);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class CSPageUtilImpl {
        isPasswordChangePage() {
            return NewPassPageCheckerProvider.isPasswordChangePage();
        }
    }

    class CSWindowUtilImpl {
        respPromise = js.promise.createNew();
        listenWindowEvents = [
            "click", "mouseover", "contextmenu", "resize"
        ];
        init() {
            this.check = js.fn.wrapper.createSingleInstListener(this.check, this);
        }
        async waitForValidWindow() {
            try {
                if (this.isValidWindow()) {
                    return;
                }
                this.init();
                this.addListeners();
                return this.respPromise;
            }
            catch (e) {
                logError(e);
            }
        }
        isTopFrame() {
            try {
                return window == window.top;
            }
            catch (e) {
                return false;
            }
        }
        addListeners() {
            for (let eventName of this.listenWindowEvents) {
                window.addEventListener(eventName, this.check);
            }
        }
        removeListeners() {
            for (let eventName of this.listenWindowEvents) {
                window.removeEventListener(eventName, this.check);
            }
        }
        check() {
            const valid = this.isValidWindow();
            if (!valid) {
                return;
            }
            this.respPromise.resolve();
            this.removeListeners();
        }
        isValidWindow() {
            return this.isTopFrame() ||
                document.documentElement.clientWidth * document.documentElement.clientHeight >= 9000;
        }
    }

    class CSSelectorUtilImpl {
        domSelector;
        shadowSelector;
        async init() {
            try {
                this.domSelector = csSelectorMethodProvider.getDomSelector();
                await this.initShadowSelector();
            }
            catch (e) {
                logError(e);
            }
        }
        async initShadowSelector() {
            try {
                const noShadow = await zlocalStorage.load(VtSettings.DISABLE_SHADOW_ROOT, false);
                if (noShadow) {
                    this.shadowSelector = this.domSelector;
                    return;
                }
                this.shadowSelector = csSelectorMethodProvider.getShadowSelector();
            }
            catch (e) {
                logError(e);
            }
        }
        select(selector, param) {
            try {
                return this.getSelectorMethod(param).select(selector, param);
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        selectAll(selector, param) {
            try {
                const elemList = this.getSelectorMethod(param).selectAll(selector, param);
                const visibleElems = param.visible ? elemList.filter(x => csutil$1.isVisible(x)) : elemList;
                return visibleElems;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        closest(elem, selector) {
            try {
                if (!elem) {
                    return null;
                }
                if (elem.matches(selector)) {
                    return elem;
                }
                for (let x of csutil$1.dom.getParentIterator(elem)) {
                    if (x.matches(selector)) {
                        return x;
                    }
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getSelectorMethod(param) {
            try {
                if (param.shadowRoot) {
                    return this.shadowSelector;
                }
                return this.domSelector;
            }
            catch (e) {
                logError(e);
                return this.domSelector;
            }
        }
    }

    class CSSelectorAttribute {
        checkAttributes(elem, attributes) {
            try {
                if (attributes.ariaLabel && elem.ariaLabel != attributes.ariaLabel) {
                    return false;
                }
                if (attributes.placeholder && elem.placeholder != attributes.placeholder) {
                    return false;
                }
                if (attributes.type && elem.type != attributes.type) {
                    return false;
                }
                return true;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        getAttributes(elem) {
            try {
                const attributes = {};
                if (!(elem instanceof HTMLInputElement)) {
                    return attributes;
                }
                attributes.type = csutil.input.typeOf(elem);
                if (elem.ariaLabel) {
                    attributes.ariaLabel = elem.ariaLabel;
                }
                if (elem.placeholder) {
                    attributes.placeholder = elem.placeholder;
                }
                return attributes;
            }
            catch (e) {
                logError(e);
                return {};
            }
        }
    }

    var CSUniqSelectorMovementType;
    (function (CSUniqSelectorMovementType) {
        CSUniqSelectorMovementType["CHILD"] = "CHILD";
        CSUniqSelectorMovementType["SHADOW"] = "SHADOW";
    })(CSUniqSelectorMovementType || (CSUniqSelectorMovementType = {}));

    class CSSelectorPositionUtil {
        static getPosition(elem) {
            try {
                const rect = elem.getBoundingClientRect();
                const position = {
                    width: rect.width,
                    height: rect.height,
                };
                return position;
            }
            catch (e) {
                logError(e);
                return { width: 0, height: 0 };
            }
        }
        static isEqual(p1, p2) {
            try {
                return p1.height == p2.height &&
                    p1.width == p2.width;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
    }

    class CSSelectorGetter {
        VERSION = 1;
        getSelector(elem) {
            try {
                const selector = {
                    version: this.VERSION,
                    tagName: elem.tagName,
                    path: this.getMovement(elem),
                    position: CSSelectorPositionUtil.getPosition(elem),
                    topFrame: js.window.isTopFrame(),
                    host: csutil$1.uniqSelector.getHost(),
                    attributes: csutil$1.uniqSelector.attributeUtil.getAttributes(elem),
                };
                return selector;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        getMovement(elem) {
            try {
                const path = [];
                while (elem.parentElement) {
                    path.push({
                        type: CSUniqSelectorMovementType.CHILD,
                        index: this.findIndex(elem),
                        destTagName: elem.tagName,
                    });
                    elem = elem.parentElement;
                }
                if (elem == document.documentElement) {
                    path.reverse();
                    return path;
                }
                path.push({
                    type: CSUniqSelectorMovementType.SHADOW,
                    index: this.findIndex(elem, elem.getRootNode()),
                    destTagName: elem.tagName,
                });
                const parent = elem.getRootNode().host;
                const parentPath = this.getMovement(parent);
                path.reverse();
                parentPath.push(...path);
                return parentPath;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
        findIndex(elem, parentInput) {
            try {
                const parent = parentInput || elem.parentElement;
                for (let i = 0; i < parent.children.length; i++) {
                    if (parent.children.item(i) == elem) {
                        return i;
                    }
                }
                throw "CANNOT_FIND_INDEX";
            }
            catch (e) {
                logError(e);
                return 0;
            }
        }
    }

    class CSSelectorSelecter {
        select(selector) {
            try {
                const elem = this.selectPath(selector.path);
                if (!elem) {
                    return null;
                }
                if (selector.tagName != elem.tagName) {
                    return null;
                }
                if (!CSSelectorPositionUtil.isEqual(selector.position, CSSelectorPositionUtil.getPosition(elem))) {
                    return null;
                }
                if (selector.topFrame != js.window.isTopFrame()) {
                    return null;
                }
                if (selector.host != csutil$1.uniqSelector.getHost()) {
                    return null;
                }
                if (!csutil$1.uniqSelector.attributeUtil.checkAttributes(elem, selector.attributes)) {
                    return null;
                }
                return elem;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        selectPath(path) {
            try {
                let elem = document.documentElement;
                for (let i = 0; i < path.length; i++) {
                    elem = this.moveNext(elem, path[i]);
                    if (!elem) {
                        return null;
                    }
                    if (elem.tagName != path[i].destTagName) {
                        return null;
                    }
                }
                return elem;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        moveNext(elem, move) {
            try {
                switch (move.type) {
                    case CSUniqSelectorMovementType.CHILD: {
                        if (elem.children.length <= move.index) {
                            return null;
                        }
                        return elem.children.item(move.index);
                    }
                    case CSUniqSelectorMovementType.SHADOW:
                        return csutil$1.dom.getShadowRoot(elem)?.children[move.index];
                }
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
    }

    class CSUniqSelectorUtilImpl {
        selectorGetter = new CSSelectorGetter();
        selectorSelecter = new CSSelectorSelecter();
        attributeUtil = new CSSelectorAttribute();
        getSelector(elem) {
            return this.selectorGetter.getSelector(elem);
        }
        select(selector) {
            return this.selectorSelecter.select(selector);
        }
        getHost() {
            try {
                return new URL(window.location.href).host;
            }
            catch (e) {
                logError(e);
                return "";
            }
        }
    }

    class VisibilityChecker {
        isVisible(elem, checkZIndex = true) {
            try {
                return this.isVisibleOffset(elem) && (!checkZIndex || this.isVisibleZIndex(elem)) && this.isNotHidden(elem);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        isVisibleOffset(elem) {
            const MIN_PX = 10;
            const isVisible = elem.offsetWidth >= MIN_PX && elem.offsetHeight >= MIN_PX;
            return isVisible;
        }
        isVisibleZIndex(elem) {
            try {
                const rect = elem.getBoundingClientRect();
                if (!this.isVisibleScroll(elem)) {
                    return false;
                }
                let left = Math.max(0, rect.left);
                let top = Math.max(0, rect.top);
                let right = Math.min(document.documentElement.clientWidth, rect.right);
                let bottom = Math.min(document.documentElement.clientHeight, rect.bottom);
                let x = (right + left) / 2;
                let y = (bottom + top) / 2;
                const elemAtXY = csutil$1.dom.getElementFromPoint({ x, y });
                if (!elemAtXY) {
                    return false;
                }
                if (elem.contains(elemAtXY) || elemAtXY.offsetWidth <= (elem.offsetWidth + 100)) {
                    return true;
                }
                if (csutil$1.dom.contains(elemAtXY, elem)) {
                    return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        isVisibleScroll(elem) {
            const rect = elem.getBoundingClientRect();
            if (rect.left > document.documentElement.clientWidth || rect.top > document.documentElement.clientHeight) {
                return false;
            }
            if (rect.right < 0 || rect.bottom < 0) {
                return false;
            }
            return true;
        }
        isNotHidden(elem) {
            return (window.getComputedStyle(elem).visibility != "hidden") && (elem.style.opacity != "0");
        }
    }

    class CSUtilImpl {
        visibilityChecker = new VisibilityChecker();
        window = new CSWindowUtilImpl();
        uniqSelector = new CSUniqSelectorUtilImpl();
        login = new LoginUtilImpl();
        input = new CSInputUtilImpl();
        dom = new CSDomUtilImpl();
        page = new CSPageUtilImpl();
        selector = new CSSelectorUtilImpl();
        async init() {
            try {
                this.window.init();
                await this.selector.init();
                await this.input.init();
            }
            catch (e) {
                logError(e);
            }
        }
        isVisible(elem, checkZIndex = true) {
            return this.visibilityChecker.isVisible(elem, checkZIndex);
        }
    }

    class CSSelectorMethodProviderImpl {
        getDomSelector() {
            return new DomSelectorMethod();
        }
        getShadowSelector() {
            return new ShadowSelectorMethod();
        }
    }
    class DomSelectorMethod {
        select(selector, param) {
            try {
                const container = param.container || document.documentElement;
                return container.querySelector(selector);
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        selectAll(selector, param) {
            try {
                const container = param.container || document.documentElement;
                return Array.from(container.querySelectorAll(selector));
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
    }
    class ShadowSelectorMethod {
        select(selector, param) {
            try {
                const container = param.container || document.documentElement;
                for (let elem of new CSNodeIterator(container)) {
                    if (elem.matches(selector)) {
                        return elem;
                    }
                }
                return null;
            }
            catch (e) {
                logError(e);
                return null;
            }
        }
        selectAll(selector, param) {
            try {
                const container = param.container || document.documentElement;
                const elemList = [];
                for (let elem of new CSNodeIterator(container)) {
                    if (!elem.matches(selector)) {
                        continue;
                    }
                    elemList.push(elem);
                }
                return elemList;
            }
            catch (e) {
                logError(e);
                return [];
            }
        }
    }

    let csutil$1 = null;
    let csSelectorMethodProvider = null;
    function initContext$1() {
        csutil$1 = new CSUtilImpl();
        csSelectorMethodProvider = new CSSelectorMethodProviderImpl();
    }

    function main$1() {
        initContext$1();
        globalThis.csutil = csutil$1;
    }

    class SubtractPxCalculator {
        input;
        static MIN_SPACE = 3;
        static ICON_SPACE = 15;
        static calculate(input) {
            return new SubtractPxCalculator(input).calculate();
        }
        constructor(input) {
            this.input = input;
        }
        calculate() {
            try {
                const isRightToLeft = csutil.input.checkIsRightToLeft(this.input);
                if (isRightToLeft) {
                    return this.getSubtractPixelRTL() || SubtractPxCalculator.MIN_SPACE;
                }
                return this.getSubtractPixel() || SubtractPxCalculator.MIN_SPACE;
            }
            catch (e) {
                logError(e);
                return 0;
            }
        }
        getSubtractPixel() {
            try {
                const boundary = this.input.getBoundingClientRect();
                const y = boundary.top + (boundary.height / 2);
                const INTER_SPACE = 2;
                let x = 0;
                let leftTopElem = null;
                let rightTopElem = null;
                let subtractPx = SubtractPxCalculator.MIN_SPACE;
                const maxSubtractPx = boundary.width / 2;
                for (let i = 0; i < 10 && subtractPx < maxSubtractPx; i++) {
                    x = boundary.right - subtractPx - SubtractPxCalculator.ICON_SPACE;
                    leftTopElem = csutil.dom.getElementFromPoint({ x, y });
                    if (!leftTopElem) {
                        return 0;
                    }
                    if (this.isAllowedElem(leftTopElem)) {
                        return subtractPx;
                    }
                    if (leftTopElem != this.input) {
                        subtractPx = boundary.right - leftTopElem.getBoundingClientRect().left + INTER_SPACE;
                        continue;
                    }
                    rightTopElem = csutil.dom.getElementFromPoint({ x: x + SubtractPxCalculator.ICON_SPACE, y });
                    if (!rightTopElem) {
                        return 0;
                    }
                    if (this.isAllowedElem(rightTopElem)) {
                        return subtractPx;
                    }
                    if (rightTopElem != this.input) {
                        subtractPx = boundary.right - rightTopElem.getBoundingClientRect().left + INTER_SPACE;
                        continue;
                    }
                    return subtractPx;
                }
                return 0;
            }
            catch (e) {
                logError(e);
                return 0;
            }
        }
        isAllowedElem(elem) {
            try {
                if (elem instanceof HTMLLabelElement) {
                    return true;
                }
                if (elem instanceof HTMLIFrameElement && elem.id.startsWith("zoho")) {
                    return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        getSubtractPixelRTL() {
            try {
                const boundary = this.input.getBoundingClientRect();
                const y = boundary.top + (boundary.height / 2);
                const INTER_SPACE = 2;
                let x = 0;
                let leftTopElem = null;
                let rightTopElem = null;
                const minSubtractPixel = boundary.width / 2;
                let subtractPx = this.input.getBoundingClientRect().width - SubtractPxCalculator.ICON_SPACE - SubtractPxCalculator.MIN_SPACE;
                for (let i = 0; i < 10 && subtractPx > minSubtractPixel; i++) {
                    x = boundary.right - subtractPx - SubtractPxCalculator.ICON_SPACE;
                    leftTopElem = csutil.dom.getElementFromPoint({ x, y });
                    if (!leftTopElem) {
                        return 0;
                    }
                    if (leftTopElem != this.input) {
                        subtractPx = boundary.right - leftTopElem.getBoundingClientRect().right - SubtractPxCalculator.ICON_SPACE - INTER_SPACE;
                        continue;
                    }
                    if (this.isAllowedElem(leftTopElem)) {
                        return subtractPx;
                    }
                    rightTopElem = csutil.dom.getElementFromPoint({ x: x + SubtractPxCalculator.ICON_SPACE, y });
                    if (!rightTopElem) {
                        return 0;
                    }
                    if (this.isAllowedElem(rightTopElem)) {
                        return subtractPx;
                    }
                    if (rightTopElem != this.input) {
                        subtractPx = boundary.right - rightTopElem.getBoundingClientRect().right - SubtractPxCalculator.ICON_SPACE - INTER_SPACE;
                        continue;
                    }
                    return subtractPx;
                }
                return 0;
            }
            catch (e) {
                logError(e);
                return 0;
            }
        }
    }

    class ZIconAdjuster {
        adjustOnEvents = [
            "focusin",
            "click",
            "keyup",
        ];
        constructor() {
            js.fn.bindThis(this, [this.adjustZIcon]);
        }
        adjust(input) {
            try {
                this.adjustOnEvents.forEach(x => input.addEventListener(x, this.adjustZIcon));
            }
            catch (e) {
                logError(e);
            }
        }
        adjustZIcon(e) {
            try {
                if (!e.isTrusted) {
                    return;
                }
                const input = csutil.dom.getEventTargetInput(e);
                if (!input) {
                    return;
                }
                const subtractPixel = SubtractPxCalculator.calculate(input);
                const existing = input[zicon$1.adder.iconSubtractPixel];
                if (subtractPixel == existing) {
                    e.target.removeEventListener(e.type, this.adjustZIcon);
                    return;
                }
                input[zicon$1.adder.iconSubtractPixel] = subtractPixel;
                js.dom.setStyleImportant(input, {
                    "background-position": `calc(100% - ${subtractPixel}px) center`,
                });
            }
            catch (e) {
                logError(e);
            }
        }
    }

    const ICON_ENABLED = "enabled";
    const ICON_DISABLED = "disabled";
    class ZIconAdder {
        iconAdjuster = new ZIconAdjuster();
        NO_VAULT_ICON_ATTR = "data-no-vault-icon";
        ICON_SPACE = 15;
        iconSubtractPixel = Symbol();
        LOGIN_ICON = Symbol();
        inputSet = new WeakSet();
        add = js.fn.emptyFn;
        async init() {
            try {
                const noIcon = await zlocalStorage.load(VtSettings.DISABLE_WEBSITE_VAULT_ICON, false);
                this.enableAddFn(!noIcon);
            }
            catch (e) {
                logError(e);
            }
        }
        enableAdd(enable) {
            try {
                if (!enable) {
                    this.enableAddFn(false);
                    this.removeAll();
                    return;
                }
                this.enableAddFn(true);
                zicon$1.checker.check();
            }
            catch (e) {
                logError(e);
            }
        }
        disableAddForWeb() {
            this.add = js.fn.emptyFn;
        }
        hasZIcon(input) {
            try {
                return input.style.backgroundImage.includes("vault-input");
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        enableIcons() {
            this.updateIcons(ICON_DISABLED, ICON_ENABLED);
        }
        disableIcons() {
            this.updateIcons(ICON_ENABLED, ICON_DISABLED);
        }
        removeAll() {
            try {
                const inputs = csutil.selector.selectAll("input[style*='vault-input']", { shadowRoot: false });
                for (let input of inputs) {
                    this.removeZIcon(input);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async addForContextMenuUsedInput(input) {
            try {
                if (this.inputSet.has(input)) {
                    return;
                }
                this.add(input);
                const selector = csutil.uniqSelector.getSelector(input);
                if (selector) {
                    await bgApi.tab.saveZIconSelector(selector);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        addForShowSiteFrameContextMenu(params) {
            try {
                if (!params.fromContextMenu) {
                    return;
                }
                const activeInput = csutil.input.getActiveInput();
                if (!activeInput) {
                    return;
                }
                this.addForContextMenuUsedInput(activeInput);
            }
            catch (e) {
                logError(e);
            }
        }
        enableAddFn(enable) {
            try {
                this.add = enable ? this.addFn : js.fn.emptyFn;
            }
            catch (e) {
                logError(e);
            }
        }
        addFn(input) {
            try {
                info(ZIconAdder.name, "adding zicon: ", input);
                if (input.disabled || input.readOnly) {
                    return;
                }
                if (input.offsetWidth < 80 || this.hasZIcon(input)) {
                    return;
                }
                if (input.hasAttribute(this.NO_VAULT_ICON_ATTR)) {
                    return;
                }
                const vault = zicon$1.unlocked ? ICON_ENABLED : ICON_DISABLED;
                const subtractPixel = SubtractPxCalculator.calculate(input);
                input[this.iconSubtractPixel] = subtractPixel;
                input[this.LOGIN_ICON] = true;
                this.inputSet.add(input);
                js.dom.setStyleImportant(input, {
                    "background-image": `url(${chrome.runtime.getURL(`/images/web_access/vault-input-${vault}.svg`)})`,
                    "background-repeat": "no-repeat",
                    "background-position": `calc(100% - ${subtractPixel}px) center`,
                    "background-size": "14px",
                    "background-clip": "border-box",
                });
                zicon$1.listener.addListeners(input);
                input.autocomplete = "off";
                this.iconAdjuster.adjust(input);
            }
            catch (e) {
                logError(e);
            }
        }
        removeZIcon(input = new HTMLInputElement()) {
            try {
                info(ZIconAdder.name, "removing zicon: ", input);
                js.dom.setStyleImportant(input, { "background-image": "" });
                zicon$1.listener.removeListeners(input);
                this.inputSet.delete(input);
            }
            catch (e) {
                logError(e);
            }
        }
        updateIcons(from, to) {
            try {
                info(ZIconAdder.name, "updating icons from", from, "to", to);
                const selector = `input[style*='vault-input-${from}']`;
                const inputs = csutil.selector.selectAll(selector, { shadowRoot: false });
                const imagePath = `/images/web_access/vault-input-${to}.svg`;
                for (let input of inputs) {
                    input.style.setProperty("background-image", `url(${chrome.runtime.getURL(imagePath)})`);
                }
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class ZIconChecker {
        storedSelectors = [];
        isSecretUrlLoginPage = false;
        async init() {
            try {
                this.check = js.fn.wrapper.createSingleInstTimedListener(this.check, this, 1);
                const resp = await Promise.all([
                    bgApi.tab.loadZIconSelectors(),
                    this.initIsSecretUrlLoginPage(),
                ]);
                this.storedSelectors = resp[0];
                await this.initCardAddressDetection();
                this.check();
                info("ZICON:", "icon checker initialized");
            }
            catch (e) {
                logError(e);
            }
        }
        async initIsSecretUrlLoginPage() {
            try {
                this.isSecretUrlLoginPage = await bgApi.tab.isLoginDomainPath();
            }
            catch (e) {
                logError(e);
            }
        }
        check() {
            try {
                if (!zicon$1.loggedIn) {
                    return;
                }
                this.addForPasswordFields() ||
                    this.addForHiddenPasswordFields() ||
                    this.addForSingleUsername() ||
                    this.addForSecretUrlLoginPage();
                this.addForTotpField();
                this.addForStoredSelectors();
                this.addForCards();
                this.addForAddresses();
            }
            catch (e) {
                logError(e);
            }
        }
        disableCheckForWeb() {
            this.check = js.fn.emptyFn;
        }
        addForSingleUsername() {
            try {
                const inputs = csutil.input.selectAll({
                    visible: true,
                    types: [InputType.TEXT, InputType.EMAIL],
                    shadowRoot: false,
                    editable: true,
                });
                if (inputs.length != 1) {
                    return false;
                }
                const usernameInput = inputs[0];
                if (!this.isSingleUsername(usernameInput)) {
                    return false;
                }
                const submitButton = csLoginSubmitter.getSubmitButton(usernameInput);
                const nonSubmitRegex = /subscribe/i;
                if (submitButton && nonSubmitRegex.test(submitButton.textContent)) {
                    return false;
                }
                this.addIcon(usernameInput);
                return true;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        addForSecretUrlLoginPage() {
            try {
                if (!this.isSecretUrlLoginPage) {
                    return false;
                }
                const usernameInput = csutil.input.getUsername({ visible: true, shadowRoot: false, editable: true });
                if (usernameInput) {
                    this.addIcon(usernameInput);
                    return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        isSingleUsername(input) {
            try {
                const autocompleteRegex = /username|email/i;
                if (autocompleteRegex.test(input.autocomplete)) {
                    return true;
                }
                const placeholderRegex = autocompleteRegex;
                if (placeholderRegex.test(input.placeholder)) {
                    return true;
                }
                const labelRegex = autocompleteRegex;
                if (labelRegex.test(input.ariaLabel)) {
                    return true;
                }
                for (let label of Array.from(input.labels)) {
                    if (labelRegex.test(label.textContent.toLocaleLowerCase())) {
                        return true;
                    }
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        addForTotpField() {
            try {
                if (csutil.selector.select("textarea", { shadowRoot: false }) && csutil.selector.selectAll("textarea", { visible: true, shadowRoot: false }).length > 0) {
                    return;
                }
                const inputTypes = [InputType.TEXT, InputType.EMAIL, InputType.PASSWORD, InputType.TEL, InputType.NUMBER];
                const visibleInputs = csutil.input.selectAll({ visible: true, types: inputTypes, shadowRoot: false, editable: true });
                if (visibleInputs.length != 1) {
                    return;
                }
                const input = visibleInputs[0];
                if (input.disabled || input.readOnly || !exp_loginUtil.isTotpInput(visibleInputs[0])) {
                    return;
                }
                const container = exp_loginUtil.getInputLoginContainer(input);
                if (!container) {
                    this.addIcon(input);
                    return;
                }
                const presentVisibleInputs = csutil.input.selectAll({ types: inputTypes, container, shadowRoot: false, editable: true }).filter(x => csutil.isVisible(x, false));
                if (presentVisibleInputs.length > 1) {
                    return;
                }
                this.addIcon(input);
            }
            catch (e) {
                logError(e);
            }
        }
        addForStoredSelectors() {
            try {
                for (let selector of this.storedSelectors) {
                    this.addForStoredSelector(selector);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        addForStoredSelector(selector) {
            try {
                const elem = csutil.uniqSelector.select(selector);
                if (!elem) {
                    return;
                }
                if (!csutil.isVisible(elem)) {
                    return;
                }
                this.addIcon(elem);
            }
            catch (e) {
                logError(e);
            }
        }
        addForPasswordFields() {
            try {
                const visiblePasswords = csutil.input.getPasswords({ visible: true, shadowRoot: false });
                for (let password of visiblePasswords) {
                    if (zicon$1.adder.hasZIcon(password)) {
                        continue;
                    }
                    this.addIcon(password);
                    this.addForTextBefore(password);
                }
                return visiblePasswords.length > 0;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        addForHiddenPasswordFields() {
            try {
                const passwords = csutil.input.getPasswords({ shadowRoot: false, editable: true });
                if (passwords.length == 0) {
                    return false;
                }
                return passwords.map(x => this.addForHiddenPasswordField(x)).some(x => x);
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        addForHiddenPasswordField(password) {
            try {
                const container = exp_loginUtil.getInputLoginContainer(password);
                if (!container) {
                    return false;
                }
                const username = csutil.input.getUsername({ container, visible: true, shadowRoot: false, editable: true });
                if (!username) {
                    return false;
                }
                this.addIcon(username);
                return true;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        addForTextBefore(passwordInput) {
            try {
                const fields = exp_loginUtil.findFieldsBefore(passwordInput);
                switch (fields.length) {
                    case 0: return;
                    case 1:
                        this.addIcon(fields[0]);
                        return;
                }
                const field = fields[fields.length - 1];
                if (field.offsetWidth < (0.60 * passwordInput.offsetWidth)) {
                    return;
                }
                this.addIcon(field);
            }
            catch (e) {
                logError(e);
            }
        }
        async initCardAddressDetection() {
            try {
                const stored = await zlocalStorage.loadAll({
                    [LocalStorageKeys.PAYMENT_CARD_TYPE_ID]: "",
                    [LocalStorageKeys.ADDRESS_TYPE_ID]: "",
                    [LocalStorageKeys.USED_CATEGORIES]: {},
                });
                const secretCountMap = stored[LocalStorageKeys.USED_CATEGORIES];
                const paymentCardId = stored[LocalStorageKeys.PAYMENT_CARD_TYPE_ID];
                const enablePaymentCard = paymentCardId && (secretCountMap[paymentCardId] > 0);
                await this.initCardDetection(enablePaymentCard);
                const addressId = stored[LocalStorageKeys.ADDRESS_TYPE_ID];
                const disableAddress = !addressId || !(secretCountMap[addressId] > 0);
                if (disableAddress) {
                    this.addForAddresses = js.fn.emptyFn;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async initCardDetection(enable) {
            try {
                if (!enable) {
                    this.addForCards = js.fn.emptyFn;
                    return;
                }
                await external.initCardIcon();
            }
            catch (e) {
                logError(e);
            }
        }
        addForCards() {
            try {
                external.addCardIcon();
            }
            catch (e) {
                logError(e);
            }
        }
        addForAddresses() {
            try {
                external.addAddressIcon();
            }
            catch (e) {
                logError(e);
            }
        }
        addIcon(input) {
            zicon$1.adder.add(input);
        }
    }

    class ZIconEventEmitter {
        visibilityObserver = null;
        init() {
            try {
                js.fn.bindThis(this, [this.clickedDocument, this.handleAnimationEnd, this.handlePreventedRightClick,
                    this.handleFocusin,
                ]);
                this.initVisibilityObserver();
                this.addDomListeners();
                this.addMutationListener();
                csutil.input.waitForVisibleInput({ shadowRoot: false }).then(() => this.listener());
                info("ZICON:", "zicon event emitter initialized");
            }
            catch (e) {
                logError(e);
            }
        }
        initVisibilityObserver() {
            this.visibilityObserver = new IntersectionObserver(this.handleIntersection.bind(this), {
                root: null,
                threshold: 0.8
            });
            const existingPasswords = csutil.input.getPasswords({ shadowRoot: false });
            this.addVisibleObserver(existingPasswords);
        }
        addDomListeners() {
            document.addEventListener("click", this.clickedDocument, true);
            document.addEventListener("contextmenu", this.clickedDocument, true);
            document.addEventListener("contextmenu", this.handlePreventedRightClick);
            document.addEventListener("focusin", this.handleFocusin, true);
            document.addEventListener("animationend", this.handleAnimationEnd, true);
        }
        async handleAnimationEnd(e) {
            const elem = e.target;
            if (elem.querySelector("input")) {
                this.listener();
            }
        }
        addMutationListener() {
            const mutationObserver = new MutationObserver(this.handleMutation.bind(this));
            mutationObserver.observe(document.body || document.documentElement, {
                childList: true,
                subtree: true
            });
        }
        async clickedDocument() {
            this.listener();
            await js.time.delay(1);
            this.listener();
        }
        handleMutation(mutationRecords) {
            try {
                for (let record of mutationRecords) {
                    for (let newNode of Array.from(record.addedNodes)) {
                        if (!(newNode instanceof HTMLElement)) {
                            continue;
                        }
                        this.addVisibleObserver(csutil.input.getPasswords({ container: newNode, shadowRoot: false }));
                    }
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async handleIntersection(entries) {
            for (let entry of entries) {
                if (!entry.isIntersecting || !csutil.isVisible(entry.target)) {
                    continue;
                }
                this.listener();
            }
        }
        addVisibleObserver(passwordInputs) {
            try {
                for (let passwordInput of passwordInputs) {
                    this.visibilityObserver.observe(passwordInput);
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async handlePreventedRightClick(e) {
            try {
                if (!zicon$1.loggedIn) {
                    return;
                }
                if (!e.isTrusted || !e.defaultPrevented) {
                    return;
                }
                const input = csutil.dom.getEventTargetInput(e);
                if (!input) {
                    return;
                }
                await zicon$1.addForContextMenuUsedInput(input);
            }
            catch (e) {
                logError(e);
            }
        }
        handleFocusin() {
            this.listener();
        }
        listener() {
            zicon$1.checker.check();
        }
    }

    class ZIconListener {
        noKeyboard = false;
        async init() {
            try {
                js.fn.bindThis(this, [
                    this.onMouseMove,
                    this.handleClick,
                    this.handleKeydown,
                ]);
                document.addEventListener("click", this.handleClick, true);
                this.noKeyboard = await zlocalStorage.load(VtSettings.DISABLE_WEBSITE_KEYBOARD_SHORTCUT, false);
            }
            catch (e) {
                logError(e);
            }
        }
        addClickListener(elem) {
            elem.addEventListener("click", this.handleClick, true);
        }
        addListeners(input) {
            try {
                input.addEventListener("mousemove", this.onMouseMove, true);
                input.addEventListener("keydown", this.handleKeydown, true);
            }
            catch (e) {
                logError(e);
            }
        }
        removeListeners(input) {
            try {
                input.removeEventListener("mousemove", this.onMouseMove, true);
                input.removeEventListener("keydown", this.handleKeydown, true);
            }
            catch (e) {
                logError(e);
            }
        }
        setNoKeyboard(enable) {
            this.noKeyboard = enable;
        }
        onMouseMove(e) {
            e.target.style.cursor = this.hasZIconOn(e.target, e) ? "pointer" : "text";
        }
        handleClick(e) {
            try {
                if (!e.isTrusted || !zicon$1.loggedIn) {
                    return;
                }
                bgApi.siteFrame.closeSiteFrame();
                bgApi.cardFrame.closeCardFrame();
                const input = csutil.dom.getEventTargetInput(e);
                if (!input) {
                    return;
                }
                if (csutil.input.typeOf(input) != InputType.PASSWORD && this.isAddressField(e)) {
                    external.clickedAddressIcon(e);
                    return;
                }
                if (this.isCardField(e)) {
                    external.clickedCardIcon(e);
                    return;
                }
                if (!input[zicon$1.adder.LOGIN_ICON]) {
                    this.handleCardAddressClick(e);
                    return;
                }
                const inputSet = zicon$1.adder.inputSet;
                if (inputSet.has(input)) {
                    this.clickedZIcon(input, e);
                    return;
                }
                const elements = csutil.dom.getElementsFromPoint({ x: e.clientX, y: e.clientY });
                const reqElement = elements.find(x => inputSet.has(x));
                if (!reqElement) {
                    return;
                }
                this.clickedZIcon(reqElement, e);
            }
            catch (e) {
                logError(e);
            }
        }
        handleCardAddressClick(e) {
            try {
                if (this.isCardField(e)) {
                    external.clickedCardIcon(e);
                    return true;
                }
                if (this.isAddressField(e)) {
                    external.clickedAddressIcon(e);
                    return true;
                }
                return false;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        async clickedZIcon(input, e) {
            try {
                if (!this.hasZIconOn(input, e)) {
                    return;
                }
                this.showSiteFrame({ x: e.clientX, y: e.clientY });
            }
            catch (e) {
                logError(e);
            }
        }
        isCardField(event) {
            const elm = event.target;
            if ((elm.hasAttribute("data-zvault-cc") || elm.getAttribute("data-zvault-cc-iframe-enabled") == "true") && this.hasZIconOn(elm, event)) {
                return true;
            }
            return false;
        }
        isAddressField(event) {
            const elm = event.target;
            if ((elm.hasAttribute("data-zvault-address") || elm.hasAttribute("data-zvault-address-iframe")) && this.hasZIconOn(elm, event)) {
                return true;
            }
            return false;
        }
        hasZIconOn(input, e) {
            try {
                const boundary = input.getBoundingClientRect();
                const x = e.clientX;
                const rangeEnd = boundary.right - input[zicon$1.adder.iconSubtractPixel];
                const rangeStart = rangeEnd - zicon$1.adder.ICON_SPACE;
                const isInRange = (x >= rangeStart) && (x <= rangeEnd);
                return isInRange;
            }
            catch (e) {
                logError(e);
                return false;
            }
        }
        handleKeydown(e) {
            try {
                if (this.noKeyboard) {
                    return;
                }
                const isShortcut = (e.ctrlKey || e.metaKey) && e.key == " ";
                if (!isShortcut) {
                    return;
                }
                if (!(e.target instanceof HTMLInputElement)) {
                    return;
                }
                const input = e.target;
                const rect = input.getBoundingClientRect();
                this.showSiteFrame({ x: rect.right - input[zicon$1.adder.iconSubtractPixel] - 15, y: rect.y + (rect.height / 2) });
            }
            catch (e) {
                logError(e);
            }
        }
        showSiteFrame(point) {
            try {
                if (!zicon$1.unlocked) {
                    util.saveClickLocation(point);
                    brApi.runtime.sendMsgNoReply({ fn: "openSidePanel" });
                    return;
                }
                util.showSiteFrame({ point });
            }
            catch (e) {
                logError(e);
            }
        }
    }

    class ZIconImpl {
        loggedIn = false;
        unlocked = false;
        adder = new ZIconAdder();
        listener = new ZIconListener();
        checker = new ZIconChecker();
        eventEmitter = new ZIconEventEmitter();
        async init() {
            try {
                if (document.body.hasAttribute(this.adder.NO_VAULT_ICON_ATTR)) {
                    return;
                }
                const noIcon = await zlocalStorage.load(VtSettings.DISABLE_WEBSITE_VAULT_ICON, false);
                if (noIcon) {
                    return;
                }
                const resp = await Promise.all([
                    bgApi.login.isLoggedIn(),
                    bgApi.login.isUnlocked(),
                    this.adder.init(),
                    this.listener.init(),
                ]);
                this.loggedIn = resp[0];
                this.unlocked = resp[1];
                await this.checker.init();
                this.eventEmitter.init();
                info(ZIconImpl.name, "zicon initialized");
            }
            catch (e) {
                logError(e);
            }
        }
        async initWeb() {
            try {
                this.adder.disableAddForWeb();
                this.checker.disableCheckForWeb();
            }
            catch (e) {
                logError(e);
            }
        }
        onLoggedOut() {
            try {
                this.loggedIn = false;
                this.unlocked = false;
                this.adder.removeAll();
            }
            catch (e) {
                logError(e);
            }
        }
        onLocked() {
            try {
                this.loggedIn = true;
                this.unlocked = false;
                this.adder.disableIcons();
                this.checker.check();
            }
            catch (e) {
                logError(e);
            }
        }
        onUnlocked() {
            try {
                this.loggedIn = true;
                this.unlocked = true;
                this.adder.enableIcons();
                this.checker.check();
            }
            catch (e) {
                logError(e);
            }
        }
        async onSecretAddEdited() {
            try {
                await this.checker.initIsSecretUrlLoginPage();
                this.checker.check();
            }
            catch (e) {
                logError(e);
            }
        }
        onSettingChanged(name, value) {
            try {
                switch (name) {
                    case VtSettings.DISABLE_WEBSITE_VAULT_ICON:
                        this.adder.enableAdd(!value);
                        return;
                    case VtSettings.DISABLE_WEBSITE_KEYBOARD_SHORTCUT:
                        this.listener.setNoKeyboard(value);
                        return;
                }
            }
            catch (e) {
                logError(e);
            }
        }
        async addForContextMenuUsedInput(input) {
            return this.adder.addForContextMenuUsedInput(input);
        }
        async showSiteFrame(params) {
            try {
                this.adder.addForShowSiteFrameContextMenu(params);
                util.showSiteFrame({ restorePoint: !params.fromContextMenu });
            }
            catch (e) {
                logError(e);
            }
        }
        async showCardFrame() { }
        hasZIcon(input) {
            return this.adder.inputSet.has(input);
        }
    }

    class ZIconExternal {
        async initCardIcon() {
            try {
                return await csCardFieldDetector.init();
            }
            catch (e) {
                logError(e);
            }
        }
        addCardIcon() {
            try {
                csCardFieldDetector.populateVaultIconsCC();
            }
            catch (e) {
                logError(e);
            }
        }
        clickedCardIcon(e) {
            csCardFieldDetector.ccFieldClicked(e);
        }
        clickedAddressIcon(e) {
            csAddressDetector.ccFieldClicked(e);
        }
        addAddressIcon() {
            csAddressDetector.populateVaultIcons();
        }
    }

    class ZIconUtil {
        async showSiteFrame(input) {
            try {
                const point = await this.getPoint(input);
                this.saveClickLocation(point);
                const activeFrameId = await bgApi.tab.getFrameId();
                ztabStorage.save(TabStorageKeys.ACTIVE_FRAME_ID, activeFrameId);
                bgApi.siteFrame.showSiteFrame();
            }
            catch (e) {
                logError(e);
            }
        }
        async saveClickLocation(point) {
            try {
                await ztabStorage.save(TabStorageKeys.ZICON_CLICK_LOCATION, point);
            }
            catch (e) {
                logError(e);
            }
        }
        async getPoint(input) {
            try {
                if (input.point) {
                    return input.point;
                }
                if (input.restorePoint) {
                    const clickPoint = await ztabStorage.load(TabStorageKeys.ZICON_CLICK_LOCATION);
                    if (clickPoint) {
                        return clickPoint;
                    }
                }
                return this.getFirstInputPoint();
            }
            catch (e) {
                logError(e);
            }
        }
        getFirstInputPoint() {
            try {
                const point = { x: 0, y: 0 };
                const firstVisibleInput = csutil.input.getActiveInput() ||
                    csutil.input.getUsername({ visible: true, shadowRoot: false }) || csutil.input.getPassword({ visible: true, shadowRoot: false });
                if (!firstVisibleInput) {
                    return point;
                }
                const rect = firstVisibleInput.getBoundingClientRect();
                point.y = rect.bottom - (rect.height / 2);
                const isRightToLeft = csutil.input.checkIsRightToLeft(firstVisibleInput);
                if (isRightToLeft) {
                    point.x = rect.left + 15;
                    return point;
                }
                point.x = rect.right - 15;
                return point;
            }
            catch (e) {
                logError(e);
                return { x: 0, y: 0 };
            }
        }
    }

    let zicon$1 = null;
    let external = null;
    let util = null;
    function initContext() {
        util = new ZIconUtil();
        zicon$1 = new ZIconImpl();
        external = new ZIconExternal();
    }

    function main() {
        initContext();
        globalThis.zicon = zicon$1;
    }

    main$2();
    main$3();
    main$1();
    main();
    class CS_Main {
        async main() {
            const contentScript = new ContentScript();
            await contentScript.main();
            if (!ZVGlobal.isDevMode()) {
                console.error = console.info;
                return;
            }
            document.addEventListener("click", this.clicked.bind(this), true);
            document.addEventListener("contextmenu", this.rightClicked.bind(this), true);
            document.addEventListener("dblclick", this.doubleClicked.bind(this), true);
            document.addEventListener("focusin", this.onFocusIn.bind(this), true);
            if (!csutil.window.isTopFrame()) {
                return;
            }
            this.devMain();
        }
        async devMain() {
        }
        async onFocusIn(e) {
            if (!e.isTrusted) {
                return;
            }
        }
        async clicked(e) {
            if (!e.isTrusted) {
                return;
            }
        }
        async rightClicked(e) {
            if (!e.isTrusted) {
                return;
            }
        }
        async doubleClicked(e) {
            if (!e.isTrusted) {
                return;
            }
        }
    }
    const csMain = new CS_Main();
    csMain.main();

})();
