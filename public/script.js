document.getElementById('todoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('todoInput');
    const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input.value })
    });
    const todo = await response.json();
    input.value = '';
    loadTodos();
});

async function loadTodos() {
    const response = await fetch('/api/todos');
    const todos = await response.json();
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'bg-light' : ''}`;
        li.innerHTML = `
            <div>
                <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo('${todo._id}', this.checked)">
                <span class="ms-2">${todo.title}</span>
            </div>
            <button class="btn btn-danger btn-sm" onclick="deleteTodo('${todo._id}')">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

async function toggleTodo(id, completed) {
    await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
    });
}

async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    loadTodos();
}

loadTodos();