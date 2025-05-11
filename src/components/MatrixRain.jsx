import { useEffect, useRef } from 'react';

function MatrixRain() {
  const canvasRef = useRef(null);

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
    // Adjust density based on device type - reduced by 30% for desktop
    get density() {
      return isMobile() ? 0.03 : 0.021; // 0.03 reduced by 30% = 0.021 for desktop
    },
    dropLength: 80, // Number of characters in each drop (set to at least 80vh)
    // Adjust maximum drops based on device type
    get maxDrops() {
      return isMobile() ? 70 : 49; // 70 reduced by 30% = 49 for desktop
    },
    // Adjust drop speed based on device type
    get dropSpeed() {
      return isMobile() ? 0.20 : 0.35; // Slower on mobile (0.20), faster on desktop (0.35)
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Make canvas full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Set font
    ctx.font = `${config.fontSize}px monospace`;
    
    // Adjust for high-DPI displays
    const scale = window.devicePixelRatio || 1;
    if (scale > 1) {
      ctx.scale(scale, scale);
    }

    // Array to store drops
    let drops = [];
    let lastUpdateTime = performance.now();
    let animationFrameId = null;

    // Initialize drops
    const initDrops = () => {
      drops = [];

      // Calculate how many columns can fit based on screen width
      const columnWidth = config.fontSize * 0.8; // Increased spacing for larger characters
      const columns = Math.floor(canvas.width / columnWidth);

      // Start with drops that cover more of the screen - reduced for desktop
      const initialDrops = isMobile() ? 30 : 21; // 30 reduced by 30% = 21 for desktop
      for (let i = 0; i < Math.min(columns, initialDrops); i++) {
        createNewDrop();
      }
    };

    // Create a new drop at a random position
    const createNewDrop = () => {
      if (drops.length >= config.maxDrops) return;

      const columnWidth = config.fontSize * 0.8; // Increased spacing for larger characters
      const x = Math.floor(Math.random() * (canvas.width / columnWidth)) * columnWidth;

      // Randomize drop length slightly to create more natural effect
      const dropLength = isMobile() ?
        config.dropLength :
        Math.floor(config.dropLength * (0.8 + Math.random() * 0.4)); // 80% to 120% of original length

      drops.push({
        x,
        y: Math.random() * -100 - 50, // Start above the viewport
        speed: (Math.random() * 0.5 + 0.5) * config.fontSize * config.dropSpeed, // Dynamic speed calculation
        chars: Array(dropLength).fill().map(() => ({
          value: getRandomChar(),
          isChanging: Math.random() < 0.3
        }))
      });
    };

    // Get a random character from the set
    const getRandomChar = () => {
      return config.characters[Math.floor(Math.random() * config.characters.length)];
    };

    // Update drop positions and characters
    const update = () => {
      const { height } = canvas;
      
      // Possibly create new drops
      if (Math.random() < config.density && drops.length < config.maxDrops) {
        createNewDrop();
      }
      
      // Update all drops
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        
        // Update drop position
        drop.y += drop.speed;
        
        // Randomly change some characters
        for (let j = 0; j < drop.chars.length; j++) {
          if (drop.chars[j].isChanging && Math.random() < 0.1) {
            drop.chars[j].value = getRandomChar();
          }
        }
        
        // Remove drops that have moved beyond the screen
        if (drop.y - (drop.chars.length * config.fontSize) > height) {
          // Remove this drop
          drops.splice(i, 1);
          i--;
          
          // Create a new drop to replace it
          createNewDrop();
        }
      }
    };

    // Draw the matrix effect
    const draw = () => {
      const { width, height } = canvas;
      
      // Clear canvas completely - no trail effect
      ctx.clearRect(0, 0, width, height);
      
      // Draw each drop
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        
        // Draw each character in the drop
        for (let j = 0; j < drop.chars.length; j++) {
          const y = drop.y - j * config.fontSize;
          
          // Skip if character is off-screen
          if (y < -config.fontSize || y > height + config.fontSize) {
            continue;
          }
          
          // Set color - head character is white, rest are green
          if (j === 0) {
            ctx.fillStyle = '#FFFFFF'; // White for head character
          } else {
            // Calculate brightness based on position in the drop
            // to maintain visible trail for at least 80vh
            const brightness = 1 - (j / (drop.chars.length * 0.7)); // Slower fade-out
            const alpha = Math.max(0.15, brightness); // Higher minimum opacity
            ctx.fillStyle = `rgba(3, 160, 98, ${alpha})`; // Matrix green with variable alpha
          }
          
          // Draw the character
          ctx.fillText(drop.chars[j].value, drop.x, y);
        }
      }
    };

    // Animation loop
    const animate = (time = 0) => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Throttle updates based on config.speed
      if (time - lastUpdateTime > config.speed) {
        update();
        draw();
        lastUpdateTime = time;
      }
    };

    // Initialize and start animation
    initDrops();
    lastUpdateTime = performance.now();
    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Adjust font for high-DPI displays
      const scale = window.devicePixelRatio || 1;
      if (scale > 1) {
        ctx.scale(scale, scale);
      }
      
      // Set font
      ctx.font = `${config.fontSize}px monospace`;
      
      // Re-initialize drops after resize
      initDrops();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none' // Allow clicks to pass through
      }}
    />
  );
}

export default MatrixRain;