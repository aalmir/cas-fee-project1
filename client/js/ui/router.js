/*
 * Poor man's solution to the problem of passing control from one controller to another
 */
export class Router {
    constructor() {
        this.listController = null;
        this.formController = null;
    }

    bindListController(listController) {
        this.listController = listController;
    }

    bindFormController(formController) {
        this.formController = formController;
    }


    async showList() {
        await this.listController.renderList();
    }

    async showEditForm(noteId) {
        await this.formController.renderEditForm(noteId);
    }

    async showCreateForm() {
        await this.formController.renderCreateForm();
    }

}