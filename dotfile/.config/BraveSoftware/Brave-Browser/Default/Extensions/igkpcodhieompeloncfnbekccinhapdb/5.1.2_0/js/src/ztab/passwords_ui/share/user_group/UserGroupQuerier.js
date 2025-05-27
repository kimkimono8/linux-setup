import { vutil } from "../../../../vutil/export.js";
import { BaseUserQuerier } from "../base/BaseUserQuerier.js";
export class UserGroupQuerier extends BaseUserQuerier {
    users = null;
    static createInstance(fn) {
        const obj = new UserGroupQuerier();
        fn.call(obj);
        return obj;
    }
    filteredUsers = {
        nameStart: [],
        nameInclude: [],
        namePattern: [],
    };
    getFilteredUsers() {
        return js.array.concat(this.filteredUsers.nameStart, this.filteredUsers.nameInclude, this.filteredUsers.namePattern);
    }
    partitionUser(user) {
        if (user.nameLowerCase.startsWith(this.lowerCaseSearchString)) {
            this.filteredUsers.nameStart.push(user);
            return;
        }
        if (user.nameLowerCase.includes(this.lowerCaseSearchString)) {
            this.filteredUsers.nameInclude.push(user);
            return;
        }
        if (vutil.search.isPresent(this.lowerCaseSearchString, user.nameLowerCase)) {
            this.filteredUsers.namePattern.push(user);
            return;
        }
    }
}
