const DEFAULT_COLOR = '#000';
let isMouseDown = false;
let currentColor = DEFAULT_COLOR;
let eraserPressed = false;
let currentSize = 16;
let rainbowModePressed = false;

// Cache frequently used DOM elements
const buttons = document.querySelectorAll('#choose-buttons button');
const eraserButton = document.getElementById('eraser');
const colorModeButton = document.getElementById('color-mode');
const canvas = document.getElementById('canvas');
const showGrid = document.getElementById('show-grid');
const colorPicker = document.getElementById('color-picker');
const clear = document.getElementById('clear');
const rainbowModeColorButton = document.getElementById('rainbow-mode');
const gridChangeSlider = document.getElementById('grid-change');
const gridChangeLabel = document.querySelector('label[for="grid-change"]');

// Event listeners for button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Event listener for changing grid size
gridChangeSlider.addEventListener('input', (e) => changeSize(Number(e.target.value)));

// Function to change the size of the grid
function changeSize(value) {
    currentSize = value;
    updateSizeLabel(value);
    reloadGrid();
}

// Function to update the grid size label
function updateSizeLabel(value) {
    gridChangeLabel.textContent = `${value}x${value}`;
}

// Function to reload the grid
function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

// Function to clear the grid
function clearGrid() {
    canvas.innerHTML = '';
}

// Function to set up the grid with the specified size
function setupGrid(size) {
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        canvas.appendChild(gridElement);
    }

    updateGridBorders();
}

// Function to update grid borders based on checkbox status
function updateGridBorders() {
    const showGridCheckbox = document.getElementById('show-grid');
    const gridElements = document.querySelectorAll('.grid-element');

    const borderStyle = showGridCheckbox.checked ? '1px solid black' : 'none';

    gridElements.forEach(gridElement => gridElement.style.border = borderStyle);
    console.log(`Grid is ${showGridCheckbox.checked ? 'shown' : 'hidden'}`);
}

// Event listener for window load
window.onload = () => {
    updateSizeLabel(currentSize);
    setupGrid(currentSize);
};

// Event listener for showing/hiding the grid
showGrid.addEventListener('change', updateGridBorders);

// Function to set drawing mode
function setDrawingMode(isEraser, isRainbowMode, color) {
    eraserPressed = isEraser;
    rainbowModePressed = isRainbowMode;
    currentColor = color;
}

// Event listener for eraser button click
eraserButton.addEventListener('click', () => setDrawingMode(true, false, '#fff'));
// Event listener for color mode button click
colorModeButton.addEventListener('click', () => setDrawingMode(false, false, colorPicker.value));

// Event listeners for mouse events on the canvas
canvas.addEventListener('mousemove', (e) => draw(e));
canvas.addEventListener('mouseleave', () => isMouseDown = false);
canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    draw(e);
});
canvas.addEventListener('mouseup', () => isMouseDown = false);

// Function to handle drawing on the canvas
function draw(e) {
    if (isMouseDown && e.target.classList.contains('grid-element')) {
        currentColor = rainbowModePressed ? getRandomHexColor() : currentColor;
        e.target.style.backgroundColor = currentColor;
    }
}

// Event listener for color picker input
colorPicker.addEventListener('input', (e) => currentColor = e.target.value);

// Event listener for clear button click
clear.addEventListener('click', () => {
    document.querySelectorAll('.grid-element').forEach(gridElement => gridElement.style.backgroundColor = '#fff');
    clear.classList.remove('active');
});

// Event listener for rainbow mode button click
rainbowModeColorButton.addEventListener('click', () => setDrawingMode(false, true, getRandomHexColor()));

// Function to get a random hex color
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}
