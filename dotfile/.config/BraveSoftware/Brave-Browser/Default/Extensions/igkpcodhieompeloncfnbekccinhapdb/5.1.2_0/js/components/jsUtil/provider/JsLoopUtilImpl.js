import { gg } from "./GG.js";
export class JsLoopUtilImpl {
    async *createCyclicCounter(totalCount, interCycleDelay = 0.1) {
        while (true) {
            for (let i = 0; i < totalCount; i++) {
                yield i;
            }
            await gg.js.time.delay(interCycleDelay);
        }
    }
    range(end) {
        return this.rangeSE(0, end);
    }
    *rangeSE(start, exclusiveEnd) {
        for (let i = start; i < exclusiveEnd; i++) {
            yield i;
        }
    }
}
