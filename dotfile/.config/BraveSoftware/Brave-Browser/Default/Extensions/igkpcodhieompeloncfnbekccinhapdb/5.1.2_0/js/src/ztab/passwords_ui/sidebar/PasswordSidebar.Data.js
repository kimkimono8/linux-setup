export class PasswordSidebarData {
    secretTypeMap = null;
    countMap = null;
    async init() {
        try {
            const resp = await bgApi.secretType.getCountMap();
            this.secretTypeMap = resp.map;
            this.countMap = resp.countMap;
        }
        catch (e) {
            logError(e);
        }
    }
}
