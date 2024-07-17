document.addEventListener('DOMContentLoaded', () => {
    const cartLink = document.getElementById('cart-link');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartContent = document.getElementById('cart-content');
    const closeCartBtn = document.getElementById('close-cart');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartIcon = () => {
        const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
        document.querySelector('.cart-count').innerText = totalQuantity;
    };

    const updateCartContent = () => {
        cartContent.innerHTML = '';
        cart.forEach((product, index) => {
            const item = document.createElement('div');
            item.classList.add('cart-item');
            item.innerHTML = `
                <img src="images/snare.jpg" alt="${product.name}">
                <div>
                    <h4>${product.name}</h4>
                    <p>${product.quantity} x $${product.price.toFixed(2)}</p>
                </div>
                <span class="cart-item-remove" data-index="${index}">&times;</span>
            `;
            cartContent.appendChild(item);
        });
        const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        const totalEl = document.createElement('div');
        totalEl.classList.add('cart-total');
        totalEl.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
        cartContent.appendChild(totalEl);
    };

    const toggleCartDropdown = () => {
        cartDropdown.classList.toggle('active');
        updateCartContent();
    };

    cartLink.addEventListener('click', toggleCartDropdown);
    closeCartBtn.addEventListener('click', toggleCartDropdown);

    cartContent.addEventListener('click', (event) => {
        if (event.target.classList.contains('cart-item-remove')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartIcon();
            updateCartContent();
        }
    });

    checkoutBtn.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });

    updateCartIcon();
});

const addToCart = (productName, productPrice) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(product => product.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
};

const updateCartIcon = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
    document.querySelector('.cart-count').innerText = totalQuantity;
};
