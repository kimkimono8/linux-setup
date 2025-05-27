import { TotpGenerator } from "./TotpGenerator.js";
class Context {
    totpGenerator;
    init() {
        this.totpGenerator = new TotpGenerator();
    }
}
export const context = new Context();
