function logNumbers(numOne, numTwo) {
    console.log(`Number one: ${numOne}`);
    console.log(`Number two: ${numTwo}`);
}

function sumNumber(numOne, numTwo) {
    console.log(numOne + numTwo);
}

logNumbers(1, 2);
logNumbers(3, 5);

function doFunctionWithOneAndTwo(callback) {
    callback(1, 2);
}

doFunctionWithOneAndTwo(logNumbers);
doFunctionWithOneAndTwo(sumNumber);

let btn = document.getElementById('btn');

console.log(btn);

function btnClicked() {
    console.log('Btn was clicked');
}

btn.addEventListener('click', btnClicked);


