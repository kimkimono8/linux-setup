import { VFetchResponseType, VFetchServer } from "../../service/vapi/constants.js";
import { VFetchInput } from "../../service/vapi/types/VFetchInput.js";
import { gg } from "./GG.js";
export class ContactsApiImpl {
    async getDp(zuid) {
        return this.getDpFromServer(zuid, "force-cache");
    }
    async getDpNoCache(zuid) {
        return this.getDpFromServer(zuid, "reload");
    }
    async getSizedDpFromServer(zuid, size) {
        return gg.vapi.fetch.fetch(VFetchInput.newBuilder()
            .server(VFetchServer.CONTACT)
            .endpoint("/file")
            .params({ height: size, width: size, ID: zuid })
            .initParams({ cache: "reload" })
            .responseType(VFetchResponseType.BLOB)
            .build());
    }
    async getDpFromServer(zuid, cache) {
        return gg.vapi.fetch.fetch(VFetchInput.newBuilder()
            .server(VFetchServer.CONTACT)
            .endpoint("/file")
            .params({ fs: "thumb", exp: "30", ID: zuid })
            .initParams({ cache })
            .responseType(VFetchResponseType.BLOB)
            .build());
    }
}
