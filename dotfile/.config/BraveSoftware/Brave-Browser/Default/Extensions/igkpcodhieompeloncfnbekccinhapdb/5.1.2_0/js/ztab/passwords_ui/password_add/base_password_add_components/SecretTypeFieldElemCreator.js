import { globalNodeData } from "../../../../common/ui/globalNodeData.js";
import { InvalidCharConsumer } from "../../../../common/ui/util/InvalidCharConsumer.js";
import { SecretType } from "../../../../src/service/bgApi/types/SecretType.js";
import { ADDRESS_FIELDS, CARD_FIELDS } from "../../../../src/vutil/types/PasswordCategory.js";
const FIELD_TYPE = SecretType.FIELD_TYPE;
export class SecretTypeFieldElemCreator {
    fieldCreator = new FieldCreator();
    create(field) {
        try {
            switch (field.type) {
                case FIELD_TYPE.TEXT:
                default:
                    return this.fieldCreator.createElem("#add_password_text_input_template", field);
                case FIELD_TYPE.PASSWORD:
                    return this.fieldCreator.createElem("#add_password_password_input_template", field);
                case FIELD_TYPE.FILE:
                    return this.fieldCreator.createElem("#add_password_file_input_template", field);
                case FIELD_TYPE.TEXTAREA:
                    return this.fieldCreator.createElem("#add_password_textarea_template", field);
            }
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    createCard(field) {
        try {
            switch (field.name) {
                case CARD_FIELDS.NAME:
                default:
                    return this.create(field);
                case CARD_FIELDS.NUMBER:
                    return this.createCardPin("#add_card_password_input_template", field);
                case CARD_FIELDS.CVV:
                    return this.createCardPin("#add_card_cvv_input_template", field);
                case CARD_FIELDS.VALID_UPTO:
                    return this.fieldCreator.createElem("#add_card_validity_template", field);
            }
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    createAddress(field) {
        try {
            switch (field.name) {
                case ADDRESS_FIELDS.MOBILE:
                case ADDRESS_FIELDS.ZIP:
                    return this.fieldCreator.createElem("#add_address_zip_input_template", field);
                case ADDRESS_FIELDS.COUNTRY:
                case ADDRESS_FIELDS.STATE:
                case ADDRESS_FIELDS.CITY:
                    const node = this.fieldCreator.createElem("#add_address_dropdown_template", field);
                    node.elem.querySelector("[data-dropdown]").name = field.name;
                    return node;
                default:
                    return this.create(field);
            }
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    createCardPin(template, field) {
        const out = this.fieldCreator.createElem(template, field);
        new InvalidCharConsumer().consumeInvalidChars(out.input, /\d/);
        return out;
    }
}
class FieldCreator {
    createElem(template, field) {
        try {
            const elem = UIUtil.createElem({ template: template });
            elem.setAttribute("data-name", field.name);
            elem.setAttribute("data-selector", "#" + this.getFieldId(field));
            js.dom.setChildText(elem, "[data-name]", field.label);
            if (!field.isMandatory) {
                js.selector.selectFrom(elem, "[data-mandatory]").remove();
            }
            if (!field.pii) {
                js.selector.selectFrom(elem, "[data-pii]").remove();
            }
            const input = this.getInput(elem);
            input.id = this.getFieldId(field);
            globalNodeData.setNodeData(input, field);
            return { elem, input };
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getInput(elem) {
        try {
            return js.selector.selectFrom(elem, "input,textarea");
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getFieldId(field) {
        try {
            return field.type + "_" + field.name;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
