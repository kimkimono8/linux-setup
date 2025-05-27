import { JsEncodingFormat } from "../../service/JsEncodingUtil.js";
import { JsEncodingByteToXUtil } from "./JsEncodingByteToXUtil.js";
import { JsEncodingXToByteUtil } from "./JsEncodingXToByteUtil.js";
export class JsEncodingUtilImpl {
    xToByteUtil = new JsEncodingXToByteUtil();
    byteToXUtil = new JsEncodingByteToXUtil();
    convert(input) {
        try {
            const bytes = this.xToByteUtil.getBytes(input);
            return this.byteToXUtil.convertBytes(bytes, input);
        }
        catch (e) {
            throw ["FAILED_TO_ENCODE", input, e];
        }
    }
    bytesToBase64(input) {
        return this.convert({ from: JsEncodingFormat.BYTES, to: JsEncodingFormat.BASE64, inputBytes: input }).outputString;
    }
    bytesToBase64Url(input) {
        return this.convert({ from: JsEncodingFormat.BYTES, to: JsEncodingFormat.BASE64_URL, inputBytes: input }).outputString;
    }
    bytesToHex(input) {
        return this.convert({ from: JsEncodingFormat.BYTES, to: JsEncodingFormat.HEX, inputBytes: input }).outputString;
    }
    base64ToBytes(input) {
        return this.convert({ from: JsEncodingFormat.BASE64, to: JsEncodingFormat.BYTES, inputString: input }).outputBytes;
    }
    hexToBytes(input) {
        return this.convert({ from: JsEncodingFormat.HEX, to: JsEncodingFormat.BYTES, inputString: input }).outputBytes;
    }
}
