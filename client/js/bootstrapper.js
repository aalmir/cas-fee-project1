import { HandlebarsHelpers } from "./ui/handlebars-helpers.js";

import { LocalPrefsStore } from './storage/local-prefs-store.js';

import { HttpHelper } from "./utils/http-helper.js";
import { RestNotesStore } from './storage/rest-notes-store.js';
import { LocalNotesStore } from './storage/local-notes-store.js';

import { NoteService } from './services/note-service.js';
import { PreferencesService } from './services/preferences-service.js';

import { Router } from "./ui/router.js";

import { ListController } from './ui/list-controller.js';
import { LayoutController } from "./ui/layout-controller.js";
import { FormController } from "./ui/form-controller.js";

const USE_REMOTE_STORAGE = true;
const DEBUG_MODE = false;

class Bootstrapper {
    static start() {
        HandlebarsHelpers.registerHelpers();

        const prefsStore = new LocalPrefsStore();
        const preferencesService = new PreferencesService(prefsStore);

        let notesStore;
        if (USE_REMOTE_STORAGE) {
            notesStore = new RestNotesStore(new HttpHelper());
        }
        else {
            notesStore = new LocalNotesStore();
        }
        const noteService = new NoteService(notesStore);

        const router = new Router();

        new LayoutController(preferencesService);
        new ListController(noteService, router, preferencesService, DEBUG_MODE);
        new FormController(noteService, router);

        router.showList();
    }
}

document.addEventListener('DOMContentLoaded', Bootstrapper.start);
