let xmlData = null;
const table = document.getElementById("empTable");
const message = document.getElementById("message");

/* READ XML */
function loadEmployees() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            xmlData = xhr.responseXML;

            if (!xmlData) {
                showMessage("Malformed XML file!", "error");
                return;
            }

            displayEmployees();
        } else {
            showMessage("Failed to load XML file", "error");
        }
    };

    xhr.onerror = function () {
        showMessage("Network Error!", "error");
    };

    xhr.send();
}

/* DISPLAY */
function displayEmployees() {
    table.innerHTML = "";

    const employees = xmlData.getElementsByTagName("employee");

    if (employees.length === 0) {
        showMessage("No employees found.", "error");
        return;
    }

    for (let i = 0; i < employees.length; i++) {
        const id = employees[i].getElementsByTagName("id")[0].textContent;
        const name = employees[i].getElementsByTagName("name")[0].textContent;
        const dept = employees[i].getElementsByTagName("department")[0].textContent;
        const salary = employees[i].getElementsByTagName("salary")[0].textContent;

        table.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${dept}</td>
                <td>${salary}</td>
                <td>
                    <button onclick="deleteEmployee(${i})">Delete</button>
                </td>
            </tr>
        `;
    }
}

/* CREATE */
document.getElementById("empForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const dept = document.getElementById("department").value;
    const salary = document.getElementById("salary").value;

    const newEmp = xmlData.createElement("employee");

    const idNode = xmlData.createElement("id");
    idNode.textContent = id;
    newEmp.appendChild(idNode);

    const nameNode = xmlData.createElement("name");
    nameNode.textContent = name;
    newEmp.appendChild(nameNode);

    const deptNode = xmlData.createElement("department");
    deptNode.textContent = dept;
    newEmp.appendChild(deptNode);

    const salaryNode = xmlData.createElement("salary");
    salaryNode.textContent = salary;
    newEmp.appendChild(salaryNode);

    xmlData.getElementsByTagName("employees")[0].appendChild(newEmp);

    displayEmployees();
    showMessage("Employee added successfully!", "success");

    this.reset();
});

/* DELETE */
function deleteEmployee(index) {
    const employees = xmlData.getElementsByTagName("employee");
    employees[index].parentNode.removeChild(employees[index]);

    displayEmployees();
    showMessage("Employee deleted successfully!", "success");
}

/* MESSAGE */
function showMessage(msg, type) {
    message.innerText = msg;
    message.className = type;
}

/* Initial Load */
loadEmployees();
