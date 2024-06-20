const tasks = [];

const input = document.querySelector(".todo-container input[type='text']");
const addbtn = document.querySelector(".todo-container .add-btn");
const tasksList = document.querySelector(".todo-container .tasks-list");

addbtn.addEventListener("click", () => {
  let taskTitle = input.value;
  createTasks(taskTitle, false);
  displayTasks();
  input.value = "";
});

// ------------------------------------- helper functions ---------------
function createTasks(taskTitle, completed) {
  if (taskTitle.trim() === "") {
    return;
  }

  tasks.push({ taskTitle: taskTitle, completed: completed });
}

function displayTasks() {
  if (tasks.length === 0) {
    tasksList.textContent = "No tasks available";
    return;
  }

  saveTasks();

  tasksList.innerHTML = "";
  //   Now loop the array of tasks
  tasks.forEach((t) => {
    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML = `${
      !t.completed
        ? '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> \
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> \
  </svg> \
  '
        : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"> \
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /> \
</svg> \
'
    }`;
    completeBtn.addEventListener("click", () => {
      t.completed = !t.completed;
      displayTasks();
      // console.log(tasks)
    });

    const title = document.createElement("div");
    title.classList.add("taskTitle");
    title.innerHTML = t.taskTitle;
    if (t.completed) {
      title.style.textDecoration = "line-through";
    }

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    // removeBtn.textContent = "+";
    removeBtn.innerHTML = `<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="size-6"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  />
</svg>
`;

    removeBtn.addEventListener("click", () => {
      tasks.splice(tasks.indexOf(t), 1);
      displayTasks();
      saveTasks();
    });

    const task = document.createElement("div");
    task.classList.add("task");

    task.appendChild(completeBtn);
    task.appendChild(title);
    task.appendChild(removeBtn);

    tasksList.appendChild(task);
  });
}

// adding tasks to local storage:
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// getting tasks from localstorage
function loadTasks() {
  const loadedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (loadedTasks) {
    tasks.push(...loadedTasks);
  }
}

input.addEventListener("keyup", (e) => {
  // console.log(e);
  if (e.key === "Enter") {
    let taskTitle = input.value;
    createTasks(taskTitle, false);
    displayTasks();
    input.value = "";
  }
});

// calling in the begining while loading page.
loadTasks();
displayTasks();
