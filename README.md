# TaskSprint

Fast, focused, and friction-free Kanban board for developers.
Built with React 19, TypeScript, and Vite.

## Features

- **Zero Setup**: No backend, no login. Data persists instantly to your browser.
- **High Performance**: Native Drag-and-Drop, no heavy libraries.
- **Modern Design**: "Midnight Glass" aesthetic for focused work.
- **Keyboard Friendly**: Quick add tasks with Enter.

## Getting Started

1. **Install**
   ```bash
   npm install
   ```

2. **Run**
   ```bash
   npm run dev
   ```

3. **Test**
   ```bash
   npm test
   ```

4. **Build**
   ```bash
   npm run build
   ```

## Design Philosophy

TaskSprint is built to be a "code-first" tool. It avoids complex configuration in favor of strict, useful defaults.
The architecture is modular, with `BoardColumn` and `TaskCard` components handling their own display logic, while `App.tsx` acts as the controller.

## License

MIT
