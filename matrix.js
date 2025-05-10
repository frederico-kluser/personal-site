// This file exports the matrixRain function
const { COLOR, CHARACTERS } = {
  COLOR: {
    BLACK: '#020204',
    GREEN: '#204829',
    TRANSPARENT: 'transparent',
  },
  CHARACTERS: [
    '｢', '｣', '､', 'ｦ', 'ｧ', 'ｨ', 'ｩ', 'ｪ', 'ｫ', 'ｬ', 'ｭ', 'ｮ', 'ｯ', 'ｰ', 'ｱ', 'ｲ', 'ｳ', 
    'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ', 
    'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', 'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ', 
    'ﾖ', 'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ﾝ', '0', '1', '2', '3', '4', '5', '6', '7', '8', 
    '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ],
};

// Terminal dimensions
const termWidth = process.stdout.columns || 80;
const termHeight = process.stdout.rows || 24;
const rows = Math.min(termHeight, 24); // Limit height for better performance

// Matrix state
const matrixState = {
  running: true,
  intervalId: null,
  lastFrame: null,
  matrix: [],
  previousMatrix: [],
};

// Helper functions
const getProbability = (percent = 0) => percent > Math.floor(Math.random() * 100) + 1;
const getRandomNumber = (limit = 0) => Math.floor(Math.random() * limit);
const getRandomCharacter = () => CHARACTERS[getRandomNumber(CHARACTERS.length)];

// Green shade definition with ANSI color codes
const getGreenShade = (intensity, isLeading = false) => {
  // If it's the leading character, return bright white
  if (isLeading) {
    return '\x1b[1;97m'; // Bright white (bold)
  }

  const shades = [
    '\x1b[38;5;22m',  // Muito escuro
    '\x1b[38;5;28m',  // Escuro
    '\x1b[38;5;34m',  // Médio escuro
    '\x1b[38;5;40m',  // Médio
    '\x1b[38;5;46m',  // Médio claro
    '\x1b[38;5;118m', // Claro
    '\x1b[38;5;120m', // Muito claro
    '\x1b[38;5;121m', // Super claro
    '\x1b[38;5;157m', // Ultra claro
    '\x1b[38;5;194m'  // Praticamente branco
  ];
  
  return shades[Math.min(intensity, shades.length - 1)];
};

class Matrix {
  constructor(row, column) {
    this.column = column;
    this.row = row;
    this.life = rows;
    this.letter = ' ';
    this.intensity = 0;
    this.color = COLOR.TRANSPARENT;
    this.isLeading = false; // Tracks if this is the leading character in a column

    if (!this.row) {
      this.changeLetter(5);
    }
  }

  changeLetter(probability = 100) {
    if (getProbability(probability)) {
      this.letter = getRandomCharacter();
      this.intensity = this.row === 0 ? 9 : Math.floor(Math.random() * 5) + 2;
      this.color = COLOR.GREEN;
    }
  }

  passTime() {
    if (!this.life) {
      this.delete();
    } else if (this.letter !== ' ') {
      this.life -= 1;
      this.changeLetter(5);
      
      // Apply fade effect
      if (this.intensity > 0 && this.life % 2 === 0) {
        this.intensity = Math.max(0, this.intensity - 1);
      }
      
      // Remove leading status when character reaches the last row
      if (this.isLeading && this.row === rows - 1) {
        this.isLeading = false;
      }
    } else if (!this.row) {
      let allColumnEmpty = true;
      let leadingCharFound = false;

      for (let row = 0; row < rows; row += 1) {
        if (matrixState.matrix[row][this.column].letter !== ' ') {
          allColumnEmpty = false;
          if (matrixState.matrix[row][this.column].isLeading) {
            leadingCharFound = true;
          }
        }
      }

      // Start a new column if it's empty and probability condition is met
      if (allColumnEmpty && getProbability(10)) {
        this.changeLetter(2);
        this.intensity = 9; // Leading character is brightest
        this.isLeading = true; // Mark as the leading character
      }
    } else if (matrixState.matrix[this.row - 1][this.column].letter !== ' ') {
      // If the character above is the leading character, this new one inherits the leading status
      this.isLeading = matrixState.matrix[this.row - 1][this.column].isLeading;
      
      // The character above is no longer the leading character as it has moved down
      if (this.isLeading) {
        matrixState.matrix[this.row - 1][this.column].isLeading = false;
      }
      
      this.changeLetter();
    }
  }

  delete() {
    this.life = rows;
    this.letter = ' ';
    this.intensity = 0;
    this.isLeading = false;
  }
}

// Initialize matrix
const initializeMatrix = () => {
  matrixState.matrix = [];
  matrixState.previousMatrix = [];
  
  for (let row = 0; row < rows; row += 1) {
    matrixState.matrix.push([]);
    matrixState.previousMatrix.push([]);
    
    for (let column = 0; column < termWidth; column += 1) {
      matrixState.matrix[row].push(new Matrix(row, column));
      matrixState.previousMatrix[row].push({
        letter: ' ',
        intensity: 0,
        isLeading: false
      });
    }
  }
};

// Efficient terminal output using ANSI codes
const efficientUpdate = () => {
  // Save cursor position
  process.stdout.write('\u001B[s');
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < termWidth; x++) {
      const current = matrixState.matrix[y][x];
      const prev = matrixState.previousMatrix[y][x];
      
      // Only update changed cells or those with changed leading status
      if (current.letter !== prev.letter || 
          current.intensity !== prev.intensity || 
          current.isLeading !== prev.isLeading) {
        // Move cursor to position
        process.stdout.write(`\u001B[${y+1};${x+1}H`);
        
        if (current.letter === ' ') {
          // Clear character
          process.stdout.write(' ');
        } else {
          // Write with color, using bright white for leading characters
          process.stdout.write(`${getGreenShade(current.intensity, current.isLeading)}${current.letter}\x1b[0m`);
        }
        
        // Update previous state
        prev.letter = current.letter;
        prev.intensity = current.intensity;
        prev.isLeading = current.isLeading;
      }
    }
  }
  
  // Restore cursor position
  process.stdout.write('\u001B[u');
};

