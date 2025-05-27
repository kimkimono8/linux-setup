import { zcrypt } from "../../common/components/zcrypt.js";
import { secretUtil } from "../../common/util/vault/secretUtil.js";
export class PasswordsUIUtil {
    updateFavouriteElem(elem, isFavourite) {
        const icon = js.selector.selectFrom(elem, "i[data-favourite_icon]");
        if (!isFavourite) {
            icon.className = "icon-star-1 text-default";
            icon.dataset.tooltip_content = "i18n:mark_favourite";
            return;
        }
        icon.className = "icon-star text-warning";
        icon.dataset.tooltip_content = "i18n:unmark_favourite";
    }
    getSecretId(event) {
        return js.selector.closest(event.target, "[data-secret_id]").dataset.secret_id;
    }
    addLogoElem(elem, secret) {
        try {
            const noLogoElem = js.selector.selectFrom(elem, "[data-no_logo]");
            const logoElem = js.selector.selectFrom(elem, "[data-logo]");
            if (secret.logo || secret.domain_logo) {
                noLogoElem.remove();
                logoElem.style.backgroundImage = secret.logo ? secretUtil.getLogoStyleSrc(secret.logo) :
                    secretUtil.getLogoStyleSrc(secret.domain_logo);
                return;
            }
            logoElem.remove();
            noLogoElem.textContent = secretUtil.getFirst2Chars(secret.name);
            noLogoElem.style.background = secretUtil.getLogoColor(secret.created_on, secret.name);
        }
        catch (e) {
            logError(e);
        }
    }
    async downloadFile(secret_id, file_id) {
        const respFileInfo = await bgApi.secret.file.download(secret_id, file_id);
        const encodedContent = await zcrypt.fileDecrypt(respFileInfo.data, respFileInfo.isShared == "YES");
        const fileType = encodedContent.slice(encodedContent.indexOf(":") + 1, encodedContent.indexOf(";"));
        const encodedFileContent = encodedContent.slice(encodedContent.indexOf(",") + 1);
        if (js.browser.isSafari()) {
            bgApi.tab.downloadFileInCS({ base64Data: encodedFileContent, type: fileType, name: respFileInfo.name });
            return;
        }
        const fileContent = atob(encodedFileContent);
        const fileInfo = {
            name: respFileInfo.name,
            type: fileType,
            content: fileContent
        };
        const a = new Array(fileContent.length);
        for (let i = 0; i < a.length; i++) {
            a[i] = fileContent.charCodeAt(i) & 0xFF;
        }
        const blob = new Blob([new Uint8Array(a).buffer], { type: fileInfo.type });
        saveAs(blob, fileInfo.name);
    }
}
