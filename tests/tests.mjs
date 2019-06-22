/* eslint-disable no-console */
import { notesStore } from '../server/services/notes-store';

/* Some RYO CRUD tests */
async function notesStoreTests() {
    console.log('===== notesStoreTests ====');

    const existingNotes = await notesStore.getAll();
    console.info("existing notes: ", existingNotes.length)

    const newNote = await notesStore.put({ id: 333, title: 'Autumn Leaves' })
        .catch((x) => {
            console.error("put new note failed", x)
        });
    console.assert(newNote.id === 333, newNote);

    const update1 = await notesStore.put({ id: 333, title: 'Summer Breeze' })
        .catch((x) => {
            console.error("put updated note failed", x)
        });
    console.assert(update1 === 1, update1);

    const note1 = await notesStore.get(333)
        .catch((x) => {
            console.error("get note failed", x)
        });
    console.assert(note1.id === 333, note1);
    console.assert(note1.title === "Summer Breeze", note1);
    if(note1.title === "Summer Breeze") {
        console.info("Everything seems ok")
    }

    const del1 = await notesStore.delete(333)
        .catch((x) => {
            console.error("delete note failed", x)
        });
    console.assert(del1 === 1, del1);

    const note2 = await notesStore.get(333)
    .catch((x) => {
        console.error("get note failed", x)
    });
    console.assert(note2 === null, note2);

    const notesAfterTests = await notesStore.getAll();
    console.info("notes after tests: ", notesAfterTests.length)

    console.log('===== notesStoreTests done ====');
}

notesStoreTests().catch((ex) => {
    console.error(ex);
});