// Initialize output
const initializeOutput = () => {
  console.clear();
  process.stdout.write('\u001B[?25l'); // Hide cursor
  
  // Initial drawing of the empty matrix
  process.stdout.write('\u001B[s'); // Save cursor position
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < termWidth; x++) {
      process.stdout.write(' ');
    }
    if (y < rows - 1) {
      process.stdout.write('\n');
    }
  }
  process.stdout.write('\u001B[u'); // Restore cursor position
};

// Update matrix state
const updateMatrix = () => {
  for (let row = rows - 1; row >= 0; row -= 1) {
    for (let column = 0; column < termWidth; column += 1) {
      matrixState.matrix[row][column].passTime();
    }
  }
  
  efficientUpdate();
};

// Matrix loader animation
function matrixLoader() {
  const frames = ['|', '/', '-', '\\'];
  let currentFrame = 0;
  let dots = '';
  let iterations = 0;
  const maxIterations = 12; // Number of iterations before completing
  
  return {
    start() {
      return new Promise(resolve => {
        console.clear();
        const interval = setInterval(() => {
          // Add dots gradually
          if (dots.length < 10) dots += '.';
          else dots = '';
          
          // Clear console and show current frame
          console.clear();
          console.log(`\x1b[32m` + // Green color
            `Initializing Matrix ${frames[currentFrame]} ${dots}\n` +
            `${Math.floor((iterations / maxIterations) * 100)}% completed` +
            `\x1b[0m`); // Reset color
          
          currentFrame = (currentFrame + 1) % frames.length;
          iterations++;
          
          // Simulate loading completion after maxIterations
          if (iterations >= maxIterations) {
            clearInterval(interval);
            console.clear();
            resolve();
          }
        }, 200);
      });
    }
  };
}

// Pause/Resume controls
const togglePause = () => {
  if (matrixState.running) {
    // Pause
    clearInterval(matrixState.intervalId);
    matrixState.intervalId = null;
    matrixState.running = false;
    
    // Show pause message
    const y = Math.floor(rows / 2);
    const message = "[ PAUSED ]";
    const x = Math.max(0, Math.floor((termWidth - message.length) / 2));
    
    // Bounds check for message
    if (x < termWidth) {
      process.stdout.write(`\u001B[${y+1};${x+1}H\x1b[33m${message}\x1b[0m`);
    }
  } else {
    // Resume
    matrixState.running = true;
    matrixState.intervalId = setInterval(updateMatrix, 100);
  }
};

// Execute function while paused
const executeWhilePaused = (func) => {
  const wasRunning = matrixState.running;
  
  if (wasRunning) togglePause();
  
  func(); // Execute the function
  
  // Wait before resuming
  setTimeout(() => {
    if (wasRunning) togglePause();
  }, 500);
};

