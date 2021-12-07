// setInterval

let clockContainer = document.getElementById('clock');
let hour = 10;
let min = 0;
let sec = 0;

function setClock() {
    // sec++;
    //
    // if (sec === 60) {
    //     sec = 0;
    //     min++;
    // }
    //
    // if (min === 60) {
    //     min = 0;
    //     hour++;
    // }
    //
    // if (hour === 24) {
    //     hour = 0;
    // }

    let curDate = new Date();
    hour = curDate.getHours();
    min = curDate.getMinutes();
    sec = curDate.getSeconds();

    let html = `
        <span>${hour.toString(10).padStart(2, '0')}</span>
        <span>${min.toString(10).padStart(2, '0')}</span>
        <span>${sec.toString(10).padStart(2, '0')}</span>`;

    clockContainer.innerHTML = html;
}

setInterval(setClock, 1000);
