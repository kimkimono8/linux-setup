import { BrIdleState } from "../../../components/brApi/service/enum.js";
import { LocalStorageKeys } from "../../service/storage/constants/LocalStorageKeys.js";
import { SessionStorageKeys } from "../../service/storage/constants/SessionStorageKeys.js";
import { VtSettings } from "../../service/vt/constants/VtSettings.js";
import { bg } from "../bg.js";
import { AlarmHandler } from "./AlarmHandler.js";
export class InactivityHandler {
    static instance = null;
    static getInstance() {
        if (!this.instance) {
            this.instance = new InactivityHandler();
        }
        return this.instance;
    }
    init() {
        js.fn.bindThis(this, [this.idleStateChanged, this.checkActivity]);
        brApi.idle.onIdle(this.idleStateChanged);
    }
    async createAlarms() {
        if (brApi.isV2()) {
            return;
        }
        chrome.alarms.create(AlarmHandler.ALARM.PERIODIC_INACTIVITY_ALARM, {
            delayInMinutes: 1,
            periodInMinutes: 1
        });
    }
    async clearAlarms() {
        if (brApi.isV2()) {
            return;
        }
        chrome.alarms.clear(AlarmHandler.ALARM.PERIODIC_INACTIVITY_ALARM);
    }
    async updateLastActive() {
        try {
            await zsessionStorage.save(SessionStorageKeys.LAST_ACTIVE, Date.now());
            await zlocalStorage.save(LocalStorageKeys.LAST_ACTIVE, Date.now());
        }
        catch (e) {
            logError(e);
        }
    }
    async synced() {
        await this.updateLastActive();
        this.checkActivity();
        await this.updateDetectionInterval();
    }
    async checkActivity() {
        if (!bg.initialized) {
            return;
        }
        const unlocked = await bg.vault.isUnlocked();
        if (!unlocked) {
            return;
        }
        const secondsLeft = await this.getRemainingSeconds();
        if (secondsLeft > 60) {
            brApi.alarm.createAlarm(AlarmHandler.ALARM.INACTIVITY_ALARM, secondsLeft);
            return;
        }
        if (globalThis.isDevMode) {
            return;
        }
        bg.vault.lock();
    }
    async updateDetectionInterval() {
        const inactivityTimeout = await zlocalStorage.load(LocalStorageKeys.INACTIVE_TIMEOUT, 30);
        brApi.idle.setDetectionIntervalSeconds(inactivityTimeout * 60);
    }
    async getRemainingSeconds() {
        try {
            const lastActive = await zsessionStorage.load(SessionStorageKeys.LAST_ACTIVE, 0);
            const inactivityTimeout = await zlocalStorage.load(LocalStorageKeys.INACTIVE_TIMEOUT, 30);
            const secondsLeft = (+inactivityTimeout * 60) - js.time.getSecondsPassed(lastActive);
            return secondsLeft;
        }
        catch (e) {
            logError(e);
            return 0;
        }
    }
    idleStateChanged(newState) {
        const STATE = BrIdleState;
        switch (newState) {
            case STATE.ACTIVE:
                this.checkActivity();
                break;
            case STATE.IDLE:
                this.checkActivity();
                break;
            case STATE.LOCKED:
                this.lockOnSystemLock();
                break;
        }
    }
    async lockOnSystemLock() {
        try {
            const lockExtension = await zlocalStorage.load(VtSettings.LOCK_ON_SYSTEM_LOCK, false);
            if (lockExtension) {
                bg.vault.lock();
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
