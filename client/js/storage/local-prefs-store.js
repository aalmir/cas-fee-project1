export class LocalPrefsStore {

    constructor(localStorage) {
        this.localStorage = localStorage;
    }

    getPreferences() {
        const json = this.localStorage.getItem("prefs_v1") || "null";
        const preferences = JSON.parse(json);
        return preferences;
    }

    savePreferences(preferences) {
        const json = JSON.stringify(preferences);
        this.localStorage.setItem("prefs_v1", json);
    }

}
