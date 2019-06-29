import { HandlebarsHelpers } from "./ui/handlebars-helpers.js";

import { LocalPrefsStore } from "./storage/local-prefs-store.js";

import { HttpHelper } from "./utils/http-helper.js";
import { RestNotesStore } from "./storage/rest-notes-store.js";
import { LocalNotesStore } from "./storage/local-notes-store.js";

import { NotesService } from "./services/notes-service.js";
import { PreferencesService } from "./services/preferences-service.js";

import { Router } from "./ui/router.js";

import { ListController } from "./ui/list-controller.js";
import { LayoutController } from "./ui/layout-controller.js";
import { FormController } from "./ui/form-controller.js";

const USE_REMOTE_STORAGE = true;

class Bootstrapper {

    static start() {
        HandlebarsHelpers.registerHelpers();

        const prefsStore = new LocalPrefsStore();
        const preferencesService = new PreferencesService(prefsStore);

        let notesStore;
        if (USE_REMOTE_STORAGE) {
            notesStore = new RestNotesStore(new HttpHelper());
        } else {
            notesStore = new LocalNotesStore();
        }
        const notesService = new NotesService(notesStore);

        const router = new Router();

        // eslint-disable-next-line no-new
        new LayoutController(preferencesService);

        // eslint-disable-next-line no-new
        new ListController(notesService, router, preferencesService);

        // eslint-disable-next-line no-new
        new FormController(notesService, router);

        router.showList();
    }

}

document.addEventListener("DOMContentLoaded", Bootstrapper.start);
