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

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

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

// Automatic infinite carousel for clients list
const clientsList = document.querySelector('.clients-list');

if (clientsList) {
    // Clone all items to create the illusion of an infinite loop
    const originalItems = clientsList.innerHTML;
    clientsList.innerHTML = originalItems + originalItems;

    let autoScrollInterval;
    const scrollSpeed = 1; // pixels per frame - keep this low for smooth scrolling

    // Function to create an infinite carousel effect
    function animateCarousel() {
        // Increment scroll position
        clientsList.scrollLeft += scrollSpeed;

        // When we've scrolled halfway through (to the cloned items),
        // reset back to the start without animation
        if (clientsList.scrollLeft >= clientsList.scrollWidth / 2) {
            // Disable smooth scrolling temporarily for the reset
            clientsList.style.scrollBehavior = 'auto';
            clientsList.scrollLeft = 0;
            // Re-enable smooth scrolling
            setTimeout(() => {
                clientsList.style.scrollBehavior = 'smooth';
            }, 10);
        }
    }

    // Start the automatic carousel with requestAnimationFrame for better performance
    function startCarousel() {
        animateCarousel();
        autoScrollInterval = requestAnimationFrame(startCarousel);
    }

    // Initial start
    startCarousel();

    // Disable pointer events on clients list
    clientsList.style.pointerEvents = 'none';

    // Stop animation when the tab/window is not visible to save resources
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(autoScrollInterval);
        } else {
            startCarousel();
        }
    });

    // Ensure good performance by reducing animation quality when not in viewport
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCarousel();
        } else {
            cancelAnimationFrame(autoScrollInterval);
        }
    }, { threshold: 0.1 });

    observer.observe(clientsList);
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