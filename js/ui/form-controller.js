import { HandlebarsHelpers } from "./handlebars-helpers.js";

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
        const formModel = {
            title: note.title,
            description: note.description,
            priority: note.priority.toString(),
            dueDate: note.dueDate === null ? "" : note.dueDate.toISOString("T").substring(0, 10),
            id: note.id.toString()
        };
        this.form.innerHTML = this.formTemplate(formModel);

        this.form.style.display = "block";
    }

    renderCreateForm() {
        const formModel = {
            title: "My note",
            description: "",
            priority: "2",
            dueDate: "",
            id: ""
        }
        this.form.innerHTML = this.formTemplate(formModel);

        this.form.style.display = "block";
    }

    hideForm() {
        this.form.style.display = "none";
    }

    static getFormModel(form) {
        var formModel = {
            title: form.querySelector("[name=\"title\"]").value,
            description: form.querySelector("[name=\"description\"]").value,
            priority: form.querySelector("[name=\"priority\"]:checked").value,
            dueDate: form.querySelector("[name=\"dueDate\"]").value,
            id: form.querySelector("[name=\"id\"]").value
        }

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