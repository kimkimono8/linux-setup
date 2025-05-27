import { FilterType, PageQuery, PageQueryBuilder, PageQueryResult } from "../types.js";
export class SecretQuery extends PageQuery {
    static ROWS_PER_PAGE = 50;
    static newBuilder() {
        return new SecretQueryBuilder(new SecretQuery());
    }
    constructor() { super(); }
    typeId = "";
    folderId = "";
    includeSecretData = false;
    noLogo = false;
    favourite = false;
    domainMatching = false;
    domainMatchingUrl = "";
    recentlyUsed = false;
    recentlyAdded = false;
    classification = FilterType.ALL;
    sharing = FilterType.ALL;
    orderBy = null;
    owned = false;
    tagMode = FilterType.ALL;
    tags = [];
}
export var SecretQueryOrderBy;
(function (SecretQueryOrderBy) {
    SecretQueryOrderBy["HOST_RECENT"] = "HOST_RECENT";
    SecretQueryOrderBy["DOMAIN_FAVOURITE"] = "DOMAIN_FAVOURITE";
})(SecretQueryOrderBy || (SecretQueryOrderBy = {}));
export class SecretQueryBuilder extends PageQueryBuilder {
    constructor(query) { super(query); }
    typeId(typeId) { this.query.typeId = typeId; return this; }
    folderId(folderId) { this.query.folderId = folderId; return this; }
    noLogo(noLogo) { this.query.noLogo = noLogo; return this; }
    orderByHostRecent() { this.query.orderBy = SecretQueryOrderBy.HOST_RECENT; return this; }
    orderByDomainFavourite() { this.query.orderBy = SecretQueryOrderBy.DOMAIN_FAVOURITE; return this; }
    favourite(favourite) { this.query.favourite = favourite; return this; }
    recentlyUsed(recentlyUsed) { this.query.recentlyUsed = recentlyUsed; return this; }
    recentlyAdded(recentlyAdded) { this.query.recentlyAdded = recentlyAdded; return this; }
    domainMatching(domainMatching, url = "") {
        this.query.domainMatching = domainMatching;
        this.query.domainMatchingUrl = url;
        return this;
    }
    sharing(sharing) { this.query.sharing = sharing; return this; }
    classification(classification) { this.query.classification = classification; return this; }
    includeSecretData(include) { this.query.includeSecretData = include; return this; }
    tagMode(tagMode) { this.query.tagMode = tagMode; return this; }
    tags(tags) { this.query.tags = tags; return this; }
    owned(owned) { this.query.owned = owned; return this; }
}
export class SecretQueryResult extends PageQueryResult {
    query = null;
    secrets = [];
}
