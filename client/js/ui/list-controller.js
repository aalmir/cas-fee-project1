import { HandlebarsHelpers } from "./handlebars-helpers.js";
import { ListViewState } from "./list-view-state.js";
import { ListModel } from "./list-model.js";

export class ListController {

    constructor(notesService, router, preferencesService) {

        // Service
        this.notesService = notesService;
        this.router = router;
        this.router.bindListController(this);
        this.preferencesService = preferencesService;

        // State
        this.viewState = new ListViewState(
            this.preferencesService.getListSortOrder() || notesService.defaultSortOrder,
            this.preferencesService.getListShowDone()
        );

        // Handlebars
        this.listTemplate = HandlebarsHelpers.compileNode("notes-list-template");

        // DOM Elements
        this.listContainer = document.getElementById("list-container");

        // Init
        this.initEventHandlers();
    }

    async listClickHandler(event) {
        const { noteId, command } = event.target.dataset;
        if (command) {
            switch (command) {
                case "toggle-sort":
                    this.toggleSort(event.target.dataset.sortOrder);
                    break;

                case "toggle-show-done":
                    this.toggleShowDone(event.target.checked);
                    break;

                case "toggle-done":
                    await this.notesService.toggleDone(noteId);
                    this.renderList();
                    break;

                case "edit":
                    this.hideList();
                    this.router.showEditForm(noteId);
                    break;

                case "delete":
                    // eslint-disable-next-line no-alert
                    if (window.confirm("Do you really want to delete this note?")) {
                        await this.notesService.deleteNote(noteId);
                        this.renderList();
                    }
                    break;

                case "create":
                    this.hideList();
                    this.router.showCreateForm();
                    break;

                case "fill-samples":
                    await this.notesService.fillSampleData();
                    this.renderList();
                    break;

                case "clear":
                    // eslint-disable-next-line no-alert
                    if (window.confirm("Do you really want to delete ALL notes?")) {
                        await this.notesService.clear();
                        this.renderList();
                    }
                    break;

                default:
                    // eslint-disable-next-line no-alert
                    window.alert(`unknown command: click event ${command}`);
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

    toggleSort(newSortOrder) {
        if (newSortOrder !== this.viewState.sortOrder) {
            this.viewState.sortOrder = newSortOrder;
            this.preferencesService.setListSortOrder(newSortOrder);
            this.renderList();
        }
    }

    toggleShowDone(newShowDone) {
        if (newShowDone !== this.viewState.showDone) {
            this.viewState.showDone = newShowDone;
            this.preferencesService.setListShowDone(newShowDone);
            this.renderList();
        }
    }

    async hideList() {
        this.listContainer.style.display = "none";
    }

    initEventHandlers() {
        this.listContainer.addEventListener(
            "click",
            async event => this.listClickHandler(event)
        );
    }

}
