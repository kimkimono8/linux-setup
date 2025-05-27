import { bg } from "../../../src/bg/bg.js";
import { accountDb, bgEventServer, vapi } from "../../../src/bg/Context.js";
import { SecretAccessControlAutoApproveInfo, SecretAccessControlTimeRange } from "../../../src/service/bgApi/types.js";
import { Secret } from "../../../src/service/bgApi/types/Secret.js";
import { VaultApi } from "../../server_api/VaultApi.js";
const SERVER_AUTO_APPROVE_STATUS = {
    DISABLED: -1,
    WEEKDAYS: 0,
    WEEKENDS: 1,
    TIME: 2,
    HELPDESK: 3
};
export class SecretAccessControl {
    p = null;
    async disable(secretId) {
        try {
            await vapi.secret.setProperty(secretId, { accesssctrlconfigured: false });
            const secret = await bg.vaultSecrets.secretGetter.getSecret(secretId);
            secret.access_controlled = false;
            secret.display_access_control_icon = false;
            await accountDb.secretTable.put(secret);
            bgEventServer.secret.changed(secretId);
        }
        catch (e) {
            logError(e);
        }
    }
    async updateAccessControl(input) {
        try {
            const reqInput = {
                secretids: [input.secretId],
                admins: input.admins,
                users: input.excludeUsers,
                dual_approval: input.dualApproval,
                request_timeout: input.requestTimeout + "",
                checkout_timeout: input.accessTimeMinutes + "",
                auto_approve: input.autoApprove
            };
            if (input.autoApprove) {
                this.fillAutoApproveInfo(reqInput, input);
            }
            const INPUT_DATA = JSON.stringify(reqInput);
            const reqString = "INPUT_DATA=" + encodeURIComponent(INPUT_DATA);
            await VaultApi.postChecked("/api/rest/json/v1/accesscontrol/settings", reqString);
            const secret = await this.p.secretGetter.getServerSecret(input.secretId);
            bgEventServer.secret.changed(secret.id);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    fillAutoApproveInfo(apiInput, input) {
        try {
            const autoApproveInfo = input.autoApproveInfo;
            if (autoApproveInfo.byTicket) {
                apiInput.help_desk_ticket = true;
                return;
            }
            if (autoApproveInfo.weekDays) {
                apiInput.auto_approve_on_weekdays = true;
                return;
            }
            if (autoApproveInfo.weekEnds) {
                apiInput.auto_approve_on_weekends = true;
                return;
            }
            if (autoApproveInfo.timeRange) {
                const timeRange = autoApproveInfo.timeRange;
                apiInput.from_hrs = timeRange.from.hours + "";
                apiInput.from_mins = timeRange.from.minutes + "";
                apiInput.to_hrs = timeRange.to.hours + "";
                apiInput.to_mins = timeRange.to.minutes + "";
                return;
            }
            throw "INVALID_STATE";
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async getSecretAccessControlSettings(secretId) {
        try {
            const resp = await VaultApi.getChecked("/api/rest/json/v1/accesscontrol/settings/" + secretId);
            const settings = resp.operation.Details;
            const admins = this.mapApiRespUserObj(settings.admins);
            const excludeUsers = this.mapApiRespUserObj(settings.exclude_users);
            const reqInput = {
                secretId,
                admins,
                excludeUsers,
                dualApproval: settings.dual_approval,
                requestTimeout: settings.request_timeout,
                accessTimeMinutes: settings.checkout_timeout,
                autoApprove: settings.auto_approve != SERVER_AUTO_APPROVE_STATUS.DISABLED,
                autoApproveInfo: null
            };
            if (reqInput.autoApprove) {
                reqInput.autoApproveInfo = this.getRespAutoApproveInfo(settings);
            }
            return reqInput;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getRespAutoApproveInfo(respSetting) {
        try {
            const reqInfo = new SecretAccessControlAutoApproveInfo();
            switch (respSetting.auto_approve) {
                case SERVER_AUTO_APPROVE_STATUS.WEEKDAYS:
                    reqInfo.weekDays = true;
                    break;
                case SERVER_AUTO_APPROVE_STATUS.WEEKENDS:
                    reqInfo.weekEnds = true;
                    break;
                case SERVER_AUTO_APPROVE_STATUS.HELPDESK:
                    reqInfo.byTicket = true;
                    break;
                case SERVER_AUTO_APPROVE_STATUS.TIME:
                    reqInfo.timeRange = this.getRespTimeRange(respSetting);
                    break;
                default: throw "INVALID_STATE";
            }
            return reqInfo;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getRespTimeRange(respSetting) {
        try {
            const range = new SecretAccessControlTimeRange();
            const [from_hours, from_mins] = respSetting.from_time.split(":");
            const [to_hours, to_mins] = respSetting.to_time.split(":");
            range.from.hours = parseInt(from_hours);
            range.from.minutes = parseInt(from_mins);
            range.to.hours = parseInt(to_hours);
            range.to.minutes = parseInt(to_mins);
            return range;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    mapApiRespUserObj(respUserObj) {
        try {
            const users = [];
            let user = null;
            for (let key in respUserObj) {
                user = this.mapApiRespUser(respUserObj[key]);
                user.userAutoId = key;
                users.push(user);
            }
            return users;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    mapApiRespUser(respUser) {
        try {
            const user = {
                userAutoId: respUser.user_auto_id,
                name: respUser.username,
                email: respUser.email,
                zuid: respUser.zuid
            };
            return user;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async createAccessRequest(input) {
        try {
            const apiInput = {
                reason: input.reason,
                requestlater: input.requestAdvance
            };
            if (input.requestAdvance) {
                const date = new Date(input.date);
                apiInput.futureTime = {
                    day: date.getDate(),
                    month: date.getMonth(),
                    year: date.getFullYear(),
                    hour: input.hour,
                    min: input.minutes
                };
            }
            if (input.ticketId) {
                apiInput.ticketid = input.ticketId;
            }
            const requestBody = "INPUT_DATA=" + encodeURIComponent(JSON.stringify(apiInput));
            await VaultApi.putChecked("/api/rest/json/v1/accesscontrol/requestaccess/" + input.secretId, requestBody);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async getPendingAccessRequestUIInfo(accessRequstId) {
        try {
            const resp = await VaultApi.getChecked("/api/rest/json/v1/accesscontrol/request/" + accessRequstId);
            const details = resp.operation.Details;
            const isAdvanceRequest = details.requestlater;
            const accessRequiredOn = isAdvanceRequest ? js.date.formatDateMonDYYYYHHMMAM(parseInt(details.futuretime)) : "";
            const hasValidApprovals = details.approvals && (details.approvals.length > 0);
            const approvals = hasValidApprovals ? details.approvals.map(x => this.getAccessApprovalInfo(x)) : [];
            const uiInfo = {
                secretId: details.secret_auto_id,
                requestId: details.request_auto_id,
                requestedOn: js.date.formatDateMonDYYYYHHMMAM(parseInt(details.timestamp)),
                accessRequiredOn,
                status: details.status_string,
                reason: details.reason,
                approvals,
                helpdeskError: this.getHelpDeskErrorInfo(resp),
            };
            return uiInfo;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getHelpDeskErrorInfo(resp) {
        try {
            const details = resp.operation.Details;
            if (!details.ticketid) {
                return null;
            }
            const helpdeskError = {
                ticketId: details.ticketid,
                status: details.helpdesk_status_message,
                errorMessage: details.helpdesk_reason,
            };
            return helpdeskError;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getAccessApprovalInfo(respInfo) {
        try {
            const info = {
                status: respInfo.status == Secret.ACCESS_CTRL_STATUS.APPROVED ? "Approved" : (respInfo.status) + "",
                adminName: respInfo.username,
                comment: respInfo.reason
            };
            return info;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async cancelAccessRequest(accessRequstId) {
        try {
            await VaultApi.putChecked("/api/rest/json/v1/accesscontrol/cancel/" + accessRequstId, "");
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async checkoutSecret(accessRequstId, secretId) {
        try {
            await VaultApi.putChecked("/api/rest/json/v1/accesscontrol/checkout/" + accessRequstId, "");
            await this.p.secretGetter.getServerSecret(secretId);
            bgEventServer.secret.changed(secretId);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async checkinSecret(secretId) {
        try {
            await VaultApi.putChecked("/api/rest/json/v1/accesscontrol/checkin/" + secretId, "");
            await this.p.secretGetter.getServerSecret(secretId);
            bgEventServer.secret.changed(secretId);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async isHelpdeskEnabled(secretId) {
        try {
            return await vapi.secret.accessControl.isHelpdeskEnabled(secretId);
        }
        catch (e) {
            logError(e);
            throw ["UNABLE_TO_CHECK_HELPDESK_ENABLE_STATUS", secretId, e];
        }
    }
}
