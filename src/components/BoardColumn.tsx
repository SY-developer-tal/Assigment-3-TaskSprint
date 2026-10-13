import type { ReactNode, DragEvent } from 'react'
import type { ColumnId } from '../types'

interface BoardColumnProps {
    id: ColumnId
    title: string
    count: number
    isDropTarget: boolean
    onDragOver: (e: DragEvent) => void
    onDragLeave: () => void
    onDrop: (e: DragEvent) => void
    children: ReactNode
}

export function BoardColumn({
    title,
    count,
    isDropTarget,
    onDragOver,
    onDragLeave,
    onDrop,
    children
}: BoardColumnProps) {
    return (
        <section
            className={`board-column ${isDropTarget ? 'highlight-drop' : ''}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <header className="column-header">
                <h2 className="column-title">
                    {title} <span className="task-count">({count})</span>
                </h2>
            </header>

            <div className="column-body">
                {children}
            </div>
        </section>
    )
}
