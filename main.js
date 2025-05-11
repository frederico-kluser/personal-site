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

// Automatic infinite carousel for clients list using CSS transforms
const clientsList = document.querySelector('.clients-list');

if (clientsList) {
    // Check if clients list is already wrapped, if not add the container
    let clientsListContainer = clientsList.parentElement;
    if (!clientsListContainer.classList.contains('clients-list-container')) {
        const container = document.createElement('div');
        container.className = 'clients-list-container';
        clientsList.parentNode.insertBefore(container, clientsList);
        container.appendChild(clientsList);
        clientsListContainer = container;
    }

    // Clone items for infinite effect
    const originalItems = Array.from(clientsList.children);
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        clientsList.appendChild(clone);
    });

    // Get carousel dimensions
    let position = 0;
    let animation = null;
    const speed = 0.5; // pixels per frame (adjust as needed for speed)

    // Calculate when to reset the animation
    const calculateWidth = () => {
        const itemWidth = originalItems[0].offsetWidth;
        const itemsCount = originalItems.length;
        return itemWidth * itemsCount;
    };

    let resetPoint = calculateWidth();

    // Handle window resize to recalculate dimensions
    window.addEventListener('resize', () => {
        resetPoint = calculateWidth();
    });

    // Animation function using transforms
    function animate() {
        position -= speed;

        // Apply transform for smooth animation
        clientsList.style.transform = `translateX(${position}px)`;

        // When first set of items moves out of view, reset position
        if (Math.abs(position) >= resetPoint) {
            position = 0;
        }

        animation = requestAnimationFrame(animate);
    }

    // Start the animation
    animate();

    // Pause animation when not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animation);
        } else {
            animate();
        }
    });

    // Performance optimization - pause when not in viewport
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            if (!animation) {
                animate();
            }
        } else {
            cancelAnimationFrame(animation);
            animation = null;
        }
    }, { threshold: 0.1 });

    observer.observe(clientsListContainer);
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