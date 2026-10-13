import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

function clearStorage() {
  localStorage.clear()
}

describe('TaskSprint', () => {
  beforeEach(() => clearStorage())

  // ── Rendering ────────────────────────────────────────────────────────────────

  it('renders three columns with headers', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /To Do/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /In Progress/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Done/i })).toBeInTheDocument()
  })

  it('renders the filter bar with all options', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /To Do/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /In Progress/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Done/i })).toBeInTheDocument()
  })

  // ── Add Task ─────────────────────────────────────────────────────────────────

  it('adds a task to To Do', async () => {
    const user = userEvent.setup()
    render(<App />)
    const input = screen.getByLabelText('New task')
    await user.type(input, 'Write tests{enter}')
    expect(screen.getByText('Write tests')).toBeInTheDocument()
  })

  it('does not add a task when the title is empty or whitespace-only', async () => {
    const user = userEvent.setup()
    render(<App />)
    const btn = screen.getByRole('button', { name: /Create/i })
    expect(btn).toBeDisabled()
    const input = screen.getByLabelText('New task')
    await user.type(input, '   ')
    expect(btn).toBeDisabled()
  })

  it('clears the input field after adding a task', async () => {
    const user = userEvent.setup()
    render(<App />)
    const input = screen.getByLabelText('New task')
    await user.type(input, 'Task to add{enter}')
    expect(input).toHaveValue('')
  })

  // ── Move Task ────────────────────────────────────────────────────────────────

  it('moves a task from To Do to In Progress and then to Done', async () => {
    const user = userEvent.setup()
    render(<App />)
    const input = screen.getByLabelText('New task')
    await user.type(input, 'Move me{enter}')
    // Move from To Do → In Progress
    const moveRight = screen.getAllByRole('button', { name: 'Move task to next column' })[0]
    await user.click(moveRight)
    // Move from In Progress → Done
    const moveToDone = screen.getAllByRole('button', { name: 'Move task to next column' })[0]
    await user.click(moveToDone)
    // Task should now be in Done column
    expect(screen.getByText('Move me')).toBeInTheDocument()
  })

  it('moves a task backwards from In Progress to To Do', async () => {
    const user = userEvent.setup()
    render(<App />)
    const input = screen.getByLabelText('New task')
    await user.type(input, 'Go back{enter}')
    // Move to In Progress first
    await user.click(screen.getAllByRole('button', { name: 'Move task to next column' })[0])
    // Move back to To Do
    await user.click(screen.getAllByRole('button', { name: 'Move task to previous column' })[0])
    // Task is still visible (back in To Do)
    expect(screen.getByText('Go back')).toBeInTheDocument()
  })

  // ── Delete Task ───────────────────────────────────────────────────────────────

  it('deletes a task', async () => {
    const user = userEvent.setup()
    render(<App />)
    const input = screen.getByLabelText('New task')
    await user.type(input, 'Delete me{enter}')
    const del = screen.getAllByRole('button', { name: 'Delete task' })[0]
    await user.click(del)
    expect(screen.queryByText('Delete me')).not.toBeInTheDocument()
  })

  // ── Persistence ───────────────────────────────────────────────────────────────

  it('persists tasks to localStorage', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)
    const input = screen.getByLabelText('New task')
    await user.type(input, 'Persist me{enter}')
    unmount()
    // Re-mount simulates a page reload
    render(<App />)
    expect(screen.getByText('Persist me')).toBeInTheDocument()
  })

  // ── Filtering ─────────────────────────────────────────────────────────────────

  it('filter by In Progress hides other columns', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Add a task and move it to In Progress
    const input = screen.getByLabelText('New task')
    await user.type(input, 'Filter test{enter}')
    await user.click(screen.getAllByRole('button', { name: 'Move task to next column' })[0])

    // Click "In Progress" filter pill
    const inProgressFilter = screen.getByRole('button', { name: /In Progress/i })
    await user.click(inProgressFilter)

    // To Do and Done column headers should be gone
    expect(screen.queryByRole('heading', { name: /To Do/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /Done/i })).not.toBeInTheDocument()
    // In Progress column and task are still visible
    expect(screen.getByRole('heading', { name: /In Progress/i })).toBeInTheDocument()
    expect(screen.getByText('Filter test')).toBeInTheDocument()
  })

  it('resets to all columns when All filter is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Apply a filter
    await user.click(screen.getByRole('button', { name: /In Progress/i }))
    expect(screen.queryByRole('heading', { name: /To Do/i })).not.toBeInTheDocument()

    // Click "All" to reset
    await user.click(screen.getByRole('button', { name: /^All/i }))
    expect(screen.getByRole('heading', { name: /To Do/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /In Progress/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Done/i })).toBeInTheDocument()
  })
})
