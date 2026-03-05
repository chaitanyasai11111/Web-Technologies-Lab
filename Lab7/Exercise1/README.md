# Student Notes Manager

A minimal, ultra-simple "Student Notes Manager" web application demonstrating full MongoDB CRUD operations (Create, Read, Update, Delete).

## Tech Stack
- **Frontend:** Plain HTML, Vanilla JavaScript (Fetch API), Vanilla CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)

---

## Getting Started Instructions

### 1. Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or higher)
- MongoDB Atlas account (or a local MongoDB server)

### 2. Installation
Open your terminal, navigate to this project folder, and install the required dependencies:

```bash
npm install
```

### 3. Database Configuration
This project is pre-configured to connect to a specific MongoDB Atlas database via the `.env` file.

Verify that your `.env` file exists in the root directory and contains the following:
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?appName=Cluster0
PORT=3000
```
*(Note: Replace the URI with your own MongoDB connection string if you wish to use a different database).*

### 4. Seed the Database (Optional but Recommended)
To populate your database with dummy notes and clear out any old testing data, run the seed script:

```bash
npm run seed
```

### 5. Running the Application
Start the Node.js Express server:

```bash
npm start
```
*(Alternatively, you can run `node server.js`)*

Once the server is running, and you see `Connected to MongoDB` in your terminal, open your web browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

---

## Features
- **Create:** Add new notes with a Title, Subject, and Description.
- **Read:** View a grid of all your saved notes.
- **Update:** Edit the title and description of any existing note.
- **Delete:** Remove notes you no longer need.
