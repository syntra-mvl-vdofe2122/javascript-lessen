// HERHALING
let aString = 'aanhalingstekens';
aString.length;
let firstLetter = aString[0]; // first character
let aSubstring = aString.substring(5, 10); // > lings;
let anotherSubstring = aString.substring(10); // > tekens
let concatString = aString + aSubstring; // > aanhalingstekenslings
let aTemplateLiteral = `test 123 ${aSubstring}`; // > test 123 lings

function aFunction(aParam) {
    let aParamPlus = aParam + 1;
    return aParamPlus;
}

// alert('A message');
// prompt('A message');

// CONDITIONS

let varOne = '1';
let varTwo = 1;

console.log(varOne == varTwo); // true
console.log(varOne === varTwo); // false

console.log(varOne != varTwo); // false
console.log(varOne !== varTwo); // true

let varThree = 5;
let varFour = 10;

console.log(varThree < varFour); // true
console.log(varThree > varFour); // false
console.log(varThree <= varFour); // true
console.log(varThree >= varFour); // false

let varFive = '12';
let varSix = 8;

console.log(varFive > varSix);

if (varFive > varSix) {
    console.log('het is groter');
} else if (varFive == varSix) {
    console.log('het is gelijk');
} else if (varFive === varSix) {
    console.log('het is gelijk en hetzelfde type');
} else {
    console.log('het is niet groter');
}

// OEFENINGEN CONDITIONS

function ellipses(text, length) {
    if (text.length <= length) {
        return text;
    } else {
        let subString = text.substring(0, length);
        return subString + '...';
        // return text.substring(0,length) + '...';
    }
}

console.log(ellipses('een lange string', 10));
console.log(ellipses('kort', 10));

// input: name (string)
// output:  true if name longer then 6 char
//          false if name shorter then 7 char
function longName(name) {
    if (name.length >= 7) {
        return true;
    } else {
        return false;
    }

    // return name.length >= 7;
}

console.log(longName('Korneel'));
console.log(longName('Tom'));

// ask for name
// if name is longer then 6 char > alert Hello [name]
// if name is shorter > alert Sorry, I only say hello to long names
function onlyLongNameHello() {
    let name = prompt('What is your name?');
    if (name.length >= 7) {
        alert('Hello ' + name);
    } else {
        alert('Sorry, I only say hello to long names');
    }
}

// onlyLongNameHello();

// input: word (string)
// output:  true if word is capitalized
//          false if not
function capitalized(word) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

function isCapitalized(word) {
    if (word === capitalized(word)) {
        return true;
    } else {
        return false;
    }

    // return word === capitalized(word);
}

// NUMBERS

let aNumber = 12;
let anotherNumber = 12.6;

let sumOfNumbers = 12 + 12;
let productOfNumbers = 12 * 12;
let divisionOfNumbers = 12 / 12;
let protractOfNumbers = 12 - 12;
let moduloOfNumbers = 12 % 12;

let aNumberString = aNumber.toString(10);
// 12 + '';
console.log(aNumberString);
let aSpecialString = '122';
let aStringNumber = parseInt(aSpecialString);
console.log(aStringNumber);

let anotherSpecialString = '12.22';
let aStringFloat = parseFloat(anotherSpecialString);

let someString = 'test';
let someStringToInt = parseInt(someString);
console.log(someStringToInt);

console.log(someStringToInt === NaN);
console.log(Number.isNaN(someStringToInt));

console.log(Infinity);
console.log(-Infinity);
console.log(Infinity === Infinity);

aNumber += 1;
// aNumber = aNumber + 1;
console.log(aNumber);

aNumber -= 2;
console.log(aNumber);

aNumber %= 5;
console.log(aNumber);

aNumber++;
console.log(aNumber);

aNumber--;
console.log(aNumber);

console.log(Math.floor(Math.random() * 11));

// OEFENINGEN

// input aNumber (Number)
// output   'odd' if odd number
//          'even' if even number
function oddOrEven(aNumber) {
    if (aNumber % 2 === 0) {
        return 'even';
    } else {
        return 'odd';
    }
}

// input aNumber (Number), diviser (Number)
// output   true if aNumber is divisible by diviser
//          otherwise false
function isDivisible(aNumber, diviser) {
    return aNumber % diviser === 0;
}

/**
 * Calculate Square
 * @param {number} aNumber
 * @return {number} Square of aNumber
 */
function square(aNumber) {
    return aNumber * aNumber;
}

/**
 * Return lowest number
 * @param {number} numberOne
 * @param {number} numberTwo
 * @return {number} Lowest number
 */
function min(numberOne, numberTwo) {
    v;

    // if (numberOne < numberTwo) {
    //     return numberOne;
    // }
    //
    // return numberTwo;
}

/**
 * Return highest number
 * @param {number} numberOne
 * @param {number} numberTwo
 * @return {number} Highest number
 */
function max(numberOne, numberTwo) {
    if (numberOne > numberTwo) {
        return numberOne;
    } else {
        return numberTwo;
    }

    // Math.max(numberOne, numberTwo);
}

/**
 * Calculate according to input:
 * @param {string} op Operation, possible values: 'plus', 'min', 'divide', 'multiply'
 * @param {number} numberOne
 * @param {number} numberTwo
 * @return {number} Result of operation
 */
function calculate(op, numberOne, numberTwo) {
    if (op === 'plus') {
        return numberOne + numberTwo;
    }

    if (op === 'min') {
        return numberOne - numberTwo;
    }

    if (op === 'divide') {
        return numberOne / numberTwo;
    }

    if (op === 'multiply') {
        return numberOne * numberTwo;
    }

    console.error(
        op +
            " is not a valid operation, choose: 'plus', 'min', 'divide', 'multiply'",
    );
    return numberOne;

    // switch (op) {
    //     case 'plus':
    //         return numberOne + numberTwo;
    //     case 'min':
    //         return numberOne - numberTwo;
    //     case 'divide':
    //         return numberOne / numberTwo;
    //     case 'multiply':
    //         return numberOne * numberTwo;
    //     default:
    //         console.error(
    //           op +
    //           " is not a valid operation, choose: 'plus', 'min', 'divide', 'multiply'",
    //         );
    //         return numberOne;
    // }
}

calculate('Plus', 2, 3);

/**
 * Guessing game:
 * Generate random number between 0 and 10
 * Prompt user for a number between 0 and 10
 * If user guesses correct: alert 'You won'
 * If user guess is to low: alert 'Too low'
 * If user guess is to high: alert 'Too high'
 */
function guess() {
    let randomNumber = Math.floor(Math.random() * 11);
    console.log(randomNumber);

    let userNumber = parseInt(prompt('Guess a number between 0 and 10'));

    if (userNumber === randomNumber) {
        alert('You won');
    } else if (userNumber < randomNumber) {
        alert('Too low');
    } else if (userNumber > randomNumber) {
        alert('Too high');
    }
}

guess();
