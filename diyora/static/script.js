let books = [];
let cart = [];

// Create butterflies
function createButterflies() {
    const container = document.getElementById('butterfliesContainer');
    if (!container) return;
    for (let i = 0; i < 8; i++) {
        const b = document.createElement('div');
        b.className = 'butterfly';
        b.innerHTML = '🦋';
        b.style.left = Math.random() * 100 + '%';
        b.style.animationDelay = Math.random() * 15 + 's';
        b.style.fontSize = (1.5 + Math.random() * 2) + 'rem';
        container.appendChild(b);
    }
}

// Animate stats
function animateStats() {
    const bookCount = document.getElementById('bookCount');
    const authorCount = document.getElementById('authorCount');
    const categoryCount = document.getElementById('categoryCount');
    if (!bookCount || !authorCount || !categoryCount) return;
    
    const totalBooks = books.length;
    const uniqueAuthors = [...new Set(books.map(b => b.author))].length;
    const uniqueCategories = [...new Set(books.map(b => b.category))].length;
    
    animateNumber(bookCount, 0, totalBooks, 2000);
    setTimeout(() => animateNumber(authorCount, 0, uniqueAuthors, 2000), 500);
    setTimeout(() => animateNumber(categoryCount, 0, uniqueCategories, 2000), 1000);
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) { current = end; clearInterval(timer); }
        element.textContent = Math.floor(current);
    }, 16);
}

// Display books
function displayBooks(booksToShow = books) {
    const grid = document.getElementById('booksGrid') || document.getElementById('featuredBooks');
    if (!grid) return;
    grid.innerHTML = '';
    const show = grid.id === 'featuredBooks' ? booksToShow.slice(0, 4) : booksToShow;
    show.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card fairy-card';
        card.innerHTML = `
            <div class="book-image">${book.emoji}</div>
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">✍️ ${book.author}</div>
                <div class="book-price">💰 ${book.price.toLocaleString()} so'm</div>
                <button class="add-to-cart" onclick="addToCart(${book.id})">🧺 Savatga qo'shish</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Search
function searchBooks() {
    const term = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const filtered = books.filter(b => b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term));
    displayBooks(filtered);
}

// Filter
function filterBooks(category, btn) {
    const filtered = category === 'all' ? books : books.filter(b => b.category === category);
    displayBooks(filtered);
    if (btn) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

// Cart functions
function addToCart(id) {
    const book = books.find(b => b.id === id);
    const item = cart.find(i => i.id === id);
    if (item) item.quantity++;
    else cart.push({...book, quantity: 1});
    updateCartUI();
    alert(`"${book.title}" savatga qo'shildi!`);
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
}

function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) removeFromCart(id);
    else updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    if (!cartCount || !cartItems || !cartTotal) return;
    
    cartCount.textContent = cart.reduce((s, i) => s + i.quantity, 0);
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.emoji} ${item.title}</h4>
                <p>${item.price.toLocaleString()} so'm</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})">🗑️</button>
            </div>
        `;
        cartItems.appendChild(div);
    });
    cartTotal.textContent = total.toLocaleString();
}

function toggleCart() {
    document.getElementById('cartSidebar')?.classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) { alert('Savat bo\'sh!'); return; }
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    alert(`Buyurtma qabul qilindi!\nJami: ${total.toLocaleString()} so'm`);
    cart = [];
    updateCartUI();
    toggleCart();
}

// Init
window.addEventListener('load', () => {
    createButterflies();
    displayBooks();
    animateStats();
});
