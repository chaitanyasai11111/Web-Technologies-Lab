require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/book_finder';

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    price: Number,
    rating: Number,
    year: Number
});

const Book = mongoose.model('Book', bookSchema);

const dummyBooks = [
    { title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Programming", price: 45, rating: 4.8, year: 1999 },
    { title: "Clean Code", author: "Robert C. Martin", category: "Programming", price: 50, rating: 4.7, year: 2008 },
    { title: "JavaScript: The Good Parts", author: "Douglas Crockford", category: "Programming", price: 30, rating: 4.3, year: 2008 },
    { title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "Programming", price: 35, rating: 4.6, year: 2011 },
    { title: "Design Patterns", author: "Erich Gamma", category: "Programming", price: 55, rating: 4.5, year: 1994 },

    { title: "Dune", author: "Frank Herbert", category: "Fiction", price: 20, rating: 4.8, year: 1965 },
    { title: "Neuromancer", author: "William Gibson", category: "Fiction", price: 18, rating: 4.5, year: 1984 },
    { title: "1984", author: "George Orwell", category: "Fiction", price: 15, rating: 4.9, year: 1949 },
    { title: "Fahrenheit 451", author: "Ray Bradbury", category: "Fiction", price: 16, rating: 4.6, year: 1953 },
    { title: "Brave New World", author: "Aldous Huxley", category: "Fiction", price: 17, rating: 4.7, year: 1932 },

    { title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", price: 25, rating: 4.7, year: 1988 },
    { title: "Cosmos", author: "Carl Sagan", category: "Science", price: 22, rating: 4.8, year: 1980 },
    { title: "The Selfish Gene", author: "Richard Dawkins", category: "Science", price: 24, rating: 4.4, year: 1976 },
    { title: "Sapiens", author: "Yuval Noah Harari", category: "Science", price: 28, rating: 4.6, year: 2011 },
    { title: "The Origin of Species", author: "Charles Darwin", category: "Science", price: 12, rating: 4.5, year: 1859 }
];

async function seedDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Book.deleteMany({});
        console.log('Cleared existing books collection');

        // Insert new data
        await Book.insertMany(dummyBooks);
        console.log(`Successfully seeded ${dummyBooks.length} dummy books`);

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDB();
