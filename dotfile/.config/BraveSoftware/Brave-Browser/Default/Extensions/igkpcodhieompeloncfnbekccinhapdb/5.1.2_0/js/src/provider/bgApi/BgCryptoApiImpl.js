export class BgCryptoApiImpl {
    context;
    prefix = "crypto.";
    file;
    ext;
    constructor(context) {
        this.context = context;
        this.file = new BgFileCryptoApiImpl(context);
        this.ext = new BgExtCryptoApiImpl(context);
    }
    async encrypt(plaintext, isShared) {
        return this.context.apiClient.callApi({ path: this.prefix + this.encrypt.name, args: [plaintext, isShared] });
    }
    async decrypt(ciphertext, isShared) {
        return this.context.apiClient.callApi({ path: this.prefix + this.decrypt.name, args: [ciphertext, isShared] });
    }
    async getKey(isShared) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getKey.name, args: [isShared] });
    }
    async getIsShared(classification) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getIsShared.name, args: [classification] });
    }
}
class BgFileCryptoApiImpl {
    context;
    prefix = "crypto.file.";
    constructor(context) {
        this.context = context;
    }
    async encrypt(plaintext, isShared) {
        return this.context.apiClient.callApi({ path: this.prefix + this.encrypt.name, args: [plaintext, isShared] });
    }
    async decrypt(ciphertext, isShared) {
        return this.context.apiClient.callApi({ path: this.prefix + this.decrypt.name, args: [ciphertext, isShared] });
    }
}
class BgExtCryptoApiImpl {
    context;
    prefix = "crypto.ext.";
    constructor(context) {
        this.context = context;
    }
    async encrypt(plaintext) {
        return this.context.apiClient.callApi({ path: this.prefix + this.encrypt.name, args: [plaintext] });
    }
    async decrypt(ciphertext) {
        return this.context.apiClient.callApi({ path: this.prefix + this.decrypt.name, args: [ciphertext] });
    }
}
