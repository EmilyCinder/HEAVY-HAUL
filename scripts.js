// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    
    // Adding delay before hiding the slider
    setTimeout(() => {
        slider.style.opacity = '0'; // Fade out the slider
        setTimeout(() => {
            slider.style.display = 'none';
        }, 300); // Wait 300ms after fading out
    }, 2000); // Slide-down animation duration (2s) + delay (0.3s)

    document.querySelector('.view-product').addEventListener('click', () => {
        window.location.href = 'product-page.html'; // Redirect to product page
    });

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
        const query = searchInput.value;
        if (query) {
            console.log('Search query:', query); // Handle search query
            // Perform any additional actions such as redirecting to a search results page
        }
    });
});
