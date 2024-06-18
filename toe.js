const currentPlayerClass = 'X';
const otherPlayerClass = 'O';
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayerTurn = currentPlayerClass;

const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-btn');
const message = document.getElementById('message');

startGame();

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove(currentPlayerClass);
        cell.classList.remove(otherPlayerClass);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    restartButton.addEventListener('click', restartGame);
    message.textContent = "";
}

function handleClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

    if (board[cellIndex] !== '') return;

    placeMark(cell, cellIndex);
    if (checkWin(currentPlayerTurn)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, cellIndex) {
    board[cellIndex] = currentPlayerTurn;
    cell.classList.add(currentPlayerTurn);
}

function swapTurns() {
    currentPlayerTurn = currentPlayerTurn === currentPlayerClass ? otherPlayerClass : currentPlayerClass;
}

function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function isDraw() {
    return board.every(cell => cell !== '');
}

function endGame(draw) {
    if (draw) {
        message.textContent = "It's a draw!";
    } else {
        message.textContent = `${currentPlayerTurn} wins!`;
    }
    restartButton.disabled = false;
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayerTurn = currentPlayerClass;
    cells.forEach(cell => {
        cell.classList.remove(currentPlayerClass);
        cell.classList.remove(otherPlayerClass);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    message.textContent = "";
    restartButton.disabled = true;
}
