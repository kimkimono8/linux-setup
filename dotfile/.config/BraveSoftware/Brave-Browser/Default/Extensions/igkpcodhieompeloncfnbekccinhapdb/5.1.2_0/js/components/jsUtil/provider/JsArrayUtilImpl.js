import { ErrorCode } from "../service/constants/ErrorCode.js";
export class JsArrayUtilImpl {
    trueFilter(a) {
        return Boolean(a);
    }
    concat(...arrays) {
        return [].concat(...arrays);
    }
    removeElem(a, elem) {
        try {
            if (!a || elem == null) {
                throw ErrorCode.INVALID_INPUT;
            }
            const index = a.indexOf(elem);
            this.removeElemAt(a, index);
        }
        catch (e) {
            logError(e);
            throw e;
        }
    }
    removeElemAt(a, index) {
        try {
            if (!a ||
                !Number.isFinite(index)) {
                throw ErrorCode.INVALID_INPUT;
            }
            if (!this.isValidArrayIndex(a, index)) {
                return;
            }
            a.splice(index, 1);
        }
        catch (e) {
            logError(e);
            throw e;
        }
    }
    removeFirstMatch(a, matchCondition) {
        try {
            if (!a || !matchCondition) {
                throw ErrorCode.INVALID_INPUT;
            }
            const elemIndex = a.findIndex(x => matchCondition(x));
            this.removeElemAt(a, elemIndex);
        }
        catch (e) {
            logError(e);
            throw e;
        }
    }
    toArray(iterable) {
        try {
            if (!iterable) {
                throw ErrorCode.INVALID_INPUT;
            }
            return Array.from(iterable);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    addUnique(a, elem) {
        if (!a.includes(elem)) {
            a.push(elem);
        }
    }
    appendUnique(a, elem) {
        const lastElem = a.length && a[a.length - 1];
        if (lastElem != elem) {
            a.push(elem);
        }
    }
    addHistory(a, elem, limit) {
        this.removeElem(a, elem);
        a.push(elem);
        if (a.length > limit) {
            a.splice(0, a.length - limit);
        }
    }
    getPage(collection, pageNo, rowsPerPage) {
        if (rowsPerPage == -1) {
            return collection;
        }
        const pageStart = pageNo * rowsPerPage;
        const pageEnd = pageStart + rowsPerPage;
        return collection.slice(pageStart, pageEnd);
    }
    sliceAfter(a, elem) {
        try {
            const index = a.findIndex(x => x == elem);
            if (index == -1) {
                return [];
            }
            return a.slice(index + 1);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    *iterate(a, param) {
        try {
            const inc = param.inc ?? 1;
            const exclusiveEnd = param.exclusiveEnd ?? (inc > 0 ? a.length : -1);
            for (let i = param.from; i != exclusiveEnd; i += inc) {
                yield a[i];
            }
        }
        catch (e) {
            logError(e);
            throw e;
        }
    }
    getUnique(a) {
        try {
            const existing = new Set();
            const ans = [];
            for (let x of a) {
                if (existing.has(x)) {
                    continue;
                }
                ans.push(x);
                existing.add(x);
            }
            return ans;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    getUniqueObjList(a, idProvider) {
        try {
            const existing = new Set();
            const ans = [];
            for (let x of a) {
                if (existing.has(idProvider(x))) {
                    continue;
                }
                ans.push(x);
                existing.add(idProvider(x));
            }
            return ans;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    findMaxIndex(a) {
        try {
            if (a.length == 0) {
                return -1;
            }
            let maxIndex = 0;
            let max = a[0];
            for (let i = 1; i < a.length; i++) {
                if (a[i] > max) {
                    maxIndex = i;
                    max = a[i];
                }
            }
            return maxIndex;
        }
        catch (e) {
            logError(e);
            return -1;
        }
    }
    isValidArrayIndex(a, index) {
        try {
            return index >= 0 && index < a?.length;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
