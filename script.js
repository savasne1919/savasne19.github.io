// script.js

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Function to set active navigation link
    function setActiveNavLink() {
        const currentPath = window.location.pathname.split('/').pop(); // Get current filename (e.g., "index.html")
        const navLinks = document.querySelectorAll('nav a'); // Get all navigation links

        navLinks.forEach(link => {
            // Remove active class from all links first
            link.classList.remove('active-nav-link');

            // Check if the link's href matches the current page or its section
            const linkHref = link.getAttribute('href');

            if (linkHref) {
                // For direct page links (e.g., "all-product.html")
                // Check if the link's href (without hash) matches the current page filename
                const linkFilename = linkHref.split('#')[0].split('/').pop();
                if (linkFilename === currentPath) {
                    link.classList.add('active-nav-link');
                }
                // For links to sections on the index page (e.g., "index.html#line-qr-code")
                // This condition is for when the current page IS index.html AND the link is to a section on index.html
                if (currentPath === 'index.html' && linkHref.startsWith('index.html#')) {
                    const sectionId = linkHref.split('#')[1];
                    // Only apply active class to 'Contact' if it's the current page and that's the intended section.
                    // This part is more for visual feedback on the current page.
                    if (link.textContent === 'Contact' && window.location.hash === '#' + sectionId) {
                        link.classList.add('active-nav-link');
                    }
                }
            }
        });
    }

    // Function to handle scrolling to the QR code section
    function scrollToQrCode() {
        const qrCodeSection = document.getElementById('line-qr-code');
        if (qrCodeSection) {
            qrCodeSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Handle initial load with hash (e.g., coming from another page)
    if (window.location.hash === '#line-qr-code') {
        // Use a small delay to ensure the page has fully rendered before scrolling
        setTimeout(scrollToQrCode, 100);
    }

    // Add click event listeners to all "Contact" links
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetHref = link.getAttribute('href');
            const currentPath = window.location.pathname.split('/').pop();

            // If the link is to the current page's QR code section
            if (targetHref === 'index.html#line-qr-code' && currentPath === 'index.html') {
                event.preventDefault(); // Prevent default link behavior
                scrollToQrCode(); // Manually scroll
            } else if (targetHref === 'index.html#line-qr-code' && currentPath !== 'index.html') {
                // If the link is to index.html#line-qr-code from another page
                // We don't prevent default here, let the browser navigate
                // The hash will be present in the URL, and the DOMContentLoaded
                // check on index.html will handle the scroll.
            }
            // For other links, default behavior is fine.
        });
    });


    // Call the function on page load
    setActiveNavLink();

    // Optional: Re-check active link on hash change for single-page navigation
    window.addEventListener('hashchange', setActiveNavLink);
});
