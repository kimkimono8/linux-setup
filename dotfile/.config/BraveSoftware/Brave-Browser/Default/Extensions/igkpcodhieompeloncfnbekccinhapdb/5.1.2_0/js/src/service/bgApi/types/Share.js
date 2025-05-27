import { Secret } from "./Secret.js";
export class BaseSecretShareUIUser {
    id = "";
    name = "";
    shareLevel = Secret.SHARING_LEVEL.NONE;
    selected = false;
    nameLowerCase = "";
    searchWeight = 0;
}
export class BaseSecretShareUserUIInput {
    secretId = "";
    ownerId = "";
    secretName = "";
    users = [];
}
export class SecretShareUserInput {
    secretId = "";
    ownerId = "";
}
export class SecretShareUserGroupInput {
}
export class SecretShareUIUser extends BaseSecretShareUIUser {
    zuid = "";
    email = "";
    emailNamePartLowerCase = "";
    emailLowerCase = "";
    dp = "";
}
export class SecretShareUIUserGroup extends BaseSecretShareUIUser {
}
export class SecretShareUserApiInput {
    secretId = "";
    manageUserIds = [];
    modifyUserIds = [];
    viewUserIds = [];
    loginUserIds = [];
}
export class SecretShareUserGroupUIInput extends BaseSecretShareUserUIInput {
    users = [];
}
export class SecretShareUserUIInput extends BaseSecretShareUserUIInput {
    users = [];
}
