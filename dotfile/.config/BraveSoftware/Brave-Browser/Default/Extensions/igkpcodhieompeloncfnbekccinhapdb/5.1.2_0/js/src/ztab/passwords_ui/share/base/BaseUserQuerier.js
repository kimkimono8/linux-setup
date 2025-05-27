export class BaseUserQuerier {
    ROWS_PER_PAGE = 50;
    matchingUsers = null;
    pageNo = 0;
    users = [];
    searchString = "";
    lowerCaseSearchString = "";
    filteredUsers = {};
    matchFieldMap = new Map();
    ;
    query() {
        this.matchingUsers = this.filter();
        const currentPageUsers = this.matchingUsers.slice(this.getStartPaginationNumber() - 1, this.getEndPaginationNumber());
        return currentPageUsers;
    }
    setUsers(users) {
        this.users = users;
    }
    setSearchString(searchString) {
        this.searchString = searchString;
        this.lowerCaseSearchString = searchString.toLocaleLowerCase();
        this.pageNo = 0;
    }
    getSearchString() {
        return this.searchString;
    }
    hasPreviousPage() {
        return this.pageNo > 0;
    }
    hasNextPage() {
        return ((this.pageNo + 1) * this.ROWS_PER_PAGE) < this.matchingUsers.length;
    }
    goPreviousPage() {
        if (!this.hasPreviousPage()) {
            throw "cannot go to previous page";
        }
        this.pageNo--;
    }
    goNextPage() {
        if (!this.hasNextPage()) {
            throw "cannot go to next page";
        }
        this.pageNo++;
    }
    getStartPaginationNumber() {
        return (this.pageNo * this.ROWS_PER_PAGE) + 1;
    }
    getEndPaginationNumber() {
        return Math.min(this.matchingUsers.length, this.getStartPaginationNumber() + this.ROWS_PER_PAGE - 1);
    }
    getTotal() {
        return this.matchingUsers.length;
    }
    getMatchField(user) {
        return this.matchFieldMap.get(user.id);
    }
    filter() {
        for (let key in this.filteredUsers) {
            this.filteredUsers[key].length = 0;
        }
        for (let user of this.users) {
            this.partitionUser(user);
        }
        return this.getFilteredUsers();
    }
}
