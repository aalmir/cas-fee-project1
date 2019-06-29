/*
 * Poor man's solution to the problem how one controller
 * can transfer control to the other.
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
