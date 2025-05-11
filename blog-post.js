'use strict';

// Initialize the markdown parser with options
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,          // GitHub Flavored Markdown
  breaks: true,       // Adds <br> on single line breaks
  smartypants: true   // Better typography
});

// Opening or closing side bar (reusing from main.js)
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function() { elementToggleFunc(sidebar); });
}

document.addEventListener('DOMContentLoaded', function() {
    // Get post ID from URL
    const postId = getPostIdFromUrl();

    if (postId) {
        console.log('Loading post with ID:', postId);
        loadPost(postId);
    } else {
        // Handle case where no post ID is provided
        console.error('No post ID found in URL');
        showNotFoundMessage();
    }
    
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

        if (scrollPosition > 100 && blogContent) {
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

// Parse the URL to get the post ID/slug
function getPostIdFromUrl() {
    // Support query parameter format
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load post data from JSON file
async function loadPost(postId) {
    try {
        // Show loading state
        document.getElementById('post-title').textContent = 'Loading...';
        document.getElementById('post-content').innerHTML = '<p>Loading post content...</p>';

        // Clear image src to prevent old image from showing
        const bannerImg = document.getElementById('post-image');
        if (bannerImg) bannerImg.src = '';

        // Fetch the post JSON
        const response = await fetch(`posts/${postId}.json`);

        if (!response.ok) {
            throw new Error('Post not found');
        }

        const post = await response.json();
        console.log('Post data loaded:', post.title, 'Image URL:', post.coverImage?.url);
        renderPost(post);

        // Optional: After rendering, load recent posts
        loadRecentPosts(postId);
    } catch (error) {
        console.error('Error loading post:', error);
        showNotFoundMessage();
    }
}

// Render post content to the page
function renderPost(post) {
    // Update document title
    document.title = `${post.title} - Fred K.`;
    
    // Set header info
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-category').textContent = post.category;
    
    // Format and set dates
    const createdDate = new Date(post.createdAt);
    const formattedDate = createdDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    
    document.getElementById('post-date').textContent = formattedDate;
    document.getElementById('post-date').setAttribute('datetime', post.createdAt);
    
    // Set banner image
    const bannerImg = document.getElementById('post-image');
    if (bannerImg && post.coverImage && post.coverImage.url) {
        bannerImg.src = post.coverImage.url;
        bannerImg.alt = post.coverImage.alt || 'Blog post image';
        // Ensure the image container is visible
        const blogBanner = document.querySelector('.blog-banner');
        if (blogBanner) blogBanner.style.display = 'block';
    }
    
    // Render markdown content
    const contentElement = document.getElementById('post-content');
    contentElement.innerHTML = marked.parse(post.content);
    
    // Handle tags
    renderTags(post.tags);
}

// Render tags list
function renderTags(tags) {
    const tagsContainer = document.getElementById('tags-list');
    tagsContainer.innerHTML = ''; // Clear existing tags
    
    if (!tags || tags.length === 0) return;
    
    tags.forEach(tag => {
        const tagItem = document.createElement('li');
        const tagLink = document.createElement('a');
        tagLink.href = `index.html#blog?tag=${encodeURIComponent(tag.toLowerCase())}`;
        tagLink.className = 'tag-link';
        tagLink.textContent = tag;
        tagItem.appendChild(tagLink);
        tagsContainer.appendChild(tagItem);
    });
}

// Optional function to load recent posts
async function loadRecentPosts(currentPostId) {
    try {
        // In a real implementation, you would fetch a list of posts
        // For now, we'll hardcode a few sample posts
        const recentPosts = [
            { id: 'design-conferences-2024', title: 'Design conferences in 2024' },
            { id: 'ux-design-trends-2024', title: 'UX Design Trends to Watch in 2024' },
            { id: 'best-fonts-2024', title: 'Best fonts every designer should know in 2024' },
            { id: 'design-digest-80', title: 'Design digest #80' }
        ];
        
        const recentPostsList = document.getElementById('recent-posts-list');
        recentPostsList.innerHTML = '';
        
        // Filter out the current post and display the rest
        recentPosts
            .filter(post => post.id !== currentPostId)
            .slice(0, 4) // Limit to 4 posts
            .forEach(post => {
                const li = document.createElement('li');
                li.className = 'recent-post-item';
                
                const a = document.createElement('a');
                a.href = `blog-post.html?id=${post.id}`;
                a.textContent = post.title;
                
                li.appendChild(a);
                recentPostsList.appendChild(li);
            });
    } catch (error) {
        console.error('Error loading recent posts:', error);
    }
}

// Show error message when post isn't found
function showNotFoundMessage() {
    document.getElementById('post-title').textContent = 'Post Not Found';
    document.getElementById('post-category').textContent = 'Error';
    document.getElementById('post-date').textContent = '';

    const contentElement = document.getElementById('post-content');
    contentElement.innerHTML = `
        <h3 class="h3">Post Not Found</h3>
        <p>Sorry, we couldn't find the blog post you're looking for. It may have been moved or deleted.</p>
        <p><a href="index.html#blog">Return to the blog listing</a></p>
    `;

    // Hide banner image
    const blogBanner = document.querySelector('.blog-banner');
    if (blogBanner) blogBanner.style.display = 'none';

    // Clear image src
    const bannerImg = document.getElementById('post-image');
    if (bannerImg) bannerImg.src = '';

    // Clear tags
    document.getElementById('tags-list').innerHTML = '';
}