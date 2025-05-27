import { accountDb, generator } from "../../src/bg/Context.js";
import { GeneratorInput, Policy } from "../../src/service/bgApi/types/Generator.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { VaultApi } from "../server_api/VaultApi.js";
export class VaultPolicies {
    async sync() {
        try {
            const resp = await VaultApi.getChecked("/api/json/secrets?OPERATION_NAME=GET_PASSWORD_POLICIES");
            const policy_usage = resp.operation.details.POLICY_USAGE;
            await zlocalStorage.save(LocalStorageKeys.POLICY_USAGE, policy_usage);
            const policies = [];
            let policy;
            let default_policy_id = "0";
            for (let resp_policy of resp.operation.details.POLICIES) {
                policy = new Policy();
                policy.id = resp_policy.PASSWDRULE_AUTO_ID;
                policy.name = resp_policy.PASSWDRULENAME;
                policy.min_length = resp_policy.MINLENGTH;
                policy.max_length = resp_policy.MAXLENGTH;
                policy.req_lowercase = true;
                policy.req_uppercase = resp_policy.REQMIXEDCASE;
                policy.req_number = resp_policy.REQNUMERALS;
                policy.req_splchar = resp_policy.REQSPCLCHAR;
                policy.no_of_splchar = resp_policy.NUMOFSPCLCHAR;
                policy.start_with_letter = resp_policy.BEGINWITHLETTER;
                policy.is_default = Boolean(resp_policy.ISDEFAULT);
                if (policy.is_default) {
                    default_policy_id = policy.id;
                }
                policy.age = resp_policy.PASSWORDAGE ?? 0;
                policy.exclude_chars = resp_policy.NOTREQCHARS || "";
                policies.push(policy);
            }
            policies.push(Policy.getCustomPolicy());
            await accountDb.policyTable.saveAll(policies);
            await zlocalStorage.save(LocalStorageKeys.DEFAULT_POLICY_ID, default_policy_id);
        }
        catch (e) {
            logError(e);
        }
    }
    async getDefaultPolicy() {
        try {
            const defaultPolicyId = await zlocalStorage.load(LocalStorageKeys.DEFAULT_POLICY_ID, "");
            const defaultPolicy = await accountDb.policyTable.load(defaultPolicyId);
            return defaultPolicy;
        }
        catch (e) {
            logError(e);
            return new Policy();
        }
    }
    async getPolicyOrDefault(policyId) {
        try {
            if (!policyId) {
                return this.getDefaultPolicy();
            }
            const policy = await accountDb.policyTable.load(policyId);
            return policy || this.getDefaultPolicy();
        }
        catch (e) {
            logError(e);
            return new Policy();
        }
    }
    async generatePassword(policyId) {
        try {
            const policy = await this.getPolicyOrDefault(policyId);
            const generatorInput = {
                length: policy.max_length,
                startWithLetter: policy.start_with_letter,
                excludeChars: policy.exclude_chars,
                noOfSplChar: policy.no_of_splchar,
                reqSplChar: policy.req_splchar,
                reqLowercase: policy.req_lowercase,
                reqUppercase: policy.req_uppercase,
                reqNumber: policy.req_number
            };
            const password = await generator.password.generate(generatorInput);
            return password;
        }
        catch (e) {
            logError(e);
            const defaultInput = GeneratorInput.createDefaultInput();
            return generator.password.generate(defaultInput);
        }
    }
    async checkPolicyFor(password) {
        try {
            const defaultPolicyId = await zlocalStorage.load(LocalStorageKeys.DEFAULT_POLICY_ID, "");
            return this.checkPasswordPolicy(password, defaultPolicyId);
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async checkPasswordPolicy(password, policyId) {
        try {
            const policyUsage = await zlocalStorage.load(LocalStorageKeys.POLICY_USAGE, Policy.USAGE.DEFAULT);
            if (policyUsage == Policy.USAGE.DEFAULT) {
                return "";
            }
            const policy = await accountDb.policyTable.load(policyId);
            if (!policy) {
                return "";
            }
            const errorMsg = this.validatePasswordLength(password, policy) ||
                this.validatePasswordRequirements(password, policy) ||
                this.validatePasswordExcludeChars(password, policy);
            return errorMsg;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    validatePasswordExcludeChars(password, policy) {
        try {
            const excluded_chars_present = new Set();
            for (let ch of policy.exclude_chars) {
                if (!password.includes(ch)) {
                    continue;
                }
                excluded_chars_present.add(ch);
            }
            if (excluded_chars_present.size > 0) {
                const excludeCharString = Array.from(excluded_chars_present.values()).join(", ");
                return `Characters ${excludeCharString} are not allowed in password.`;
            }
            return "";
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    validatePasswordRequirements(password, policy) {
        try {
            const letter_regex = /[a-zA-Z\P{ASCII}]/u;
            if (policy.start_with_letter && !letter_regex.test(password[0])) {
                return "Password must begin with alphabet.";
            }
            const lowercase_regex = /[a-z\P{ASCII}]/u;
            const uppercase_rgex = /[A-Z\P{ASCII}]/u;
            const number_regex = /[0-9]/;
            const alphanum_regex = /[a-zA-Z0-9\P{ASCII}]/gu;
            if (!policy.req_uppercase) {
            }
            else if (!uppercase_rgex.test(password)) {
                return "Password must contain at least one Uppercase letter.";
            }
            else if (!lowercase_regex.test(password)) {
                return "Password must contain at least one lowercase letter.";
            }
            if (policy.req_number && !number_regex.test(password)) {
                return "Password must contain at least one number.";
            }
            if (policy.req_splchar) {
                const special_char_count = password.replace(alphanum_regex, "").length;
                if (policy.req_splchar && special_char_count < policy.no_of_splchar) {
                    const minCount = (policy.no_of_splchar || 1);
                    return `Password must contain at least ${minCount} special characters.`;
                }
            }
            return "";
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    validatePasswordLength(password, policy) {
        try {
            if (!password.length) {
                return "Please enter your password";
            }
            if (password.length < policy.min_length) {
                return `Password must have minimum ${policy.min_length} characters.`;
            }
            return "";
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
