/**
 * Generate a random number between 0 and 10 (randomNumber)
 * Prompt for a number between 0 and 10 (userNumber)
 * If userNumber is not a valid number ask again
 * Check userNumber
 *      - userNumber is too low, prompt for new number
 *      - userNumber is too high, prompt for new number
 *      - userNumber is correct
 *          > confirm: 'You won in [x] guesses, want to try again?'
 *              - if true: start over
 *              - if false: alert 'See you next time'
 */
function guessingGame() {
    let tryAgain = true;

    while (tryAgain) {
        let count = 0;
        let randomNumber = Math.floor(Math.random() * 11);

        let guess = NaN;

        while (guess !== randomNumber) {
            guess = parseInt(prompt('Guess a number between 0 and 10'));
            while (!(guess >= 0 && guess <= 10)) {
                guess = parseInt(
                    prompt('Invalid number, guess a number between 0 and 10'),
                );
            }

            console.log({ randomNumber, guess });

            if (guess < randomNumber) {
                alert('Too low');
            }

            if (guess > randomNumber) {
                alert('Too high');
            }

            count++;
        }

        tryAgain = confirm(`You won in ${count} guesses, try again?`);
    }

    alert('Thanks for playing');
}

function promptGuess() {
    let guess = parseInt(prompt('Guess a number between 0 and 10'));
    while (!(guess >= 0 && guess <= 10)) {
        guess = parseInt(
            prompt('Invalid number, guess a number between 0 and 10'),
        );
    }

    return guess;
}

function guessingGameTwo(alertThanks) {
    let count = 0;
    let randomNumber = Math.floor(Math.random() * 11);
    let guess = NaN;

    while (guess !== randomNumber) {
        guess = promptGuess();

        console.log({ randomNumber, guess });

        if (guess < randomNumber) {
            alert('Too low');
        }

        if (guess > randomNumber) {
            alert('Too high');
        }

        count++;
    }

    let tryAgain = confirm(`You won in ${count} guesses, try again?`);

    if (tryAgain) {
        guessingGameTwo(false);
    }

    if (alertThanks) {
        alert('Thanks for playing');
    }
}

guessingGameTwo(true);
