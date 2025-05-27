export class JsLogoUtilImpl {
    async getBase64Logo(src) {
        try {
            const img = await this.getImage(src);
            if (!img) {
                return "";
            }
            const SIZE = 35;
            const bitmap = await createImageBitmap(img, { resizeHeight: SIZE, resizeWidth: SIZE, resizeQuality: "high" });
            const canvas = document.createElement("canvas");
            canvas.width = SIZE;
            canvas.height = SIZE;
            const context = canvas.getContext("2d");
            context.drawImage(bitmap, 0, 0);
            bitmap.close();
            img.src = "";
            const logo = canvas.toDataURL("image/png");
            context.clearRect(0, 0, SIZE, SIZE);
            return logo;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async getImage(src) {
        try {
            src = this.getCorrectedSVG(src);
            let resolve, reject;
            const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
            const image = new Image();
            image.crossOrigin = "anonymous";
            image.onload = resolve;
            image.onerror = reject;
            image.src = src;
            await promise;
            return image;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getCorrectedSVG(src = "") {
        if (!src.startsWith("data:image/svg+xml")) {
            return src;
        }
        const encodedImage = src.slice(src.indexOf(",") + 1);
        const svgText = atob(encodedImage);
        if (/<svg.*?width.*?>/.test(svgText)) {
            return src;
        }
        const correctedSvgText = svgText.replace(/(<svg.*?)>/, '$1 width="50" height="50">');
        const correctedEncodedImage = btoa(correctedSvgText);
        const reqSvgImage = "data:image/svg+xml;base64," + correctedEncodedImage;
        return reqSvgImage;
    }
}
