export class AttributeChecker {
    params;
    static check(params) {
        return new AttributeChecker(params).check();
    }
    testValue;
    testAttribute;
    constructor(params) {
        this.params = params;
        this.initAttributePredicate();
    }
    initAttributePredicate() {
        const checkPredicate = this.testValue = this.getCheckPredicate();
        if (this.params.checkOnlyValue) {
            this.testAttribute = testAttributeValue.bind(null, checkPredicate);
            return;
        }
        this.testAttribute = testAttribute.bind(null, checkPredicate);
    }
    check() {
        try {
            const ignoreAttribute = new Set(this.params.ignoreAttribute || []);
            const elem = this.params.elem;
            for (let i = 0; i < elem.attributes.length; i++) {
                if (ignoreAttribute.has(elem.attributes[i].name)) {
                    continue;
                }
                if (this.testAttribute(elem.attributes[i])) {
                    return true;
                }
            }
            return this.checkLabels();
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    getCheckPredicate() {
        const keyPredicate = this.getTestPredicate(this.params.key);
        if (!this.params.invalidKey) {
            return keyPredicate;
        }
        const invalidKeyPredicate = this.getTestPredicate(this.params.invalidKey);
        return x => keyPredicate(x) && !invalidKeyPredicate(x);
    }
    getTestPredicate(value) {
        if (typeof value == "string") {
            return testString.bind(null, value.toLocaleLowerCase());
        }
        if (value instanceof RegExp) {
            return testRegex.bind(null, value);
        }
        throw "NEW_STATE";
    }
    checkLabels() {
        try {
            const elem = this.params.elem;
            if (!elem.labels || !elem.labels.length) {
                return false;
            }
            for (let label of Array.from(elem.labels)) {
                if (this.testValue(label.textContent)) {
                    return true;
                }
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
function testAttribute(testPredicate, attribute) {
    return testPredicate(attribute.name) || testPredicate(attribute.value);
}
function testAttributeValue(testPredicate, attribute) {
    return testPredicate(attribute.value);
}
function testString(key, value) {
    return value.toLocaleLowerCase().includes(key);
}
function testRegex(regex, value) {
    return regex.test(value.toLocaleLowerCase());
}
