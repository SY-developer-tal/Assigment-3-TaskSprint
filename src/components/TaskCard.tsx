import type { Task } from '../types'

interface TaskCardProps {
    task: Task
    onMoveLeft?: () => void
    onMoveRight?: () => void
    onDelete: () => void
}

export function TaskCard({ task, onMoveLeft, onMoveRight, onDelete }: TaskCardProps) {
    return (
        <article
            className="task-card"
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('application/json', task.id)
                e.dataTransfer.effectAllowed = 'move'
            }}
        >
            <div className="task-content">
                <p className="task-title">{task.title}</p>
            </div>

            <div className="task-controls">
                {onMoveLeft && (
                    <button
                        className="control-btn move-btn"
                        onClick={onMoveLeft}
                        aria-label="Move task to previous column"
                        title="Move Previous"
                    >
                        ←
                    </button>
                )}

                <button
                    className="control-btn delete-btn"
                    onClick={onDelete}
                    aria-label="Delete task"
                    title="Delete"
                >
                    ✕
                </button>

                {onMoveRight && (
                    <button
                        className="control-btn move-btn"
                        onClick={onMoveRight}
                        aria-label="Move task to next column"
                        title="Move Next"
                    >
                        →
                    </button>
                )}
            </div>
        </article>
    )
}
