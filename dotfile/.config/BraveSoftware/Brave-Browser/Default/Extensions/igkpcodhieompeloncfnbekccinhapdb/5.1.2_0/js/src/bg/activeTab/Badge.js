import { VtLoginState } from "../../service/vt/constants/constants.js";
import { VtSettings } from "../../service/vt/constants/VtSettings.js";
import { VI18N } from "../../service/vt/VI18n.js";
var BadgeColor;
(function (BadgeColor) {
    BadgeColor["BLUE"] = "#3761A6";
    BadgeColor["RED"] = "#e42528";
    BadgeColor["WHITE"] = "white";
})(BadgeColor || (BadgeColor = {}));
export class Badge {
    lockedIconObj = {
        "16": "/images/logo/locked/vault-16.png",
        "32": "/images/logo/locked/vault-32.png",
        "48": "/images/logo/locked/vault-48.png",
        "64": "/images/logo/locked/vault-64.png",
        "128": "/images/logo/locked/vault-128.png",
        "256": "/images/logo/locked/vault-256.png",
        "512": "/images/logo/locked/vault-512.png",
        "1024": "/images/logo/locked/vault-1024.png"
    };
    unlockedIconObj = {
        "16": "/images/logo/vault-16.png",
        "32": "/images/logo/vault-32.png",
        "48": "/images/logo/vault-48.png",
        "64": "/images/logo/vault-64.png",
        "128": "/images/logo/vault-128.png",
        "256": "/images/logo/vault-256.png",
        "512": "/images/logo/vault-512.png",
        "1024": "/images/logo/vault-1024.png"
    };
    states = {
        [VtLoginState.LOGGED_OUT]: {
            iconObj: this.lockedIconObj,
        },
        [VtLoginState.LOCKED]: {
            badgeText: "!",
            tooltipTitle: i18n(VI18N.ZOHO_VAULT_EXTENSION_LOCKED),
            badgeColor: BadgeColor.RED,
        },
        [VtLoginState.UNLOCKED]: {},
    };
    async changeState(state) {
        try {
            if (!(state in this.states)) {
                throw "UNKNOWN_STATE: " + state;
            }
            switch (state) {
                case VtLoginState.UNLOCKED:
                    this.changeStateFn(this.states[state]);
                    await this.refreshCount();
                    return;
                default:
                    this.changeStateFn(this.states[state]);
                    return;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    changeStateFn(badgeState) {
        brApi.action.setIcon(badgeState.iconObj ?? this.unlockedIconObj);
        brApi.action.setBadgeText(badgeState.badgeText ?? "");
        brApi.action.setTitle(badgeState.tooltipTitle ?? "Zoho Vault");
        brApi.action.setBadgeColor(badgeState.badgeColor ?? BadgeColor.BLUE);
    }
    async refreshCount() {
        try {
            brApi.action.setBadgeText(await this.getDomainMatchingCountText());
        }
        catch (e) {
            logError(e);
        }
    }
    async getDomainMatchingCountText() {
        try {
            const badgeCountDisabled = await zlocalStorage.load(VtSettings.DISABLE_BADGE_COUNT, false);
            if (badgeCountDisabled) {
                return "";
            }
            const count = await domainHandler.getDomainMatchingCount();
            return count > 0 ? count.toString() : "";
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
