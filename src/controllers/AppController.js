// controllers/AppController.js
import { TaskModel } from "../models/TaskModel.js";
import { renderTaskList } from "../views/TaskView.js";
import { renderHistoryList } from "../views/HistoryView.js";
import levelCompleteSound from "../asset/sounds/task-complete.wav";

export class AppController {
  constructor() {
    this.model = new TaskModel();
    this.completionSound = new Audio(levelCompleteSound);

    this.taskList = document.getElementById("taskList");
    this.historyWrapper = document.getElementById("history-wrapper");
    this.historyList = document.getElementById("history-list");
    this.xpEl = document.getElementById("xp");
    this.levelEl = document.getElementById("level");
    this.progressEl = document.getElementById("progress");
    this.input = document.getElementById("taskInput");
    this.icon = document.getElementById("icon");

    document
      .getElementById("addTask")
      .addEventListener("click", () => this.addTask());

    document
      .getElementById("history-toggler-btn")
      .addEventListener("click", () => this.toggleHistory());

    this.model.tasks.subscribe(() => this.renderTasks());
    this.model.history.subscribe(() => this.renderHistory());
    this.model.xp.subscribe((xp) => this.updateXP(xp));
    this.model.level.subscribe((lvl) => this.updateLevel(lvl));

    this.renderTasks();
    this.renderHistory();
  }

  addTask() {
    const text = this.input.value.trim();
    if (!text) return;
    this.model.addTask(text);
    this.input.value = "";
  }

  renderTasks() {
    this.taskList.innerHTML = "";
    this.taskList.appendChild(
      renderTaskList(this.model.tasks.get(), {
        onToggle: (id) => {
          const task = this.model.tasks.get().find((t) => t.id === id);
          if (!task.completed) this.completionSound.play();
          this.model.toggleTask(id);
        },
        onDelete: (id) => this.model.deleteTask(id),
      })
    );
  }

  renderHistory() {
    this.historyList.innerHTML = "";
    this.historyList.appendChild(renderHistoryList(this.model.history.get()));

    if (this.historyWrapper.classList.contains("open")) {
      this.historyWrapper.style.maxHeight =
        this.historyWrapper.scrollHeight + "px";
    }
  }

  updateXP(xp) {
    this.xpEl.textContent = xp;
    this.progressEl.style.width = `${xp % 100}%`;
  }

  updateLevel(level) {
    this.levelEl.textContent = level;
  }

  toggleHistory() {
    const wrapper = this.historyWrapper;
    const isOpen = wrapper.classList.contains("open");

    if (isOpen) {
      wrapper.style.maxHeight = "0px";
      wrapper.style.opacity = "0";
      wrapper.style.transform = "translateY(-10px)";
      wrapper.classList.remove("open");
      this.icon.style.transform = "rotate(0deg)";
    } else {
      const fullHeight = wrapper.scrollHeight + "px";
      wrapper.style.maxHeight = fullHeight;
      wrapper.style.opacity = "1";
      wrapper.style.transform = "translateY(0)";
      wrapper.classList.add("open");
      this.icon.style.transform = "rotate(180deg)";
    }
  }
}
