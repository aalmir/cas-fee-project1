import { StaticData } from '../data/static-data.js';
import { Note } from './note.js';

export class NoteService {

    constructor(notesStore) {
        this.notesStore = notesStore;
        this.notesCache = null;
    }

    async getNotes(sortOrder, showDone) {
        const notes = await this.lazyGetAll();
        const comparer = Note.getComparer(sortOrder)
        return [...notes]
            .filter(x => showDone || !x.done)
            .sort(comparer);
    }

    async findNote(id) {
        const notes = await this.lazyGetAll();
        return notes.find(x => x.id === parseInt(id));
    }

    async addNote(updateFunc) {
        const notes = await this.lazyGetAll();

        const maxId = notes.length == 0 ? 0 : Math.max(...notes.map(x => x.id));

        const note = new Note(maxId + 1);
        note.createdDate = new Date();
        note.done = false

        updateFunc(note);

        notes.push(note);
        this.saveAll();
    }

    async updateNote(id, updateFunc) {
        const note = await this.findNote(id);
        updateFunc(note);

        this.saveAll();
    }

    async toggleDone(id) {
        const note = await this.findNote(id);
        if (!note) {
            return false;
        }
        note.done = !note.done;
        this.saveAll();
    }

    async deleteNote(id) {
        const notes = await this.lazyGetAll();
        this.notesCache = notes.filter(x => x.id !== parseInt(id));
        await this.saveAll();
    }

    async clear() {
        this.notesCache = [];
        await this.saveAll();
    }

    async seed() {
        this.notesCache = StaticData.getSampleData().map(Note.convertFromJson);
        await this.saveAll();
    }

    async lazyGetAll() {
        if(this.notesCache === null) {
            await this.loadAll();
        }
        return this.notesCache;
    }

    async loadAll() {
        var dto = await this.notesStore.loadAllNotes();
        this.notesCache = dto.map(Note.convertFromJson);
    }

    async saveAll() {
        await this.notesStore.saveAllNotes(this.notesCache);
    }

}
