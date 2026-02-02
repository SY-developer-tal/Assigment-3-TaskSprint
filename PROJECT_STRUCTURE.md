# Project Structure

```text
src/
  components/
    BoardColumn.tsx        # Column layout and drop zone logic
    TaskCard.tsx          # Individual task UI and controls
  App.tsx                 # Main Controller (State + Logic)
  App.css                 # Component-specific styles
  App.test.tsx            # Vitest + Testing Library UI tests
  index.css               # Global theme (Glassmorphism variables)
  types.ts                # Shared TypeScript interfaces
  constants.ts            # Configuration (Labels, Storage Keys)
  useLocalStorageState.ts # Custom hook for persistence
  setupTests.ts           # Vitest setup (jest-dom matchers)
  main.tsx                # Entry point
  vite-env.d.ts          # Vite types
```

## Modular Design
- **Components**: Isolated in `src/components/`. They are presentational and receive data/callbacks via props.
- **Styles**: `index.css` defines the "Design Tokens" (colors, radius, shadows). `App.css` implements the layout and specific component styles.
- **Logic**: Business logic (move, delete, add) is centralized in `App.tsx`.
- **Tests**: `App.test.tsx` covers the main user flows (add, move, delete) at the UI level using Testing Library.
