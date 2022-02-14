// Array methods

// forEach

let anArray = [1, 2, 3, 4, 5];

function logElement(element, index, array) {
    console.log({ element, index, array });
}

anArray.forEach(logElement);

anArray.forEach(function (element, index, array) {
    console.log({ element, index, array });
});

function aFunc(element) {
    return 'test';
}

let aFuncTwo = function (element) {
    return 'test';
};

let arrowFunc = (element) => {
    return 'test';
};

let arrowFuncTwo = (element) => 'test';

anArray.forEach((element, index, array) => {
    console.log({ element, index, array });
});

Array.prototype.myForEach = function (cbFun) {
    console.log(this);

    for (let i = 0; i < this.length; i++) {
        cbFun(this[i], i, this);
    }
};

anArray.forEach(logElement);
anArray.myForEach(logElement);

let objArray = [
    { name: 'Hilco', age: 22 },
    { name: 'Margot', age: 26 },
    { name: 'Korneel', age: 30 },
];

let nameArray = objArray.map(function (element) {
    return element.name;
});

let nameArrayThree = objArray.map((element) => element.name);

let nameArrayTwo = [];

for (let i = 0; i < objArray.length; i++) {
    nameArrayTwo.push(objArray[i].name);
}

console.log({ nameArray, nameArrayTwo, nameArrayThree });

Array.prototype.myMap = function (cbFun) {
    let mappedArray = [];

    for (let i = 0; i < this.length; i++) {
        mappedArray.push(cbFun(this[i], i, this));
    }

    return mappedArray;
};

function double(element) {
    return element * 2;
}

let doubleArray = anArray.map(double);
let doubleArrayTwo = anArray.myMap(double);
console.log({ doubleArray, doubleArrayTwo });

// filter

function onlyOdd(element, index, array) {
    return element % 2 > 0; // oneven > true | even > false
}

Array.prototype.myFilter = function (cbFun) {
    let filteredArray = [];

    for (let i = 0; i < this.length; i++) {
        let cbReturn = cbFun(this[i], i, this);

        if (cbReturn) {
            filteredArray.push(this[i]);
        }
    }

    return filteredArray;
};

let oddArray = anArray.filter(onlyOdd);
let oddArrayTwo = anArray.myFilter(onlyOdd);

console.log({ oddArray, oddArrayTwo });

// reduce

// [1,2,3,4,5] > 0 + 1 + 2 + 3 + 4 + 5 > 15

function sum(prevVal, element, index, array) {
    console.log({ prevVal, element });

    return prevVal + element;
}

Array.prototype.myReduce = function (cbFun, initialVal) {
    let prevVal;
    let firstIndex;

    if (initialVal === undefined) {
        prevVal = this[0];
        firstIndex = 1;
    } else {
        prevVal = initialVal;
        firstIndex = 0;
    }

    for (let i = firstIndex; i < this.length; i++) {
        prevVal = cbFun(prevVal, this[i], i, this);
    }

    return prevVal;
};

let sumResult = anArray.reduce(sum);
let sumResultTwo = anArray.myReduce(sum);
console.log({ sumResult, sumResultTwo });
