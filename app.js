// Define UI variable

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners

loadEventListeners();

function loadEventListeners(){

    // DOM load event
    document.addEventListener('DOMConetentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    // remove event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter task event
    filter.addEventListener('keyup', filterTask);
}

// Get tasks from localstorage

function getTasks(){

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
         // Create element

    const li = document.createElement('li');

    // Add class

    li.className = 'collection-item';

    //  Create text node & append to li

    li.appendChild(document.createTextNode(task));

    // Create new link 

    const link = document.createElement('a');

    // add class

    link.className = 'delete-item secondary-content';
    
    // add icon

    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    // append li to ul

    taskList.appendChild(li);

    })

}


// add task

function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a task');
    }

    // Create element

    const li = document.createElement('li');

    // Add class

    li.className = 'collection-item';

    //  Create text node & append to li

    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link 

    const link = document.createElement('a');

    // add class

    link.className = 'delete-item secondary-content';
    
    // add icon

    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    // append li to ul

    taskList.appendChild(li);

    // store to local storage

    storeTaskInLocalStorage(taskInput.value);


    // clear input

    taskInput.value = '';

    e.preventDefault();
}

// store task

function storeTaskInLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// ----------------------- Remove -----------------

// remove task

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Delete this task?')){
            e.target.parentElement.parentElement.remove();
        }
    }
}

// clear all task

function clearTasks(){
    
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}

// filter task

function filterTask(e){
    const text = e.target.value.toLowerCase();


    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
}