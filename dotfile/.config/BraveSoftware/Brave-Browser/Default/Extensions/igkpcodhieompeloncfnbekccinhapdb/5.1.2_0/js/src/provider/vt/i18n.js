import { BrApiImpl } from "../../../components/brApi/provider/brApi/BrApiImpl.js";
const brApi = BrApiImpl.getInstance();
export function i18n(key, ...placeholders) {
    return brApi.i18n.textOf(key, placeholders);
}
globalThis["i18n"] = i18n;
