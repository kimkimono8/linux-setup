import { zcrypt } from "../../../../../common/components/zcrypt.js";
import { ErrorCode } from "../../../../../components/jsUtil/service/constants/ErrorCode.js";
import { Policy } from "../../../../service/bgApi/types/Generator.js";
import { LocalStorageKeys } from "../../../../service/storage/constants/LocalStorageKeys.js";
import { GeneratorSubTab } from "./Generator.Type.js";
class LastUsedPassword {
    password = "";
    validUpto = 0;
}
export class GeneratorDatamImpl {
    PLUS_LAST_COPIED_VALID_MS = 2 * 60 * 1000;
    state = {
        curTab: GeneratorSubTab.PASSWORD,
        passwordTab: {
            lastUsedPassword: new LastUsedPassword(),
            options: {
                length: Policy.CUSTOM_POLICY_DEFAULT_LENGTH,
                policyId: Policy.CUSTOM_POLICY_ID,
                excludeChars: "",
                lowercase: true,
                uppercase: true,
                splChar: true,
                number: true
            }
        },
        passphraseTab: {
            lastUsedPassword: new LastUsedPassword(),
            options: {
                noOfWords: 4,
                reqCapital: false,
                reqNumber: false,
                separator: "-",
            }
        }
    };
    policyList;
    async init() {
        try {
            await Promise.all([
                this.initPolicyList(),
                this.loadStoredData(),
            ]);
        }
        catch (e) {
            logError(e);
        }
    }
    async saveCurTab(tab) {
        try {
            this.state.curTab = tab;
            await this.saveState();
        }
        catch (e) {
            logError(e);
        }
    }
    async saveLastUsedPassword(password) {
        try {
            const lastUsedObj = this.getLastUsedObj();
            lastUsedObj.password = await zcrypt.extEncrypt(password);
            lastUsedObj.validUpto = Date.now() + this.PLUS_LAST_COPIED_VALID_MS;
            await this.saveState();
        }
        catch (e) {
            logError(e);
        }
    }
    async saveGeneratePasswordOptions(options) {
        try {
            this.state.passwordTab.options = options;
            await this.saveState();
        }
        catch (e) {
            logError(e);
        }
    }
    async saveGeneratePassphraseOptions(options) {
        try {
            this.state.passphraseTab.options = options;
            await this.saveState();
        }
        catch (e) {
            logError(e);
        }
    }
    async newPasswordGenerated() {
        try {
            const lastUsedObj = this.getLastUsedObj();
            lastUsedObj.validUpto = 0;
            await this.saveState();
        }
        catch (e) {
            logError(e);
        }
    }
    getLastUsedObj() {
        try {
            switch (this.state.curTab) {
                case GeneratorSubTab.PASSWORD:
                    return this.state.passwordTab.lastUsedPassword;
                case GeneratorSubTab.PASSPHRASE:
                    return this.state.passphraseTab.lastUsedPassword;
                default:
                    throw ErrorCode.UNHANDLED_CASE;
            }
        }
        catch (e) {
            logError(e);
            return new LastUsedPassword();
        }
    }
    async saveState() {
        try {
            await zlocalStorage.save(LocalStorageKeys.GENERATOR_STATE, this.state);
        }
        catch (e) {
            logError(e);
        }
    }
    async initPolicyList() {
        try {
            this.policyList = await bgApi.policy.getAll();
        }
        catch (e) {
            logError(e);
        }
    }
    async loadStoredData() {
        try {
            const existing = await zlocalStorage.loadAll({
                [LocalStorageKeys.GENERATOR_STATE]: this.state,
            });
            this.state = existing[LocalStorageKeys.GENERATOR_STATE];
        }
        catch (e) {
            logError(e);
        }
    }
}
