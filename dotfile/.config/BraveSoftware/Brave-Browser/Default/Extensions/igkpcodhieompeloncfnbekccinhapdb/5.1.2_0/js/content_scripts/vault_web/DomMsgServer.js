class DomRequest {
    id = 0;
    fn_name = "";
    args = [];
}
class DomReply {
    id = 0;
    error = "";
    ret_val = null;
}
export class DomMsgServer {
    name = "";
    init() {
        document.addEventListener(this.name + ".req", event => this.handleRequest(event.detail));
    }
    async handleRequest(reqString) {
        try {
            const reqObj = JSON.parse(reqString);
            const reply_obj = new DomReply();
            reply_obj.id = reqObj.id;
            try {
                const fn = this[reqObj.fn_name];
                if (!fn) {
                    throw reqObj.fn_name + " not found...";
                }
                reply_obj.ret_val = await fn.apply(this, reqObj.args);
            }
            catch (e) {
                reply_obj.error = "" + e;
                logError(e);
            }
            this.dispatchReply(reply_obj);
        }
        catch (e) {
            logError(e);
        }
    }
    dispatchReply(replyObj = null) {
        const customEvent = new CustomEvent(this.name + ".reply", { detail: JSON.stringify(replyObj) });
        document.dispatchEvent(customEvent);
    }
}
