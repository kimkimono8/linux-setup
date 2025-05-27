export class BgUserApiImpl {
    context;
    prefix = "user.";
    constructor(context) {
        this.context = context;
    }
    getDp() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getDp.name });
    }
    getDpSized(size) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getDpSized.name, args: [size] });
    }
    getDpOf(zuid) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getDpOf.name, args: [zuid] });
    }
    searchUsers(searchString) {
        return this.context.apiClient.callApi({ path: this.prefix + this.searchUsers.name, args: [searchString] });
    }
    searchAdmins(searchString) {
        return this.context.apiClient.callApi({ path: this.prefix + this.searchAdmins.name, args: [searchString] });
    }
}
