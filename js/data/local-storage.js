export class LocalStorage {

    constructor() {
    }

    getAll() {
        const notesJson = localStorage.getItem('notes_v1') || "[ ]";
        const notes = JSON.parse(notesJson);
        return notes;
    }

    saveAll(notes) {
        const nodesJson = JSON.stringify(notes);
        localStorage.setItem('notes_v1', nodesJson);
    }
}