import { CSSelectorAttribute } from "./CSUniqSelectorAttribute.js";
import { CSSelectorGetter } from "./CSUniqSelectorGetter.js";
import { CSSelectorSelecter } from "./CSUniqSelectorSelecter.js";
export class CSUniqSelectorUtilImpl {
    selectorGetter = new CSSelectorGetter();
    selectorSelecter = new CSSelectorSelecter();
    attributeUtil = new CSSelectorAttribute();
    getSelector(elem) {
        return this.selectorGetter.getSelector(elem);
    }
    select(selector) {
        return this.selectorSelecter.select(selector);
    }
    getHost() {
        try {
            return new URL(window.location.href).host;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
