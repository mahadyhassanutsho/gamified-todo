import "./style.css";
import levelCompleteSound from "./asset/task-complete.wav";

// DOM references
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const xpEl = document.getElementById("xp");
const levelEl = document.getElementById("level");
const progressEl = document.getElementById("progress");
const historyTogglerBtn = document.getElementById("history-toggler-btn");
const historyList = document.getElementById("history-list");

// Asset references
const completionSound = new Audio(levelCompleteSound);
const historyColors = {
  added: "text-green-400",
  completed: "text-blue-400",
  uncompleted: "text-yellow-400",
  deleted: "text-red-400",
};

// App states
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let xp = Number(localStorage.getItem("xp")) || 0;
let level = Number(localStorage.getItem("level")) || 1;
let history = JSON.parse(localStorage.getItem("history")) || [];

// Initialization
(function init() {
  tasks.forEach((task) => {
    const li = renderTask(task);

    taskList.appendChild(li);
  });

  history.forEach((entry) => {
    const li = renderHistory(entry);

    historyList.appendChild(li);
  });

  updateProgress();
})();

// Functions
function syncWithLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("xp", xp);
  localStorage.setItem("level", level);
  localStorage.setItem("history", JSON.stringify(history));
}

function updateProgress() {
  progressEl.style.width = `${xp % 100}%`;
  xpEl.textContent = xp;
  levelEl.textContent = level;

  syncWithLocalStorage();
}

function renderTask(task) {
  const li = document.createElement("li");
  li.className =
    "flex justify-between items-center bg-gray-800 px-3 py-2 rounded-md font-merriweather";
  li.innerHTML = `
    <div class="flex items-center gap-3">
      <input type="checkbox" 
      id="task-${task.id}"
      class="w-5 h-5 rounded-full bg-white border border-gray-400 accent-green-500 cursor-pointer appearance-none checked:bg-green-500 checked:border-green-500"
      />
      <label for="task-${task.id}" 
      class="${task.completed ? "line-through opacity-50" : ""} cursor-pointer">
        ${task.text}
      </label>
    </div>
    <button class="font-semibold bg-red-500 hover:bg-red-600 px-2 py-1 rounded cursor-pointer transition-colors duration-300">
      <i class="fa-regular fa-trash-can"></i>
    </button>
  `;

  if (task.completed) {
    li.classList.add("line-through", "opacity-50");
  }

  const deleteBtn = li.querySelector("button");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    tasks = tasks.filter((t) => t.id !== task.id);
    li.remove();
    pushAndRenderHistory({
      action: "deleted",
      time: new Date().toISOString(),
      task: task,
    });
    syncWithLocalStorage();
  });

  const checkbox = li.querySelector("input");
  checkbox.addEventListener("change", () => {
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
      pushAndRenderHistory({
        action: "completed",
        time: new Date().toISOString(),
        task: task,
      });
      syncWithLocalStorage();
    } else {
      task.completed = false;
      li.classList.remove("line-through", "opacity-50");
      pushAndRenderHistory({
        action: "uncompleted",
        time: new Date().toISOString(),
        task: task,
      });
      syncWithLocalStorage();
    }
  });

  return li;
}

function renderHistory(history) {
  const li = document.createElement("li");
  li.className = `
  my-2.5 py-1 border-b 
  border-gray-400 
  font-merriweather
`.trim();

  li.innerHTML = `
  <p class="font-bold ${historyColors[history.action]} ">
    ${history.action.toUpperCase()}
  </p>
  <p class="ml-2.5">
    ${history.task.text}
  </p>
  <small class="block text-xs text-gray-500 mt-1">
    at: ${new Date(history.time).toUTCString()}
  </small>
`;

  return li;
}

function pushAndRenderHistory(entry) {
  history.unshift(entry);
  const li = renderHistory(entry);
  historyList.prepend(li);
}

// Event listeners
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;

  const task = { id: Date.now(), text, completed: false };
  tasks.unshift(task);
  pushAndRenderHistory({
    action: "added",
    time: new Date().toISOString(),
    task: task,
  });

  const li = renderTask(task);
  taskList.prepend(li);

  taskInput.value = "";
  updateProgress();
});

historyTogglerBtn.addEventListener("click", () => {
  const icon = historyTogglerBtn.querySelector("#icon");

  if (historyList.classList.contains("max-h-0")) {
    historyList.classList.remove("-translate-y-10");
    historyList.classList.remove("opacity-0");
    historyList.classList.remove("max-h-0");

    historyList.classList.add("translate-y-0");
    historyList.classList.add("opacity-100");
    historyList.classList.add("max-h-96");

    icon.classList.add("rotate-180");
  } else {
    historyList.classList.add("-translate-y-10");
    historyList.classList.add("opacity-0");
    historyList.classList.add("max-h-0");

    historyList.classList.remove("translate-y-0");
    historyList.classList.remove("opacity-100");
    historyList.classList.remove("max-h-96");

    icon.classList.remove("rotate-180");
  }
});

completionSound.addEventListener("ended", () => {
  completionSound.currentTime = 0;
});
