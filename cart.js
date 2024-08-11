document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
    updateCartCount(); 
});

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = getCart();
    let subtotal = 0;

    // Clear previous cart items
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const price = parseFloat(item.price) || 0;
        const total = (price * item.quantity).toFixed(2);
        subtotal += parseFloat(total);

        const cartItemRow = `
            <tr>
                <td>
                    <img src="${item.image}" alt="${item.title}" style="width: 100px;">
                    ${item.title}
                </td>
                <td>${item.quantity}</td>
                <td>$${price.toFixed(2)}</td>
                <td>$${total}</td>
                <td><button class="btn btn-danger btn-sm" data-id="${item.id}">Remove</button></td>
            </tr>
        `;
        cartItemsContainer.innerHTML += cartItemRow;
    });

    // Update subtotal
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);

    // Add event listeners for remove buttons
    document.querySelectorAll('.btn-danger').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            removeFromCart(id);
        });
    });
}

function removeFromCart(id) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    renderCartItems();
    updateCartCount(); 
}

// Function to update cart count in the navbar
function updateCartCount() {
    const cart = getCart();
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}
