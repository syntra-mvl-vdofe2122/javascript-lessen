/**
 * Generate a select input
 *  @param {HTMLElement} el
 *  @param {Object} options
 */

function genSelect(el, options, selected) {
    let selectEl = document.createElement('select');

    for (const key in options) {
        let optionEl = document.createElement('option');
        optionEl.value = key;
        optionEl.innerText = options[key];

        if (selected === key) {
            optionEl.selected = true;
        }

        // optionEl.selected = selected === key;

        selectEl.append(optionEl);
    }

    el.append(selectEl);
}

function genSelectTwo(el, options) {
    let html = `<select>`;

    for (const key in options) {
        html += `<option value="${key}">${options[key]}</option>`;
    }

    html += `</select>`;

    el.insertAdjacentHTML('beforeend', html);
}

let selectRoot = document.getElementById('select-root');

let selectOptions = {
    bart: 'Bart',
    dzhamal: 'Dzhamal',
    energerta: 'Energerta',
};

genSelect(selectRoot, selectOptions, 'dzhamal');
genSelectTwo(selectRoot, selectOptions);
