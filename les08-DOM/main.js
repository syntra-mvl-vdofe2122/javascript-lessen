// Herhaling

console.log(document.body);
console.log(document.head);

console.log(document.body.childNodes);
console.log(document.body.children);

let parOne = document.getElementById('par-one');

console.log(parOne.nextElementSibling);

console.log(document.getElementsByTagName('li'));

console.log(document.querySelectorAll('li'));

parOne.style.backgroundColor = 'green'; // background-color
console.log(parOne.innerText);

parOne.innerHTML =
    'The mast hoists with grace, <span>burn</span> the fortress before it rises.';

function bgColorLi() {
    let body = document.body;
    let div = body.children[1];
    console.log(div);
    let ul = div.lastElementChild;
    console.log(ul);
    let li = ul.children;
    console.log(li);

    // let liTwo = document.body.children[1].lastElementChild.children;

    for (let i = 0; i < li.length; i++) {
        if (i % 2 === 0) {
            li[i].style.backgroundColor = 'goldenrod';
        } else {
            li[i].style.backgroundColor = 'darkblue';
        }
    }
}

bgColorLi();

// Attributes

let input = document.getElementById('input');

console.log(input.type);
console.log(input.id);
input.required = true;

console.log(input.hasAttribute('Id'));
console.log(input.getAttribute('type'));
// input.setAttribute('type', 'password');
input.removeAttribute('id');
let maxVal = input.getAttribute('max');
console.log(maxVal);
console.log(typeof maxVal);

// classList

let ul = document.querySelector('.test');

ul.classList.add('new');
ul.classList.remove('other');
ul.classList.replace('test', 'new-test');
ul.classList.toggle('more');
ul.classList.toggle('more');
console.log(ul.className);

// Creating elements

let newButton = document.createElement('button');
newButton.innerText = 'Click me';
newButton.classList.add('blue-btn');

console.log(newButton);

// insert methods

document.body.append(newButton);
// document.body.prepend(newButton);

// ul.before(newButton);
// ul.after(newButton);

// ul.replaceWith(newButton);

ul.insertAdjacentHTML('beforeend', '<li>Korneel</li>');

// remove

input.remove();
