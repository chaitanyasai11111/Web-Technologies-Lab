const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const statusDiv = document.getElementById("status");

let debounceTimer;

// Debounce Function
function debounce(callback, delay) {
    return function (...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
}

// Search Function
function searchProducts() {
    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
        resultsDiv.innerHTML = "";
        statusDiv.innerHTML = "";
        return;
    }

    statusDiv.innerHTML = "Loading...";
    statusDiv.className = "loading";

    fetch("products.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {

            // Simulate server delay
            setTimeout(() => {

                const filteredProducts = data.products.filter(product =>
                    product.name.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query)
                );

                displayResults(filteredProducts);

            }, 500);

        })
        .catch(error => {
            statusDiv.innerHTML = "Failed to fetch products.";
            statusDiv.className = "error";
            resultsDiv.innerHTML = "";
        });
}

// Display Results
function displayResults(products) {
    resultsDiv.innerHTML = "";
    statusDiv.innerHTML = "";

    if (products.length === 0) {
        statusDiv.innerHTML = "No results found.";
        statusDiv.className = "no-results";
        return;
    }

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Category:</strong> ${product.category}</p>
        `;

        resultsDiv.appendChild(productDiv);
    });
}

// Attach Debounced Event Listener
searchInput.addEventListener("input", debounce(searchProducts, 500));
