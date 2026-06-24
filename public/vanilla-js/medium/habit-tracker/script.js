const habitForm = document.getElementById("habitForm");
const habitInput = document.getElementById("habitInput");
const habitList = document.getElementById("habitList");
const totalHabitsEl = document.getElementById("totalHabits");
const completedTodayEl = document.getElementById("completedToday");
const completionRateEl = document.getElementById("completionRate");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

//reset completedToday when a new day starts
const today = dayjs().format("YYYY-MM-DD");

habits = habits.map((habit) => ({
  ...habit,
  completedToday: habit.lastCompletedDate === today,
}));

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function updateSummary() {
  const totalHabits = habits.length;

  const completedToday = habits.filter((habit) => habit.completedToday).length;

  const completionRate =
    totalHabits === 0 ? 0 : Math.round((completedToday / totalHabits) * 100);

  totalHabitsEl.textContent = totalHabits;
  completedTodayEl.textContent = completedToday;
  completionRateEl.textContent = `${completionRate}%`;
}

function renderHabits() {
  habitList.innerHTML = "";

  if (habits.length === 0) {
    habitList.innerHTML = `
        <p class="emptyState">
          No habits added yet
        </p>
      `;

    updateSummary();
    return;
  }

  habits.forEach((habit) => {
    const habitItem = document.createElement("div");

    habitItem.className = "habitItem";

    habitItem.innerHTML = `
        <div>
          <h3>${habit.name}</h3>

          <p>
            🔥 Streak: ${habit.streak}
          </p>
        </div>

        <div class="actions">
          <button
            class="completeBtn"
            data-id="${habit.id}"
            ${habit.completedToday ? "disabled" : ""}
          >
            ${habit.completedToday ? "✓ Completed" : "Mark Complete"}
          </button>

          <button
            class="deleteBtn"
            data-id="${habit.id}"
          >
            Delete
          </button>
        </div>
      `;

    habitList.appendChild(habitItem);
  });

  updateSummary();
}

habitForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const habitName = habitInput.value.trim();

  if (!habitName) {
    return;
  }

  habits.unshift({
    id: Date.now(),
    name: habitName,
    streak: 0,
    completedToday: false,
    lastCompletedDate: null,
  });

  saveHabits();
  renderHabits();

  habitInput.value = "";
});

habitList.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("deleteBtn")) {
    const id = Number(target.dataset.id);

    habits = habits.filter((habit) => habit.id !== id);

    saveHabits();
    renderHabits();
  }

  if (target.classList.contains("completeBtn")) {
    const id = Number(target.dataset.id);

    const today = dayjs().format("YYYY-MM-DD");

    habits = habits.map((habit) => {
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
    });

    saveHabits();
    renderHabits();
  }
});

renderHabits();
