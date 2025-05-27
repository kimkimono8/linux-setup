import { JsEncodingFormat } from "../../service/JsEncodingUtil.js";
import { gg } from "./GG.js";
export class JsEncodingByteToXUtil {
    textDecoder = new TextDecoder();
    convertBytes(bytes, input) {
        try {
            switch (input.to) {
                case JsEncodingFormat.BYTES:
                    return { outputBytes: bytes };
                case JsEncodingFormat.BASE64:
                    return { outputString: gg.base64Util.encodeBytesToString(bytes) };
                case JsEncodingFormat.ASCII:
                    return { outputString: this.textDecoder.decode(bytes) };
                case JsEncodingFormat.BASE64_URL:
                    return { outputString: this.getBase64Url(gg.base64Util.encodeBytesToString(bytes)) };
                case JsEncodingFormat.HEX:
                    return { outputString: gg.hexUtil.encodeBytesToHexString(bytes) };
                default:
                    throw ["NEW_CASE", input];
            }
        }
        catch (e) {
            logError(e, bytes, input);
            throw e;
        }
    }
    getBase64Url(text) {
        return text.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }
}
