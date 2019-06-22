export class LocalNotesStore {
    
    async loadAllNotes() {
        const json = localStorage.getItem('notes_v1') || "[ ]";
        const notes = JSON.parse(json);
        return notes;
    }

    async saveAllNotes(notes) {
        const json = JSON.stringify(notes);
        localStorage.setItem('notes_v1', json);
    }

}