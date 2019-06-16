import { StaticData } from '../data/static-data.js';
import { Note } from './note.js';

export class NoteService {

    constructor(storage) {
        this.storage = storage;
        this.notes = [];
        
        this.load();
    }

    getNotes(sortOrder, showDone) { 
        const comparer = (function () {
            switch (sortOrder) {
                case "priority": return Note.compareByPriority;
                case "due": return Note.compareByDueDate;
                case "created": return Note.compareByCreatedDate;
                default:
                    break;
            }
        })();
        return [...this.notes]
            .filter(x => showDone || !x.done)
            .sort(comparer);
    }

    findNote(id) {
        return this.notes.find(x => x.id === parseInt(id));
    }

    addNote(updateFunc) {
        const maxId = this.notes.length == 0 ? 0 : Math.max(...this.notes.map(x => x.id));
        const  note = {
            "id": maxId + 1,
            "createdDate": new Date(),
            "done": false
        };
        updateFunc(note);

        this.notes.push(note);
        this.save();
    }

    updateNote(id, updateFunc) {
        const note = this.findNote(id);
        updateFunc(note);

        this.save();
    }

    toggleDone(id) {
        const note = this.findNote(id);
        if (!note) {
            return false;
        }
        note.done = !note.done;
        this.save();
    }
    
    deleteNote(id) {
        this.notes = this.notes.filter(x => x.id !== parseInt(id));
        this.save();
    }

    clear() {
        this.notes = [];
        this.save();
    }

    seed() {
        this.notes = StaticData.getSampleData().map(NoteService.convertFromJson);
        this.save();
    }

    load() {
        this.notes = this.storage.getNotes().map(NoteService.convertFromJson);
    }

    static convertFromJson (noteDto) {
        const note = new Note(noteDto.id);
        note.title = noteDto.title;
        note.description = noteDto.description;
        note.priority = noteDto.priority;
        note.dueDate = noteDto.dueDate ? new Date(noteDto.dueDate) : null;
        note.createdDate = new Date(noteDto.createdDate);
        note.done = noteDto.done;
        return note;
    }

    save() {
        this.storage.saveNotes(this.notes);
    }

}
