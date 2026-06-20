"use client";
import { useEffect, useState } from "react";
import styles from "./PomodoroTimer.module.scss";

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const playNotification = () => {
    const audio = new Audio('/notification.mp3')
    audio.play()
  }

  // handle timer countdown
  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  //update browser tab title
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    document.title = `${String(minutes).padStart(2, "0")}:${String(
      seconds,
    ).padStart(2, "0")} | ${isBreak ? "Break" : "Work"}`;
  }, [timeLeft, isBreak]);

  // handle session switching
  useEffect(() => {
    if (timeLeft > 0) {
      return;
    }

    playNotification();

    if (isBreak) {
      setIsBreak(false);
      setTimeLeft(WORK_TIME);

      alert("☕ Break complete! Back to work.");
    } else {
      setCompletedSessions((prev) => prev + 1);

      setIsBreak(true);
      setTimeLeft(BREAK_TIME);

      alert("🎉 Work session complete! Time for a break.");
    }
  }, [timeLeft, isBreak]);

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(WORK_TIME);
    setCompletedSessions(0);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>
            Pomodoro Timer
            <img
              src="/react-logo.svg"
              alt="React Logo"
              width="24"
              height="24"
            />
          </h1>

          <p>Stay focused and take breaks (25mis Work, 5mins Breaks)</p>
        </div>

        <div className={styles.timerSection}>
          <div
            className={`${styles.status} ${
              isRunning ? styles.running : styles.paused
            }`}
          >
            {isRunning ? "● RUNNING" : "● PAUSED"}
          </div>

          <div className={styles.timer}>
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>

          <p
            className={`${styles.sessionType} ${
              isBreak ? styles.breakSession : styles.workSession
            }`}
          >
            {isBreak ? "☕ Break Session" : "💻 Work Session"}
          </p>
        </div>

        <div className={styles.stats}>
          <div>
            <span>Completed Sessions</span>

            <strong>{completedSessions}</strong>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={isRunning ? styles.pauseButton : styles.startButton}
            onClick={() => setIsRunning((prev) => !prev)}
          >
            {isRunning ? "⏸ Pause Timer" : "▶ Start Timer"}
          </button>

          <button className={styles.resetButton} onClick={handleReset}>
            ↺ Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
