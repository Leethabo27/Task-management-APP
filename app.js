const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task");
const progressBarFill = document.getElementById("progress-bar-fill");
const progressPercent = document.getElementById("progress-percent");
const dateTimeDisplay = document.getElementById("date-time");
const toggleModeBtn = document.getElementById("toggle-mode");

let tasks = [];


function updateDateTime() {
  const now = new Date();
  dateTimeDisplay.textContent = now.toLocaleString();
}
setInterval(updateDateTime, 1000);

// Add Task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const priority = priorityInput.value;
  const deadline = deadlineInput.value;

  if (!taskText || !deadline) return alert("Please enter a task and deadline!");

  tasks.push({ text: taskText, priority, deadline, completed: false });
  taskInput.value = "";
  renderTasks();
  updateProgress();
});


function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <span>📝 ${task.text} (${task.priority}) - Due: ${new Date(task.deadline).toLocaleString()}</span>
      <button class="complete" onclick="toggleComplete(${index})">✅</button>
      <button class="delete" onclick="deleteTask(${index})">❌</button>
    `;
    taskList.appendChild(taskItem);
  });
}


function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
  updateProgress();
}


function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  updateProgress();
}


function updateProgress() {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = tasks.length ? (completedTasks / tasks.length) * 100 : 0;
  progressBarFill.style.width = `${progress}%`;
  progressPercent.textContent = `${Math.round(progress)}%`;
}


toggleModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});


updateDateTime();

    
