import { Preferences } from "./preferences.js";

export class PreferencesService {
    constructor(storage) {
        this.storage = storage;
        this.preferences = null;

        this.load();
    }

    getTheme() {
        return this.preferences.theme;
    }

    setTheme(theme) {
        this.preferences.theme = theme;
        this.save();
    }

    getListSortOrder() {
        return this.preferences.listSortOrder;
    }

    setListSortOrder(sortOrder) {
        this.preferences.listSortOrder = sortOrder;
        this.save();
    }

    getListShowDone() {
        return this.preferences.listShowDone;
    }

    setListShowDone(showDone) {
        console.log(showDone)
        this.preferences.listShowDone = showDone;
        this.save();
    }
    load() {
        this.preferences = this.storage.getPreferences() || new Preferences();
    }

    save() {
        this.storage.savePreferences(this.preferences);
    }

}