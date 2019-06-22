export class RestNotesStore {    

    constructor(httpHelper) {
        this.httpHelper = httpHelper;
    }

    async loadAllNotes() {
        return await this.httpHelper.ajax("GET", "/notes/");
    }
    
    async saveAllNotes(notes) {
        await this.httpHelper.ajax("POST", "/notes/", notes);
    }
    
    /*
    async getNote(id) {
        return await this.httpHelper.ajax("GET", `/notes/${id}`);
    }

    async createNote(...) {
        return await this.httpHelper.ajax("POST", "/notes/", { ... });
    }

    async updateNote(...) {
        return await this.httpHelper.ajax("PATCH", `/notes/${id}`);
    }

    async deleteNote(...) {
        return await this.httpHelper.ajax("DELETE", `/notes/${id}`);
    }
    */

}
