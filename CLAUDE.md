# CLAUDE.md

This file provides guidance to Claude Code when working with this existing codebase, helping to maintain architectural consistency and follow established patterns.

## Codebase Overview

This project is a personal portfolio website for Fred K. that showcases his professional experience, skills, portfolio, and blog. The site features a responsive design with a matrix-rain background effect and various interactive elements.

## Architectural Approach

The project follows a simple frontend-only architecture with the following key components:

- **Frontend**: HTML, CSS, and vanilla JavaScript
- **UI Design**: Modern, responsive layout with matrix theme aesthetics
- **Interactive Elements**: Navigation, portfolio filtering, testimonials, and contact form
- **Effects**: Matrix rain animation background

## Core Principles

When working with this codebase:

1. **Preserve existing patterns** - Follow established conventions even if they differ from your preferences
2. **Maintain responsive design** - Ensure all features work well on both mobile and desktop devices
3. **Keep performance in mind** - Optimize animations and effects, especially for mobile devices
4. **Maintain visual consistency** - Use the established color scheme and styling patterns
5. **Progressive enhancement** - Ensure core functionality works without JavaScript, enhance with JS

## Code Style Guide

### Formatting
- Indentation: 4 spaces
- Line length: No specific limit, but keep lines reasonably short
- Whitespace: Use blank lines to separate logical sections
- End of line: LF (Unix-style)

### Naming Conventions
- Files: Lowercase with hyphens (e.g., `blog-post.css`)
- Functions/Methods: camelCase
- Variables: camelCase
- CSS Classes: kebab-case (e.g., `blog-item-title`)
- Constants: UPPER_CASE for true constants, camelCase for configuration objects

## Project Structure

```
- index.html             # Main page with multiple sections (About, Resume, Portfolio, Blog, Contact)
- blog-post.html         # Template for individual blog posts
- main.js                # Main JavaScript functionality for UI interactions
- blog-post.js           # Specific JavaScript for blog post pages
- background.js          # Matrix rain animation background effect
- style.css              # Main stylesheet with responsive design
- blog-post.css          # Additional styles specific to blog posts
```

## Existing Patterns to Follow

### HTML Structure Pattern

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - Fred K.</title>
    <link rel="stylesheet" href="style.css">
    <!-- Additional stylesheets as needed -->
    <link rel="shortcut icon" href="https://i.postimg.cc/9fqYVvxh/logo.png" type="image/x-icon">
</head>
<body>
    <main>
        <!-- Main content sections -->
    </main>

    <script src="main.js"></script>
    <!-- Additional scripts as needed -->
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
</html>
```

### JavaScript Pattern

```javascript
'use strict';

// Function for toggling element classes
const elementToggleFunc = function (elem) { 
    elem.classList.toggle("active"); 
}

// DOM element selection
const element = document.querySelector("[data-element]");

// Event listener attachment
element.addEventListener("click", function() {
    elementToggleFunc(element);
})

// DOM content loaded pattern
document.addEventListener('DOMContentLoaded', function() {
    // Initialization code here
});
```

### CSS Variables Pattern

```css
:root {
    /* Colors */
    --matrix-green: hsl(157, 96%, 32%);
    --matrix-green-light: hsl(146, 100%, 37%);
    
    /* Font families */
    --ff-poppins: 'Poppins', sans-serif;
    
    /* Font sizes */
    --fs1: 24px;
    --fs2: 18px;
    
    /* Font weights */
    --fw300: 300;
    --fw400: 400;
    
    /* Transitions */
    --transition1: .25s ease;
}
```

### Responsive Design Pattern

The site uses a mobile-first approach with media queries for larger screens:

```css
/* Base styles for mobile */
.element {
    width: 100%;
}

/* Tablet styles */
@media (min-width: 768px) {
    .element {
        width: 50%;
    }
}

/* Desktop styles */
@media (min-width: 1024px) {
    .element {
        width: 33.33%;
    }
}
```

## Known Technical Debt Areas

1. **Image Hosting**
   - Issues: Images are hosted on external services (i.postimg.cc)
   - Approach: Consider migrating to local storage or a more reliable CDN in the future

2. **Background Animation**
   - Issues: The matrix rain effect can be resource-intensive on lower-end devices
   - Approach: Further optimize or add options to disable for better performance

3. **Form Handling**
   - Issues: The contact form doesn't have backend integration yet
   - Approach: Add form submission functionality when implementing backend

## Common Development Commands

```bash
# Start a local development server
python -m http.server
# or
npx serve

# If using Node.js with live reload
npx live-server
```

## Color Scheme Guidelines

The site uses a consistent color scheme that should be maintained:

- Primary accent: Matrix green (`#03A062` or `hsl(157, 96%, 32%)`)
- Secondary accent: Light green (`hsl(146, 100%, 37%)`)
- Background: Dark/Black (`hsl(0, 0%, 7%)`)
- UI Elements: Dark gray (`hsl(240, 1%, 17%)`)
- Text: White/Light gray

## Testing Strategy

- **Cross-browser Testing**: Ensure compatibility with Chrome, Firefox, Safari, and Edge
- **Responsive Testing**: Test on various device sizes (mobile, tablet, desktop)
- **Performance Testing**: Monitor animation performance, especially on mobile devices

## Refactoring Guidelines

When refactoring existing code:

1. Maintain the existing visual design
2. Test across different screen sizes
3. Optimize performance where possible
4. Keep the same functionality for all interactive elements
5. Follow the established naming conventions and code style

## Instructions for Research and External Resources

Claude, when you need to access external resources or research information:

1. ALWAYS FIRST add the URL temporarily to this CLAUDE.md file under "Authorized URLs"
2. Use WebFetchTool ONLY after adding the URL
3. Remove the URL from the list after completing the research
4. Never access URLs not explicitly authorized through this process

### Authorized URLs
- https://api.duckduckgo.com

## Feature Development Guidelines

When developing new features:

1. Match the existing aesthetic and UI patterns
2. Implement responsive design from the start
3. Consider both mouse and touch interactions
4. Optimize assets for web use
5. Maintain accessibility standards
6. Add appropriate animations and transitions consistent with the current style

## Contact Information

For questions about this project, contact Fred K. at fkluser@icloud.com.

---
Last updated: May 11, 2025