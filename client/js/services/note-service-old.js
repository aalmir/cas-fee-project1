import { StaticData } from '../data/static-data.js';
import { Note } from './note.js';

export class NoteServiceOld {

    constructor(storage) {
        this.storage = storage;
        this.notes = [];

        this.load();
    }

    getNotes(sortOrder, showDone) {
        const comparer = Note.getComparer(sortOrder)
        return [...this.notes]
            .filter(x => showDone || !x.done)
            .sort(comparer);
    }

    findNote(id) {
        return this.notes.find(x => x.id === parseInt(id));
    }

    addNote(updateFunc) {
        const maxId = this.notes.length == 0 ? 0 : Math.max(...this.notes.map(x => x.id));

        const note = new Note(maxId + 1);
        note.createdDate = new Date();
        note.done = false

        updateFunc(note);

        this.notes.push(note);
        this.save();
    }

    updateNote(id, updateFunc) {
        const note = this.findNote(id);
        updateFunc(note);

        this.save();
    }

    toggleDone(id) {
        const note = this.findNote(id);
        if (!note) {
            return false;
        }
        note.done = !note.done;
        this.save();
    }

    deleteNote(id) {
        this.notes = this.notes.filter(x => x.id !== parseInt(id));
        this.save();
    }

    clear() {
        this.notes = [];
        this.save();
    }

    seed() {
        this.notes = StaticData.getSampleData().map(Note.convertFromJson);
        this.save();
    }

    load() {
        this.notes = this.storage.getNotes().map(Note.convertFromJson);
    }

    save() {
        this.storage.saveNotes(this.notes);
    }

}
