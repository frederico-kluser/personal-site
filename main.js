'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const testimonialsList = document.querySelector('.testimonials-list');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Add drag-to-scroll functionality to testimonials list
let isDragging = false;
let startX;
let scrollLeft;
let wasDragged = false;
const dragThreshold = 5; // Pixels threshold to consider a drag vs. a click

// Mouse events for desktop
testimonialsList.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.pageX - testimonialsList.offsetLeft;
    scrollLeft = testimonialsList.scrollLeft;
    wasDragged = false;
    testimonialsList.classList.add('grabbing');
    // Prevent default behavior to avoid text selection during drag
    e.preventDefault();
});

testimonialsList.addEventListener('mousemove', function(e) {
    if (!isDragging) return;

    const x = e.pageX - testimonialsList.offsetLeft;
    const distX = x - startX;

    if (Math.abs(distX) > dragThreshold) {
        testimonialsList.scrollLeft = scrollLeft - distX;
        wasDragged = true;
    }
});

testimonialsList.addEventListener('mouseup', function() {
    isDragging = false;
    testimonialsList.classList.remove('grabbing');
});

testimonialsList.addEventListener('mouseleave', function() {
    isDragging = false;
    testimonialsList.classList.remove('grabbing');
});

// Touch events for mobile
testimonialsList.addEventListener('touchstart', function(e) {
    isDragging = true;
    startX = e.touches[0].pageX - testimonialsList.offsetLeft;
    scrollLeft = testimonialsList.scrollLeft;
    wasDragged = false;
    testimonialsList.classList.add('grabbing');
});

testimonialsList.addEventListener('touchmove', function(e) {
    if (!isDragging) return;

    const x = e.touches[0].pageX - testimonialsList.offsetLeft;
    const distX = x - startX;

    if (Math.abs(distX) > dragThreshold) {
        testimonialsList.scrollLeft = scrollLeft - distX;
        wasDragged = true;
        // Prevent page scrolling while dragging the testimonials
        e.preventDefault();
    }
});

testimonialsList.addEventListener('touchend', function() {
    isDragging = false;
    testimonialsList.classList.remove('grabbing');
});

// Testimonial item click for modal
for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function(e) {
        // Only open modal if not dragged
        if (!wasDragged) {
            modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
            modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
            modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
            modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

            testimonialsModalFunc();
        }

        // Reset drag state
        wasDragged = false;
    });
}

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

// Filter functionality removed as all portfolio items are now displayed by default

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}

// Infinite carousel for clients section - Optimized implementation
document.addEventListener('DOMContentLoaded', function() {
    // Get the clients section
    const clientsSection = document.querySelector('.clients');

    if (!clientsSection) return;

    // Get or create carousel elements
    let clientsCarousel = clientsSection.querySelector('.clients-carousel');
    let clientsTrack = clientsSection.querySelector('.clients-track');
    let originalSlides;

    // If structure doesn't exist yet, create it
    if (!clientsCarousel) {
        // Get the original client list
        const oldClientsList = clientsSection.querySelector('.clients-list');

        if (!oldClientsList) return;

        // Create new carousel structure
        clientsCarousel = document.createElement('div');
        clientsCarousel.className = 'clients-carousel';

        clientsTrack = document.createElement('div');
        clientsTrack.className = 'clients-track';

        // Move client items to the new structure
        originalSlides = Array.from(oldClientsList.children).map(item => {
            const slide = document.createElement('div');
            slide.className = 'clients-slide';
            slide.appendChild(item.cloneNode(true));
            return slide;
        });

        // If no slides found, exit
        if (originalSlides.length === 0) return;

        // Add original slides to track
        originalSlides.forEach(slide => {
            clientsTrack.appendChild(slide);
        });

        // Replace the old structure with new one
        clientsCarousel.appendChild(clientsTrack);
        if (oldClientsList.parentNode) {
            oldClientsList.parentNode.replaceChild(clientsCarousel, oldClientsList);
        } else {
            clientsSection.appendChild(clientsCarousel);
        }
    } else {
        // Get existing slides
        originalSlides = Array.from(clientsTrack.children);
    }

    // Clone slides for infinite effect
    // We need at least 2x width of viewport in clones to ensure smooth transition
    let slidesToClone = [...originalSlides];

    // Add cloned slides to the beginning and end
    slidesToClone.forEach(slide => {
        const endClone = slide.cloneNode(true);
        clientsTrack.appendChild(endClone);
    });

    slidesToClone.forEach(slide => {
        const startClone = slide.cloneNode(true);
        clientsTrack.insertBefore(startClone, clientsTrack.firstChild);
    });

    // Animation variables
    let animationFrameId = null;
    let isTransitioning = false;
    const speed = 0.7; // pixels per frame - aumentando velocidade
    let currentPosition = -originalSlides.length * originalSlides[0].offsetWidth;

    // Initialize carousel position
    clientsTrack.style.transform = `translateX(${currentPosition}px)`;

    // Calculate the reset point (when first set of original slides is out of view)
    function calculateResetPoint() {
        return -2 * originalSlides.length * originalSlides[0].offsetWidth;
    }

    // Animate the carousel
    function animateCarousel() {
        if (isTransitioning) {
            animationFrameId = requestAnimationFrame(animateCarousel);
            return;
        }

        // Move carousel
        currentPosition -= speed;
        clientsTrack.style.transform = `translateX(${currentPosition}px)`;

        // Check if we need to reset
        const resetPoint = calculateResetPoint();
        if (currentPosition <= resetPoint) {
            // Reset to the middle position (original slides)
            isTransitioning = true;
            clientsTrack.style.transition = 'none';
            currentPosition = -originalSlides.length * originalSlides[0].offsetWidth;
            clientsTrack.style.transform = `translateX(${currentPosition}px)`;

            // Force browser to process the style change before re-enabling transition
            void clientsTrack.offsetWidth;
            clientsTrack.style.transition = 'transform 0s linear';
            isTransitioning = false;
        }

        animationFrameId = requestAnimationFrame(animateCarousel);
    }

    // Start animation
    animateCarousel();

    // Performance optimizations

    // Pause when not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        } else if (!animationFrameId) {
            animateCarousel();
        }
    });

    // Stop carousel when not in viewport to save resources
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (!animationFrameId) {
                    animateCarousel();
                }
            } else {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            }
        }, { threshold: 0.1 });

        observer.observe(clientsCarousel);
    }

    // Handle window resize to recalculate dimensions
    window.addEventListener('resize', () => {
        if (isTransitioning) return;

        isTransitioning = true;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }

        // Reset position
        clientsTrack.style.transition = 'none';
        currentPosition = -originalSlides.length * originalSlides[0].offsetWidth;
        clientsTrack.style.transform = `translateX(${currentPosition}px)`;

        // Force browser to process the style change before re-enabling animation
        void clientsTrack.offsetWidth;
        clientsTrack.style.transition = 'transform 0s linear';
        isTransitioning = false;

        // Restart animation
        animateCarousel();
    });
});

