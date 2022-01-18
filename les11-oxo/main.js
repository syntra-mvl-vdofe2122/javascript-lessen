let $oxoGrid = document.querySelector('.oxo-grid');
let $curPlayer = document.getElementById('cur-player');
let $messageContainer = document.getElementById('message-container');

let turn = 'x';
let gameOver = false;
let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

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

function changeTurn() {
    if (turn === 'x') {
        turn = 'o';
    } else {
        turn = 'x';
    }

    $curPlayer.innerText = turn.toUpperCase();
}

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

function checkWinners() {
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

        if (xCount === board.length) {
            return 'x';
        }

        if (oCount === board.length) {
            return 'o';
        }
    }

    return null;
}

function init() {
    drawBoard();
}

function gridClicked(event) {
    let $curEl = event.target;
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
    }

    if (winner === 'o') {
        gameOver = true;
        $messageContainer.innerText = 'O won';
    }

    if (!gameOver && checkFullBoard()) {
        gameOver = true;
        $messageContainer.innerText = `Game over, it's a tie`;
    }
}

$oxoGrid.addEventListener('click', gridClicked);

init();
