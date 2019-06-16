import { HandlebarsHelpers } from "./handlebars-helpers.js";
import { ListViewState } from "./list-view-state.js";
import { ListViewModel } from "./list-view-model.js";

export class ListController {

    constructor(noteService, router) {
        // Static config
        const defaultSortorder = "priority";
        const defaultShowDone = false;
        const showDebug = true;

        // Service
        this.noteService = noteService;
        this.router = router;
        router.bindListController(this); 
        
        // Handlebars
        this.listTemplate = HandlebarsHelpers.compileNode("notes-list-template");

        // DOM Elements
        this.listContainer = document.getElementById("list-container");

        // View State
        this.viewState = new ListViewState(defaultSortorder, defaultShowDone, showDebug);

        // Init
        this.initEventHandlers();
    }

    listClickHandler(event) {
        const noteId = event.target.dataset.noteId;
        const command = event.target.dataset.command;
        if (command) {
            switch (command) {
                case 'toggle-sort':
                    this.viewState.sortOrder = event.target.dataset.sortOrder;
                    this.renderList();
                    break;

                    case 'toggle-show-done':
                    this.viewState.showDone = event.target.checked;
                    this.renderList();
                    break;

                case 'toggle-done':
                    this.noteService.toggleDone(noteId)
                    this.renderList();
                    break;
                case 'edit':
                    this.hideList();
                    this.router.showEditForm(noteId);
                    break;
                case 'delete':
                    if (confirm("Do you really want to delete this note?")) {
                        this.noteService.deleteNote(noteId)
                        this.renderList();
                    }
                    break;

                case 'create':
                    this.hideList();
                    this.router.showCreateForm();
                    break;

                case 'seed':
                    this.noteService.seed();
                    this.renderList();
                    break;
                case 'clear':
                    this.noteService.clear();
                    this.renderList();
                    break;
                case 'load':
                    this.noteService.load();
                    this.renderList();
                    break;
                case 'home':
                    window.location.href = './';
                    break;

                default:
                    alert(`unknown command: click event ${command}`);
                    break;
            }
        }
    }

    renderList() {
        const notes = this.noteService.getNotes(
            this.viewState.sortOrder, 
            this.viewState.showDone
        );
        const listViewModel = new ListViewModel(notes, this.viewState);
        this.listContainer.innerHTML = this.listTemplate(listViewModel);

        this.listContainer.style.display = "block";
    }

    hideList() {
        this.listContainer.style.display = "none";
    }

    initEventHandlers() {
        this.listContainer.addEventListener("click", this.listClickHandler.bind(this));
    }

}