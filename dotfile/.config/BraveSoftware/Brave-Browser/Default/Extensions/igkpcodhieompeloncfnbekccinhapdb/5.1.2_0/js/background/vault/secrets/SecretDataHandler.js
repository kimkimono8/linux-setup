const SESSION_AES_KEY = "SESSION_AES_KEY";
export class SecretDataHandler {
    sessionAesKey = null;
    async encodeSecretData(secrets) {
        try {
            await this.initKey();
            const MAX_COUNT = 250;
            const delayCounter = js.loop.createCyclicCounter(MAX_COUNT, 0.1);
            for (let secret of secrets) {
                if (secret.owned || !secret.encrypted) {
                    continue;
                }
                secret.sessionEncryptedData = await this.encrypt(JSON.stringify(secret.encrypted));
                secret.encrypted = null;
                await delayCounter.next();
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async decodeSecretData(secrets) {
        try {
            await this.restoreKey();
            if (!this.sessionAesKey) {
                return;
            }
            const MAX_COUNT = 250;
            const delayCounter = js.loop.createCyclicCounter(MAX_COUNT, 0.1);
            for (let secret of secrets) {
                if (secret.owned || !secret.sessionEncryptedData) {
                    continue;
                }
                secret.encrypted = JSON.parse(await this.decrypt(secret.sessionEncryptedData));
                await delayCounter.next();
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async restoreKey() {
        if (this.sessionAesKey) {
            return;
        }
        const exportedKey = await zsessionStorage.load(SESSION_AES_KEY);
        if (!exportedKey) {
            return;
        }
        this.sessionAesKey = (await js.crypto.aes.importKey(exportedKey)).result;
    }
    async initKey() {
        await this.restoreKey();
        if (this.sessionAesKey) {
            return;
        }
        this.sessionAesKey = (await js.crypto.aes.generateKey()).result;
        const exportedKey = (await js.crypto.aes.exportKey(this.sessionAesKey)).result;
        await zsessionStorage.save(SESSION_AES_KEY, exportedKey);
    }
    async encrypt(plaintext) {
        return js.crypto.aes.encrypt(plaintext, this.sessionAesKey);
    }
    async decrypt(encrypted) {
        try {
            if (!this.sessionAesKey) {
                return null;
            }
            return js.crypto.aes.decrypt(encrypted, this.sessionAesKey);
        }
        catch (e) {
            return null;
        }
    }
}
