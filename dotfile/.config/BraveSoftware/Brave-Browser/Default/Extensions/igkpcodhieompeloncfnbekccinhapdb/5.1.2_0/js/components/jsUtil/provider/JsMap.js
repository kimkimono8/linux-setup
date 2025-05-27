export class JsMapUtilImpl {
    createNew({ defaultVal = null, defaultProvider = null } = {}) {
        const map = new JSMapObjImpl();
        map.initDefaultProvider({ defaultVal, defaultProvider });
        return map;
    }
    combine(mapOne, mapTwo) {
        return new Map([...mapOne.entries(), ...mapTwo.entries()]);
    }
}
class JSMapObjImpl {
    map = new Map();
    defaultProvider = null;
    get(key) {
        if (this.map.has(key)) {
            return this.map.get(key);
        }
        return (this.defaultProvider && this.defaultProvider()) || null;
    }
    getOrDefaultAdded(key) {
        if (this.map.has(key)) {
            return this.map.get(key);
        }
        if (!this.defaultProvider) {
            return null;
        }
        const defaultVal = this.defaultProvider();
        this.map.set(key, defaultVal);
        return defaultVal;
    }
    initDefaultProvider({ defaultVal = null, defaultProvider = null }) {
        if (defaultVal) {
            this.defaultProvider = () => defaultVal;
            return;
        }
        if (defaultProvider) {
            this.defaultProvider = defaultProvider;
            return;
        }
    }
}
