import type { ColumnId } from './types'

export const COLUMN_LABELS: Record<ColumnId, string> = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
}

export const STORAGE_KEY = 'tasksprint-db-v1'

