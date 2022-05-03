const randomWords = [
    'condition',
    'bottom',
    'lineage',
    'trip',
    'reporter',
    'paper',
    'colorful',
    'agent',
    'justify',
    'torture',
    'cap',
    'earthflax',
    'payment',
    'research',
    'picture',
    'garage',
    'honor',
    'memorial',
    'planet',
    'biography',
    'profound',
    'rumor',
    'gear',
    'bedroom',
    'orthodox',
    'penalty',
    'grief',
    'promote',
    'roof',
    'suite',
    'moving',
    'killer',
    'museum',
    'essay',
    'fever',
    'dignity',
    'shadow',
    'enjoy',
    'kill',
    'shy',
    'counter',
    'pawn',
    'button',
    'bullet',
    'skin',
    'rate',
    'shop',
    'consider',
    'other',
    'prospect',
];

let word = '';
let letter = '';
let stage = 1;
let gameOver;
let $letterContainer = document.getElementById('letter-container');
let $letters = document.querySelectorAll('.letter');
let $messageContainer = document.getElementById('win-lose-container');
let $imageContainer = document.getElementById('image-container');
let $image = document.getElementById('image');
let $solutionContainer = document.getElementById('solution-container');

function randomWord() {
    let randomNumber = Math.floor(Math.random() * randomWords.length);
    word = randomWords[randomNumber];
}

function init() {
    // resets GameState
    gameOver = false;

    // remove failed & success classes from letters
    for (let i = 0; i < $letters.length; i++) {
        $letters[i].classList.remove('success', 'failed');
    }

    // reset image to hangman01
    $imageContainer.innerHTML = `<img id="image" src="images/hangman01.png" alt="">`;
    stage = 1;

    // remove solution
    $solutionContainer.innerHTML = ``;

    // empty message container
    $messageContainer.innerText = 'Reset';

    // randomly select new word
    randomWord();

    // add spaces for solution below image
    let solutionHTML = `<div class="solution-letter"></div>`;
    for (let i = 0; i < word.length; i++) {
        $solutionContainer.insertAdjacentHTML('beforeend', solutionHTML);
    }
}

function addAnswer() {
    // adds the letter to the correct place in the answer
    let $solutionLetters = document.querySelectorAll('.solution-letter');
    $solutionLetters[i].innerText = letter;
}

function updateImage() {
    // replaces image src with the next stage after failed guess
    $imageContainer.innerHTML = `<img id="image" src="images/hangman0${stage}.png" alt="">`;
}

function endGameCheck() {
    let $solutionLetters = document.querySelectorAll('.solution-letter');
    let lettersGuessed = 0;

    // Loop checks how many letters the user guessed right already
    for (let i = 0; i < $solutionLetters.length; i++) {
        if ($solutionLetters[i].innerText) {
            lettersGuessed++;
        }
    }

    // If there are as many letters guessed as the word is long, the player wins
    if (lettersGuessed === $solutionLetters.length) {
        gameOver = true;
        $messageContainer.innerText = 'You won, want to play again?';
        for (let i = 0; i < word.length; i++) {
            $solutionLetters[i].classList.add('guessed');
        }
    }

    // If the hangman image reaches the last stage, the player loses
    if (
        $imageContainer.innerHTML ===
        `<img id="image" src="images/hangman09.png" alt="">`
    ) {
        gameOver = true;
        $messageContainer.innerText = `You lost, but guessed ${lettersGuessed} letters. Want to play again?`;
        for (let i = 0; i < word.length; i++) {
            if ($solutionLetters[i].innerText) {
                $solutionLetters[i].classList.add('guessed');
            } else {
                $solutionLetters[i].innerText = word[i];
                $solutionLetters[i].classList.add('not-guessed');
            }
        }
    }
}

function letterClicked(event) {
    // check if the event returns the correct letter
    $target = event.target;

    // stops the game if one of the endgame conditions has been met
    if (gameOver) {
        return;
    }

    // checks if the letter hasn't been guessed yet
    if ($target.matches('.success') || $target.matches('.failed')) {
        return;
    }

    // only continue if target is a letter and not the container
    if ($target.matches('.letter')) {
        // get letter from innerText and add to variable
        letter = $target.innerText.toLowerCase();
    } else {
        return;
    }

    // loop through solution, check if letter is correct and add to correct place
    let letterCount = 0;
    for (i = 0; i < word.length; i++) {
        if (letter === word[i]) {
            letterCount++;
            addAnswer();
        }
    }

    // if correct, add success class to letter
    if (letterCount >= 1) {
        $target.classList.add('success');
        $target.disabled = true;
    } else {
        // in incorrect, add failed class to letter, advance image to next stage
        $target.classList.add('failed');
        $target.disabled = true;
        stage++;
        updateImage();
    }

    endGameCheck();

    // if word is guessed, add win message to message container & stop user from guessing
    // after 8 wrong guesses, add loss message to message container & stop user from guessing
}

$letterContainer.addEventListener('click', letterClicked);
$messageContainer.addEventListener('click', init);

init();
