export class BrAlarmApiImpl {
    static getInstance(isV2) {
        return isV2 ? new BrAlarmApiImplV2() : new BrAlarmApiImpl();
    }
    async createAlarm(alarmName, delaySeconds, removePrevious = true) {
        if (removePrevious) {
            await this.clearAlarm(alarmName);
        }
        chrome.alarms.create(alarmName, { when: Date.now() + (delaySeconds * 1000) });
    }
    async clearAlarm(alarmName) {
        await chrome.alarms.clear(alarmName);
    }
    async clearAll() {
        await chrome.alarms.clearAll();
    }
    listenAlarms(listener) {
        chrome.alarms.onAlarm.addListener(listener);
    }
}
class BrAlarmApiImplV2 {
    listeners = [];
    timeoutIds = {};
    constructor() {
        this.handleAlarm = this.handleAlarm.bind(this);
    }
    async createAlarm(alarmName, delaySeconds, removePrevious = true) {
        if (removePrevious) {
            clearTimeout(this.timeoutIds[alarmName]);
        }
        this.timeoutIds[alarmName] = setTimeout(this.handleAlarm, delaySeconds * 1000, alarmName);
    }
    async clearAlarm(alarmName) {
        clearTimeout(this.timeoutIds[alarmName]);
    }
    async clearAll() {
        for (let key in this.timeoutIds) {
            clearTimeout(this.timeoutIds[key]);
        }
    }
    listenAlarms(listener) {
        this.listeners.push(listener);
    }
    handleAlarm(alarmName) {
        this.listeners.forEach(x => x({ name: alarmName }));
    }
}
