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

    showList() {
        this.listController.renderList();
    }

    showEditForm(noteId) {
        this.formController.renderEditForm(noteId);
    }

    showAddForm() {
        this.formController.showAddForm();
    }

}