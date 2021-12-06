/**
 * Create a list
 * @param {HTMLElement} el
 * @param {boolean} ordered
 * @param {array} items
 */

function createList(el, ordered, items) {
    let listEl;

    if (ordered) {
        listEl = document.createElement('ol');
    } else {
        listEl = document.createElement('ul');
    }

    for (let i = 0; i < items.length; i++) {
        let listItem = document.createElement('li');
        listItem.innerText = items[i];
        listEl.append(listItem);
    }

    el.append(listEl);
}

let listContainer = document.getElementById('list-container');
let listItems = [
    'Bart',
    'Dzhamal',
    'Energerta',
    ['1', '2', '3'],
    'Margot',
    'Yves',
];

createList(listContainer, false, listItems);
