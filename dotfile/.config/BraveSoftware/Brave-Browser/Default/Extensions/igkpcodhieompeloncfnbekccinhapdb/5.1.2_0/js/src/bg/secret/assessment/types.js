export class AssessmentResultObj {
    complexity = 0;
    containsUsername = false;
    dictionaryWord = false;
    old = false;
    recycled = false;
    reused = false;
    strength = 0;
}
export class AssessmentObj {
    secret;
    texts = [];
    passwords = [];
    passwordFields = [];
    assessments = [];
    passwordIdsMap = new Map();
    secretTypeMap;
    historyMap = new Map();
}
