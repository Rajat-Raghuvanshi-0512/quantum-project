const { statusCodes, messages } = require('../../constants');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Notes = require('../models/Notes');
const { sendResponse } = require('../utils/authHelper');

exports.getMyNotes = catchAsyncErrors(async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  sendResponse(res, statusCodes.OK, messages.ALL_NOTES, notes);
});

exports.addNote = catchAsyncErrors(async (req, res) => {
  const { title, desc, tag } = req.body;
  const note = new Notes({ title, desc, tag, user: req.user.id });
  await note.save();
  sendResponse(res, statusCodes.OK, messages.ADD_NOTE, note);
});

exports.updateNote = catchAsyncErrors(async (req, res) => {
  let newNote = {};

  const { title, desc, tag } = req.body;

  newNote.title = title;
  newNote.desc = desc;
  newNote.tag = tag;

  let note = await Notes.find({ user: req.user, _id: req.params.id });
  if (!note) {
    return sendResponse(res, statusCodes.BAD_REQUEST, messages.NOT_FOUND);
  }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  sendResponse(res, statusCodes.OK, messages.UPDATED_NOTE, note);
});

exports.deleteNote = catchAsyncErrors(async (req, res) => {
  let note = await Notes.find({ user: req.user, _id: req.params.id });
  if (!note) {
    return sendResponse(res, statusCodes.BAD_REQUEST, messages.NOT_FOUND);
  }
  await Notes.findByIdAndDelete(req.params.id);
  sendResponse(res, statusCodes.OK, messages.DELETE_NOTE);
});
