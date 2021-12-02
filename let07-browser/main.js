// DOM

// HTML file

console.log(document);
console.log(document.body);
console.log(document.head);

// childNodes / firstChild / lastChild

console.log(document.body.childNodes);
console.log(document.body.firstChild);
console.log(document.body.lastChild);

// children / firstElementChild / lastElementChild

console.log(document.body.children);
console.log(document.body.children[0]);
console.log(document.body.firstElementChild);
console.log(document.body.lastElementChild);

// parentNode / parentElement

console.log(document.body.parentNode);
console.log(document.body.parentElement);

// previousSibling / previousElementSibling
// nextSibling / nextElementSibling

console.log(document.body.previousSibling);
console.log(document.body.previousElementSibling);

console.log(document.head.nextSibling);
console.log(document.head.nextElementSibling);

// SEARCHING

console.log(document.getElementsByTagName('p'));
console.log(document.getElementsByClassName('green'));
console.log(document.getElementById('title'));

// querySelector / querySelectorAll
console.log(document.querySelector('p.green'));
console.log(document.querySelectorAll('body > *'));

// STYLE

let h1 = document.getElementById('title');

console.log(h1.style);
h1.style.backgroundColor = 'goldenrod';
h1.style.fontSize = '60px';

// timeout / interval

function doSomething() {
    console.log('timed out');
}

// setTimeout(doSomething, 4000);

// setInterval(doSomething, 2000);

// EXERCISE

function colourOddRows() {
    let table = document.querySelector('tbody');
    let rows = table.children;

    for (let i = 0; i < rows.length; i++) {
        if (i % 2 === 0) {
            rows[i].style.backgroundColor = 'lightblue';
        } else {
            rows[i].style.backgroundColor = '';
        }
    }
}

function colourEvenRows() {
    let table = document.querySelector('tbody');
    let rows = table.children;

    for (let i = 0; i < rows.length; i++) {
        if (i % 2 > 0) {
            rows[i].style.backgroundColor = 'lightblue';
        } else {
            rows[i].style.backgroundColor = '';
        }
    }
}

function delayColour() {
    setInterval(colourOddRows, 4000);
}

// setInterval(colourEvenRows, 4000);
//
// setTimeout(delayColour, 2000);

function colourOddCols() {
    let rows = document.querySelectorAll('tr');

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].children;
        for (let j = 0; j < cells.length; j++) {
            if (j % 2 === 0) {
                cells[j].style.backgroundColor = 'lightblue';
            } else {
                cells[j].style.backgroundColor = '';
            }
        }
    }
}

function colourEvenCols() {
    let rows = document.querySelectorAll('tr');

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].children;
        for (let j = 0; j < cells.length; j++) {
            if (j % 2 > 0) {
                cells[j].style.backgroundColor = 'lightblue';
            } else {
                cells[j].style.backgroundColor = '';
            }
        }
    }
}

function delayColour() {
    setInterval(colourOddCols, 4000);
}

// setInterval(colourEvenCols, 4000);
//
// setTimeout(delayColour, 2000);

// INNERHTML / INNERTEXT

console.log(h1.innerText);
console.log(h1.innerHTML);

let table = document.querySelector('table');

console.log(table.innerText);
console.log(table.innerHTML);

h1.innerText = 'Iets nieuws';

let greenP = document.querySelector('p.green');
greenP.innerHTML = 'Iets nieuws, <strong>echt nieuws</strong>';

// EXERCISE

// write a function that highlight all words longer than 8 chars

function colourLongWords() {
    // let par = document.querySelector('#latin-p');
    let par = document.getElementById('latin-p');
    let parText = par.innerText;
    console.log(parText);

    let words = parText.split(' ');
    console.log(words);

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (word.length > 8) {
            words[i] = `<span class='green'>${word}</span>`;
        }
    }

    console.log(words);

    let newParText = words.join(' ');
    console.log(newParText);

    par.innerHTML = newParText;
}

colourLongWords();
