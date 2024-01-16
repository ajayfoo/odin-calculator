const display = document.querySelector('#display');

function handleNumButtons() {
    const numButtons = document.querySelectorAll('.num');
    numButtons.forEach(btn => btn.addEventListener(
        'click',
        () => {
            if (display.textContent.length >= 5) {
                alert('Number must be below 10^5');
            }
            else {
                display.textContent = Number(display.textContent) * 10 + Number(btn.textContent);
            }
        }
    ));
}

function handleClearButton() {
    const clearButton = document.getElementById('clear-btn');
    clearButton.addEventListener(
        'click',
        () => {
            display.textContent = ''
            display.appendChild(document.createTextNode('\u00A0'));
        }
    );
}

handleNumButtons();
handleClearButton();