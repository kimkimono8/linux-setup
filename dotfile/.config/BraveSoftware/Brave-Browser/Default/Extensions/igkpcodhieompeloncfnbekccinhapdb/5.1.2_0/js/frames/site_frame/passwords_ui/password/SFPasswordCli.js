import { TabStorageKeys } from "../../../../src/service/storage/constants/TabStorageKeys.js";
export class SFPasswordCli {
    static instance = null;
    constructor() { }
    static get inst() {
        return this.instance || (this.instance = new SFPasswordCli());
    }
    async getActiveFrameId() {
        return ztabStorage.load(TabStorageKeys.ACTIVE_FRAME_ID, 0);
    }
    async login(secretId) {
        await bgApi.siteFrame.frameLogin(secretId, await this.getActiveFrameId());
    }
    async fill(secretId) {
        await bgApi.siteFrame.fillSecret(secretId, await this.getActiveFrameId());
    }
    async fillField(secretId, fieldName) {
        await bgApi.siteFrame.fillField(secretId, fieldName, await this.getActiveFrameId());
    }
    async fillTotp(secretId) {
        await bgApi.siteFrame.fillTotp(secretId, await this.getActiveFrameId());
    }
    async fillOneAuthTotp(secretId, oneauthId) {
        await bgApi.siteFrame.fillOneAuthTotp(secretId, oneauthId, await this.getActiveFrameId());
    }
    async fillCustomField(secretId, fieldName) {
        await bgApi.siteFrame.fillCustomCol(secretId, fieldName, await this.getActiveFrameId());
    }
    async changeAutologin(secretId, enable) {
        return bgApi.secret.edit.setAutoLogin(secretId, enable);
    }
}
