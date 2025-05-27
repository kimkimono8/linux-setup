import { vutil } from "../../../../vutil/export.js";
import { BaseUserQuerier } from "../base/BaseUserQuerier.js";
export class UserQuerier extends BaseUserQuerier {
    static FIELDS = {
        NAME: "NAME",
        EMAIL: "EMAIL"
    };
    static createInstance(fn) {
        const obj = new UserQuerier();
        fn.call(obj);
        return obj;
    }
    FIELDS = UserQuerier.FIELDS;
    filteredUsers = {
        nameStart: [],
        emailStart: [],
        nameInclude: [],
        emailNamePartInclude: [],
        emailInclude: [],
        namePattern: [],
        emailPattern: []
    };
    getFilteredUsers() {
        return js.array.concat(this.filteredUsers.nameStart, this.filteredUsers.emailStart, this.filteredUsers.nameInclude, this.filteredUsers.emailNamePartInclude, this.filteredUsers.emailInclude, this.filteredUsers.namePattern, this.filteredUsers.emailPattern);
    }
    partitionUser(user) {
        if (user.nameLowerCase.startsWith(this.lowerCaseSearchString)) {
            this.matchFieldMap.set(user.id, this.FIELDS.NAME);
            this.filteredUsers.nameStart.push(user);
            return;
        }
        if (user.emailLowerCase.startsWith(this.lowerCaseSearchString)) {
            this.matchFieldMap.set(user.id, this.FIELDS.EMAIL);
            this.filteredUsers.emailStart.push(user);
            return;
        }
        if (user.nameLowerCase.includes(this.lowerCaseSearchString)) {
            this.matchFieldMap.set(user.id, this.FIELDS.NAME);
            this.filteredUsers.nameInclude.push(user);
            return;
        }
        if (user.emailNamePartLowerCase.includes(this.lowerCaseSearchString)) {
            this.matchFieldMap.set(user.id, this.FIELDS.EMAIL);
            this.filteredUsers.emailNamePartInclude.push(user);
            return;
        }
        if (user.emailLowerCase.includes(this.lowerCaseSearchString)) {
            this.matchFieldMap.set(user.id, this.FIELDS.EMAIL);
            this.filteredUsers.emailInclude.push(user);
            return;
        }
        if (vutil.search.isPresent(this.lowerCaseSearchString, user.nameLowerCase)) {
            this.matchFieldMap.set(user.id, this.FIELDS.NAME);
            this.filteredUsers.namePattern.push(user);
            return;
        }
        if (vutil.search.isPresent(this.lowerCaseSearchString, user.emailLowerCase)) {
            this.matchFieldMap.set(user.id, this.FIELDS.EMAIL);
            this.filteredUsers.emailPattern.push(user);
            return;
        }
    }
}
