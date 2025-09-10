import "./style.css";
import levelCompleteSound from "./asset/task-complete.wav";

// DOM references
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const xpEl = document.getElementById("xp");
const levelEl = document.getElementById("level");
const progressEl = document.getElementById("progress");

// Asset references
const completionSound = new Audio(levelCompleteSound);

// App states
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let xp = Number(localStorage.getItem("xp")) || 0;
let level = Number(localStorage.getItem("level")) || 1;

// Initialization
(function init() {
  tasks.forEach((task) => {
    const li = addAndRenderTask(task);

    taskList.appendChild(li);
  });

  updateProgress();
})();

// Functions
function syncWithLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("xp", xp);
  localStorage.setItem("level", level);
}

function updateProgress() {
  progressEl.style.width = `${xp % 100}%`;
  xpEl.textContent = xp;
  levelEl.textContent = level;

  syncWithLocalStorage();
}

function addAndRenderTask(task) {
  const li = document.createElement("li");
  li.className =
    "flex justify-between items-center bg-gray-800 px-3 py-2 rounded-md cursor-pointer";
  li.innerHTML = `
    <span>${task.text}</span>
    <button class="font-semibold bg-red-500 hover:bg-red-600 px-2 py-1 rounded cursor-pointer transition-colors duration-300">Delete</button>
  `;

  if (task.completed) {
    li.classList.add("line-through", "opacity-50");
  }

  const deleteBtn = li.querySelector("button");
  deleteBtn.addEventListener("click", () => {
    tasks = tasks.filter((t) => t.id !== task.id);
    li.remove();
    syncWithLocalStorage();
  });

  li.addEventListener("click", () => {
    if (!task.completed) {
      task.completed = true;
      li.classList.add("line-through", "opacity-50");

      completionSound.currentTime = 0;
      completionSound.play();

      xp += 10;
      if (xp >= 100) {
        level++;
        xp -= 100;
        alert("🎉 Level Up!");
      }
      updateProgress();
    } else {
      task.completed = false;
      li.classList.remove("line-through", "opacity-50");
    }
  });

  return li;
}

// Event listeners
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;

  const task = { id: Date.now(), text, completed: false };
  tasks.push(task);

  const li = addAndRenderTask(task);
  taskList.appendChild(li);

  taskInput.value = "";
  updateProgress();
});

completionSound.addEventListener("ended", () => {
  completionSound.currentTime = 0;
});
