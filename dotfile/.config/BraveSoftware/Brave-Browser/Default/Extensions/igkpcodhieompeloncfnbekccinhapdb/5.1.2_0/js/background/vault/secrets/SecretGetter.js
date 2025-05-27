import { bg } from "../../../src/bg/bg.js";
import { accountDb, vapi } from "../../../src/bg/Context.js";
import { VaultApi } from "../../server_api/VaultApi.js";
export class SecretGetter {
    p = null;
    lastGotTrashedSecret = null;
    async getSecret(secretId) {
        try {
            const secret = await accountDb.secretTable.get(secretId);
            const hasValidLocalSecret = secret && Boolean(secret.encrypted) &&
                (!secret.shared || (!secret.access_controlled && (secret.fetchedOn + this.p.secretParser.PLUS_VALID_MINS_MS > Date.now())));
            if (hasValidLocalSecret) {
                return secret;
            }
            const serverSecret = await this.getServerSecret(secretId);
            return serverSecret;
        }
        finally {
        }
    }
    async getServerSecret(secretId) {
        try {
            if (!navigator.onLine) {
                throw "offline";
            }
            const secret = await accountDb.secretTable.get(secretId);
            const accessControlled = secret && (!secret.owned && secret.access_controlled);
            if (accessControlled) {
                return this.getAccessControlledSecret(secretId);
            }
            const resp = (await vapi.secret.get(secretId)).result;
            if (resp.operation.result.status.toLowerCase() != VaultApi.SUCCESS) {
                await this.p.removeLocalSecret(secretId);
                throw jserror(resp.operation.result.message);
            }
            const reqSecret = await this.p.addVApiSecretResponse(resp.operation.Details);
            return reqSecret;
        }
        finally {
        }
    }
    async getTrashedSecret(secretId) {
        try {
            if (!navigator.onLine) {
                throw "offline";
            }
            const resp = (await vapi.secret.get(secretId)).result;
            if (resp.operation.result.status.toLowerCase() != VaultApi.SUCCESS) {
                throw jserror(resp.operation.result.message);
            }
            const secret = this.lastGotTrashedSecret = await this.p.parseVApiSecretResponse(resp.operation.Details);
            return secret;
        }
        finally {
        }
    }
    async getDbSecret(secretId) {
        try {
            const secret = await accountDb.secretTable.get(secretId);
            if (!secret) {
                throw "cannot get db secret";
            }
            return secret;
        }
        finally {
        }
    }
    async getDbOrTrashedSecret(secretId) {
        try {
            const secret = await accountDb.secretTable.get(secretId);
            if (secret) {
                return secret;
            }
            if (this.lastGotTrashedSecret && this.lastGotTrashedSecret.id == secretId) {
                return this.lastGotTrashedSecret;
            }
            return this.getTrashedSecret(secretId);
        }
        finally {
        }
    }
    async getSecretFromWeb(secretId) {
        try {
            const secret = await this.refreshSecret(secretId);
            const needVaultSync = secret.shared && !(await bg.zcrypt.checkHasOrgKey());
            if (!needVaultSync) {
                return;
            }
            bg.vaultSync.sync(false);
        }
        catch (e) {
            logError(e);
        }
    }
    async getAccessControlledSecret(secret_id) {
        try {
            const resp = await VaultApi.postChecked("/api/json/secrets?OPERATION_NAME=GET_SECRET_DETAILS&SECRET_AUTO_ID=" + secret_id);
            const resp_secret = JSON.parse(resp.operation.details.SECRETS);
            const secret = await this.p.addVApiSecretResponse(resp_secret);
            return secret;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async refreshSecret(secretId) {
        try {
            const resp = (await vapi.secret.get(secretId)).result;
            if (resp.operation.result.status.toLowerCase() != VaultApi.SUCCESS) {
                await this.p.removeLocalSecret(secretId);
                throw resp.operation.result.message;
            }
            const secret = await this.p.addVApiSecretResponse(resp.operation.Details);
            return secret;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
}
