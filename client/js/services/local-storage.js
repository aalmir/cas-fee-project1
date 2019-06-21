export class LocalStorage {

    constructor() {
    }

    getNotes() {
        const json = localStorage.getItem('notes_v1') || "[ ]";
        const notes = JSON.parse(json);
        return notes;
    }

    saveNotes(notes) {
        const json = JSON.stringify(notes);
        localStorage.setItem('notes_v1', json);
    }

    getPreferences() {
        const json = localStorage.getItem('prefs_v1') || 'null';
        const preferences = JSON.parse(json);
        return preferences;
    }

    savePreferences(preferences) {
        const json = JSON.stringify(preferences);
        localStorage.setItem('prefs_v1', json);
    }

}