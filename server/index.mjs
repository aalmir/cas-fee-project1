import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import { noteRoutes } from './routes/note-routes';

const app = express();
const router = express.Router();

app.use(express.static(path.resolve('client')));
app.get("/", function (req, res) {
    res.sendFile("/html/index.html", { root: __dirname + '/client/' });
});

app.use(bodyParser.json());
app.use("/notes", noteRoutes);

// Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
});

const hostname = '127.0.0.1';
const port = 3002;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});