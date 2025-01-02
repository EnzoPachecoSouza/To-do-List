let tasks = [
    {id: 1, description: "Comprar pão", checked: false},
    {id: 2, description: "Fazer o almoço", checked: false},
    {id: 3, description: "Escovar os Dentes", checked: false},
]

const removeTask = (taskId) => {
    tasks = tasks.filter(({id}) => parseInt(id) !== parseInt(taskId));

    document
        .getElementById("to-do-list")
        .removeChild(document.getElementById(taskId));
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

const getCheckBoxInput = ({id, description, checked}) => {
    const checkbox = document.createElement("input");//CRIANDO O ELEMENTO DE INPUT
    const label = document.createElement("label");//CRIANDO O ELEMENTO DE LABEL
    const wrapper = document.createElement("div");//CRIANDO O ELEMENTO DE DIV (deixando esses 2 elemtnso dentro da DIV)
    const chackBoxId = `${id}-checkbox`;

    checkbox.type = "checkbox";
    checkbox.id = chackBoxId;
    checkbox.checked = checked || false;

    label.textContent = description;
    label.htmlFor = chackBoxId;

    wrapper.className = 'checkbox-label-container';

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    return wrapper;
}

const getNewTaskId = () => {
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

    const newTaskData = getNewTaskData(event); // Chama a função `getNewTaskData` para obter os dados da nova tarefa.
    
    const checkbox = getCheckBoxInput(newTaskData); // Cria o checkbox com os dados da nova tarefa.
    createTaskListItem(newTaskData, checkbox); // Adiciona o novo item à lista.

    // Atualiza o array `tasks` com a nova tarefa.
    tasks = [...tasks, { 
        id: newTaskData.id, 
        description: newTaskData.description, 
        checked: false 
    }];
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

    tasks.forEach(function(task) {
        const checkbox = getCheckBoxInput(task);
        createTaskListItem(task, checkbox); // Reutiliza a função que já adiciona o botão de remover.
    });
};
