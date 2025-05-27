export class GeneratorInput {
    static REQ_LOWERCASE = "reqLowercase";
    static REQ_UPPERCASE = "reqUppercase";
    static REQ_NUMBER = "reqNumber";
    static REQ_SPL_CHAR = "reqSplChar";
    length = 99;
    reqLowercase = true;
    reqUppercase = true;
    reqNumber = true;
    reqSplChar = true;
    noOfSplChar = 0;
    excludeChars = "";
    startWithLetter = false;
    static createDefaultInput() {
        const input = {
            length: 99,
            reqLowercase: true,
            reqUppercase: true,
            reqNumber: true,
            reqSplChar: true,
            noOfSplChar: 0,
            excludeChars: "",
            startWithLetter: false,
        };
        return input;
    }
}
export class Policy {
    static CUSTOM_POLICY_ID = "0";
    static CUSTOM_POLICY_DEFAULT_LENGTH = 30;
    static USAGE = {
        DEFAULT: "1",
        ALLOW_USERS: "2",
        ENFORCE: "3"
    };
    id = "";
    name = "";
    min_length = 0;
    max_length = 0;
    req_lowercase = false;
    req_uppercase = false;
    req_number = false;
    req_splchar = false;
    no_of_splchar = 0;
    exclude_chars = "";
    start_with_letter = false;
    is_default = false;
    age = 0;
    static getCustomPolicy() {
        return {
            id: "0",
            name: "Custom",
            min_length: 12,
            max_length: 99,
            req_lowercase: true,
            req_uppercase: true,
            req_number: true,
            req_splchar: true,
            no_of_splchar: 0,
            exclude_chars: "",
            start_with_letter: false,
            is_default: false,
            age: 0,
        };
    }
}
export class Generator_State {
    static PLUS_LAST_COPIED_VALID_MS = 2 * 60 * 1000;
    static DEFAULT_STATE = new Generator_State();
    generatorInput = new GeneratorInput();
    policy = Policy.getCustomPolicy();
    encryptedLastUsedPassword = "";
    lastUsedValidUpto = 0;
    generatedPassword = "";
    generatedOn = 0;
    lastUsedOn = 0;
}
