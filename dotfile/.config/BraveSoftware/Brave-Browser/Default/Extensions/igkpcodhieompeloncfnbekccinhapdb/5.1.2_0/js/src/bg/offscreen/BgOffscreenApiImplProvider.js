import { _BgOffscreenApiImpl } from "./_BgOffscreenApiImpl.js";
import { _BgOffscreenApiImplV2 } from "./_BgOffscreenApiImplV2.js";
export class BgOffscreenApiImplProvider {
    static getInstance() {
        try {
            if (brApi.isV2()) {
                return new _BgOffscreenApiImplV2();
            }
            return new _BgOffscreenApiImpl();
        }
        catch (e) {
            return null;
        }
    }
}
