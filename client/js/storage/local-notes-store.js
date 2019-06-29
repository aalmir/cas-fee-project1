export class LocalNotesStore {

    constructor() {
        const json = localStorage.getItem('notes_v1') || "[ ]";
        this.notes = JSON.parse(json);
    }

    async getNotes() {
        return this.notes;
    }

    async getNote(id) {
        return this.notes.find(x => x.id === parseInt(id));
    }

    async createNote(note) {
        this.notes.push(note);
        this.innerSave();
    }

    async updateNote(note) {
        this.notes = this.notes.filter(x => x.id !== note.id);
        this.notes.push(note);
        this.innerSave();
    }

    async deleteNote(id) {
        this.notes = this.notes.filter(x => x.id !== parseInt(id));
        this.innerSave();
    }

    async deleteAllNotes() {
        this.notes = [];
        this.innerSave();
    }

    innerSave() {
        const json = JSON.stringify(this.notes);
        localStorage.setItem('notes_v1', json);
    }

}