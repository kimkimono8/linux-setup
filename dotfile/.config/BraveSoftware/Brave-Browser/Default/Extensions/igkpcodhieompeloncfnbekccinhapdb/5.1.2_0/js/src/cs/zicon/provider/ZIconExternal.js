import { csCardFieldDetector } from "../../../../content_scripts/card/csCardFieldDetector.js";
import { csAddressDetector } from "../../address/csAddressDetector.js";
export class ZIconExternal {
    async initCardIcon() {
        try {
            return await csCardFieldDetector.init();
        }
        catch (e) {
            logError(e);
        }
    }
    addCardIcon() {
        try {
            csCardFieldDetector.populateVaultIconsCC();
        }
        catch (e) {
            logError(e);
        }
    }
    clickedCardIcon(e) {
        csCardFieldDetector.ccFieldClicked(e);
    }
    clickedAddressIcon(e) {
        csAddressDetector.ccFieldClicked(e);
    }
    addAddressIcon() {
        csAddressDetector.populateVaultIcons();
    }
}
