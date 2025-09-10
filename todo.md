# Gamified To-Do List - Technical Development Tasks ✅

## 1️⃣ Project Setup

- [x] Create project folder: `gamified-todo`
- [x] Add `index.html`, `script.js`, `style.css`
- [x] Include TailwindCSS
- [ ] Setup base HTML structure:
  - Header with app name
  - Task input + Add button
  - Task list container
  - Progress bar for XP
  - Level display

---

## 2️⃣ Task Management

- [ ] Create a `tasks` array to store task objects `{ id, text, completed }`
- [ ] Implement "Add Task" functionality:
  - Capture input value
  - Generate unique ID (timestamp or counter)
  - Push task object to `tasks` array
  - Render task in the task list dynamically
- [ ] Implement "Mark as Complete":
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

- [ ] Create `xp` and `level` variables
- [ ] Completing a task increases XP by 10
- [ ] Calculate level: `level = Math.floor(xp / 100)`
- [ ] Update progress bar width dynamically:
  - `progress = (xp % 100)%`
  - Apply Tailwind width classes or inline style
- [ ] Trigger "level up" animation when XP reaches 100:
  - Optional: Confetti or bounce animation
  - Reset XP to `xp - 100` if it overflows
- [ ] Persist `xp` and `level` in `localStorage`

---

## 4️⃣ UI & Styling

- [ ] Style task input, buttons, and task cards using Tailwind
- [ ] Style progress bar and level display
- [ ] Responsive layout:
  - Mobile: Single column
  - Desktop: Centered container
- [ ] Optional: Dark mode adjustments

---

## 5️⃣ Extras / Polish

- [ ] Animate progress bar on XP gain (`transition-all duration-300`)
- [ ] Add hover/focus effects to buttons
- [ ] Add visual cue for completed tasks (opacity or checkmark)
- [ ] Optional: Add sound effect or animation for XP gain
- [ ] Test all features: Add, complete, delete tasks, level up
- [ ] Deploy project (Netlify / GitHub Pages)

---

## 6️⃣ References

- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [MDN LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- Vanilla JS DOM manipulation guides
