import { AddressFields, CSAddressDetector } from "../../src/cs/address/csAddressDetector.js";
import { userAction } from "../../src/cs/csfill/context.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
import { ADDRESS_FIELDS } from "../../src/vutil/types/PasswordCategory.js";
export class CSFormFiller extends CSAddressDetector {
    async fillAddress(secret) {
        const cardData = await ztabStorage.load(TabStorageKeys.FORM_FRAME_DATA);
        const formId = cardData.parent;
        if ($('form[' + this.formAttribute + '=' + formId + ']').length == 0 && $('body[' + this.formAttribute + '=' + formId + ']').length == 0) {
            return;
        }
        await Promise.all([
            this.fillNameField(formId, secret),
            this.fillField(formId, AddressFields.MOBILE, secret.encrypted.fields[ADDRESS_FIELDS.MOBILE]),
            this.fillField(formId, AddressFields.ADDRESS1, secret.encrypted.fields[ADDRESS_FIELDS.ADDRESS_1]),
            this.fillField(formId, AddressFields.ADDRESS2, secret.encrypted.fields[ADDRESS_FIELDS.ADDRESS_2]),
            this.fillField(formId, AddressFields.ADDRESS3, secret.encrypted.fields[ADDRESS_FIELDS.ADDRESS_3]),
            this.fillField(formId, AddressFields.CITY, secret.encrypted.fields[ADDRESS_FIELDS.CITY]),
            this.fillField(formId, AddressFields.STATE, secret.encrypted.fields[ADDRESS_FIELDS.STATE])
        ]);
        if (secret.encrypted.fields[ADDRESS_FIELDS.ZIP] != "") {
            await this.fillField(formId, AddressFields.ZIP, secret.encrypted.fields[ADDRESS_FIELDS.ZIP]);
        }
        await js.time.delay(0.5);
        $('form[' + this.formAttribute + '=' + formId + ']').click();
    }
    hasSingleNameField(formId) {
        const targetAttr = this.attributeName + '-parent=' + formId + '][' + this.attributeName + '=' + AddressFields.NAME;
        let field = document.querySelector('input[' + targetAttr + '], textarea[' + targetAttr + ']');
        return field != null;
    }
    async fillNameField(formId, secret) {
        if (this.hasSingleNameField(formId)) {
            let name = secret.encrypted.fields[ADDRESS_FIELDS.FIRST_NAME] + " " + secret.encrypted.fields[ADDRESS_FIELDS.MIDDLE_NAME] + " " + secret.encrypted.fields[ADDRESS_FIELDS.LAST_NAME];
            name = name.trim();
            this.fillField(formId, AddressFields.NAME, name);
        }
        else {
            this.fillField(formId, AddressFields.FIRSTNAME, secret.encrypted.fields[ADDRESS_FIELDS.FIRST_NAME]);
            this.fillField(formId, AddressFields.MIDDLENAME, secret.encrypted.fields[ADDRESS_FIELDS.MIDDLE_NAME]);
            this.fillField(formId, AddressFields.LASTNAME, secret.encrypted.fields[ADDRESS_FIELDS.LAST_NAME]);
        }
    }
    async fillFormField(data) {
        const targetAttr = data.attribute + '-parent=' + data.parent + '][' + data.attribute + '=' + data.element;
        let field = document.querySelector('input[' + targetAttr + '], textarea[' + targetAttr + ']');
        userAction.fill(field, data.value);
    }
    async fillField(formId, name, value) {
        const targetAttr = this.attributeName + '-parent=' + formId + '][' + this.attributeName + '=' + name;
        let field = document.querySelector('input[' + targetAttr + '], textarea[' + targetAttr + ']');
        field = field == null ? document.querySelector('select[' + targetAttr + ']') : field;
        if (field == undefined) {
            return;
        }
        value = value == undefined ? "" : this.findMatchingOption(field, value);
        if (field.tagName == "SELECT" && value == "") {
            return;
        }
        userAction.fill(field, value);
    }
    findMatchingOption(element, value) {
        if (element.tagName.toLowerCase() != "select") {
            return value;
        }
        const allOptions = element.options;
        for (let option of allOptions) {
            const elmValue = option.value;
            if (option.innerText.toLowerCase() == value.toLowerCase()) {
                return elmValue;
            }
        }
        return "";
    }
}
