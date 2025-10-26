// models/TaskModel.js
import { Observable } from "../utils/observable.js";
import { storage } from "../utils/storage.js";

export class TaskModel {
  constructor() {
    this.tasks = new Observable(storage.get("tasks", []));
    this.xp = new Observable(storage.get("xp", 0));
    this.level = new Observable(storage.get("level", 1));
    this.history = new Observable(storage.get("history", []));

    this.history.set(this.history.get().filter((h) => h && h.task));
  }

  addTask(text) {
    const task = { id: Date.now(), text, completed: false };
    const updated = [task, ...this.tasks.get()];
    this.tasks.set(updated);
    this.pushHistory("added", task);
    this.save();
  }

  toggleTask(id) {
    const updated = this.tasks.get().map((t) => {
      if (t.id === id) {
        t.completed = !t.completed;
        if (t.completed) this.gainXP(10);
        else this.gainXP(-10);
        this.pushHistory(t.completed ? "completed" : "uncompleted", t);
      }
      return t;
    });
    this.tasks.set(updated);
    this.save();
  }

  deleteTask(id) {
    const task = this.tasks.get().find((t) => t.id === id);
    this.tasks.set(this.tasks.get().filter((t) => t.id !== id));
    this.pushHistory("deleted", task);
    this.save();
  }

  gainXP(amount) {
    let xp = this.xp.get() + amount;
    let level = this.level.get();

    if (xp >= 100) {
      xp -= 100;
      level++;
      alert("🎉 Level Up!");
    } else if (xp < 0 && level > 1) {
      xp = 90;
      level--;
    }

    this.xp.set(xp);
    this.level.set(level);
  }

  pushHistory(action, task) {
    if (!task) {
      console.warn(`⚠️ Skipped invalid history entry (action: ${action})`);
      return;
    }

    const newEntry = {
      action,
      task,
      time: new Date().toISOString(),
    };
    const updated = [newEntry, ...this.history.get()];
    this.history.set(updated);
    this.save();
  }

  save() {
    storage.set("tasks", this.tasks.get());
    storage.set("xp", this.xp.get());
    storage.set("level", this.level.get());
    storage.set("history", this.history.get());
  }
}
