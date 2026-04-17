let inputEl = document.querySelector('.task-input');
let addTaskBtn = document.querySelector('.add-task-button');
let taskList = document.querySelector('.tasks-list');

addTaskBtn.addEventListener('click', function() {
  let newTaskText = inputEl.value.trim();

  if (newTaskText === '') {
    alert('Please enter a task.');
    inputEl.focus();
    return;
  }
  
  taskList.innerHTML += `
    <li class="task">
      <div class="task-content">
        <p>${newTaskText}</p>
      </div>
      <div class="task-actions">
        <button class="edit-task-button">Edit</button>
        <button class="delete-task-button">Delete</button>
      </div>
    </li>
  `;

  inputEl.value = '';
  inputEl.focus();
});

document.addEventListener('click', function(event) {
  if (event.target.matches('.edit-task-button')) {
    console.log('Edit button clicked');

    let taskItem = event.target.closest('.task');
    let taskContent = taskItem.querySelector('.task-content p');
    taskContent.contentEditable = true;
    taskContent.focus();
  }

  if (event.target.matches('.delete-task-button')) {
    console.log('Delete button clicked');
    
    let taskItem = event.target.closest('.task');
    taskItem.remove();
    inputEl.focus();
  }
});