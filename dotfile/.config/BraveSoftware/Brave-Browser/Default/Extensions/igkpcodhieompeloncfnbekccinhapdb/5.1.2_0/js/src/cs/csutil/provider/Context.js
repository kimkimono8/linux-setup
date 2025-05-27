import { CSUtilImpl } from "./CSUtil.js";
import { CSSelectorMethodProviderImpl } from "./selector/CSSelectorMethodProvider.js";
export let csutil = null;
export let csSelectorMethodProvider = null;
export function initContext() {
    csutil = new CSUtilImpl();
    csSelectorMethodProvider = new CSSelectorMethodProviderImpl();
}
