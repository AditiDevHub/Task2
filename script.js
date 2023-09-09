let timer;
let isRunning = false;
let startTime;
let laps = [];
let lapCounter = 1;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 8);
}

function updateDisplay() {
    const elapsed = isRunning ? Date.now() - startTime : 0;
    display.textContent = formatTime(elapsed);
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = "Start";
    } else {
        startTime = Date.now() - (laps.length > 0 ? laps.reduce((a, b) => a + b) : 0);
        timer = setInterval(updateDisplay, 10);
        startStopBtn.textContent = "Stop";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    display.textContent = "00:00:00";
    isRunning = false;
    startStopBtn.textContent = "Start";
    laps = [];
    lapCounter = 1;
    lapsList.innerHTML = "";
}

function lap() {
    if (isRunning) {
        const elapsed = Date.now() - startTime;
        laps.push(elapsed);
        const lapItem = document.createElement("li");
        lapItem.classList.add("lap");
        lapItem.textContent = `Lap ${lapCounter++}: ${formatTime(elapsed)}`;
        lapsList.appendChild(lapItem);
    }
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
reset();
