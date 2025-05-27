import { JsEncodingFormat } from "../../service/JsEncodingUtil.js";
import { gg } from "./GG.js";
export class JsEncodingXToByteUtil {
    textEncoder = new TextEncoder();
    getBytes(input) {
        try {
            if (input.inputBytes) {
                if (input.inputBytes instanceof ArrayBuffer) {
                    return new Uint8Array(input.inputBytes);
                }
                return input.inputBytes;
            }
            switch (input.from) {
                case JsEncodingFormat.ASCII:
                    return this.textEncoder.encode(input.inputString);
                case JsEncodingFormat.BASE64:
                    return gg.base64Util.decodeStringToBytes(input.inputString);
                case JsEncodingFormat.HEX:
                    return gg.hexUtil.decodeHexStringToBytes(input.inputString);
                default:
                    throw ["NEW_CASE", input];
            }
        }
        catch (e) {
            logError(e, input);
            throw e;
        }
    }
}
