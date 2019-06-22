import Datastore from 'nedb-promise'

/*
 * A note ready to be written into the database. 
 * Fills missing values, ensures expected types. 
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
   }
}

export class NotesStore {
    constructor(db) {
        this.db = db || new Datastore({
            filename: './server/data/notes.db',
            autoload: true
        });
    }

    async getAll() {
        return await this.db.cfind().exec();
    }

    async get(id) {
        return await this.db.findOne({ id: id });
    }

    async create(noteDto) {
        const entry = new NoteEntry(noteDto);
        const dbResult = await this.db.insert(entry);
        return dbResult;
    }

    async update(noteDto) {
        const entry = new NoteEntry(noteDto);
        return await this.db.update({ id: entry.id }, { $set: entry });
    }

    async delete(id) {
        return await this.db.remove({ id: id }, { multi: true });
    }

    async deleteAll() {
        return await this.db.remove({ }, { multi: true });
    }
    
}

export const notesStore = new NotesStore();
