"use client";

import { useEffect, useState } from "react";
import styles from "./HabitTracker.module.scss";
import dayjs from "dayjs";

type Habit = {
  id: number;
  name: string;
  streak: number;
  completedToday: boolean;
  lastCompletedDate: string | null;
};

const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitName, setHabitName] = useState("");

  // Load habits from localStorage
  useEffect(() => {
    const savedHabits = localStorage.getItem("habits");

    if (!savedHabits) {
      return;
    }

    const parsedHabits: Habit[] = JSON.parse(savedHabits);

    const today = dayjs().format("YYYY-MM-DD");

    const updatedHabits = parsedHabits.map((habit) => ({
      ...habit,
      completedToday: habit.lastCompletedDate === today,
    }));

    setHabits(updatedHabits);
  }, []);

  // Save habits to localStorage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const handleAddHabit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!habitName.trim()) {
      return;
    }

    const newHabit: Habit = {
      id: Date.now(),
      name: habitName,
      streak: 0,
      completedToday: false,
      lastCompletedDate: null,
    };

    setHabits((prev) => [newHabit, ...prev]);

    setHabitName("");
  };

  const handleDeleteHabit = (id: number) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const handleCompleteHabit = (id: number) => {
    const today = dayjs().format("YYYY-MM-DD");

    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) {
          return habit;
        }

        if (habit.lastCompletedDate === today) {
          return habit;
        }

        let newStreak = 1;

        if (habit.lastCompletedDate) {
          const daysDifference = dayjs(today).diff(
            dayjs(habit.lastCompletedDate),
            "day",
          );

          if (daysDifference === 1) {
            newStreak = habit.streak + 1;
          }
        }

        return {
          ...habit,
          streak: newStreak,
          completedToday: true,
          lastCompletedDate: today,
        };
      }),
    );
  };

  const totalHabits = habits.length;

  const completedToday = habits.filter((habit) => habit.completedToday).length;

  const completionRate =
    totalHabits === 0 ? 0 : Math.round((completedToday / totalHabits) * 100);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>
            Habit Tracker
            <img
              src="/react-logo.svg"
              alt="React Logo"
              width="24"
              height="24"
            />
          </h1>

          <p>Build consistency every day</p>
        </div>

        <div className={styles.summary}>
          <div>
            <span>Total Habits</span>

            <strong>{totalHabits}</strong>
          </div>

          <div>
            <span>Completed Today</span>

            <strong>{completedToday}</strong>
          </div>

          <div>
            <span>Completion Rate</span>

            <strong>{completionRate}%</strong>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleAddHabit}>
          <input
            type="text"
            placeholder="Enter a habit..."
            value={habitName}
            onChange={(event) => setHabitName(event.target.value)}
          />

          <button type="submit">Add Habit</button>
        </form>

        <div className={styles.habitList}>
          {habits.length === 0 && (
            <p className={styles.emptyState}>No habits added yet</p>
          )}

          {habits.map((habit) => (
            <div key={habit.id} className={styles.habitItem}>
              <div>
                <h3>{habit.name}</h3>

                <p>🔥 Streak: {habit.streak}</p>
              </div>

              <div className={styles.actions}>
                <button
                  disabled={habit.completedToday}
                  onClick={() => handleCompleteHabit(habit.id)}
                >
                  {habit.completedToday ? "✓ Completed" : "Mark Complete"}
                </button>

                <button onClick={() => handleDeleteHabit(habit.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
