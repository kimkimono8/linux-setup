export class VaultLoadingElemImpl extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.append(UIUtil.createElem({ template: "#vault_loading_template" }));
    }
}
