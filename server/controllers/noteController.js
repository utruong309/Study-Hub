//logic for handling notes 
import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.user.uid }); //fetch all notes for the logged-in user
  res.json(notes);
};

export const createNote = async (req, res) => { //add a new note to MongoDB
  const note = new Note({ ...req.body, userId: req.user.uid }); //req.body from frontend
  await note.save();
  res.status(201).json(note); 
};

export const updateNote = async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.uid }, //find, get the id in the route
    req.body, //contains updated fields 
    { new: true } //tells Mongoose to return the updated note 
  );
  res.json(note);
};

export const deleteNote = async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.uid });
  res.json({ success: true });
};