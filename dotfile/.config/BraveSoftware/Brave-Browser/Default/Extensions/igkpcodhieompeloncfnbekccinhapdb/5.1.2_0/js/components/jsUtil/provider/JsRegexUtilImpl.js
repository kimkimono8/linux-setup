export class JsRegexUtilImpl {
    escape(s) {
        return s.replace(/[-.*+?^${}()|[\]\\]/g, "\\$&");
    }
}
