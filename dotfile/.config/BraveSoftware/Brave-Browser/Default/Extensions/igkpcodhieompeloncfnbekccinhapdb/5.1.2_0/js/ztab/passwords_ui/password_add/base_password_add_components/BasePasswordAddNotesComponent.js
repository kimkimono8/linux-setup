export class BasePasswordAddNotesComponent {
    p = null;
    getNotes() {
        try {
            const notesElem = this.getNotesElem();
            const notes = notesElem.value;
            return notes;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    getNotesElem() {
        return this.p.select("[data-notes]");
    }
    setNotes(notes) {
        try {
            const notesElem = this.getNotesElem();
            notesElem.value = notes;
        }
        catch (e) {
            logError(e);
        }
    }
}
