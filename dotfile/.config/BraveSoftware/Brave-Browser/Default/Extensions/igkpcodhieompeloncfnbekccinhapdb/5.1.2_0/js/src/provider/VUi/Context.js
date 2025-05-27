import { TemplateUtil } from "./TemplateUtil.js";
import { UIUtilImpl } from "./UIUtilImpl.js";
import { CustomElemUtil } from "./customElements/CustomElemUtil.js";
import { KeyboardUtilImpl } from "./keyboard/KeyboardUtil.js";
export let customElemUtil = null;
export let templateUtil = null;
export let uiUtil = null;
export let keyboardUtil = null;
export function initContext() {
    templateUtil = new TemplateUtil();
    customElemUtil = new CustomElemUtil();
    keyboardUtil = new KeyboardUtilImpl();
    uiUtil = new UIUtilImpl();
}
