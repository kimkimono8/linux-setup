import { SecretQuery } from "../../../service/bgApi/types/SecretQuery.js";
import { AssessmentObj, AssessmentResultObj } from "./types.js";
export class AssessmentObjCreator {
    async createAssessmentObj(secret) {
        try {
            const obj = new AssessmentObj();
            obj.secret = secret;
            obj.secretTypeMap = await bg.vaultSecretTypes.getMap();
            await this.initTextPasswordFields(obj);
            await this.initSecretIdPasswords(obj);
            await this.initHistoryMap(obj);
            obj.passwordFields.forEach(() => obj.assessments.push(new AssessmentResultObj()));
            return obj;
        }
        catch (e) {
            throw e;
        }
    }
    async initHistoryMap(assessmentObj) {
        try {
            for (let field of assessmentObj.passwordFields) {
                assessmentObj.historyMap.set(field.name, await this.getHistoryValueSet(assessmentObj, field.name));
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async getHistoryValueSet(assessmentObj, fieldName) {
        try {
            const set = new Set();
            const historyObj = assessmentObj.secret.oldValues;
            if (!historyObj[fieldName]) {
                return set;
            }
            let plaintext = "";
            for (let history of historyObj[fieldName].values) {
                plaintext = await bg.zcrypt.decrypt(history.oldValue, assessmentObj.secret.shared);
                set.add(plaintext);
            }
            return set;
        }
        catch (e) {
            logError(e);
            return new Set();
        }
    }
    async initSecretIdPasswords(assessmentObj) {
        try {
            const query = SecretQuery.newBuilder().rowsPerPage(-1).noLogo(true).includeSecretData(true).owned(true).build();
            const secrets = (await bg.vaultSecrets.secretQuerier.query(query)).secrets;
            for (let secret of secrets) {
                await this.addToPasswordIdsMap(assessmentObj, secret);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async addToPasswordIdsMap(assessmentObj, secret) {
        try {
            if (!secret.encrypted?.fields) {
                return;
            }
            const secretType = assessmentObj.secretTypeMap[secret.type_id];
            let plaintext = "";
            for (let field of secretType.password_fields) {
                if (!secret.encrypted.fields[field.name]) {
                    continue;
                }
                plaintext = await bg.zcrypt.decrypt(secret.encrypted.fields[field.name], secret.shared);
                if (!assessmentObj.passwordIdsMap.has(plaintext)) {
                    assessmentObj.passwordIdsMap.set(plaintext, new Set());
                }
                assessmentObj.passwordIdsMap.get(plaintext).add(secret.id);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async initTextPasswordFields(assessmentObj) {
        try {
            const secret = assessmentObj.secret;
            const secretType = assessmentObj.secretTypeMap[secret.type_id];
            if (!secret?.encrypted?.fields) {
                throw "NO_ENCRYPTED_FIELDS";
            }
            await this.fillTextValues(assessmentObj, secretType);
            await this.fillPasswordValues(assessmentObj, secretType);
        }
        catch (e) {
            logError(e);
        }
    }
    async fillTextValues(assessmentObj, secretType) {
        try {
            const secret = assessmentObj.secret;
            let plaintext = "";
            for (let field of secretType.text_fields) {
                if (!secret.encrypted.fields[field.name]) {
                    continue;
                }
                plaintext = await bg.zcrypt.decrypt(secret.encrypted.fields[field.name], secret.shared);
                assessmentObj.texts.push(plaintext);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async fillPasswordValues(assessmentObj, secretType) {
        try {
            const secret = assessmentObj.secret;
            let plaintext = "";
            for (let field of secretType.password_fields) {
                if (!secret.encrypted.fields[field.name]) {
                    continue;
                }
                plaintext = await bg.zcrypt.decrypt(secret.encrypted.fields[field.name], secret.shared);
                assessmentObj.passwords.push(plaintext);
                assessmentObj.passwordFields.push(field);
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
