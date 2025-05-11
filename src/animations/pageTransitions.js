// Animation variants for different transitions

export const pageTransitions = {
  initial: {
    opacity: 0,
    y: 20,
    position: 'absolute',
    width: '100%',
    zIndex: 0
  },
  animate: {
    opacity: 1,
    y: 0,
    position: 'relative',
    width: '100%',
    zIndex: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    position: 'absolute',
    width: '100%',
    zIndex: 0,
    transition: {
      duration: 0.3
    }
  }
};

// Variantes específicas para páginas diferentes
export const aboutTransitions = {
  ...pageTransitions,
  exit: {
    opacity: 0,
    x: -20,
    y: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 0,
    transition: { duration: 0.3 }
  }
};

export const resumeTransitions = {
  ...pageTransitions,
  exit: {
    opacity: 0,
    x: -20,
    y: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 0,
    transition: { duration: 0.3 }
  }
};

export const portfolioTransitions = {
  ...pageTransitions,
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 0,
    transition: { duration: 0.3 }
  }
};

export const blogTransitions = {
  ...pageTransitions,
  exit: {
    opacity: 0,
    x: 20,
    y: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 0,
    transition: { duration: 0.3 }
  }
};

export const contactTransitions = {
  ...pageTransitions,
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 0,
    transition: { duration: 0.3 }
  }
};

// Right slide transition variant
export const slideTransition = {
  initial: { 
    opacity: 0, 
    x: 100 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      duration: 0.5
    }
  },
  exit: { 
    opacity: 0, 
    x: -100,
    transition: {
      duration: 0.3
    }
  }
};

// Fade transition for modals
export const fadeTransition = {
  initial: { 
    opacity: 0
  },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

// Scale transition for modals and cards
export const scaleTransition = {
  initial: { 
    opacity: 0,
    scale: 0.9
  },
  animate: { 
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3
    }
  }
};

// Staggered children animation
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Child item animation
export const fadeInUpItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20
    }
  }
};

// Button hover animation
export const buttonHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.95 }
};