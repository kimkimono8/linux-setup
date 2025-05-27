import { ZVError } from "../../common/error/ZVError.js";
import { regexUtil } from "../../common/util/regexUtil.js";
import { logoGetter } from "../../src/bg/logo/export.js";
import { SecretAddPreFillInput } from "../../src/service/bgApi/types/Secret.js";
import { ZTabTask, ZTabAddTask, ZTabAddAddressTask, ZTabAddCardTask, ZTabEditCardTask, ZTabEditTask, ZTabShareTask, ZTabEnableAccessControlTask, ZTabManageAccessControlTask, ZTabRequestAcessTask, ZTAB_TASK } from "../../src/service/bgApi/types/ZTab.js";
import { ZTabPasswordAdd } from "./ZTabPasswordAdd.js";
export class BgZTabHandler {
    pendingZTabTask = null;
    tabCreator = null;
    passwordAdd = new ZTabPasswordAdd();
    init() {
        try {
            this.tabCreator = bgUtil.newTabCreator({ tabName: "ZTAB", url: "/html/ztab.html" });
        }
        catch (e) {
            logError(e);
        }
    }
    async openZTab() {
        try {
            await this.tabCreator.createTab();
        }
        catch (e) {
            logError(e);
        }
    }
    async closeZTab() {
        try {
            await this.tabCreator.close();
        }
        catch (e) {
            logError(e);
        }
    }
    async closeZTabFromId(id) {
        try {
            await this.closeZTab();
            await brApi.tab.closeTab(id);
        }
        catch (e) {
            logError(e);
        }
    }
    async addPassword(prefillInput) {
        try {
            const addTask = new ZTabAddTask();
            addTask.prefillInput = prefillInput;
            await this.fillTabInfo(prefillInput);
            await this.executeZTabTask(addTask);
        }
        catch (e) {
            logError(e);
        }
    }
    async addPasswordFromTab(tabId, frameId) {
        try {
            await this.addPassword(await this.passwordAdd.getPrefillInput(tabId, frameId));
        }
        catch (e) {
            logError(e);
        }
    }
    async addAddress() {
        try {
            const addTask = new ZTabAddAddressTask();
            await this.executeZTabTask(addTask);
        }
        catch (e) {
            ZVError.error(e);
        }
    }
    async addPaymentCard(prefillInput) {
        try {
            const addTask = new ZTabAddCardTask();
            addTask.prefillInput = prefillInput;
            await this.executeZTabTask(addTask);
        }
        catch (e) {
            logError(e);
        }
    }
    async editPaymentCard(prefillInput, secretId) {
        try {
            const editTask = new ZTabEditCardTask();
            editTask.secretId = secretId;
            editTask.prefillInput = prefillInput;
            await this.executeZTabTask(editTask);
        }
        catch (e) {
            logError(e);
        }
    }
    async editPassword(secretId) {
        try {
            const editTask = new ZTabEditTask();
            editTask.secretId = secretId;
            await this.executeZTabTask(editTask);
        }
        catch (e) {
            logError(e);
        }
    }
    async editInput(secretEditUIInput) {
        try {
            const editTask = new ZTabEditTask();
            editTask.editInput = secretEditUIInput;
            await this.executeZTabTask(editTask);
        }
        catch (e) {
            logError(e);
        }
    }
    async sharePassword(secretId) {
        try {
            const shareTask = new ZTabShareTask();
            shareTask.secretId = secretId;
            await this.executeZTabTask(shareTask);
        }
        catch (e) {
            logError(e);
        }
    }
    async enableAccessControl(secretId) {
        try {
            const enableTask = new ZTabEnableAccessControlTask();
            enableTask.secretId = secretId;
            await this.executeZTabTask(enableTask);
        }
        catch (e) {
            logError(e);
        }
    }
    async manageAccessControl(secretId) {
        try {
            const enableTask = new ZTabManageAccessControlTask();
            enableTask.secretId = secretId;
            await this.executeZTabTask(enableTask);
        }
        catch (e) {
            logError(e);
        }
    }
    async getSecretAccess(secretId) {
        try {
            const requestTask = new ZTabRequestAcessTask();
            requestTask.secretId = secretId;
            await this.executeZTabTask(requestTask);
        }
        catch (e) {
            logError(e);
        }
    }
    async openSettings() {
        try {
            await this.executeZTabTask(new ZTabTask(ZTAB_TASK.OPEN_SETTINGS));
        }
        catch (e) {
            logError(e);
        }
    }
    async fillTabInfo(prefillInput) {
        try {
            const activeTab = await brApi.tab.getActiveTab();
            if (!activeTab || !activeTab.url) {
                return;
            }
            const isNonSiteUrl = !activeTab.url.startsWith("http");
            if (isNonSiteUrl) {
                return;
            }
            prefillInput.name = js.url.getParentDomain(activeTab.url);
            prefillInput.logo = await logoGetter.getLogo(activeTab.url);
            prefillInput.description = regexUtil.replaceNonClearTextChars(activeTab.title);
            this.addPrefillUrl(prefillInput, activeTab.url);
        }
        catch (e) {
            logError(e);
        }
    }
    addPrefillUrl(prefillInput, url) {
        try {
            const urlDomain = domainHandler.mapUrl(url);
            for (let existingUrl of prefillInput.urls) {
                if (domainHandler.mapUrl(existingUrl) == urlDomain) {
                    return;
                }
            }
            if (prefillInput.urls == prefillInput.texts) {
                prefillInput.urls = [];
            }
            prefillInput.urls.unshift(url);
        }
        catch (e) {
            logError(e);
        }
    }
    async executeZTabTask(ztabTask) {
        try {
            const isValid = ztabTask instanceof ZTabTask;
            if (!isValid) {
                throw "INVALID_TASK";
            }
            this.pendingZTabTask = ztabTask;
            await this.openZTab();
        }
        catch (e) {
            logError(e);
        }
    }
    async saveGeneratedPassword(password) {
        try {
            const prefillInput = new SecretAddPreFillInput();
            prefillInput.passwords.push(password);
            await this.addPassword(prefillInput);
        }
        catch (e) {
            logError(e);
        }
    }
    getRemovePendingZTabTask() {
        try {
            const task = this.pendingZTabTask;
            this.pendingZTabTask = null;
            return task;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
}
