# TaskSprint (FlowBoard)

Fast, focused, and friction-free Kanban board for developers.
Built with React 19, TypeScript, and Vite.

## Features

- **Zero Setup**: No backend, no login. Data persists instantly to your browser.
- **High Performance**: Native Drag-and-Drop, no heavy libraries.
- **Modern Design**: "Midnight Glass" aesthetic for focused work.
- **Keyboard Friendly**: Quick add tasks with Enter.
- **Column Filter**: Instantly focus on any single column with one click.

## Getting Started

1. **Install**
   ```bash
   npm install
   ```

2. **Run**
   ```bash
   npm run start
   # or
   npm run dev
   ```

3. **Test**
   ```bash
   npm run test
   ```

4. **Test with Coverage**
   ```bash
   npm run test -- --coverage
   ```

5. **Build**
   ```bash
   npm run build
   ```

## Design Philosophy

TaskSprint is built to be a "code-first" tool. It avoids complex configuration in favor of strict, useful defaults.
The architecture is modular, with `BoardColumn` and `TaskCard` components handling their own display logic, while `App.tsx` acts as the controller. See [ARCHITECTURE.md](./ARCHITECTURE.md) for full design details.

## Documentation

| File | Description |
|---|---|
| [README.md](./README.md) | Build and run instructions |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Architectural pattern, component hierarchy, state management trade-offs, drag-drop design |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | Folder and module layout |
| [TEST_STRATEGY.md](./TEST_STRATEGY.md) | Testing framework, coverage, and rationale |
| [CHAT_HISTORY.md](./CHAT_HISTORY.md) | AI-assisted development prompt logs and trade-off discussions |

## License
MIT
