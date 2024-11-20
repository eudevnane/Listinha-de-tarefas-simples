// script.js

// Seleciona os elementos
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
const clearTasksButton = document.getElementById('clear-tasks');
const filterButtons = document.querySelectorAll('.filter-btn');

// Carrega tarefas do localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach((task) => createTaskElement(task.text, task.completed));
}

// Atualiza o localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach((item) => {
    tasks.push({
      text: item.querySelector('span').textContent,
      completed: item.classList.contains('done'),
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Adiciona evento ao botão de adicionar tarefa
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    createTaskElement(taskText);
    saveTasks();
  } else {
    alert('Por favor, digite uma tarefa!');
  }
});

// Criação de elementos para a tarefa
function createTaskElement(taskText, isCompleted = false) {
  const listItem = document.createElement('li');
  listItem.className = 'task-item';
  if (isCompleted) listItem.classList.add('done');

  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.className = 'delete-btn';

  // Eventos para conclusão e exclusão
  taskSpan.addEventListener('click', () => {
    listItem.classList.toggle('done');
    saveTasks();
  });

  deleteButton.addEventListener('click', () => {
    listItem.remove();
    saveTasks();
  });

  listItem.appendChild(taskSpan);
  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);

  taskInput.value = '';
}

// Limpa todas as tarefas
clearTasksButton.addEventListener('click', () => {
  taskList.innerHTML = '';
  saveTasks();
});

// Filtro de tarefas
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.task-item').forEach((item) => {
      switch (filter) {
        case 'all':
          item.style.display = 'flex';
          break;
        case 'completed':
          item.style.display = item.classList.contains('done') ? 'flex' : 'none';
          break;
        case 'pending':
          item.style.display = item.classList.contains('done') ? 'none' : 'flex';
          break;
      }
    });
  });
});


