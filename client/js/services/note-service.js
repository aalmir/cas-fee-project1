export class NoteService {    

    constructor(httpService) {
        this.httpService = httpService;
    }

    async getNotes() {
        return await this.httpService.ajax("GET", "/notes/", undefined);
    }
    
    async getNote(id) {
        return await this.httpService.ajax("GET", `/notes/${id}`, undefined);
    }

    async createNote(pizzeName) {
        return await this.httpService.ajax("POST", "/notes/", { name: pizzeName });
    }

    async updateNote(id) {
        return await this.httpService.ajax("PATCH", `/notes/${id}`, undefined);
    }

    async deleteNote(id) {
        return await this.httpService.ajax("DELETE", `/notes/${id}`, undefined);
    }

}
