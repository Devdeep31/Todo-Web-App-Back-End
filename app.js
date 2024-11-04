//End-Points

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Notes = require('./models/notes');
const { log } = require('console');

const app = express();
const PORT = 3030;

app.use(cors());

app.use(bodyParser.json());

app.post('/addNote', async (req, res) => {
    try {
        const
            { note_title, note_description } = req.body;
        const newNotes = await Notes.create({ note_title, note_description });
        res.status(201).json(newNotes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//Get 
app.get('/getNotes', async (req, res) => {
    try {
        const notes = await Notes.findAll();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//Delete
app.delete('/deleteNote/:id', async (req, res) => {
    const noteId = req.params.id;
    try {
        const delNote = await Notes.destroy({ where: { id: noteId } });
        if (delNote === 1) {
            res.status(200).json({ message: 'note deleted successfully.' });

        } else {
            res.status(400).json({ message: 'Note not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//Update
app.put('/updateNote/:id', async (req, res) => {
    const noteId = req.params.id;
    const { note_title, note_description } = req.body;
    try {
        const updateNote = await Notes.update(
            { note_title, note_description },
            { where: { id: noteId } }
        );

        if (updateNote[0] === 1) {
            res.status(200).json({ message: 'Note updated successfully.' });
        } else {
            res.status(400).json({ message: 'Note not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//Get Note By ID
app.get('/getNote/:id', async (req, res) => {
    const noteId = req.params.id;
    try {
        const note = await Notes.findOne(

            { where: { id: noteId } }
        );
        if (!note) {
            return res.status(400).json({ message: 'Note Not found' })
        }
        return res.status(200).json(note);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});