export class BrOmniboxApiImpl {
    onInputChanged(listener) {
        try {
            chrome?.omnibox?.onInputChanged?.addListener?.(listener);
        }
        catch (e) {
            logError(e);
        }
    }
    onInputEntered(listener) {
        try {
            chrome?.omnibox?.onInputEntered?.addListener?.(listener);
        }
        catch (e) {
            logError(e);
        }
    }
    onInputStarted(listener) {
        try {
            chrome?.omnibox?.onInputStarted?.addListener?.(listener);
        }
        catch (e) {
            logError(e);
        }
    }
    setDefaultSuggestion(suggestion) {
        try {
            chrome.omnibox.setDefaultSuggestion(suggestion);
        }
        catch (e) {
            logError(e);
        }
    }
}
