document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    let currentMode = 'pagination'; // Keeps track of what data we are currently viewing

    // DOM Elements
    const bookContainer = document.getElementById('bookContainer');
    const resultsInfo = document.getElementById('resultsInfo');
    const searchInput = document.getElementById('searchInput');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // Buttons
    const searchBtn = document.getElementById('searchBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortPriceBtn = document.getElementById('sortPriceBtn');
    const sortRatingBtn = document.getElementById('sortRatingBtn');
    const topRatedBtn = document.getElementById('topRatedBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Initial Load
    fetchBooks(`/books?page=${currentPage}`);

    // Utility to render books
    function renderBooks(books, append = false) {
        if (!append) bookContainer.innerHTML = '';

        if (books.length === 0 && !append) {
            bookContainer.innerHTML = '<p>No books found.</p>';
            loadMoreBtn.style.display = 'none';
            return;
        }

        const html = books.map(book => `
            <div class="book-card">
                <span class="book-badge">${book.category || 'Uncategorized'}</span>
                <h4>${book.title}</h4>
                <div class="book-author">By ${book.author} (${book.year})</div>
                <div class="book-details">
                    <span class="book-price">$${book.price}</span>
                    <span class="book-rating">⭐ ${book.rating}</span>
                </div>
            </div>
        `).join('');

        if (append) {
            bookContainer.insertAdjacentHTML('beforeend', html);
        } else {
            bookContainer.innerHTML = html;
        }

        // Hide Load More if fewer than 5 books returned
        if (books.length < 5) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }

    // Fetch and Handle API calls
    async function fetchBooks(url, append = false) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            renderBooks(data, append);
        } catch (error) {
            console.error('Error fetching books:', error);
            bookContainer.innerHTML = '<p style="color: red;">Failed to load books. Is the server running?</p>';
        }
    }

    // Handlers
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (!query) return;
        currentMode = 'search';
        loadMoreBtn.style.display = 'none';
        resultsInfo.textContent = `Search Results for "${query}"`;
        fetchBooks(`/books/search?title=${encodeURIComponent(query)}`);
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            currentMode = 'filter';
            loadMoreBtn.style.display = 'none';
            resultsInfo.textContent = `${category} Books`;
            fetchBooks(`/books/category/${encodeURIComponent(category)}`);
        });
    });

    sortPriceBtn.addEventListener('click', () => {
        currentMode = 'sort';
        loadMoreBtn.style.display = 'none';
        resultsInfo.textContent = 'Books Sorted by Price';
        fetchBooks('/books/sort/price');
    });

    sortRatingBtn.addEventListener('click', () => {
        currentMode = 'sort';
        loadMoreBtn.style.display = 'none';
        resultsInfo.textContent = 'Books Sorted by Rating';
        fetchBooks('/books/sort/rating');
    });

    topRatedBtn.addEventListener('click', () => {
        currentMode = 'top';
        loadMoreBtn.style.display = 'none';
        resultsInfo.textContent = 'Top Rated Books (4+ Stars)';
        fetchBooks('/books/top');
    });

    resetBtn.addEventListener('click', () => {
        currentMode = 'pagination';
        currentPage = 1;
        searchInput.value = '';
        resultsInfo.textContent = 'Showing All Books';
        fetchBooks(`/books?page=${currentPage}`);
    });

    loadMoreBtn.addEventListener('click', () => {
        if (currentMode === 'pagination') {
            currentPage++;
            fetchBooks(`/books?page=${currentPage}`, true);
        }
    });

    // Enter key for search
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
});
