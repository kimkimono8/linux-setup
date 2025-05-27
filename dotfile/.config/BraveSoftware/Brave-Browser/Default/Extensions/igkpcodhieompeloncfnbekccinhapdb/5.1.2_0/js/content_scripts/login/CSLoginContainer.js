import { setGlobal } from "../../common/global/global.js";
import { loginUtil } from "../../src/cs/loginUtil/export.js";
import { _containerFormLogin } from "./container/container.FormLogin.js";
import { _containerUsernameLogin } from "./container/container.UsernameLogin.js";
class CSLoginContainer {
    getPageLoginContainer() {
        try {
            const form = _containerFormLogin.getContainer();
            if (form) {
                return form;
            }
            const passwordInput = csutil.input.getPassword({ visible: true, container: document.body, shadowRoot: false });
            if (passwordInput) {
                return this.getInputLoginContainer(passwordInput);
            }
            const usernameLoginContainer = _containerUsernameLogin.getContainer();
            if (usernameLoginContainer) {
                return usernameLoginContainer;
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getInputLoginContainer(input) {
        return loginUtil.getInputLoginContainer(input);
    }
}
export const csLoginContainer = new CSLoginContainer();
setGlobal("csLoginContainer", csLoginContainer);
