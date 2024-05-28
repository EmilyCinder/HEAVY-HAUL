document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');

    // Adding delay before hiding the slider
    setTimeout(() => {
        slider.style.opacity = '0'; // Fade out the slider
        setTimeout(() => {
            slider.style.display = 'none';
        }, 300); // Wait 300ms after fading out
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
});
