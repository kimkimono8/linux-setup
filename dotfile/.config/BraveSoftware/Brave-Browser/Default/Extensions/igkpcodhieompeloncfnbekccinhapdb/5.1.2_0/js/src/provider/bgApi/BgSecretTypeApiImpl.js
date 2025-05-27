export class BgSecretTypeApiImpl {
    context;
    prefix = "secretType.";
    constructor(context) {
        this.context = context;
    }
    async getAll() {
        return await this.context.apiClient.callApi({ path: this.prefix + this.getAll.name });
    }
    async get(typeId) {
        return await this.context.apiClient.callApi({ path: this.prefix + this.get.name, args: [typeId] });
    }
    async getMap() {
        return await this.context.apiClient.callApi({ path: this.prefix + this.getMap.name });
    }
    async getCountMap() {
        return await this.context.apiClient.callApi({ path: this.prefix + this.getCountMap.name });
    }
}
