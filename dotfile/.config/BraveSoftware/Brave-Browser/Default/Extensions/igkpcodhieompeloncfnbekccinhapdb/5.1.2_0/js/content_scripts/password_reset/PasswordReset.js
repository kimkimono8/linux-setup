import { csframe } from "../../src/cs/csframe/export.js";
import { PasswordResetInfo } from "../../src/service/bgApi/types.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
import { cs } from "../cs.js";
import { resetUIApi } from "./ResetUIApi.js";
export class PasswordReset {
    resetData = null;
    async init() {
        if (!csutil.window.isTopFrame()) {
            return;
        }
        resetUIApi.init();
        this.resetPassword = js.fn.wrapper.createSingleInstance(this.resetPassword, this);
        await this.resetPassword();
    }
    async resetPassword() {
        try {
            await js.dom.waitDomLoad();
            this.resetData = await ztabStorage.load(TabStorageKeys.RESET_DATA, null);
            if (!this.resetData) {
                return;
            }
            const expired = this.resetData.expiresIn < Date.now();
            if (expired) {
                this.finishReset(false);
                return;
            }
            if (this.resetData.currentStepIndex == 0) {
                csframe.resetFrame.show();
            }
            this.updateProgressUI();
            cs.sitePasswordChangeObserver.disableSave();
            cs.loginPasswordChangeHandler.disableSave();
            const resetClient = new PasswordResetClient();
            let step;
            while (this.resetData.currentStepIndex < this.resetData.steps.length) {
                step = this.resetData.steps[this.resetData.currentStepIndex];
                await resetClient.execute(step.id_func, this.getArguments(step.id_value));
                this.resetData.currentStepIndex++;
                await this.saveProgress();
                if (resetClient.inWaitForever) {
                    return;
                }
            }
            this.finishReset(true);
        }
        catch (e) {
            logError(e);
            this.finishReset(false);
        }
    }
    async finishReset(successfull) {
        try {
            const finalProgress = successfull ? 100 : -1;
            resetUIApi.updateProgress(finalProgress);
            bgApi.tab.finishReset(successfull);
        }
        catch (e) {
            logError(e);
        }
    }
    getArguments(argumentString) {
        let argumentArray = JSON.parse(argumentString);
        let y = (s) => this.resetData[s.slice(1)];
        return argumentArray.map(x => typeof (x) == "string" && x[0] == '$' ? y(x) : x);
    }
    async saveProgress() {
        try {
            this.resetData.expiresIn = Date.now() + PasswordResetInfo.MAX_WAIT_TIME_MS;
            await ztabStorage.save(TabStorageKeys.RESET_DATA, this.resetData);
            this.updateProgressUI();
        }
        catch (e) {
            logError(e);
        }
    }
    updateProgressUI() {
        try {
            const INC = (0.20 * this.resetData.steps.length) >> 0;
            const current = this.resetData.currentStepIndex + INC;
            const total = this.resetData.steps.length + INC;
            const progress = ((current / total) * 100) >> 0;
            resetUIApi.updateProgress(progress);
        }
        catch (e) {
            logError(e);
        }
    }
}
class PasswordResetClient {
    inWaitForever = false;
    async execute(fn, args) {
        await this.waitForMutations(1, 0.5);
        const result = await this[fn].apply(this, args);
        return result;
    }
    async ifPathPath(pathToCheck, ifPath, elsePath) {
        let currentPath = this.getCurrentPath();
        if (pathToCheck == currentPath) {
            return await this.goToPath(ifPath);
        }
        if (typeof (elsePath) == "undefined") {
            return true;
        }
        await this.goToPath(elsePath);
        return false;
    }
    async ifPresentClick(ifSelector, ifClickSelector, elseClickSelector) {
        ifClickSelector = ifClickSelector || ifSelector;
        if (document.querySelector(ifSelector)) {
            return await this.clickElement(ifClickSelector);
        }
        if (typeof (elseClickSelector) != "undefined") {
            return await this.clickElement(elseClickSelector);
        }
        return true;
    }
    async ifPresentFill(ifSelector, selector, value) {
        if (document.querySelector(ifSelector)) {
            return await this.fillInput(selector, value);
        }
        return true;
    }
    async ifPresentClickNth(ifSelector, ifClickSelector, ifN, elseClickSelector, elseN) {
        if (document.querySelector(ifSelector)) {
            return await this.clickElementNth(ifClickSelector, ifN);
        }
        if (typeof (elseClickSelector) != "undefined") {
            return await this.clickElementNth(elseClickSelector, elseN);
        }
        return true;
    }
    async ifPathClick(path, ifSelector, elseSelector) {
        let currentPath = this.getCurrentPath();
        if (currentPath == path) {
            return await this.clickElement(ifSelector);
        }
        if (typeof (elseSelector) != "undefined") {
            return await this.clickElement(elseSelector);
        }
        return true;
    }
    getCurrentPath() {
        let path = window.location.pathname;
        if (path == "/") {
            return "/";
        }
        return path.endsWith("/") ? path.slice(0, path.length - 1) : path;
    }
    async goToPath(path) {
        this.inWaitForever = true;
        window.location.href = path;
        this.waitForever();
        return true;
    }
    async goToHash(hash) {
        window.location.hash = hash;
        return true;
    }
    waitForever() {
        return new Promise(js.fn.emptyFn);
    }
    async fillInput(selectorString, value) {
        await this.waitForElement(selectorString);
        this.fillValue(document.querySelector(selectorString), value);
        return true;
    }
    fillValue(inputElement, value) {
        inputElement.focus();
        inputElement.click();
        this.createInputEvents(inputElement);
        inputElement.value = "";
        inputElement.value = value;
        this.createInputEvents(inputElement);
    }
    async waitForElement(selectorString) {
        await new ElementAddObserver(selectorString).waitForElementToAppear();
        return true;
    }
    async waitForNthElement(selectorString, index) {
        await new NthElementAddObserver(selectorString, index);
        return true;
    }
    createInputEvents(element) {
        let fireEvent = function (element, eventName) {
            let event = document.createEvent("HTMLEvents");
            event.initEvent(eventName, true, true);
            return !element.dispatchEvent(event);
        };
        fireEvent(element, "click");
        fireEvent(element, "change");
        fireEvent(element, "input");
    }
    async clickElement(selectorString) {
        await this.waitForElement(selectorString);
        this.clickElementNode(document.querySelector(selectorString));
        return true;
    }
    async clickElementNth(selectorString, index) {
        await this.waitForNthElement(selectorString, index);
        this.clickElementNode(document.querySelectorAll(selectorString)[index]);
        return true;
    }
    clickElementNode(element) {
        element.disabled = false;
        element.click();
    }
    async clickElementChained(...operations) {
        let elementToClick = new ChainedDocumentResult().getChainedResult(operations);
        return this.clickElementNode(elementToClick);
    }
    async fillInputNth(selectorString, index, value) {
        await this.waitForNthElement(selectorString, index);
        this.fillValue(document.querySelectorAll(selectorString)[index], value);
        return true;
    }
    async fillInputChained(value, ...operations) {
        let inputElement = new ChainedDocumentResult().getChainedResult(operations);
        return await this.fillValue(inputElement, value);
    }
    async redirect(...paths) {
        let newPath = paths.pop();
        let currentPath = this.getCurrentPath();
        if (currentPath == newPath) {
            return true;
        }
        if (paths.some(path => currentPath == path)) {
            window.location.pathname = newPath;
        }
        await this.waitForever();
        return false;
    }
    async waitForMutations(initialDelay, timeToWaitInBet) {
        await new MutationFinishWaiter(initialDelay, timeToWaitInBet).waitForMutationFinish();
    }
    async waitForPath(...paths) {
        let currentPath = this.getCurrentPath();
        if (paths.some(path => currentPath == path)) {
            return true;
        }
        await this.waitForever();
        return false;
    }
    async delay(secondsString) {
        await this.waitForNSec(+secondsString);
    }
    waitForNSec(n) {
        return new Promise(resolve => setTimeout(resolve, n * 1000));
    }
    async waitForIframeDomReady(selector) {
        let iframeDocument = document.querySelector(selector).contentDocument;
        let waitPromiseResolve;
        let waitPromise = new Promise(resolve => { waitPromiseResolve = resolve; });
        let checkReadyState = function (resolve) {
            if (iframeDocument.readyState == "complete") {
                resolve();
            }
        };
        iframeDocument.addEventListener("readystatechange", () => checkReadyState(waitPromiseResolve));
        checkReadyState(waitPromiseResolve);
        await waitPromise;
    }
}
class DocumentBodyMutationObserver {
    toBeCalled = false;
    timeoutId = null;
    callBackToCall = null;
    observer = null;
    constructor(callBackToCall) {
        this.callBackToCall = callBackToCall;
        this.initializeMutationObserver();
    }
    initializeMutationObserver() {
        this.observer = new MutationObserver(() => this.handleMutation());
        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    handleMutation() {
        if (this.toBeCalled) {
            return;
        }
        this.toBeCalled = true;
        this.timeoutId = setTimeout(() => {
            this.callBackToCall();
            this.toBeCalled = false;
        }, 1000);
    }
    disconnect() {
        this.observer.disconnect();
        clearTimeout(this.timeoutId);
    }
}
class ElementAddObserver {
    selectorString = "";
    waitPromiseResolve = null;
    toBeChecked = false;
    observer = null;
    constructor(selectorString) {
        this.selectorString = selectorString;
    }
    async waitForElementToAppear() {
        if (this.isElementPresent()) {
            return true;
        }
        let waitPromise = new Promise(resolve => this.waitPromiseResolve = resolve);
        this.observer = new DocumentBodyMutationObserver(() => this.checkElementPresence());
        await waitPromise;
        return false;
    }
    isElementPresent() {
        return document.querySelector(this.selectorString) != null;
    }
    checkElementPresence() {
        if (!this.isElementPresent()) {
            return;
        }
        this.observer.disconnect();
        this.waitPromiseResolve();
    }
}
class NthElementAddObserver {
    index = 0;
    selectorString = "";
    waitPromiseResolve = null;
    toBeChecked = false;
    observer = null;
    constructor(selectorString, index) {
        this.index = index;
        this.selectorString = selectorString;
    }
    async waitForElementToAppear() {
        if (this.isElementPresent()) {
            return true;
        }
        let waitPromise = new Promise(resolve => this.waitPromiseResolve = resolve);
        this.observer = new DocumentBodyMutationObserver(() => this.checkElementPresence());
        await waitPromise;
        return false;
    }
    isElementPresent() {
        return document.querySelectorAll(this.selectorString)[this.index] != null;
    }
    checkElementPresence() {
        if (!this.isElementPresent()) {
            return;
        }
        this.observer.disconnect();
        this.waitPromiseResolve();
    }
}
class MutationFinishWaiter {
    initialDelay = 0;
    timeToWaitInMs = 0;
    waitPromiseResolve = null;
    timeoutId = 0;
    observer = null;
    constructor(initialDelay, timeToWait) {
        this.initialDelay = initialDelay * 1000;
        this.timeToWaitInMs = timeToWait * 1000;
    }
    async waitForMutationFinish() {
        let waitPromise = new Promise(resolve => { this.waitPromiseResolve = resolve; });
        this.timeoutId = setTimeout(() => this.finishWaiting(), this.initialDelay);
        this.initializeMutationObserver();
        await waitPromise;
    }
    startWaitingAgain() {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => this.finishWaiting(), this.timeToWaitInMs);
    }
    finishWaiting() {
        this.observer.disconnect();
        this.waitPromiseResolve();
    }
    initializeMutationObserver() {
        this.observer = new MutationObserver(_mutationRecordArray => this.handleMutation());
        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    handleMutation() {
        this.startWaitingAgain();
    }
}
class ChainedDocumentResult {
    getChainedResult(operations) {
        let ans = document;
        for (let operation of operations) {
            ans = this.getOperationResult(ans, operation);
        }
        return ans;
    }
    getOperationResult(obj, [operationType, value, ...args]) {
        switch (operationType) {
            case "()":
                return obj[value].apply(obj, args);
            case "[]":
                return obj[value];
        }
    }
}
