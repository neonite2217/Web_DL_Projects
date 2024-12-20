let outputScreen = document.getElementById("output-screen");

function display(num) {
    outputScreen.value += num;
}

function calculate() {
    try {
        outputScreen.value = eval(outputScreen.value);
    } catch (err) {
        alert("Invalid equation!");
    }
}

function allClear() {
    outputScreen.value = "";
}

function del() {
    outputScreen.value = outputScreen.value.slice(0, -1);
}

function toggleMode() {
    const body = document.body;
    const toggleButton = document.querySelector('.toggle-button');
    if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
    } else {
        body.classList.replace('dark-mode', 'light-mode');
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const keys = {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '0': '0',
        '+': '+',
        '-': '-',
        '*': '*',
        '/': '/',
        'Enter': '=',
        '=': '=',
        '.': '.',
        'Backspace': 'C', // Assigns Backspace to clear all
        'Tab': 'Tab' // Assigns Tab to toggle mode
    };

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (keys[key]) {
            event.preventDefault(); // Prevent default behavior for mapped keys
            if (key === 'Tab') {
                toggleMode();
            } else {
                document.querySelector(`button[data-key="${keys[key]}"]`).click();
            }
        }
    });
});
