/* eslint-disable class-methods-use-this */

export class LocalPrefsStore {

    getPreferences() {
        const json = localStorage.getItem("prefs_v1") || "null";
        const preferences = JSON.parse(json);
        return preferences;
    }

    savePreferences(preferences) {
        const json = JSON.stringify(preferences);
        localStorage.setItem("prefs_v1", json);
    }

}
