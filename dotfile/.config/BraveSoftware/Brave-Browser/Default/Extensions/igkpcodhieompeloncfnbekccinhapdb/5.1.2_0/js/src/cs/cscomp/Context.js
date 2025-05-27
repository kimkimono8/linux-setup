import { GeneratedPasswordFiller } from "./GeneratedPasswordFiller.js";
export let generatedPasswordFiller = null;
export function initContext() {
    generatedPasswordFiller = new GeneratedPasswordFiller();
}
