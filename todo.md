# Gamified To-Do List - Technical Development Tasks ✅

## 1️⃣ Project Setup

- [x] Create project folder: `gamified-todo`
- [x] Add `index.html`, `script.js`, `style.css`
- [x] Include TailwindCSS
- [x] Setup base HTML structure:
  - Header with app name
  - Task input + Add button
  - Task list container
  - Progress bar for XP
  - Level display

---

## 2️⃣ Task Management

- [x] Create a `tasks` array to store task objects `{ id, text, completed }`
- [x] Implement "Add Task" functionality:
  - Capture input value
  - Generate unique ID (timestamp or counter)
  - Push task object to `tasks` array
  - Render task in the task list dynamically
- [x] Implement "Mark as Complete":
  - Add checkbox for each task
  - Toggle `completed` property on click
  - Apply strike-through style using Tailwind
- [ ] Implement "Remove Task":
  - Add delete button for each task
  - Remove task from `tasks` array and DOM
- [ ] Save `tasks` array to `localStorage` on any change
- [ ] Load tasks from `localStorage` on page load

---

## 3️⃣ XP & Level System

- [x] Create `xp` and `level` variables
- [x] Completing a task increases XP by 10
- [x] Calculate level: `level = Math.floor(xp / 100)`
- [x] Update progress bar width dynamically:
  - `progress = (xp % 100)%`
  - Apply Tailwind width classes or inline style
- [x] Trigger "level up" animation when XP reaches 100:
  - Optional: Confetti or bounce animation
  - Reset XP to `xp - 100` if it overflows
- [x] Persist `xp` and `level` in `localStorage`

---

## 4️⃣ UI & Styling

- [x] Style task input, buttons, and task cards using Tailwind
- [x] Style progress bar and level display
- [x] Responsive layout:
  - Mobile: Single column
  - Desktop: Centered container
- [x] Optional: Dark mode adjustments

---

## 5️⃣ Extras / Polish

- [x] Animate progress bar on XP gain (`transition-all duration-300`)
- [x] Add hover/focus effects to buttons
- [x] Add visual cue for completed tasks (opacity or checkmark)
- [ ] Add sound effect or animation for XP gain
- [x] Test all features: Add, complete, delete tasks, level up
- [ ] Deploy project (Netlify / GitHub Pages)

---

## 6️⃣ References

- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [MDN LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- Vanilla JS DOM manipulation guides
