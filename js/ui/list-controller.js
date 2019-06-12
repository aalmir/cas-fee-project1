import { HandlebarsHelpers } from "./handlebars-helpers.js";

export class ListController {

    constructor(noteService, router) {
        this.noteService = noteService;
        this.router = router;
        router.bindListController(this); 
        
        // Handlebars
        this.listTemplate = HandlebarsHelpers.compileNode("notes-list-template");

        // DOM Elements
        this.themeSelect = document.querySelector("#theme-control select");
        this.sortButtons = document.getElementById("sort-buttons");
        this.filterButtons = document.getElementById("filter-buttons");
        this.listContainer = document.getElementById("list-container");

        // View State
        this.sortOrder = "priority";
        this.showFinished = true;
        this.theme = "white-theme";

        // Init
        this.initEventHandlers();
    }

    themeChangeHandler(event) {
        var selectEl = event.target;
        var newTheme = selectEl.options[selectEl.selectedIndex].value;
        if (newTheme !== this.theme) {
            var body = document.querySelector('body');
            body.classList.add(newTheme);
            body.classList.remove(this.theme);
            this.theme = newTheme;
        }
    }

    listClickHandler(event) {
        const noteId = event.target.dataset.noteId;
        const command = event.target.dataset.command;
        if (command) {
            switch (command) {
                case 'delete':
                    if (confirm("Do you really want to delete this note?")) {
                        this.noteService.deleteNote(noteId)
                        this.renderList();
                    }
                    break;
                case 'toggle-finished':
                    this.noteService.toggleFinished(noteId)
                    this.renderList();
                    break;
                case 'edit':
                    this.hideList();
                    this.router.showEditForm(noteId);
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

    sortClickHandler(event) {
        const newSortOrder = event.target.dataset.sortOrder;
        if (newSortOrder) {
            this.sortOrder = newSortOrder;
            this.renderList();
            event.stopPropagation();
        }
    }

    filterChangeHandler(event) {
        const filter = event.target.dataset.filter;
        if (filter === "showFinished") {
            this.showFinished = event.target.checked;
            this.renderList();
        }
    }

    renderList() {
        const list = this.noteService.getNotes(this.sortOrder, this.showFinished);
        this.listContainer.innerHTML = this.listTemplate(list);

        this.sortButtons.style.display = "block";
        this.filterButtons.style.display = "block";
        this.listContainer.style.display = "block";
    }

    hideList() {
        this.sortButtons.style.display = "none";
        this.filterButtons.style.display = "none";
        this.listContainer.style.display = "none";
    }

    initEventHandlers() {

        this.themeSelect.addEventListener("change", this.themeChangeHandler.bind(this));

        this.sortButtons.addEventListener("click", this.sortClickHandler.bind(this));
        this.sortButtons.querySelectorAll(`[data-sort-order="${this.sortOrder}"]`)[0].checked = true;

        this.filterButtons.addEventListener("change", this.filterChangeHandler.bind(this));
        this.filterButtons.querySelectorAll('[data-filter="showFinished"]')[0].checked = this.showFinished;

        this.listContainer.addEventListener("click", this.listClickHandler.bind(this));
    }

}