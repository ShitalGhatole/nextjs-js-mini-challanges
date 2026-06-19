const timerEl = document.getElementById("timer");
const statusEl = document.getElementById("status");
const sessionTypeEl = document.getElementById("sessionType");
const sessionCountEl = document.getElementById("sessionCount");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const notificationSound = document.getElementById("notificationSound");

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

let timeLeft = WORK_TIME;
let isRunning = false;
let isBreak = false;
let completedSessions = 0;

let interval = null;


function updateUI() {
  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  timerEl.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;

  document.title = `${timerEl.textContent} | ${isBreak ? "Break" : "Work"}`;

  statusEl.textContent = isRunning ? "● RUNNING" : "● PAUSED";

  statusEl.className = `status ${isRunning ? "running" : "paused"}`;

  sessionTypeEl.textContent = isBreak ? "☕ Break Session" : "💻 Work Session";

  sessionTypeEl.className = `session-type ${
    isBreak ? "break-session" : "work-session"
  }`;

  sessionCountEl.textContent = completedSessions;

  startPauseBtn.textContent = isRunning ? "⏸ Pause Timer" : "▶ Start Timer";

  startPauseBtn.className = isRunning ? "pause-button" : "start-button";
}

function startTimer() {
  interval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateUI();
      return;
    }

    notificationSound.currentTime = 0;
    notificationSound.play();

    if (isBreak) {
      alert("☕ Break complete! Back to work.");

      isBreak = false;
      timeLeft = WORK_TIME;
    } else {
      alert("🎉 Work session complete! Time for a break.");

      completedSessions++;

      isBreak = true;
      timeLeft = BREAK_TIME;
    }

    updateUI();
  }, 1000);
}

startPauseBtn.addEventListener("click", () => {
  isRunning = !isRunning;

  if (isRunning) {
    startTimer();
  } else {
    clearInterval(interval);
  }

  updateUI();
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);

  timeLeft = WORK_TIME;
  isRunning = false;
  isBreak = false;
  completedSessions = 0;

  updateUI();
});

updateUI();
