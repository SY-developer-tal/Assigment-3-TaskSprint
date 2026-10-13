# FlowBoard New Assignment (2026HI) — Implementation Plan

## Summary of Comparison

This document compares the **original assignment** (`assignment.pdf`) with the **new assignment** (`FlowBoard-assignment-2026HI.pdf`) and outlines everything that needs to be implemented or changed.

---

## Side-by-Side Assignment Comparison

| Area | Original Assignment | New Assignment (2026HI) |
|---|---|---|
| **Core columns** | 3 fixed columns: To Do, In Progress, Done | Same — unchanged |
| **Add Task** | Title only → To Do column | Same — unchanged |
| **Move Task** | Drag-drop OR buttons | Same — unchanged |
| **Delete Task** | From any column | Same — unchanged |
| **Task State** | In component state | Same — unchanged |
| **Persistence** | localStorage | Same — unchanged |
| **Drag-and-Drop** | Native (no react-dnd, interact.js, konva.js) | **Explicitly specifies native browser events: mousedown, mousemove, etc.** |
| **Filtering** | Not required | **NEW: Optional filter (e.g., show only "In Progress")** |
| **Architecture Trade-offs** | Not explicitly mentioned | **NEW: Must document state management choice** |
| **Unit Tests** | Not mentioned | **NEW: REQUIRED — "Unit tests are required."** |
| **TEST_STRATEGY.md** | Not required | **NEW: Document explaining testing coverage and rationale** |
| **GitHub repo sharing** | dmistryTal, nileshmallick1606, Sachin-Salunke-Talentica | No GitHub usernames listed in new assignment |
| **Video sharing** | Dipen.mistry, Nilesh.Mallick, Sachin.Salunke @talentica.com | **CHANGED: Vishal.Palasgaonkar, OmPrakash.Pachoriya @talentica.com** |
| **npm run start** | Required | Same |

---

## What is NEW vs CHANGED vs SAME

### NEW Requirements (Must Implement)

1. **Unit Tests are REQUIRED**
   - Original: no mention of tests
   - New: "Unit tests are required."
   - Current project has 4 tests in `App.test.tsx` — but needs expansion

2. **TEST_STRATEGY.md** document (brand new deliverable)
   - Must explain testing coverage and rationale
   - Does not exist in the current project

3. **Filtering feature (Optional but expected)**
   - "Filtering (Optional): Provide a simple filter (e.g., show only 'In Progress')"
   - Not present in the current app at all

4. **Architecture Trade-offs documentation**
   - "Architecture Trade-offs: Document state management choice (Context API, lifting state, Redux, etc.) and why chosen."
   - The existing `ARCHITECTURE.md` partially covers this but needs an explicit section

### CHANGED Requirements

5. **Video sharing recipients changed**
   - Old: Dipen.mistry@talentica.com, Nilesh.Mallick@talentica.com, Sachin.Salunke@talentica.com
   - New: **Vishal.Palasgaonkar@talentica.com, OmPrakash.Pachoriya@talentica.com**

6. **Drag-and-Drop explicitly specifies browser events**
   - Old: "via drag-drop OR buttons"
   - New: "Implement native drag-drop using browser events (mousedown, mousemove, etc.). Libraries like react-dnd are prohibited."
   - Current implementation uses HTML5 draggable + React's onDragOver, onDrop, onDragLeave — **compliant**, but needs clearer documentation

### SAME (Already Implemented)

- Three fixed columns: To Do, In Progress, Done
- Add task (title only) to To Do
- Move tasks across columns (drag-drop + buttons)
- Delete task from any column
- Task state in component state (React useState)
- localStorage persistence
- No external drag-drop libraries
- README.md, PROJECT_STRUCTURE.md, ARCHITECTURE.md, CHAT_HISTORY.md

---

## Proposed Changes — File by File

### Feature Implementation

#### [MODIFY] `src/App.tsx`
- Add `filterColumn` state: `'all' | ColumnId` defaulting to `'all'`
- Add a filter bar UI above the board with pill/tab buttons: "All", "To Do", "In Progress", "Done"
- Conditionally render BoardColumn components based on active filter
- Wire filter buttons to `setFilterColumn()`

