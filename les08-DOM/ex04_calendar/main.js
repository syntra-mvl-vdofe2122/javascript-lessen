let daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
];
let rootEl = document.getElementById('calendar');

// function genCalendarView(month) {
//     rootEl.innerHTML = '';
//     let title = document.createElement('h1');
//     title.innerText = months[month - 1];
//     title.classList.add('name');
//     rootEl.append(title);
//
//     let weeks = [document.createElement('div')];
//     weeks[0].classList.add('week');
//
//     for (let i = 1; i <= daysOfMonth[month - 1]; i++) {
//         let day = document.createElement('div');
//         day.classList.add('day');
//         day.innerText = i;
//
//         weeks[weeks.length - 1].append(day);
//
//         if (i % 7 === 0 && i < daysOfMonth[month - 1]) {
//             weeks.push(document.createElement('div'));
//             weeks[weeks.length - 1].classList.add('week');
//         }
//     }
//
//     for (let j = 0; j < weeks.length; j++) {
//         rootEl.append(weeks[j]);
//     }
//
//     console.log(weeks);
// }

function genCalendarView(month) {
    let html = '';

    html += `<h1 class='name'>${months[month - 1]}</h1>`;

    html += `<div class='week'>`;

    for (let i = 1; i <= daysOfMonth[month - 1]; i++) {
        html += `<div class='day'>${i}</div>`;

        if (i % 7 === 0 && i < daysOfMonth[month - 1]) {
            html += `</div><div class='week'>`;
        }
    }

    html += `</div>`;

    rootEl.innerHTML = html;
    console.log(html);
}

genCalendarView(2);
