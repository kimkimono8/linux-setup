export class CSSelectorAttribute {
    checkAttributes(elem, attributes) {
        try {
            if (attributes.ariaLabel && elem.ariaLabel != attributes.ariaLabel) {
                return false;
            }
            if (attributes.placeholder && elem.placeholder != attributes.placeholder) {
                return false;
            }
            if (attributes.type && elem.type != attributes.type) {
                return false;
            }
            return true;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    getAttributes(elem) {
        try {
            const attributes = {};
            if (!(elem instanceof HTMLInputElement)) {
                return attributes;
            }
            attributes.type = csutil.input.typeOf(elem);
            if (elem.ariaLabel) {
                attributes.ariaLabel = elem.ariaLabel;
            }
            if (elem.placeholder) {
                attributes.placeholder = elem.placeholder;
            }
            return attributes;
        }
        catch (e) {
            logError(e);
            return {};
        }
    }
}
