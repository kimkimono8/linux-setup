import { bg } from "../../src/bg/bg.js";
import { TrashQueryResult } from "../../src/service/bgApi/types/Secret.js";
import { VaultApi } from "../server_api/VaultApi.js";
export class VaultTrash {
    async queryTrash(query) {
        try {
            const queryObj = {
                rowPerPage: query.rows_per_page,
                pageNum: query.page_no,
                isAsc: true,
                secretName: query.search_string
            };
            const resp = await VaultApi.getChecked("/api/rest/json/v1/secrets/trashedsecrets", queryObj);
            const secrets = await bg.vaultSecrets.secretParser.parseAll(resp.operation.Details);
            const queryResult = new TrashQueryResult();
            queryResult.query = query;
            queryResult.secrets = secrets;
            queryResult.total_count = resp.operation.meta.secretcount;
            return queryResult;
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
