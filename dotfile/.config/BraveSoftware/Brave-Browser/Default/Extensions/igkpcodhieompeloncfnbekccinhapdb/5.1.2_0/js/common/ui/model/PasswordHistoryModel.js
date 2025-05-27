import { PasswordHistoryModel } from "../../../src/service/bgApi/types.js";
export class PasswordHistoryModelBuilder {
    history = new PasswordHistoryModel();
    setColumnName(name) {
        this.history.columnName = name;
        return this;
    }
    setColumnLabel(label) {
        this.history.columnLabel = label;
        return this;
    }
    setType(type) {
        this.history.type = type;
        return this;
    }
    addHistory(value, modifiedTime) {
        this.history.history.push({ value, modifiedTime });
        return this;
    }
    build() {
        return this.history;
    }
}
