const form = document.getElementById("form");
const textInput = document.getElementById("text");
const prioritySelect = document.getElementById("priority");
const message = document.getElementById("message");
const todoList = document.getElementById("todoList");


async function loadTodos(){
    message.textContent = "Načítám data...";
    try{
        const res = await fetch("/api/todos");
        if(!res.ok){
            throw new Error('Internal server error');
        }
        const todos = await res.json();
        message.textContent = "";
        renderTodos(todos);
       
    } catch(error){
        message.textContent = error.message;
        console.error(error);
    }
}

async function deleteTodo(id){
    try{
        const res = await fetch("/api/todos/" + id, {
            method: "DELETE",
        }
        );
        if(!res.ok){
            throw new Error('Internal server error');
        }
        await loadTodos();
    } catch(error){
        message.textContent = error.message;
        console.error(error);
    }
}

function renderTodos(todos){
    todoList.textContent = '';
    if(todos.length === 0){
        message.textContent = "Zatím žádné úkoly";
    }
    for(const todo of todos){
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = "Smazat";
        button.addEventListener('click', () => deleteTodo(todo._id));
        li.textContent = `${todo.text} (${todo.priority})`;
        li.appendChild(button);
        todoList.appendChild(li);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = textInput.value;
    const priority = prioritySelect.value;

    try{
        const res = await fetch('/api/todos', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                text,
                priority
            })
        });
        if(!res.ok){
            const data = await res.json();
            throw new Error(data.error);
        }
        form.reset();
        await loadTodos();
    } catch(error){
        message.textContent = error.message;
        console.error(error);
    }
});

loadTodos();