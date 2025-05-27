import { DomainHandlerImpl } from "./DomainHandler.js";
export let domainHandler = null;
export function initContext() {
    domainHandler = new DomainHandlerImpl();
}
