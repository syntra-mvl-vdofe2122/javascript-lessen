/**
 * Prompt for rock, paper of scissors
 * Check if valid input
 *      > if not ask again
 * Convert input to number > rock = 1, paper = 2, scissors = 3
 * Generate random number between 1 and 3
 * Check if tie
 *      > confirm 'It was a tie, try again?'
 *          > if true > start over
 *          > if false alert score
 * Determine winner
 *      > player = 1 - AI = 2 > AI wins
 *      > player = 1 - AI = 3 > Player wins
 *      > player = 2 - AI = 1 > Player wins
 *      > player = 2 - AI = 3 > AI wins
 *      > player = 3 - AI = 1 > AI wins
 *      > player = 3 - AI = 2 > Player wins
 *          > confirm '[winner] won, try again'
 *              > if true > start over
 *              > if false alert score
 */
function rockPaperScissors() {
    let aiChoice = Math.floor(Math.random() * 3);
    let aiScore = 0;
    let playerChoice = '';
    let playerChoiceNum = NaN;
    let playerScore = 0;

    do {
        do {
            if (playerChoiceNum === aiChoice) {
                playerChoice = prompt(
                    `It's a tie. Choose rock, paper or scissors?`,
                ).toLowerCase();
            } else {
                playerChoice = prompt(
                    'Choose rock, paper or scissors?',
                ).toLowerCase();
            }

            while (
                playerChoice !== 'rock' &&
                playerChoice !== 'paper' &&
                playerChoice !== 'scissors'
            ) {
                playerChoice = prompt(
                    'That is not an option choose rock, paper or scissors?',
                ).toLowerCase();
            }

            playerChoiceNum = rpsStringToNum(playerChoice);
        } while (playerChoiceNum === aiChoice);

        if (
            (playerChoiceNum === 0 && aiChoice === 1) ||
            (playerChoiceNum === 1 && aiChoice === 2) ||
            (playerChoiceNum === 2 && aiChoice === 0)
        ) {
            aiScore++;
            alert(`The AI chose ${rpsNumToString(
                aiChoice,
            )}, you chose ${rpsNumToString(playerChoiceNum)}: YOU LOSE!
        The current score is: AI ${aiScore} | Player ${playerScore}`);
        } else {
            playerScore++;
            alert(`The AI chose ${rpsNumToString(
                aiChoice,
            )}, you chose ${rpsNumToString(playerChoiceNum)}: YOU WIN!
        The current score is: AI ${aiScore} | Player ${playerScore}`);
        }
    } while (confirm('Play again?'));
}

function rpsStringToNum(rpsString) {
    switch (rpsString) {
        case 'rock':
            return 0;
        case 'paper':
            return 1;
        case 'scissors':
            return 2;
    }
}

function rpsNumToString(rpsNum) {
    switch (rpsNum) {
        case 0:
            return 'Rock';
        case 1:
            return 'Paper';
        case 2:
            return 'Scissors';
    }
}

rockPaperScissors();
