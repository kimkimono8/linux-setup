import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
import { STRING } from "../../../vutil/export.js";
import { accountDb, generator, vapi } from "../../Context.js";
import { AssessmentContainsUsernameChecker } from "./AssessmentContainsUsernameChecker.js";
import { AssessmentObjCreator } from "./AssessmentObjCreator.js";
import { EnglishDictionary } from "./EnglishDictionary.js";
export class PasswordAssessment {
    assessmentObjCreator = new AssessmentObjCreator();
    containsUsernameChecker = new AssessmentContainsUsernameChecker();
    englishDictionary = new EnglishDictionary();
    skipAssessment = false;
    async init() {
        try {
            this.skipAssessment = (await zlocalStorage.load(LocalStorageKeys.SKIP_PASSWORD_ASSESSMENT, STRING.FALSE)) == STRING.TRUE;
        }
        catch (e) {
            logError(e);
        }
    }
    async assessPassword(secret) {
        try {
            await this.init();
            if (this.skipAssessment) {
                return;
            }
            if (!secret.owned) {
                return;
            }
            const secretType = await accountDb.secretTypeTable.load(secret.type_id);
            if (secretType.excludeAssessment) {
                return;
            }
            const assessmentObj = await this.assessmentObjCreator.createAssessmentObj(secret);
            assessmentObj.secret = secret;
            await this.containsUsernameChecker.checkContainsUsername(assessmentObj);
            await this.updateComplexity(assessmentObj);
            await this.updateReused(assessmentObj);
            await this.updateOld(assessmentObj);
            await this.updateRecycled(assessmentObj);
            await this.updateStrength(assessmentObj);
            await this.updateDictionaryWord(assessmentObj);
            const avgStrength = js.math.averageList(assessmentObj.assessments.map(x => x.strength)) >> 0;
            await vapi.secret.saveAssessment({
                secretid: secret.id,
                score: avgStrength,
                columns: this.getAssessmentColumns(assessmentObj),
            });
        }
        catch (e) {
            logError(e);
        }
    }
    async updateDictionaryWord(assessmentObj) {
        try {
            for (let i = 0; i < assessmentObj.passwords.length; i++) {
                assessmentObj.assessments[i].dictionaryWord = await this.englishDictionary.isPresent(assessmentObj.passwords[i]);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async updateStrength(assessmentObj) {
        try {
            for (let i = 0; i < assessmentObj.passwords.length; i++) {
                assessmentObj.assessments[i].strength = this.getStrength(assessmentObj, i);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getStrength(assessmentObj, index) {
        try {
            const assessment = assessmentObj.assessments[index];
            const COMPLEXITY_PART = 65;
            const REUSED_PART = 7;
            const USERNAME_PART = 7;
            const OLD_PART = 7;
            const DICTIONARY_PART = 7;
            const RECYCLED_PART = 7;
            const getStrengthPart = (part, ignore) => ignore ? 0 : part;
            let strength = 0;
            strength += COMPLEXITY_PART * (assessment.complexity / 100);
            strength += getStrengthPart(REUSED_PART, assessment.reused);
            strength += getStrengthPart(OLD_PART, assessment.old);
            strength += getStrengthPart(USERNAME_PART, assessment.containsUsername);
            strength += getStrengthPart(DICTIONARY_PART, assessment.dictionaryWord);
            strength += getStrengthPart(RECYCLED_PART, assessment.recycled);
            return Math.max(strength, 10) >> 0;
        }
        catch (e) {
            logError(e);
            return 0;
        }
    }
    async updateRecycled(assessmentObj) {
        try {
            for (let i = 0; i < assessmentObj.passwords.length; i++) {
                if (assessmentObj.historyMap.get(assessmentObj.passwordFields[i].name)?.has(assessmentObj.passwords[i])) {
                    assessmentObj.assessments[i].recycled = true;
                }
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async updateOld(assessmentObj) {
        try {
            const policy = await bg.vaultPolicies.getPolicyOrDefault(assessmentObj.secret.policy_id);
            if (policy.age == 0) {
                return;
            }
            const validUpto = assessmentObj.secret.modifiedOn + (policy.age * 24 * 60 * 60 * 1000);
            const valid = Date.now() < validUpto;
            if (valid) {
                return;
            }
            assessmentObj.assessments.forEach(x => x.old = true);
        }
        catch (e) {
            logError(e);
        }
    }
    async updateReused(assessmentObj) {
        try {
            for (let i = 0; i < assessmentObj.passwords.length; i++) {
                if (assessmentObj.passwordIdsMap.get(assessmentObj.passwords[i])?.size > 1) {
                    assessmentObj.assessments[i].reused = true;
                }
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async updateComplexity(assessmentObj) {
        try {
            for (let i = 0; i < assessmentObj.passwords.length; i++) {
                assessmentObj.assessments[i].complexity = Math.max(10, generator.password.getComplexity(assessmentObj.passwords[i]));
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getAssessmentColumns(assessmentObj) {
        try {
            const a = [];
            for (let i = 0; i < assessmentObj.assessments.length; i++) {
                a.push(this.mapAssessmentResult(assessmentObj, i));
            }
            return a.filter(js.array.trueFilter);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    mapAssessmentResult(assessmentObj, index) {
        try {
            const resultObj = assessmentObj.assessments[index];
            const field = assessmentObj.passwordFields[index];
            const apiAssessment = {
                contains_username: resultObj.containsUsername,
                dictionary_word: resultObj.dictionaryWord,
                name: field.name,
                old: resultObj.old,
                recycled: resultObj.recycled,
                reused: resultObj.reused,
                strength: resultObj.strength,
                weak: (resultObj.strength < 100),
            };
            return apiAssessment;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
}
