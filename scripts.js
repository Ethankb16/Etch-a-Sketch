const container = document.querySelector('#container');
const controls = document.querySelector('#controls');
const btn16 = document.querySelector('#btn-16');
const btn32 = document.querySelector('#btn-32');
const btn64 = document.querySelector('#btn-64');
const resetButton = document.getElementById('btn-reset');
const eraserButton = document.getElementById('btn-eraser');
const colorPicker = document.getElementById('color-picker');
const grid = document.getElementById('grid');
const downloadButton = document.getElementById('btn-download');
const squares = document.querySelectorAll('.grid-square');


let eraseMode = false;
let currentColor = '#000000';
let isDrawing = false;

createGrid(16);

btn16.addEventListener('click', () => {
	removeGrid();
	createGrid(16);
});
btn32.addEventListener('click', () => {
	removeGrid();
	createGrid(32);
});
btn64.addEventListener('click', () => {
	removeGrid();
	createGrid(64);
});

function createGrid(size) {
    const squareSize = size === 16 ? 60 : size === 32 ? 30 : 15;
  
    colorPicker.addEventListener('input', (event) => {
      currentColor = event.target.value;
    });

    const containerSize = size * squareSize;
    container.style.width = `${containerSize}px`;
    container.style.height = `${containerSize}px`;
  
    for (let i = 0; i < size * size; i++) {
      const div = document.createElement('div');
      div.classList.add('grid-square');
      div.style.width = `${squareSize}px`;
      div.style.height = `${squareSize}px`;
      container.appendChild(div);
    }
  
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach((square) => {
      square.addEventListener('mousedown', (event) => {
          isDragging = true;
          if (eraseMode) {
            square.style.backgroundColor = 'white';
          } else {
            square.style.backgroundColor = currentColor;
          }
          lastSquare = square;
      });
      square.addEventListener('mousemove', (event) => {
          if (isDragging && square != lastSquare) {
              if (eraseMode) {
                  square.style.backgroundColor = 'white';
              } else {
                  square.style.backgroundColor = currentColor;
              }
              lastSquare = square;
          }
      });
      square.addEventListener('mouseup', () => {
          isDragging = false;
      });
    });

     resetButton.addEventListener('click', function() {
      const squares = document.querySelectorAll('.grid-square');
      squares.forEach(square => {
        square.style.backgroundColor = 'white';
      });
      eraseMode = false;
      eraserButton.classList.remove('active');
    });
}

function removeGrid() {
	const squares = document.querySelectorAll('.grid-square');
	squares.forEach(square => {
		container.removeChild(square);
	});
}

resetButton.addEventListener('click', function() {
  const squares = document.querySelectorAll('.grid-square');
  squares.forEach(square => {
    square.style.backgroundColor = 'white';
  });
  eraseMode = false;
});

eraserButton.addEventListener("click", () => {
  eraseMode = !eraseMode;
  eraserButton.classList.toggle('active');
});

colorPicker.addEventListener('click', () => {
  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.addEventListener('input', () => {
    currentColor = colorInput.value;
  });
  colorInput.click();
});


