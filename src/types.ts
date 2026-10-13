export type ColumnId = 'todo' | 'inprogress' | 'done'

export type FilterOption = 'all' | ColumnId

export interface Task {
  id: string
  title: string
  column: ColumnId
}
