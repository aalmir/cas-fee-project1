export class LayoutController {
    constructor(preferencesService) {
        this.preferencesService = preferencesService;
        this.theme = this.preferencesService.getTheme() || "bright-theme";

        this.themeSelect = document.querySelector("#theme-control select");
        this.themeSelect.querySelector(`[value="${this.theme}"]`).selected = true;

        const body = document.querySelector("body");
        body.classList.add(this.theme);

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
            this.preferencesService.setTheme(newTheme);
        }
    }

    initEventHandlers() {
        this.themeSelect.addEventListener("change", this.themeChangeHandler.bind(this));
    }

}