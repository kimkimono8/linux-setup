export class SecretUtil {
    static getLogoColor(createdOn, name) {
        try {
            const colors = ["e0732d", "594139", "759d47", "3988cc", "4296a5", "1e4c41", "4b34a3", "b04120", "22548f", "7c919c"];
            const index = (createdOn + name.length) % colors.length;
            const reqColor = "#" + colors[index];
            return reqColor;
        }
        catch (e) {
            logError(e);
            return "#e0732d";
        }
    }
    static getLogoStyleSrc(base64Logo) {
        try {
            const styleSrc = `url('${this.getLogoDataUrl(base64Logo)}')`;
            return styleSrc;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    static getFirst2Chars(s) {
        try {
            if (!s) {
                return "";
            }
            const firstChar = s[0];
            let secondChar = "";
            const secondCharRegex = /[^ ]* +(.)/;
            let regExResult = secondCharRegex.exec(s);
            if (regExResult && regExResult[1]) {
                secondChar = regExResult[1];
            }
            const first2Chars = (firstChar + secondChar).toUpperCase();
            return first2Chars;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    static getLogoDataUrl(base64Logo) {
        try {
            if (base64Logo.startsWith("data:")) {
                return base64Logo;
            }
            let type = "png";
            try {
                const decodedLogo = atob(base64Logo);
                const isWebUISvg = decodedLogo.includes("</svg>");
                if (isWebUISvg) {
                    type = "svg+xml";
                }
            }
            catch (e) {
                logError(e);
            }
            return `data:image/${type};charset=utf-8;base64,${base64Logo}`;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
