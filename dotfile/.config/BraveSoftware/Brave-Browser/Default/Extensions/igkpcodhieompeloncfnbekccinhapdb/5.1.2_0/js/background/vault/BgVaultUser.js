import { regexUtil } from "../../common/util/regexUtil.js";
import { vapi } from "../../src/bg/Context.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { VaultApi } from "../server_api/VaultApi.js";
export class BgVaultUser {
    static DEFAULT_DP = "/images/user/profile.svg";
    constructor() {
        this.getDpOf = js.fn.wrapper.createSingleInstance(this.getDpOf, this);
    }
    async getDpSized(size) {
        try {
            const zuid = await zlocalStorage.load(LocalStorageKeys.ZUID, "");
            const blob = await vapi.contacts.getSizedDpFromServer(zuid, size);
            return await this.readBlobAsDataUrl(blob.result);
        }
        catch (e) {
            logError(e);
            return BgVaultUser.DEFAULT_DP;
        }
    }
    async getDp() {
        try {
            const zuid = await zlocalStorage.load(LocalStorageKeys.ZUID, "");
            if (!zuid) {
                return BgVaultUser.DEFAULT_DP;
            }
            const existing = await zlocalStorage.load(LocalStorageKeys.DP, "");
            if (existing) {
                return existing;
            }
            return this.getDpFromServer();
        }
        catch (e) {
            logError(e);
            return BgVaultUser.DEFAULT_DP;
        }
    }
    async getDpFromServer() {
        try {
            const zuid = await zlocalStorage.load(LocalStorageKeys.ZUID, "");
            const blob = await vapi.contacts.getDpNoCache(zuid);
            const dp = await this.readBlobAsDataUrl(blob.result);
            if (!this.isValidDp(dp)) {
                return BgVaultUser.DEFAULT_DP;
            }
            await zlocalStorage.save(LocalStorageKeys.DP, dp);
            return dp;
        }
        catch (e) {
            logError(e);
            return BgVaultUser.DEFAULT_DP;
        }
    }
    async getDpOf(zuid) {
        try {
            const blob = await vapi.contacts.getDp(zuid);
            const dp = await this.readBlobAsDataUrl(blob.result);
            if (!this.isValidDp(dp)) {
                return BgVaultUser.DEFAULT_DP;
            }
            return dp;
        }
        catch (e) {
            logError(e);
            return BgVaultUser.DEFAULT_DP;
        }
    }
    isValidDp(dp) {
        return Boolean(dp) && !dp.includes("html");
    }
    async readBlobAsDataUrl(blob) {
        return await new Promise(function (res, rej) {
            const fr = new FileReader();
            fr.onload = () => res(fr.result);
            fr.onerror = () => rej("error: reading dp");
            fr.readAsDataURL(blob);
        });
    }
    async searchUsers(searchString) {
        return new BaseServerUserSearcher().search(searchString);
    }
    async searchAdmins(searchString) {
        return new ServerAdminUserSearcher().search(searchString);
    }
}
class BaseServerUserSearcher {
    async search(searchString) {
        try {
            const apiParams = this.getSearchParams(searchString);
            const users = await this.getUsersFromServer(apiParams);
            return users;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getSearchParams(searchString) {
        const params = {
            currentUser: false,
            status: "active",
            searchString: regexUtil.getApiSearchString(searchString),
            pageNumber: 1,
            rowsPerPage: 50
        };
        return params;
    }
    async getUsersFromServer(filterParams) {
        try {
            const resp = await VaultApi.getChecked("/api/rest/json/v1/user/filter", filterParams);
            const reqUsers = [];
            for (let user of resp.operation.Details.users) {
                reqUsers.push({
                    userAutoId: user.user_auto_id,
                    name: user.username,
                    email: user.email,
                    zuid: user.zuid
                });
            }
            return reqUsers;
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
class ServerAdminUserSearcher extends BaseServerUserSearcher {
    getSearchParams(searchString) {
        const params = { ...super.getSearchParams(searchString), role: "Admin" };
        return params;
    }
}
