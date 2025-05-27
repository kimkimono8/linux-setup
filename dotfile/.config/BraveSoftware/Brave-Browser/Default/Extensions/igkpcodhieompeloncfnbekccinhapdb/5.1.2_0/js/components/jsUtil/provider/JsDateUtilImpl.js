export class JsDateUtilImpl {
    formatDateMonDYYYY(timestamp) {
        const date = new Date(timestamp);
        return `${this.getShortMonth(date)} ${date.getDate()}, ${date.getFullYear()}`;
    }
    formatDateMonDYYYYHHMMAM(timestamp) {
        const date = new Date(timestamp);
        const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        return `${this.formatDateMonDYYYY(timestamp)} ${timeString}`;
    }
    getShortMonth(date) {
        const shortMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = shortMonth[date.getMonth()];
        return month;
    }
}
