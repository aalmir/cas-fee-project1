import Datastore from "nedb-promise";

/*
 * Note, as it is written into the database.
 * (Fills missing values, ensures expected types).
 */
class NoteEntry {

    constructor(json) {
        this.id = Number(json.id);
        this.title = json.title || "Untitled";
        this.description = json.description || null;
        this.priority = json.priority || 1;
        this.dueDate = json.dueDate ? new Date(json.dueDate) : null;
        this.createdDate = json.createdDate ? new Date(json.createdDate) : new Date();
        this.done = json.done || false;
        this.doneDate = json.doneDate ? new Date(json.doneDate) : null;
    }

}

class NotesStore {

    constructor(db) {
        this.db = db || new Datastore({
            filename: "./server/data/notes.db",
            autoload: true
        });
    }

    async getAll() {
        return this.db.find({});
    }

    async get(id) {
        return this.db.findOne({ id });
    }

    async getMaxId() {
        const notes = await this.getAll();
        return notes.length === 0 ? 0 : Math.max(...notes.map(x => x.id));
    }

    async create(noteDto) {
        const entry = new NoteEntry(noteDto);
        entry.id = await this.getMaxId() + 1;
        return this.db.insert(entry);
    }

    async update(id, noteDto) {
        const entry = new NoteEntry(noteDto);
        entry.id = id;
        return this.db.update({ id }, { $set: entry });
    }

    async delete(id) {
        return this.db.remove({ id }, { multi: true });
    }

    async deleteAll() {
        return this.db.remove({}, { multi: true });
    }

}

export const notesStore = new NotesStore();
