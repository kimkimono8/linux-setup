export class NewPassPageCheckerProvider {
    static isPasswordChangePage() {
        return new NewPassPageChecker().isPasswordChangePage();
    }
}
class CheckRegex {
    static oldPassword = /old|cur(rent)?/i;
    static newPassword = /new/i;
    static confirmPassword = /confirm|check|repeat|again/i;
}
class NewPassPageChecker {
    visiblePasswords = null;
    visibleUsernames = null;
    isPasswordChangePage() {
        try {
            this.visiblePasswords = csutil.input.getPasswords({ visible: true, shadowRoot: false });
            this.visibleUsernames = csutil.input.getUsernames({ visible: true, shadowRoot: false });
            if (this.check3PassNoUsername()) {
                info(NewPassPageChecker.name, "password change page - 3 passwords no username");
                return true;
            }
            if (this.checkAttribute()) {
                info(NewPassPageChecker.name, "password change page - attribute");
                return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    check3PassNoUsername() {
        return (this.visiblePasswords.length == 3) && (this.visibleUsernames.length == 0);
    }
    checkAttribute() {
        if (this.checkSignUpAndLoginPage()) {
            return false;
        }
        if (this.check3Passwords()) {
            return true;
        }
        if (this.check2Passwords()) {
            return true;
        }
        return false;
    }
    check3Passwords() {
        try {
            if (this.visiblePasswords.length != 3) {
                return false;
            }
            if (this.checkOldPasswordAttribute(this.visiblePasswords[0])) {
                info(NewPassPageChecker.name, "3 password - old password");
                return true;
            }
            if (this.checkNewPasswordAttribute(this.visiblePasswords[1])) {
                info(NewPassPageChecker.name, "3 password - new password");
                return true;
            }
            if (this.checkConfirmPasswordAttribute(this.visiblePasswords[2])) {
                info(NewPassPageChecker.name, "3 password - confirm password");
                return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    check2Passwords() {
        try {
            if (this.visiblePasswords.length != 2) {
                return false;
            }
            if (this.checkOldPasswordAttribute(this.visiblePasswords[0])) {
                info(NewPassPageChecker.name, "2 passwords - 1 old password");
                return true;
            }
            if (this.checkNewPasswordAttribute(this.visiblePasswords[0])) {
                info(NewPassPageChecker.name, "2 passwords - 1 new password");
                return true;
            }
            if (this.checkNewPasswordAttribute(this.visiblePasswords[1])) {
                info(NewPassPageChecker.name, "2 passwords - 2 new password");
                return true;
            }
            if (this.checkConfirmPasswordAttribute(this.visiblePasswords[1])) {
                info(NewPassPageChecker.name, "2 passwords - 2 confirm password");
                return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    checkOldPasswordAttribute(password) {
        return this.checkAttributeRegex(this.getValidAttributes(password), [CheckRegex.oldPassword]);
    }
    checkNewPasswordAttribute(password) {
        return this.checkAttributeRegex(this.getValidAttributes(password), [CheckRegex.newPassword]);
    }
    checkConfirmPasswordAttribute(password) {
        return this.checkAttributeRegex(this.getValidAttributes(password), [CheckRegex.confirmPassword]);
    }
    checkAttributeRegex(attributes, regexList) {
        let curRegex;
        let curAttributes = attributes;
        for (let i = 0; i < regexList.length && curAttributes.length > 0; i++) {
            curRegex = regexList[i];
            curAttributes = curAttributes.filter(x => curRegex.test(x));
        }
        return curAttributes.length > 0;
    }
    getValidAttributes(elem) {
        try {
            const attributes = csutil.dom.getAttributeValues(elem);
            const passAttributes = attributes.filter(x => x.includes("password") ? x.length > 8 : x.includes("pass"));
            return passAttributes;
        }
        catch (e) {
            console.error(e, elem);
            return [];
        }
    }
    checkSignUpAndLoginPage() {
        try {
            if (this.visiblePasswords.length != 3) {
                return false;
            }
            const parent = csutil.dom.getAncestor(this.visiblePasswords[1], this.visiblePasswords[2]);
            return !parent.contains(this.visiblePasswords[0]);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
