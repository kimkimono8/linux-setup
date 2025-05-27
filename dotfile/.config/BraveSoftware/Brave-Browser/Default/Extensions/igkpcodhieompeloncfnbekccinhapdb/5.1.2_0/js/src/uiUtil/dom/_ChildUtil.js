export class _ChildUtil {
    static removeIfPresent(elem, childSelector) {
        try {
            const parentElem = js.selector.select(elem);
            if (!parentElem) {
                throw jserror("PARENT_ELEM_NOT_FOUND: " + elem);
            }
            const childElem = js.selector.selectFrom(parentElem, childSelector);
            if (childElem) {
                childElem.remove();
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
