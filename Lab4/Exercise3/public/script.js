const api = "http://localhost:3000/students";
const table = document.getElementById("table");
const form = document.getElementById("form");
const message = document.getElementById("message");

function fetchStudents() {
    fetch(api)
        .then(res => res.json())
        .then(data => {
            table.innerHTML = "";
            data.forEach(s => {
                table.innerHTML += `
                    <tr>
                        <td>${s.id}</td>
                        <td>${s.name}</td>
                        <td>${s.department}</td>
                        <td>${s.marks}</td>
                        <td>
                            <button onclick="deleteStudent('${s.id}')">Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const student = {
        id: id.value,
        name: name.value,
        department: department.value,
        marks: marks.value
    };

    fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    })
    .then(res => res.json())
    .then(data => {
        message.innerText = data.message;
        fetchStudents();
        form.reset();
    });
});

function deleteStudent(id) {
    fetch(`${api}/${id}`, { method: "DELETE" })
    .then(res => res.json())
    .then(data => {
        message.innerText = data.message;
        fetchStudents();
    });
}

fetchStudents();
