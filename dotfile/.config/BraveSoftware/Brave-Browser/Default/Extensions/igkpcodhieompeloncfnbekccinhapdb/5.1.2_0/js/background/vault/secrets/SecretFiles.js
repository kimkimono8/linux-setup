import { vapi } from "../../../src/bg/Context.js";
import { Secret } from "../../../src/service/bgApi/types/Secret.js";
import { VaultApi } from "../../server_api/VaultApi.js";
export class SecretFiles {
    async downloadFile(secretId, file_id) {
        const input = {
            OPERATION_NAME: "GET_SECRET_FILES",
            secretId: secretId,
            fileId: file_id
        };
        const resp = await VaultApi.postChecked("/api/json/secrets", input);
        const resp_file_info = JSON.parse(resp.operation.details.FILEDATA)[0];
        return resp_file_info;
    }
    async downloadAllFiles(secretId) {
        try {
            const resp = (await vapi.getAllFiles(secretId)).result;
            const respFiles = Array.isArray(resp.operation.Details) ? resp.operation.Details : [];
            for (let file of respFiles) {
                file.shared = file.isShared == Secret.IS_SHARED.YES;
            }
            return respFiles;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async updateFiles(secretId, files) {
        try {
            const apiInputFiles = [];
            for (let curFile of files) {
                apiInputFiles.push({
                    name: curFile.name,
                    secretID: secretId,
                    column: curFile.column,
                    data: curFile.data,
                    fileId: curFile.fileId,
                    size: curFile.size
                });
            }
            const apiBody = "FILEDATA=" + encodeURIComponent(JSON.stringify(files));
            await VaultApi.putChecked("/api/rest/json/v1/secrets/sharing/updatefile/" + secretId, apiBody);
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