// Reveal message in the matrix
const revealMessage = (message) => {
  // Ensure message doesn't exceed terminal width
  const maxLength = Math.min(message.length, termWidth - 4); // Leave 2 chars on each side
  const displayMessage = message.length > maxLength 
    ? message.substring(0, maxLength - 3) + '...' 
    : message;
  
  // Show the message in the middle of the screen
  const messageRow = Math.floor(rows / 2);
  const messageStart = Math.max(0, Math.floor((termWidth - displayMessage.length) / 2));
  
  // Create message map
  const messageMap = {};
  for (let i = 0; i < displayMessage.length; i++) {
    messageMap[messageStart + i] = {
      char: displayMessage[i],
      row: messageRow
    };
  }
  
  // Store the original update function
  const originalUpdateFn = updateMatrix;
  
  // New update function that shows the message
  const messageUpdate = () => {
    // Normal update
    for (let row = rows - 1; row >= 0; row -= 1) {
      for (let column = 0; column < termWidth; column += 1) {
        // Skip the message area
        if (messageMap[column] && messageMap[column].row === row) {
          continue;
        }
        
        matrixState.matrix[row][column].passTime();
      }
    }
    
    // Normal efficient update
    efficientUpdate();
    
    // Add message overlay
    for (let i = 0; i < displayMessage.length; i++) {
      const x = messageStart + i;
      
      // Ensure we don't go beyond terminal width
      if (x < termWidth) {
        // Draw message character in white
        process.stdout.write(`\u001B[${messageRow+1};${x+1}H\x1b[97m${displayMessage[i]}\x1b[0m`);
        
        // Update the previous matrix to include this character
        matrixState.previousMatrix[messageRow][x].letter = displayMessage[i];
        matrixState.previousMatrix[messageRow][x].intensity = 9;
      }
    }
  };
  
  // Replace the global updateMatrix function (using a function expression, not reassignment)
  matrixState.originalUpdateFn = originalUpdateFn;
  matrixState.intervalId = clearInterval(matrixState.intervalId);
  matrixState.intervalId = setInterval(messageUpdate, 100);
  
  // Restore original after 5 seconds
  setTimeout(() => {
    matrixState.intervalId = clearInterval(matrixState.intervalId);
    matrixState.intervalId = setInterval(originalUpdateFn, 100);
  }, 5000);
};

// Listen for keyboard input
try {
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', (key) => {
      // Check for Ctrl+C (end)
      if (key.toString() === '\u0003') {
        process.stdout.write('\u001B[?25h'); // Show cursor again
        console.clear();
        process.exit();
      }
      
      // Space key for pause/resume
      if (key.toString() === ' ') {
        togglePause();
      }
      
      // 'M' key to show a message
      if (key.toString().toLowerCase() === 'm') {
        revealMessage("MATRIX HAS YOU");
      }
    });
  } else {
    console.log("Running in non-interactive mode. Press Ctrl+C to exit.");
  }
} catch (error) {
  console.log("Running in non-interactive mode. Press Ctrl+C to exit.");
}

// Matrix rain function that returns an instance and stop function
const matrixRain = async (initialMessage = "WAKE UP NEO") => {
  // Show loader
  const loader = matrixLoader();
  await loader.start();
  
  initializeMatrix();
  initializeOutput();
  
  matrixState.intervalId = setInterval(updateMatrix, 100);
  
  // Show the initial message after 1 second
  setTimeout(() => {
    revealMessage(initialMessage);
    
    // Add an auto-exit timer for non-interactive environments (20 seconds)
    if (!process.stdin.isTTY) {
      console.log("Auto-exit scheduled in 20 seconds for non-interactive mode");
      setTimeout(() => {
        console.log("Auto-exiting Matrix animation");
        process.exit(0);
      }, 20000);
    }
  }, 1000);
  
  // Return the instance with display and stop functions
  return {
    // Display a message in the center of the screen
    display: (message) => {
      if (!message || typeof message !== 'string') {
        return;
      }
      
      // Truncate long messages before passing to revealMessage
      // This is an extra layer of validation in case revealMessage changes
      revealMessage(message);
    },
    
    // Stop the animation
    stop: () => {
      // Clear any existing intervals
      if (matrixState.intervalId) {
        clearInterval(matrixState.intervalId);
        matrixState.intervalId = null;
      }
      
      // Reset state
      matrixState.running = false;
      
      // Restore terminal
      process.stdout.write('\u001B[?25h'); // Show cursor
      console.clear();
      
      // Remove keyboard event listeners to prevent zombie processes
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdin.removeAllListeners('data');
      }
    }
  };
};

// Export the function instead of auto-starting
module.exports = matrixRain;

// Handle exit to restore terminal
process.on('exit', () => {
  process.stdout.write('\u001B[?25h'); // Show cursor
  console.clear();
});

// Handle SIGINT (Ctrl+C) and uncaught exceptions
process.on('SIGINT', () => {
  process.stdout.write('\u001B[?25h'); // Show cursor
  console.clear();
  // Don't call process.exit() here - let the application handle it
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  process.stdout.write('\u001B[?25h'); // Show cursor
  console.clear();
  console.error('An error occurred:', error);
  process.exit(1);
});