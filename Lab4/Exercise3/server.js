const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Student = require("./models/student");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/studentDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

/* READ */
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.status(200).json(students);
});

/* CREATE */
app.post("/students", async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(200).json({ message: "Student added successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error adding student" });
    }
});

/* UPDATE */
app.put("/students/:id", async (req, res) => {
    const result = await Student.findOneAndUpdate(
        { id: req.params.id },
        req.body
    );

    if (!result)
        return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ message: "Student updated successfully" });
});

/* DELETE */
app.delete("/students/:id", async (req, res) => {
    const result = await Student.findOneAndDelete({ id: req.params.id });

    if (!result)
        return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ message: "Student deleted successfully" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
