'use strict';

// Opening or closing side bar (reusing from main.js)
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() { elementToggleFunc(sidebar); });

// Navigation and scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation for links within the page
    document.querySelectorAll('a[href^="#"]:not([href*="index.html"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll reveal effect for content
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const blogContent = document.querySelector('.blog-content');

        if (scrollPosition > 100) {
            blogContent.style.opacity = '1';
        }
    });

    // Initialize blog content with subtle fade-in
    const blogContent = document.querySelector('.blog-content');
    if (blogContent) {
        blogContent.style.opacity = '1';
        blogContent.style.transition = 'opacity 0.5s ease-in';
    }
});