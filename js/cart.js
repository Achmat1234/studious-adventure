// --- Cart System for Storefront ---
// Language: JavaScript (ES6)

const CART_KEY = 'storefront_cart';
const CURRENCY_FORMATTER = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
});

// --- Helpers ---
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function findCartItem(cart, id) {
  return cart.find(item => item.id === id);
}

function formatCurrency(amount) {
  return CURRENCY_FORMATTER.format(amount);
}

// --- UI Updates ---
function updateCartBadge(cart) {
  const badge = document.getElementById('cart-count-badge');
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = count;
}

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
      row.innerHTML = `
        <img src="${item.img || ''}" alt="${item.title}" class="cart-item-img" />
        <div class="cart-item-info">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-qty">
            <button aria-label="Decrease quantity" data-action="decrease" data-id="${item.id}">-</button>
            <span>${item.qty}</span>
            <button aria-label="Increase quantity" data-action="increase" data-id="${item.id}">+</button>
            <span class="ms-2">${formatCurrency(item.price * item.qty)}</span>
            <button class="cart-item-remove" aria-label="Remove item" data-action="remove" data-id="${item.id}">&times;</button>
          </div>
        </div>`;
      list.appendChild(row);
    });
  }

  total.textContent = formatCurrency(sum);
}

// --- Cart Panel Toggle ---
function openCartPanel() {
  document.getElementById('cart-panel').classList.add('open');
  document.getElementById('cart-panel-backdrop').style.display = 'block';
}

function closeCartPanel() {
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('cart-panel-backdrop').style.display = 'none';
}

// --- Core Actions ---
function addToCart(product) {
  const cart = loadCart();
  const existing = findCartItem(cart, product.id);
  if (existing) {
    if (existing.qty >= 10) {
      alert('Maximum quantity reached.');
      return;
    }
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  updateCartBadge(cart);
  renderCartPanel(cart);
}

function handleCartPanelClick(e) {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const action = btn.getAttribute('data-action');
  const id = btn.getAttribute('data-id');
  let cart = loadCart();
  const item = findCartItem(cart, id);
  if (!item) return;

  if (action === 'increase') {
    if (item.qty < 10) item.qty += 1;
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

function clearCart() {
  if (confirm('Clear your entire cart?')) {
    saveCart([]);
    updateCartBadge([]);
    renderCartPanel([]);
  }
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  // Add to Cart button
  document.querySelectorAll('.product-card').forEach(card => {
    const btn = card.querySelector('.btn.btn-primary');
    if (!btn) return;

    btn.addEventListener('click', () => {
      btn.disabled = true;

      const title = card.querySelector('.card-title')?.textContent?.trim();
      const priceText = card.querySelector('.price')?.textContent?.replace(/[^0-9.]/g, '');
      const price = parseFloat(priceText);
      const img = card.querySelector('.card-img-top')?.getAttribute('src') || '';
      const id = card.getAttribute('data-id') || title?.replace(/\s+/g, '-').toLowerCase();

      if (!title || isNaN(price)) {
        alert('This product is not configured correctly.');
        btn.disabled = false;
        return;
      }

      addToCart({ id, title, price, img });
      setTimeout(() => (btn.disabled = false), 300);
    });
  });

  // Cart controls
  document.getElementById('cart-icon-btn')?.addEventListener('click', openCartPanel);
  document.getElementById('cart-close-btn')?.addEventListener('click', closeCartPanel);
  document.getElementById('cart-panel-backdrop')?.addEventListener('click', closeCartPanel);
  document.getElementById('cart-items-list')?.addEventListener('click', handleCartPanelClick);

  // Optional: Clear cart button
  const clearCartBtn = document.getElementById('clear-cart-btn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }

  // Checkout button (demo)
  document.getElementById('checkout-btn')?.addEventListener('click', () => {
    alert('Checkout is not implemented in this demo.');
  });

  // Init cart state
  const cart = loadCart();
  updateCartBadge(cart);
  renderCartPanel(cart);
});
