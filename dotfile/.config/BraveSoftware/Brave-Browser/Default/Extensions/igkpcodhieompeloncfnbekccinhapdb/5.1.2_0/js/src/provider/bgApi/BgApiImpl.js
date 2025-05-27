import { VtApiPortNames } from "../../service/vt/constants/VtApiPortNames.js";
import { BgAccessCtrlApiImpl } from "./BgAccessCtrlApiImpl.js";
import { BgApiContext } from "./BgApiContext.js";
import { BgAuditApiImpl } from "./BgAuditApiImpl.js";
import { BgCardFrameApiImpl } from "./BgCardFrameApiImpl.js";
import { BgCryptoApiImpl } from "./BgCryptoApiImpl.js";
import { BgFolderApiImpl } from "./BgFolderApiImpl.js";
import { BgGeneratorApiImpl } from "./BgGeneratorApiImpl.js";
import { BgLoginApiImpl } from "./BgLoginApiImpl.js";
import { BgOtherApiImpl } from "./BgOtherApiImpl.js";
import { BgPolicyApiImpl } from "./BgPolicyApiImpl.js";
import { BgSaveFrameApiImpl } from "./BgSaveFrameApi.js";
import { BgSecretApiImpl } from "./BgSecretApiImpl.js";
import { BgSecretTypeApiImpl } from "./BgSecretTypeApiImpl.js";
import { BgSessionApiImpl } from "./BgSessionApiImpl.js";
import { BgSettingsApiImpl } from "./BgSettingsApiImpl.js";
import { BgSiteFrameApiImpl } from "./BgSiteFrameApiImpl.js";
import { BgTabApiImpl } from "./BgTabApiImpl.js";
import { BgTrashApiImpl } from "./BgTrashApiImpl.js";
import { BgUnlockApiImpl } from "./BgUnlockApiImpl.js";
import { BgUpdateFrameApiImpl } from "./BgUpdateFrameApiImpl.js";
import { BgUserApiImpl } from "./BgUserApiImpl.js";
import { BgVaultApiImpl } from "./BgVaultApiImpl.js";
import { BgVaultWebApiImpl } from "./BgVaultWebApiImpl.js";
import { BgZTabApiImpl } from "./BgZTabApiImpl.js";
export class BgApiImpl {
    static instance = null;
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return this.instance = new BgApiImpl();
    }
    context = new BgApiContext();
    audit = new BgAuditApiImpl(this.context);
    accessCtrl = new BgAccessCtrlApiImpl(this.context);
    crypto = new BgCryptoApiImpl(this.context);
    settings = new BgSettingsApiImpl(this.context);
    siteFrame = new BgSiteFrameApiImpl(this.context);
    policy = new BgPolicyApiImpl(this.context);
    secret = new BgSecretApiImpl(this.context);
    secretType = new BgSecretTypeApiImpl(this.context);
    folder = new BgFolderApiImpl(this.context);
    unlock = new BgUnlockApiImpl(this.context);
    generator = new BgGeneratorApiImpl(this.context);
    login = new BgLoginApiImpl(this.context);
    cardFrame = new BgCardFrameApiImpl(this.context);
    tab = new BgTabApiImpl(this.context);
    other = new BgOtherApiImpl(this.context);
    saveFrame = new BgSaveFrameApiImpl(this.context);
    session = new BgSessionApiImpl(this.context);
    ztab = new BgZTabApiImpl(this.context);
    updateFrame = new BgUpdateFrameApiImpl(this.context);
    vault = new BgVaultApiImpl(this.context);
    trash = new BgTrashApiImpl(this.context);
    user = new BgUserApiImpl(this.context);
    vaultWeb = new BgVaultWebApiImpl(this.context);
    async init() {
        try {
            const isInitialized = Boolean(this.context.apiClient);
            if (isInitialized) {
                return;
            }
            const apiClient = this.context.apiClient = portApi.createApiClient();
            await apiClient.init({ name: VtApiPortNames.BG, checkConnectionBeforeApiCall: true });
        }
        catch (e) {
            logError(e);
        }
    }
}
