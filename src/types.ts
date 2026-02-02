export type ColumnId = 'todo' | 'inprogress' | 'done'

export interface Task {
  id: string
  title: string
  column: ColumnId
}

