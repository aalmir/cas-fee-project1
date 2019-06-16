import { HandlebarsHelpers } from "./handlebars-helpers.js";
import { FormModel } from "./form-model.js";

export class FormController {

    constructor(noteService, router) {
        this.noteService = noteService;
        this.router = router;
        router.bindFormController(this);

        // Handlebars
        this.formTemplate = HandlebarsHelpers.compileNode("notes-form-template");

        // DOM Elements
        this.form = document.getElementById("notes-form");

        // Init
        this.initEventHandlers();
    }

    renderEditForm(noteId) {
        const note = this.noteService.findNote(noteId);
        const formModel = new FormModel(note.id.toString());
        formModel.title = note.title;
        formModel.description = note.description;
        formModel.priority = note.priority.toString();
        formModel.dueDate = note.dueDate === null ? "" : note.dueDate.toISOString("T").substring(0, 10);

        this.form.innerHTML = this.formTemplate(formModel);
        this.form.style.display = "block";
    }

    renderCreateForm() {
        const formModel = new FormModel("");

        this.form.innerHTML = this.formTemplate(formModel);
        this.form.style.display = "block";
    }

    hideForm() {
        this.form.style.display = "none";
    }

    static getFormModel(form) {
        const formModel = new FormModel();
        formModel.title = form.querySelector("[name=\"title\"]").value;
        formModel.description = form.querySelector("[name=\"description\"]").value;
        formModel.priority = form.querySelector("[name=\"priority\"]:checked").value;
        formModel.dueDate = form.querySelector("[name=\"dueDate\"]").value;
        formModel.id = form.querySelector("[name=\"id\"]").value;

        return formModel;
    }


    formClickHandler(event) {
        const command = event.target.dataset.command;
        switch (command) {
            case 'cancel':
                this.hideForm()
                this.router.showList();
                break;
            default:
                break;
        }
    }

    formSubmitHandler(event) {
        event.preventDefault();
        const form = event.target;
        const formModel = FormController.getFormModel(form);
        const updateFunc = note => {
            note.title = formModel.title;
            note.description = formModel.description;
            note.priority = formModel.priority;
            note.dueDate = formModel.dueDate ? new Date(formModel.dueDate) : null;
        }
        if (formModel.id === "") {
            this.noteService.addNote(updateFunc);
        }
        else {
            const noteId = parseInt(formModel.id);
            this.noteService.updateNote(noteId, updateFunc);
        }
        
        this.hideForm()
        this.router.showList();
    }

    initEventHandlers() {
        this.form.addEventListener("click", this.formClickHandler.bind(this));
        this.form.addEventListener("submit", this.formSubmitHandler.bind(this));
    }

}