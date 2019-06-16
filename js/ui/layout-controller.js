export class LayoutController {
    constructor() {
         // DOM Elements
         this.themeSelect = document.querySelector("#theme-control select");
 
        // View State
        this.theme = "bright-theme";

        // Init
        this.initEventHandlers();
    }

    themeChangeHandler(event) {
        const selectEl = event.target;
        const newTheme = selectEl.options[selectEl.selectedIndex].value;
        if (newTheme !== this.theme) {
            const body = document.querySelector('body');
            body.classList.add(newTheme);
            body.classList.remove(this.theme);
            this.theme = newTheme;
        }
    }

    initEventHandlers() {
        this.themeSelect.addEventListener("change", this.themeChangeHandler.bind(this));
    }

}