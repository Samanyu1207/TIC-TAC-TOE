// Constants
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY_CELL = '';

// Variables
let currentPlayer = PLAYER_X;
let gameBoard = Array(9).fill(EMPTY_CELL);

// DOM Elements
const gameBoardElement = document.getElementById('game-board');
const restartButton = document.getElementById('restart-btn');

// Functions
// function renderGameBoard() {
//     gameBoardElement.innerHTML = '';
//     gameBoard.forEach((cell, index) => {
//         const cellElement = document.createElement('div');
//         cellElement.classList.add('border', 'border-gray-400', 'h-16', 'flex', 'items-center', 'justify-center', 'text-4xl');
//         cellElement.textContent = cell || ' ';
//         cellElement.addEventListener('click', () => cellClicked(index));
//         gameBoardElement.appendChild(cellElement);
//     });
// }
function renderGameBoard() {
    gameBoardElement.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('border', 'border-gray-400', 'h-16', 'flex', 'items-center', 'justify-center', 'text-4xl');
        if (cell === PLAYER_X) {
            cellElement.textContent = 'X';
            cellElement.style.color = 'blue'; // Change X color to blue
        } else if (cell === PLAYER_O) {
            cellElement.textContent = 'O';
            cellElement.style.color = 'red'; // Change O color to red
        } else {
            cellElement.textContent = ' ';
        }
        cellElement.addEventListener('click', () => cellClicked(index));
        gameBoardElement.appendChild(cellElement);
    });
}

let  msg = document.querySelector("#q");

function cellClicked(index) {
    if (gameBoard[index] === EMPTY_CELL) {
        gameBoard[index] = currentPlayer;
        renderGameBoard();
        if (checkWin(currentPlayer)) {
            // alert(`${currentPlayer} wins!`);
            msg.innerHTML = `${currentPlayer} wins!`;
            setTimeout(function () {
                resetGame();
              }, 2000); // Delay before rendering board again (adjust as needed)
        } else if (isBoardFull()) {
            msg.innerHTML = `its a Draw !`;
            setTimeout(function () {
                resetGame();
              }, 2000); // Delay before rendering board again (adjust as needed)
        } else {
            currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        }
    }
}

function checkWin(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    return winConditions.some((condition) => {
        return condition.every((index) => gameBoard[index] === player);
    });
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== EMPTY_CELL);
}

function resetGame() {
    currentPlayer = PLAYER_X;
    gameBoard = Array(9).fill(EMPTY_CELL);
    msg.innerHTML = `Tic Tac Toe`;
    renderGameBoard();
}

// Event Listeners
restartButton.addEventListener('click', resetGame);

// Initial rendering
renderGameBoard();
