import { zt } from "../../../ztab/zt.js";
import { AlertUI } from "../../common/common.js";
import { VI18N } from "../../service/vt/VI18n.js";
import { settingsTab } from "./Context.js";
export class NeverSaveElem {
    template;
    init() {
        this.template = js.selector.select("#never_save_domain_template");
    }
    initList() {
        try {
            const neverSaveDomains = settingsTab.data.neverSaveDomains;
            if (neverSaveDomains.length == 0) {
                settingsTab.elem.neverSaveContainer.remove();
                return;
            }
            const domFragment = document.createDocumentFragment();
            for (let domain of neverSaveDomains) {
                domFragment.append(this.createNeverSaveListElem(domain));
            }
            js.dom.setContent(settingsTab.elem.neverSaveList, domFragment);
            UIUtil.addSlimScroll(settingsTab.elem.neverSaveList.parentElement);
        }
        catch (e) {
            logError(e);
        }
    }
    createNeverSaveListElem(domain) {
        const elem = UIUtil.createElem({ template: this.template });
        js.dom.setChildText(elem, "[data-content]", domain);
        js.selector.selectFrom(elem, ".icon-delete").addEventListener("click", () => this.deleteNeverSaveDomain(domain, elem));
        return elem;
    }
    async deleteNeverSaveDomain(domain, elem) {
        try {
            try {
                const confirmed = await AlertUI.inst.createAlert()
                    .title(i18n(VI18N.DELETE_DOMAIN_FROM_LIST, domain))
                    .text(i18n(VI18N.DELETE_DOMAIN_FROM_LIST_DESCRIPTION, domain))
                    .addButton("confirm", AlertUI.inst.createButton().text(i18n(VI18N.DELETE)).value(true).build())
                    .addButton("cancel", AlertUI.inst.createButton().text(i18n(VI18N.CANCEL)).value(false).build())
                    .dangerMode(true)
                    .show();
                if (!confirmed) {
                    return;
                }
                zt.mainUI.showDotLoading();
                await bgApi.settings.neverSave.remove(domain);
                zt.mainUI.hideDotLoading();
                elem.remove();
                VUI.notification.showSuccess(i18n(VI18N.RESOURCE_REMOVED_SUCCESSFULLY, domain), 2);
            }
            catch (e) {
                logError(e);
                VUI.notification.showError(e);
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
