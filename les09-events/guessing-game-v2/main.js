let $guessInput = document.getElementById('guess-input');
let $guessBtn = document.getElementById('guess-btn');
let $countContainer = document.getElementById('count-container');
let $guessContainer = document.getElementById('guess-container');
let $messageContainer = document.getElementById('message-container');
let $playAgainBtn = document.getElementById('play-again-btn');
let $maxGuesses = document.getElementById('max-guesses');

let randomNumber;
let gameOver = false;
let maxTries = 5;

function setGuessCount() {
    $countContainer.innerText = $guessContainer.children.length;
}

function init() {
    $guessContainer.innerHTML = '';
    $messageContainer.innerText = '';
    $guessInput.value = '';
    $playAgainBtn.classList.add('hide');
    $maxGuesses.innerText = maxTries;
    gameOver = false;
    setGuessCount();

    randomNumber = Math.floor(Math.random() * 11);
    console.log(randomNumber);
}

function guessBtnClicked() {
    if (gameOver) {
        return;
    }

    let curValue = parseInt($guessInput.value);

    if (!(curValue >= 0 && curValue <= 10)) {
        $messageContainer.innerText =
            'Incorrect guess, the number has to be between 0 and 10';

        return;
    }

    $messageContainer.innerText = '';

    let guessHtml = `<p class="guess">${curValue}</p>`;
    $guessContainer.insertAdjacentHTML('beforeend', guessHtml);
    setGuessCount();

    if (randomNumber === curValue) {
        $messageContainer.innerText = 'You won, play again?';
        gameOver = true;
        $playAgainBtn.classList.remove('hide');
    }

    if (curValue < randomNumber) {
        $messageContainer.innerText = 'Too low, guess again';
    }

    if (curValue > randomNumber) {
        $messageContainer.innerText = 'Too high, guess again';
    }

    if ($guessContainer.children.length === maxTries && !gameOver) {
        $messageContainer.innerText = `You guessed ${maxTries} times, the correct number was ${randomNumber}. Play again?`;
        gameOver = true;
        $playAgainBtn.classList.remove('hide');
    }

    $guessInput.value = '';
}

$guessBtn.addEventListener('click', guessBtnClicked);
$playAgainBtn.addEventListener('click', init);

init();
