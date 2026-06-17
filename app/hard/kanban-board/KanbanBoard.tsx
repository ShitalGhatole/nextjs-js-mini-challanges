'use client'

import { useState } from 'react'
import styles from './KanbanBoard.module.scss'

type Task = {
  id: number
  title: string
  status: 'todo' | 'progress' | 'done'
}

const KanbanBoard = () => {
  const [taskName, setTaskName] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null)

  const addTask = () => {
    const title = taskName.trim()

    if (!title) {
      return
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      status: 'todo'
    }

    setTasks(prev => [...prev, newTask])

    setTaskName('')
  }

  const deleteTask = (id: number) => {
    setTasks(prev => {
      return prev.filter(task => task.id !== id)
    })
  }

  const handleDragStart = (taskId: number) => {
    setDraggedTaskId(taskId)
  }

  const handleDrop = (
    status: 'todo' | 'progress' | 'done'
  ) => {
    if (!draggedTaskId) {
      return
    }

    setTasks(prev =>
      prev.map(task => {
        if (task.id === draggedTaskId) {
          return {
            ...task,
            status
          }
        }

        return task
      })
    )

    setDraggedTaskId(null)
  }

  const renderColumnTasks = (
    status: 'todo' | 'progress' | 'done'
  ) => {
    return tasks
      .filter(task => task.status === status)
      .map(task => (
        <div
          key={task.id}
          className={styles.task}
          draggable
          onDragStart={() => handleDragStart(task.id)}
        >
          <div className={styles.taskTitle}>
            {task.title}
          </div>

          <button
            className={styles.deleteBtn}
            onClick={() => deleteTask(task.id)}
          >
            ✕
          </button>
        </div>
      ))
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <div className={styles.header}>
          <h1>
            Kanban Board
            <img
              src="/react-logo.svg"
              alt="React"
              width="24"
              height="24"
            />
          </h1>

          <p>Manage your tasks</p>
        </div>

        <div className={styles.taskForm}>
          <input
            type="text"
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTask()
              }
            }}
          />

          <button onClick={addTask}>
            Add Task
          </button>
        </div>

        <div className={styles.board}>

          <div
            className={styles.column}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop('todo')}
          >
            <h2>Todo</h2>

            {renderColumnTasks('todo')}
          </div>

          <div
            className={styles.column}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop('progress')}
          >
            <h2>In Progress</h2>

            {renderColumnTasks('progress')}
          </div>

          <div
            className={styles.column}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop('done')}
          >
            <h2>Done</h2>

            {renderColumnTasks('done')}
          </div>

        </div>

      </div>
    </div>
  )
}

export default KanbanBoard