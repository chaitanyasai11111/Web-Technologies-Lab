let products = [];
let editIndex = -1;

const table = document.getElementById("inventoryTable");
const message = document.getElementById("message");
const totalValueSpan = document.getElementById("totalValue");

/* LOAD JSON */
function loadInventory() {
    fetch("inventory.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON file");
            }
            return response.json();
        })
        .then(data => {
            products = data.products;
            displayProducts();
        })
        .catch(error => {
            showMessage("Error: " + error.message, "error");
        });
}

/* DISPLAY PRODUCTS */
function displayProducts(filteredProducts = products) {
    table.innerHTML = "";
    let totalValue = 0;

    if (filteredProducts.length === 0) {
        showMessage("No products found.", "error");
        return;
    }

    filteredProducts.forEach((product, index) => {
        const inventoryValue = product.price * product.stock;
        totalValue += inventoryValue;

        const row = document.createElement("tr");

        if (product.stock < 5) {
            row.classList.add("low-stock");
        }

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₹ ${product.price}</td>
            <td>${product.stock}</td>
            <td>₹ ${inventoryValue}</td>
            <td>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;

        table.appendChild(row);
    });

    totalValueSpan.innerText = totalValue;
    showMessage("Data displayed successfully!", "success");
}

/* FORM SUBMIT (ADD / UPDATE) */
document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("id").value.trim();
    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);

    /* VALIDATION */
    if (!id || !name || !category || isNaN(price) || isNaN(stock)) {
        showMessage("All fields must be filled correctly!", "error");
        return;
    }

    if (price <= 0 || stock < 0) {
        showMessage("Invalid price or stock value!", "error");
        return;
    }

    const product = { id, name, category, price, stock };

    if (editIndex === -1) {
        const exists = products.some(p => p.id === id);
        if (exists) {
            showMessage("Product ID already exists!", "error");
            return;
        }

        products.push(product);
        showMessage("Product added successfully!", "success");

    } else {
        products[editIndex] = product;
        editIndex = -1;
        showMessage("Product updated successfully!", "success");
    }

    displayProducts();
    this.reset();
});

/* EDIT PRODUCT */
function editProduct(index) {
    const product = products[index];

    document.getElementById("id").value = product.id;
    document.getElementById("name").value = product.name;
    document.getElementById("category").value = product.category;
    document.getElementById("price").value = product.price;
    document.getElementById("stock").value = product.stock;

    editIndex = index;
}

/* DELETE PRODUCT */
function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
    showMessage("Product deleted successfully!", "success");
}

/* SEARCH BY CATEGORY */
function searchByCategory() {
    const searchValue = document.getElementById("searchCategory").value.trim().toLowerCase();

    if (!searchValue) {
        showMessage("Enter a category to search.", "error");
        return;
    }

    const filtered = products.filter(p =>
        p.category.toLowerCase() === searchValue
    );

    displayProducts(filtered);
}

/* MESSAGE FUNCTION */
function showMessage(msg, type) {
    message.innerText = msg;
    message.className = type;
}

/* INITIAL LOAD */
loadInventory();
