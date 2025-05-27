import { VI18N } from "../../service/vt/VI18n.js";
class _AlertBuilder {
    params = {};
    text(text) {
        this.params.text = text;
        return this;
    }
    title(title) {
        this.params.title = title;
        return this;
    }
    icon(icon) {
        this.params.icon = icon;
        return this;
    }
    button(button) {
        this.params.button = button;
        return this;
    }
    buttons(buttons) {
        this.params.buttons = buttons;
        return this;
    }
    addButton(name, button) {
        if (!this.params.buttons) {
            this.params.buttons = {};
        }
        this.params.buttons[name] = button;
        return this;
    }
    content(contentElem) {
        this.params.content = contentElem;
        return this;
    }
    className(className) {
        this.params.className = className;
        return this;
    }
    dangerMode(dangerMode) {
        this.params.dangerMode = dangerMode;
        return this;
    }
    async show() {
        return sweetAlert(this.params);
    }
}
class _ButtonBuilder {
    obj = {
        text: "",
        value: true,
        visible: true,
        className: "",
        closeModal: true
    };
    text(text) {
        this.obj.text = text;
        return this;
    }
    value(value) {
        this.obj.value = value;
        return this;
    }
    className(className) {
        this.obj.className = className;
        return this;
    }
    build() {
        return this.obj;
    }
}
export class _AlertUI {
    static instance = null;
    static get inst() {
        return this.instance || (this.instance = new _AlertUI());
    }
    createAlert() {
        return new _AlertBuilder();
    }
    createButton() {
        return new _ButtonBuilder();
    }
    async confirmDelete(title, deleteButtonText, canelButtonText = i18n(VI18N.CANCEL)) {
        try {
            return await new _AlertBuilder()
                .title(title)
                .buttons({
                confirm: {
                    text: deleteButtonText,
                    value: true,
                },
                cancel: {
                    text: canelButtonText,
                    value: false,
                    visible: true,
                }
            })
                .dangerMode(true)
                .show();
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
