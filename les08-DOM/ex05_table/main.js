let tableContent = [
    { firstName: 'Dzhamal', lastName: 'Kurbanov', age: 23 },
    { firstName: 'Hilco', lastName: 'Brosse', age: 21 },
    { firstName: 'Margot', lastName: 'De Vos', age: 27 },
    { firstName: 'Korneel', lastName: 'Eeckhout', age: 30 },
];

/**
 * genTable generates a table
 * The thead will be filled with the keys from the objects
 * The tbody will be filled with the values (each object get one row)
 *
 * > Object.keys()
 * > for ... in loop
 * > createElement
 * > append
 * > innerText
 *
 * Fase 1
 * genereer thead + inhoud > Object.keys > for loop
 *
 * Fase 2
 * genereer tbody + inhoud > for loop > for in loop
 * @param {Array} data
 */

// function genTable(data) {
//     let tableContainer = document.getElementById('table-container');
//     let table = document.createElement('table');
//     let thead = document.createElement('thead');
//     let theadRow = document.createElement('tr');
//
//     let keys = Object.keys(data[0]);
//
//     for (let i = 0; i < keys.length; i++) {
//         let th = document.createElement('th');
//         th.innerText = keys[i];
//         theadRow.append(th);
//     }
//
//     thead.append(theadRow);
//     table.append(thead);
//
//     let tbody = document.createElement('tbody');
//
//     for (let i = 0; i < data.length; i++) {
//         let tbodyRow = document.createElement('tr');
//         let values = Object.values(data[i]);
//
//         for (let j = 0; j < values.length; j++) {
//             let td = document.createElement('td');
//             td.innerText = values[j];
//             tbodyRow.append(td);
//         }
//
//         tbody.append(tbodyRow);
//     }
//
//     table.append(tbody);
//     tableContainer.append(table);
// }

function genTable(data) {
    let tableContainer = document.getElementById('table-container');
    let html = `<table><thead><tr>`;

    let keys = Object.keys(data[0]);

    for (let i = 0; i < keys.length; i++) {
        html += `<th>${keys[i]}</th>`;
    }

    html += `</tr></thead><tbody>`;

    for (let i = 0; i < data.length; i++) {
        html += `<tr>`;

        let values = Object.values(data[i]);

        for (let j = 0; j < values.length; j++) {
            html += `<td>${values[j]}</td>`;
        }

        html += `</tr>`;
    }

    html += `</tbody></table>`;

    console.log(html);

    tableContainer.insertAdjacentHTML('beforeend', html);
}

genTable(tableContent);
