export class CSSelectorPositionUtil {
    static getPosition(elem) {
        try {
            const rect = elem.getBoundingClientRect();
            const position = {
                width: rect.width,
                height: rect.height,
            };
            return position;
        }
        catch (e) {
            logError(e);
            return { width: 0, height: 0 };
        }
    }
    static isEqual(p1, p2) {
        try {
            return p1.height == p2.height &&
                p1.width == p2.width;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
