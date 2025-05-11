import { useEffect, useRef } from 'react';

function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Make canvas full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters to use
    const chars = "01";
    
    // Convert the string into an array of single characters
    const charArray = chars.split("");
    
    // Font size will affect how many columns there are
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // An array of drops - one per column
    const drops = [];
    
    // Initialize all drops to start at a random y position
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height);
    }
    
    // Drawing the characters
    function draw() {
      // Set a semi-transparent black background for the previous frame
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set the character color and font
      ctx.fillStyle = "#03A062"; // Matrix green
      ctx.font = fontSize + "px monospace";
      
      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Get a random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Randomly reset some drops to the top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move the drop down
        drops[i]++;
      }
    }
    
    // Animation loop
    const interval = setInterval(draw, 33); // ~30fps
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      clearInterval(interval);
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
        zIndex: -1
      }}
    />
  );
}

export default MatrixRain;