// Promises

let $btn = document.getElementById('btn');
let $btnTwo = document.getElementById('btn-two');

let promise = new Promise(function (resolve, reject) {
    $btn.addEventListener('click', resolve);
    $btnTwo.addEventListener('click', reject);
});

function wait(returnVal, ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(returnVal);
        }, ms);
    });
}

function rejectWait(error, ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(error);
        }, ms);
    });
}

promise
    .then(function (result) {
        console.log('resolved');
        console.log(result);

        let $newBtn = document.createElement('button');
        $newBtn.innerText = 'Click me 2';

        let $newNotBtn = document.createElement('button');
        $newNotBtn.innerText = "Don't click me 2";

        document.body.append($newBtn);
        document.body.append($newNotBtn);

        return new Promise(function (resolve, reject) {
            $newBtn.addEventListener('click', resolve);
            $newNotBtn.addEventListener('click', reject);
        });
    })
    .finally(function () {
        console.log('One of the buttons was clicked');
    })
    .then(function (resultTwo) {
        console.log('resolved 2');
        console.log(resultTwo);

        // blabla();

        return wait('Test123', 2000);
    })
    .then(function (resultThree) {
        console.log('resolved 3');
        console.log(resultThree);
    })
    .catch(function (error) {
        console.log('rejected');
        console.error(error);
    });

console.log(promise);

let promiseOne = wait('one', 2000);
let promiseTwo = wait('two', 1500);
let promiseThree = wait('three', 700);

Promise.any([promiseOne, promiseTwo, promiseThree])
    .then(function (returnVal) {
        console.log(returnVal);
    })
    .catch(function (error) {
        console.error(error);
    });

console.log(Promise.resolve('test123'));
console.log(Promise.reject('test123'));
