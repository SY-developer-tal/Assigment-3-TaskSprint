import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

function clearStorage() {
  localStorage.clear()
}

describe('TaskSprint', () => {
  beforeEach(() => clearStorage())

  it('renders three columns with headers', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /To Do/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /In Progress/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Done/i })).toBeInTheDocument()
  })

  it('adds a task to To Do', async () => {
    const user = userEvent.setup()
    render(<App />)
    const input = screen.getByLabelText('New task')
    await user.type(input, 'Write tests{enter}')
    expect(screen.getByText('Write tests')).toBeInTheDocument()
  })

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

  it('deletes a task', async () => {
    const user = userEvent.setup()
    render(<App />)
    const input = screen.getByLabelText('New task')
    await user.type(input, 'Delete me{enter}')
    const del = screen.getAllByRole('button', { name: 'Delete task' })[0]
    await user.click(del)
    expect(screen.queryByText('Delete me')).not.toBeInTheDocument()
  })
})
