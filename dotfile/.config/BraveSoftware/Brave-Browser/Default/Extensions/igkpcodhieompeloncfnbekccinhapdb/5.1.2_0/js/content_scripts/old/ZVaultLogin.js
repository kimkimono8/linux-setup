import { ZVaultUtil } from "../../common/old/ZVaultUtil.js";
import { passwordViewPreventer } from "../../src/cs/cscomp/export.js";
import { userAction } from "../../src/cs/csfill/context.js";
export class ZVLoginSelector {
    getElement(encodedSelector) {
        try {
            const selector = atob(encodedSelector);
            if (selector.startsWith("{")) {
                return csutil.uniqSelector.select(JSON.parse(selector));
            }
            const [elemSelector, indexString = "0"] = this.getTokens(selector);
            const index = parseInt(indexString);
            return document.querySelectorAll(elemSelector)[index];
        }
        catch (e) {
            logError(e);
            return document.querySelector(atob(encodedSelector));
        }
    }
    getElements(encodedSelector) {
        try {
            const selector = atob(encodedSelector);
            const [elemSelector, ...indexesString] = this.getTokens(selector);
            const indexes = indexesString.map(x => parseInt(x));
            const allElements = document.querySelectorAll(elemSelector);
            if (allElements.length == 0) {
                return null;
            }
            const reqElements = indexes.map(x => allElements[x]);
            return reqElements;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getTokens(selector) {
        const separator = selector.includes(":") ? ":" : ",";
        return selector.split(separator);
    }
}
const loginContext = {
    selector: new ZVLoginSelector()
};
const ZVaultLogin = {
    one_click_login: false,
    has_view_permission: false,
    in_login: false,
    fillPref: {
        activeElement: null
    },
    vaultIconClick: {},
    callbackTimer: null,
    getSecretTypeUniqueFields: function (fields) {
        var count = { "text": 0, "password": 0 };
        for (let indx in fields) {
            if (!fields[indx].isDeleted) {
                if (fields[indx].type === "text") {
                    count.text += 1;
                }
                else if (fields[indx].type === "password") {
                    count.password += 1;
                }
            }
        }
        return count;
    },
    isVisibleElement: function (element) {
        var offSetCheck = (element.offsetWidth > 0 || element.offsetHeight > 0) ? true : false;
        var isVisible = !($(element).is(':hidden')) && element.style.display !== "none";
        var rect = element.getBoundingClientRect();
        return (offSetCheck || isVisible) && (($(element).css("visibility")).toLowerCase() !== "hidden") && (rect.top >= 0 && rect.left >= 0);
    },
    isUserNameField: function (type) {
        if (type === "email" || type === "text") {
            return true;
        }
        return false;
    },
    isTelField: function (type) {
        if (type === "tel" || type === "number") {
            return true;
        }
        return false;
    },
    fillSecretOnFormsInPage_new: function (secretdata, secTypeFields, actionTrigger, allForms) {
        var secTypeFieldCount = ZVaultLogin.getSecretTypeUniqueFields(secTypeFields);
        var forms = Array.prototype.slice.call(document.forms);
        var shadowFroms = ZVaultLogin.getShadowRootForms();
        if (shadowFroms.length > 0) {
            forms = forms.concat(shadowFroms);
        }
        var loginForms = [];
        var secondPriorityForms = [];
        var thirdPriorityForms = [];
        var secretForm = false;
        for (var i = 0; i < forms.length; i++) {
            if (!ZVaultLogin.isVisibleElement(forms[i])) {
                continue;
            }
            var fields = forms[i].elements;
            var text = 0;
            var secret = 0;
            for (var j = 0; j < fields.length; j++) {
                if (ZVaultLogin.isVisibleElement(fields[j]) && (ZVaultLogin.isUserNameField(fields[j].type) || ZVaultLogin.isTelField(fields[j].type))) {
                    if (fields[j].value != undefined && fields[j].value.toLowerCase() === "password") {
                        secret++;
                        continue;
                    }
                    text++;
                }
                else if (ZVaultLogin.isVisibleElement(fields[j]) && fields[j].type === "password") {
                    secret++;
                }
            }
            if ((text <= secTypeFieldCount.text && text >= 1) && secret === 1) {
                secretForm = true;
                loginForms.push(forms[i]);
            }
            else if ((secTypeFieldCount.text === text) && (secTypeFieldCount.password === secret) && (secTypeFieldCount.password <= 2) && (secTypeFieldCount.password > 0) && (text === 0)) {
                secondPriorityForms.push(forms[i]);
            }
            else if (text === 0 && secret === 1) {
                thirdPriorityForms.push(forms[i]);
            }
        }
        if (loginForms.length === 1) {
            ZVaultLogin.autoFillInForm(loginForms[0], secretdata, secTypeFields, actionTrigger);
            return false;
        }
        else if (loginForms.length > 1) {
            for (var i = 0; i < loginForms.length; i++) {
                ZVaultLogin.autoFillInForm(loginForms[i], secretdata, secTypeFields, actionTrigger);
            }
            return false;
        }
        if (ZVaultUtil.isValid(allForms) && allForms === true) {
            if (secretForm === false) {
                if (secondPriorityForms.length > 0) {
                    for (var k = 0; k < secondPriorityForms.length; k++) {
                        var fields = secondPriorityForms[k].elements;
                        var fieldlength = fields.length;
                        for (var i = 0; i < fieldlength; i++) {
                            if (fields[i].type === "password" && ZVaultLogin.isVisibleElement(fields[i])) {
                                passFieldIndx = i;
                                var elemIdx = i;
                                for (let idx in secTypeFields) {
                                    var secFeilds = secTypeFields[idx];
                                    if (!secFeilds.isDeleted && secFeilds.type === "password") {
                                        ZVaultLogin.setValueOnSecretField(fields[elemIdx], secretdata[secFeilds.name]);
                                    }
                                    elemIdx++;
                                }
                                var actionbtn = null;
                                var loginregex = /^(log in|sign in|login|logon|signin|login!|connect)$/i;
                                for (var ii = passFieldIndx; ii < fieldlength; ii++) {
                                    var element = fields[ii];
                                    if (element.type === "submit" && ZVaultLogin.isVisibleElement(element) && (loginregex.test(element.value) || loginregex.test(element.innerText.trim()))) {
                                        actionbtn = element;
                                        break;
                                    }
                                }
                                if (actionTrigger === true && actionbtn != null) {
                                    actionbtn.click();
                                }
                                secretForm = true;
                                break;
                            }
                        }
                    }
                }
                else if (thirdPriorityForms.length > 0) {
                    for (var k = 0; k < thirdPriorityForms.length; k++) {
                        var fields = thirdPriorityForms[k].elements;
                        var fieldlength = fields.length;
                        for (var i = 0; i < fieldlength; i++) {
                            if (fields[i].type === "password" && ZVaultLogin.isVisibleElement(fields[i])) {
                                passFieldIndx = i;
                                for (let idx in secTypeFields) {
                                    var secFeilds = secTypeFields[idx];
                                    if (!secFeilds.isDeleted && secFeilds.type === "password") {
                                        ZVaultLogin.setValueOnSecretField(fields[i], secretdata[secFeilds.name]);
                                        break;
                                    }
                                }
                                var actionbtn = null;
                                var loginregex = /^(log in|sign in|login|logon|signin|login!|connect)$/i;
                                for (var ii = passFieldIndx; ii < fieldlength; ii++) {
                                    var element = fields[ii];
                                    if (element.type === "submit" && ZVaultLogin.isVisibleElement(element) && (loginregex.test(element.value) || loginregex.test(element.innerText.trim()))) {
                                        actionbtn = element;
                                        break;
                                    }
                                }
                                if (actionTrigger === true && actionbtn != null) {
                                    actionbtn.click();
                                }
                                secretForm = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (secretForm === false) {
                var secTypeIndx;
                var passSecIndx;
                var docTextField = 0;
                var passFieldIndx = 0;
                var fields = document.getElementsByTagName("input");
                var isPasswordFieldPres = false;
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i].type === "password" && ZVaultLogin.isVisibleElement(fields[i])) {
                        isPasswordFieldPres = true;
                        var j = i;
                        j--;
                        passFieldIndx = i;
                        for (let indx in secTypeFields) {
                            secTypeIndx = indx;
                            if (!secTypeFields[secTypeIndx].isDeleted && secTypeFields[secTypeIndx].type === "password") {
                                passSecIndx = secTypeIndx;
                                break;
                            }
                        }
                        while (j >= 0 && secTypeFieldCount.text > docTextField) {
                            if (ZVaultLogin.isVisibleElement(fields[j]) && (ZVaultLogin.isUserNameField(fields[j].type) || ZVaultLogin.isTelField(fields[j].type))) {
                                docTextField += 1;
                                var validFields;
                                do {
                                    secTypeIndx--;
                                    validFields = secTypeFields[secTypeIndx];
                                    if (validFields === undefined) {
                                        break;
                                    }
                                } while (secTypeIndx > 0 && validFields.isDeleted);
                                if (validFields !== undefined) {
                                    ZVaultLogin.setValueOnSecretField(fields[j], secretdata[validFields.name]);
                                }
                            }
                            j--;
                        }
                        if (docTextField > 0) {
                            ZVaultLogin.setValueOnSecretField(fields[i], secretdata[secTypeFields[passSecIndx].name]);
                            secretForm = true;
                            break;
                        }
                    }
                }
                var submitBtn = false;
                var passwordEle = null;
                if (secretForm && ZVaultUtil.isValid(passSecIndx)) {
                    var fields = document.getElementsByTagName("input");
                    passwordEle = fields[passFieldIndx];
                    var actionbtn = null;
                    var loginregex = /^(log in|sign in|login|logon|signin|login!|connect)$/i;
                    for (var i = passFieldIndx + 1; i <= passFieldIndx + 3; i++) {
                        var element = fields[i];
                        if (element !== undefined && (element.type === "submit" || element.type === "button") && ZVaultLogin.isVisibleElement(element) && (loginregex.test(element.value) || loginregex.test(element.innerText.trim()))) {
                            actionbtn = element;
                            break;
                        }
                    }
                    if (actionTrigger === true && actionbtn != null) {
                        actionbtn.disabled = false;
                        submitBtn = true;
                        actionbtn.click();
                    }
                }
                if (secretForm && ZVaultUtil.isValid(passSecIndx) && !submitBtn && ZVaultUtil.isValid(passwordEle)) {
                    var fields = document.body.getElementsByTagName("*");
                    var actionbtn = null;
                    var loginregex = /^(log in|sign in|login|logon|signin|login!|connect)$/i;
                    for (var i = 0; i < fields.length; i++) {
                        var element = fields[i];
                        if (ZVaultLogin.isVisibleElement(element) && (loginregex.test(element.title) || loginregex.test(element.value) || loginregex.test(element.innerText.trim()))) {
                            var j = i;
                            j--;
                            for (j; j >= 0; j--) {
                                if (fields[j].type === "password" && ZVaultLogin.isVisibleElement(fields[j]) && passwordEle === fields[j]) {
                                    actionbtn = element;
                                    break;
                                }
                            }
                        }
                        if (actionbtn != null) {
                            var child = actionbtn.getElementsByTagName("*");
                            if (child.length > 0) {
                                for (var k = 0; k < child.length; k++) {
                                    if (ZVaultLogin.isVisibleElement(child[k]) && (loginregex.test(child[k].value) || loginregex.test(child[k].innerText.trim()))) {
                                        actionbtn = child[k];
                                    }
                                }
                            }
                            break;
                        }
                    }
                    if (actionTrigger === true && actionbtn != null) {
                        actionbtn.click();
                    }
                }
                if (isPasswordFieldPres === false) {
                    var secTypeIndx;
                    var passSecIndx;
                    var docTextField = 0;
                    for (var i = 0; i < fields.length; i++) {
                        if (fields[i].type === "password") {
                            var j = i;
                            j--;
                            for (let indx in secTypeFields) {
                                secTypeIndx = indx;
                                if (!secTypeFields[secTypeIndx].isDeleted && secTypeFields[secTypeIndx].type === "password") {
                                    passSecIndx = secTypeIndx;
                                    break;
                                }
                            }
                            var usernameFieldCount = 0;
                            while (j >= 0 && secTypeFieldCount.text > docTextField) {
                                if (ZVaultLogin.isUserNameField(fields[j].type)) {
                                    usernameFieldCount += 1;
                                }
                                if (ZVaultLogin.isVisibleElement(fields[j]) && ZVaultLogin.isUserNameField(fields[j].type)) {
                                    docTextField += 1;
                                    var validFields;
                                    do {
                                        secTypeIndx--;
                                        validFields = secTypeFields[secTypeIndx];
                                    } while (secTypeIndx > 0 && validFields.isDeleted);
                                    ZVaultLogin.setValueOnSecretField(fields[j], secretdata[validFields.name]);
                                }
                                if (usernameFieldCount > secTypeFieldCount.text) {
                                    break;
                                }
                                j--;
                            }
                            if (docTextField > 0) {
                                ZVaultLogin.setValueOnSecretField(fields[i], secretdata[secTypeFields[passSecIndx].name]);
                                secretForm = true;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return null;
    },
    fireEvent: function (element, event) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true);
        return !element.dispatchEvent(evt);
    },
    setValueOnSecretField: function (field, value) {
        if (field.value === field.defaultValue) {
            field.value = "";
        }
        try {
            if (ZVaultLogin.one_click_login && csutil.input.typeOf(field) == "password") {
                passwordViewPreventer.filledPassword(value);
            }
        }
        catch (e) {
            logError(e);
        }
        ZVaultLogin.fireEvent(field, "click");
        ZVaultLogin.fireEvent(field, "change");
        ZVaultLogin.fireEvent(field, "input");
        field.value = value;
        ZVaultLogin.fireEvent(field, "click");
        ZVaultLogin.fireEvent(field, "change");
        ZVaultLogin.fireEvent(field, "input");
        if (field.value != value) {
            field.value = value;
        }
    },
    autoFillInForm: function (formObj, secretdata, secTypefields, actionTrigger) {
        var secTypeIndx;
        var lform = formObj;
        var lf_fields = lform.elements;
        var passFieldIndx = 0;
        var isPasswordFieldPres = false;
        var matchLoginRegex = /log in|sign in|login|logon|signin|login!|connect/gi;
        var getMappedSecretDet = ZVaultLogin.checkFormFieldsMatchesSecretTypeFeilds(lf_fields, secTypefields);
        var secTypeFieldCount = ZVaultLogin.getSecretTypeUniqueFields(secTypefields);
        if (getMappedSecretDet.status) {
            var array = getMappedSecretDet.details;
            for (let idx in array) {
                var element = array[idx].element;
                var field = array[idx].field;
                ZVaultLogin.setValueOnSecretField(element, secretdata[field.name]);
            }
            passFieldIndx = getMappedSecretDet.passFieldIndx;
        }
        else if (($(formObj).find('input[type="text"]').length === 1 || $(formObj).find('input[type="email"]').length === 1) && $(formObj).find('input[type="password"]').length === 1 && secTypeFieldCount.text === 1 && secTypeFieldCount.password === 1) {
            for (let indx in secTypefields) {
                secTypeIndx = indx;
                if (!secTypefields[secTypeIndx].isDeleted && secTypefields[secTypeIndx].type === "password") {
                    ZVaultLogin.setValueOnSecretField($(formObj).find('input[type="password"]')[0], secretdata[secTypefields[secTypeIndx].name]);
                }
                else if (!secTypefields[secTypeIndx].isDeleted && secTypefields[secTypeIndx].type === "text") {
                    if ($(formObj).find('input[type="text"]').length === 1) {
                        ZVaultLogin.setValueOnSecretField($(formObj).find('input[type="text"]')[0], secretdata[secTypefields[secTypeIndx].name]);
                    }
                    if ($(formObj).find('input[type="email"]').length === 1) {
                        ZVaultLogin.setValueOnSecretField($(formObj).find('input[type="email"]')[0], secretdata[secTypefields[secTypeIndx].name]);
                    }
                }
            }
            elementLoop: for (var lf = 0; lf < lf_fields.length; lf++) {
                var lfElem = lf_fields[lf];
                if ((lfElem.type === "password" || (lfElem.value != undefined && lfElem.value.toLowerCase() === "password")) && ZVaultLogin.isVisibleElement(lfElem)) {
                    isPasswordFieldPres = true;
                    passFieldIndx = lf;
                    lf--;
                    break elementLoop;
                }
            }
        }
        else if ((secTypeFieldCount.password === $(formObj).find('input[type="password"]').length) && ((secTypeFieldCount.password <= 2) && (secTypeFieldCount.password > 0)) && (secTypeFieldCount.text === 0) && ($(formObj).find('input[type="text"], input[type="email"]').length === 0)) {
            var passFieldsInForm = $(formObj).find('input[type="password"]');
            var passFieldsIndex = 0;
            for (let indx in secTypefields) {
                secTypeIndx = indx;
                if ((!secTypefields[secTypeIndx].isDeleted && secTypefields[secTypeIndx].type === "password") && (passFieldsIndex < passFieldsInForm.length)) {
                    ZVaultLogin.setValueOnSecretField(passFieldsInForm[passFieldsIndex], secretdata[secTypefields[secTypeIndx].name]);
                }
                passFieldsIndex++;
            }
            elementLoop: for (var lf = 0; lf < lf_fields.length; lf++) {
                var lfElem = lf_fields[lf];
                if ((lfElem.type === "password" || (lfElem.value != undefined && lfElem.value.toLowerCase() === "password")) && ZVaultLogin.isVisibleElement(lfElem)) {
                    isPasswordFieldPres = true;
                    passFieldIndx = lf;
                    lf--;
                    break elementLoop;
                }
            }
        }
        else {
            elementLoop: for (var lf = 0; lf < lf_fields.length; lf++) {
                var lfElem = lf_fields[lf];
                if ((lfElem.type === "password" || (lfElem.value != undefined && lfElem.value.toLowerCase() === "password")) && ZVaultLogin.isVisibleElement(lfElem)) {
                    isPasswordFieldPres = true;
                    for (let indx in secTypefields) {
                        secTypeIndx = indx;
                        if (!secTypefields[secTypeIndx].isDeleted && secTypefields[secTypeIndx].type === "password") {
                            ZVaultLogin.setValueOnSecretField(lfElem, secretdata[secTypefields[secTypeIndx].name]);
                            secTypeIndx--;
                            passFieldIndx = lf;
                            lf--;
                            break elementLoop;
                        }
                    }
                    lf--;
                    break;
                }
            }
            if (isPasswordFieldPres === false) {
                var passFieldIndx = 0;
                elementLoop1: for (var lf = 0; lf < lf_fields.length; lf++) {
                    var lfElem = lf_fields[lf];
                    if ((lfElem.type === "password" || (lfElem.value != undefined && lfElem.value.toLowerCase() === "password"))) {
                        for (let indx in secTypefields) {
                            secTypeIndx = indx;
                            if (!secTypefields[secTypeIndx].isDeleted && secTypefields[secTypeIndx].type === "password") {
                                ZVaultLogin.setValueOnSecretField(lfElem, secretdata[secTypefields[secTypeIndx].name]);
                                secTypeIndx--;
                                passFieldIndx = lf;
                                lf--;
                                break elementLoop1;
                            }
                        }
                        lf--;
                        break;
                    }
                }
            }
            try {
                var traverseBelowPass = lf;
                traverseBelowPass += 2;
                var traverseSecTypeBelow = secTypeIndx;
                traverseSecTypeBelow += 2;
                while (traverseBelowPass < lf_fields.length) {
                    if (ZVaultLogin.isVisibleElement(lf_fields[traverseBelowPass]) && ZVaultLogin.isUserNameField(lf_fields[traverseBelowPass].type)) {
                        loopType1: while (traverseSecTypeBelow < secTypefields.length) {
                            if (secTypefields[traverseSecTypeBelow].type === "text" && !secTypefields[traverseSecTypeBelow].isDeleted) {
                                ZVaultLogin.setValueOnSecretField(lf_fields[traverseBelowPass], secretdata[secTypefields[traverseSecTypeBelow].name]);
                                traverseSecTypeBelow++;
                                break loopType1;
                            }
                            traverseSecTypeBelow++;
                        }
                    }
                    traverseBelowPass++;
                }
            }
            catch (er) { }
            while (lf >= 0) {
                if (ZVaultLogin.isVisibleElement(lf_fields[lf]) && ZVaultLogin.isUserNameField(lf_fields[lf].type)) {
                    loopType: while (secTypeIndx > -1) {
                        if (secTypefields[secTypeIndx].type === "text" && !secTypefields[secTypeIndx].isDeleted) {
                            ZVaultLogin.setValueOnSecretField(lf_fields[lf], secretdata[secTypefields[secTypeIndx].name]);
                            secTypeIndx--;
                            break loopType;
                        }
                        secTypeIndx--;
                    }
                }
                lf--;
            }
        }
        var submitBtn = false;
        var passwordEle = lf_fields[passFieldIndx];
        var actionbtn = null;
        var loginregex = /^(log in|sign in|login|signin|logon|login!|connect|continue)$/i;
        for (var i = passFieldIndx; i < lf_fields.length; i++) {
            var element = lf_fields[i];
            if (element.type === "submit" && ZVaultLogin.isVisibleElement(element)) {
                actionbtn = element;
                submitBtn = true;
                break;
            }
            else if (element.type === "submit") {
                if (ZVaultUtil.isValid(element.nextSibling)) {
                    if (ZVaultUtil.isValid(element.nextSibling.innerText) && loginregex.test(element.nextSibling.innerText.trim())) {
                        actionbtn = element;
                        submitBtn = true;
                    }
                }
                if (ZVaultUtil.isValid(element.previousSibling) && actionbtn === null) {
                    if (ZVaultUtil.isValid(element.previousSibling.innerText) && loginregex.test(element.previousSibling.innerText.trim())) {
                        actionbtn = element;
                        submitBtn = true;
                    }
                }
                if (actionbtn === null && ZVaultUtil.isValid(element.value) && (element.value.toLowerCase().match(matchLoginRegex) || element.innerText.trim().toLowerCase().match(matchLoginRegex))) {
                    actionbtn = element;
                    submitBtn = true;
                }
            }
        }
        if (actionTrigger === true && actionbtn != null) {
            if (document.readyState === "complete") {
                actionbtn.click();
            }
            else {
                var time = 0;
                if (ZVaultLogin.callbackTimer !== null) {
                    clearInterval(ZVaultLogin.callbackTimer);
                }
                ZVaultLogin.callbackTimer = window.setInterval(function () {
                    if (time > 3 || document.readyState === "complete") {
                        actionbtn.click();
                        clearInterval(ZVaultLogin.callbackTimer);
                    }
                    time = time + 1;
                }, 1000);
            }
        }
        if (!submitBtn && ZVaultUtil.isValid(passwordEle)) {
            var fields = document.body.getElementsByTagName("*");
            var actionbtn = null;
            var loginregex = /^(log in|sign in|login|signin|logon|login!|connect|continue)$/i;
            for (var i = 0; i < fields.length; i++) {
                var element = fields[i];
                if (ZVaultLogin.isVisibleElement(element) && ((element.value != undefined && loginregex.test(element.value)) || (element.innerText != undefined && loginregex.test(element.innerText.trim())))) {
                    var j = i;
                    j--;
                    for (j; j >= 0; j--) {
                        if (fields[j].type === "password" && ZVaultLogin.isVisibleElement(fields[j]) && passwordEle === fields[j]) {
                            actionbtn = element;
                            break;
                        }
                    }
                }
                if (actionbtn != null) {
                    var child = actionbtn.getElementsByTagName("*");
                    if (child.length > 0) {
                        for (var k = 0; k < child.length; k++) {
                            if (ZVaultLogin.isVisibleElement(child[k]) && (loginregex.test(child[k].value) || loginregex.test(child[k].innerText.trim()))) {
                                actionbtn = child[k];
                            }
                        }
                    }
                    break;
                }
            }
            if (actionTrigger === true && actionbtn != null) {
                actionbtn.click();
            }
        }
        return false;
    },
    checkFormFieldsMatchesSecretTypeFeilds: function (formFields, secTypefields) {
        var respObj = {};
        try {
            var text = 0;
            var password = 0;
            var formElements = [];
            var array = [];
            var passIndx = 0;
            for (var i = 0; i < formFields.length; i++) {
                var element = formFields[i];
                if (ZVaultLogin.isVisibleElement(element) && (element.type === "password" || (element.value != undefined && element.value.toLowerCase() === "password"))) {
                    element.click();
                }
            }
            for (var i = 0; i < formFields.length; i++) {
                var element = formFields[i];
                if (ZVaultLogin.isVisibleElement(element) && (element.type === "password" || (element.value != undefined && element.value.toLowerCase() === "password"))) {
                    password += 1;
                    passIndx = i;
                    formElements.push(element);
                }
                else if ((ZVaultLogin.isUserNameField(element.type) || ZVaultLogin.isTelField(element.type)) && ZVaultLogin.isVisibleElement(element)) {
                    text += 1;
                    formElements.push(element);
                }
            }
            var secTypeFieldCount = ZVaultLogin.getSecretTypeUniqueFields(secTypefields);
            var count = 0;
            if (text !== 0 && password !== 0 && secTypeFieldCount.text === text && secTypeFieldCount.password === password) {
                for (let idx in secTypefields) {
                    var secretFormFeildMap = {};
                    if (!secTypefields[idx].isDeleted) {
                        var formElement = formElements[count];
                        if (secTypefields[idx].type === "password") {
                            if (ZVaultLogin.isVisibleElement(formElement) && (formElement.type === "password" || (formElement.value != undefined && formElement.value.toLowerCase() === "password"))) {
                                secretFormFeildMap.field = secTypefields[idx];
                                secretFormFeildMap.element = formElement;
                                array.push(secretFormFeildMap);
                            }
                        }
                        else if (secTypefields[idx].type === "text") {
                            if ((ZVaultLogin.isUserNameField(formElement.type) || ZVaultLogin.isTelField(formElement.type))) {
                                secretFormFeildMap.field = secTypefields[idx];
                                secretFormFeildMap.element = formElement;
                                array.push(secretFormFeildMap);
                            }
                        }
                        count += 1;
                    }
                }
            }
            if (array.length > 0 && array.length === (secTypeFieldCount.text + secTypeFieldCount.password)) {
                respObj.status = true;
                respObj.details = array;
                respObj.passFieldIndx = passIndx;
            }
            else {
                respObj.status = false;
            }
        }
        catch (er) {
            respObj.status = false;
        }
        return respObj;
    },
    getShadowRootForms: () => {
        var all = document.getElementsByTagName("*");
        var formArray = [];
        for (var i = 0, max = all.length; i < max; i++) {
            if (all[i].shadowRoot != null) {
                var shadowForms = all[i].shadowRoot.querySelectorAll('form');
                if (shadowForms.length > 0) {
                    shadowForms = Array.prototype.slice.call(shadowForms);
                    formArray = formArray.concat(shadowForms);
                }
            }
        }
        return formArray;
    }
};
export const ZVaultCS = {
    vaultIconClick: {},
    contextMenuTag: null,
    frameLoaded: false,
    buttonClicked: false,
    msFrameTop: true,
    msFrameLeft: true,
    mutationCounter: 0,
    mutationLocked: false,
    mutationObserver: null,
    init: async function () {
        await ZVaultCS.waitForCompleteReadyState();
        chrome.runtime.onMessage.addListener(function (msg, sender) {
            ZVaultCS.processRequest(msg, sender);
            return false;
        });
        chrome.runtime.lastError;
        ZVaultCS.pageLoaded();
        document.addEventListener("contextmenu", function (e) {
            if ((e.target !== undefined) && (e.target.tagName !== undefined) && (e.target.tagName === "INPUT")) {
                ZVaultCS.contextMenuTag = e.target;
            }
        });
    },
    pageLoaded: function () {
        ZVaultUtil.sendMessage(null, "contentScriptLoaded", { "frameurl": window.location.href });
        ZVaultUtil.sendMessage(null, "checkPlayback", { "url": window.location.href });
    },
    triggerEvent: function (el, type) {
        if ('createEvent' in document) {
            var e = document.createEvent('HTMLEvents');
            e.initEvent(type, false, true);
            el.dispatchEvent(e);
        }
        else {
            var e = document.createEventObject();
            e.eventType = type;
            el.fireEvent('on' + e.eventType, e);
        }
    },
    fireEvent: function (element, event) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true);
        return !element.dispatchEvent(evt);
    },
    setValueOnSecretField: function (field, value) {
        if (field.value === field.defaultValue) {
            field.value = "";
        }
        try {
            if (ZVaultLogin.one_click_login && csutil.input.typeOf(field) == "password") {
                passwordViewPreventer.filledPassword(value);
            }
        }
        catch (e) {
            logError(e);
        }
        ZVaultCS.fireEvent(field, "click");
        ZVaultCS.fireEvent(field, "change");
        ZVaultCS.fireEvent(field, "input");
        field.value = value;
        ZVaultCS.fireEvent(field, "click");
        ZVaultCS.fireEvent(field, "change");
        ZVaultCS.fireEvent(field, "input");
        if (field.value != value) {
            field.value = value;
        }
    },
    continuePlayback: function (data) {
        setTimeout(function () {
            ZVaultUtil.sendMessage(null, "continuePlayback", data);
        }, 1000);
    },
    repeatPlayback: function (data) {
        setTimeout(function () {
            ZVaultUtil.sendMessage(null, "repeatPlayback", data);
        }, 1000);
    },
    executePlaybackAction: function (data, step_data, selector) {
        if (selector == null) {
            if (step_data.type == "skip_username" || step_data.type == "skip_password" || step_data.type == "skip_click") {
                data.step_no = data.step_no + 1;
                ZVaultUtil.sendMessage(null, "continuePlayback", data);
                return;
            }
            data.countdown = data.countdown + 1;
            if (data.countdown > 10) {
                ZVaultUtil.sendMessage(null, "playbackFailure", data);
                return;
            }
            ZVaultCS.repeatPlayback(data);
            return;
        }
        window.onbeforeunload = function () {
            ZVaultUtil.sendMessage(null, "reloading", data);
        };
        if (step_data.type == "click" || step_data.type == "skip_click") {
            data.step_no = data.step_no + 1;
            ZVaultCS.buttonClicked = true;
            ZVaultUtil.sendMessage(null, "continuePlayback", data);
            selector.click();
            return;
        }
        else if (step_data.type == "select") {
            selector.selected = 'selected';
        }
        else if (step_data.type == "username" || step_data.type == "password" || step_data.type == "skip_username" || step_data.type == "skip_password" || step_data.type == "username_direct" || step_data.type == "password_direct" || step_data.type == "skip_username_direct" || step_data.type == "skip_password_direct" || step_data.type.indexOf("column") != -1) {
            var type = "";
            if (step_data.type == "skip_username" || step_data.type == "username_direct" || step_data.type == "skip_username_direct") {
                type = "username";
            }
            else if (step_data.type == "skip_password" || step_data.type == "password_direct" || step_data.type == "skip_password_direct") {
                type = "password";
            }
            else {
                type = step_data.type;
            }
            var data_to_fill = data.secretdata[type];
            if (data_to_fill == undefined) {
                data_to_fill = ZVaultCS.getDataToFill(data, type);
            }
            try {
                if (step_data.type == "username" || step_data.type == "password" || step_data.type == "skip_username" || step_data.type == "skip_password") {
                    ZVaultCS.setValueOnSecretField(selector, data_to_fill);
                }
                else {
                    selector.value = data_to_fill;
                }
            }
            catch (e) {
                ZVaultUtil.sendMessage(null, "playbackFailure", data);
            }
        }
        else {
            try {
                ZVaultCS.triggerEvent(selector, step_data.type);
            }
            catch (e) {
                ZVaultUtil.sendMessage(null, "playbackFailure", data);
            }
        }
        data.step_no = data.step_no + 1;
        ZVaultUtil.sendMessage(null, "continuePlayback", data);
    },
    getDataToFill(data, type) {
        type = type == "username" ? "text" : "password";
        var counter = data.filledData[type];
        var match_found = 0;
        var fields = data.fields;
        for (let field of fields) {
            if (field.type == type && counter == match_found) {
                data.filledData[type] += 1;
                return data.secretdata[field.name];
            }
            else if (field.type == type) {
                match_found++;
            }
        }
    },
    login: (data) => {
        var state = document.readyState;
        if (state != "complete" && state != "interactive") {
            setTimeout(function () {
                ZVaultCS.login(data);
            }, 1000);
            return;
        }
        var fill = true;
        if (document.location.protocol === 'http:' && data.insecure_page_prompt == "true") {
            fill = confirm('You are about to fill your password in an insecure page. Zoho Vault strictly recommends you against doing so unless you trust this website. Proceed with filling your password anyway?');
        }
        if (fill) {
            const actionTrigger = (data.submit && ZVaultUtil.secretDomainMatches(data.urls, window.location.href));
            ZVaultLogin.fillSecretOnFormsInPage_new(data.secretdata, data.fields, actionTrigger, true);
        }
    },
    isUserNameField: function (type) {
        if (type === "email" || type === "text") {
            return true;
        }
        return false;
    },
    waitForNSec(n) {
        return new Promise(resolve => setTimeout(resolve, n * 1000));
    },
    waitForCompleteReadyState: function () {
        return new Promise(function (resolve) {
            let checkReadyState = function () {
                if (document.readyState != "complete") {
                    return;
                }
                resolve(true);
            };
            document.addEventListener("readystatechange", checkReadyState);
            checkReadyState();
        });
    },
    fillOneAuthTOTP: async function (data, selector) {
        const totp = await bgApi.secret.totp.getOneAuthTotp(data.oneauthId);
        ZVaultCS.setValueOnSecretField(selector, totp);
        data.step_no = data.step_no + 1;
        ZVaultUtil.sendMessage(null, "continuePlayback", data);
    },
    async processRequest(request, _sender) {
        var action = request.action;
        if (!action) {
            return;
        }
        var data = request.data;
        if (ZVaultUtil.isValid(data) && !(data instanceof Object)) {
            data = JSON.parse(data);
        }
        switch (action) {
            case "autologin":
                ZVaultCS.login(data);
                break;
            case "fillSpecificField":
                if (!ZVaultUtil.isHostNameMatched(data.secretUrl, window.location.href) &&
                    !ZVaultUtil.isParentDomainMatched(data.secretUrl, window.location.href) &&
                    !data.secretUrls.split(",").some(x => ZVaultUtil.isParentDomainMatched(x, window.location.href))) {
                    return;
                }
                if (ZVaultCS.contextMenuTag != null) {
                    if (data.type == "password" && (ZVaultCS.contextMenuTag.type === "password" || ZVaultCS.contextMenuTag.value.toLowerCase() === "password")) {
                        ZVaultCS.setValueOnSecretField(ZVaultCS.contextMenuTag, data.fieldValue);
                    }
                    else if (data.type == "text" && ZVaultCS.isUserNameField(ZVaultCS.contextMenuTag.type)) {
                        ZVaultCS.setValueOnSecretField(ZVaultCS.contextMenuTag, data.fieldValue);
                    }
                }
                break;
            case "startPlayback":
                ZVaultLogin.one_click_login = data.one_click_login;
                ZVaultLogin.has_view_permission = data.has_view_permission;
                ZVaultLogin.in_login = true;
                if (await ZVaultUtil.domainMatchedForPlayback(data.urls)) {
                    var state = document.readyState;
                    if (state != "complete") {
                        ZVaultCS.repeatPlayback(data);
                        break;
                    }
                    if (ZVaultCS.buttonClicked) {
                        ZVaultCS.repeatPlayback(data);
                        ZVaultCS.buttonClicked = false;
                    }
                    var steps = JSON.parse(data.steps);
                    var step_data = steps[data.step_no];
                    data.frameurl = window.location.href;
                    if (step_data.fill_using_context_menu) {
                        data.submit = false;
                        ZVaultCS.login(data);
                        data.step_no = data.step_no + 1;
                        ZVaultCS.continuePlayback(data);
                    }
                    else if (step_data.type == "wait") {
                        data.step_no = data.step_no + 1;
                        ZVaultCS.continuePlayback(data);
                    }
                    else if (step_data.type == "complete_load") {
                        var state = document.readyState;
                        if (state == "complete") {
                            data.step_no = data.step_no + 1;
                            ZVaultCS.continuePlayback(data);
                        }
                        else {
                            ZVaultCS.repeatPlayback(data);
                        }
                        break;
                    }
                    else if (step_data.type == "pin") {
                        var selectors = JSON.parse(atob(step_data.selector));
                        var length = selectors.length;
                        var pin = data.secretdata.password;
                        for (var i = 0; i < length; i++) {
                            var current_selector = document.querySelector(selectors[i]);
                            if (current_selector != null) {
                                data.countdown = 0;
                                document.querySelector(selectors[i]).focus();
                                ZVaultCS.setValueOnSecretField(current_selector, pin[i]);
                            }
                            else {
                                data.countdown = data.countdown + 1;
                                if (data.countdown > 10) {
                                    ZVaultUtil.sendMessage(null, "playbackFailure", data);
                                    break;
                                }
                                ZVaultCS.continuePlayback(data);
                                break;
                            }
                        }
                        data.step_no = data.step_no + 1;
                        ZVaultUtil.sendMessage(null, "continuePlayback", data);
                        break;
                    }
                    else if (step_data.type == "totp") {
                        var selector = document.querySelector(atob(step_data.selector));
                        if (selector == null) {
                            data.countdown = data.countdown + 1;
                            if (data.countdown > 10) {
                                ZVaultUtil.sendMessage(null, "playbackFailure", data);
                                return;
                            }
                            ZVaultCS.repeatPlayback(data);
                        }
                        else if (window.top == window && data.oneauthId != undefined) {
                            ZVaultCS.fillOneAuthTOTP(data, selector);
                        }
                        break;
                    }
                    else if (step_data.type == "shadowRoot_username" || step_data.type == "shadowRoot_password" || step_data.type == "shadowRoot_click") {
                        var selectorData = JSON.parse(atob(step_data.selector));
                        var selector = document.querySelector(selectorData.shadowRoot).shadowRoot.querySelector(selectorData.field);
                        if (selector == null) {
                            data.step_no = data.step_no + 1;
                            if (data.countdown > 10) {
                                ZVaultUtil.sendMessage(null, "playbackFailure", data);
                                return;
                            }
                            ZVaultCS.repeatPlayback(data);
                        }
                        else {
                            step_data.type = step_data.type.split("_").pop();
                            ZVaultCS.executePlaybackAction(data, step_data, selector);
                        }
                    }
                    else if (step_data.type == "fill_totp") {
                        if (data.has_totp) {
                            ZVaultCS.fill_totp(data);
                        }
                        else if (data.oneauthId != "" || data.oneauthId != null) {
                            ZVaultCS.fillOneAuthTOTP(data, loginContext.selector.getElement(step_data.selector));
                        }
                        else {
                            ZVaultCS.advanceSteps(data, 2);
                        }
                    }
                    else if (step_data.type == "totp_fill_digits") {
                        ZVaultCS.fill_digits_totp(data);
                    }
                    else if (step_data.type == "userActionText") {
                        userAction.fill(loginContext.selector.getElement(step_data.selector), ZVaultCS.getDataToFill(data, "username"));
                        this.advanceSteps(data, 1);
                    }
                    else if (step_data.type == "userActionPassword") {
                        userAction.fill(loginContext.selector.getElement(step_data.selector), ZVaultCS.getDataToFill(data, "password"));
                        this.advanceSteps(data, 1);
                    }
                    else if (step_data.type == "userActionClick") {
                        userAction.click(loginContext.selector.getElement(step_data.selector));
                        this.advanceSteps(data, 1);
                    }
                    else {
                        let element = null;
                        if (step_data.selector) {
                            element = loginContext.selector.getElement(step_data.selector);
                        }
                        ZVaultCS.executePlaybackAction(data, step_data, element);
                    }
                }
                break;
        }
    },
    async fill_totp(data) {
        if (!data.has_totp) {
            this.advanceSteps(2);
            return;
        }
        try {
            const step = JSON.parse(data.steps)[data.step_no];
            const elem = await this.getElemRetry(() => loginContext.selector.getElement(step.selector), 10);
            if (!elem) {
                throw new Error("ELEMENT_NOT_FOUND");
            }
            const totp = await bgApi.secret.totp.getTotp(data.secretId);
            ZVaultCS.setValueOnSecretField(elem, totp);
            this.advanceSteps(data, 1);
        }
        catch (e) {
            logError(e);
            this.advanceSteps(data, 2);
        }
    },
    async fill_digits_totp(data) {
        if (!data.has_totp) {
            this.advanceSteps(2);
            return;
        }
        try {
            const step = JSON.parse(data.steps)[data.step_no];
            const elem = await this.getElemRetry(() => loginContext.selector.getElement(step.selector), 10);
            if (!elem) {
                throw new Error("ELEMENT_NOT_FOUND");
            }
            const reqElements = loginContext.selector.getElements(step.selector);
            if (reqElements == null || reqElements.length == 0) {
                throw new Error("ELEMENT_NOT_FOUND");
            }
            const totp = await bgApi.secret.totp.getTotp(data.secretId);
            const end = Math.min(reqElements.length, totp.length);
            for (let i = 0; i < end; i++) {
                ZVaultCS.setValueOnSecretField(reqElements[i], totp[i]);
            }
            this.advanceSteps(data, 1);
        }
        catch (e) {
            logError(e);
            this.advanceSteps(data, 2);
        }
    },
    advanceSteps(data, noOfSteps) {
        data.step_no = data.step_no + noOfSteps;
        ZVaultUtil.sendMessage(null, "continuePlayback", data);
    },
    async getElemRetry(getElem, max_s = 10) {
        try {
            let elem = null;
            for (let i = 0; i < max_s; i++) {
                elem = getElem();
                if (elem) {
                    return elem;
                }
                await js.time.delay(1);
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    },
    async get_elem(selector = "", max_s = 10) {
        try {
            for (let i = 0; i < max_s; i++) {
                if (document.querySelector(selector)) {
                    return document.querySelector(selector);
                }
                await js.time.delay(1);
            }
        }
        catch (e) {
            logError(e);
        }
        return false;
    }
};
