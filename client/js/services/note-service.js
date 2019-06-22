import { StaticData } from '../data/static-data.js';
import { Note } from './note.js';

export class NoteService {

    constructor(notesStore) {
        this.notesStore = notesStore;
    }

    async getAllNotes() {
        var dto = await this.notesStore.getNotes();
        return dto.map(Note.convertFromJson);
    }

    async getNotesSorted(sortOrder, showDone) {
        const notes = await this.getAllNotes();
        const comparer = Note.getComparer(sortOrder)
        return [...notes]
            .filter(x => showDone || !x.done)
            .sort(comparer);
    }

    async getNote(id) {
        id = parseInt(id);
        var dto = await this.notesStore.getNote(id);
        return Note.convertFromJson(dto);
    }

    async addNote(updateFunc) {
        const notes = await this.getAllNotes();
        var maxId = this.getMaxId(notes);
        const note = new Note(maxId + 1);
        updateFunc(note);
        await this.notesStore.createNote(note);
    }

    async updateNote(id, updateFunc) {
        const note = await this.getNote(id);
        updateFunc(note);
        await this.notesStore.updateNote(note);
    }

    async toggleDone(id) {
        const note = await this.getNote(id);
        note.done = !note.done;
        await this.notesStore.updateNote(note);
    }

    async deleteNote(id) {
        id = parseInt(id);
        await this.notesStore.deleteNote(id);
    }

    async clear() {
        await this.notesStore.deleteAllNotes();
    }

    async fillSampleData() {
        const notes = await this.getAllNotes();
        var maxId = this.getMaxId(notes);

        for(const noteDto of StaticData.getSampleData()) {
            const note = Note.convertFromJson(noteDto);
            note.id = ++maxId
            await this.notesStore.createNote(note);
        }
    }
    
    getMaxId(notes) {
        return notes.length == 0 ? 0 : Math.max(...notes.map(x => x.id));
    }

}
