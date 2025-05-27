import { InputType } from "../../../../service/vt/constants/InputType.js";
import { csutil } from "../Context.js";
export class CSInputFilterImpl {
    visibleFilter = visibleFilter;
    usernameFilter = usernameFilter;
    editableFilter = (input) => !input.disabled && !input.readOnly;
    and(...filters) {
        return function (input) {
            return filters.every(filter => filter(input));
        };
    }
    or(...filters) {
        return function (input) {
            return filters.some(filter => filter(input));
        };
    }
    newTypeFilter(types) {
        return function typeFilter(input) {
            return types.includes(csutil.input.typeOf(input));
        };
    }
}
function visibleFilter(input) {
    return csutil.isVisible(input);
}
function usernameFilter(input) {
    return [InputType.TEXT, InputType.EMAIL].includes(csutil.input.typeOf(input)) &&
        !csutil.dom.hasAttribute({ elem: input, key: /search|captcha/ });
}
