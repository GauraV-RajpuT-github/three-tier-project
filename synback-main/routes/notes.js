const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Note = require('../models/Note');
const adminAuth = require('../middleware/adminAuth');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/notes';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const allowedTypes = ['.pdf', '.doc', '.docx', '.ppt', '.pptx'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF, DOC, DOCX, PPT, and PPTX files are allowed.'));
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});


router.get('/', async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/', adminAuth, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const note = new Note({
            title: req.body.title,
            category: req.body.category,
            fileName: req.file.originalname,
            filePath: req.file.path,
            contentType: req.file.mimetype
        });

        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(400).json({ message: error.message });
    }
});

// Download a note
router.get('/download/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (!fs.existsSync(note.filePath)) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.download(note.filePath, note.fileName);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/:id', adminAuth, async (req, res) => {
    try {

        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }


        if (note.filePath && fs.existsSync(note.filePath)) {
            try {
                fs.unlinkSync(note.filePath);
            } catch (fileError) {
                console.error('Error deleting file:', fileError.message);
                return res.status(500).json({ message: 'Failed to delete the file associated with the note' });
            }
        } else {
            console.warn('File not found on the server:', note.filePath);
        }


        await Note.deleteOne({ _id: req.params.id });
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error.message);
        res.status(500).json({ message: 'Failed to delete the note' });
    }
});


router.patch('/:id', adminAuth, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (req.body.title) note.title = req.body.title;
        if (req.body.category) note.category = req.body.category;

        const updatedNote = await note.save();
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
