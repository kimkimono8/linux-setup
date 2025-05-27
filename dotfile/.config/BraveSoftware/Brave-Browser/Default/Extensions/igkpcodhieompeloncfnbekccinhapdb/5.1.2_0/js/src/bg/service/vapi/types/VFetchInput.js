import { VFetchContentType, VFetchMethod, VFetchResponseType, VFetchServer } from "../constants.js";
export class VFetchInput {
    static newBuilder() {
        return new VFetchInputBuilder(new VFetchInput());
    }
    method;
    server;
    endpoint;
    contentType;
    responseType;
    headers;
    params;
    initParams;
    checkResponse;
    constructor() { }
    build() {
        this.method = this.method || VFetchMethod.GET;
        this.server = this.server || VFetchServer.VAULT;
        this.contentType = this.contentType || VFetchContentType.URL_ENCODED;
        this.responseType = this.responseType || VFetchResponseType.JSON;
        this.headers = this.headers || {};
        this.params = this.params || "";
        this.initParams = this.initParams || {};
        this.checkResponse = this.checkResponse ?? false;
        return this;
    }
}
globalThis["VFetchInput"] = VFetchInput;
export class VFetchInputBuilder {
    input;
    constructor(input) {
        this.input = input;
    }
    build() { return this.input.build(); }
    method(method) { this.input.method = method; return this; }
    server(server) { this.input.server = server; return this; }
    contentType(contentType) { this.input.contentType = contentType; return this; }
    endpoint(endpoint) { this.input.endpoint = endpoint; return this; }
    responseType(responseType) { this.input.responseType = responseType; return this; }
    headers(headers) { this.input.headers = headers; return this; }
    params(params) { this.input.params = params; return this; }
    initParams(initParams) { this.input.initParams = initParams; return this; }
    checkResponse(checkResponse) { this.input.checkResponse = checkResponse; return this; }
}
