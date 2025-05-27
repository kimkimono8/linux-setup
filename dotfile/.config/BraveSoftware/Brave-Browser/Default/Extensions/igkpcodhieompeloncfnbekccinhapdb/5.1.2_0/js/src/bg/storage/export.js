import { context } from "./Context.js";
context.init();
export const bgStorage = context.storage;
globalThis["bgStorage"] = bgStorage;
export { TAB_STORAGE_PREFIX } from "./types.js";
