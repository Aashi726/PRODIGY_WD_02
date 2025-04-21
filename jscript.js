let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const laps = document.getElementById('laps');
const startPauseBtn = document.getElementById('startPauseBtn');

function formatTime(ms) {
  const date = new Date(ms);
  const hrs = String(date.getUTCHours()).padStart(2, '0');
  const mins = String(date.getUTCMinutes()).padStart(2, '0');
  const secs = String(date.getUTCSeconds()).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function updateDisplay() {
  const now = Date.now();
  elapsedTime = now - startTime;
  display.textContent = formatTime(elapsedTime);
}

function toggleStartPause() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 1000);
    startPauseBtn.textContent = 'Pause';
    startPauseBtn.className = 'pause';
    running = true;
  } else {
    clearInterval(timerInterval);
    startPauseBtn.textContent = 'Resume';
    startPauseBtn.className = 'resume';
    running = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  lapCount = 0;
  running = false;
  display.textContent = '00:00:00';
  startPauseBtn.textContent = 'Start';
  startPauseBtn.className = 'start';
  laps.innerHTML = '';
}

function recordLap() {
  if (!elapsedTime) return;
  lapCount++;
  const li = document.createElement('li');
  li.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
  laps.appendChild(li);
  laps.scrollTop = laps.scrollHeight;
}