// Portfolio Project Modal
const projectItems = document.querySelectorAll('[data-project-item]');
const projectModalContainer = document.querySelector('[data-project-modal-container]');
const projectModalCloseBtn = document.querySelector('[data-project-modal-close-btn]');
const projectOverlay = document.querySelector('[data-project-overlay]');

const projectModalImg = document.querySelector('[data-project-modal-img]');
const projectModalTitle = document.querySelector('[data-project-modal-title]');
const projectModalRole = document.querySelector('[data-project-modal-role]');
const projectModalText = document.querySelector('[data-project-modal-text]');
const projectModalTechs = document.querySelector('[data-project-modal-techs]');
const projectModalMethodologies = document.querySelector('[data-project-modal-methodologies]');
const projectModalTools = document.querySelector('[data-project-modal-tools]');
const projectModalDownloads = document.querySelector('[data-project-modal-downloads]');

const projectModalFunc = function () {
    projectModalContainer.classList.toggle('active');
    projectOverlay.classList.toggle('active');
}

// Attach event listeners to project items
for (let i = 0; i < projectItems.length; i++) {
    const projectIconBox = projectItems[i].querySelector('.project-item-icon-box');

    projectIconBox.addEventListener('click', function(e) {
        e.preventDefault();

        // Get project details
        const projectImg = projectItems[i].querySelector('.project-img img');
        const projectTitle = projectItems[i].querySelector('[data-project-title]');
        const projectDetails = projectItems[i].querySelector('[data-project-details]');

        // Set modal content
        projectModalImg.src = projectImg.src;
        projectModalImg.alt = projectImg.alt;
        projectModalTitle.innerHTML = projectTitle.innerHTML;

        // Role
        const projectRole = projectDetails.querySelector('.project-details-role');
        projectModalRole.innerHTML = `<h4 class="h4">Role:</h4><p>${projectRole.innerHTML}</p>`;

        // Description
        const projectText = projectDetails.querySelector('.project-details-text');
        projectModalText.innerHTML = `<h4 class="h4">Description:</h4><p>${projectText.innerHTML}</p>`;

        // Technologies
        const projectTechs = projectDetails.querySelector('.project-tech-stack');
        if (projectTechs) {
            projectModalTechs.innerHTML = `<h4 class="h4">Technologies:</h4><p>${projectTechs.querySelector('p').innerHTML}</p>`;
            projectModalTechs.style.display = 'block';
        } else {
            projectModalTechs.style.display = 'none';
        }

        // Methodologies
        const projectMethodologies = projectDetails.querySelector('.project-methodology');
        if (projectMethodologies) {
            projectModalMethodologies.innerHTML = `<h4 class="h4">Methodologies:</h4><p>${projectMethodologies.querySelector('p').innerHTML}</p>`;
            projectModalMethodologies.style.display = 'block';
        } else {
            projectModalMethodologies.style.display = 'none';
        }

        // Tools
        const projectTools = projectDetails.querySelector('.project-tools');
        if (projectTools) {
            projectModalTools.innerHTML = `<h4 class="h4">Tools:</h4><p>${projectTools.querySelector('p').innerHTML}</p>`;
            projectModalTools.style.display = 'block';
        } else {
            projectModalTools.style.display = 'none';
        }

        // Downloads
        const projectDownloads = projectDetails.querySelector('.project-downloads');
        if (projectDownloads) {
            projectModalDownloads.innerHTML = `<h4 class="h4">Downloads:</h4><p>${projectDownloads.querySelector('p').innerHTML}</p>`;
            projectModalDownloads.style.display = 'block';
        } else {
            projectModalDownloads.style.display = 'none';
        }

        // Show modal
        projectModalFunc();
    });
}

// Close button for project modal
if (projectModalCloseBtn && projectOverlay) {
    projectModalCloseBtn.addEventListener('click', projectModalFunc);
    projectOverlay.addEventListener('click', projectModalFunc);
}

// Enabling Page Navigation

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {

        for(let i = 0; i < pages.length; i++) {
            if(this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                pages[i].classList.add('active');
                navigationLinks[i].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove('active');
                navigationLinks[i]. classList.remove('active');
            }
        }
    });
}