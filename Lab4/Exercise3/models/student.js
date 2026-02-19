const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    id: String,
    name: String,
    department: String,
    marks: Number
});

module.exports = mongoose.model("Student", studentSchema);
