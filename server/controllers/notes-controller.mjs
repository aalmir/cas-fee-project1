import { notesStore } from "../services/notes-store.mjs";

export class NotesController {

    static async getNotes(req, res) {
        res.json((await notesStore.getAll() || []));
    }

    static async getNote(req, res) {
        const id = parseInt(req.params.id, 10);
        res.json(await notesStore.get(id));
    }

    static async createNote(req, res) {
        res.json(await notesStore.create(req.body));
    }

    static async updateNote(req, res) {
        const id = parseInt(req.params.id, 10);
        res.json(await notesStore.update(id, req.body));
    }

    static async deleteNote(req, res) {
        const id = parseInt(req.params.id, 10);
        res.json(await notesStore.delete(id));
    }

    static async deleteAllNotes(req, res) {
        res.json(await notesStore.deleteAll());
    }

}
