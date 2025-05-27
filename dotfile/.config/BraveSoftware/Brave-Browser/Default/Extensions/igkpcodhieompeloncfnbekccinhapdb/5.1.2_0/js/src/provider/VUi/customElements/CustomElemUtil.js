import { I18nSpanImpl, NoI18nSpanImpl } from "./I18nSpanImpl.js";
import { VaultLoadingElemImpl } from "./VaultLoadingElem.js";
export class CustomElemUtil {
    init() {
        customElements.define("i-span", I18nSpanImpl);
        customElements.define("no-i-span", NoI18nSpanImpl);
        customElements.define("vault-loading", VaultLoadingElemImpl);
    }
}
