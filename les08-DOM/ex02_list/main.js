/**
 * Create a list
 * @param {HTMLElement} el
 * @param {boolean} ordered
 * @param {array} items
 */

// function createList(el, ordered, items) {
//     let listEl;
//
//     if (ordered) {
//         listEl = document.createElement('ol');
//     } else {
//         listEl = document.createElement('ul');
//     }
//
//     for (let i = 0; i < items.length; i++) {
//         let listItem = document.createElement('li');
//
//         if (typeof items[i] === 'string') {
//             listItem.innerText = items[i];
//         } else {
//             //     let subList = document.createElement('ul');
//             //
//             //     for (let j = 0; j < items[i].length; j++) {
//             //         let subListItem = document.createElement('li');
//             //         subListItem.innerText = items[i][j];
//             //         subList.append(subListItem);
//             //     }
//             //
//             //     listItem.append(subList);
//
//             createList(listItem, false, items[i]);
//         }
//
//         listEl.append(listItem);
//     }
//
//     el.append(listEl);
// }

function createList(el, ordered, items) {
    let html = '';

    if (ordered) {
        html += `<ol>`;
    } else {
        html += `<ul>`;
    }

    for (let i = 0; i < items.length; i++) {
        html += `<li>`;

        if (typeof items[i] === 'string') {
            html += items[i];
        } else {
            html += `<ul>`;

            for (let j = 0; j < items[i].length; j++) {
                html += `<li>${items[i][j]}</li>`;
            }

            html += `</ul>`;
        }

        html += `</li>`;
    }

    if (ordered) {
        html += `</ol>`;
    } else {
        html += `</ul>`;
    }

    console.log(html);

    el.insertAdjacentHTML('beforeend', html);
}

let listContainer = document.getElementById('list-container');
let listItems = [
    'Bart',
    'Dzhamal',
    'Energerta',
    ['1', '2', ['a', 'b', 'c']],
    'Margot',
    'Yves',
];

createList(listContainer, false, listItems);
