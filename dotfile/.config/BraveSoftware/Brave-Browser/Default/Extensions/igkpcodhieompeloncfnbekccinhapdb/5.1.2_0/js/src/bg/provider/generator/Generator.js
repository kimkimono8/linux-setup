import { GeneratorHistoryComponentImpl } from "./GeneratorHistory.js";
import { PassphraseGeneratorImpl } from "./PassphraseGenerator.js";
import { PasswordGeneratorImpl } from "./PasswordGenerator.js";
export class GeneratorImpl {
    password = new PasswordGeneratorImpl();
    passphrase = new PassphraseGeneratorImpl();
    history = new GeneratorHistoryComponentImpl();
}
