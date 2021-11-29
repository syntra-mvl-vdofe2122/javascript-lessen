console.log('Assert ready!');

function loadCss(filename) {
    const fileref = document.createElement('link');
    fileref.setAttribute('rel', 'stylesheet');
    fileref.setAttribute('type', 'text/css');
    fileref.setAttribute(
        'href',
        'https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css',
    );
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

async function assertResult(
    $assertContainer,
    functionName,
    params,
    expected,
    name = '',
) {
    const paramsString = JSON.stringify(params);
    const expectedString = JSON.stringify(expected);
    const actualString = JSON.stringify(
        await window[functionName].apply(this, params),
    );

    if (name) {
        appendTo($assertContainer, `<h3>${name}:</h3>`);
    }

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
        'doubleNumbers',
    );
})();
