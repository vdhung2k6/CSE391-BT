const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");
const countEl = document.querySelector("#todoCount");
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function save() {
    localStorage.setItem("todos", JSON.stringify(todos));
    render();
}

function render() {
    list.innerHTML = "";
    const filtered = todos.filter(t => {
        if (currentFilter === "active") return !t.completed;
        if (currentFilter === "completed") return t.completed;
        return true;
    });

    filtered.forEach(todo => {
        const li = document.createElement("li");
        li.className = "list-group-item todo-item";
        li.dataset.id = todo.id;
        li.innerHTML = `<span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
                        <button class="btn btn-sm btn-danger delete">❌</button>`;
        list.appendChild(li);
    });

    countEl.textContent = `${todos.filter(t => !t.completed).length} items left`;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;
    todos.push({ id: Date.now(), text: input.value, completed: false });
    input.value = "";
    save();
});

list.addEventListener("click", (e) => {
    const id = parseInt(e.target.closest("li").dataset.id);
    if (e.target.classList.contains("delete")) {
        todos = todos.filter(t => t.id !== id);
    } else {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
    }
    save();
});

document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        render();
    });
});

document.querySelector("#clearCompleted").addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    save();
});

render();