export class UIElemContainer {
    container;
    select(selector) {
        return js.selector.selectFrom(this.container, selector);
    }
}
