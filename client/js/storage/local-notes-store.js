export class LocalNotesStore {

    constructor() {
        const json = localStorage.getItem("notes_v1") || "[ ]";
        this.notes = JSON.parse(json);
    }

    async getNotes() {
        return this.notes;
    }

    async getNote(id) {
        return this.notes.find(x => x.id === parseInt(id, 10));
    }

    async createNote(note) {
        const maxId = await this.getMaxId();
        // eslint-disable-next-line no-param-reassign
        note.id = maxId + 1;
        this.notes.push(note);
        this.innerSave();
    }

    async createNotes(notes) {
        let currentId = await this.getMaxId() + 1;
        notes.forEach((note) => {
            // eslint-disable-next-line no-param-reassign
            note.id = currentId;
            this.notes.push(note);
            currentId += 1;
        });
        this.innerSave();
    }

    async getMaxId() {
        return this.notes.length === 0 ? 0 : Math.max(...this.notes.map(x => x.id));
    }

    async updateNote(note) {
        this.notes = this.notes.filter(x => x.id !== parseInt(note.id, 10));
        this.notes.push(note);
        this.innerSave();
    }

    async deleteNote(id) {
        this.notes = this.notes.filter(x => x.id !== parseInt(id, 10));
        this.innerSave();
    }

    async deleteAllNotes() {
        this.notes = [];
        this.innerSave();
    }

    innerSave() {
        const json = JSON.stringify(this.notes);
        localStorage.setItem("notes_v1", json);
    }

}
