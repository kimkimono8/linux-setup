import { pkceChallenge, setupConfig } from "./Context.js";
export class OAuthFetch {
    async fetchAccessToken(refreshToken) {
        const params = new URLSearchParams();
        params.set("refresh_token", refreshToken);
        params.set("grant_type", "refresh_token");
        return this.fetchTokens(params);
    }
    async fetchRefreshToken(grantCode) {
        const params = new URLSearchParams();
        params.set("code", grantCode);
        params.set("redirect_uri", setupConfig.redirectUrl);
        params.set("grant_type", "authorization_code");
        await pkceChallenge.setGenerateParam(params);
        return this.fetchTokens(params);
    }
    async fetchTokens(params) {
        params.set("client_id", setupConfig.clientId);
        return fetch(urlProvider.getAccountsUrl() + "/oauth/v2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params
        }).then(x => x.json());
    }
}
