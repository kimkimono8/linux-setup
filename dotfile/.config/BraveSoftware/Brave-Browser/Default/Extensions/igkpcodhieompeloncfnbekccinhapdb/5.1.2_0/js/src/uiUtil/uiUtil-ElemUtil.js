import { Exp_ElemUtilWrapper } from "./uiUtil-ElemUtilWrapper.js";
class ElemUtil {
    getUtilWrapper(elem) {
        return new Exp_ElemUtilWrapper(elem);
    }
}
export const exp_elemUtil = new ElemUtil();
