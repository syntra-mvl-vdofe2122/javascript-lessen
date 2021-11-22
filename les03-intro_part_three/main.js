// LOOPS

for (let i = 0; i < 10; i++) {
    console.log(i);
}

for (let i = 'a'; i !== 'aaaa'; i += 'a') {
    console.log(i);
}

let i = 0;

while (i < 10) {
    console.log(i);
    i++;
}

let j = 0;
do {
    console.log(j);
    j++;
} while (j < 10);

/**
 * Return the sum of all numbers until n
 * if n = 5 > 1 + 2 + 3 + 4 + 5 > 15
 * @param n
 * @return {number}
 */
function sum(n) {
    let total = 0;

    for (let i = 1; i <= n; i++) {
        console.log(i);

        total += i;
    }

    return total;
}

console.log(sum(5)); // > 15
console.log(sum(2)); // > 3

/**
 * Count all the words in a string
 * @param {string} text
 * @return {number}
 */
function countWords(text) {
    let count = 1;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let prevChar = text[i - 1];

        if (
            char === ' ' &&
            prevChar !== ' ' &&
            i !== 0 &&
            i !== text.length - 1
        ) {
            count++;
        }
    }

    return count;
}
console.log('COUNTWORDS');

console.log(
    countWords('Decorate each side of the garlic with one jar of shrimps.'),
); // > 11
console.log(
    countWords('Decorate  each side    of the garlic with one jar of shrimps.'),
); // > 11
console.log(
    countWords(' Decorate each side of the garlic with one   jar of shrimps. '),
); // > 11

/**
 * Return a string with the first letter from each word
 * @param {string} text
 * @return {string}
 */
function firstLetters(text) {
    let firstLetterString = '';

    if (text[0] !== ' ') {
        firstLetterString += text[0];
    }

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let prevChar = text[i - 1];

        if (prevChar === ' ' && char !== ' ') {
            firstLetterString += char;
        }
    }

    return firstLetterString;
}

console.log(
    firstLetters('Decorate each side of the garlic with one jar of shrimps.'),
); // > 'Desotgwojos'
console.log(
    firstLetters(
        'Decorate  each side    of the garlic with one jar of shrimps.',
    ),
); // > 'Desotgwojos'
console.log(
    firstLetters(
        ' Decorate each side of the garlic with one   jar of shrimps. ',
    ),
); // > 'Desotgwojos'

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
function guessingGame() {}

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
function rockPaperScissors() {}
