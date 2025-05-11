/**
 * SimpleFade - A simplified component that wraps content with a CSS-based fade transition
 * Prevents flickering during page transitions by using pure CSS instead of motion animations
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be wrapped
 * @param {boolean} props.isVisible - Whether the content should be visible
 * @param {number} props.duration - The duration of the transition in seconds (default: 0.3)
 * @param {string} props.className - Additional CSS classes
 */
function SimpleFade({
  children,
  isVisible,
  duration = 0.3,
  className = "",
  ...props
}) {
  // Always render content but control visibility with CSS
  // This prevents the content from being unmounted and remounted
  // which causes the flickering effect
  
  return (
    <div
      className={`simple-fade ${className} ${isVisible ? 'visible' : 'hidden'}`}
      style={{ 
        display: 'block',
        position: 'relative',
        width: '100%',
        height: '100%',
        pointerEvents: isVisible ? 'auto' : 'none',
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}s ease-in-out`,
        willChange: 'opacity',
        zIndex: isVisible ? 2 : 1,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default SimpleFade;