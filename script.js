const taskInput = document.querySelector(".todo-input input");
const filters = document.querySelectorAll(".items-statuses span");
const clearAll = document.querySelector(".items-clear");
const taskBox = document.querySelector(".task-box");
const leftItems = document.querySelector(".items-number");
 
let todos = JSON.parse(localStorage.getItem("todo-list"));
 
// for update the items left value
if(todos) {
    leftItems.innerHTML = todos.length;
}else {
    leftItems.innerHTML = 0;
}

//to change the class of span of items info div
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

// function to render the li tag into the container
function showTodo(filter) {
    let li = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                li += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="delete-todo">
                                <img src = "close-circle-outline.svg" onclick='deleteTodo(${id}, "${filter}")'>
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = li || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");


// function to update the status of a particular item from pending to completed and vice versa.
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

//function to delete the todo item
function deleteTodo(deleteId, filter) {
    
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
    leftItems.innerHTML = todos.length;
}

//function to clear all the todo task from the list
clearAll.addEventListener("click", () => {
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
    leftItems.innerHTML = todos.length;
});


//fetch the value from the input tag and save it in the local Storage and put into the todo task array
taskInput.addEventListener("keyup", e => {
    let newTodo = taskInput.value.trim();
    if(e.key == "Enter" && newTodo) {
        if(!todos) {
            todos = []
            
        } 
            
        let taskInfo = {name: newTodo, status: "pending"};
        todos.push(taskInfo);
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
        leftItems.innerHTML = todos.length;
    }
});