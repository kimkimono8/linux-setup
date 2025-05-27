import { regexUtil } from "../../../common/util/regexUtil.js";
import { bg } from "../../../src/bg/bg.js";
import { bgEventServer, vapi } from "../../../src/bg/Context.js";
import { VFetchContentType } from "../../../src/bg/service/vapi/constants.js";
import { Secret } from "../../../src/service/bgApi/types/Secret.js";
import { LocalStorageKeys } from "../../../src/service/storage/constants/LocalStorageKeys.js";
import { VaultApi } from "../../server_api/VaultApi.js";
export class SecretShare {
    p = null;
    async getSecretShareUserUIInput(secretId) {
        try {
            const secret = await bg.vaultSecrets.secretGetter.getServerSecret(secretId);
            const uiInput = {
                secretId,
                ownerId: "",
                secretName: secret.name,
                users: []
            };
            try {
                const userShareResp = (await vapi.sharing.getUserSharingInfo(secretId)).result;
                uiInput.users = new SecretShareUIUserGetter().getSecretShareUIUsers(userShareResp);
            }
            catch (e) {
                console.info(e);
            }
            const curZuid = await zlocalStorage.load(LocalStorageKeys.ZUID, "");
            js.array.removeFirstMatch(uiInput.users, (x) => x.zuid == curZuid);
            return uiInput;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async getSecretShareUserGroupUIInput(secretId) {
        try {
            const secret = await bg.vaultSecrets.secretGetter.getDbSecret(secretId);
            const uiInput = {
                secretId,
                ownerId: "",
                secretName: secret.name,
                users: []
            };
            try {
                const userShareResp = (await vapi.sharing.getUserGroupSharingInfo(secretId)).result;
                uiInput.users = new SecretShareUIUserGroupGetter().getSecretShareUIUsers(userShareResp);
            }
            catch (e) {
                console.info(e);
            }
            return uiInput;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async updateUserSharing(input) {
        return this.updateSharingInServer(input, "/api/rest/json/v1/sharing/secret/users/bulkshare");
    }
    async updateUserGroupSharing(input) {
        return this.updateSharingInServer(input, "/api/rest/json/v1/sharing/secret/usergroups/bulkshare");
    }
    async updateSharingInServer(input, endpoint) {
        try {
            const apiInput = {
                INPUT_DATA: {
                    manageusers: input.manageUserIds,
                    modifyusers: input.modifyUserIds,
                    viewusers: input.viewUserIds,
                    logonusers: input.loginUserIds,
                },
                secretIds: [input.secretId]
            };
            await bg.vaultSecrets.secretEdit.reEncryptSecretForSharing(input.secretId);
            const resp = await VaultApi.putChecked(endpoint, JSON.stringify(apiInput), VFetchContentType.JSON);
            const respSecret = resp.operation.Details.secretArray[0];
            const secret = await this.p.addVApiSecretResponse(respSecret);
            bgEventServer.secret.changed(secret.id);
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
class BaseSecretShareUIUserGetter {
    getSecretShareUIUsers(userShareResp) {
        try {
            const details = userShareResp.operation.Details;
            const reqUsers = [];
            if (!details) {
                return reqUsers;
            }
            for (let curRespUser of details.manageusers) {
                reqUsers.push(this.mapRespUser(curRespUser, Secret.SHARING_LEVEL.MANAGE));
            }
            for (let curRespUser of details.modifyusers) {
                reqUsers.push(this.mapRespUser(curRespUser, Secret.SHARING_LEVEL.MODIFY));
            }
            for (let curRespUser of details.viewusers) {
                reqUsers.push(this.mapRespUser(curRespUser, Secret.SHARING_LEVEL.VIEW));
            }
            for (let curRespUser of details.logonusers) {
                reqUsers.push(this.mapRespUser(curRespUser, Secret.SHARING_LEVEL.LOGIN));
            }
            for (let curRespUser of details.notshared) {
                reqUsers.push(this.mapRespUser(curRespUser, Secret.SHARING_LEVEL.NONE));
            }
            return reqUsers;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    mapRespUser(respUser, shareLevel) {
        respUser;
        shareLevel;
        throw "not implemented";
    }
}
class SecretShareUIUserGetter extends BaseSecretShareUIUserGetter {
    getSecretShareUIUsers(userShareResp) {
        return super.getSecretShareUIUsers(userShareResp);
    }
    mapRespUser(respUser, shareLevel) {
        try {
            const user = {
                id: respUser.user_auto_id,
                zuid: respUser["unique-id"],
                name: respUser.username,
                email: respUser.email,
                selected: false,
                shareLevel,
                nameLowerCase: respUser.username.toLowerCase(),
                emailLowerCase: respUser.email.toLowerCase(),
                emailNamePartLowerCase: regexUtil.getEmailNamePart(respUser.email).toLowerCase(),
                searchWeight: 0,
                dp: ""
            };
            return user;
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
class SecretShareUIUserGroupGetter extends BaseSecretShareUIUserGetter {
    getSecretShareUIUsers(userShareResp) {
        return super.getSecretShareUIUsers(userShareResp);
    }
    mapRespUser(respUser, shareLevel) {
        try {
            const userGroup = {
                id: respUser.usergroup_auto_id,
                name: respUser.usergroupname,
                selected: false,
                shareLevel,
                nameLowerCase: respUser.usergroupname.toLowerCase(),
                searchWeight: 0
            };
            return userGroup;
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
