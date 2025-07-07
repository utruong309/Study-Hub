import axios from "axios";

// Base URL pointing to the backend API
const API_URL = "http://localhost:5000/api/notes";

// Get Firebase token for authentication
const getToken = async () => {
  const { getAuth } = await import("firebase/auth");
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");
  return await user.getIdToken(); // Firebase JWT
};

// Fetch all notes for the logged-in user
export const fetchNotes = async () => {
  const token = await getToken();
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Create a new note
export const createNote = async (noteData) => {
  const token = await getToken();
  const response = await axios.post(API_URL, noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update an existing note
export const updateNote = async (id, updatedData) => {
  const token = await getToken();
  const response = await axios.put(`${API_URL}/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete a note
export const deleteNote = async (id) => {
  const token = await getToken();
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};