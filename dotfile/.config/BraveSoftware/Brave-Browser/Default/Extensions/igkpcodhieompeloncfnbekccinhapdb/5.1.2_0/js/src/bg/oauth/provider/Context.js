import { CodeApi } from "./CodeApi.js";
import { OAuthPKCEChallenge } from "./OAuthPKCEChallenge.js";
import { OAuthStorage } from "./OAuthStorage.js";
import { OauthImpl } from "./Oauth.js";
import { OAuthExternal } from "./OauthExternal.js";
import { SetupConfig } from "./SetupConfig.js";
import { TokenGenerator } from "./TokenGenerator.js";
import { UrlProviderImpl } from "./UrlProvider.js";
export let oauthImpl;
export let urlProviderImpl;
export let setupConfig;
export let storage;
export let oauthExternal;
export let tokenGenerator;
export let codeApi;
export let pkceChallenge;
export function initContext() {
    oauthImpl = new OauthImpl();
    urlProviderImpl = new UrlProviderImpl();
    setupConfig = new SetupConfig();
    storage = new OAuthStorage();
    oauthExternal = new OAuthExternal();
    tokenGenerator = new TokenGenerator();
    codeApi = new CodeApi();
    pkceChallenge = new OAuthPKCEChallenge();
}
