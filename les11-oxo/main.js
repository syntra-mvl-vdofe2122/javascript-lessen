//****************//
// DOM queries
//****************//

let $oxoGrid = document.querySelector('.oxo-grid');
let $curPlayer = document.getElementById('cur-player');
let $messageContainer = document.getElementById('message-container');
let $playAgainBtn = document.getElementById('play-again-btn');
let $scoreX = document.getElementById('score-x');
let $scoreO = document.getElementById('score-o');

//****************//
// State
//****************//

let turn = 'x';
let gameOver = false;
let scoreX = 0;
let scoreO = 0;
let board = [];
let scoreCount = 3;

//****************//
// Init new game
//****************//
function initBoard(size) {
    board = [];

    for (let y = 0; y < size; y++) {
        let row = [];

        for (let x = 0; x < size; x++) {
            row.push(null);
        }

        board.push(row);
    }
}

function init() {
    $playAgainBtn.classList.add('hide');
    gameOver = false;
    turn = 'x';
    initBoard(5);

    drawBoard();
    drawTurn();
}

//****************//
// Draw functions
//****************//

function drawBoard() {
    $oxoGrid.innerHTML = '';

    for (let x = 0; x < board.length; x++) {
        let curRow = board[x];

        let rowHtml = `<div class="row">`;

        for (let y = 0; y < curRow.length; y++) {
            let curCol = board[x][y];
            let colClass = '';

            if (curCol) {
                colClass = 'col--' + curCol;
            }

            let colHtml = `<div data-x="${x}" data-y="${y}" class="col ${colClass}"></div>`;

            rowHtml += colHtml;
        }

        rowHtml += `</div>`;

        $oxoGrid.insertAdjacentHTML('beforeend', rowHtml);
    }
}

function drawScores() {
    $scoreX.innerText = scoreX;
    $scoreO.innerText = scoreO;
}

function drawTurn() {
    $curPlayer.innerText = turn.toUpperCase();
}

//****************//
// Check for winners and tie
//****************//

function checkFullBoard() {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (board[x][y] === null) {
                return false;
            }
        }
    }

    return true;
}

function checkRowWinners() {
    for (let x = 0; x < board.length; x++) {
        let xCount = 0;
        let oCount = 0;
        for (let y = 0; y < board[x].length; y++) {
            if (board[x][y] === 'x') {
                xCount++;
            }

            if (board[x][y] === 'o') {
                oCount++;
            }
        }

        if (xCount === scoreCount) {
            return 'x';
        }

        if (oCount === scoreCount) {
            return 'o';
        }
    }

    return null;
}

function checkColWinners() {
    for (let y = 0; y < board[0].length; y++) {
        let xCount = 0;
        let oCount = 0;
        for (let x = 0; x < board.length; x++) {
            if (board[x][y] === 'x') {
                xCount++;
            }

            if (board[x][y] === 'o') {
                oCount++;
            }
        }

        if (xCount === scoreCount) {
            return 'x';
        }

        if (oCount === scoreCount) {
            return 'o';
        }
    }

    return null;
}

function checkDiagonalDownWinners() {
    let xCount = 0;
    let oCount = 0;

    for (let i = 0; i < board.length; i++) {
        if (board[i][i] === 'x') {
            xCount++;
        }

        if (board[i][i] === 'o') {
            oCount++;
        }
    }

    if (xCount === scoreCount) {
        return 'x';
    }

    if (oCount === scoreCount) {
        return 'o';
    }

    return null;
}

function checkDiagonalUpWinners() {
    let y = 2;

    let xCount = 0;
    let oCount = 0;

    for (let x = 0; x < board[0].length; x++) {
        console.log(`${x} - ${y}`);
        if (board[x][y] === 'x') {
            xCount++;
        }

        if (board[x][y] === 'o') {
            oCount++;
        }

        y--;
    }

    if (xCount === scoreCount) {
        return 'x';
    }

    if (oCount === scoreCount) {
        return 'o';
    }

    return null;
}

function checkWinners() {
    let rowWinners = checkRowWinners();

    if (rowWinners) {
        return rowWinners;
    }

    let colWinners = checkColWinners();
    if (colWinners) {
        return colWinners;
    }

    let diagonalDownWinners = checkDiagonalDownWinners();
    if (diagonalDownWinners) {
        return diagonalDownWinners;
    }

    let diagonalUpWinners = checkDiagonalUpWinners();
    if (diagonalUpWinners) {
        return diagonalUpWinners;
    }

    return null;
}

//****************//
// Turn
//****************//

function changeTurn() {
    if (turn === 'x') {
        turn = 'o';
    } else {
        turn = 'x';
    }
    drawTurn();
}

function gridClicked(event) {
    let $curEl = event.target;

    if (!event.target.matches('.col')) {
        return;
    }

    let curX = parseInt($curEl.dataset.x);
    let curY = parseInt($curEl.dataset.y);
    let curVal = board[curX][curY];

    if (gameOver || curVal) {
        return;
    }

    board[curX][curY] = turn;
    drawBoard();

    changeTurn();

    let winner = checkWinners();

    if (winner === 'x') {
        gameOver = true;
        $messageContainer.innerText = 'X won';
        scoreX++;
    }

    if (winner === 'o') {
        gameOver = true;
        $messageContainer.innerText = 'O won';
        scoreO++;
    }

    if (!gameOver && checkFullBoard()) {
        gameOver = true;
        $messageContainer.innerText = `Game over, it's a tie`;
    }

    if (gameOver) {
        $playAgainBtn.classList.remove('hide');
    }

    drawScores();
}

//****************//
// Event handlers
//****************//

$oxoGrid.addEventListener('click', gridClicked);
$playAgainBtn.addEventListener('click', init);

init();
