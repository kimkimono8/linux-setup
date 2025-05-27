import { zt } from "../../../../../ztab/zt.js";
import { Secret } from "../../../../service/bgApi/types/Secret.js";
export class BaseUserShareCli {
    async updateSharing(secretId, users) {
        try {
            const manageUserIds = [];
            const modifyUserIds = [];
            const viewUserIds = [];
            const loginUserIds = [];
            const LEVEL = Secret.SHARING_LEVEL;
            for (let user of users) {
                switch (user.shareLevel) {
                    case LEVEL.MANAGE:
                        manageUserIds.push(user.id);
                        break;
                    case LEVEL.MODIFY:
                        modifyUserIds.push(user.id);
                        break;
                    case LEVEL.VIEW:
                        viewUserIds.push(user.id);
                        break;
                    case LEVEL.LOGIN:
                        loginUserIds.push(user.id);
                        break;
                }
            }
            const apiInput = {
                secretId,
                manageUserIds,
                modifyUserIds,
                viewUserIds,
                loginUserIds
            };
            zt.mainUI.showDotLoading();
            await this.updateUserSharing(apiInput);
        }
        catch (e) {
            throw jserror(e);
        }
        finally {
            zt.mainUI.hideDotLoading();
        }
    }
}
