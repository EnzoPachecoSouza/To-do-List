const renderTasksProgressData = (tasks) => {
    let tasksProgress;

    const tasksProgressDOM = document.getElementById("tasks-progress");

    if(tasksProgressDOM){
        tasksProgress = tasksProgressDOM
    }else{
        const newTasksProgressDOM = document.createElement("div");
        newTasksProgressDOM.id = "tasks-progress";
        document.getElementById('to-do-footer').appendChild(newTasksProgressDOM);
        tasksProgress = newTasksProgressDOM;
    }

    const doneTasks = tasks.filter(({checked}) => checked).length;
    const totalTasks = tasks.length;
    tasksProgress.textContent = `${doneTasks}/${totalTasks} tarefas concluídas`;
}

const getTasksFromLocalStorage = () => {
    const localTasks = JSON.parse(window.localStorage.getItem("tasks"));

    return localTasks ? localTasks : [];
}

const setTasksInLocalStorage = (tasks) => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

const removeTask = (taskId) => {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(({id}) => parseInt(id) !== parseInt(taskId));

    setTasksInLocalStorage(updatedTasks);
    renderTasksProgressData(updatedTasks);

    document
        .getElementById("to-do-list")
        .removeChild(document.getElementById(taskId));
}

const removeDoneTasks = () => {
    const tasks = getTasksFromLocalStorage();
    const tasksToRemove = tasks
    .filter(({checked}) => checked)
    .map(({id}) => id);

    const updatedTasks = tasks.filter(({checked}) => !checked);
    setTasksInLocalStorage(updatedTasks);
    renderTasksProgressData(updatedTasks);

    tasksToRemove.forEach((taskToRemove) => {
        document
            .getElementById("to-do-list")
            .removeChild(document.getElementById(taskToRemove));
    });
}

const createTaskListItem = (task, checkbox) => {
    const list = document.getElementById("to-do-list");
    const toDo = document.createElement("li");

    const removeTaskButton = document.createElement("button");
    removeTaskButton.textContent = "X";
    removeTaskButton.ariaLabel = "Remover tarefa";

    removeTaskButton.onclick = () => removeTask(task.id);

    toDo.id = task.id;
    toDo.appendChild(checkbox);

    toDo.appendChild(removeTaskButton);

    list.appendChild(toDo);

    return toDo;
}

const onCheckboxClick = (event) => {
    const [id] = event.target.id.split("-");
    const tasks = getTasksFromLocalStorage();

    const updatedTasks = tasks.map((task) => {
        if(parseInt(task.id) === parseInt(id)) {
            return {
                ...task,
                checked: event.target.checked
            }
        }

        return task;
    })

    setTasksInLocalStorage(updatedTasks);
    renderTasksProgressData(updatedTasks);
}

const getCheckBoxInput = ({id, description, checked}) => {
    const checkbox = document.createElement("input");//CRIANDO O ELEMENTO DE INPUT
    const label = document.createElement("label");//CRIANDO O ELEMENTO DE LABEL
    const wrapper = document.createElement("div");//CRIANDO O ELEMENTO DE DIV (deixando esses 2 elemtnso dentro da DIV)
    const chackBoxId = `${id}-checkbox`;

    checkbox.type = "checkbox";
    checkbox.id = chackBoxId;
    checkbox.checked = checked || false;
    checkbox.addEventListener("change", onCheckboxClick);

    label.textContent = description;
    label.htmlFor = chackBoxId;

    wrapper.className = 'checkbox-label-container';

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    return wrapper;
}

const getNewTaskId = () => {
    const tasks = getTasksFromLocalStorage();
    const lastId = tasks[tasks.length - 1]?.id;
    return lastId ? lastId + 1 : 1;
}

const getNewTaskData = (event) => {
    const description = event.target.elements.description.value;
    const id = getNewTaskId();

    return {description, id};
}

const createTask = (event) => {
    event.preventDefault();

    const newTaskData = getNewTaskData(event); 
    
    const checkbox = getCheckBoxInput(newTaskData); 
    createTaskListItem(newTaskData, checkbox); 

    const tasks = getTasksFromLocalStorage();
   
    const updatedTasks = [...tasks, { 
        id: newTaskData.id, 
        description: newTaskData.description, 
        checked: false 
    }];

    setTasksInLocalStorage(updatedTasks);
    renderTasksProgressData(updatedTasks);

    document.getElementById('description').value = '';
}

//window.onload - O que está dentro da função atribuída ao window.onload será executado após o carregamento completo da página.
// window.onload = function() {
//     const form = document.getElementById("create-to-do-form");
//     form.addEventListener("submit", createTask);
    
//     tasks.forEach(function(task) { //O método forEach é usado para percorrer cada item no array tasks. Para cada tarefa no array, ele executa a função que está dentro do forEach
//         const checkbox = getCheckBoxInput(task);

//         const list = document.getElementById("to-do-list");//A variável list pega o elemento HTML com o id igual a "to-do-list", usando document.getElementById.
//         const toDo = document.createElement("li");//A variável toDo cria um novo elemento <li> (lista) para ser adicionado à lista.
//         //const button = document.createElement("button");//A variável button cria um novo botão para ser adicionado ao <li> criado acima.

//         toDo.id = task.id;
//         toDo.appendChild(checkbox);
//         //toDo.appendChild(button)

//         list.appendChild(toDo);//O método appendChild adiciona o elemento <li> criado (toDo) como um filho do elemento list (a <ul> com id="to-do-list").
//         //Esse passo insere o <li> dentro do <ul>
//     })
// }

window.onload = function() {
    const form = document.getElementById("create-to-do-form");
    form.addEventListener("submit", createTask);

    const tasks = getTasksFromLocalStorage();

    tasks.forEach(function(task) {
        const checkbox = getCheckBoxInput(task);
        createTaskListItem(task, checkbox); // Reutiliza a função que já adiciona o botão de remover.
    });

    renderTasksProgressData(tasks);
};
