import { SessionStorageKeys } from "../../service/storage/constants/SessionStorageKeys.js";
var PostUnlockTaskType;
(function (PostUnlockTaskType) {
    PostUnlockTaskType["LOGIN"] = "LOGIN";
})(PostUnlockTaskType || (PostUnlockTaskType = {}));
export class PostUnlockTaskHandlerImpl {
    async loginAfterUnlock(input) {
        try {
            const task = {
                type: PostUnlockTaskType.LOGIN,
                data: input
            };
            await zsessionStorage.save(SessionStorageKeys.POST_UNLOCK_TASK, task);
        }
        catch (e) {
            logError(e);
        }
    }
    async executePostUnlockTask() {
        try {
            const task = await zsessionStorage.load(SessionStorageKeys.POST_UNLOCK_TASK, {});
            switch (task.type) {
                case PostUnlockTaskType.LOGIN:
                    await bg.vaultSecrets.secretLogin.login(task.data);
                    return;
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
