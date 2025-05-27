export class Util {
    async getResponse(request) {
        return new Promise(function (res, rej) {
            request.onsuccess = () => res(request.result);
            request.onerror = () => rej(request.error);
        });
    }
    async getTransactionPromise(transaction) {
        return new Promise(function (res, rej) {
            transaction.onerror = () => rej(transaction.error);
            transaction.oncomplete = res;
            transaction.abort = () => rej(transaction.error);
        });
    }
}
