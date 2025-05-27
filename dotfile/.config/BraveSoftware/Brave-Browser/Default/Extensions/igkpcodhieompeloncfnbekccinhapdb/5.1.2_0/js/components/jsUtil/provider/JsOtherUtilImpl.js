export class JsOtherUtilImpl {
    escapeXml(s) {
        try {
            return s.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&apos;");
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
