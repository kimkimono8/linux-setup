import { BrApiImpl } from "../../../components/brApi/provider/brApi/BrApiImpl.js";
import { JsUtilImpl } from "../../../components/jsUtil/provider/JsUtilImpl.js";
import { LocalStorageKeys } from "../../service/storage/constants/LocalStorageKeys.js";
import { SessionStorageKeys } from "../../service/storage/constants/SessionStorageKeys.js";
import { TabDomainStorageKeys } from "../../service/storage/constants/TabDomainStorageKeys.js";
import { TabStorageKeys } from "../../service/storage/constants/TabStorageKeys.js";
import { LocalStorageImpl } from "../storage/LocalStorage.js";
import { SessionStorageImpl } from "../storage/SessionStorage.js";
import { TabDomainStorageImpl } from "../storage/TabDomainStorage.js";
import { TabStorageImpl } from "../storage/TabStorage.js";
export class VtImpl {
    static instance = null;
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return this.instance = new VtImpl();
    }
    initializer = new Initializer();
    constructor() {
        this.initializer.init();
    }
    async init(params) {
        try {
            this.initializer.initLogging(params.logPrefix);
            if (!params.skipBgApiInit) {
                await bgApi.init();
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async isPersonalPlan() {
        try {
            const isPersonalPlan = await zlocalStorage.load(LocalStorageKeys.IS_PERSONAL_PLAN, false);
            return isPersonalPlan;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
class Initializer {
    init() {
        try {
            this.initJs();
            BrApiImpl.getInstance().init();
            this.initStorage();
            this.init = js.fn.emptyFn;
        }
        catch (e) {
            logError(e);
        }
    }
    initLogging(prefix) {
        try {
            if (!isDevMode) {
                return;
            }
            js.log.setInfoPrefix(prefix);
            js.log.enableLogging(true);
        }
        catch (e) {
            logError(e);
        }
    }
    initJs() {
        try {
            globalThis.js = JsUtilImpl.getInstance();
            js.init();
        }
        catch (e) {
            logError(e);
        }
    }
    initStorage() {
        try {
            globalThis.zlocalStorage = LocalStorageImpl.getInstance();
            globalThis.zsessionStorage = SessionStorageImpl.getInstance();
            globalThis.ztabStorage = TabStorageImpl.getInstance();
            globalThis.ztabDomainStorage = TabDomainStorageImpl.getInstance();
            globalThis["LocalStorageKeys"] = LocalStorageKeys;
            globalThis["SessionStorageKeys"] = SessionStorageKeys;
            globalThis["TabStorageKeys"] = TabStorageKeys;
            globalThis["TabDomainStorageKeys"] = TabDomainStorageKeys;
        }
        catch (e) {
            logError(e);
        }
    }
}
