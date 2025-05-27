import { initContext, oauthImpl, urlProviderImpl } from "./Context.js";
function main() {
    initContext();
    globalThis.oauth = oauthImpl;
    globalThis.urlProvider = urlProviderImpl;
}
export { main as oauthMain };
