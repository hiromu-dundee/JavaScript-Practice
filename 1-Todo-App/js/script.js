const addBtn = document.querySelector("#add-btn");
const content = document.querySelector("#content");
const contentList = document.querySelector("#todo-list");
const ErrorMessage = document.querySelector(".Error-Message");
const downloadBtn = document.querySelector("#download");
const notDownload = document.querySelector(".not-download");

let todos = [];

downloadBtn.addEventListener("click", () => {
  if (todos.length === 0) {
    notDownload.textContent = "No Todo item to download.";
  } else {
    const escapeCSV = (text) => `"${String(text).replace(/"/g, '""')}"`;
    const rows = todos.map((todo, index) =>
      [index + 1, todo.todoContent].map(escapeCSV).join(","),
    );
    const csvContent = ["Index,Todo", ...rows].join("\r\n");
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([bom, csvContent], {
      type: "text/csv;charset=utf-8",
    });

    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "todos.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }
});

addBtn.addEventListener("click", () => {
  ErrorMessage.textContent = "";
  if (!content.value.trim()) {
    ErrorMessage.textContent = "Error : ToDo Content is required.";
  } else {
    todos.push({ todoContent: content?.value, isEditing: false });
    render();
  }
});

contentList.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-complete")) {
    const parent = e.target.closest(".todo");

    todos[e.target.dataset.index].todoContent =
      parent.querySelector(".editTodo").value;
    todos[e.target.dataset.index].isEditing = false;
    render();
  } else if (e.target.classList.contains("edit")) {
    todos[e.target.dataset.index].isEditing = true;
    render();
  } else if (e.target.classList.contains("delete")) {
    todos.splice(e.target.dataset.index, 1);
    render();
  }
});

function render() {
  contentList.innerHTML = "";
  content.value = "";

  todos.forEach((todo, index) => {
    const todoContent = `
        <li>
            <div class="todo">
                <h2 class="todo-number">No.${index + 1}</h2>
                ${
                  todo.isEditing
                    ? `
                <input type="text" class="editTodo" placeholder="Edit ToDo" value="${todo.todoContent}" required><input class="edit-complete" type="submit" value="OK" data-index="${index}">
                `
                    : `<p class="todo-content">${todo.todoContent}</p>`
                }
                <button class="delete" data-index="${index}">Delete</button>
                ${todo.isEditing ? "" : `<button class="edit" data-index="${index}">Edit</button>`}

            </div>
        </li>`;

    contentList.insertAdjacentHTML("beforeend", todoContent);
  });
}
