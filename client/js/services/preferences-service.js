import { Preferences } from "./preferences.js";

export class PreferencesService {
    constructor(prefsStore) {
        this.prefStore = prefsStore;
        this.prefs = null;

        this.load();
    }

    getTheme() {
        return this.prefs.theme;
    }

    setTheme(theme) {
        this.prefs.theme = theme;
        this.save();
    }

    getListSortOrder() {
        return this.prefs.listSortOrder;
    }

    setListSortOrder(sortOrder) {
        this.prefs.listSortOrder = sortOrder;
        this.save();
    }

    getListShowDone() {
        return this.prefs.listShowDone;
    }

    setListShowDone(showDone) {
        this.prefs.listShowDone = showDone;
        this.save();
    }
    load() {
        this.prefs = this.prefStore.getPreferences() || new Preferences();
    }

    save() {
        this.prefStore.savePreferences(this.prefs);
    }

}