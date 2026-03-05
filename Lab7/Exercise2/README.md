# Online Book Finder - Setup & Execution Guide

Welcome to the Online Book Finder! This simple web application demonstrates MongoDB CRUD and query operations through a Vanilla HTML/JS frontend and a Node.js/Express backend.

## Prerequisites
- **Node.js**: Make sure Node.js is installed on your system.
- **MongoDB**: You need a running MongoDB database. This can be either:
  1. A local MongoDB server (default connection is `mongodb://127.0.0.1:27017/book_finder`)
  2. A MongoDB Atlas cluster.

## Step-by-Step Instructions

### Step 1: Install Dependencies
Open your terminal, navigate to the project directory, and install the required Node modules:
```bash
npm install
```

### Step 2: Configure Environment Variables (Optional)
If you want to use a Custom MongoDB URI (e.g., MongoDB Atlas) or a different port for your server, you can create a `.env` file in the root directory (where `server.js` is).
Add the following lines to your `.env` file:
```env
# Change this if port 3000 is already in use by another application
PORT=3000

# Change this if you are using MongoDB Atlas or a different local DB URL
MONGO_URI=mongodb://127.0.0.1:27017/book_finder
```

**Troubleshooting `EADDRINUSE` Error:**
If you run `npm start` and see an error like `Error: listen EADDRINUSE: address already in use :::3000`, it means port 3000 is currently occupied. You can fix this by changing the `PORT` in the `.env` file to something else like `3001` or `4000`.

### Step 3: Seed the Database
Before running the application, populate the database with dummy data (15 sample books across various categories). Run:
```bash
npm run seed
```
You should see: `Successfully seeded 15 dummy books`.

### Step 4: Start the Server
Start the Express server to serve the frontend files and API routes:
```bash
npm start
```
You should see: `Server running on http://localhost:3000`.

### Step 5: View the Application
Open your web browser and navigate to:
[http://localhost:3000](http://localhost:3000) (or whatever port you set in `.env`).

You can now interact with the web interface to test searching, filtering by categories, sorting, and pagination!

## Project Structure
- `server.js`: The Express server and all API endpoints.
- `seed.js`: Script to clear and populate test data in your MongoDB.
- `public/`: Folder containing the static files (`index.html`, `style.css`, `app.js`).
