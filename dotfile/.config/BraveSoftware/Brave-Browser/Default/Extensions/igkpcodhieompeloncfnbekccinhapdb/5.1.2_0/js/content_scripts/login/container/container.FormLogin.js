class ContainerFormLogin {
    getContainer() {
        try {
            const forms = csutil.selector.selectAll("form", { shadowRoot: false });
            const loginForms = forms.filter(form => this.isLoginForm(form));
            const visibleForm = loginForms.find(form => csutil.isVisible(form) ||
                csutil.input.getPassword({ visible: true, container: form, shadowRoot: false }));
            return visibleForm || loginForms[0];
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    isLoginForm(form) {
        try {
            if (form.getAttribute("method") && form.getAttribute("method").toLowerCase() == "get") {
                return false;
            }
            const passwordElems = csutil.input.getPasswords({ container: form, shadowRoot: false });
            if (passwordElems.length > 0) {
                return true;
            }
            if (csutil.dom.hasAttribute({ elem: form, key: "search" })) {
                return false;
            }
            if (csutil.login.isLoginUrl(window.location.href) && ([1, 2].includes(csutil.input.getUsernames({ visible: true, container: form, shadowRoot: false }).length)) &&
                !csutil.selector.select("input[type='password']", { shadowRoot: false }) && !form.querySelector("textarea")) {
                return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
export const _containerFormLogin = new ContainerFormLogin();
