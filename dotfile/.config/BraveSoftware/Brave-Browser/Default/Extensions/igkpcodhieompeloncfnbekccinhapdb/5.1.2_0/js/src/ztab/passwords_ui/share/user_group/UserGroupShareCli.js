import { BaseUserShareCli } from "../base/BaseUserShareCli.js";
export class UserGroupShareCli extends BaseUserShareCli {
    static instance = null;
    static get inst() {
        if (!this.instance) {
            this.instance = new UserGroupShareCli();
        }
        return this.instance;
    }
    async updateUserSharing(apiInput) {
        await bgApi.secret.share.userGroup.update(apiInput);
    }
}
