export class RestNotesStore {    

    constructor(httpHelper) {
        this.httpHelper = httpHelper;
    }

    async getNotes() {
        return await this.httpHelper.ajax("GET", "/notes/");
    }
    
    async getNote(id) {
        return await this.httpHelper.ajax("GET", `/notes/${id}`);
    }

    async createNote(note) {
        return await this.httpHelper.ajax("POST", "/notes/", note);
    }

    async updateNote(note) {
        return await this.httpHelper.ajax("PUT", `/notes/${note.id}`, note);
    }

    async deleteNote(id) {
        return await this.httpHelper.ajax("DELETE", `/notes/${id}`);
    }

    async deleteAllNotes() {
        return await this.httpHelper.ajax("DELETE", `/notes/`);
    }

}
