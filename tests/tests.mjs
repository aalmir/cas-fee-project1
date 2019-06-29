/* eslint-disable no-console */
import { notesStore } from "../server/services/notes-store.mjs";

/* Some RYO CRUD tests */
async function notesStoreTests() {
    console.log("===== notesStoreTests ====");

    const existingNotes = await notesStore.getAll();
    console.info("existing notes: ", existingNotes.length);

    const newNote = await notesStore.create({ title: "Autumn Leaves" })
        .catch((x) => {
            console.error("create new note failed", x);
        });
    const theId = newNote.id;
    console.log("new id", theId);
    console.assert(theId > 0, newNote);

    const update1 = await notesStore.update(theId, { title: "Summer Breeze" })
        .catch((x) => {
            console.error("update note failed", x);
        });
    console.assert(update1 === 1, update1);

    const note1 = await notesStore.get(theId)
        .catch((x) => {
            console.error("get note failed", x);
        });
    console.assert(note1.id === theId, note1);
    console.assert(note1.title === "Summer Breeze", note1);
    if (note1.title === "Summer Breeze") {
        console.info("Everything seems ok");
    }

    const del1 = await notesStore.delete(theId)
        .catch((x) => {
            console.error("delete note failed", x);
        });
    console.assert(del1 === 1, del1);

    const note2 = await notesStore.get(theId)
        .catch((x) => {
            console.error("get note failed", x);
        });
    console.assert(note2 === null, note2);

    const notesAfterTests = await notesStore.getAll();
    console.info("notes after tests: ", notesAfterTests.length);

    console.log("===== notesStoreTests done ====");
}

notesStoreTests().catch((ex) => {
    console.error(ex);
});
