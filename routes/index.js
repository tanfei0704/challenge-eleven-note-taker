const note = require('express').Router();
const fs = require('fs');
const path = require('path'); // Added missing 'path' module
const uuid = require('../helpers/uuid');

note.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for note data`);
    const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'); // Read file
    res.json(JSON.parse(data)); // Send JSON data as response
});

note.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to save new note`);
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid()
        };
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8')); // Read file
        data.push(newNote);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(data, null, 2)); // Write data
        res.json(newNote); // Send the newly created note as a response
    } else {
        res.status(400).json({ error: 'Both title and text are required' }); // Send a 400 Bad Request response if data is missing
    }
});


module.exports = note;

