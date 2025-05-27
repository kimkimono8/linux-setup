import { Badge } from "./Badge.js";
import { BadgeMenuHandler } from "./BadgeMenuHandler.js";
import { ContextMenu } from "./contextMenu/ContextMenu.js";
export let badgeMenuHandler = null;
export let badge = null;
export let contextMenu = null;
export function initContext() {
    badgeMenuHandler = new BadgeMenuHandler();
    badge = new Badge();
    contextMenu = new ContextMenu();
}
