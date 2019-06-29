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
