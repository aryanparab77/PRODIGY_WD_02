let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');

const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(time) {
  const totalSeconds = Math.floor(time / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((time % 1000) / 10);

  return {
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
    milliseconds: milliseconds.toString().padStart(2, '0')
  };
}

function updateDisplay() {
  const time = formatTime(elapsedTime);
  minutesEl.textContent = time.minutes;
  secondsEl.textContent = time.seconds;
  millisecondsEl.textContent = time.milliseconds;
}

function startTimer() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    running = true;

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
  }
}

function pauseTimer() {
  if (running) {
    clearInterval(timerInterval);
    running = false;

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
  lapsList.innerHTML = '';
  running = false;

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
}

function addLap() {
  if (running) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `${lapTime.minutes}:${lapTime.seconds}:${lapTime.milliseconds}`;
    lapsList.appendChild(lapItem);
  }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);

// Initialize display
updateDisplay();
