import { bg } from "../../src/bg/bg.js";
import { accountDb, vapi } from "../../src/bg/Context.js";
import { Folder } from "../../src/service/bgApi/types/Folder.js";
export class VaultFolders {
    async sync() {
        try {
            const resp = (await vapi.getAllFolders()).result;
            const resp_folders = resp.operation.Details;
            const folders = [];
            let folder;
            const subfolder_set = new Set();
            for (let resp_folder of resp_folders) {
                try {
                    folder = new Folder();
                    folder.id = resp_folder.chamberid;
                    folder.parent_id = resp_folder.parentchid;
                    folder.name = resp_folder.chambername;
                    folder.name_lowercase = folder.name.toLocaleLowerCase();
                    folder.path = resp_folder.path;
                    folder.path_parts = folder.path.split("\\");
                    if (resp_folder.isshared) {
                        folder.shared = true;
                        folder.sharing_type = resp_folder.sharingtype;
                        folder.sharing_level = resp_folder.sharinglevel;
                    }
                    subfolder_set.add(folder.parent_id);
                    folders.push(folder);
                }
                catch (e) {
                    logError(e);
                }
            }
            for (let folder of folders) {
                folder.has_subfolder = subfolder_set.has(folder.id);
            }
            await accountDb.folderTable.saveAll(folders);
        }
        catch (e) {
            logError(e);
        }
    }
    async getFolderSecrets(folderId) {
        try {
            const respSecrets = await this.getFolderSecretsFromServer(folderId);
            const secrets = await bg.vaultSecrets.secretParser.parseAll(respSecrets);
            await accountDb.secretTable.saveAll(secrets);
            const secret_ids = secrets.map(x => x.id);
            await accountDb.folderSecretMapTable.save(folderId, secret_ids);
            return secrets;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async getFolderSecretsFromServer(folderId) {
        try {
            const LIMIT = 1000;
            let resp = null;
            let respSecrets = null;
            const allSecrets = [];
            for (let pageNo = 0; pageNo < 100; pageNo++) {
                resp = (await vapi.secret.getAll({ pageNo, rowsPerPage: LIMIT, chamberId: folderId })).result;
                respSecrets = resp.operation.Details;
                allSecrets.push(...respSecrets);
                if (respSecrets.length < LIMIT || respSecrets.length == 0) {
                    break;
                }
                const curFetchCount = (pageNo * LIMIT) + respSecrets.length;
                const totalCount = resp.operation.meta.secretcount;
                if (curFetchCount == totalCount) {
                    break;
                }
            }
            return allSecrets;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