#### [MODIFY] `src/types.ts`
- Add: `export type FilterOption = 'all' | ColumnId`

#### [MODIFY] `src/App.test.tsx`
Expand existing 4 tests to add:
- Filtering: filter to "In Progress" shows only in-progress tasks
- Filtering reset: "All" filter restores full board view
- Persistence round-trip: add task, check localStorage, reinit
- Empty title rejected: add button disabled when input is empty
- Move task left: move from In Progress back to To Do
- Keep all 4 existing passing tests

---

### New Deliverable Files

#### [NEW] `TEST_STRATEGY.md`
Must cover:
- Testing framework: Vitest + React Testing Library
- What is tested: rendering, add/delete/move task flows, localStorage persistence, filter behavior
- What is NOT tested and why: native drag-drop pointer events, CSS/visual layout
- Test coverage rationale: behavior-driven, user-observable outcomes
- How to run: `npm run test`

#### [MODIFY] `ARCHITECTURE.md`
Add new **State Management Trade-offs** section:
- Why "lifting state" (all state in `App.tsx`) was chosen over Context API, Zustand, Redux
- Trade-offs at this scale: simpler code, prop drilling acceptable for 2 levels
- When to migrate: when adding features like task descriptions, due dates, labels
- Update drag-drop section to explicitly mention native browser events used

---

### Supporting Documentation

#### [MODIFY] `package.json`
- Add `"start": "vite"` script so `npm run start` works (new assignment requires this)

#### [MODIFY] `README.md`
- Add `npm run test` instructions
- Update video sharing contacts to the new reviewers

#### [MODIFY] `CHAT_HISTORY.md`
- Add new iteration entry for this assignment update

---

## Implementation Priority Order

| Priority | Task | Effort | Status |
|---|---|---|---|
| P0 | Expand unit tests (required) | Medium | 4 tests exist, need ~4-6 more |
| P0 | Create `TEST_STRATEGY.md` | Small | File does not exist |
| P0 | Add `"start"` script to `package.json` | Tiny | Only `dev` exists |
| P1 | Add filtering feature to `App.tsx` + `types.ts` | Small | Not implemented |
| P1 | Update `ARCHITECTURE.md` with state trade-offs section | Small | Partially covered |
| P2 | Update `README.md` with test commands + new video contacts | Tiny | Quick update |
| P2 | Add new `CHAT_HISTORY.md` entry | Small | Append only |

---

## Open Questions

> [!IMPORTANT]
> **Filtering UX decision**: How should filtering behave visually?
> - **Option A (Recommended)**: When a filter is active, hide non-matching columns. Matching column expands to full width.
> - **Option B**: Keep all 3 columns visible, grey out tasks not in the active filter.
> - **Option C**: Keep all 3 columns, but only render task cards in the matching column (others appear empty).

> [!NOTE]
> **`npm run start` vs `npm run dev`**: The new assignment requires `npm run start` but the project runs with `npm run dev` (Vite default). Adding `"start": "vite"` to package.json scripts will satisfy this with zero breaking change.

> [!WARNING]
> **GitHub repo sharing**: The new assignment does NOT list GitHub usernames. Confirm whether the original 3 GitHub users (dmistryTal, nileshmallick1606, Sachin-Salunke-Talentica) still need access, or if the repo needs new reviewers added.

---

## Verification Plan

### Automated Tests
```bash
npm run test
npm run test -- --coverage
```

### Manual Verification Checklist
- [ ] All 3 columns render correctly
- [ ] Add task works (title input, Enter key, button click)
- [ ] Move task works via left/right arrow buttons
- [ ] Move task works via drag-and-drop (native HTML5)
- [ ] Delete task works from any column
- [ ] Tasks persist across page refresh (localStorage)
- [ ] Filter bar renders with "All", "To Do", "In Progress", "Done" options
- [ ] Active filter correctly shows/hides tasks
- [ ] All unit tests pass (`npm run test`)
- [ ] `npm run start` launches the app successfully
- [ ] `TEST_STRATEGY.md` exists and covers all required points
- [ ] `ARCHITECTURE.md` has explicit state management trade-offs section
- [ ] `README.md` includes new video sharing contacts
