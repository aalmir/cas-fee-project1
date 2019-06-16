import { HandlebarsHelpers } from "./ui/handlebars-helpers.js";

import { LocalStorage } from './data/local-storage.js';

import { NoteService } from './core/note-service.js';
import { PreferencesService } from './core/preferences-service.js';

import { Router } from "./ui/router.js";

import { ListController } from './ui/list-controller.js';
import { LayoutController } from "./ui/layout-controller.js";
import { FormController } from "./ui/form-controller.js";

class Bootstrapper {
    static start() {
        HandlebarsHelpers.registerHelpers();

        const storage = new LocalStorage();
        const noteService = new NoteService(storage);
        const preferencesService = new PreferencesService(storage);

        const router = new Router();

        new LayoutController(preferencesService);
        new ListController(noteService, router, preferencesService);
        new FormController(noteService, router);
        
        router.showList();
    }
}

document.addEventListener('DOMContentLoaded', Bootstrapper.start);
