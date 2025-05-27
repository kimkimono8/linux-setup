import { extCrypto, accountDb } from "../../Context.js";
import { MapTableKey } from "../../service/db/enum/MapTableKey.js";
export class GeneratorHistoryComponentImpl {
    MAX_ENTRIES = 20;
    async add(password) {
        try {
            if (!password) {
                return;
            }
            const entry = {
                encryptedPassword: await extCrypto.encrypt(password),
                time: Date.now()
            };
            const existing = await this.getExisting();
            const lastPassword = await this.getLastPassword(existing);
            const alreadyAdded = lastPassword == password;
            if (alreadyAdded) {
                return;
            }
            existing.push(entry);
            const history = existing.slice(-this.MAX_ENTRIES + 1);
            await accountDb.mapTable.save(MapTableKey.GENERATOR_HISTORY, history);
        }
        catch (e) {
            logError(e);
        }
    }
    async get() {
        try {
            const history = await this.getExisting();
            const decryptedHistory = [];
            for (let entry of history) {
                await this.decryptHistoryFn(entry, decryptedHistory);
            }
            return decryptedHistory;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async clean() {
        await accountDb.mapTable.save(MapTableKey.GENERATOR_HISTORY, []);
    }
    async getExisting() {
        return await accountDb.mapTable.load(MapTableKey.GENERATOR_HISTORY, []);
    }
    async getLastPassword(historyList) {
        try {
            if (!historyList.length) {
                return "";
            }
            const lastIndex = historyList.length - 1;
            if (historyList[lastIndex].encryptedPassword) {
                return await extCrypto.decrypt(historyList[lastIndex].encryptedPassword);
            }
            if (historyList[lastIndex].encrypted_password) {
                return await bg.zcrypt.decrypt(historyList[lastIndex].encrypted_password, false);
            }
            throw "INVALID_STATE";
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async decryptHistoryFn(history, output) {
        try {
            if (history.encrypted_password) {
                output.push({
                    password: await bg.zcrypt.decrypt(history.encrypted_password, false),
                    time: history.time
                });
                return;
            }
            if (!history.encryptedPassword) {
                throw "INVALID_STATE";
            }
        }
        catch (e) {
            logError(e);
            return;
        }
        try {
            const password = await extCrypto.decrypt(history.encryptedPassword);
            if (!password) {
                return;
            }
            output.push({
                password,
                time: history.time
            });
        }
        catch (e) {
            if (e instanceof DOMException) {
                await this.clean();
                console.info(e);
                return;
            }
            logError(e);
        }
    }
}
