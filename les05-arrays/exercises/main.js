/**
 * Given an array, return the same array but make sure no value occurs more than once
 * @param {array} anArray
 * @return {array}
 */
function removeDoubles(anArray) {
    let uniqueArr = [];

    for (let i = 0; i < anArray.length; i++) {
        if (!uniqueArr.includes(anArray[i])) {
            uniqueArr.push(anArray[i]);
        }
    }

    return uniqueArr;
}

/**
 * Given an array of numbers, return the same array containing only even numbers
 * @param {number[]} anArray
 * @return {number[]}
 */
function onlyEven(anArray) {
    let evenArray = [];

    for (let i = 0; i < anArray.length; i++) {
        if (anArray[i] % 2 === 0) {
            evenArray.push(anArray[i]);
        }
    }

    return evenArray;
}

/**
 * Sort an array from low to high, write the logic yourself
 * @param {number[]} anArray
 * @return {number[]}
 */
function sort(anArray) {
    let done = false;

    while (!done) {
        done = true;
        for (let i = 0; i < anArray.length; i++) {
            if (i + 1 < anArray.length && anArray[i] > anArray[i + 1]) {
                done = false;
                let tempVal = anArray[i];
                anArray[i] = anArray[i + 1];
                anArray[i + 1] = tempVal;
            }
        }
    }

    return anArray;
}

/**
 * Reverse the string
 * Try to keep the same casing (if first letter is
 * uppercase, make sure it is still uppercase in the reversed word
 * @param {string} str
 * @return {string}
 */
function reverseString(str) {
    let strArray = str.split('');

    strArray.reverse();

    for (let i = 0; i < strArray.length; i++) {
        if (str[i] === str[i].toUpperCase()) {
            strArray[i] = strArray[i].toUpperCase();
        } else {
            strArray[i] = strArray[i].toLowerCase();
        }
    }

    return strArray.join('');

    // return str.split('').reverse().join('');
}

/**
 * Given two arrays of values, return an array with only the values that occur in both arrays
 * @param {array} anArray
 * @param {array} otherArray
 * @return {array}
 */
function findSimilars(anArray, otherArray) {
    let similarArray = [];

    for (let i = 0; i < anArray.length; i++) {
        let otherArrayIndex = otherArray.indexOf(anArray[i]);
        if (otherArrayIndex > -1) {
            similarArray.push(anArray[i]);
            otherArray.splice(otherArrayIndex, 1);
        }
    }

    return similarArray;
}

/**
 * Given an array return an array with the same values but in a random order
 * @param anArray
 */
function scramble(anArray) {
    // for (let i = 0; i < anArray.length; i++) {
    //     let randomIndex = Math.floor(Math.random() * anArray.length);
    //
    //     let tempVal = anArray[i];
    //     anArray[i] = anArray[randomIndex];
    //     anArray[randomIndex] = tempVal;
    // }
    //
    // return anArray;

    let scrambledArray = [];

    while (anArray.length) {
        let randomIndex = Math.floor(Math.random() * anArray.length);

        let randomVal = anArray.splice(randomIndex, 1);
        scrambledArray.push(randomVal[0]);
    }

    return scrambledArray;
}

/**
 * Given two arrays, check if the second array (subArray) is a sublist of the first (bigArray)
 * @param {array} bigArray
 * @param {array} subArray
 * @return {boolean}
 */
function isSublist(bigArray, subArray) {
    let isSubArray = false;

    for (let i = 0; i < bigArray.length; i++) {
        console.log(bigArray[i]);
        if (bigArray[i] === subArray[0]) {
            console.log('found first item');
            isSubArray = true;

            for (let j = 0; j < subArray.length; j++) {
                console.log(subArray[j]);
                console.log(bigArray[i + j]);

                if (subArray[j] !== bigArray[i + j]) {
                    console.log('wrong val');
                    isSubArray = false;
                    break;
                }
            }
        }

        if (isSubArray) {
            // return true;
            break;
        }
    }

    // return false;
    console.log('return ' + isSubArray);
    return isSubArray;
}
