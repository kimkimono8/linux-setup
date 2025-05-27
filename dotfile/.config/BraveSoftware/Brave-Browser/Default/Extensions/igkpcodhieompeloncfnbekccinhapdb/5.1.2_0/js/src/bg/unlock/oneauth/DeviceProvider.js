import { ONEAUTH_STATUS } from "../../../service/bgApi/constants.js";
import { vapi } from "../../Context.js";
export class OneAuthDevice {
    name;
    token;
    publicKey;
}
export class DeviceProvider {
    async getDevice() {
        try {
            const deviceResult = (await this.getDeviceNameToken());
            if (!deviceResult.ok) {
                return deviceResult;
            }
            const device = deviceResult.result;
            const publicKey = (await vapi.oneauth.getDevicePublicKey(device.token)).result;
            if (!publicKey) {
                throw ONEAUTH_STATUS.UPGRADE_APP;
            }
            device.publicKey = publicKey;
            return fnOut.result(device);
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async getDeviceNameToken() {
        const resp = (await vapi.oneauth.getDevices()).result;
        if (!vapi.isRespOk(resp)) {
            return fnOut.error(resp.operation.result.message || "INVALID_API_RESPONSE");
        }
        const deviceObj = resp.operation.Details;
        if (js.obj.isEmpty(deviceObj)) {
            return fnOut.error(ONEAUTH_STATUS.NO_DEVICE_FOUND);
        }
        const primaryDevice = this.extractDevice(deviceObj.primary);
        if (primaryDevice) {
            return fnOut.result(primaryDevice);
        }
        const secondaryDevice = this.extractDevice(deviceObj.secondary);
        if (secondaryDevice) {
            return fnOut.result(secondaryDevice);
        }
        return fnOut.error(ONEAUTH_STATUS.NO_DEVICE_FOUND);
    }
    extractDevice(deviceArray = []) {
        if (!deviceArray || !Array.isArray(deviceArray) || deviceArray.length == 0) {
            return null;
        }
        for (let device of deviceArray) {
            if (!device.device_name || !device.device_token) {
                continue;
            }
            const resDevice = new OneAuthDevice();
            resDevice.name = device.device_name;
            resDevice.token = device.device_token;
            return resDevice;
        }
        return null;
    }
}
