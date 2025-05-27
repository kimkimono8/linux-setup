import { setGlobal } from "../common/global/global.js";
class ZT {
    theme = null;
    bgEventListener = null;
    taskHandler = null;
    mainUI = null;
    passwordsOldUI = null;
    passwordsUI = null;
    foldersUI = null;
    trashUI = null;
    generatorUI = null;
}
export const zt = new ZT();
setGlobal("zt", zt);
