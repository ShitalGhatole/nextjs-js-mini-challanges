const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const todoTasks = document.getElementById("todoTasks");
const progressTasks = document.getElementById("progressTasks");
const doneTasks = document.getElementById("doneTasks");

let tasks = [];

let draggedTaskId = null;

// Add Task
function addTask() {
  const title = taskInput.value.trim();

  if (!title) {
    return;
  }

  tasks.push({
    id: Date.now(),
    title,
    status: "todo",
  });

  taskInput.value = "";

  renderTasks();
}

// Delete Task
function deleteTask(id) {
  tasks = tasks.filter((task) => {
    return task.id !== id;
  });

  renderTasks();
}

// Drag Events
function handleDragStart(taskId) {
  draggedTaskId = taskId;
}

function handleDragOver(event) {
  event.preventDefault();

  event.currentTarget.classList.add("dragOver");
}

function handleDragLeave(event) {
  event.currentTarget.classList.remove("dragOver");
}

function handleDrop(status, event) {
  event.currentTarget.classList.remove("dragOver");

  const task = tasks.find((task) => {
    return task.id === draggedTaskId;
  });

  if (!task) {
    return;
  }

  task.status = status;

  draggedTaskId = null;

  renderTasks();
}

// Task HTML
function createTaskHTML(task) {
  return `
    <div
      class="task"
      draggable="true"
      ondragstart="handleDragStart(${task.id})"
    >
      <div class="taskTitle">
        ${task.title}
      </div>

      <div class="taskActions">
        <button
          class="deleteBtn"
          onclick="deleteTask(${task.id})"
        >
          ✕
        </button>
      </div>
    </div>
  `;
}

  // Render Tasks

function renderTasks() {
  todoTasks.innerHTML = "";
  progressTasks.innerHTML = "";
  doneTasks.innerHTML = "";

  tasks.forEach((task) => {
    const taskHTML = createTaskHTML(task);

    if (task.status === "todo") {
      todoTasks.innerHTML += taskHTML;
    }

    if (task.status === "progress") {
      progressTasks.innerHTML += taskHTML;
    }

    if (task.status === "done") {
      doneTasks.innerHTML += taskHTML;
    }
  });
}

// Event Listeners

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Initial Render

renderTasks();
