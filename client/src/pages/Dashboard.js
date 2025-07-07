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

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) loadNotes();
    });
  }, []);

  const loadNotes = async () => {
    try {
      const res = await fetchNotes();
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  };

  const handleAddOrUpdate = async (data) => {
    try {
      if (editingNote) {
        const res = await updateNote(editingNote._id, data);
        setNotes(notes.map((n) => (n._id === res.data._id ? res.data : n)));
      } else {
        const res = await createNote(data);
        setNotes([...notes, res.data]);
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