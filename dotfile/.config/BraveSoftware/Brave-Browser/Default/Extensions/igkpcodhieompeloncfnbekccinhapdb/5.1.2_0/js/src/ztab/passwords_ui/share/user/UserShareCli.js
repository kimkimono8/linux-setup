import { BaseUserShareCli } from "../base/BaseUserShareCli.js";
export class UserShareCli extends BaseUserShareCli {
    static instance = null;
    static get inst() {
        if (!this.instance) {
            this.instance = new UserShareCli();
        }
        return this.instance;
    }
    async updateUserSharing(apiInput) {
        await bgApi.secret.share.user.update(apiInput);
    }
}
