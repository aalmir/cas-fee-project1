import Datastore from 'nedb-promise'

export class Note {
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

    static convertFromJson(noteDto) {
        const note = new Note(noteDto.id);
        note.title = noteDto.title;
        note.description = noteDto.description;
        note.priority = noteDto.priority;
        note.dueDate = noteDto.dueDate ? new Date(noteDto.dueDate) : null;
        note.createdDate = new Date(noteDto.createdDate);
        note.done = noteDto.done;
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

    async all() {
        return await this.db.cfind().exec();
    }

    async add(noteDto) {
        //const note = Note.convertFromJson(noteDto);
        console.log(noteDto);
        const dbResult = await this.db.insert(noteDto);
        console.log(dbResult);
        return dbResult;
    }

    async update(id) {
        await this.db.update({ _id: id }, { $set: { "state": "DELETED" } });
        return await this.get(id);
    }

    async delete(id) {
        await this.db.update({ _id: id }, { $set: { "state": "DELETED" } });
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({ _id: id });
    }

}

export const noteStore = new NoteStore();
