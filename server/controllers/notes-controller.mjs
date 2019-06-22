import { notesStore } from '../services/notes-store'

export class NotesController {

    async getNotes(req, res) {
        res.json((await notesStore.getAll() || []))
    }

    async getNote(req, res) {
        const id = parseInt(req.params.id);
        res.json(await notesStore.get(id));
    }

    async createNote(req, res) {
        res.json(await notesStore.put(req.body));
    }

    async updateNote(req, res) {
        res.json(await notesStore.put(req.body));
    }

    async deleteNote(req, res) {
        const id = parseInt(req.params.id);
        res.json(await notesStore.delete(id));
    }

    async deleteAllNotes(req, res) {
        res.json(await notesStore.deleteAll());
    }
}

export const notesController = new NotesController();