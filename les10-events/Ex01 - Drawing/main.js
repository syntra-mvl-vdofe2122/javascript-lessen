let isMouseDown = false;

function drawing(event) {
    if (!isMouseDown) {
        return;
    }

    let newDiv = document.createElement('div');
    newDiv.classList.add('drawing');
    newDiv.style.top = event.pageY + 'px';
    newDiv.style.left = event.pageX + 'px';

    document.body.append(newDiv);
}

function setMouseDown() {
    isMouseDown = true;
}

function setMouseUp() {
    isMouseDown = false;
}

document.body.addEventListener('mousemove', drawing);
document.body.addEventListener('mousedown', setMouseDown);
document.body.addEventListener('mouseup', setMouseUp);

// Multiple colors - multiple buttons
// Multiple thicknesses - input element
// round / square - buttons
