import { ZVaultUtil } from "../../../common/old/ZVaultUtil.js";
import { bg } from "../../../src/bg/bg.js";
import { accountDb, vapi } from "../../../src/bg/Context.js";
import { bgStorage } from "../../../src/bg/storage/export.js";
import { TAB_STORAGE_PREFIX } from "../../../src/bg/storage/types.js";
import { Secret } from "../../../src/service/bgApi/types/Secret.js";
import { LocalStorageKeys } from "../../../src/service/storage/constants/LocalStorageKeys.js";
import { TabStorageKeys } from "../../../src/service/storage/constants/TabStorageKeys.js";
export class SecretRecording {
    memory = bgStorage.createTabStorage(TAB_STORAGE_PREFIX.LOGIN);
    init() {
        this.memory.init();
    }
    async getRecording(url) {
        try {
            const domain = js.url.getHostName(url);
            const dbRecording = await accountDb.recordingTable.load(domain);
            if (dbRecording) {
                return dbRecording;
            }
            const recording = await this.getRecordingFromServer(domain);
            await accountDb.recordingTable.save(domain, recording);
            return recording;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async login(loginData, steps, tab, url) {
        try {
            const secret = await bg.vaultSecrets.secretGetter.getSecret(loginData.secretId);
            const secret_data = secret.encrypted.fields;
            const is_shared = secret.shared;
            const ans_secret_data = {};
            for (let x in secret_data) {
                ans_secret_data[x] = await bg.zcrypt.decrypt(secret_data[x], is_shared);
            }
            const secret_type = await accountDb.secretTypeTable.load(secret.type_id);
            const hasViewPermission = Secret.hasViewPermission(loginData.shareLevel);
            const parsedSteps = JSON.parse(steps);
            const infoUrl = parsedSteps[0].url || url;
            const page_info = {
                secretId: loginData.secretId,
                secretdata: ans_secret_data,
                fields: secret_type.fields,
                secretUrl: infoUrl,
                urls: secret.urls,
                accessControl: secret.access_controlled,
                submit: false,
                insecure_page_prompt: await zlocalStorage.load(LocalStorageKeys.INSECURE_PAGE_PROMPT, true),
                has_totp: secret.has_totp,
                has_view_permission: hasViewPermission,
                one_click_login: !hasViewPermission,
                step_no: 0,
                steps,
                total_steps: parsedSteps.length,
                tab: tab.id,
                countdown: 0,
                filledData: {
                    text: 0,
                    password: 0
                },
                oneauthId: secret.oneauth_id
            };
            const tabData = {
                playback: true,
                reloading: false,
                data: page_info
            };
            await this.setPlaybackData(tab.id, tabData);
            ZVaultUtil.sendMessage(tab.id, "startPlayback", page_info);
        }
        catch (e) {
            logError(e);
        }
    }
    async setPlaybackData(tabId, playbackData) {
        try {
            await this.memory.save(tabId, TabStorageKeys.PLAYBACK_DATA, playbackData);
        }
        catch (e) {
            logError(e);
        }
    }
    async removePlaybackData(tabId) {
        try {
            await this.memory.remove(tabId, TabStorageKeys.PLAYBACK_DATA);
        }
        catch (e) {
            logError(e);
        }
    }
    async getPlaybackData(tabId) {
        try {
            const existing = await this.memory.load(tabId, TabStorageKeys.PLAYBACK_DATA, null);
            return existing;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async updatePlaybackInnerData(tabId, data) {
        try {
            const existing = await this.getPlaybackData(tabId);
            existing.data = data;
            bg.vaultSecrets.secretLogin.recording.setPlaybackData(tabId, existing);
        }
        catch (e) {
            logError(e);
        }
    }
    async getRecordingFromServer(domain) {
        try {
            const resp = (await vapi.getRecording(domain)).result;
            if (!vapi.isRespOk(resp)) {
                return null;
            }
            if (resp.operation.Details && !resp.operation.Details.recording) {
                return null;
            }
            const stepsString = resp.operation.Details.recording.steps || js.obj.getFirstProperty(resp.operation.details).steps;
            JSON.parse(stepsString);
            return stepsString;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async isInLogin(tabId) {
        try {
            const loginData = await bgStorage.tab.load(tabId, TabStorageKeys.LOGIN_DATA, null);
            if (loginData) {
                return true;
            }
            const playBackData = await this.memory.load(tabId, TabStorageKeys.PLAYBACK_DATA, null);
            if (playBackData) {
                return true;
            }
            return false;
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
