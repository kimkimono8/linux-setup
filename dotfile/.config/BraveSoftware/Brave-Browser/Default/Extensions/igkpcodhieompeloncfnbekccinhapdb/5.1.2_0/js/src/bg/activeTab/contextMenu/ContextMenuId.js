export class ContextMenuId {
    separator = ";";
    create(action, ...args) {
        return action + this.separator + args.join(this.separator);
    }
    createFrom(actionArgs) {
        return actionArgs.join(this.separator);
    }
    parse(idString) {
        try {
            return idString.split(this.separator);
        }
        catch (e) {
            logError(e);
            return [""];
        }
    }
}
