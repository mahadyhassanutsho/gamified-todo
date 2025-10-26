export function renderTaskList(tasks, handlers) {
  const list = document.createDocumentFragment();

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-gray-800 px-3 py-2 rounded-md font-merriweather";

    li.innerHTML = `
      <div class="flex items-center gap-3">
        <input type="checkbox" id="task-${task.id}" ${
      task.completed ? "checked" : ""
    } 
          class="w-5 h-5 rounded-full bg-white border border-gray-400 accent-green-500 cursor-pointer"/>
        <label for="task-${task.id}" class="${
      task.completed ? "line-through opacity-50" : ""
    }">
          ${task.text}
        </label>
      </div>
      <button data-action="delete" class="font-semibold bg-red-500 hover:bg-red-600 px-2 py-1 rounded transition">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    `;

    li.querySelector("input").addEventListener("change", () =>
      handlers.onToggle(task.id)
    );
    li.querySelector("[data-action=delete]").addEventListener("click", () =>
      handlers.onDelete(task.id)
    );

    list.appendChild(li);
  });

  return list;
}
