import { InputType } from "../../../service/vt/constants/InputType.js";
import { ActiveInputObserver } from "./input/ActiveInputObserver.js";
import { CSInputFilterImpl } from "./input/CSInputFilter.js";
import { InputTypeProvider } from "./input/InputTypeProvider.js";
import { PasswordToTextObserver } from "./input/PasswordToTextObserver.js";
export class CSInputUtilImpl {
    typeProvider = new InputTypeProvider();
    activeInputObserver = new ActiveInputObserver();
    filter = new CSInputFilterImpl();
    constructor() {
        this.waitForVisibleInput = js.fn.wrapper.createSingleInstance(this.waitForVisibleInput, this);
        this.waitForPasswordDisappear = js.fn.wrapper.createSingleInstance(this.waitForPasswordDisappear, this);
    }
    async init() {
        try {
            this.activeInputObserver.init();
            await this.typeProvider.init();
        }
        catch (e) {
            logError(e);
        }
    }
    listenPasswordToText(x) {
        new PasswordToTextObserver(x).init();
    }
    typeOf(input) {
        return this.typeProvider.typeOf(input);
    }
    getActiveInput() {
        return this.activeInputObserver.getActiveInput();
    }
    isCaptcha(elem) {
        return csutil.dom.hasAttribute({ elem, key: "captcha" });
    }
    select(params) {
        try {
            const inputs = this.selectAll(params);
            return inputs.length > 0 ? inputs[0] : null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    selectAll(params) {
        try {
            const inputs = csutil.selector.selectAll("input", { container: params.container, visible: params.visible, shadowRoot: params.shadowRoot });
            const reqTypeInputs = this.filterInputType(inputs, params);
            const editableInputs = this.filterEditable(reqTypeInputs, params);
            return editableInputs;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async waitForVisibleInput(params) {
        try {
            await js.dom.waitDomLoad();
            const selectParams = {
                visible: true,
                types: [InputType.TEXT, InputType.PASSWORD, InputType.EMAIL, InputType.TEL, InputType.NUMBER],
                shadowRoot: params.shadowRoot,
            };
            const maxWaitSecs = params.maxWaitSecs ?? 15;
            for (let _ of js.loop.range(maxWaitSecs)) {
                if (this.select(selectParams)) {
                    return true;
                }
                await js.time.delay(1);
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async waitForPasswordDisappear(param) {
        try {
            await js.dom.waitDomLoad();
            const selectParams = {
                visible: true,
                types: [InputType.PASSWORD],
                shadowRoot: param.shadowRoot,
            };
            const maxWaitSecs = param.maxWaitSecs ?? 15;
            for (let _ of js.loop.range(maxWaitSecs)) {
                if (!this.select(selectParams)) {
                    return;
                }
                await js.time.delay(1);
            }
        }
        catch (e) {
            logError(e);
            return;
        }
    }
    getPasswords(params) {
        try {
            const selectParams = {
                container: params.container,
                visible: params.visible,
                types: [InputType.PASSWORD],
                shadowRoot: params.shadowRoot,
                editable: params.editable,
            };
            return this.selectAll(selectParams);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    getPassword(params) {
        try {
            const selectParams = {
                container: params.container,
                visible: params.visible,
                types: [InputType.PASSWORD],
                shadowRoot: params.shadowRoot,
                editable: params.editable,
            };
            return this.select(selectParams);
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getUsernames(params) {
        try {
            return this.selectAll({
                container: params.container,
                visible: params.visible,
                types: [InputType.TEXT, InputType.EMAIL],
                shadowRoot: params.shadowRoot,
                editable: params.editable,
            });
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    getUsername(params) {
        try {
            return this.select({
                container: params.container,
                types: [InputType.TEXT, InputType.EMAIL],
                visible: params.visible,
                shadowRoot: params.shadowRoot,
                editable: params.editable,
            });
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    checkIsRightToLeft(input) {
        try {
            const RIGHT_TO_LEFT = "rtl";
            const direction = window.getComputedStyle(input).direction;
            return direction == RIGHT_TO_LEFT;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    isValidTextPassword(input) {
        try {
            return input.type == InputType.PASSWORD || this.filter.usernameFilter(input);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    isValidTextPasswordNumber(input) {
        try {
            return [InputType.PASSWORD, InputType.TEL, InputType.NUMBER].includes(input.type) || this.filter.usernameFilter(input);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    filterInputType(inputs, params) {
        try {
            const filter = this.getTypeFilter(params);
            return inputs.filter(filter);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    getTypeFilter(params) {
        try {
            if (!params.types.includes(InputType.TEXT)) {
                return this.filter.newTypeFilter(params.types);
            }
            if (params.types.length == 1) {
                return this.filter.usernameFilter;
            }
            const nonTextTypes = params.types.filter(x => x != InputType.TEXT);
            return this.filter.or(this.filter.usernameFilter, this.filter.newTypeFilter(nonTextTypes));
        }
        catch (e) {
            logError(e);
            return () => true;
        }
    }
    filterEditable(inputs, params) {
        try {
            if (!params.editable) {
                return inputs;
            }
            return inputs.filter(this.filter.editableFilter);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
