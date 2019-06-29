import { StaticData } from "../data/static-data.js";
import { Note } from "./note.js";

export class NotesService {

    constructor(notesStore) {
        this.notesStore = notesStore;
    }

    async getAllNotes() {
        const dto = await this.notesStore.getNotes();
        return dto.map(Note.convertFromJson);
    }

    async getNotesSorted(sortOrder, showDone) {
        const notes = await this.getAllNotes();
        const comparer = Note.getComparer(sortOrder);
        return [...notes]
            .filter(x => showDone || !x.done)
            .sort(comparer);
    }

    async getNote(id) {
        const idInt = parseInt(id, 10);
        const dto = await this.notesStore.getNote(idInt);
        return Note.convertFromJson(dto);
    }

    async addNote(updateFunc) {
        const notes = await this.getAllNotes();
        const maxId = NotesService.getMaxId(notes);
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
        if (note.done) {
            note.doneDate = new Date();
        } else {
            note.doneDate = null;
        }
        await this.notesStore.updateNote(note);
    }

    async deleteNote(id) {
        const idInt = parseInt(id, 10);
        await this.notesStore.deleteNote(idInt);
    }

    async clear() {
        await this.notesStore.deleteAllNotes();
    }

    async fillSampleData() {
        const notes = await this.getAllNotes();
        let maxId = NotesService.getMaxId(notes);

        const sampleNotes = StaticData.getSampleData();
        // eslint-disable-next-line no-restricted-syntax
        for (const noteDto of sampleNotes) {
            const note = Note.convertFromJson(noteDto);
            maxId += 1;
            note.id = maxId;
            // eslint-disable-next-line no-await-in-loop
            await this.notesStore.createNote(note);
        }
    }

    static getMaxId(notes) {
        return notes.length === 0 ? 0 : Math.max(...notes.map(x => x.id));
    }

}
