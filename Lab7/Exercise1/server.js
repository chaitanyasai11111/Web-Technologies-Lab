require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student-notes';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Mongoose Schema & Model
const noteSchema = new mongoose.Schema({
  title: String,
  subject: String,
  description: String,
  created_date: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);

// Routes
// 1. Create Note
app.post('/notes', async (req, res) => {
  try {
    const { title, subject, description } = req.body;
    const newNote = new Note({ title, subject, description });
    await newNote.save();
    res.status(201).json({ message: 'Note created successfully', note: newNote });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// 2. View Notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// 3. Update Note
app.put('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    // updateOne requirement as per lab sheet
    await Note.updateOne(
      { _id: id }, 
      { $set: { title: title, description: description } }
    );
    
    res.status(200).json({ message: 'Note updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// 4. Delete Note
app.delete('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // deleteOne requirement as per lab sheet
    await Note.deleteOne({ _id: id });
    
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
