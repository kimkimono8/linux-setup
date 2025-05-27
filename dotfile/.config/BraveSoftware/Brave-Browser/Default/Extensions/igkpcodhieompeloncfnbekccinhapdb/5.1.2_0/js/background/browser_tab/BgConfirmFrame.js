import { bg } from "../../src/bg/bg.js";
export class BgConfirmFrame {
    async allowPermanent(secretId, allowedDomain) {
        try {
            const editUIInput = await bg.vaultSecrets.secretEdit.getEditUIInput(secretId);
            const urls = editUIInput.urls;
            const allowedUrl = "https://" + allowedDomain;
            urls.push(allowedUrl);
            const input = {
                secretId,
                name: editUIInput.name,
                logo: editUIInput.logo,
                policyId: editUIInput.policyId,
                classification: editUIInput.classification,
                plainSecretData: editUIInput.plainSecretData,
                totpUrl: editUIInput.totpUrl,
                notes: editUIInput.notes,
                urls,
                tags: editUIInput.tags,
                files: [],
                deletedFiles: [],
                description: editUIInput.description,
                customColumns: editUIInput.customColumns,
                oneauth_id: editUIInput.oneauthId
            };
            await bg.vaultSecrets.secretEdit.updatePassword(input);
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
