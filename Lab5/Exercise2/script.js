let xmlDoc = null;
const table = document.getElementById("bookTable");
const message = document.getElementById("message");

/* LOAD XML USING AJAX */
function loadBooks() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            xmlDoc = xhr.responseXML;

            if (!xmlDoc) {
                showMessage("Malformed XML file!", "error");
                return;
            }

            displayBooks();
        } else {
            showMessage("Failed to load XML file", "error");
        }
    };

    xhr.onerror = function () {
        showMessage("Network Error!", "error");
    };

    xhr.send();
}

/* DISPLAY BOOKS */
function displayBooks() {
    table.innerHTML = "";

    const books = xmlDoc.getElementsByTagName("book");

    if (books.length === 0) {
        showMessage("No books found.", "error");
        return;
    }

    for (let i = 0; i < books.length; i++) {
        const id = books[i].getElementsByTagName("id")[0].textContent;
        const title = books[i].getElementsByTagName("title")[0].textContent;
        const author = books[i].getElementsByTagName("author")[0].textContent;
        const status = books[i].getElementsByTagName("status")[0].textContent;

        table.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${title}</td>
                <td>${author}</td>
                <td>${status}</td>
                <td>
                    <button onclick="toggleStatus(${i})">Toggle Status</button>
                    <button onclick="deleteBook(${i})">Delete</button>
                </td>
            </tr>
        `;
    }

    showMessage("Data loaded successfully!", "success");
}

/* ADD BOOK */
document.getElementById("bookForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("id").value.trim();
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const status = document.getElementById("status").value;

    if (id === "" || title === "" || author === "") {
        showMessage("All fields are required!", "error");
        return;
    }

    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            showMessage("Book ID already exists!", "error");
            return;
        }
    }

    const newBook = xmlDoc.createElement("book");

    const idNode = xmlDoc.createElement("id");
    idNode.textContent = id;
    newBook.appendChild(idNode);

    const titleNode = xmlDoc.createElement("title");
    titleNode.textContent = title;
    newBook.appendChild(titleNode);

    const authorNode = xmlDoc.createElement("author");
    authorNode.textContent = author;
    newBook.appendChild(authorNode);

    const statusNode = xmlDoc.createElement("status");
    statusNode.textContent = status;
    newBook.appendChild(statusNode);

    xmlDoc.getElementsByTagName("library")[0].appendChild(newBook);

    displayBooks();
    showMessage("Book added successfully!", "success");
    this.reset();
});

/* UPDATE STATUS */
function toggleStatus(index) {
    const books = xmlDoc.getElementsByTagName("book");
    const statusNode = books[index].getElementsByTagName("status")[0];

    if (statusNode.textContent === "Available") {
        statusNode.textContent = "Not Available";
    } else {
        statusNode.textContent = "Available";
    }

    displayBooks();
    showMessage("Status updated successfully!", "success");
}

/* DELETE BOOK */
function deleteBook(index) {
    const books = xmlDoc.getElementsByTagName("book");
    books[index].parentNode.removeChild(books[index]);

    displayBooks();
    showMessage("Book deleted successfully!", "success");
}

/* MESSAGE FUNCTION */
function showMessage(msg, type) {
    message.innerText = msg;
    message.className = type;
}

/* INITIAL LOAD */
loadBooks();
