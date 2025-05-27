import { bg } from "../bg.js";
export class BgUserApiImpl {
    async getDp() {
        return bg.user.getDp();
    }
    getDpSized(size) {
        return bg.user.getDpSized(size);
    }
    async getDpOf(zuid) {
        return bg.user.getDpOf(zuid);
    }
    async searchUsers(searchString) {
        return bg.user.searchUsers(searchString);
    }
    async searchAdmins(searchString) {
        return bg.user.searchAdmins(searchString);
    }
}
