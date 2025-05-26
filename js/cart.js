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
