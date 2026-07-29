const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");
const tasks = [];
let nextId = 1;

function addTaskItem(evt){
    evt.preventDefault();
    let value = taskInput.value.trim()
    if (value === ""){
        return;
    }

    tasks.push({
        id: nextId,
        text: value,
        completed: false
    })
    nextId++
    taskInput.value = "";
    renderTasks();
    
    console.log(tasks)
}

function deleteTask(evt){
    const indexItem = getTaskIndexById(evt.target.parentElement.id)
    if (indexItem !== -1){
        tasks.splice(indexItem, 1)
        renderTasks()
    }
   
}

function checkBoxChange(evt){
    const checkboxIndex = getTaskIndexById(evt.target.parentElement.id)
    if (checkboxIndex !== -1){
        tasks[checkboxIndex].completed = !tasks[checkboxIndex].completed
        renderTasks() 
    } 
    
}
function renderTasks(){
    taskList.innerHTML = "";
    for (const task of tasks){
        const taskLi = document.createElement("li")
        taskLi.id = task.id

        const taskText = document.createElement("span")
        taskText.textContent = task.text

        const removeButton = document.createElement("button")
        removeButton.addEventListener("click", deleteTask)
        removeButton.textContent = "remove"

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = task.completed
        checkbox.addEventListener("change", checkBoxChange)

        if (task.completed){
            taskLi.classList.add("completed")
        }

        taskLi.appendChild(checkbox)
        taskLi.appendChild(taskText)
        taskLi.appendChild(removeButton)
        taskList.appendChild(taskLi)
    }
}

function getTaskIndexById(id){
     return tasks.findIndex(item => item.id === Number(id));
}
taskForm.addEventListener("submit", addTaskItem);
