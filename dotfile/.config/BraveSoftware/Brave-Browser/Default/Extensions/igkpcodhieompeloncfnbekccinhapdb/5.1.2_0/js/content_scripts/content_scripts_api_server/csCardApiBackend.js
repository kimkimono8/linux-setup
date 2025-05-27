import { csframe } from "../../src/cs/csframe/export.js";
import { cs } from "../cs.js";
export class CSCardApiBackend {
    async showFormFrame(frameUrl) {
        await cs.card.saveCCIframeData();
        return csframe.formFrame.show(frameUrl);
    }
    async checkIframeFields(data) {
        return cs.card.checkIframeFields(data);
    }
    async fillCardIframe(data) {
        cs.card.removeClickListener();
        await cs.card.fillCCInIframe(data);
        await js.time.delay(0.2);
        return cs.card.addClickListener();
    }
    async fillVaultIconCCIframe(fields) {
        return cs.card.fillIconsToCCFrames(fields);
    }
}
