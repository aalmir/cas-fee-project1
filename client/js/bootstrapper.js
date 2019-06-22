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

class Bootstrapper {
    static start() {
        HandlebarsHelpers.registerHelpers();

        const prefsStore = new LocalPrefsStore();
        const preferencesService = new PreferencesService(prefsStore);

        const httpHelper = new HttpHelper();
        const notesStore = new RestNotesStore(httpHelper);
        //const notesStore = new LocalNotesStore();
        const noteService = new NoteService(notesStore); 

        const router = new Router();

        new LayoutController(preferencesService);
        new ListController(noteService, router, preferencesService);
        new FormController(noteService, router);
        
        router.showList();
    }
}

document.addEventListener('DOMContentLoaded', Bootstrapper.start);
