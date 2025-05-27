import { CSUniqSelectorMovementType } from "../../service/constants.js";
import { csutil } from "../Context.js";
import { CSSelectorPositionUtil } from "./CSUniqSelectorPositionUtil.js";
export class CSSelectorSelecter {
    select(selector) {
        try {
            const elem = this.selectPath(selector.path);
            if (!elem) {
                return null;
            }
            if (selector.tagName != elem.tagName) {
                return null;
            }
            if (!CSSelectorPositionUtil.isEqual(selector.position, CSSelectorPositionUtil.getPosition(elem))) {
                return null;
            }
            if (selector.topFrame != js.window.isTopFrame()) {
                return null;
            }
            if (selector.host != csutil.uniqSelector.getHost()) {
                return null;
            }
            if (!csutil.uniqSelector.attributeUtil.checkAttributes(elem, selector.attributes)) {
                return null;
            }
            return elem;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    selectPath(path) {
        try {
            let elem = document.documentElement;
            for (let i = 0; i < path.length; i++) {
                elem = this.moveNext(elem, path[i]);
                if (!elem) {
                    return null;
                }
                if (elem.tagName != path[i].destTagName) {
                    return null;
                }
            }
            return elem;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    moveNext(elem, move) {
        try {
            switch (move.type) {
                case CSUniqSelectorMovementType.CHILD: {
                    if (elem.children.length <= move.index) {
                        return null;
                    }
                    return elem.children.item(move.index);
                }
                case CSUniqSelectorMovementType.SHADOW:
                    return csutil.dom.getShadowRoot(elem)?.children[move.index];
            }
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
}
