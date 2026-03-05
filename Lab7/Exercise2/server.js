require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/book_finder';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  price: Number,
  rating: Number,
  year: Number
});

const Book = mongoose.model('Book', bookSchema);

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
// Search by Title: GET /books/search?title=<query>
app.get('/books/search', async (req, res) => {
  try {
    const query = req.query.title || '';
    const books = await Book.find({ title: { $regex: query, $options: "i" } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Filter by Category: GET /books/category/:category
app.get('/books/category/:category', async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Sort Books by price
app.get('/books/sort/price', async (req, res) => {
  try {
    const books = await Book.find().sort({ price: 1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Sort Books by rating
app.get('/books/sort/rating', async (req, res) => {
  try {
    const books = await Book.find().sort({ rating: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Top Rated Books (rating >= 4, limit 5)
app.get('/books/top', async (req, res) => {
  try {
    const books = await Book.find({ rating: { $gte: 4 } }).limit(5);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Pagination (Load More): GET /books?page=<page_number>
app.get('/books', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const books = await Book.find().skip((page - 1) * limit).limit(limit);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
