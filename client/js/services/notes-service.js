import { StaticData } from "../data/static-data.js";

class Note {

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

class NoteSorter {

    static compareByPriority(s1, s2) {
        return -(s2.priority - s1.priority);
    }

    static compareByDueDate(s1, s2) {
        if (s1.dueDate === s2.dueDate) return 0;
        if (s1.dueDate === null) return 1;
        if (s2.dueDate === null) return -1;
        return -(s2.dueDate - s1.dueDate);
    }

    static compareByCreatedDate(s1, s2) {
        return (s2.createdDate - s1.createdDate);
    }

    static SORT_ORDER() {
        return {
            priority: "priority",
            due: "due",
            created: "created"
        };
    }

    static getComparer(sortOrder) {
        const sortOrderConst = NoteSorter.SORT_ORDER();
        switch (sortOrder) {
            case sortOrderConst.priority: return NoteSorter.compareByPriority;
            case sortOrderConst.due: return NoteSorter.compareByDueDate;
            case sortOrderConst.created: return NoteSorter.compareByCreatedDate;
            default: return NoteSorter.compareByPriority;
        }
    }

}

export class NotesService {

    constructor(notesStore) {
        this.notesStore = notesStore;
        this.defaultSortOrder = NoteSorter.SORT_ORDER().priority;
    }

    async getAllNotes() {
        const jsonList = await this.notesStore.getNotes();
        return jsonList.map(json => new Note(json));
    }

    async getNotesSorted(sortOrder, showDone) {
        const notes = await this.getAllNotes();
        const comparer = NoteSorter.getComparer(sortOrder || this.defaultSortOrder);
        return [...notes]
            .filter(x => showDone || !x.done)
            .sort(comparer);
    }

    async getNote(id) {
        const idInt = parseInt(id, 10);
        const json = await this.notesStore.getNote(idInt);
        return new Note(json);
    }

    async createOrUpdateNote(id, title, description, priority, dueDate) {
        const note0 = id ? await this.getNote(id) : new Note({ id: 0 });
        const note = new Note({
            ...note0,
            title,
            description,
            priority,
            dueDate
        });
        return id ? this.notesStore.updateNote(note) : this.notesStore.createNote(note);
    }

    async toggleDone(id) {
        const note = await this.getNote(id);
        note.done = !note.done;
        if (note.done) {
            note.doneDate = new Date();
        } else {
            note.doneDate = null;
        }
        return this.notesStore.updateNote(note);
    }

    async deleteNote(id) {
        const idInt = parseInt(id, 10);
        return this.notesStore.deleteNote(idInt);
    }

    async clear() {
        return this.notesStore.deleteAllNotes();
    }

    async fillSampleData() {
        const sampleNotes = StaticData.getSampleData();
        return this.notesStore.createNotes(sampleNotes);
    }

}
