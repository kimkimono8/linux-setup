export const ZVaultUtil = {
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
