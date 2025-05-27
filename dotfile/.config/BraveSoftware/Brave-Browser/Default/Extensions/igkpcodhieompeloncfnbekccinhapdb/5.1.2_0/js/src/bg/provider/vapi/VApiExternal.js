export class VApiExternal {
    getApiPassphraseHeaders() {
        return bg.vaultLogin.getApiPassphraseHeaders();
    }
    parseDOMContents(htmlContent, ...selectors) {
        return bg.offscreenApi.parseDOMContents(htmlContent, ...selectors);
    }
    silentSignout() {
        return bg.vault.silentSignOut();
    }
    passphraseChanged() {
        return bg.vaultLogin.handlePassphraseChange();
    }
}
