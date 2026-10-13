# TEST_STRATEGY.md — FlowBoard Testing Strategy

## Overview

This document explains the testing approach used for FlowBoard, what is covered, what is intentionally excluded, and the rationale behind each decision.

---

## Framework & Tooling

| Tool | Role |
|---|---|
| **Vitest** | Test runner (fast, Vite-native, no Jest config needed) |
| **React Testing Library (RTL)** | Component rendering + user interaction simulation |
| **@testing-library/user-event** | Realistic keyboard/mouse event simulation |
| **@testing-library/jest-dom** | Extended DOM matchers (`toBeInTheDocument`, `toBeDisabled`, etc.) |
| **jsdom** | Simulated browser DOM environment for Node.js |

---

## How to Run Tests

```bash
# Run all tests once
npm run test

# Run in watch mode (auto-reruns on file changes)
npm run test:watch

# Run with coverage report
npm run test -- --coverage
```

---

## What IS Tested

### Component Rendering
- All three column headings (To Do, In Progress, Done) render correctly
- Filter bar renders with four options: All, To Do, In Progress, Done

### Add Task Flow
- Typing a title and pressing Enter adds the task to To Do
- Create button is **disabled** when input is empty or whitespace-only
- Input field clears after a task is successfully added

### Move Task Flow
- Task moves forward: To Do → In Progress → Done via "next column" button
- Task moves backward: In Progress → To Do via "previous column" button

### Delete Task
- Clicking the Delete button removes the task from the board completely

### Persistence (localStorage)
- Adding a task, unmounting, and remounting the app correctly restores the saved task
- Simulates a page refresh scenario without a real browser reload

### Filtering
- Clicking the "In Progress" filter pill hides the To Do and Done columns
- Clicking the "All" filter pill restores all three columns

---

## What is NOT Tested (and Why)

| Concern | Why Excluded |
|---|---|
| **Native HTML5 drag-and-drop** | Requires real pointer device events that jsdom does not simulate. Libraries like `@testing-library/user-event` do not simulate `dragstart`, `dragover`, `drop` at the DOM level. This would require a real browser (e.g., Playwright/Cypress). |
| **Visual layout & CSS** | CSS rendering is not meaningful in jsdom. Verifying pixel positions, colors, or transitions is a job for screenshot/visual regression tests (e.g., Storybook + Chromatic). |
| **localStorage max-size edge cases** | Not relevant at this application scale; no real risk of hitting the 5MB browser limit with task title strings. |
| **Cross-browser compatibility** | Covered implicitly by the use of standard React synthetic events. End-to-end browser testing (if needed) would use Playwright. |

---

## Testing Philosophy

FlowBoard tests follow **behavior-driven** principles:
- We test **what the user can observe**, not implementation internals.
- No tests import or assert on React component internals, state variables, or private hooks.
- All test queries use accessible roles and labels (`getByRole`, `getByLabelText`) — this also validates that the app is accessible.

---

## Coverage Summary

| Area | Tests | Coverage |
|---|---|---|
| Column rendering | 1 | ✅ |
| Filter bar rendering | 1 | ✅ |
| Add task (success) | 1 | ✅ |
| Add task (blocked — empty input) | 1 | ✅ |
| Input clear after add | 1 | ✅ |
| Move task forward (To Do → Done) | 1 | ✅ |
| Move task backward (In Progress → To Do) | 1 | ✅ |
| Delete task | 1 | ✅ |
| localStorage persistence | 1 | ✅ |
| Filter by column | 1 | ✅ |
| Filter reset to All | 1 | ✅ |
| **Total** | **11 tests** | |
