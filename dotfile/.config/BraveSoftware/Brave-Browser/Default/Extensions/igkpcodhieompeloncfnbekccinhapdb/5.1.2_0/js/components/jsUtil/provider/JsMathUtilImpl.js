export class JsMathUtilImpl {
    sum(...a) {
        return this.sumList(a);
    }
    sumList(a) {
        return a.reduce((x, y) => x + y, 0);
    }
    getBoundedValueLEGE(min, max, value) {
        return Math.min(Math.max(min, value), max);
    }
    average(...a) {
        return this.averageList(a);
    }
    averageList(a) {
        return this.sumList(a) / a.length;
    }
}
