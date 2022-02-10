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
    numCount: 5,
    maxTries: 5,
};

let gameState = {
    solution: null,
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
    // loop over curGuess
    return 2;
}

/**
 Counts numbers in guess which are found in solution
 @param {Number[]} curGuess
 @return {Number}
 */
function countCorrectNum(curGuess) {
    // copy solution
    // 1,1,2,0,4
    // 2,2,2,,3,3

    return 3;
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

function init() {
    gameState.solution = generateSolution();

    drawEmptyGame();
    drawSolution();

    console.log(gameState);
}

function tryBtnClicked() {
    let guess = getGuess();
    let correctNumAndPlace = countCorrectNumAndPlace(guess);
    let correctNum = countCorrectNum(guess);

    if (!guess) {
        $trySubmitBtn.innerText = 'Invalid guess, try again.';
        return;
    }

    drawTry(guess, correctNumAndPlace, correctNum);
}

$trySubmitBtn.addEventListener('click', tryBtnClicked);
$winnerSubmitBtn.addEventListener('click', init);

init();
