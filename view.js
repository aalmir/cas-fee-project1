var View = (function () {
     // Handlebars ---------------------
    Handlebars.registerHelper('dateFormat', function (value) {
        // Datumsformatierung '1.12.2000'
        return value ? value.toLocaleDateString('de-CH') : "-";
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
    const formContainer = document.getElementById("form-container");

    // View State (TODO: persist)
    let sortOrder = "title";
    let showFinished = true;
    let theme = "white-theme";

    function themeChangeHandler(event) {
        var selectEl = event.target;
        var newTheme = selectEl.options[selectEl.selectedIndex].value;
        if(newTheme !== theme) {
            var body = document.querySelector('body');
            body.classList.add(newTheme);
            body.classList.remove(theme);
            theme = newTheme;
        }
    }

    function listClickHandler(event) {
        const noteId = event.target.dataset.noteId;
        if (noteId) {
            const command = event.target.dataset.command;
            switch (command) {
                case 'delete': // TODO: magic string
                    Model.delete(noteId)
                    renderList();
                    break;
                case 'toggle-finished': // TODO: magic string
                    Model.toggleFinished(noteId)
                    renderList();
                    break;
                case 'edit': // TODO: magic string
                    const note = Model.findNote(noteId);
                    Model.toggleFinished(noteId)
                    hideList();
                    renderForm(note);
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

    function formClickHandler(event) {
        /* TODO */
        return false;
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
        formContainer.style.display = "block";
        formContainer.innerHTML = formTemplate(note);
    }

    function hideForm() {
        formContainer.style.display = "none";
    }

    function init() {
        renderList();

        // Wiring: 
        themeSelect.addEventListener("change", themeChangeHandler);
        sortButtons.addEventListener("click", sortClickHandler);
        filterButtons.addEventListener("change", filterChangeHandler);
        filterButtons.querySelectorAll('[data-filter="showFinished"]')[0].checked = showFinished;
        listContainer.addEventListener("click", listClickHandler);
        formContainer.addEventListener("click", formClickHandler);
    }

    init();

})();