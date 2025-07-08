//shows notes from MongoDB
//lets users add, edit, and delete notes 

import React, { useEffect, useState } from "react";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../api/notes";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const [notes, setNotes] = useState([]); // All user’s notes 
  const [editingNote, setEditingNote] = useState(null); // Currently edited note
  const [user, setUser] = useState(null); // Logged-in user
  const [loading, setLoading] = useState(true);

//
  useEffect(() => { //runs the logic here once Dashboard.js component appear 
    onAuthStateChanged(getAuth(), (firebaseUser) => { //onAuthStateChanged is a Firebase method that listens for login/logout 
      setUser(firebaseUser); //set user 
      if (firebaseUser) loadNotes(); //fetch notes 
      else setLoading(false); 
    });
  }, []); //whenever the auth state changes, (e.g., user signs in or out), the callback runs 

  console.log("Firebase user:", firebaseUser);
  
  const loadNotes = async () => {
    try {
      const notes = await fetchNotes(); //call API, axios.get to the backend, send data back
      setNotes(notes); 
      console.log(notes); 
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
    setLoading(false); 
  };

  if (loading) return <LoadingSpinner />;

  const handleAddOrUpdate = async (data) => { //edit note, data is the new note 
    try {
      if (editingNote) {
        const res = await updateNote(editingNote._id, data); //call API
        setNotes(notes.map((n) => (n._id === res._id ? res : n))); //select only ids 
      } else {
        const res = await createNote(data);
        setNotes([...notes, res]);
      }
      setEditingNote(null);
    } catch (err) {
      console.error("Error saving note", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };

  const handleEdit = (note) => setEditingNote(note);
  const cancelEdit = () => setEditingNote(null);

  if (!user) return <p>Please log in to view notes.</p>;

  return (
    <div>
      <h2>Your Notes</h2>
      <NoteForm
        onSubmit={handleAddOrUpdate}
        existingNote={editingNote}
        cancelEdit={cancelEdit}
      />
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;