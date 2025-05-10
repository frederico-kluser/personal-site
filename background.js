// Matrix Rain Background Effect

// Check if the device is mobile
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (window.innerWidth <= 768);
};

// Configuration
const config = {
  // Adjust font size based on device type
  get fontSize() {
    return isMobile() ? 14 : 28; // Half size on mobile, doubled size on desktop
  },
  color: '#03A062', // Matrix green
  backgroundColor: 'rgba(0, 0, 0, 0)', // Fully transparent background
  characters: [
    '｢', '｣', '､', 'ｦ', 'ｧ', 'ｨ', 'ｩ', 'ｪ', 'ｫ', 'ｬ', 'ｭ', 'ｮ', 'ｯ', 'ｰ', 'ｱ', 'ｲ', 'ｳ',
    'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ',
    'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', 'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ',
    'ﾖ', 'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ﾝ', '0', '1', '2', '3', '4', '5', '6', '7', '8',
    '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ],
  speed: 30, // Update interval in milliseconds
  density: 0.03, // Reduced probability to account for larger characters
  dropLength: 80, // Number of characters in each drop (set to at least 80vh)
  maxDrops: 70, // Reduced maximum drops due to larger character size

  // Adjust drop speed based on device type
  get dropSpeed() {
    return isMobile() ? 0.20 : 0.35; // Slower on mobile (0.20), faster on desktop (0.35)
  }
};

// Define MatrixRain class
class MatrixRain {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.drops = [];
    this.initialized = false;
    this.animationFrameId = null;
    this.lastUpdateTime = 0;
  }

  // Initialize the canvas and start the animation
  init() {
    // Create canvas element
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1'; // Place behind other content
    this.canvas.style.pointerEvents = 'none'; // Allow clicks to pass through
    document.body.appendChild(this.canvas);

    // Get drawing context
    this.ctx = this.canvas.getContext('2d');

    // Resize handler
    window.addEventListener('resize', this.handleResize.bind(this));
    this.resize();

    // Initialize drops
    this.initDrops();

    // Start animation loop
    this.lastUpdateTime = performance.now();
    this.animate();

    this.initialized = true;
    return this;
  }

  // Debounced resize handler to check for device type changes
  handleResize() {
    // Resize the canvas
    this.resize();

    // Re-initialize drops to apply new device-specific settings
    this.initDrops();
  }

  // Handle canvas resizing
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Adjust font for high-DPI displays
    const scale = window.devicePixelRatio || 1;
    if (scale > 1) {
      this.ctx.scale(scale, scale);
    }
    
    // Set font
    this.ctx.font = `${config.fontSize}px monospace`;
    
    // Re-initialize drops after resize
    this.initDrops();
  }

  // Initialize the drops array
  initDrops() {
    this.drops = [];

    // Calculate how many columns can fit based on screen width
    const columnWidth = config.fontSize * 0.8; // Increased spacing for larger characters
    const columns = Math.floor(this.canvas.width / columnWidth);

    // Start with drops that cover more of the screen
    for (let i = 0; i < Math.min(columns, 30); i++) { // Reduced initial drops for larger characters
      this.createNewDrop();
    }
  }

  // Create a new drop at a random position
  createNewDrop() {
    if (this.drops.length >= config.maxDrops) return;
    
    const columnWidth = config.fontSize * 0.8; // Increased spacing for larger characters
    const x = Math.floor(Math.random() * (this.canvas.width / columnWidth)) * columnWidth;
    
    this.drops.push({
      x,
      y: Math.random() * -100 - 50, // Start above the viewport
      speed: (Math.random() * 0.5 + 0.5) * config.fontSize * config.dropSpeed, // Dynamic speed calculation
      chars: Array(config.dropLength).fill().map(() => ({
        value: this.getRandomChar(),
        isChanging: Math.random() < 0.3
      }))
    });
  }

  // Get a random character from the set
  getRandomChar() {
    return config.characters[Math.floor(Math.random() * config.characters.length)];
  }

  // Update drop positions and characters
  update() {
    const { height } = this.canvas;
    
    // Possibly create new drops
    if (Math.random() < config.density && this.drops.length < config.maxDrops) {
      this.createNewDrop();
    }
    
    // Update all drops
    for (let i = 0; i < this.drops.length; i++) {
      const drop = this.drops[i];
      
      // Update drop position
      drop.y += drop.speed;
      
      // Randomly change some characters
      for (let j = 0; j < drop.chars.length; j++) {
        if (drop.chars[j].isChanging && Math.random() < 0.1) {
          drop.chars[j].value = this.getRandomChar();
        }
      }
      
      // Remove drops that have moved beyond the screen
      if (drop.y - (drop.chars.length * config.fontSize) > height) {
        // Remove this drop
        this.drops.splice(i, 1);
        i--;
        
        // Create a new drop to replace it
        this.createNewDrop();
      }
    }
  }

  // Draw the matrix effect
  draw() {
    const { width, height } = this.canvas;
    
    // Clear canvas completely - no trail effect
    this.ctx.clearRect(0, 0, width, height);
    
    // Draw each drop
    for (let i = 0; i < this.drops.length; i++) {
      const drop = this.drops[i];
      
      // Draw each character in the drop
      for (let j = 0; j < drop.chars.length; j++) {
        const y = drop.y - j * config.fontSize;
        
        // Skip if character is off-screen
        if (y < -config.fontSize || y > height + config.fontSize) {
          continue;
        }
        
        // Set color - head character is white, rest are green
        if (j === 0) {
          this.ctx.fillStyle = '#FFFFFF'; // White for head character
        } else {
          // Calculate brightness based on position in the drop
          // to maintain visible trail for at least 80vh
          const brightness = 1 - (j / (drop.chars.length * 0.7)); // Slower fade-out
          const alpha = Math.max(0.15, brightness); // Higher minimum opacity
          this.ctx.fillStyle = `rgba(3, 160, 98, ${alpha})`; // Matrix green with variable alpha
        }
        
        // Draw the character
        this.ctx.fillText(drop.chars[j].value, drop.x, y);
      }
    }
  }

  // Animation loop
  animate(time = 0) {
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    
    // Throttle updates based on config.speed
    if (time - this.lastUpdateTime > config.speed) {
      this.update();
      this.draw();
      this.lastUpdateTime = time;
    }
  }

  // Stop the animation
  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
      this.canvas = null;
    }
    
    this.initialized = false;
  }
}

// Initialize the matrix rain effect when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const matrixRain = new MatrixRain().init();
  
  // Expose to global scope for debugging
  window.matrixRain = matrixRain;
});