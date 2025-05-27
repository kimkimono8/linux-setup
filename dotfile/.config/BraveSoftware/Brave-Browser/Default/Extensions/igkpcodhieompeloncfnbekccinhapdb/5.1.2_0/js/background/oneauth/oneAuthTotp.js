import { vapi } from "../../src/bg/Context.js";
import { VFetchContentType } from "../../src/bg/service/vapi/constants.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
export class OneAuthTotp {
    deviceId = null;
    notificationName = "OneAuthTotp";
    async sync() {
        try {
            const totpLookupApi = await this.getAccountsAPI("/signin/v2/lookup/self?mode=extension");
            const response = await fetch(totpLookupApi, { method: "POST",
                headers: await vapi.fetch.getHeaders()
            });
            const resp = await response.json();
            if (resp.status_code == 201) {
                for (let device of resp.lookup.device) {
                    if (device.is_primary) {
                        this.deviceId = device.device_id;
                        zlocalStorage.save(LocalStorageKeys.ONEAUTH_TOTP_DEVICE, device);
                        break;
                    }
                }
                zlocalStorage.save(LocalStorageKeys.ONEAUTH_TOTP_SECRETS, resp.lookup.tp_data != undefined ? resp.lookup.tp_data : []);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async getAccountsAPI(endpoint) {
        return urlProvider.getAccountsUrl() + endpoint;
    }
    async getDeviceId() {
        if (this.deviceId != null) {
            return this.deviceId;
        }
        const oneAuthDevice = await zlocalStorage.load(LocalStorageKeys.ONEAUTH_TOTP_DEVICE, "");
        if (!oneAuthDevice) {
            return null;
        }
        return oneAuthDevice.device_id;
    }
    async getTotp(oneauthId) {
        const token = await this.pushNotification(oneauthId);
        if (token != null) {
            await this.showDesktopNotification();
            await js.time.delay(5);
            const totp = await this.getOneAuthResponse(token);
            await this.clearDesktopNotification();
            return totp;
        }
        return null;
    }
    async pushNotification(oneauthId) {
        const deviceId = await this.getDeviceId();
        if (deviceId == null) {
            return null;
        }
        const param = JSON.stringify({ sendpushnotify: { app_id: oneauthId } });
        const pushAPI = await this.getAccountsAPI("/api/v1/extension/self/device/" + deviceId + "/push");
        const response = await fetch(pushAPI, {
            method: "POST",
            headers: await vapi.fetch.getHeaders(VFetchContentType.JSON), body: param
        });
        const data = await response.json();
        if (data.message == "device push status sent" && data.status_code == 201) {
            return data.sendpushnotify.token;
        }
        return null;
    }
    async pollOneAuthServer(token) {
        const deviceId = await this.getDeviceId();
        if (deviceId == null) {
            return;
        }
        const pollAPI = await this.getAccountsAPI("/api/v1/extension/self/device/" + deviceId + "/poll");
        const headers = await vapi.fetch.getHeaders();
        headers["Z-authorization"] = "Zoho-oauthtoken " + token;
        const response = await fetch(pollAPI, {
            method: "PUT",
            headers
        });
        return await response.json();
    }
    async getOneAuthResponse(token, count = 0) {
        const pollData = await this.pollOneAuthServer(token);
        if (pollData.status_code == 200) {
            if (pollData.code == "D101" && pollData.verifypushnotify[0].totp != undefined) {
                const totp = pollData.verifypushnotify[0].totp;
                return totp;
            }
        }
        else if (pollData.status_code == 500 && pollData.errors[0].code == "D102" && count < 20) {
            await js.time.delay(3);
            return await this.getOneAuthResponse(token, ++count);
        }
        return null;
    }
    async showDesktopNotification() {
        await this.clearDesktopNotification();
        await brApi.notification.create(this.notificationName, {
            type: "basic",
            iconUrl: "/images/logo/vault-128.png",
            title: i18n(VI18N.ONEAUTH_NOTIFICATION_PUSHED),
            message: i18n(VI18N.ONEAUTH_APPROVE_MESSAGE)
        });
    }
    async clearDesktopNotification() {
        await brApi.notification.clear(this.notificationName);
    }
}
