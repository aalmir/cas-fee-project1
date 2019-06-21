import express from 'express';
import { notesController } from '../controllers/notes-controller';


function catchAsyncErrors(fn) {
    return (req, res, next) => {
        const routePromise = fn(req, res, next);
        if (routePromise.catch) {
            routePromise.catch(err => next(err));
        }
    }
}
const router = express.Router();

router.get("/", catchAsyncErrors((req, res, next) => 
        notesController.getNotes(req, res, next)));
router.get("/:id/", catchAsyncErrors((req, res, next) => 
        notesController.getNote.bind(notesController)));

router.post("/", catchAsyncErrors((req, res, next) => 
        notesController.createNote.bind(notesController)));
router.patch("/:id/", catchAsyncErrors((req, res, next) => 
        notesController.updateNote.bind(notesController)));
router.delete("/:id/", catchAsyncErrors((req, res, next) => 
        notesController.deleteNote.bind(notesController)));

export const noteRoutes = router;