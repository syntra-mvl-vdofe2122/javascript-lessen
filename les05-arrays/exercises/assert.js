console.log('Assert ready!');

function loadCss(filename) {
    const fileref = document.createElement('link');
    fileref.setAttribute('rel', 'stylesheet');
    fileref.setAttribute('type', 'text/css');
    fileref.setAttribute('href', filename);
    document.getElementsByTagName('head')[0].appendChild(fileref);
}

function appendTo($element, html) {
    $element.insertAdjacentHTML('beforeend', html);
}

function appendContainer(name) {
    if (document.getElementById(name)) {
        return false;
    }
    appendTo(
        window.$assertContainer,
        `<div id="${name}"><h2>${name}</h2><div class="assert-container"></div></div>`,
    );

    return true;
}

function spacing() {
    return '<span style="color: transparent; display: inline-block; width: 5rem;"></span>';
}

function fail() {
    return '<span style="color: indianred; display: inline-block; width: 5rem;">[fail]</span>';
}

function success() {
    return '<span style="color: lawngreen; display: inline-block; width: 5rem;">[success]</span>';
}

function assertFunctionExists(functionName, $assertContainer) {
    if (typeof window[functionName] === 'function') {
        appendTo(
            $assertContainer,
            `<p class="asserter success">${success()} Function <code>${functionName}()</code> found</p>`,
        );
    } else {
        appendTo(
            $assertContainer,
            `<p class="asserter fail">${fail()} Function <code>${functionName}()</code> not found</p>`,
        );
    }
}

async function assertResult($assertContainer, functionName, params, expected) {
    const paramsString = JSON.stringify(params);
    const expectedString = JSON.stringify(expected);
    const actualString = JSON.stringify(
        await window[functionName].apply(this, params),
    );

    appendTo($assertContainer, `<h3>${functionName}:</h3>`);

    if (expectedString === actualString) {
        appendTo(
            $assertContainer,
            `<p class="asserter success">${success()} <code>${functionName}(${paramsString.substring(
                1,
                paramsString.length - 1,
            )})</code> did return <code>${expectedString}</code></p>`,
        );
    } else {
        appendTo(
            $assertContainer,
            `<p class="asserter fail">${fail()} <code>${functionName}(${paramsString.substring(
                1,
                paramsString.length - 1,
            )})</code> did not return <code>${expectedString}</code></p><p>${spacing()} it returned: <code>${actualString}</code></p>`,
        );
    }
}

(function prepFile() {
    if (window.$assertContainer) {
        return;
    }

    let $newAssertContainer = `<div id="assertions"></div>`;
    appendTo(document.body, $newAssertContainer);
    window.$assertContainer = document.getElementById('assertions');

    loadCss(
        'https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css',
    );
})();

(async function removeDoubles() {
    const functionName = 'removeDoubles';
    if (!appendContainer(functionName)) {
        return;
    }
    const $assertContainer = document.querySelector(
        '#' + functionName + ' .assert-container',
    );

    assertFunctionExists(functionName, $assertContainer);
    await assertResult(
        $assertContainer,
        functionName,
        [[3, 5, 7, 12, 3, 6, 9, 10, 10, 5]],
        [3, 5, 7, 12, 6, 9, 10],
    );
})();

(async function onlyEven() {
    const functionName = 'onlyEven';
    if (!appendContainer(functionName)) {
        return;
    }
    const $assertContainer = document.querySelector(
        '#' + functionName + ' .assert-container',
    );

    assertFunctionExists(functionName, $assertContainer);
    await assertResult(
        $assertContainer,
        functionName,
        [[3, 5, 7, 12, 3, 6, 9, 10, 10, 5]],
        [12, 6, 10],
    );
})();

(async function sort() {
    const functionName = 'sort';
    if (!appendContainer(functionName)) {
        return;
    }
    const $assertContainer = document.querySelector(
        '#' + functionName + ' .assert-container',
    );

    assertFunctionExists(functionName, $assertContainer);
    await assertResult(
        $assertContainer,
        functionName,
        [[3, 5, 7, 12, 3, 6, 9, 10, 10, 5]],
        [3, 3, 5, 5, 6, 7, 9, 10, 10, 12],
    );
})();

(async function reverseString() {
    const functionName = 'reverseString';
    if (!appendContainer(functionName)) {
        return;
    }
    const $assertContainer = document.querySelector(
        '#' + functionName + ' .assert-container',
    );

    assertFunctionExists(functionName, $assertContainer);
    await assertResult($assertContainer, functionName, ['word'], 'drow');
    await assertResult($assertContainer, functionName, ['Korneel'], 'Leenrok');
})();

(async function findSimilars() {
    const functionName = 'findSimilars';
    if (!appendContainer(functionName)) {
        return;
    }
    const $assertContainer = document.querySelector(
        '#' + functionName + ' .assert-container',
    );

    assertFunctionExists(functionName, $assertContainer);
    await assertResult(
        $assertContainer,
        functionName,
        [
            [2, 5, 8, 11],
            [5, 3, 9, 11],
        ],
        [5, 11],
    );

    await assertResult(
        $assertContainer,
        functionName,
        [
            ['Pol', 'a', 'bene', 'cedrium', 'terror'],
            ['Particulas', 'cantare', 'in', 'castus', 'oenipons'],
        ],
        [],
    );
})();

(async function scramble() {
    const functionName = 'scramble';
    if (!appendContainer(functionName)) {
        return;
    }
    const $assertContainer = document.querySelector(
        '#' + functionName + ' .assert-container',
    );

    assertFunctionExists(functionName, $assertContainer);
    await assertResult(
        $assertContainer,
        functionName,
        [[3, 5, 7, 12, 3, 6, 9, 10, 10, 5]],
        [10, 3, 10, 12, 3, 5, 6, 7, 5, 9],
    );
})();

(async function isSublist() {
    const functionName = 'isSublist';
    if (!appendContainer(functionName)) {
        return;
    }
    const $assertContainer = document.querySelector(
        '#' + functionName + ' .assert-container',
    );

    assertFunctionExists(functionName, $assertContainer);
    await assertResult(
        $assertContainer,
        functionName,
        [
            [3, 5, 7, 12, 3, 6, 9, 10, 10, 5],
            [12, 3, 6, 9],
        ],
        true,
    );
})();
