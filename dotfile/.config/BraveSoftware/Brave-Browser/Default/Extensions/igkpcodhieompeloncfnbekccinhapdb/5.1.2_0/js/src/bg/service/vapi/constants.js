export var VFetchMethod;
(function (VFetchMethod) {
    VFetchMethod["GET"] = "GET";
    VFetchMethod["POST"] = "POST";
    VFetchMethod["PUT"] = "PUT";
    VFetchMethod["DELETE"] = "DELETE";
})(VFetchMethod || (VFetchMethod = {}));
export var VFetchContentType;
(function (VFetchContentType) {
    VFetchContentType["URL_ENCODED"] = "application/x-www-form-urlencoded;charset=UTF-8";
    VFetchContentType["TEXT_PLAIN"] = "text/plain;charset=UTF-8";
    VFetchContentType["JSON"] = "application/json; charset=utf-8";
})(VFetchContentType || (VFetchContentType = {}));
export var VFetchResponseType;
(function (VFetchResponseType) {
    VFetchResponseType["TEXT"] = "TEXT";
    VFetchResponseType["JSON"] = "JSON";
    VFetchResponseType["RAW"] = "RAW";
    VFetchResponseType["BLOB"] = "BLOB";
})(VFetchResponseType || (VFetchResponseType = {}));
export var VFetchServer;
(function (VFetchServer) {
    VFetchServer["VAULT"] = "VAULT";
    VFetchServer["ACCOUNTS"] = "ACCOUNTS";
    VFetchServer["CONTACT"] = "CONTACT";
    VFetchServer["CUSTOM"] = "CUSTOM";
})(VFetchServer || (VFetchServer = {}));
