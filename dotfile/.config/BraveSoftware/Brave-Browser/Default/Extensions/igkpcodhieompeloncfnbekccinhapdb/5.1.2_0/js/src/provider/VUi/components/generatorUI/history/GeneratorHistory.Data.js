export class GeneratorHistoryData {
    history;
    async init() {
        try {
            this.history = await bgApi.generator.history.get();
        }
        catch (e) {
            logError(e);
        }
    }
}
