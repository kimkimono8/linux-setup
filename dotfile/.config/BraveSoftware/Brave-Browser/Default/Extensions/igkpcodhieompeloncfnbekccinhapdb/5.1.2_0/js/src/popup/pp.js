import { setGlobal } from "../../common/global/global.js";
class PP {
    theme = null;
    mainUI = null;
    passwordsUI = null;
    foldersUI = null;
    generatorUI = null;
    bgEventListener = null;
}
export const pp = new PP();
setGlobal("pp", pp);
