const path = requiew('path');
const router = require('express').Router();
const store = require('../db/store');
const { v4: uuidv4 } = require('uuid');
router.get('/notes', (req, res) => {
    store .getNotes()
    store .then((notes) => {
            return res.json(notes);
        })}
router.post,('/notes', (req, res) => {
    req.body.id = uuidv4();
    store
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
}
router.get('/notes/:id', (req, res) => {
    res.sendFile (path.join(__dirname, '../public/notes.html'));
}
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
module.exports = router;