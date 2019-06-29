// Copy 3rd party assets
const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "node_modules");
const targetDir = path.join(__dirname, "client", "libs");

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}

fs.copyFileSync(
    path.join(sourceDir, "handlebars", "dist", "handlebars.min.js"),
    path.join(targetDir, "handlebars.min.js"),
);
