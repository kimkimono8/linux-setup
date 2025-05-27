import { CSUniqSelectorMovementType } from "../../service/constants.js";
import { csutil } from "../Context.js";
import { CSSelectorPositionUtil } from "./CSUniqSelectorPositionUtil.js";
export class CSSelectorGetter {
    VERSION = 1;
    getSelector(elem) {
        try {
            const selector = {
                version: this.VERSION,
                tagName: elem.tagName,
                path: this.getMovement(elem),
                position: CSSelectorPositionUtil.getPosition(elem),
                topFrame: js.window.isTopFrame(),
                host: csutil.uniqSelector.getHost(),
                attributes: csutil.uniqSelector.attributeUtil.getAttributes(elem),
            };
            return selector;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getMovement(elem) {
        try {
            const path = [];
            while (elem.parentElement) {
                path.push({
                    type: CSUniqSelectorMovementType.CHILD,
                    index: this.findIndex(elem),
                    destTagName: elem.tagName,
                });
                elem = elem.parentElement;
            }
            if (elem == document.documentElement) {
                path.reverse();
                return path;
            }
            path.push({
                type: CSUniqSelectorMovementType.SHADOW,
                index: this.findIndex(elem, elem.getRootNode()),
                destTagName: elem.tagName,
            });
            const parent = elem.getRootNode().host;
            const parentPath = this.getMovement(parent);
            path.reverse();
            parentPath.push(...path);
            return parentPath;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    findIndex(elem, parentInput) {
        try {
            const parent = parentInput || elem.parentElement;
            for (let i = 0; i < parent.children.length; i++) {
                if (parent.children.item(i) == elem) {
                    return i;
                }
            }
            throw "CANNOT_FIND_INDEX";
        }
        catch (e) {
            logError(e);
            return 0;
        }
    }
}
