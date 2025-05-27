import { bgApiMain } from "../../provider/bgApi/main.js";
import { vtMain } from "../../provider/vt/main.js";
import { webauthnUnlockApiServer } from "./WebAuthnUnlockApiServer.js";
vtMain();
bgApiMain();
class Main {
    async main() {
        await vt.init({ logPrefix: "CS_UNLOCK:" });
        webauthnUnlockApiServer.init();
    }
}
new Main().main();
export default {};
