import express from "express";
import { NotesController } from "../controllers/notes-controller";

// Make sure to `.catch()` any errors and pass them along to the `next()`
// middleware in the chain, in this case the error handler.
function wrapAsync(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
}

const router = express.Router();

router.get("/", wrapAsync(NotesController.getNotes.bind(NotesController)));
router.get("/:id/", wrapAsync(NotesController.getNote.bind(NotesController)));

router.post("/", wrapAsync(NotesController.createNote.bind(NotesController)));
router.put("/:id/", wrapAsync(NotesController.updateNote.bind(NotesController)));
router.delete("/:id/", wrapAsync(NotesController.deleteNote.bind(NotesController)));
router.delete("/", wrapAsync(NotesController.deleteAllNotes.bind(NotesController)));

export const notesRoutes = router;
