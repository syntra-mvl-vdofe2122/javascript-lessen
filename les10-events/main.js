// herhaling
let btn = document.querySelector('button');

// btn.addEventListener('click', gClick);

function gClick() {
    console.log(btn);
}

// Mouse events

function mouseDown() {
    console.log('Left mouse btn down');
}

// btn.addEventListener('mousedown', mouseDown);

function mouseUp() {
    console.log('Left mouse btn up');
}

// btn.addEventListener('mouseup', mouseUp);

function mouseOver() {
    console.log('hovering');
}

// btn.addEventListener('mouseover', mouseOver);

function mouseOut() {
    console.log('hovering stopped');
}

// btn.addEventListener('mouseout', mouseOut);

function mouseMove(event) {
    console.log(event);
}

btn.addEventListener('mousemove', mouseMove);

function fakeEventListener(eventType, eventHandler) {
    switch (eventType) {
        case 'click':
            let clickInfo = {
                target: 'test',
                info: 'other',
            };

            eventHandler(clickInfo);
            break;
        case 'mousemove':
            eventHandler();
            break;
    }
}

fakeEventListener('click', mouseMove);

// Exercise

// 1 - Make color of btn red when mouse hovers, black when mouse doesn't
let $button = document.getElementById('btn');

function textColorRed() {
    $button.style.color = 'red';
}

function textColorBlack() {
    $button.style.color = '';
}

$button.addEventListener('mouseover', textColorRed);
$button.addEventListener('mouseout', textColorBlack);
// 2 - Make background color blue when mouse is down, green when mouse is up

function backgroundBlue() {
    $button.style.backgroundColor = 'blue';
}

function backgroundGreen() {
    $button.style.backgroundColor = 'green';
}

$button.addEventListener('mousedown', backgroundBlue);
$button.addEventListener('mouseup', backgroundGreen);

// 3 - Draw a pixel div when the mouse moves

// Event bubbling

function numberBtnClick(event) {
    if (event.target.matches('#btn-container button')) {
        console.log(event.target.innerText);
    } else {
        console.log('Not a button');
    }
}

let latestBtn = 8;

function createMoreBtns() {
    latestBtn++;
    let $newBtn = document.createElement('button');
    $newBtn.innerText = latestBtn;
    $btnContainer.append($newBtn);
}

let $btnContainer = document.getElementById('btn-container');
// let $btns = $btnContainer.children;
//
// for (let i = 0; i < $btns.length; i++) {
//     $btns[i].addEventListener('click', numberBtnClick);
// }

function checkClick() {
    console.log('Click event triggered');
}

// document.body.addEventListener('click', checkClick);
$button.addEventListener('click', createMoreBtns);
$btnContainer.addEventListener('click', numberBtnClick);

// 