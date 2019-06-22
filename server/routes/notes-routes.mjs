import express from 'express';
import { notesController } from '../controllers/notes-controller';

// Make sure to `.catch()` any errors and pass them along to the `next()`
// middleware in the chain, in this case the error handler.
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
}

const router = express.Router();

router.get("/", wrapAsync(notesController.getNotes.bind(notesController)));
router.get("/:id/", wrapAsync(notesController.getNote.bind(notesController)));

router.post("/", wrapAsync(notesController.createNote.bind(notesController)));
router.put("/:id/", wrapAsync(notesController.updateNote.bind(notesController)));
router.delete("/:id/", wrapAsync(notesController.deleteNote.bind(notesController)));
router.delete("/", wrapAsync(notesController.deleteAllNotes.bind(notesController)));

export const notesRoutes = router;