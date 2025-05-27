import { UIElemContainer } from "../../../uiUtil/export.js";
import { settingsTab } from "../Context.js";
export class DomainContainer extends UIElemContainer {
    SELECTED_CSS = "domain-matching-list-selected";
    schemeElem;
    subdomainElem;
    portElem;
    pathElem;
    init() {
        this.container = settingsTab.elem.select("#domainContainer");
        this.schemeElem = this.select("[data-scheme]");
        this.subdomainElem = this.select("[data-subdomain]");
        this.portElem = this.select("[data-port]");
        this.pathElem = this.select("[data-path]");
        this.initData();
    }
    initData() {
        const domainMatch = settingsTab.data.domainMatch;
        this.highlight(this.schemeElem, domainMatch.scheme);
        this.highlight(this.subdomainElem, domainMatch.subDomain);
        this.highlight(this.portElem, domainMatch.port);
        this.highlight(this.pathElem, domainMatch.path);
    }
    highlight(elem, highlight) {
        elem.parentElement.className = highlight ? this.SELECTED_CSS : "";
    }
}
