const DEFAULT_COLOR = '#000'
const isClearButtonActive = false
const eraserButton = document.getElementById('eraser');
const colorModeButton = document.getElementById('color-mode');
const DEFAULT_SIZE = 16;
const gridChangeSlider = document.getElementById('grid-change');
const canvas = document.getElementById('canvas');
const showGrid = document.getElementById('show-grid')
const colorPicker = document.getElementById('color-picker')
const clear = document.getElementById('clear')
const rainbowModeColorButton = document.getElementById('rainbow-mode')
const buttons = document.querySelectorAll('#choose-buttons button');

let isMouseDown = false
let currentColor = DEFAULT_COLOR
let eraserPressed = false;
let currentSize = DEFAULT_SIZE;
let rainbowModePressed = false

// gives clicked button "active" styles button
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        buttons.forEach(function(btn) {
            btn.classList.remove('active');
        });

        button.classList.add('active');
    });
});

// Grid calculating and displaying
gridChangeSlider.addEventListener('input', (e) => changeSize(Number(e.target.value))); // Convert the value to a number

function changeSize(value) {
    currentSize = value
    updateSizeLabel(value)
    reloadGrid()
}

function updateSizeLabel(value) {
    document.querySelector('label[for="grid-change"]').textContent = `${value}x${value}`;
}

function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

function clearGrid() {
    canvas.innerHTML = '';
}

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

function updateGridBorders() {
    const showGridCheckbox = document.getElementById('show-grid');
    const gridElements = document.querySelectorAll('.grid-element');

    if (showGridCheckbox.checked) {
        gridElements.forEach((gridElement) => {
            gridElement.style.border = '1px solid black';
        });
        console.log('Show grid');
    } else {
        gridElements.forEach((gridElement) => {
            gridElement.style.border = 'none';
        });
        console.log('Hide grid');
    }
}

window.onload = () => {
    updateSizeLabel(DEFAULT_SIZE);
    setupGrid(DEFAULT_SIZE);
}

// Show grid

showGrid.addEventListener('change', updateGridBorders)

// Make color stay on canvas


eraserButton.addEventListener('click', () => {
    eraserPressed = true
    rainbowModePressed = false
    currentColor = '#fff'
});

colorModeButton.addEventListener('click', () => {
    eraserPressed = false
    rainbowModePressed = false
    currentColor = colorPicker.value
});

canvas.addEventListener('mousemove', (e) => {
    if (isMouseDown){
        draw(e, currentColor)
    }
})

canvas.addEventListener('mouseleave', () => {
    isMouseDown = false;
});

canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true
    draw(e, currentColor)
})

canvas.addEventListener('mouseup', () => {
    isMouseDown = false
})

function draw(e, color){
    if (e.target.classList.contains('grid-element')) {
        if (rainbowModePressed) {
            color = getRandomHexColor();
        }
        e.target.style.backgroundColor = color
    }
}

// Change color
colorPicker.addEventListener('input', (e) => currentColor = e.target.value)

// Clear canvas
clear.addEventListener('click', function(){
    const gridElements = document.querySelectorAll('.grid-element')
    
    gridElements.forEach((gridElement) => {
        gridElement.style.backgroundColor = '#fff'
    })

    clear.classList.remove('active')
})

// Randow color
rainbowModeColorButton.addEventListener('click', () => {
    rainbowModePressed = true
    currentColor = getRandomHexColor()
})

function getRandomHexColor() {
    const randomRed = Math.floor(Math.random() * 256);
    const randomGreen = Math.floor(Math.random() * 256);
    const randomBlue = Math.floor(Math.random() * 256);

    const hexRed = randomRed.toString(16).padStart(2, '0');
    const hexGreen = randomGreen.toString(16).padStart(2, '0');
    const hexBlue = randomBlue.toString(16).padStart(2, '0');

    return `#${hexRed}${hexGreen}${hexBlue}`;
}
