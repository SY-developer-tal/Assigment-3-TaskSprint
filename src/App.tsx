import { useMemo, useState } from 'react'
import './App.css'
import type { Task, ColumnId, FilterOption } from './types'
import { COLUMN_LABELS, STORAGE_KEY } from './constants'
import { useLocalStorageState } from './useLocalStorageState'
import { BoardColumn } from './components/BoardColumn'
import { TaskCard } from './components/TaskCard'

const FILTER_OPTIONS: { id: FilterOption; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'todo', label: 'To Do' },
  { id: 'inprogress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
]

function App() {
  const [tasks, setTasks] = useLocalStorageState<Task[]>(STORAGE_KEY, [])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [activeDropZone, setActiveDropZone] = useState<ColumnId | null>(null)
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all')

  // Memoize tasks by column to avoid recalculating on every render
  const columns = useMemo(() => {
    return {
      todo: tasks.filter(t => t.column === 'todo'),
      inprogress: tasks.filter(t => t.column === 'inprogress'),
      done: tasks.filter(t => t.column === 'done')
    }
  }, [tasks])

  function handleAddTask() {
    const title = newTaskTitle.trim()
    if (!title) return

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      column: 'todo'
    }

    setTasks(prev => [newTask, ...prev])
    setNewTaskTitle('')
  }

  function handleDeleteTask(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function handleMoveTask(id: string, targetColumn: ColumnId) {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, column: targetColumn } : t
    ))
  }

  function cycleTask(id: string, direction: 'next' | 'prev') {
    const sequence: ColumnId[] = ['todo', 'inprogress', 'done']
    const task = tasks.find(t => t.id === id)
    if (!task) return

    const currentIndex = sequence.indexOf(task.column)
    if (currentIndex === -1) return

    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
    // Clamp
    if (nextIndex < 0) nextIndex = 0
    if (nextIndex >= sequence.length) nextIndex = sequence.length - 1

    if (nextIndex !== currentIndex) {
      handleMoveTask(id, sequence[nextIndex])
    }
  }

  function handleClearDone() {
    if (confirm('Are you sure you want to archive all completed tasks?')) {
      setTasks(prev => prev.filter(t => t.column !== 'done'))
    }
  }

  // Drag and Drop Handlers
  const handleDragOver = (e: React.DragEvent, colId: ColumnId) => {
    e.preventDefault()
    setActiveDropZone(colId)
  }

  const handleDrop = (e: React.DragEvent, targetCol: ColumnId) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('application/json')
    if (taskId) {
      handleMoveTask(taskId, targetCol)
    }
    setActiveDropZone(null)
  }

  function isColumnVisible(colId: ColumnId): boolean {
    return activeFilter === 'all' || activeFilter === colId
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="brand-title">TaskSprint</h1>
        <p className="brand-subtitle">Zero-friction project tracking</p>
      </header>

      {/* Filter Bar */}
      <div className="filter-bar" role="group" aria-label="Filter by column">
        {FILTER_OPTIONS.map(opt => (
          <button
            key={opt.id}
            id={`filter-${opt.id}`}
            className={`filter-pill${activeFilter === opt.id ? ' active' : ''}`}
            onClick={() => setActiveFilter(opt.id)}
            aria-pressed={activeFilter === opt.id}
          >
            {opt.label}
            {opt.id !== 'all' && (
              <span className="filter-count">
                {tasks.filter(t => t.column === opt.id).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <main className={`kanban-board${activeFilter !== 'all' ? ' single-column-view' : ''}`}>
        {/* TODO Column */}
        {isColumnVisible('todo') && (
        <BoardColumn
          id="todo"
          title={COLUMN_LABELS.todo}
          count={columns.todo.length}
          isDropTarget={activeDropZone === 'todo'}
          onDragOver={(e) => handleDragOver(e, 'todo')}
          onDragLeave={() => setActiveDropZone(null)}
          onDrop={(e) => handleDrop(e, 'todo')}
        >
          <div className="add-task-form">
            <input
              className="task-input"
              aria-label="New task"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              placeholder="What needs to be done?"
              maxLength={100}
            />
            <div className="form-actions">
              <button
                className="btn-primary"
                onClick={handleAddTask}
                disabled={!newTaskTitle.trim()}
              >
                Create
              </button>
            </div>
          </div>

          {columns.todo.length === 0 && (
            <div className="empty-state">No pending tasks</div>
          )}

          {columns.todo.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={() => handleDeleteTask(task.id)}
              onMoveRight={() => cycleTask(task.id, 'next')}
            />
          ))}
        </BoardColumn>
        )}

        {/* IN PROGRESS Column */}
        {isColumnVisible('inprogress') && (
        <BoardColumn
          id="inprogress"
          title={COLUMN_LABELS.inprogress}
          count={columns.inprogress.length}
          isDropTarget={activeDropZone === 'inprogress'}
          onDragOver={(e) => handleDragOver(e, 'inprogress')}
          onDragLeave={() => setActiveDropZone(null)}
          onDrop={(e) => handleDrop(e, 'inprogress')}
        >
          {columns.inprogress.length === 0 && (
            <div className="empty-state">Ready for work</div>
          )}
          {columns.inprogress.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={() => handleDeleteTask(task.id)}
              onMoveLeft={() => cycleTask(task.id, 'prev')}
              onMoveRight={() => cycleTask(task.id, 'next')}
            />
          ))}
        </BoardColumn>
        )}

        {/* DONE Column */}
        {isColumnVisible('done') && (
        <BoardColumn
          id="done"
          title={COLUMN_LABELS.done}
          count={columns.done.length}
          isDropTarget={activeDropZone === 'done'}
          onDragOver={(e) => handleDragOver(e, 'done')}
          onDragLeave={() => setActiveDropZone(null)}
          onDrop={(e) => handleDrop(e, 'done')}
        >
          {columns.done.length === 0 && (
            <div className="empty-state">Nothing completed yet</div>
          )}
          {columns.done.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={() => handleDeleteTask(task.id)}
              onMoveLeft={() => cycleTask(task.id, 'prev')}
            />
          ))}
        </BoardColumn>
        )}
      </main>

      {columns.done.length > 0 && (
        <footer className="footer-tools">
          <button
            className="btn-danger-outline"
            onClick={handleClearDone}
          >
            Clear Completed Tasks
          </button>
        </footer>
      )}
    </div>
  )
}

export default App
