let studentsData = [];
let editIndex = -1;

const table = document.getElementById("studentTable");
const message = document.getElementById("message");

/* FETCH JSON DATA */
function loadStudents() {
    fetch("students.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON file");
            }
            return response.json();
        })
        .then(data => {
            studentsData = data.students;
            displayStudents();
        })
        .catch(error => {
            showMessage("JSON Parsing/Error: " + error.message, "error");
        });
}

/* DISPLAY STUDENTS */
function displayStudents() {
    table.innerHTML = "";

    if (studentsData.length === 0) {
        showMessage("No students found.", "error");
        return;
    }

    studentsData.forEach((student, index) => {
        table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.marks}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    showMessage("Data loaded successfully!", "success");
}

/* FORM SUBMIT */
document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("id").value.trim();
    const name = document.getElementById("name").value.trim();
    const course = document.getElementById("course").value.trim();
    const marks = document.getElementById("marks").value.trim();

    /* VALIDATION */
    if (id === "" || name === "" || course === "" || marks === "") {
        showMessage("All fields are required!", "error");
        return;
    }

    if (marks < 0 || marks > 100) {
        showMessage("Marks must be between 0 and 100", "error");
        return;
    }

    const student = { id, name, course, marks };

    if (editIndex === -1) {
        /* CREATE */
        const exists = studentsData.some(s => s.id === id);
        if (exists) {
            showMessage("Student ID already exists!", "error");
            return;
        }

        studentsData.push(student);
        showMessage("Student added successfully!", "success");

    } else {
        /* UPDATE */
        studentsData[editIndex] = student;
        editIndex = -1;
        showMessage("Student updated successfully!", "success");
    }

    displayStudents();
    this.reset();
});

/* EDIT */
function editStudent(index) {
    const student = studentsData[index];

    document.getElementById("id").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("course").value = student.course;
    document.getElementById("marks").value = student.marks;

    editIndex = index;
}

/* DELETE */
function deleteStudent(index) {
    studentsData.splice(index, 1);
    displayStudents();
    showMessage("Student deleted successfully!", "success");
}

/* MESSAGE FUNCTION */
function showMessage(msg, type) {
    message.innerText = msg;
    message.className = type;
}

/* INITIAL LOAD */
loadStudents();
