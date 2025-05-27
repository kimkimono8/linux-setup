import { LogoGetter } from "./LogoGetter.js";
import { LogoUpdater } from "./LogoUpdater.js";
import { SecretLogoAdder } from "./SecretLogoAdder.js";
class Context {
    logoGetter;
    logoUpdater;
    secretLogoAdder;
    init() {
        this.logoGetter = new LogoGetter();
        this.logoUpdater = new LogoUpdater();
        this.secretLogoAdder = new SecretLogoAdder();
    }
}
export const context = new Context();
