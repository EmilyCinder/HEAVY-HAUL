document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.getElementById('add-to-cart');
    const cartIcon = document.querySelector('.cart-icon');

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    addToCartButton.addEventListener('click', () => {
        const productId = addToCartButton.dataset.productId;
        const productName = addToCartButton.dataset.productName;
        const productPrice = parseFloat(addToCartButton.dataset.productPrice);
        const productQuantity = parseInt(document.getElementById('quantity').value);

        const existingProductIndex = cart.findIndex(item => item.id === productId);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += productQuantity;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: productQuantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIcon();
    });

    function updateCartIcon() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartIcon.setAttribute('data-count', totalItems);
    }

    updateCartIcon();
});
