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