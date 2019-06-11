var Controller = (function () {
    // Handlebars ---------------------
    Handlebars.registerHelper('dateFormat', function (value) {
        // Datumsformatierung '1.12.2000'
        return value ? value.toLocaleDateString('de-CH') : "";
    });
    Handlebars.registerHelper('checkedwhen', function (value1, value2) {
        return value1 === value2 ? 'checked' : '';
    });
    const listTemplateSrc = document.getElementById("notes-list-template").innerHTML;
    const listTemplate = Handlebars.compile(listTemplateSrc);
    const formTemplateSrc = document.getElementById("notes-form-template").innerHTML;
    const formTemplate = Handlebars.compile(formTemplateSrc);
    // --------------------------------

    // DOM Elements
    const themeSelect = document.querySelector("#theme-control select");
    const sortButtons = document.getElementById("sort-buttons");
    const filterButtons = document.getElementById("filter-buttons");
    const listContainer = document.getElementById("list-container");
    const form = document.getElementById("notes-form");

    // View State (TODO: persist)
    let sortOrder = "priority";
    let showFinished = true;
    let theme = "white-theme";

    function themeChangeHandler(event) {
        var selectEl = event.target;
        var newTheme = selectEl.options[selectEl.selectedIndex].value;
        if (newTheme !== theme) {
            var body = document.querySelector('body');
            body.classList.add(newTheme);
            body.classList.remove(theme);
            theme = newTheme;
        }
    }

    function listClickHandler(event) {
        const noteId = event.target.dataset.noteId;
        const command = event.target.dataset.command;
        if (command) {
            switch (command) {
                case 'delete': // TODO: magic string
                    if(confirm("Do you really want to delete this note?")) {
                        Model.delete(noteId)
                        renderList();
                    }
                    break;
                case 'toggle-finished':
                    Model.toggleFinished(noteId)
                    renderList();
                    break;
                case 'edit':
                    const note = Model.findNote(noteId);
                    hideList();
                    const editFormModel = getFormDataFromModel(note);
                    renderForm(editFormModel);
                    break;
                case 'create':
                    hideList();
                    const createFormModel = getDefaultFormModel();
                    renderForm(createFormModel);
                    break;
                case 'seed':
                    Model.seed();
                    renderList();
                    break;
                case 'clear':
                    Model.clear();
                    renderList();
                    break;
                case 'load':
                    Model.load();
                    renderList();
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

    function sortClickHandler(event) {
        const newSortOrder = event.target.dataset.sortOrder;
        if (newSortOrder) {
            sortOrder = newSortOrder;
            renderList();
            event.stopPropagation();
        }
    }

    function filterChangeHandler(event) {
        const filter = event.target.dataset.filter;
        if (filter === "showFinished") {
            showFinished = event.target.checked;
            renderList();
        }
    }

    function renderList() {
        sortButtons.style.display = "block";
        filterButtons.style.display = "block";
        listContainer.style.display = "block";
        const list = Model.getListSorted(sortOrder, showFinished);
        listContainer.innerHTML = listTemplate(list);
    }

    function hideList() {
        sortButtons.style.display = "none";
        filterButtons.style.display = "none";
        listContainer.style.display = "none";
    }

    function renderForm(note) {
        form.style.display = "block";
        form.innerHTML = formTemplate(note);
    }

    function formClickHandler(event) {
        const command = event.target.dataset.command;
        switch (command) {
            case 'cancel':
                hideForm()
                renderList();
                break;
            default:
                break;
        }
    }

    function formSubmitHandler(event) {
        event.preventDefault();
        const form = event.target;
        const data = getFormDataFromForm(form);
        if(data.id === "") {
            Model.addNote(data);
        }
        else {
            const id = parseInt(data.id);
            const note = Model.findNote(id);
            Model.updateNote(data, note);
        }
        hideForm()
        renderList();
}

    function getFormDataFromForm(form) {
        var formModel = {
            title: form.querySelector("[name=\"title\"]").value,
            description: form.querySelector("[name=\"description\"]").value,
            priority: form.querySelector("[name=\"priority\"]:checked").value,
            dueDate: form.querySelector("[name=\"dueDate\"]").value,
            id: form.querySelector("[name=\"id\"]").value
        }

        return formModel;
    }

    function getFormDataFromModel(note) {
        var formModel = {
            title: note.title,
            description: note.description,
            priority: note.priority.toString(),
            dueDate:  note.dueDate === null ? "" : note.dueDate.toISOString("T").substring(0, 10),
            id: note.id.toString()
        }

        return formModel;
    }

    function getDefaultFormModel() {
        var formModel = {
            title: "My note",
            description: "",
            priority: "2",
            dueDate: "",
            id: ""
        }

        return formModel;
    }

    function hideForm() {
        form.style.display = "none";
    }

    function init() {
        renderList();

        // Handlers: 

        themeSelect.addEventListener("change", themeChangeHandler);

        sortButtons.addEventListener("click", sortClickHandler);
        sortButtons.querySelectorAll(`[data-sort-order="${sortOrder}"]`)[0].checked = true;

        filterButtons.addEventListener("change", filterChangeHandler);
        filterButtons.querySelectorAll('[data-filter="showFinished"]')[0].checked = showFinished;

        listContainer.addEventListener("click", listClickHandler);

        form.addEventListener("click", formClickHandler);
        form.addEventListener("submit", formSubmitHandler);
        
    }

    init();

})();