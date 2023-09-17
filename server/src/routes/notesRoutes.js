const express = require('express');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();
const {
  getMyNotes,
  addNote,
  updateNote,
  deleteNote,
} = require('../controllers/notesController');
const { checkNote } = require('../validations/notesValidation');

//ROUTE 1: Fetching all notes
router.get('/fetch', isAuthenticated, getMyNotes);

//ROUTE 2: Adding a note
router.post('/add', isAuthenticated, checkNote, addNote);

//ROUTE 3: Updating a note
router.put('/update/:id', isAuthenticated, checkNote, updateNote);

//ROUTE 4: Deleting a note
router.delete('/delete/:id', isAuthenticated, deleteNote);

module.exports = router;
