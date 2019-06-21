import { noteStore } from '../services/note-store'

export class NotesController {

    async getNotes(req, res) {
        res.json((await noteStore.all() || []))
    };

    async getNote(req, res) {
        res.json(await noteStore.get(req.params.id));
    };

    async createNote(req, res) {
        res.json(await noteStore.add(req.body.name));
    };

    async updateNote(req, res) {
        res.json(await noteStore.update(req.body.name));
    };

    async deleteNote(req, res) {
        res.json(await noteStore.delete(req.params.id));
    };
}

export const notesController = new NotesController();