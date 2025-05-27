import { LocalStorageKeys } from "../../../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../../../src/service/vt/VI18n.js";
export class BaseOneAuthSecretsComponent {
    p = null;
    oneAuthConfigured = false;
    async createUI() {
        try {
            const oneAuthSecrets = await zlocalStorage.load(LocalStorageKeys.ONEAUTH_TOTP_SECRETS, []);
            const oneauthDropdown = this.p.select('[data-addOneAuthSecrets]');
            if (oneAuthSecrets == null || oneAuthSecrets.length == 0) {
                this.oneAuthConfigured = false;
                this.p.hide('[data-oneauthSecretsContainer]');
                return;
            }
            this.oneAuthConfigured = true;
            this.p.show('[data-oneauthSecretsContainer]');
            for (let tpData of oneAuthSecrets) {
                var option = document.createElement("option");
                option.text = tpData.app_name + " - " + tpData.label;
                option.value = tpData.app_id;
                oneauthDropdown.append(option);
            }
            $(oneauthDropdown).select2({
                minimumResultsForSearch: -1,
                placeholder: i18n(VI18N.SELECT_ONEAUTH_SECRETS),
                allowClear: true
            });
        }
        catch (e) {
            logError(e);
        }
    }
    getSelectedSecretId() {
        const dropdown = this.p.select('[data-addOneAuthSecrets]');
        return dropdown.value;
    }
    setSecret(secret) {
        try {
            if (!secret.owned) {
                this.p.hide('[data-oneauthSecretsContainer]');
                return;
            }
            const oneAuthSelect = this.p.select('[data-addOneAuthSecrets]');
            const oneauthId = secret.oneauthId;
            $(oneAuthSelect).val(oneauthId).trigger("change.select2");
        }
        catch (e) {
            logError(e);
        }
    }
}
