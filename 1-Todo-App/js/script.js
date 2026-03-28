const addBtn = document.querySelector('#add-btn');
const content = document.querySelector('#content');
const contentList = document.querySelector('#todo-list');

let todos = [];

addBtn.addEventListener('click', () => {
    todos.push({todoContent:content.value, isEditing:false});
    render();
});

contentList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-complete')) {
        const parent = e.target.closest('.todo');

        todos[e.target.dataset.index].todoContent = parent.querySelector(".editTodo").value;
        todos[e.target.dataset.index].isEditing = false;
        render();

    } else if (e.target.classList.contains('edit')) {
        todos[e.target.dataset.index].isEditing = true;
        render();

    } else if (e.target.classList.contains('delete')) {
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
                ${todo.isEditing ? `
                <input type="text" class="editTodo" placeholder="Edit ToDo" value="${todo.todoContent}" required><input class="edit-complete" type="submit" value="OK" data-index="${index}">
                ` : `<p class="todo-content">${todo.todoContent}</p>`}
                <button class="delete" data-index="${index}">Delete</button>
                ${todo.isEditing ? "" : `<button class="edit" data-index="${index}">Edit</button>`}

            </div>
        </li>`;

        contentList.insertAdjacentHTML('beforeend', todoContent);
    });
}