import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { noteRoutes } from './routes/note-routes';

// Express
const app = express();

// Body als JSON parsen
app.use(bodyParser.json());

// Routing
express.Router();

// Statischer Pfad "/"
app.use(express.static(path.resolve('client')));

// Note-Services "/notes"
app.use("/notes", noteRoutes);

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

import { noteStore } from './services/note-store';

async function tests() {
    console.log('test');

    console.log("getAll", await noteStore.getAll())

    console.log("create", await noteStore.create({ id: 1, title: 'Vanille'}))
    console.log("getAll", await noteStore.getAll())

    console.log("update", await noteStore.update({ id: 1, title: "Schocko" }))
    console.log("getAll", await noteStore.getAll())

    console.log("get 1", await noteStore.get(1))

    console.log("delete", await noteStore.delete(1));
    console.log("getAll", await noteStore.getAll())

    console.log("deleteAll", await noteStore.deleteAll());
    console.log("getAll", await noteStore.getAll())

    console.log("all tests done")
}

//setTimeout(tests, 1);
