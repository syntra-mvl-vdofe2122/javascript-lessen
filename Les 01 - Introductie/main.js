// naming > camelCase
// const > SCREAMING_CASE

console.log('hello world');

// let name = 'Korneel';
// const lastName = 'Eeckhout';

const person = {
    name: 'Korneel',
    lastName: 'Eeckhout',
    age: 30,
    testMethod() {
        return 'test';
    },
};

person.age = 31; // wel mogelijk bij constante

console.log(person);

function doBirthDay(personPar) {
    personPar.age += 1;

    return personPar;
}

doBirthDay(person);

console.log(person);

// alert('Ik ben een alert');

// let yourName = prompt('Wat is je naam?');

// console.log(yourName);

let aString = 'Lorem ipsum';

// String.prototype.length;

console.log(aString.length);

function makeUpperCase(someString) {
    return someString.toUpperCase();
}

console.log(makeUpperCase('Javascript is cool'));

function makeLowerCase(someString) {
    return someString.toLowerCase();
}

console.log(aString[2]);

console.log(aString.substring(6));

console.log(aString.substring(1, 5));

function fullName(firstName, lastName) {
    return firstName + ' ' + lastName;
}

console.log(fullName('Tom', 'Herremans'));

let fullNameTom = fullName('Tom', 'Herremans');
console.log(fullNameTom);

let tomsFirstName = 'Tom';

// tomsFirstName = tomsFirstName + ' Marie';
tomsFirstName += ' Marie';

console.log(tomsFirstName);

function helloName(name) {
    return `Hello ${name}`;
}

console.log(helloName('Margot'));

function capitalize(word) {
    let firstLetter = word[0];
    let firstLetterCapital = firstLetter.toUpperCase();
    let rest = word.substring(1);
    let restLower = rest.toLowerCase();
    let capitalizedWord = firstLetterCapital + restLower;

    return capitalizedWord;

    // return word[0].toUpperCase() + word.substring(1).toLowerCase;
}

capitalize('kORNEEL');

function helloNamePrompt() {
    let yourName = prompt('Wat is je naam?');
    let capitalizedYourName = capitalize(yourName);

    alert(`Hello ${capitalizedYourName}`);
}

function helloFullNamePrompt() {
    let yourFirstName = prompt('Wat is je voornaam?');
    let capitalizedYourFirstName = capitalize(yourFirstName);
    let yourLastName = prompt('Wat is je achternaam?');
    let capitalizedYourLastName = capitalize(yourLastName);

    alert(`Hello ${capitalizedYourFirstName} ${capitalizedYourLastName}`);
}

// 'hier staat iets langs' > 'hier staat...'
function shorterText(text) {
    let shortText = text.substring(0, 10);

    return shortText + '...';
}

// boom > mboo
function lastFirst(text) {
    let lastLetter = text[text.length - 1];
    let otherLetters = text.substring(0, text.length - 1);

    return lastLetter + otherLetters;
}

// boom > oomb
function firstLast(text) {
    let firstLetter = text[0];
    let otherLetters = text.substring(1);

    return otherLetters + firstLetter;
}

// boom > moob
function firstLastFirst(text) {
    let firstLetter = text[0];
    let lastLetter = text[text.length - 1];
    let otherLetters = text.substring(1, text.length - 1);

    return lastLetter + otherLetters + firstLetter;
}
