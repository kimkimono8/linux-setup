export class Message {
    serialize() {
        return JSON.stringify(this);
    }
    static parse(msg) {
        return JSON.parse(msg);
    }
    sendTo(endpoint) {
        const customEvent = new CustomEvent(endpoint, { detail: this.serialize() });
        document.dispatchEvent(customEvent);
    }
}
