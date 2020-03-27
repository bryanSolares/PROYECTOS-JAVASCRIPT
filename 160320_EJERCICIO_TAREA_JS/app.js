var form_task = document.getElementById("form-task");
var tasks = [];
var id = 0;
var areaTasks = document.getElementById("tasks");

form_task.addEventListener("submit", saveTask);

function saveTask(event) {
  event.preventDefault();
  id += 1;
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  //opcion de la nueva versión de js para asignar valores cuando se tiene variables con igual valor
  const task = {
    id,
    title,
    description
  };

  //almacenamiento en localstorage y convertiendo la tarea en string
  if (localStorage.getItem("task") === null) {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  getTasks();
  form_task.reset();
}

function getTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  areaTasks.innerHTML = " ";

  for (let i = 0; i < tasks.length; i++) {
    let id = tasks[i].id;
    let title = tasks[i].title;
    let description = tasks[i].description;

    areaTasks.innerHTML += `
        
        <div class= "card mb-3">
            <div class= "card-body">
                <p>${id} - ${title} - ${description}</p>
                <a href="#" class="btn btn-danger" onClick="deleteTask('${id}')">Delete</a>
            </div>
        </div>
        
        `;
  }
}

function deleteTask(id) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  localStorage.removeItem("tasks");

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks.splice(i, 1);
    }
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  getTasks();
}
