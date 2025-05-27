import { NewPassPageCheckerProvider } from "./page/NewPassPageChecker.js";
export class CSPageUtilImpl {
    isPasswordChangePage() {
        return NewPassPageCheckerProvider.isPasswordChangePage();
    }
}
