// 1 - generate letter buttons
// 2 - enable click events
// 3 - write correct letter on click
let $btnContainer = document.getElementById('btn-container');
let $textContainer = document.getElementById('text-container');

let alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'SPACE',
    'BACKSPACE',
];

function genButtons() {
    for (let i = 0; i < alphabet.length; i++) {
        let $newBtn = document.createElement('button');
        $newBtn.innerText = alphabet[i];

        $btnContainer.append($newBtn);
    }
}

function letterClicked(event) {
    if (event.target.matches('#btn-container button')) {
        let curText = event.target.innerText;

        switch (curText) {
            case 'SPACE':
                $textContainer.innerHTML += '&nbsp;';
                break;
            case 'BACKSPACE':
                let curText = $textContainer.innerText;
                $textContainer.innerText = curText.substring(
                    0,
                    curText.length - 1,
                );
                break;
            default:
                $textContainer.innerText += event.target.innerText;
        }
    }
}

$btnContainer.addEventListener('click', letterClicked);

genButtons();
