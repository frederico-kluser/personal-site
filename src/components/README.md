# Reusable Animation Components

This directory contains reusable animation components that help maintain consistent animation patterns across the application while reducing code duplication.

## Components Overview

### `SectionHeader`

A reusable component for section headers with built-in animations.

```jsx
import SectionHeader from './components/SectionHeader';

// Basic usage
<SectionHeader title="My Section Title" />

// With subtitle
<SectionHeader 
  title="My Section Title" 
  subtitle="Optional subtitle text"
/>

// With custom tag and centered text
<SectionHeader 
  title="My Skills" 
  tagName="h3" 
  centered={true}
/>

// With animation delay
<SectionHeader 
  title="My Portfolio" 
  delay={0.3}
/>
```

**Props:**
- `title`: String (required) - The section title
- `subtitle`: String - Optional subtitle
- `className`: String - Additional CSS classes
- `centered`: Boolean - Should the header be centered (default: false)
- `tagName`: String - HTML tag for the title ('h2', 'h3', 'h4') (default: 'h2')
- `delay`: Number - Animation delay in seconds (default: 0)
- `animate`: Boolean - Whether to animate (default: true)
- `children`: React nodes - Additional content to render in the header

### `AnimatedSection`

A container for animated sections that handles scroll-based reveal animations.

```jsx
import AnimatedSection from './components/AnimatedSection';

// Basic usage
<AnimatedSection className="my-section">
  <p>Section content here</p>
</AnimatedSection>

// Custom animation
<AnimatedSection
  className="custom-section"
  delay={0.3}
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
>
  <p>Content with custom animation</p>
</AnimatedSection>
```

**Props:**
- `className`: String - CSS classes
- `inViewOnce`: Boolean - If animation should occur once (default: true)
- `amount`: Number - Visibility threshold to trigger animation (default: 0.2)
- `delay`: Number - Animation delay in seconds (default: 0)
- `initial`: Object - Initial animation state (default: { opacity: 0, y: 30 })
- `animate`: Object - Final animation state (default: { opacity: 1, y: 0 })
- `exit`: Object - Exit animation state (optional)
- `transition`: Object - Animation transition settings
- `onViewEnter`: Function - Callback when element enters viewport
- `onViewLeave`: Function - Callback when element leaves viewport
- `children`: React nodes - Section content

### `AnimatedList`

A component for creating animated lists with staggered item animations.

```jsx
import AnimatedList from './components/AnimatedList';

// Basic usage with array of strings
<AnimatedList
  items={["Item 1", "Item 2", "Item 3"]}
/>

// Custom rendering for complex items
<AnimatedList
  className="services-list"
  tag="ul"
  itemTag="li"
  delay={0.2}
  staggerDelay={0.1}
  items={servicesArray}
  renderItem={(service, index, animationProps) => (
    <li 
      key={service.id} 
      className="service-item"
      {...animationProps}
    >
      <img src={service.icon} alt={service.title} />
      <h4>{service.title}</h4>
      <p>{service.description}</p>
    </li>
  )}
/>
```

**Props:**
- `className`: String - CSS classes
- `inViewOnce`: Boolean - If animation should occur once (default: true)
- `amount`: Number - Visibility threshold (default: 0.2)
- `delay`: Number - Initial delay before animations start (default: 0)
- `staggerDelay`: Number - Delay between each item (default: 0.1)
- `itemInitial`: Object - Initial state of items (default: { opacity: 0, y: 20 })
- `itemAnimate`: Object - Final state of items (default: { opacity: 1, y: 0 })
- `itemTransition`: Object - Transition settings for items
- `itemProps`: Object - Additional props for items
- `tag`: String - HTML tag for container (default: 'ul')
- `itemTag`: String - HTML tag for items (default: 'li')
- `items`: Array - Items to render
- `renderItem`: Function - Custom render function for items

## CSS Utilities

Additional CSS classes are available in `src/assets/css/animated-components.css`:

- Fade effects: `.fade-up`, `.fade-in`
- Item staggering: `.stagger-item`
- Hover effects: `.hover-scale`, `.hover-rotate`, `.hover-shine`, `.hover-lift`
- Matrix-themed effects: `.matrix-glow`, `.matrix-pulse`
- Timeline animation: `.timeline-line`

## Usage Examples

### Typical Section with Header and List

```jsx
// AboutSection.jsx
import SectionHeader from './SectionHeader';
import AnimatedSection from './AnimatedSection';
import AnimatedList from './AnimatedList';

function AboutSection() {
  const serviceItems = [
    { id: 1, title: "Service 1", description: "Description 1" },
    { id: 2, title: "Service 2", description: "Description 2" },
    // ...
  ];

  const renderServiceItem = (service, index, animationProps) => (
    <li 
      className="service-item" 
      key={service.id}
      {...animationProps}
    >
      <h4>{service.title}</h4>
      <p>{service.description}</p>
    </li>
  );

  return (
    <div className="about-container">
      <SectionHeader 
        title="About Me" 
        subtitle="Learn about my journey"
      />
      
      <AnimatedSection className="about-text" delay={0.2}>
        <p>Content here...</p>
      </AnimatedSection>
      
      <AnimatedSection className="services" delay={0.4}>
        <SectionHeader 
          title="My Services" 
          tagName="h3"
          delay={0.1}
        />
        
        <AnimatedList
          className="services-list"
          tag="ul"
          delay={0.2}
          staggerDelay={0.1}
          items={serviceItems}
          renderItem={renderServiceItem}
        />
      </AnimatedSection>
    </div>
  );
}
```

## Benefits

- **Consistency**: Maintains consistent animations across components
- **DRY Principle**: Reduces code duplication
- **Maintainability**: Makes animation changes easier to implement
- **Performance**: Optimized animations with proper viewport detection
- **Flexibility**: Customizable but with sensible defaults