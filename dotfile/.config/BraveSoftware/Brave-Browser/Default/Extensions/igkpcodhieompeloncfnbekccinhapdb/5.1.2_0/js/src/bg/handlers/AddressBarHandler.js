import { ConfigKeys } from "../../conf/service/constants.js";
import { Browser } from "../../service/vt/constants/Browser.js";
import { URL_Part } from "../../service/vt/constants/constants.js";
import { VI18N } from "../../service/vt/VI18n.js";
import { postUnlockTaskHandler } from "../Context.js";
export class AddressBarHandlerImpl {
    updateSuggestion = null;
    query = {
        urlPrefix: "",
        usernamePrefix: "",
        limit: 10
    };
    includeUsername = false;
    defaultSuggestionContent = "";
    suggestionHighlighter = null;
    queryResult = null;
    init() {
        try {
            const browser = config.get(ConfigKeys.BROWSER);
            this.suggestionHighlighter = browser == Browser.FIREFOX ? new FirefoxSuggestionHighlighter() : new ChromeSuggestionHighlighter();
            js.fn.bindThis(this, [this.onInputChanged, this.onInputEntered]);
            this.updateResults = js.fn.wrapper.createSingleInstListener(this.updateResults, this);
            brApi.omnibox.onInputStarted(() => domainHandler.addressBarQuerier.clearCache());
            brApi.omnibox.onInputChanged(this.onInputChanged);
            brApi.omnibox.onInputEntered(this.onInputEntered);
        }
        catch (e) {
            logError(e);
        }
    }
    onInputChanged(searchString, callback) {
        try {
            this.updateSuggestion = callback;
            this.updateSearchString(searchString);
            this.updateResults();
        }
        catch (e) {
            logError(e);
        }
    }
    updateSearchString(s) {
        try {
            const terms = s.split(/\s+/);
            this.query.urlPrefix = terms[0];
            this.query.usernamePrefix = terms.length > 1 ? terms[1] : "";
        }
        catch (e) {
            logError(e);
        }
    }
    async onInputEntered(text, tabType) {
        try {
            text = text.trim();
            if (!text) {
                return;
            }
            const parts = this.getInputParts(text);
            if (parts.length < 2) {
                return;
            }
            const [url, secretId] = parts;
            const tab = await this.getTab(tabType);
            const loginInput = { secretId, url, tabId: tab.id, showLoading: true };
            if (await bg.vault.isUnlocked()) {
                await bg.vaultSecrets.secretLogin.login(loginInput);
                return;
            }
            await postUnlockTaskHandler.loginAfterUnlock(loginInput);
            await bg.unlockTabHandler.create();
        }
        catch (e) {
            logError(e);
        }
    }
    isValildSecretId(id) {
        try {
            return this.queryResult.secrets.some(x => x.id == id);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async getTab(type) {
        try {
            switch (type) {
                case "currentTab":
                    return brApi.tab.getActiveTab();
                case "newForegroundTab":
                    return brApi.tab.create("");
                case "newBackgroundTab":
                    return brApi.tab.createTab({ url: "", background: true });
            }
        }
        catch (e) {
            logError(e);
            return brApi.tab.getActiveTab();
        }
    }
    getInputParts(text) {
        try {
            const parts = text.split(/ +/);
            if (parts.length == 0) {
                throw "PARTS_OF_LENGTH_0";
            }
            switch (parts.length) {
                case 0:
                    throw "PARTS_OF_LENGTH_0";
                case 1:
                    return this.defaultSuggestionContent.split(/ +/);
            }
            const secretId = parts[1];
            if (!this.isValildSecretId(secretId)) {
                return this.defaultSuggestionContent.split(/ +/);
            }
            return parts;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async updateResults() {
        try {
            this.includeUsername = await bg.vault.isUnlocked();
            const result = this.queryResult = await domainHandler.addressBarQuerier.query(this.query);
            const suggestions = [];
            for (let secret of result.secrets) {
                await this.addSuggestion(secret, result, suggestions);
            }
            this.updateDefaultSuggestion(suggestions);
            this.updateSuggestion(suggestions.slice(1, suggestions.length));
        }
        catch (e) {
            logError(e);
        }
    }
    updateDefaultSuggestion(suggestions) {
        try {
            if (suggestions.length == 0) {
                brApi.omnibox.setDefaultSuggestion({ description: i18n(VI18N.NO_MATCHING_PASSWORDS_FOUND) });
                this.defaultSuggestionContent = "";
                return;
            }
            this.defaultSuggestionContent = suggestions[0].content;
            brApi.omnibox.setDefaultSuggestion({ description: suggestions[0].description });
        }
        catch (e) {
            logError(e);
        }
    }
    async addSuggestion(secret, result, list) {
        try {
            const context = {
                result,
                secret,
                urlIndex: 0
            };
            const suggestion = await this.getSuggestion(context);
            if (!suggestion) {
                return;
            }
            list.push(suggestion);
        }
        catch (e) {
            logError(e);
        }
    }
    async getSuggestion(context) {
        try {
            const { secret, result } = context;
            context.urlIndex = this.getMatchingUrlIndex(secret, result);
            const content = await this.getSuggestionContent(context);
            if (!content) {
                return null;
            }
            const description = await this.getSuggestionDescription(context);
            if (!description) {
                return null;
            }
            const suggestion = {
                content,
                description
            };
            return suggestion;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getMatchingUrlIndex(secret, result) {
        try {
            if (!this.query.urlPrefix) {
                return 0;
            }
            const matchFn = this.getMatchFn(result.idDomainMap.get(secret.id));
            for (let i = 0; i < secret.valid_urls.length; i++) {
                if (matchFn(secret.valid_urls[i])) {
                    return i;
                }
            }
            throw "NO_URL_MATCH";
        }
        catch (e) {
            logError(e);
            return 0;
        }
    }
    getMatchFn(match) {
        try {
            switch (match.type) {
                case URL_Part.HOSTNAME:
                    return this.isHostnameMatching.bind(null, match.domain);
                case URL_Part.DOMAIN:
                    return this.isDomainMatching.bind(null, match.domain);
                default:
                    throw "NEW_CASE";
            }
        }
        catch (e) {
            logError(e);
            return this.isHostnameMatching;
        }
    }
    isHostnameMatching(hostname, url) {
        try {
            return js.url.getHostName(url).startsWith(hostname);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    isDomainMatching(domain, url) {
        try {
            return js.url.getParentDomain(url).startsWith(domain);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async getSuggestionContent(context) {
        try {
            const { secret, urlIndex } = context;
            return `${secret.valid_urls[urlIndex]} ${secret.id}`;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async getSuggestionDescription(context) {
        try {
            const { secret } = context;
            const SEPARATOR = " - ";
            const parts = [secret.name];
            if (this.includeUsername) {
                const username = await bg.zcrypt.decrypt(secret.ui_text, secret.shared);
                parts.push(SEPARATOR + this.suggestionHighlighter.getHighlightedUsername(username, this.query));
            }
            parts.push(SEPARATOR + this.suggestionHighlighter.getHighlightedUrl(context, this.query));
            return parts.join("");
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
class ChromeSuggestionHighlighter {
    getHighlightedUrl(context, query) {
        const { secret, urlIndex } = context;
        const escapedSearchString = js.other.escapeXml(query.urlPrefix);
        const escapedSuffix = js.other.escapeXml(this.getUrlMatchSuffix(secret.valid_urls[urlIndex], query.urlPrefix));
        return "<url><match>" + escapedSearchString + "</match>" + escapedSuffix + "</url>";
    }
    getHighlightedUsername(username, query) {
        const escapedUsernamePrefix = js.other.escapeXml(query.usernamePrefix);
        return "<match>" + escapedUsernamePrefix + "</match>" + username.slice(query.usernamePrefix.length);
    }
    getUrlMatchSuffix(url, searchString) {
        try {
            const urlMatchIndex = url.indexOf(searchString);
            return url.slice(urlMatchIndex + searchString.length);
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
class FirefoxSuggestionHighlighter {
    getHighlightedUrl(context, _query) {
        return context.secret.valid_urls[context.urlIndex];
    }
    getHighlightedUsername(username, _query) {
        return username;
    }
}
