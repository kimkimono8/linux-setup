import { setGlobal } from "../global/global.js";
class Z_Enum {
    URL_PART = {
        URL: "url",
        HOSTNAME: "hostname",
        PARENT_DOMAIN: "parent_domain",
        HOST: "host"
    };
    DOMAIN_MATCHING_MODE = {
        HOSTNAME: this.URL_PART.HOSTNAME,
        PARENT_DOMAIN: this.URL_PART.PARENT_DOMAIN,
        HOST: this.URL_PART.HOST
    };
    FILTER = {
        ALL: "all",
        DOMAIN_MATCHING: "domain_matching",
        FAVOURITES: "favourite",
        RECENTLY_USED: "recently_used",
        RECENTLY_ADDED: "recently_added",
        PERSONAL: "personal",
        ENTERPRISE: "enterprise",
        SHARED_BY_ME: "shared_by_me",
        SHARED_TO_ME: "shared_to_me",
        UNSHARED: "unshared",
        OWNED_BY_ME: "owned_by_me",
    };
    PLAN = {
        PERSONAL: "Personal",
        STANDARD: "Standard",
        PROFESSIONAL: "Professional",
        ENTERPRISE: "Enterprise"
    };
    ZVFEATURES = {
        ACCESS_CONTROL: "AccessControl"
    };
    FIELD_TYPE = {
        TEXT: "text",
        PASSWORD: "password",
        FILE: "file",
        TEXTAREA: "textarea"
    };
    DEFAULT_CATEGORIES = {
        WEB_ACCOUNT: "Web Account",
        BANK_ACCOUNT: "Bank Account",
        WINDOWS: "Windows",
        UNIX: "Unix",
        PAYMENT_CARD: "Payment Card",
        SOCIAL_SECURITY_NUMBER: "Social Security Number",
        HEALTH_CARE: "Health Care",
        FILE_STORE: "File Store",
        ADDRESS: "Address"
    };
}
export const zenum = new Z_Enum();
setGlobal("zenum", zenum);
