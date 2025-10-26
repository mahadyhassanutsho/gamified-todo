const colors = {
  added: "text-green-400",
  completed: "text-blue-400",
  uncompleted: "text-yellow-400",
  deleted: "text-red-400",
};

export function renderHistoryList(history) {
  const list = document.createDocumentFragment();

  history.forEach((entry) => {
    if (!entry || !entry.task) return;

    const li = document.createElement("li");
    li.className = "my-2.5 py-1 border-b border-gray-400 font-merriweather";
    li.innerHTML = `
      <p class="font-bold ${colors[entry.action] ?? "text-gray-400"}">
        ${entry.action?.toUpperCase() ?? "UNKNOWN"}
      </p>
      <p class="ml-2.5">${entry.task.text}</p>
      <small class="block text-xs text-gray-500 mt-1">
        at: ${new Date(entry.time).toUTCString()}
      </small>
    `;
    list.appendChild(li);
  });

  return list;
}
