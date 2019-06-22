import Datastore from 'nedb-promise'

class Note {
    constructor(id) {
        id = Number(id);

        this.id = id;
        this.title = "New note";
        this.description = "";
        this.priority = 1;
        this.dueDate = null;
        this.createdDate = new Date();
        this.done = false;
    }

    static convertFromJson(json) {
        const note = new Note(json.id);
        note.title = json.title || note.title;
        note.description = json.description || note.description;
        note.priority = json.priority || note.priority;
        note.dueDate = json.dueDate ? new Date(json.dueDate) : note.dueDate;
        note.createdDate = json.createdDate ? new Date(json.createdDate) : note.createdDate;
        note.done = json.done ||note.done;
        return note;
    }
}

export class NoteStore {
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
        const note = Note.convertFromJson(noteDto);
        const dbResult = await this.db.insert(note);
        return dbResult;
    }

    async update(noteDto) {
        const note = Note.convertFromJson(noteDto);
        return await this.db.update({ id: note.id }, { $set: note });
    }

    async delete(id) {
        return await this.db.remove({ id: id }, { multi: true });
    }

    async deleteAll() {
        return await this.db.remove({ }, { multi: true });
    }
    
}

export const noteStore = new NoteStore();
