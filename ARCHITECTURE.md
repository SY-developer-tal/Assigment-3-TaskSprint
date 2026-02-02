# Architecture

## Pattern
- **Component-Based**: UI/display logic is strictly separated from state management.
- **Controller View**: `App.tsx` acts as the controller, managing global state and handlers, passing them down to presentational components (`BoardColumn`, `TaskCard`).
- **Unidirectional Data Flow**: State flows down from App to Columns to Tasks. Events flow up via callbacks.

## Component Hierarchy
```
<App> (State: tasks)
  <Header/>
  <main.kanban-board>
    <BoardColumn id="todo">
      <AddForm/>           
      <TaskCard/>*         
    </BoardColumn>
    <BoardColumn id="inprogress">
      <TaskCard/>*
    </BoardColumn>
    <BoardColumn id="done">
      <TaskCard/>*
    </BoardColumn>
  </main>
  <FooterTools/>
</App>
```

## State Management
- **Single Source of Truth**: All tasks live in `App.tsx`.
- **Derivation**: Columns are derived from the master task list using `useMemo`.
- **Persistence**: `useLocalStorageState` handles automatic syncing to browser storage.

## Drag and Drop
- Implemented using native HTML5 DnD API in `App.tsx` (handlers) and components (UI attributes).
- `TaskCard` is `draggable`.
- `BoardColumn` listens for `onDragOver` and `onDrop`.
- Data transfer uses JSON strings of Task IDs.
