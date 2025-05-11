import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

/**
 * FadeTransition - A reusable component that wraps content with a fade transition
 * Helps prevent flickering during page transitions by properly managing element visibility
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be wrapped
 * @param {boolean} props.isVisible - Whether the content should be visible
 * @param {number} props.duration - The duration of the transition in seconds (default: 0.3)
 * @param {string} props.className - Additional CSS classes
 */
function FadeTransition({
  children,
  isVisible,
  duration = 0.3,
  className = "",
  ...props
}) {
  // Add state to track if content should be rendered at all
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    // If becoming visible, render immediately
    if (isVisible) {
      setShouldRender(true);
    }
    // If becoming invisible, wait for animation to complete before unmounting
    else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  // If shouldn't render at all, return null
  if (!shouldRender && !isVisible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        transition: { duration: duration }
      }}
      className={`fade-transition ${className}`}
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        height: '100%',
        pointerEvents: isVisible ? 'auto' : 'none',
        willChange: 'opacity',
        zIndex: isVisible ? 2 : 1,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default FadeTransition;