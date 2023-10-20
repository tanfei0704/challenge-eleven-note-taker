const note = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('../helpers/uuid');

note.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for note data`);
    const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
    res.json(JSON.parse(data));
});

note.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to save a new note`);
    const { title, text } = req.body;
    
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        };
        
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
        data.push(newNote);
        
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(data, null, 2));
        res.json(newNote);
    } else {
        res.status(400).json({ error: 'Both title and text are required' });
    }
});

note.get('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request received for ${req.params.id} note data`);
    const noteId = req.params.id;
    
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
    const note = data.find((item) => item.id === noteId);
    
    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ error: 'Note not found' });
    }
});

note.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
    data = data.filter((note) => note.id !== noteId);
    
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(data, null, 2));
    
    res.json(`Note with ID ${noteId} has been deleted 🗑️`);
});

module.exports = note;
