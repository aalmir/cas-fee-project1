import { noteStore } from '../services/note-store'

export class NotesController {

    async getNotes(req, res) {
        res.json((await noteStore.getAll() || []))
    };

    async getNote(req, res) {
        const id = parseInt(req.params.id);
        res.json(await noteStore.get(id));
    };

    async createNote(req, res) {
        res.json(await noteStore.create(req.body));
    };

    async updateNote(req, res) {
        res.json(await noteStore.update(req.body));
    };

    async deleteNote(req, res) {
        const id = parseInt(req.params.id);
        res.json(await noteStore.delete(id));
    };

    async deleteAllNotes(req, res) {
        res.json(await noteStore.deleteAll());
    };
}

export const notesController = new NotesController();