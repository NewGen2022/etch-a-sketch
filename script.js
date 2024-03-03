// gives clicked button "active" styles button
document.addEventListener('DOMContentLoaded', function () {
    let buttons = document.querySelectorAll('#choose-buttons button');

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            buttons.forEach(function(btn) {
                btn.classList.remove('active');
            });

            button.classList.add('active');
        });
    });
});


const DEFAULT_SIZE = 16;
let currentSize = DEFAULT_SIZE;

const gridChangeSlider = document.getElementById('grid-change');
const canvas = document.getElementById('canvas');

gridChangeSlider.addEventListener('input', (e) => changeSize(Number(e.target.value))); // Convert the value to a number

function changeSize(value) {
    currentSize = value;

    updateSizeLabel(value);
    reloadGrid();
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

// show grid
const showGrid = document.getElementById('show-grid')

showGrid.addEventListener('change', updateGridBorders);
