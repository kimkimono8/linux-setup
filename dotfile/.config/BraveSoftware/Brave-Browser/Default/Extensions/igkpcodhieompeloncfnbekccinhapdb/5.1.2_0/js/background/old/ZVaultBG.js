import { setGlobal } from "../../common/global/global.js";
import { ZVaultUtil } from "../../common/old/ZVaultUtil.js";
import { bg } from "../../src/bg/bg.js";
import { vapi } from "../../src/bg/Context.js";
import { VFetchContentType } from "../../src/bg/service/vapi/constants.js";
import { SecretQuery } from "../../src/service/bgApi/types/SecretQuery.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { CARD_FIELDS } from "../../src/vutil/types/PasswordCategory.js";
export const ZVaultBG = {
    inProgressResets: new Set(),
    latestError: null,
    data: {
        activeTabId: -1,
        totpDevice: {},
        totpData: null,
        newsecretstate: {
            state: {},
            set: function (key, value) {
                this.state[key] = JSON.stringify(value);
            },
            get: function (key) {
                return JSON.parse(this.state[key]);
            },
            contains: function (key) {
                return ZVaultUtil.isValid(this.state[key]);
            },
            delete: function (key) {
                delete this.state[key];
            },
            destroy: function () {
                this.state = {};
            }
        },
    },
    init() {
        chrome.runtime.onMessage.addListener(function (msg, sender) {
            ZVaultBG.processRequest(msg, sender);
            return false;
        });
    },
    api: {
        get_secret_details: async (id) => { return urlProvider.getVaultUrl() + "/api/json/secrets?OPERATION_NAME=GET_SECRET_DETAILS" + "&SECRET_AUTO_ID=" + id; },
        get_request_details: async (reqId) => { return urlProvider.getVaultUrl() + "/api/rest/json/v1/accesscontrol/request/" + reqId; },
        request_access: async (id) => { return urlProvider.getVaultUrl() + "/api/rest/json/v1/accesscontrol/requestaccess/" + id; },
        cancel_access_request: async (reqId) => { return urlProvider.getVaultUrl() + "/api/rest/json/v1/accesscontrol/cancel/" + reqId; },
        checkout_request: async (reqId) => { return urlProvider.getVaultUrl() + "/api/rest/json/v1/accesscontrol/checkout/" + reqId; },
        totp_lookup: async () => urlProvider.getAccountsUrl() + "/signin/v2/lookup/self?mode=extension",
        totp_push: async (device_id) => urlProvider.getAccountsUrl() + "/api/v1/extension/self/device/" + device_id + "/push",
        totp_status: async (device_id) => urlProvider.getAccountsUrl() + "/api/v1/extension/self/device/" + device_id + "/poll"
    },
    callAPI: async (url, method = "", params = undefined, content_type = VFetchContentType.URL_ENCODED) => {
        try {
            if (navigator.onLine === false) {
                return { status: false, error: "Offline" };
            }
            if (!js.url.isValid(url)) {
                return { status: false, error: "Invalid Url" };
            }
            if (params != undefined && params != "" && typeof params == "object") {
                let parameterString = "";
                for (let key in params) {
                    parameterString += key + "=" + encodeURIComponent(params[key]) + "&";
                }
                params = parameterString.slice(0, parameterString.length - 1);
            }
            const resp = await fetch(url, {
                method,
                headers: await vapi.fetch.getHeaders(content_type),
                body: params
            });
            const respJson = await resp.json();
            return respJson;
        }
        catch (e) {
            return { status: false };
        }
    },
    async sync() {
        ZVaultBG.checkTotpLookup();
    },
    checkTotpLookup: async () => {
        var response = await ZVaultBG.callAPI(await ZVaultBG.api.totp_lookup(), "POST");
        if (response.status_code == 201 && response.message == "Success") {
            for (let device of response.lookup.device) {
                if (device.is_primary) {
                    ZVaultBG.data.totpDevice = device;
                    break;
                }
            }
            ZVaultBG.data.totpData = response.lookup.tp_data != undefined ? response.lookup.tp_data : [];
        }
    },
    pushTotpNotification: async (username, url) => {
        const is_empty = Object.keys(ZVaultBG.data.totpDevice).length == 0;
        if (is_empty) {
            return;
        }
        var param;
        let domain = js.url.getHostName(url);
        let parentDomain = js.url.getParentDomain(url);
        for (let tp_data of ZVaultBG.data.totpData) {
            if (tp_data.label == username && (domain == tp_data.app_name.toLowerCase() || parentDomain == tp_data.app_name.toLowerCase())) {
                param = JSON.stringify({ "sendpushnotify": tp_data });
                break;
            }
        }
        if (param != undefined) {
            var response = await ZVaultBG.callAPI(await ZVaultBG.api.totp_push(ZVaultBG.data.totpDevice.device_id), "POST", param, VFetchContentType.JSON);
            if (response.message == "Success" && response.status_code == 201) {
                return response.sendpushnotify.token;
            }
        }
        return null;
    },
    getTotpStatus: async (token) => {
        try {
            const resp = await fetch(await ZVaultBG.api.totp_status(ZVaultBG.data.totpDevice.device_id), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    authorization: "Zoho-oauthtoken " + await oauth.getAccessToken(),
                    "Z-authorization": "Zoho-oauthtoken " + token,
                },
                body: ""
            });
            const respJson = await resp.json();
            return respJson;
        }
        catch (e) {
            return { status: false };
        }
    },
    checkTotpStatus: async (tabId, data, token, count) => {
        var totpResponse = await ZVaultBG.getTotpStatus(token);
        if (totpResponse.status_code == 200) {
            if (totpResponse.code == "D101" && totpResponse.verifypushnotify[0].totp != undefined) {
                var otp = totpResponse.verifypushnotify[0].totp;
                data.otp = otp;
                await bg.vaultSecrets.secretLogin.recording.updatePlaybackInnerData(data.tab, data);
                ZVaultUtil.sendMessage(tabId, "startPlayback", data);
            }
            else if ((totpResponse.code == "D102" || totpResponse.code == "D101") && count < 10) {
                setTimeout(function () {
                    ZVaultBG.checkTotpStatus(tabId, data, token, ++count);
                }, 2500);
            }
            else {
                await bg.vaultSecrets.secretLogin.recording.removePlaybackData(tabId);
            }
        }
        else {
            await bg.vaultSecrets.secretLogin.recording.removePlaybackData(tabId);
        }
    },
    getPaymentCards: async function (search = "") {
        const query = SecretQuery.newBuilder().build();
        const cardCategory = await bg.vaultSecretTypes.getCardType();
        query.typeId = cardCategory != null ? cardCategory.id : null;
        if (search) {
            query.search_string = search;
        }
        const secret_query_result = await bg.vaultSecrets.secretQuerier.query(query);
        return secret_query_result;
    },
    async checkPlayback(tabId, { url = "" }) {
        const playBackData = await bg.vaultSecrets.secretLogin.recording.getPlaybackData(tabId);
        if (!playBackData) {
            return;
        }
        const secretUrls = playBackData.data.urls;
        if (!ZVaultUtil.secretDomainMatches(secretUrls, url)) {
            return;
        }
        if (js.url.getProtocol(url) == js.url.protocol.http && (await zlocalStorage.load(LocalStorageKeys.INSECURE_PAGE_PROMPT, true))) {
            const sendData = playBackData.data;
            sendData.action = "fill_secret_insecure_page_context_menu";
            sendData.secretaction = "fill_secret_insecure_page";
            ZVaultUtil.sendMessage(tabId, "show_message_touser", { "id": "insecure_frame", "corresData": sendData, "type": "context", "specificCol": false });
            return;
        }
        if ((!playBackData.playback) && (!playBackData.data.submit)) {
            ZVaultUtil.sendMessage(tabId, "fill_secret_on_loginform", playBackData.data);
            await bg.vaultSecrets.secretLogin.recording.removePlaybackData(tabId);
            return;
        }
        if (playBackData.playback) {
            url = playBackData.data.secretUrl;
            const steps = JSON.parse(playBackData.data.steps);
            const newUrl = steps[playBackData.data.step_no].url;
            if (newUrl) {
                url = newUrl;
                playBackData.data.urls.push(newUrl);
                playBackData.data.secretUrl = newUrl;
                bg.vaultSecrets.secretLogin.recording.setPlaybackData(tabId, playBackData);
            }
            if (ZVaultUtil.secretDomainMatches(playBackData.data.urls, url)) {
                playBackData.reloading = false;
                bg.vaultSecrets.secretLogin.recording.setPlaybackData(tabId, playBackData);
                ZVaultUtil.sendMessage(tabId, "startPlayback", playBackData.data);
            }
            return;
        }
    },
    async checkCardDiff(card, data) {
        const cardHolderName = await ZVaultBG.isCardFieldDifferent(card, data, CARD_FIELDS.NAME);
        const cardCvv = await ZVaultBG.isCardFieldDifferent(card, data, CARD_FIELDS.CVV);
        const validThru = await ZVaultBG.isCardFieldDifferent(card, data, CARD_FIELDS.VALID_UPTO);
        return (cardHolderName || cardCvv || validThru);
    },
    async isCardFieldDifferent(card, data, field) {
        const stored = await bg.zcrypt.decrypt(card.encrypted.fields[field], card.shared);
        const entered = data[field];
        if (entered == undefined || entered == "") {
            return false;
        }
        else if (stored == entered) {
            return false;
        }
        return true;
    },
    async encryptAllFields(secretdata, isShared) {
        for (let i in secretdata) {
            secretdata[i] = await bg.zcrypt.encrypt(secretdata[i], isShared);
        }
        return secretdata;
    },
    processRequest: async (request, sender) => {
        const action = request.action;
        if (!action) {
            return;
        }
        let data = request.data;
        if (ZVaultUtil.isValid(data) && !(data instanceof Object)) {
            data = JSON.parse(data);
        }
        const tabId = action == "devToolsOpened" ? request.tabId : sender.tab.id;
        let temp;
        switch (action) {
            case "continuePlayback":
                if (ZVaultUtil.secretDomainMatches(data.urls, data.frameurl)) {
                    if (data.step_no < data.total_steps) {
                        let playbackData = await bg.vaultSecrets.secretLogin.recording.getPlaybackData(tabId);
                        if ((playbackData.data.step_no + 1) == data.step_no && !playbackData.reloading) {
                            playbackData.data = data;
                            var steps = JSON.parse(data.steps);
                            var step_data = steps[data.step_no];
                            if (step_data.url != undefined) {
                                data.urls.push(step_data.url);
                                data.secretUrl = step_data.url;
                            }
                            bg.vaultSecrets.secretLogin.recording.setPlaybackData(tabId, playbackData);
                            ZVaultUtil.sendMessage(tabId, "startPlayback", data);
                        }
                    }
                    else {
                        bg.vaultSecrets.secretLogin.recording.removePlaybackData(tabId);
                    }
                }
                break;
            case "repeatPlayback":
                if (ZVaultUtil.secretDomainMatches(data.urls, data.frameurl)) {
                    const playbackData = await bg.vaultSecrets.secretLogin.recording.getPlaybackData(tabId);
                    if (data.step_no < data.total_steps && playbackData) {
                        if ((playbackData.data.step_no) == data.step_no && (playbackData.data.countdown) + 1 == data.countdown) {
                            await bg.vaultSecrets.secretLogin.recording.updatePlaybackInnerData(data.tab, data);
                            ZVaultUtil.sendMessage(tabId, "startPlayback", data);
                        }
                    }
                    else {
                        bg.vaultSecrets.secretLogin.recording.removePlaybackData(tabId);
                    }
                }
                break;
            case "saveProgress":
                if (data.step_no < data.total_steps) {
                    await bg.vaultSecrets.secretLogin.recording.updatePlaybackInnerData(tabId, data);
                }
                else {
                    bg.vaultSecrets.secretLogin.recording.removePlaybackData(tabId);
                }
                break;
            case "playbackFailure":
                bg.vaultSecrets.secretLogin.recording.removePlaybackData(tabId);
                break;
            case "reloading":
                {
                    const existing = await bg.vaultSecrets.secretLogin.recording.getPlaybackData(tabId);
                    if (existing) {
                        existing.reloading = true;
                        await bg.vaultSecrets.secretLogin.recording.setPlaybackData(data.tab, existing);
                    }
                }
                break;
            case "checkPlayback":
                if (!await bg.vault.isUnlocked()) {
                    return;
                }
                temp = js.url.getParentDomain(data.url);
                if (!temp.startsWith("zoho.")) {
                    ZVaultBG.checkPlayback(tabId, data);
                    return;
                }
                break;
            case "fetchTotp":
                if (ZVaultUtil.secretDomainMatches(data.urls, data.frameurl)) {
                    var username = data.secretdata.username;
                    var token = await ZVaultBG.pushTotpNotification(username, data.secretUrl);
                    if (token != null) {
                        setTimeout(function () {
                            ZVaultBG.checkTotpStatus(tabId, data, token, 0);
                        }, 5000);
                    }
                    else {
                        await bg.vaultSecrets.secretLogin.recording.removePlaybackData(tabId);
                    }
                }
                break;
            case "devToolsOpened":
                ZVaultUtil.sendMessage(tabId, action);
                break;
        }
    },
};
setGlobal("ZVaultBG", ZVaultBG);
