import { StaticData } from '../data/static-data.js';
import { Note } from './note.js';

export class NoteService {

    constructor(notesStore) {
        this.notesStore = notesStore;
        this.notesCache = null;
        this.maxId = null;
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
        const note = new Note(++this.maxId);
        updateFunc(note);
        notes.push(note);
        await this.notesStore.createNote(note);
    }

    async updateNote(id, updateFunc) {
        const note = await this.findNote(id);
        updateFunc(note);
        await this.notesStore.updateNote(note);
    }

    async toggleDone(id) {
        const note = await this.findNote(id);
        note.done = !note.done;
        await this.notesStore.updateNote(note);
    }

    async deleteNote(id) {
        id = parseInt(id);
        await this.notesStore.deleteNote(id);
        await this.loadAll();
    }

    async clear() {
        this.notesCache = [];
        await this.notesStore.deleteAllNotes();
    }

    async fillSampleData() {
        for(const noteDto of StaticData.getSampleData()) {
            const updateFunc = note => {
                note.title = noteDto.title;
                note.description = noteDto.description;
                note.priority = noteDto.priority;
                note.dueDate = noteDto.dueDate ? new Date(noteDto.dueDate) : null;
            }
            await this.addNote(updateFunc)
        }
    }

    /*
     * Inhalt vom Cache vom Speicher befüllen, oder falls bereits 
     * geschehen, den Cache-Inhalt zurückgeben
     */
    async lazyGetAll() {
        if(this.notesCache === null) {
            await this.loadAll();
        }
        return this.notesCache;
    }

    /*
     * Cache vom Speicher befüllen
     */
    async loadAll() {
        var dto = await this.notesStore.getNotes();
        this.notesCache = dto.map(Note.convertFromJson);
        this.maxId = this.notesCache.length == 0 ? 0 : Math.max(...this.notesCache.map(x => x.id));
    }

}
