document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');

    // Adding delay before hiding the slider
    setTimeout(() => {
        if (slider) {
            slider.style.opacity = '0'; // Fade out the slider
            setTimeout(() => {
                slider.style.display = 'none';
            }, 300); // Wait 300ms after fading out
        }
    }, 2000); // Slide-down animation duration (2s) + delay (0.3s)

    // Handle hamburger menu functionality
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const overlay = document.getElementById('overlay');

    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    };

    hamburgerMenu.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Handle search functionality
    const searchButton = document.querySelector('.searchButton');
    const searchInput = document.querySelector('.searchInput');

    searchButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const query = searchInput.value.toLowerCase().trim();
        console.log('Search query:', query); // Log the search query
        if (query) {
            const results = searchIndex.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.keywords.some(keyword => keyword.toLowerCase().includes(query))
            );
            console.log('Search results:', results); // Log the search results
            sessionStorage.setItem('searchResults', JSON.stringify(results));
            window.location.href = 'search-results.html'; // Redirect to search results page
        }
    });

    // Handle cart functionality
    const cartIcon = document.querySelector('.cart-icon');
    const cartPopup = document.createElement('div');
    cartPopup.classList.add('cart-popup');
    document.body.appendChild(cartPopup);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartIcon = () => {
        const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
        cartIcon.innerHTML = `<img src="images/cart.png" alt="Cart Icon" class="cart-icon-img"><div class="cart-count">${totalQuantity}</div>`;
    };

    const showCartPopup = (product, quantity) => {
        cartPopup.innerHTML = `
            <p>Added to Cart</p>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name}</p>
            <p>Quantity: ${quantity}</p>
            <p>Total: $${(product.price * quantity).toFixed(2)}</p>
            <button onclick="window.location.href='cart.html'">Go to Cart</button>
            <a href="javascript:void(0)" onclick="hideCartPopup()">Continue Shopping</a>
        `;
        cartPopup.classList.add('active');
    };

    const hideCartPopup = () => {
        cartPopup.classList.remove('active');
    };

    const addToCartButton = document.getElementById('add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const productId = addToCartButton.dataset.productId;
            const productName = addToCartButton.dataset.productName;
            const productPrice = parseFloat(addToCartButton.dataset.productPrice);
            const productImage = addToCartButton.dataset.productImage;
            const productQuantity = parseInt(document.getElementById('quantity').value);

            const existingProductIndex = cart.findIndex(item => item.id === productId);

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += productQuantity;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: productQuantity
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartIcon();
            showCartPopup({ name: productName, price: productPrice, image: productImage }, productQuantity);
        });
    }

    updateCartIcon();
});
