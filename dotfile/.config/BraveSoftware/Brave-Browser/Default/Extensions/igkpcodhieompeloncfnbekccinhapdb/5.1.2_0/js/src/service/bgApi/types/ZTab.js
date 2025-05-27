export var ZTAB_TASK;
(function (ZTAB_TASK) {
    ZTAB_TASK["ADD"] = "ADD";
    ZTAB_TASK["EDIT"] = "EDIT";
    ZTAB_TASK["ADD_CARD"] = "ADD_CARD";
    ZTAB_TASK["ADD_ADDRESS"] = "ADD_ADDRESS";
    ZTAB_TASK["EDIT_CARD"] = "EDIT_CARD";
    ZTAB_TASK["SHARE"] = "SHARE";
    ZTAB_TASK["ENABLE_ACCESS_CONTROL"] = "ENABLE_ACCESS_CONTROL";
    ZTAB_TASK["MANAGE_ACCESS_CONTROL"] = "MANAGE_ACCESS_CONTROL";
    ZTAB_TASK["REQUEST_ACCESS"] = "REQUEST_ACCESS";
    ZTAB_TASK["OPEN_SETTINGS"] = "OPEN_SETTINGS";
})(ZTAB_TASK || (ZTAB_TASK = {}));
;
export class ZTabTask {
    type;
    constructor(type) {
        this.type = type;
    }
}
export class ZTabAddTask extends ZTabTask {
    constructor() {
        super(ZTAB_TASK.ADD);
    }
    prefillInput = null;
}
export class ZTabAddCardTask extends ZTabTask {
    constructor() {
        super(ZTAB_TASK.ADD_CARD);
    }
    prefillInput = null;
}
export class ZTabAddAddressTask extends ZTabTask {
    constructor() {
        super(ZTAB_TASK.ADD_ADDRESS);
    }
}
export class ZTabEditCardTask extends ZTabTask {
    constructor() {
        super(ZTAB_TASK.EDIT_CARD);
    }
    secretId = "";
    prefillInput = null;
}
export class ZTabEditTask extends ZTabTask {
    constructor() {
        super(ZTAB_TASK.EDIT);
    }
    secretId = "";
    editInput = null;
}
export class ZTabShareTask extends ZTabTask {
    constructor() {
        super(ZTAB_TASK.SHARE);
    }
    secretId = "";
}
export class ZTabEnableAccessControlTask extends ZTabTask {
    constructor() {
        super(ZTAB_TASK.ENABLE_ACCESS_CONTROL);
    }
    secretId = "";
}
export class ZTabManageAccessControlTask extends ZTabTask {
    constructor() {
        super(ZTAB_TASK.MANAGE_ACCESS_CONTROL);
    }
    secretId = "";
}
export class ZTabRequestAcessTask extends ZTabTask {
    constructor() {
        super(ZTAB_TASK.REQUEST_ACCESS);
    }
    secretId = "";
}
