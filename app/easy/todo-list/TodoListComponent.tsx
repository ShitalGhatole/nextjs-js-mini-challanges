'use client'
import { useRef, useState } from "react";
import styles from "./TodoListComponent.module.scss";

const TodoListComponent = () => {

  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const inputElementRef = useRef<HTMLInputElement>(null);

  const addTask = () => {
    console.log("Add button clicked!");
    if (inputValue.trim() === '') {
      alert("Please enter a task.");
      return;
    }

    setTasks([...tasks, inputValue]);
    setInputValue('');

    if (inputElementRef.current) {
      inputElementRef.current.focus();
    }
  }

  const editTask = (index: number) => {
    const newTask = prompt("Edit current task", tasks[index]);
    if (newTask !== null && newTask.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[index] = newTask;
      setTasks(updatedTasks);
    }
  }

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Todo List <img src="/react-logo.svg" alt="JS Icon" height={24} width={24} title="Made in React" /></h1>
          <p>Add tasks and keep track of your to-do list!</p>
        </div>

        <div className={styles.inputGroup}>
          <input 
            ref={inputElementRef}
            type="text" 
            className={styles.taskInput} 
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button className={styles.addTaskButton} onClick={addTask}>
            Add
          </button>
        </div>

        <ul className={styles.tasksList}>
          {tasks?.map((task, index) => (
            <li key={index} className={styles.taskItem}>
              <div className={styles.task}>
                <p>{task}</p>
              </div>

              <div className={styles.taskActions}>
                <button className={styles.editTaskButton} onClick={() => editTask(index)}>
                  Edit
                </button>
                <button className={styles.deleteTaskButton} onClick={() => deleteTask(index)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default TodoListComponent