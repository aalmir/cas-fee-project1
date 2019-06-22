import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { notesRoutes } from './routes/notes-routes';

// Express
const app = express();

// Body als JSON parsen
app.use(bodyParser.json());

// Routing
express.Router();

// Statischer Pfad "/"
app.use(express.static(path.resolve('client')));

// Note-Services "/notes"
app.use("/notes", notesRoutes);

// Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

// Server
const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);    
});

/*
// Some ad-hoc tests

import { notesStore } from './services/notes-store';

async function tests() {
    console.log('test');

    console.log("getAll", await notesStore.getAll())

    console.log("create", await notesStore.create({ id: 1, title: 'Vanille'}))
    console.log("getAll", await notesStore.getAll())

    console.log("update", await notesStore.update({ id: 1, title: "Schoko" }))
    console.log("getAll", await notesStore.getAll())

    console.log("get 1", await notesStore.get(1))

    console.log("delete", await notesStore.delete(1));
    console.log("getAll", await notesStore.getAll())

    console.log("deleteAll", await notesStore.deleteAll());
    console.log("getAll", await notesStore.getAll())

    console.log("all tests done")
}

tests();
*/