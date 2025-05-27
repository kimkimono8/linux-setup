export class BrI18nApiImpl {
    text(key, ...placeholders) {
        return brI18n(key, placeholders);
    }
    textOf(key, placeholders) {
        return brI18n(key, placeholders);
    }
    html(key, ...contentList) {
        try {
            const placeholders = contentList.map((_x, index) => `{${index}}`);
            const text = this.textOf(key, placeholders);
            const textParts = text.split(/\{\d+\}/);
            const fillOrder = this.getFillOrder(text);
            const fragment = document.createDocumentFragment();
            fragment.append(textParts[0]);
            for (let i = 1, fillI = 0; i < textParts.length; i++) {
                fragment.append(contentList[fillOrder[fillI++]]);
                fragment.append(textParts[i]);
            }
            return fragment;
        }
        catch (e) {
            logError(e);
            return document.createDocumentFragment();
        }
    }
    getFillOrder(s) {
        try {
            const regex = /\{(\d+)\}/g;
            const order = [];
            for (let match of s.matchAll(regex)) {
                order.push(parseInt(match[1]));
            }
            return order;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
function brI18n(key, placeholders) {
    return chrome.i18n.getMessage(key, placeholders) || key;
}
