import { bg } from "../../../src/bg/bg.js";
import { VaultCrypto } from "../../../src/bg/crypto/VaultCrypto.js";
export class BaseSecretAdd {
    p = null;
    getApiInputLogo(logo) {
        try {
            if (!logo) {
                return logo;
            }
            const base64Index = logo.indexOf("base64,");
            const hasBase64SubString = base64Index >= 0;
            if (!hasBase64SubString) {
                return logo;
            }
            const logoDataPart = logo.slice(base64Index + "base64,".length);
            return logoDataPart;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async getApiInputCustomColumn(customColumns, shared) {
        try {
            for (let column of customColumns) {
                column.value = await bg.zcrypt.encrypt(column.value, shared);
            }
            const customColumnString = VaultCrypto.encodeBase64(JSON.stringify({ customcol: customColumns }));
            return customColumnString;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
