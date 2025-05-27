export function logError(...args) {
    console.error(args);
    console.trace();
}
export function logInfo(...args) {
    console.info.apply(console.info, args);
}
