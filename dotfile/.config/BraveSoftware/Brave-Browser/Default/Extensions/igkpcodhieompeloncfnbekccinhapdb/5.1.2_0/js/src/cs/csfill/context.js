import { Highlighter } from "./Highlighter.js";
import { UserAction } from "./UserAction.js";
export let userAction;
export let highlighter;
export function initContext() {
    userAction = new UserAction();
    highlighter = new Highlighter();
}
