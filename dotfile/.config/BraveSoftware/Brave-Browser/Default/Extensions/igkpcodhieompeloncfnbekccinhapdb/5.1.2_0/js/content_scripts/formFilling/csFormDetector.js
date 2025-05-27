import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
export class CSFormDetector {
    attributeName = "";
    formAttribute = "";
    formIndex = 0;
    frameUrl = "";
    async detectFields(selector, regex, type, checkClass = true, filterOut = null) {
        const field = selector.filter(function () {
            let text = this.getAttribute('name') + this.getAttribute('autocomplete') + this.getAttribute('id')
                + this.getAttribute('placeholder');
            text = checkClass ? text + this.getAttribute('class') : text;
            const remove = filterOut && filterOut.test(text);
            return regex.test(text) && !remove && (this.offsetWidth > 10 || this.tagName == "SELECT");
        });
        let matchCount = 0;
        for (let element of field) {
            matchCount++;
            if (element.hasAttribute(this.attributeName)) {
                continue;
            }
            this.markCCField(element, type);
            break;
        }
        return matchCount == 0 ? [] : field;
    }
    markCCField(element, type) {
        element.setAttribute(this.attributeName, type);
        element.setAttribute(this.attributeName + "-iframe", type);
        const form = element.form == undefined ? document.body : element.form;
        if (form != undefined) {
            const formData = form.getAttribute(this.formAttribute);
            if (formData == undefined) {
                form.setAttribute(this.formAttribute, "ccform" + this.formIndex);
                element.setAttribute(this.attributeName + "-parent", "ccform" + this.formIndex++);
            }
            else {
                element.setAttribute(this.attributeName + "-parent", formData);
            }
        }
    }
    async fillVaultIcon(element, _clickAction) {
        if (!element) {
            return;
        }
        zicon.adder.add(element);
    }
    async ccFieldClicked(event) {
        const elm = event.target;
        const currentType = elm.getAttribute('type');
        if (currentType == "button" || currentType == "submit") {
            return;
        }
        const data = {};
        data.element = elm.getAttribute(this.attributeName);
        data.attribute = this.attributeName;
        data.parent = elm.getAttribute(this.attributeName + '-parent');
        data.boundary = { x: event.clientX, y: event.clientY };
        data.multiIframes = elm.hasAttribute(this.attributeName + '-iframe-enabled');
        await this.loadFormFillingFrame(data);
        return;
    }
    async loadFormFillingFrame(data) {
        const clickLocation = data.boundary;
        ztabStorage.save(TabStorageKeys.ZICON_CLICK_LOCATION, clickLocation);
        const activeFrameId = await bgApi.tab.getFrameId();
        ztabStorage.save(TabStorageKeys.ACTIVE_FRAME_ID, activeFrameId);
        await bgApi.cardFrame.showFormFrame(this.frameUrl);
        data.frameUrl = window.location.href;
        ztabStorage.save(TabStorageKeys.FORM_FRAME_DATA, data);
        return;
    }
    removeCustomAttributes(removeIframe) {
        for (let index = 0; index < this.formIndex; index++) {
            const attribute = this.attributeName + '-parent=ccform' + index + ']';
            const ccfields = document.querySelectorAll('input[' + attribute + ', select[' + attribute);
            this.removeAttributesFromArray(ccfields, removeIframe);
        }
    }
    removeAttributesFromArray(ccfields, removeIframe) {
        if (!ccfields.length) {
            return;
        }
        for (let ccElement of ccfields) {
            ccElement.removeAttribute(this.attributeName + '-parent');
            ccElement.removeAttribute(this.attributeName);
            if (removeIframe) {
                ccElement.removeAttribute(this.attributeName + '-iframe');
            }
        }
    }
}
