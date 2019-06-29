export class RestNotesStore {

    constructor(httpHelper) {
        this.httpHelper = httpHelper;
    }

    async getNotes() {
        return this.httpHelper.ajax("GET", "/notes/");
    }

    async getNote(id) {
        return this.httpHelper.ajax("GET", `/notes/${id}`);
    }

    async createNote(note) {
        return this.httpHelper.ajax("POST", "/notes/", note);
    }

    async createNotes(notes) {
        // eslint-disable-next-line no-restricted-syntax
        for (const note of notes) {
            // eslint-disable-next-line no-await-in-loop
            await this.httpHelper.ajax("POST", "/notes/", note);
        }
        return "OK";
    }

    async updateNote(note) {
        return this.httpHelper.ajax("PUT", `/notes/${note.id}`, note);
    }

    async deleteNote(id) {
        return this.httpHelper.ajax("DELETE", `/notes/${id}`);
    }

    async deleteAllNotes() {
        return this.httpHelper.ajax("DELETE", "/notes/");
    }

}
