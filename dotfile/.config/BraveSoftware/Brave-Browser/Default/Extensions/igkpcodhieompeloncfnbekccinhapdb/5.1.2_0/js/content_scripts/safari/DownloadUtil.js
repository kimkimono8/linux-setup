export class DownloadUtil {
    async saveFile(data) {
        const fileContent = atob(data.base64Data);
        const fileInfo = {
            name: data.name,
            type: data.type,
            content: fileContent
        };
        const a = new Array(fileContent.length);
        for (let i = 0; i < a.length; i++) {
            a[i] = fileContent.charCodeAt(i) & 0xFF;
        }
        const blob = new Blob([new Uint8Array(a).buffer], { type: fileInfo.type });
        await saveAs(blob, fileInfo.name);
        setTimeout(function () { window.close(); }, 500);
    }
}
