// Initialize cart array
let cart = [];

// Load cart from local storage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

// Save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(product) {
    cart.push(product);
    saveCart();
    alert(`${product.name} has been added to your cart!`);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

// Get current cart
function getCart() {
    return cart;
}

// Event listener for "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            const product = {
                id: productCard.querySelector('.card-title').innerText,
                name: productCard.querySelector('.card-title').innerText,
                price: productCard.querySelector('.price').innerText,
                image: productCard.querySelector('img').src
            };
            addToCart(product);
        });
    });
});

// --- Cart System for Storefront ---
// Language: JavaScript (ES6)

// --- Cart Data Model ---
const CART_KEY = 'storefront_cart';

// Load cart from localStorage or start empty
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Find product in cart by id
function findCartItem(cart, id) {
  return cart.find(item => item.id === id);
}

// --- Cart UI Functions ---

// Update cart badge count
function updateCartBadge(cart) {
  const badge = document.getElementById('cart-count-badge');
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = count;
}

// Render cart panel items
function renderCartPanel(cart) {
  const list = document.getElementById('cart-items-list');
  const total = document.getElementById('cart-total');
  list.innerHTML = '';
  let sum = 0;
  if (cart.length === 0) {
    list.innerHTML = '<p class="text-center text-muted">Your cart is empty.</p>';
  } else {
    cart.forEach(item => {
      sum += item.price * item.qty;
      // Cart item row
      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <img src="${item.img || ''}" alt="${item.title}" class="cart-item-img" />
        <div class="cart-item-info">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-qty">
            <button aria-label="Decrease quantity" data-action="decrease" data-id="${item.id}">-</button>
            <span>${item.qty}</span>
            <button aria-label="Increase quantity" data-action="increase" data-id="${item.id}">+</button>
            <span class="ms-2">$${(item.price * item.qty).toFixed(2)}</span>
            <button class="cart-item-remove" aria-label="Remove item" data-action="remove" data-id="${item.id}">&times;</button>
          </div>
        </div>
      `;
      list.appendChild(row);
    });
  }
  total.textContent = `$${sum.toFixed(2)}`;
}

// Open/close cart panel
function openCartPanel() {
  document.getElementById('cart-panel').classList.add('open');
  document.getElementById('cart-panel-backdrop').style.display = 'block';
}
function closeCartPanel() {
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('cart-panel-backdrop').style.display = 'none';
}

// --- Main Cart Logic ---

// Add product to cart
function addToCart(product) {
  const cart = loadCart();
  const existing = findCartItem(cart, product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  updateCartBadge(cart);
  renderCartPanel(cart);
}

// Handle cart panel actions (increase, decrease, remove)
function handleCartPanelClick(e) {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const action = btn.getAttribute('data-action');
  const id = btn.getAttribute('data-id');
  let cart = loadCart();
  const item = findCartItem(cart, id);
  if (!item) return;
  if (action === 'increase') {
    item.qty += 1;
  } else if (action === 'decrease') {
    item.qty -= 1;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
  } else if (action === 'remove') {
    cart = cart.filter(i => i.id !== id);
  }
  saveCart(cart);
  updateCartBadge(cart);
  renderCartPanel(cart);
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
  // 1. Attach Add to Cart to all product cards
  document.querySelectorAll('.product-card').forEach(card => {
    // Get product info from card
    const btn = card.querySelector('.btn.btn-primary');
    if (!btn) return;
    btn.addEventListener('click', () => {
      // Use card title, price, image, and a unique id (from data-id)
      const title = card.querySelector('.card-title')?.textContent?.trim() || 'Product';
      const priceText = card.querySelector('.price')?.textContent?.replace(/[^0-9.]/g, '') || '0';
      const price = parseFloat(priceText) || 0;
      const img = card.querySelector('.card-img-top')?.getAttribute('src') || '';
      // Use data-id (guaranteed unique)
      const id = card.getAttribute('data-id') || title.replace(/\s+/g, '-').toLowerCase();
      addToCart({ id, title, price, img });
    });
  });

  // 2. Cart icon click opens cart
  document.getElementById('cart-icon-btn').addEventListener('click', openCartPanel);
  document.getElementById('cart-close-btn').addEventListener('click', closeCartPanel);
  document.getElementById('cart-panel-backdrop').addEventListener('click', closeCartPanel);

  // 3. Cart panel actions (qty, remove)
  document.getElementById('cart-items-list').addEventListener('click', handleCartPanelClick);

  // 4. Checkout button (demo)
  document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Checkout is not implemented in this demo.');
  });

  // 5. Initialize cart badge and panel
  const cart = loadCart();
  updateCartBadge(cart);
  renderCartPanel(cart);
});