// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');


// Add task function
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }
  
   addTaskToUI(taskText);
   
     // Save task in localStorage
  saveTaskToLocalStorage(taskText);

  // Clear the input field
  taskInput.value = '';
}

// Event listener for adding tasks
addTaskButton.addEventListener('click', addTask);

   function saveTaskToLocalStorage(task) {
  // Get tasks from localStorage or create an empty array
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);

  // Save the updated array back to localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTaskToUI(task) {
  const li = document.createElement('li');
  li.textContent = task;

  // Add a delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deleteTask(task, li);

  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

function deleteTask(task, li) {
  // Remove from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Remove from UI
  taskList.removeChild(li);
}

