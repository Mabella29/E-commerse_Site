const placeholderImage = 'https://via.placeholder.com/150'; // Default image URL

// Fetch Products
fetch('https://api.escuelajs.co/api/v1/products')
    .then(response => response.json())
    .then(data => {
        const productsContainer = document.getElementById('products-container');
        data.forEach(product => {
            const imageUrl = product.images[0] || placeholderImage; // Fallback to placeholder image
            const productCard = `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${imageUrl}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">$${product.price}</p>
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${imageUrl}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.innerHTML += productCard;
        });

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const title = e.target.dataset.title;
                const price = e.target.dataset.price;
                const image = e.target.dataset.image;
                addToCart(id, title, price, image);
            });
        });
    })
    .catch(error => console.error('Error fetching products:', error));

// Cart functions
function getCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id, title, price, image) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product already in cart
    } else {
        cart.push({ id, title, price, image, quantity: 1 }); // Add new product to cart
    }

    saveCart(cart);
    alert(`${title} added to cart!`);
}
