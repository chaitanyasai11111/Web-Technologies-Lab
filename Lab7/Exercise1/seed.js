require('dotenv').config();
const mongoose = require('mongoose');

// Need to match the same schema from server.js
const noteSchema = new mongoose.Schema({
    title: String,
    subject: String,
    description: String,
    created_date: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student-notes';

const seedNotes = [
    {
        title: 'Midterm Study Guide',
        subject: 'Database Systems',
        description: 'Review chapters 1-5 focusing on SQL aggregate queries and database normalization.'
    },
    {
        title: 'Project Ideas',
        subject: 'Web Technologies',
        description: '1. Task manager app\n2. Real-time chat application\n3. Note-taking app with authentication'
    },
    {
        title: 'Reading Assignment',
        subject: 'Software Engineering',
        description: 'Read the Agile Manifesto and write a 1-page summary on its principles. Due Friday.'
    },
    {
        title: 'Math Homework',
        subject: 'Calculus II',
        description: 'Complete practice problems 15-30 on integration by parts.'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB Atlas...');

        // Clear out existing data
        await Note.deleteMany({});
        console.log('Cleared existing notes collection.');

        // Insert dummy data
        await Note.insertMany(seedNotes);
        console.log(`Successfully seeded database with ${seedNotes.length} dummy notes.`);

        // Close connection
        mongoose.connection.close();
        console.log('Database connection closed.');
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
