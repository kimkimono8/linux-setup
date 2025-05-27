import { bg } from "../../../src/bg/bg.js";
import { accountDb, generator } from "../../../src/bg/Context.js";
import { VaultCrypto } from "../../../src/bg/crypto/VaultCrypto.js";
import { ThirdPartyShareOutput } from "../../../src/service/bgApi/types.js";
import { GeneratorInput } from "../../../src/service/bgApi/types/Generator.js";
import { VaultApi } from "../../server_api/VaultApi.js";
export class ThirdPartyShareBg {
    static async sharePassword(input) {
        return new ThirdPartyShare().share(input);
    }
}
class ThirdPartyShare {
    input = null;
    secret = null;
    key = "";
    async share(input) {
        try {
            this.input = input;
            const secret = this.secret = await bg.vaultSecrets.secretGetter.getSecret(this.input.secretId);
            const salt = this.getSalt();
            const iterations = 1000;
            const passphrase = await this.getPrintablePassphrase();
            this.key = await VaultCrypto.pbkdf2(passphrase, salt, iterations);
            const reqSecret = {
                secretname: secret.name,
                secreturl: secret.urls[0],
                description: secret.description,
                notes: await this.getNotes(),
                secretData: await this.getRequestSecretData(),
                customData: await this.getCustomData(),
                secretmultipleurl: secret.urls,
            };
            const endpoint = `/api/rest/json/v1/sharing/secret/outsider/${input.secretId}`;
            await VaultApi.postChecked(endpoint, {
                email: input.thirdPartyEmail,
                max_allowed_time: input.allowedTime,
                message: input.message,
                salt,
                iteration: iterations,
                keyAuth: await VaultCrypto.aesEncrypt(JSON.stringify(reqSecret), this.key),
                file: JSON.stringify(await this.getFiles())
            });
            const output = new ThirdPartyShareOutput();
            output.passphrase = passphrase;
            generator.history.add(passphrase);
            return fnOut.result(output);
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    getSalt() {
        const saltBuffer = js.crypto.getSalt(16);
        const hexSalt = js.encoding.bytesToHex(saltBuffer);
        return hexSalt;
    }
    async getPrintablePassphrase() {
        const PASSPHRASE_LENGTH = 12;
        const input = new GeneratorInput();
        input.length = PASSPHRASE_LENGTH;
        input.reqSplChar = false;
        const password = await generator.password.generate(input);
        return password;
    }
    async getNotes() {
        if (!this.secret.encrypted.notes) {
            return "";
        }
        const notes = await bg.zcrypt.decrypt(this.secret.encrypted.notes, this.secret.shared);
        return await VaultCrypto.aesEncrypt(notes, this.key);
    }
    async getRequestSecretData() {
        return VaultCrypto.encodeBase64(JSON.stringify({ secretDatacol: await this.getSecretDataFields() }));
    }
    async getSecretDataFields() {
        const reqFields = [];
        const secretType = await accountDb.secretTypeTable.load(this.secret.type_id);
        let reqField = null;
        for (let field of secretType.fields) {
            reqField = await this.getSecretDataField(field);
            if (!reqField) {
                continue;
            }
            reqFields.push(reqField);
        }
        return reqFields;
    }
    async getSecretDataField(field) {
        if (field.isDeleted) {
            return null;
        }
        const fieldValue = this.secret.encrypted.fields[field.name];
        if (!fieldValue) {
            return null;
        }
        const plainText = await bg.zcrypt.decrypt(fieldValue, this.secret.shared);
        if (!plainText) {
            return null;
        }
        const reqField = {
            value: await VaultCrypto.aesEncrypt(plainText, this.key),
            colname: field.label,
            type: field.type
        };
        return reqField;
    }
    async getCustomData() {
        return VaultCrypto.encodeBase64(JSON.stringify({ customcol: await this.getCustomFields() }));
    }
    async getCustomFields() {
        const reqCustomFields = [];
        for (let column of this.secret.encrypted.custom_columns) {
            reqCustomFields.push(await this.getCustomCol(column));
        }
        return reqCustomFields;
    }
    async getCustomCol(column) {
        const fieldValue = await bg.zcrypt.decrypt(column.value, this.secret.shared);
        const reqColumn = {
            id: column.id,
            value: await VaultCrypto.aesEncrypt(fieldValue, this.key),
            colname: column.colname,
            type: column.type,
        };
        return reqColumn;
    }
    async getFiles() {
        const reqFiles = [];
        const hasFiles = this.secret.encrypted.files.length > 0;
        if (!hasFiles) {
            return reqFiles;
        }
        const files = await bg.vaultSecrets.secretFiles.downloadAllFiles(this.input.secretId);
        for (let file of files) {
            reqFiles.push(await this.getApiFile(file));
        }
        return reqFiles;
    }
    async getApiFile(file) {
        const fileField = {
            name: file.name,
            column: file.column,
            size: file.size,
            data: await bg.zcrypt.fileEncryptV1(await bg.zcrypt.fileDecrypt(file.data, file.shared), this.key),
        };
        return fileField;
    }
}
