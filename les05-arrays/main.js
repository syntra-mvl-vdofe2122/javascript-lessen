// ARRAYS

// Declaration
let anArray = [];
let otherArray = new Array();

anArray = ['test', 5, 6];
otherArray = new Array('test', 5, 6);

// get value

anArray[0];

// set value

anArray[1] = 3;

// length

console.log(anArray.length);

anArray[12] = 5;

console.log(anArray.length);
console.log(anArray[11]);

// any value

anArray[10] = function () {
    console.log('test');
};

console.log(anArray);
anArray[10]();

// METHODS
let someArray = [9, 8, 7, 6, 5];
console.log(someArray);

// .pop() / .push()

someArray.pop();
console.log(someArray);

someArray.push(8);
console.log(someArray);

// .shift() / .unshift()

someArray.shift();
console.log(someArray);

someArray.unshift(11);
console.log(someArray);

// .join() / .split()

console.log(someArray.join());
console.log(someArray.join(' | '));

let aString =
    'Devastation at the radiation dome was the future of mankind, transformed to a united klingon.';

console.log(aString.split(' '));
console.log(aString.split(' the '));

// .slice() / .splice()

console.log(someArray.slice(2, 4));
console.log(someArray.slice(1));

let spliceArray = [3, 4, 5, 6, 3, 8, 5, 9, 12, 0];
console.log(spliceArray);

console.log(spliceArray.splice(2, 3));
console.log(spliceArray);

spliceArray.splice(4, 1, 22, 5, 20, 5);
console.log(spliceArray);

spliceArray.splice(2, 0, 5);
console.log(spliceArray);

// .concat()

let arrOne = [1, 2, 3];
let arrTwo = [4, 5, 6];

console.log(arrOne.concat(arrTwo));

// .indexOf() / .lastIndexOf() / .includes()

console.log(spliceArray);
console.log(spliceArray.indexOf(5));

console.log(spliceArray.lastIndexOf(5));

console.log(spliceArray.indexOf(111));

console.log(spliceArray.includes(111));
console.log(spliceArray.includes(5));

// .reverse()

spliceArray.reverse();
console.log(spliceArray);

// passed by reference

let newArray = [5, 5];
let newNewArray = newArray.slice();
let newNewNewArray = newArray;

// newNewArray.push(6);
console.log(newNewArray);
console.log(newArray);

console.log(newNewArray === newArray);
console.log(newNewNewArray === newArray);

// object

console.log(typeof newArray);
console.log(Array.isArray(newArray));
