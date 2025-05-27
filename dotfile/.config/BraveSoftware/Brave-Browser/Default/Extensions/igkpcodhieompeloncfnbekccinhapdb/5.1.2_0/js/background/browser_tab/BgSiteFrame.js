import { bg } from "../../src/bg/bg.js";
import { SecretAddPreFillInput, Secret } from "../../src/service/bgApi/types/Secret.js";
import { SecretQuery } from "../../src/service/bgApi/types/SecretQuery.js";
import { SecretToFillFieldMapper } from "../background_utils/SecretToFillFieldMapper.js";
export class BgSiteFrame {
    async getSiteFrameSecrets(url, query) {
        try {
            const secretQuery = this.getSecretQuery(url, query);
            const secretQueryResult = await bg.vaultSecrets.secretQuerier.query(secretQuery);
            const siteFrameSecrets = await new SecretToSiteFrameMenuSecretMapper().map(secretQueryResult.secrets);
            return siteFrameSecrets;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async frameLogin(tabId, frameId, secretId) {
        try {
            csApi.frame.closeSiteFrame({}, tabId);
            await bg.vaultSecrets.secretLogin.frameLogin(tabId, frameId, secretId);
        }
        catch (e) {
            logError(e);
        }
    }
    async frameFill(tabId, frameId, secretId) {
        try {
            csApi.frame.closeSiteFrame({}, tabId);
            await bg.vaultSecrets.secretLogin.frameFill(tabId, frameId, secretId);
        }
        catch (e) {
            logError(e);
        }
    }
    async fillField(tabId, frameId, secretId, fieldName) {
        try {
            csApi.frame.closeSiteFrame({}, tabId);
            await bg.vaultSecrets.secretLogin.fillField(tabId, frameId, secretId, fieldName);
        }
        catch (e) {
            logError(e);
        }
    }
    async fillTotp(tabId, frameId, secretId) {
        try {
            csApi.frame.closeSiteFrame({}, tabId);
            await bg.vaultSecrets.secretLogin.fillTotp(tabId, frameId, secretId);
        }
        catch (e) {
            logError(e);
        }
    }
    async fillOneAuthTotp(tabId, frameId, secretId, oneauthId) {
        try {
            csApi.frame.closeSiteFrame({}, tabId);
            await bg.vaultSecrets.secretLogin.fillOneAuthTotp(tabId, frameId, secretId, oneauthId);
        }
        catch (e) {
            logError(e);
        }
    }
    async fillCustomCol(tabId, frameId, secretId, columnId) {
        try {
            csApi.frame.closeSiteFrame({}, tabId);
            await bg.vaultSecrets.secretLogin.fillCustomCol(tabId, frameId, secretId, columnId);
        }
        catch (e) {
            logError(e);
        }
    }
    async fillGeneratedPassword(tabId, frameId, value) {
        try {
            await csApi.login.fillGeneratedPassword(value, { tabId, frameId });
        }
        catch (e) {
            logError(e);
        }
    }
    checkSiteFrameTab(url) {
        try {
            const urlObj = new URL(url);
            return brApi.runtime.getUrl("/html/tab/SiteFrame.html") == urlObj.origin + urlObj.pathname;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    getSecretQuery(url, siteFrameQuery) {
        try {
            const queryBuilder = SecretQuery.newBuilder()
                .rowsPerPage(siteFrameQuery.rows_per_page)
                .searchString(siteFrameQuery.search_string)
                .pageNo(siteFrameQuery.page_no);
            if (!this.checkSiteFrameTab(url)) {
                queryBuilder.domainMatching(true, url).orderByHostRecent();
            }
            return queryBuilder.build();
        }
        catch (e) {
            logError(e);
            return SecretQuery.newBuilder().build();
        }
    }
    async saveGeneratedPassword(password, frameId, tabId) {
        try {
            const prefillInput = new SecretAddPreFillInput();
            prefillInput.texts.push(await this.getGeneratorSaveUsername(tabId, frameId));
            prefillInput.passwords.push(password);
            const fillFrameUrl = frameId != 0;
            if (fillFrameUrl) {
                const frameUrl = await csApi.other.getFrameUrl({ tabId, frameId });
                prefillInput.urls.push(frameUrl);
            }
            await bg.ztabHandler.addPassword(prefillInput);
        }
        catch (e) {
            logError(e);
        }
    }
    async getGeneratorSaveUsername(tabId, frameId) {
        try {
            const isConnectable = await csApi.isConnectable({ tabId, frameId });
            if (!isConnectable) {
                throw "frame not connectable";
            }
            const username = await csApi.other.getGeneratorSaveUsername({ tabId, frameId });
            return username;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async addPassword(tabId, frameId) {
        try {
            csApi.frame.closeSiteFrame({ restoreFoucs: true }, tabId);
            await bg.ztabHandler.addPasswordFromTab(tabId, frameId);
        }
        catch (e) {
            logError(e);
        }
    }
}
class SecretToSiteFrameMenuSecretMapper extends SecretToFillFieldMapper {
    async mapSecret(secret) {
        try {
            if (!this.secretTypeMap[secret.type_id]) {
                return null;
            }
            const hasAccess = Secret.hasAccess(secret);
            const userName = hasAccess ? await bg.zcrypt.decrypt(secret.ui_text, secret.shared) : "";
            const siteFrameSecret = {
                id: secret.id,
                name: secret.name,
                username: userName,
                logo: secret.logo || secret.domain_logo,
                favourite: secret.is_favourite,
                hasTotp: secret.has_totp,
                sharingLevel: secret.sharing_level,
                hasAccess,
                fillFields: this.getFillFields(secret),
                customColFillFields: this.getCustomColFillFields(secret),
                autoSubmit: secret.auto_submit,
                createdOn: secret.created_on,
                accessControlConfigured: secret.display_access_control_icon,
                oneauthId: secret.oneauth_id,
                highlight_field: secret.highlight_field
            };
            return siteFrameSecret;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
}
