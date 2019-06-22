import { HandlebarsHelpers } from "./handlebars-helpers.js";
import { ListViewState } from "./list-view-state.js";
import { ListModel } from "./list-model.js";
import { Note } from "../services/note.js";

export class ListController {

    constructor(notesService, router, preferencesService, debugMode) {

        // Service
        this.notesService = notesService;
        this.router = router;
        this.router.bindListController(this); 
        this.preferencesService = preferencesService;
 
        // State
        this.viewState = new ListViewState(
            this.preferencesService.getListSortOrder() || Note.SORT_ORDER().priority, 
            this.preferencesService.getListShowDone(), 
            debugMode
        );
       
        // Handlebars
        this.listTemplate = HandlebarsHelpers.compileNode("notes-list-template");

        // DOM Elements
        this.listContainer = document.getElementById("list-container");

        // Init
        this.initEventHandlers();
    }

    async listClickHandler(event) {
        const noteId = event.target.dataset.noteId;
        const command = event.target.dataset.command;
        if (command) {
            switch (command) {
                case 'toggle-sort':
                    const newSortOrder = event.target.dataset.sortOrder;
                    if(newSortOrder !== this.viewState.sortOrder) {
                        this.viewState.sortOrder = newSortOrder;
                        this.preferencesService.setListSortOrder(newSortOrder);
                        await this.renderList();
                    }
                    break;

                case 'toggle-show-done':
                    const newShowDone = event.target.checked;
                    if(newShowDone !== this.viewState.showDone) {
                        this.viewState.showDone = newShowDone;
                        this.preferencesService.setListShowDone(newShowDone);
                        await this.renderList();
                    }
                    break;

                case 'toggle-done':
                    await this.notesService.toggleDone(noteId)
                    await this.renderList();
                    break;

                case 'edit':
                    await this.hideList();
                    await this.router.showEditForm(noteId);
                    break;

                case 'delete':
                    if (confirm("Do you really want to delete this note?")) {
                        await this.notesService.deleteNote(noteId)
                        await this.renderList();
                    }
                    break;

                case 'create':
                    await this.hideList();
                    await this.router.showCreateForm();
                    break;

                case 'fill-samples':
                    await this.notesService.fillSampleData();
                    await this.renderList();
                    break;

                case 'clear':
                    await this.notesService.clear();
                    await this.renderList();
                    break;

                default:
                    alert(`unknown command: click event ${command}`);
                    break;
            }
        }
    }

    async renderList() {
        const notes = await this.notesService.getNotesSorted(
            this.viewState.sortOrder, 
            this.viewState.showDone
        );
        const listModel = new ListModel(notes, this.viewState);
        this.listContainer.innerHTML = this.listTemplate(listModel);

        this.listContainer.style.display = "block";
    }

    async hideList() {
        this.listContainer.style.display = "none";
    }

    initEventHandlers() {
        this.listContainer.addEventListener("click", 
            async event => this.listClickHandler(event)
        );
    }

}