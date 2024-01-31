const db = require("../db/db.json");
const fs = require("fs");
const path = require('path');

module.exports = (app) => {
    app.get("/api/notes", (req, res) => {
            res.sendFile(path.join(__dirname, '../db/db.json'));
    })


app.post("/api/notes", (req, res) => {
    const createNote = req.body;
    createNote.id = db.length + 1;
    db.push(createNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(db));
    res.json(db);
});

app.delete("/api/notes/:id", (req,res) => {
    const noteId = parseInt(req.params.id);
    let dbList = fs.readFileSync('./db/db.json');
    dbList = JSON.parse(dbList);
    const dbObject = dbList.filter( (data) => data.id !== noteId)
    fs.writeFileSync("./db/db.json", JSON.stringify(dbObject));
    res.json(dbObject);
})
};