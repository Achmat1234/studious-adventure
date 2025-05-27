// --- Cart System for Storefront ---
// Language: JavaScript (ES6)

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
      const row = document.createElement('div');
      row.className = 'cart-item-row';
      // ...existing code...
row.innerHTML = `
  <img src="${item.img || ''}" alt="${item.title}" class="cart-item-img" />
  <div class="cart-item-info">
    <div class="cart-item-title">${item.title}</div>
    <div class="cart-item-qty">
      <button aria-label="Decrease quantity" data-action="decrease" data-id="${item.id}">-</button>
      <span>${item.qty}</span>
      <button aria-label="Increase quantity" data-action="increase" data-id="${item.id}">+</button>
      <span class="ms-2">R${(item.price * item.qty).toFixed(2)}</span>
      <button class="cart-item-remove" aria-label="Remove item" data-action="remove" data-id="${item.id}">&times;</button>
    </div>
  </div>
`;
// ...existing code...
total.textContent = `R${sum.toFixed(2)}`;
// ...existing code...

// Open/close cart panel
function openCartPanel() {
  document.getElementById('cart-panel').classList.add('open');
  document.getElementById('cart-panel-backdrop').style.display = 'block';
}
function closeCartPanel() {
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('cart-panel-backdrop').style.display = 'none';
}

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
  // Attach Add to Cart to all product cards
  document.querySelectorAll('.product-card').forEach(card => {
    const btn = card.querySelector('.btn.btn-primary');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const title = card.querySelector('.card-title')?.textContent?.trim();
      const priceText = card.querySelector('.price')?.textContent?.replace(/[^0-9.]/g, '');
      const price = parseFloat(priceText);
      const img = card.querySelector('.card-img-top')?.getAttribute('src') || '';
      const id = card.getAttribute('data-id') || (title ? title.replace(/\s+/g, '-').toLowerCase() : '');

      // Only add to cart if title and price are valid
      if (!title || isNaN(price)) {
        alert('This product is not configured correctly.');
        return;
      }

      addToCart({ id, title, price, img });
    });
  });

  // Cart icon click opens cart
  document.getElementById('cart-icon-btn').addEventListener('click', openCartPanel);
  document.getElementById('cart-close-btn').addEventListener('click', closeCartPanel);
  document.getElementById('cart-panel-backdrop').addEventListener('click', closeCartPanel);

  // Cart panel actions (qty, remove)
  document.getElementById('cart-items-list').addEventListener('click', handleCartPanelClick);

  // Checkout button (demo)
  document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Checkout is not implemented in this demo.');
  });

  // Initialize cart badge and panel
  const cart = loadCart();
  updateCartBadge(cart);
  renderCartPanel(cart);
});