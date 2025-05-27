import { ZTAB_TASK } from "../src/service/bgApi/types/ZTab.js";
import { MainUITabType } from "../src/ztab/main_ui/MainUI.Type.js";
import { PasswordShareController } from "../src/ztab/passwords_ui/share/PasswordShareController.js";
import { zt } from "./zt.js";
export class ZTabTaskHandler {
    task = null;
    async init() {
        await js.dom.waitDomLoad();
        const task = await bgApi.ztab.getZTabTask();
        if (!task) {
            return;
        }
        this.task = task;
    }
    getTab() {
        try {
            if (this.task && this.task.type == ZTAB_TASK.OPEN_SETTINGS) {
                return { type: MainUITabType.SETTINGS };
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async performTask() {
        const task = this.task;
        if (!task) {
            return;
        }
        switch (task.type) {
            case ZTAB_TASK.ADD:
                zt.passwordsOldUI.passwordAddUI.showFilledUI(task.prefillInput);
                break;
            case ZTAB_TASK.ADD_CARD:
                zt.passwordsOldUI.passwordAddUI.showFilledUICard(task.prefillInput);
                break;
            case ZTAB_TASK.ADD_ADDRESS:
                zt.passwordsOldUI.passwordAddUI.showFilledUIAddress();
                break;
            case ZTAB_TASK.EDIT_CARD:
                zt.passwordsOldUI.passwordEditUI.showFilledUICard(task.prefillInput, task.secretId);
                break;
            case ZTAB_TASK.EDIT:
                this.editPassword(task);
                break;
            case ZTAB_TASK.SHARE:
                PasswordShareController.showUI(task.secretId);
                break;
            case ZTAB_TASK.ENABLE_ACCESS_CONTROL:
                zt.passwordsOldUI.accessControlUI.enableAccessControl(task.secretId);
                break;
            case ZTAB_TASK.MANAGE_ACCESS_CONTROL:
                zt.passwordsOldUI.accessControlUI.manageAccessControl(task.secretId);
                break;
            case ZTAB_TASK.REQUEST_ACCESS:
                zt.passwordsOldUI.accessRequestUI.getSecretAccess(task.secretId);
                break;
        }
    }
    editPassword(task) {
        try {
            const hasSecretId = Boolean(task.secretId);
            if (hasSecretId) {
                zt.passwordsOldUI.passwordEditUI.edit(task.secretId);
                return;
            }
            const hasEditInput = Boolean(task.editInput);
            if (hasEditInput) {
                zt.passwordsOldUI.passwordEditUI.editUIInput(task.editInput);
                return;
            }
            throw "not supported";
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
