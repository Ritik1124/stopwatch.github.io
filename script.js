let startTime;
let isRunning = false;
let intervalId;

const timeDisplay = document.querySelector('.time');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');

function formatTime(ms) {
    const date = new Date(ms);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function updateDisplay() {
    const currentTime = isRunning ? Date.now() - startTime : startTime;
    timeDisplay.textContent = formatTime(currentTime);
}

function startStop() {
    if (isRunning) {
        clearInterval(intervalId);
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now() - (startTime || 0);
        intervalId = setInterval(updateDisplay, 1000);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(intervalId);
    startTime = 0;
    updateDisplay();
    startStopButton.textContent = 'Start';
    isRunning = false;
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);

reset();
