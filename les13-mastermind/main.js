let $solutionContainer = document.getElementById('solution-container');
let $triesContainer = document.getElementById('tries-container');
let $tryInputContainer = document.getElementById('try-input-container');
let $trySubmitBtn = document.getElementById('try-submit-btn');
let $winnerMessageContainer = document.getElementById(
    'winner-message-container',
);
let $winnerSubmitBtn = document.getElementById('winner-submit-btn');

let gameSettings = {
    minNum: 0,
    maxNum: 4,
    numCount: 6,
    maxTries: 5,
};

let gameState = {
    solution: null,
    guessCount: 0,
    won: false,
    lost: false,
};

/**
 * Generates an array with numCount random numbers between minNum and maxNum
 * @return {Number[]}
 */
function generateSolution() {
    let newSolution = [];

    for (let i = 0; i < gameSettings.numCount; i++) {
        let randomNum =
            Math.floor(
                Math.random() * (gameSettings.maxNum + 1 - gameSettings.minNum),
            ) + gameSettings.minNum;

        newSolution.push(randomNum);
    }

    return newSolution;
}

/**
 * Get values from all '.try-input' elements
 * @return {Number[] | false}
 */
function getGuess() {
    let guess = [];

    for (let i = 0; i < $tryInputContainer.children.length; i++) {
        let value = parseInt($tryInputContainer.children[i].value);
        guess.push(value);

        if (!(value >= gameSettings.minNum && value <= gameSettings.maxNum)) {
            return false;
        }
    }

    return guess;
}

/**
 * Counts correct numbers in guess
 * @param {Number[]} curGuess
 * @return {Number}
 */
function countCorrectNumAndPlace(curGuess) {
    return curGuess.reduce(function (prevVal, element, index) {
        if (element === gameState.solution[index]) {
            prevVal++;
        }

        return prevVal;
    }, 0);
}

/**
 *
 * @return {Number[]}
 */
function copySolution() {
    // return gameState.solution; > geen copy, by reference

    // let newSolution = [];
    //
    // for (let i = 0; i < gameState.solution.length; i++) {
    //     newSolution.push(gameState.solution[i]);
    // }
    //
    // return newSolution;

    return [...gameState.solution];

    // ...[1,2,3,4,5] > 1,2,3,4,5 > [   1,2,3,4,5  ]
    // Math.max(...[1,2,3,4,5]) > Math.max(1,2,3,4,5)

    // return JSON.parse(JSON.stringify(gameState.solution));

    // JSON.parse('[1,2,3,4,5]') > [1,2,3,4,5]
    // [1,2,3,4,5] > '[1,2,3,4,5]' > [1,2,3,4,5]
}

/**
 Counts numbers in guess which are found in solution
 @param {Number[]} curGuess
 @return {Number}
 */
function countCorrectNum(curGuess) {
    let solutionCopy = copySolution();

    return curGuess.reduce(function (prevVal, element) {
        let indexFound = solutionCopy.indexOf(element);

        if (indexFound > -1) {
            prevVal++;
            solutionCopy.splice(indexFound, 1);
        }

        return prevVal;
    }, 0);
}

/**
 *
 */
function drawFirstLoad() {
    $solutionContainer.innerHTML = '';
    $tryInputContainer.innerHTML = '';
    let solutionOptionHTML = '';
    let inputHTML = '';

    for (let i = 0; i < gameSettings.numCount; i++) {
        solutionOptionHTML += `<div class="solution-option">1</div>`;
        inputHTML += `<input
                        class="try-input"
                        type="number"
                        min="0"
                        max="4"
                        step="1"
                    />`;
    }

    $solutionContainer.insertAdjacentHTML('beforeend', solutionOptionHTML);
    $tryInputContainer.insertAdjacentHTML('beforeend', inputHTML);
}

/**
 * Empty $triesContainer
 * Add class 'hidden' to $solutionContainer
 * Add class 'dont-show' to $winnerMessageContainer
 */
function drawEmptyGame() {
    $triesContainer.innerHTML = '';
    $solutionContainer.classList.add('hidden');
    $winnerMessageContainer.classList.add('dont-show');
    $trySubmitBtn.disabled = false;

    for (let i = 0; i < $tryInputContainer.children.length; i++) {
        $tryInputContainer.children[i].value = '';
    }
}

/**
 * Writes solution in '.try-option' elements
 */
function drawSolution() {
    for (let i = 0; i < gameState.solution.length; i++) {
        console.log($solutionContainer.children[i]);
        $solutionContainer.children[i].innerText = gameState.solution[i];
    }
}

/**
 * Writes try div in $triesContainer
 * @param {Number[]} guess
 * @param {Number} correctNumAndPlace
 * @param {Number} correctNum
 */
function drawTry(guess, correctNumAndPlace, correctNum) {
    let html = `<div class="try">
                    <div class="try-option-container">`;

    for (let i = 0; i < guess.length; i++) {
        html += `<div class="try-option">${guess[i]}</div>`;
    }

    html += `       </div>
                    <p>Juiste nummer: <span class="correct-color">${correctNum}</span></p>
                    <p>
                        Juiste nummer op de juiste plaats:
                        <span class="correct-place">${correctNumAndPlace}</span>
                    </p>
                </div>`;

    $triesContainer.insertAdjacentHTML('beforeend', html);
}

function drawGameOver() {
    if (gameState.won || gameState.lost) {
        $solutionContainer.classList.remove('hidden');
        $winnerMessageContainer.classList.remove('dont-show');
        $trySubmitBtn.disabled = true;

        if (gameState.won) {
            $winnerSubmitBtn.innerText = 'You won, try again?';
        } else {
            $winnerSubmitBtn.innerText = 'You lost, try again?';
        }
    }
}

function init(firstLoad) {
    gameState.solution = generateSolution();

    if (firstLoad === true) {
        drawFirstLoad();
    }

    drawEmptyGame();
    drawSolution();

    console.log(gameState);
}

function tryBtnClicked() {
    let guess = getGuess();
    let correctNumAndPlace = countCorrectNumAndPlace(guess);
    let correctNum = countCorrectNum(guess) - correctNumAndPlace;

    if (!guess) {
        $trySubmitBtn.innerText = 'Invalid guess, try again.';
        return;
    }

    gameState.guessCount++;

    if (correctNumAndPlace === gameSettings.numCount) {
        gameState.won = true;
    } else if (gameState.guessCount === gameSettings.maxTries) {
        gameState.lost = true;
    }

    drawTry(guess, correctNumAndPlace, correctNum);
    drawGameOver();
}

$trySubmitBtn.addEventListener('click', tryBtnClicked);
$winnerSubmitBtn.addEventListener('click', init);

init(true);
