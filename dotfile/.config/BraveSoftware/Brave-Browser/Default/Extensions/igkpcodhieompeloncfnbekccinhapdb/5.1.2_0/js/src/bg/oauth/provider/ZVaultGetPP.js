vuiMain();
import { VtApiPortNames } from "../../../service/vt/constants/VtApiPortNames.js";
import { vuiMain } from "../../../provider/VUi/main.js";
function getParameters() {
    const url = new URL(window.location.href);
    const params = {};
    url.searchParams.forEach((val, key) => params[key] = val);
    return params;
}
VUI.init();
const apiClient = portApi.createApiClient();
apiClient.init({ name: VtApiPortNames.OAUTH });
apiClient.callApi({ path: "setCode", args: [getParameters()] });
