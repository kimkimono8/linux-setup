import { JsCryptoImpl } from "./crypto/JsCrypto.js";
import { JsEncodingUtilImpl } from "./encoding/JsEncodingUtil.js";
import { JsFnOutImpl } from "./fnOut/JsFnOutUtilImpl.js";
import { JsFunctionUtilImpl } from "./function/JsFunctionUtilImpl.js";
import { gg } from "./GG.js";
import { JsArrayUtilImpl } from "./JsArrayUtilImpl.js";
import { JsBrowserUtilImpl } from "./JsBrowserUtilImpl.js";
import { JsDateUtilImpl } from "./JsDateUtilImpl.js";
import { JsDomUtilImpl } from "./JsDomUtilImpl.js";
import { jserror } from "./JsError.js";
import { JsEventImpl } from "./JsEvent.js";
import { JsLogUtilImpl } from "./JsLog.js";
import { JsLogoUtilImpl } from "./JsLogoUtilImpl.js";
import { JsLoopUtilImpl } from "./JsLoopUtilImpl.js";
import { JsMapUtilImpl } from "./JsMap.js";
import { JsMathUtilImpl } from "./JsMathUtilImpl.js";
import { JsObjUtilImpl } from "./JsObjUtilImpl.js";
import { JsOtherUtilImpl } from "./JsOtherUtilImpl.js";
import { JsRegexUtilImpl } from "./JsRegexUtilImpl.js";
import { JsSelectorUtilImpl } from "./JsSelectorUtilImpl.js";
import { JsStringUtilImpl } from "./JsStringUtilImpl.js";
import { JsTestImpl } from "./JsTestImpl.js";
import { JsTimeUtilImpl } from "./JsTimeUtilImpl.js";
import { JsTSUtilImpl } from "./JsTSUtilImpl.js";
import { JsUrlImpl } from "./JsUrlUtilImpl.js";
import { JSWindowImpl } from "./JsWindowUtilImpl.js";
import { logError } from "./log.js";
import { JsPromiseUtilImpl } from "./promise/JsPromiseUtilImpl.js";
export class JsUtilImpl {
    static getInstance() {
        try {
            if (gg.js) {
                return gg.js;
            }
            return gg.js = new JsUtilImpl();
        }
        catch (e) {
            throw e;
        }
    }
    array = new JsArrayUtilImpl();
    browser = new JsBrowserUtilImpl();
    promise = new JsPromiseUtilImpl();
    crypto = new JsCryptoImpl();
    dom = new JsDomUtilImpl();
    event = new JsEventImpl();
    test = new JsTestImpl();
    fn = new JsFunctionUtilImpl();
    fnOut = new JsFnOutImpl();
    time = new JsTimeUtilImpl();
    loop = new JsLoopUtilImpl();
    log = new JsLogUtilImpl();
    logo = new JsLogoUtilImpl();
    math = new JsMathUtilImpl();
    map = new JsMapUtilImpl();
    obj = new JsObjUtilImpl();
    other = new JsOtherUtilImpl();
    selector = new JsSelectorUtilImpl();
    date = new JsDateUtilImpl();
    encoding = new JsEncodingUtilImpl();
    regex = new JsRegexUtilImpl();
    string = new JsStringUtilImpl();
    tsUtil = new JsTSUtilImpl();
    url = new JsUrlImpl();
    window = new JSWindowImpl();
    init() {
        try {
            this.init = this.fn.emptyFn;
            this.log.init();
            globalThis.js = this;
            globalThis.fnOut = this.fnOut;
            globalThis.jserror = jserror;
            globalThis.logError = logError;
            globalThis.logInfo = globalThis.info = this.log.info.bind(this.log);
            globalThis.isDevMode = Boolean(globalThis.isDevMode);
        }
        catch (e) {
            logError(e);
        }
    }
}
