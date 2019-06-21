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
}

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({
            filename: './data/notes.db',
            autoload: true
        });
    }

    async all() {
        return await this.db.cfind().exec();
    }

    async add(pizzaName, orderedBy) {
        let order = new Order(pizzaName, orderedBy);
        return await this.db.insert(order);
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
