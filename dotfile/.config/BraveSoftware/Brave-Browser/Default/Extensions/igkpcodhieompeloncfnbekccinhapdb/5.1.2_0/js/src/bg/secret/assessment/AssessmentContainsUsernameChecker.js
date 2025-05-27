export class AssessmentContainsUsernameChecker {
    usernamePartRegex = /[^@]*/;
    async checkContainsUsername(assessmentObj) {
        try {
            for (let i = 0; i < assessmentObj.texts.length; i++) {
                this.checkContainsUsernameFn(assessmentObj, i);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    checkContainsUsernameFn(assessmentObj, index) {
        try {
            const usernameRegex = this.getUsernameRegex(this.getUsernameLowercase(assessmentObj.texts[index]));
            for (let i = 0; i < assessmentObj.passwords.length; i++) {
                if (!usernameRegex.test(assessmentObj.passwords[i])) {
                    continue;
                }
                assessmentObj.assessments[index].containsUsername = true;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getUsernameRegex(name) {
        try {
            const prefixLength = 3;
            const subNames = name.split(/[\W]/);
            const startOfNames = subNames.filter(x => x.length >= prefixLength).map(x => x.slice(0, prefixLength));
            return new RegExp(startOfNames.join("|"), "gi");
        }
        catch (e) {
            throw e;
        }
    }
    getUsernameLowercase(s) {
        try {
            return this.usernamePartRegex.exec(s)[0].toLowerCase();
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
